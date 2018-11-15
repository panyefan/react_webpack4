import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Regexp } from '../../utils/Regexp'
import { Row, Col, Divider, Input, Button, Checkbox,Steps, Icon } from 'antd';

import './CompanyAddEdit.styl';

export default class CompanyAddEdit extends React.Component {
    static propTypes = {
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);
        this.formDataObj = {};
        this.state = {
            search: {
                agreement: true
            },
            error_info: '错误信息',
            verifiCodeBtnState: false, // 验证码按钮失效状态
            verficationName: "发送验证码",
        };
    }

    componentDidMount() {

    }


    // 协议勾选框
    agreementCheckbox=(e)=>{
        let search = this.state.search;
        search.agreement = e.target.checked;
        search.agreementErr = '';
        this.setState({search});
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
                    search.userNameErr = "输入企业名称";
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

    gotologinCkick = () => {
        // this.props.onLogin ? this.props.onLogin() : null;
    }

    render() {
        const { className, ...others } = this.props;
        const Step = Steps.Step;
        const { search } = this.state;
        const cls=classNames({
            [className]:className
        });

        return (
            <div className={cls} {...others}>
                <div className="cad_module_wrap">
                    <Steps style={{padding: '0 100px'}}>
                        <Step status="finish" title="公司信息" icon={<Icon type="solution" />} />
                        <Step status="finish" title="证件上传" icon={<Icon type="solution" />} />
                        <Step status="wait" title="企业银行账户" icon={<Icon type="solution" />} />
                        <Step status="wait" title="开票信息" icon={<Icon type="credit-card" />} />
                    </Steps>
                    {/* <div className="cad_input_wrap">
                        <Row>
                            <div>公司信息</div>
                            <Divider style={{margin:'10px 0 24px 0'}}></Divider>
                        </Row>
                        <Row className="mb25" gutter={16}>
                            <Col className="tr" span={3}>统一社会信用代码</Col>
                            <Col span={12}>
                                <Input className="width350" placeholder="输入统一社会信用代码" maxLength="30" name="userName" onChange={this.handleChange}/>
                                <div className="error_info">{search.userNameErr}</div>
                            </Col>
                        </Row>
                        <Row className="mb25" gutter={16}>
                            <Col className="tr" span={3}>行业类别</Col>
                            <Col span={12}>
                                <Input className="width350" placeholder="输入行业类别" maxLength="30" name="userName" onChange={this.handleChange}/>
                                <div className="error_info">{search.userNameErr}</div>
                            </Col>
                        </Row>
                        <Row className="mb25" gutter={16}>
                            <Col className="tr" span={3}>客服电话</Col>
                            <Col span={12}>
                                <Input className="width350" placeholder="输入客服电话" maxLength="30" name="userName" onChange={this.handleChange}/>
                                <div className="error_info">{search.userNameErr}</div>
                            </Col>
                        </Row>
                        <Row className="mb25" gutter={16}>
                            <Col className="tr" span={3}>办公地址</Col>
                            <Col span={12}>
                                <Input className="width350" placeholder="输入办公地址" maxLength="30" name="userName" onChange={this.handleChange}/>
                                <div className="error_info">{search.userNameErr}</div>
                            </Col>
                        </Row>
                        <Row className="mb25" gutter={16}>
                            <Col className="tr" span={3}>详细地址</Col>
                            <Col span={12}>
                                <Input className="width350" placeholder="输入详细地址" maxLength="30" name="userName" onChange={this.handleChange}/>
                                <div className="error_info">{search.userNameErr}</div>
                            </Col>
                        </Row>
                        <Row className="mb25" gutter={16}>
                            <Col className="tr" span={3}>公司邮箱</Col>
                            <Col span={12}>
                                <Input className="width350" placeholder="输入公司邮箱" maxLength="30" name="userName" onChange={this.handleChange}/>
                                <div className="error_info">{search.userNameErr}</div>
                            </Col>
                        </Row>
                        <Row className="mb25" gutter={16}>
                            <Col className="tr" span={3}>营业执照</Col>
                            <Col span={12}>
                                <div className="error_info">{search.userNameErr}</div>
                            </Col>
                        </Row>
                        <div className="mb25 hc">
                            <Button type="primary">下一步</Button>
                        </div>
                    </div> */}
                    {/* <div className="cad_input_wrap">
                        <Row>
                            <div>证件上传</div>
                            <Divider style={{margin:'10px 0 24px 0'}}></Divider>
                        </Row>
                        <Row className="mb25" gutter={16}>
                            <Col className="tr" span={3}>法人姓名</Col>
                            <Col span={12}>
                                <Input className="width350" placeholder="输入法人姓名" maxLength="30" name="userName" onChange={this.handleChange}/>
                                <div className="error_info">{search.userNameErr}</div>
                            </Col>
                        </Row>
                        <Row className="mb25" gutter={16}>
                            <Col className="tr" span={3}>法人身份证号</Col>
                            <Col span={12}>
                                <Input className="width350" placeholder="输入法人身份证号" maxLength="30" name="userName" onChange={this.handleChange}/>
                                <div className="error_info">{search.userNameErr}</div>
                            </Col>
                        </Row>
                        <Row className="mb25" gutter={16}>
                            <Col className="tr" span={3}>法人身份证照片</Col>
                            <Col span={12}>
                                <div className="error_info">{search.userNameErr}</div>
                            </Col>
                        </Row>
                        <Row className="mb25" gutter={16}>
                            <Col span={2} offset={10}>
                                <Button >上一步</Button>
                            </Col>
                            <Col span={2}>
                                <Button type="primary">下一步</Button>
                            </Col>
                        </Row>
                    </div> */}
                    {/* <div className="cad_input_wrap">
                        <Row>
                            <div>企业银行账户</div>
                            <Divider style={{margin:'10px 0 24px 0'}}></Divider>
                        </Row>
                        <Row className="mb25" gutter={16}>
                            <Col className="tr" span={3}>开户名称</Col>
                            <Col span={12}>
                                <Input className="width350" placeholder="输入开户名称" maxLength="30" name="userName" onChange={this.handleChange}/>
                                <div className="error_info">{search.userNameErr}</div>
                            </Col>
                        </Row>
                        <Row className="mb25" gutter={16}>
                            <Col className="tr" span={3}>开户账号</Col>
                            <Col span={12}>
                                <Input className="width350" placeholder="输入开户账号" maxLength="30" name="userName" onChange={this.handleChange}/>
                                <div className="error_info">{search.userNameErr}</div>
                            </Col>
                        </Row>
                        <Row className="mb25" gutter={16}>
                            <Col className="tr" span={3}>开户银行</Col>
                            <Col span={12}>
                                <Input className="width350" placeholder="输入开户银行" maxLength="30" name="userName" onChange={this.handleChange}/>
                                <div className="error_info">{search.userNameErr}</div>
                            </Col>
                        </Row>
                        <Row className="mb25" gutter={16}>
                            <Col className="tr" span={3}>开户许可证</Col>
                            <Col span={12}>
                                <div className="error_info">{search.userNameErr}</div>
                            </Col>
                        </Row>
                        <Row className="mb25" gutter={16}>
                            <Col span={2} offset={10}>
                                <Button >上一步</Button>
                            </Col>
                            <Col span={2}>
                                <Button type="primary">下一步</Button>
                            </Col>
                        </Row>
                    </div> */}
                    <div className="cad_input_wrap">
                        <Row>
                            <div>开票信息</div>
                            <Divider style={{margin:'10px 0 24px 0'}}></Divider>
                        </Row>
                        <Row className="mb25" gutter={16}>
                            <Col className="tr" span={3}>发票抬头</Col>
                            <Col span={12}>
                                <Input className="width350" placeholder="输入发票抬头" maxLength="30" name="userName" onChange={this.handleChange}/>
                                <div className="error_info">{search.userNameErr}</div>
                            </Col>
                        </Row>
                        <Row className="mb25" gutter={16}>
                            <Col className="tr" span={3}>信用代码</Col>
                            <Col span={12}>
                                <Input className="width350" placeholder="输入信用代码" maxLength="30" name="userName" onChange={this.handleChange}/>
                                <div className="error_info">{search.userNameErr}</div>
                            </Col>
                        </Row>
                        <Row className="mb25" gutter={16}>
                            <Col className="tr" span={3}>注册地址</Col>
                            <Col span={12}>
                                <Input className="width350" placeholder="输入注册地址" maxLength="30" name="userName" onChange={this.handleChange}/>
                                <div className="error_info">{search.userNameErr}</div>
                            </Col>
                        </Row>
                        <Row className="mb25" gutter={16}>
                            <Col className="tr" span={3}>公司电话</Col>
                            <Col span={12}>
                                <Input className="width350" placeholder="输入公司电话" maxLength="30" name="userName" onChange={this.handleChange}/>
                                <div className="error_info">{search.userNameErr}</div>
                            </Col>
                        </Row>
                        <Row className="mb25" gutter={16}>
                            <Col className="tr" span={3}>开户银行</Col>
                            <Col span={12}>
                                <Input className="width350" placeholder="输入开户银行" maxLength="30" name="userName" onChange={this.handleChange}/>
                                <div className="error_info">{search.userNameErr}</div>
                            </Col>
                        </Row>
                        <Row className="mb25" gutter={16}>
                            <Col className="tr" span={3}>开户账号</Col>
                            <Col span={12}>
                                <Input className="width350" placeholder="输入开户账号" maxLength="30" name="userName" onChange={this.handleChange}/>
                                <div className="error_info">{search.userNameErr}</div>
                            </Col>
                        </Row>
                        <Row className="mb25" gutter={16}>
                            <Col span={2} offset={10}>
                                <Button >上一步</Button>
                            </Col>
                            <Col span={2}>
                                <Button type="primary">提交</Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}
