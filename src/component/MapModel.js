/**
 * Created by chenqilong on 2018/9/20.
 */
import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import {Map} from "react-amap";
import grey from "@material-ui/core/colors/grey";
import blue from "@material-ui/core/colors/blue";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import position from "../statics/icon/position.svg";
import streets from "../data/streets.json";
// import {poiPickerReady} from './MyMapComponent';
const styles = theme => ({
    modelBody: {
        left: `50%`,
        top: `30%`,
        transform: `translate(-50%, -50%)`,
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[4],
        width: 1000,
        height: 400,
        borderRadius: 5
    },
    modelTitle: {
        width: '100%',
        height: '60px',
        padding: '0px',
        borderBottom: `1px solid ${grey[400]}`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18
    },
    modelContent: {
        width: '100%',
        height: '100%',
        paddingTop: '16px'
    },
    mapContent: {
        width: '100%',
        height: '400px',
        backgroundColor: blue[400],
    },
    contentInput: {
        padding: '10px 0',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        "& select": {
            display: 'inline-flex',
            width: 130,
            height: 30
        },
        "& p": {
            fontSize: 16,
            padding: '0 16px'
        },
        "& input": {
            marginRight: 16,
            width: 130,
            height: 30,
            paddingLeft: 8
        },
        "& input:last-child": {
            marginRight: 0
        }
    },
    contentBottom: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px 0px',
        background: "#fff",
    },
    confirmButton: {
        padding: '8px 16px',
        background: blue[500],
        color: '#fff'
    },
    backButton: {
        padding: '8px 16px',
        background: grey[500],
        color: '#fff',
        marginLeft: 32
    }
});
class MapModel extends React.Component {
    constructor() {
        super();
        this.state = {
            mapVersion: '1.4.10',//amap版本号
            amapkey: '50cec8de756f62ade847f8efe25ba900',//ampap  key
            lng: 0,//经度
            lat: 0,//纬度
            detailAddress: "",
            adcode: "",
            map: null,
            markers: [],
            selectArray: [],//下拉列表详情
            streetNumber: "",    //门牌号
            district: "",    //拱墅区
            street: '',       //街
            township: '',       //街道
            name: '',            //房源名称
        }
        //地图的事件监听
        this.mapEvents = {
            created: (map) => {
                this.setState({
                    map: map
                })
                let AMapUI = window.AMapUI;
                let AMap = window.AMap;
                this.setCurrentPosition();
                this.searchInit();
                // AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {

            },
            click: (e) => {
                let lnglat = e.lnglat;
                let map = this.state.map;
                this.getAddressDetail(lnglat, map);
            },
        }
        //marker的事件监听
        this.markerEvents = {
            created: (marker) => {
                let AMap = window.AMap;
                let AMapUI = window.AMapUI;
                this.setState({
                    marker: marker
                })
            },
            click: () => {
            },
        }

    }

    changeSelectArray = (adcode)=> {
        let selectArray = new Array();
        let self = this;
        streets.map((street, index)=> {
            let name = street.name;
            if (street.areaCode == adcode) {
                if (name.charAt(name.length - 1) != '乡' && name.charAt(name.length - 1) != '镇') {
                    street["selected"] = false;
                    let str = street.name == self.state.township;
                    if (str) {
                        street.selected = true;
                    } else {
                        street.selected = false;
                    }
                    selectArray.push(street)
                }
            }
        });
        this.setState({
            selectArray: selectArray,
        })
    }
    /**
     * 获得地址详情
     * @param lnglat 经纬度
     * @param map   当前地图
     */
    getAddressDetail = (lnglat, map)=> {

        let self = this;
        let point = [lnglat.lng, lnglat.lat];
        let AMap = window.AMap;
        let marker = new AMap.Marker();
        marker.setPosition(point);

        let markers = this.state.markers;
        map.remove(markers);
        markers = [];

        marker.setMap(map);
        map.setCenter(marker.getPosition());
        this.setState({
            markers: marker
        })
        markers.push(marker);

        this.setState({
            markers: markers,
        });
        AMap.plugin('AMap.Geocoder', function () {//回调函数
            let geocoder = new AMap.Geocoder({});
            map.addControl(toolbar);
            geocoder.getAddress(lnglat, function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    //获得了有效的地址信息:
                    //即，result.regeocode.formattedAddress
                    var addressComponent = result.regeocode.addressComponent;
                    var address = result.regeocode.formattedAddress;
                    let streetNumber = addressComponent.streetNumber;
                    let detailAddress = address + streetNumber;
                    self.changeSelectArray(addressComponent.adcode)
                    let name = addressComponent.street + streetNumber;
                    self.setState({
                        detailAddress: detailAddress,
                        adcode: addressComponent.adcode,
                        lng: lnglat.lng,
                        lat: lnglat.lat,
                        street: addressComponent.street,
                        township: addressComponent.township,
                        streetNumber: streetNumber,
                        name: name
                    });
                    self.InfoWindow(map, location, detailAddress, marker);
                } else {
                    //获取地址失败
                    alert('获取信息失败请重试');
                }
            });
        })
    }
    searchInit = ()=> {
        let self = this;
        let map = self.state.map;
        AMapUI.loadUI(['misc/PoiPicker', 'misc/PositionPicker'], function (PoiPicker) {
            var poiPicker = new PoiPicker({
                //city:'北京',
                input: 'pickerInput'
            });

            //初始化poiPicker
            self.poiPickerReady(poiPicker);

        });
    }
    /**
     * 地图的信息窗口
     * @param map 地图
     * @param location 当前的位置,经纬度
     * @param address 当前的地址
     * @param marker 设置infowindow的marker
     * @constructor
     */
    InfoWindow = (map, location, address, marker) => {
        AMap = window.AMap;
        var infoWindow = new AMap.InfoWindow({
            offset: new AMap.Pixel(5, -5)
        });
        infoWindow.setMap(map);
        infoWindow.setPosition(location);
        infoWindow.setContent(
            `<div >
                     <p>${address}</p>
                 </div>`
        )
        infoWindow.open(map, marker.getPosition());
    }
    /**
     * poi搜索查询
     * @param poiPicker
     */
    poiPickerReady = (poiPicker)=> {
        let map = this.state.map;
        let self = this;
        window.poiPicker = poiPicker;


        //选取了某个POI
        poiPicker.on('poiPicked', function (poiResult) {

            var source = poiResult.source,
                poi = poiResult.item;
            self.getAddressDetail(poi.location, map)


        });

        // poiPicker.onCityReady(function () {
        //     poiPicker.suggest('美食');
        // });
    }
    /**
     *通过Geolocation插件设置当前位置
     */
    setCurrentPosition = ()=> {
        let self = this;
        let map = self.state.map;
        let AMap = window.AMap;
        map.plugin('AMap.Geolocation', function () {
            var geolocation = new AMap.Geolocation({
                // 是否使用高精度定位，默认：true
                enableHighAccuracy: true,
                // 设置定位超时时间，默认：无穷大
                timeout: 10000,
                // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                buttonOffset: new AMap.Pixel(10, 20),
                //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                zoomToAccuracy: true,
                //  定位按钮的排放位置,  RB表示右下
                buttonPosition: 'RB'
            })

            geolocation.getCurrentPosition()
            AMap.event.addListener(geolocation, 'complete', onComplete)
            AMap.event.addListener(geolocation, 'error', onError)

            function onComplete(data) {
                let centerPosition = [data.position.lng, data.position.lat]
                map.setCenter(centerPosition);
                let marker = new AMap.Marker({
                    icon: position,
                    // offset:new AMap.Pixel(0,0)
                });

                marker.setPosition(centerPosition);
                marker.setMap(map);
                self.InfoWindow(map, data.position, "当前位置", marker);
            }

            function onError(data) {
                // 定位出错
            }
        })
    }

    render() {
        const {classes, open, handleClose} = this.props;
        const plugins = [{
            name: 'ToolBar',
            options: {
                visible: true,  // 不设置该属性默认就是 true
                onCreated(ins){
                },
            },
        }];
        const {mapVersion, amapke, lng, lat, detailAddress, adcode, map, markers, selectArray, township, district, stree, name,}= this.state;
        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={handleClose}
                >
                    <div className={classes.modelBody}>
                        <Typography variant='title' className={classes.modelTitle}>
                            填写房源具体位置
                        </Typography>

                        <div className={classes.modelContent}>
                            <div className={classes.contentInput}>
                                <Typography>
                                    楼层/房号
                                </Typography>
                                <input/>
                                <Typography>
                                    小区名称
                                </Typography>
                                <input value={name}/>
                                <Typography>
                                    商圈
                                </Typography>
                                <select>
                                    {
                                        selectArray.map((value, index)=> {
                                            return (
                                                <option selected={value.selected}>{value.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className={classes.contentInput}>
                                <Typography>
                                    经度
                                </Typography>
                                <input value={lng} style={{width: 75}}/>
                                <Typography>
                                    纬度
                                </Typography>
                                <input value={lat} style={{width: 75}}/>
                                <Typography>
                                    详细地址
                                </Typography>
                                <input value={detailAddress} style={{width: 400}}/>
                            </div>
                            <div style={{width: '100%', height: 400}}>
                                <Map amapkey={this.state.amapkey}
                                     version={this.state.mapVersion}
                                     events={this.mapEvents}
                                     plugins={plugins}
                                     zoom={14}
                                     useAMapUI
                                >
                                    <div id="pickerBox">
                                        <div style={{border:`1px solid ${grey[400]}`,display:'flex',alignItems:'center',backgroundColor:grey[200]}}>
                                            <span style={{width:50,textAlign:'center',color:grey[800]}}>搜索</span><input id="pickerInput" placeholder="输入关键字选取地点"/>
                                        </div>
                                        <div id="poiInfo"></div>
                                    </div>
                                </Map>
                            </div>
                            <div className={classes.contentBottom}>
                                <Button
                                    className={classes.confirmButton}>确认</Button>
                                <Button className={classes.backButton} onClick={handleClose}>返回</Button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

MapModel.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(MapModel);

export default SimpleModalWrapped;
// AMap.service(["AMap.PlaceSearch"], function () {
//     console.log("AMap")
//     var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
//         pageSize: 5,
//         pageIndex: 1,
//         city: "010", //城市
//         map: map,
//         panel: "panel"
//     });
//     //关键字查询
//     placeSearch.search('北京大学');
//     console.log("AMap", placeSearch, AMap);
