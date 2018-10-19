/**
 * Created by chenqilong on 2018/9/11.
 */
import React from "react";
import {withStyles} from "@material-ui/core/styles/";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {parseLocation} from "../../Utils/util";
import IconButton from "@material-ui/core/IconButton";
import grey from "@material-ui/core/colors/grey";
import blue from "@material-ui/core/colors/blue";
import orange from "@material-ui/core/colors/orange";

import areas from "../../data/areas.json";
import streets from "../../data/streets.json";

import HouseInfo from '../../data/HouseInfo.js'

import SearchCondition from '../../component/SearchCondition';
import room from '../../statics/images/room.jpg';
import CardMedia from "@material-ui/core/CardMedia";
import Pagination from '../../component/Pagination';
import Navigation from '../../component/ToolBarTop';
import connect from "react-redux/es/connect/connect";
import {MapDispatchToProps, MapStateToProps} from "../../config/ReduxMapToPropsConfig";
import RouterConfig from "../../config/RouteConfig";
import Link from "react-router-dom/Link";
import {isEmpty} from '../../Utils/util.js';

const styles = theme => ({

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
        width: '8%',
        padding: '8px 16px',
        color: grey[600],

    },
    checkedCodition: {
        color: blue[500],
    },
    conditionDetail: {
        width: '95%',
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
    },

});
const RENT_TYPE = 'RENT_TYPE';
const HOUSE_TYPE = 'HOUSE_TYPE';
const FEE_TYPE = 'FEE_TYPE';
const STREET_TYPE = 'STREET_TYPE';
const AREAS_TYPE = 'AREA_TYPE';
const ALL_CLOSE = 'ALL_CLOSE';

const LOADING_INFO = '正在加载中请耐心等待';
const RESULT_INFO = '未检索到数据';
const SEARCH_VALUE = 'SEARCH_VALUE';

class AreaSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        area: [],
        streetsConditionArr: [],
        areasConditionArr: [
            {
                name: "不限",
                checked: true,
                code: 0
            }
        ],
        rentTypeArr: [
            {
                type: "不限",
                checked: true,
                typeId: 3
            },
            ...HouseInfo.rentType
        ],
        houseTypeArr: [
            {
                type: "不限",
                checked: true,
                typeId: 3
            },
            ...HouseInfo.houseType
        ],
        rentFeeArr: [
            {
                type: "不限",
                checked: true,
                typeId: 0
            },
            {
                type: "0-1500",
                checked: false,
                typeId: 1
            },
            {
                type: "1500-2500",
                checked: false,
                typeId: 2
            },
            {
                type: "2500-3500",
                checked: false,
                typeId: 3
            },
            {
                type: "3500-4500",
                checked: false,
                typeId: 4
            },
            {
                type: "4500-8000",
                checked: false,
                typeId: 5
            },


        ],
        hadSelectedCondition: [],
        currentRentType: {checked: false},
        currentAreas: {checked: false},
        currentHouseType: {checked: false},
        currentStreetsType: {checked: false},
        currentFeeType: {checked: false},
        page: 1,
        pageSize: 10,
        pageInfo: {
            data: [HouseInfo.detailInfo],
            pageCount: 0,
            total: 0
        },
        loading: true,
        info: LOADING_INFO,
        searchValue: ""

    };
    selectedCondition = () => {
        this.setState({
            loading: true,
            info: LOADING_INFO
        });

        const {currentFeeType, currentStreetsType, currentAreas, currentHouseType, currentRentType, searchValue} = this.state;
        const {ipfsUtils, currentCity, allHouseInfoData, houseInfoByCondition} = this.props;
        let area, street, houseType, rentType, feeType, search;
        if (currentAreas.checked != false) {
            area = currentAreas.code;
        }
        if (currentStreetsType.checked != false) {
            street = currentStreetsType.name;
        }
        if (currentRentType.checked != false) {
            rentType = currentRentType.type;
        }
        if (currentHouseType.checked != false) {
            houseType = currentHouseType.type;
        }
        if (currentFeeType.checked != false) {
            feeType = currentFeeType.type;
        }
        if (!isEmpty(searchValue.trim())) {
            search = searchValue;
        }

        houseInfoByCondition.then(result => {
            // console.log(result);
            ipfsUtils.getHouseInfoByCondition(result, currentCity.code, area, street, rentType, houseType, feeType, search)
                .then(result => {
                    // console.log("asdfsfsafsafasfsa", result);
                    const pageInfo = ipfsUtils.getPageInfo(result, this.state.page, this.state.pageSize);
                    let info;
                    if (result.length == 0) {
                        this.setState({
                            info: RESULT_INFO
                        })
                    }
                    this.setState({
                        loading: false,
                        pageInfo
                    });
                })
        });

    };
    initUrlParam = () => {

        let search = this.props.location.search;
        let urlSearchParams = new URLSearchParams(search.substr(1));
        let houseType = urlSearchParams.get("rentType");
        let detailAddress = urlSearchParams.get("detailAddress");
        if (!isEmpty(houseType) && houseType != "全部") {
            let typeId;
            if (houseType == "整租") {
                typeId = 0
            }
            if (houseType == "合租") {
                typeId = 1
            }
            const currentHouseType = {
                type: houseType,
                typeId
            };
            this.changeTypeArr(currentHouseType, HOUSE_TYPE);
        }
        if (!isEmpty(detailAddress)) {
            this.setState({
                searchValue: detailAddress
            }, () => {
                this.selectedCondition();
            })
        }

    }

    componentDidMount() {
        let {houseInfoByCondition, ipfsUtils, location} = this.props;
        let {page, pageSize} = this.state;


        houseInfoByCondition.then(result => {
            // console.log(result, "componeDidMount");
            if (result.length == 0) {
                this.setState({
                    info: RESULT_INFO
                })
            }
            let pageInfo = ipfsUtils.getPageInfo(result, page, pageSize);
            // console.log(pageInfo);
            this.setState({
                pageInfo,
                loading: false,

            }, () => {
                this.initUrlParam();
            });

        });
        let {currentCity} = this.props;
        let {areasConditionArr} = this.state;

        areas.map((area, index) => {
            if (area.cityCode == currentCity.code) {
                area.checked = false;
                areasConditionArr.push(area);
            }

        });
        this.setState({
            areasConditionArr
        })
    }

    componentWillReceiveProps(nextProps, state) {

        const {classes, houseInfoByCondition, ipfsUtils} = nextProps;
        const {page, pageSize} = this.state;
        houseInfoByCondition.then(result => {
            // console.log(result);
            let pageInfo = ipfsUtils.getPageInfo(result, page, pageSize);
            let info = this.state.info;
            if (result == 0) {
                info = "未检测到数据";
            }
            this.setState({
                info: info,
                loading: false,
                pageInfo,
            })
        })
    }

    changeAreasChecked = (areas) => {

        let areasConditionArr = this.state.areasConditionArr;
        areasConditionArr.map((obj, index) => {
            obj.checked = false;
            if (areas.code == obj.code) {
                obj.checked = true;
            }
        });
        if (areas.name == "不限") {
            this.setState({
                streetsConditionArr: [],
                currentStreetsType: {checked: false}
            })
        }else{
            this.setState({
                areasConditionArr,
                currentAreas: areas
            }, () => {
                this.selectedCondition(areas, AREAS_TYPE);
            })
        }

    };
    changeStreetsChecked = (streets) => {

        let streetsConditionArr = this.state.streetsConditionArr;
        streetsConditionArr.map((obj, index) => {
            obj.checked = false;
            if (streets.name == obj.name) {
                obj.checked = true;
            }
        });
        if (streets.name == "不限") {
            this.setState({
                currentStreetsType: {checked: false}
            })
        }else{
            this.setState({
                streetsConditionArr,
                currentStreetsType: streets,
            }, () => {
                this.selectedCondition(streets, STREET_TYPE);
            })
        }

    };
    changeStreetInfo = (areas) => {
        this.changeAreasChecked(areas);
        let AMap = window.AMap;
        var opts = {
            subdistrict: 3,   //返回下一级行政区
            showbiz: false,  //最后一级返回街道信息
            level: 'district',
        };
        let arr = [{
            name: '不限',
            checked: true,
            adcode: 0
        }];

        new Promise(resolve => {

            AMap.plugin('AMap.DistrictSearch', function () {
                let district = new AMap.DistrictSearch(opts);//注意：需要使用插件同步下发功能才能这样直接使用
                district.search(areas.code, function (status, result) {
                    let districtList = result.districtList[0].districtList;
                    if (status == 'complete') {
                        if (result.info == 'OK') {
                            districtList.map((obj, index) => {
                                obj.checked = false;
                                arr.push(obj)
                            });
                        }
                    }
                    if (arr.length == districtList.length + 1) {
                        resolve(arr);
                    }
                });
            });
        }).then(result => {
            this.setState({
                streetsConditionArr: result
            })
        })
    }
    changeTypeArr = (value, type) => {
        // console.log(value, type);
        let arr = [];
        switch (type) {
            case RENT_TYPE:

                let rentTypeArr = this.state.rentTypeArr;
                rentTypeArr.map((obj, index) => {
                    obj.checked = false;
                    if (obj.typeId == value.typeId) {
                        obj.checked = true;
                    }
                });
                if (value.type == "不限") {
                    this.setState({
                        currentRentType: {checked: false}
                    })
                } else {
                    this.setState({
                        rentTypeArr,
                        currentRentType: value
                    }, () => {
                        this.selectedCondition(value, RENT_TYPE);
                    });
                }
                break;
            case HOUSE_TYPE:

                let houseTypeArr = this.state.houseTypeArr;
                houseTypeArr.map((obj, index) => {
                    obj.checked = false;
                    if (obj.typeId == value.typeId) {
                        obj.checked = true;
                    }
                });
                if (value.type == "不限") {
                    this.setState({
                        currentHouseType: {checked: false}
                    })
                } else {
                    this.setState({
                        houseTypeArr,
                        currentHouseType: value
                    }, () => {

                        this.selectedCondition(value, HOUSE_TYPE);
                    });
                }

                break;
            case FEE_TYPE:

                let rentFeeArr = this.state.rentFeeArr;
                rentFeeArr.map((obj, index) => {
                    obj.checked = false;
                    if (obj.typeId == value.typeId) {
                        obj.checked = true;
                    }
                });
                if (value.type == "不限") {
                    this.setState({
                        currentFeeType: {checked: false}
                    })
                } else {
                    this.setState({
                        rentFeeArr,
                        currentFeeType: value
                    }, () => {
                        this.selectedCondition(value, FEE_TYPE);
                    });
                }

                break;
        }

    };
    closeAll = () => {
        this.closeFeeTypeCondition();
        this.closeHouseTypeCondition();
        this.closeRentTypeCondition();
        this.closeAreasCondition();
        this.selectedCondition(undefined, ALL_CLOSE);
    };
    closeAreasCondition = () => {
        const areasConditionArr = this.state.areasConditionArr;
        areasConditionArr.forEach((obj, index) => {
            if (obj.name == "不限") {
                obj.checked = true;
            } else {
                obj.checked = false;
            }
        });
        this.setState({
            currentAreas: {checked: false},
            areasConditionArr,
            streetsConditionArr: [],
            currentStreetsType: {checked: false}
        });
        this.selectedCondition(undefined, AREAS_TYPE);
    };
    closeStreetCondition = () => {
        const streetsConditionArr = this.state.streetsConditionArr;
        streetsConditionArr.forEach((obj, index) => {
            if (obj.name == "不限") {
                obj.checked = true;
            } else {
                obj.checked = false;
            }
        });
        this.setState({
            streetsConditionArr,
            currentStreetsType: {checked: false}

        })
        this.selectedCondition(undefined, STREET_TYPE);
    };
    closeRentTypeCondition = () => {
        const rentTypeArr = this.state.rentTypeArr;
        rentTypeArr.forEach((obj, index) => {
            if (obj.type == "不限") {
                obj.checked = true;
            } else {
                obj.checked = false;
            }
        });
        this.setState({
            rentTypeArr,
            currentRentType: {checked: false}
        })
        this.selectedCondition(undefined, RENT_TYPE);
    };
    closeHouseTypeCondition = () => {
        const houseTypeArr = this.state.houseTypeArr;
        houseTypeArr.forEach((obj, index) => {
            if (obj.type == "不限") {
                obj.checked = true;
            } else {
                obj.checked = false;
            }
        });
        this.setState({
            houseTypeArr,
            currentHouseType: {checked: false}
        })
        this.selectedCondition(undefined, HOUSE_TYPE);
    };
    closeFeeTypeCondition = () => {
        const rentFeeArr = this.state.rentFeeArr;
        rentFeeArr.forEach((obj, index) => {
            if (obj.type == "不限") {
                obj.checked = true;
            } else {
                obj.checked = false;
            }
        });
        this.setState({
            rentFeeArr,
            currentFeeType: {checked: false}
        })
        this.selectedCondition(undefined, FEE_TYPE);
    };

    handleChange = (value, event) => {
        let {ipfsUtils, houseInfoByCondition} = this.props;
        let {pageSize} = this.state;
        houseInfoByCondition.then(result => {
            let pageInfo = ipfsUtils.getPageInfo(result, value, pageSize);
            // console.log(pageInfo, value);
            this.setState({
                pageInfo,
                page: value
            })
            ;
        });
    };

    searchValueChange = (e) => {
        if (e.keyCode == "13") {

            this.setState({
                searchValue: e.target.value

            }, () => {
                this.selectedCondition();
            });
        }
        this.setState({
            searchValue: e.target.value

        });

    }

    render() {
        const {classes, location,} = this.props;
        const {searchValue, loading, pageInfo, page, pageSize, currentFeeType, info, currentStreetsType, currentAreas, currentHouseType, currentRentType, houseInfoByCondition} = this.state;
        var path = location.pathname;
        var pathName = path.split('/')[1].toString();
        let parsePath = parseLocation(location);
        // console.log(currentAreas, this.state);
        return (
            <div className={classes.root}>
                <div>
                    <Navigation currentLocation={location} value={searchValue}
                                searchValueChange={this.searchValueChange}
                                selectedCondition={this.selectedCondition}

                    />
                    <div style={{backgroundColor: '#fff', padding: '8px 24px'}}>
                        <div className={classes.conditionLayout}>
                            <Typography className={classes.conditionTitle}>房源位置</Typography>

                            <div className={classes.conditionDetail}>
                                <div>
                                    {
                                        this.state.areasConditionArr.map((value, index) => {
                                            return (

                                                <Button
                                                    onClick={(e) => {
                                                        this.changeStreetInfo(value)
                                                    }}
                                                    className={value.checked ? classes.checkedCodition : ""}
                                                >
                                                    {value.name}
                                                </Button>
                                            )
                                        })

                                    }
                                </div>
                                <div className={classes.conditionExtends}>
                                    {
                                        this.state.streetsConditionArr.map((value, index) => {
                                            return (

                                                <Button
                                                    onClick={(e) => {
                                                        this.changeStreetsChecked(value);
                                                    }}
                                                    className={value.checked ? classes.checkedCodition : ""}
                                                >{value.name}</Button>
                                            )
                                        })

                                    }
                                </div>
                            </div>
                        </div>
                        <SearchCondition conditionTitle="出租类型" type={RENT_TYPE} conditions={this.state.rentTypeArr}
                                         changeTypeArr={this.changeTypeArr}/>
                        <SearchCondition conditionTitle="房源类型" type={HOUSE_TYPE} conditions={this.state.houseTypeArr}
                                         changeTypeArr={this.changeTypeArr}/>
                        <SearchCondition conditionTitle="房源租金"
                                         conditions={this.state.rentFeeArr} type={FEE_TYPE}
                                         changeTypeArr={this.changeTypeArr}/>
                    </div>
                </div>
                <div className={classes.toolBar}>
                    <div className={classes.navigation}>
                        <div style={{color: `${grey[600]}`, paddingRight: '24px', fontSize: '16px'}}>筛选条件</div>
                    </div>
                    {
                        currentAreas.checked ?
                            <div className={classes.selectedLayout}>
                                    <span>
                                        {currentAreas.name}
                                        <IconButton
                                            onClick={e => {
                                                this.closeAreasCondition()
                                            }}
                                            className={classes.selectedIconButton}>
                                        X
                                    </IconButton>
                                    </span>
                            </div> : <div style={{display: 'none'}}></div>
                    }
                    {
                        currentStreetsType.checked ?
                            <div className={classes.selectedLayout}>
                                    <span>{currentStreetsType.name}
                                        <IconButton
                                            onClick={e => {
                                                this.closeStreetCondition()
                                            }}
                                            className={classes.selectedIconButton}>
                                        X
                                    </IconButton>
                                    </span>
                            </div> : <div style={{display: 'none'}}></div>
                    }
                    {
                        currentRentType.checked ?
                            <div className={classes.selectedLayout}>
                                    <span>{currentRentType.type}
                                        <IconButton
                                            onClick={e => {
                                                this.closeRentTypeCondition()
                                            }}
                                            className={classes.selectedIconButton}>
                                        X
                                    </IconButton>
                                    </span>
                            </div> : <div style={{display: 'none'}}></div>
                    }
                    {
                        currentHouseType.checked ?
                            <div className={classes.selectedLayout}>
                                    <span>{currentHouseType.type}
                                        <IconButton
                                            onClick={e => {
                                                this.closeHouseTypeCondition()
                                            }}
                                            className={classes.selectedIconButton}>
                                        X
                                    </IconButton>
                                    </span>
                            </div> : <div style={{display: 'none'}}></div>
                    }
                    {
                        currentFeeType.checked ?
                            <div className={classes.selectedLayout}>
                                    <span>{currentFeeType.type}
                                        <IconButton
                                            onClick={e => {
                                                this.closeFeeTypeCondition()
                                            }}
                                            className={classes.selectedIconButton}>
                                        X
                                    </IconButton>
                                    </span>
                            </div> : <div style={{display: 'none'}}></div>
                    }


                    <span style={{color: blue[400], float: 'right'}}
                          onClick={e => {
                              this.closeAll()
                          }}>
                        清空筛选
                    </span>
                </div>
                {
                    loading ? <div>{info}</div> :
                        pageInfo.total == 0 ? <div>{info}</div> :
                            pageInfo.data.map((obj, index) => {
                                return (
                                    <Link
                                        to={`${RouterConfig.houseDetail.path}?id=${(page - 1) * pageSize + index + 1}`}>
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
                                                        <Typography variant="title"
                                                                    className={classes.itemContentTextTitle}>
                                                            {obj.rentType.type}<i>&nbsp;·&nbsp;</i>{obj.locationInfo.estatName}
                                                        </Typography>
                                                        <Typography className={classes.itemContentTextBody}>
                                                            {obj.houseType.type}&nbsp;·&nbsp;{obj.houseArea}平米&nbsp;·&nbsp;{obj.houseOrientation.type}
                                                        </Typography>
                                                        <Typography className={classes.itemContentTextBody}>
                                                            {obj.detailIntroduce}
                                                        </Typography>
                                                        <div className={classes.itemContentTagsContent}>
                                                <span className={classes.itemContentTags}>
                                                    {obj.decorateLevel.type}
                                                </span>
                                                            <span className={classes.itemContentTags}>
                                                    押{obj.payType.cashPledgeNum}付{obj.payType.cashPayNum}
                                                </span>
                                                            <span className={classes.itemContentTags}>
                                                    {obj.houseAppreciation.room}室{obj.houseAppreciation.hall}厅{obj.houseAppreciation.toilet}卫
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
                                    </Link>
                                )
                            })
                }
                <div className={classes.pageLayout}>
                    <Pagination page={pageInfo.total == 0 ? 0 : page} pageCount={pageInfo.pageCount}
                                total={pageInfo.total}
                                changePage={this.handleChange}/>
                </div>
            </div>
        );
    }
}

AreaSearch.propTypes = {
    classes: PropTypes.object.isRequired,
};
AreaSearch = connect(MapStateToProps, MapDispatchToProps)(AreaSearch);
export default withStyles(styles)(AreaSearch);