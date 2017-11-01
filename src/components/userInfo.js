'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';

var appBasePath=globalData.appBasePath;
var UserInfo=React.createClass({
	getInitialState:function(){
		return {
			
		}
	},
	finishID:function(){
		var data = {};
		var path = {
		  pathname:'/Mine',
		  state:data,
		}
		hashHistory.push(path);
	},
	
	rePsd:function(){
		var path = {
		  pathname:'/RePsd',
		}
		hashHistory.push(path);
	},
	realName:function(){
		var path = {
		  pathname:'/RealName',
		}
		hashHistory.push(path);
	},
	render:function(){
		var that=this;
        return (
        	<div className="app_Box userInfo">
        		<Header title="个人信息" />
        		<ul className="userInfoCon">
    				<li><img src="src/img/icon/tx.png"/><div className="infoRight"><img src="src/img/icon/right.png"/></div></li>
    				<li><span>手机号</span><div className="infoRight"><b>135****9763</b></div></li>
    				<li onClick={that.rePsd}><span>修改密码</span><div className="infoRight"><img src="src/img/icon/right.png"/></div></li>
    				<li onClick={that.realName}><span>真实姓名</span><div className="infoRight"><img src="src/img/icon/right.png"/></div></li>
    				<li><span>身份证号码</span><div className="infoRight"><b>未验证/**君</b><img src="src/img/icon/right.png"/></div></li>
    				{/*<li className="userInfoLi"><span>关于我们</span><div className="infoRight"><img src="src/img/icon/right.png"/></div></li>*/}
        		</ul>
        		
        	</div>
        )
	}
	
});


export default UserInfo;


