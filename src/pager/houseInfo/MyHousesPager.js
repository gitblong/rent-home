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
import connect from "react-redux/es/connect/connect";
import {MapDispatchToProps, MapStateToProps} from "../../config/ReduxMapToPropsConfig";
import Tooltip from '@material-ui/core/Tooltip';
import RouterConfig from "../../config/RouteConfig";
import Link from "react-router-dom/Link";
import {isEmpty} from "../../Utils/util";

const styles = theme => ({
    primary: {
        color: blue[100]
    },
    root: {
        margin: '0 auto',
        left: 0,
        right: 0,
        width: 1000,
        minHeight: 750
    },
    content: {
        width: '100%',
        "& a": {
            textDecoration: 'none'
        }
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
            // textAlign: 'center',
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
    },

    textOneLine: {
        display: 'inline-block', /*内联对象需加*/
        wordBreak: 'keepAll', /* 不换行 */
        whiteSpace: 'nowrap', /* 不换行 */
        overflow: 'hidden', /* 内容超出宽度时隐藏超出部分的内容 */
        textOverflow: 'ellipsis', /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
        width: "65%",
        marginBottom: -6,
    }

});
const LOADING_INFO = "正在加载，请耐心等待";
const LOADING_UN_RESULT = "未检测到数据";

class MyHousesPager extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        isRent: false,
        landlordHouseInfo: [],
        page: 1,
        pageSize: 9,
        pageInfo: {
            data: [],
            pageCount: 0,
            total: 0
        },
        loading: true
    };


    componentDidMount() {
        const {ipfsUtils} = this.props;
        const {page, pageSize} = this.state;
        const landlordHouseInfo = ipfsUtils.getLandlordHouseInfo()
            .then(result => {
                // console.log(result);
                let pageInfo = ipfsUtils.getPageInfo(result, page, pageSize);
                // console.log(pageInfo);
                ipfsUtils.getShowHouseInfoCount().then(res => {
                    this.setState({
                        pageInfo,
                        landlordHouseInfo: result,
                        loading: false,
                        showCount: res
                    });
                });


            })
    }

    changePage = (value) => {
        let {ipfsUtils} = this.props;
        let {pageSize, landlordHouseInfo} = this.state;
        let pageInfo = ipfsUtils.getPageInfo(landlordHouseInfo, value, pageSize);
        // console.log(pageInfo, value);
        this.setState({
            pageInfo,
            page: value
        });
    };

    selectedCondition = (searchValue) => {
        // console.log(searchValue, "selectedCondition");
        let {page, pageSize, landlordHouseInfo} = this.state;
        let {ipfsUtils,} = this.props;
        ipfsUtils.getLandlordHouseInfoByCondition(landlordHouseInfo, searchValue)
            .then(result => {
                // console.log(result);
                let pageInfo = ipfsUtils.getPageInfo(result, page, pageSize);
                // console.log(pageInfo);
                this.setState({
                    pageInfo,
                });
            })
    };

    searchValueChange = (e) => {
        // console.log(e.target.value);
        this.setState({
            searchValue: e.target.value
        })
    };

    handleChange = (name) => {
        // console.log(name)
        this.setState({

            [name]: !this.state[name]
        })


    };
    updateHouseStatus = (_status, _index) => {
        let {ipfsUtils} = this.props;
        let {page, pageSize, searchValue} = this.state;
        ipfsUtils.updateHouseStatus(_status, _index)
            .then(response => {
                console.log(response);
                if (response.status) {

                    ipfsUtils.getLandlordHouseInfo()
                        .then(landlordHouseInfo => {
                            ipfsUtils.getLandlordHouseInfoByCondition(landlordHouseInfo, searchValue)
                                .then(landlordHouseInfoByCondition => {
                                    let pageInfo = ipfsUtils.getPageInfo(landlordHouseInfoByCondition, page, pageSize);
                                    this.setState({
                                        pageInfo,
                                        landlordHouseInfo: landlordHouseInfo,
                                    });
                                })
                        });
                }
            });
    }



    render() {
        const {classes, location,} = this.props;
        const {pageInfo, page, pageSize, loading} = this.state;
        return (
            <div className={classes.root}>
                <ToolBar currentLocation={location} placeText="快速查找我的房源" selectedCondition={this.selectedCondition}
                         searchValueChange={this.searchValueChange}/>
                <div className={classes.content}>
                    {loading ? LOADING_INFO : ""}
                    {pageInfo.total == 0 ? LOADING_UN_RESULT : ""}
                    <Grid container xs={12} spacing={16}>
                        {
                            pageInfo.data.map((object, index) => {
                                let obj = object.houseDetailInfo;

                                return (<Grid item xs={4}>


                                    <Grid container xs={12} className={classes.contentPaper} key={index}>
                                        <Grid item xs={7} className={classes.paperLeft}>
                                            <Link
                                                to={`${RouterConfig.houseDetail.path}?id=${object.index}`}>
                                                <h1>
                                                    {obj.houseNum}
                                                </h1>
                                                <p>
                                                    <span>地&nbsp;·&nbsp;址</span>
                                                    <Tooltip title={obj.locationInfo.detailAddress}>
                                                        <strong
                                                            className={classes.textOneLine}>{obj.locationInfo.detailAddress}</strong>
                                                    </Tooltip>
                                                </p>
                                                <p>
                                                    <span>小&nbsp;·&nbsp;区</span>
                                                    <Tooltip title={obj.locationInfo.estatName}>
                                                        <strong
                                                            className={classes.textOneLine}>{obj.locationInfo.estatName}</strong>
                                                    </Tooltip>
                                                </p>
                                                <p>
                                                    <span>户&nbsp;·&nbsp;型</span>
                                                    <strong>{obj.houseAppreciation.room}室{obj.houseAppreciation.hall}厅{obj.houseAppreciation.toilet}卫</strong>
                                                </p>
                                                <p>
                                                    <span>面&nbsp;·&nbsp;积</span>
                                                    <strong>{obj.houseArea}平米</strong>
                                                </p>
                                                <p>
                                                    <span>价&nbsp;·&nbsp;格</span>
                                                    <strong>{obj.rentFee}元/月</strong>
                                                </p>

                                                <h1 style={{borderTop: `1px solid ${grey[400]}`, paddingTop: 8}}>
                                                    房源状态
                                                </h1>

                                                <p>
                                                    <span>房源是否出租</span>
                                                    <strong>{object.houseStatus == 2 ? "已出租" : "未出租"}</strong>
                                                </p>
                                                <p>
                                                    <span>房源是否下架</span>
                                                    <strong>{object.houseStatus != 0 ? "未下架" : "已下架"}</strong>
                                                </p>
                                            </Link>
                                        </Grid>
                                        <Grid item xs={5} className={classes.paperRight}>
                                            <h1>操作房源</h1>
                                            <div className={classes.controlDiv}>
                                                {
                                                    object.houseStatus == 2 ? <Button>查看合约</Button> :
                                                        object.houseStatus == 1 ?
                                                            <div className={classes.controlDiv}>
                                                                <Link
                                                                    to={`${RouterConfig.createContract.path}?id=${object.index}`}>
                                                                    <Button>创建房源</Button>
                                                                </Link>
                                                                <Button
                                                                    onClick={(e) => {
                                                                        this.updateHouseStatus(0, object.index)
                                                                    }}>下架房源</Button>
                                                            </div> :
                                                            object.houseStatus == 0 ?
                                                                <Button
                                                                    onClick={(e) => {
                                                                        this.updateHouseStatus(1, object.index)
                                                                    }}>展示房源</Button> : ""

                                                }

                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>)
                            })
                        }
                    </Grid>
                </div>
                <div className={classes.pageLayout}>
                    <Pagination
                        page={pageInfo.total == 0 ? 0 : page}
                        pageSize={pageSize}
                        pageCount={pageInfo.pageCount}
                        total={pageInfo.total}
                        changePage={this.changePage}
                    />
                </div>
            </div>

        )
            ;
    }
}

MyHousesPager
    .propTypes = {
    classes: PropTypes.object.isRequired
}
MyHousesPager = connect(MapStateToProps, MapDispatchToProps)(MyHousesPager)
export default withStyles(styles)

(
    MyHousesPager
)
;