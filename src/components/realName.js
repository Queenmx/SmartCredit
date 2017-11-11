'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import { hashHistory } from 'react-router';

var appBasePath = globalData.appBasePath;
const user = localStorage.getItem("user");
var RealName = React.createClass({
    getInitialState: function () {
        return {
        }
    },
    vauleChange: function (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    },
    saveName: function () {

        // var userObj = JSON.parse(user);
        // console.log(111);
        var that = this;
        let realName = that.state.realName;
        var toast = new Toast();
        if (realName) {
            api.edit(user.idCard, user.located, realName, function (res) {
                console.log(token)
                // console.log(res);
                if (res.code == "0000") {
                    var userObj = { realName: realName, located: located, idCard: user.idCard, certLevel: user.certLevel, phone: user.phone, userName: user.userName, token: user.token, headPic: user.headPic, userId: user.userId }
                    localStorage.setItem("user", JSON.stringify(userObj));
                    toast.show("保存成功", 2000);
                    window.history.back();
                } else {
                    toast.show(res.msg, 2000)
                }
            });
        } else {
            toast.show("请输入真实姓名", 2000);
        }

    },
    render: function () {
        var that = this;
        return (
            <div className="setPsd app_Box">
                <Header title="修改姓名" />
                <div className="setPsdCon">
                    <div className="realName">
                        <label htmlFor="realName">请输入真实姓名</label>
                        {/* <input id="realName" type="text" name="realName" placeholder="" onChange={that.vauleChange} /> */}
                    </div>

                    {/* <div className="psdLogin" onClick={that.saveName}>保存</div> */}
                </div>
            </div>
        )
    }

});


export default RealName;


