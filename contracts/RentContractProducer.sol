pragma solidity ^0.4.0;

import './RentContract.sol';

//gas:6523956
contract RentContractProducter{

    address owner;
    constructor() public{
        owner = msg.sender;
    }

    mapping(address => RentContract[]) public userRentContract;

    //gas:4543967
    function createRentContract(uint _waterMeter, uint _waterFee, uint _electricityMeter,
        uint _electricityFee, uint _rentFee, uint _payRentDate, uint _rentTerm, uint _pledgeTotal,
        uint256 _startTime, uint256 _endTime, address _tenantPublicKey,
        bytes _baseInfoJson) public{
        //oricalize
        address currentUser = msg.sender;

        require(_waterMeter > 0 && _waterFee > 0 && _electricityMeter > 0 && _electricityFee > 0
        && _rentFee > 0 && _payRentDate > 0 && _rentTerm > 0 && _pledgeTotal > 0
        && _startTime > 0 && _endTime > 0 && _tenantPublicKey != address(0)
        && _baseInfoJson.length > 0, "参数存在空值");

        RentContract rentContract = new RentContract(_waterMeter, _waterFee, _electricityMeter,
            _electricityFee, _rentFee, _payRentDate, _rentTerm, _pledgeTotal,
            _startTime, _endTime, _tenantPublicKey,currentUser, _baseInfoJson);

        userRentContract[currentUser].push(rentContract);
    }
}