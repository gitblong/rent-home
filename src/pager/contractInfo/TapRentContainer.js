/**
 * Created by chenqilong on 2018/9/27.
 */
import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';
import Paper from '@material-ui/core/paper';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import Table from 'rc-table';
import 'rc-table/assets/index.css';

const styles = theme => ({
    root: {
        with: '100%',
        marginTop: 8,
        backgroundColor: '#fff',
        borderShadow: `0px 0px 10px ${grey[200]}`,
        "& h3": {
            paddingLeft: '16px',
            paddingTop: 8,
            paddingBottom: 8,
            fontSize: '14px',
            'margin-block-start': 0,
            'margin-block-end': 0,
            fontFamily: 'serif',
            marginBottom: 8
        },
        display: 'flex',
        'flex-direction': 'column',
    },
    content: {
        padding: '16px 32px',
        borderTop: `1px solid ${grey[400]}`,
        "& table tr td": {
            padding: '8px 0',
            fontSize: '14px',
            color: grey[800],
            "& input": {
                height: 25
            },
            textAlign: 'center',
            "& button": {
                backgroundColor: blue[400],
                color: '#fff',
                "&:hover": {
                    backgroundColor: '#fff',
                    color: blue[400],
                    border: `1px solid ${blue[400]}`
                }
            }
        },
        "& table tr th": {
            textAlign: 'center'
        },
        borderBottom: `1px solid ${grey[400]}`,
    },
    buttonBottom: {
        alignSelf: 'center',
        backgroundColor: blue[400],
        color: '#fff',
        marginTop: 8,
        marginBottom: 8,
        width: 80,
        height: 40,
        padding: 4,
        fontSize: 14,
        "&:hover": {
            backgroundColor: '#fff',
            color: blue[400],
            border: `1px solid ${blue[400]}`
        }
    }


})

class TapRentContainer extends React.Component {

    constructor(props) {
        super(props);
        this.getRentPamentInfo();
        const columns = [
            {
                title: '费用类别',
                dataIndex: 'depositItem',
                key: 'depositItem',
                width: 150,
            },
            {
                title: '账单金额',
                dataIndex: 'depositPrice',
                key: 'depositPrice',
                width: 120,
            },
            {
                title: '上月读表数',
                dataIndex: 'previousNumber',
                key: 'previousNumber',
                width: 120,
            },
            {
                title: '本月读表数量',
                dataIndex: 'currentNumber',
                key: 'currentNumber',
                width: 120,
            },
            {
                title: '本月使用量',
                dataIndex: 'dosage',
                key: 'dosage',
                width: 120,
            },
            {
                title: '创建日期',
                dataIndex: 'createDate',
                key: 'createDate',
                width: 120,
            },
            {
                title: '收款日期',
                dataIndex: 'payDate',
                key: 'payDate',
                width: 120,
            },
            {
                title: '应支付以太(wei)',
                dataIndex: 'ethRentFeeTotal',
                key: 'ethRentFeeTotal',
                width: 120,
            },
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                width: 120,
            }
        ];
        this.state = {
            columns: columns,
            data: [],
            contractInfo:props.contractInfo
        }
    }

    getCurrentOperation() {
        let {columns} = this.state;
        let {rentPamentArr, contractInfo, rentContractUtils} = this.props;
        let userRole = rentContractUtils.getUserRole(contractInfo);
        let currentOperation = [];
        let landlordOperation = [
            {
                key: 0,
                value: "抄水电表"
            }, {
                key: 1,
                value: "等待支付"
            }, {
                key: 2,
                value: "取出金额"
            }, {
                key: 6,
                value: '已取出金额'
            }
        ];
        let tenantOperation = [
            {
                key: 3,
                value: "等待抄表"
            }, {
                key: 4,
                value: "支付租金"
            }, {
                key: 5,
                value: "已支付"
            }, {
                key: 7,
                value: '已取出金额'
            }];
        if (userRole == 'tenant') {
            currentOperation = tenantOperation;
            columns[7].title = "应支付以太(wei)";
        } else if (userRole == 'landlord') {
            currentOperation = landlordOperation;
            columns[7].title = "可取出以太(wei)";
        }
        this.setState({columns});

        return (currentOperation);

    }

    getEthereumFee = (obj) => {
        let {rentContractUtils, contractInfo} = this.props;
        let userRole = rentContractUtils.getUserRole(contractInfo);
        if (userRole == "landlord") {
            return obj.rentFeeCash;
        } else if (userRole == 'tenant') {
            return obj.ethRentFeeTotal;
        }
    }

    handlerOperation = (key, _index, obj,) => {
        let {rentContractUtils, rentContract,} = this.props;
        switch (key) {
            case 0:

                break;
            case 2:
                rentContractUtils.withdrawRentFee(rentContract, _index)
                    .then(result => {
                        console.log(result);
                        let success = result.events.RentFeeStatusEvent.returnValues[2];
                        let rentFeeStatus = result.events.RentFeeStatusEvent.returnValues[1];
                        if (success) {
                            let data = this.state.data;
                            let obj = data[_index];
                            obj.ethRentFeeTotal = this.getEthereumFee(obj);
                            obj.operation = <Button
                                onClick={e => {
                                    this.handlerOperation(this.getCurrentOperation()[rentFeeStatus].key, _index, obj)
                                }}>{this.getCurrentOperation()[rentFeeStatus].value}</Button>;
                            data[_index] = obj;
                            this.setState({
                                data: data
                            })

                        }
                    })
                break;
            case 4:
                rentContractUtils.payRentFee(rentContract, obj.ethRentFeeTotal, _index)
                    .then(result => {
                        console.log(result);
                        let success = result.events.RentFeeStatusEvent.returnValues[2];
                        let rentFeeStatus = result.events.RentFeeStatusEvent.returnValues[1];
                        if (success) {
                            let data = this.state.data;
                            let obj = data[_index];
                            obj.ethRentFeeTotal = this.getEthereumFee(obj);
                            obj.operation = <Button
                                onClick={e => {
                                    this.handlerOperation(this.getCurrentOperation()[rentFeeStatus].key, _index, obj)
                                }}>{this.getCurrentOperation()[rentFeeStatus].value}</Button>;
                            data[_index] = obj;
                            this.setState({
                                data: data
                            })

                        }
                    });
                break;
        }
    };

    getRentPamentInfo = () => {

        let {rentContractUtils, rentContract, contractInfo} = this.props;
        rentContractUtils.getRentPamentInfo(rentContract)
            .then(result => {
                console.log(result);
                let operation = this.getCurrentOperation();
                console.log(operation);
                let arr = [];
                result.map((obj, index) => {
                    let rentPaymentInfo = {
                        key: index,
                        depositItem: '第一期应缴租金',
                        depositPrice: `${obj.rentFee}元`,
                        previousNumber: '',
                        currentNumber: '',
                        dosage: '',
                        createDate: `${new Date(parseInt(obj.createDate)).getFullYear()}年${new Date(parseInt(obj.createDate)).getMonth()}月${new Date(parseInt(obj.createDate)).getDay()}日`,
                        payDate: obj.paymentDate != 0 ? `${new Date(obj.paymentDate).getFullYear()}年${new Date(obj.paymentDate).getMonth()}月${new Date(obj.paymentDate).getDay()}日` : '',
                        ethRentFeeTotal: this.getEthereumFee(obj),
                        operation: <Button onClick={e => {
                            this.handlerOperation(operation[obj.status].key, index, obj)
                        }}>{operation[obj.status].value}</Button>,
                        children: [
                            {
                                depositItem: '房屋租金',
                                depositPrice: `${contractInfo.rentFee}元`,
                                previousNumber: '',
                                currentNumber: '',
                                dosage: ''
                            },
                            {
                                depositItem: '本月水费',
                                depositPrice: `${obj.waterInfo.fee}元`,
                                previousNumber: `${obj.waterInfo.lastMonthMeter}`,
                                currentNumber: `${obj.waterInfo.currentMonthMeter}`,
                                dosage: `${obj.waterInfo.currentMothUse}吨`
                            },
                            {
                                depositItem: '本月电费',
                                depositPrice: `${obj.electricityInfo.fee}元`,
                                previousNumber: `${obj.electricityInfo.lastMonthMeter}`,
                                currentNumber: `${obj.electricityInfo.currentMonthMeter}`,
                                dosage: `${obj.electricityInfo.currentMothUse}吨`
                            }
                        ],
                    };

                    arr.push(rentPaymentInfo);
                    if (arr.length - 1 == index) {
                        this.setState({
                            data: arr
                        })
                    }
                });
            });
    };

    completedRentFee = () => {
        const {rentContract, contractInfo, rentContractUtils, handleComplete, setBalance, rentContractIndex} = this.props;
        rentContractUtils.completedRentFee(rentContract)
            .then(result => {
                console.log(result);
                let success = result.events.ContractStatusEvent[1].returnValues[2];
                let status = result.events.ContractStatusEvent[1].returnValues[1];
                if (success) {
                    handleComplete();
                    setBalance(rentContract, rentContractIndex);
                    contractInfo.status = status;
                    this.setState({
                        contractInfo

                    })
                }
            });
    };

    render() {
        const {classes, } = this.props;
        const {columns, data,contractInfo} = this.state;
        const status = ["待抄表", "待支付", "已支付"];


        function onExpand(expanded, record) {
            console.log('onExpand', expanded, record);
        }

        return (
            <div>
                <div className={classes.root}>
                    <div className>
                        <h3>
                            账单详情
                        </h3>
                    </div>
                    <div className={classes.content}>
                        <Table defaultExpandAllRows={true} columns={columns} data={data} indentSize={30}
                               onExpand={onExpand}/>
                    </div>
                    {
                        contractInfo.currentStage + 1 == contractInfo.rentTerm ?
                            <span style={{textAlign: 'center', width: '100%'}}>
                        已到租期，若处理完所有账单，则可完成租赁
                    </span> : ""
                    }
                    {
                        contractInfo.currentStage + 1 == contractInfo.rentTerm ?
                            <Button className={classes.buttonBottom}
                                    onClick={e => this.completedRentFee()}>完成租赁</Button> : ""
                    }
                    <Button className={classes.buttonBottom} onClick={e => this.completedRentFee()}>完成租赁</Button>
                </div>
            </div>
        )
    }
}

TapRentContainer.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(TapRentContainer);