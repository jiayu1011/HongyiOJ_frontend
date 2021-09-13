import React, {useState, useEffect} from "react";
import {Breadcrumb} from "antd";
import {IProps} from "../config/interfaces";

interface IPropsNew extends IProps{
    myProps?: any
}

export const MyBreadCrumb:React.FC<IPropsNew> = (props) => {
    const {myProps, history} = props;

    const englishMenuArr = [
        'home', 'problems', 'contests', 'discussions', 'list', 'info'
    ]
    const chineseMenuArr = [
        '首页', '题库', '比赛', '讨论', '列表', '详情'
    ]

    const [breadcrumb, setBreadcrumb] = useState([])

    useEffect(() => {
        let pathArr = myProps.location.pathname.split('/');
        setBreadcrumb(pathArr.map((item:any) => chineseMenuArr[englishMenuArr.indexOf(item)]));
        // console.log([pathArr[1]]);

    }, [myProps]);

    return (
        <div>
            <Breadcrumb>
                {breadcrumb.map((item, index) => <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)}
            </Breadcrumb>
        </div>
    )


}

export default MyBreadCrumb