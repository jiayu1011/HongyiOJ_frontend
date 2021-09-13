import React, {useEffect} from "react";
import {renderRoutes} from "react-router-config";
import {IProps} from "../../../config/interfaces";

export const Manage:React.FC<IProps> = (props) => {
    const {route} = props;

    useEffect(() => {
        // console.log(route);
    }, [])

    return (
        <>
            <div>后台管理</div>
            <div>{renderRoutes(route.routes)}</div>
        </>
    )
}