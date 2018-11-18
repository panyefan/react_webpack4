import React, { Component } from 'react';
import { Layout, Menu, Icon, Tabs } from 'antd';
import { Login, Register, ForgetPassword } from '../components/LoginRegister/index';
import PropTypes from 'prop-types';
import Utils from '../utils/Utils';
import './init.styl';

export default class Init extends Component {
    constructor(props, context) {
        super(props, context);
        this.curTabKey = ''; // 当前激活的是哪个tab
        this.state = {
            toggleArr: [true, false, false], // 触发登录，注册、忘记密码组件的切换显示
            activeKey: '',
            panes: [],
            acurrentTabKey: '',  // 当前激活的是哪个tab
            atabPanes: [], // 当前总共有哪些tab
        }

        if (SC.loginFlag) {
            location.href = SC.indexUrl;
            return;
        } else if (!SC.loginFlag) {
            location.href = SC.loginUrl;
            return;
        }
    }

    static contextTypes = {
        router: PropTypes.object
    }

    componentDidMount() {
        this.updateTab(this.props);
    }

    componentWillMount() {
        // this.tabTitleMap = this.parseTabTitle(this.state.menus);
        this.tabTitleMap = this.parseTabTitle([{ 'funcId': 1, 'funcName': 'Dices', 'funcUrl': 'Dices' }]);
        this.updateTab(this.props);
    }

    componentWillReceiveProps(nextProps) {
        const action = this.props.location.action;
        console.log(`action:${action}`);
        if (action === 'PUSH') {  // action有PUSH、POP、REPLACE等几种, 删除Tab页面
            return;
        }
        if (this.props.collapse === nextProps.collapse) {
            this.updateTab(nextProps);
        }
    }

    // Tabs之前的切换
    onChange = (activeKey) => {
        let curHref = activeKey;
        let preLink = window.location.href.split('#/')[1].split('?');
        let preHref = preLink[0];
        let preQuery = preLink[1] || '';
        // 保留URL后面的参数
        sessionStorage.setItem(preHref, preQuery);
        let curQuery = sessionStorage.getItem(curHref) || '';
        this.context.router.push(activeKey + '?' + curQuery);
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    //tab keys数组表
    findValues = () => {
        let values = [];
        const panes = this.state.panes;
        for (let i = 0; i < panes.length; i++) {
            if (panes[i].key) {
                values.push(panes[i].key);
            }
        }
        return values;
    }

    //解析menu，生成叶子节点对应的key和名称
    parseTabTitle = (menus) => {
        const tabTitleMap = new Map();
        const tabFuncIdMap = new Map();
        // menus.forEach((menu) => {
        //     menu.subs.forEach((item) => {
        //         tabTitleMap.set(item.funcUrl.substr(1),item.funcName);
        //         tabFuncIdMap.set(item.funcUrl.substr(1),item.funcId);
        //     })
        // });
        menus.forEach((item) => {
            tabTitleMap.set(item.funcUrl, item.funcName);
            tabFuncIdMap.set(item.funcUrl, item.funcId);
        });

        this.tabFuncIdMap = tabFuncIdMap;

        // routeMenus.forEach((item) => {
        //     tabTitleMap.set(item.funcUrl, item.funcName)
        // });

        return tabTitleMap;
    }

    updateTab = (props) => {
        let panes = this.state.panes;
        const values = this.findValues();
        let path = props.location.pathname;
        if (path.startsWith('/') && path.length > 1) {
            path = path.substr(1);
        }
        if(path == "index") {
            path = '/';
        }
        const index = values.indexOf(path);
        const tabTitle = this.tabTitleMap.get(path);
        const newtabs = {
            title: tabTitle,
            content: props.children,
            key: path
        };

        if (index !== -1) {
            const activeTabkey = `${panes[index].key}`;
            const selectedKeys = (panes.length > 0 && panes[0].key != '/' && panes[index].funcId) ? ('smenu' + panes[index].funcId) : ('smenu' + this.tabFuncIdMap.get(path));
            this.setState({
                activeKey: activeTabkey,
                selectedKeys: [selectedKeys]
            })

            sessionStorage.setItem('NavDefaultSelectedKeys', selectedKeys || '');

            this.curTabKey = activeTabkey;
        } else {
            if (path.includes('login')) {
                return
            };
            panes.push({ title: tabTitle, content: props.children, key: path, funcId: this.tabFuncIdMap.get(path) });
        }
        // let cancelTabsKey = sessionStorage.getItem('cancelTabs') || '';
        // sessionStorage.setItem('cancelTabs','')
        // panes = panes.filter(pane => pane.key !== cancelTabsKey);
        this.setState({
            panes,
            activeKey: path
        });
    }

    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        const path = '/';
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
            this.context.router.push(activeKey + '?' + (sessionStorage.getItem(activeKey) || ''));
        } else if (lastIndex < 0 && panes.length > 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex + 1].key;
            this.context.router.push(activeKey + '?' + (sessionStorage.getItem(activeKey) || ''));
        } else if (panes.length === 0) {
            this.context.router.push(path);
        }
        this.setState({ panes, activeKey });
    }

    // 菜单点击
    menuClick = (obj) => {
        console.log(obj);
        // 路由到子页面
        obj.item.props.url && (location.href = obj.item.props.url);
    }

    // 切换到忘记密码组件
    onForgetPassword = () => {
        let toggleArr = this.state.toggleArr;
        toggleArr = Utils.setArrEleFalse(toggleArr);
        toggleArr[1] = true;
        this.setState({toggleArr});
    }
    // 切换到注册组件
    onRegister = () => {
        let toggleArr = this.state.toggleArr;
        toggleArr = Utils.setArrEleFalse(toggleArr);
        toggleArr[2] = true;
        this.setState({toggleArr});
    }
    // 切换到登录组件
    onLogin = () => {
        let toggleArr = this.state.toggleArr;
        toggleArr = Utils.setArrEleFalse(toggleArr);
        toggleArr[0] = true;
        this.setState({toggleArr});
    }

    render() {
        if (SC.loginFlag) {
            // 渲染首页
            return this.renderIndex();
        } else {
            // 登录首页
            return this.renderLogin();
        }
    }

    renderIndex = () => {
        const { Header, Sider, Content } = Layout;
        const TabPane = Tabs.TabPane;
        return (
            <Layout>
                <Sider
                    className="sider-menu"
                    trigger={null}
                    collapsible
                >
                    <div className="sider-menu-logo">
                        <i className="logo"></i>
                    </div>
                    <div className="sider-menu-wrap">
                        <Menu theme="dark" mode="inline" onClick={this.menuClick} defaultSelectedKeys={['1']}>
                            <Menu.Item key="2" url="#/">
                                <Icon type="video-camera" />
                                <span>企业信息</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="upload" />
                                <span>资金预存</span>
                            </Menu.Item>
                            <Menu.Item key="4" url="#/userManage">
                                <Icon type="upload"/>
                                <span>员工管理</span>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Icon type="upload" />
                                <span>发放福利</span>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <Icon type="upload" />
                                <span>对账统计</span>
                            </Menu.Item>
                            <Menu.Item key="7">
                                <Icon type="upload" />
                                <span>订单流水</span>
                            </Menu.Item>
                        </Menu>
                    </div>
                </Sider>
                <Layout className="layout-elongation">
                    <Header className="header_wrap"></Header>
                    <div className="page_content">
                        <div className="min_width">
                            <Tabs
                                hideAdd
                                onChange={this.onChange}
                                activeKey={this.state.activeKey}
                                type="editable-card"
                                onEdit={this.onEdit}
                            >
                                {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}><Content style={{ background:'#F0F2F5',padding: '16px' }}><div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{pane.content}</div></Content></TabPane>)}
                            </Tabs>
                        </div>
                    </div>
                </Layout>
            </Layout>
        )
    }

    renderLogin = () => {
        const { toggleArr } = this.state;
        return (
            <div className="login_wrap">
                <div className="login_wrap_left">
                    {toggleArr[0] && <Login className="fadeIn" onForgetPassword={this.onForgetPassword} onRegister={this.onRegister} />}
                    {toggleArr[1] && <Register className="fadeIn" onLogin={this.onLogin}/>}
                    {toggleArr[2] && <ForgetPassword className="fadeIn" onLogin={this.onLogin}/>}
                </div>
                <div className="login_wrap_right"></div>
            </div>
        )
    }

}