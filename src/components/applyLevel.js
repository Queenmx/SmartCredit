'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';

var toast = new Toast();
var appBasePath=globalData.appBasePath;
var ApplyLevel=React.createClass({
	getInitialState:function(){
		return {
			checked:true,
			activequalifyListArr:[],
			valSelect:[],
			activeFont:false,
			qualifyListArr:[],
			second:[],
			third:[]
		}
	},
	
	componentWillMount:function(){
		var loanId=this.props.location.state.loanId;
		this.setState({loanId:loanId});
	},
	toBack:function(){
		const backRouter = this.props.backRouter;
        if (backRouter) {
            hashHistory.push(backRouter);
        } else {
            window.history.back()
        }
	},
	toApplyResult:function(){
		if(!this.state.checked){
			toast.show("请同意智能贷服务协议",2000);
		}else{
			var data = {id:3,name:"qin",age:18};
			var path = {
			  pathname:'/ApplyResult',
			  state:data,
			}
			hashHistory.push(path);
		}
	},
	agreeRule:function(event){
		//console.log(event.target.checked);
		this.setState({
			checked:event.target.checked
		})
	},
	
	render:function(){
		var that=this;
        return (
        	<div className="app_Box applyFlow">
      			<div className="header">
	        		<div className="toBack" onClick={that.toBack}><img src="src/img/icon/backWhite.png"/></div>
		        	<p className="title">申请人资质</p>
		        	<div className="headerLinkBtn"></div>
	        	</div>
	        	<div className="applyLevelCon content">
					<ul className="stepBox">
						<li>
							<h1 className="stepActive">1</h1>
							<p>申请人信息</p>
						</li>
						<span></span>
						<li>
							<h1 className="stepActive">2</h1>
							<p>申请人资质</p>
						</li>
						<span></span>
						<li>
							<h1>3</h1>
							<p>申请结果</p>
						</li>
					</ul>
					<div className="applyLevel">
						<form className="applyLevelForm">
							<ul className="applyLevelZero">
								{that.state.qualifyListArr}
								{/*<li className="levelInfo">
									<label htmlFor="job">职业身份</label>
									<input type="text" id="job" readOnly="readonly"  placeholder="请选择"/>
									<ul>
										
									</ul>
								</li>
								<li className="levelInfo">
									<label htmlFor="publicMoney">是否有本地公积金</label>
									<input type="text" id="publicMoney" readOnly="readonly" placeholder="请选择"/>
									<ul>
									</ul>
								</li>
								<li className="levelInfo">
									<label htmlFor="social">是否有本地社保</label>
									<input type="text" id="social" readOnly="readonly"  placeholder="请选择"/>
									<ul>
										
									</ul>
								</li>
								<li className="levelInfo">
									<label htmlFor="house">名下房产类型</label>
									<input type="text" id="house" readOnly="readonly"  placeholder="请选择"/>
									<ul>
									</ul>
								</li>
								<li className="levelInfo">
									<label htmlFor="car">名下是否有车</label>
									<input type="text" id="car" readOnly="readonly"  placeholder="请选择"/>
									<ul>
									</ul>
								</li>
								<li className="levelInfo">
									<label htmlFor="credit">你的信用情况</label>
									<input type="text" id="credit" readOnly="readonly"  placeholder="请选择"/>
									<ul>
									</ul>
								</li>
								<li className="levelInfo">
									<label htmlFor="age">年龄</label>
									<span>岁</span>
									<input type="text" id="age"   placeholder="请输入内容"/>
									
									<ul>
									</ul>
								</li>
								<li className="levelInfo">
									<label htmlFor="history">是否申请过捷信分期付款</label>
									<input type="text" id="history" readOnly="readonly"  placeholder="请选择"/>
									<ul>
									</ul>
								</li>*/}
							</ul>
							
							
						</form>
					
						<div className="rule">
							<input className="magic-checkbox" type="checkbox"  id="ruleCheck" checked={that.state.checked}  onChange={that.agreeRule}/>
							<label htmlFor="ruleCheck">我已同意</label>
							<Link to={   
							         {   
							             pathname:"/txt",   
							             //hash:'#ahash',    
							             state:{title: '智能贷服务条款',backRouter:'/Login'}    
							         }   
							    } >
	    					《智能贷服务条款》
							</Link>   
							
						</div>
					</div>
	        	</div>	
	        	<div className="botBtn footer" onClick={that.toApplyResult}>下一步</div>
        	</div>
        )
	},
	selectHandleSecond:function(event){
		var that=this;
		var key1 = globalData.key;
		var toast=globalData.toast;
		var dictionaryId=event.target.getAttribute("data-dictionaryId");
		var indexId=event.target.getAttribute("data-indexId")*1;
		api.dictionary(that.state.loanId,dictionaryId,"",function(res){
			console.log(res);
			if(res.code=="0000"){
				var qualifyList =JSON.parse(strDec(res.data,key1,"",""));
				console.log(qualifyList);
				for (var i in qualifyList){
					that.state.third[indexId].push(<li className="levelInfo levelInfoThird" key={i}>
						<label htmlFor={i}>{qualifyList[i].name}</label>
						<i data-dictionaryId={qualifyList[i].dictionaryId} style={{'color':'#333333'}} data-indexId={i} className="selectValue" onClick={that.selectHandleThird}>请选择</i>
						<ul className="levelInfoThird">
						</ul>
					</li>)
				}
				that.setState({third:that.state.third})
			}
		},function(){
				toast.show("连接错误",2000);
		})
	},
	
	selectHandle:function(event){
		var that=this;
		var key1 = globalData.key;
		var toast=globalData.toast;
		var dictionaryId=event.target.getAttribute("data-dictionaryId");
		var indexId=event.target.getAttribute("data-indexId")*1;
		//console.log(dictionaryId);
		api.dictionary(that.state.loanId,dictionaryId,"",function(res){
			//console.log(res);
			if(res.code=="0000"){
				var qualifyList =JSON.parse(strDec(res.data,key1,"",""));
				console.log(qualifyList);
				for (var i in qualifyList){
					that.state.third.push([]);
					that.state.second[indexId].push(<li className="levelInfo" key={i}>
						<label htmlFor={i}>{qualifyList[i].name}</label>
						<i data-dictionaryId={qualifyList[i].dictionaryId} style={{'color':'#333333'}} data-indexId={i} className="selectValue" onClick={that.selectHandleSecond}>请选择</i>
						<ul className="levelInfoSecond">
							{that.state.third[i]}
						</ul>
					</li>)
					
				}
				that.setState({second:that.state.second,third:that.state.third})
			}
		},function(){
				toast.show("连接错误",2000);
		})
	},
	componentDidMount:function(){
		var that=this;
		var qualifyList=that.props.location.state.qualifyList;
		//console.log(qualifyList);
		//var qualifyListArr=[];
		for (var i in qualifyList){
			var selectName=qualifyList[i].selectName;
			if(selectName!=""&&selectName!=null){
				that.state.activeFont=true;
			}else{
				that.state.activeFont=false;
			}
			that.state.second.push([]);
			that.state.valSelect.push(selectName);
			that.state.qualifyListArr.push(<li className="levelInfo" key={i}>
				<label htmlFor={i}>{qualifyList[i].dictionaryName}</label>
				{/*<input type="text" id={i} className="selectValue" readOnly="readonly" name={'val'+i} data-dictionaryId={qualifyList[i].dictionaryId} value={that.state.valSelect[i]} onChange={that.selectHandle} placeholder="请选择"/>*/}
				<i data-dictionaryId={qualifyList[i].dictionaryId} style={{'color':that.state.activeFont?'#53a6ff':'#333333'}} data-indexId={i}  className="selectValue" onClick={that.selectHandle}>{that.state.valSelect[i]||'请选择'}</i>
				<ul className="levelInfoFirst">
					{that.state.second[i]}
				</ul>
			</li>)
			
		}
		that.setState({qualifyListArr:that.state.qualifyListArr,valSelect:that.state.valSelect,second:that.state.second});
		//console.log(that.state.qualifyListArr);
	}
});


export default ApplyLevel;


