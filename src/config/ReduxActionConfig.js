/**
 * Created by chenqilong on 2018/9/16.
 */
import {
    CLOSE_POSITION_POPPER,
    OPEN_POSITION_POPPER,
    CHANGE_HOUSE_INFO_BY_CONDITION,
    CHANGE_CURRENT_CITY,
    CHANGE_SHOW_HOUSE_INFO_COUNT
} from '../constants/ActionTypes';

export const changeTextAction = {
    type: 'CHANGE_TEXT'
};
export const buttonClickAction = {
    type: 'BUTTON_CLICK'
};
export const onOpenAction = {
    type: OPEN_POSITION_POPPER
};
export const onClose = {
    type: CLOSE_POSITION_POPPER
};
export const changeHouseInfoByCondition = (action) => {
    return {
        type: CHANGE_HOUSE_INFO_BY_CONDITION,
        houseInfoByCondition: action
    }
};
export let changeCurrentCity = (action) => {
    return {

        type: CHANGE_CURRENT_CITY,
        currentCity: action
    }
};
export let initIpfsUtils = (action) => {
    return {

        type: CHANGE_CURRENT_CITY,
        ipfsUtils: action
    }
};

export let changeShowHouseInfoCount = (action) => {
    return {

        type: CHANGE_SHOW_HOUSE_INFO_COUNT,
        showHouseInfoCount: action
    }
};


