/**
 * 工具函数
 *
 */
import * as _ from 'lodash'

/**
 * Object到FormData转换
 * @param target
 * @returns {FormData}
 */
export const makeFormData =  (target:any) => {
    let data = new FormData();
    if(typeof target === 'object'){

        for(let key in target){
            data.append(key, target[key])
        }
    }

    return data;
}

/**
 * 阿拉伯数字->中文数字
 * @param number
 * @returns {string}
 */
export const numberMap = (number:number) => {
    // const numArr = _.range(1, 13);
    const chineseArr = [
        '一', '二', '三', '四',
        '五', '六', '七', '八',
        '九', '十', '十一', '十二',
    ]

    return chineseArr[number-1];
}

/**
 * 判断月份大小
 * @param month
 * @returns {string}
 */
export const monthJudge = (month:number) => {
    const bigMonth = [1, 3, 5, 7, 8, 10, 12];
    const smallMonth = [2, 4, 6, 9, 11];
    if(month in bigMonth){
        return numberMap(month) + '月大';
    } else {
        return numberMap(month) + '月小';
    }
}

export default {}


