/**
 * Created by chenqilong on 2018/9/13.
 */
import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Input from "@material-ui/core/Input";
import lightblue from "@material-ui/core/colors/lightblue";
import Details from "@material-ui/icons/details";
import RentTypePopper from "./RentTypePopper";
import contractSvg from "../statics/images/contract.svg";
import onLineConnect from "../statics/images/on-line-connect.svg";
import transaction from "../statics/images/transaction.svg";
import safe from "../statics/images/safe.svg";
import RouterConfig from "../config/RouteConfig";
import Link from "react-router-dom/Link";
var image = require('../statics/images/rent-home.jpg');
const styles = {
    search: {
        left: 0,
        bottom: 50,
        right: 0,
        margin: 'auto',
        position: "absolute",
        border: '2px solid',
        borderColor: lightblue[600],
        padding: '0px 0px',
        background: '#ffffff',
        borderRadius: 10,
        width: 700,
        opacity: 0.9

    },
    searchInput: {
        background: "#fdfeff",
        border: "none",
        borderRadius: "4px",
        width: "420px",
        height: "60px",
        boxSizing: "border-box",
        fontSize: "20px",
        paddingLeft: "16px",
    },
    searchButton: {
        width: '20%',
        height: 60,
        fontSize: 22,
        color: '#42b5ff'
    },
    imageCard: {
        width: '100%',
        height: 450,
        position: 'relative',

    },
    searchSelect: {
        width: '20%',
        height: 60,
        fontSize: 18

    },
    searchSelectIcon: {
        fontSize: 10,
        padding: 10
    },
    menu: {
        width: 200,
    },
    contentLayout: {
        marginTop: 20,
        left: 0,
        margin: "auto",
        right: 0,
        width: 1200
    },
    contentCard: {
        paddingTop: 15,

    },
    contentImage: {
        height: 100,
        width: 100,
        margin: 'auto',

    },
    contentText: {
        textAlign: 'center',
        "&:last-child": {
            paddingBottom: 15
        }
    },
    contentTextBody: {
        marginTop: 20,
        color: '#8998a0'
    },
    clearA: {
        color: "#42b5ff",
        textDecorationLine: 'none'
    }
};
class Middle extends React.Component {
    state = {
        rentTypeAnchorEl: null,
        rentTypePopperOpen: false,
        rentType: '全部',
        clickPopperId: ''
    }
    openRentTypePopper = (value, event)=> {
        event.preventDefault();
        const currentTarget = event.currentTarget;
        this.setState(state =>({
            rentTypeAnchorEl: this.state.rentTypeAnchorEl == null ? currentTarget : null,
            rentTypePopperOpen: !state.rentTypePopperOpen,
            clickPopperId: state.clickPopperId

        }));
        if (value == 0) {
            return;
        }
        this.setState(state =>({
            rentType: value
        }));

    }

    render() {
        const {classes}= this.props;

        return (
            <div>
                <CardMedia
                    className={classes.imageCard}
                    image={image}
                >
                    <div className={classes.search}>
                        <Button id="rentTypeId" className={classes.searchSelect}
                                onClick={e => this.openRentTypePopper(0, e)}>
                            {this.state.rentType}<Details className={classes.searchSelectIcon}/>
                        </Button>
                        <input
                            className={classes.searchInput}
                            placeholder="输入地址"
                        />
                        <Button className={classes.searchButton}>
                            <Link to={RouterConfig.areaSearch} className={classes.clearA}>
                                马上找房
                            </Link>
                        </Button>
                    </div>
                </CardMedia>
                <RentTypePopper anchorEl={this.state.rentTypeAnchorEl} open={this.state.rentTypePopperOpen}
                                handler={this.openRentTypePopper} clickPopperId={this.state.clickPopperId}/>
                <Grid container xs={12} className={classes.contentLayout} spacing={24}>
                    <Grid item xs={3}>
                        <Card className={classes.contentCard}>
                            <CardMedia
                                component="img"
                                className={classes.contentImage}
                                image={onLineConnect}
                            >
                            </CardMedia>
                            <CardContent className={classes.contentText}>
                                <Typography variant="title">
                                    全球节点
                                </Typography>
                                <Typography variant="body" className={classes.contentTextBody}>
                                    数据存储在世界各地节点上
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className={classes.contentCard}>
                            <CardMedia
                                component="img"
                                className={classes.contentImage}
                                image={safe}
                            >
                            </CardMedia>
                            <CardContent className={classes.contentText}>
                                <Typography variant="title">
                                    挖矿确认
                                </Typography>
                                <Typography variant="body" className={classes.contentTextBody}>
                                    不可随意篡改、安全可靠
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className={classes.contentCard}>
                            <CardMedia
                                component="img"
                                className={classes.contentImage}
                                image={transaction}
                            >
                            </CardMedia>
                            <CardContent className={classes.contentText}>
                                <Typography variant="title">
                                    直接交易
                                </Typography>
                                <Typography variant="body" className={classes.contentTextBody}>
                                    无中介、点对点达成交易
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className={classes.contentCard}>
                            <CardMedia
                                component="img"
                                className={classes.contentImage}
                                image={contractSvg}
                            >
                            </CardMedia>
                            <CardContent className={classes.contentText}>
                                <Typography variant="title">
                                    智能合约
                                </Typography>
                                <Typography variant="body" className={classes.contentTextBody}>
                                    智能租赁协议、永久运行
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
Middle.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Middle);