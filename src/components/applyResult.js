'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';


var appBasePath=globalData.appBasePath;
var ApplyResult=React.createClass({
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
	
	render:function(){
		var that=this;
		//console.log("cityId",cityId);
        return (
        	<div className="app_Box applyFlow">
      			<div className="header">
	        		<div className="toBack" onClick={that.toBack}><img src="src/img/icon/backWhite.png"/></div>
		        	<p className="title">申请结果</p>
		        	<div className="headerLinkBtn"></div>
	        	</div>
	        	<div className="applyResultCon content">
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
							<h1 className="stepActive">3</h1>
							<p>申请结果</p>
						</li>
					</ul>
					<div className="applyResult"></div>
	        	</div>	
        	</div>
        )
	}
});


export default ApplyResult;


