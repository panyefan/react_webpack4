import React,{Component} from 'react';
import ReactDOM,{render} from 'react-dom';
import {Router,Route,IndexRoute,hashHistory} from 'react-router';
import './styles/reset.css';//加载公用样式
import './styles/commonMixin.styl';//加载公用样式
import router from './router/router.js';//加载路由文件
import './config/config';//加载配置参数

import {Provider} from 'mobx-react'; // 全局引用mobx文件
import stores from './store/store.js';

// 引用antd的中文包
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

render(<LocaleProvider locale={zh_CN}><Provider {...stores}><Router history={hashHistory} routes={router}/></Provider></LocaleProvider>,document.getElementById('container'));
