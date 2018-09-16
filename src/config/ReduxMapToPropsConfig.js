/**
 * Created by chenqilong on 2018/9/16.
 */
import {onOpenAction,onClose,buttonClickAction,changeTextAction} from './ReduxActionConfig';

//映射Redux state到组件的属性
export function MapStateToProps(state) {
    return {
        text: state.text,
        isOpen: state.isOpen
    }
}

//映射Redux actions到组件的属性
export function MapDispatchToProps(dispatch) {
    return {
        onButtonClick: ()=>dispatch(buttonClickAction),
        onChangeText: ()=>dispatch(changeTextAction),
        onOpen: ()=>dispatch(onOpenAction),
        onClose: ()=>dispatch(onClose)
    }
}