'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import { hashHistory, Link } from 'react-router';

var appBasePath=globalData.appBasePath;
var Save=React.createClass({
	
	getInitialState:function(){
		return {
			rightBtn: "编辑",
			isShow: false,
			activeSaveTab:0
		}
	},
	
	componentWillMount:function(){
		
		
	},
	
	toNewsDetail:function(){
		var data = {id:2,name:"qin",age:18};
		var path = {
		  pathname:'/NewsDetail',
		  query:data,
		}
		hashHistory.push(path);
	},
	toBack:function(){
		localStorage.removeItem("newsDetailTab");
		const backRouter = this.props.backRouter;
        if (backRouter) {
            hashHistory.push(backRouter);
          /*hashHistory.push({  
		        pathname: '/Mine',  
		        query: {  
		            name:'qin',  
		            price:'100'  
		        }  
		    })  */  
			
        } else {
            window.history.back()
        }
		
		
	},
	saveTab:function(e){
		var id=e.target.id*1;
		this.setState({
			activeSaveTab:id,
		})
		localStorage.setItem("newsDetailTab",id);
		/*switch (id){
			case 0:
				$("#newsBox").hide();
				$("#capitalBox").show();
				break;
			case 1:
				$("#newsBox").show();
				$("#capitalBox").hide();
				break;
			default:
				break;
		}*/
		
	},
	render:function(){
		var that=this;
		var activeSaveTab=that.state.activeSaveTab*1;
		switch (activeSaveTab){
			case 0:
				var saveCon=that.state.saveCapitalCon;
				break;
			case 1:
				var saveCon=that.state.saveNewsCon;
				break;
			default:
				break;
		}
        return (
        	<div className="app_Box save">
	      		<div className="header">
	        		<div className="toBack" onClick={this.toBack}><img src="src/img/icon/back.png"/></div>
		        	<p className="title">我的收藏</p>
		        	<div className="headerLinkBtn">{that.state.rightBtn}</div>
	        	</div>
	        	<div className="content">
	        		<ul className="saveTab">
	        			<li key="li1" className={activeSaveTab==0?"activeSaveTab":""} onClick={that.saveTab}  id="0">贷款</li>
	        			<li key="li2" className={activeSaveTab==1?"activeSaveTab":""} onClick={that.saveTab} id="1">资讯</li>
	        		</ul>
	        		{saveCon}
	        	</div>
        	</div>
        )
	},
	componentDidMount:function(){
		var that=this;
		var newsDetailTab= localStorage.getItem("newsDetailTab");
		if(newsDetailTab){
			that.setState({
				activeSaveTab:newsDetailTab
			})
		}
		var saveCapitalCon=[];
		var saveNewsCon=[];
		saveCapitalCon.push(<div className="capitalBox" id="capitalBox" key={"capitalBox0"}>
	        			<div className="capitalList" >
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
	        						<a href="javascript:;">申请贷款</a>
	        					</div>
	        				</div>
	        				<div className="care">
	        					<span>老用户提额</span>
	        					该产品重复贷款暂不支持提额
	        				</div>
	        			</div>
	        			
	        		</div>)
		
		saveNewsCon.push(
			<div className="newsBox"  id="newsBox" onClick={this.toNewsDetail} key={"newsBox0"}>
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
	        					
	        				</div>
	        		</div>)
		
		/*switch (activeSaveTab){
			case 0:
				$("#newsBox").hide();
				$("#capitalBox").show();
				break;
			case 1:
				$("#newsBox").show();
				$("#capitalBox").hide();
				break;
			default:
				break;
		}*/
		//ajax请求分情况加载后台数据
		that.setState({
			saveNewsCon:saveNewsCon,
			saveCapitalCon:saveCapitalCon
		})
	}
});


export default Save;


