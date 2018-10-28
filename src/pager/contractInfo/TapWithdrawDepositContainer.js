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
            "& input": {
                height: 25
            }
        },
        borderBottom: `1px dashed ${grey[400]}`,
    },


})

class TapWithdrawDepositContainer extends React.Component {
    state = {
        pledgeStatus: 0,
        amount: parseInt(this.props.contractInfo.pledgeTotal),
        pledgeCash: 0
    };

    componentDidMount() {
        let {rentContract, rentContractUtils} = this.props;
        rentContractUtils.getPledgeStatus(rentContract)
            .then(result => {
                this.setState({
                    pledgeStatus: result
                })
            });
        this.getWithDrawPledgeFeeByUserRole();
    }

    getWithDrawPledgeFeeByUserRole = () => {
        let {rentContractUtils, rentContract, contractInfo} = this.props;
        const userRole = rentContractUtils.getUserRole(contractInfo);
        if (userRole == 'landlord') {
            rentContractUtils.withDrawCashToLandlord(rentContract)
                .then(result => {
                    this.setState({

                        pledgeCash: result
                    })
                });
        } else if (userRole == 'tenant') {
            rentContractUtils.withDrawCashToTenant(rentContract)
                .then(result => {
                    this.setState({
                        pledgeCash: result
                    });
                })
        }
    };

    changeAmounts = (amount) => {
        this.setState({
            amount: parseInt(amount.target.value)
        })
    };

    judgeWithDrawalPledge = () => {
        let {amount} = this.state;
        let {rentContractUtils, rentContract} = this.props;
        rentContractUtils.judgeWithDrawalPledge(rentContract, amount)
            .then(result => {
                let success = result.events.PledgeWithdrawalStatusEvent.returnValues[2];
                if (success) {
                    this.setState({
                        pledgeStatus: result.events.PledgeWithdrawalStatusEvent.returnValues[1]
                    })
                }
            });
    };

    isAgree = (agree) => {
        let {rentContractUtils, rentContract, setBalance, rentContractIndex,handleComplete} = this.props;
        rentContractUtils.isAgree(rentContract, agree)
            .then(result => {
                console.log(result);
                const success = result.events.PledgeWithdrawalStatusEvent.returnValues[2];
                if (success) {
                    this.setState({
                        pledgeStatus: result.events.PledgeWithdrawalStatusEvent.returnValues[1]
                    });
                    handleComplete();
                    setBalance(rentContract, rentContractIndex);
                }
            });
        this.getWithDrawPledgeFeeByUserRole();
    };

    widrawalPledge = () => {
        let {rentContractUtils, rentContract, contractInfo,setBalance,rentContractIndex} = this.props;
        const userRole = rentContractUtils.getUserRole(contractInfo);
        if (userRole == 'landlord') {
            rentContractUtils.withdrawPledgeToLandlord(rentContract)
                .then(result => {
                    console.log("landlord", result);
                    let success = result.events.PledgeWithdrawalEvent.returnValues[2];
                    if (success) {
                        this.setState({
                            pledgeCash: 0
                        })
                    }
                });
        } else if (userRole == 'tenant') {
            rentContractUtils.withdrawPledgeToTenant(rentContract)
                .then(result => {
                    console.log("tenant",result);
                    let success = result.events.PledgeWithdrawalEvent.returnValues[2];
                    if (success) {
                        this.setState({
                            pledgeCash: 0
                        })
                    }
                });
        }
    };

    render() {
        const {classes, contractInfo} = this.props;
        const {pledgeStatus, amount, pledgeCash} = this.state;
        return (
            <div className={classes.root}>
                <h3>
                    押金退还
                </h3>
                <div className={classes.content}>
                    <table>
                        <tr>
                            <td colSpan="2">
                                返回给租客多少以太币,双方达成一致即可退还押金<br/>
                            </td>
                        </tr>
                        <tr>
                            <td width="150px">退还押金数(wei):</td>
                            <td width="400px">
                                {
                                    pledgeStatus == 0 ?
                                        <input style={{width: '100%'}}
                                               onChange={e => {
                                                   this.changeAmounts(e)
                                               }}
                                               placeholder={'当前合同押金为:' + amount}
                                               value={amount}
                                        />
                                        : pledgeStatus == 1 ?
                                        <div>
                                            <input style={{width: '100%'}}
                                                   disabled
                                                   value={amount}
                                            />
                                        </div>
                                        : pledgeStatus == 2 ?
                                            <div style={{width: '100%'}}>
                                                <input
                                                    onChange={e => {
                                                        this.changeAmounts(e)
                                                    }}
                                                    placeholder={'当前合同押金为:' + amount}
                                                    value={amount}
                                                />
                                                <span style={{color: 'red', marginLeft: 16}}>
                                                    租客不同意，请重新填写以太金额
                                                </span>
                                            </div>
                                            : pledgeStatus == 3 ?
                                                <div>
                                                    <input style={{width: '100%'}}
                                                           onChange={e => {
                                                               this.changeAmounts()
                                                           }}
                                                           disabled
                                                           value={pledgeCash}
                                                    />
                                                </div> : ""
                                }
                            </td>
                        </tr>
                    </table>

                </div>
                {

                    pledgeStatus == 0 || pledgeStatus == 2 ?
                        <Button onClick={e => this.judgeWithDrawalPledge()}>确认扣除</Button>
                        : pledgeStatus == 1 ?
                        <div style={{margin: '0 auto'}}>
                            <Button onClick={e => this.isAgree(3)}>同意</Button> <Button
                            onClick={e => this.isAgree(2)}>不同意 </Button>
                        </div>
                        : pledgeStatus == 3 ?
                            <Button onClick={e => this.widrawalPledge()}>取出押金</Button>
                            : ""
                }

            </div>
        );
    }
}

TapWithdrawDepositContainer.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(TapWithdrawDepositContainer);