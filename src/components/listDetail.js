'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';
import '../css/listDetail.css';


var appBasePath=globalData.appBasePath;
var ListDetail=React.createClass({
	getInitialState:function(){
		return {
			activeTab: 1,
			isShow: false,
			activeIndex:0,
			value1:500 ,
			value2:12
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
	
	handleChange1: function(event) {
	    this.setState({value1: event.target.value});
	},
	handleChange2: function(event) {
	    this.setState({value2: event.target.value});
	},
	toMoneyDetail:function(){
	  	//参照我的收藏
	  	
	},
	toProblem:function(){
	  	//var data = {};
		var path = {
		  pathname:'/Problem',
		  //query:data,
		}
		hashHistory.push(path);
	},
	toApplyInfo:function(){
	  	var data = {};
		var path = {
		  pathname:'/ApplyInfo',
		  state:data,
		}
		hashHistory.push(path);
	},
	render:function(){
		var that=this;
		//console.log("cityId",cityId);
		
        return (
        	<div className="app_Box listDetail">
      			<Header title="捷信金融-捷信贷"/>
	        	<div className="listDetailCon content">
	        		<ul className="rangeInfo">
	        			<li>
	        				<div className="numBox">
	        					金额
	        					<div>
	        						<input type="number" autoFocus="autoFocus" value={that.state.value1}  onChange = {this.handleChange1}/>
	        						<span>元</span>
	        					</div>
	        				</div>
	        				<p>额度范围:0.5万~5.0万</p>
	        			</li>
	        			<li>
	        				<div  className="numBox">
	        					期限
	        					<div>
		        					<input type="number" value={that.state.value2}  onChange = {this.handleChange2}/>
		        					<span>月</span>
	        					</div>
	        				</div>
	        				<p>期限范围:12~48个月</p>
	        			</li>
	        		</ul>
	        		<div className="circle">
	        			<div className="circlePic">
	        					<div className="rings">
	        						<div></div>
	        					
		        					<p>
	        							1090元
	        							<span>还款金额</span>
	        						</p>
	        					</div>
        						
	        			</div>
	        			<ul className="circleInfo">
	        				<li><i></i>贷款 5.0万/12个月</li>
	        				<li><i></i>利息 0元(0%/月)</li>
	        				<li><i></i>费用 6960元</li>
	        				<li><i></i>一次性 0元(0%)</li>
	        			</ul>
	        		</div>
	        		<div className="moneyDetailBox">
	        			<div className="moneyDetail">利率说明利率说明利率说明利率说明利率说明利率说明利率说明</div>
	        			<p onClick={that.toMoneyDetail}>查看详情<img src="src/img/icon/down.png"/></p>
	        		</div>
	        		<div className="flowBox">
	        			<h2>办理流程(门店办理)</h2>
	        			<div className="flowPic">
	        				<img src="src/img/icon/tell.png"/>
	        			</div>
        				<h2>申请条件</h2>
        				<ul className="application">
        					<li>收入要求:工资月收入2000元以上</li>
	        				<li>收入要求:工资月收入2000元以上</li>
	        				<li>收入要求:工资月收入2000元以上</li>
	        				<li>收入要求:工资月收入2000元以上</li>
        				</ul>
        				<h2>所需材料</h2>
        				<ul className="application">
        					<li>收入要求:工资月收入2000元以上</li>
	        				<li>收入要求:工资月收入2000元以上收入要求工资月工资月收入2000元以上收入要求工资月收入2000元以上收入2000元以上</li>
        				</ul>
	        		
	        			<h2 onClick={this.toProblem}>常见问题<span>更多回复<img src="src/img/icon/right.png"/></span></h2>
        				
        				
        				<div className="problemList">
        					<div className="problemBlock">
        						<img src="src/img/icon/problem.png"/>
        						<p>我是国企员工,工资打卡4000元以上,工作5年了,信用卡有过逾期，能贷款吗？</p>
        						<span>提问时间:2017-09-28</span>
        					</div>
        					<div className="answerBlock">
        						<img src="src/img/icon/answer.png"/>
        						<p><span>王昭君</span><span>2017-09-28</span></p>
        						<p>首先你查一下自己的逾期情况有多严重，有没有超过九十天，有几次，是不是连续的，不同成都有不同的处理办法，如果只有几次逾期，超过几天，关系影响不大。</p>
        					</div>
        				</div>
        			</div>
	        	</div>
	        	
	        	<div className="applyBtnBox">
	        		<div className="applySaveBtn"><img src="src/img/icon/sc1.png"/><p>收藏</p></div>
	        		<div className="applyBtn" onClick={that.toApplyInfo}>申请借款</div>
	        	</div>
        	</div>
        )
	}
});


export default ListDetail;


