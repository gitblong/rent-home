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


const styles = theme =>({
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
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <h3>
                    押金退还
                </h3>
                <div className={classes.content}>
                    <table>
                        <tr>
                            <td colSpan="2">
                                已支付的押金总额为1Eth，请在以下输入栏中注明需要扣除的押金金额(以太)<br/>
                            </td>
                        </tr>
                        <tr>
                            <td width="150px">从押金扣除金额数:</td>
                            <td><input/></td>
                        </tr>
                        <tr>
                            <td width="100px">扣除原因:</td>
                            <td><input/></td>


                        </tr>
                    </table>

                </div>
                <Button>确认扣除</Button>
            </div>
        )
    }
}
TapWithdrawDepositContainer.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(TapWithdrawDepositContainer);