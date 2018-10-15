pragma solidity ^0.4.0;

import "./ArrayStorage.sol";
contract HouseInfo is ArrayStorage{
    //房源的状态，下架，发布，已出租
    enum HouseStatus{
        HiddenHouse, ShowHouse,HasRented
    }
    //房源的信息结构，IPFS的Hash值，房源的状态，房源的下标
    struct HouseDetail {
        string houseDetailHash;
        HouseStatus status;
        uint index;
    }
    //用户的房源，根据用户的地址，以数组的形式存储HouseDetail元素
    mapping(address => HouseDetail[]) public landlordHouse;
    //发布该合同的用户
    address public owner;
    //所有的房源信息数量
    uint256 public houseInfoTotal;
    //所有ShowHouse状态的房源
    uint256 public showHouseInfoCount;
    //所有的房源信息
    HouseDetail[] public houseDatas ;
    constructor() public{
        houseInfoTotal = 0;
        showHouseInfoCount = 0;
        owner = msg.sender;
    }
    //更新房源的状态
    function updateHouseStatus(uint _status,uint _index) public payable{
        //对存入参数进行筛选
        require(_status==0||_status==1||_status==2,"无该房源状态");
        require(landlordHouse[msg.sender].length>_index,"数组下标越界");
        HouseDetail memory hoseDetail = landlordHouse[msg.sender][_index];
        HouseStatus status;
        if(_status == 0){
            status = HouseStatus.HiddenHouse;
            //当用户选择隐藏房源时，ShouwHouse状态的房源数量-1
            showHouseInfoCount--;
        }else if(_status == 1){
            status = HouseStatus.ShowHouse;
            //当用户选择隐藏房源时，ShouwHouse状态的房源数量+1
            showHouseInfoCount++;
        }else if(_status == 2){
            status = HouseStatus.HasRented;
            //当用户选择隐藏房源时，ShouwHouse状态的房源数量-1
            showHouseInfoCount--;
        }
        //若用户原房源的状态与更新状态相投，则返回
        require(hoseDetail.status != status,"与当前house状态一致");
        //修改房东房源状态
        landlordHouse[msg.sender][_index].status = status;
        //修改所有房源状态
        houseDatas[hoseDetail.index].status = status;
    }

    //添加新的房源
    function addHouseInfo(string hash) public payable {
        houseDatas.push(HouseDetail({
            houseDetailHash:hash,
            status:HouseStatus.ShowHouse,
            index:houseInfoTotal
            }));
        landlordHouse[msg.sender].push(HouseDetail({
            houseDetailHash : hash,
            status : HouseStatus.ShowHouse,
            index:houseInfoTotal
            }));
        houseInfoTotal = houseInfoTotal + 1;
        showHouseInfoCount = showHouseInfoCount + 1;
    }

    //获取房东的房源数量
    function getLandlordHouseLength() public view returns(uint){
        return landlordHouse[msg.sender].length;
    }

    //根据下标获取房东的房源信息
    function getLandlordHouseInfo(uint _index) public view  returns(string,uint,HouseStatus){
        require(landlordHouse[msg.sender].length>_index,"数组下标越界");
        HouseDetail[] memory houseArr = landlordHouse[msg.sender];
        HouseDetail memory _houseDetail = houseArr[_index];
        return (_houseDetail.houseDetailHash,_houseDetail.index,_houseDetail.status);
    }

    //获取所有的ShowHouse状态的所有房源信息
    function getHouseData(uint256 _from, uint256 _to) public constant returns(bytes){
        require(_from >= 0 && _to >= _from && showHouseInfoCount >= _to,"传参有误");
        string memory houseHash;
        string[] memory houseHashArr = new string[](showHouseInfoCount);
        uint _int = 0;
        for(uint256 i=0;i<houseDatas.length;i++){
            houseHash = houseDatas[i].houseDetailHash;
            if(houseDatas[i].status == HouseStatus.ShowHouse){
                houseHashArr[_int]=houseHash;
                _int++;
            }
        }
        return getAsBytes(houseHashArr,_from,_to);
    }

}