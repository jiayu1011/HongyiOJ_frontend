import React, {useState, useEffect} from "react";

function Redirect (props){

    const route = props.route;
    const history = props.history;

    useEffect(() => {
        history.push('/home');

    })

    return(
        <div></div>
    )
}

export default Redirect