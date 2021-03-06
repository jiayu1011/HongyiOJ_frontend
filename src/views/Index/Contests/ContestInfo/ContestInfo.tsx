import React, {useState, useEffect} from 'react'
import {Breadcrumb} from "antd";
import {IProps} from "../../../../config/interfaces";

export const ContestInfo:React.FC<IProps> = (props) => {
    const {route, history} = props

    const [contestId, setContestId] = useState('');
    const [contestInfo, setContestInfo] = useState({
        contestId: '',

    })


    useEffect(() => {
       let path = history.location.pathname;
       let pathArr = path.split('/');
       setContestId(pathArr[pathArr.length-1]);
    }, [])

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item key='contests'><a href='/contests'>比赛</a></Breadcrumb.Item>
                <Breadcrumb.Item key='contest'><a href={'/contests'+contestInfo.contestId}>{contestInfo.contestId}</a></Breadcrumb.Item>
                <Breadcrumb.Item key='contest_info'><a href='#'>比赛详情</a></Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <div>contest {contestId} info</div>

            </div>
        </div>
    )
}
