import React from 'react';
import { Row, Col, Divider, Input, Button, Icon, Table, Dropdown, Menu, Badge, Modal, message, Select } from 'antd';
import Utils from '../../utils/Utils';
import { UploadFile } from '../../components/Upload/index';
import './welfareCar-list.less';

export default class WelfareCarList extends React.Component {
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
            { title: '卡号', dataIndex: 'createTime1', key: 'createTime1' },
            { title: '姓名', dataIndex: 'createTime2', key: 'createTime2' },
            { title: '手机号', dataIndex: 'createTime3', key: 'createTime3' },
            { title: '部门', dataIndex: 'createTime4', key: "createTime4" },
            { title: '累计发放福利', dataIndex: 'createTime5', key: 'createTime5' },
            { title: '累计充值', dataIndex: 'createTime6', key: 'createTime6' },
            { title: '累计消费', dataIndex: 'createTime7', key: 'createTime7' },
            { title: '账户余额', dataIndex: 'createTime8', key: 'createTime8' },
            { title: '领卡时间', dataIndex: 'createTime9', key: 'createTime9' },
            {
                title: '卡状态', dataIndex: 'createTime10', key: 'createTime10', render: (text, item) => {
                    return (
                        <Badge status="error" text="冻结" />
                    )
                }
            },
            {
                title: '操作', key: 'operation', width: 104, render: (text, item) => {
                    const menu = <Menu>
                        <Menu.Item>
                            <a href="">冻结</a>
                        </Menu.Item>
                        <Menu.Item>
                            <a href="">恢复正常</a>
                        </Menu.Item>
                        <Menu.Item>
                            <a href="#/welfareCar-detail">详情</a>
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
                    'createTime9': '1234',
                    'createTime10': '1234',
                }],
                totalRecords: 0, // 总记录数
                showLoading: false, // 表格是否显示load

            }
    }
    componentDidMount() {
        this.setState({
            thData: Utils.resetTableTh(this.thData)
        })
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
            <div>
                <div className="query_flex">
                    <div className="query_flex_item">
                        <div className="label">卡号</div>
                        <div className="control">
                            <Input className="width224" maxLength="30" name="userName" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="query_flex_item">
                        <div className="label">手机号</div>
                        <div className="control">
                            <Input className="width224" maxLength="30" name="userName1" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="query_flex_item">
                        <div className="label">姓名</div>
                        <div className="control">
                            <Input className="width224" maxLength="30" name="userName2" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="query_flex_item">
                        <div className="label">领取时间</div>
                        <div className="control">
                            <Input className="width224" maxLength="30" name="userName3" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="query_flex_item">
                        <div className="label">卡状态</div>
                        <div className="control">
                            <Select className="width224" onChange={this.handleSelectChange}>
                                <Option value="1">Jack</Option>
                                <Option value="2">Lucy</Option>
                            </Select>
                        </div>
                    </div>
                    <div className="query_flex_item">
                        <div className="label">部门</div>
                        <div className="control">
                            <Input className="width224" maxLength="30" name="userName4" onChange={this.handleChange} />
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

            </div>
        )
    }
}
