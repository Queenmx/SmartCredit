'use strict';
// import React from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import { Toast } from 'antd-mobile';
// var toast = globalData.toast;
var Set = React.createClass({
    getInitialState: function () {
        return {
            isLoading: false
        }
    },

    quitLogin: function () {
        var that = this;
        that.setState({ isLoading: true })
        var user = localStorage.getItem("user");
        if (user) {
            api.exit(function (res) {
                //console.log(res);
                if (res.code == "0000") {
                    that.setState({ isLoading: false })
                    localStorage.removeItem("user");
                    localStorage.removeItem("isLogin");
                    localStorage.removeItem("phoneNum");
                    localStorage.removeItem("curCity");
                    globalData.user = "",
                        globalData.requestData.token = "",
                        //window.history.back();
                        history.go(-1);
                } else {
                    that.setState({ isLoading: false })
                    Toast.info(res.msg, 2);
                }
            }, function () {
                that.setState({ isLoading: false })
                Toast.info("连接错误", 2);
            })
        } else {
            that.setState({ isLoading: false })
            Toast.info("当前未登录", 2);
        }


    },
    clearCache: function () {

        localStorage.removeItem("curCity");
        sessionStorage.clear();
        this.timer = setTimeout(function () { Toast.info("清空缓存成功", 2) }, 500)
    },
    aboutUs: function () {
        let path = {
            pathname: "/txt",
            state: { title: '关于我们', fromId: 1 }
        }
        hashHistory.push(path);
    },
    render: function () {
        var that = this;
        return (
            <div className="userInfo app_Box">
                <Header title="设置" />
                <Loading flag={that.state.isLoading} />
                <div className="userInfoCon">
                    <ul className="setLi">
                        <li onClick={that.clearCache}><span>清空缓存</span><div className="infoRight"><img src="src/img/icon/right.png" /></div></li>
                        <li onClick={that.aboutUs}><span>关于万融汇</span><div className="infoRight"><img src="src/img/icon/right.png" /></div></li>
                    </ul>
                    <div className="quit" onClick={that.quitLogin}>退出当前帐号</div>
                </div>
            </div>
        )
    },
    componentWillUnmount() {
        clearInterval(this.timer);
    }
});
export default Set;



