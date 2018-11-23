import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DatePicker } from 'antd';

import './CommomRangePicker.less';

/**
 * 开始和结束时间组件
 */
const { RangePicker } = DatePicker;
export default class CommomRangePicker extends React.Component {
    static propTypes = {
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }

    onChange = (value, str) => {
        this.props.onChangeCallBack ? this.props.onChangeCallBack([
            value[0] ? moment(value[0].format('YYYY-MM-DD 00:00:00')).valueOf() : '',
            value[1] ? moment(value[1].format('YYYY-MM-DD 23:59:59')).valueOf() : '',
        ]) : null
    }
    disabledDate = (current) => {
        // 不能选择未来时间
        return current && current > moment().endOf('day');
    }

    range = (start, end) => {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    render() {
        const { className, onChangeCallBack, ...others } = this.props;
        const cls = classNames({
            [className]: className
        });

        return (
            <div className={cls} {...others}>
                <RangePicker
                    size={{ width: '224px' }}
                    disabledDate={this.disabledDate}
                    onChange={this.onChange}
                    showTime={false}
                    format="YYYY-MM-DD"
                />
            </div>
        );
    }
}
