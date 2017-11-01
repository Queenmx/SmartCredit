'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import { hashHistory} from 'react-router';

var toast=new Toast();
var ForgotPsd=React.createClass({
	getInitialState:function(){
		return {
			getMsg:{
				style:{
						backgroundColor:"#ffa81e",
						color:"#ffffff"
					},
				getMsgTxt:"获取验证码",
				disabled:false
			},
		}
	},
	changeMsgTxt:function(e){
		this.setState({
			getMsg: {
				getMsgTxt: e.target.value
			}
		})
	},
	getMsg:function(){
		var that=this;
		//input在disable且readonly之后，onClick会在iOS上触发不起来，onTouchEnd又会在Android上把键盘弹出来，这边笔者做了个Hack，ios下用onTouchEnd，android下用onClick，就正常了。
		let phoneNum=that.state.phoneNum;
		if(!(/^1[34578]\d{9}$/.test(phoneNum))){
			toast.show("请输入正确格式的手机号码",2000);
		}else{
			setTimeout(function(){
				var time=11;
				var timeevt=setInterval(function(){
						time--;
						that.setState({
							getMsg:{
								style:{
										backgroundColor:"#aaaaaa",
										color:"#ffffff"
									},
								getMsgTxt:time+"s后重新获取",
								disabled:true
							}
						})
						
						if(time==0){
							clearInterval(timeevt);
							that.setState({
								getMsg:{
									style:{
											backgroundColor:"#ffa81e",
											color:"#ffffff"
										},
								getMsgTxt:"获取验证码",
								disabled:false
								}
							})
						}
					},1000)
			},1000);
		}
	},
	vauleChange:function(e){
		this.setState({
			[e.target.name]:  e.target.value
		})
	},
	yzHandle:function(){
		var that=this;
		let phoneNum=that.state.phoneNum;
		let yzCode=that.state.yzCode;
		var toast = new Toast();
		if(phoneNum&&yzCode){
			let path = {
				  pathname:'/Repsd'
				}
				hashHistory.push(path);
			toast.show("验证通过",2000);
		}else{
			toast.show("输入不能为空",2000);
		}
	},
	render:function(){
		var that=this;
		let getMsgStyle=that.state.getMsg.style;
		let display=that.state.display;
		let getMsgTxt=that.state.getMsg.getMsgTxt;
		let disabled=that.state.getMsg.disabled;
		let changeMsgTxt=that.state.changeMsgTxt;
		//var phoneNum=this.props.location.state.phoneNum;
       return (
        	<div className="forgotPsd app_Box">
        		<Header title="忘记密码" />
        		<div className="forgotPsdCon">
        			<div className="inputPsd">
    					<label htmlFor="phoneNum">手机号</label>
    					<input id="phoneNum"  type="number"  name="phoneNum" placeholder="请输入手机号" onChange={that.vauleChange}/>
    				</div>
    				
    				<div className="inputPsd">
    					<label htmlFor="yzCode">验证码</label>
    					<input id="yzCode" className="shortInput"  type="text"  name="yzCode" placeholder="请输入验证码" onChange={that.vauleChange}/>
    					<input type="text" onClick={that.getMsg} placeholder="获取验证码" readOnly="readOnly" disabled={disabled} style={getMsgStyle} className="getMsg" id="getMsg"  value={getMsgTxt} onChange={that.changeMsgTxt}/>
    				</div>
    				<div className="psdLogin" onClick={that.yzHandle}>验证</div>
        		</div>
        	</div>
        )
	}
	
});


export default ForgotPsd;


