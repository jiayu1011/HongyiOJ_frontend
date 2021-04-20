import React, {useEffect, useState} from "react";

import './ProblemList.scss'
import {Input, List, Avatar, Row, Col, Pagination} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import http from "../../../../utils/http";

export default function ProblemList(props){
    const {history} = props;

    const pageSize = 30;
    const {Search} = Input;

    const [problemList, setProblemList] = useState([
        {
            problemId: 'P10000',
            problemName: 'test1',

        },
        {
            problemId: 'P10001',
            problemName: 'test2',
        }
    ]);
    const [searchInput, setSearchInput] = useState('');
    const [resultSum, setResultSum] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    function getProblemList(){
        http.get('/problemList', {
                params: {
                    currentPage: currentPage,
                }
            },
        ).then(res => {
            console.log('problemList:', res);
            setProblemList(res.data.problemList);
            setResultSum(res.data.resultSum);

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
        http.get('/problemList',{
            params: params,
        }).then(res => {
            console.log('problemList:', res);

        })
    }

    function handleProblemClick(){

    }

    function handlePageChange(pageNumber){
        setCurrentPage(pageNumber);

    }

    useEffect(() => {
        getProblemList();

    }, [currentPage]);

    return(
        <div className='body'>
            <div className='body-title'>题目列表</div>
            <div className="search-part">
                <Row className='search-row'>
                    <Col span={3}>
                        <div className="search-title">搜索题目</div>
                    </Col>
                    <Col span={20} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Search
                            placeholder="请输入题目名称或题目编号"
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
                        <div>高级搜索</div>
                    </Col>
                    <Col span={10}>

                    </Col>
                </Row>

            </div>

            <div className="list-part">
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
                                    <a className='problem-name' href={item.problemId}>{item.problemName}</a>
                                </Col>
                                <Col span={8}></Col>


                            </Row>

                        </List.Item>
                    )}
                >

                </List>
            </div>

            <Pagination showQuickJumper defaultCurrent={currentPage} total={problemList.length} onChange={handlePageChange} />
        </div>
    )

}
