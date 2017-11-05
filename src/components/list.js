'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';
import ProList from './proList';

var appBasePath=globalData.appBasePath;
var List=React.createClass({
	getInitialState:function(){
		return {
			activeTab: 1,
			isShow: false,
			activeIndex:0
		}
	},
	
	componentWillMount:function(){
		
	},
	
	toListDetail:function(){
		var data = {id:3,name:"qin",age:18};
		var path = {
		  pathname:'/ListDetail',
		  query:data,
		}
		hashHistory.push(path);
	},
	render:function(){
		var that=this;
		var title=that.props.location.state.title;
		//console.log("cityId",cityId);
		
        return (
        	<div className="app_Box home">
      			<Header title={title}/>
	        	<div className="content">
					<ProList scollFlag="true"/>
	        	</div>
        	</div>
        )
	}
});


export default List;


