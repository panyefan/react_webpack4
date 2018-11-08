
export default class Utils {

    /**
     * 获取小数的整数部分
     * 123.00，结果为：123
     */
    static getDecInt(str) {
        if (str !== undefined && str !== null) {
            return str.split('.')[0];
        } else {
            return str || '0';
        }
    }
    /**
     * num传入的数字，n需要的字符长度
     * 传入6，需要的字符长度为3，结果为：006
     */
    static PrefixInteger(num, n) {
        return (Array(n).join(0) + num).slice(-n);
    }
    /**
     * 不足两位前面补零
     */
    static formatNumber(n) {
        n = n.toString();
        return n[1] ? n : '0' + n;
    }
    /**
     * 不足两位前面补零
     */
    static getWeek(n) {
        let arr = ["日", "一", "二", "三", "四", "五", "六"]
        return arr[n];
    }
    /**
     * 获取切割字符串的数组，如1;2;3，返回[1,2,3]
     */
    static getStrSplitArr(str) {
        str = str.toString();
        return str.split(";");
    }
    /**
     *  根据字符串获取数组中对应的元素
     */
    static getArrEle = (arr, str, objName = "lotteryGroup") => {
        let obj = {};
        for (let i = 0, len = arr.length; i < len; i++) {
            if (arr[i][objName] == str) {
                obj = arr[i];
                break;
            }
        }
        return obj;
    }
    /**
     *  将一维数组切割成二维数组
     */
    static splitTwoArr = (arr) => {
        let allData = []; //用来装处理完的数组
        let currData = []; //子数组用来存分割完的数据
        for (let i = 0; i < arr.length; i++) {
            currData.push(arr[i]);
            if ((i != 0 && (i + 1) % 2 == 0) || i == arr.length - 1) {
                allData.push(currData);
                currData = [];
            }
        };
        return allData;
    }
};
