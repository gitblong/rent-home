/**
 * Created by chenqilong on 2018/9/20.
 */
import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";

import {Map,Marker} from 'react-amap';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';

import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
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
        this.mapEvents = {
            created: (map) => {
                let AMap = window.AMap;
                let AMapUI = window.AMapUI;
                this.setState({
                    map:map
                })
                map.plugin('AMap.Geolocation', function() {
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

                    function onComplete (data) {
                        console.log(data);
                        map.setCenter(data.position)
                    }

                    function onError (data) {
                        // 定位出错
                    }
                })
                AMapUI.loadUI(['misc/PoiPicker'], function (PoiPicker) {

                    var poiPicker = new PoiPicker({
                        //city:'北京',
                        input: 'pickerInput'
                    });

                    //初始化poiPicker
                    poiPickerReady(poiPicker);
                });

                function poiPickerReady(poiPicker) {

                    window.poiPicker = poiPicker;

                    var marker = new AMap.Marker();

                    var infoWindow = new AMap.InfoWindow({
                        offset: new AMap.Pixel(0, -20)
                    });

                    //选取了某个POI
                    poiPicker.on('poiPicked', function (poiResult) {

                        var source = poiResult.source,
                            poi = poiResult.item,
                            info = {
                                source: source,
                                id: poi.id,
                                name: poi.name,
                                location: poi.location.toString(),
                                address: poi.address
                            };

                        marker.setMap(map);
                        infoWindow.setMap(map);

                        marker.setPosition(poi.location);
                        infoWindow.setPosition(poi.location);

                        infoWindow.setContent('POI信息: <pre>' + JSON.stringify(info, null, 2) + '</pre>');
                        infoWindow.open(map, marker.getPosition());

                        map.setCenter(marker.getPosition());
                    });

                    // poiPicker.onCityReady(function () {
                    //     poiPicker.suggest('美食');
                    // });
                }
            },
            click: () => {
                console.log('clicked')
            },
        }
        this.markerEvents = {
            created: (marker) => {
                let AMap = window.AMap;
                let AMapUI = window.AMapUI;
                this.setState({
                    marker:marker
                })
            },
            click: () => {
                console.log('clicked')
            },
        }

    }
    searchPoi(){

    }
    setCurrentPosition(){

    }
    state = {
        mapVersion: '1.4.10',
        amapkey: '50cec8de756f62ade847f8efe25ba900',
        lng:0,
        lat:0,
        map:null,

    }

    render() {
        const {classes, open, handleClose} = this.props;
        const plugins = [{
            name: 'ToolBar',
            options: {
                visible: true,  // 不设置该属性默认就是 true
                onCreated(ins){
                    console.log(ins);
                },
            },
        }];
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
                                    小区名称
                                </Typography>
                                <input/>
                                <Typography>
                                    商圈
                                </Typography>
                                <select>
                                    <option>test1</option>
                                    <option>test2</option>
                                    <option>test3</option>
                                </select>
                            </div>
                            <div className={classes.contentInput}>
                                <Typography>
                                    经度
                                </Typography>
                                <input/>
                                <Typography>
                                    纬度
                                </Typography>
                                <input/>
                                <Typography>
                                    详细地址
                                </Typography>
                                <input/>
                            </div>
                            <div style={{width: '100%', height: 400}}>
                                <Map amapkey={this.state.amapkey}
                                     version={this.state.mapVersion}
                                     events={this.mapEvents}
                                     plugins={plugins}
                                     zoom = {14}
                                >
                                    {/*<div id="panel"></div>*/}
                                    <div id="pickerBox">
                                        <Button disabled style={{
                                            background: '#eee',
                                            padding: '13px 0',
                                            borderRadius: 0,
                                            color: '#000'
                                        }}>搜索</Button><input id="pickerInput" placeholder="输入关键字选取地点"/>
                                        <div id="poiInfo"></div>
                                    </div>
                                </Map>
                            </div>
                            <div className={classes.contentBottom}>
                                <Button
                                    className={classes.confirmButton}>确认</Button>
                                <Button className={classes.backButton}>返回</Button>
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
