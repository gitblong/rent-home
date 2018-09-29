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
import TapContractContainer from './TapContractContainer';
import TapDepositContainer from './TapWithdrawDepositContainer';
import TapRentContainer from './TapRentContainer';
import HorizontalNonLinearAlternativeLabelStepper from './ContractSteps';

function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
            {props.children}
        </Typography>
    );
}
const styles = theme =>({
    root: {
        width: 1000,
        margin: '0 auto',
        left: 0,
        right: 0,
    },
    tabRoot: {
        flexGrow: 1,
        backgroundColor: grey[200],

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
    }
})
class TapContent extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        value: 2,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {classes, location} = this.props;
        const {value} = this.state;

        return (
                <div className={classes.tabRoot}>
                    <AppBar position="static" className={classes.appBar}>
                        <h3 className={classes.appBarTitle}>嘉和花苑,14幢1单元603</h3>
                        <Tabs value={value} onChange={this.handleChange} style={{}} className={classes.tabContent}>
                            <Tab label="租约详情" className={classes.tabItem}/>
                            <Tab label="押金管理" className={classes.tabItem}/>
                            <Tab label="租约信息" className={classes.tabItem}/>
                        </Tabs>
                    </AppBar>
                    <div className={classes.tabContainer}>
                        {value === 0 && <TapContractContainer>租约详情</TapContractContainer>}
                        {value === 1 && <TapDepositContainer>押金管理</TapDepositContainer>}
                        {value === 2 && <TapRentContainer>租约信息</TapRentContainer>}
                    </div>
            </div>
        )
    }
}

TapContent.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TapContent);
