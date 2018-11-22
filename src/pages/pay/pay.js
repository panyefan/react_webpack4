import React from 'react';
import { Row, Col, Timeline } from 'antd';
import './pay.less';

export default class Pay extends React.Component {
    static defaultProps = {
    };
    static propTypes = {
    };
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Row type="flex" align="middle" className="mb25" gutter={16}>
                    <Col className="tr" span={3}>支付方式:</Col>
                    <Col span={12} className="fw700fs16">线下支付</Col>
                </Row>
                <Row type="flex" align="middle" className="mb25" gutter={16}>
                    <Col className="tr" span={3}></Col>
                    <Col span={12}>汇款须知</Col>
                </Row>
                <Row type="flex" align="middle" className="mb25" gutter={16}>
                    <Col className="tr" span={3}></Col>
                    <Col span={12}>
                        <Timeline>
                            <Timeline.Item dot={<span className="step_num">1</span>}>
                                <div className="mgl20">
                                    <div className="fw700fs16">请打款到汇商通盈收款银行</div>
                                    <div className="fw700">
                                        <span className="color045">收款银行 </span>
                                        <span>招商银行股份有限公司 </span>
                                    </div>
                                    <div className="fw700">
                                        <span className="color045">收款账号  </span>
                                        <span>1209384594067 </span>
                                    </div>
                                    <div className="fw700">
                                        <span className="color045">开户名称   </span>
                                        <span>汇商通盈有限公司</span>
                                    </div>
                                    <div className="fw700">
                                        <span className="color045">最低汇款金额为1000元  </span>
                                    </div>
                                    <div className="fw700">
                                        <span className="color045">银行转账时，需备注此款项为福利卡充值  </span>
                                    </div>
                                </div>
                            </Timeline.Item>
                            <Timeline.Item dot={<span className="step_num">2</span>}>
                                <div className="mgl20">
                                    <div className="fw700fs16">将汇款信息发送到我们的邮箱</div>
                                    <div className="fw700">
                                        <span className="color045">汇款之后请您将 </span>
                                        <span>汇福利企业账号、贵公司名称、汇款人姓名、汇款金额、汇款时间、汇款银行账号信息或汇款底单发送至企业邮箱：hstypay@hstypay.com </span>
                                    </div>
                                </div>
                            </Timeline.Item>
                            <Timeline.Item dot={<span className="step_num">3</span>}>
                                <div className="mgl20">
                                    <div className="fw700fs16">充值至您的账户</div>
                                    <div className="fw700">
                                        <span className="color045">我们会于每个工作日16点查账，并在确认到账后一个工作日内充值到企业账户中 </span>
                                    </div>
                                </div>
                            </Timeline.Item>
                        </Timeline>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" className="mb25" gutter={16}>
                    <img className="desc_img" src={require('../../images/banner01.png')}></img>
                </Row>
            </div>
        )
    }
}
