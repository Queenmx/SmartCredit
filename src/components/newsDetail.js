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
			articleDetail:""
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
		let that=this;
		let key1 = globalData.key;
		let toast = globalData.toast;
		let articleId=that.props.location.query.articleId;
		console.log(articleId);
		api.articleDetail(articleId,function(res){
			if(res.code=="0000"){
				let data =strDec(res.data,key1,"","");
				let articleDetail=JSON.parse(data);
				that.setState({
					articleDetail:articleDetail
				})
			}else{
				toast.show(res.msg,2000);
			}
			
		})
		
	},
	saveHandle:function(e){
		e.target.innerHTML="取消收藏"
		/*let articleId=this.props.location.query.articleId;
		api.save(articleId,"ARTICLE",function(res){
			if(res.code=="0000"){
				e.target.innerHTML="取消收藏"
			}else{
				toast.show(res.msg,2000);
			}
		})*/
	},
	render:function(){
		let that=this;
		let articleDetail=that.state.articleDetail;
        return (
        	<div className="app_Box newsDetail">
        		<Header title=""/>
        		<div className="content newsDetailCon">
        			<h1>{articleDetail.articleTitle}</h1>
        			<div className="newsDetailInfo">
        				<span>媒体来源:{articleDetail.mediaSource}</span>
        				<span>{articleDetail.addTime}</span>
        				<span>{articleDetail.readerNum}阅读</span>
        			</div>
        			<div className="newsArticleCon">
        				{articleDetail.content}
        			</div>
        		</div>
        		<div className="botBtn" onClick={that.saveHandle}>收藏</div>
        	</div>
        )
	},
	componentDidMount:function(){
		     
	}
});


export default NewsDetail;


