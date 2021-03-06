import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {LoadingOutlined} from "@ant-design/icons";
import {setLoggedAction, setUserInfoAction} from "../../store/actions";

import { message, notification } from 'antd'

import './Login.scss'
import http from "../../utils/http";
import {makeFormData} from "../../utils/utils";
import store from '../../store'
import {IProps} from "../../config/interfaces";


export const Login:React.FC<IProps> = (props) => {
    const {history} = props;
    const state = store.getState();

    const autoComplete = 'off'

    const [loginType, setLoginType] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    });
    const [registerForm, setRegisterForm] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [activeClass, setActiveClass] = useState('')

    useEffect(() => {
        if(loginType){
            setActiveClass('')
        } else {
            setActiveClass('right-panel-active');
        }
    }, [loginType])


    const handleLogin = (event:any) => {
        event.preventDefault();
        if (!loginForm.username) {
            return message.error('用户名不能为空')
        }
        if (!loginForm.password) {
            return message.error('密码不能为空')
        }
        setLoading(true)

        http.post('/login', makeFormData(loginForm)).then(res => {
            console.log('登录:', res)
            if(res.data.isOk){
                sessionStorage.setItem('token', res.data.token)
                sessionStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))
                store.dispatch(setUserInfoAction(res.data.userInfo))
                store.dispatch(setLoggedAction(true))

                message.success('登录成功').then()

                history.push('/home')
            } else {
                message.error(res.data.errMsg).then()
                setLoading(false)
            }

        }).catch(err => {
            console.log(err)
            message.error('登录失败!').then()
            setLoading(false)
        })

    }

    const handleRegister = (event:any) => {
        event.preventDefault()
        console.log('registerForm:', registerForm)

        if (!registerForm.username) {
            message.error('用户名不能为空').then()
            return
        }
        if (!registerForm.email) {
            message.error('邮箱不能为空').then()
            return
        }
        if (!registerForm.password) {
            message.error('密码不能为空').then()
            return
        }


        http.post('/register', makeFormData(registerForm)).then(res => {
            console.log('register:', res)
            if(res.data.isOk){
                notification.success({
                    key: 'register',
                    message: '注册成功！',
                    description: '账号注册成功，正在为你登录...',
                })
                setTimeout(() => {
                    // 注册成功后，直接登录
                    http.post('/login', makeFormData({
                        username: registerForm.username,
                        password: registerForm.password
                    })).then(res => {
                        notification.close('register')
                        sessionStorage.setItem('token', res.data.token)
                        sessionStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))
                        message.success('登录成功').then()
                        history.push('/home')
                    })
                }, 2000)

            } else {
                message.error(res.data.errMsg).then()
            }
        })


    }

    const toggleClass = () => {
        if(loginType){
            // setLoginType(loginType);
            setRegisterForm({
                username: '',
                email: '',
                password: '',
            });
        } else {
            // setLoginType(loginType);
        }

        setLoginType(!loginType);
    }

    const handleInputChange = (event:any, formType:any, labelName:any) => {
        // console.log(event)
        let rf:any = registerForm;
        let lf:any = loginForm;
        if (formType === 'register') {
            rf[labelName] = event.target.value;
            setRegisterForm(rf);
        } else {
            lf[labelName] = event.target.value;
            setLoginForm(lf);
            setRegisterForm({
                username: '',
                email: '',
                password: ''
            });

        }
    }


    return (
        <>
            <div className='parent'>

                <div className="login-wrapper">
                    <div className='title'>Hongyi OJ</div>
                    <div className={`${activeClass} container`} id="container">
                        <div className="form-container sign-up-container">
                            <form id="register" onSubmit={handleRegister}>
                                <h1>注册</h1>
                                <input
                                    type="text"
                                    autoComplete={autoComplete}
                                    name="username"
                                    onChange={(event) => {
                                        handleInputChange(event, 'register', 'username')
                                    }}
                                    placeholder="用户名"
                                />
                                <input
                                    type="email"
                                    autoComplete={autoComplete}
                                    name="email"
                                    onChange={(event) => {
                                        handleInputChange(event, 'register', 'email')
                                    }}
                                    placeholder="邮箱"
                                />
                                <input
                                    type="password"
                                    name="password"
                                    onChange={(event) => {
                                        handleInputChange(event, 'register', 'password')
                                    }}
                                    placeholder="密码"
                                />
                                <button type="submit" data-type="primary">注册</button>
                            </form>
                        </div>
                        <div className="form-container sign-in-container">
                            <form id="login" method='POST' onSubmit={handleLogin}>
                                <h1>登录</h1>
                                <input
                                    type="text"
                                    autoComplete={autoComplete}
                                    onChange={(event) => {
                                        handleInputChange(event, 'login', 'username')
                                    }}
                                    name="username"
                                    placeholder="用户名" />
                                <input
                                    type="password"
                                    onChange={(event) => {
                                    handleInputChange(event, 'login', 'password')
                                }}
                                    name="password"
                                    placeholder="密码"
                                />
                                <Link to="/forget">忘记密码</Link>
                                <button type='submit' data-type="primary" disabled={loading}>
                                    {loading ? <LoadingOutlined className="mr-5" /> : null}登录
                                </button>
                            </form>
                        </div>
                        <div className="overlay-container">
                            <div className="overlay">
                                <div className="overlay-panel overlay-left">
                                    <h1 className="text-white">欢迎回来！</h1>
                                    <p>请您先填写登录的个人信息，进行操作。</p>
                                    <button
                                        className="ghost"
                                        data-type="primary"
                                        id="signIn"
                                        onClick={() => {
                                            toggleClass()
                                        }}
                                    >登录</button>
                                </div>
                                <div className="overlay-panel overlay-right">
                                    <h1 className="text-white">注册新账号！</h1>
                                    <p>输入您的个人信息注册账号。</p>
                                    <button
                                        className="ghost"
                                        data-type="primary"
                                        id="signUp"
                                        onClick={() => {
                                            toggleClass()
                                        }}
                                    >注册</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

