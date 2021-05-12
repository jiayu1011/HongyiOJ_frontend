import React from "react";


import './ContestList.scss'
import {Breadcrumb} from "antd";

export default function ContestList(props){


    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item key='contests'><a href='/contests'>比赛</a></Breadcrumb.Item>
                <Breadcrumb.Item key='contests_list'><a href='/contests/list'>比赛列表</a></Breadcrumb.Item>
            </Breadcrumb>
            <div className='body'>
                <div className='body-title'>比赛列表</div>
            </div>
        </div>

    )
}