import React,{Component} from 'react';
import ReactDOM,{render} from 'react-dom';
import {Router,Route,IndexRoute,hashHistory} from 'react-router';
import './default.css';//加载公用样式
import router from './router/router.js';//加载路由文件
import './config/config';//加载配置参数

import {Provider} from 'mobx-react'; // 全局引用mobx文件
import stores from './store/store.js';

render(<Provider {...stores}><Router history={hashHistory} routes={router}/></Provider>,document.getElementById('container'));
