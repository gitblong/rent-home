import {OPEN_POSITION_POPPER, CLOSE_POSITION_POPPER,CHANGE_CURRENT_CITY,CHANGE_HOUSE_INFO_BY_CONDITION,INIT_IPFS_UTILS} from '../constants/ActionTypes';
//reducer
const initialState = {
    text: 'Hello',
    isOpen: false,
    currentCity: {
        name:'杭州',
        code:'3301'
    },
    houseInfoByCondition:null,
    init:true,

};
const reducer = (state=initialState, action,option) => {
    switch (action.type) {
        case 'CHANGE_TEXT':
            return {
                ...state,
                text: state.text == 'Hello' ? 'world' : 'Hello'
            };
        case 'BUTTON_CLICK':
            return {
                ...state,
                text: 'Hello world'
            };
        case OPEN_POSITION_POPPER:
            console.log("OPEN_POSITION_POPPER",OPEN_POSITION_POPPER);
            return {
                ...state,
                isOpen: !state.isOpen,
            };
        case CLOSE_POSITION_POPPER:
            return {
                ...state,
                isOpen: false,
                rentTypeAnchorEl: null
            };
        case INIT_IPFS_UTILS:
            console.log(action.ipfsUtils);
            return {
                ...state,
                ipfsUtils:ipfsUtils
            };
        case CHANGE_CURRENT_CITY:
            console.log(action.currentCity);
            return {
                ...state,
                currentCity:action.currentCity
            };
        case CHANGE_HOUSE_INFO_BY_CONDITION:
            console.log("CHANGE_HOUSE_INFO_BY_CONDITION",action.houseInfoByCondition);
            return {
                ...state,
                init:false,
                houseInfoByCondition:action.houseInfoByCondition
            };
        default:
            return initialState;
    }
};
export default reducer;