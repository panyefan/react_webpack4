import React from 'react';
import { Row, Col, Divider, Input, Button, Icon, Checkbox, Modal, message, Steps } from 'antd';
import Utils from '../../utils/Utils';
import { UploadPic } from '../../components/Upload/index';
import './cardConfig.less';

export default class CardConfig extends React.Component {
    static defaultProps = {
    };
    static propTypes = {
    };
    constructor(props) {
        super(props);
        this.state = {
            search: {},
            cardbglist: [
                'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            ],
            selectCardbgUrl: '',
            selectCardbgIndex: 0,

        }
    }
    componentDidMount() {
        this.initPage();
    }


    initPage = () => {
        this.setState({
            selectCardbgUrl: this.state.cardbglist[0],
        });
    }

    // 选择卡背景
    onSeleceCardBg = (item, index) => {
        this.setState({
            selectCardbgUrl: item,
            selectCardbgIndex: index,
        });
    }
    // 确认批量新增
    batchAddVisibleOk = () => {

        console.log("批量新增");

    }

    // 图片上传回调
    uploadImg = (info) => {
        console.log(info);
        // if (info.file.status === 'done') {

        // }
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
            "trademark": () => {
                if (!search.trademark) {
                    search.trademarkErr = "请输入品牌名称";
                    this.setState({ search });
                    return false;
                }
                search.trademarkErr = "";
                this.setState({ search });
                return true;
            },
        }

        return global.formCheck(name, handle);
    }

    saveBtn = () => {
        if (!this.check()) {
            return false;
        }
        console.log('保存');

    }


    render() {
        const { search, cardbglist, selectCardbgUrl, selectCardbgIndex } = this.state;
        const Step = Steps.Step;

        return (
            <div>
                {/* <div className="xc">
                    <Icon type="solution" style={{fontSize:'24px', color: '#1890ff'}}/>
                    <span className="step_desc">卡面配置</span>
                </div> */}
                <div className="card_config_content">
                    <div className="left">
                        <div className="card_wrap">
                            <div className="card_head">
                                <div className="logo_wrap">
                                    <img className="logo_img" src={require('../../images/banner01.png')}></img>
                                </div>
                                <div className="title_wrtap">
                                    <div className="title">万家超市</div>
                                    <div className="desc">储值卡</div>
                                </div>
                                <div className="qr_img_wrap">
                                    <img className="qr_img" src={require('../../images/banner01.png')}></img>
                                </div>
                            </div>
                            <div className="card_footer">6888 888 888 888</div>
                            <img className="card_img" src={selectCardbgUrl}></img>
                        </div>
                    </div>
                    <div className="right">
                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                            <Col className="tr" span={3}>商户logo</Col>
                            <Col span={12}>
                                <UploadPic
                                    title="上传商户logo"
                                    uploadKey="xixixi"
                                    uploadURL="//jsonplaceholder.typicode.com/posts/"
                                    picURL="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                    onChange={this.uploadImg}
                                ></UploadPic>
                            </Col>
                        </Row>
                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                            <Col className="tr" span={3}>品牌名称</Col>
                            <Col span={12}>
                                <Input className="width350" maxLength="30" name="trademark" onChange={this.handleChange} />
                                {!search.trademarkErr && <div className="error_info">温馨提示：品牌名称提交后无法修改</div>}
                                {search.trademarkErr && <div className="error_info">{search.trademarkErr}</div>}
                            </Col>
                        </Row>
                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                            <Col className="tr" span={3}>卡面更换</Col>
                            <Col span={12}>
                                {cardbglist.map((item, index) => {
                                    return <div className={`card_bg_wrap ${index == selectCardbgIndex ? 'sele_card_bg' : ''}`} onClick={() => this.onSeleceCardBg(item, index)}>
                                        <img className="card_bg_img" src={item}></img>
                                    </div>
                                })}
                            </Col>
                        </Row>
                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                            <Col className="tr" span={3}>适用商户</Col>
                            <Col span={12}>
                                <div className="merchant_wrap">
                                    <Checkbox defaultChecked disabled />
                                    <img className="merchant_logo_img" src={require('../../images/banner01.png')}></img>
                                    <span>二哈二哈</span>
                                    <span className="mlr20">二哈二哈一楼</span>
                                </div>
                                <div className="merchant_wrap">
                                    <Checkbox defaultChecked disabled />
                                    <img className="merchant_logo_img" src={require('../../images/banner01.png')}></img>
                                    <span>二哈二哈</span>
                                    <span className="mlr20">二哈二哈一楼</span>
                                </div>
                                <div className="merchant_wrap">
                                    <Checkbox defaultChecked disabled />
                                    <img className="merchant_logo_img" src={require('../../images/banner01.png')}></img>
                                    <span>二哈二哈</span>
                                    <span className="mlr20">二哈二哈一楼</span>
                                </div>
                                <div className="merchant_wrap">
                                    <Checkbox defaultChecked disabled />
                                    <img className="merchant_logo_img" src={require('../../images/banner01.png')}></img>
                                    <span>二哈二哈</span>
                                    <span className="mlr20">二哈二哈一楼</span>
                                </div>
                                <div className="merchant_wrap">
                                    <Checkbox defaultChecked disabled />
                                    <img className="merchant_logo_img" src={require('../../images/banner01.png')}></img>
                                    <span>二哈二哈</span>
                                    <span className="mlr20">二哈二哈一楼</span>
                                </div>
                            </Col>
                        </Row>
                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                            <Col className="tr" span={3}>有效期</Col>
                            <Col span={12}>2018.11.11</Col>
                        </Row>
                    </div>
                </div>
                <Row type="flex" justify="center" align="middle" className="mb25" gutter={16}>
                    <Button type="primary" onClick={this.saveBtn}>保存</Button>
                </Row>

                {/* <Modal
                    title="批量新增"
                    centered
                    visible={this.state.batchAddVisible}
                    onOk={this.batchAddVisibleOk}
                    onCancel={() => this.setState({ batchAddVisible: false })}
                >
                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={6}>
                            <Button icon="download">下载模板</Button>
                        </Col>
                        <Col span={1}>
                            <Divider type="vertical" style={{ height: '86px' }} />
                        </Col>
                        <Col span={6} >
                        </Col>
                    </Row>
                </Modal> */}
            </div>
        )
    }
}
