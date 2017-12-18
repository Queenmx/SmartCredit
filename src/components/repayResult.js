'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import { Icon, Toast } from 'antd-mobile';
var key1 = globalData.key;
// var toast = globalData.toast;
var repayResult = React.createClass({
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
    saveResult: function () {
        var that = this
        var status = that.props.location.query.status
        var failReason = that.props.location.query.fail_reason
        var resobj = {}
        var btns
        if (status === '200') {
            resobj.text = '还款成功'
            resobj.icon = 'check-circle-o'
            btns = <div className="btn-group">
                <p className="btn blue" onClick={that.goOrderDetail}>查看订单</p>
                <p className="btn grey" onClick={that.goHome}>返回首页</p>
            </div>
        } else {
            resobj.text = failReason
            resobj.icon = 'cross-circle'
            btns = <div className="btn-group">
                <p className="btn blue" onClick={that.goOrderDetail}>查看订单</p>
                <p className="btn grey" onClick={that.goHome}>返回首页</p>
            </div>
        }
        return <div className="main">
            <div className="img-wrap">
                <Icon type={resobj.icon} size="lg" color="#53a6ff" />
            </div>
            <p className="hit">{resobj.text}</p>
            {btns}
        </div>
    },
    goHome: function () {
        var path = {
            pathname: '/'
        }
        hashHistory.push(path);
    },
    goOrderDetail: function () {
        var that = this
        var orderId = that.props.location.query.order_sn;
        console.log(orderId);
        var key1 = globalData.key;
        var path = {
            pathname: '/OrderDetail',
            query: { applyId: that.props.location.query.order_sn }
        }
        hashHistory.push(path);

    },
    componentDidMount: function () {
    },
    render: function () {
        var imgPath = globalData.imgPath;
        var that = this;
        var ret = that.props.location.query.status
        var btns
        return (
            <div className="app_Box submitResult">
                <Header title="还款结果" />
                <Loading flag={that.state.flag} />
                <div className="main">
                    {that.saveResult()}
                </div>
            </div>
        )
    }

});


export default repayResult;


