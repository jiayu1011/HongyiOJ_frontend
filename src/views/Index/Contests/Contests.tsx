import React, {useEffect} from "react";
import {renderRoutes} from "react-router-config";

interface IProps{
    route?: any,
    routes?: any,
    history?: any,
    location?: any
}

export const Contests:React.FC<IProps> = (props) => {
    const {route, history, location} = props

    function redirectToList(){
        let path = props.location.pathname;
        if(path==='/contests'||path==='/contests/'){
            history.push('/contests/list');
        }
    }

    useEffect(() => {
        redirectToList();
    }, [location.pathname])

    return(
        <div>
            {renderRoutes(route.routes)}
        </div>
    )
}
