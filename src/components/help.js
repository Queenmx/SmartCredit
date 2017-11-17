'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';
import '../css/help.css';

var appBasePath=globalData.appBasePath;
var Help=React.createClass({
	getInitialState:function(){
		return {
			
		}
	},
	helpDetail:function(){
		var data = {};
		var path = {
		  pathname:'/HelpDetail',
		  state:data,
		}
		hashHistory.push(path);
	},
	toAsk: function () {
		var user=localStorage.getItem("user");
        if(user){
			 var data = {fromWho:"help"};
	        var path = {
	            pathname: '/Ask',
	            query: data,
	        }
	        hashHistory.push(path);
        }else{
        	 var path = {
                    pathname: '/Login',
                }
                hashHistory.push(path);
        }
    },
	render:function(){
		var that=this;
        return (
        	<div className="app_Box help">
        		<Header title="帮助与反馈" />
        			<ul className="helpList">
	        			<li onClick={that.helpDetail}>如何还款<img src="src/img/icon/right.png"/></li>
	        			<li onClick={that.helpDetail}>申请贷款<img src="src/img/icon/right.png"/></li>
	        			<li onClick={that.helpDetail}>付款异常<img src="src/img/icon/right.png"/></li>
	        		</ul>
	        	<div className="askBtn" onClick={this.toAsk}>反馈</div>	
        	</div>
        )
	}
	
});


export default Help;


