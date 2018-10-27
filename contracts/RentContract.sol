pragma solidity ^0.4.0;

import "./oraclizeAPI.sol";
import "./DateTime.sol";
//gas:5981360
contract RentContract is usingOraclize, DateTime {

    //oraclize Gas;
    uint oraclizeGas = 200000;  //200,000
    uint gasPrice = 1;          //4000000000
    string constant oraclizeType = "URL";
    string constant priceUrl = "json(https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=CNY).CNY";
    string constant dateUrl = "json(http://api.k780.com:88/?app=life.time&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json).result.timestamp";
    //租赁合约状态    签合同，支付押金，租赁过程，退回押金，完成合约
    enum RentContractStatus{
        ACTIVE_CONTRACT,
        SIGNATURE_CONTRACT,
        PAYING_PLEDGE,
        PAYING_RENT,
        WITHDRAWING_PLEDGE,
        COMPLETED
    }

    //每一期租金状态   未添加水表电表信息，未支付租金，已支付租金
    enum RentFeeStatus{
        UN_ADD_METER,
        UN_PAY_RENT_FEE,
        PAYED_RENT_FEE,
        WITHDRAW_RENT_FEE
    }

    //确认退回押金状态  初始化，双方确认退回金额，不接受当前退回金额，接受当前退回金额
    enum PledgeConfirm{
        CREATED,
        CONFIRMING,
        UN_ACCEPT,
        ACCEPT
    }

    //支付租金账单列表
    mapping(uint => RentPamentInfo) public rentPaymentInfoMapping;

    //oraclize 时间查询ID列表
    mapping(bytes32 => bool) public oraclizeDateValidIds;
    //oraclize 价格查询ID列表
    mapping(bytes32 => bool) public oraclizePriceValidIds;
    //oraclize 下一个期租金账单生成，查询ID列表
    mapping(bytes32 => bool) public oraclizeNextStage;

    //当前合同状态
    RentContractStatus public status;
    //支付押金总额
    uint pledgeTotal;
    //每月租金费用    以分计算
    uint rentFee;
    //每月支付租金日期
    uint8 payRentDate;
    //租期
    uint rentTerm;
    //入住时水表      度*10
    uint waterMeter;
    //入住时电表      度*10
    uint electricityMeter;
    //水费    以分计算
    uint waterFee;
    //电费    以分计算
    uint electricityFee;
    //timestamp     租赁开始时间
    uint256 startTime;
    //timestamp     租赁结束时间
    uint256 endTime;
    //租客公钥
    address tenantPublicKey;
    //房东公钥
    address landlordPublicKey;
    //押金详情 json字符串
    // bytes public pledgeTypeJson;
    //房东，租客基本信息 json字符串 押金详情
    bytes baseInfoJson;

    //激活合同，合同存入的余额
    uint public activeFee;
    uint needActiveFee;

    //押金 TODO
    uint public pledgeCash;
    //当前租金第几期
    uint public currentStage;
    //存储在智能合约中的租金
    uint public rentFeeCash;
    //下个月支付的租金日期
    uint public nextPayRentDate;
    //退回给房东的押金数
    uint public withDrawCashToLandlord;
    //退回给租客的押金数
    uint public withDrawCashToTenant;
    //当前退回的押金确认状态
    PledgeConfirm public pledgeStatus = PledgeConfirm.CREATED;
    //租赁期间，产生的租金明细
    struct RentPamentInfo {
        RentFeeStatus status;
        uint rentFeeTotal;
        uint createDate;
        uint paymentDate;
        MeterInfo waterMeterInfo;
        MeterInfo electricityMeterInfo;
        bool processed;
        uint ethRentFeeTotal;
        uint oraclizeFee;
        uint rentFeeCash;
    }
    //租赁期间，产生的水电明细
    struct MeterInfo {
        uint fee;
        uint lastMonthMeter;
        uint currentMonthMeter;
        uint currentMothUse;
    }

    //签名事件
    event SignatureEvent(address, bool, string);
    //支付押金的事件->支付押金时调用
    event PayPledgeEvent(address, uint, bool, string);
    //支付租金事件->支付租金时调用
    event PayRentEvent(address, uint, bool, string);
    //支付到合同回调函数的事件
    event PayEtherEvent(address, uint, bool, string);
    //Oricalize的响应->查询成功之后调用
    event OricalizeResponseEvent(bytes32, string, bool);
    //Oricalize的日志->账户余额不足时调用
    event OricalizeLogEvent(address, uint, uint, string);
    //房东取回租金时触发
    event RentFeeWithdrawalEvent(address, uint, bool);
    //房东与租客取回押金时触发
    event PledgeWithdrawalEvent(address, uint, bool, string);
    //取出余额
    event ActiveWithdrawalEvent(address, uint, bool, string);
    //改变合同状态
    event ContractStatusEvent(address, RentContractStatus, bool, string);
    //改变租金账单状态
    event RentFeeStatusEvent(address, RentFeeStatus, bool, uint, string);
    //是否接受退回的押金是否接受退回的押金
    event PledgeWithdrawalStatusEvent(address, PledgeConfirm, bool, string);

    //创建智能合约的构造函数
    constructor(uint _waterMeter, uint _waterFee, uint _electricityMeter,
        uint _electricityFee, uint _rentFee, uint _rentTerm, uint _pledgeTotal,
        uint256 _startTime, uint256 _endTime, address _tenantPublicKey, address _landlorPublickey,
        bytes _baseInfoJson) public{
        //oricalize
        oraclize_setCustomGasPrice(gasPrice);
        OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);

        require(_waterMeter > 0 && _waterFee > 0 && _electricityMeter > 0 && _electricityFee > 0
        && _rentFee > 0 && _rentTerm > 0 && _pledgeTotal > 0
        && _startTime > 0 && _endTime > 0 && _tenantPublicKey != address(0)
        && _baseInfoJson.length > 0, "参数存在空值");
        status = RentContractStatus.ACTIVE_CONTRACT;
        waterMeter = _waterMeter;
        waterFee = _waterFee;
        electricityFee = _electricityFee;
        electricityMeter = _electricityMeter;
        rentFee = _rentFee;
        payRentDate = getDay(_startTime);
        nextPayRentDate = startTime;
        rentTerm = _rentTerm;
        pledgeTotal = _pledgeTotal;
        startTime = _startTime;
        endTime = _endTime;
        tenantPublicKey = _tenantPublicKey;
        landlordPublicKey = _landlorPublickey;
        // pledgeTypeJson = _pledgeTypeJson;
        baseInfoJson = _baseInfoJson;
        startTime = _startTime;
        currentStage = 0;
        needActiveFee = _rentTerm * oraclizeGas * gasPrice * 4;
    }

    //获取租赁协议的信息
    function getRentContractInfo() public onlyRentContractParticipator view returns (address _tenantPublicKey,
        address _landlorPublickey, bytes _baseInfoJson,
        RentContractStatus _status, uint[13] memory uintArr){
        _status = status;
        _baseInfoJson = baseInfoJson;
        _landlorPublickey = landlordPublicKey;
        _tenantPublicKey = tenantPublicKey;
        uintArr = [
        startTime,
        endTime,
        rentTerm,
        waterMeter,
        waterFee,
        electricityMeter,
        electricityFee,
        rentFee,
        payRentDate,
        pledgeTotal,
        nextPayRentDate,
        needActiveFee,
        currentStage
        ];
        // _pledgeTypeJson = pledgeTypeJson;
    }


    //激活合同，向合同发送以太，供oricalize调用
    function activeContract()
    onlyLandlord
    atStage(RentContractStatus.ACTIVE_CONTRACT)
    payable public {
        if (msg.value >= needActiveFee) {
            activeFee += msg.value;
            status = RentContractStatus.SIGNATURE_CONTRACT;
            emit ContractStatusEvent(msg.sender, status, true, "合同激活成功");
        } else {
            emit ContractStatusEvent(msg.sender, status, false, "合同激活失败，以太过少");
        }
    }

    //租客签订租赁协议，只允许租客操作，且当前阶段为 SIGNATURE_CONTRACT
    function signatrueContractByTenant()
    onlyTenant
    atStage(RentContractStatus.SIGNATURE_CONTRACT)
    payable public returns (bool){
        status = RentContractStatus.PAYING_PLEDGE;
        emit ContractStatusEvent(msg.sender, status, true, "签名成功");
    }

    //支付押金，仅租客操作，且当前阶段为PAYING_PLEDGE TODO
    function payPledge()
    onlyTenant
    atStage(RentContractStatus.PAYING_PLEDGE)
    isOwnCash(4)
    payable public {
        pledgeCash += msg.value;
        if (pledgeCash <= pledgeTotal) {
            emit ContractStatusEvent(msg.sender, status, false, "支付的押金过多");
        }
        if (pledgeCash == pledgeTotal) {
            status = RentContractStatus.PAYING_RENT;
            addRentPamentInfo();
            emit ContractStatusEvent(msg.sender, status, true, "已完成押金的支付,请支付租金");
        } else {
            emit ContractStatusEvent(msg.sender, status, false, "支付的押金过少");
        }
    }

    //添加租赁账单
    function addRentPamentInfo() internal {
        //若为第一期，则直接进行第一期租金的账单明细生成，即更新当前的 以太币/人民币汇率
        if (currentStage == 0) {
            rentPaymentInfoMapping[currentStage] = RentPamentInfo({
                status : RentFeeStatus.UN_PAY_RENT_FEE,
                rentFeeTotal : rentFee,
                createDate : 0,
                paymentDate : 0,
                waterMeterInfo : MeterInfo({
                    fee : 0,
                    lastMonthMeter : waterMeter,
                    currentMonthMeter : waterMeter,
                    currentMothUse : 0
                    }),
                electricityMeterInfo : MeterInfo({
                    fee : 0,
                    lastMonthMeter : electricityMeter,
                    currentMonthMeter : electricityMeter,
                    currentMothUse : 0
                    }),
                processed : false,
                ethRentFeeTotal : 0,
                oraclizeFee : 0,
                rentFeeCash : 0
                });
            updatePrice();
        } else {
            rentPaymentInfoMapping[currentStage] = RentPamentInfo({
                status : RentFeeStatus.UN_ADD_METER,
                rentFeeTotal : rentFee,
                createDate : 0,
                paymentDate : 0,
                waterMeterInfo : MeterInfo({
                    fee : 0,
                    lastMonthMeter : rentPaymentInfoMapping[currentStage - 1].waterMeterInfo.lastMonthMeter,
                    currentMonthMeter : waterMeter,
                    currentMothUse : 0
                    }),
                electricityMeterInfo : MeterInfo({
                    fee : 0,
                    lastMonthMeter : rentPaymentInfoMapping[currentStage - 1].electricityMeterInfo.lastMonthMeter,
                    currentMonthMeter : electricityMeter,
                    currentMothUse : 0
                    }),
                processed : false,
                ethRentFeeTotal : 0,
                oraclizeFee : 0,
                rentFeeCash : 0
                });
        }

    }

    //生成水表，电表   明细
    function generateMeter(uint _currentWaterMeter, uint _currentElectricityMeter)
    onlyRentContractParticipator
    isOwnCash(4)
    public {
        RentPamentInfo storage currentPaymentInfo = rentPaymentInfoMapping[currentStage];
        RentPamentInfo storage prevPamentInfo = rentPaymentInfoMapping[currentStage - 1];
        MeterInfo storage prevWaterMeterInfo = prevPamentInfo.waterMeterInfo;
        MeterInfo storage preElectricMeterInfo = prevPamentInfo.electricityMeterInfo;
        uint waterMeterCount = _currentWaterMeter - prevWaterMeterInfo.lastMonthMeter;
        uint electricMeterCount = _currentElectricityMeter - preElectricMeterInfo.lastMonthMeter;

        currentPaymentInfo.waterMeterInfo.currentMonthMeter = _currentWaterMeter;
        currentPaymentInfo.waterMeterInfo.fee = waterMeterCount * waterFee;
        currentPaymentInfo.waterMeterInfo.currentMothUse = waterMeterCount;

        currentPaymentInfo.electricityMeterInfo.currentMonthMeter = _currentElectricityMeter;
        currentPaymentInfo.electricityMeterInfo.fee = electricMeterCount * electricityFee;
        currentPaymentInfo.electricityMeterInfo.currentMothUse = electricMeterCount;
        currentPaymentInfo.status = RentFeeStatus.UN_PAY_RENT_FEE;
        rentPaymentInfoMapping[currentStage] = currentPaymentInfo;

        //水表电表录入之后就可以，查询当期那的人民币汇率，并计算出本期应交的租金的以太币
        updatePrice();
    }

    //获取租赁期间的租金明细信息
    function getRentPamentInfo(uint index)
    onlyRentContractParticipator
    view public returns (uint[5] rentFeeInfo, uint[4] waterInfo, uint[4] electricityinfo, RentFeeStatus _status){
        require(status != RentContractStatus.SIGNATURE_CONTRACT
        && status != RentContractStatus.PAYING_PLEDGE, "当前状态没有租金账单生成");
        RentPamentInfo memory info = rentPaymentInfoMapping[index];
        MeterInfo memory waterMeterInfo = info.waterMeterInfo;
        MeterInfo memory electricityMeterInfo = info.electricityMeterInfo;
        rentFeeInfo = [info.rentFeeTotal, info.ethRentFeeTotal, info.createDate, info.paymentDate, info.rentFeeCash];
        waterInfo = [waterMeterInfo.fee, waterMeterInfo.lastMonthMeter, waterMeterInfo.currentMonthMeter, waterMeterInfo.currentMothUse];
        electricityinfo = [electricityMeterInfo.fee, electricityMeterInfo.lastMonthMeter, electricityMeterInfo.currentMonthMeter, electricityMeterInfo.currentMothUse];
        _status = info.status;
    }

    //支付租金，仅租客操作，且当前阶段为PAYING_RENT  TODO
    function payRentFee(uint _stage)
    onlyTenant
    atRentFeeStage(_stage, RentFeeStatus.UN_PAY_RENT_FEE)
    payable public {
        if (msg.value != rentPaymentInfoMapping[_stage].ethRentFeeTotal) {
            emit RentFeeStatusEvent(msg.sender, rentPaymentInfoMapping[_stage].status,
                false, rentPaymentInfoMapping[_stage].rentFeeCash, "租金与应缴金额不一致");
            revert();
        }

        rentPaymentInfoMapping[_stage].rentFeeCash += msg.value;
        rentPaymentInfoMapping[_stage].ethRentFeeTotal -= msg.value;
        rentPaymentInfoMapping[_stage].status = RentFeeStatus.PAYED_RENT_FEE;
        rentPaymentInfoMapping[_stage].paymentDate = now;
        emit RentFeeStatusEvent(msg.sender, rentPaymentInfoMapping[_stage].status,
            true, rentPaymentInfoMapping[_stage].rentFeeCash, "已支付租金");
    }

    //房东从合约中取出金额,只允许房东操作
    function withdrawRentFee(uint _stage)
    onlyLandlord
    atRentFeeStage(_stage, RentFeeStatus.PAYED_RENT_FEE)
    payable public returns (bool){
        RentPamentInfo storage info = rentPaymentInfoMapping[_stage];
        uint _rentFeeCash = info.rentFeeCash;
        uint amount = _rentFeeCash;
        if (_rentFeeCash > 0) {
            info.rentFeeCash = 0;
            rentPaymentInfoMapping[_stage] = info;
            if (!msg.sender.send(amount)) {
                info.rentFeeCash = amount;
                rentPaymentInfoMapping[_stage] = info;
                emit RentFeeWithdrawalEvent(msg.sender, amount, false);
                return false;
            }
            rentPaymentInfoMapping[_stage].status = RentFeeStatus.WITHDRAW_RENT_FEE;
            emit RentFeeStatusEvent(msg.sender, rentPaymentInfoMapping[_stage].status,
                true, rentPaymentInfoMapping[_stage].rentFeeCash, "已取出押金");
            return true;
        } else {
            revert();
        }
    }

    //完成租金支付->改变合同状态为 WITHDRAWING_PLEDGE
    function completedRentFee()
    onlyRentContractParticipator
    atStage(RentContractStatus.PAYING_RENT) payable public
    {
        if (currentStage == rentTerm - 1) {
            for (uint i = 0; i <= currentStage; i++) {
                if (rentPaymentInfoMapping[i].status != RentFeeStatus.PAYED_RENT_FEE) {
                    emit ContractStatusEvent(msg.sender, status, false, "存在未支付租金");
                }
            }
        } else {
            emit ContractStatusEvent(msg.sender, status, false, "未到约定租期");
        }
        status = RentContractStatus.WITHDRAWING_PLEDGE;
        emit ContractStatusEvent(msg.sender, status, true, "修改成功");
    }

    //协商押金退回
    function judgeWithDrawalPledge(uint _amount)
    onlyLandlord
    atStage(RentContractStatus.WITHDRAWING_PLEDGE)
    atUnConfirmedStage() public {

        withDrawCashToLandlord = pledgeCash - _amount;
        withDrawCashToTenant = _amount;
        pledgeStatus = PledgeConfirm.CONFIRMING;
        emit PledgeWithdrawalStatusEvent(msg.sender, pledgeStatus, true, "修改状态等待租客确认");
    }

    //租客选择是否同意房东    退回的金额
    function isAgree(uint _agree)
    onlyTenant
    atStage(RentContractStatus.WITHDRAWING_PLEDGE)
    atUnConfirmedStage() public
    {
        if (_agree == 2) {
            pledgeStatus = PledgeConfirm.UN_ACCEPT;
            emit PledgeWithdrawalStatusEvent(msg.sender, pledgeStatus, false, "不接受房东退回的押金");
            emit ContractStatusEvent(msg.sender, status, false, "不接受房东退回的押金");
        } else if (_agree == 3) {
            pledgeStatus = PledgeConfirm.ACCEPT;
            status = RentContractStatus.COMPLETED;
            emit PledgeWithdrawalStatusEvent(msg.sender, pledgeStatus, true, "接受房东退回的押金");
            emit ContractStatusEvent(msg.sender, status, true, "租赁合同已完成");
        }
    }

    //房东从合同中取回金额
    function withdrawPledgeToLandlord()
    onlyLandlord
    atPledgeStageAccept
    atStage(RentContractStatus.WITHDRAWING_PLEDGE)
    payable public {
        uint amount = withDrawCashToLandlord;
        if (amount > 0) {
            withDrawCashToLandlord = 0;
            if (!msg.sender.send(amount)) {
                withDrawCashToLandlord = amount;
                emit PledgeWithdrawalEvent(msg.sender, withDrawCashToLandlord, false, "取出押金失败");
            }
            emit PledgeWithdrawalEvent(msg.sender, withDrawCashToLandlord, true, "取出押金成功");
        } else {
            revert();
        }
    }

    //租客从合同中取回金额
    function withdrawPledgeToTenant()
    onlyTenant
    atPledgeStageAccept
    payable public {
        uint amount = withDrawCashToTenant;
        if (amount > 0) {
            withDrawCashToTenant = 0;
            if (!msg.sender.send(amount)) {
                withDrawCashToTenant = amount;
                emit PledgeWithdrawalEvent(msg.sender, withDrawCashToTenant, false, "取出押金失败");
            }
            emit PledgeWithdrawalEvent(msg.sender, withDrawCashToTenant, true, "取出押金成功");
        } else {
            revert();
        }
    }

    // 退出合同中曾经激活所用的剩余的余额
    function withdrawActiveFee()
    atStage(RentContractStatus.COMPLETED)
    onlyLandlord payable public {
        uint amount = activeFee;
        if (amount > 0) {
            activeFee = 0;
            if (!msg.sender.send(amount)) {
                activeFee = amount;
                emit ActiveWithdrawalEvent(msg.sender, activeFee, false, "取出合同余额失败");
            }
            emit ActiveWithdrawalEvent(msg.sender, activeFee, true, "取出合同余额成功");
        } else {
            revert();
        }
    }

    //更细当前以太币 对应 的人名币价格，以及当前时间
    function updatePrice()
    internal {
        bytes32 priceId = oraclize_query(oraclizeType, priceUrl, oraclizeGas);
        bytes32 dateId = oraclize_query(oraclizeType, dateUrl, oraclizeGas);
        oraclizePriceValidIds[priceId] = true;
        oraclizeDateValidIds[dateId] = true;
    }

    //oraclize回调函数
    uint public flagCallback = 0;

    function __callback(bytes32 _myid, string _result) public {
        if (oraclizePriceValidIds[_myid]) {
            uint _waterFee = rentPaymentInfoMapping[currentStage].waterMeterInfo.fee;
            uint _electricityFee = rentPaymentInfoMapping[currentStage].electricityMeterInfo.fee;
            uint total = rentFee + (_waterFee + _electricityFee) / 10;
            uint price = parseInt(_result, 2);
            //保存人民币到分
            uint eth = 1 ether;
            uint totalFee = eth * total / price;
            delete oraclizePriceValidIds[_myid];
            rentPaymentInfoMapping[currentStage].ethRentFeeTotal = totalFee;
            flagCallback = flagCallback + 1;
            activeFee -= gasPrice * oraclizeGas;
        } else if (oraclizeDateValidIds[_myid]) {
            delete oraclizeDateValidIds[_myid];
            rentPaymentInfoMapping[currentStage].createDate = parseInt(_result);
            flagCallback = flagCallback + 1;
            activeFee -= gasPrice * oraclizeGas;
        } else if (oraclizeNextStage[_myid]) {
            //oraclize的延迟执行后执行 新增的租金明细，同时改变当前的租期
            delete oraclizeNextStage[_myid];
            currentStage = currentStage + 1;
            addRentPamentInfo();
            activeFee -= gasPrice * oraclizeGas * 2;
            emit OricalizeResponseEvent(_myid, _result, true);
        } else {
            revert();
        }
        if (flagCallback % 2 == 0) {
            //修改账单的状态
            rentPaymentInfoMapping[currentStage].status = RentFeeStatus.UN_PAY_RENT_FEE;
            rentPaymentInfoMapping[currentStage].processed = true;
            //创建完成  跟新下一阶段的时间   并通过oraclize的延迟查询操作，能够延迟到下个月租金账单的生成
            nextStageTime();
            emit RentFeeStatusEvent(msg.sender, rentPaymentInfoMapping[currentStage].status,
                true, rentPaymentInfoMapping[currentStage].rentFeeCash, "已抄表");
            emit OricalizeResponseEvent(_myid, _result, true);
        }
    }



    //获取下一阶段时间
    //获取下一阶段时间
    function nextStageTime() internal
    onlyRentContractParticipator {
        uint8 day = payRentDate;
        uint16 year = getYear(nextPayRentDate);
        uint8 month = getMonth(nextPayRentDate);
        // uint8 currentDate = getDay(nextPayRentDate);
        uint time;
        if (month == 12) {
            year = year + 1;
            month = 1;
        } else {
            month = month + 1;
        }
        if (month == 2) {
            if (year % 4 == 0) {
                if (day > 29) {
                    day = 29;
                    time = 60 * 60 * 24 * 29;
                }
            } else {
                if (day > 28) {
                    day = 28;
                    time = 60 * 60 * 24 * 28;
                }
            }
        } else if (month == 4 || month == 6 || month == 9 || month == 11) {
            if (day > 30) {
                day = 30;
                time = 60 * 60 * 24 * 30;
            }
        } else {
            time = 60 * 60 * 24 * 31;
        }
        // TODO
        if (currentStage < rentTerm - 1) {
            bytes32 dateId = oraclize_query(60 * 2, oraclizeType, dateUrl, oraclizeGas * 2);
            oraclizeNextStage[dateId] = true;
            nextPayRentDate = toTimestamp(year, month, day);
        } else {
            nextPayRentDate = 0;
        }
    }

    //向合同转账 的回调函数
    function() payable public {
        emit PayEtherEvent(msg.sender, msg.value, true, "已支付到合同call_back");
    }

    //租客条件限制
    modifier onlyTenant(){
        require(address(msg.sender) == tenantPublicKey, "只有租客才能操作");
        _;
    }

    //房东条件限制
    modifier onlyLandlord(){
        require(address(msg.sender) == landlordPublicKey, "只有房东才能操作");
        _;
    }

    //房东，租客条件限制
    modifier onlyRentContractParticipator(){
        require(address(msg.sender) == landlordPublicKey
        || address(msg.sender) == tenantPublicKey, "你不是该合同的参与者");
        _;
    }

    //租赁合同位于哪个阶段
    modifier atStage(RentContractStatus _status){
        require(status == _status, "该操作不符合当前状态");
        _;
    }

    //房租状态位于哪个阶段
    modifier atRentFeeStage(uint _stage, RentFeeStatus _status){
        require(rentPaymentInfoMapping[_stage].status == _status, "该操作不符合当前状态");
        _;
    }

    //押金退回正在确认
    modifier atUnConfirmedStage(){
        require(PledgeConfirm.ACCEPT != pledgeStatus, "该操作不符合当前状态");
        _;
    }

    //押金退回双方达成一致
    modifier atPledgeStageAccept(){
        require(PledgeConfirm.ACCEPT == pledgeStatus, "双方未达成一致不能取款");
        _;
    }

    //合同中是否拥有现金，在需要执行oricalize的地方调用该限制
    modifier isOwnCash(uint count){
        _;
        if (activeFee < (count * oraclizeGas * gasPrice)) {
            emit OricalizeLogEvent(msg.sender, count * oraclizeGas * gasPrice, activeFee, "当前账户余额不足,请向合约向转账");
            revert();
        }

    }

    //获取合同当前余额
    address s = address(this);

    function getBalance() public view returns (uint) {
        return s.balance;
    }

}