'use strict';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
// import Cropper from 'react-cropper';

var toast = globalData.toast;
var UserInfo = React.createClass({
    getInitialState: function () {
        return {
            flag: false
        }
    },
    componentWillMount: function () {
        //console.log(globalData.user);
        var userStr = globalData.user;
        ////console.log(userStr);
        if (!userStr) {
            var path = {
                pathname: '/Login',
            }
            hashHistory.push(path);
        } else {
            var user = JSON.parse(userStr);//必须登录才能看到本页面
            var located = localStorage.getItem("dingwei") || "";
            var { realName, phone, idCard, headPic } = user;
            this.setState({ headPic: headPic, realName: realName, phone: phone, located: located, user: user, idCard: idCard });
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
    	var key1 = globalData.key;
    	var that=this;
        var $c = document.querySelector(c),
            $d = document.querySelector(d),
           myfile = $c.files[0];
            if(myfile){
            	that.setState({
	                flag: true
	            })
            new html5ImgCompress(myfile, {
		        before: function(myfile) {
		          //console.log('单张: 压缩前...');
		        },
		        done: function (myfile, base64) {
		         // console.log('单张: 压缩成功...');
		          //toast.show("单张: 压缩成功...",1000)
		          that.setState({
	                    headerPic: base64
	                },function(){
	                	 // $d.setAttribute("src", e.target.result);
		                api.userHead(that.state.headerPic, function (res) {
		                    //console.log(res);
		                    if (res.code == "0000") {
		                        that.setState({
		                            flag: false
		                        })
		                        var data = JSON.parse(strDec(res.data, key1, "", ""));
		                        //console.log(data);
		                        var user = that.state.user;
		                        user.headPic = data.headPicPath;
		                        that.setState({headPic:data.headPicPath});
		                        globalData.user = JSON.stringify(user);
		                        localStorage.setItem("user", JSON.stringify(user));
		                        //console.log(user);
		                        toast.show("头像设置成功", 2000);
		                    } else if (res.code == "5555") {
		                        that.setState({
		                            flag: false
		                        })
		                        toast.show("登录过时，请重新登录", 2000);
		                        var path = {
		                            pathname: '/Login',
		                        }
		                        hashHistory.push(path);
		                    } else {
		                        that.setState({
		                            flag: false
		                        })
		                        toast.show(res.msg, 2000)
		                    }
		                }, function () {
		                    that.setState({
		                        flag: false
		                    })
		                    toast.show("连接错误", 2000)
		                })
	                })
		        },
		        fail: function(myfile) {
		        //toast.show('单张: 压缩失败...');
		        },
		        complete: function(myfile) {
		          //console.log('单张: 压缩完成...');
		          //console.log(that.state)
		        },
		        notSupport: function(myfile) {
		          alert('浏览器不支持！');
		        }
		      });
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
    idNumber: function () {
        var path = {
            pathname: '/IdNumber'
        }
        hashHistory.push(path);
    },
    logoError: function (event) {
        event.target.src = "src/img/icon/tx.png";
        event.target.onerror = null; //控制不要一直跳动 
        //console.log(event.target.src);
    },
    render: function () {
        var that = this;
        var imgPath=globalData.imgPath;
        return (
            <div className="app_Box userInfo">
                <Header title="个人信息" />
                <Loading flag={that.state.flag} />
                <ul className="userInfoCon">
                   <li>
                        <input id="head" type="file" onChange={that.userHead.bind(this, "#head", "#headImg")} accept="image/*" />
                        <img id="headImg" src={imgPath+that.state.headPic} onError={that.logoError} /><div className="infoRight"><img src="src/img/icon/right.png" /></div></li>
                    <li><span>手机号</span><div className="infoRight"><b>{`${that.state.phone}`.replace(/^(\d{3})\d{4}(\d+)/, "$1****$2")}</b></div></li>
                    <li onClick={that.rePsd}><span>修改密码</span><div className="infoRight"><img src="src/img/icon/right.png" /></div></li>
                    <li onClick={that.realName}><span>真实姓名</span><div className="infoRight"><b>{that.state.realName}</b><img src="src/img/icon/right.png" /></div></li>
                    <li onClick={that.idNumber}><span>身份证号码</span><div className="infoRight"><b>{that.state.idCard == "" ? "未验证" : "待审核"}</b><img src="src/img/icon/right.png" /></div></li>
                    {/*<li className="userInfoLi"><span>关于我们</span><div className="infoRight"><img src="src/img/icon/right.png"/></div></li>*/}
                </ul>

            </div>
        )
    }

});


export default UserInfo;


