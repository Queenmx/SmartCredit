'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';
import '../css/problem.css';


var appBasePath=globalData.appBasePath;
var Problem=React.createClass({
	getInitialState:function(){
		return {
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
	
	toAsk:function(){
		var data = {id:3,name:"qin",age:18};
		var path = {
		  pathname:'/Ask',
		  query:data,
		}
		hashHistory.push(path);
	},
	render:function(){
		var that=this;
		//console.log("cityId",cityId);
		
        return (
        	<div className="app_Box problem">
      			<Header title="常见问题"/>
	        	<div className="problemCon content">
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
        			<div className="askBtn" onClick={this.toAsk}>提问</div>
	        	</div>
	        	
        	</div>
        )
	}
});


export default Problem;


