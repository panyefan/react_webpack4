import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import { Row, Col, Input, Button, Card  } from 'antd';
import Biscuits from '../../components/component/Biscuits/index'
import './HomeContent.styl';

export default class HomeContent extends React.Component{
    static defaultProps={
    };
    static propTypes={
    };
    constructor(props){
        super(props);
        this.state={
            productImage:'',
            cardItemList:[]
        }
    }
    componentDidMount(){
        this.setState({
            // productImage:require('../../../images/kitty_265x244_2x.png'),
            cardItemList: [
                {
                    id:'001',
                    itemImageURL: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
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
                },
                {
                    id:'002',
                    itemImageURL: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                    title: '排山倒海',
                    text: '排山倒海排山倒海排山倒海排山倒海排山倒海排山倒海排山倒海排山倒海排山倒海排山倒海排山倒海排山倒海',
                    tagList: [
                        'AI',
                        'product1',
                        'product2',
                        'product3',
                        'product4'
                    ],
                    praiseCount: '12', // 点赞数
                    commentCount: '10' // 评论数
                },
                {
                    id:'003',
                    itemImageURL: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                    title: '绮罗天罡',
                    text: '绮罗天罡绮罗天罡绮罗天罡绮罗天罡绮罗天罡',
                    tagList: [
                        'VR',
                        'product1',
                        'product2',
                        'product3',
                        'product4'
                    ],
                    praiseCount: '14', // 点赞数
                    commentCount: '31' // 评论数
                }
            ]
        });

    }
    gotoURL=()=>{
        alert("跳转。。。");
    }
    render(){
        const Search = Input.Search;
        
        return(
            <div className="home-content">
                <Row className="home-content-wrap">
                    <Col span={17} className="home-content-left">
                        <Card title="Popular Upcoming Products" bodyStyle={{ padding: 0 }}>
                            {
                                this.state.cardItemList.length > 0 && this.state.cardItemList.map((item,index)=>{
                                    return <Biscuits key={'biscuits'+index} cardItem={item}/>
                                })
                            }
                            {
                                this.state.cardItemList.length == 0 && <span className="noData">已经没有啦~~</span>
                            }
                        </Card>
                    </Col>
                    {/* 右侧卡片--start */}
                    <Col span={7}>
                        <Card title="Early Access">
                            <p style={{marginBottom: '20px'}}>Launching a product? Get your own Upcoming page.</p>
                            <Button type="primary" style={{width: '100%',height: '30px'}}>LEARN MORE</Button>
                        </Card>

                        <Card title="Featured Collections" className="margintop20">
                            <div className="custom-radius-image" onClick={this.gotoURL}>
                                <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                                <div className="custom-radius-mask">
                                    <div className="link">
                                        <span className="title">Classic Games Reimagined</span>
                                        <span className="text">Same great games with a brand new twist.</span>
                                    </div>
                                </div>
                            </div>

                            <div className="custom-radius-image" onClick={this.gotoURL}>
                                <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                                <div className="custom-radius-mask">
                                    <div className="link">
                                        <span className="title">Classic Games Reimagined</span>
                                        <span className="text">Same great games with a brand new twist.</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <Card title="Upcoming Products" bodyStyle={{ padding: 0 }} className="margintop20">
                            <div className="custom-image" onClick={this.gotoURL}>
                                <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                            </div>
                            <div className="custom-card">
                                <h3>Cuppa</h3>
                                <p>The office drink round made easy</p>
                            </div>

                            <div className="custom-image" onClick={this.gotoURL}>
                                <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                            </div>
                            <div className="custom-card">
                                <h3>GuardMyPad</h3>
                                <p>Turn your devices into a free home security solution</p>
                            </div>
                        </Card>
                    </Col>
                    {/* 右侧卡片--end */}
                </Row>
            </div>
        )
    }

}
