'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';


var appBasePath=globalData.appBasePath;
var SetPsd=React.createClass({
	getInitialState:function(){
		return {
			
		}
	},
	
	render:function(){
		var phoneNum=this.props.location.state.phoneNum;
		var title=this.props.location.state.title;
       return (
        	<div className="txt">
        		<Header title={title} />
        		{phoneNum}
        	</div>
        )
	}
	
});


export default SetPsd;


