'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import { hashHistory,Link} from 'react-router';

var Set=React.createClass({
	getInitialState:function(){
		return {
			
		}
	},
	
	quitLogin:function(){
		var that=this;
		/*let path = {
		  pathname:'/mine'
		}
		hashHistory.push(path);*/
		window.history.back();
		
	},
	clearCache:function(){
		var toast=new Toast();
		toast.show("清空缓存成功",2000);
	},
	aboutUs:function(){
		 let path = {
	             pathname:"/txt",   
	             state:{title: '关于我们'}    
	         } 
	         hashHistory.push(path);
	},
	render:function(){
		var that=this;
       return (
        	<div className="userInfo app_Box">
        		<Header title="设置" />
        		<div className="userInfoCon">
        			<ul className="setLi">
        				<li onClick={that.clearCache}><span>清空缓存</span><div className="infoRight"><img src="src/img/icon/right.png"/></div></li>
        				<li onClick={that.aboutUs}><span>关于智能贷</span><div className="infoRight"><img src="src/img/icon/right.png"/></div></li>
        			</ul>
    				<div className="quit" onClick={that.quitLogin}>退出当前帐号</div>
        		</div>
        	</div>
        )
	}
	
});
export default Set;




