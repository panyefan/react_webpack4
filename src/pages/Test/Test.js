import React from 'react';
import Marquee from '../../components/Marquee/index'
import { inject } from 'mobx-react';
import './Test.styl';

// 引用mobx里面的变量和方法
@inject('providerListStore')
export default class Test extends React.Component {
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
                <Marquee/>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复</p>
                <div>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</div>
                <div>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</div>
                <div>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</div>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</p>
                <p>房间卡收到货发科技收到货福建省大黄蜂就开始打发就开始打回访就开始打单刀赴会阿圣诞节卡回复卡史蒂芬霍金喀什发哈圣诞节卡回复，麻烦审单，麻烦把你送到发送到会尽快发货三大发速度快解放哈圣诞节开发哈四大皆空粉红色的金卡挂号费和国防生的价格和圣诞节卡挂号费反倒是发过火四大皆空粉红色的金卡复活收到货房间卡收到货房间卡收到货范德萨</p>
            </div>
        )
    }

}