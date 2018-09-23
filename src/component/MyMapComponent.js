/**
 * Created by chenqilong on 2018/9/23.
 */
import React from 'react';
import {Map} from 'react-amap';
export const ZoomCtrl = (props) => {
    const map = props.__map__;
    if (!map) {
        console.log('组件必须作为 Map 的子组件使用');
        return;
    }
    const zoomIn = () => map.zoomIn();
    const zoomOut = () => map.zoomOut();

    return (<div id="zoom-ctrl">
        <span onClick={zoomIn}>+</span>
        <span onClick={zoomOut}>-</span>
    </div>);
};

export function poiPickerReady(poiPicker,map) {

    window.poiPicker = poiPicker;

    var marker = new AMap.Marker();

    var infoWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(0, -20)
    });

    //选取了某个POI
    poiPicker.on('poiPicked', function(poiResult) {

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

        //map.setCenter(marker.getPosition());
    });

    poiPicker.onCityReady(function() {
        poiPicker.suggest('美食');
    });
}
