'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import TimeCount from './timeCount';
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
			inputType:"password",
			changePhoneTxt:"",
			count: 60,
          	liked: true,
			getMsg:{
				style:{
						backgroundColor:"#ffa81e",
						color:"#ffffff"
					}
			},
			display:{
				display:"none"
			}
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
		var that=this;
		var wayNum=this.state.wayNum;
		var phoneNum=that.state.phoneNum;
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
					var psd=that.state.password;
					if(psd==""||psd==null){
						 toast.show("请输入密码",2000);
					}else{
//						api.login("PWD",phoneNum,psd,"",function(res){
//							
//						})
						//成功后
						localStorage.setItem("isLogin",true);
						localStorage.setItem("userId","userId");
						localStorage.setItem("firstFlag",true);
						localStorage.setItem("phoneNumb",phoneNum);
						toast.show("请求密码login",2000);
						var path = {
						  pathname:'/',
							}
						hashHistory.push(path);
						
					}
					break;
				case 2:
					var yzCode=that.state.yzCode;//输入验证码
					var verifyCode=that.state.verifyCode;//后台验证码
					if(yzCode==""||yzCode==null){
						 toast.show("请输入验证码",2000);
					}else if(yzCode==verifyCode){
						//验证码登录
						console.log("请求验证码login");
						var reg=that.state.reg;
						console.log(reg+"mmmmm"+that.state.verifyCode)
						if(reg){
							//已注册，调登录接口
						/*api.login("CODE",phoneNum,"",yzCode,function(res){
							
						})	*/	
							
						}else{
							//注册,去设置密码
							
						var data = {phoneNum:phoneNum,verifyCode:yzCode};
						var path = {
						  pathname:'/setPsd',
						  state:data,
						}
						hashHistory.push(path);
						}
						
					}else{
						toast.show("验证码不正确",2000);
					}
					break;
				default:
					break;
			}
			
		}
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
	
	changeMsgTxt:function(e){
		this.setState({
			getMsg: {
				getMsgTxt: e.target.value
			}
		})
	},
	
	changeInputTxt:function(e){
		this.setState({
			[e.target.name]:e.target.value
		})
	},
	getMsg:function(){
		var that=this;
		//input在disable且readonly之后，onClick会在iOS上触发不起来，onTouchEnd又会在Android上把键盘弹出来，这边笔者做了个Hack，ios下用onTouchEnd，android下用onClick，就正常了。
		let phoneNum=that.state.phoneNum;
		if(!(/^1[34578]\d{9}$/.test(phoneNum))){
			toast.show("请输入正确格式的手机号码",2000);
		}else{
			if(this.state.liked){
	          this.timer = setInterval(function () {
	            var count = this.state.count;
	            	that.setState({
	            		liked:false,
						getMsg:{
							style:{
									backgroundColor:"#aaaaaa",
									color:"#ffffff"
								},
						}
					})
	            count -= 1;
	            if (count < 1) {
	              this.setState({
	                liked: true,
	                getMsg:{
						style:{
								backgroundColor:"#ffa81e",
								color:"#ffffff"
							},
					}
	              });
	              count = 60;
	　　　　　　　　clearInterval(this.timer);
	            }
	            this.setState({
	              count: count
	            });
	          }.bind(this), 1000);
	        }
		
				that.setState({
						reg:false,
						verifyCode:"1234"
					})
			//发送短信验证码
			/*api.verifyCode(phoneNum,"REG",function(res){
				if(res.code=="0000"){
					var reg=res.data.reg;
					var verifyCode=res.data.verifyCode;
					that.setState({
						reg:false,
						verifyCode:"1234"
					})
				}else{
					toast.show(res.msg,2000);
				}
			})*/
			
		}
	},
	componentWillUnmount() {
	    clearInterval(this.timer);
	 },
	render:function(){
		var that=this;
		let backRouter=that.props.params.backRouter;
		let getMsgStyle=that.state.getMsg.style;
		let display=that.state.display;
		let getMsgTxt=that.state.getMsg.getMsgTxt;
		let disabled=that.state.getMsg.disabled;
		let changeMsgTxt=that.state.changeMsgTxt;
		 var text = this.state.liked ? '获取验证码' : this.state.count + '秒后重发';
        return (
        	<div className="login">
        		<Header title="登录" backRouter={backRouter}/>
        		<div className="loginCon">
        			<div className="loginWay">
        				<span className={that.state.wayNum==1?"wayActive":''} onClick={that.checkWay} id="1">密码登录</span>
        				<span className={that.state.wayNum==2?"wayActive":''} onClick={that.checkWay} id="2">验证码登录</span>
        			</div>
        			<div className="infoBox">
        				<form>
	        				<div className="inputLine">
	        					<label htmlFor="phoneNum">手机号</label>
	        					<input id="phoneNum"  type="text" onChange={that.changeInputTxt} className="flex1" name="phoneNum" placeholder="请输入手机号"/>
	        				</div>
	        				<div className="inputLine" id="psdBox">
	        					<label htmlFor="psd">密码</label>
	        					<span className="flex1 psdInput"><input id="psd" type={that.state.inputType} onChange={that.changeInputTxt} name="password" placeholder="请输入密码" /></span>
	      						<span className="eyes" id="eyes" onClick={that.eyesHandle}>
	      							{that.state.eyeImg}
	      						</span>
	        				</div>
	        				<div  className="inputLine" id="yzBox" style={display}>
	        					<label htmlFor="yzCode">验证码</label>
	        					<input className="flex1" id="yzCode" type="text" name="yzCode" placeholder="请输入验证码"  onChange={that.changeInputTxt} />
	      						<span onClick={that.getMsg} style={getMsgStyle} className="getMsg">{text}</span>
	      					{/*<input type="text" onClick={that.getMsg} placeholder="获取验证码" readOnly="readOnly" disabled={disabled} style={getMsgStyle} className="getMsg" id="getMsg"  value={getMsgTxt} onChange={that.changeMsgTxt}/>*/}
	        				</div>
	        			
	        				<a className="loginBtn" onClick={that.submitHandler}>登录</a>
        				</form>
        				<p className="forgotPsd">
        					<Link to="/ForgotPsd" >
        					忘记密码
							</Link>   
        				</p>
        				
        			</div>
        		</div>
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
        )
	}
	
});

export default Login;


