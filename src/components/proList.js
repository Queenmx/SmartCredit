'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import HomeHeader from './homeHeader';
import Footer from './footer';
import Loading from './Loading';
import { hashHistory, Link } from 'react-router';

var appBasePath=globalData.appBasePath;
var ProList=React.createClass({
	getInitialState:function(){
		return {
			isLoading: false,
			pageNum:1,
			pageSize:10
		}
	},
	
	componentWillMount:function(){
	},
	
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
		api.loanList(pageNum,pageSize,"SBZ",function(res){
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
	
	
	render:function(){
		var that=this;
        return (
        	<div className="capitalBox">
        			{that.state.list}
        	</div>
        )
	}
});


export default ProList;


