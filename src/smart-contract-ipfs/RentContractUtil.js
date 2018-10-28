import {bytesToStringArray, Uint8ArrayToString, isEmpty} from "../Utils/util";


export class RentContractUtil {

    constructor(drizzle, rentContractAbi) {
        this.drizzleState = drizzle.store.getState();
        this.drizzle = drizzle;
        this.RentContractProducter = drizzle.contracts.RentContractProducter;
        this.web3 = drizzle.web3;
        this.rentContractAbi = rentContractAbi;
    }

    getActiveFee = (rentContract) => {
        return rentContract.methods.activeFee().call()
    };

    withdrawActiveFee = (rentContract) => {
        return rentContract.methods.withdrawActiveFee().send({
            from: this.drizzleState.accounts[0],
        })
    };

    withdrawPledgeToLandlord = (rentContract) => {
        return rentContract.methods.withdrawPledgeToLandlord().send({
            from: this.drizzleState.accounts[0],
        })
    };

    withdrawPledgeToTenant = (rentContract) => {
        return rentContract.methods.withdrawPledgeToTenant().send({
            from: this.drizzleState.accounts[0],
        })
    };

    withDrawCashToLandlord = (rentContract) => {
        return rentContract.methods.withDrawCashToLandlord().call()
    };

    withDrawCashToTenant = (rentContract) => {
        console.log('tenant');
        return rentContract.methods.withDrawCashToTenant().call()
    };

    isAgree = (rentContract, agree) => {
        return rentContract.methods.isAgree(agree).send({
            from: this.drizzleState.accounts[0],
        })
    };

    judgeWithDrawalPledge = (rentContract, amount) => {
        return rentContract.methods.judgeWithDrawalPledge(amount).send({
            from: this.drizzleState.accounts[0],
        })
    };

    getPledgeStatus = (rentContract) => {
        return rentContract.methods.pledgeStatus().call()
    };

    completedRentFee = (rentContract) => {
        return rentContract.methods.completedRentFee().send({
            from: this.drizzleState.accounts[0],
        })
    };
    withdrawRentFee = (rentContract, index) => {
        return rentContract.methods.withdrawRentFee(index).send({
            from: this.drizzleState.accounts[0],
        })
    };
    payRentFee = (rentContract, rentFee, index) => {
        return rentContract.methods.payRentFee(index).send({
            from: this.drizzleState.accounts[0],
            value: rentFee
        })
    };

    getRentPamentInfo = (rentContract) => {
        return new Promise(resolve => {
            rentContract.methods.currentStage().call()
                .then(result => {
                    console.log(typeof result);
                    let arr = [];
                    const count = parseInt(result) + 1;
                    console.log("count",count);
                    for (let i = 0; i < count; i++) {
                        rentContract.methods.getRentPamentInfo(i).call()
                            .then(rentInfo => {
                                arr.push(this.parseRentPaymentInfoToObject(rentInfo));
                                if (arr.length == count) {
                                    console.log(arr);
                                    resolve(arr);
                                }
                            })
                    }
                })
        });
    };

    parseRentPaymentInfoToObject = (rentPamentInfo => {
        let rentFeeInfo = rentPamentInfo[0];
        let [rentFeeTotal, ethRentFeeTotal, createDate, paymentDate, rentFeeCash] = rentFeeInfo;
        console.log(createDate);
        let waterInfoArr = rentPamentInfo[1];
        let waterInfo = {
            fee: waterInfoArr[0] / 100,
            lastMonthMeter: waterInfoArr[1] / 10,
            currentMonthMeter: waterInfoArr[2] / 10,
            currentMothUse: waterInfoArr[3] / 10,
        };

        let electricityInfoArr = rentPamentInfo[2];
        let electricityInfo = {
            fee: electricityInfoArr[0] / 100,
            lastMonthMeter: electricityInfoArr[1] / 10,
            currentMonthMeter: electricityInfoArr[2] / 10,
            currentMothUse: electricityInfoArr[3] / 10
        };
        let status = rentPamentInfo[3];
        let rentFee = rentFeeTotal / 100;
        let currentStage = rentPamentInfo[4];
        return {
            rentFee, ethRentFeeTotal, createDate:parseInt(createDate)*1000, paymentDate:parseInt(paymentDate)*1000, rentFeeCash,
            waterInfo, electricityInfo, status, currentStage
        }
    });

    payPledge = (rentContract, pledgeFee) => {
        return rentContract.methods.payPledge()
            .send({
                from: this.drizzleState.accounts[0],
                value: pledgeFee
            })
    };

    signatrueContractByTenant = (rentContract) => {
        return rentContract.methods.signatrueContractByTenant()
            .send({
                from: this.drizzleState.accounts[0],
            })
    };

    activeContract = (rentContract, needActiveFee) => {
        return rentContract.methods.activeContract()
            .send({
                from: this.drizzleState.accounts[0],
                value: needActiveFee
            });
    };

    getBalance = (rentContract) => {
        return rentContract.methods.getBalance().call();
    };

    getRentContractInfo = (contract) => {
        return new Promise(resolve => {
            contract.methods.getRentContractInfo().call()
                .then(result => {
                    resolve(this.parseRentContractInfoToObject(result));
                });
        })
    }

    parseRentContractInfoToObject(contractInfo) {
        let tenantPublicKey = contractInfo[0];
        let landlordPublicKey = contractInfo[1];
        let baseInfoJson = JSON.parse(this.web3.utils.hexToUtf8(contractInfo[2]));
        let status = contractInfo[3];
        let startTime = contractInfo[4][0];
        let endTime = contractInfo[4][1];
        let rentTerm = contractInfo[4][2];
        let waterMeter = contractInfo[4][3];
        let waterFee = contractInfo[4][4];
        let electricityMeter = contractInfo[4][5];
        let electricityFee = contractInfo[4][6];
        let rentFee = contractInfo[4][7];
        let payRentDate = contractInfo[4][8];
        let pledgeTotal = contractInfo[4][9];
        let nextPayRentDate = contractInfo[4][10];
        let needActiveFee = contractInfo[4][11];
        let currentStage = contractInfo[4][12];
        return {
            tenantPublicKey, landlordPublicKey, baseInfoJson, status,
            startTime: parseInt(startTime)*1000,
            endTime: parseInt(endTime)*1000,
            rentTerm,
            waterMeter: waterMeter / 10,
            waterFee: waterFee / 100,
            electricityMeter: electricityMeter / 10,
            electricityFee: electricityFee / 100,
            rentFee: rentFee / 100,
            pledgeTotal: pledgeTotal,
            payRentDate,
            nextPayRentDate,
            needActiveFee,
            currentStage
        }
    }

    createRentContract = (baseInfo, tenantPublicKey, startTime, endTime, rentFee, rentTerm, waterMeter, electricityMeter,
                          waterFee, electricityFee, pledgeTypeArr, pledgeTotal) => {
        const send = this.RentContractProducter.methods.createRentContract(waterMeter * 10, waterFee * 100, electricityMeter * 10,
            electricityFee * 100, rentFee * 100, rentTerm, pledgeTotal, startTime, endTime,
            tenantPublicKey, this.web3.utils.utf8ToHex(baseInfo))
            .send({
                from: this.drizzleState.accounts[0],
                gas: 5043967
            });
        return send;
    };

    getUserRentContract = () => {

        return new Promise(resolve => {
            this.RentContractProducter.methods.getCount().call()
                .then(result => {
                    let arr = [];
                    for (let i = 0; i < result; i++) {
                        const call = this.RentContractProducter.methods.userRentContract(this.drizzleState.accounts[0], i).call()
                            .then(addressHex => {
                                const rentContract = new this.web3.eth.Contract(this.rentContractAbi, addressHex, {
                                    form: '0x8aa5da37809726e44e55f87d96ca75148a81a786',
                                    gasPrice: '1',
                                    gas: '6081360'
                                });
                                arr.push(rentContract);
                                if (arr.length == result) {
                                    resolve(arr)
                                }
                            });
                    }
                });
        })
    };

    parseBytesToJsonObject = (bytesString) => {
        const hexToUtf8 = this.web3.utils.hexToUtf8(bytesString);
        return JSON.parse(hexToUtf8);
    };

    getUserRole = (contractInfo) => {
        if (this.drizzleState.accounts[0] == contractInfo.tenantPublicKey) {
            return 'tenant';
        }else if (this.drizzleState.accounts[0] == contractInfo.landlordPublicKey) {
            return 'landlord';
        }
    }
}