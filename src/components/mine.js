'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import {hashHistory,Link} from 'react-router';
import Footer from './footer';
import Set from './set';
import Login from './login';
import '../css/mine.css';

var appBasePath=globalData.appBasePath;
var Mine=React.createClass({
	getInitialState:function(){
		return {
			activeTab: 1,
			isShow: false,
			activeIndex:2
			//dataStatus: 0
		}
	},
	
	componentDidMount:function(){  
	    //console.log(this.props.location.query.price);
	},
	componentWillMount:function(){
		var that=this;
		var user=localStorage.getItem("user");
		if(user){//已登陆
			var userObj=JSON.parse(user);
			that.setState({
				user:userObj
			})
			
		}else{
			that.setState({
				user:{
					certLevel:"",
					headPic:"",
					idCard:"",
					located:"",
					phone:"",
					realName:"",
					token:"",
					userId:"",
					userName:"未登录",
				}
			})
		}
	
	},
	
	goLogin:function(){
		var isLogin=localStorage.getItem("isLogin");
		if(isLogin){
			var path = {
			  pathname:'/UserInfo',
			  //query:data,
			}
			hashHistory.push(path);
		}else{
			var path = {
			  pathname:'/Login/Mine',
			  //query:data,
			}
			hashHistory.push(path);
		}
	},
	toSave:function(){
		var path = {
		  pathname:'/Save',
		  //query:data,
		}
		hashHistory.push(path);
	},
	toOrder:function(){
		var path = {
		  pathname:'/Order',
		}
		hashHistory.push(path);
	},
	toHelp:function(){
		var path = {
		  pathname:'/Help',
		}
		hashHistory.push(path);
	},
	toIdCard:function(){
		var path = {
		  pathname:'/IdCard',
		}
		hashHistory.push(path);
	},
	toPersonalLevel:function(){
		var path = {
		  pathname:'/PersonalLevel',
		}
		hashHistory.push(path);
	},
	imgError:function(e){
		e.target.src="src/img/icon/header.png"; 
		e.target.onerror=null; //控制不要一直跳动 
	},
	render:function(){
		var that=this;
		var userObj=that.state.user;
        return (
        	<div className="app_Box mine">
	        	<div className="mineContent content">
		        	<div className="userHeader" onClick={that.goLogin}>
		        		<div className="userImg"><img src={userObj.headPic} onError={that.imgError}/></div>
		        		<div className="userInfo"><p>{userObj.userName}</p><span>{userObj.idCard==""?"未认证":"已认证"}</span></div>
		        		<div className="goLogin"><img src="src/img/icon/go.png"/></div>
		        	</div>
		        	<div className="creditLevel"><p>我的信用等级:<b>{userObj.certLevel}</b></p><span>去提升,5000轻松拿<img src="src/img/icon/right.png"/></span></div>
		        <div className="userOrder">
		        		<ul>
		        			<li onClick={that.toOrder}><img src="src/img/icon/order.png"/><p>全部订单</p></li>
		        			<li onClick={that.toPersonalLevel}><img src="src/img/icon/personLevel.png"/><p>个人资质</p></li>
		        			<li onClick={that.toIdCard}><img src="src/img/icon/id.png"/><p>身份证认证</p></li>
		        		</ul>
		        		<ul>
		        			<li onClick={that.toSave}><img src="src/img/icon/sc.png"/><p>我的收藏</p></li>
		        			<li onClick={that.toHelp}><img src="src/img/icon/bz.png"/><p>帮助与反馈</p></li>
		        		</ul>
		        		<div className="toSet"><Link to="/Set">设置</Link></div>
		        	</div>
				</div>
	        	<Footer activeIndex="2"/>
        	</div>
        )
	},
	componentDidUpdate:function(){
		
	}
});


export default Mine;


