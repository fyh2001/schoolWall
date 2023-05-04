/*
 * @Author: 黄叶
 * @Date: 2023-04-22 01:35:33
 * @LastEditTime: 2023-04-29 13:42:22
 * @FilePath: /schoolWall/src/utils/timeFormat.js
 * @Description: 
 */
// 时间格式化（片刻之前、x小时前、x天前）
const Time = {
    //获取时间戳
    getUNIX : () => {
        const date = new Date();
        return date.getTime();
    },

    // 获取今天0点0分0秒的时间戳
    getTodayUNIX: () => {
        const date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },

    // 获取今年1月1日0点0分的时间戳
    getYearUNIX: () => {
        const date = new Date();
        date.setMonth(0);
        date.setDate(1)
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },

    // 获取标准年、月、日
    getLastDate: (time) => {
        const date = new Date(time);
        const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return date.getFullYear() + '-' + month + '-' + day;
    },

    setDate: (date) => {
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let seconde = date.getSeconds();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (seconde < 10) {
            seconde = "0" + seconde;
        }
        let newDate =
            // year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + seconde
            year + "-" + month + "-" + day

        return newDate;
    },

    /**
     * 时间戳转换
     * @param {timestamp} timesTamp 时间戳
     * @returns 片刻之前 | n分钟前 | n小时前 | n天前 | 
     */
    getFormateTime: (timesTamp) => {
        // 获取当前时间的时间戳
        const now = Time.getUNIX();
        const today = Time.getTodayUNIX();
        const year = Time.getTodayUNIX();
        // 计算当前时间和输入时间的时间戳差值
        const timer = (now - timesTamp) / 1000;

        let tip = '';
        if (timer <= 0) {
            tip = '片刻之前';
        } else if (Math.floor(timer / 60) <= 0) {
            tip = '片刻之前';
        } else if (timer < 3600) {
            tip = Math.floor(timer / 60) + '分钟前';
        } else if (timer >= 3600 && (timesTamp - today >= 0)) {
            tip = Math.floor(timer / 3600) + '小时前';
        } else if (timer / 86400 <= 30) {
            tip = Math.ceil(timer / 86400) + '天前';
        } else {
            tip = Time.setDate(new Date(timesTamp));
        }
        return tip;
    }
}

export default Time