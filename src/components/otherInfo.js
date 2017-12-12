'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import '../sass/otherInfo.scss';
var key1 = globalData.key;
var toast = globalData.toast;
var OtherInfo = React.createClass({
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
            <div className="app_Box otherInfo">
                <Header title="其他信息认证" />
                <Loading flag={that.state.flag} />
                <div className="wrap hit">恭喜，您已满足放款要求，完成补充信息立即领取贷款！</div>
                <ul className="list">
                    <li className="item">
                        <lable>公司名称</lable>
                        <div className="input-wrap"><input placeholder="请输入内容" /></div>
                    </li>
                    <li className="item">
                        <lable>公司地址</lable>
                        <div className="input-wrap"><input placeholder="请选择区域" /></div>
                    </li>
                    <li className="item">
                        <lable>公司地址</lable>
                        <div className="input-wrap"><input placeholder="详细地址" /></div>
                    </li>
                </ul>
                <ul className="list">
                    <li className="item">
                        <lable>直属联系人关系</lable>
                        {/* <div className="input-wrap"><input placeholder="请选择" /></div> */}
                        <div className="input-wrap"><span className="input">请选择</span></div>
                    </li>
                    <li className="item">
                        <lable>直系亲属姓名</lable>
                        <div className="input-wrap"><input placeholder="请输入内容" /></div>
                    </li>
                    <li className="item">
                        <lable>直系亲属联系方式</lable>
                        <div className="input-wrap"><input placeholder="请输入内容" /></div>
                    </li>
                </ul>
                <div className="footer-btn">完成申请</div>
            </div>
        )
    }

});


export default OtherInfo;


