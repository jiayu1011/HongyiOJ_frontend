export const SET_USERINFO = 'setUserInfo';
export const SET_LOGGED = 'setLogged';


export function setUserInfoAction(data:any){
    return {
        type: SET_USERINFO,
        userInfo: data,
    }

}

export function setLoggedAction(data:any){
    return {
        type: SET_LOGGED,
        logged: data
    }
}
