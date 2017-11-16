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
			third:[],
			four:[]
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
		console.log(that.state.valSelect);
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
/*	selectHandleThird:function(){
		console.log("第三");
		var that=this;
		var key1 = globalData.key;
		var toast=globalData.toast;
		var dictionaryId=event.target.getAttribute("data-dictionaryId");
		var indexId=event.target.getAttribute("data-indexId")*1;
		var txt=event.target.getAttribute("data-txt");
		if(that.state.four[indexId].isRequest){
			console.log("qingqiuguo");
			that.state.four[indexId].isShow=!that.state.four[indexId].isShow;
			if(that.state.four[indexId].isShow){
				$(event.target).next().show();
				//console.log($(event.target).next());
			}else{
				$(event.target).next().hide();
				//console.log($(event.target).next());
			}
			that.setState({third:that.state.third,four:that.state.four,second:that.state.second,qualifyListArr:that.state.qualifyListArr});
		}else{
			that.state.third[indexId].isRequest=true;
				console.log("qing");
				that.state.third[indexId].isShow=true;
				that.setState({third:that.state.third,second:that.state.second,qualifyListArr:that.state.qualifyListArr});
					api.dictionary(that.state.loanId,dictionaryId,"",function(res){
						//console.log(res);
						if(res.code=="0000"){
							var qualifyList =JSON.parse(strDec(res.data,key1,"",""));
							console.log(qualifyList);
							if(qualifyList.length>0){//说明有下级
								for (var i in qualifyList){
									that.state.four[indexId].push(<li className="levelInfo" key={Math.random()}>
										<label htmlFor={i}>{qualifyList[i].name}</label>
										<i data-dictionaryId={qualifyList[i].dictionaryId} style={{'color':'#333333'}} data-indexId={i} data-txt={qualifyList[i].name} className="selectValue" onClick={that.selectHandleThird}>请选择</i>
										<ul>
										</ul>
									</li>)
								}
							}else{//没有下级.点击即选
								console.log("没有下级");
								var activeIndexId=that.state.activeIndexId;
								that.state.valSelect[activeIndexId].selectName=txt;
								that.state.valSelect[activeIndexId].selectId=dictionaryId;
							}
							//console.log(that.state.valSelect[activeIndexId].selectName);
							that.setState({four:that.state.four,third:that.state.third,second:that.state.second,qualifyListArr:that.state.qualifyListArr,valSelect:that.state.valSelect});
						}
					},function(){
							toast.show("连接错误",2000);
					})
		}

		
	},*/
/*	selectHandleSecond:function(event){
		var that=this;
		var key1 = globalData.key;
		var toast=globalData.toast;
		var dictionaryId=event.target.getAttribute("data-dictionaryId");
		var indexId=event.target.getAttribute("data-indexId")*1;
		var txt=event.target.getAttribute("data-txt");
		if(that.state.third[indexId].isRequest){
			console.log("qingqiuguo");
			that.state.third[indexId].isShow=!that.state.third[indexId].isShow;
			if(that.state.third[indexId].isShow){
				$(event.target).next().show();
				//console.log($(event.target).next());
			}else{
				$(event.target).next().hide();
				//console.log($(event.target).next());
			}
			that.setState({third:that.state.third,second:that.state.second,qualifyListArr:that.state.qualifyListArr});
		}else{
			that.state.third[indexId].isRequest=true;
				console.log("qing");
				that.state.third[indexId].isShow=true;
				that.setState({third:that.state.third,second:that.state.second,qualifyListArr:that.state.qualifyListArr});
					api.dictionary(that.state.loanId,dictionaryId,"",function(res){
						//console.log(res);
						if(res.code=="0000"){
							var qualifyList =JSON.parse(strDec(res.data,key1,"",""));
							console.log(qualifyList);
							if(qualifyList.length>0){//说明有下级
								for (var i in qualifyList){
									that.state.four.push([]);
									that.state.four[i].isRequest=false;
									that.state.four[i].isShow=false;
									that.state.third[indexId].push(<li className="levelInfo" key={Math.random()}>
										<label htmlFor={i}>{qualifyList[i].name}</label>
										<i data-dictionaryId={qualifyList[i].dictionaryId} style={{'color':'#333333'}} data-indexId={i} className="selectValue" onClick={that.selectHandleThird}>请选择</i>
										<ul >
											{that.state.four[i]}
										</ul>
									</li>)
								}
							}else{//没有下级.点击即选
								console.log("没有下级");
								
								var activeIndexId=that.state.activeIndexId;
								that.state.valSelect[activeIndexId].selectName=txt;
								that.state.valSelect[activeIndexId].selectId=dictionaryId;
							}
							
							that.setState({third:that.state.third,second:that.state.second,qualifyListArr:that.state.qualifyListArr,valSelect:that.state.valSelect});
						}
					},function(){
							toast.show("连接错误",2000);
					})
		}

	},*/
	
	selectHandle:function(event){
		var that=this;
		var key1 = globalData.key;
		var toast=globalData.toast;
		var dictionaryId=event.target.getAttribute("data-dictionaryId");
		var indexId=event.target.getAttribute("data-indexId")*1;
		that.setState({activeIndexId:indexId});
		if(that.state.second[indexId].isRequest){
			console.log("qingqiuguo");
			that.state.second[indexId].isShow=!that.state.second[indexId].isShow;
			if(that.state.second[indexId].isShow){
				$(".levelInfoFirst"+indexId).show();
			}else{
				$(".levelInfoFirst"+indexId).hide();
			}
			that.setState({second:that.state.second,qualifyListArr:that.state.qualifyListArr});
		}else{
			that.state.second[indexId].isRequest=true;
				//console.log("qing")
				that.state.second[indexId].isShow=true;
				that.setState({second:that.state.second,qualifyListArr:that.state.qualifyListArr});
					api.dictionary(that.state.loanId,dictionaryId,"",function(res){
						//console.log(res);
						if(res.code=="0000"){
							var qualifyList =JSON.parse(strDec(res.data,key1,"",""));
							//console.log(qualifyList);
							if(qualifyList.length>0){//说明有下级
								for (var i in qualifyList){
									that.state.third.push([]);
									that.state.third[i].isRequest=false;
									that.state.third[i].isShow=false;
									that.state.second[indexId].push(<li className="levelInfo" key={i}>
										<label htmlFor={i}>{qualifyList[i].name}</label>
										<i data-dictionaryId={qualifyList[i].dictionaryId} style={{'color':'#333333'}} data-indexId={i} className="selectValue" data-txt={qualifyList[i].name} onClick={that.selectHandleSecond}>请选择</i>
										<ul >
											{that.state.third[i]}
										</ul>
									</li>)
								}
							}else{//没有下级.点击即选
								console.log("没有下级");
								
							}
							
							that.setState({third:that.state.third,second:that.state.second,qualifyListArr:that.state.qualifyListArr,valSelect:that.state.valSelect});
						}
					},function(){
							toast.show("连接错误",2000);
					})
		}
	},
	componentDidMount:function(){
		var that=this;
		var qualifyList=that.props.location.state.qualifyList;
		console.log(qualifyList);
		//var qualifyListArr=[];
		for (var i in qualifyList){
			var selectName=qualifyList[i].selectName;
			if(selectName!=""&&selectName!=null){
				that.state.activeFont=true;
			}else{
				that.state.activeFont=false;
			}
			that.state.second.push([]);
			that.state.second[i].isShow=false;
			that.state.second[i].isRequest=false;
			that.state.valSelect.push([]);
			that.state.valSelect[i].selectName=selectName;
			that.state.valSelect[i].selectId=qualifyList[i].selectId;
			that.state.qualifyListArr.push(<li className="levelInfo" key={i}>
				<label htmlFor={i}>{qualifyList[i].dictionaryName}</label>
				{/*<input type="text" id={i} className="selectValue" readOnly="readonly" name={'val'+i} data-dictionaryId={qualifyList[i].dictionaryId} value={that.state.valSelect[i]} onChange={that.selectHandle} placeholder="请选择"/>*/}
				<i data-dictionaryId={qualifyList[i].dictionaryId} style={{'color':that.state.activeFont?'#53a6ff':'#333333'}} data-indexId={i} data-txt={qualifyList[i].name}  className="selectValue" onClick={that.selectHandle}>{that.state.valSelect[i].selectName||'请选择'}</i>
				<ul className={"levelInfoFirst"+i} >
					{that.state.second[i]}
				</ul>
			</li>)
		}
		that.setState({second:that.state.second,qualifyListArr:that.state.qualifyListArr,valSelect:that.state.valSelect});
		
	}
});


export default ApplyLevel;


