'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import HomeHeader from './homeHeader';
import Footer from './footer';
import Loading from './loading';
import ProList from './proList';
import { hashHistory, Link } from 'react-router';
import '../css/home.css';

var appBasePath=globalData.appBasePath;
var Home=React.createClass({
	getInitialState:function(){
		return {
			activeTab: 1,
			isLoading: false,
			activeIndex:0,
			pageNum:1,
			pageSize:10,
			list:[]
		}
	},
	
	componentWillMount:function(){
	},
	toListDetail:function(event){
    	var loanId=event.target.getAttribute("data-loanId");
		var data = {loanId:loanId};
		var path = {
		  pathname:'/ListDetail',
		  query:data,
		}
		hashHistory.push(path);
    },
	  
   logoError:function(event){
    	event.target.src="src/img/icon/capitalLogo.jpg";
		event.target.onerror=null; //控制不要一直跳动 
		//console.log(event.target.src);
    },
	
	toList:function(event){
		const tag=event.currentTarget.getAttribute("data-tag");
		const txt=event.currentTarget.getAttribute("data-txt");
		const data = {tag:tag,txt:txt};
		const path = {
		  pathname:'/List',
		  state:data
		}
		hashHistory.push(path);
	},
	
	toNewsDetail:function(event){
		var articleId=event.currentTarget.getAttribute("data-articleid");
	    	//console.log(articleId);
	    	var data = {articleId:articleId};
			var path = {
			  pathname:'/NewsDetail',
			  query:data,
			}
			hashHistory.push(path);
	},
	
	
	
	componentDidMount:function(){
		var key1 = globalData.key;
		var toast=globalData.toast;
		var that=this;
	
		api.tag("BQ",function(res){
			//console.log(res)
			if(res.code=="0000"){
				var data =JSON.parse(strDec(res.data,key1,"",""));
				console.log(data);
			}else{
				toast.show(res.msg,2000);
			}
			
		},function(){
			toast.show("连接错误",2000);
		})
		
		
		api.loanList(1,5,"",function(res){
			if(res.code=="0000"){
				var data =JSON.parse(strDec(res.data,key1,"",""));
				//var data=res.data;
				var loanList=data.list;
				//console.log(data);
				var arr=[];
				for(var i in loanList){
					arr.push(<div className="capitalList" key={i}>
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
	        						<a href="javascript:;" data-loanId={loanList[i].loanId} onClick={that.toListDetail}>申请贷款</a>
	        					</div>
	        				</div>
	        				
	        			</div>)
				}
				
				that.setState({
					list:arr
				})
				
			}else{
				toast.show("连接错误",2000);
			}
		},function(){
			toast.show("连接错误",2000);
		})
		
		
		
		api.articleList(1,3,function(res){
			//console.log(res);
			if(res.code=="0000"){
				var data =JSON.parse(strDec(res.data,key1,"",""));
				//var data =JSON.parse(res.data);
				//console.log(data);
				var articleList=data.list;
				var articleArr=[];
				for(var i in articleList){
					articleArr.push(<dl className="newsList" data-articleid={articleList[i].articleId} key={Math.random()} onClick={that.toNewsDetail}>
    							<dd>
    								<h4>{articleList[i].articleTitle}</h4>
    								<p><span>{articleList[i].addTime}</span> <span>{articleList[i].readerNum}阅读</span></p>
    							</dd>
    							<dt>
    								<img src={articleList[i].imgUrl} onError={that.logoError} />
    							</dt>
    					</dl>)
				}
				that.setState({
					articleArr:articleArr
				})
				
			}else{
				toast.show(res.msg,2000);
			}
		},function(){
			toast.show("连接错误",2000);
		})
		
	},
	
	
	render:function(){
		var that=this;
		var curCity=that.props.location.query.cityId;
		
        return (
        	<div className="app_Box home">
      		<HomeHeader curCity={curCity}/>
	        	<div className="content">
	        		<ul className="homeTab">
	        			<li data-tag="SBZ" data-txt="上班族" onClick={that.toList}>
	        				<img src="src/img/icon/group.png"/>
	        				<p>上班族</p>
	        			</li>
	        			<li data-tag="GTH"  data-txt="个体户" onClick={that.toList}>
	        				<img src="src/img/icon/personal.png"/>
	        				<p>个体户</p>
	        			</li>
	        			<li data-tag="QY" data-txt="企业主" onClick={that.toList}>
	        				<img src="src/img/icon/qiye.png"/>
	        				<p>企业主</p>
	        			</li>
	        			<li data-tag="ZYZY" data-txt="自由职业" onClick={that.toList}>
	        				<img src="src/img/icon/ziyou.png"/>
	        				<p>自由职业</p>
	        			</li>
	        		</ul>
	        		 <div className="capitalBox">
					       {that.state.list}
					  </div>
	        		<div className="newsBox">
	        				<h3>你关心的资讯</h3>
	        				<div>
	        					{/*<dl className="newsList" data-articleId="" onClick={that.toNewsDetail}>
	        							<dd>
	        								<h4>小呆还不起遇到暴力催收,我该怎么办?</h4>
	        								<p><span>2017-10-20</span> <span>355阅读</span></p>
	        							</dd>
	        							<dt>
	        								<img src=""/>
	        							</dt>
	        					</dl>
		        				<dl className="newsList" onClick={that.toNewsDetail}>
	        							<dd>
	        								<h4>小呆还不起遇到暴力催收,我该怎么办?</h4>
	        								<p><span>2017-10-20</span> <span>355阅读</span></p>
	        							</dd>
	        							<dt>
	        								<img src=""/>
	        							</dt>
	        					</dl>*/}
	        					{that.state.articleArr}
	        				</div>
        					<Link to="/news" className="linkNews">全部热门资讯<img src=""/></Link>
	        	</div>
	        		<Loading flag={that.state.isLoading}/>
	        	</div>
				<Footer activeIndex="0"/>
        	</div>
        )
	}
});


export default Home;


