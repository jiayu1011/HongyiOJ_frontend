import React, {useState} from "react";
import {Input, message} from "antd";
import http from "../../utils/http";
import utils from "../../utils/utils";
import {Link} from "react-router-dom";
import './Login.scss'
import qs from 'qs'

function Forget(props){
    const {history} = props

    const emailRegExp = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
    const autoComplete = 'off'

    const [validateForm, setValidateForm] = useState({
        email: '',
        imgCode: '',
        code: ''
    })
    const [form, setForm] = useState({
        password: '',
        repeatPassword: ''
    })
    const [formType, setFormType] = useState('validate')
    const [codeText, setCodeText] = useState('获取验证码')
    const [disabled, setDisabled] = useState(false)

    
    
    function handleNext(event){
        event.preventDefault()
        if (!validateForm.email) {
            return message.error('请输入邮箱')
        }
        if (!validateForm.imgCode) {
            return message.error('请输入图形验证码')
        }
        if (!validateForm.code) {
            return message.error('请输入验证码')
        }

        let data = {}
        data.verifyCode = validateForm.code
        data.email = validateForm.email
        http.post('/verify', utils.makeFormData(data)).then(res => {
            console.log('验证验证码:', res)
            if(res.data.isOk){
                setFormType('password')
            } else {
                message.error(res.data.errMsg)
            }
        }).catch(err => {
            console.log(err)
            message.error('验证失败')
        })


   
    }
    
    function handlePrev(event){
        event.preventDefault()
        setFormType('validate')
        setForm({
            password: '',
            repeatPassword: ''
        })

    }
    
    function handleValidate(e){
        const {value} = e.target
        if(value && !emailRegExp.test(value)){
            message.error('邮箱格式不正确')
        }
    }
    
    function handleInputChange(event, formType, name){
        const {value} = event.target
        if(formType === 'validate'){
            let tempForm = validateForm
            tempForm[name] = value
            setValidateForm(tempForm)
        } else {
            let tempForm = form
            tempForm[name] = value
            setForm(tempForm)
        }
    }
    
    function handleGetCode(){
        if(!validateForm.email || !emailRegExp.test(validateForm.email)){
            return message.error('请输入正确的邮箱')
        }
        
        let s = 59
        let timer = null
        http.get('/verify/code', {
            params: {
                email: validateForm.email
            }
        }).then(res => {
            console.log('发送验证码:', res)
            message.success('验证码已发送到邮箱，请注意查收')
            setDisabled(true)
            setCodeText(`${s}秒后获取`)
            timer = setInterval(() => {
                s -= 1
                setCodeText(`${s}秒后获取`)

                if(s === 0){
                    clearInterval(timer)
                    setDisabled(false)
                    setCodeText('获取验证码')
                }
            }, 1000)
        }).catch(err => {
            console.log(err)
            message.error('发送验证码失败')
        })
    }

    function handleResetPassword(event){
        event.preventDefault()
        if(!form.password){
            return message.error('请输入密码')
        }
        if(!form.repeatPassword){
            return message.error('请输入确认密码')
        }
        if(form.password !== form.repeatPassword){
            return message.error('两次输入密码不一致')
        }
        let data = {}
        data.email = validateForm.email
        data.password = form.password

        http.put('/reset/password', qs.stringify(data), {

        }).then(res => {
            console.log('重置密码:', res)
            if(res.data.isOk){
                message.success('密码重置成功，请重新登录账号，3秒后自动跳转至登录页面')
                setTimeout(() => {
                    history.push('/login')

                }, 3000)
            } else {
                message.error(res.data.errMsg)
            }
        })
    }
    
    return (
        <div>
            <div className="login-wrapper forget">
                <div className={`container ${formType === 'password' ? 'right-panel-active' : ''}`} id="container">
                    <div className="form-container validate-container">
                        <form id="validate" onSubmit={handleNext}>
                            <h1>忘记密码</h1>
                            <input
                                type="text"
                                autoComplete={autoComplete}
                                onBlur={handleValidate}
                                onChange={(event) => handleInputChange(event, 'validate', 'email')}
                                name="email"
                                placeholder="请输入邮箱"
                            />
                            <div className="d-flex w-100">
                                <input
                                    type="text"
                                    autoComplete={autoComplete}
                                    onChange={(event) => handleInputChange(event, 'validate', 'imgCode')}
                                    name="imgCode"
                                    placeholder="图形验证码"
                                />
                                <img src="https://www.oschina.net/action/user/captcha" alt="code" className="img-code" />
                            </div>
                            <div className="d-flex w-100">
                                <input
                                    type="text"
                                    autoComplete={autoComplete}
                                    onChange={(event) => handleInputChange(event, 'validate', 'code')}
                                    name="code"
                                    placeholder="邮箱验证码"
                                />
                                <button
                                    type="button"
                                    className={`code ${disabled ? 'code-disabled' : ''}`}
                                    disabled={disabled}
                                    onClick={() => handleGetCode}
                                >{codeText}</button>
                            </div>
                            <button
                                type="submit"
                                className="mt-20"
                                onClick={() => handleNext}
                            >找回密码</button>
                            <Link to="/login">已有账号，去登录</Link>
                        </form>
                    </div>
                    <div className="form-container password-container">
                        <form id="password" onSubmit={handleResetPassword}>
                            <h1>设置密码</h1>
                            <input
                                type="password"
                                onChange={(event) => handleInputChange(event, 'form', 'password')}
                                placeholder="请输入密码"
                            />
                            <input
                                type="password"
                                onChange={(event) => handleInputChange(event, 'from', 'repeatPassword')}
                                placeholder="请确认密码"
                            />
                            <button
                                type="submit"
                                className="mt-20"
                            >重置新密码</button>
                            <button
                                type="submit"
                                className="mt-20"
                                onClick={() => handlePrev}
                            >上一步</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forget