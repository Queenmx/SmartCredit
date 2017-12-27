'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import ProgressStep from './ProgressStep';
import '../sass/progressDetail.scss';
import {  Toast } from 'antd-mobile';
// var appBasePath = globalData.appBasePath;
var imgPath = globalData.imgPath;
var ProgressDetail = React.createClass({
    getInitialState: function () {
        return {
            activeTab: 1,
            isShow: false,
            activeIndex: 0,
            steps: {},
            list: [],
            flag: true
        }
    },
    componentDidMount: function () {
        var key1 = globalData.key;
        // var toast = globalData.toast;
        var that = this;
        api.processDetail(that.props.location.state.progressItem.applyId, function (res) {
            if (res.code == "0000") {
                that.setState({
                    flag: false
                })
                var data = JSON.parse(strDec(res.data, key1, "", ""));
                //console.log(data);
                var flow = {}
                var type = data.type; //KSD快速贷 JZD精准贷
                if (type === 'KSD') {
                    flow = {
                        DEAL: { default: '贷款申请', Y: '贷款申请', N: '贷款申请' },
                        APPR: { default: '贷款审查', Y: '贷款审查', N: '审核不通过' },
                        SIGN: { default: '绑卡签约', Y: '绑卡签约', N: '绑卡签约' },
                        LOAN: { default: '等待放款', Y: '放款成功', N: '放款失败' }
                    }
                } else if (type === 'JZD') {
                    if (data.apiWay === 'H5') {
                        flow = {
                            DEAL: { default: '提交资料', Y: '提交资料', N: '提交资料' },
                            APPR: { default: '转第三方审核', Y: '转第三方审核', N: '转第三方审核' },
                        }
                    } else if (data.apiWay === 'TEL') {
                        flow = {
                            DEAL: { default: '提交资料', Y: '提交资料', N: '提交资料' },
                            APPR: { default: '贷款审查', Y: '贷款审查', N: '审核不通过' }
                        }
                    }
                }
                var obj = {}
                var arr = []
                var i = 0, y = 0
                for (var key in flow) {
                    if (y === 0) {
                        obj.text = flow.DEAL.default
                        obj.time = data.addTime.time
                    }
                    else if (i < data.logList.length) {
                        obj.text = flow[data.logList[i].type][data.logList[i].opinion]
                        obj.time = data.logList[i].addTime.time
                        i++
                    } else {
                        obj.text = flow[key].default
                        obj.time = ''
                    }
                    arr[y] = obj
                    obj = {}
                    y++
                }
                if (type === 'JZD' && data.apiWay === 'TEL') {
                    if (data.logList.length>0&&data.logList[i - 1].opinion === 'N') {
                        obj.time = ''
                    } else {
                        obj.time = arr[y - 1].time
                    }
                    obj.text = '门店服务'
                    arr[y] = obj
                    obj = {}
                }

                that.setState({
                    list: arr,
                    steps: flow
                })

            } else {
                that.setState({
                    flag: false
                })
                Toast.info("连接错误", 2);
            }
        }, function () {
            that.setState({
                flag: false
            })
            Toast.info("连接错误", 2);
        })
    },
    render: function () {
        var that = this;
        var progressItem = that.props.location.state.progressItem;
        var theDate = progressItem.limitType;
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
          var theDateRate =progressItem.rateType;
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
        return (
            <div className="app_Box progressDetail">
                <Header title='借款进度' />
                <div className="capitalBox">
                    <div className="capitalList">
                        <h3>
                            <img src={imgPath + progressItem.logo} onError={that.logoError} />
                            <span>{progressItem.loanName}</span>
                        </h3>
                        <div className="capitalInfo">
                            <div className="limit">
                                <h2>{progressItem.moneyMin}~{progressItem.moneyMax}</h2>
                                <p>额度范围(元)</p>
                            </div>
                            <ul className="special">
                                <li>{progressItem.loanTime}</li>
                                <li>{theDateRateTxt}利率{progressItem.rate}%</li>
                                <li>贷款期限{progressItem.limitMin}-{progressItem.limitMax}{theDateTxt}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="step-wrap">
                    <ProgressStep steps={that.state.list} />
                </div>
                <Loading flag={that.state.flag} />
            </div>
        )
    }
});


export default ProgressDetail;


