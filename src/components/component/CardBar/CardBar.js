import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import './CardBar.styl';

export default class CardBar extends React.Component{
    render(){
        const {title,text,...other}=this.props;
        return(
            <div className="cardbar">
                <div className="cardbar-img">
                    <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>
                </div>
                <div className="cardbar-content">
                    <span className="cardbar-title">{title}</span>
                    <p>{text}</p>
                </div>
            </div>
        )
    }

}
