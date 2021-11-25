import React, {useEffect, useState} from 'react'
import {Breadcrumb, Button, message} from "antd";
import http from "../../../../utils/http";
import style from './ProblemInfo.module.scss'
import {UPLOAD_PROBLEM_STRUCTURE, UPLOAD_PROBLEM_TEST_STRUCTURE} from "../../../../config";
import store from "../../../../store";
import {APIS} from "../../../../config/apis";
import {HTTPHeaders, IProps} from "../../../../config/interfaces";

export const ProblemInfo:React.FC<IProps> = (props) => {
    const {route, history, location} = props
    const state = store.getState()


    const titleDict = {
        problemBg: '题目背景',
        problemDes: '题目描述',
        inputFormat: '输入格式',
        outputFormat: '输出格式',
        problemTips: '提示'
    }

    const [problemInfo, setProblemInfo] = useState(UPLOAD_PROBLEM_STRUCTURE);


    const redirect = () => {
        let path = location.pathname;
        if(path.endsWith('/')){
            history.push(path.substring(0, path.length-1))
        }
    }


    const getProblemInfo = () => {
        let pathArr = location.pathname.split('/');
        let currentId = location.pathname.endsWith('/')? pathArr[pathArr.length-2]:pathArr[pathArr.length-1]
        console.log(currentId)
        let params = {
            problemId: currentId
        }
        let headers:HTTPHeaders = {}
        if(state.logged){
            headers.Authorization = sessionStorage.getItem('token')
        }
        http.get(APIS.PROBLEM.GET_PROBLEM_LIST, {
            params: params,
            headers: headers
        }).then(res => {
            console.log('题目详情:', res);
            if(res.data.isOk){
                setProblemInfo(res.data.problemList[0]);
            } else {
                message.error(res.data.errMsg).then()
            }


        }).catch(err => {
            message.error('获取题目详情失败').then()
        })
    }

    const formatContent = (str:string) => {
        let urlPattern = /(https?:\/\/|www\.)[a-zA-Z_0-9\-@]+(\.\w[a-zA-Z_0-9\-:]+)+(\/[\(\)~#&\-=?\+\%/\.\w]+)?/g
        str = str.replace(urlPattern, (match) => {
            // console.log(match)
            return `<br/><img src="${match}" alt="${match}" height="" width=""/><br/>`
        })

        return str
    }


    useEffect(() => {
        redirect()
        getProblemInfo();

    }, [])



    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item key='problems'><a href={'/problems'}>题库</a></Breadcrumb.Item>
                <Breadcrumb.Item key='problem'><a href={`/problems/${problemInfo.problemId}`}>{problemInfo.problemId}</a></Breadcrumb.Item>
                <Breadcrumb.Item key='problem_info'><a href=''>题目详情</a></Breadcrumb.Item>
            </Breadcrumb>
            <div className={style.body}>

                <div className='body-title'>{problemInfo.problemId} {problemInfo.problemName}</div>
                <div style={{
                    margin: '10px 0'
                }}>

                    <Button
                        type='primary'
                        onClick={() => {
                            if(state.logged){
                                history.push('/problems/' + problemInfo.problemId + '/submit')
                            } else {
                                message.info('请先登录后再提交代码~').then()
                            }
                        }}
                    >提交答案</Button>
                    <Button
                        type='dashed'
                        style={{
                            margin: '0 10px'
                        }}
                        onClick={() => history.push('/discussions/'+problemInfo.problemId)}
                    >查看讨论</Button>
                </div>
                <div className='problem-card'>
                    {problemInfo.problemBg===''? null:<div className='problem-unit'>
                        <div className='unit-title'>题目背景</div>
                        <div className={'unit-content'}>{formatContent(problemInfo.problemBg)}</div>
                    </div>}
                    <div className='problem-unit'>
                        <div className='unit-title'>题目描述</div>
                        <div
                            dangerouslySetInnerHTML={{__html: formatContent(problemInfo.problemDes)}}
                        />
                    </div>
                    <div className='problem-unit'>
                        <div className='unit-title'>输入格式</div>
                        <div className={'unit-content'}>{formatContent(problemInfo.inputFormat)}</div>
                    </div>
                    <div className='problem-unit'>
                        <div className='unit-title'>输出格式</div>
                        <div className={'unit-content'}>{formatContent(problemInfo.outputFormat)}</div>
                    </div>
                    <div className='problem-unit'>
                        <div className='unit-title'>输入输出样例</div>
                        <div className={'unit-content'}>{formatContent(problemInfo.ioExamples)}</div>
                    </div>


                </div>
            </div>
        </>

    )
}

