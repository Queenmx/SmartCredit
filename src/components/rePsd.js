'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import { hashHistory } from 'react-router';

var appBasePath = globalData.appBasePath;
var Repsd = React.createClass({
    getInitialState: function () {
        return {

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
        var toast = new Toast();
        if (oldPsd && newPsd && surePsd) {
            if (newPsd !== surePsd) {
                toast.show("两次密码不一致");
            } else {
				/*let path = {
				  pathname:'/UserInfo'
				}
				hashHistory.push(path);*/
                api.userInfo(newPsd, oldPsd, userId, function (res) {
                    console.log(res);
                    // window.history.back();
                    toast.show("修改成功", 2000);
                })

            }
        } else {
            toast.show("输入不能为空", 2000);
        }


    },
    render: function () {
        var that = this;
        return (
            <div className="setPsd app_Box">
                <Header title="修改密码" />
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


