'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import { hashHistory } from 'react-router';

var Header=React.createClass({
	getInitialState:function(){
		return {
			//headerLink: 0,//0无，1我要还款；2分享；3添加银行卡；4编辑；5保存
		}
	},
	toHuanKuan:function(){
		console.log("huan")
	},
	toShare:function(){
		console.log("share")
	},
	toAddBankCard:function(){
		console.log("bank")
	},
	toEdit:function(){
		console.log("bianji")
	},
	toSave:function(){
		console.log("save")
	},
	toBack:function(){
		const backRouter = this.props.backRouter;
        if (backRouter) {
            hashHistory.push(backRouter);
          /*hashHistory.push({  
		        pathname: '/Mine',  
		        query: {  
		            name:'qin',  
		            price:'100'  
		        }  
		    })  */  
			
			
        } else {
        	 
            window.history.back()
        }
		
		
	},
	componentWillMount:function(){
		var that=this;
		var headerLink=that.props.headerLink||"0";
		var headerLinkBtn=[];
		switch (headerLink){
			case "0":
				headerLinkBtn.push(<div className="headerLinkBtn" key="0"></div>);
				break;
			case "1":
				headerLinkBtn.push(<div className="headerLinkBtn" key="1" onClick={that.toHuanKuan}>我要还款</div>);
				break;
			case "2":
				headerLinkBtn.push(<div className="headerLinkBtn" key="2" onClick={that.toShare}><img src="src/img/icon/home2.png"/></div>);
				break;
			case "3":
				headerLinkBtn.push(<div className="headerLinkBtn" key="3" onClick={that.toAddBankCard}>添加银行卡</div>);
				break;
			case "4":
				headerLinkBtn.push(<div className="headerLinkBtn" key="4" onClick={that.toEdit}>编辑</div>);
				break;
			case "5":
				headerLinkBtn.push(<div className="headerLinkBtn" key="5" onClick={that.toSave}>保存</div>);
				break;
			default:
				break;
		}
		//console.log(headerLink);
		that.setState({
			headerLinkBtn:headerLinkBtn
		});
	},
	render:function(){
		var title=this.props.title;
        return (
        	<div className="header">
        		<div className="toBack" onClick={this.toBack}><img src="src/img/icon/back.png"/></div>
	        	<p className="title">{title}</p>
	        	{this.state.headerLinkBtn}
        	</div>
        )
	}
});

export default Header;


