import React, {useEffect, useState} from "react";
import {renderRoutes} from "react-router-config";

function Problems(props){
    const route = props.route;
    const history = props.history;


    function redirectToList(){
        let path = props.location.pathname;
        if(path==='/problems'||path==='/problems/'){
            history.push('/problems/list');
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

export default Problems