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
			ruleCheck:"on"
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
	agreeRule:function(event){
		this.setState({
			ruleCheck: event.target.value
		});
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
					<form className="applyLevel">
						<ul>
							<li className="levelInfo">
								<i>1</i>
								<label htmlFor="job">职业身份</label>
								<input type="text" id="job" placeholder="请选择"/>
								<ul>
									
								</ul>
							</li>
							<li className="levelInfo">
								<i>2</i>
								<label htmlFor="publicMoney">是否有本地公积金</label>
								<input type="text" id="publicMoney" placeholder="请选择"/>
								<ul>
								</ul>
							</li>
							<li className="levelInfo">
								<i>2</i>
								<label htmlFor="publicMoney">是否有本地社保</label>
								<input type="text" id="publicMoney" placeholder="请选择"/>
								<ul>
									
								</ul>
							</li>
							<li className="levelInfo">
								<i>2</i>
								<label htmlFor="publicMoney">名下房产类型</label>
								<input type="text" id="publicMoney" placeholder="请选择"/>
								<ul>
								</ul>
							</li>
						</ul>
						
					</form>
					
					<div className="rule">
						<input className="magic-checkbox" type="checkbox"  id="ruleCheck" checked="checked" value={that.state.ruleCheck} onChange={that.agreeRule}/>
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
	        	<div className="botBtn" onClick={that.toApplyResult}>下一步</div>
        	</div>
        )
	}
});


export default ApplyLevel;


