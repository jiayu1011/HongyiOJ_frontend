import React, {useEffect, useState} from "react";
import {Breadcrumb, Button, Form, Input, Menu, message, Select} from "antd";
import store from "../../../../store";
import {UPLOAD_PROBLEM_STRUCTURE, LENGTH_LIMIT} from "../../../../config";
import http from "../../../../utils/http";
import style from './ProblemSubmit.module.scss'
import {MailOutlined} from "@ant-design/icons";
import {makeFormData} from "../../../../utils/utils";
import {IProps} from "../../../../config/interfaces";

export const ProblemSubmit:React.FC<IProps> = (props) => {
    const {route, history, location} = props
    const state = store.getState()

    const [problemInfo, setProblemInfo] = useState(UPLOAD_PROBLEM_STRUCTURE)
    const [currentKey, setCurrentKey] = useState('codeSubmit')
    const [codeSubmitForm, setCodeSubmitForm] = useState({
        codeLanguage: '',
        code: '',
    })
    const [isJava, setIsJava] = useState<boolean>(false)


    const getProblemInfo = () => {
        let pathArr = location.pathname.split('/');
        let currentId = location.pathname.endsWith('/')? pathArr[pathArr.length-3]:pathArr[pathArr.length-2]
        setProblemInfo({
            ...problemInfo,
            problemId: currentId
        })
    }

    const handleCodeSubmitFormFinished = (values:any) => {
        setCodeSubmitForm(values)
        let data = {
            ...values,
            author: state.userInfo.username,
            relatedProblemId: problemInfo.problemId
        }
        http.post('/submit/code', makeFormData(data), {
            headers: {
                Authorization: sessionStorage.getItem('token')
            }
        }).then(res => {
            console.log('提交代码:', res)
            if(res.data.isOk){
                message.success('代码提交成功').then()
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            } else {
                message.error('提交代码失败').then()
                message.error(res.data.errMsg).then()
            }
        }).catch(err => {
            message.error('提交代码失败').then()
        })

        history.push('/evaluationList')


    }


    useEffect(() => {
        getProblemInfo()
    }, [])


    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item key='problems'><a href={'/problems'}>题库</a></Breadcrumb.Item>
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
                                        }}>* 目前仅支持C, C++, Python3, Java</b>
                                        <br/>
                                        <b style={{
                                            color: 'red'
                                        }}>* 提交代码模式为ACM模式，即需要提交完整的、可以处理输入输出的程序</b>
                                        <br/>
                                        {isJava? <b style={{
                                            color: 'red'
                                        }}>* 注：提交Java代码时，主类名必须改为Main</b>:null}
                                        <Form.Item
                                            label='编程语言'
                                            name='codeLanguage'
                                            rules={[{
                                                required: true,
                                                message: '请选择编程语言类型'
                                            }]}
                                            style={{
                                                margin: '10px 0'
                                            }}
                                        >
                                            <Select
                                                placeholder='请选择编程语言类型'
                                                style={{
                                                    width: '25%'
                                                }}
                                                onChange={(value) => {
                                                    setIsJava(value==='Java')
                                                }}

                                            >
                                                <Select.Option value='C'>C</Select.Option>
                                                <Select.Option value='C++'>C++</Select.Option>
                                                <Select.Option value='Python3'>Python3</Select.Option>
                                                <Select.Option value='Java'>Java</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            label='提交代码'
                                            name='code'
                                            rules={[{
                                                required: true,
                                                message: '提交代码不能为空'
                                            }]}
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
        </>
    )
}

