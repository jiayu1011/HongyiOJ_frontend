import React, {useEffect} from "react";
import {Breadcrumb} from "antd";
import {renderRoutes} from "react-router-config";

function Discussions(props){
    const {route, history, location} = props;


    function redirectToList(){
        let path = props.location.pathname;
        if(path==='/discussions'||path==='/discussions/'){
            history.push('/discussions/list');
        }
    }

    useEffect(() => {
        redirectToList();
        console.log(route)
    }, [location.pathname])

    return (
        <div>
            {renderRoutes(route.routes)}
        </div>
    )
}

export default Discussions