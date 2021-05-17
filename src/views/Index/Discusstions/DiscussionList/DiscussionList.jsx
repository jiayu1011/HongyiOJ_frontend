import React, {useEffect} from "react";
import {Breadcrumb, message} from "antd";
import http from "../../../../utils/http";
import {APIS} from "../../../../config/apis";

function DiscussionList(props){

    function getDiscussionList(){
        http.get(APIS.DISCUSSION.GET_DISCUSSION_LIST, {
            params: {

            }
        }).then(res => {
            console.log('帖子列表:', res)

        }).catch(err => {
            message.error('获取帖子列表失败')
        })
    }

    useEffect(() => {
        getDiscussionList()
    }, [])

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item key='discussions'><a href='/discussions'>讨论</a></Breadcrumb.Item>
                <Breadcrumb.Item key='discussions_list'><a href='/discussions/list'>讨论列表</a></Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <div>帖子列表</div>
            </div>
        </div>
    )
}

export default DiscussionList