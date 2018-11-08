import axios from 'axios';
import Utils from '../utils/Utils';

// ******************************************* 全局参数start *******************************************
// 初始化一个全局变量对象
global.SC = {
    baseUrl: '',
}

if (process.env.NODE_ENV != 'production') { // 开发环境
    global.SC.baseUrl = '/api_dev_adm';
}
// ******************************************* 全局参数end *******************************************

global.initHoldPages = () => {
    console.log("全局方法");
}

// 拦截所有请求的axios全局拦截器
global.request = axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
});

// //添加请求拦截器,对axios请求进行一些设置
global.request.interceptors.request.use((config) => {
    //在发送请求之前做某事
    return config;
}, (error) => {
    //请求错误时做些事
    return Promise.reject(error);
});

// 添加响应拦截器
global.request.interceptors.response.use((response) => {
    // 对响应数据做点什么
    return response;
}, (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
});