import React, { Component } from 'react';
import { Layout, Menu, Icon, Tabs } from 'antd';

import './init.styl';

class Init extends Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        this.state = {
            collapsed: false,
            panes: [
                { title: 'Tab 1', content: 'Content of Tab Pane 1', key: '1' },
                { title: 'Tab 1', content: 'Content of Tab Pane 1', key: '2' },
            ]
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    // Tabs
    onChange = (activeKey) => {
        this.setState({ activeKey });
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    // add = () => {
    //     const panes = this.state.panes;
    //     const activeKey = `newTab${this.newTabIndex++}`;
    //     panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
    //     this.setState({ panes, activeKey });
    // }
    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
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
                    style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
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
                    <Header style={{ position: 'fixed', top: 0,width: '100%', height: '64px', background: '#6c6c6c', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Tabs
                        style={{ position: 'fixed', top: '64px',width: '100%' }}
                        hideAdd
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
                    </Tabs>
                    {/* <Content style={{ margin: '86px 16px 24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        Content
                    </Content> */}
                </Layout>
            </Layout>

        )
    }
}
export default Init;
