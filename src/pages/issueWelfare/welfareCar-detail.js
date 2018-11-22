import React from 'react';
import { Row, Col, Divider, Input, Button, Icon, Table, Dropdown, Menu, Badge, Modal, message, Select } from 'antd';
import Utils from '../../utils/Utils';
import { UploadFile } from '../../components/Upload/index';
import { CommomRangePicker } from '../../components/CommonDatePicker/index.js';
import './welfareCar-detail.less';

export default class WelfareCarDetail extends React.Component {
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
            { title: '订单流水', dataIndex: 'createTime1', key: 'createTime1' },
            { title: '交易类型', dataIndex: 'createTime2', key: 'createTime2' },
            { title: '交易时间', dataIndex: 'createTime3', key: 'createTime3' },
            {
                title: '交易状态', dataIndex: 'createTime4', key: 'createTime4', render: (text, item) => {
                    return (
                        <Badge status="error" text="失败" />
                    )
                }
            },
            { title: '交易金额', dataIndex: 'createTime5', key: "createTime5" },
            { title: '支付金额', dataIndex: 'createTime6', key: 'createTime6' },
            { title: '优惠金额', dataIndex: 'createTime7', key: 'createTime7' },
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

    // 交易类型
    traderTypeSelectChange = (value) => {
        let search = this.state.search;
        search["selectvalue"] = value;
        this.setState({
            search: search
        });
    }
    // 交易状态
    traderStateSelectChange = (value) => {
        let search = this.state.search;
        search["selectvalue1"] = value;
        this.setState({
            search: search
        });
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
                <Row type="flex" align="middle" className="mb25" gutter={16}>
                    <Col className="tr" span={2}>卡号:</Col>
                    <Col span={2}>2121232323232</Col>
                    <Col className="tr" span={2}>姓名:</Col>
                    <Col span={2}>发生蛋黄</Col>
                </Row>
                <div className="query_flex">
                    <div className="query_flex_item">
                        <div className="label">订单流水号</div>
                        <div className="control">
                            <Input className="width224" maxLength="30" name="userName" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="query_flex_item">
                        <div className="label">交易时间</div>
                        <div className="control">
                            <CommomRangePicker onChangeCallBack={this.onDateChange}/>
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
