import {bytesToStringArray, Uint8ArrayToString, isEmpty} from "../Utils/util";
import React from 'react';

export class HouseInfoContract extends React.Component {

    state = {
        ipfs: ipfs,
        drizzle: drizzle,
        drizzleState: drizzle.store.getState(),
        houseInfoContract: drizzle.contracts.HouseInfo,
        allHouseInfo: [],
        domain: "http://localhost:8080/ipfs/",
        houseInfoByCondtion: [],
        loading: true

    };

    constructor(props) {
        super(props);

    };

    componentDidMount() {
        let houseInfoContract = this.props.drizzle.contracts.HouseInfo;
        //TODO
        let arr = [];
        houseInfoContract.methods.showHouseInfoCount().call()
            .then(result => {
                this.showHouseInfoCount = result;
                if (result != 0 && result != null && result != undefined) {
                    houseHashArr(result);
                }
            });
        let houseHashArr = (showHouseInfoCount) => {
            let houseHashArr = [];
            houseInfoContract.methods.getHouseData(0, showHouseInfoCount).call()
                .then(result => {
                    houseHashArr = bytesToStringArray(result);
                    parseHouseInfoArr(houseHashArr);
                });
        };

        let parseHouseInfoArr = (houseHashArr) => {
            new Promise((resolve, reject) => {
                let arr = [];
                if (houseHashArr.length <= 0) {
                    resolve([]);
                }
                houseHashArr.map((obj, index) => {
                    this.catFromIpfs(obj).then(result => {
                        // console.log(index, result);
                        arr.push(result);
                        if (index >= houseHashArr.length - 1) {
                            resolve(arr);
                        }
                    });
                });
            }).then(result => {
                this.props.initHouseInfo(result);
            }).catch(error => {

            })
        };


    }

    getAllHouseInfo = () => {
        return this.state.allHouseInfo;
    }

    getHouseDetailByIndex = (index) => {
        return this.state.houseInfoByCondtion[index];
    };

    getPageInfoByCondition = (allHouseInfo, page, pageSize, cityCode, areaCode, streetCode,
                              rentType, houseType, houseAppreciation, rentFee) => {
        console.log(page, pageSize, cityCode);
        let cityCodeFlag = true, areaCodeFlag = true, streetCodeFlag = true,
            rentTypeFlag = true, houseTypeFlag = true, houseAppreaciationFlag = true,
            rentFeeFlag = true;
        let i = 1;
        let arr = [];
        let selectInfoByContinu = new Promise((resolve, reject) => {
            allHouseInfo.map((obj, index) => {
                if (allHouseInfo.length = 0) {
                    resolve([]);
                }
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
                    streetCodeFlag = streetInfo.streetCode == streetCode;
                }
                if (!isEmpty(rentFee)) {
                    rentFeeFlag = obj.rentFee == rentFee;
                }
                if (!isEmpty(rentType)) {
                    rentTypeFlag = obj.rentType.typeId == rentType;
                }
                if (!isEmpty(houseType)) {
                    houseTypeFlag = obj.houseType.typeId == houseType;
                }
                if (!isEmpty(houseAppreciation)) {
                    houseAppreaciationFlag = obj.houseAppreciation.typeIndex == houseAppreciation;
                }

                let isTure = cityCodeFlag && areaCodeFlag && streetCodeFlag
                    && rentTypeFlag && houseTypeFlag && houseAppreaciationFlag
                    && rentFeeFlag;

                if (isTure) {
                    arr.push(obj);
                }
                if (index >= allHouseInfo.length - 1) {
                    resolve(arr);
                }
            });
        }).then(result => {
            return this.getPageInfo(result, page, pageSize);
        });
        // });
    };

    //分页信息
    getPageInfo = (data, page, pageSize) => {
        let _from = (page - 1) * pageSize;
        let _to = page * pageSize > data.length ?
            this.showHouseInfoCount : page * pageSize;
        console.log(_from, _to);
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
        console.log(ipfs, this.drizzle);
        return new Promise((resolve, reject) => {
            ipfs.add(content).then((response) => {
                console.log(response);
                resolve(response[0].hash);
            }).catch((err) => {
                reject(err);
            });
        });
    };

    catFromIpfs = hash => {
        return new Promise((resolve, reject) => {
            this.state.ipfs.files.cat(hash, (err, data) => {
                if (err) {
                    reject(err);
                    throw err;
                }
                resolve(JSON.parse(Uint8ArrayToString(data)));
            });
        });
    }

    render() {
        console.log(this.state);
        return (
            <div data={this.state}>

            </div>
        );
    }

}