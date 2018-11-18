import React from 'react';
import { CompanyDetail, CompanyAddEdit } from '../../components/Company/index';

import './index.styl';

export default class Index extends React.Component {
    static defaultProps = {
    };
    static propTypes = {
    };
    constructor(props) {
        super(props);
        this.state = {
            toggerShowArr: [true, false],
            stepNum: "0", // 默认显示第一个步骤
        }
    }
    componentDidMount() {

    }

    onCompanyAddEdit = (num) => {
        let toggerShowArr = this.state.toggerShowArr;
        toggerShowArr[0] = false;
        toggerShowArr[1] = true;
        this.setState({
            toggerShowArr: toggerShowArr,
            stepNum: num,
        });
    }

    onSubmitCompanyAddEdit = () => {
        let toggerShowArr = this.state.toggerShowArr;
        toggerShowArr[0] = true;
        toggerShowArr[1] = false;
        this.setState({ toggerShowArr });
    }

    render() {
        const { toggerShowArr, stepNum } = this.state;
        return (
            <div>
                {
                    toggerShowArr[0] &&
                    <CompanyDetail onCompanyAddEdit={this.onCompanyAddEdit}></CompanyDetail>
                }
                {
                    toggerShowArr[1] &&
                    <CompanyAddEdit stepNum={stepNum} onSubmit={this.onSubmitCompanyAddEdit}></CompanyAddEdit>
                }
            </div>
        )
    }

}
