'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';

var key1 = globalData.key;
var toast=globalData.toast;
var IdCard=React.createClass({
	getInitialState:function(){
		return {
			flag:false
		}
	},
	finishID:function(){
		var that=this;
		var faceImgData=that.state.faceImg;
		var backImgData=that.state.backImg;
		that.setState({
				flag:true
			})
		api.identityUserCert(backImgData,faceImgData,function(res){
			console.log(res);
			if(res.code=="0000"){
				that.setState({
					flag:false
				})
				var data =JSON.parse(strDec(res.data,key1,"",""));
				console.log(data);
					var queryData = {};
					var path = {
					  pathname:'/Mine',
					  state:queryData,
					}
					hashHistory.push(path);
			}else if(res.code=="5555"){
				that.setState({
					flag:false
				})
				toast.show("登录过时，请重新登录",2000);
				var path = {
				  pathname:'/Login',
				}
				hashHistory.push(path);
			}else{
				that.setState({
					flag:false
				})
				toast.show(res.msg,2000);
			}
		},function(){
			that.setState({
					flag:false
				})
			toast.show("连接错误",2000);
		})
		
		
	
	},
	componentDidMount:function(){
		/*api.userInfo(function(res){
			//console.log(res);
			if(res.code=="0000"){
				var data =JSON.parse(strDec(res.data,key1,"",""));
				console.log(data);
			}else if(res.code=="5555"){
				toast.show("登录过时，请重新登录",2000);
				var path = {
				  pathname:'/Login',
				}
				hashHistory.push(path);
			}else{
				toast.show(res.msg,2000);
			}
		},function(){
			toast.show("连接错误",2000);
		})*/
	},
	 upload :function(c, d,name){
	 	var that=this;
    	var $c = document.querySelector(c),
        $d = document.querySelector(d),
        file = $c.files[0],
        reader = new FileReader();
	    //reader.readAsBinaryString(file,'gb2312');
	    reader.readAsDataURL(file);
	    reader.onload = function(e){
	    	// 这个事件在读取结束后，无论成功或者失败都会触发
			if (reader.error) {
				console.log(reader.error);
			} else {
				that.setState({
					[name]:e.target.result
				})
				$d.setAttribute("src", e.target.result);
	    		console.log( e.target.result);
			}
	    	
    	}
	},
	
	render:function(){
		console.log(this.state);
		var that=this;
        return (
        	<div className="app_Box idCard">
        		<Header title="身份证认证" />
        		<Loading flag={that.state.flag}/>
        		<div className="idCardCon content">
    				<h4>智能贷依法保护你的个人信息</h4>
					<div className="photoBox">
						<input id="face"  type="file" onChange={that.upload.bind(this,"#face","#faceImg","faceImg")} accept="image/*"  />
						<img id="faceImg" src="src/img/face.png" />
						<p>身份证人头像,图片清晰,边缘完整</p>
					</div>
					<div className="photoBox">
						<input id="back" type="file" onChange={that.upload.bind(this,"#back","#backImg", "backImg")} accept="image/*" />
						<img id="backImg" src="src/img/back.png"/>
						<p>身份证反面照,图片清晰,边缘完整</p>
					</div>
        		</div>
        		<div  className="botBtn" onClick={that.finishID}>完成身份验证</div>
        	</div>
        )
	}
	
});


export default IdCard;


