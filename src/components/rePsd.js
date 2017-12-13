'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory } from 'react-router';
import { Modal, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
var appBasePath = globalData.appBasePath;
var Repsd = React.createClass({
    getInitialState: function () {
        return {
            isLoading: false
        }
    },
    vauleChange: function (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    },
    savePsd: function () {

        var that = this;
        let oldPsd = that.state.oldPsd;
        let newPsd = that.state.newPsd;
        let surePsd = that.state.surePsd;
        var userId = localStorage.getItem("userId");
        // var toast = new Toast();
        if (oldPsd && newPsd && surePsd) {
            if (newPsd !== surePsd) {
                Toast.info("两次密码不一致", 2);
            } else if (newPsd == oldPsd) {
                Toast.info("新密码不能与近期用过密码相同", 2);
            } else {
                that.setState({ isLoading: true })
                api.updatePsd(newPsd, oldPsd, function (res) {
                    //console.log(res);
                    if (res.code == "0000") {
                        that.setState({ isLoading: false })
                        Toast.info("修改成功,请重新登录", 2);
                        localStorage.removeItem("user");
                        localStorage.removeItem("isLogin");
                        globalData.user = "";
                        globalData.requestData.token = "";
                        var path = {
                            pathname: '/Login/Mine',
                        }
                        hashHistory.push(path);
                    } else if (res.code == "5555") {
                        that.setState({ isLoading: false })
                        Toast.info("登录过时，请重新登录", 2);
                        var path = {
                            pathname: '/Login',
                        }
                        hashHistory.push(path);
                    } else {
                        that.setState({ isLoading: false })
                        Toast.info(res.msg, 2);
                    }
                    // window.history.back();

                }, function () {
                    that.setState({ isLoading: false })
                    Toast.info("连接错误", 2);
                })

            }
        } else {
            Toast.info("输入不能为空", 2);
        }


    },
    render: function () {
        var that = this;
        return (
            <div className="setPsd app_Box">
                <Header title="修改密码" />
                <Loading flag={that.state.isLoading} />
                <div className="setPsdCon">
                    <div className="inputPsd">
                        <label htmlFor="oldPsd">请输入旧密码</label>
                        <input id="oldPsd" type="password" name="oldPsd" placeholder="" onChange={that.vauleChange} />
                    </div>
                    <div className="inputPsd">
                        <label htmlFor="psd">请输入新密码</label>
                        <input id="psd" type="password" name="newPsd" placeholder="" onChange={that.vauleChange} />
                    </div>
                    <div className="inputPsd">
                        <label htmlFor="surePsd">请确认新密码</label>
                        <input id="surePsd" type="password" name="surePsd" placeholder="" onChange={that.vauleChange} />
                    </div>
                    <div className="psdLogin" onClick={that.savePsd}>保存</div>
                </div>
            </div>
        )
    }

});


export default Repsd;


