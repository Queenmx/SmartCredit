'use strict';
// import React from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import '../sass/submitResult.scss';
import { Modal, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import { Icon } from 'antd-mobile';
var key1 = globalData.key;
// var toast = globalData.toast;
var SubmitResult = React.createClass({
    getInitialState: function () {
        return {
            flag: false
        }
    },
    componentWillMount: function () {
    },
    saveResult: function () {
        var that = this
        var ret = that.props.location.state.ret
        var resobj = {};
        //console.log(ret)
        var btns
        if (ret.code === '0000') {
            resobj.text = '提交成功'
            resobj.icon = 'check-circle-o'
            btns = <div className="btn-group">
                <p className="btn blue" onClick={that.goOrderDetail}>查看订单</p>
                <p className="btn grey" onClick={that.goHome}>返回首页</p>
            </div>
        } else {
            resobj.text = ret.msg
            resobj.icon = 'cross-circle'
            btns = <div className="btn-group">
                <p className="btn blue" onClick={that.goHome}>返回首页</p>
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
        //console.log(that.props.location.state.ret)
        var retObj=JSON.parse(strDec(that.props.location.state.ret.data, key1, "", ""));
        var applyId = retObj.applyId
        // var applyId = 'a86cfe9120434ce4a98e598bfba7c2ea'
        //console.log(applyId)
        var path = {
            pathname: '/OrderDetail',
            query: { applyId: applyId }
        }
        hashHistory.push(path);
    },
    componentDidMount: function () {

    },
    render: function () {
        var imgPath = globalData.imgPath;
        var that = this;
        var btns
        return (
            <div className="app_Box submitResult">
                <Header title="提交结果" />
                <Loading flag={that.state.flag} />
                <div className="main">
                    {that.saveResult()}
                </div>
            </div>
        )
    }

});


export default SubmitResult;


