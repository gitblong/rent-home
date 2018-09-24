import {OPEN_POSITION_POPPER, CLOSE_POSITION_POPPER} from '../constants/ActionTypes';

//reducer
const initialState = {
    text: 'Hello',
    isOpen: false,
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_TEXT':
            return {
                ...state,
                text: state.text == 'Hello' ? 'world' : 'Hello'
            }
        case 'BUTTON_CLICK':
            return {
                ...state,
                text: 'Hello world'
            }
        case OPEN_POSITION_POPPER:
            return {
                ...state,
                isOpen:!state.isOpen,
            }
        case CLOSE_POSITION_POPPER:
            return {
                ...state,
                isOpen:false,
                rentTypeAnchorEl:null
            }
        default:
            return initialState;
    }
}
export default reducer;