


function getArr(length){
    let arr = [];
    for(var i=1;i<=length;i++){
        arr.push(i);
    }
    return arr;
}
export default {
    houseType: [
        {
            type: "整租",
            typeId: 0
        },
        {
            type: "合租",
            typeId: 1
        }
    ],
    rentType: [
        {
            type: "非转租",
            typeId: 0
        },
        {
            type: "转租",
            typeId: 1
        },
    ],
    isOwnLiftType: [
        {
            type: "无电梯",
            typeId: 0
        },
        {
            type: "有电梯",
            typeId: 1
        },
    ],
    houseFloor: {
        totalLevel: getArr(100),
        currentLevel: getArr(100)
    },
    houseAppreciation: {
        room: getArr(10),
        hall: getArr(10),
        toilet: getArr(10)
    },
    houseArea: "13",
    houseOrientation: [
        {
            typeId: 0,
            type: "朝北"
        },
        {
            typeId: 1,
            type: "朝南"
        },
        {
            typeId: 2,
            type: "朝西"
        },
        {
            typeId: 3,
            type: "朝东"
        },
        {
            typeId: 4,
            type: "朝西北"
        },
        {
            typeId: 5,
            type: "朝东北"
        },
        {
            typeId: 6,
            type: "朝东南"
        },
        {
            typeId: 7,
            type: "朝西南"
        },
    ],
    decorateLevel: [
        {
            typeIndex: 0,
            type: "简装修"
        },
        {
            typeIndex: 1,
            type: "普通装修"
        },
        {
            typeIndex: 2,
            type: "精装修"
        }
    ],
    payType: {
        cashPledgeNum: getArr(3),
        cashPayNum: getArr(3)
    },
    locationName: "浙江省杭州市西湖区古荡街道嘉禾花苑88号",
    rentFee: 1800,
    houseEquipment: [
        {
            value: 'ari',
            name: '空调',
            checked: false,
        },
        {
            value: 'balcony',
            name: '阳台',
            checked: false,
        },
        {
            value: "broadband",
            name: '宽度',
            checked: false,
        },
        {
            value: "desk",
            name: '写字桌',
            checked: false,
        },
        {
            value: "doubleBeb",
            name: '双人床',
            checked: false,
        },
        {
            value: "dresser",
            name: '梳妆台',
            checked: false,
        },
        {
            value: "kitchen",
            name: '厨房',
            checked: false,
        },
        {
            value: "refrigerator",
            name: '冰箱',
            checked: false,
        },
        {
            value: "singleBel",
            name: '单人床',
            checked: false,
        },
        {
            value: 'soft',
            name: '沙发',
            checked: false,
        },
        {
            value: "toilet",
            name: '卫生间',
            checked: false,
        },
        {
            value: 'tv',
            name: '电视机',
            checked: false,
        },
        {
            value: 'washing-machine',
            name: '洗衣机',
            checked: false,
        },
        {
            value: 'water-heater',
            name: '热水器',
            checked: false,
        },
        {
            value: 'window',
            name: '飘窗',
            checked: false,
        },
    ],
    detailInfo: {
        houseType: {
            typeId: 0,
            type: "整租"
        },
        rentType: {
            typeId: 0,
            type: "非转租"
        },
        isOwnLiftType: {
            typeId: 0,
            type: "无电梯"
        },
        houseFloor: {
            totalLevel: 100,
            currentLevel: 3
        },
        houseAppreciation: {
            room: 10,
            hall: 10,
            toilet: 5
        },
        houseArea: "12",
        houseOrientation: {
            typeId: 1,
            type: "朝南"
        },
        decorateLevel: {
            typeId: 2,
            type: '简装修'
        },
        payType: {
            cashPledgeNum: 1,
            cashPayNum: 1
        },
        rentFee: 1800,
        locationInfo: {
            houseNum: "14幢1单元",
            estatName: "嘉禾花苑",
            streetInfo: {
                areaCode:"",
                cityCode:"",
                code:"",
                name:"",
                provinceCode:"",
            },
            lng: 120.097062,//经度
            lat: 30.272186,//纬度
            detailAddress: "浙江省杭州市西湖区古荡街道嘉禾花苑88号"
        },
        telephone: "13763382916",
        houseEquipment: [
        ],
        detailIntroduce: "欢迎入住",
        imageArr: []
    }
}

