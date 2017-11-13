'use strict';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';
// import Cropper from 'react-cropper';

var appBasePath = globalData.appBasePath;
var UserInfo = React.createClass({
    getInitialState: function () {
        return {

        }
    },
    finishID: function () {
        var data = {};
        var path = {
            pathname: '/Mine',
            state: data,
        }
        hashHistory.push(path);
    },
    userHead: function (c, d) {
        var $c = document.querySelector(c),
            $d = document.querySelector(d),
            file = $c.files[0],
            reader = new FileReader();
        // if (file) {
        //     reader.readAsDataURL(file);
        // }
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            if (reader.error) {
                console.log(reader.error);
            } else {
                $d.setAttribute("src", e.target.result);
                api.userHead(e.target.result, function (res) {
                    if (res.code == "0000") {
                        toast.show("头像设置成功", 2000);
                    }
                })
                console.log(e.target.result);
            }

        }
    },
    rePsd: function () {
        var path = {
            pathname: '/RePsd',
        }
        hashHistory.push(path);
    },
    realName: function () {
        var path = {
            pathname: '/RealName',
        }
        hashHistory.push(path);
    },
    render: function () {
        var that = this;
        return (
            <div className="app_Box userInfo">
                <Header title="个人信息" />
                <ul className="userInfoCon">
                    <li>
                        <input id="head" type="file" onChange={that.userHead.bind(this, "#head", "#headImg")} accept="image/*" />
                        <img id="headImg" src="src/img/icon/tx.png" /><div className="infoRight"><img src="src/img/icon/right.png" /></div></li>
                    <li><span>手机号</span><div className="infoRight"><b>135****9763</b></div></li>
                    <li onClick={that.rePsd}><span>修改密码</span><div className="infoRight"><img src="src/img/icon/right.png" /></div></li>
                    <li onClick={that.realName}><span>真实姓名</span><div className="infoRight"><img src="src/img/icon/right.png" /></div></li>
                    <li><span>身份证号码</span><div className="infoRight"><b>未验证/**君</b><img src="src/img/icon/right.png" /></div></li>
                    {/*<li className="userInfoLi"><span>关于我们</span><div className="infoRight"><img src="src/img/icon/right.png"/></div></li>*/}
                </ul>

            </div>
        )
    }

});


export default UserInfo;


