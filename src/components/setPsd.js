'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import { hashHistory} from 'react-router';

var appBasePath=globalData.appBasePath;
var SetPsd=React.createClass({
	getInitialState:function(){
		return {
			
		}
	},
	vauleChange:function(e){
		this.setState({
			[e.target.name]:  e.target.value
		})
	},
	psdLogin:function(){
		var that=this;
		let psd=that.state.psd;
		let surePsd=that.state.surePsd;
		var toast = new Toast();
		if(psd!==surePsd){
			toast.show("两次密码不一致");
		}else{
			var phoneNum=that.props.location.state.phoneNum;
			var verifyCode=that.props.location.state.verifyCode;
			//调注册接口
			/*api.register(phoneNum,psd,verifyCode,function(res){
				if(res.code=="0000"){
					console.log(res.data);
					//自动登录
					api.login("PWD",phoneNum,"",psd,function(res){
							if(res.code=="0000"){
								console.log(res.data);
								localStorage.setItem("isLogin",true);
								localStorage.setItem("userId","userId");
								localStorage.setItem("firstFlag",true);
								let path = {
								  pathname:'/'
								}
								hashHistory.push(path);
								localStorage.setItem("phoneNumb",phoneNum);
							}
						})	
				}
			})*/
			
			
			let path = {
			  pathname:'/'
			}
			hashHistory.push(path);
			localStorage.setItem("isLogin",true);
			localStorage.setItem("firstFlag",true);
			localStorage.setItem("userId","userId");
			localStorage.setItem("phoneNumb",phoneNum);
		}
		
	},
	render:function(){
		var that=this;
		var phoneNum=this.props.location.state.phoneNum;
       return (
        	<div className="setPsd app_Box">
        		<Header title="确认密码" />
        		<div className="setPsdCon">
        			<div className="inputPsd">
    					<label htmlFor="psd">请输入密码</label>
    					<input id="psd"  type="password"  name="psd" placeholder="请输入密码" onChange={that.vauleChange}/>
    				</div>
    				<div className="inputPsd">
    					<label htmlFor="surePsd">请确认密码</label>
    					<input id="surePsd"  type="password"  name="surePsd" placeholder="请确认密码" onChange={that.vauleChange}/>
    				</div>
    				<div className="psdLogin" onClick={that.psdLogin}>登录</div>
        		</div>
        	</div>
        )
	}
	
});


export default SetPsd;


