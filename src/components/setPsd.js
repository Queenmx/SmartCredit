'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory} from 'react-router';
var key1 = globalData.key;
var appBasePath=globalData.appBasePath;
var SetPsd=React.createClass({
	getInitialState:function(){
		return {
			isLoading:false
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
			var fromWhy=that.props.location.state.fromWhy;
			that.setState({isLoading:true})
			console.log(that.props.location.state);
			if(fromWhy=="register"){//调注册接口
				api.register(phoneNum,psd,verifyCode,function(res){
					console.log(res);
					if(res.code=="0000"){
						var data = JSON.parse(strDec(res.data,key1,"",""));
						console.log(data);
						//自动登录
						api.login("PWD",phoneNum,psd,"",function(res){
							console.log(res);
								if(res.code=="0000"){
									that.setState({isLoading:false})
									var data =strDec(res.data,key1,"","");
									//console.log(data);
									//成功后
									localStorage.setItem("user",data);
									localStorage.setItem("isLogin",true);
									localStorage.setItem("phoneNum",phoneNum);
									var user=JSON.parse(data);
									globalData.user=data;
									globalData.userId=user.userId;
									globalData.requestData.token=user.token;
									toast.show("登录成功",2000);
									var path = {
									  pathname:'/',
										}
									hashHistory.push(path);
								}else{
									that.setState({isLoading:false})
									toast.show(res.msg,2000);
								}
							},function(){
								that.setState({isLoading:false})
								toast.show("连接错误",2000);
							})	
						}else{
							that.setState({isLoading:false})
							toast.show(res.msg,2000);
						}
					},function(){
						that.setState({isLoading:false})
						toast.show("连接错误",2000);
					})
			}else{//忘记密码，设置密码登陆phone, pwd, verifyCode,
				api.forgot(phoneNum,psd,verifyCode,function(res){
					console.log(res);
					if(res.code=="0000"){
						that.setState({isLoading:false})
						var data =strDec(res.data,key1,"","");
						//console.log(data);
						toast.show("密码设置成功,请登录",2000);
						localStorage.setItem("phoneNum",phoneNum);
						var path = {
						  pathname:'/Login/',
							}
						hashHistory.push(path);
					}else{
						that.setState({isLoading:false})
						toast.show(res.msg,2000);
					}
				},function(){
					that.setState({isLoading:false})
					toast.show("连接错误",2000);
				})	
			}
			
			
		}
		
	},
	render:function(){
		var that=this;
		var phoneNum=this.props.location.state.phoneNum;
       return (
        	<div className="setPsd app_Box">
        		<Header title="确认密码" />
        		<Loading flag={that.state.isLoading}/>
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


