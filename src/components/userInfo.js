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
	
	
	
	render:function(){
		var that=this;
        return (
        	<div className="app_Box userInfo">
        		<Header title="个人信息" />
        		<ul className="userInfoCon">
    				<li><img src=""/><div className="infoRight"><img src="src/img/icon/right.png"/></div></li>
    				<li><span>手机号</span><div className="infoRight"><b>135****9763</b><img src="src/img/icon/right.png"/></div></li>
    				<li><span>修改密码</span><div className="infoRight"><img src="src/img/icon/right.png"/></div></li>
    				<li><span>身份信息</span><div className="infoRight"><b>未验证/**君</b><img src="src/img/icon/right.png"/></div></li>
    				<li><span>工作信息</span><div className="infoRight"><img src="src/img/icon/right.png"/></div></li>
    				<li><span>人际关系</span><div className="infoRight"><img src="src/img/icon/right.png"/></div></li>
    				<li><span>关于我们</span><div className="infoRight"><img src="src/img/icon/right.png"/></div></li>
        		</ul>
        		<div className="quit">退出系统</div>
        	</div>
        )
	}
	
});


export default UserInfo;


