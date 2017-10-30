'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';
import '../css/login.css';
var toast = new Toast();
var appBasePath=globalData.appBasePath;
var Login=React.createClass({
	getInitialState:function(){
		var eyeImg=[<img src="src/img/icon/by.png" key={"by"}/>];
		//eyeImg.push('<img src="src/img/icon/by.png" />');
		return {
			wayNum:1,
			eyeImg:eyeImg,
			inputType:"password"
		}
	},
	checkWay:function(e){
		var id=e.target.id*1;
		this.setState({
			wayNum:id
			//loadingstate:2
		});
		switch (id){
			case 1:
				$("#psdBox").show();
				$("#yzBox").hide();
				break;
			case 2:
				$("#psdBox").hide();
				$("#yzBox").show();
				break;
			default:
				break;
		}
		
	},
	submitHandler:function(){
		var wayNum=this.state.wayNum;
		var phoneNum=$("#phoneNum").val().trim();
		if(!(/^1[34578]\d{9}$/.test(phoneNum))){
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
			switch (wayNum){
				case 1:
					var psd=$("#psd").val();
					if(psd==""||psd==null){
						 toast.show("请输入密码",2000);
					}else{
						toast.show("请求密码login",2000);
					}
					break;
				case 2:
					var yzCode=$("#yzCode").val();
					if(yzCode==""||yzCode==null){
						 toast.show("请输入验证码",2000);
					}else{
						console.log("请求验证码login");
						var data = {phoneNum:phoneNum,title:"设置密码"};
						var path = {
						  pathname:'/setPsd',
						  state:data,
						}
						hashHistory.push(path);
					}
					break
				default:
					break;
			}
			
		}
	},
	
	
	componentDidMount:function(){
		var that=this;
		/*api.queryBanner(function(data){
				console.log(data);
				if(data.result=="000000"){
					that.setState({
						isShow: true,
		                
		               // dataStatus: 0
		            },()=>{
		               
		            });
				}else{
					
				}
				
			});*/
		    
	},
	eyesHandle:function(){
		var type=$("#psd")[0].type;
		var eyeImg=[];
		if(type=="password"){
			eyeImg.push(<img src="src/img/icon/zy.png" key={"zy"}/>);
			this.setState({
				inputType:"text",
				eyeImg:eyeImg
			})
			
		}else{
			eyeImg.push(<img src="src/img/icon/by.png" key={"by"}/>);
			this.setState({
				inputType:"password",
				eyeImg:eyeImg
			})
		}
	},
	render:function(){
		var that=this;
		var backRouter=this.props.params.backRouter;
		var display={
			display:"none"
		}
		
        return (
        	<div className="login">
        		<Header title="登录" backRouter={backRouter}/>
        		<div className="loginCon">
        			<div className="loginWay">
        				<span className={this.state.wayNum==1?"wayActive":''} onClick={this.checkWay} id="1">密码登录</span>
        				<span className={this.state.wayNum==2?"wayActive":''} onClick={this.checkWay} id="2">验证码登录</span>
        			</div>
        			<div className="infoBox">
        				<form>
	        				<div className="inputLine">
	        					<label htmlFor="phoneNum">手机号</label>
	        					<input id="phoneNum"  type="number"  className="flex1" name="phoneNum" placeholder="请输入手机号"/>
	        				</div>
	        				<div className="inputLine" id="psdBox">
	        					<label htmlFor="psd">密码</label>
	        					<span className="flex1 psdInput"><input id="psd" type={this.state.inputType} name="password" size="80" placeholder="请输入密码" /></span>
	      						<span className="eyes" id="eyes" onClick={this.eyesHandle}>
	      							{this.state.eyeImg}
	      						</span>
	        				</div>
	        				<div  className="inputLine" id="yzBox" style={display}>
	        					<label htmlFor="yzCode">验证码</label>
	        					<input className="flex1" id="yzCode" type="text" name="yzCode" placeholder="请输入验证码" />
	      						<span className="getMsg" id="getMsg" size="6">获取验证码</span>
	        				</div>
	        			
	        				<a className="loginBtn" onClick={this.submitHandler}>登录</a>
        				</form>
        				<p className="note">
        					<span>登录即表示您同意</span>
        					<Link to={   
							         {   
							             pathname:"/txt",   
							             //hash:'#ahash',    
							             state:{title: '智能贷协议',backRouter:'/Login'}    
							             //state:{data:'hello'}     
							         }   
							    } >
        					智能贷协议
							</Link>   
        				</p>
        			</div>
        		</div>
        	</div>
        )
	}
	
});

export default Login;


