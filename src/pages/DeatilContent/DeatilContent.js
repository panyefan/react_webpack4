import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import { Row, Col, Tag, Button, Card, Icon   } from 'antd';
import BiscuitsBigCard from '../../components/component/BiscuitsBigCard/index'
import TitleBar from '../../components/component/TitleBar/index'
import CardBar from '../../components/component/CardBar/index'
import './DeatilContent.styl';

export default class DeatilContent extends React.Component{
    static defaultProps={
    };
    static propTypes={
    };
    constructor(props){
        super(props);
        this.state={
            defaultImage:'',
            detailItem:{}
        }
    }
    componentDidMount(){
        this.setState({
            defaultImage:require('../../images/kitty_265x244_2x.png'),
            detailItem:{
                itemImageURL: require('../../images/kitty.png'),
                title: '碧海连天',
                text: '碧海连天碧海连天碧海连天碧海连天碧海连天碧海连天碧海连天',
                tagList: [
                    'game',
                    'product1',
                    'product2',
                    'product3',
                    'product4'
                ],
                praiseCount: '66', // 点赞数
                commentCount: '88' // 评论数
            }
        });

    }
    gotoURL=()=>{
        alert("跳转。。。");
    }
    render(){
        
        return(
            <div className="detail-content">
                <div className="detail-left">
                    <div className="detail-img">
                        {this.state.detailItem.itemImageURL ? <img src={this.state.detailItem.itemImageURL} alt=""/>:''}
                    </div>
                    <TitleBar title="分类">
                        <Tag className="margintop20">标签1</Tag>
                        <Tag className="margintop20">标签2</Tag>
                        <Tag className="margintop20">标签3</Tag>
                        <Tag className="margintop20">标签4</Tag>
                    </TitleBar>
                </div>
                <div className="detail-padding15 detail-center">
                    <div className="heard">
                        <span className="title">Leena AI</span>
                        <span className="heart">
                            <Icon type="heart-o"/>
                            <span>0</span>
                        </span>
                    </div>
                    <div className="heard-foot">
                        <span className="heart">
                            <Icon type="global"/>
                            <span>www.baidu.com</span>
                        </span>
                    </div>
                    <div className="line"/>
                    <p className="describe">Leena AI被创造和培育成为工作场所人员的同情和聪明的人力资源伙伴。有能力进行对话，并提供一个由游戏化驱动的恒星用户体验。Leena AI是独一无二的伴侣和功能。不仅Leena AI帮助您更好地与您的经理联系，通过启用相互反馈调查和产生可操作的见解，她独特的AI推荐引擎也可以通过与具有类似职业生涯的导师联系，来提升您的专业成长。当提高人力资源团队的效率时，Leena AI可以帮助您管理绩效目标，工资单，员工健康以及流程交易。不仅如此，就像一个完美的人力资源专家一样，她甚至可以通过对整个组织进行特殊的量表调查来帮助跟踪组织的整体脉搏。</p>
                    <TitleBar title="评测">
                        <span>成为第一个为Leena AI发表评论。</span>
                    </TitleBar>
                </div>
                <div className="detail-padding15 detail-right">
                    <TitleBar title="用途">
                        <span>用途广泛。</span>
                    </TitleBar>
                    <TitleBar title="相关">
                        <CardBar title="Skype" text="将您的松弛讨论移动到组Skype通话"/>
                        <CardBar title="Skype" text="将您的松弛讨论移动到组Skype通话"/>
                        <CardBar title="Skype" text="将您的松弛讨论移动到组Skype通话"/>
                        <CardBar title="Skype" text="将您的松弛讨论移动到组Skype通话"/>
                    </TitleBar>
                </div>
            </div>
        )
    }

}
