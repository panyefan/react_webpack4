import React, { Component } from 'react';
import { Layout, Menu, Icon, Tabs } from 'antd';
import PropTypes from 'prop-types';
import './init.styl';

class Init extends Component {
    constructor(props, context) {
        super(props, context);
        this.curTabKey = ''; // 当前激活的是哪个tab
        this.state = {
            collapsed: false, // 是否折叠菜单
            activeKey: '',
            panes: [],
            acurrentTabKey: '',  // 当前激活的是哪个tab
            atabPanes: [], // 当前总共有哪些tab
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
        this.tabTitleMap = this.parseTabTitle([{'funcId':1,'funcName':'Dices','funcUrl':'Dices'}]);
        this.updateTab(this.props);
    }

    componentWillReceiveProps(nextProps) {

        let {panes} = this.state;

        const action = this.props.location.action;
        if (action === 'PUSH') {  // action有PUSH、POP、REPLACE等几种, 不太清楚分别是做什么用的
            return;
        }
        // FIXME: hack, 因为要区分react-router引起的re-render和redux引起的re-render
        if (this.props.collapse === nextProps.collapse) {
            this.updateTab(nextProps);
        }
    }

    // Tabs
    onChange = (activeKey) => {
        let curHref = activeKey;
        let preLink = window.location.href.split('#/')[1].split('?');
        let preHref = preLink[0];
        let preQuery = preLink[1] || '';
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
        for(let i=0;i<panes.length;i++) {
            if(panes[i].key) {
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
            tabTitleMap.set(item.funcUrl,item.funcName);
            tabFuncIdMap.set(item.funcUrl,item.funcId);
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
        if(path.startsWith('/') && path.length > 1) {
            path = path.substr(1);
        }
        if(path == "index") {
            path = '/';
        }
        const index = values.indexOf(path);
        const tabTitle =  this.tabTitleMap.get(path);
        const newtabs = {
            title: tabTitle,
            content: props.children,
            key: path
        };

        if(index !== -1) {
            const activeTabkey = `${panes[index].key}`;
            const selectedKeys = (panes.length>0 && panes[0].key!='/' && panes[index].funcId) ? ('smenu' + panes[index].funcId) : ('smenu' + this.tabFuncIdMap.get(path));
            this.setState({
                activeKey: activeTabkey,
                selectedKeys: [selectedKeys]
            })

            sessionStorage.setItem('NavDefaultSelectedKeys', selectedKeys || '');

            this.curTabKey = activeTabkey;
        } else {
            if(path.includes('login')) {
                return
            };
            panes.push({ title: tabTitle, content: props.children, key: path, funcId: this.tabFuncIdMap.get(path) });
        }
        let cancelTabsKey = sessionStorage.getItem('cancelTabs') || '';
        sessionStorage.setItem('cancelTabs','')
        panes = panes.filter(pane => pane.key !== cancelTabsKey);
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
        } else if ( panes.length === 0) {
            console.log(this.context);
            this.context.router.push(path);
        }
        this.setState({ panes, activeKey });
    }

    // menus
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        const { Header, Sider, Content } = Layout;
        const TabPane = Tabs.TabPane;
        return (
            // <div>
            //     <div style={{ display: (this.props.location.pathname).charAt(this.props.location.pathname.length - 1) == '/' ? 'none' : 'block' }}>
            //         <div key={this.props.location.pathname}>
            //             {/*各子页面内容 start*/}
            //             {this.props.children}
            //             {/*各子页面内容 end*/}
            //         </div>
            //     </div>
            // </div>
            <Layout>
                <Sider
                    className="sider-menu"
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span>nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span>nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span>nav 3</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className={this.state.collapsed ? 'layout-retract' : 'layout-elongation'}>
                    <Header className="header_wrap">
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <div className={`page_content ${this.state.collapsed ? 'page_content_fold' : 'page_content_unfold'}`}>
                        <Tabs
                            hideAdd
                            onChange={this.onChange}
                            activeKey={this.state.activeKey}
                            type="editable-card"
                            onEdit={this.onEdit}
                        >
                            {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
                        </Tabs>
                    </div>
                </Layout>
            </Layout>

        )
    }
}
export default Init;
