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
			txtCon:""
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
			txtCon="万融汇，贷款业务涵盖个人消费贷、经营贷、房贷、车贷。平台整理归类了各类金融产品名同事收集了各类产品的详细信息和风控规则，提供给了用户高质量，精准的金融产品服务。用户通过万融汇独有的智能匹配系统，可一站式比较数万款贷款产品，筛选产品并直接提交申请。对银行而言，则是批量获取优质客户的营销渠道；同时，万融汇优秀的风控系统，能辅助银行，贷款方过滤信用较低，历史还款记录较差或高风险用户，为资方的安全保驾护航。"
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
        		{txtCon}
        		</div>
        		
        	</div>
        )
	}
	
});


export default Txt;


