/**
 * Created by chenqilong on 2018/9/26.
 */
import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

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
        "& button": {
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
    },
    content: {
        padding: '16px 32px',
        borderTop: `1px solid ${grey[400]}`,
        "& table tr td": {
            padding: '8px 0',
            fontSize: '14px',
            color: grey[800],
        },
        borderBottom: `1px dashed ${grey[400]}`,
        contractInfo: {
            tenantPublicKey: "",
            landlordPublicKey: "",
            baseInfoJson: "",
            status: "",
            startTime: new Date().valueOf(),
            endTime: new Date().valueOf(),
            rentTerm: "",
            waterMeter: "",
            waterFee: "",
            electricityMeter: "",
            electricityFee: "",
            rentFee: "",
            pledgeTotal: "",
            payRentDate: "",
            nextPayRentDate: "",
            needActiveFee: "",
        }
    },

});

class TapContractContainer extends React.Component {
    constructor(props) {
        super(props);
        const {classes, contractInfo, rentContract, rentContractUtils} = this.props;
        let pledgeString = "";

        contractInfo.baseInfoJson.pledgeTypeArr.map((obj, index) => {
            pledgeString += obj.pledgeTypeName + " : " + obj.pledgeFee + ' wei';
            if (index == contractInfo.length - 1) {
                pledgeString += "、"
            }
        });
        this.state = {
            pledgeString,
            balance: 0,
            contractInfo: props.contractInfo
        }
    }

    signatureContract = () => {
        let {rentContract, handleComplete, rentContractUtils, rentContractIndex, setBalance} = this.props;
        let contractInfo = this.state.contractInfo;
        rentContractUtils.signatrueContractByTenant(rentContract)
            .then(result => {
                console.log(result);
                let success = result.events.ContractStatusEvent.returnValues[2];
                if (success) {
                    handleComplete();
                    setBalance(rentContract, rentContractIndex);
                    contractInfo.status = 2;
                    this.setState({
                        contractInfo
                    })
                }
            }).catch(err => {
            console.log(err);
        });
    };

    render() {
        const {classes,} = this.props;
        const {pledgeString, contractInfo} = this.state;
        console.log(contractInfo);
        console.log("state", this.state);
        return (
            <div className={classes.root}>
                <h3>基本信息</h3>
                <div className={classes.content}>
                    <table>
                        <tr>
                            <td width="100px">房东公钥：</td>
                            <td width="260px">{contractInfo.landlordPublicKey}</td>
                            <td width="100px">承租人公钥:</td>
                            <td width="200px">{contractInfo.tenantPublicKey}</td>
                        </tr>
                        <tr>
                            <td width="100px">房东姓名：</td>
                            <td width="200px">{contractInfo.baseInfoJson.landlordName}</td>
                            <td width="100px">承租人姓名:</td>
                            <td>{contractInfo.baseInfoJson.tenantName}</td>
                        </tr>
                        <tr>
                            <td width="100px">房东手机号：</td>
                            <td width="200px">{contractInfo.baseInfoJson.landlordTelephone}</td>
                            <td width="100px">承租人手机:</td>
                            <td>{contractInfo.baseInfoJson.tenantTelephone}</td>
                        </tr>
                        <tr>
                            <td width="100px">房东身份证号：</td>
                            <td width="200px">{contractInfo.baseInfoJson.landlordIdNumber}</td>
                            <td width="120px">承租人身份证号:</td>
                            <td>{contractInfo.baseInfoJson.tenantIdNumber}</td>
                        </tr>

                    </table>
                </div>
                <h3>签约信息</h3>
                <div className={classes.content}>
                    <table>
                        <tr>
                            <td width="100px">押金条目总额：</td>
                            <td width="200px">{contractInfo.pledgeTotal} wei</td>
                            <td width="100px">押金类别:</td>
                            <td>
                                {
                                    pledgeString
                                }
                            </td>
                        </tr>
                        <tr>
                            <td width="100px">入住时水表：</td>
                            <td width="200px">{contractInfo.waterMeter} 吨</td>
                            <td width="100px">入住时电表:</td>
                            <td>{contractInfo.electricityMeter} 度</td>
                        </tr>
                        <tr>
                            <td width="100px">水费：</td>
                            <td width="200px">{contractInfo.waterFee} 元/吨</td>
                            <td width="100px">电费:</td>
                            <td>{contractInfo.electricityFee} 元/度</td>
                        </tr>
                        <tr>
                            <td width="100px">租金：</td>
                            <td width="200px">{contractInfo.rentFee} 元/月</td>
                            <td width="100px">收租日期:</td>
                            <td>每月 {new Date(contractInfo.startTime).getDate()} 号</td>
                        </tr>
                        <tr>
                            <td width="100px">租期：</td>
                            <td width="200px">{contractInfo.rentTerm} 个月</td>
                            <td width="100px">起租日期:</td>
                            <td>{`${new Date(contractInfo.startTime).getFullYear()}年
                            ${parseInt(new Date(contractInfo.startTime).getMonth()) + 1 < 10 ? "0" + (parseInt(new Date(contractInfo.startTime).getMonth()) + 1) : parseInt(new Date(contractInfo.startTime).getMonth()) + 1}月
                            ${parseInt(new Date(contractInfo.startTime).getDate()) < 10 ? "0" + new Date(contractInfo.startTime).getDate(): new Date(contractInfo.startTime).getDate()}日`}</td>
                        </tr>
                    </table>
                </div>
                {
                    contractInfo.status > 1 ?
                        <span style={{textAlign: 'center', width: '100%', padding: 16}}>已签订合约</span> :
                        <span style={{textAlign: 'center', width: '100%'}}>
                    承租人确认租赁合约
                </span>
                }
                {
                    contractInfo.status > 1 ? "" :
                        < Button onClick={e => this.signatureContract()}>签订合同</Button>
                }
            </div>
        )
    }
}

TapContractContainer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TapContractContainer);