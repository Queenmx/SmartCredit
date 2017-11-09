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
			qualifyListArr:[],
			second:[],
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
		var that=this;
		if(!this.state.checked){
			toast.show("请同意智能贷服务协议",2000);
		}else{
			const qualifyList=that.state.valSelect; 
			//console.log(qualifyList);
			api.qualifyListAdd(qualifyList,function(res){
				console.log(res);
				if(res.code=="0000"){
					var data =JSON.parse(strDec(res.data,key1,"",""));
					console.log(data);
				}
			},function(){
					toast.show("连接错误",2000);
			})
			
			/*var data = {id:3,name:"qin",age:18};
			var path = {
			  pathname:'/ApplyResult',
			  state:data,
			}
			hashHistory.push(path);*/
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

	checkHandle:function(event){
		var that=this;
		var toast=globalData.toast;
		var selectId=event.target.getAttribute("data-dictionaryId");
		var parentIndex=event.target.getAttribute("data-parentIndex")*1;
		var txt=event.target.innerHTML;
		var activeIndexId=that.state.activeIndexId;
		that.state.valSelect[parentIndex].selectName=txt;
		that.state.valSelect[parentIndex].selectId=selectId;
		$(".levelInfoFirst"+parentIndex).hide();
		that.state.second[parentIndex].isShow=!that.state.second[parentIndex].isShow;
		that.setState({second:that.state.second,qualifyListArr:that.state.qualifyListArr});
		$(".selectValue"+parentIndex).html(txt);
		
	},
	
	selectHandle:function(event){
		var that=this;
		var key1 = globalData.key;
		var toast=globalData.toast;
		var dictionaryId=event.target.getAttribute("data-dictionaryId");
		var indexId=event.target.getAttribute("data-indexId")*1;
		that.setState({activeIndexId:indexId});
		if(that.state.second[indexId].isRequest){
			that.state.second[indexId].isShow=!that.state.second[indexId].isShow;
			if(that.state.second[indexId].isShow){
				$(".levelInfoFirst"+indexId).show();
			}else{
				$(".levelInfoFirst"+indexId).hide();
			}
			that.setState({second:that.state.second,qualifyListArr:that.state.qualifyListArr});
		}else{
			that.state.second[indexId].isRequest=true;
				that.state.second[indexId].isShow=true;
				that.setState({second:that.state.second,qualifyListArr:that.state.qualifyListArr});
					api.dictionary(that.state.loanId,dictionaryId,"",function(res){
						//console.log(res);
						if(res.code=="0000"){
							var qualifyList =JSON.parse(strDec(res.data,key1,"",""));
							console.log(qualifyList);
							if(qualifyList.length>0){//说明有下级
								for (var i in qualifyList){
									that.state.second[indexId].push(<li className="second"  data-parentIndex={indexId}     data-dictionaryId={qualifyList[i].dictionaryId} style={{'color':'#333333'}}  onClick={that.checkHandle} key={i}>
										{qualifyList[i].name}
									</li>)
								}
							}else{//没有下级.点击即选
								console.log("没有下级");
								
							}
							that.setState({second:that.state.second,qualifyListArr:that.state.qualifyListArr,valSelect:that.state.valSelect});
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
			that.state.second.push([]);
			that.state.second[i].isShow=false;
			that.state.second[i].isRequest=false;
			that.state.valSelect.push([]);
			that.state.valSelect[i].userId=globalData.userId;
			that.state.valSelect[i].dictionaryId=qualifyList[i].dictionaryId;
			that.state.valSelect[i].dictionaryName=qualifyList[i].dictionaryName;
			that.state.valSelect[i].dictionaryParentId=qualifyList[i].dictionaryParentId;
			that.state.valSelect[i].selectName=qualifyList[i].selectName;
			that.state.valSelect[i].selectId=qualifyList[i].selectId;
			that.state.qualifyListArr.push(<li className="levelInfo" key={i}>
				<label htmlFor={i}>{qualifyList[i].dictionaryName}</label>
				{/*<input type="text" id={i} className="selectValue" readOnly="readonly" name={'val'+i} data-dictionaryId={qualifyList[i].dictionaryId} value={that.state.valSelect[i]} onChange={that.selectHandle} placeholder="请选择"/>*/}
				<i data-dictionaryId={qualifyList[i].dictionaryId}   style={{'color':'#333333'}} data-indexId={i} data-txt={qualifyList[i].name}  className={"selectValue"+i} onClick={that.selectHandle}>{that.state.valSelect[i].selectName||'请选择'}</i>
				<ul className={"levelInfoFirst"+i} >
					{that.state.second[i]}
				</ul>
			</li>)
		}
		that.setState({second:that.state.second,qualifyListArr:that.state.qualifyListArr,valSelect:that.state.valSelect});
		
	}
});


export default ApplyLevel;


