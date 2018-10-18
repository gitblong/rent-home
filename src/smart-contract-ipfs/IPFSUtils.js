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
    }

    setAllHouseInfo = data => {
        this.allHouseInfo = data;
    };

    addHashToHouseInfoContracts = (hash) => {
        return new Promise(resolve => {
            if (!isEmpty(hash)) {
                this.houseInfoContract.methods.addHouseInfo(hash).send({from: this.drizzleState.accounts[0]})
                    .then(response => {
                        console.log(response.status);
                    })
            }
        })
    }

    init = () => {

        return new Promise((resolve, reject) => {
            let obj;
            //TODO
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

    parseHouseInfoArr = (houseHashArr) => {
        let arr = [];
        return new Promise(resolve => {

            houseHashArr.map((obj, index) => {
                this.catFromIpfs(obj).then(result => {
                    arr.push(result);
                    if (arr.length == houseHashArr.length) {
                        resolve(arr);
                    }
                });
            });
            if (houseHashArr.length == 0) {
                resolve([]);
            }
        });
    };

    getAllHouseInfo() {
        return this.allHouseInfo;
    }

    getHouseDetailByIndex(index) {
        return this.houseInfoByCondtion[index];
    }

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
            if (isEmpty(allHouseInfo)) {
                resolve([]);
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
                    console.log(searchValueFlag1);
                    searchValueFlag = searchValueFlag1
                }

                let isTure = cityCodeFlag && areaCodeFlag && streetCodeFlag
                    && rentTypeFlag && houseTypeFlag && houseAppreaciationFlag
                    && rentFeeFlag && searchValueFlag;
                if (isTure) {
                    i++;
                    arr.push(obj);
                }
                if (index == allHouseInfo.length - 5) {
                    resolve(arr);
                }
            });

        });
    };

    //分页信息
    getPageInfo(data, page, pageSize) {
        // console.log("..........", data.length, page, pageSize);
        let _from = (page - 1) * pageSize;
        let _to = page * pageSize > data.length ?
            this.showHouseInfoCount : page * pageSize;
        if (data.length == 0) {
            return {
                total: 0,
                pageCount: 0,
                data: []
            }
        }
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