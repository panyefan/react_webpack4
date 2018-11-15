
export default class Utils {

    /**
     * 去除表头isShow==false不显示的项
     * tableData: 列表表头数组
     * 返回新的表头数组
     */
	static resetTableTh = (tableData = []) => {
		if (tableData.length < 0) return [];

		let newTableData = tableData.filter((currentValue, index, arr) => {
			return (!currentValue.hasOwnProperty('isShow') || currentValue.isShow);
		})
		
		return newTableData;
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
