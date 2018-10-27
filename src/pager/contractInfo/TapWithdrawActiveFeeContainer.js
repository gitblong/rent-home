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

class TapWithdrawActiveFeeContainer extends React.Component {
    state = {
        activeFee: 0,
        userRole: '',
        loading: true
    };

    componentDidMount() {
        let {contractInfo, rentContract, rentContractUtils} = this.props;
        rentContractUtils.getActiveFee(rentContract)
            .then(result => {
                this.setState({
                    activeFee: parseInt(result)
                })
            });
        this.getUserRole();
    }

    getUserRole = () => {
        let {rentContractUtils, rentContract, contractInfo} = this.props;
        const userRole = rentContractUtils.getUserRole(contractInfo);
        this.setState({
            userRole
        })
    };
    withdrawActiveFee = () => {
        let {contractInfo, rentContract, rentContractUtils, handleComplete, setBalance, rentContractIndex} = this.props;
        rentContractUtils.withdrawActiveFee(rentContract)
            .then(result => {
                console.log(result);
                if (result.events.ActiveWithdrawalEvent.returnValues[2]) {
                    this.setState({
                        activeFee: result.events.ActiveWithdrawalEvent.returnValues[1]
                    });
                    this.setBalance(rentContract, rentContractIndex);
                }
            });
    };

    render() {
        const {classes, handleComplete} = this.props;
        const {activeFee, userRole, loading} = this.state;
        // var activeFee = 0;
        return (
            <div className={classes.root}>

                {
                    userRole == "landlord" ? activeFee > 0 ? <h3>取回合同余额</h3> : "" : ""
                }

                <div className={classes.content}>
                    <table>
                        <tr>
                            <td colSpan="2">
                                已完成本次租赁协议<br/>
                            </td>
                        </tr>
                        {
                            userRole == "landlord" ?
                                activeFee > 0 ?
                                    <tr>
                                        <td width="150px">当前合同余额为(wei):</td>
                                        <td width="400px">
                                            {
                                                <input style={{width: '100%'}}
                                                       disabled
                                                       value={activeFee}
                                                />
                                            }
                                        </td>
                                    </tr>
                                    : (0 >= activeFee && loading) ?
                                    <div>
                                        {this.setState({loading: false})}
                                        {handleComplete()}
                                    </div>
                                    : ""
                                : (userRole == "tenant" && loading) ?
                                <div>
                                    {this.setState({loading: false})}
                                    {handleComplete()}
                                </div> : ""
                        }
                    </table>

                </div>
                {
                    userRole == "landlord" && activeFee > 0 ?
                        <Button onClick={e => this.withdrawActiveFee()}>取回余额</Button> : ""
                }

            </div>
        );
    }
}

TapWithdrawActiveFeeContainer.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(TapWithdrawActiveFeeContainer);