import React from 'react';
import { Row, Col, Divider, Input, Button, Icon, Dropdown, Modal, message, Steps } from 'antd';
import Utils from '../../utils/Utils';
import { UploadFile } from '../../components/Upload/index';
import './issueWelfare.less';

const confirm = Modal.confirm;
export default class IssueWelfare extends React.Component {
    static defaultProps = {
    };
    static propTypes = {
    };
    constructor(props) {
        super(props);
        this.state = {
            search: {},
        }
    }
    componentDidMount() {
    }

    // 立即发卡
    submitBtm = () => {
        if (!this.check()) {
            return false;
        }
        if (!this.refs.refUploadFile.isSelectedUploadFile()) {
            return false;
        }
        confirm({
            title: '确认要发卡吗？',
            content: '是否确认此次发卡',
            centered: true,
            onOk: () => {
                // 调用组件里面的方法
                let formData = this.refs.refUploadFile.getUploadFile();
                formData.append("title", this.state.search.userName);
                this.fileUrlPath = 'https://jsonplaceholder.typicode.com/posts/';
                request.post(this.fileUrlPath, formData).then(response => {
                    message.success('上传并发放成功');
                }, err => {
                    message.error('上传失败');
                }).catch((error) => {
                    message.error('上传失败');
                });
            },
            onCancel: () => { },
        });

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
            "userName": () => {
                if (!search.userName) {
                    search.userNameErr = "输入发放主题";
                    this.setState({ search });
                    return false;
                }
                search.userNameErr = "";
                this.setState({ search });
                return true;
            },
        }

        return global.formCheck(name, handle);
    }


    render() {
        const { search } = this.state;
        const Step = Steps.Step;

        return (
            <div>
                <div className="issue_welfare_wrap">
                    <div className="left">
                        <div className="vertical_step_wrap">
                            <div className="title">1</div>
                            <Divider className="line" type="vertical" />
                            <div className="title">2</div>
                            <Divider className="line" type="vertical" />
                            <div className="title">3</div>
                        </div>
                    </div>
                    <div className="right">
                        <Row type="flex" align="middle" style={{ marginBottom: '160px'}} gutter={16}>
                            <Col className="tr" span={2}>发放主题</Col>
                            <Col span={7}>
                                <Input className="width224" placeholder="输入10个字内的福利主题" maxLength="10" name="userName" onChange={this.handleChange} />
                                {!search.userNameErr && <div style={{ position: 'absolute' }}>填写本次发放福利主题，如：中秋福利发放</div>}
                                {search.userNameErr && <div className="error_info">{search.userNameErr}</div>}
                            </Col>
                        </Row>
                        <Row type="flex" align="middle" style={{ marginBottom: '10px'}} gutter={16}>
                            <Button onClick={this.queryBtn} icon="download">下载员工信息</Button>
                        </Row>
                        <Row type="flex" align="middle" style={{ marginBottom: '75px'}} gutter={16}>
                            下载当前企业员工信息（excle文件），在文件内编辑好需发放的金额，上传发放
                        </Row>
                        <Row type="flex" align="middle" gutter={16}>
                            <UploadFile ref="refUploadFile" uploadKey="xixix"></UploadFile>
                        </Row>
                    </div>
                </div>


                <Row type="flex" justify="center" align="middle" className="mb80" style={{ marginTop: '70px'}} gutter={16}>
                    <Col span={16}>
                        <Steps status="wait" size="small">
                            <Step title="下载公司人员信息" description="下载公司人员信息，在已有基础上修改" />
                            <Step title="填写文件内发放金额字段" description="在Excle文件内，对应每个人员，填写相应金额" />
                            <Step title="保存并上传文件" description="检查金额无误以后，保存文件，点击上传按钮，发放福利" />
                        </Steps>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" className="mb25" gutter={16}>
                    <Button type="primary" onClick={this.submitBtm}>立即发卡</Button>
                </Row>
            </div>
        )
    }
}
