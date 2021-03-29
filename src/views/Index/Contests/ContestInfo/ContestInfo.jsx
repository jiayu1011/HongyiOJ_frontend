import React, {useState, useEffect} from 'react'

function ContestInfo(props){
    const route = props.route;
    const history = props.history;


    const [contestId, setContestId] = useState('');



    useEffect(() => {
       let path = history.location.pathname;
       let pathArr = path.split('/');
       setContestId(pathArr[pathArr.length-1]);
    }, [])

    return (
        <div>contest {contestId} info</div>
    )
}

export default ContestInfo