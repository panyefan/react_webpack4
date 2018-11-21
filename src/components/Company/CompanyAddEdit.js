import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Regexp } from '../../utils/Regexp'
import { CityData } from '../../utils/CityData'
import { IndustryTypeData } from '../../utils/IndustryTypeData'
import { UploadPic } from '../../components/Upload/index';
import Utils from '../../utils/Utils';
import { Row, Col, Divider, Input, Button, Checkbox, Steps, Icon, Cascader } from 'antd';

import './CompanyAddEdit.less';

/**
 * 添加或者编辑公司信息组件
 */
export default class CompanyAddEdit extends React.Component {
    static propTypes = {
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);
        this.formDataObj = {};
        this.state = {
            search: {},
            toggerShowArr: [true, false, false, false], // 步骤显示控制,分别对应 公司信息、证件上传、企业银行账户、开票信息
            toggerStepArr: [true, false, false, false], // 步骤显示控制,分别对应 公司信息、证件上传、企业银行账户、开票信息
        };
    }

    componentDidMount() {
        this.onGotoCLick(this.props.stepNum);
    }

    componentWillReceiveProps(nextProps) {
        this.onGotoCLick(nextProps.stepNum);
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

        this.check(name);
    }

    check = (name) => {
        let search = this.state.search;
        let handle = {
            "userName": () => {
                if (!search.userName) {
                    search.userNameErr = "请输入企业名称";
                    this.setState({ search });
                    return false;
                }
                search.userNameErr = "";
                this.setState({ search });
                return true;
            },
            "phone": () => {
                if (!search.phone) {
                    search.phoneErr = "请输入手机号码";
                    this.setState({ search });
                    return false;
                }
                if (!Regexp.phoneReg.test(search.phone)) {
                    search.phoneErr = "请输入正确的手机号";
                    this.setState({ search });
                    return false;
                }
                search.phoneErr = "";
                this.setState({ search });
                return true;
            },
            "verifCode": () => {
                if (!search.verifCode) {
                    search.verifCodeErr = "请输入验证码";
                    this.setState({ search });
                    return false;
                }
                if (!Regexp.verificationCodeReg.test(search.verifCode)) {
                    search.verifCodeErr = "请输入数字验证码";
                    this.setState({ search });
                    return false;
                }
                search.verifCodeErr = "";
                this.setState({ search });
                return true;
            },
            "password": () => {
                if (!search.password) {
                    search.passwordErr = "请输入密码";
                    this.setState({ search });
                    return false;
                }
                search.passwordErr = "";
                this.setState({ search });
                return true;
            },
            "confirmPassword": () => {
                if (!search.confirmPassword) {
                    search.confirmPasswordErr = "请输入确认密码";
                    this.setState({ search });
                    return false;
                }
                if (search.confirmPassword !== search.password) {
                    search.confirmPasswordErr = "确认密码与密码不一致";
                    this.setState({ search });
                    return false;
                }
                search.confirmPasswordErr = "";
                this.setState({ search });
                return true;
            },
            "agreement": () => {
                if (!search.agreement) {
                    search.agreementErr = "请勾选《福利卡平台服务协议》";
                    this.setState({ search });
                    return false;
                }
                search.agreementErr = "";
                this.setState({ search });
                return true;
            },
        }

        return global.formCheck(name, handle);
    }

    // 立即注册
    saveFormData = () => {
        if (!this.check()) {
            return;
        }

        console.log("立即注册");
    }

    // 图片上传回调
    uploadImg = (info) => {
        console.log(info);
        // if (info.file.status === 'done') {

        // }
    }

    // 省市区三级联动
    onCityChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
    }

    onGotoCLick = (num) => {
        let toggerShowArr = this.state.toggerShowArr;
        let toggerStepArr = this.state.toggerStepArr;
        toggerShowArr = Utils.setArrEleFalse(toggerShowArr);
        toggerStepArr = Utils.setArrEleFalse(toggerStepArr);
        let handle = {
            '0': () => {
                toggerShowArr[0] = true;
                toggerStepArr[0] = true;
            },
            '1': () => {
                toggerShowArr[1] = true;
                toggerStepArr[0] = true;
                toggerStepArr[1] = true;
            },
            '2': () => {
                toggerShowArr[2] = true;
                toggerStepArr[0] = true;
                toggerStepArr[1] = true;
                toggerStepArr[2] = true;
            },
            '3': () => {
                toggerShowArr[3] = true;
                toggerStepArr[0] = true;
                toggerStepArr[1] = true;
                toggerStepArr[2] = true;
                toggerStepArr[3] = true;
            },
        }
        handle[num]();
        this.setState({ toggerShowArr, toggerStepArr });
        // 释放掉闭包内存。如果你经常使用闭包后忘记置为nul，建议你少用闭包为好
        handle[num] = null;
    }

    // 提交
    submitDataBtn = () => {
        console.log('提交');

        this.props.onSubmit ? this.props.onSubmit() : null;
    }

    render() {
        const { className, stepNum, onSubmit, ...others } = this.props;
        const Step = Steps.Step;
        const { search, toggerShowArr, toggerStepArr } = this.state;
        const cls = classNames({
            [className]: className
        });

        return (
            <div className={cls} {...others}>
                <div className="cad_module_wrap">
                    <Steps style={{ padding: '0 100px' }}>
                        <Step status="finish" title="公司信息" icon={<Icon type="solution" />} />
                        <Step status={toggerStepArr[1] ? 'finish' : 'wait'} title="证件上传" icon={<Icon type="solution" />} />
                        <Step status={toggerStepArr[2] ? 'finish' : 'wait'} title="企业银行账户" icon={<Icon type="solution" />} />
                        <Step status={toggerStepArr[3] ? 'finish' : 'wait'} title="开票信息" icon={<Icon type="credit-card" />} />
                    </Steps>
                    {
                        toggerShowArr[0] &&
                        <div className="cad_input_wrap">
                            <Row>
                                <div>公司信息</div>
                                <Divider style={{ margin: '10px 0 24px 0' }}></Divider>
                            </Row>
                            <Row type="flex" align="middle" className="mb25" gutter={16}>
                                <Col className="tr" span={3}>企业名称</Col>
                                <Col span={12}>
                                    <Input className="width350" placeholder="公司名称必须与营业执照上一致" maxLength="30" name="userName" onChange={this.handleChange} />
                                    <div className="error_info">{search.userNameErr}</div>
                                </Col>
                            </Row>
                            <Row type="flex" align="middle" className="mb25" gutter={16}>
                                <Col className="tr" span={3}>统一社会信用代码</Col>
                                <Col span={12}>
                                    <Input className="width350" placeholder="请输入统一社会信用代码" maxLength="30" name="userName" onChange={this.handleChange} />
                                    <div className="error_info">{search.userNameErr}</div>
                                </Col>
                            </Row>
                            <Row type="flex" align="middle" className="mb25" gutter={16}>
                                <Col className="tr" span={3}>行业类别</Col>
                                <Col span={12}>
                                    <Cascader className="width350" placeholder="选择行业类别" options={IndustryTypeData} expandTrigger="hover" onChange={this.onCityChange} />
                                    <div className="error_info">{search.userNameErr}</div>
                                </Col>
                            </Row>
                            <Row type="flex" align="middle" className="mb25" gutter={16}>
                                <Col className="tr" span={3}>客服电话</Col>
                                <Col span={12}>
                                    <Input className="width350" placeholder="请输入客服电话" maxLength="30" name="userName" onChange={this.handleChange} />
                                    <div className="error_info">{search.userNameErr}</div>
                                </Col>
                            </Row>
                            <Row type="flex" align="middle" className="mb25" gutter={16}>
                                <Col className="tr" span={3}>办公地址</Col>
                                <Col span={12}>
                                    <Cascader className="width350" placeholder="选择办公地址" options={CityData} expandTrigger="hover" onChange={this.onCityChange} />
                                    <div className="error_info">{search.userNameErr}</div>
                                </Col>
                            </Row>
                            <Row type="flex" align="middle" className="mb25" gutter={16}>
                                <Col className="tr" span={3}>详细地址</Col>
                                <Col span={12}>
                                    <Input className="width350" placeholder="请输入详细地址" maxLength="30" name="userName" onChange={this.handleChange} />
                                    <div className="error_info">{search.userNameErr}</div>
                                </Col>
                            </Row>
                            <Row type="flex" align="middle" className="mb25" gutter={16}>
                                <Col className="tr" span={3}>公司邮箱</Col>
                                <Col span={12}>
                                    <Input className="width350" placeholder="请输入公司邮箱" maxLength="30" name="userName" onChange={this.handleChange} />
                                    <div className="error_info">{search.userNameErr}</div>
                                </Col>
                            </Row>
                            <div className="mb25 xc">
                                <Button type="primary" onClick={() => { this.onGotoCLick('1') }}>下一步</Button>
                            </div>
                        </div>
                    }
                    {
                        toggerShowArr[1] &&
                        <div className="cad_input_wrap">
                            <Row>
                                <div>证件上传</div>
                                <Divider style={{ margin: '10px 0 24px 0' }}></Divider>
                            </Row>
                            <Row type="flex" align="middle" className="mb25" gutter={16}>
                                <Col className="tr" span={3}>法人姓名</Col>
                                <Col span={12}>
                                    <Input className="width350" placeholder="请输入法人姓名" maxLength="30" name="userName" onChange={this.handleChange} />
                                    <div className="error_info">{search.userNameErr}</div>
                                </Col>
                            </Row>
                            <Row type="flex" align="middle" className="mb25" gutter={16}>
                                <Col className="tr" span={3}>法人身份证号</Col>
                                <Col span={12}>
                                    <Input className="width350" placeholder="请输入法人身份证号" maxLength="30" name="userName" onChange={this.handleChange} />
                                    <div className="error_info">{search.userNameErr}</div>
                                </Col>
                            </Row>
                            <Row type="flex" align="middle" className="mb25" gutter={16}>
                                <Col className="tr" span={3}>法人身份证照片</Col>
                                <Col span={3}>
                                    <UploadPic
                                        title="身份证正面"
                                        uploadKey="xixixi"
                                        uploadURL="//jsonplaceholder.typicode.com/posts/"
                                        picURL=""
                                        onChange={this.uploadImg}
                                    ></UploadPic>
                                    <div className="error_info">{search.userNameErr}</div>
                                </Col>
                                <Col span={3}>
                                    <UploadPic
                                        title="身份证反面"
                                        uploadKey="xixixi"
                                        uploadURL="//jsonplaceholder.typicode.com/posts/"
                                        picURL=""
                                        onChange={this.uploadImg}
                                    ></UploadPic>
                                    <div className="error_info">{search.userNameErr}</div>
                                </Col>
                            </Row>
                            <Row type="flex" align="middle" className="mb25" gutter={16}>
                                <Col className="tr" span={3}>营业执照</Col>
                                <Col span={12}>
                                    <UploadPic
                                        title="营业执照"
                                        uploadKey="xixixi"
                                        uploadURL="//jsonplaceholder.typicode.com/posts/"
                                        picURL=""
                                        onChange={this.uploadImg}
                                    ></UploadPic>
                                    <div className="error_info">{search.userNameErr}</div>
                                </Col>
                            </Row>
                            <Row type="flex" align="middle" className="mb25" gutter={16}>
                                <Col span={2} offset={10}>
                                    <Button onClick={() => { this.onGotoCLick('0') }}>上一步</Button>
                                </Col>
                                <Col span={2}>
                                    <Button type="primary" onClick={() => { this.onGotoCLick('2') }}>下一步</Button>
                                </Col>
                            </Row>
                        </div>
                    }
                    {
                        toggerShowArr[2] &&
                        <div className="cad_input_wrap">
                            <Row>
                                <div>企业银行账户</div>
                                <Divider style={{ margin: '10px 0 24px 0' }}></Divider>
                            </Row>
                            <Row type="flex" align="middle" className="mb25" gutter={16}>
                                <Col className="tr" span={3}>开户名称</Col>
                                <Col span={12}>
                                    <Input className="width350" placeholder="请输入纳税的开户名称" maxLength="30" name="userName" onChange={this.handleChange} />
                                    <div className="error_info">{search.userNameErr}</div>
                                </Col>
                            </Row>
                            <Row type="flex" align="middle" className="mb25" gutter={16}>
                                <Col className="tr" span={3}>开户账号</Col>
                                <Col span={12}>
                                    <Input className="width350" placeholder="请输入纳税的开户账号" maxLength="30" name="userName" onChange={this.handleChange} />
                                    <div className="error_info">{search.userNameErr}</div>
                                </Col>
                            </Row>
                            <Row type="flex" align="middle" className="mb25" gutter={16}>
                                <Col className="tr" span={3}>开户银行</Col>
                                <Col span={12}>
                                    <Input className="width350" placeholder="请输入纳税的开户银行名称" maxLength="30" name="userName" onChange={this.handleChange} />
                                    <div className="error_info">{search.userNameErr}</div>
                                </Col>
                            </Row>
                            <Row type="flex" align="middle" className="mb25" gutter={16}>
                                <Col className="tr" span={3}>开户许可证</Col>
                                <Col span={12}>
                                    <UploadPic
                                        title="开户许可证"
                                        uploadKey="xixixi"
                                        uploadURL="//jsonplaceholder.typicode.com/posts/"
                                        picURL=""
                                        onChange={this.uploadImg}
                                    ></UploadPic>
                                    <div className="error_info">{search.userNameErr}</div>
                                </Col>
                            </Row>
                            <Row type="flex" align="middle" className="mb25" gutter={16}>
                                <Col span={2} offset={10}>
                                    <Button onClick={() => { this.onGotoCLick('1') }}>上一步</Button>
                                </Col>
                                <Col span={2}>
                                    <Button type="primary" onClick={() => { this.onGotoCLick('3') }}>下一步</Button>
                                </Col>
                            </Row>
                        </div>
                    }
                    {
                        toggerShowArr[3] &&
                        <div className="cad_input_wrap">
                            <Row>
                                <div>开票信息</div>
                                <Divider style={{ margin: '10px 0 24px 0' }}></Divider>
                            </Row>
                            <Row type="flex" align="middle" className="mb25" gutter={16}>
                                <Col className="tr" span={3}>发票抬头</Col>
                                <Col span={12}>
                                    <Input className="width350" placeholder="请输入营业执照上的法定名称" maxLength="30" name="userName" onChange={this.handleChange} />
                                    <div className="error_info">{search.userNameErr}</div>
                                </Col>
                            </Row>
                            <Row type="flex" align="middle" className="mb25" gutter={16}>
                                <Col className="tr" span={3}>信用代码</Col>
                                <Col span={12}>
                                    <Input className="width350" placeholder="请输入统一的社会信用代码" maxLength="30" name="userName" onChange={this.handleChange} />
                                    <div className="error_info">{search.userNameErr}</div>
                                </Col>
                            </Row>
                            <Row type="flex" align="middle" className="mb25" gutter={16}>
                                <Col className="tr" span={3}>注册地址</Col>
                                <Col span={12}>
                                    <Input className="width350" placeholder="请输入公司注册地址" maxLength="30" name="userName" onChange={this.handleChange} />
                                    <div className="error_info">{search.userNameErr}</div>
                                </Col>
                            </Row>
                            <Row type="flex" align="middle" className="mb25" gutter={16}>
                                <Col className="tr" span={3}>公司电话</Col>
                                <Col span={12}>
                                    <Input className="width350" placeholder="请输入公司电话，区号-总机" maxLength="30" name="userName" onChange={this.handleChange} />
                                    <div className="error_info">{search.userNameErr}</div>
                                </Col>
                            </Row>
                            <Row type="flex" align="middle" className="mb25" gutter={16}>
                                <Col className="tr" span={3}>开户银行</Col>
                                <Col span={12}>
                                    <Input className="width350" placeholder="请输入开户银行名称" maxLength="30" name="userName" onChange={this.handleChange} />
                                    <div className="error_info">{search.userNameErr}</div>
                                </Col>
                            </Row>
                            <Row type="flex" align="middle" className="mb25" gutter={16}>
                                <Col className="tr" span={3}>开户账号</Col>
                                <Col span={12}>
                                    <Input className="width350" placeholder="请输入开户银行账号" maxLength="30" name="userName" onChange={this.handleChange} />
                                    <div className="error_info">{search.userNameErr}</div>
                                </Col>
                            </Row>
                            <Row type="flex" align="middle" className="mb25" gutter={16}>
                                <Col span={2} offset={10}>
                                    <Button onClick={() => { this.onGotoCLick('2') }}>上一步</Button>
                                </Col>
                                <Col span={2}>
                                    <Button type="primary" onClick={this.submitDataBtn}>提交</Button>
                                </Col>
                            </Row>
                        </div>
                    }
                </div>
            </div>
        );
    }
}
