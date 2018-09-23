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

export const SearchTool = (props) => {
    console.log(props)
    const map = props.__map__;
    if (!map) {
        console.log('组件必须为map子组件');
        return;
    }
    console.log("mapcompone")
    //输入提示
    var autoOptions = {
        input: "tipinput"
    };
        // var autoComplete = map.Autocomplete(autoOptions);
    // let autocomplete = new Map.Autocomplete(autoOptions);
    // var auto = new Map.Autocomplete(autoOptions);
    // var placeSearch = map.PlaceSearch({
    //     map: map
    // });  //构造地点查询类
    // AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
    // function select(e) {
    //     placeSearch.setCity(e.poi.adcode);
    //     placeSearch.search(e.poi.name);  //关键字查询查询
    // }


    return (
        <div id="myPageTop">
            <table>
                <tr>
                    <td>
                        <label>请输入关键字：</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input id="tipinput"/>
                    </td>
                </tr>
            </table>
        </div>
    )
}
