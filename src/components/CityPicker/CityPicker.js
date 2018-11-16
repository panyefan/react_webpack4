import React, { Component } from 'react';
import classNames from 'classnames';
import './CityPicker.css';
import PropTypes from 'prop-types';
import { Select } from '../../../components/hsReact/Form/index';

export default class CityPicker extends React.Component {
    static defaultProps = {
        width: 140,
        showItem: 3,
        disable: false
    }
    static propTypes = {
        width: PropTypes.number,
        onPickerChange: PropTypes.func,
        defaultValue: PropTypes.array,
        showItem: PropTypes.number,
        disable: PropTypes.boolean
    }
    constructor(props) {
        super(props);

        this.state = {
            cityData: [],                //城市总数据
            defaultValue: [],            //自定义已选项

            provinceText: undefined,     //省份文字
            provinceValue: -1,           //省份值 -1表示初始状态 未作选择

            cityText: undefined,         //城市文字
            cityValue: -1,               //城市值

            countyText: undefined,      //区域文字
            countyValue: -1             //区域值
        }
    }

    componentWillMount() {
        this.setState({
            city: this.cityOption(),
            county: this.countyOption()
        })
    }

    componentWillReceiveProps(nexProps) {
        let defaultProvinceText = undefined;
        let defaultProvinceValue = -1;
        let defaultCityText = undefined;
        let defaultCityValue = -1;
        let defaultCountyText = undefined;
        let defaultCountyValue = -1;

        //只在自定义初始值为空时才设置
        if ((nexProps.defaultValue && this.state.defaultValue.length == 0) || (nexProps.defaultValue != this.props.defaultValue)) {
            if (nexProps.defaultValue[0] && nexProps.defaultValue[0] != -1 && nexProps.data[nexProps.defaultValue[0]]) {
                defaultProvinceText = nexProps.data[nexProps.defaultValue[0]].text;
                defaultProvinceValue = nexProps.data[nexProps.defaultValue[0]].value;
            }
            if (nexProps.defaultValue[0] && nexProps.defaultValue[0] != -1 && nexProps.defaultValue[1] && nexProps.defaultValue[1] != -1) {
                // defaultCityText=nexProps.data[nexProps.defaultValue[0]].city[nexProps.defaultValue[1]].text;
                // defaultCityValue=nexProps.data[nexProps.defaultValue[0]].city[nexProps.defaultValue[1]].value;

                if (nexProps.data[nexProps.defaultValue[0]] && nexProps.data[nexProps.defaultValue[0]].city[nexProps.defaultValue[1]]) {
                    defaultCityText = nexProps.data[nexProps.defaultValue[0]].city[nexProps.defaultValue[1]].text;
                    defaultCityValue = nexProps.data[nexProps.defaultValue[0]].city[nexProps.defaultValue[1]].value;
                }
            }
            if (nexProps.defaultValue[0] && nexProps.defaultValue[0] != -1 && nexProps.defaultValue[1] && nexProps.defaultValue[1] != -1 && nexProps.defaultValue[2]) {
                // defaultCountyText=nexProps.data[nexProps.defaultValue[0]].city[nexProps.defaultValue[1]].area[nexProps.defaultValue[2]].text;
                // defaultCountyValue=nexProps.data[nexProps.defaultValue[0]].city[nexProps.defaultValue[1]].area[nexProps.defaultValue[2]].value;

                if (nexProps.data[nexProps.defaultValue[0]] && nexProps.data[nexProps.defaultValue[0]].city[nexProps.defaultValue[1]] && nexProps.data[nexProps.defaultValue[0]].city[nexProps.defaultValue[1]].area[nexProps.defaultValue[2]]) {
                    defaultCountyText = nexProps.data[nexProps.defaultValue[0]].city[nexProps.defaultValue[1]].area[nexProps.defaultValue[2]].text;
                    defaultCountyValue = nexProps.data[nexProps.defaultValue[0]].city[nexProps.defaultValue[1]].area[nexProps.defaultValue[2]].value;
                }
            }

            this.setState({
                provinceText: defaultProvinceText,             //省份文字
                provinceValue: defaultProvinceValue,           //省份值 -1表示初始状态 未作选择
                cityText: defaultCityText,                     //城市文字
                cityValue: defaultCityValue,                   //城市值
                countyText: defaultCountyText,                 //区域文字
                countyValue: defaultCountyValue,               //区域值
                defaultValue: nexProps.defaultValue ? nexProps.defaultValue : null,
            })
        }

        this.setState({
            cityData: nexProps.data,
        })
    }

    provinceOption = () => {
        let province = [];
        let temp = this.state.cityData;
        let keys = Object.keys(temp);
        keys.sort();
        for (let k of keys) {
            province.push({ text: temp[k]['text'], value: temp[k]['value'] })
        }
        province.unshift({ text: '请选择省份', value: -1 });
        //检测是否有默认已选
        if (this.state.defaultValue && this.state.defaultValue.length > 0) {
            let defaultProvince = this.state.defaultValue[0];
            if (!this.state.cityData[defaultProvince]) {
                defaultProvince = -1;
            }
            return (<Select ref="provinceSelect" onChange={this.provinceChange} width={this.props.width} data={province} defaultValue={defaultProvince} disable={this.props.disable} />);
        }
        else {
            return (<Select ref="provinceSelect" onChange={this.provinceChange} width={this.props.width} data={province} disable={this.props.disable} />);
        }

    }
    provinceChange = (data) => {
        this.setState(
            {
                provinceText: data.text,
                provinceValue: data.value,

                cityText: undefined,         //城市文字
                cityValue: -1,               //城市值

                countyText: undefined,      //区域文字
                countyValue: -1             //区域值
            },
            function () {
                this.props.showItem > 1 && this.resetPickerCity();
                this.props.showItem == 3 && this.resetPickerCounty();
                this.sendCurrentSelectData();
            }
        )

        // this.props.showItem>1 && this.resetPickerCity();
        // this.props.showItem==3 && this.resetPickerCounty();
    }

    cityOption = () => {
        let city = [];
        if (this.state.provinceValue == -1) {
            return (<Select ref="citySelect" onChange={this.cityChange} width={this.props.width} data={[{ text: '请选择城市', value: -1 }]} disable={this.props.disable} />)
        }
        else {
            let cityList = this.state.cityData[this.state.provinceValue].city;
            for (let index in cityList) {
                city.push({ text: cityList[index]['text'], value: cityList[index]['value'] });
            }
            city.unshift({ text: '请选择城市', value: -1 });
            return (<Select ref="citySelect" onChange={this.cityChange} width={this.props.width} data={city} defaultValue={this.state.cityValue} disable={this.props.disable} />);
        }
    }
    cityChange = (data) => {
        this.setState(
            {
                cityValue: data.value,
                cityText: data.text,
                countyText: undefined,      //区域文字
                countyValue: -1             //区域值
            },
            function () {
                this.props.showItem == 3 && this.resetPickerCounty();
                this.sendCurrentSelectData();
            }
        )
    }

    countyOption = () => {
        let county = [];
        //检测是否已有默认所选
        if (this.state.provinceValue == -1 || this.state.cityValue == -1) {
            return (<Select ref="countySelect" onChange={this.countyChange} width={this.props.width} data={[{ text: '请选择区域', value: -1 }]} disable={this.props.disable} />);
        }
        else {
            let countyList = this.state.cityData[this.state.provinceValue].city[this.state.cityValue].area;
            for (let index in countyList) {
                county.push({ text: countyList[index]['text'], value: countyList[index]['value'] })
            }
            county.unshift({ text: '请选择区域', value: -1 });
            return (<Select ref="countySelect" onChange={this.countyChange} width={this.props.width} data={county} defaultValue={this.state.countyValue} disable={this.props.disable} />);
        }
    }
    countyChange = (data) => {
        this.setState(
            {
                countyValue: data.value,
                countyText: data.text
            },
            function () {
                // parseInt(data.value)!=-1?this.sendCurrentSelectData():null
                this.sendCurrentSelectData();
            }
        );
    }

    //发送用户选择的数据
    sendCurrentSelectData = () => {
        const { provinceIndex, provinceText, provinceValue, cityIndex, cityText, cityValue, countyIndex, countyText, countyValue } = this.state;
        let userSelet = {
            //provinceIndex:provinceIndex,
            provinceText: provinceText,
            provinceValue: provinceValue,
            //cityIndex:cityIndex,
            cityText: cityText,
            cityValue: cityValue,
            //countyIndex:countyIndex,
            countyText: countyText,
            countyValue: countyValue
        };
        this.props.onPickerChange ? this.props.onPickerChange(userSelet) : null;
    }

    //重置省份选择栏
    resetPickerProvidence = () => {
        this.setState({
            provinceValue: -1,
            provinceText: undefined
        });
        this.refs.provinceSelect.reset();
    }
    //重置城市选择栏
    resetPickerCity = () => {
        this.setState({
            cityValue: -1,
            cityText: undefined
        });
        this.refs.citySelect.reset();
    }
    //重置区域选择栏
    resetPickerCounty = () => {
        this.setState({
            countyValue: -1,
            countyText: undefined
        });
        this.refs.countySelect.reset();
    }

    resetCityPicker = () => {
        this.resetPickerProvidence();
        this.props.showItem > 1 && this.resetPickerCity();
        this.props.showItem == 3 && this.resetPickerCounty();
    }

    render() {
        const { className, width, onPickerChange, data, defaultValue, showItem, ...others } = this.props;
        const cls = classNames({
            'hs_citypicker': true,
            [className]: className
        });

        return (
            <div className={cls} {...others}>
                <span>
                    {this.provinceOption()}
                </span>
                {
                    showItem > 1 &&
                    <span>{this.cityOption()}</span>
                }

                {
                    showItem == 3 &&
                    <span>{this.countyOption()}</span>
                }

            </div>

        )
    }
}
