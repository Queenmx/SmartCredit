'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Loading from './loading';
import Header from './header';
import { hashHistory, Link } from 'react-router';
import {  Toast } from 'antd-mobile';
import '../css/apply.css';

// var toast = new Toast();
var appBasePath = globalData.appBasePath;
var ApplyInfo = React.createClass({
    getInitialState: function () {
        return {
            flag: false,
            applyName: "",
            applyNumber: ""
        }
    },

    componentWillMount: function () {
        //console.log(globalData.user)
        var userStr = localStorage.getItem("user");
        //console.log(userStr);
        if (!userStr) {
            var path = {
                pathname: '/Login',
            }
            hashHistory.push(path);
        } else {
            var user = JSON.parse(userStr);//必须登录才能看到本页面
            var located = localStorage.getItem("dingwei") || "";
            var { realName, phone, idCard } = user;
            this.setState({ applyName: realName, applyNumber: phone, realName: realName, located: located, user: user });
        }

    },
    toApplyLevel: function () {
        var key1 = globalData.key;
        // var toast = globalData.toast;
        var that = this;
        var loanId = that.props.location.state.loanId;
        var applyQuery = that.props.location.state.applyQuery;
        var { realName, applyName, applyNumber, located, user } = that.state;
        //console.log(that.state);
        if (applyName.length > 0) {
            if (realName == "" || realName == null) {//修改名字
                api.edit(user.idCard, located, applyName, function (res) {
                    //console.log(res);
                    //console.log(applyName);
                    if (res.code == "0000") {
                        //修改信息成功
                        //console.log(applyName)
                        user.realName = applyName;
                        //var userObj = { realName: realName, located: located, idCard: user.idCard, certLevel: user.certLevel, phone: user.phone, userName: user.userName, token: user.token, headPic: user.headPic, userId: user.userId }
                        localStorage.setItem("user", JSON.stringify(user));
                        globalData.user = JSON.stringify(user);
                    } else if (res.code == "5555") {
                        // Toast.info("登录过时，请重新登录", 2);
                        Toast.info('登录过时，请重新登录', 2);
                        var path = {
                            pathname: '/Login',
                        }
                        hashHistory.push(path);
                    } else {
                        // Toast.info(res.msg, 2);
                        Toast.info(res.msg, 2);
                    }
                }, function () {
                    // Toast.info("连接错误", 2);
                    Toast.info("连接错误", 2);
                })
            }
            var queryData = { applyNumber: applyNumber, applyName: applyName, loanId: loanId, applyQuery: applyQuery };
            that.setState({
                flag: false
            })
            var path = {
                pathname: '/ApplyLevel',
                state: queryData,
            }
            hashHistory.push(path);


            /*        //获取资质列表
                    api.qualifyList(loanId, "095c2c011ef740508bf27785e0ffe8f1", function (res) {
                        //console.log(res);
                        that.setState({
                            flag: true
                        })
                        if (res.code == "0000") {
                            var data = JSON.parse(strDec(res.data, key1, "", ""));
                            //var qualifyList=data.qualifyList;
                            ////console.log(data);
                            var queryData = { applyNumber: applyNumber, applyName: applyName, loanId: loanId, applyQuery: applyQuery, qualifyList: data };
                            that.setState({
                                flag: false
                            })
                            var path = {
                                pathname: '/ApplyLevel',
                                state: queryData,
                            }
                            hashHistory.push(path);
                        } else if (res.code == "5555") {
                            that.setState({
                                flag: false
                            })
                            Toast.info("登录过时，请重新登录", 2);
                            var path = {
                                pathname: '/Login',
                            }
                            hashHistory.push(path);
                        } else {
                            that.setState({
                                flag: false
                            })
                            Toast.info(res.msg, 2);
                        }
                    }, function () {
                        that.setState({
                            flag: false
                        })
                        Toast.info("连接错误", 2);
                    })*/
        } else {
            // Toast.info("请输入姓名", 2);
            Toast.info("请输入姓名", 2);
        }




    },


    toBack: function () {
        const backRouter = this.props.backRouter;
        if (backRouter) {
            hashHistory.push(backRouter);
        } else {
            window.history.back()
        }
    },
    applyNumberHandle: function () {
    },
    applyNameHandle: function (event) {

        if (this.state.realName) {
            //console.log("you")
        } else {
            this.setState({
                applyName: event.target.value
            })
        }

    },
    render: function () {
        var that = this;
        //console.log("cityId",cityId);

        return (
            <div className="app_Box applyFlow">
                <div className="header">
                    <div className="toBack" onClick={that.toBack}><img src="src/img/icon/backWhite.png" /></div>
                    <p className="title">申请人信息</p>
                    <div className="headerLinkBtn"></div>
                </div>
                <div className="applyInfoCon content">
                    <ul className="stepBox">
                        <li>
                            <h1 className="stepActive">1</h1>
                            <p>申请人信息</p>
                        </li>
                        <span></span>
                        <li>
                            <h1>2</h1>
                            <p>申请人资质</p>
                        </li>
                        <span></span>
                        <li>
                            <h1>3</h1>
                            <p>申请结果</p>
                        </li>
                    </ul>
                    <Loading flag={that.state.flag} />
                    <form className="applyInfo">
                        <div>
                            <span>姓名</span>
                            <input type="text" id="applyName" onChange={that.applyNameHandle} value={that.state.applyName} placeholder="请输入姓名" />
                        </div>
                        <div>
                            <span>手机号</span>
                            <input type="text" id="applyNumber" onChange={that.applyNumberHandle} value={that.state.applyNumber} placeholder="请输入手机号" />
                        </div>
                    </form>
                </div>
                <div className="botBtn footer" onClick={that.toApplyLevel}>下一步</div>
            </div>
        )


    }
});

var oHeight = $(document).height(); //屏幕当前的高度
$(window).resize(function () {
    if ($(document).height() < oHeight) {
        $(".footer").css("display", "none");
    } else {
        $(".footer").css("display", "block");
    }
});
export default ApplyInfo;


