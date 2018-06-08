import React,{Component} from 'react';
import {Link} from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { Menu, Icon } from 'antd';
import './Menus.styl';

class Menus extends Component{
    constructor(){
        super();
        this.state = {
            current: '1',
            openKeys: [],
            menuData:[]
        }
    }
    //----------------------点击的时候当前按钮激活
    selectItem =()=>{
        this.setState({
            isSelect: window.location.pathname,
        })
    };
    //----------------------点击浏览器的前进后退按钮可以切换导航的按钮激活状态
    handlePop(){
        this.setState({
            isSelect: window.location.pathname,
        })
    }
    componentWillMount() {
        window.addEventListener("popstate", this.handlePop.bind(this))
    }
    componentDidMount(){
        window.removeEventListener("popstate", this.handlePop.bind(this))
        this.setState({
            menuData:[
                {
                    key:'menugroup0',
                    icon:'home',
                    text:'首页',
                    path:'/',
                    menus:[]
                },
                {
                    key:'menugroup1',
                    icon:'rocket',
                    text:'游戏',
                    menus:[
                        {key:'1',path:'DetailContent',text:'休闲'},
                        {key:'2',path:'1',text:'街头'},
                        {key:'3',path:'2',text:'赛车'},
                        {key:'4',path:'3',text:'益智'}
                    ]
                },
                {
                    key:'menugroup2',
                    icon:'bulb',
                    text:'人工智能',
                    menus:[
                        {key:'5',path:'4',text:'AI'},
                        {key:'6',path:'5',text:'VR'},
                        {key:'7',path:'6',text:'智能设备'}
                    ]
                },{
                    key:'menugroup13',
                    icon:'api',
                    text:'大数据',
                    menus:[
                        {key:'8',path:'7',text:'数据收集'},
                        {key:'9',path:'8',text:'机器学习'},
                        {key:'10',path:'9',text:'行为预测'}
                    ]
                }
            ]
        });
    }

    handleClick = (e) => {
        console.log('Clicked: ', e);
        this.setState({ current: e.key });
    }
    onOpenChange = (openKeys) => {
        const state = this.state;
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
        const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

        let nextOpenKeys = [];
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey);
        }
        this.setState({ openKeys: nextOpenKeys });
    }
    getAncestorKeys = (key) => {
        const map = {
            sub3: ['sub2'],
        };
        return map[key] || [];
    }

    menuhtml = () => {
        let that = this;
        const SubMenu = Menu.SubMenu;
        return (
            <Menu mode="inline" openKeys={this.state.openKeys}
                selectedKeys={[this.state.current]}
                style={{ width: 200 }}
                onOpenChange={this.onOpenChange}
                onClick={this.handleClick}
                onSelect={ this.selectItem }
            >
            {
                that.state.menuData.map((item, index) => {
                    if (item.menus && item.menus.length > 0) {
                        return (
                            <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.text}</span></span>}>
                                {
                                    item.menus.map((sub, subIndex) => {
                                        return (
                                            <Menu.Item key={sub.key}>
                                                <span>{sub.text}</span>
                                                <Link to={sub.path}></Link>
                                            </Menu.Item>
                                        );
                                    })
                                }
                            </SubMenu>
                        );
                    } else {
                        return (
                            <Menu.Item key={item.key}>
                                <Icon type={item.icon} />
                                <span>{item.text}</span>
                                <Link to={item.path}></Link>
                            </Menu.Item>
                        );
                    }

                })
            }
            </Menu>
        );
    }

    render(){
        return(
            <div>
                {this.menuhtml()}
            </div>
        )
    }
}
export default Menus;
