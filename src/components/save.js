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
			activeSaveTab:0,
			display:"none",
			mask:"none"
		}
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
	/*edit:function(){
		var that=this;
		that.setState({
			display:"block"
		})
		console.log(that.state.display)
	},*/
	agreeRule:function(event){
		console.log(event.target.checked);
		this.setState({
			checked:event.target.checked
		})
	},
	longPress:function(id){
		this.setState({
			id:id,
			mask:'block'
		})
		console.log("long")
	},
	componentWillMount:function(){
		var that=this;
		var timeout = undefined;
		/*window.addEventListener('touchstart',function(event){
			console.log("lll")
			 timeout = setTimeout(function(){
			 	that.longPress();
			 	}, 800);  //长按时间超过800ms，则执行传入的方法
		}, false);
		window.addEventListener('touchend', function(event) {
			console.log("222")
            clearTimeout(timeout);  //长按时间少于800ms，不会执行传入的方法
        }, false);*/
	},
	
	cancelHandle:function(){
		this.setState({
			mask:'none'
		})
		console.log(this.state.id);
	},
	sureHandle:function(){
		this.setState({
			mask:'none'
		})
		console.log(this.state.id);
	},
	render:function(){
		var that=this;
		var activeSaveTab=that.state.activeSaveTab;
		/*switch (activeSaveTab){
			case 0:
				var saveCon=that.state.saveCapitalCon;
				break;
			case 1:
				var saveCon=that.state.saveNewsCon;
				break;
			default:
				break;
		}*/
        return (
        	<div className="app_Box save">
	      		<div className="header">
	        		<div className="toBack" onClick={this.toBack}><img src="src/img/icon/back.png"/></div>
		        	<p className="title">我的收藏</p>
		        	<div className="headerLinkBtn"></div>
		        	{/*<div className="headerLinkBtn">{that.state.rightBtn}</div>*/}
	        	</div>
	        	<div className="content">
	        		<ul className="saveTab">
	        			<li key="li1" className={activeSaveTab==0?"activeSaveTab":""} onClick={that.saveTab}  id="0">贷款</li>
	        			<li key="li2" className={activeSaveTab==1?"activeSaveTab":""} onClick={that.saveTab} id="1">资讯</li>
	        		</ul>
	        		{activeSaveTab=="0"?that.state.saveCapitalCon:that.state.saveNewsCon}
	        	</div>
	        	
	        	{/*<div className="saveBot">
	        		<div className="checkInput">
						<input className="magic-checkbox" type="checkbox"  id="ruleCheck"   />
						<label htmlFor="ruleCheck">全选</label>
					</div>
					<p>取消收藏</p>
	        	</div>*/}
	        	<div className="mask" style={{"display":that.state.mask}}>
	        		<div className="cancelSaveBox">
		        		<div className="note">提示<p>你确定要删除吗?</p></div>
		        		<div className="cancelSaveDiv"><span onClick={that.cancelHandle}>取消</span><span onClick={that.sureHandle}>确定</span></div>
	        		</div>
	        	</div>
	        	
	        	
        	</div>
        )
	},
	toListDetail:function(e){
			e.preventDefault();
	    	var loanId=e.target.loanId;
			var data = {loanId:loanId};
			var path = {
			  pathname:'/ListDetail',
			  query:data,
			}
			hashHistory.push(path);
	   },
	touchStart:function(type,id){
		
		console.log(type+"---"+id);
		this.timeout = setTimeout(function(){
	 		this.longPress(id);
	 	}.bind(this), 800);  //长按时间超过800ms，则执行传入的方法
	},
	touchEnd:function(){
		clearTimeout(this.timeout);  //长按时间少于800ms，不会执行传入的方法
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
	        			<div className="capitalList" onTouchStart={that.touchStart.bind(this,"type","abc")} onTouchEnd={that.touchEnd}>
	        				<h3>
	        					<img src="src/img/icon/capitalLogo.jpg"/>
	        					<span>用钱宝</span>
	        				</h3>
	        				<div className="capitalInfo">
	        					/*<div className="checkInput" style={{"display":that.state.display}}>
	        						<input className="magic-checkbox"  type="checkbox"  id="ruleCheck"  />
									<label htmlFor="ruleCheck"></label>
	        					</div>*/
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
	        				
	        			</div>
	        			
	        			<div className="capitalList"  onTouchStart={that.touchStart.bind(this,"type2","def")} onTouchEnd={that.touchEnd}>
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
	        				
	        			</div>
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
	        						<a href="javascript:;" onClick={that.toListDetail}>申请贷款</a>
	        					</div>
	        				</div>
	        				
	        			</div>
	        			
	        		</div>)
		
		saveNewsCon.push(
			<div className="newsBox"  id="newsBox" onClick={this.toNewsDetail}  key={"newsBox0"}>
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
	},
	componentWillUnMount:function(){
		window.removeEventListener('touchstart');
		window.removeEventListener('touchend');
	}
	
});


export default Save;


