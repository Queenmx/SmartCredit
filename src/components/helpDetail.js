'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';

var appBasePath=globalData.appBasePath;
var HelpDetail=React.createClass({
	getInitialState:function(){
		return {
			
		}
	},
	helpDetail:function(){
		var data = {};
		var path = {
		  pathname:'/HelpDetail',
		  state:data,
		}
		hashHistory.push(path);
	},
	anp:function(e) {
            var $i = $("<b>").text("+" + 1);
            var x = e.pageX,
                y = e.pageY;
            $i.css({
                top: y - 20,
                left: x,
                position: "absolute",
                color: "#53a6ff"
            });
            $("body").append($i);
            $i.animate({
                top: y - 120,
                opacity: 0,
                "font-size": "1.4em"
            }, 1500, function() {
                $i.remove();
            });
            e.stopPropagation();
        },
	
	render:function(){
		var that=this;
        return (
        	<div className="app_Box helpDetail">
        		<Header title="问题详情" />
        		<div className="helpDetailCon">
        			<div className="helpDetailTxt">
        				<h4>如何还款</h4>
        				<p>我们支持两种还款方式，主动还款和系统自动还款，系统自动扣款根据绑定银行卡的先后顺序自动扣款。主动还款，用户在“账单”-“立即还款”可主动还款，可自主选择还款银行卡。</p>
        				<div className="solve">
        					<span onClick={that.anp}><img src="src/img/icon/yes.png"/>解决</span>
        					<span onClick={that.anp}><img src="src/img/icon/no.png"/>未解决</span>
        				</div>
        			</div>
        		</div>
        		
        	</div>
        )
	}
	
});


export default HelpDetail;


