import React, {useEffect, useState} from "react";
import {Breadcrumb, Button, Form, Input, Menu, message, Select} from "antd";
import store from "../../../../store";
import {UPLOAD_PROBLEM_STRUCTURE, LENGTH_LIMIT} from "../../../../config";
import http from "../../../../utils/http";
import style from './ProblemSubmit.module.scss'
import {MailOutlined} from "@ant-design/icons";
import utils from "../../../../utils/utils";

function ProblemSubmit(props){
    const {route, history, location} = props
    const state = store.getState()

    const [problemInfo, setProblemInfo] = useState(UPLOAD_PROBLEM_STRUCTURE)
    const [currentKey, setCurrentKey] = useState('codeSubmit')
    const [codeSubmitForm, setCodeSubmitForm] = useState({
        codeLanguage: '',
        code: '',
    })


    function getProblemInfo(){
        let pathArr = location.pathname.split('/');
        let currentId = location.pathname.endsWith('/')? pathArr[pathArr.length-3]:pathArr[pathArr.length-2]
        setProblemInfo({
            ...problemInfo,
            problemId: currentId
        })
    }

    function handleCodeSubmitFormFinished(values){
        setCodeSubmitForm(values)
        let data = {
            ...values,
            username: state.userInfo.username,
            problemId: problemInfo.problemId
        }
        http.post('/submit/code', utils.makeFormData(data), {
            headers: {
                Authorization: sessionStorage.getItem('token')
            }
        }).then(res => {
            console.log('提交代码:', res)
            if(res.data.isOk){
                message.success('代码提交成功')

            } else {
                message.error(res.data.errMsg)
            }
        }).catch(err => {
            message.error('提交代码失败')
        })


    }


    useEffect(() => {
        getProblemInfo()
    }, [])


    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item key='problems'><a href='/problems'>题库</a></Breadcrumb.Item>
                <Breadcrumb.Item key='problem'><a href={`/problems/${problemInfo.problemId}`}>{problemInfo.problemId}</a></Breadcrumb.Item>
                <Breadcrumb.Item key='problem_submit'><a href=''>提交答案</a></Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <div style={{
                    margin: '10px 0'
                }}>
                    <Button
                        type='primary'
                        style={{

                        }}
                        onClick={() => history.push(`/problems/${problemInfo.problemId}`)}
                    >返回题目</Button>
                    <div className={style.problemSubmit}>
                        <Menu
                            style={{
                                margin: '10px 0',
                            }}
                            onClick={(item) => setCurrentKey(item.key)}
                            selectedKeys={[currentKey]}
                            mode='horizontal'
                        >
                            <Menu.Item
                                key='codeSubmit'
                                icon={<MailOutlined/>}
                            >提交代码</Menu.Item>
                            <Menu.Item
                                key='fileSubmit'
                                icon={<MailOutlined/>}
                            >提交文件</Menu.Item>
                        </Menu>
                        <div>
                            {currentKey==='codeSubmit'? (
                                <div>
                                    <Form
                                        name='codeSubmit'
                                        onFinish={(values) => handleCodeSubmitFormFinished(values)}
                                    >
                                        <b style={{
                                            color: 'red'
                                        }}>*目前仅支持C, C++, Python3, Java</b>
                                        <Form.Item
                                            label=''
                                            name='codeLanguage'
                                        >
                                            <Select
                                                placeholder='请选择编程语言类型'
                                                style={{
                                                    width: '25%'
                                                }}

                                            >
                                                <Select.Option value='C'>C</Select.Option>
                                                <Select.Option value='C++'>C++</Select.Option>
                                                <Select.Option value='Python3'>Python3</Select.Option>
                                                <Select.Option value='Java'>Java</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            label=''
                                            name='code'
                                        >
                                            <Input.TextArea
                                                rows={12}
                                                placeholder='键入您的提交代码...'
                                                maxLength={LENGTH_LIMIT.stdProgram}
                                                showCount
                                            />
                                        </Form.Item>
                                        <Form.Item wrapperCol={{
                                            offset: 10
                                        }}>
                                            <Button
                                                type='primary'
                                                htmlType='submit'
                                            >提交代码</Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            ):(
                                <div>
                                    <b>文件提交功能尚未开通</b>

                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProblemSubmit