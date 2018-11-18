import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Regexp } from '../../utils/Regexp'
import { Row, Col } from 'antd';
import { Icon, Input, Button, Checkbox } from 'antd';

import './Register.styl';

/**
 * 注册组件
 */
export default class Register extends React.Component {
    static propTypes = {
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);
        this.formDataObj = {};
        this.seconds = 5; // 倒计时60秒
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

    // 发送检验码
    sendVerificationCode = () => {
        if (!this.check("phone")) { return; };
        this.setState({
            verifiCodeBtnState: true,
        });
        let seconds = this.seconds;
        let clock = setInterval(() => {
            seconds--;
            this.setState({
                verficationName: `${seconds}秒后获取`
            })
            if (seconds == 0) {
                window.clearInterval(clock);
                this.setState({
                    verficationName: '重新获取',
                    verifiCodeBtnState: false,
                })
            }
        }, 1000);
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
        this.props.onLogin ? this.props.onLogin() : null;
    }

    render() {
        const { className, onLogin, ...others } = this.props;
        const { search } = this.state;
        const cls=classNames({
            [className]:className
        });

        return (
            <div className={cls} {...others}>
                <div className="login_module_wrap">
                    <div className="title">企业注册</div>
                    <div className="icon"></div>
                    <div className="login_panel_wrap">
                        <Row className="mb25">
                            <Input className="login_input" placeholder="输入企业名称" maxLength="30" name="userName" onChange={this.handleChange}/>
                            <div className="error_info">{search.userNameErr}</div>
                        </Row>
                        <Row className="mb25">
                            <Input className="login_input" placeholder="输入手机号码" maxLength="11" name="phone" onChange={this.handleChange}/>
                            <div className="error_info">{search.phoneErr}</div>
                        </Row>
                        <Row className="mb25">
                            <Input className="login_input width200" placeholder="输入手机收到的验证码" maxLength="6" name="verifCode" onChange={this.handleChange}/>
                            <Button type="primary" className="login_form_button margin_left18" disabled={this.state.verifiCodeBtnState} style={{ width: '112px' }} onClick={this.sendVerificationCode}>{this.state.verficationName}</Button>
                            <div className="error_info">{search.verifCodeErr}</div>
                        </Row>
                        <Row className="mb25">
                            <Input type="password" className="login_input" placeholder="填写密码" maxLength="30" name="password" onChange={this.handleChange}/>
                            <div className="error_info">{search.passwordErr}</div>
                        </Row>
                        <Row className="mb25">
                            <Input type="password" className="login_input" placeholder="确认密码" maxLength="30" name="confirmPassword" onChange={this.handleChange}/>
                            <div className="error_info">{search.confirmPasswordErr}</div>
                        </Row>
                        <Row className="mb25">
                            <div><Checkbox onChange={this.agreementCheckbox}checked={search.agreement}></Checkbox><span>我同意并遵守<a>《福利卡平台服务协议》</a></span></div>
                            <div className="error_info">{search.agreementErr}</div>
                        </Row>
                        <Row className="mb25">
                            <Button type="primary" className="login_form_button" onClick={this.saveFormData}>立即注册</Button>
                            <div className="error_info">{this.state.error_info}</div>
                        </Row>
                        <Row className="mb25">
                            <a className="ahref" onClick={this.gotologinCkick}>返回登录</a>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}
