'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import '../sass/submitResult.scss';
var key1 = globalData.key;
var toast = globalData.toast;
var SubmitResult = React.createClass({
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
            <div className="app_Box submitResult">
                <Header title="提交结果" />
                <Loading flag={that.state.flag} />
                <div className="main">
                    <div className="img-wrap">
                        <img src="src/img/icon/success.png" />
                    </div>
                    <p className="hit">提交成功</p>
                    <div className="btn-group">
                        <p className="btn blue">查看订单</p>
                        <p className="btn grey">返回首页</p>
                    </div>
                </div>
            </div>
        )
    }

});


export default SubmitResult;


