'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';
import '../css/problem.css';


var toast=globalData.toast;
var key1 = globalData.key;
var Ask = React.createClass({
    getInitialState: function () {
        return {
            content: '',
            title:""
        }
    },

    componentWillMount: function () {
		var fromWho=this.props.location.query.fromWho;
		
		if(fromWho=="help"){//反馈建议
			this.setState({
				title:"我要反馈",
				head:"感谢您宝贵的建议，我们将为您提供更优质的服务",
				placeholder:"反馈",
				fromWho:"help"
			})
		}else{
			var loanName=this.props.location.query.loanName;
			this.setState({
				title:"我要提问",
				head:"向"+loanName+"提问",
				placeholder:"问题",
				fromWho:"problem"
			})
		}
    },

    submitAsk: function () {
        var content = this.state.content;
        if(content.length>0){
        	if(this.state.fromWho=="help"){//反馈建议
    			api.feedBackAdd(content,function(res){
					console.log(res);
					if(res.code=="0000"){
						toast.show("提交成功",2000);
				        window.history.back();
					}else{
						toast.show(res.msg,2000);
					}
				},function(){
					toast.show("连接错误",2000);
				})
	    	}else{//提问问题
	    		var objId=this.props.location.query.objId;
		       	var objType=this.props.location.query.objType;
		        api.questionAdd(content,objId,objType,function(res){
					//console.log(res);
					if(res.code=="0000"){
						toast.show("提交成功",2000);
				        window.history.back();
					}else{
						toast.show(res.msg,2000);
					}
				},function(){
					toast.show("连接错误",2000);
				})
	    	}
        	
        	
        	
        }else{
        	toast.show("请输入内容",2000);
        }
     
    },
	upText:function(event){
		var upTextCon=event.target.value;
		if(upTextCon.length>200){
			toast.show("请将字数控制在200字以内",2000);
		}else{
			this.setState({
				content:upTextCon
			})
		}
		
		
	},
    render: function () {
        var that = this;
        //console.log("cityId",cityId);

        return (
            <div className="app_Box ask">
                <Header title={that.state.title} />
                <div className="askCon content">
                    <p>{that.state.head}</p>
                    <textarea placeholder="描述(200个字以内)" value={that.state.content} onChange={that.upText}></textarea>
                </div>
                <div className="botBtn" onClick={that.submitAsk}>提交</div>
            </div>
        )
    }
});


export default Ask;


