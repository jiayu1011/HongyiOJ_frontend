import React from "react";
import {Breadcrumb} from "antd";

function DiscussionList(props){

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item key='discussions'><a href='/discussions'>讨论</a></Breadcrumb.Item>
                <Breadcrumb.Item key='discussions_list'><a href='/discussions/list'>讨论列表</a></Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <div>discussion list</div>
            </div>
        </div>
    )
}

export default DiscussionList