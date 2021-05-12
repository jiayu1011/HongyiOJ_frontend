import React, {useEffect, useState} from "react";
import {renderRoutes} from "react-router-config";
import {Breadcrumb} from "antd";

function Problems(props){
    const {route, history, location} = props;


    function redirectToList(){
        let path = props.location.pathname;
        if(path==='/problems'||path==='/problems/'){
            history.push('/problems/list');
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

export default Problems