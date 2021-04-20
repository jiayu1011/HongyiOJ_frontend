import { combineReducers } from "redux";
import {
    SET_USERINFO,
    SET_LOGGED,

} from "../actions";

export const initialState = {
    userInfo: {
        avatar: 'https://th.bing.com/th/id/OIP.WfMx-_qguVTIb7zoVdf9egAAAA?pid=ImgDet&rs=1',

    },
    logged: false,

}

const reducer = function (state, action){
    switch (action.type){
        case SET_USERINFO:
            return Object.assign({}, state, {
                userInfo: action.userInfo
            })
        case SET_LOGGED:
            return Object.assign({}, state, {
                logged: action.logged
            })

        default:
            return state;
    }
}

export default reducer