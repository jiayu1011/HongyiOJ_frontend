import React, {useEffect, useState} from "react";
import {Button, Col, Drawer, List, message, Pagination, Row} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import style from './Review.module.scss'
import http from "../../../utils/http";
import {DEFAULT_PROBLEM_LIST_PAGESIZE} from "../../../config";
import {Link} from "react-router-dom";
import qs from "qs";

export default function Review(props){


    const statusDict = {
        reviewing: '审核中',
        approved: '已通过审核',
        disapproved: '未通过审核'
    }

    const [loading, setLoading] = useState(false)
    const [problemList, setProblemList] = useState([])
    const [resultSum, setResultSum] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(DEFAULT_PROBLEM_LIST_PAGESIZE);



    function getProblemList(){
        setLoading(true)
        let params = {
            pageSize: pageSize,
            currentPage: currentPage
        }


        http.get('/problem/list', {
            params: params
        }).then(res => {
            console.log('所有题目列表:', res)
            setProblemList(res.data.problemList)
            setLoading(false)
            setResultSum(res.data.resultSum)

        })
    }

    /**
     *
     * @param problemId
     * @param reviewStatus
     */
    function handleReview(problemId, reviewStatus){
        let data = {
            problemId: problemId,
            reviewStatus: reviewStatus
        }
        let headers = {
            Authorization: sessionStorage.getItem('token')
        }
        http.put('/review', qs.stringify(data), {
            headers: headers
        }).then(res => {
            console.log('题目审核:', res)
            switch (reviewStatus){
                case 'approved':
                    message.success('题目'+problemId+'已确认通过审核')
                    break
                case 'disapproved':
                    message.success('题目'+problemId+'已确认未通过审核')
                    break
                default:

            }
        }).catch(err => {
            message.error('通过审核失败')
        })
    }



    useEffect(() => {
        getProblemList()
    }, [])


    return (
        <div>
            <div>
                <b>审核题目</b>
                <div className='body'>
                    <div className='body-title'>题目列表</div>
                    <div className="search-part">
                        <Row className='search-row'>
                            <Col span={24}>
                                <div style={{fontSize: '20px',color: 'gray'}}>共计{resultSum}条结果</div>
                            </Col>
                        </Row>


                    </div>

                    <div className="list-part">
                        {/*The head column size must fit the following list*/}
                        <Row>
                            <Col span={1}></Col>
                            <Col span={2}>
                                <div>题号</div>
                            </Col>
                            <Col span={6}>
                                <div>题目名称</div>
                            </Col>
                            <Col span={6}>
                                <div>状态</div>
                            </Col>
                            <Col span={6}>
                                <div>操作</div>
                            </Col>
                        </Row>
                        {
                            loading? (
                                <div style={{textAlign: 'center'}}>加载中...<LoadingOutlined /></div>
                            ) : (
                                <List
                                    className='problem-list'
                                    itemLayout='horizontal'
                                    dataSource={problemList}
                                    renderItem={item => (
                                        <List.Item>
                                            <Row style={{width: '100%'}}>
                                                <Col span={1}></Col>
                                                <Col span={2}>
                                                    <div>{item.problemId}</div>
                                                </Col>
                                                <Col span={6}>
                                                    <a
                                                        className='problem-name'
                                                        href={'/problems/'+item.problemId}
                                                    >{item.problemName}</a>
                                                </Col>
                                                <Col span={6}>
                                                    <b>{statusDict[item.reviewStatus]}</b>
                                                </Col>
                                                <Col span={6}>
                                                    <Button
                                                        type='primary'
                                                        style={{
                                                            margin: '0 5px'
                                                        }}
                                                        onClick={() => handleReview(item.problemId, 'approved')}
                                                    >通过</Button>
                                                    <Button
                                                        type='primary'
                                                        danger
                                                        onClick={() => handleReview(item.problemId, 'disapproved')}
                                                    >不通过</Button>
                                                </Col>

                                            </Row>

                                        </List.Item>
                                    )}
                                >

                                </List>
                            )
                        }

                    </div>

                    <Pagination
                        defaultCurrent={currentPage}
                        total={resultSum}
                        onChange={pageNumber => {setCurrentPage(pageNumber)}}
                        onShowSizeChange={(current, pageSize) => {
                            setPageSize(pageSize);
                            getProblemList();
                        }}
                        defaultPageSize={pageSize}
                        showTotal={total => `Total ${total} items`}
                        showQuickJumper
                    />
                </div>
            </div>
        </div>
    )
}