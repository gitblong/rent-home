/**
 * Created by chenqilong on 2018/9/13.
 */
import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import rent from "../statics/images/room.jpg";
import AreaConditionTabs from "./AreaConditionTabs";
import Link from "react-router-dom/Link";
import grey from "@material-ui/core/colors/grey";
import RouterConfig from "../config/RouteConfig";
import Pagination from "./Pagination";

var image = require('../statics/images/rent-home.jpg');
require('../styles/Content.css');
import fetch from "isomorphic-fetch";
import "babel-polyfill";
import area from '../data/areas.json';
import blue from '@material-ui/core/colors/blue';

const styles = {
    root: {
        marginTop: 100,
        padding: 0
    },
    contetnGrid: {
        marginTop: 20,
        paddingLeft: 24
    },
    contentLayout: {
        marginTop: 20,
        left: 0,
        margin: "auto",
        right: 0,
        width: 1200,

    },
    contentCard: {
        "&:hover": {
            boxShadow: `0 0 10px 5px ${blue[200]}`
        },
        paddingTop: 0,
        cursor: 'pointer'

    },
    contentImage: {
        height: 210,
        width: 285,
        margin: 'auto',

    },
    contentText: {
        "&:last-child": {
            paddingBottom: 15
        }
    },
    contentTextBody: {
        marginTop: 20,
        color: '#8998a0'
    },
    priceTextColor: {
        color: '#ff8d1f',
        display: 'inline-block',
        fontSize: '24px',
        '&:after': {
            fontSize: '14px',
            content: `"元/每月"`,
            display: 'inline-block',
        }
    },
    pageLayout: {
        width: '100%',
        textAlign: 'right',
        paddingRight: 12,
    },
    pageText: {
        color: grey[400]
    }


};
let log = "Content----------";
class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            renderPage: false,
            info: "正在加载数据，请耐心等待",
            loadingInfo: true,
            page: 1,
            pageSize: 12,
            houseInfoByCondition:[]
        };
    }

    componentDidMount() {
        const {classes, houseInfoByCondition, ipfsUtils} = this.props;
        const {page, pageSize} = this.state;
        console.log(houseInfoByCondition);
        houseInfoByCondition.then(result => {
            console.log(result);
            let pageInfo = ipfsUtils.getPageInfo(result, page, pageSize);
            let info = this.state.info;
            if (result == 0) {
                info = "未检测到数据";
            }
            this.setState({
                info: info,
                loadingInfo: false,
                pageInfo,
                houseInfoByCondition:houseInfoByCondition
            })
        })
    }

    componentWillReceiveProps(nextProps,state){

        const {classes, houseInfoByCondition, ipfsUtils} = nextProps;
        const {page, pageSize} = this.state;
        houseInfoByCondition.then(result => {
            console.log(result);
            let pageInfo = ipfsUtils.getPageInfo(result, page, pageSize);
            let info = this.state.info;
            if (result == 0) {
                info = "未检测到数据";
            }
            this.setState({
                info: info,
                loadingInfo: false,
                pageInfo,
            })
        })
    }

    handleChange = (value, event) => {
        let {ipfsUtils, houseInfoByCondition} = this.props;
        let {pageSize} = this.state;
        houseInfoByCondition.then(result => {
            let pageInfo = ipfsUtils.getPageInfo(result, value, pageSize);
            console.log(pageInfo, value);
            this.setState({
                pageInfo,
                page: value
            })
            ;
        });
    };

    render() {
        console.log("sa-----------?")
        const {classes, ipfsUtils,changeHouseInfoByCondition,houseInfoByCondition,currentCity,allHouseInfoData} = this.props;
        const {loadingInfo, info, pageInfo, page, pageSize} = this.state;
        if (loadingInfo) return <div className={classes.contentLayout}>{info}</div>
        return (
            <div className={classes.contentLayout}>

                <AreaConditionTabs
                    tabsId="contentTabs"
                    hiddenTitle={false}
                    changeHouseInfoByCondition={changeHouseInfoByCondition}
                    houseInfoByCondition={houseInfoByCondition}
                    ipfsUtils={ipfsUtils}
                    currentCity={currentCity}
                    allHouseInfoData={allHouseInfoData}
                />
                <Grid container xs={12} spacing={24} className={classes.contetnGrid}>
                    {
                        pageInfo.data.map((obj, index) => {
                            return (
                                <Grid item xs={3}>
                                    <Card className={classes.contentCard}>
                                        <Link to={`${RouterConfig.houseDetail.path}?id=${(page-1)*pageSize+index+1}`}>
                                            <CardMedia
                                                component="img"
                                                className={classes.contentImage}
                                                image={ipfsUtils.domain + obj.imageArr[0]}
                                            >
                                            </CardMedia>
                                        </Link>
                                        <CardContent className={classes.contentText}>
                                            <Typography variant="title" className={classes.priceTextColor}>
                                                {obj.rentFee}
                                            </Typography>
                                            <Typography variant="body" className={classes.contentTextBody}>
                                                {obj.rentType.type}<i>·</i>{obj.locationInfo.estatName}<i>·</i>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>

                <div className={classes.pageLayout}>
                    <Pagination page={pageInfo.pageCount == 0 ? 0 : page} pageSize={pageSize}
                                pageCount={pageInfo.pageCount}
                                total={pageInfo.total}
                                changePage={this.handleChange}
                    />
                </div>
            </div>
        );
    }
}

Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);