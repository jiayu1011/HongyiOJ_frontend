import React, {useEffect, useState} from 'react'


function ProblemInfo(props){
    const route = props.route;
    const history = props.history;

    const [currentId, setCurrentId] = useState('');

    useEffect(() => {
        let pathArr = props.location.pathname.split('/');
        setCurrentId(pathArr[pathArr.length-1]);

    }, [])

    return (
        <div>problem {currentId} info</div>
    )
}

export default ProblemInfo