export interface IProps {
    route?: any,
    routes?: any,
    location?: any,
    history?: any
}

export interface HTTPHeaders {
    Authorization?: string | null,

}

export interface UserInfo {
    username: string,
    password?: string,
    avatarUrl?: string,
    identity?: string,

}