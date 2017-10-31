'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';

var toast = new Toast();
var appBasePath=globalData.appBasePath;
var ApplyLevel=React.createClass({
	getInitialState:function(){
		return {
			checked:true
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
		if(!this.state.checked){
			toast.show("请同意智能贷服务协议",2000);
		}else{
			var data = {id:3,name:"qin",age:18};
			var path = {
			  pathname:'/ApplyResult',
			  state:data,
			}
			hashHistory.push(path);
		}
	},
	agreeRule:function(event){
		console.log(event.target.checked);
		this.setState({
			checked:event.target.checked
		})
	},
	
	render:function(){
		var that=this;
		//console.log("cityId",cityId);
        return (
        	<div className="app_Box applyFlow">
      			<div className="header">
	        		<div className="toBack" onClick={that.toBack}><img src="src/img/icon/backWhite.png"/></div>
		        	<p className="title">申请人资质</p>
		        	<div className="headerLinkBtn"></div>
	        	</div>
	        	<div className="applyLevelCon content">
					<ul className="stepBox">
						<li>
							<h1 className="stepActive">1</h1>
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
					<div className="applyLevel">
						<form className="applyLevelForm">
							<ul>
								<li className="levelInfo">
									<label htmlFor="job">职业身份</label>
									<input type="text" id="job" readOnly="readonly"  placeholder="请选择"/>
									<ul>
										
									</ul>
								</li>
								<li className="levelInfo">
									<label htmlFor="publicMoney">是否有本地公积金</label>
									<input type="text" id="publicMoney" readOnly="readonly" placeholder="请选择"/>
									<ul>
									</ul>
								</li>
								<li className="levelInfo">
									<label htmlFor="social">是否有本地社保</label>
									<input type="text" id="social" readOnly="readonly"  placeholder="请选择"/>
									<ul>
										
									</ul>
								</li>
								<li className="levelInfo">
									<label htmlFor="house">名下房产类型</label>
									<input type="text" id="house" readOnly="readonly"  placeholder="请选择"/>
									<ul>
									</ul>
								</li>
								<li className="levelInfo">
									<label htmlFor="car">名下是否有车</label>
									<input type="text" id="car" readOnly="readonly"  placeholder="请选择"/>
									<ul>
									</ul>
								</li>
								<li className="levelInfo">
									<label htmlFor="credit">你的信用情况</label>
									<input type="text" id="credit" readOnly="readonly"  placeholder="请选择"/>
									<ul>
									</ul>
								</li>
								<li className="levelInfo">
									<label htmlFor="age">年龄</label>
									<span>岁</span>
									<input type="text" id="age"   placeholder="请输入内容"/>
									
									<ul>
									</ul>
								</li>
								<li className="levelInfo">
									<label htmlFor="history">是否申请过捷信分期付款</label>
									<input type="text" id="history" readOnly="readonly"  placeholder="请选择"/>
									<ul>
									</ul>
								</li>
							</ul>
							
							
						</form>
					
						<div className="rule">
							<input className="magic-checkbox" type="checkbox"  id="ruleCheck" checked={that.state.checked}  onChange={that.agreeRule}/>
							<label htmlFor="ruleCheck">我已同意</label>
							<Link to={   
							         {   
							             pathname:"/txt",   
							             //hash:'#ahash',    
							             state:{title: '智能贷服务条款',backRouter:'/Login'}    
							         }   
							    } >
	    					《智能贷服务条款》
							</Link>   
							
						</div>
					</div>
	        	</div>	
	        	<div className="botBtn footer" onClick={that.toApplyResult}>下一步</div>
        	</div>
        )
	}
});


export default ApplyLevel;


