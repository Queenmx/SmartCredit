'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory } from 'react-router';
import { Modal, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
var RealName = React.createClass({
    getInitialState: function () {
        return {
            flag: false
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
            this.setState({ located: located, user: user });
        }

    },
    saveId: function () {
        var that = this;
        that.setState({
            flag: true
        })
        var idCartReg = /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/;
        var user = that.state.user;
        let idCard = that.state.idCard;
        var toast = globalData.toast;
        // console.log(idCard);
        if (idCartReg.test(idCard)) {
            api.edit(idCard, that.state.located, user.realName, function (res) {
                //  console.log(res);
                if (res.code == "0000") {
                    user.idCard = idCard;
                    user.located = that.state.located;
                    //var userObj = { realName: user.realName, located:that.state.located, idCard: idCard, certLevel: user.certLevel, phone: user.phone, userName: user.userName, token: globalData.requestData.token, headPic: user.headPic, userId: globalData.userId }
                    localStorage.setItem("user", JSON.stringify(user));
                    globalData.user = JSON.stringify(user);
                    //  console.log(user);
                    that.setState({
                        flag: false
                    })
                    Toast.info("保存成功", 2);
                    window.history.back();
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
            Toast.info("请输入正确的身份证号", 2);
        }

    },
    render: function () {
        var that = this;
        return (
            <div className="setPsd app_Box">
                <Header title="身份证号码" />
                <Loading flag={that.state.flag} />
                <div className="setPsdCon">
                    <div className="realName">
                        <label htmlFor="realName">请输入身份证号码</label>
                        <input id="realName" type="number" name="idCard" placeholder="" onChange={that.vauleChange} />
                    </div>

                    <div className="psdLogin" onClick={that.saveId}>保存</div>
                </div>
            </div>
        )
    }

});


export default RealName;


