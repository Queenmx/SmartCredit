'use strict';
import React from "react";
import ReactDom from 'react-dom';
import { Router, Route, Link } from 'react-router';
var Footer=React.createClass({
	getInitialState:function(){
		return {
			//activeIndex:0
		}
	},
	render:function(){
		var activeIndex = this.props.activeIndex;
		 return (
	        <div className="tabBar" id="tabBar">
	          <Link  to="/">
                 <div data-id="0"><img src={activeIndex==0?"src/img/icon/home2.png":"src/img/icon/home.png"}  data-id="0"/></div> 
                <p className={activeIndex==0?"activeNav":""}>首页</p>
            </Link>
            <Link  to="/news">
					<div data-id="1"><img src={activeIndex==1?"src/img/icon/news2.png":"src/img/icon/news.png"}  data-id="1"/></div>
                <p className={activeIndex==1?"activeNav":""}>资讯</p>
            </Link>
            
            <Link  to="/mine">
				<div data-id="2"><img src={activeIndex==2?"src/img/icon/mine2.png":"src/img/icon/mine.png"}  data-id="2"/></div>
                <p className={activeIndex==2?"activeNav":""}>我的</p>
            </Link>
	        </div>
	    )
	}
   
})

export default Footer;