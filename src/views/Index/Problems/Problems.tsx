import React, {useEffect, useState} from "react";
import {renderRoutes} from "react-router-config";
import {IProps} from '../../../config/interfaces'

export const Problems:React.FC<IProps> = (props) => {
    const {route, history, location} = props;


    const redirectToList = () => {
        let path = props.location.pathname;
        if(path==='/problems'||path==='/problems/'){
            history.push('/problems/list');
        }
    }

    useEffect(() => {
        redirectToList();
    }, [location.pathname])

    return(
        <>
            {renderRoutes(route.routes)}
        </>
    )

}

