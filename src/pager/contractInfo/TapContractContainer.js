/**
 * Created by chenqilong on 2018/9/26.
 */
import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';
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
            marginBottom:8
        },
        display: 'flex',
        'flex-direction': 'column',
        "& button":{
            alignSelf:'center',
            backgroundColor:blue[400],
            color:'#fff',
            marginTop:8,
            marginBottom:8,
            width:80,
            height:40,
            padding:4,
            fontSize:14,
            "&:hover":{
                backgroundColor:'#fff',
                color:blue[400],
                border:`1px solid ${blue[400]}`
            }
        }
    },
    content: {
        padding: '16px 32px',
        borderTop: `1px solid ${grey[400]}`,
        "& table tr td": {
            padding: '8px 0',
            fontSize: '14px',
            color:grey[800],
        },
        borderBottom: `1px dashed ${grey[400]}`,
    },

});

class TapContractContainer extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <h3>基本信息</h3>
                <div className={classes.content}>
                    <table>
                        <tr>
                            <td width="100px">房源信息：</td>
                            <td width="200px">嘉和花苑14幢1单元601</td>
                            <td width="100px">租约状态:</td>
                            <td >租约待确认</td>
                        </tr>
                        <tr>
                            <td width="100px">房东姓名：</td>
                            <td width="200px">陈奇龙</td>
                            <td width="100px">房东手机号:</td>
                            <td >17701670377</td>
                        </tr>
                        <tr>
                            <td width="100px">承租人姓名：</td>
                            <td width="200px">李德伟(男)</td>
                            <td width="100px">承租人手机:</td>
                            <td  >18814180594</td>
                        </tr>
                        <tr>
                            <td width="100px">证件类型：</td>
                            <td width="200px">身份证</td>
                            <td width="100px">证件号码:</td>
                            <td >350583199311020738</td>
                        </tr>

                    </table>
                </div>
                <h3>签约信息</h3>
                <div className={classes.content}>
                    <table>
                        <tr>
                            <td width="100px">押金条目总额：</td>
                            <td width="200px">2500元</td>
                            <td width="100px">押金类别:</td>
                            <td>门卡押金50元、钥匙押金50、房屋押金2400</td>
                        </tr>
                        <tr>
                            <td width="100px">入住时水表：</td>
                            <td width="200px">9347吨</td>
                            <td width="100px">入住时电表:</td>
                            <td>14874度</td>
                        </tr>
                        <tr>
                            <td width="100px">水费：</td>
                            <td width="200px">5元/吨</td>
                            <td width="100px">电费:</td>
                            <td>1.2元/度</td>
                        </tr>
                        <tr>
                            <td width="100px">租金：</td>
                            <td width="200px">1800元/月</td>
                            <td width="100px">收租日期:</td>
                            <td>提前5天</td>
                        </tr>
                        <tr>
                            <td width="100px">租期：</td>
                            <td width="200px">12个月</td>
                            <td width="100px">付款方式:</td>
                            <td>押一付一</td>
                        </tr>
                    </table>
                </div>
                <Button>签订合同</Button>
            </div>
        )
    }
}

TapContractContainer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TapContractContainer);