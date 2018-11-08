import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Marquee.styl';

export default class DicesEle extends React.Component {
    static propTypes = {
        text: PropTypes.string,
    };

    static defaultProps = {
        text: "跑马灯文字",
    };

    constructor(props) {
        super(props);
        this.marqueeWrap = '';
        this.marqueeText = '';

        // 是否重置、还是开始动画
        this.marqueeTimeoutNo = 0;
        this.marqueeTimeout = '';
        // 跑马灯显示区域宽度
        this.marqueeWrapW = 0;
        // 文字宽度
        this.marqueeTextW = 0;
        this.state = {
            marqueeStyle: {} // 设置跑马灯文字样式
        };
    }

    componentDidMount() {
        this.initMarquee();
    }

    componentWillUnmount() {
        this.marqueeTimeout && clearTimeout(this.marqueeTimeout);
    }

    initMarquee = () => {
        this.marqueeWrap = this.refs.marqueeWrap;
        this.marqueeText = this.refs.marqueeText;
        // 跑马灯显示区域宽度
        this.marqueeWrapW = this.marqueeWrap.offsetWidth;
        // 文字宽度
        this.marqueeTextW = this.marqueeText.offsetWidth;

        // 初始化文字位置
        this.marqueeText.style.left = this.marqueeWrapW + 'px';
        this.beginAnimation();
    }

    loopAnimation = () => {
        let that = this;
        this.marqueeTimeout && clearTimeout(this.marqueeTimeout);
        
        this.marqueeTimeout = setTimeout(() => {
            if(that.marqueeTimeoutNo==0){
                that.resetAnimation();
                that.marqueeTimeoutNo = 1;
            }else{
                that.beginAnimation();
                that.marqueeTimeoutNo = 0
            }
        }, 10000);
    }
    
    // 开始跑马灯动画
    beginAnimation = () => {
        let marqueeStyle = {
            transform: `translateX(${-(this.marqueeWrapW + this.marqueeTextW)}px)`,
            transition: "all 10s linear",
        };
        this.setState({
            marqueeStyle: marqueeStyle
        });

        this.loopAnimation();
    }
    // 重置跑马灯动画
    resetAnimation = () => {
        this.setState({
            marqueeStyle: {}
        });

        this.loopAnimation();
    }

    render() {
        const { text, className, ...others } = this.props;
        const cls = classNames({
            [className]: className
        });

        return (
            <div className={"marquee_wrap " + cls} {...others} ref="marqueeWrap">
                <div className="marquee_text" ref="marqueeText" style={this.state.marqueeStyle}>{text}</div>
            </div>
        );
    }
}
