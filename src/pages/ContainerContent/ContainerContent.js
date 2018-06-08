import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import './ContainerContent.styl';

export default class ContainerContent extends React.Component{
    static defaultProps={
    };
    static propTypes={
    };
    constructor(props){
        super(props);
        this.state={
        }
    }
    componentDidMount(){
        this.setState({
        });

    }
    render(){
        const {...others}=this.props;
        return(
            <div>
                {this.props.children}
            </div>
        )
    }

}
