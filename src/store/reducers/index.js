import { combineReducers } from "redux";
import {
    SET_USERINFO,
    SET_LOGGED,

} from "../actions";

const defaultState = {
    userInfo: {
        avatarUrl: 'https://th.bing.com/th/id/OIP.WfMx-_qguVTIb7zoVdf9egAAAA?pid=ImgDet&rs=1',
        username: '',
        password: '',
        email: '',
        identity: '',
        acceptCnt: '',

    },
    logged: false,
}

const userInfo = sessionStorage.getItem('userInfo')? JSON.parse(sessionStorage.getItem('userInfo')):defaultState.userInfo
const logged = !!sessionStorage.getItem('userInfo')

export const initialState = {
    userInfo: userInfo,
    logged: logged,

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