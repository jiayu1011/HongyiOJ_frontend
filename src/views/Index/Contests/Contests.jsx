import React, {useEffect} from "react";
import {renderRoutes} from "react-router-config";

function Contests(props){
    const route = props.route;
    const history = props.history;


    function redirectToList(){
        let path = props.location.pathname;
        if(path==='/contests'||path==='/contests/'){
            history.push('/contests/list');
        }
    }

    useEffect(() => {
        redirectToList();
    }, [props.location.pathname])

    return(
        <div>
            {renderRoutes(route.routes)}
        </div>
    )
}

export default Contests