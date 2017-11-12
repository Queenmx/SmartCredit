'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';

var Set = React.createClass({
    getInitialState: function () {
        return {
			isLoading:false
        }
    },

    quitLogin: function () {
    	var that=this;
    	that.setState({isLoading:true})
        api.exit(function (res) {
        	console.log(res);
            if (res.code == "0000") {
            	that.setState({isLoading:false})
            	localStorage.removeItem("user");
            	localStorage.removeItem("isLogin");
            	localStorage.removeItem("phoneNum");
                 window.history.back();
            }else{
            	that.setState({isLoading:false})
            	toast.show(res.msg,2000);
            }
        },function(){
        	that.setState({isLoading:false})
			toast.show("连接错误",2000);
		})

    },
    clearCache: function () {
        let toast = globalData.toast;
        this.timer=setTimeout( function(){toast.show("清空缓存成功", 2000)},500)
    },
    aboutUs: function () {
        let path = {
            pathname: "/txt",
            state: { title: '关于我们' }
        }
        hashHistory.push(path);
    },
    render: function () {
        var that = this;
        return (
            <div className="userInfo app_Box">
                <Header title="设置" />
                <Loading flag={that.state.isLoading}/>
                <div className="userInfoCon">
                    <ul className="setLi">
                        <li onClick={that.clearCache}><span>清空缓存</span><div className="infoRight"><img src="src/img/icon/right.png" /></div></li>
                        <li onClick={that.aboutUs}><span>关于智能贷</span><div className="infoRight"><img src="src/img/icon/right.png" /></div></li>
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




