import { combineReducers } from "redux";
import {
    LOGIN_SUCCESS,

} from "../actions";

export const initialState = {
    userInfo: {
        avatar: 'https://th.bing.com/th/id/OIP.WfMx-_qguVTIb7zoVdf9egAAAA?pid=ImgDet&rs=1',
        username: '123',
        password: '321',

    }
}

const reducers = combineReducers({
    userInfo: function (state={}, action){
        switch (action.type){
            case LOGIN_SUCCESS:
                return {
                    ...state,
                    loading: action.payload
                }
            default:
                return state;
        }
    }
})

export default reducers