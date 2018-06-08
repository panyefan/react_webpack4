import React,{Component} from 'react';
import {Link} from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { Row, Col, Input, Button, Menu, Icon, Card } from 'antd';
import Header from '../components/component/Header/index';
import Presentation from '../components/component/Presentation/index';
import Menus from '../pages/Menus/index'
import './init.styl';

class Init extends Component{
    constructor(){
        super();
        this.state = {
        }
    }

    componentWillMount() {
    }
    componentDidMount(){
    }

    render(){
        return(
            <div>
                <Header title="好产品"/>
                <Presentation></Presentation>
                <div className="content" style={{display:(this.props.location.pathname).charAt(this.props.location.pathname.length-1) == '/'?'block':'none'}}>
                    <div className="content-wrap">
                        <div className="content-nav">
                            <Menus/>
                        </div>
                        <div className="content-centent" key={this.props.location.pathname}>
                            {/*各子页面内容 start*/}
                                {this.props.children}
                            {/*各子页面内容 end*/}
                        </div>
                    </div>
                </div>

                <div className="content" style={{display:(this.props.location.pathname).charAt(this.props.location.pathname.length-1) == '/'?'none':'block'}}>
                    <div className="content-wrap" key={this.props.location.pathname}>
                        {/*各子页面内容 start*/}
                            {this.props.children}
                        {/*各子页面内容 end*/}
                    </div>
                </div>
            </div>

        )
    }
}
export default Init;
