import React, {useEffect, useState} from "react";

import './ProblemList.scss'
import {Input, List, Avatar, Row, Col, Pagination, Button, Form, Drawer, message, Breadcrumb} from "antd";
import {LoadingOutlined, SearchOutlined} from "@ant-design/icons";
import http from "../../../../utils/http";
import {DEFAULT_PROBLEM_LIST_PAGESIZE} from '../../../../config'
import store from "../../../../store";
import {APIS} from "../../../../config/apis";


export default function ProblemList(props){
    const {history} = props;
    const {Search} = Input;
    const state = store.getState();


    const [pageSize, setPageSize] = useState(DEFAULT_PROBLEM_LIST_PAGESIZE);
    const [loading, setLoading] = useState(false);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [problemList, setProblemList] = useState([
        {
            problemId: 'P10000',
            status: 'unfinished',
            problemName: 'test1',
            problemTags: 'algorithm1, algorithm2'

        },
        {
            problemId: 'P10001',
            status: 'unfinished',
            problemName: 'test2',
            problemTags: 'algorithm3, algorithm4',

        }
    ]);
    const [searchInput, setSearchInput] = useState('')
    const [resultSum, setResultSum] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    function getProblemList(){
        setLoading(true);
        let params = {
            pageSize: pageSize,
            currentPage: currentPage,
            reviewStatus: 'approved'
        }
        let headers = {}
        if(state.logged) {
            params.username = state.userInfo.username
            headers.Authorization = sessionStorage.getItem('token');
        }

        http.get(APIS.PROBLEM.GET_PROBLEM_LIST, {
            params: params,
            headers: headers
        }).then(res => {
            console.log('审核通过的题目列表:', res);
            setProblemList(res.data.problemList);
            setLoading(false);
            setResultSum(res.data.resultSum);

        }).catch(err => {
            message.error('请求题目列表失败!')
        })
    }

    function handleSearchInputChange(e){
        setSearchInput(e.target.value);
    }

    function handleProblemSearch(){
        let params = {};
        if(searchInput.startsWith('P')){
            params.problemId = searchInput;
        } else {
            params.problemName = searchInput;
        }
        http.get(APIS.PROBLEM.GET_PROBLEM_LIST,{
            params: params,
        }).then(res => {
            console.log('problemList:', res);

        })
    }

    function handleProblemClick(){

    }


    useEffect(() => {
        getProblemList();

    }, [currentPage]);

    return(
        <div>
            <Breadcrumb>
                <Breadcrumb.Item key='problems'><a href='/problems'>题库</a></Breadcrumb.Item>
                <Breadcrumb.Item key='problems_list'><a href='/problems/list'>题目列表</a></Breadcrumb.Item>
            </Breadcrumb>
            <div className='body'>

                <Drawer
                    title='高级搜索'
                    placement='right'
                    closable={true}
                    onClose={() => {
                        setIsDrawerVisible(false);
                    }}
                    visible={isDrawerVisible}
                >
                    <div>题目内容</div>
                    <div>算法标签</div>
                    <Button type='primary'>搜索</Button>

                </Drawer>
                <div className='body-title'>题目列表</div>
                <div className="search-part">
                    <Row className='search-row'>
                        <Col span={3}>
                            <div className="search-title">搜索题目</div>
                        </Col>
                        <Col span={20} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Search
                                placeholder="请输入题目名称或题目编号（题目编号请以P开头）"
                                className='search-input'
                                onChange={handleSearchInputChange}
                                onSearch={handleProblemSearch}
                                enterButton
                                allowClear
                            />
                        </Col>
                    </Row>
                    <Row className='search-row'>
                        <Col span={24}>
                            <div style={{fontSize: '20px',color: 'gray'}}>共计{resultSum}条结果</div>
                        </Col>
                    </Row>
                    <Row className='search-row'>
                        <Col span={10}>

                        </Col>
                        <Col span={4}>
                            <Button type='primary' onClick={() => {
                                setIsDrawerVisible(true);
                            }}>高级搜索</Button>
                        </Col>
                        <Col span={10}>

                        </Col>
                    </Row>

                </div>

                <div className="list-part">
                    {/*The head column size must fit the following list*/}
                    <Row >
                        <Col span={1}></Col>
                        <Col span={2}>
                            <div>题号</div>
                        </Col>
                        <Col span={8}>
                            <div>题目名称</div>
                        </Col>
                        <Col span={8}></Col>
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
                                            <Col span={8}>
                                                <a className='problem-name' href={'/problems/'+item.problemId}>{item.problemName}</a>
                                            </Col>
                                            <Col span={8}></Col>


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

    )

}
