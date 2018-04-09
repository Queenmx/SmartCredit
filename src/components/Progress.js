'use strict';
// import React from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import '../sass/progress.scss';
import Processlist from './processList';
import { Toast } from 'antd-mobile';
var imgPath = globalData.imgPath;
var Progress = React.createClass({
    getInitialState: function () {
        return {
            isLoading: false,
            pageNum: 1,
            pageSize: 10,
            list: []
        }
    },

    componentWillMount: function () {
    },

    logoError: function (event) {
        event.target.src = "src/img/icon/logo.png";
        event.target.onerror = null; //控制不要一直跳动 
        //console.log(event.target.src);
    },
    toProgressDetail: function (progressItem, event) {
        const data = { progressItem: progressItem };
        const path = {
            pathname: '/ProgressDetail',
            state: data
        }
        hashHistory.push(path);
    },
    componentDidMount: function () {
        var key1 = globalData.key;
        // var toast = globalData.toast;
        var that = this;
        api.progressList(that.state.pageNum, that.state.pageSize, function (res) {
            if (res.code == "0000") {
                var data = JSON.parse(strDec(res.data, key1, "", ""));
                var progressList = data.list;
                //console.log(progressList);
                var arr = [];
                for (var i in progressList) {
                    var theDate = progressList[i].limitType;
                    var theDateTxt;
                    switch (theDate) {
                        case "Y":
                            theDateTxt = "年"
                            break;
                        case "M":
                            theDateTxt = "月"
                            break;
                        case "D":
                            theDateTxt = "日"
                            break;
                        default:
                            break;
                    }
                    var theDateRate = progressList[i].rateType;
                var theDateRateTxt;
                switch (theDateRate) {
                    case "Y":
                        theDateRateTxt = "年"
                        break;
                    case "M":
                        theDateRateTxt = "月"
                        break;
                    case "D":
                        theDateRateTxt = "日"
                        break;
                    default:
                        break;
                }
                    arr.push(<div className="capitalList" key={i} onClick={that.toProgressDetail.bind(null, progressList[i])}>
                        <h3>
                            <img src={imgPath + progressList[i].logo} onError={that.logoError} />
                            <span>{progressList[i].loanName}</span>
                        </h3>
                        <div className="capitalInfo">
                            <div className="limit">
                                <h2>{progressList[i].moneyMin}~{progressList[i].moneyMax}</h2>
                                <p>额度范围(元)</p>
                            </div>
                            <ul className="special">
                                <li>{progressList[i].loanTime}</li>
                                <li>{theDateRateTxt}利率{progressList[i].rate}%</li>
                                <li>贷款期限{progressList[i].limitMin}-{progressList[i].limitMax}{theDateTxt}</li>
                            </ul>
                            <div className="detail">
                                <a href="javascript:;">查看详情</a>
                            </div>
                        </div>

                    </div>)
                }
                if (!progressList.length) {
                    arr = '您目前没有贷款申请'
                }
                that.setState({
                    list: arr
                })

            } else {
                Toast.info("连接错误", 2);
            }
        }, function () {
            Toast.info("连接错误", 2);
        })
    },


    render: function () {
        var that = this;
        var curCity = that.props.location.query.cityId;

        return (
            <div className="app_Box progress">
                <Header title="申请进度" />
                <div className="content">
                    <Processlist />
                    {/* <div className="capitalBox">
                        {that.state.list}
                    </div> */}
                    {/* <Loading flag={that.state.isLoading} /> */}
                </div>
            </div>
        )
    }
});

export default Progress;
