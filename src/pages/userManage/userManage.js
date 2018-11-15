import React from 'react';
import { Row, Col, Divider, Input, Button, Icon, Table, Dropdown, Menu, Badge, Modal } from 'antd';
import Utils from '../../utils/Utils';
import './userManage.styl';

export default class userManage extends React.Component {
    static defaultProps = {
    };
    static propTypes = {
    };
    constructor(props) {
        super(props);
        this.pageSize = 15;
        this.currentPage = -1;
        this.sizeArr = ['5', '15', '30', '50', '100'];
        this.thData = [
            { title: '姓名', dataIndex: 'createTime1', key: 'createTime1' },
            { title: '手机号码', dataIndex: 'createTime2', key: 'createTime2' },
            { title: '部门', dataIndex: 'createTime3', key: 'createTime3' },
            { title: '职位', dataIndex: 'createTime4', key: "createTime4" },
            { title: '职级', dataIndex: 'createTime5', key: 'createTime5' },
            { title: '身份证后6位', dataIndex: 'createTime6', key: 'createTime6' },
            { title: '添加时间', dataIndex: 'createTime7', key: 'createTime7' },
            {
                title: '发放状态', dataIndex: 'createTime8', key: 'createTime8', render: (text, item) => {
                    return (
                        <Badge status="warning" text="未领" />
                    )
                }
            },
            {
                title: '员工状态', dataIndex: 'createTime9', key: 'createTime9', render: (text, item) => {
                    return (
                        <Badge status="processing" text="离职" />
                    )
                }
            },
            {
                title: '操作', key: 'operation', width: 104, render: (text, item) => {
                    const menu = <Menu>
                        <Menu.Item key='1'>
                            <a href="#/index">修改</a>
                        </Menu.Item>
                        <Menu.Item key='5'>
                            <a href="#/index">离职</a>
                        </Menu.Item>
                    </Menu>;
                    return (
                        <Dropdown overlay={menu}>
                            <a>操作<Icon type="down" /></a>
                        </Dropdown>
                    )
                }
            }
        ],
            this.state = {
                thData: [],
                bodyData: [{
                    'createTime1': '1234',
                    'createTime2': '1234',
                    'createTime3': '1234',
                    'createTime4': '1234',
                    'createTime5': '1234',
                    'createTime6': '1234',
                    'createTime7': '1234',
                    'createTime8': '1234',
                    'createTime9': '1234',
                }],
                totalRecords: 0, // 总记录数
                showLoading: false, // 表格是否显示load

                addEmpVisible: false, // 是否显示添加员工对话框


            }
    }
    componentDidMount() {
        this.setState({
            thData: Utils.resetTableTh(this.thData)
        })
    }

    // 确认添加员工
    addEmpOk = () => {
        console.log("添加员工");
    }

    render() {
        let payPagination = {
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: this.sizeArr,
            showTotal: total => `共 ${total} 条数据`,
            total: this.state.totalRecords,
            pageSize: this.pageSize
        }
        return (
            <div className="user_manage_wrap">
                <div className="user_manage_head">
                    <span>在职员工总数：<span className="num">888</span>人</span>
                    <Button className="ml30" type="primary" icon="poweroff" onClick={() => this.setState({ addEmpVisible: true })}>添加员工</Button>
                    <Button className="ml30" type="primary" icon="poweroff">批量新增</Button>
                    <Button className="ml30" type="primary" icon="poweroff">批量修改</Button>
                    <Divider></Divider>
                </div>
                <div className="query_flex">
                    <div className="query_flex_item">
                        <div className="label">姓名</div>
                        <div className="control">
                            <Input className="width224" maxLength="30" name="userName" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="query_flex_item">
                        <div className="label">手机号码</div>
                        <div className="control">
                            <Input className="width224" maxLength="30" name="userName" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="query_flex_item">
                        <div className="label">部门</div>
                        <div className="control">
                            <Input className="width224" maxLength="30" name="userName" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="query_flex_item">
                        <div className="label">职位</div>
                        <div className="control">
                            <Input className="width224" maxLength="30" name="userName" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="query_flex_item">
                        <div className="label">职级</div>
                        <div className="control">
                            <Input className="width224" maxLength="30" name="userName" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="query_flex_item">
                        <div className="label">身份证号码</div>
                        <div className="control">
                            <Input className="width224" maxLength="30" name="userName" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="query_flex_item">
                        <div className="label">添加时间</div>
                        <div className="control">
                            <Input className="width224" maxLength="30" name="userName" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="query_flex_item">
                        <div className="label">发放状态</div>
                        <div className="control">
                            <Input className="width224" maxLength="30" name="userName" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="query_flex_item">
                        <div className="label">卡状态</div>
                        <div className="control">
                            <Input className="width224" maxLength="30" name="userName" onChange={this.handleChange} />
                        </div>
                    </div>
                </div>
                <div className="query_btn_wrap">
                    <Button type="primary">立即查询</Button>
                </div>
                <Table
                    rowKey={(r, i) => (i)}
                    columns={this.state.thData}
                    dataSource={this.state.bodyData}
                    pagination={payPagination}
                    loading={this.state.showLoading}
                />

                <Modal
                    title="添加员工"
                    visible={this.state.addEmpVisible }
                    onOk={this.addEmpOk}
                    onCancel={() => this.setState({ addEmpVisible: false }) }
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        )
    }
}
