'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import { Toast } from 'antd-mobile';
import '../sass/loanFeedback.scss';
var key1 = globalData.key;
// var toast = globalData.toast;
var IdCard = React.createClass({
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
        var that = this;
        return (
            <div className="app_Box loanFeedback">
                <Header title="芝麻信用" />
                <Loading flag={that.state.flag} />
                <div className="main">
                    <div className="logo">
                        <img src="src/img/icon/logo-zm.png" />
                    </div>
                    <p className="logo-text">芝麻信用</p>

                    <div className="hit">将使用您提交的资料，在线验证芝麻信用分</div>
                    <div className="agree">
                        <p>
                            <img className="icon" src="src/img/icon/check.png" /><span>我已阅读并同意</span></p>
                        <p className="contract">服务条款</p>
                    </div>
                </div>
                <div className="footer-btn">开始授权</div>
            </div>
        )
    }

});


export default IdCard;


