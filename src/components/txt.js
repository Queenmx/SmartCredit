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
	
	render:function(){
		var txtData=this.props.location;
		var title=txtData.state.title;
		var backRouter=txtData.state.backRouter;
		console.log(title+"哈哈哈哈哈"+backRouter);
        return (
        	<div className="txt">
        		<Header title={title} />
        		协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议
        	</div>
        )
	}
	
});


export default Txt;


