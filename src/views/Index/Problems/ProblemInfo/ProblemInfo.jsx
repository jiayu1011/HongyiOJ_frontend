import React, {useEffect, useState} from 'react'
import {Breadcrumb, Button, message} from "antd";
import http from "../../../../utils/http";
import style from './ProblemInfo.module.scss'
import {UPLOAD_PROBLEM_STRUCTURE, UPLOAD_PROBLEM_TEST_STRUCTURE} from "../../../../config";
import store from "../../../../store";

function ProblemInfo(props){
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


    function redirect(){
        let path = location.pathname;
        if(path.endsWith('/')){
            history.push(path.substring(0, path.length-1))
        }
    }


    function getProblemInfo(){
        let pathArr = location.pathname.split('/');
        let currentId = location.pathname.endsWith('/')? pathArr[pathArr.length-2]:pathArr[pathArr.length-1]
        console.log(currentId)
        let params = {
            problemId: currentId
        }
        let headers = {}
        if(state.logged){
            headers.Authorization = sessionStorage.getItem('token')
        }
        http.get('/problem/list', {
            params: params,
            headers: headers
        }).then(res => {
            console.log('题目详情:', res);
            if(res.data.isOk){
                setProblemInfo(res.data.problemList[0]);
            } else {
                message.error(res.data.errMsg)
            }


        }).catch(err => {
            message.error('获取题目详情失败')
        })
    }

    function formatContent(str){
        let urlPattern = /(https?:\/\/|www\.)[a-zA-Z_0-9\-@]+(\.\w[a-zA-Z_0-9\-:]+)+(\/[\(\)~#&\-=?\+\%/\.\w]+)?/g
        str = str.replace(urlPattern, function (match){
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
        <div>
            <Breadcrumb>
                <Breadcrumb.Item key='problems'><a href='/problems'>题库</a></Breadcrumb.Item>
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
                        onClick={() => history.push('/problems/'+problemInfo.problemId+'/submit')}
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
                        <div>{formatContent(problemInfo.problemBg)}</div>
                    </div>}
                    <div className='problem-unit'>
                        <div className='unit-title'>题目描述</div>
                        <div
                            dangerouslySetInnerHTML={{__html: formatContent(problemInfo.problemDes)}}
                        ></div>
                    </div>
                    <div className='problem-unit'>
                        <div className='unit-title'>输入格式</div>
                        <div>{formatContent(problemInfo.inputFormat)}</div>
                    </div>
                    <div className='problem-unit'>
                        <div className='unit-title'>输出格式</div>
                        <div>{formatContent(problemInfo.outputFormat)}</div>
                    </div>
                    <div className='problem-unit'>
                        <div className='unit-title'>输入输出样例</div>
                        <div>{formatContent(problemInfo.ioExamples)}</div>
                    </div>


                </div>
            </div>
        </div>

    )
}

export default ProblemInfo