'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Footer from './footer';
import { hashHistory, Link } from 'react-router';

var appBasePath=globalData.appBasePath;
var News=React.createClass({
	getInitialState:function(){
		return {
			activeTab: 1,
			isShow: false,
			activeIndex:1
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
		var banner=[];
		var mPost=[];
		api.queryBanner(function(data){
				//console.log(data);
				if(data.result=="000000"){
					//console.log("ok1");
					const  bannerList=data.data.bannerList;
					
					for (var i = 0; i < bannerList.length; i++) {
			            	banner.push(
			              	 <div className="swiper-slide" key={'banner'+i}>
			              	 	<img src={appBasePath+bannerList[i].img_URL} />
			              	 </div>
			              	 )
			            };
			            that.setState({
			            	length:bannerList.length,
			            	banner:banner
			            })
					
					/*that.setState({
						isShow: true,
		                bannerList: data.data.bannerList,//轮播图片
		                mPost: data.data.mPost,//妈妈会议室-取置顶为INDEX的1篇文章
		                classList: data.data.classList,//专题分类列表
		                rPost: data.data.rPost,//推荐文章，取置顶为INDEX的6篇
		                actList: data.data.actList//人气推荐，取置顶为INDEX的6个活动
		               // dataStatus: 0
		            },()=>{
		               for (var i = 0; i < that.state.bannerList.length; i++) {
			            	banner.push(
			              	 <div className="swiper-slide" key={'banner'+i}>
			              	 	<img src={appBasePath+that.state.bannerList[i].img_URL}/>
			              	 </div>
			              	 )
			            };
			            that.setState({
			            	banner:banner
			            })*/
				}else{
					
				}
				
			});
		
		
		/*for (var i = 0; i < that.state.bannerList.length; i++) {
            	banner.push(
              	 <div className="swiper-slide" key={'banner'+i}>
              	 	<img src={appBasePath+that.state.bannerList[i].img_URL}/>
              	 </div>
              	 )
            };
            that.setState({
            	banner:banner
            })*/
            /*mPost.push(
            	<div className="">
              	 	<img src={appBasePath+that.state.bannerList[i].img_URL}/>
              	 </div>
            )*/
		/*api.queryBanner(function(data){
				console.log(data);
				if(data.result=="000000"){
					that.setState({
						isShow: true,
		               
		               // dataStatus: 0
		            },()=>{
		               
		            });
				}else{
					
				}
				
			});*/
		    
	},
	toNewsDetail:function(){
		var data = {id:3,name:"qin",age:18};
		var path = {
		  pathname:'/NewsDetail',
		  query:data,
		}
		hashHistory.push(path);
	},
	render:function(){
		var that=this;
		
        return (
        	<div className="app_Box news">
        		<header>资讯中心</header>
	        	<div className="newsCon content">
		        	<div className="swiper-container" id="bannerList">
					    <div className="swiper-wrapper">
					      	{that.state.banner}
					    </div>
					    <div className="swiper-pagination">{that.state.paginationCustomRender}</div>
					</div>
					<div className="newsBox" onClick={this.toNewsDetail}>
	        				<h3>你关心的资讯</h3>
	        				<div>
	        					<dl className="newsList" >
	        							<dd>
	        								<h4>小呆还不起遇到暴力催收,我该怎么办?</h4>
	        								<p><span>2017-10-20</span> <span>355阅读</span></p>
	        							</dd>
	        							<dt>
	        								<img src=""/>
	        							</dt>
	        					</dl>
		        				<dl className="newsList">
	        							<dd>
	        								<h4>小呆还不起遇到暴力催收,我该怎么办?</h4>
	        								<p><span>2017-10-20</span> <span>355阅读</span></p>
	        							</dd>
	        							<dt>
	        								<img src=""/>
	        							</dt>
	        					</dl>
	        					<dl className="newsList">
	        							<dd>
	        								<h4>小呆还不起遇到暴力催收,我该怎么办?</h4>
	        								<p><span>2017-10-20</span> <span>355阅读</span></p>
	        							</dd>
	        							<dt>
	        								<img src=""/>
	        							</dt>
	        					</dl>
	        					<dl className="newsList" >
	        							<dd>
	        								<h4>小呆还不起遇到暴力催收,我该怎么办?</h4>
	        								<p><span>2017-10-20</span> <span>355阅读</span></p>
	        							</dd>
	        							<dt>
	        								<img src=""/>
	        							</dt>
	        					</dl>
	        					<dl className="newsList">
	        							<dd>
	        								<h4>小呆还不起遇到暴力催收,我该怎么办?</h4>
	        								<p><span>2017-10-20</span> <span>355阅读</span></p>
	        							</dd>
	        							<dt>
	        								<img src=""/>
	        							</dt>
	        					</dl>
	        					<dl className="newsList" >
	        							<dd>
	        								<h4>小呆还不起遇到暴力催收,我该怎么办?</h4>
	        								<p><span>2017-10-20</span> <span>355阅读</span></p>
	        							</dd>
	        							<dt>
	        								<img src=""/>
	        							</dt>
	        					</dl>
	        				</div>
	        		</div>
				</div>
	        	<Footer activeIndex="1"/>
        	</div>
        )
	},
	componentDidUpdate:function(){
		
		var current=$(".swiper-slide swiper-slide-active").index();
		var length=this.state.length;
		var swiper = new Swiper("#bannerList",{
			loop:true,
			autoplay : 3000,
			speed:500,
			pagination: '.swiper-pagination',
			autoplayDisableOnInteraction:false
			//paginationType : 'custom',
			 // paginationCustomRender: function (swiper, current, length) {
			     //this.setState({
			    // 	paginationCustomRender:{current + ' of ' + length}
			    // }) 
			    //console.log( {current + ' of ' + length});
			    //console.log(current); 
			 // }
		});     
	}
});


export default News;


