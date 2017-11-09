'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';
import '../css/listDetail.css';


var appBasePath=globalData.appBasePath;
var ListDetail=React.createClass({
	getInitialState:function(){
		return {
			activeTab: 1,
			isMark: 0,
			activeIndex:0,
			isShowDetail:false,
			loanDetail:{},
			value1onChange:"" ,
			value2onChange:"",
			rateMoney:""
		}
	},
	
	
	toNewsDetail:function(){
		var data = {id:3,name:"qin",age:18};
		var path = {
		  pathname:'/NewsDetail',
		  query:data,
		}
		hashHistory.push(path);
	},
	
	
	handleBlur1:function(event){
		const valueBlur1=parseInt(event.target.value||0);
		const {moneyMin,moneyMax}=this.state.loanDetail;
		if(valueBlur1 < moneyMin){
			this.setState({value1: moneyMin,value1onChange:moneyMin});
		}else if(valueBlur1 > moneyMax){
			this.setState({value1: moneyMax,value1onChange:moneyMax});
		}else{
			this.setState({value1: valueBlur1,value1onChange:valueBlur1});
		}
	},
	handleBlur2:function(event){
		const valueBlur2=parseInt(event.target.value||0);
		const {limitMin,limitMax}=this.state.loanDetail;
		if(valueBlur2<limitMin){
			this.setState({value2: limitMin,value2onChange:limitMin});
		}else if(valueBlur2>limitMax){
			this.setState({value2: limitMax,value2onChange:limitMax});
		}else{
			this.setState({value2: valueBlur2,value2onChange:valueBlur2});
		}
	},
	
	
	
	handleChange1: function(event) {
			this.setState({value1onChange: parseInt(event.target.value)||""});
	},
	handleChange2: function(event) {
			this.setState({value2onChange: parseInt(event.target.value)||""});
	},
	toMoneyDetail:function(){
	  	//参照我的收藏
	  	this.setState({isShowDetail: !this.state.isShowDetail});
	},
	toProblem:function(){
	  	//var data = {};
		var path = {
		  pathname:'/Problem',
		  //query:data,
		}
		hashHistory.push(path);
	},
	toApplyInfo:function(event){
		var that=this;
		var key1 = globalData.key;
		var userId=globalData.userId;
		if(userId){
			const {value2,limitType,loanId,value1}=that.state;
			var data = {
					loanId:loanId,
					applyQuery:{
						limitDay:value2,
						limitType:limitType,
						loanId:loanId,
						money:value1
						}
				};
					var path = {
					  pathname:'/ApplyInfo',
					  state:data,
					}
					hashHistory.push(path);
			/*api.applyLoan(value2,limitType,loanId,value1*100,function(res){
				console.log(res);
				if(res.code=="0000"){
					var data=res.data;
					var data =JSON.parse(strDec(res.data,key1,"",""));
					console.log(data);
					var data = {loanId:loanId};
					var path = {
					  pathname:'/ApplyInfo',
					  query:data,
					}
					hashHistory.push(path);
				}
			},function(){
			toast.show("连接错误",2000);
		})*/
			
		  
		}else{
			var path = {
			  //pathname:'/Login/listDetail?loanId='+loanId,
			  pathname:'/Login',
			  query:data,
			}
			hashHistory.push(path);
		}
		
	},
	componentDidMount:function(){
		var that=this;
		var key1 = globalData.key;
		var toast=globalData.toast;
		var loanId=that.props.location.query.loanId;
		/*var content="啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦";
		
		api.questionAdd(content,loanId,"LOAN",function(res){
			console.log(res);
			if(res.code=="0000"){
				var data=res.data;
				var data =JSON.parse(strDec(res.data,key1,"",""));
				console.log(data);
			}
		},function(){
			toast.show("连接错误",2000);
		})
		*/
		
		api.loanDetail(loanId,function(res){
			//console.log(res);
			if(res.code=="0000"){
				var data=res.data;
				var data =JSON.parse(strDec(res.data,key1,"",""));
				console.log(data);
				
				var moneyMin=data.moneyMin;
				var limitMin=data.limitMin;
				var rateType=data.rateType;
				var limitType=data.limitType;
				var rate=data.rate;
				var getMyRate;
					switch (limitType){
						case "D"://贷款按天数
							switch (rateType){//资方给的利率
								case "D":
									getMyRate=rate;
									break;
								case "M":
									getMyRate=rate/30;
									break;
								case "Y":
									getMyRate=rate/365;
									break;
								default:
									break;
							}
							break;
						case "M"://贷款按天数
							switch (rateType){//资方给的利率
								case "D":
									getMyRate=rate*30;
									break;
								case "M":
									getMyRate=rate;
									break;
								case "Y":
									getMyRate=rate/12;
									break;
								default:
									break;
							}
							break;
						default:
							break;
					}
					
				//var rateMoney=
				that.setState({
					loanDetail:data,
					loanId:loanId,
					value1:moneyMin,
					value2:limitMin,
					value1onChange:moneyMin,
					value2onChange:limitMin,
					limitType:limitType,
					myRate:getMyRate,
					isMark:data.isMark//1已收藏
				})
			}
		},function(){
			toast.show("连接错误",2000);
		})
	},
	 logoError:function(event){
    	event.target.src="src/img/icon/capitalLogo.jpg";
		event.target.onerror=null; //控制不要一直跳动 
		//console.log(event.target.src);
    },
    saveThis:function(event){
    	var that=this;
    	var objId=that.state.loanId;
    	//var userId=globalData.userId;
    	var isLogin=localStorage.getItem("isLogin");
    	//api.getNewUser;
		if(isLogin){
		  	if(that.state.isMark==1){//已收藏,取消
    			api.delSave(objId,"LOAN",function(res){
		    		console.log(res);
		    		if(res.code=="0000"){
		    			that.setState({isMark:0})
		    		}
		    	},function(){
					toast.show("连接错误",2000);
				})
	    	}else{//未收藏,添加收藏
	    		api.save(objId,"LOAN",function(res){
		    		console.log(res);
		    		if(res.code=="0000"){
		    			that.setState({isMark:1})
		    		}
		    	},function(){
					toast.show("连接错误",2000);
				})
	    	}
		}else{
			var path = {
			  pathname:'/Login',
			}
			hashHistory.push(path);
		}
    	
    	
    },
	render:function(){
		var that=this;
		var loanDetail=that.state.loanDetail;
		var value1=that.state.value1*1;
		var value2=that.state.value2*1;
		var myRate=that.state.myRate*1;
		var myRateMoney=value2*myRate*value1*0.01;
		myRateMoney=parseFloat(myRateMoney.toFixed(2)); 
		var myFeeMoney=myRateMoney+value1;
		var myTotalMoney=myFeeMoney+loanDetail.fee;
		//console.log(loanDetail);
        return (
        	<div className="app_Box listDetail">
      			<Header title={loanDetail.loanName}/>
	        	<div className="listDetailCon content">
	        		<ul className="rangeInfo">
	        			<li>
	        				<div className="numBox">
	        					金额
	        					<div>
	        						<input type="number"  value={that.state.value1onChange}  onChange = {this.handleChange1} onBlur={this.handleBlur1}/>
	        						{/*<input type="number"  value={that.state.value1}  onChange = {this.handleChange1}/>*/}
	        						<span>元</span>
	        					</div>
	        				</div>
	        				<p>额度范围:{loanDetail.moneyMin}~{loanDetail.moneyMax}</p>
	        			</li>
	        			<li>
	        				<div  className="numBox">
	        					期限
	        					<div>
		        					<input type="number" value={that.state.value2onChange}  onChange = {this.handleChange2} onBlur={this.handleBlur2}/>
		        					{/*<input type="number"  value={that.state.value2}  onChange = {this.handleChange2}/>*/}
		        					<span>{loanDetail.limitType=="D"?"天":"月"}</span>
	        					</div>
	        				</div>
	        				<p>期限范围:{loanDetail.limitMin}~{loanDetail.limitMax}{loanDetail.limitType=="D"?"天":"个月"}</p>
	        			</li>
	        		</ul>
	        		<div className="circle">
	        			<div className="circlePic">
	        					<div className="rings">
	        						<div></div>
		        					<p>
	        							{myTotalMoney}元
	        							<span>还款金额</span>
	        						</p>
	        					</div>
        						
	        			</div>
	        			<ul className="circleInfo">
	        				<li><i></i>贷款 {that.state.value1}/{that.state.value2}{loanDetail.limitType=="D"?"天":"个月"}</li>
	        				<li><i></i>利息 {myRateMoney}元({loanDetail.rate}%/{loanDetail.rateType=="D"?"天":"月"})</li>
	        				<li><i></i>费用 {myFeeMoney}元</li>
	        				<li><i></i>一次性{loanDetail.fee}元(0%)</li>
	        			</ul>
	        		</div>
	        		<div className="moneyDetailBox">
	        			<div className="moneyDetail" style={{"display":that.state.isShowDetail?"block":"none"}}>{loanDetail.loanIntro}</div>
	        			<p onClick={that.toMoneyDetail}>查看详情<img src="src/img/icon/down.png"/></p>
	        		</div>
	        		<div className="flowBox">
	        			<h2>办理流程(门店办理)</h2>
	        			<div className="flowPic">
	        				<img src={loanDetail.loanFlow} onError={that.logoError}/>
	        			</div>
        				<h2>申请条件</h2>
        				<div className="application">
	        				{loanDetail.loanCondition}
                          </div>    				
        				<h2>所需材料</h2>
        				<div className="application">
        					{loanDetail.loanDoc}
        				</div>
	        		
	        			<h2 onClick={this.toProblem}>常见问题<span>更多回复<img src="src/img/icon/right.png"/></span></h2>
        				<div className="problemList">
        					<div className="problemBlock">
        						<img src="src/img/icon/problem.png"/>
        						<p>我是国企员工,工资打卡4000元以上,工作5年了,信用卡有过逾期，能贷款吗？</p>
        						<span>提问时间:2017-09-28</span>
        					</div>
        					<div className="answerBlock">
        						<img src="src/img/icon/answer.png"/>
        						<p><span>王昭君</span><span>2017-09-28</span></p>
        						<p>首先你查一下自己的逾期情况有多严重，有没有超过九十天，有几次，是不是连续的，不同成都有不同的处理办法，如果只有几次逾期，超过几天，关系影响不大。</p>
        					</div>
        				</div>
        			</div>
	        	</div>
	        	
	        	<div className="applyBtnBox footer">
	        		<div className="applySaveBtn" onClick={that.saveThis}><img src={that.state.isMark==1?"src/img/icon/sc2.png":"src/img/icon/sc1.png"} /><p>{that.state.isMark==1?"取消收藏":"收藏"}</p></div>
	        		<div className="applyBtn" onClick={that.toApplyInfo}>申请借款</div>
	        	</div>
        	</div>
        )
	}
});


export default ListDetail;


