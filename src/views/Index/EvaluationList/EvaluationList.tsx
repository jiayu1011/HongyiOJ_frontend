import React, {useEffect, useState} from "react";
import {Button, Col, Input, message, Modal, Row, Space, Table, Tag} from "antd";
import http from "../../../utils/http";
import {APIS} from "../../../config/apis";
import {DEFAULT_PROBLEM_LIST_PAGESIZE} from "../../../config";
import {IProps} from "../../../config/interfaces";

interface EvaluationInfo {
    evaluationId?: string,
    code?: string,

}


export const EvaluationList:React.FC<IProps> = (props) => {
    const {history, route} = props

    const columns = [
        {
            title: '评测编号',
            dataIndex: 'evaluationId',
            key: 'evaluationId',
            render: (text: string) =>
                <a
                    onClick={(e) => {
                        let curId = (e.target as HTMLElement).innerHTML
                        evaluationList.forEach(item => {
                            if(item['evaluationId'] === curId){
                                setCurrentEvaluation(item)
                            }
                        })
                        setIsModalVisible(true)
                    }}
                >{text}</a>,
        },
        {
            title: '用户名',
            dataIndex: 'author',
            key: 'author',
            render: (text: string) => <b>{text}</b>,
        },
        {
            title: '题目编号',
            dataIndex: 'relatedProblemId',
            key: 'relatedProblemId',
            render: (text: string) =>
                <a
                    onClick={(e) => {
                        history.push('/problems/'+(e.target as HTMLElement).innerHTML)
                    }}
                >{text}</a>,
        },
        {
            title: '结果',
            dataIndex: 'result',
            key: 'result',
            render: (text: string) => <a style={{
                color: 'red',
                cursor: 'default'
            }}>{text}</a>
        },
        {
            title: '时间占用',
            dataIndex: 'timeCost',
            key: 'timeCost',
            render: (text: string) => text? <div>{text}ms</div> : null
        },
        {
            title: '内存占用',
            dataIndex: 'memoryCost',
            key: 'memoryCost',
            render: (text: string) => text? <div>{text}MB</div> : null
        },
        {
            title: '语言种类',
            dataIndex: 'codeLanguage',
            key: 'codeLanguage',
        },
        {
            title: '代码长度',
            dataIndex: 'codeLength',
            key: 'codeLength',
        },
        {
            title: '提交时间',
            dataIndex: 'submitTime',
            key: 'submitTime',
        }

    ];

    const [evaluationList, setEvaluationList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(DEFAULT_PROBLEM_LIST_PAGESIZE)
    const [queryForm, setQueryForm] = useState({})
    const [currentEvaluation, setCurrentEvaluation] = useState<EvaluationInfo>({})
    const [isModalVisible, setIsModalVisible] = useState(false)


    function getEvaluationList(){
        const params = {
            currentPage: currentPage,
            pageSize: pageSize,
            ...queryForm
        }
        http.get(APIS.EVALUATION.GET_EVALUATION_LIST, {
            params: params,
            headers: {
                Authorization: sessionStorage.getItem('token')
            }
        }).then(res => {
            console.log('全部评测结果列表:', res)
            let tempList:any = []
            res.data.evaluationList.forEach((item:any, index:number) => {
                tempList.push({
                    ...item,
                    key: index
                })
            })
            setEvaluationList(tempList)

        }).catch(err => {
            message.error('获取评测结果列表失败')
        })
    }

    function handleQueryFormChange(e: React.ChangeEvent<HTMLInputElement>, key: string){
        let tempForm:any = queryForm
        if(e.target.value.trim()){
            tempForm[key] = e.target.value
        } else {
            delete tempForm[key]
        }
        setQueryForm(tempForm)

    }

    function intervalGetEvaluationList(){
        getEvaluationList()
        setInterval(() => {
            getEvaluationList()
        }, 30*1000)
    }

    useEffect(() => {
        intervalGetEvaluationList()

    }, [])

    return (
        <>
            <div>
                <div>在线评测结果列表</div>
            </div>
            <div>
                <div>
                    <Row>
                        <Col span={5}>
                            <Input
                                addonBefore={'题目编号:'}
                                allowClear
                                size='small'
                                onChange={e => {
                                    handleQueryFormChange(e, 'relatedProblemId')
                                }}
                            />
                        </Col>
                        <Col span={1}></Col>
                        <Col span={5}>
                            <Input
                                addonBefore={'用户名:'}
                                allowClear
                                size='small'
                                onChange={e => {
                                    handleQueryFormChange(e, 'author')
                                }}
                            />
                        </Col>
                        <Col span={1}></Col>
                        <Col span={3}>
                            <Button
                                type='primary'
                                onClick={intervalGetEvaluationList}
                            >Go</Button>
                        </Col>
                    </Row>


                </div>
                <Table
                    columns={columns}
                    dataSource={evaluationList}
                    pagination={{
                        defaultCurrent: currentPage,
                        onChange: (pageNumber: number) => {
                            setCurrentPage(pageNumber)
                        },
                        onShowSizeChange: (current:any, pageSize:number) => {
                            setPageSize(pageSize)
                            intervalGetEvaluationList()
                        },
                        defaultPageSize: pageSize,
                        showQuickJumper: true,
                        position: ['bottomCenter']
                    }}
                />
            </div>
            <Modal
                title={currentEvaluation.evaluationId+'的提交代码'}
                visible={isModalVisible}
                footer={null}
                onOk={() => {
                    setIsModalVisible(false)
                }}
                onCancel={() => {
                    setIsModalVisible(false)
                }}

            >
                <div>{currentEvaluation.code}</div>
            </Modal>
        </>
    )
}
