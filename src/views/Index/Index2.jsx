import {Layout, Menu, Breadcrumb, Dropdown, Button, message} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined, DownOutlined,
} from '@ant-design/icons';

import React, {useState, useEffect} from "react";
import './Index.scss'
import {renderRoutes} from "react-router-config";

import Avatar from "antd/es/avatar/avatar";
import http from "../../utils/http";
import utils from "../../utils/utils";
import moment from 'moment';
import MyFooter from "../../components/MyFooter";
import MyBreadCrumb from "../../components/MyBreadCrumb";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



function Index2(props){

    const history = props.history;
    const route = props.route;

    //中英文菜单专栏数组
    const englishMenuArr = [
        'home', 'problems', 'contests', 'discussions'
    ]
    const chineseMenuArr = [
        '首页', '题库', '比赛', '讨论'
    ]


    const [logged, setLogged] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState(['']);
    const [userInfo, setUserInfo] = useState({
        avatarUrl: 'https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/f4998fe95ef30363f12a04f670579825~300x300.image',
        username: '未登录',

    });
    // const [breadcrumb, setBreadcrumb] = useState([]);




    function onCollapse(collapsed){
        console.log(collapsed);
        setCollapsed(collapsed);
    }

    function handleMenuClick(item){
        if (item.key === 'logout') {
            http.get('/logout').then((res) => {
                console.log('logout:', res);
            })
            sessionStorage.clear();
            message.info('登录已注销!');
            history.push('/login');
        } else {
            history.push(item.key);
        }
    }

    function handleRouter(item){
        // console.log(item);
        history.push('/' + item.key);
    }

    function redirectToHome(){
        let path = props.location.pathname;
        if(path==='/'){
            history.push('/home');
        }
    }


    //初始化信息
    useEffect(() => {
        if('userInfo' in sessionStorage){
            setLogged(true);
            setUserInfo(JSON.parse(sessionStorage.getItem('userInfo')));
        }

        redirectToHome();
    }, [])

    //切换专栏时调整breadcrumb
    useEffect(() => {
        let pathArr = props.location.pathname.split('/');
        // setBreadcrumb(pathArr.map((item) => chineseMenuArr[englishMenuArr.indexOf(item)]));
        // console.log([pathArr[1]]);
        setSelectedKeys([pathArr[1]]);

    }, [props.location.pathname]);


    //用户下拉选项单
    const userDropdownMenu = logged? (
        userInfo.identity==='admin'?
        (
            <Menu onClick={handleMenuClick}>
                <Menu.Item key="basicInfo">基本资料</Menu.Item>
                <Menu.Item key="modifyPassword">修改密码</Menu.Item>
                <Menu.Item key="manage">后台管理</Menu.Item>
                <Menu.Item key="uploadProblem">上传题目</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">退出</Menu.Item>
            </Menu>
        ): (
                <Menu onClick={handleMenuClick}>
                    <Menu.Item key="basicInfo">基本资料</Menu.Item>
                    <Menu.Item key="modifyPassword">修改密码</Menu.Item>
                    <Menu.Item key="uploadProblem">上传题目</Menu.Item>
                    <Menu.Divider />
                    <Menu.Item key="logout">退出</Menu.Item>
                </Menu>
            )
    ) : (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="login">去登录</Menu.Item>
        </Menu>
    )

    const sideMenu = logged&&userInfo.identity==='admin'?(
        <Menu
            theme="dark"
            selectedKeys={selectedKeys}
            onClick={handleRouter}
            mode="inline">
            <SubMenu
                key="manage"
                icon={<UserOutlined/>}
                title='后台管理'
            >
                <Menu.Item key='manage/reviewProblems'>审核题目</Menu.Item>

            </SubMenu>
            <Menu.Item key="home" icon={<PieChartOutlined />}>首页</Menu.Item>
            <Menu.Item key="problems" icon={<PieChartOutlined />}>题库</Menu.Item>
            <Menu.Item key="contests" icon={<DesktopOutlined />}>比赛</Menu.Item>
            <Menu.Item key="discussions" icon={<FileOutlined />}>讨论</Menu.Item>
            <Menu.Item key="uploadProblem" icon={<FileOutlined />}>上传题目</Menu.Item>
        </Menu>
    ) : (
        <Menu
            theme="dark"
            selectedKeys={selectedKeys}
            onClick={handleRouter}
            mode="inline">
            <Menu.Item key="home" icon={<PieChartOutlined />}>首页</Menu.Item>
            <Menu.Item key="problems" icon={<PieChartOutlined />}>题库</Menu.Item>
            <Menu.Item key="contests" icon={<DesktopOutlined />}>比赛</Menu.Item>
            <Menu.Item key="discussions" icon={<FileOutlined />}>讨论</Menu.Item>
            <Menu.Item key="uploadProblem" icon={<FileOutlined />}>上传题目</Menu.Item>
        </Menu>
    )







    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider className="sider"  collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" onClick={() => history.push('/home')}>Hongyi OJ</div>
                {sideMenu}
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <div className='user'>
                        <div className="info mr-20">
                            <Avatar src={userInfo.avatarUrl} />
                            <Dropdown overlay={userDropdownMenu}
                                      trigger="['click']"
                                      getPopupContainer={() => document.getElementsByClassName('info')[0]}>
                                <Button type="link">
                                    {userInfo.username}<DownOutlined />
                                </Button>
                            </Dropdown>
                        </div>
                    </div>
                </Header>
                <Content>
                    <div className='content'>
                        <MyBreadCrumb myProps={props}></MyBreadCrumb>
                        <div>
                            {renderRoutes(route.routes)}
                        </div>
                    </div>


                </Content>
                <Footer><MyFooter></MyFooter></Footer>
            </Layout>
        </Layout>
    )
}

export default Index2