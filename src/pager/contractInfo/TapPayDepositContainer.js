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
        "& button": {
            alignSelf: 'center',
            backgroundColor: blue[400],
            color: '#fff',
            fontSize: 14,
            "&:hover": {
                backgroundColor: '#fff',
                color: blue[400],
                border: `1px solid ${blue[400]}`
            }
        },
        "& td[class= ]":{
          padding:8
        },
        // "& table tr td": {
        //     padding: '8px 0',
        //     fontSize: '14px',
        //     color: grey[800],
        //     "& input": {
        //         height: 25
        //     }
        // },
        borderBottom: `1px dashed ${grey[400]}`,
    },
});

function onExpand(expanded, record) {
    console.log('onExpand', expanded, record);
}
class TapPayDepositContainer extends React.Component {
    render() {
        const {classes} = this.props;
        const columns = [
            {
                title: '押金条目',
                dataIndex: 'depositItem',
                key: 'depositItem',
                width: 100,
            },
            {
                title: '押金金额',
                dataIndex: 'depositPrice',
                key: 'depositPrice',
                width: 100,
            },
            {
                title: '创建日期',
                dataIndex: 'createDate',
                key: 'createDate',
                width: 150,
            },
            {
                title: '收款日期',
                dataIndex: 'payDate',
                key: 'payDate',
                width: 150,
            }
        ];

        const data = [
            {
                key: 1,
                depositItem: '总押金',
                depositPrice: '1900元',
                createDate: '2016-01-01',
                payDate:'2016-01-02',
                children: [
                    {
                        depositItem: '房屋押金',
                        depositPrice: '1800元',
                    },
                    {
                        depositItem: '门卡押金',
                        depositPrice: '50元',
                    },
                    {
                        depositItem: '钥匙押金',
                        depositPrice: '50元',
                    }
                ],
            },
        ];
        return (
            <div className={classes.root}>
                <h3>
                    待支付押金明细
                </h3>
                <div className={classes.content}>
                    <Table  defaultExpandAllRows={true} columns={columns} data={data} indentSize={30} onExpand={onExpand}/>
                </div>
                <Button>支付押金</Button>
            </div>
        )
    }
}
TapPayDepositContainer.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(TapPayDepositContainer);