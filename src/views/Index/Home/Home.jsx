import React, {useEffect, useState} from "react";
import {Breadcrumb, Carousel, Image} from "antd";

import './Home.scss'
import moment from "moment";
import utils from "../../../utils/utils";

function Home(props){

    const route = props.route;

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





    //获取日期展示模块数据
    useEffect(() => {
        let month = moment().month() + 1;
        let dayInMonth = moment().date();
        let dayInWeek = moment().day();
        // console.log(month, dayInWeek, dayInMonth);

        let monthArr = utils.monthJudge(month).split('');
        let dayStr = '星期' + (dayInWeek===7? '日':utils.numberMap(dayInWeek));
        let dayArr = dayStr.split('');
        console.log(monthArr, dayInMonth, dayArr);
        setDateDisplay({
            'month': monthArr,
            'dayInMonth': dayInMonth,
            'dayInWeek': dayArr
        })
    }, [])





    return (
        <div className='parent'>
            <div className='container'>
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




            </div>
        </div>

    )
}

export default Home