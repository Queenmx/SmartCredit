'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';

var appBasePath=globalData.appBasePath;
var IdCard=React.createClass({
	getInitialState:function(){
		return {
			
		}
	},
	finishID:function(){
		var data = {};
		var path = {
		  pathname:'/Mine',
		  state:data,
		}
		hashHistory.push(path);
	},
	
	 upload :function(c, d){
    	var $c = document.querySelector(c),
        $d = document.querySelector(d),
        file = $c.files[0],
        reader = new FileReader();
	    reader.readAsDataURL(file);
	    reader.onload = function(e){
	    	$d.setAttribute("src", e.target.result);
    	}
	},
	
	render:function(){
		var that=this;
        return (
        	<div className="app_Box idCard">
        		<Header title="身份证认证" />
        		<div className="idCardCon content">
    				<h4>智能贷依法保护你的个人信息</h4>
					<div className="photoBox">
						<input id="face"  type="file" onChange={that.upload.bind(this,"#face","#faceImg")} accept="image/*"  />
						<img id="faceImg" src="src/img/face.png" />
						<p>身份证人头像,图片清晰,边缘完整</p>
					</div>
					<div className="photoBox">
						<input id="back" type="file" onChange={that.upload.bind(this,"#back","#backImg")} accept="image/*" />
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


