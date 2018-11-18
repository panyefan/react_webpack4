import React from 'react';
import { inject } from 'mobx-react';
import './Dices.styl';

// 引用mobx里面的变量和方法
@inject('providerListStore')
export default class Dices extends React.Component {
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
        const store = this.props.providerListStore;
        // 调用mobx定义的方法
        store.showTotalRecord();
        // 调用mobx定义的变量值
        console.log(store.providerList.toJS());
    }

    componentWillUnmount() {

    }


    render() {
        return (
            <div className="dices_wrapper">
                测试mobx
            </div>
        )
    }

}
