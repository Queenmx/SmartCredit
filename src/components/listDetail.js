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
			isMask: 0,
			activeIndex:0,
			isShowDetail:false,
			loanDetail:{},
			value1:"" ,
			value2:"",
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
	
	handleChange1: function(event) {
	    this.setState({value1: event.target.value});
	},
	handleChange2: function(event) {
	    this.setState({value2: event.target.value});
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
		var loanId=event.target.getAttribute("data-loanId");
	  	var data = {loanId:loanId};
		var path = {
		  pathname:'/ApplyInfo',
		  query:data,
		}
		hashHistory.push(path);
	},
	componentDidMount:function(){
		var that=this;
		var key1 = globalData.key;
		var toast=globalData.toast;
		var loanId=that.props.location.query.loanId;
		api.loanDetail(loanId,function(res){
			//console.log(res);
			if(res.code=="0000"){
				//var data=res.data;
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
					value1:moneyMin,
					value2:limitMin,
					myRate:getMyRate,
					isMask:data.isMask//0没标记
				})
			}
		})
	},
	 logoError:function(event){
    	event.target.src="src/img/icon/capitalLogo.jpg";
		event.target.onerror=null; //控制不要一直跳动 
		//console.log(event.target.src);
    },
    saveThis:function(event){
    	var objId=event.currentTarget.getAttribute("data-objId");
    	api.save(objId,"LOAN",function(res){
    		console.log(res);
    	})
    },
	render:function(){
		var that=this;
		//console.log("cityId",cityId);
		var loanDetail=that.state.loanDetail;
		var value1=that.state.value1*1;
		var value2=that.state.value2*1;
		var myRate=that.state.myRate*1;
		var myRateMoney=value2*myRate;
		myRateMoney=parseFloat(myRateMoney.toFixed(2)); 
		var myFeeMoney=myRateMoney+value1;
		//var myTotalMoney=myFeeMoney;
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
	        						<input type="number"  value={that.state.value1}  onChange = {this.handleChange1}/>
	        						<span>元</span>
	        					</div>
	        				</div>
	        				<p>额度范围:{loanDetail.moneyMin}~{loanDetail.moneyMax}</p>
	        			</li>
	        			<li>
	        				<div  className="numBox">
	        					期限
	        					<div>
		        					<input type="number" value={that.state.value2}  onChange = {this.handleChange2}/>
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
	        				<li><i></i>贷款 {that.state.value1}/{that.state.value2}个月</li>
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
	        		<div className="applySaveBtn" data-objId={loanDetail.loanId} onClick={that.saveThis}><img src={that.state.isMask==1?"src/img/icon/sc2.png":"src/img/icon/sc1.png"} /><p>{that.state.isMask==1?"取消收藏":"收藏"}</p></div>
	        		<div className="applyBtn" data-loanId={loanDetail.loanId} onClick={that.toApplyInfo}>申请借款</div>
	        	</div>
        	</div>
        )
	}
});


export default ListDetail;


