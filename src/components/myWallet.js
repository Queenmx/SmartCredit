'use strict';
// import React, { Component } from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import { Toast } from 'antd-mobile';
import '../css/home.css';
import LocaleProvider from 'antd-mobile/lib/locale-provider/locale-provider';


var appBasePath = globalData.appBasePath;


var ListDetail = React.createClass({
    getInitialState: function () {
        return {
            percent: 50,
            approvalState: '',
        }
    },

    componentWillMount: function () {
        var key1 = globalData.key;
        var that = this;
        var user = localStorage.getItem("user");
        var userId = JSON.parse(localStorage.getItem("user")).userId;
        var userName = JSON.parse(localStorage.getItem("user")).userName;
        var approvalState = this.state.approvalState
        if (user) {
            this.setState({
                isLogin: true,
            })
        } else {
            this.setState({
                isLogin: false,
            })
        }
        api.myWallet(userName, userId, function (res) {
            if (res.code == "0000") {
                let Decdata = strDec(res.data, key1, "", "");
                let data = JSON.parse(Decdata);
                console.log(data.detaileds)
                var walletArr = [];
                that.setState({
                    balance: data.balance
                })
                localStorage.setItem("blance", data.balance);
                var item="";
                if (data.detaileds.length) {
                    for (var i in data.detaileds) {
                        if (data.detaileds[i].approvalState == 0) {
                            // data.detaileds[i].approvalState = '审核中'
                            item="审核中"
                        }
                        if (data.detaileds[i].approvalState == 1) {
                            // data.detaileds[i].approvalState = '成功'
                            item="成功"
                        }
                        if (data.detaileds[i].approvalState == -1) {
                            // data.detaileds[i].approvalState = '审核拒绝'
                            item="审核拒绝"
                        }
                        var money = data.detaileds[i].changeMoney;
                        if (money > 0) {
                            money = "+" + money
                        }
                        walletArr.push(
                            <ul className="infolist" key={i}>
                                <li>
                                    <div>
                                        <p className={money > 0 ? "blue" : "red"}>{money}</p>
                                        <p>{data.detaileds[i].source}</p>
                                        {/* <p>{data.detaileds[i].source}</p> */}
                                    </div>
                                    <div>
                                        <p>{item}</p>
                                        <p>{data.detaileds[i].addTime}</p>
                                    </div>
                                </li>
                            </ul>
                        )

                    }

                } else {
                    walletArr.push(
                        <p key="adf">暂无记录</p>
                    )
                }
                that.setState({
                    walletArr: walletArr
                })
            }
        })
    },
    getTask() {
        if (localStorage.getItem("blance") <= 0) {
            Toast.info("囊中羞涩，努力完成任务，争取做个有钱人再来！", 2);
        } else {
            var path = {
                pathname: "/Getmoney",
                query: { balance: this.state.balance }
            };
            hashHistory.push(path);
        }

    },



    //字符串转换为时间戳

    getDateDiff: function (dateStr) {
        if (dateStr) {
            var publishTime = dateStr / 1000,
                d_seconds,
                d_minutes,
                d_hours,
                d_days,
                timeNow = parseInt(new Date().getTime() / 1000),
                d,

                date = new Date(publishTime * 1000),
                Y = date.getFullYear(),
                M = date.getMonth() + 1,
                D = date.getDate(),
                H = date.getHours(),
                m = date.getMinutes(),
                s = date.getSeconds();
            //小于10的在前面补0
            if (M < 10) {
                M = '0' + M;
            }
            if (D < 10) {
                D = '0' + D;
            }
            if (H < 10) {
                H = '0' + H;
            }
            if (m < 10) {
                m = '0' + m;
            }
            if (s < 10) {
                s = '0' + s;
            }

            d = timeNow - publishTime;
            d_days = parseInt(d / 86400);
            d_hours = parseInt(d / 3600);
            d_minutes = parseInt(d / 60);
            d_seconds = parseInt(d);
            return Y + '-' + M + '-' + D + ' ' + H + ':' + m;
        } else {
            return ""
        }
    },


    componentDidMount: function () {

    },




    logoError: function (event) {
        event.target.src = "src/img/icon/capitalLogo.jpg";
        event.target.onerror = null; //控制不要一直跳动 
        //console.log(event.target.src);
    },
    add() {
        let p = this.state.percent + 10;
        if (this.state.percent >= 100) {
            p = 0;
        }
        this.setState({ percent: p });
    },


    formateMoney: function (money) {
        if (money % 100 === 0) {
            return (money / 100)
        } else {
            return (money / 100.0).toFixed(2)
        }
    },
    render: function () {
        var that = this;
        const percent = this.state.percent;
        return (
            <div className="app_Box mywallet">
                <div>
                    <Header title="我的钱包" />
                    <div className="time">
                        <p>{that.state.balance != "" ? that.state.balance : "0"}</p>
                        <p>账户余额<span></span>(元)</p>
                    </div>
                    <p className="account">账户明细</p>
                </div>
                
                <div className="listDetailCon content">
                    <Loading flag={that.state.flag} />
                    
                    
                    <div id="detail">
                        {that.state.walletArr}
                    </div>



                </div>
                <div className="footer">
                    <div className="applyBtn" onClick={this.getTask}>申请提现</div>
                </div>
            </div>
        )
    }
});


export default ListDetail;

