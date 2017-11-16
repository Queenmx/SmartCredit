'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
var toast = new Toast();
var appBasePath=globalData.appBasePath;
var ApplyLevel=React.createClass({
	getInitialState:function(){
		return {
			checked:true,
			flag:false,
			valSelect:[],
			qualifyListArr:[],
			second:[]
		}
	},
	
	componentWillMount:function(){
		var loanId=this.props.location.state.loanId;
		var applyQuery=this.props.location.state.applyQuery;
		console.log(applyQuery);
		this.setState({loanId:loanId,applyQuery:applyQuery});
		
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
		//console.log(that.state.valSelect);
		var key1 = globalData.key;
		var toast=globalData.toast;
		var isOver;
		if(!this.state.checked){
			toast.show("请同意万融汇服务协议",2000);
		}else{
			var qualifySelect=that.state.valSelect; 
			that.setState({
							flag:true
						})
			//console.log(qualifySelect);
			for(var i in qualifySelect){
				if(qualifySelect[i].selectName==""){
					toast.show(qualifySelect[i].dictionaryName+'必填',2000);
					isOver=false;
					that.setState({
							flag:false
					})
					break;
					
				}else{
					isOver=true;
				}
			}
			if(isOver){
				api.qualifyListSave(qualifySelect,function(res){
					
					console.log(res);
					if(res.code=="0000"){
						//申请贷款
						const {limitDay,limitType,loanId,money}=that.state.applyQuery;
						var qualifyList=that.state.valSelect;
						console.log(that.state.applyQuery);
						var money=parseFloat(money)*100;
						//console.log(money);
						api.applyLoan(limitType,limitType,loanId,money,qualifyList,function(res){
							//console.log(res);
							if(res.code=="0000"){
								that.setState({
									flag:false
								})
								var data = JSON.parse(strDec(res.data, key1, "", ""));
			                    console.log(data);
								var queryData = {apiUrl:data.apiUrl||"",apiWay:data.apiUrl||"",logo:data.logo};
								toast.show("申请订单成功",2000);
								var path = {
								  pathname:'/ApplyResult',
								  state:queryData
								}
								hashHistory.push(path);
							}else if(res.code=="5555"){
								that.setState({
									flag:false
								})
								toast.show("登录过时，请重新登录",2000);
								var path = {
								  pathname:'/Login',
								}
								hashHistory.push(path);
							}else{
								that.setState({
									flag:false
								})
								toast.show(res.msg,2000);
							}
						},function(){
							that.setState({
									flag:false
								})
							toast.show("连接错误",2000);
						})
						
					}else if(res.code=="5555"){
						toast.show("登录过时，请重新登录",2000);
						that.setState({
							flag:false
						})
						var path = {
						  pathname:'/Login',
						}
						hashHistory.push(path);
					}else{
						//申请失败：信息保存有误
						toast.show(res.msg+",申请贷款失败",2000);
						that.setState({
							flag:false
						})
					}
				},function(){
					that.setState({
							flag:false
					})
					toast.show("连接错误",2000);
				})
			}else{
				/*that.setState({
						flag:false
					})*/
				console.log("未填完")
			}
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
						<Loading flag={that.state.flag}/>
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
							             state:{title: '万融汇服务条款',backRouter:'/Login'}    
							         }   
							    } >
	    					《万融汇服务条款》
							</Link>   
							
						</div>
					</div>
	        	</div>	
	        	<div className="botBtn footer" onClick={that.toApplyResult}>下一步</div>
        	</div>
        )
	},
	inputSelect:function(event){
		var toast=globalData.toast;
		var val=$(event.target).prev().val();
  		if (!(/^[0-9]{1,2}$/).test(val)){
  			toast.show("请输入正确的年龄",2000);
  		}else{
  			var indexId=event.target.getAttribute("data-indexId")*1;
			this.state.valSelect[indexId].selectName=val;
			console.log(this.state.valSelect);
			$(".levelInfoFirst"+indexId).hide();
			$(".selectValue"+indexId).html(val);
  		}
		
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
		var curEvent=event.target;
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
							//console.log(qualifyList);
							if(qualifyList.length>0){//说明有下级
								for (var i in qualifyList){
									that.state.second[indexId].push(<li className="second"  data-parentIndex={indexId}     data-dictionaryId={qualifyList[i].dictionaryId} style={{'color':'#333333'}}  onClick={that.checkHandle} key={i}>
										{qualifyList[i].name}
									</li>)
								}
							}else{//没有下级.点击即选
								console.log("没有下级");
								//$(curEvent).html($(curEvent).html().replace("请选择",""));
								//$(curEvent).find("input").css('width','0.5rem').focus();
								that.state.second[indexId].push(<li className="second"  data-parentIndex={indexId}  data-dictionaryId={dictionaryId} style={{'color':'#333333'}} >
									请输入:<input className='insertInput' type="text" /><span className="insertSure" data-indexId={indexId} onClick={that.inputSelect}>确定</span>
								</li>)
								
							}
							that.setState({second:that.state.second,qualifyListArr:that.state.qualifyListArr,valSelect:that.state.valSelect});
						}else if(res.code=="5555"){
								toast.show("登录过时，请重新登录",2000);
								var path = {
								  pathname:'/Login',
								}
								hashHistory.push(path);
							}else{
								toast.show(res.msg,2000);
							}
					},function(){
							toast.show("连接错误",2000);
					})
		}
	},
	componentDidMount:function(){
		var key1 = globalData.key;
        var toast = globalData.toast;
        var that = this; 
        console.log(that.state.loanId);
        that.setState({
                flag: true
            })
		 //获取资质列表
            api.qualifyList(that.state.loanId, "095c2c011ef740508bf27785e0ffe8f1", function (res) {
                console.log(res);
                
                if (res.code == "0000") {
                    var data = JSON.parse(strDec(res.data, key1, "", ""));
                    console.log(data);
                    that.setState({
                    	flag: false,
                        qualifyList: data
                    },() => {
                    	var qualifyList=that.state.qualifyList;
                    	//console.log(qualifyList);
                    	for (var i in qualifyList){
							var selectName=qualifyList[i].selectName;
							that.state.second.push([]);
							that.state.second[i].isShow=false;
							that.state.second[i].isRequest=false;
							that.state.valSelect.push({});
							that.state.valSelect[i].userId=globalData.userId;
							that.state.valSelect[i].qualifyId=qualifyList[i].qualifyId;
							that.state.valSelect[i].dictionaryId=qualifyList[i].dictionaryId;
							that.state.valSelect[i].dictionaryName=qualifyList[i].dictionaryName;
							that.state.valSelect[i].dictionaryParentId=qualifyList[i].dictionaryParentId;
							that.state.valSelect[i].selectName=qualifyList[i].selectName;
							that.state.valSelect[i].selectId=qualifyList[i].selectId;
							that.state.qualifyListArr.push(<li className="levelInfo" key={i}>
								<label htmlFor={i}>{qualifyList[i].dictionaryName}</label>
								<i data-dictionaryId={qualifyList[i].dictionaryId}  style={{'color':'#333333'}} data-indexId={i} data-txt={qualifyList[i].name}  className={"selectValue"+i} onClick={that.selectHandle}>{that.state.valSelect[i].selectName||'请选择'}</i>
								<ul className={"levelInfoFirst"+i} >
									{that.state.second[i]}
								</ul>
							</li>)
						}
						that.setState({second:that.state.second,qualifyListArr:that.state.qualifyListArr,valSelect:that.state.valSelect});
                    })
                    
                } else if (res.code == "5555") {
                    that.setState({
                        flag: false
                    })
                    toast.show("登录过时，请重新登录", 2000);
                    var path = {
                        pathname: '/Login',
                    }
                    hashHistory.push(path);
                } else {
                    that.setState({
                        flag: false
                    })
                    toast.show(res.msg, 2000);
                }
            }, function () {
                that.setState({
                    flag: false
                })
                toast.show("连接错误", 2000);
            })
          // console.log(that.state.qualifyList);
            
            
	}

});


export default ApplyLevel;


