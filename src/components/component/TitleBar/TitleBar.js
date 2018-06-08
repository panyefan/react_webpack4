import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import './TitleBar.styl';

export default class TitleBar extends React.Component{
    render(){
        const {title,...other}=this.props;
        return(
            <div className="titlebar">
                <div className="title">{title}</div>
                <div className="content">{this.props.children}</div>
            </div>
        )
    }

}
