import React, {useEffect, useState} from "react";
import {Breadcrumb, Button, Carousel, Form, Image, Input, message} from "antd";

import './Home.scss'
import moment from "moment";
import utils from "../../../utils/utils";
import {AimOutlined, SearchOutlined} from "@ant-design/icons";
import * as _ from 'lodash'

function Home(props){

    const route = props.route;
    const history = props.history;

    //样式变量统一管理
    const styleVariable = {
        'carousel-item-height': 270,
        'carousel-item-width': 650,

    }
    //走马灯图片url数组
    const carouselSources = [
        "https://cdn.luogu.com.cn/upload/image_hosting/v70qsqm4.png",
        "https://cdn.luogu.com.cn/upload/image_hosting/t4d79b2z.png",
        "https://cdn.luogu.com.cn/upload/image_hosting/qa2rl0tq.png",
        "https://cdn.luogu.com.cn/upload/pic/22071.png",

    ]

    //日期展示模块
    const [dateDisplay, setDateDisplay] = useState({
        'month': [],
        'dayInMonth': '',
        'dayInWeek': []
    });
    const [arr, setArr] = useState({
        'key': []
    });
    //题目跳转输入
    const [jumpInput, setJumpInput] = useState('');
    const [contestList, setContestList] = useState([
        'test1',
        'test2',
    ])




    function handleJumpInputChange(e){
        setJumpInput(e.target.value);
    }
    function handleCommonJumpSubmit(e){
        if(jumpInput.length===0){
            message.error('跳转题号不能为空!');

        } else {
            history.push('/problems/' + jumpInput);

        }
    }
    function handleRandomJumpSubmit(e){
        let path = '/problems/';
        let problemId = 'P' + _.random(1001, 1005);
        history.push(path + problemId);
    }
    function handleContestJump(e){
        console.log(e.target.id);
        let path = '/contests/';
        history.push(path + e.target.id);
    }



    //获取日期展示模块数据
    useEffect(() => {
        let month = moment().month() + 1;
        let dayInMonth = moment().date();
        let dayInWeek = moment().day();
        // console.log(month, dayInWeek, dayInMonth);

        let monthArr = utils.monthJudge(month).split('');
        //周日为一个星期的第一天，dayInWeek此时为0
        let dayStr = '星期' + (dayInWeek===0? '日':utils.numberMap(dayInWeek));
        let dayArr = dayStr.split('');
        // console.log(monthArr, dayInMonth, dayArr);
        setDateDisplay({
            'month': monthArr,
            'dayInMonth': dayInMonth,
            'dayInWeek': dayArr
        })
    }, [])





    return (
        <div className='home-parent'>
            <div className='home-container'>

                <div className='home-content'>

                    <div className='row1'>
                        <Carousel autoplay className='home-carousel'>
                            {carouselSources.map((item, index) => {
                                return (<div className='carousel-item' key={index}>
                                    <Image
                                        width={styleVariable['carousel-item-width']}
                                        height={styleVariable['carousel-item-height']}
                                        src={item}
                                    />
                                </div>)
                            })}


                        </Carousel>

                        <div className='date-display'>
                            <div className='month'>
                                {dateDisplay['month'].map((item, index) => (<div key={index}>{item}</div>))}
                            </div>
                            <div className='day-in-month'>{dateDisplay['dayInMonth']}</div>
                            <div className='day-in-week'>
                                {dateDisplay['dayInWeek'].map((item, index) => (<div key={index}>{item}</div>))}
                            </div>

                        </div>


                    </div>

                    <div className='row2'>
                        <div className='problem-jump'>
                            <div className='jump-title'>问题跳转</div>
                            <Form className='jump-input'>

                                <Form.Item
                                    name='jump-input'
                                    rules={[
                                        {
                                            required: true,
                                            message: '题目编号不能为空'
                                        }
                                    ]}>
                                    <Input placeholder='输入题目编号' onChange={handleJumpInputChange}/>
                                </Form.Item>
                            </Form>

                            <div className='jump-action'>
                                <Button type='primary' onClick={handleCommonJumpSubmit}><SearchOutlined />跳转</Button>
                                <Button type='danger' onClick={handleRandomJumpSubmit}><AimOutlined />随机跳题</Button>
                            </div>

                        </div>


                        <div className='tips'>
                            <Image width={230} src={'https://www.luogu.com.cn/images/index/step1.png'}/>
                            <Image width={230} src={'https://www.luogu.com.cn/images/index/step2.png'}/>
                            <Image width={230} src={'https://www.luogu.com.cn/images/index/step3.png'}/>

                        </div>
                    </div>

                    <div className='row3'>
                        <div className="recent-contests">
                            <div className='contests-title'>近期比赛</div>
                            <div className='contest-list'>
                                {contestList.map((item,index) => {
                                    return (
                                        <div key={index} id={item} onClick={handleContestJump}>{item}</div>
                                    )
                                })}
                            </div>


                        </div>
                        <div className='announcement'>
                            <div className='announcement-title'>近期公告</div>

                        </div>
                    </div>

                </div>




            </div>
        </div>

    )
}

export default Home