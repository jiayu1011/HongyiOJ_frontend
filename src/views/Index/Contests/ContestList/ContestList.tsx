import React from "react";

import './ContestList.scss'
import {Breadcrumb} from "antd";
import {IProps} from "../../../../config/interfaces";

export const ContestList:React.FC<IProps> = (props) => {


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