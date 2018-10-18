/**
 * Created by chenqilong on 2018/9/16.
 */
import {
    onOpenAction,
    onClose,
    buttonClickAction,
    changeTextAction,
    changeHouseInfoByCondition,
    changeCurrentCity,
    initIpfsUtils
} from './ReduxActionConfig';


//映射Redux state到组件的属性
export function MapStateToProps(state) {
    return {
        text: state.text,
        isOpen: state.isOpen,
        allHouseInfoData: state.allHouseInfoData,
        ipfsUtils: state.ipfsUtils,
        init: state.init,
        houseInfoByCondition: state.houseInfoByCondition,
        currentCity: state.currentCity
    }
}

//映射Redux actions到组件的属性
export function MapDispatchToProps(dispatch) {
    return {
        onButtonClick: () => dispatch(buttonClickAction),
        onChangeText: () => dispatch(changeTextAction),
        onOpen: () => dispatch(onOpenAction),
        onClose: () => dispatch(onClose),
        initIpfsUtils: (ipfsUtils) => dispatch(initIpfsUtils(ipfsUtils)),
        changeHouseInfoByCondition: (houseInfoByCondition) => dispatch(changeHouseInfoByCondition(houseInfoByCondition)),
        changeCurrentCity: (currentCity) => dispatch(changeCurrentCity(currentCity))

    }
}