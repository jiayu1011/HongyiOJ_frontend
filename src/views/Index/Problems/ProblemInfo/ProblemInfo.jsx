import React, {useEffect, useState} from 'react'
import {Breadcrumb} from "antd";
import http from "../../../../utils/http";
import style from './ProblemInfo.module.scss'
import {UPLOAD_PROBLEM_TEST_STRUCTURE} from "../../../../config";

function ProblemInfo(props){
    const route = props.route;
    const history = props.history;


    const titleDict = {
        problemBg: '题目背景',
        problemDes: '题目描述',
        inputFormat: '输入格式',
        outputFormat: '输出格式',
        problemTips: '提示'
    }

    const [problemInfo, setProblemInfo] = useState(UPLOAD_PROBLEM_TEST_STRUCTURE);
    const [problemForm, setProblemForm] = useState({});


    function getProblemInfo(){
        let pathArr = props.location.pathname.split('/');
        let currentId = pathArr[pathArr.length-1];
        http.get('/problem/list', {
            params: {
                problemId: currentId
            }
        }).then(res => {
            console.log('problemInfo:', res);
            setProblemInfo(res.data.problemList[0]);


        })
    }


    useEffect(() => {
        getProblemInfo();

    }, [])

    return (
        <div className={style.body}>
            <div className={style.bodyTitle}>{problemInfo.problemId} {problemInfo.problemName}</div>
            <div className={style.problemCard}>
                {problemInfo.problemBg===''? null:<div className='problem-unit'>
                    <div className={style.problemUnit}>题目背景</div>
                    <div>{problemInfo.problemBg}</div>
                </div>}
                <div className={style.problemUnit}>
                    <div className={style.unitTitle}>题目描述</div>
                    <div>{problemInfo.problemDes}</div>
                </div>
                <div className={style.problemUnit}>
                    <div className={style.unitTitle}>输入格式</div>
                    <div>{problemInfo.inputFormat}</div>
                </div>
                <div className={style.problemUnit}>
                    <div className={style.unitTitle}>输出格式</div>
                    <div>{problemInfo.outputFormat}</div>
                </div>
                <div className={style.problemUnit}>
                    <div className={style.unitTitle}>输入输出样例</div>
                    <div>{problemInfo.ioExamples}</div>
                </div>

            </div>
        </div>
    )
}

export default ProblemInfo