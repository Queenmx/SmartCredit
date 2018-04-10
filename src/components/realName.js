'use strict';
// import React from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory } from 'react-router';
import {  Toast } from 'antd-mobile';
var RealName = React.createClass({
    getInitialState: function () {
        return {
        }
    },
    vauleChange: function (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    },
    componentWillMount: function () {
        var userStr = globalData.user;
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
            this.setState({ located: located, user: user, realName: realName });
        }

    },
    saveName: function () {
        var that = this;
        that.setState({
            flag: true
        })
        let user = that.state.user;
        let realName = that.state.realName;
        // var toast = globalData.toast;
        if (realName) {
            api.edit(user.idCard, that.state.located, realName, function (res) {
                //console.log(res);
                if (res.code == "0000") {
                    that.setState({
                        flag: false
                    })
                    user.realName = realName;
                    user.located = that.state.located;
                    //var userObj = { realName: realName, located: user.located, idCard: user.idCard, certLevel: user.certLevel, phone: user.phone, userName: user.userName, token: user.token, headPic: user.headPic, userId: user.userId }
                    localStorage.setItem("user", JSON.stringify(user));
                    globalData.user = JSON.stringify(user);
                    Toast.info("保存成功", 2);
                    //window.history.back();
                    history.go(-1);
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
                    Toast.info(res.msg, 2)
                }
            });
        } else {
            that.setState({
                flag: false
            })
            Toast.info("请输入真实姓名", 2);
        }

    },
    render: function () {
        var that = this;
        return (
            <div className="setPsd app_Box">
                <Header title="修改姓名" />
                <Loading flag={that.state.flag} />
                <div className="setPsdCon">
                    <div className="realName">
                        <label htmlFor="realName">请输入真实姓名</label>
                        <input id="realName" type="text" name="realName" value={that.state.realName} placeholder="" onChange={that.vauleChange} />
                    </div>

                    <div className="psdLogin" onClick={that.saveName}>保存</div>
                </div>
            </div>
        )
    }

});


export default RealName;


