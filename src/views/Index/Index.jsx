import {Layout, Menu, Breadcrumb, Dropdown, Button} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined, DownOutlined,
} from '@ant-design/icons';
import React from "react";
import './Index.scss'
import {renderRoutes} from "react-router-config";

import Avatar from "antd/es/avatar/avatar";
import http from "../../utils/http";


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            selectedKeys: ['home'],
            userInfo: {
                avatar: 'https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/f4998fe95ef30363f12a04f670579825~300x300.image',
                username: 'test',

            },

        };
    }


    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    handleMenuClick = (item) => {
        // console.log(this.props);
        // console.log(item);
        const { history } = this.props
        const { key } = item
        if (key === 'logout') {
            http.get('logout/').then((res) => {
                console.log(res);
                sessionStorage.clear();
                history.push('/login');
            })
        } else {
            this.setState({
                selectedKeys: [item.key]
            }, () => {
                history.push(item.key);
            })
        }
    }

    handleRouter = (item) => {
        const { history } = this.props
        // const findMenu = mapMenu.find(subMenu => subMenu.key === item.key)
        // let breadcrumb = []
        // breadcrumb.push(findMenu.parentName, findMenu.name)
        // breadcrumb = breadcrumb.filter(v => v)
        this.setState({
            selectedKeys: [item.key],
            // breadcrumb
        }, () => {
            history.push(item.key)
        })
    }

    render() {
        const { collapsed, selectedKeys, userInfo } = this.state;
        const { route } = this.props;
        const userDropdownMenu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="basic-info">基本资料</Menu.Item>
                <Menu.Item key="modify-password">修改密码</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">退出</Menu.Item>
            </Menu>
        )

        return (

            <Layout style={{ minHeight: '100vh' }}>
                <Sider className="sider"  collapsed={collapsed} onCollapse={this.onCollapse}>
                    <div className="logo">Hongyi OJ</div>
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={selectedKeys}
                        onClick={this.handleRouter}
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
                                <Avatar src={userInfo.avatar} />
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
                    <Content style={{ margin: '0 16px' }}>
                        <div>
                            {renderRoutes(route.routes)}
                        </div>


                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Hongyi OJ ©2021 Created by Jiayu1011</Footer>
                </Layout>
            </Layout>


        );
    }
}

export default Index