/**
 * 工具函数
 *
 */
import * as _ from 'lodash'

export default {
    /**
     * Object到FormData转换
     * @param target
     * @returns {FormData}
     */
    makeFormData: function (target){
        let data = new FormData();
        if(typeof target === 'object'){

            for(let key in target){
                data.append(key, target[key])
            }
        }

        return data;
    },

    /**
     * 阿拉伯数字->中文数字
     * @param number
     * @returns {string}
     */
    numberMap: function (number){
        // const numArr = _.range(1, 13);
        const chineseArr = [
            '一', '二', '三', '四',
            '五', '六', '七', '八',
            '九', '十', '十一', '十二',
        ]

        return chineseArr[number-1];
    },

    /**
     * 判断月份大小
     * @param month
     * @returns {string}
     */
    monthJudge: function (month){
        const bigMonth = [1, 3, 5, 7, 8, 10, 12];
        const smallMonth = [2, 4, 6, 9, 11];
        if(month in bigMonth){
            return this.numberMap(month) + '月大';
        } else {
            return this.numberMap(month) + '月小';
        }
    },




}