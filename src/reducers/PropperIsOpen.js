/**
 * Created by chenqilong on 2018/9/16.
 */
export default (state, action)=> {
    switch (action.type) {
        case 'close':
            console.log("close",state)
            return false
        case 'open':
            console.log("open",!state)
            return !state
    }
}

// export default (open = false, action) => {
//     switch (action.type) {
//         case 'close':
//             return false
//         case 'open':
//             return !open
//         default:
//             return state
//     }
// }
