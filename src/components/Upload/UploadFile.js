import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Upload, Button, message } from 'antd';

import './UploadFile.less';

/**
 * 上传文件组件
 */
export default class UploadFile extends React.Component {
    static propTypes = {
        uploadKey: PropTypes.string,
    };

    static defaultProps = {
        uploadKey: "uploadKey"
    };

    constructor(props) {
        super(props);
        this.fileList = [], // 文件上传列表
            this.state = {
                isSelectedFile: false, // 是否已经选择了文件
                uploadSize: 2, // 文件上传大小 2MB
                fileSize: '',// 文件大小
                fileSizeStr: '',// 文件大小字符串
                fileType: '',// 文件类型
                fileName: '请上传Excel文件',// 文件名称
            };
    }

    componentDidMount() {

    }

    // 上传文件之前的钩子函数
    beforeUpload = (file) => {
        if (this.fileCheck(file) == false) {
            return false;
        }

        let name = file.name;
        let size = file.size;
        let type = name.substring(name.lastIndexOf('.') + 1);

        this.fileList.length = 0;// 清空文件数组
        this.fileList.push(file);

        this.setState({
            fileSize: size,
            fileSizeStr: this.bytesToSize(size),
            fileType: type,
            fileName: name,
            isSelectedFile: true,
        });

        // 返回 false 后，手动上传文件
        return false;
    }

    // 上传文件校验
    fileCheck = (file) => {
        let name = file.name;
        let size = file.size;
        let type = name.substring(name.lastIndexOf('.') + 1).toLowerCase();


        let regEn = /[`~!@#$%^&*()+<>?:"{},\/;'[\]]/im;
        let regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        if (regEn.test(name) || regCn.test(name)) {
            message.error('上传文件的名称不能含有特殊字符');
            return false;
        }
        if (!(type == 'xlsx' || type == 'xls')) {
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

    bytesToSize = (bytes) => {
        if (bytes === 0) return '0 B';
        let k = 1024;
        let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        let i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + sizes[i];
    }

    getUploadFile = () => { // 返回FormData文件对象
        if (this.fileList.length == 0) {
            message.error('请添加需要上传的文件');
            return false;
        }
        // 校验
        if (this.fileCheck(this.fileList[0]) == false) {
            return false;
        }


        const formData = new FormData();
        this.fileList.forEach((file) => {
            // uploadKey 为后台接受的参数key
            formData.append(this.props.uploadKey, file);
        });

        return formData;
    }


    render() {
        const { className, uploadKey, ...others } = this.props;
        const cls = classNames({
            [className]: className
        });

        const { fileName, isSelectedFile } = this.state;

        const uploadProps = {
            beforeUpload: this.beforeUpload,
            accept: `application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`, // 自定义上传的文件类型
            // name: '', //  name为后台接受的参数
            showUploadList: false,// 是否显示上传列表
            multiple: false, // 是否多文件上传
        };

        return (
            <div className={`upload_wrap ${cls}`} {...others}>
                <Upload {...uploadProps}>
                    <div className="upload_wrap">
                        <i className={`myexcle_img ${isSelectedFile ? '' : 'myexcle_img_opacity'}`}></i>
                    </div>
                    <div className="upload_wrap">
                        <span className="file_name">{fileName}</span>
                    </div>
                    <div className="upload_wrap">
                        <Button>
                            {isSelectedFile ? '重新选择' : '选择文件'}
                        </Button>
                    </div>
                </Upload>
            </div>
        );
    }
}
