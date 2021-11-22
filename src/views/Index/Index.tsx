import {Layout, Menu, Dropdown, Button, message, Modal} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    UserOutlined,
    DownOutlined,
} from '@ant-design/icons';

import React, {useState, useEffect} from "react";
import './Index.scss'
import {renderRoutes} from "react-router-config";
import {IProps, UserInfo} from "../../config/interfaces";
import Avatar from "antd/es/avatar/avatar";
import http from "../../utils/http";
import {MyFooter} from "../../components/MyFooter";
import store from "../../store";
import qs from 'qs'
import { MenuInfo } from 'rc-menu/lib/interface';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;


export const Index: React.FC<IProps> = (props) => {
    const {location, history, route} = props
    const state = store.getState();


    const [collapsed, setCollapsed] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState(['']);
    const [userInfo, setUserInfo] = useState<UserInfo>({
        username: '未登录',
        avatarUrl: 'http://119.29.24.77:8000/sources/HongyiOJ/image/hongyi_logo.png',
        // avatarUrl: 'https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/f4998fe95ef30363f12a04f670579825~300x300.image',

    });
    const [isModalVisible, setIsModalVisible] = useState(false);


    const logout = () => {
        let data = {
            username: state.userInfo.username
        }
        http.put('/logout', qs.stringify(data), {}).then(res => {
            console.log('登出:', res);
        }).catch(err => {
            console.log(err)
            message.error('登出请求失败')
        })
        sessionStorage.clear();
        message.info('登录已注销!');
        history.push('/login');
    }

    const onCollapse = (collapsed: boolean | ((prevState: boolean) => boolean)) => {
        console.log(collapsed);
        setCollapsed(collapsed);
    }

    function handleMenuClick(item: MenuInfo){
        console.log(item)
        if (item.key === 'logout') {
            setIsModalVisible(true);
        } else {
            history.push('/' + item.key);
        }
    }

    function handleRouter(item: MenuInfo){
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
        if(state.logged && sessionStorage.getItem('userInfo')){
            setUserInfo(JSON.parse(sessionStorage.getItem('userInfo') as string));
        }

        redirectToHome();
    }, [])

    //切换专栏时调整breadcrumb
    useEffect(() => {
        let pathArr = location.pathname.split('/');
        let sk = ''
        switch (pathArr[1]){
            case "problems":
                sk = 'problems'
                break
            case "contests":
                sk = 'contests'
                break
            case "discussions":
                sk = 'discussions'
                break
            case "evaluationList":
                sk = 'evaluationList'
                break
            default:
                switch (location.pathname){
                    case "/home":
                        sk = 'home'
                        break
                    case "/manage/manageProblems":
                        sk = 'manage/manageProblems'
                        break
                    case "/manage/manageUsers":
                        sk = 'manage/manageUsers'
                        break
                    case "/problems/list":
                        sk = 'problem'
                        break
                    case "/contests/list":
                        sk = 'contests'
                        break
                    case "/discussions/list":
                        sk = 'discussions'
                        break
                    case '/uploadProblem':
                        sk = 'uploadProblem'
                        break
                    default:


                }

        }

        setSelectedKeys([sk]);

    }, [location.pathname]);


    //用户下拉选项单
    const userDropdownMenu = state.logged? (
        userInfo.identity==='admin'? (
            <Menu onClick={(item) => handleMenuClick(item)}>
                <Menu.Item key="basicInfo">基本资料</Menu.Item>
                <Menu.Item key="modifyPassword">修改密码</Menu.Item>
                <Menu.Item key="manage">后台管理</Menu.Item>
                <Menu.Item key="uploadProblem">上传题目</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">退出</Menu.Item>
            </Menu>
        ): (
            <Menu onClick={(item) => handleMenuClick(item)}>
                <Menu.Item key="basicInfo">基本资料</Menu.Item>
                <Menu.Item key="modifyPassword">修改密码</Menu.Item>
                <Menu.Item key="uploadProblem">上传题目</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">退出</Menu.Item>
            </Menu>
        )
    ) : (
        <Menu onClick={(item) => handleMenuClick(item)}>
            <Menu.Item key="login">去登录</Menu.Item>
        </Menu>
    )

    const sideMenu = state.logged? (
        <Menu
            theme="dark"
            selectedKeys={selectedKeys}
            onClick={(item) => handleRouter(item)}
            mode="inline">
            {userInfo.identity === 'admin' ? (
                <SubMenu
                    key="manage"
                    icon={<UserOutlined/>}
                    title='后台管理'
                >
                    <Menu.Item key='manage/manageProblems'>管理题目</Menu.Item>
                    <Menu.Item key='manage/manageUsers'>管理用户</Menu.Item>

                </SubMenu>
            ) : null}

            <Menu.Item key="home" icon={<PieChartOutlined />}>首页</Menu.Item>
            <Menu.Item key="problems" icon={<PieChartOutlined />}>题库</Menu.Item>
            <Menu.Item key="contests" icon={<DesktopOutlined />}>比赛</Menu.Item>
            <Menu.Item key="discussions" icon={<FileOutlined />}>讨论</Menu.Item>
            <Menu.Item key="evaluationList" icon={<DesktopOutlined />}>在线评测结果</Menu.Item>
            <Menu.Item key="uploadProblem" icon={<FileOutlined />}>上传题目</Menu.Item>
        </Menu>
    ) : (
        <Menu
            theme="dark"
            selectedKeys={selectedKeys}
            onClick={(item) => handleRouter(item)}
            mode="inline">
            <Menu.Item key="home" icon={<PieChartOutlined />}>首页</Menu.Item>
            <Menu.Item key="problems" icon={<PieChartOutlined />}>题库</Menu.Item>
            <Menu.Item key="contests" icon={<DesktopOutlined />}>比赛</Menu.Item>
            <Menu.Item key="discussions" icon={<FileOutlined />}>讨论</Menu.Item>
        </Menu>
    )








    // @ts-ignore
    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider className="sider"  collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo" onClick={() => history.push('/home')}>Hongyi OJ</div>
                    {sideMenu}
                </Sider>
                <Layout className="site-layout">
                    <Header
                        className="site-layout-background"
                        style={{
                            padding: 0
                    }}>
                        <div className='user'>
                            <div className="info mr-20">
                                <Avatar src={userInfo.avatarUrl} />
                                <Dropdown overlay={userDropdownMenu}
                                          trigger={['click']}
                                          //@ts-ignore
                                          getPopupContainer={() => document.getElementsByClassName('info')[0]}>
                                    <Button type="link">
                                        {userInfo.username}<DownOutlined />
                                    </Button>
                                </Dropdown>
                            </div>
                        </div>
                    </Header>
                    <Modal
                        title='提示'
                        visible={isModalVisible}
                        onOk={logout}
                        onCancel={() => {
                            message.info('登出已取消!');
                            setIsModalVisible(false);
                        }}
                    >
                        <div>确认要登出吗?</div>
                    </Modal>
                    <Content>
                        <div className='content'>
                            {/*<MyBreadCrumb myProps={props}></MyBreadCrumb>*/}
                            <div>
                                {renderRoutes(route.routes)}
                            </div>
                        </div>


                    </Content>
                    <Footer><MyFooter></MyFooter></Footer>
                </Layout>
            </Layout>
        </>
    )
}

export default Index