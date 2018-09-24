/**
 * Created by chenqilong on 2018/9/11.
 */
import React from "react";
import {withStyles} from "@material-ui/core/styles/";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "react-router-dom/Link";
import RouterConfig from "../../config/RouteConfig";
import Button from "@material-ui/core/Button";
import {parseLocation} from "../../Utils/util";
import IconButton from "@material-ui/core/IconButton";
import Search from "@material-ui/icons/Search";
import grey from "@material-ui/core/colors/grey";
import blue from "@material-ui/core/colors/blue";
import orange from "@material-ui/core/colors/orange";

import areas from "../../data/areas.json";
import SearchCondition from '../../component/SearchCondition';
import Chip from '@material-ui/core/Chip';
import Delete from '@material-ui/icons/Delete';
import AreaConditionTabs from '../../component/AreaConditionTabs';
import room from '../../statics/images/room.jpg';
import CardMedia from "@material-ui/core/CardMedia";
import Pagination from '../../component/Pagination';
import Navigation from '../../component/ToolBarTop';
const styles = theme =>({

    root: {
        width: 1000,
        margin: 'auto',
        left: 0,
        right: 0,
        "& div": {
            boxShadow: 'none'
        },
        color: '#66747f',
        fontSize: '14px',
        "& a": {
            color: '#66747f',
            textDecoration: 'none',
            "&:hover": {
                color: "#4fcbff"
            },
            textAlign: 14
        },
    },
    toolBar: {
        height: 50,
        margin: '24px 0px',
        position: 'relative',
        flexWrap: 'wrap',
        width: '100%',
        maxWidth: '100%',
        flexBasis: '100%',
        lineHeight: '50px'
    },
    navigation: {
        display: 'inline-block',
        margin: "auto 0",
        lineHeight: '50px',
        float: 'left'
    },
    searchTool: {
        right: 0,
        top: 0,
        border: '1px solid rgb(217, 227, 244)',
        borderRadius: "4px",
        backgroundColor: '#fff',
        float: 'right'
    },
    searchInput: {
        background: "#fdfeff",
        border: "none",
        borderRadius: "4px",
        width: "430px",
        height: "48px",
        boxSizing: "border-box",
        fontSize: "14px",
        paddingLeft: "16px",
    },
    conditionLayout: {
        display: 'flex',
        width: '100%',
        borderBottom: `1px solid ${grey[300]}`,
        backgroundColor: '#fff'
    },
    conditionTitle: {
        width: '5%',
        padding: '8px 16px',
        color: grey[600],

    },
    conditionDetail: {
        width: '95%',
        '& :focus': {
            color: blue[400]
        }
    },
    conditionExtends: {
        borderTop: `1px solid ${grey[300]}`,
        display: 'static'
    },
    selectedLayout: {
        display: 'inline',
        marginRight: '12px',
        borderRadius: '10px',
        border: `1px solid ${grey[300]}`,
        paddingRight: '0px 5px',
        lineHeight: '14px',
        fontSize: '14px',
        paddingLeft: '5px',

    },
    selectedIconButton: {
        fontSize: '12px',
        width: 'auto',
        height: 'auto',
        padding: '6px',
        lineHeight: '12px',
        marginBottom: 1
    },
    itemList: {
        width: '100%',
        clear: 'both',
        '&:before': {
            clear: 'both',
        },
        '&:after': {
            clear: 'both',
        },
    },
    item: {
        marginTop: 2,
        padding: '0 24px',
        backgroundColor: '#fff',
        position: 'relative',
        borderRadius: 0.5,
        "&:hover": {
            boxShadow: `0 0 10px 1px ${blue[100]}`
        }
    },
    itemContent: {
        padding: '24px 0px',
        display: 'flex',
        borderBottom: `1px solid ${grey[200]}`
    },
    itemContentImg: {
        // float: "left",
        cursor: 'pointer',
        width: 246,
        height: 184,
        marginRight: 24
    },
    itemContentText: {
        width: '450px',
        float: 'left',
        display: 'inline-block',

    },
    itemContentTextTitle: {
        cursor: 'pointer',
        color: orange[500],
        marginBottom: '24px',
        fontSize: 24,
        "&:hover": {
            color: blue[400]
        },
    },
    itemContentTextBody: {
        color: grey[1000],
        marginBottom: '24px'

    },
    itemContentTagsContent: {
        bottom: 0,
        display: 'flex'
    },
    itemContentTags: {
        color: grey[400],
        border: `1px solid ${grey[400]}`,
        padding: '8px 16px',
        bottom: 0,
        marginRight: 8
    },
    priceContent: {
        height: "100%",
        fontSize: '26px',
        width: 300
    },
    priceText: {
        float: 'right',
        color: orange[400],
        "&:after": {
            content: `"元/月"`,
            color: orange[400],
            fontSize: 14
        }
    },
    pageLayout: {
        width: '100%',
        textAlign: 'right'
    }


});
class AreaSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        area: []
    };

    componentWillMount() {
        let areaArray = new Array();
        areas.map((area, index) => {
            if (area.cityCode == '3301') {
                areaArray.push(area);
            }

        })

        this.setState({
            area: areaArray
        })
    }


    render() {
        const {classes, location} = this.props;
        var path = location.pathname;
        var pathName = path.split('/')[1].toString();
        let parsePath = parseLocation(location);
        return (
            <div className={classes.root}>
                <div>
                    <Navigation currentLocation={location}/>
                    <div style={{backgroundColor: '#fff', padding: '8px 24px'}}>
                        <div className={classes.conditionLayout}>
                            <Typography className={classes.conditionTitle}>区域</Typography>

                            <div className={classes.conditionDetail}>
                                <div>
                                    <Button>不限</Button>
                                    {
                                        this.state.area.map((value, index)=> {
                                            return (

                                                <Button>{value.name}</Button>
                                            )
                                        })

                                    }
                                </div>
                                <div className={classes.conditionExtends}>
                                    <Button>不限</Button>
                                    {
                                        this.state.area.map((value, index)=> {
                                            return (

                                                <Button>{value.name}</Button>
                                            )
                                        })

                                    }
                                </div>
                            </div>
                        </div>
                        <SearchCondition conditionTitle="方式" conditions={["不限", "整租", "合租"]}/>
                        <SearchCondition conditionTitle="类型" conditions={["不限", "公寓", "小区住宅"]}/>
                        <SearchCondition conditionTitle="户型" conditions={["不限", "一室", "二室", "三室", "四室及以上"]}/>
                        <SearchCondition conditionTitle="租金"
                                         conditions={["不限", "1500以下", "1500-2500", '2500-3500', '3500-4500', '4500-8000', '8000以上']}/>
                    </div>
                </div>
                <div className={classes.toolBar}>
                    <div className={classes.navigation}>
                        <div style={{color: `${grey[600]}`, paddingRight: '24px', fontSize: '16px'}}>筛选条件</div>
                    </div>
                    <div className={classes.selectedLayout}>
                        <span>燕南街道<IconButton className={classes.selectedIconButton}>X</IconButton></span>
                    </div>
                    <div className={classes.selectedLayout}>
                        <span>燕南街道<IconButton className={classes.selectedIconButton}>X</IconButton></span>
                    </div>
                    <div className={classes.selectedLayout}>
                        <span>燕南街道<IconButton className={classes.selectedIconButton}>X</IconButton></span>
                    </div>
                    <div className={classes.selectedLayout}>
                        <span>燕南街道<IconButton className={classes.selectedIconButton}>X</IconButton></span>
                    </div>
                    <div className={classes.selectedLayout}>
                        <span>燕南街道<IconButton className={classes.selectedIconButton}>X</IconButton></span>
                    </div>
                    <div className={classes.selectedLayout}>
                        <span>燕南街道<IconButton className={classes.selectedIconButton}>X</IconButton></span>
                    </div>
                    <div className={classes.selectedLayout}>
                        <span>不限<IconButton className={classes.selectedIconButton}>X</IconButton></span>
                    </div>
                    <div className={classes.selectedLayout}>
                        <span>不限<IconButton className={classes.selectedIconButton}>X</IconButton></span>
                    </div>
                    <span style={{color: blue[400], float: 'right'}}>清空筛选</span>
                </div>
                <AreaConditionTabs tabsId="searchTabs" hiddenTitle={true}
                                   conditionData={["综合排序", "价格从高到底", "价格从低到高", "面积从大到小"]}/>
                <div className={classes.itemList}>
                    <div className={classes.item}>
                        <div className={classes.itemContent}>
                            <CardMedia
                                className={classes.itemContentImg}
                                image={room}
                                component="img"
                            >
                            </CardMedia>
                            <div className={classes.itemContentText}>
                                <Typography variant="title" className={classes.itemContentTextTitle}>
                                    整租<i>&nbsp;·&nbsp;</i>嘉和花苑<i>&nbsp;·&nbsp;</i>主卧
                                </Typography>
                                <Typography className={classes.itemContentTextBody}>
                                    整套&nbsp;·&nbsp;30平米&nbsp;·&nbsp;朝南
                                </Typography>
                                <Typography className={classes.itemContentTextBody}>
                                    阳城贵都 品质三房 1楼带地下室50多米 精装全配初次出租
                                </Typography>
                                <div className={classes.itemContentTagsContent}>
                                    <span className={classes.itemContentTags}>
                                        付一押一
                                    </span>
                                    <span className={classes.itemContentTags}>
                                        付一押一
                                    </span>
                                    <span className={classes.itemContentTags}>
                                        付一押一
                                    </span>
                                    <span className={classes.itemContentTags}>
                                        付一押一
                                    </span>

                                </div>
                            </div>
                            <div className={classes.priceContent}>
                                <span className={classes.priceText}>
                                    2300
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.itemList}>
                    <div className={classes.item}>
                        <div className={classes.itemContent}>
                            <CardMedia
                                className={classes.itemContentImg}
                                image={room}
                                component="img"
                            >
                            </CardMedia>
                            <div className={classes.itemContentText}>
                                <Typography variant="title" className={classes.itemContentTextTitle}>
                                    整租<i>&nbsp;·&nbsp;</i>嘉和花苑<i>&nbsp;·&nbsp;</i>主卧
                                </Typography>
                                <Typography className={classes.itemContentTextBody}>
                                    整套&nbsp;·&nbsp;30平米&nbsp;·&nbsp;朝南
                                </Typography>
                                <Typography className={classes.itemContentTextBody}>
                                    阳城贵都 品质三房 1楼带地下室50多米 精装全配初次出租
                                </Typography>
                                <div className={classes.itemContentTagsContent}>
                                    <span className={classes.itemContentTags}>
                                        付一押一
                                    </span>
                                    <span className={classes.itemContentTags}>
                                        付一押一
                                    </span>
                                    <span className={classes.itemContentTags}>
                                        付一押一
                                    </span>
                                    <span className={classes.itemContentTags}>
                                        付一押一
                                    </span>

                                </div>
                            </div>
                            <div className={classes.priceContent}>
                                <span className={classes.priceText}>
                                    2300
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.itemList}>
                    <div className={classes.item}>
                        <div className={classes.itemContent}>
                            <CardMedia
                                className={classes.itemContentImg}
                                image={room}
                                component="img"
                            >
                            </CardMedia>
                            <div className={classes.itemContentText}>
                                <Typography className={classes.itemContentTextTitle}>
                                    整租<i>&nbsp;·&nbsp;</i>嘉和花苑<i>&nbsp;·&nbsp;</i>主卧
                                </Typography>
                                <Typography className={classes.itemContentTextBody}>
                                    整套&nbsp;·&nbsp;30平米&nbsp;·&nbsp;朝南
                                </Typography>
                                <Typography className={classes.itemContentTextBody}>
                                    阳城贵都 品质三房 1楼带地下室50多米 精装全配初次出租
                                </Typography>
                                <div className={classes.itemContentTagsContent}>
                                    <span className={classes.itemContentTags}>
                                        付一押一
                                    </span>
                                    <span className={classes.itemContentTags}>
                                        付一押一
                                    </span>
                                    <span className={classes.itemContentTags}>
                                        付一押一
                                    </span>
                                    <span className={classes.itemContentTags}>
                                        付一押一
                                    </span>

                                </div>
                            </div>
                            <div className={classes.priceContent}>
                                <Typography className={classes.priceText}>
                                    2300
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.pageLayout}>
                    <Pagination/>
                </div>
            </div>
        );
    }
}

AreaSearch.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AreaSearch);