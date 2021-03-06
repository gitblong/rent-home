pragma solidity ^0.4.0;

import './RentContract.sol';

//gas:6523956
contract RentContractProducter{
    event CreateRentContractEvent(address sender,bool success,address contractAddress,string info);
    address owner;
    constructor() public{
        owner = msg.sender;
    }


    function getCount() view public returns(uint) {
        return userRentContract[msg.sender].length;
    }

    mapping(address => RentContract[]) public userRentContract;
    //gas:4543967
    function createRentContract(uint _waterMeter, uint _waterFee, uint _electricityMeter,
        uint _electricityFee, uint _rentFee, uint _rentTerm, uint _pledgeTotal,
        uint256 _startTime, uint256 _endTime, address _tenantPublicKey,
        bytes _baseInfoJson) payable public{
        //oricalize
        address currentUser = msg.sender;

        if(!(_waterMeter > 0 && _waterFee > 0 && _electricityMeter > 0 && _electricityFee > 0
        && _rentFee > 0 && _rentTerm > 0 && _pledgeTotal > 0
        && _startTime > 0 && _endTime > 0 && _tenantPublicKey != address(0)
        && _baseInfoJson.length > 0)){
            emit CreateRentContractEvent(currentUser,false,address(0),"参数存储在空值");
        }

        RentContract rentContract = new RentContract(_waterMeter, _waterFee, _electricityMeter,
            _electricityFee, _rentFee, _rentTerm, _pledgeTotal,
            _startTime, _endTime, _tenantPublicKey,currentUser, _baseInfoJson);

        userRentContract[currentUser].push(rentContract);
        userRentContract[_tenantPublicKey].push(rentContract);
        emit CreateRentContractEvent(currentUser,true,address(rentContract),"创建成功");
    }
}