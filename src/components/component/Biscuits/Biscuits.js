import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import { Row, Col,Tag, Popover, Button } from 'antd';
import './Biscuits.styl';

/**
 * 该组件需要对象数据格式：
cardItem:{
    itemImageURL:'',
	title:'碧海连天',
	text:'碧海连天碧海连天碧海连天碧海连天碧海连天碧海连天碧海连天',
	tagList:[
		'game',
		'product1',
		'product2',
		'product3',
		'product4'
	],
	praiseCount:'66', // 点赞数
	commentCount:'88' // 评论数
}
 */

export default class Biscuits extends React.Component{
    static defaultProps={
        cardItem:React.PropTypes.isRequired
    };
    static propTypes={
    };
    constructor(props){
        super(props);
        this.state={
            // itemImageURL:''
        }
    }
    componentDidMount(){
        this.setState({
            // itemImageURL:require('../../../images/kitty_265x244_2x.png'),
        });

    }

    datail=(id)=>{
        location.href = '#/DetailContent?id='+id;
    }
    render(){
        const {cardItem, ...others}=this.props;
        const content = (
            cardItem.tagList && cardItem.tagList.length > 1 && cardItem.tagList.map((item,index)=>{
                if(index == 0){return false;}
                return(
                    <div key={'tag'+index}>
                        <Tag className="marg10">{item}</Tag>
                    </div>
                )
            })
          );
        
        return(
            <Row className="biscuits-wrap">
                <Col span={4} className="biscuits-left" onClick={this.datail.bind(this,cardItem.id)}>
                    {cardItem.itemImageURL ? <img src={cardItem.itemImageURL} alt=""/>:''}
                </Col>
                <Col span={20} className="biscuits-right">
                    <span className="title" onClick={this.datail.bind(this,cardItem.id)}>{cardItem.title}</span>
                    <span className="text">{cardItem.text}</span>
                    <Row>
                        <Col span={10}>
                            {
                                cardItem.tagList && cardItem.tagList.length > 0 &&  <Tag>{cardItem.tagList[0]}</Tag>
                            }
                            {
                                cardItem.tagList && cardItem.tagList.length > 1 && 
                                <Popover content={content}>
                                    <a style={{color: '#999'}}>+{cardItem.tagList.length-1}</a>
                                </Popover>
                            }
                        </Col>
                        <Col span={14} className="tr">
                            <Button shape="circle" icon="share-alt" style={{width:'22px',height: '22px',marginRight: '10px'}}/>
                            <Button icon="save" className='hm'>保存</Button>
                            <Button icon="caret-up" className='hm'>{cardItem.praiseCount || '0'}</Button>
                            <Button icon="message" style={{height: '22px'}}>{cardItem.commentCount || '0'}</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }

}
