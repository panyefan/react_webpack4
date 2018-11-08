import React from 'react';

import { Form, Input, Button } from 'antd';

import './Login.styl';
import { locale } from 'moment';

export default class Login extends React.Component {
    static defaultProps = {
    };
    static propTypes = {
    };
    constructor(props) {
        super(props);
        this.state = {
            errorInfo: '', // 错误信息
        }
    }
    componentDidMount() {
        
    }

    render() {
        const FormItem = Form.Item;
        const SeoCreateForm = Form.create()(
            (props) => {
                const { form } = props;
                const { getFieldDecorator } = form;
                const saveFormData = () => {
                    form.validateFields((err, values) => {
                        if (err) {
                            return;
                        }
                        let that = this;
                        let formData = new FormData();
                        formData.append("username", values.username);
                        formData.append("password", values.password);

                        location.href="#/Dices";
                        // 在这里执行保存到服务器的操作使用axios
                        // request.post(SC.baseUrl + '/api/login/', formData).then(response => {
                        //     let data = response.data;
                        //     if (data.c == 0) {
                        //         SC.user_id = data.d.user_info.user_id;
                        //         SC.view_perm = data.d.user_info.view_perm;

                        //         // 全局方法
                        //         global.initHoldPages();
                        //     } else {
                        //         that.setState({
                        //             errorInfo: data.m
                        //         });
                        //     }
                        // }, err => { }).catch((error) => { });
                    });
                }

                return (
                    <div className="login_panel_wrap">
                        <div className="logo_wrap">
                            <img className="logo_img" src={require("../../images/logo.png")} />
                        
                        </div>
                        <Form layout='vertical'>
                            <FormItem className="login_item"
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 10 }}
                                label="用户名">
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请填写用户名' }],
                                })(
                                    <Input placeholder="请输入用户名" />
                                )}
                            </FormItem>

                            <FormItem className="login_item"
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 10 }}
                                label="密码">
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请填写密码' }],
                                })(
                                    <Input type="password" placeholder="请输入密码" />
                                )}
                            </FormItem>

                            <FormItem className="login_item" style={{ textAlign: "center" }}
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 10 }}>
                                <Button type="primary" style={{ width: '100px' }} onClick={saveFormData}>确认</Button>
                            </FormItem>
                            <div className="attention">
                            注意：
                            本视频收集于网络。
                            本站视频仅供个人参考，
                            对于使用本站内容给您所造成的任何损失，本站概不负责！
                            </div>
                        </Form>
                        <div className="errorInfo">{this.state.errorInfo}</div>
                    </div>
                )
            }
        )

        return (
            <div className="login_wrapper">
                <div className="container_login">
                    <SeoCreateForm />
                </div>
            </div>
        )
    }

}
