import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ToolBar from '../../component/ToolBarTop';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import deleteIcon from '../../statics/icon/delete.svg';
import {connect} from "react-redux";
import {MapDispatchToProps, MapStateToProps} from "../../config/ReduxMapToPropsConfig";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 auto',
        left: 0,
        right: 0,
        width: 1000,


    },
    toolBar: {
        "& div:after": {
            left: 0,
            right: 0,
            bottom: 0,
            content: "",
            position: 'absolute',
            transform: 'scaleX(0)',
            transition: 'transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
            borderBottom: '2px solid #303f9f',
            pointerEvents: 'none'
        }
    },
    gridRoot: {
        backgroundColor: "#fff",
        width: '100%',
        padding: '0px 16px',
        paddingTop: '16px',
        paddingBottom: '0px',
        border: `0px solid ${blue[400]}`,
        borderRadius: '20px',
        boxShadow: `0px 0px 10px ${blue[400]}`,
    },
    title: {
        display: 'block',
        width: '100%',
        borderBottom: `${blue[400]} solid 3px`,
        paddingBottom: 16,
        color: blue[400]
    },
    formRoot: {
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
            "& select": {
                // height: '50%',
                margin: '0px 4px',
                // alignSelf: 'center',
                fontSize: 14,
                color: grey[600],

                "& option": {
                    color: grey[600]
                }
            },
        },
        borderBottom: `1px dashed ${grey[400]}`,
        "& input": {
            background: "#fdfeff",
            border: `1px solid ${grey[400]}`,
            borderRadius: "4px",
            width: "80%",
            height: "24px",
            boxSizing: "border-box",
            fontSize: "14px",

        },
    },
    divInput: {
        border: `1px solid ${grey[400]}`,
        borderRadius: "4px",
        backgroundColor: '#fff',
        height: 'auto',
        minHeight: 24,
        display: 'flex',
        alignItem: 'center',
        // paddingLeft: 16,
        minWidth: '80%',
        width: '80%',
        flexWrap: 'wrap',
        '&$checked': {
            color: green[500],
        },
        "& label": {
            color: grey[600],
            display: 'inline-flex',
            textAlign: 'center',
            alignItems: 'center',
            padding: '0 8px'
        },

        "& span": {
            width: '19%',
            lineHeight: '24px',
            display: 'flex',
            justifyContent: 'center',
            borderLeft: `1px solid ${grey[400]}`
        },
        "& span input": {
            padding: 0,

        },
        "& input[type=text]": {
            background: "#fdfeff",
            border: `none`,
            borderRadius: "4px",
            width: "80%",
            height: "24px",
            boxSizing: "border-box",
            fontSize: "14px",
            textAlign: 'right',
            paddingRight: '8px'
        },
    },

    addInput: {
        "& input[type=text]": {
            background: "#fdfeff",
            // border: `none`,
            borderRadius: "4px",
            width: "37%",
            height: "24px",
            boxSizing: "border-box",
            fontSize: "14px",
            textAlign: 'right',
            paddingRight: '8px',
            marginBottom: 8,
            marginLeft: 4
        },

    },
    iconButton: {
        // "& button":{
        padding: 4,
        color: '#fff',
        minWidth: 15,
        fontSize: 14,
        alignSelf: 'center',
        marginTop: -5,
        marginBottom: 0,
        backgroundColor: 'none',
        top: 2,
        position: 'relative',
        display: 'inline-block'
        // }
    }
});

// label: '¥',

class CreateContractPager extends React.Component {
    state = {
        name: 'Cat in the Hat',
        age: '',
        value: 'female',
        pledgeTypeArr: [{
            pledgeTypeName: "",
            pledgeFee: "",
        }],
        houseAddress: "",
        landlordName: "",
        landlordTelephone: "",
        landlordIdNumber: "",
        tenantPublicKey: "",
        tenantName: "",
        tenantTelephone: "",
        tenantIdNumber: "",
        startTime: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
        endTime: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
        rentTerm: "",
        waterMeter: "",
        electricityMeter: "",
        waterFee: "",
        electricityFee: "",
        rentFee: "",
        pledgeTotal: "",
    };

    constructor() {
        super()
        let elementsByClassName = document.getElementsByClassName('fileContainer');
        let childNodes = elementsByClassName[0]
    }

    changePlegeFee = (index, e) => {
        let pledgeTypeArr = this.state.pledgeTypeArr;
        pledgeTypeArr[index].pledgeFee = parseInt(e.target.value);
        this.setState({
            pledgeTypeArr
        })
    }
    changePlegeType = (index, e) => {
        let pledgeTypeArr = this.state.pledgeTypeArr;
        pledgeTypeArr[index].pledgeTypeName = e.target.value;
        this.setState({
            pledgeTypeArr
        })
    };
    addPlegeTypeArr = () => {
        let pledgeTypeArr = this.state.pledgeTypeArr;
        pledgeTypeArr.push({
            pledgeTypeName: "",
            pledgeFee: "",
        })
        this.setState({
            pledgeTypeArr
        });
    };
    deletePledgeArr = (index, e) => {
        const pledgeTypeArr = this.state.pledgeTypeArr;
        pledgeTypeArr.splice(index, 1);
        this.setState({
            pledgeTypeArr
        })
    };

    createRentContract = () => {
        let {rentContractUtils} = this.props;
        let pledgeTotal = this.countPledgeTotal();
        const {
            houseAddress, landlordName, landlordTelephone, landlordIdNumber,
            tenantPublicKey, tenantName, tenantTelephone, tenantIdNumber, startTime,
            endTime, rentTerm, waterMeter, electricityMeter, waterFee, electricityFee,
            rentFee, pledgeTypeArr
        } = this.state;
        console.log(houseAddress, landlordName, landlordTelephone, landlordIdNumber,
            tenantPublicKey, tenantName, tenantTelephone, tenantIdNumber, startTime,
            endTime, rentTerm, waterMeter, electricityMeter, waterFee, electricityFee,
            rentFee, pledgeTypeArr);
        if (houseAddress.length < 0 || landlordName.length < 0 || landlordTelephone.length < 0 || landlordIdNumber.length < 0
            || tenantPublicKey.length < 0 || tenantName.length < 0 || tenantTelephone.length < 0 || tenantIdNumber.length < 0 ||
            startTime <= 0 || endTime <= 0 || rentTerm == "" || waterMeter == "" || electricityMeter == "" || waterFee == "" ||
            electricityFee == "" || rentFee == "" || pledgeTypeArr.length < 0) {
            console.log('存在空值');
            alert("存在空值");
            return;
        }
        let baseInfoObj = {
            houseAddress,
            landlordName,
            landlordTelephone,
            landlordIdNumber,
            tenantName,
            tenantTelephone,
            tenantIdNumber,
            tenantPublicKey,
            pledgeTypeArr
        };
        rentContractUtils.createRentContract(JSON.stringify(baseInfoObj), tenantPublicKey,
            new Date(startTime).valueOf(), new Date(endTime).valueOf(), parseInt(rentFee), parseInt(rentTerm),
            parseInt(waterMeter), parseInt(electricityMeter), parseInt(electricityFee), parseInt(waterFee),
            pledgeTypeArr, pledgeTotal)
            .then(result => {
                console.log(result);
                alert("新增成功，去我的合同里查看吧");
            });
    };

    countPledgeTotal = () => {
        let {pledgeTypeArr} = this.state;
        let pledgeTotal = 0;
        pledgeTypeArr.forEach((obj, index) => {
            if (obj.pledgeFee != undefined && obj.pledgeTypeName != undefined && obj.pledgeTypeName.length > 0 && obj.pledgeFee > 0) {
                pledgeTotal += parseInt(obj.pledgeFee);
            }
        });

        this.setState({
            pledgeTotal
        });
        return pledgeTotal;
    };

    render() {
        const {classes, location} = this.props;
        const {
            houseAddress, landlordName, landlordTelephone, landlordIdNumber,
            tenantPublicKey, tenantName, tenantTelephone, tenantIdNumber, startTime,
            endTime, rentTerm, waterMeter, electricityMeter, waterFee, electricityFee,
            rentFee, pledgeTotal,
        } = this.state;
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <ToolBar currentLocation={location} searchHidden={true} className={classes.toolBar}/>
                <div className={classes.gridRoot}>
                    <div className={classes.formRoot}>
                        <Typography className={classes.title} variant='title'>
                            填写合同信息
                        </Typography>
                        <h3>基本信息</h3>
                        <div className={classes.content}>
                            <table>
                                <tr>
                                    <td width="100px">房源信息：</td>
                                    <td width="250px">
                                        <input value={houseAddress}
                                               onChange={(e) => {
                                                   this.setState({houseAddress: e.target.value})
                                               }} type="text"/>
                                    </td>
                                    <td width="100px">承租人公钥：</td>
                                    <td><input type="text" value={tenantPublicKey}
                                               onChange={(e) => {
                                                   this.setState({tenantPublicKey: e.target.value})
                                               }}/></td>
                                </tr>
                                <tr>
                                    <td width="100px">房东姓名：</td>
                                    <td width="250px"><input type="text" value={landlordName}
                                                             onChange={(e) => {
                                                                 this.setState({landlordName: e.target.value})
                                                             }}/></td>
                                    <td width="100px">承租人姓名：</td>
                                    <td><input type="text" value={tenantName}
                                               onChange={(e) => {
                                                   this.setState({tenantName: e.target.value})
                                               }}/></td>
                                </tr>
                                <tr>
                                    <td width="100px">房东手机号:</td>
                                    <td width="250px"><input type="text" value={landlordTelephone}
                                                             onChange={(e) => {
                                                                 this.setState({landlordTelephone: e.target.value})
                                                             }}
                                    /></td>
                                    <td width="100px">承租人手机:</td>
                                    <td><input type="text" value={tenantTelephone}
                                               onChange={(e) => {
                                                   this.setState({tenantTelephone: e.target.value})
                                               }}/></td>
                                </tr>
                                <tr>
                                    <td width="120px">房东身份证号码：</td>
                                    <td width="250px"><input value={landlordIdNumber} type="text"
                                                             onChange={(e) => {
                                                                 this.setState({landlordIdNumber: e.target.value})
                                                             }}/></td>
                                    <td width="120px">承租人身份证号码:</td>
                                    <td width="250px"><input type="text" value={tenantIdNumber}
                                                             onChange={(e) => {
                                                                 this.setState({tenantIdNumber: e.target.value})
                                                             }}/></td>
                                </tr>

                            </table>
                        </div>
                        <h3>签约信息</h3>
                        <div className={classes.content}>
                            <table>
                                <tr>
                                    <td width="120px">起租日期：</td>
                                    <td width="250px"><input value={startTime} type="date"
                                                             onChange={(e) => {
                                                                 this.setState({startTime: e.target.value})
                                                             }}/></td>
                                    <td width="100px">退房日期:</td>
                                    <td width="250px"><input value={endTime} type="date"
                                                             onChange={(e) => {
                                                                 this.setState({endTime: e.target.value})
                                                             }}/></td>
                                </tr>
                                <tr>
                                    <td width="100px">租金：</td>
                                    <td width="250px">
                                        <div className={classes.divInput}>
                                            <input value={rentFee} type="text"
                                                   onChange={(e) => {
                                                       this.setState({rentFee: e.target.value})
                                                   }}/>
                                            <span>元/月</span>
                                        </div>
                                    </td>
                                    <td width="100px">租期：</td>
                                    <td width="200px">
                                        <div className={classes.divInput}>
                                            <input value={rentTerm} type="text"
                                                   onChange={(e) => {
                                                       this.setState({rentTerm: e.target.value})
                                                   }}/>
                                            <span>个月</span>
                                        </div>
                                    </td>

                                </tr>
                                <tr>
                                    <td width="100px">入住时水表：</td>
                                    <td width="250px">
                                        <div className={classes.divInput}>
                                            <input value={waterMeter} type="text"
                                                   onChange={(e) => {
                                                       this.setState({waterMeter: e.target.value})
                                                   }}/>
                                            <span>吨</span>
                                        </div>
                                    </td>
                                    <td width="100px">入住时电表:</td>
                                    <td>
                                        <div className={classes.divInput}>
                                            <input value={electricityMeter} type="text"
                                                   onChange={(e) => {
                                                       this.setState({electricityMeter: e.target.value})
                                                   }}/>
                                            <span>度</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="100px">水费：</td>
                                    <td width="250px">
                                        <div className={classes.divInput}>
                                            <input value={waterFee} type="text"
                                                   onChange={(e) => {
                                                       this.setState({waterFee: e.target.value})
                                                   }}/>
                                            <span>元/吨</span>
                                        </div>
                                    </td>
                                    <td width="100px">电费:</td>
                                    <td>
                                        <div className={classes.divInput}>
                                            <input value={electricityFee} type="text"
                                                   onChange={(e) => {
                                                       this.setState({electricityFee: e.target.value})
                                                   }}/>
                                            <span>元/度</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{verticalAlign: 'top'}}>押金费用:</td>
                                    <td width="250px" className={classes.addInput}>
                                        {
                                            this.state.pledgeTypeArr.map((obj, index) => {
                                                return (
                                                    <div><input style={{marginLeft: 0}} name="type"
                                                                value={obj.pledgeTypeName} onChange={e => {
                                                        this.changePlegeType(index, e)
                                                    }} type="text"/> -
                                                        <input value={obj.pledgeFee} name="fee" onChange={e => {
                                                            this.changePlegeFee(index, e)
                                                        }} type="text"
                                                               style={{textAlign: 'left', paddingLeft: 8}}
                                                               placeholder="元"/>
                                                        <div className={classes.iconButton}>
                                                            <img
                                                                onClick={e => {
                                                                    this.deletePledgeArr(index, e)
                                                                }}
                                                                src={deleteIcon}/>
                                                        </div>
                                                        <br/></div>)
                                            })
                                        }

                                    </td>
                                    <td style={{verticalAlign: 'top'}}><Button onClick={this.addPlegeTypeArr} style={{
                                        border: `1px solid ${blue[400]}`,
                                        minHeight: 25,
                                        minWidth: 40,
                                        width: 40,
                                        height: 27,
                                        marginTop: 0,
                                        marginBottom: 0
                                    }}>添加</Button></td>
                                    <td width="100px" style={{verticalAlign: 'top'}}>
                                        <div className={classes.divInput}>
                                            <input type="text" value={pledgeTotal} placeholder="押金总额"
                                                   onChange={(e) => {
                                                       this.setState({pledgeTotal: e.target.value})
                                                   }}/>
                                            <span>元</span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <Button onClick={e => {
                            this.createRentContract()
                        }}>创建合同</Button>
                    </div>
                </div>
            </form>
        )
            ;
    }
}

CreateContractPager.propTypes = {
    classes: PropTypes.object.isRequired,
};
CreateContractPager = connect(MapStateToProps, MapDispatchToProps)(CreateContractPager);
export default withStyles(styles)(CreateContractPager);
