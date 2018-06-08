import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import { Row, Col,Tag, Popover, Button } from 'antd';
import './BiscuitsBigCard.styl';

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

export default class BiscuitsBigCard extends React.Component{
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
            cardItem.tagList && cardItem.tagList.length > 3 && cardItem.tagList.map((item,index)=>{
                if(index < 3){return false;}
                return(
                    <div key={'tag'+index}>
                        <Tag className="marg10">{item}</Tag>
                    </div>
                )
            })
          );
        
        return(
            <div className="biscuitsbigcard-wrap">
                <Row>
                    <Col span={4} className="biscuitsbigcard-left" onClick={this.datail.bind(this,cardItem.id)}>
                        {cardItem.itemImageURL ? <img src={cardItem.itemImageURL} alt=""/>:''}
                    </Col>
                    <Col span={20} className="biscuitsbigcard-right">
                        <span className="title" onClick={this.datail.bind(this,cardItem.id)}>{cardItem.title}</span>
                        <span className="text">{cardItem.text}</span>
                        <Row>
                            {
                                cardItem.tagList && cardItem.tagList.length > 0 &&
                                cardItem.tagList.map((item,index)=>{
                                    if(index > 2){return false;}
                                    return(
                                        <Tag key={'bigtag'+index}>{cardItem.tagList[index]}</Tag>
                                    )
                                })
                            }
                            {
                                cardItem.tagList && cardItem.tagList.length > 3 && 
                                <Popover content={content}>
                                    <a style={{color: '#999'}}>+{cardItem.tagList.length-3}</a>
                                </Popover>
                            }
                        </Row>
                    </Col>
                </Row>
                <Row className="biscuitsbigcard-btn">
                        <Button type="primary" style={{marginRight:'10px'}}>GET IT</Button>
                        <Button icon="caret-up">{cardItem.praiseCount || '0'}</Button>
                        <Button icon="save" style={{float:'right'}}>保存</Button>
                        <Button icon="share-alt" style={{marginRight:'10px',float:'right'}}/>
                </Row>
            </div>
        )
    }

}
