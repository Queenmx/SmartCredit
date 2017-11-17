'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';


var appBasePath=globalData.appBasePath;
var Txt=React.createClass({
	getInitialState:function(){
		return {
			
		}
	},
	componentDidMount: function () {
		
	},
	render:function(){
		var txtData=this.props.location;
		var title=txtData.state.title;
		var backRouter=txtData.state.backRouter;
		var fromId=txtData.state.fromId; 
		var txtCon;
		switch (fromId){
			case 1://设置，关于万融汇
				break;
			case 2://申请贷款时，万融汇服务条款
				break;
			case 3://登录，万融汇协议
				break;	
			default:
				break;
		}
        return (
        	<div className="txt app_Box">
        		<Header title={title} />
        		<div className="content txtCon">
        		协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议
        		</div>
        		
        	</div>
        )
	}
	
});


export default Txt;


