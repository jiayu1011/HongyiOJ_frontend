import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom'

function Redirect (props){

    const route = props.route;
    const history = useHistory();

    useEffect(() => {
        history.push('/home');

    })

    return(
        <div></div>
    )
}

export default Redirect