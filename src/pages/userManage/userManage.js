import React from 'react';
import { Row, Col, Divider, Input, Button, Icon, Table, Dropdown, Menu, Badge, Modal, message, Select, Radio } from 'antd';
import Utils from '../../utils/Utils';
import { UploadFile } from '../../components/Upload/index';
import { CommomRangePicker } from '../../components/CommonDatePicker/index.js';
import './userManage.less';

const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
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
                title: '领取状态', dataIndex: 'createTime8', key: 'createTime8', render: (text, item) => {
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
                        <Menu.Item>
                            {/* 已领福利卡后，离职后，不可修改 */}
                            <a href="">修改</a>
                        </Menu.Item>
                        <Menu.Item>
                            <a href="">离职</a>
                        </Menu.Item>
                        <Menu.Item>
                            <a onClick={()=>{this.setState({updataStaffVisible:true})}}>修改</a>
                        </Menu.Item>
                        <Menu.Item>
                            <a onClick={this.delectStaffData}>删除</a>
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
            search:{},
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
            showLoading: false, // 表格load

            addEmpVisible: false, // 添加员工对话框
            addEmpSearch: {}, // 添加员工对话框的输入值
            batchAddVisible: false, // 批量新增对话框
            batchUpdateVisible: false, // 批量修改对话框
            updataStaffVisible: false, // 修改员工对话框
            resultInfoVisible: false, // 上传失败对话框

            updataStaffSexRadioValue: 1, // 修改员工默认性别为男
            addStaffSexRadioValue: 1, // 添加员工默认性别为男
        }
    }
    componentDidMount() {
        this.setState({
            thData: Utils.resetTableTh(this.thData)
        })
    }

    // 修改员工
    updataStaffVisibleOk = ()=>{
        console.log("修改员工");
    }
    // 删除员工
    delectStaffData = ()=>{
        confirm({
            title: '确认要删除这条信息吗？',
            content: '删除该员工之后，在员工列表内将查找不到该员工信息',
            centered: true,
            onOk: () => {
                console.log("删除成功");
            },
            onCancel: () => { },
        });
    }

    // 确认添加员工
    addEmpOk = () => {
        console.log("添加员工");
    }
    // 确认批量新增
    batchAddVisibleOk = () => {

        console.log("批量新增");
        this.setState({resultInfoVisible:true});
        return;
        
        // 调用组件里面的方法
        let formData = this.refs.refBatchAddUploadFile.getUploadFile();
        if(formData == false){
            return false;
        }
        this.fileUrlPath = 'https://jsonplaceholder.typicode.com/posts/';
        request.post(this.fileUrlPath, formData).then(response => {
            message.success('上传成功');
        }, err => {
            this.setState({resultInfoVisible:true});
        }).catch((error) => {
            this.setState({resultInfoVisible:true});
        });
    }
    // 确认批量修改
    batchUpdateVisibleOk = () => {
        console.log("批量修改");

        if(!this.refs.refBatchUpdateUploadFile.isSelectedUploadFile()){
            return false;
        }
        confirm({
            title: '确认要导入这份员工信息吗？',
            content: '您导入的新的员工信息会覆盖原有信息，如果导入的员工以前不存在，将自动新增员工。',
            centered: true,
            onOk:() => {
                // 调用组件里面的方法
                let formData = this.refs.refBatchUpdateUploadFile.getUploadFile();
                formData.append("title", this.state.search.userName);
                this.fileUrlPath = 'https://jsonplaceholder.typicode.com/posts/';
                request.post(this.fileUrlPath, formData).then(response => {
                    message.success('上传并导入成功');
                }, err => {
                    message.error('上传失败');
                }).catch((error) => {
                    message.error('上传失败');
                });
            },
            onCancel:() => {},
        });
    }

    // 图片上传回调
    uploadImg = (info) => {
        console.log(info);
        // if (info.file.status === 'done') {

        // }
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
    // 领取状态
    handleSelectChange = (value) => {
        let search = this.state.search;
        search["selectvalue"] = value;
        this.setState({
            search: search
        });
    }
    // 员工状态
    handleStaffSelectChange = (value) => {
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
    queryBtn = () =>{
        console.log(this.state.search);
    }

    render() {
        const Option = Select.Option;
        const { addEmpSearch } = this.state;
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
                    <Button className="ml30" type="primary" icon="poweroff" onClick={() => { this.setState({ batchAddVisible: true }) }}>批量新增</Button>
                    <Button className="ml30" type="primary" icon="poweroff" onClick={()=>this.setState({batchUpdateVisible: true})}>批量修改</Button>
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
                            <Input className="width224" maxLength="30" name="userName1" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="query_flex_item">
                        <div className="label">部门</div>
                        <div className="control">
                            <Input className="width224" maxLength="30" name="userName2" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="query_flex_item">
                        <div className="label">职位</div>
                        <div className="control">
                            <Input className="width224" maxLength="30" name="userName3" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="query_flex_item">
                        <div className="label">职级</div>
                        <div className="control">
                            <Input className="width224" maxLength="30" name="userName4" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="query_flex_item">
                        <div className="label">身份证号码</div>
                        <div className="control">
                            <Input className="width224" maxLength="30" name="userName5" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="query_flex_item">
                        <div className="label">添加时间</div>
                        <div className="control">
                            <CommomRangePicker onChangeCallBack={this.onDateChange} />
                        </div>
                    </div>
                    <div className="query_flex_item">
                        <div className="label">领取状态</div>
                        <div className="control">
                            <Select className="width224" onChange={this.handleSelectChange}>
                                <Option value="1">Jack</Option>
                                <Option value="2">Lucy</Option>
                            </Select>
                        </div>
                    </div>
                    <div className="query_flex_item">
                        <div className="label">员工状态</div>
                        <div className="control">
                            <Select className="width224" onChange={this.handleStaffSelectChange}>
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
                    title="添加员工"
                    centered
                    width="700"
                    visible={this.state.addEmpVisible}
                    onOk={this.addEmpOk}
                    onCancel={() => this.setState({ addEmpVisible: false })}
                >
                    <Row type="flex" align="middle" className="mb25" gutter={16}>
                        <Col className="tr" span={3}><i className="required">*</i>姓名</Col>
                        <Col span={9}>
                            <Input className="width224" maxLength="30" name="userName" onChange={this.handleChange} />
                            <div className="error_info">{addEmpSearch.userNameErr}</div>
                        </Col>
                        <Col className="tr" span={3}><i className="required">*</i>手机号码</Col>
                        <Col span={9}>
                            <Input className="width224" maxLength="30" name="userName" onChange={this.handleChange} />
                            <div className="error_info">{addEmpSearch.userNameErr}</div>
                        </Col>
                    </Row>
                    <Row type="flex" align="middle" className="mb25" gutter={16}>
                        <Col className="tr" span={3}><i className="required">*</i>身份号码</Col>
                        <Col span={9}>
                            <Input className="width224" maxLength="30" name="userName" onChange={this.handleChange} />
                            <div className="error_info">{addEmpSearch.userNameErr}</div>
                        </Col>
                        <Col className="tr" span={3}>年龄</Col>
                        <Col span={9}>
                            <Input className="width224" maxLength="30" name="userName" onChange={this.handleChange} />
                            <div className="error_info">{addEmpSearch.userNameErr}</div>
                        </Col>
                    </Row>
                    <Row type="flex" align="middle" className="mb25" gutter={16}>
                        <Col className="tr" span={3}>性别</Col>
                        <Col span={9}>
                            <RadioGroup onChange={(e) => {this.setState({addStaffSexRadioValue: e.target.value});}} value={this.state.addStaffSexRadioValue}>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                        </Col>
                        <Col className="tr" span={3}>职级</Col>
                        <Col span={9}>
                            <Input className="width224" maxLength="30" name="userName" onChange={this.handleChange} />
                            <div className="error_info">{addEmpSearch.userNameErr}</div>
                        </Col>
                    </Row>
                    <Row type="flex" align="middle" className="mb25" gutter={16}>
                        <Col className="tr" span={3}>员工状态</Col>
                        <Col span={9}>
                            <Input className="width224" maxLength="30" name="userName" onChange={this.handleChange} />
                            <div className="error_info">{addEmpSearch.userNameErr}</div>
                        </Col>
                        <Col className="tr" span={3}>部门</Col>
                        <Col span={9}>
                            <Input className="width224" maxLength="30" name="userName" onChange={this.handleChange} />
                            <div className="error_info">{addEmpSearch.userNameErr}</div>
                        </Col>
                    </Row>
                    <Row type="flex" align="middle" className="mb25" gutter={16}>
                        <Col className="tr" span={3}>职位</Col>
                        <Col span={9}>在职</Col>
                    </Row>
                </Modal>
                <Modal
                    title="批量新增"
                    centered
                    visible={this.state.batchAddVisible}
                    onOk={this.batchAddVisibleOk}
                    onCancel={() => this.setState({ batchAddVisible: false })}
                >
                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={6}>
                            <Button icon="download">下载模板</Button>
                        </Col>
                        <Col span={1}>
                            <Divider type="vertical" style={{ height: '86px' }} />
                        </Col>
                        <Col span={6} >
                            <UploadFile ref="refBatchAddUploadFile" uploadKey="haha"></UploadFile>
                        </Col>
                    </Row>
                </Modal>
                <Modal
                    title="上传失败"
                    centered
                    visible={this.state.resultInfoVisible}
                    onOk={() => this.setState({ resultInfoVisible: false })}
                    onCancel={() => this.setState({ resultInfoVisible: false })}
                >
                    <div className="result_info_wrap">
                        <div className="left">结果:</div>
                        <div className="right">
                            <p>第 1 行 第 4 列 格式错误</p>
                            <p>第 1 行 第 4 列 格式错误</p>
                            <p>第 1 行 第 4 列 格式错误</p>
                            <p>第 1 行 第 4 列 格式错误</p>
                            <p>第 1 行 第 4 列 格式错误</p>
                            <p>第 1 行 第 4 列 格式错误</p>
                            <p>第 1 行 第 4 列 格式错误</p>
                            <p>第 1 行 第 4 列 格式错误</p>
                            <p>第 1 行 第 4 列 格式错误</p>
                            <p>第 1 行 第 4 列 格式错误</p>
                            <p>第 1 行 第 4 列 格式错误</p>
                            <p>第 1 行 第 4 列 格式错误</p>
                            <p>第 1 行 第 4 列 格式错误</p>
                            <p>第 1 行 第 4 列 格式错误</p>
                            <p>第 1 行 第 4 列 格式错误</p>
                            <p>第 1 行 第 4 列 格式错误</p>
                            <p>第 1 行 第 4 列 格式错误</p>
                            <p>第 1 行 第 4 列 格式错误</p>
                            <p>第 1 行 第 4 列 格式错误</p>
                            <p>第 1 行 第 4 列 格式错误</p>
                            <p>第 1 行 第 4 列 格式错误</p>
                            <p>第 1 行 第 4 列 格式错误</p>
                            <p>第 1 行 第 4 列 格式错误</p>
                            <p>第 1 行 第 4 列 格式错误</p>
                            <p>第 1 行 第 4 列 格式错误</p>
                            <p>第 1 行 第 4 列 格式错误</p>
                        </div>
                    </div>
                </Modal>
                <Modal
                    title="批量修改"
                    centered
                    visible={this.state.batchUpdateVisible}
                    onOk={this.batchUpdateVisibleOk}
                    onCancel={() => this.setState({ batchUpdateVisible: false })}
                >
                    <Row type="flex" justify="center" align="middle">
                        <Col span={6}>
                            <UploadFile ref="refBatchUpdateUploadFile" uploadKey="haha"></UploadFile>
                        </Col>
                    </Row>
                </Modal>
                <Modal
                    title="修改员工"
                    centered
                    width="700"
                    visible={this.state.updataStaffVisible}
                    onOk={this.updataStaffVisibleOk}
                    onCancel={() => this.setState({ updataStaffVisible: false })}
                >
                    <Row type="flex" align="middle" className="mb25" gutter={16}>
                        <Col className="tr" span={3}><i className="required">*</i>姓名</Col>
                        <Col span={9}>
                            <Input className="width224" maxLength="30" name="userName" onChange={this.handleChange} />
                            <div className="error_info">{addEmpSearch.userNameErr}</div>
                        </Col>
                        <Col className="tr" span={3}><i className="required">*</i>手机号码</Col>
                        <Col span={9}>
                            <Input className="width224" maxLength="30" name="userName" onChange={this.handleChange} />
                            <div className="error_info">{addEmpSearch.userNameErr}</div>
                        </Col>
                    </Row>
                    <Row type="flex" align="middle" className="mb25" gutter={16}>
                        <Col className="tr" span={3}><i className="required">*</i>身份号码</Col>
                        <Col span={9}>
                            <Input className="width224" maxLength="30" name="userName" onChange={this.handleChange} />
                            <div className="error_info">{addEmpSearch.userNameErr}</div>
                        </Col>
                        <Col className="tr" span={3}>年龄</Col>
                        <Col span={9}>
                            <Input className="width224" maxLength="30" name="userName" onChange={this.handleChange} />
                            <div className="error_info">{addEmpSearch.userNameErr}</div>
                        </Col>
                    </Row>
                    <Row type="flex" align="middle" className="mb25" gutter={16}>
                        <Col className="tr" span={3}>性别</Col>
                        <Col span={9}>
                            <RadioGroup onChange={(e) => {this.setState({updataStaffSexRadioValue: e.target.value});}} value={this.state.updataStaffSexRadioValue}>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                        </Col>
                        <Col className="tr" span={3}>职级</Col>
                        <Col span={9}>
                            <Input className="width224" maxLength="30" name="userName" onChange={this.handleChange} />
                            <div className="error_info">{addEmpSearch.userNameErr}</div>
                        </Col>
                    </Row>
                    <Row type="flex" align="middle" className="mb25" gutter={16}>
                        <Col className="tr" span={3}>员工状态</Col>
                        <Col span={9}>
                            <Input className="width224" maxLength="30" name="userName" onChange={this.handleChange} />
                            <div className="error_info">{addEmpSearch.userNameErr}</div>
                        </Col>
                        <Col className="tr" span={3}>员工ID</Col>
                        <Col span={9}>412347234637264736</Col>
                    </Row>
                    <Row type="flex" align="middle" className="mb25" gutter={16}>
                        <Col className="tr" span={3}>部门</Col>
                        <Col span={9}>
                            <Input className="width224" maxLength="30" name="userName" onChange={this.handleChange} />
                            <div className="error_info">{addEmpSearch.userNameErr}</div>
                        </Col>
                        <Col className="tr" span={3}>职位</Col>
                        <Col span={9}>
                            离职（跟随列表里面的状态）
                        </Col>
                    </Row>
                </Modal>
            </div>
        )
    }
}
