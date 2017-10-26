'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import { hashHistory, Link } from 'react-router';
import Header from './header';

var NewsDetail=React.createClass({
	getInitialState:function(){
		return {
			
		}
	},
	getTabId:function(e){
		var that=this;
		var id=e.target.getAttribute('data-id');
		that.setState({
			activeTab:id,
			isShow: false
			//dataStatus: 0
		},()=>{
			/*api.queryBanner(function(data){
				console.log(data);
			})*/
		})
	},
	componentWillMount:function(){
		var that=this;
//		var id=this.props.location.query.id;
//		console.log(id);
		
	},
	saveHandle:function(){
		
	},
	render:function(){
		var that=this;
        return (
        	<div className="app_Box newsDetail">
        		<Header title="" headerLink="2"/>
        		<div className="content newsDetailCon">
        			<h1>有多少人像我一样陷入网贷的坑,爬不出来?</h1>
        			<div className="newsDetailInfo">
        				<span>媒体来源:智能贷整理</span>
        				<span>2017-10-21</span>
        				<span>454545阅读</span>
        			</div>
        			<div className="newsArticleCon">
        				有多少人像我一样陷入网贷的坑,爬不出来?有多少人像我一样陷入网贷的坑,爬不出来有多少人像我一样陷入网贷的坑,爬不出来有多少人像我一样陷入网贷的坑,爬不出来有多少人像我一样陷入网贷的坑,爬不出来有多少人像我一样陷入网贷的坑,爬不出来有多少人像我一样陷入网贷的坑,爬不出来有多少人像我一样陷入网贷的坑,爬不出来有多少人像我一样陷入网贷的坑,爬不出来有多少人像我一样陷入网贷的坑,爬不出来有多少人像我一样陷入网贷的坑,爬不出来有多少人像我一样陷入网贷的坑,爬不出来
        			</div>
        		</div>
        		<div className="saveBtn" onClick={that.saveHandle}>收藏</div>
        	</div>
        )
	},
	componentDidMount:function(){
		     
	}
});


export default NewsDetail;


