'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';


var appBasePath=globalData.appBasePath;
var ApplyLevel=React.createClass({
	getInitialState:function(){
		return {
		}
	},
	
	componentWillMount:function(){
		
	},
	toBack:function(){
		const backRouter = this.props.backRouter;
        if (backRouter) {
            hashHistory.push(backRouter);
        } else {
            window.history.back()
        }
	},
	toApplyResult:function(){
		var data = {id:3,name:"qin",age:18};
		var path = {
		  pathname:'/ApplyResult',
		  state:data,
		}
		hashHistory.push(path);
	},
	
	
	render:function(){
		var that=this;
		//console.log("cityId",cityId);
        return (
        	<div className="app_Box applyFlow">
      			<div className="header">
	        		<div className="toBack" onClick={that.toBack}><img src="src/img/icon/back.png"/></div>
		        	<p className="title">申请人资质</p>
		        	<div className="headerLinkBtn"></div>
	        	</div>
	        	<div className="applyLevelCon content">
					<ul className="stepBox">
						<li>
							<h1 >1</h1>
							<p>申请人信息</p>
						</li>
						<span></span>
						<li>
							<h1 className="stepActive">2</h1>
							<p>申请人资质</p>
						</li>
						<span></span>
						<li>
							<h1>3</h1>
							<p>申请结果</p>
						</li>
					</ul>
					<form className="applyLevel">
						<div>
							<span>姓名</span>
							<input type="text" placeholder="请输入姓名"/>
						</div>
						<div>
							<span>手机号</span>
							<input type="text" value="" placeholder="请输入手机号"/>
						</div>
					</form>
	        	</div>	
	        	<div className="botBtn" onClick={that.toApplyResult}>下一步</div>
        	</div>
        )
	}
});


export default ApplyLevel;


