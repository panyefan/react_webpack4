import React from 'react';
import { Login, Register, ForgetPassword } from '../../components/LoginRegister/index';

import './loginPage.styl';

export default class LoginPage extends React.Component {
    static defaultProps = {
    };
    static propTypes = {
    };
    constructor(props) {
        super(props);
        this.state = {
            toggleArr: [true, false, false], // 触发登录，注册、忘记密码组件的切换显示
        }
    }
    componentDidMount() {

    }

    // 切换到忘记密码组件
    onForgetPassword = () => {
        let toggleArr = this.state.toggleArr;
        toggleArr = Utils.setArrEleFalse(toggleArr);
        toggleArr[1] = true;
        this.setState({toggleArr});
    }
    // 切换到注册组件
    onRegister = () => {
        let toggleArr = this.state.toggleArr;
        toggleArr = Utils.setArrEleFalse(toggleArr);
        toggleArr[2] = true;
        this.setState({toggleArr});
    }
    // 切换到登录组件
    onLogin = () => {
        let toggleArr = this.state.toggleArr;
        toggleArr = Utils.setArrEleFalse(toggleArr);
        toggleArr[0] = true;
        this.setState({toggleArr});
    }


    render() {
        const { toggleArr } = this.state;
        return (
            <div className="login_wrap">
                <div className="login_wrap_left">
                    {toggleArr[0] && <Login className="fadeIn" onForgetPassword={this.onForgetPassword} onRegister={this.onRegister} />}
                    {toggleArr[1] && <Register className="fadeIn" onLogin={this.onLogin}/>}
                    {toggleArr[2] && <ForgetPassword className="fadeIn" onLogin={this.onLogin}/>}
                </div>
                <div className="login_wrap_right"></div>
            </div>
        )
    }

}
