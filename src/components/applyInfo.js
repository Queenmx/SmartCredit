'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';
import '../css/apply.css';

var toast = new Toast();
var appBasePath=globalData.appBasePath;
var ApplyInfo=React.createClass({
	getInitialState:function(){
		return {
			
		}
	},
	
	componentWillMount:function(){
		
	},
	toApplyLevel:function(){
		var applyName=$("#applyName").val().trim();
		var applyNumber=$("#applyNumber").val().trim();
		if(applyName.length>0){
			if(!(/^1[34578]\d{9}$/.test(applyNumber))){
/*			this.setState({
				selecthint:1,
				hint:"请输入正确格式的手机号码"
			})
			setTimeout(() => {
                this.setState({
					selecthint:0				
				})
            }, 2000);*/
	           toast.show("请输入正确格式的手机号码",2000);
			}else{
				var data = {applyNumber:applyNumber,applyName:applyName};
				var path = {
				  pathname:'/ApplyLevel',
				  state:data,
				}
				hashHistory.push(path);
			
			}
		}else{
			toast.show("请输入姓名",2000);
		}
		
		
		

	},
	
	
	toBack:function(){
		const backRouter = this.props.backRouter;
        if (backRouter) {
            hashHistory.push(backRouter);
        } else {
            window.history.back()
        }
	},
	render:function(){
		var that=this;
		//console.log("cityId",cityId);
		
        return (
        	<div className="app_Box applyFlow">
      			<div className="header">
	        		<div className="toBack" onClick={that.toBack}><img src="src/img/icon/backWhite.png"/></div>
		        	<p className="title">申请人信息</p>
		        	<div className="headerLinkBtn"></div>
	        	</div>
	        	<div className="applyInfoCon content">
					<ul className="stepBox">
						<li>
							<h1 className="stepActive">1</h1>
							<p>申请人信息</p>
						</li>
						<span></span>
						<li>
							<h1>2</h1>
							<p>申请人资质</p>
						</li>
						<span></span>
						<li>
							<h1>3</h1>
							<p>申请结果</p>
						</li>
					</ul>
					<form className="applyInfo">
						<div>
							<span>姓名</span>
							<input type="text" id="applyName" placeholder="请输入姓名"/>
						</div>
						<div>
							<span>手机号</span>
							<input type="text" id="applyNumber" placeholder="请输入手机号"/>
						</div>
					</form>
	        	</div>	
	        	<div className="botBtn footer" onClick={that.toApplyLevel}>下一步</div>
        	</div>
        )
        
        
	}
});

var oHeight = $(document).height(); //屏幕当前的高度
			$(window).resize(function(){
			        if($(document).height() < oHeight){
			        $(".footer").css("display","none");
		    }else{
		         $(".footer").css("display","block");
		    } 
		});
export default ApplyInfo;


