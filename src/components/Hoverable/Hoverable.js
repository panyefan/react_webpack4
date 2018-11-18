import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './Hoverable.styl';

/**
 * 为组件添加阴影效果
 */
export default class Hoverable extends React.Component {
    static propTypes = {
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);
        this.state = {
            hoverFalg: false
        };
    }

    handleMouseOver = () => {
        this.setState({
            hoverFalg: true
        });
        this.props.handleMouseOver ? this.props.handleMouseOver() : null;
    }
    handleMouseLeave = () => {
        this.setState({
            hoverFalg: false
        });
        this.props.handleMouseLeave ? this.props.handleMouseLeave() : null;
    }

    render() {
        const { className, handleMouseOver, handleMouseLeave, ...others } = this.props;
        const { hoverFalg } = this.state;
        const cls = classNames({
            [className]: className
        });

        return <div className={cls} {...others}
            className={hoverFalg ? 'card_hover' : 'card_not_hover'}
            onMouseOver={this.handleMouseOver}
            onMouseLeave={this.handleMouseLeave}
        >{this.props.children}</div>
    }
}