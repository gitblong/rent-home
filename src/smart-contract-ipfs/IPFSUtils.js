import {bytesToStringArray, Uint8ArrayToString, isEmpty} from "../Utils/util";


export class IPFSUtils {

    constructor(ipfs, drizzle) {
        this.ipfs = ipfs;
        this.drizzleState = drizzle.store.getState();
        this.drizzle = drizzle;
        this.houseInfoContract = drizzle.contracts.HouseInfo;
        this.allHouseInfo = [];
        this.domain = "http://localhost:8080/ipfs/";
        this.houseInfoByCondtion = [];
        this.loading = true;
        this.landlordHouseLength = 0;
    }

    setAllHouseInfo = data => {
        this.allHouseInfo = data;
    };

    getShowHouseInfoCount = () => {
        return new Promise(resolve => {
            this.houseInfoContract.methods.showHouseInfoCount().call()
                .then(result => {
                    resolve(result);
                })
        })
    }

    updateHouseStatus = (_status, _index) => {
        console.log(_status, _index);
        return this.houseInfoContract.methods.updateHouseStatus(_status, _index).send({
            from: this.drizzleState.accounts[0],
            gas: '100000'
        });

    };
    /**
     * 根据条件获取房东拥有的房源
     * @param data
     * @param value
     * @returns {Promise<any>}
     */
    getLandlordHouseInfoByCondition = (data, value) => {
        let arr = [];
        console.log(value);
        return new Promise(resolve => {
            let addressFlag = true;
            let estatNameFlag = true;
            data.map((obj, index) => {
                const houseDetailInfo = obj.houseDetailInfo;
                if (!isEmpty(value)) {

                    addressFlag = houseDetailInfo.locationInfo.detailAddress.indexOf(value) != -1;
                    estatNameFlag = houseDetailInfo.locationInfo.estatName.indexOf(value) != -1;
                }
                // console.log(addressFlag || estatNameFlag, addressFlag, estatNameFlag);
                if (addressFlag || estatNameFlag) {
                    arr.push(obj);
                }
                if (index == data.length - 1) {
                    resolve(arr);
                }
            });
        });
    };

    /**
     * 获取房东所有房源
     * @returns {Promise<any>}
     */
    getLandlordHouseInfo = () => {
        return new Promise(resolve => {

            this.houseInfoContract.methods.getLandlordHouseLength().call()
                .then(result => {
                    // console.log(result, "getLandlordHosuelENGTH")
                    this.landlordHouseLength = result;
                    resolve(this.getLandlordHouseInfoData(result));
                })
        })
    };
    /**
     * 获取智能合约中所有房源信息
     * @param count
     * @returns {Promise<any>}
     */
    getLandlordHouseInfoData = (count) => {
        let arr = [];
        // console.log("?????------" + count);
        return new Promise(resolve => {
            if (isEmpty(count) || count <= 0) {
                resolve([]);
                return;
            }
            // console.log("?????------" + count);
            for (let i = 0; i < count; i++) {
                this.houseInfoContract.methods.getLandlordHouseInfo(i).call()
                    .then(result => {
                        let obj = {
                            houseDetailhash: result[0],
                            index: result[1],
                            houseStatus: result[2]

                        };
                        arr.push(obj);
                        if (arr.length == count) {
                            resolve(this.parseLandlordInfo(arr));
                        }
                    })
            }

        });
    };

    /**
     * 通过hash从ipfs中获取房源信息
     * @param data
     * @returns {Promise<any>}
     */
    parseLandlordInfo = (data) => {
        let arr = [];
        // console.log(data)
        return new Promise(resolve => {
            if (isEmpty(data) || data.length <= 0) {
                resolve([]);
            }
            data.map((obj, index) => {
                this.catFromIpfs(obj.houseDetailhash).then(result => {
                    obj.houseDetailInfo = result;
                    arr.push(obj);
                    if (arr.length == data.length) {
                        resolve(arr)
                    }
                });
            });
        });
    };

    /**
     * 添加房源到智能合约
     * @param hash
     * @returns {Promise<any>}
     */
    addHashToHouseInfoContracts = (hash) => {
        return new Promise(resolve => {
            if (!isEmpty(hash)) {
                this.houseInfoContract.methods.addHouseInfo(hash).send({from: this.drizzleState.accounts[0]})
                    .then(response => {
                        // console.log(response.status);
                    })
            }
        })
    };

    /**
     * 初始化智能合约中存储的所有房源
     * @returns {Promise<any>}
     */
    init = () => {
        return new Promise((resolve, reject) => {
            let obj;
            this.houseInfoContract.methods.showHouseInfoCount().call()
                .then(result => {
                    if (result <= 0) {
                        resolve(obj);
                        return;
                    }
                    this.showHouseInfoCount = result;
                    obj = this.houseHashArr(result);
                    if (obj != undefined || obj != null) {
                        resolve(obj);
                    }
                });
        });
    };
    /**
     * 从智能合约中获得所有房源的Hash
     * @param showHouseInfoCount
     * @returns {Promise<any>}
     */
    houseHashArr = (showHouseInfoCount) => {
        let houseHashArr = [];
        return new Promise((resolve, reject) => {
            let obj;
            this.houseInfoContract.methods.getHouseData(0, showHouseInfoCount).call()
                .then(result => {
                    // console.log(result)
                    houseHashArr = bytesToStringArray(result);
                    obj = this.parseHouseInfoArr(houseHashArr);
                    if (obj == undefined || obj != null) {
                        resolve(obj);
                    }
                });
        })
    };

    /**
     * 通过hash向IPFS中获取json对象
     * @param houseHashArr
     * @returns {Promise<any>}
     */
    parseHouseInfoArr = (houseHashArr) => {
        let arr = [];
        return new Promise(resolve => {

            if (isEmpty(houseHashArr) || houseHashArr.length == 0) {
                resolve([]);
            }
            houseHashArr.map((obj, index) => {
                this.catFromIpfs(obj).then(result => {
                    arr.push(result);
                    if (arr.length == houseHashArr.length) {
                        resolve(arr);
                    }
                });
            });
        });
    };

    /**
     * 获取所有房源数量
     * @returns {Array|*}
     */
    getAllHouseInfo() {
        return this.allHouseInfo;
    }

    /**
     * 根据index获取房源的详情页
     * @param index
     * @returns {*}
     */
    getHouseDetailByIndex(index) {
        return this.houseInfoByCondtion[index];
    }

    /**
     * 根据条件获取房源信息
     * @param allHouseInfo
     * @param cityCode
     * @param areaCode
     * @param streetCode
     * @param rentType
     * @param houseType
     * @param rentFee
     * @param searchValue
     * @returns {Promise<any>}
     */
    getHouseInfoByCondition = (allHouseInfo, cityCode, areaCode, streetCode,
                               rentType, houseType, rentFee, searchValue) => {
        console.log(cityCode, areaCode, streetCode,
            rentType, houseType, rentFee, searchValue);
        let cityCodeFlag = true, areaCodeFlag = true, streetCodeFlag = true,
            rentTypeFlag = true, houseTypeFlag = true, houseAppreaciationFlag = true,
            rentFeeFlag = true, searchValueFlag = true;
        let i = 1;
        let arr = [];
        return new Promise((resolve, reject) => {
            if (isEmpty(allHouseInfo) || allHouseInfo.length <= 0) {
                resolve([]);
                return;
            }
            allHouseInfo.map((obj, index) => {
                let locationInfo = obj.locationInfo;
                if (!isEmpty(cityCode)) {
                    let streetInfo = locationInfo.streetInfo;
                    cityCodeFlag = streetInfo.cityCode == cityCode;
                }
                if (!isEmpty(areaCode)) {
                    let streetInfo = locationInfo.streetInfo;
                    areaCodeFlag = streetInfo.areaCode == areaCode;
                }
                if (!isEmpty(streetCode)) {
                    let streetInfo = locationInfo.streetInfo;
                    streetCodeFlag = streetInfo.name == streetCode;
                }
                if (!isEmpty(rentFee)) {
                    const split = rentFee.split("-");

                    rentFeeFlag = parseInt(obj.rentFee) > parseInt(split[0]) && obj.rentFee < parseInt(split[1]);
                }
                if (!isEmpty(rentType)) {
                    rentTypeFlag = obj.rentType.type == rentType;
                }
                if (!isEmpty(houseType)) {
                    houseTypeFlag = obj.houseType.type == houseType;
                }
                if (!isEmpty(searchValue)) {

                    const searchValueFlag1 = obj.locationInfo.estatName.indexOf(searchValue) != -1;
                    // console.log(searchValueFlag1);
                    searchValueFlag = searchValueFlag1
                }

                let isTure = cityCodeFlag && areaCodeFlag && streetCodeFlag
                    && rentTypeFlag && houseTypeFlag && houseAppreaciationFlag
                    && rentFeeFlag && searchValueFlag;
                if (isTure) {
                    i++;
                    arr.push(obj);
                }
                if (index == allHouseInfo.length - 1) {
                    resolve(arr);
                }
            });

        });
    };

    /**
     *分页信息
     */
    getPageInfo(data, page, pageSize) {
        if (data.length == 0) {
            return {
                total: 0,
                pageCount: 0,
                data: []
            }
        }
        // console.log("..........", data.length, page, pageSize);
        let _from = (page - 1) * pageSize;
        let _to = page * pageSize > data.length ?
            data.length : page * pageSize;

        return {
            total: data.length,
            pageCount: Math.ceil(data.length / pageSize),
            data: data.slice(_from, _to)
        }
    }

    /**
     * 添加到ipfs
     * @param content
     * @returns {Promise<any>}
     */
    addToIpfs = (content) => {
        let ipfs = this.ipfs;
        // console.log(ipfs, this.drizzle);
        return new Promise((resolve, reject) => {
            ipfs.add(content).then((response) => {
                resolve(response[0].hash);
            }).catch((err) => {
                reject(err);
            });
        });
    };

    /**
     * 通过hash向IPFS中获取值
     * @param hash
     * @returns {Promise<any>}
     */
    catFromIpfs = hash => {
        return new Promise((resolve, reject) => {
            this.ipfs.files.cat(hash, (err, data) => {
                if (err) {
                    reject(err);
                    throw err;
                }
                resolve(JSON.parse(Uint8ArrayToString(data)));
            });
        });
    }

}