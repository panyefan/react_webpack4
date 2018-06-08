import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import { Row, Col, Input, Button } from 'antd';
import './Header.styl';

export default class Header extends React.Component{
    static defaultProps={
    };
    static propTypes={
    };
    constructor(props){
        super(props);
        this.state={
        }
    }
    componentWillReceiveProps(nextProps){
    }
    render(){
        const Search = Input.Search;
        
        return(
            <div className="header">
                <Row className="header-wrap">
                    <Col span={8}>
                        <div className="logo"></div>
                        <div className="txt">{this.props.title}</div>
                    </Col>
                    <Col span={8} className='tc'>
                        <Search placeholder="搜索你想要的" style={{ width: 200 }} onSearch={value => console.log(value)}/>
                    </Col>
                    <Col span={8} className='tr'>
                        <Button type="primary">登录</Button>
                        <Button type="primary" style={{marginLeft: '5px'}}>注册</Button>
                    </Col>
                </Row>
            </div>
        )
    }

}
