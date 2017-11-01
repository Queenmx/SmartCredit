'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import { hashHistory} from 'react-router';

var appBasePath=globalData.appBasePath;
var RealName=React.createClass({
	getInitialState:function(){
		return {
		}
	},
	vauleChange:function(e){
		this.setState({
			[e.target.name]:  e.target.value
		})
	},
	saveName:function(){
		var that=this;
		let realName=that.state.realName;
		var toast = new Toast();
		if(realName){
			toast.show("保存成功",2000);
			window.history.back()
		}else{
			toast.show("请输入真实姓名",2000);
		}
		
	},
	render:function(){
		var that=this;
       return (
        	<div className="setPsd app_Box">
        		<Header title="修改姓名" />
        		<div className="setPsdCon">
        			<div className="realName">
    					<label htmlFor="realName">请输入真实姓名</label>
    					<input id="realName"  type="text"  name="realName" placeholder="" onChange={that.vauleChange}/>
    				</div>
    				
    				<div className="psdLogin" onClick={that.saveName}>保存</div>
        		</div>
        	</div>
        )
	}
	
});


export default RealName;


