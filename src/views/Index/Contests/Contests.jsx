import React, {useEffect} from "react";
import {renderRoutes} from "react-router-config";

function Contests(props){
    const {route, routes, history, location} = props;


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

export default Contests