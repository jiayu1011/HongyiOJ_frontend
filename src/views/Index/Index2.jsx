import {Layout, Menu, Breadcrumb, Dropdown, Button} from 'antd';
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
import {useHistory} from "react-router-dom";
import utils from "../../utils/utils";
import moment from 'moment';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



function Index2(props){

    const history = useHistory();
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
    const [selectedKeys, setSelectedKeys] = useState(['home']);
    const [userInfo, setUserInfo] = useState({
        avatarUrl: 'https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/f4998fe95ef30363f12a04f670579825~300x300.image',
        username: '未登录',

    });
    const [breadcrumb, setBreadcrumb] = useState([]);






    function onCollapse(collapsed){
        console.log(collapsed);
        setCollapsed(collapsed);
    }

    function handleMenuClick(item){
        if (item.key === 'logout') {
            http.get('logout/').then((res) => {
                console.log('logout:', res);
                sessionStorage.clear();
                history.push('/login');
            })
        } else {

            history.push(item.key);
        }
    }

    function handleRouter(item){
        history.push(item.key);
    }


    //初始化信息
    useEffect(() => {
        console.log(props);
        // console.log(history);
        // console.log(sessionStorage);

        if('userInfo' in sessionStorage){
            setLogged(true);
            setUserInfo(JSON.parse(sessionStorage.getItem('userInfo')));

        }


    }, [])

    //切换专栏时调整面包屑
    useEffect(() => {
        let pathArr = props.location.pathname.split('/');
        setBreadcrumb(pathArr.map((item) => chineseMenuArr[englishMenuArr.indexOf(item)]));
    }, [props.location.pathname]);


    //用户下拉选项单
    const userDropdownMenu = logged? (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="basic-info">基本资料</Menu.Item>
            <Menu.Item key="modify-password">修改密码</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout">退出</Menu.Item>
        </Menu>
    ) : (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="login">去登录</Menu.Item>
        </Menu>
    )







    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider className="sider"  collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" onClick={() => history.push('/home')}>Hongyi OJ</div>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={selectedKeys}
                    onClick={handleRouter}
                    mode="inline">
                    <Menu.Item key="home" icon={<PieChartOutlined />}>
                        首页
                    </Menu.Item>
                    <Menu.Item key="problems" icon={<PieChartOutlined />}>
                        题库
                    </Menu.Item>
                    <Menu.Item key="contests" icon={<DesktopOutlined />}>
                        比赛
                    </Menu.Item>
                    {/*<SubMenu key="sub1" icon={<UserOutlined />} title="User">*/}
                    {/*    <Menu.Item key="3">Tom</Menu.Item>*/}
                    {/*    <Menu.Item key="4">Bill</Menu.Item>*/}
                    {/*    <Menu.Item key="5">Alex</Menu.Item>*/}
                    {/*</SubMenu>*/}
                    {/*<SubMenu key="sub2" icon={<TeamOutlined />} title="Team">*/}
                    {/*    <Menu.Item key="6">Team 1</Menu.Item>*/}
                    {/*    <Menu.Item key="8">Team 2</Menu.Item>*/}
                    {/*</SubMenu>*/}
                    <Menu.Item key="discussions" icon={<FileOutlined />}>
                        讨论
                    </Menu.Item>
                </Menu>
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

                        <Breadcrumb>
                            {breadcrumb.map((item, index) => <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)}
                        </Breadcrumb>
                        <div>
                            {renderRoutes(route.routes)}
                        </div>
                    </div>


                </Content>
                <Footer style={{ textAlign: 'center' }}>Hongyi OJ ©2021 Created by Jiayu1011</Footer>
            </Layout>
        </Layout>
    )
}

export default Index2