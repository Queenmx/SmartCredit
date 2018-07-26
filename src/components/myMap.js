// import React from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import { hashHistory } from 'react-router';
import '../css/map.css';
import { Toast } from 'antd-mobile';
var MyMap = React.createClass({
    getInitialState: function () {
        return {
            address: localStorage.getItem('dingwei') || "无法定位到当前城市",
            user: JSON.parse(localStorage.getItem('users')),
            shop_id: 40
        }
    },
    scrollToAnchor: function (anchorName) {
        if (anchorName) {
            // 找到锚点
            let anchorElement = document.getElementById(anchorName);
            // 如果对应id的锚点存在，就跳转到锚点
            if (anchorElement) { anchorElement.scrollIntoView(); }
        }
    },
    componentWillMount: function () {
    },

    render: function () {
        return (
            <div className="map app_Box">
                <Header title="城市选择" />
                <div className="mapCon" id="mapCon">
                    <div className="currentAddressBox">
                        <p className="greyTitle">当前定位城市</p>
                        <div className="currentAddress sendCityId" onClick={this.selectCity}>
                            <span className="location-icon" style={{backgroundImage:"url('src/img/icon/home-icon1.png')"}}></span>
                            <span>{this.state.address}</span>                        
                        </div>
                    </div>
                    <div className="hotAddressBox">
                        <p className="greyTitle">热门城市</p>
                        <ul className="hotAddress">{this.state.hotCityHtml}</ul>
                    </div>

                    <ul className="cityList">
                        {this.state.li_arr}
                    </ul>
                    <div className="rightLetter">
                        <ul className="louti">
                            {this.state.ziMuArr}
                        </ul>
                    </div>
                </div>

            </div>
        )
    },
    selectCity: function (e) {
        const cityId = e.target.innerHTML;
        hashHistory.push({
            pathname: '/',
            query: {
                cityId: cityId,
            }
        })
    },
    componentDidMount: function () {
        var key1 = globalData.key;
        // var toast = globalData.toast;
        var that = this;
        var li_arr = [];//循环的li
        var ziMuArr = [];
        var hotCityHtml = [];
        api.getCityList(function (res) {
            if (res.code == "0000") {
                var data = JSON.parse(strDec(res.data, key1, "", ""));
                var list = data.list;
                for (var i in list) {
                    var div_arr = [];//循环的站点名称
                    var div_zim = list[i].ziMu;//字母
                    var nameList = list[i].name.split(",");
                    for (var j in nameList) {
                        div_arr.push(<div className="each_main_1 sendCityId" key={'main_1' + j} onClick={that.selectCity}>{nameList[j]}</div>);
                    }
                    li_arr.push(<li key={i}>
                        <div className="greyTitle" id={i} key={i}>{div_zim}</div>
                        <div className="each_main sendCityId" >
                            {div_arr}
                        </div>
                    </li>);
                    //ziMuArr.push(<li key={i}><a onClick={()=>that.scrollToAnchor({i})}>{div_zim}</a></li>)	;
                    ziMuArr.push(<li key={i}><a onClick={that.scrollToAnchor.bind(that, i)}>{div_zim}</a></li>);
                }
                that.setState({
                    li_arr: li_arr,
                    ziMuArr: ziMuArr
                });
            } else {
                Toast.info(res.msg, 2);
            }
        }, function () {
            Toast.info("连接错误", 2);
        });
        api.getHotCity(function (res) {
            if (res.code == "0000") {
                var data = JSON.parse(strDec(res.data, key1, "", ""));
                var hotCity = data.list;
                for (var i in hotCity) {
                    hotCityHtml.push(<li className="hotCityLi sendCityId" onClick={that.selectCity} key={i}>{hotCity[i].name}</li>)
                }
                that.setState({
                    hotCityHtml: hotCityHtml
                });
            } else {
                Toast.info(res.msg, 2);
            }
        }, function () {
            Toast.info("连接错误", 2);
        });
    }
});
export default MyMap;

