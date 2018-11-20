import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Regexp } from '../../utils/Regexp'
import { Hoverable } from '../Hoverable/index'
import { Row, Col } from 'antd';
import { Badge, Button, Card } from 'antd';

import './CompanyDetail.less';

/**
 * 展示公司信息组件
 */
export default class CompanyDetail extends React.Component {
    static propTypes = {
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);
        this.state = {
            search: {}
        };
    }

    componentDidMount() {

    }

    handleChange = (e) => {
        e.target.value = e.target.value.replace(/^\s+|\s+$/gm, '');
        let val = e.target.value;
        let name = e.target.name;
        let search = this.state.search;
        search[name] = val;
        this.setState({
            search: search
        });

        this.check(name);
    }

    check = (name) => {
        let search = this.state.search;
        let handle = {
            "phone": () => {
                if (!search.phone) {
                    search.phoneErr = "请输入手机号";
                    this.setState({ search });
                    return false;
                }
                if (!Regexp.phoneReg.test(search.phone)) {
                    search.phoneErr = "请输入正确的手机号";
                    this.setState({ search });
                    return false;
                }
                search.phoneErr = "";
                this.setState({ search });
                return true;
            },
            "password": () => {
                if (!search.password) {
                    search.passwordErr = "请输入密码";
                    this.setState({ search });
                    return false;
                }
                search.passwordErr = "";
                this.setState({ search });
                return true;
            },
        }

        return global.formCheck(name, handle);
    }

    // 登录
    saveFormData = () => {
        if (!this.check()) {
            return;
        }

        console.log("登录");
    }

    // 公司信息编辑
    companyInfoEdit = (num) => {
        this.props.onCompanyAddEdit ? this.props.onCompanyAddEdit(num) : null;
    }


    render() {
        const { className, onCompanyAddEdit, ...others } = this.props;
        const { search } = this.state;
        const cls = classNames({
            [className]: className
        });

        return (
            <div className={cls} {...others}>
                <div className="state_right"><Badge status="processing" text="审核中" /></div>
                <div className="cd_module_wrap">
                    <div className="cd_module_both">
                        <Hoverable>
                            <Card
                                type="inner"
                                title="公司信息"
                                style={{ width: 500 }}
                                extra={<Button type="primary" icon="edit" onClick={()=>this.companyInfoEdit('0')}>编辑</Button>}
                            >
                                <Row type="flex" align="middle" className="mb25" gutter={16}>
                                    <Col span={4}>统一社会信用代码</Col>
                                    <Col span={12}>234999809000892</Col>
                                </Row>
                                <Row type="flex" align="middle" className="mb25" gutter={16}>
                                    <Col span={4}>行业类别</Col>
                                    <Col span={12}>支付行业</Col>
                                </Row>
                                <Row type="flex" align="middle" className="mb25" gutter={16}>
                                    <Col span={4}>客服电话</Col>
                                    <Col span={12}>支付行业</Col>
                                </Row>
                                <Row type="flex" align="middle" className="mb25" gutter={16}>
                                    <Col span={4}>办公地址</Col>
                                    <Col span={12}>支付行业</Col>
                                </Row>
                                <Row type="flex" align="middle" className="mb25" gutter={16}>
                                    <Col span={4}>详细地址</Col>
                                    <Col span={12}>支付行业</Col>
                                </Row>
                                <Row type="flex" align="middle" className="mb25" gutter={16}>
                                    <Col span={4}>企业邮箱</Col>
                                    <Col span={12}>支付行业</Col>
                                </Row>
                                <Row type="flex" align="middle" className="mb25" gutter={16}>
                                    <Col span={4}>银行卡照片</Col>
                                    <Col span={12}><img className="pic_img" src={require('../../images/banner01.png')}></img></Col>
                                </Row>
                            </Card>
                        </Hoverable>
                        <Hoverable style={{ marginTop: '20px' }}>
                            <Card
                                type="inner"
                                title="企业银行账户"
                                style={{ width: 500 }}
                                extra={<Button type="primary" icon="edit" onClick={()=>this.companyInfoEdit('1')}>编辑</Button>}
                            >
                                <Row type="flex" align="middle" className="mb25" gutter={16}>
                                    <Col span={4}>开户名称</Col>
                                    <Col span={12}>234999809000892</Col>
                                </Row>
                                <Row type="flex" align="middle" className="mb25" gutter={16}>
                                    <Col span={4}>开户账号</Col>
                                    <Col span={12}>234999809000892</Col>
                                </Row>
                                <Row type="flex" align="middle" className="mb25" gutter={16}>
                                    <Col span={4}>开户银行</Col>
                                    <Col span={12}>支付行业</Col>
                                </Row>
                                <Row type="flex" align="middle" className="mb25" gutter={16}>
                                    <Col span={4}>银行卡照片</Col>
                                    <Col span={12}><img className="pic_img" src={require('../../images/banner01.png')}></img></Col>
                                </Row>
                            </Card>
                        </Hoverable>
                    </div>
                    <div className="cd_module_both">
                        <Hoverable>
                            <Card
                                type="inner"
                                title="证件上传"
                                style={{ width: 500 }}
                                extra={<Button type="primary" icon="edit" onClick={()=>this.companyInfoEdit('2')}>编辑</Button>}
                            >
                                <Row type="flex" align="middle" className="mb25" gutter={16}>
                                    <Col span={4}>法人姓名</Col>
                                    <Col span={12}>234999809000892</Col>
                                </Row>
                                <Row type="flex" align="middle" className="mb25" gutter={16}>
                                    <Col span={4}>法人身份证号</Col>
                                    <Col span={12}>支付行业</Col>
                                </Row>
                                <Row type="flex" align="middle" className="mb25" gutter={16}>
                                    <Col span={4}>法人身份证照</Col>
                                    <Col span={8}><img className="pic_img" src={require('../../images/banner01.png')}></img></Col>
                                    <Col span={8}><img className="pic_img" src={require('../../images/banner01.png')}></img></Col>
                                </Row>
                            </Card>
                        </Hoverable>
                        <Hoverable style={{ marginTop: '20px' }}>
                            <Card
                                type="inner"
                                title="开票信息"
                                style={{ width: 500 }}
                                extra={<Button type="primary" icon="edit" onClick={()=>this.companyInfoEdit('3')}>编辑</Button>}
                            >
                                <Row type="flex" align="middle" className="mb25" gutter={16}>
                                    <Col span={4}>发票抬头</Col>
                                    <Col span={12}>234999809000892</Col>
                                </Row>
                                <Row type="flex" align="middle" className="mb25" gutter={16}>
                                    <Col span={4}>信用代码</Col>
                                    <Col span={12}>234999809000892</Col>
                                </Row>
                                <Row type="flex" align="middle" className="mb25" gutter={16}>
                                    <Col span={4}>注册地址</Col>
                                    <Col span={12}>支付行业</Col>
                                </Row>
                                <Row type="flex" align="middle" className="mb25" gutter={16}>
                                    <Col span={4}>公司电话</Col>
                                    <Col span={12}>支付行业</Col>
                                </Row>
                                <Row type="flex" align="middle" className="mb25" gutter={16}>
                                    <Col span={4}>开户银行</Col>
                                    <Col span={12}>支付行业</Col>
                                </Row>
                                <Row type="flex" align="middle" className="mb25" gutter={16}>
                                    <Col span={4}>开户账号</Col>
                                    <Col span={12}>支付行业</Col>
                                </Row>
                            </Card>
                        </Hoverable>
                    </div>
                </div>
            </div>
        );
    }
}
