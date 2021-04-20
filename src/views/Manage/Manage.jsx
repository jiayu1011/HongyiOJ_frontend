import React, {useEffect} from "react";
import {renderRoutes} from "react-router-config";

export default function Manage(props){
    const {route} = props;

    useEffect(() => {
        // console.log(route);
    }, [])

    return (
        <div>
            <div>后台管理</div>
            <div>{renderRoutes(route.routes)}</div>
        </div>
    )
}