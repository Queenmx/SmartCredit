'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';

var appBasePath=globalData.appBasePath;
var List=React.createClass({
	getInitialState:function(){
		return {
			activeTab: 1,
			isShow: false,
			activeIndex:0
		}
	},
	
	componentWillMount:function(){
		
	},
	
	toListDetail:function(){
		var data = {id:3,name:"qin",age:18};
		var path = {
		  pathname:'/ListDetail',
		  query:data,
		}
		hashHistory.push(path);
	},
	render:function(){
		var that=this;
		var title=that.props.location.state.title;
		//console.log("cityId",cityId);
		
        return (
        	<div className="app_Box home">
      			<Header title={title}/>
	        	<div className="content">
	        		<div className="capitalBox">
	        					<div className="capitalList">
			        				<h3>
			        					<img src="src/img/icon/capitalLogo.jpg"/>
			        					<span>用钱宝</span>
			        				</h3>
			        				<div className="capitalInfo">
			        					<div className="limit">
			        						<h2>500~1000</h2>
			        						<p>额度范围(元)</p>
			        					</div>
			        					<ul className="special">
			        						<li>1小时放款</li>
			        						<li>日费率0.3%</li>
			        						<li>贷款期限7-30天</li>
			        					</ul>
			        					<div className="apply">
			        						<a href="javascript:;" onClick={that.toListDetail}>申请贷款</a>
			        					</div>
			        				</div>
			        				<div className="care">
			        					<span>老用户提额</span>
			        					该产品重复贷款暂不支持提额
			        				</div>
	        					</div>
	        					<div className="capitalList">
			        				<h3>
			        					<img src="src/img/icon/capitalLogo.jpg"/>
			        					<span>用钱宝</span>
			        				</h3>
			        				<div className="capitalInfo">
			        					<div className="limit">
			        						<h2>500~1000</h2>
			        						<p>额度范围(元)</p>
			        					</div>
			        					<ul className="special">
			        						<li>1小时放款</li>
			        						<li>日费率0.3%</li>
			        						<li>贷款期限7-30天</li>
			        					</ul>
			        					<div className="apply">
			        						<a href="javascript:;" onClick={that.toListDetail}>申请贷款</a>
			        					</div>
			        				</div>
			        				<div className="care">
			        					<span>老用户提额</span>
			        					该产品重复贷款暂不支持提额
			        				</div>
	        					</div>
	        		</div>
	        	</div>
        	</div>
        )
	}
});


export default List;


