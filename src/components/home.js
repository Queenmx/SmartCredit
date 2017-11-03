'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import HomeHeader from './homeHeader';
import Footer from './footer';
import Loading from './loading';
import ProList from './proList';
import Simple from './iscoll';
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
			pageSize:10
		}
	},
	
	componentWillMount:function(){
	},
	/*
	toNewsDetail:function(){
		var data = {id:3,name:"qin",age:18};
		var path = {
		  pathname:'/NewsDetail',
		  query:data,
		}
		hashHistory.push(path);
	},
	toListDetail:function(e){
		var loanId=e.target.loanId;
		var data = {loanId:loanId};
		var path = {
		  pathname:'/ListDetail',
		  query:data,
		}
		hashHistory.push(path);
	},
	toList:function(e){
		const listId=e.target.index;
		//const title=e.target.find("p").html();
		const data = {listId:listId,title:"title"};
		const path = {
		  pathname:'/List',
		  state:data
		}
		hashHistory.push(path);
	},
	logoError:function(e){
		e.target.src="src/img/icon/capitalLogo.jpg";
		e.target.onerror=null; //控制不要一直跳动 
		console.log(e.target.src);
	},
	
	componentDidMount:function(){
		var that=this;
		var pageNum=that.state.pageNum;
		var pageSize=that.state.pageSize;
		api.loanList(pageNum,pageSize,"GTH",function(res){
			//console.log(res);
			if(res.code=="0000"){
				//var data =strDec(res.data,key1,"","");
				//console.log(data);
				var data=res.data.list;
				var list=[];
				for(var i in data){
					list.push(<div className="capitalList" key={i}>
	        				<h3>
	        					<img src={data[i].logo} onError={that.logoError} />
	        					<span>用钱宝</span>
	        				</h3>
	        				<div className="capitalInfo">
	        					<div className="limit">
	        						<h2>{data[i].moneyMin}~{data[i].moneyMax}</h2>
	        						<p>额度范围(元)</p>
	        					</div>
	        					<ul className="special">
	        						<li>{data[i].loanTime}小时放款</li>
	        						<li>日费率{data[i].rate}%</li>
	        						<li>贷款期限{data[i].limitMin}-{data[i].limitMax}天</li>
	        					</ul>
	        					<div className="apply">
	        						<a href="javascript:;" data-loanId={data[i].loanId} onClick={that.toListDetail}>申请贷款</a>
	        					</div>
	        				</div>
	        				
	        			</div>)
				}
				that.setState({
					total:res.total,
					list:list
				})
			}
		})
		
	},
	*/
	
	render:function(){
		var that=this;
		var curCity=that.props.location.query.cityId;
		
        return (
        	<div className="app_Box home">
      		<HomeHeader curCity={curCity}/>
	        	<div className="content">
	        		<ul className="homeTab">
	        			<li onClick={that.toList}>
	        				<img src="src/img/icon/group.png"/>
	        				<p>上班族</p>
	        			</li>
	        			<li onClick={that.toList}>
	        				<img src="src/img/icon/personal.png"/>
	        				<p>个体户</p>
	        			</li>
	        			<li onClick={that.toList}>
	        				<img src="src/img/icon/qiye.png"/>
	        				<p>企业主</p>
	        			</li>
	        			<li onClick={that.toList}>
	        				<img src="src/img/icon/ziyou.png"/>
	        				<p>自由职业</p>
	        			</li>
	        		</ul>
	        		<Simple/>
	        		<ProList pageNum="3"/>
	        		<div className="newsBox">
	        				<h3>你关心的资讯</h3>
	        				<div>
	        					<dl className="newsList" onClick={that.toNewsDetail}>
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
	        					</dl>
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


