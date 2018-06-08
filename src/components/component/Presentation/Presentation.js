import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import { Row, Col, Input, Button } from 'antd';
import './Presentation.styl';

export default class Presentation extends React.Component{
    constructor(props){
        super(props);
        this.state={
            productImage:''
        }
    }
    componentDidMount(){
        this.setState({
            productImage:require('../../../images/kitty_265x244_2x.png'),
        });

    }
    render(){
        const Search = Input.Search;
        
        return(
            <div className="presentation">
                <Row className="presentation-wrap">
                    <Col span={12} className="presentation-left">
                        <span className="title">碧海连天</span>
                        <p className="text">碧海连天碧海连天碧海连天碧海连天碧海连天碧海连天碧海连天碧海连天碧海连天碧海连天碧海连天碧海连天</p>
                        <Button type="primary" style={{width: '100px',height: '40px'}}>注册</Button>
                    </Col>
                    <Col span={12} className="presentation-right">
                        <img src={this.state.productImage} width='240px' height='220px'/>
                    </Col>
                </Row>
            </div>
        )
    }

}
