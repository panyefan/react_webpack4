import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Regexp } from '../../utils/Regexp'
import { Row, Col } from 'antd';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import './Register.styl';

export default class Register extends React.Component {
    static propTypes = {
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);
        this.formDataObj = {};
        // this.setTimeVerificationCode = ''; // 倒计时
        // this.seconds = 3; // 倒计时60秒
        this.state = {
            seconds: 3, // 倒计时60秒
            error_info: '错误信息',
            verifiCodeBtnState: false, // 验证码失效状态
            verficationName: "发送验证码",
        };
    }

    componentDidMount() {

    }

    // 手机号检验
    checkPhone = (rule, value, callback) => {
        if (!value) {
            callback('请输入手机号');
            return;
        }
        if (!Regexp.phoneReg.test(value)) {
            callback('请输入正确的手机号');
            return;
        }
        callback();
    }
    // 验证码检验
    checkVerificationCode = (rule, value, callback) => {
        if (!value) {
            callback('请输入验证码');
            return;
        }
        if (!Regexp.verificationCodeReg.test(value)) {
            callback('请输入数字验证码');
            return;
        }
        callback();
    }
    // 验证码倒计时
    setTimecountDown = () => {
        let that = this;
        let seconds = this.state.seconds;
        let clock = setInterval(function () {
            seconds--;
            that.setState({
                // verficationName: `${seconds}秒后获取`
                verficationName: seconds
            })
            if (seconds == 0) {
                window.clearInterval(clock);
                that.setState({
                    verficationName: '重新获取',
                    verifiCodeBtnState: false,
                })
            }
        }, 1000);
    }
    // 确认密码检验
    checkConfirmPassword = (rule, value, callback) => {
        if (!value) {
            callback('请输入确认密码');
            return;
        }
        if (value && value !== this.formDataObj.getFieldValue('password')) {
            callback('确认密码不一致');
        }
        callback();
    }


    // 发送检验码
    sendVerificationCode = () => {
        console.log(111111111);
        let that = this;
        // 单独检验手机号
        // this.formDataObj.validateFields(['phone'], (err, values) => {
        //     if (err) {
        //         return;
        //     }
        //     let formData = new FormData();
        //     formData.append("username", values.username);
        //     formData.append("phone", values.phone);
        //     formData.append("verificationCode", values.verificationCode);
        //     formData.append("password", values.password);
        //     formData.append("confirmPassword", values.confirmPassword);
        //     console.log(formData);
        //     console.log(values);


        // });

        this.setState({
            verifiCodeBtnState: true,
        });
        // this.setTimecountDown();
        let seconds = this.state.seconds;
        let clock = setInterval(function () {
            seconds--;
            that.setState({
                verficationName: `${seconds}秒后获取`
            })
            if (seconds == 0) {
                window.clearInterval(clock);
                that.setState({
                    verficationName: '重新获取',
                    verifiCodeBtnState: false,
                })
            }
        }, 1000);
    }

    render() {
        let that = this;
        const { text, className, ...others } = this.props;

        return (
            <div className="login_module_wrap" {...others}>
                <div className="title">企业注册</div>
                <div className="icon"></div>
                <div className="login_panel_wrap">
                    <Row className="mb25">
                        <Input className="login_input" placeholder="输入企业名称" />
                    </Row>
                    <Row className="mb25">
                        <Input className="login_input" placeholder="输入手机号码" />
                    </Row>
                    <Row className="mb25">
                        <Input className="login_input width200" maxLength="10" placeholder="输入手机收到的验证码" />
                        <Button type="primary" className="login_form_button margin_left18" disabled={this.state.verifiCodeBtnState} style={{ width: '112px' }} onClick={this.sendVerificationCode}>{this.state.verficationName}</Button>
                    </Row>
                    <Row className="mb25">
                        <Input type="password" className="login_input" placeholder="填写密码" />
                    </Row>
                    <Row className="mb25">
                        <Input type="password" className="login_input" placeholder="确认密码" />
                    </Row>
                    <Row className="mb25">
                        <div><Checkbox></Checkbox><span>我同意并遵守<a>《福利卡平台服务协议》</a></span></div>
                    </Row>
                    <Row className="mb25">
                        <Button type="primary" className="login_form_button" onClick={this.saveFormData}>立即注册</Button>
                    </Row>
                    <Row className="mb25">
                        <span className="error_info">{this.state.error_info}</span>
                    </Row>
                </div>
            </div>
        );
    }
}
