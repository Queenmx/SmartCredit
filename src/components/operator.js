'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import {  Toast } from 'antd-mobile';
import '../sass/operator.scss';
var key1 = globalData.key;
// var toast = globalData.toast;
var Operator = React.createClass({
    getInitialState: function () {
        return {
            flag: false
        }
    },
    componentWillMount: function () {
        var user = globalData.user;
        var userObj = JSON.parse(user);
        this.setState({
            userObj: userObj,
            certStatus: userObj.certStatus,
            backPic: userObj.backPic,
            frontPic: userObj.frontPic
        })

    },
    componentDidMount: function () {

    },
    render: function () {
        var imgPath = globalData.imgPath;
        console.log(this.state);
        var that = this;
        return (
            <div className="app_Box operator">
                <Header title="运营商认证" />
                <Loading flag={that.state.flag} />
                <ul className="list">
                    <li className="item">
                        <lable>手机号码</lable>
                        <div className="input-wrap"><input placeholder="请输入手机号码" /></div>
                    </li>
                    <li className="item">
                        <lable>运营商服务密码</lable>
                        <div className="input-wrap"><input placeholder="请输入运营商服务密码" /></div>
                    </li>
                </ul>
                <p className="link">忘记密码</p>
                <div className="footer-btn">提交</div>
            </div>
        )
    }

});


export default Operator;


