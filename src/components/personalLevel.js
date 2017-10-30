'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';

var toast = new Toast();
var appBasePath=globalData.appBasePath;
var PersonalLevel=React.createClass({
	getInitialState:function(){
		return {
			checked:true
		}
	},
	
	componentWillMount:function(){
		
	},
	toSaveBtn:function(){
		var data = {};
		var path = {
		  pathname:'/Mine',
		  state:data,
		}
		hashHistory.push(path);
	},
	render:function(){
		var that=this;
		//console.log("cityId",cityId);
        return (
        	<div className="app_Box personalLevel">
      			<Header title="个人资质" />
	        	<div className="personalLevelCon content">
					<form className="applyLevel">
						<ul>
							<li className="levelInfo">
								<label htmlFor="job">职业身份</label>
								<input type="text" id="job" readOnly="readonly"  placeholder="请选择"/>
								<ul>
									
								</ul>
							</li>
							<li className="levelInfo">
								<label htmlFor="publicMoney">是否有本地公积金</label>
								<input type="text" id="publicMoney" readOnly="readonly" placeholder="请选择"/>
								<ul>
								</ul>
							</li>
							<li className="levelInfo">
								<label htmlFor="social">是否有本地社保</label>
								<input type="text" id="social" readOnly="readonly"  placeholder="请选择"/>
								<ul>
									
								</ul>
							</li>
							<li className="levelInfo">
								<label htmlFor="house">名下房产类型</label>
								<input type="text" id="house" readOnly="readonly"  placeholder="请选择"/>
								<ul>
								</ul>
							</li>
							<li className="levelInfo">
								<label htmlFor="car">名下是否有车</label>
								<input type="text" id="car" readOnly="readonly"  placeholder="请选择"/>
								<ul>
								</ul>
							</li>
							<li className="levelInfo">
								<label htmlFor="credit">你的信用情况</label>
								<input type="text" id="credit" readOnly="readonly"  placeholder="请选择"/>
								<ul>
								</ul>
							</li>
							<li className="levelInfo">
								<label htmlFor="age">年龄</label>
								<span>岁</span>
								<input type="text" id="age"   placeholder="请输入内容"/>
								
								<ul>
								</ul>
							</li>
							<li className="levelInfo">
								<label htmlFor="history">是否申请过捷信分期付款</label>
								<input type="text" id="history" readOnly="readonly"  placeholder="请选择"/>
								<ul>
								</ul>
							</li>
						</ul>
						
					</form>
	        	</div>	
	        	<div className="botBtn" onClick={that.toSaveBtn}>保存</div>
        	</div>
        )
	}
});


export default PersonalLevel;


