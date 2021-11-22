import React, {useEffect, useState} from "react";
import {Button, Col, List, message, Modal, Pagination, Row} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import style from './ManageProblems.module.scss'
import http from "../../../../utils/http";
import {DEFAULT_PROBLEM_LIST_PAGESIZE} from "../../../../config";
import qs from "qs";
import {APIS} from "../../../../config/apis";
import {HTTPHeaders, IProps} from "../../../../config/interfaces";
import store from "../../../../store";
import utils from "../../../../utils/utils";

interface ReviewProblemItem{
    problemId: string,
    problemName: string,
    reviewStatus: string,
}


export const ManageProblems:React.FC<IProps> = (props) => {

    const state = store.getState()

    const statusDict = {
        reviewing: '审核中',
        approved: '已通过审核',
        disapproved: '未通过审核'
    }

    const [loading, setLoading] = useState<boolean>(false)
    const [problemList, setProblemList] = useState([])
    const [resultSum, setResultSum] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(DEFAULT_PROBLEM_LIST_PAGESIZE);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false)


    const getProblemList = () => {
        setLoading(true)
        let params = {
            pageSize: pageSize,
            currentPage: currentPage
        }


        http.get(APIS.PROBLEM.GET_PROBLEM_LIST, {
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
    const handleReview =
        (problemId: string, reviewStatus: string) => {
        let data = {
            problemId: problemId,
            reviewStatus: reviewStatus
        }
        http.put(APIS.MANAGE.REVIEW_PROBLEM, qs.stringify(data), {
            headers: {
                Authorization: sessionStorage.getItem('token')
            }
        }).then(res => {
            console.log('题目审核:', res)
            if(res.data.isOk){
                switch (reviewStatus){
                    case 'approved':
                        message.success('题目'+problemId+'通过审核').then()
                        break
                    case 'disapproved':
                        message.success('题目'+problemId+'未通过审核').then()
                        break
                    case 'reviewing':
                        message.success('题目'+problemId+'审核中').then()
                        break
                    default:

                }
            } else {
                message.error(res.data.errMsg).then()
            }

            getProblemList()
        }).catch(err => {
            message.error('通过审核失败').then()
        })
    }

    const handleDelete = () => {
        setIsDeleteModalVisible(true)

    }

    const deleteProblem = (problemId: string) => {
        setIsDeleteModalVisible(false)
        let params = {
            problemId: problemId,
            operator: state.userInfo.username
        }
        let headers:HTTPHeaders = {
            Authorization: sessionStorage.getItem('token')
        }
        http.delete(APIS.MANAGE.DELETE_PROBLEM, {
            params: params,
            headers: headers
        }).then(res => {
            console.log('delete problem:', res)
            if(res.data.isOk){
                message.success(`${problemId}删除成功!`).then(() => {
                    window.location.reload();
                })
            } else {
                message.error(`${problemId}删除失败`).then()
            }
        }).catch(err => {
            message.error(err).then()
        })
    }



    useEffect(() => {
        getProblemList()
    }, [])


    return (
        <>
            <div>
                <b>管理题目</b>
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
                            <Col span={4}>
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
                                    renderItem={(item:ReviewProblemItem) => (
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
                                                <Col span={4}>
                                                    <b>{(statusDict as any)[item.reviewStatus]}</b>
                                                </Col>
                                                <Col span={6}>
                                                    <Button
                                                        type='primary'
                                                        style={{
                                                            margin: '0 2px'
                                                        }}
                                                        onClick={() => handleReview(item.problemId, 'approved')}
                                                        disabled={item.reviewStatus==='approved'}
                                                    >通过</Button>
                                                    <Button
                                                        type='primary'
                                                        style={{
                                                            margin: '0 2px'
                                                        }}
                                                        danger
                                                        onClick={() => handleReview(item.problemId, 'disapproved')}
                                                        disabled={item.reviewStatus==='disapproved'}
                                                    >不通过</Button>
                                                    <Button
                                                        type='dashed'
                                                        style={{
                                                            margin: '0 2px'
                                                        }}
                                                        onClick={() => handleReview(item.problemId, 'reviewing')}
                                                        disabled={item.reviewStatus==='reviewing'}
                                                    >审核中</Button>
                                                </Col>
                                                <Col span={2}>
                                                    <a >编辑</a>
                                                </Col>
                                                <Col span={2}>
                                                    <a onClick={handleDelete}>删除</a>
                                                </Col>

                                            </Row>
                                            <Modal
                                                title='提示'
                                                visible={isDeleteModalVisible}
                                                onOk={() => deleteProblem(item.problemId)}
                                                onCancel={() => {
                                                    setIsDeleteModalVisible(false);
                                                }}
                                            >
                                                <div>确认要删除{item.problemId}吗?</div>
                                            </Modal>

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
        </>
    )
}