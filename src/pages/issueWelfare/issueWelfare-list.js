import React from 'react';
import { Row, Col, Divider, Input, Button, Icon, Table, Dropdown, Menu, Badge, Modal, message, Select } from 'antd';
import Utils from '../../utils/Utils';
import copy from 'copy-to-clipboard'; // 复制到剪贴板
import QRCode from 'qrcode.react'; // 根据链接生成二维码
import './issueWelfare-list.less';

const confirm = Modal.confirm;
export default class IssueWelfareList extends React.Component {
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
            { title: '发放批次', dataIndex: 'createTime1', key: 'createTime1' },
            { title: '发放主题', dataIndex: 'createTime2', key: 'createTime2' },
            { title: '发放时间', dataIndex: 'createTime3', key: 'createTime3' },
            { title: '实发金额', dataIndex: 'createTime4', key: "createTime4" },
            { title: '已领金额', dataIndex: 'createTime5', key: 'createTime5' },
            { title: '未领金额', dataIndex: 'createTime6', key: 'createTime6' },
            {
                title: '发放状态', dataIndex: 'createTime7', key: 'createTime7', render: (text, item) => {
                    return (
                        <Badge status="warning" text="未激活" />
                    )
                }
            },
            { title: '已领数量', dataIndex: 'createTime8', key: 'createTime8' },
            {
                title: '操作', key: 'operation', width: 104, render: (text, item) => {
                    const menu = <Menu>
                        <Menu.Item>
                            <a onClick={this.activationOper}>激活</a>
                        </Menu.Item>
                        <Menu.Item>
                            <a href="#/issueWelfare-detail">详情</a>
                        </Menu.Item>
                        <Menu.Item>
                            <a onClick={() => this.setState({ QRurlVisible: true })}>链接</a>
                        </Menu.Item>
                        <Menu.Item>
                            <a onClick={this.revocationOper}>撤销</a>
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
                search: {},
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
                }],
                totalRecords: 0, // 总记录数
                showLoading: false, // 表格是否显示load

                QRurlVisible: false, // 领卡链接对话框
                qrUrl: 'https://www.baodu.comhfhadsjkfhasd.fsdaiofuasdkjfhkjasdhfjksdahfjksdah.fsdaujfklsdajh?fhjsadjkfhds&fsda=fhasdjkfhsdhfjkdsahfjksdahfjkdshfjkh', // 二维码链接

            }
    }
    componentDidMount() {
        this.setState({
            thData: Utils.resetTableTh(this.thData)
        })

        Modal.error({
            title: '你还未配置卡面',
            content: '福利发放需先配置卡面',
            centered: true,
            onOk: () => {
                location.href = "#/cardConfig";
            },
        });
    }

    handleChange = (e) => {
        e.target.value = e.target.value.replace(/^\s+|\s+$/gm, '');
        let val = e.target.value;
        let name = e.target.name;
        let search = this.state.search;
        search[name] = val;
        this.setState({
            search: search
        });
    }
    handleSelectChange = (value) => {
        let search = this.state.search;
        search["selectvalue"] = value;
        this.setState({
            search: search
        });
    }

    // 查询
    queryBtn = () => {
        console.log(this.state.search);
    }

    // 激活
    activationOper = () => {
        confirm({
            title: '确认要激活这次发放吗？',
            content: '激活成功后，即发放',
            centered: true,
            onOk: () => {
                console.log("激活成功");
            },
            onCancel: () => { },
        });
    }
    // 撤销
    revocationOper = () => {
        confirm({
            title: '确认要撤销这次发放吗？',
            content: '撤销此次发放',
            centered: true,
            onOk: () => {
                console.log("撤销此次发放");
            },
            onCancel: () => { },
        });
    }
    // 复制到剪贴板
    copyToClipboard = (url) => {
        copy(url);
        message.success('复制成功');
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
        const Option = Select.Option;
        return (
            <div className="user_manage_wrap">
                <div className="user_manage_head">
                    <span>可用余额：<span className="num">100,000</span>元</span>
                    <Button className="ml30" type="primary" icon="poweroff" onClick={() => location.href = "#/issueWelfare"}>发放福利</Button>
                    {/* <Button className="ml30" type="primary" icon="poweroff" onClick={() => location.href = "#/cardConfig"}>卡面配置</Button> */}
                    {/* <Button className="ml30" type="primary" icon="poweroff" onClick={() => location.href = "#/welfareCar-list"}>卡管理</Button> */}
                    <Divider></Divider>
                </div>
                <div className="query_flex">
                    <div className="query_flex_item">
                        <div className="label">发放主题</div>
                        <div className="control">
                            <Input className="width224" maxLength="30" name="userName" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="query_flex_item">
                        <div className="label">发放时间</div>
                        <div className="control">
                            <Input className="width224" maxLength="30" name="userName1" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="query_flex_item">
                        <div className="label">发放状态</div>
                        <div className="control">
                            <Select className="width224" onChange={this.handleSelectChange}>
                                <Option value="1">Jack</Option>
                                <Option value="2">Lucy</Option>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="query_btn_wrap">
                    <Button type="primary" onClick={this.queryBtn}>立即查询</Button>
                </div>
                <Table
                    rowKey={(r, i) => (i)}
                    columns={this.state.thData}
                    dataSource={this.state.bodyData}
                    pagination={payPagination}
                    loading={this.state.showLoading}
                />

                <Modal
                    title="领卡链接"
                    centered
                    visible={this.state.QRurlVisible}
                    onOk={() => this.setState({ QRurlVisible: false })}
                    onCancel={() => this.setState({ QRurlVisible: false })}
                >
                    <Row type="flex" justify="space-around" align="middle" className="mb25">
                        <div className="qr_code_content">
                            <QRCode level="M" size={140} value={this.state.qrUrl || ''} />
                        </div>
                    </Row>
                    <Row type="flex" justify="center" align="middle">
                        <p style={{ margin: '0 8px',maxWidth: '500px' }}>{this.state.qrUrl}</p>
                        <a onClick={() => { this.copyToClipboard(this.state.qrUrl) }}>复制</a>
                    </Row>
                </Modal>
            </div>
        )
    }
}
