import React from 'react';
import { Row, Col, Divider, Input, Button, Icon, Table, Dropdown, Menu, Badge, Modal, message, Select } from 'antd';
import { CommomRangePicker } from '../../components/CommonDatePicker/index.js';
import Utils from '../../utils/Utils';
import './index.less';

const confirm = Modal.confirm;
export default class Index extends React.Component {
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
            { title: '交易流水号', dataIndex: 'createTime1', key: 'createTime1' },
            { title: '交易时间', dataIndex: 'createTime2', key: 'createTime2' },
            { title: '交易类型', dataIndex: 'createTime3', key: 'createTime3' },
            { title: '交易金额', dataIndex: 'createTime4', key: "createTime4" },
            { title: '实付金额', dataIndex: 'createTime5', key: 'createTime5' },
            { title: '优惠金额', dataIndex: 'createTime6', key: 'createTime6' },
            { title: '账户余额', dataIndex: 'createTime7', key: 'createTime7' },
            {
                title: '交易状态', dataIndex: 'createTime8', key: 'createTime8', render: (text, item) => {
                    return (
                        <Badge status="warning" text="失败" />
                    )
                }
            },
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

            }
    }
    componentDidMount() {
        this.setState({
            thData: Utils.resetTableTh(this.thData)
        })

        // Modal.error({
        //     title: '你还未配置卡面',
        //     content: '福利发放需先配置卡面',
        //     centered: true,
        //     onOk: () => {
        //         location.href = "#/cardConfig";
        //     },
        // });
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

    // 交易时间
    onDateChange = (value) => {
        let search = this.state.search;
        search["startTime"] = value[0];
        search["endTime"] = value[1];
        this.setState({
            search: search
        });
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
                    <Button className="ml30" type="primary" icon="poweroff" onClick={() => location.href = "#/pay"}>立即充值</Button>
                    <Button className="ml30" type="primary" icon="poweroff" onClick={() => location.href = "#/issueWelfare-list"}>发放福利</Button>
                    <Divider></Divider>
                </div>
                <div className="query_flex">
                    <div className="query_flex_item">
                        <div className="label">交易流水</div>
                        <div className="control">
                            <Input className="width224" maxLength="30" name="userName" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="query_flex_item">
                        <div className="label">交易时间</div>
                        <div className="control">
                            <CommomRangePicker className="width224" onChangeCallBack={this.onDateChange}/>
                        </div>
                    </div>
                    <div className="query_flex_item">
                        <div className="label">交易类型</div>
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

            </div>
        )
    }
}
