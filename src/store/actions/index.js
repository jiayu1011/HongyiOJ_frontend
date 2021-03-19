
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';



export function loginSuccess(data){
    return{
        type: LOGIN_SUCCESS,
        payload: data,
    }
}
