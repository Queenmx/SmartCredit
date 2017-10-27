'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';

var appBasePath=globalData.appBasePath;
var Order=React.createClass({
	getInitialState:function(){
		return {
			
		}
	},
	
	componentWillMount:function(){
		
	},
	
	
	render:function(){
		var that=this;
		//console.log("cityId",cityId);
		
        return (
        	<div className="app_Box">
        	</div>
        )
	}
});


export default Order;


