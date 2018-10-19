/**
 * Created by chenqilong on 2018/9/11.
 */
import React from "react";
import {withStyles} from "@material-ui/core/styles/";
import PropTypes from "prop-types";
import blue from "@material-ui/core/colors/blue";
import {parseLocation} from "../../Utils/util";
import ToolBar from "../../component/ToolBarTop";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import window from "../../statics/icon/window.svg";
import air from "../../statics/icon/air.svg";
import balcony from "../../statics/icon/balcony.svg";
import broadband from "../../statics/icon/broadband.svg";
import desk from "../../statics/icon/desk.svg";
import doubleBed from "../../statics/icon/double-bed.svg";
import dresser from "../../statics/icon/dresser.svg";
import kitchen from "../../statics/icon/kitchen.svg";
import refrigerator from "../../statics/icon/refrigerator.svg";
import singleBed from "../../statics/icon/single-bed.svg";
import sofa from "../../statics/icon/sofa.svg";
import toilet from "../../statics/icon/toilet.svg";
import tv from "../../statics/icon/tv.svg";
import washingMachine from "../../statics/icon/washing-machine.svg";
import waterHeater from "../../statics/icon/water-heater.svg";

const icons = {
    window,
    air,
    balcony,
    broadband,
    desk,
    doubleBed,
    dresser,
    kitchen,
    refrigerator,
    singleBed,
    sofa,
    toilet,
    tv,
    washingMachine,
    waterHeater,
}
import room from "../../statics/images/room.jpg";
import GalleryImage from "../../component/GalleryImage";
import {Map, Marker, InfoWindow} from "react-amap";
import connect from "react-redux/es/connect/connect";
import {MapDispatchToProps, MapStateToProps} from "../../config/ReduxMapToPropsConfig";
import DetailHouseInfo from '../../data/HouseInfo';

const styles = theme => ({

    root: {
        width: 1000,
        margin: 'auto',
        left: 0,
        right: 0,
        "& $dividLeft div": {
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
    dividLayout: {
        width: '100%',
        '&:befroe': {
            clear: "both"
        },
        '&:after': {
            clear: "both"
        },
        display: 'flex',

    },
    dividLeft: {
        float: 'left',
        width: '40%',
        paddingRight: 10
    },
    dividRight: {
        "&:after": {
            clear: 'both'
        },
        "&:before": {
            clear: 'both'
        },
        float: 'right',
        width: '60%',
        paddingLeft: 10,
        overFlow: 'hidden',
    },
    detailInfo: {
        width: '100%',
        '& h1': {
            color: '#000',
            'margin-block-start': '0.3em'
        },
        '& h2': {
            color: '#000'
        },
        '& p span': {
            padding: 8
        },
        '& p strong': {
            padding: 8,
            color: '#000'

        }
    },
    equipmentLayout: {
        display: 'static',


    },
    contentCard: {
        backgroundColor: 'unset',
        paddingTop: 8,
        "& p": {
            textAlign: 'center',
            "margin-block-end": 0,
            "margin-block-start": 0
        },
        marginRight: 8,
        float: 'left'
    },
    contentImage: {
        height: 64,
        width: 64,
        margin: 'auto',
        color: '#000'

    },
    sliderLayout: {
        width: "100%",
        height: 360,
    }

});
const log = 'housedETAIL --------------------------';

class HouseDetail extends React.Component {
    constructor(props) {
        super(props);
        let self = this;
        this.mapCenter = {longitude: 120.097083, latitude: 30.272038};
        this.amapEvents = {
            created: (mapInstance) => {
                // console.log('高德地图 Map 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始。比如：');
            },
            click: () => {

            }

        };
        this.markerEvents = {
            created: (markerInstance) => {
                // console.log('高德地图 Marker 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始。比如：');
            },
            click: () => {

                self.setState({
                    openPositionInfo: !self.state.openPositionInfo
                })
            }

        };
        this.infoWindowEvents = {
            created: (infoInstance) => {
                // console.log('高德地图 Marker 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始。比如：');
            },
            click: () => {

                self.setState({
                    openPositionInfo: !self.state.openPositionInfo
                })
            }

        };

        this.markerPosition = {longitude: 120.096933, latitude: 30.272038};
    }



    componentDidMount() {
        let {houseInfoByCondition, location, ipfsUtils} = this.props;
        let search = location.search;
        let urlSearchParams = new URLSearchParams(search.substr(1));
        let id = urlSearchParams.get("id");

        let imgArr = [];
        houseInfoByCondition.then(result => {
            let houseInfo = result[id];
            // console.log(log, houseInfo.imageArr);
            houseInfo.imageArr.map((obj, index) => {
                imgArr.push(ipfsUtils.domain + obj);
            });
            this.setState({
                houseInfo: houseInfo,
                position: {longitude: houseInfo.locationInfo.lng, latitude: houseInfo.locationInfo.lat},
                imgArr
            })
        })
    }

    state = {
        mapVersion: '1.4.10',
        amapkey: '50cec8de756f62ade847f8efe25ba900',
        curVisibleWindow: 3,
        position: {longitude: 120.096933, latitude: 30.272038},
        openPositionInfo: true,
        houseInfo: DetailHouseInfo.detailInfo,
        imgArr: []
    }


    render() {
        const {classes, location} = this.props;
        const {houseInfo} = this.state;
        // console.log(log, this.state, this.props.location.search);
        let parsePath = parseLocation(location);
        return (
            <div className={classes.root}>
                <div>
                    <ToolBar currentLocation={location} currentContext={"HOUSE_DETAIL_PAGER"}/>
                    <div className={classes.dividLayout}>
                        <div className={classes.dividLeft}>
                            <div className={classes.detailInfo}>
                                <h1>
                                    {houseInfo.houseType.type}<i>&nbsp;·&nbsp;</i>{houseInfo.locationInfo.estatName}
                                </h1>

                                <p>
                                    <span>面&nbsp;·&nbsp;积</span><strong>{houseInfo.houseArea}平米</strong>
                                </p>

                                <p>
                                    <span>朝&nbsp;·&nbsp;向</span><strong>{houseInfo.houseOrientation.type}</strong>
                                </p>
                                <p>
                                    <span>楼&nbsp;·&nbsp;层</span><strong>在{houseInfo.houseFloor.currentLevel}层/共{houseInfo.houseFloor.totalLevel}层</strong>
                                </p>
                                <p>
                                    <span>户&nbsp;·&nbsp;型</span><strong>{houseInfo.houseAppreciation.room}室{houseInfo.houseAppreciation.hall}厅{houseInfo.houseAppreciation.toilet}卫</strong>
                                </p>
                                <p>
                                    <span>小&nbsp;·&nbsp;区</span><strong>{houseInfo.locationInfo.estatName}</strong>
                                </p>
                                <p>
                                    <span>地&nbsp;·&nbsp;址</span><strong>{houseInfo.locationInfo.detailAddress}</strong>
                                </p>
                                <p>
                                    <span>房&nbsp;·&nbsp;号</span><strong>{houseInfo.houseNum}</strong>
                                </p>
                                <p>
                                    <span>价&nbsp;·&nbsp;格</span><strong>{houseInfo.rentFee}元/月&nbsp;&nbsp;(押{houseInfo.payType.cashPledgeNum}付{houseInfo.payType.cashPayNum})</strong>
                                </p>
                                <p>
                                    <span>电&nbsp;·&nbsp;话</span><strong>{houseInfo.telephone}</strong>
                                </p>


                            </div>
                            <div className={classes.detailInfo}>
                                <h2>
                                    房间介绍
                                </h2>
                                <p>
                                    {houseInfo.detailIntroduce}
                                </p>
                            </div>
                            <div className={classes.detailInfo}>
                                <h2>
                                    独用设备
                                </h2>
                                <div className={classes.equipmentLayout}>
                                    {
                                        houseInfo.houseEquipment.map((obj, index) => {
                                            return (
                                                <Card className={classes.contentCard} key={index}>
                                                    <CardMedia
                                                        component="img"
                                                        className={classes.contentImage}
                                                        image={icons[obj.value]}
                                                    >
                                                    </CardMedia>
                                                    <p>
                                                        <span>{obj.name}</span>
                                                    </p>
                                                </Card>
                                            );
                                        })
                                    }

                                </div>
                            </div>
                        </div>
                        <div className={classes.dividRight}>

                            {
                                this.state.imgArr == 0 ? <div></div> :
                                    <GalleryImage className={classes.sliderLayout}
                                                  images={this.state.imgArr}/>
                            }
                            <div style={{
                                width: '100%',
                                height: '330px',
                                backgroundColor: blue[100],
                                marginTop: 16,
                                boxShadow: '0px 0px 10px rgb(66,165,245)'
                            }}>
                                {/*<Map amapkey={this.state.amapkey} version={this.state.mapVersion}/>120.097083,30.272038*/}
                                <Map zoom={14} center={this.mapCenter} amapkey={this.state.amapkey}
                                     version={this.state.mapVersion}
                                     events={this.amapEvents}>
                                    <Marker position={this.markerPosition} events={this.markerEvents}/>
                                    <InfoWindow
                                        position={this.state.position}
                                        visible={this.state.openPositionInfo}
                                        isCustom={false}
                                        events={this.infoWindowEvents}
                                    >
                                        <h3>{houseInfo.locationInfo.estatName}</h3>
                                        <p>{houseInfo.locationInfo.detailAddress}</p>
                                    </InfoWindow>
                                </Map>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

HouseDetail.propTypes = {
    classes: PropTypes.object.isRequired
}
HouseDetail = connect(MapStateToProps, MapDispatchToProps)(HouseDetail);
export default withStyles(styles)(HouseDetail);