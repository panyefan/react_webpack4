import React from 'react';
import {CompanyDetail, CompanyAddEdit} from '../../components/Company/index';

import './index.styl';

export default class Index extends React.Component {
    static defaultProps = {
    };
    static propTypes = {
    };
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <CompanyDetail></CompanyDetail>
                {/* <CompanyAddEdit></CompanyAddEdit> */}
            </div>
        )
    }

}
