'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';


var appBasePath=globalData.appBasePath;
var ApplyResult=React.createClass({
	getInitialState:function(){
		return {
			//apiWay:"",
			resultTxt:"",
			resultTips:"",
			btnTxt:"",
			apiUrl:""
		}
	},
	
	componentWillMount:function(){
		//console.log(hashHistory);
		//var apiWay=this.props.location.query.apiWey;
		this.setState({apiWay:"tell",apiUrl:"https://www.baidu.com/"})		
	},
	
	toBack:function(){
		const backRouter = this.props.backRouter;
        if (backRouter) {
            hashHistory.push(backRouter);
        } else {
            window.history.back()
        }
	},
	nextHandle:function(){
		const apiWay=this.state.apiWay;
		if(false){//电话
			/*var path = {
			  pathname:'/',
			  //query:data,
			}
			hashHistory.push(path);*/
			 history.go(-3);
		}else{//url
			window.location.href=this.state.apiUrl
		}
	},
	render:function(){
		var that=this;
		//console.log("cityId",cityId);
        return (
        	<div className="app_Box applyFlow">
      			<div className="header">
	        		<div className="toBack" onClick={that.toBack}><img src="src/img/icon/backWhite.png"/></div>
		        	<p className="title">申请结果</p>
		        	<div className="headerLinkBtn"></div>
	        	</div>
	        	<div className="applyResultCon content">
					<ul className="stepBox">
						<li>
							<h1 className="stepActive">1</h1>
							<p>申请人信息</p>
						</li>
						<span></span>
						<li>
							<h1 className="stepActive">2</h1>
							<p>申请人资质</p>
						</li>
						<span></span>
						<li>
							<h1 className="stepActive">3</h1>
							<p>申请结果</p>
						</li>
					</ul>
					<div className="applyResult">
						<div className="applyResult"><img src="" /></div>
						<div className="applyResult"><h4>{this.state.resultTxt}</h4><p>{this.state.resultTips}</p></div>
						<div className="next" onClick={this.nextHandle}>{this.state.btnTxt}</div>
					</div>
	        	</div>	
        	</div>
        )
	},
	componentDidMount:function(){
		var that=this;
		const apiWay=that.state.apiWay;
		if(true){//电话审核
			that.setState({
				resultTxt:"恭喜你申请成功!",
				resultTips:"请保持你的手机畅通，稍后将有审核人员与您联系。",
				btnTxt:"确定"
			})
		}else{//h5跳转
			that.setState({
				resultTxt:"恭喜你申请成功，请完成余下操作!",
				resultTips:"说明：<br/>接下来将进入资方（第三方）的网站，请完成剩余操作，完成贷款。",
				btnTxt:"下一步"
			})
		}
	}
});


export default ApplyResult;


