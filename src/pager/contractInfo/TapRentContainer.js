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
            "& button":{
                backgroundColor:blue[400],
                color:'#fff',
                "&:hover":{
                    backgroundColor:'#fff',
                    color:blue[400],
                    border:`1px solid ${blue[400]}`
                }
            }
        },
        "& table tr th": {
            textAlign:'center'
        },
        borderBottom: `1px solid ${grey[400]}`,
    },


})
class TapRentContainer extends React.Component {
    render() {
        const {classes} = this.props;
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
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                width: 120,
            },
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                width: 120,
            }
        ];
        const status = ["待抄表", "待支付", "已支付"];

        const data = [
            {
                key: 1,
                depositItem: '第一期应缴租金',
                depositPrice: '1900元',
                previousNumber: '',
                currentNumber: '',
                dosage: '',
                createDate: '2016-01-01',
                payDate: '2016-01-02',
                status:status[0],
                operation:<Button>抄表</Button>,
                children: [
                    {
                        depositItem: '房屋租金',
                        depositPrice: '1800元',
                        previousNumber: '',
                        currentNumber: '',
                        dosage: ''
                    },
                    {
                        depositItem: '本月水费',
                        depositPrice: '50元',
                        previousNumber: '121',
                        currentNumber: '129',
                        dosage: '8吨'
                    },
                    {
                        depositItem: '本月电费',
                        depositPrice: '50元',
                        previousNumber: '121',
                        currentNumber: '129',
                        dosage: '8度'
                    }
                ],
            },
        ];

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
                </div>
            </div>
        )
    }
}
TapRentContainer.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(TapRentContainer);