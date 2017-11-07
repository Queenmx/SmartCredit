'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import { hashHistory, Link } from 'react-router';
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'reactjs-iscroll';

var appBasePath=globalData.appBasePath;
var Save=React.createClass({
	
	getInitialState:function(){
		return {
			rightBtn: "编辑",
			isShow: false,
			activeSaveTab:0,
			display:"none",
			mask:"none",
			list: [],
			list1: [],
	  		currentPage: 1,
			pageSize:10
		}
	},
	

	toNewsDetail:function(event){
		var articleId=event.currentTarget.getAttribute("data-articleid");
	    	console.log(articleId);
	    	var data = {articleId:articleId};
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
	toListDetail:function(event){
		alert("111")
		 event.stopPropagation();
    	var loanId=event.target.getAttribute("data-loanId");
		var data = {loanId:loanId};
		var path = {
		  pathname:'/ListDetail',
		  query:data,
		}
		hashHistory.push(path);
    },
	saveTab:function(e){
		var id=e.target.id*1;
		this.setState({
			activeSaveTab:id,
		})
		localStorage.setItem("newsDetailTab",id);
	},
	logoError:function(event){
    	event.target.src="src/img/icon/capitalLogo.jpg";
		event.target.onerror=null; //控制不要一直跳动 
		//console.log(event.target.src);
    },
	/*edit:function(){
		var that=this;
		that.setState({
			display:"block"
		})
		console.log(that.state.display)
	},*/
	/*agreeRule:function(event){
		console.log(event.target.checked);
		this.setState({
			checked:event.target.checked
		})
	},*/
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
		var saveCapitalCon=[];
		var saveNewsCon=[];
		saveCapitalCon.push(<ReactIScroll iScroll={iScroll} handleRefresh={that.handleRefresh} key={"capitalBox0"}>
			<div className="capitalBox" id="capitalBox">
							{that.state.list}
						</div></ReactIScroll>)
		
		saveNewsCon.push(<ReactIScroll iScroll={iScroll} handleRefresh={that.handleRefresh} key={"newsBox0"}>
			<div className="newsBox"  id="newsBox" >
							{that.state.list1}
	        		</div></ReactIScroll>)
		
        return (
        	<div className="app_Box save">
	      		<div className="header">
	        		<div className="toBack" onClick={this.toBack}><img src="src/img/icon/back.png"/></div>
		        	<p className="title">我的收藏</p>
		        	<div className="headerLinkBtn"></div>
		        	{/*<div className="headerLinkBtn">{that.state.rightBtn}</div>*/}
	        	</div>
	        	<div className="content saveCon">
	        		<ul className="saveTab">
	        			<li key="li1" className={activeSaveTab==0?"activeSaveTab":""} onClick={that.saveTab}  id="0">贷款</li>
	        			<li key="li2" className={activeSaveTab==1?"activeSaveTab":""} onClick={that.saveTab} id="1">资讯</li>
	        		</ul>
	        		<div className="saveConBox">
		        			{activeSaveTab=="0"?saveCapitalCon:saveNewsCon}
	        		</div>
	        		 
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
	
	touchStart:function(type,id){
		
		console.log(type+"---"+id);
		this.timeout = setTimeout(function(){
	 		this.longPress(id);
	 	}.bind(this), 800);  //长按时间超过800ms，则执行传入的方法
	},
	touchEnd:function(){
		clearTimeout(this.timeout);  //长按时间少于800ms，不会执行传入的方法
	},
	
	loadData:function(downOrUp,callback) {
  		var that=this;
  		var key1 = globalData.key;
		var toast=globalData.toast;
		var tag=that.props.tag;
	 	const {currentPage,pageSize,list,list1} = that.state;
	 	var arr=[];
	 	var newsDetailTab= localStorage.getItem("newsDetailTab");
	 	console.log(newsDetailTab+typeof newsDetailTab);
	 	if(newsDetailTab=="1"){//贷款
	 		console.log("new")
	 		api.saveArticle(currentPage,pageSize,function(res){
	 			if(res.code=="0000"){
					var data =JSON.parse(strDec(res.data,key1,"",""));
					console.log(data);
					var articleList=data.list;
					var total=data.total;
					var articleArr=[];
					for(var i in articleList){
						articleArr.push(<dl className="newsList" data-articleid={articleList[i].articleId} key={Math.random()} onClick={that.toNewsDetail} onTouchStart={that.touchStart.bind(that,"type","abc")} onTouchEnd={that.touchEnd}>
	    							<dd>
	    								<h4>{articleList[i].articleTitle}</h4>
	    								<p><span>{articleList[i].addTime}</span> <span>{articleList[i].readerNum}阅读</span></p>
	    							</dd>
	    							<dt>
	    								<img src={articleList[i].imgUrl} onError={that.logoError} />
	    							</dt>
	    					</dl>)
					}
					if(downOrUp=='up'){
						var c=list1.concat(articleArr);
					}else{
						var c=articleArr;
					}
					that.setState({
						total:total,
						list1:c
					})
					if (callback && typeof callback === 'function') {
			            callback();
			          }
				}else{
					
				}
	 		},function(){
				toast.show("连接错误",2000);
			})
	 	}else{
	 		console.log("dai")
		 	api.saveLoan(currentPage,pageSize,function(res){
				//console.log(res);
				if(res.code=="0000"){
					var data =JSON.parse(strDec(res.data,key1,"",""));
					var loanList=data.list;
					var total=data.total;
					//console.log(data);
					for(var i in loanList){
						arr.push(<div className="capitalList" key={Math.random()} onTouchStart={that.touchStart.bind(that,"type","abc")} onTouchEnd={that.touchEnd}>
		        				<h3>
		        					<img src={loanList[i].logo} onError={that.logoError} />
		        					<span>{loanList[i].loanName}</span>
		        				</h3>
		        				<div className="capitalInfo">
		        					<div className="limit">
		        						<h2>{loanList[i].moneyMin}~{loanList[i].moneyMax}</h2>
		        						<p>额度范围(元)</p>
		        					</div>
		        					<ul className="special">
		        						<li>{loanList[i].loanTime}小时放款</li>
		        						<li>日费率{loanList[i].rate}%</li>
		        						<li>贷款期限{loanList[i].limitMin}-{loanList[i].limitMax}天</li>
		        					</ul>
		        					<div className="apply">
		        						<a  data-loanId={loanList[i].loanId} onClick={that.toListDetail}>申请贷款</a>
		        					</div>
		        				</div>
		        				
		        			</div>)
					}
					if(downOrUp=='up'){
						var c=list.concat(arr);
					}else{
						var c=arr;
					}
					that.setState({
						total:total,
						list:c
					})
					if (callback && typeof callback === 'function') {
			            callback();
			          }
					
				}
			},function(){
				toast.show("连接错误",2000);
			})
		 }		
	 	
       },

       
	handleRefresh:function(downOrUp, callback) {
	    //真实的世界中是从后端取页面和判断是否是最后一页
	    var that=this;
	    let {currentPage, lastPage,pageSize,total} = that.state;
	    var totalPage=Math.ceil(total/pageSize);
	    //console.log(totalPage);
		    if (downOrUp === 'up') { // 加载更多
		      if (currentPage == totalPage) {
		      	console.log("zuihou")
		        lastPage = true;
		        	if (callback && typeof callback === 'function') {
			            callback();
			          }
		      } else {
		        currentPage++;
		        console.log(currentPage);
		        lastPage = false;
		        that.setState({
			      currentPage,
			      lastPage
			    }, () => {
			      that.loadData(downOrUp, callback);
				});
		      }
		    } else { // 刷新
		      lastPage = false;
		      currentPage = 1;
		        that.setState({
			      currentPage,
			      lastPage
			    }, () => {
			      that.loadData(downOrUp, callback);
				});
		    }
	  
  },
	componentDidMount:function(){
		var that=this;
		var newsDetailTab= localStorage.getItem("newsDetailTab");
		if(newsDetailTab){
			that.setState({
				activeSaveTab:newsDetailTab
			})
		}
		
		that.loadData();
	
	},
	componentWillUnMount:function(){
		window.removeEventListener('touchstart');
		window.removeEventListener('touchend');
	}
	
});


export default Save;


