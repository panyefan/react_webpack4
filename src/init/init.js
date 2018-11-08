import React, { Component } from 'react';

import './init.styl';

class Init extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    render() {
        return (
            <div>
                <div style={{ display: (this.props.location.pathname).charAt(this.props.location.pathname.length - 1) == '/' ? 'none' : 'block' }}>
                    <div key={this.props.location.pathname}>
                        {/*各子页面内容 start*/}
                        {this.props.children}
                        {/*各子页面内容 end*/}
                    </div>
                </div>
            </div>

        )
    }
}
export default Init;
