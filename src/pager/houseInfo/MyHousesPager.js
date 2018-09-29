/**
 * Created by chenqilong on 2018/9/11.
 */
import React from "react";
import {withStyles} from "@material-ui/core/styles/";
import PropTypes from 'prop-types';
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import Home from './Home';
import Router from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
import ToolBar from '../../component/ToolBarTop';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import lightblue from '@material-ui/core/colors/lightblue';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Pagination from '../../component/Pagination';

const styles = theme =>({
    primary: {
        color: blue[100]
    },
    root: {
        margin: '0 auto',
        left: 0,
        right: 0,
        width: 1000,
        minHeight:750
    },
    content: {
        width: '100%',
    },
    contentPaper: {
        "&:hover": {
            boxShadow: `0px 0px 5px ${grey[600]}`
        },
        border: `1px solid ${grey[400]}`,
        borderRadius: 4,
        cursor: 'pointer',

    },
    paperLeft: {
        borderRight: `1px solid ${grey[400]}`,
        paddingTop: 8,
        paddingBottom: 8,
        width: '100%',
        "& p": {
            "margin-block-end": 0,
            "margin-block-start": 0,
            paddingLeft: 8,
            paddingTop: 1,
            paddingBottom: 1
        },
        '& h1': {
            color: '#000',
            fontSize: 16,
            borderBottom: `1px dashed ${grey[400]}`,
            paddingLeft: 8,
            "margin-block-end": 0,
            "margin-block-start": 0,
            paddingBottom: 8,

        },
        '& p span': {
            paddingRight: 8,
            color: grey[800],
            textAlign: 'center',
            fontSize: 14,
        },
        '& p strong': {
            paddingLeft: 8,
            color: '#000',
            textAlign: 'center',
            fontWeight: 'initial'
        },
    },
    paperRight: {
        width: '100%',
        backgroundColor: "#eaecf5",
        '& h1': {
            color: '#000',
            fontSize: 16,
            borderBottom: `1px solid ${grey[400]}`,
            // paddingLeft: 8,
            "margin-block-end": 0,
            "margin-block-start": 0,
            paddingTop: 8,
            paddingBottom: 8,
            textAlign: 'center'
        }, '& p span': {
            paddingRight: 8,
            color: grey[800],
            textAlign: 'center',
            fontSize: 14,
        },
        '& p strong': {
            paddingLeft: 8,
            color: '#000',
            textAlign: 'center',
            fontWeight: 'initial'
        },
    },
    controlDiv: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: 200,
        '& button': {
            background: blue[400],
            color: '#fff',
            marginTop: 16
        },
        '& button:hover': {
            background: '#fff',
            border: `1px solid ${blue[400]}`,
            color: blue[400],
            // padding:'8px 15px'
        }
    },
    pageLayout: {
        width: '100%',
        textAlign: 'right'
    }
});

class MyHousesPager extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        isRent: false
    }
    handleChange = (name)=> {
        console.log(name)
        this.setState({

            [name]: !this.state[name]
        })


    }

    render() {
        const {classes, location,} = this.props;
        return (
            <div className={classes.root}>
                <ToolBar currentLocation={location} placeText="快速查找我的房源"/>
                <div className={classes.content}>
                    <Grid container xs={12} spacing={16}>
                        <Grid item xs={4}>

                            <Grid container xs={12} className={classes.contentPaper}>
                                <Grid item xs={7} className={classes.paperLeft}>
                                    <h1>
                                        14幢1单元601
                                    </h1>
                                    <p>
                                        <span>地&nbsp;·&nbsp;址</span>
                                        <strong>紫金花路88号</strong>
                                    </p>
                                    <p>
                                        <span>小&nbsp;·&nbsp;区</span>
                                        <strong>嘉禾花苑</strong>
                                    </p>
                                    <p>
                                        <span>户&nbsp;·&nbsp;型</span>
                                        <strong>1室0厅1卫</strong>
                                    </p>
                                    <p>
                                        <span>面&nbsp;·&nbsp;积</span>
                                        <strong>27平米</strong>
                                    </p>
                                    <p>
                                        <span>价&nbsp;·&nbsp;格</span>
                                        <strong>1800元/月</strong>
                                    </p>

                                    <h1 style={{borderTop: `1px solid ${grey[400]}`, paddingTop: 8}}>
                                        房源状态
                                    </h1>

                                    <p>
                                        <span>房源是否出租</span>
                                        <strong>已出租</strong>
                                    </p>
                                    <p>
                                        <span>房源是否下架</span>
                                        <strong>未下架</strong>
                                    </p>
                                </Grid>
                                <Grid item xs={5} className={classes.paperRight}>
                                    <h1>操作房源</h1>
                                    <div className={classes.controlDiv}>
                                        <Button>查看合约</Button>
                                        <Button>下架房源</Button>
                                        <Button>创建合约</Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>

                            <Grid container xs={12} className={classes.contentPaper}>
                                <Grid item xs={7} className={classes.paperLeft}>
                                    <h1>
                                        14幢1单元601
                                    </h1>
                                    <p>
                                        <span>地&nbsp;·&nbsp;址</span>
                                        <strong>紫金花路88号</strong>
                                    </p>
                                    <p>
                                        <span>小&nbsp;·&nbsp;区</span>
                                        <strong>嘉禾花苑</strong>
                                    </p>
                                    <p>
                                        <span>户&nbsp;·&nbsp;型</span>
                                        <strong>1室0厅1卫</strong>
                                    </p>
                                    <p>
                                        <span>面&nbsp;·&nbsp;积</span>
                                        <strong>27平米</strong>
                                    </p>
                                    <p>
                                        <span>价&nbsp;·&nbsp;格</span>
                                        <strong>1800元/月</strong>
                                    </p>

                                    <h1 style={{borderTop: `1px solid ${grey[400]}`, paddingTop: 8}}>
                                        房源状态
                                    </h1>

                                    <p>
                                        <span>房源是否出租</span>
                                        <strong>已出租</strong>
                                    </p>
                                    <p>
                                        <span>房源是否下架</span>
                                        <strong>未下架</strong>
                                    </p>
                                </Grid>
                                <Grid item xs={5} className={classes.paperRight}>
                                    <h1>操作房源</h1>
                                    <div className={classes.controlDiv}>
                                        <Button>查看合约</Button>
                                        <Button>下架房源</Button>
                                        <Button>创建合约</Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>

                            <Grid container xs={12} className={classes.contentPaper}>
                                <Grid item xs={7} className={classes.paperLeft}>
                                    <h1>
                                        14幢1单元601
                                    </h1>
                                    <p>
                                        <span>地&nbsp;·&nbsp;址</span>
                                        <strong>紫金花路88号</strong>
                                    </p>
                                    <p>
                                        <span>小&nbsp;·&nbsp;区</span>
                                        <strong>嘉禾花苑</strong>
                                    </p>
                                    <p>
                                        <span>户&nbsp;·&nbsp;型</span>
                                        <strong>1室0厅1卫</strong>
                                    </p>
                                    <p>
                                        <span>面&nbsp;·&nbsp;积</span>
                                        <strong>27平米</strong>
                                    </p>
                                    <p>
                                        <span>价&nbsp;·&nbsp;格</span>
                                        <strong>1800元/月</strong>
                                    </p>

                                    <h1 style={{borderTop: `1px solid ${grey[400]}`, paddingTop: 8}}>
                                        房源状态
                                    </h1>

                                    <p>
                                        <span>房源是否出租</span>
                                        <strong>已出租</strong>
                                    </p>
                                    <p>
                                        <span>房源是否下架</span>
                                        <strong>未下架</strong>
                                    </p>
                                </Grid>
                                <Grid item xs={5} className={classes.paperRight}>
                                    <h1>操作房源</h1>
                                    <div className={classes.controlDiv}>
                                        <Button>下架房源</Button>
                                        <Button>查看合约</Button>
                                        <Button>创建合约</Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.pageLayout}>
                    <Pagination/>
                </div>
            </div>

        )
            ;
    }
}

MyHousesPager.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MyHousesPager);