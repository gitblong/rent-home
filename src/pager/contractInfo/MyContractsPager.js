/**
 * Created by chenqilong on 2018/9/11.
 */
import React from "react";
import {withStyles} from "@material-ui/core/styles/";
import PropTypes from "prop-types";
import ToolBar from "../../component/ToolBarTop";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import blue from "@material-ui/core/colors/blue";
import grey from "@material-ui/core/colors/grey";
import TapContractContainer from './TapActiveContractContainer';
import TapDepositContainer from './TapWithdrawDepositContainer';
import TapRentContainer from './TapRentContainer';
import ContractSteps from './ContractSteps';
import TapContent from './TapContent';
import connect from "react-redux/es/connect/connect";
import {MapDispatchToProps, MapStateToProps} from "../../config/ReduxMapToPropsConfig";

function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
            {props.children}
        </Typography>
    );
}

const styles = theme => ({
    root: {
        width: 1000,
        margin: '0 auto',
        left: 0,
        right: 0,
    },
    tabRoot: {
        flexGrow: 1,
        backgroundColor: grey[200],
        margin: '32px 0px',
        borderRadius: '5px',
        border: `solid 1px ${blue[400]}`,
        boxShadow: `0 0 10px 5px ${blue[200]}`
    },
    appBar: {
        backgroundColor: "#fff",
        padding: '0 8px',
        boxShadow: 'none'
    },
    appBarTitle: {
        padding: '8px',
        'margin-block-start': 0,
        'margin-block-end': 0,
        color: grey[900]
    },
    tabContent: {
        backgroundColor: "#fff",
        "& div > span": {
            backgroundColor: blue[700]
        },
    },
    tabItem: {
        // backgroundColor: 'inherit',
        color: blue[700],
        // "&button": {
        padding: 0,
        minWidth: 100,
        fontSize: 16,
        // },
        // "&:first-child": {
        //     backgroundColor: '#fff'
        // },
        // "&:focus": {
        //     backgroundColor: '#fff'
        // },

    },
    tabContainer: {
        minHeight: 600,
        backgroundColor: "#f2f5ff"
    },
    tapContent: {
        width: '100%'
    },
})

class MyContractsPager extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        value: 2,
        contractInfoArr: [],
        rentContractArr: [],
        balance: 0
    };

    setBalance = (obj, index) => {
        let {rentContractUtils} = this.props;
        rentContractUtils.getActiveFee(obj).then(balance => {
            let balanceArr = this.state.balanceArr;
            balanceArr[index] = balance;
            this.setState({
                balanceArr: balanceArr,
            });
        });
    };

    componentDidMount() {
        let {rentContractUtils} = this.props;

        rentContractUtils.getUserRentContract()
            .then(contracts => {
                let contractInfoArr = [];
                let balanceArr = []
                this.setState({
                    rentContractArr: contracts
                });
                contracts.map((obj, index) => {
                    rentContractUtils.getActiveFee(obj).then(balance => {
                        balanceArr.push(balance);
                        if (index == balanceArr.length - 1) {
                            this.setState({
                                balanceArr: balanceArr
                            });
                        }
                    });
                    rentContractUtils.getRentContractInfo(obj)
                        .then(contractInfo => {
                            contractInfoArr.push(contractInfo);

                            if (contracts.length == contractInfoArr.length) {
                                this.setState({
                                    contractInfoArr
                                });
                            }
                        });
                });
            });

    }

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {classes, location, rentContractUtils} = this.props;
        const {value, rentContractArr, contractInfoArr, balanceArr} = this.state;
        return (
            <div className={classes.root}>

                <div>
                    <ToolBar currentLocation={location} placeText="快速查找我的租赁合同"/>
                    {
                        contractInfoArr.map((obj, index) => {
                            return (
                                < div className={classes.tabRoot}>
                                    <AppBar position="static" className={classes.appBar}>
                                        <table>
                                            <tr>
                                                <td>
                                                    <h3 width="50%"
                                                        className={classes.appBarTitle}>{obj.baseInfoJson.houseAddress}</h3>
                                                </td>
                                                <td>
                                                    <h3 width="50%" className={classes.appBarTitle}
                                                        style={{float: "right"}}>当前合同存储的以太币为:{balanceArr[index]} Wei</h3>
                                                </td>
                                            </tr>
                                        </table>
                                    </AppBar>
                                    <ContractSteps
                                        rentContract={rentContractArr[index]}
                                        contractInfo={obj}
                                        rentContractUtils={rentContractUtils}
                                        className={classes.tapContent}
                                        rentContractIndex={index}
                                        setBalance={this.setBalance}
                                    />
                                </div>
                            );
                        })

                    }
                </div>


            </div>
        );
    }
}

MyContractsPager
    .propTypes = {
    classes: PropTypes.object.isRequired,
}
MyContractsPager = connect(MapStateToProps, MapDispatchToProps)(MyContractsPager);
export default withStyles(styles)

(
    MyContractsPager
)
;
