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
import broaband from "../../statics/icon/broadband.svg";
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
import room from "../../statics/images/room.jpg";
import GalleryImage from "../../component/GalleryImage";
import {Map, Marker, InfoWindow} from "react-amap";

const styles = theme =>({

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
class HouseDetail extends React.Component {
    constructor(props) {
        super(props);
        let self = this;
        this.mapCenter = {longitude: 120.097083, latitude: 30.272038};
        this.amapEvents = {
            created: (mapInstance) => {
                console.log('高德地图 Map 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始。比如：');
            },
            click: ()=> {

            }

        };
        this.markerEvents = {
            created: (markerInstance) => {
                console.log('高德地图 Marker 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始。比如：');
            },
            click: ()=> {

                self.setState({
                    openPositionInfo: !self.state.openPositionInfo
                })
            }

        };
        this.infoWindowEvents = {
            created: (infoInstance) => {
                console.log('高德地图 Marker 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始。比如：');
            },
            click: ()=> {

                self.setState({
                    openPositionInfo: !self.state.openPositionInfo
                })
            }

        };

        this.markerPosition = {longitude: 120.096933, latitude: 30.272038};
    }

    state = {
        mapVersion: '1.4.10',
        amapkey: '50cec8de756f62ade847f8efe25ba900',
        curVisibleWindow: 3,
        position: {longitude: 120.096933, latitude: 30.272038},
        openPositionInfo: true
    }


    render() {
        const {classes, location} = this.props;
        let parsePath = parseLocation(location);
        return (
            <div className={classes.root}>
                <div>
                    <ToolBar currentLocation={location}/>
                    <div className={classes.dividLayout}>
                        <div className={classes.dividLeft}>
                            <div className={classes.detailInfo}>
                                <h1>
                                    整租<i>&nbsp;·&nbsp;</i>嘉和花苑<i>&nbsp;·&nbsp;</i>主卧
                                </h1>

                                <p>
                                    <span>面&nbsp;·&nbsp;积</span><strong>27平米</strong>
                                </p>

                                <p>
                                    <span>朝&nbsp;·&nbsp;向</span><strong>朝南</strong>
                                </p>
                                <p>
                                    <span>楼&nbsp;·&nbsp;层</span><strong>6/8层</strong>
                                </p>
                                <p>
                                    <span>户&nbsp;·&nbsp;型</span><strong>1室0厅1卫</strong>
                                </p>
                                <p>
                                    <span>小&nbsp;·&nbsp;区</span><strong>嘉禾花苑</strong>
                                </p>
                                <p>
                                    <span>地&nbsp;·&nbsp;址</span><strong>紫金花路88号</strong>
                                </p>
                                <p>
                                    <span>房&nbsp;·&nbsp;号</span><strong>14幢1单元</strong>
                                </p>

                                <p>
                                    <span>更&nbsp;·&nbsp;新</span><strong>2018年9月14日</strong>
                                </p>
                                <p>
                                    <span>编&nbsp;·&nbsp;号</span><strong>HZ201809130361005</strong>
                                </p>
                                <p>
                                    <span>服务费</span><strong>0元</strong>
                                </p>
                                <p>
                                    <span>价&nbsp;·&nbsp;格</span><strong>1800元/月&nbsp;&nbsp;(押一付一)</strong>
                                </p>
                                <p>
                                    <span>电&nbsp;·&nbsp;话</span><strong>13763382916</strong>
                                </p>


                            </div>
                            <div className={classes.detailInfo}>
                                <h2>
                                    房间介绍
                                </h2>
                                <p>
                                    该公寓位于西湖区，紫金花路88号，周边有很多大商场，和各种美味的小吃，地段繁华，交通方便，出门就有公交车站，在嘉禾花苑小区，安全，安静，房间很大，双人床，有空调，冰箱，电脑桌，洗衣机，热水器，独立卫生间，卫生间也挺大的。有好闺蜜，好兄弟，热恋情侣，精英人事，这个户型和房子都非常适合你们，快联系我吧。
                                </p>
                            </div>
                            <div className={classes.detailInfo}>
                                <h2>
                                    独用设备
                                </h2>
                                <div className={classes.equipmentLayout}>
                                    <Card className={classes.contentCard}>
                                        <CardMedia
                                            component="img"
                                            className={classes.contentImage}
                                            image={air}
                                        >
                                        </CardMedia>
                                        <p>
                                            <span>空调</span>
                                        </p>
                                    </Card>
                                    <Card className={classes.contentCard}>
                                        <CardMedia
                                            component="img"
                                            className={classes.contentImage}
                                            image={balcony}
                                        >
                                        </CardMedia>
                                        <p>
                                            <span>阳台</span>
                                        </p>
                                    </Card>
                                    <Card className={classes.contentCard}>
                                        <CardMedia
                                            component="img"
                                            className={classes.contentImage}
                                            image={broaband}
                                        >
                                        </CardMedia>
                                        <p>
                                            <span>宽带</span>
                                        </p>
                                    </Card>
                                    <Card className={classes.contentCard}>
                                        <CardMedia
                                            component="img"
                                            className={classes.contentImage}
                                            image={desk}
                                        >
                                        </CardMedia>
                                        <p>
                                            <span>写字桌</span>
                                        </p>
                                    </Card>
                                    <Card className={classes.contentCard}>
                                        <CardMedia
                                            component="img"
                                            className={classes.contentImage}
                                            image={doubleBed}
                                        >
                                        </CardMedia>
                                        <p>
                                            <span>双人床</span>
                                        </p>
                                    </Card>
                                    <Card className={classes.contentCard}>
                                        <CardMedia
                                            component="img"
                                            className={classes.contentImage}
                                            image={dresser}
                                        >
                                        </CardMedia>
                                        <p>
                                            <span>梳妆台</span>
                                        </p>
                                    </Card>
                                    <Card className={classes.contentCard}>
                                        <CardMedia
                                            component="img"
                                            className={classes.contentImage}
                                            image={kitchen}
                                        >
                                        </CardMedia>
                                        <p>
                                            <span>厨房</span>
                                        </p>
                                    </Card>
                                    <Card className={classes.contentCard}>
                                        <CardMedia
                                            component="img"
                                            className={classes.contentImage}
                                            image={refrigerator}
                                        >
                                        </CardMedia>
                                        <p>
                                            <span>冰箱</span>
                                        </p>
                                    </Card>
                                    <Card className={classes.contentCard}>
                                        <CardMedia
                                            component="img"
                                            className={classes.contentImage}
                                            image={singleBed}
                                        >
                                        </CardMedia>
                                        <p>
                                            <span>单人床</span>
                                        </p>
                                    </Card>
                                    <Card className={classes.contentCard}>
                                        <CardMedia
                                            component="img"
                                            className={classes.contentImage}
                                            image={sofa}
                                        >
                                        </CardMedia>
                                        <p>
                                            <span>沙发</span>
                                        </p>
                                    </Card>
                                    <Card className={classes.contentCard}>
                                        <CardMedia
                                            component="img"
                                            className={classes.contentImage}
                                            image={toilet}
                                        >
                                        </CardMedia>
                                        <p>
                                            <span>卫生间</span>
                                        </p>
                                    </Card>
                                    <Card className={classes.contentCard}>
                                        <CardMedia
                                            component="img"
                                            className={classes.contentImage}
                                            image={tv}
                                        >
                                        </CardMedia>
                                        <p>
                                            <span>电视机</span>
                                        </p>
                                    </Card>
                                    <Card className={classes.contentCard}>
                                        <CardMedia
                                            component="img"
                                            className={classes.contentImage}
                                            image={washingMachine}
                                        >
                                        </CardMedia>
                                        <p>
                                            <span>洗衣机</span>
                                        </p>
                                    </Card>
                                    <Card className={classes.contentCard}>
                                        <CardMedia
                                            component="img"
                                            className={classes.contentImage}
                                            image={waterHeater}
                                        >
                                        </CardMedia>
                                        <p>
                                            <span>热水器</span>
                                        </p>
                                    </Card>
                                    <Card className={classes.contentCard}>
                                        <CardMedia
                                            component="img"
                                            className={classes.contentImage}
                                            image={window}
                                        >
                                        </CardMedia>
                                        <p>
                                            <span>飘窗</span>
                                        </p>
                                    </Card>

                                </div>
                            </div>
                        </div>
                        <div className={classes.dividRight}>
                            <GalleryImage className={classes.sliderLayout}
                                          images={["https://imagecdn.hizhu.com/fang/17/55/173813122A36C54B36949F826598B37A2555.jpg?x-oss-process=style/w800", room,]}/>
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
                                        <h3>嘉和花苑</h3>
                                        <p>紫荆花路88号</p>
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
export default withStyles(styles)(HouseDetail);