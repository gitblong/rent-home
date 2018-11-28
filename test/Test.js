//部署合同
var rentContractProducter;
RentContractProducter.deployed().then(instance => rentContractProducter = instance);
//创建租赁合同
var crateContractResult;
rentContractProducter.createRentContract(93000, 150000, 500, 120, 180000, 2, 180000, 1541312700, 1541313000, 0x1ab8f139e687bf2ca7b998b888bcf2621d48be07, 0x123).then(result => {
    crateContractResult = result;
});

var rentContractAbi = [{
    "constant": true,
    "inputs": [],
    "name": "pledgeStatus",
    "outputs": [{"name": "", "type": "uint8"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "status",
    "outputs": [{"name": "", "type": "uint8"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "withDrawCashToTenant",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "nextPayRentDate",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "", "type": "bytes32"}],
    "name": "oraclizeDateValidIds",
    "outputs": [{"name": "success", "type": "bool"}, {"name": "stage", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "timestamp", "type": "uint256"}],
    "name": "getHour",
    "outputs": [{"name": "", "type": "uint8"}],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "timestamp", "type": "uint256"}],
    "name": "getWeekday",
    "outputs": [{"name": "", "type": "uint8"}],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "", "type": "uint256"}],
    "name": "rentPaymentInfoMapping",
    "outputs": [{"name": "status", "type": "uint8"}, {"name": "rentFeeTotal", "type": "uint256"}, {
        "name": "createDate",
        "type": "uint256"
    }, {"name": "paymentDate", "type": "uint256"}, {
        "components": [{
            "name": "fee",
            "type": "uint256"
        }, {"name": "lastMonthMeter", "type": "uint256"}, {
            "name": "currentMonthMeter",
            "type": "uint256"
        }, {"name": "currentMothUse", "type": "uint256"}], "name": "waterMeterInfo", "type": "tuple"
    }, {
        "components": [{"name": "fee", "type": "uint256"}, {
            "name": "lastMonthMeter",
            "type": "uint256"
        }, {"name": "currentMonthMeter", "type": "uint256"}, {"name": "currentMothUse", "type": "uint256"}],
        "name": "electricityMeterInfo",
        "type": "tuple"
    }, {"name": "processed", "type": "bool"}, {"name": "ethRentFeeTotal", "type": "uint256"}, {
        "name": "oraclizeFee",
        "type": "uint256"
    }, {"name": "rentFeeCash", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "currentStage",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "year", "type": "uint16"}, {"name": "month", "type": "uint8"}, {
        "name": "day",
        "type": "uint8"
    }, {"name": "hour", "type": "uint8"}, {"name": "minute", "type": "uint8"}],
    "name": "toTimestamp",
    "outputs": [{"name": "timestamp", "type": "uint256"}],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "timestamp", "type": "uint256"}],
    "name": "getDay",
    "outputs": [{"name": "", "type": "uint8"}],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "", "type": "bytes32"}],
    "name": "oraclizePriceValidIds",
    "outputs": [{"name": "success", "type": "bool"}, {"name": "stage", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "", "type": "bytes32"}],
    "name": "oraclizeNextStage",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "withDrawCashToLandlord",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "year", "type": "uint16"}, {"name": "month", "type": "uint8"}, {
        "name": "day",
        "type": "uint8"
    }, {"name": "hour", "type": "uint8"}],
    "name": "toTimestamp",
    "outputs": [{"name": "timestamp", "type": "uint256"}],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "activeFee",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "timestamp", "type": "uint256"}],
    "name": "getSecond",
    "outputs": [{"name": "", "type": "uint8"}],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "year", "type": "uint16"}, {"name": "month", "type": "uint8"}, {
        "name": "day",
        "type": "uint8"
    }],
    "name": "toTimestamp",
    "outputs": [{"name": "timestamp", "type": "uint256"}],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "flagCallback",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "year", "type": "uint16"}, {"name": "month", "type": "uint8"}, {
        "name": "day",
        "type": "uint8"
    }, {"name": "hour", "type": "uint8"}, {"name": "minute", "type": "uint8"}, {"name": "second", "type": "uint8"}],
    "name": "toTimestamp",
    "outputs": [{"name": "timestamp", "type": "uint256"}],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "timestamp", "type": "uint256"}],
    "name": "getYear",
    "outputs": [{"name": "", "type": "uint16"}],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "pledgeCash",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "timestamp", "type": "uint256"}],
    "name": "getMonth",
    "outputs": [{"name": "", "type": "uint8"}],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "year", "type": "uint16"}],
    "name": "isLeapYear",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "year", "type": "uint256"}],
    "name": "leapYearsBefore",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "month", "type": "uint8"}, {"name": "year", "type": "uint16"}],
    "name": "getDaysInMonth",
    "outputs": [{"name": "", "type": "uint8"}],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "rentFeeCash",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "timestamp", "type": "uint256"}],
    "name": "getMinute",
    "outputs": [{"name": "", "type": "uint8"}],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
}, {
    "inputs": [{"name": "_waterMeter", "type": "uint256"}, {
        "name": "_waterFee",
        "type": "uint256"
    }, {"name": "_electricityMeter", "type": "uint256"}, {
        "name": "_electricityFee",
        "type": "uint256"
    }, {"name": "_rentFee", "type": "uint256"}, {"name": "_rentTerm", "type": "uint256"}, {
        "name": "_pledgeTotal",
        "type": "uint256"
    }, {"name": "_startTime", "type": "uint256"}, {"name": "_endTime", "type": "uint256"}, {
        "name": "_tenantPublicKey",
        "type": "address"
    }, {"name": "_landlorPublickey", "type": "address"}, {"name": "_baseInfoJson", "type": "bytes"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {"payable": true, "stateMutability": "payable", "type": "fallback"}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "", "type": "address"}, {
        "indexed": false,
        "name": "",
        "type": "uint256"
    }, {"indexed": false, "name": "", "type": "bool"}, {"indexed": false, "name": "", "type": "string"}],
    "name": "PayEtherEvent",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "", "type": "address"}, {
        "indexed": false,
        "name": "",
        "type": "uint256"
    }, {"indexed": false, "name": "", "type": "uint256"}, {"indexed": false, "name": "", "type": "string"}],
    "name": "OricalizeLogEvent",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "", "type": "address"}, {
        "indexed": false,
        "name": "",
        "type": "uint256"
    }, {"indexed": false, "name": "", "type": "bool"}],
    "name": "RentFeeWithdrawalEvent",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "", "type": "address"}, {
        "indexed": false,
        "name": "",
        "type": "uint256"
    }, {"indexed": false, "name": "", "type": "bool"}, {"indexed": false, "name": "", "type": "string"}],
    "name": "PledgeWithdrawalEvent",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "", "type": "address"}, {
        "indexed": false,
        "name": "",
        "type": "uint256"
    }, {"indexed": false, "name": "", "type": "bool"}, {"indexed": false, "name": "", "type": "string"}],
    "name": "ActiveWithdrawalEvent",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "", "type": "address"}, {
        "indexed": false,
        "name": "",
        "type": "uint8"
    }, {"indexed": false, "name": "", "type": "bool"}, {"indexed": false, "name": "", "type": "string"}],
    "name": "ContractStatusEvent",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "", "type": "address"}, {
        "indexed": false,
        "name": "",
        "type": "uint8"
    }, {"indexed": false, "name": "", "type": "bool"}, {
        "indexed": false,
        "name": "",
        "type": "uint256"
    }, {"indexed": false, "name": "", "type": "string"}],
    "name": "RentFeeStatusEvent",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "", "type": "address"}, {
        "indexed": false,
        "name": "",
        "type": "uint8"
    }, {"indexed": false, "name": "", "type": "bool"}, {"indexed": false, "name": "", "type": "string"}],
    "name": "PledgeWithdrawalStatusEvent",
    "type": "event"
}, {
    "constant": true,
    "inputs": [],
    "name": "getRentContractInfo",
    "outputs": [{"name": "_tenantPublicKey", "type": "address"}, {
        "name": "_landlorPublickey",
        "type": "address"
    }, {"name": "_baseInfoJson", "type": "bytes"}, {"name": "_status", "type": "uint8"}, {
        "name": "uintArr",
        "type": "uint256[13]"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "activeContract",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "signatrueContractByTenant",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "payPledge",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_stage", "type": "uint256"}, {
        "name": "_currentWaterMeter",
        "type": "uint256"
    }, {"name": "_currentElectricityMeter", "type": "uint256"}],
    "name": "generateMeter",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "index", "type": "uint256"}],
    "name": "getRentPamentInfo",
    "outputs": [{"name": "rentFeeInfo", "type": "uint256[5]"}, {
        "name": "waterInfo",
        "type": "uint256[4]"
    }, {"name": "electricityinfo", "type": "uint256[4]"}, {"name": "_status", "type": "uint8"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_stage", "type": "uint256"}],
    "name": "payRentFee",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_stage", "type": "uint256"}],
    "name": "withdrawRentFee",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "completedRentFee",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_amount", "type": "uint256"}],
    "name": "judgeWithDrawalPledge",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_agree", "type": "uint256"}],
    "name": "isAgree",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "withdrawPledgeToLandlord",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "withdrawPledgeToTenant",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "withdrawActiveFee",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_myid", "type": "bytes32"}, {"name": "_result", "type": "string"}],
    "name": "__callback",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "myid", "type": "bytes32"}, {"name": "result", "type": "string"}, {
        "name": "proof",
        "type": "bytes"
    }],
    "name": "__callback",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}];

//私钥创建账户
web3.eth.accounts.privateKeyToAccount("0xb1fd11340d57055f5b3484aa1ec472ec0b3a67633b4345c0d752e2a166220177");
//设置默认地址
web3.eth.defaultAccount=web3.eth.coinbase;
//使用租赁合同 0x1f4d7854e63a57634085c2b5966086ca61d91790
//0.20的使用方式
var rentContract = web3.eth.contract(rentContractAbi);
var rentContractInstance = rentContract.at("0x41367e12e6c7a09017bb90e822ea0f2d4cbae26a");
rentContractInstance.activeContract().send({from: account1, value: 100000000000});