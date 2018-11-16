import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { Upload, Button, Icon, message } from 'antd';

import './UploadPic.styl';

export default class UploadPic extends React.Component {
    static propTypes = {
        uploadKey: PropTypes.string,
        title: PropTypes.string,
        action: PropTypes.string.isRequired,
    };

    static defaultProps = {
        uploadKey: "uploadKey",
        title: "",
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            imageUrl: '',
            uploadSize: 2, // 文件上传大小 2MB
        };
    }

    componentDidMount() {

    }

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    // 上传文件之前的钩子函数
    beforeUpload = (file) => {
        return this.fileCheck(file);
    }

    // 上传文件校验
    fileCheck = (file) => {
        let name = file.name;
        let size = file.size;
        let type = name.substring(name.lastIndexOf('.') + 1);


        let regEn = /[`~!@#$%^&*()_+<>?:"{},\/;'[\]]/im;
        let regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        if (regEn.test(name) || regCn.test(name)) {
            message.error('上传文件的名称不能含有特殊字符');
            return false;
        }
        if (!(type == 'jpeg' || type == 'jpg' || type == 'png')) {
            message.error('不支持该文件类型上传');
            return false;
        }
        const isLt2M = size / 1024 / 1024 < this.state.uploadSize;
        if (!isLt2M) {
            message.error(`文件大小不能超过${this.state.uploadSize}MB`);
            return false;
        }
        return true;
    }

    // 上传中、完成、失败都会调用这个函数。
    handleChange = (info, file) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'error') {
            this.setState({
                loading: false
            });
            message.error('上传图片发生错误');
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
            message.error('上传成功');
        }
        this.props.onChange ? this.props.onChange(info) : null;
    }

    render() {
        const { className, uploadKey, action, onChange, title, ...others } = this.props;
        const cls = classNames({
            [className]: className
        });


        const { imageUrl } = this.state;

        const uploadProps = {
            className: "avatar-uploader",
            beforeUpload: this.beforeUpload,
            accept: 'image/jpeg,image/png,image/jpg', // 自定义上传的文件类型
            name: uploadKey, // 后台接受的参数key
            showUploadList: false,// 是否显示上传列表
            multiple: false, // 是否多文件上传
            listType: "picture-card",
            action: action,
            onChange: this.handleChange
        };

        const uploadButton = (
            <div>
                <Icon style={{ fontSize: '40px' }} type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">上传照片</div>
            </div>
        );


        return (
            <div className={`upload_pic_wrap ${cls}`} {...others}>
                <Upload {...uploadProps}>
                    {imageUrl ? <img src={imageUrl} alt="图片" /> : uploadButton}
                </Upload>
                <div className="title_desc">{title}</div>
            </div>
        );
    }
}
