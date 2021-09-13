import React, {useEffect} from "react";
import {renderRoutes} from "react-router-config";
import {IProps} from "../../../config/interfaces";

export const Discussions:React.FC<IProps> = (props) => {
    const {route, history, location} = props;


    function redirectToList(){
        let path = props.location.pathname;
        if(path==='/discussions'||path==='/discussions/'){
            history.push('/discussions/list');
        }
    }

    useEffect(() => {
        redirectToList();
    }, [location.pathname])

    return (
        <div>
            {renderRoutes(route.routes)}
        </div>
    )
}