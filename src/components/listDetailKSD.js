'use strict';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
// 引入 ECharts 主模块
import echarts from "echarts";

var appBasePath = globalData.appBasePath;
var ListDetailKSD = React.createClass({
    getInitialState: function () {
        return {
            activeTab: 1,
            isMark: 0,
            flag: true,
            activeIndex: 0,
            loanDetail: {},
            value1onChange: "",
            value2onChange: "",
            myTotalMoney: "",
            rateMoney: "",
            limitMin:"",
            limitMax:"",
            limitType: "",
            theDateTxt:"",
            rate:"",
        }
    },
	
    componentWillMount: function () {
        var user = localStorage.getItem("user");
        var loanId = this.props.location.query.loanId;
        if (user) {
            this.setState({
                isLogin: true,
                loanId: loanId
            })
        } else {
            this.setState({
                isLogin: false,
                loanId: loanId
            })
        }
    },


    lixi: function () {
        var that = this;
        var key1 = globalData.key;
        var toast = globalData.toast;
        const { value2, limitType, loanId, value1 } = that.state;
        //console.log(that.state);
        api.lixi(value2, limitType, loanId, value1 * 100, function (res) {
            //console.log(res);
            if (res.code == "0000") {
                var data = JSON.parse(strDec(res.data, key1, "", ""));
                that.setState({
                    //myRateMoney: parseFloat(data.lixi) / 100
                    myRateMoney: that.formateMoney(data.lixi)
                },function(){
                	that.chart();
                })
            } else {
                toast.show(res.msg, 2000);
            }
        }, function () {
            toast.show("连接错误", 2000);
        })
    },
	handleBlur1: function (event) {
        var that = this;
        const valueBlur1 = parseInt(event.target.value || 0);
        const { moneyMin, moneyMax } = this.state.loanDetail;
        if (valueBlur1 < moneyMin) {
            that.setState({ value1: moneyMin, value1onChange: moneyMin }, () => {
                that.lixi();
            });
        } else if (valueBlur1 > moneyMax) {
            that.setState({ value1: moneyMax, value1onChange: moneyMax }, () => {
                that.lixi();
            });
        } else {
            that.setState({ value1: valueBlur1, value1onChange: valueBlur1 }, () => {
                that.lixi();
            });
        }
    },
    
    
    handleBlur2: function (event) {
        var that = this;
        const valueBlur2 = parseInt(event.target.value || 0);
        const { limitMin, limitMax } = this.state;
        if (valueBlur2 < limitMin) {
            that.setState({ value2: limitMin, value2onChange: limitMin }, () => {
                that.lixi();
            });
        } else if (valueBlur2 > limitMax) {
            that.setState({ value2: limitMax, value2onChange: limitMax }, () => {
                that.lixi();
            });
        } else {
            that.setState({ value2: valueBlur2, value2onChange: valueBlur2 }, () => {
                that.lixi();
            });
        }
    },
    handleChange1: function (event) {
        this.setState({ value1onChange: parseInt(event.target.value) || "" });
    },
    handleChange2: function (event) {
        this.setState({ value2onChange: parseInt(event.target.value) || "" });
    },
    toIntroKSD: function () {
        //参照我的收藏
        var data = {loanDetail: this.state.loanDetail };
        var path = {
            pathname: '/introKSD',
            state: data,
        }
        hashHistory.push(path);
    },
  
    toApplyInfo: function (event) {
        var that = this;
        var key1 = globalData.key;
        if (that.state.isLogin) {
            const { value2, limitType, loanId, value1 } = that.state;
            //console.log(that.state);
            var queryData = {
                loanId: loanId,
                applyQuery: {
                    limitDay: value2,
                    limitType: limitType,
                    loanId: loanId,
                    money: value1
                }
            };
            var path = {
                pathname: '/ApplyInfo',
                state: queryData,
            }
            hashHistory.push(path);
        } else {
            var path = {
                pathname: '/Login',
                //query:data,
            }
            hashHistory.push(path);
        }

    },
    //字符串转换为时间戳
	
	getDateDiff: function (dateStr) {
	  if(dateStr){
	    var publishTime = dateStr/1000,
	        d_seconds,
	        d_minutes,
	        d_hours,
	        d_days,
	        timeNow = parseInt(new Date().getTime()/1000),
	        d,
	
	        date = new Date(publishTime*1000),
	        Y = date.getFullYear(),
	        M = date.getMonth() + 1,
	        D = date.getDate(),
	        H = date.getHours(),
	        m = date.getMinutes(),
	        s = date.getSeconds();
	        //小于10的在前面补0
	        if (M < 10) {
	            M = '0' + M;
	        }
	        if (D < 10) {
	            D = '0' + D;
	        }
	        if (H < 10) {
	            H = '0' + H;
	        }
	        if (m < 10) {
	            m = '0' + m;
	        }
	        if (s < 10) {
	            s = '0' + s;
	        }
	
	    d = timeNow - publishTime;
	    d_days = parseInt(d/86400);
	    d_hours = parseInt(d/3600);
	    d_minutes = parseInt(d/60);
	    d_seconds = parseInt(d);
		return Y + '-' + M + '-' + D + ' ' + H + ':' + m;
	 }else{
	 	return ""
	 }
	} ,


    componentDidMount: function () {
        var that = this;
        var key1 = globalData.key;
        var toast = globalData.toast;
        var loanId = that.state.loanId;
        api.loanDetail(loanId, function (res) {
            ////console.log(res);
            if (res.code == "0000") {
                var data = res.data;
                var data = JSON.parse(strDec(res.data, key1, "", ""));
                console.log(data);

                var moneyMin = data.moneyMin;
                var limitMin = data.limitMin;
                var limitMax=data.limitMax;
                var rate=data.rate;
                var limitType = data.limitType;
				var theDateTxt;
				switch (limitType){
					case "Y":
					theDateTxt="月";
					limitMin=limitMin*12;
					limitMax=limitMax*12;
						break;
					case "M":
					theDateTxt="月";
						break;
					case "D":
					theDateTxt="日";
						break;
					default:
						break;
				}
                
                
                
                if (limitType == "D") {
                    limitType = "D"
                } else {
                    limitType = "M"
                }
               

                //var rateMoney=
                that.setState({
                    loanName: data.loanName,
                    loanDetail: data,
                    value1: moneyMin,
                    value2: limitMin,
                    limitMin:limitMin,
                    limitMax:limitMax,
                    value1onChange: moneyMin,
                    value2onChange: limitMin,
                    limitType: limitType,
                    theDateTxt:theDateTxt,
                    rate:rate,
                    rateType:data.rateType,
                    markId:data.markId,
                    fee:data.fee,
                    isMark: data.isMark//1已收藏
                }, () => {
                    that.lixi();
                    that.setState({
                    	flag:false
                    })
                })
            } else {
            	that.setState({
                    	flag:false
                    })
                toast.show(res.msg, 2000);
            }
        }, function () {
        	that.setState({
                	flag:false
                })
            toast.show("连接错误", 2000);
        })
        
    

    },
    
    chart:function(){
    	var that=this;
    	var day1=that.state.limitType=="D"?'天':"个月";
    	var day2;
    	//var day2=that.state.rateType=="D"?'天':"个月";
    	switch (that.state.rateType){
			case "D":
				day2="天"
				break;
			case "M":
				day2="月"
				break;
			case "Y":
				day2="年"
				break;
			default:
				break;
		}
    	var loanMoney="贷款"+that.state.value1+"元/"+that.state.value2+day1;
    	var loanlixi="利息"+that.state.myRateMoney+"元"+that.state.rate+"%/"+day2;
    	var loanFee="一次性"+that.state.fee+"元";
    	//console.log(that.state)
    	//console.log(loanMoney);
    	//console.log(loanlixi);
    	//console.log(loanFee);
    	    echarts.init(document.getElementById("main")).setOption({
                color: ["#f94b4b", "#ffcc00", "#4dbeff"],
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    icon: "circle",
                    orient: "vertical",
                    right: "10",
                    top: "30",
                    data: [loanMoney, loanlixi, loanFee],
                    textStyle: {
                        fontSize: 10,
                        color: "#aaaaaa"
                    }
                },
                series: [
                    {
                        name: "资金比例",
                        type: "pie",
                        silent: true,
                         hoverAnimation:false,
            			silent:true,
                        radius: ["50%", "70%"],
                        center: ["30%", "50%"],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center"
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: "30",
                                    fontWeight: "bold"
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [
                            { value: that.state.value1, name:loanMoney},
                            { value: that.state.myRateMoney, name: loanlixi },
                            { value: that.state.fee, name: loanFee }
                        ],
                    }
                ]
            });
    },
    
    
    logoError: function (event) {
        event.target.src = "src/img/icon/capitalLogo.jpg";
        event.target.onerror = null; //控制不要一直跳动 
        //console.log(event.target.src);
    },
    
 

    formateMoney: function (money) {
        if (money % 100 === 0) {
            return (money / 100)
        } else {
             return (money / 100.0).toFixed(2)
        }
    },
   
  
    saveThis: function (event) {
        var that = this;
        var objId = that.state.loanId;
        var key1 = globalData.key;
        let toast = globalData.toast;
        if (that.state.isLogin) {
        	var markId=event.currentTarget.getAttribute("data-markId");
        	//console.log(markId);
            if (that.state.isMark == 1) {//已收藏,取消
            	that.setState({
                    	flag:true
                    })
            	api.loanDetail(objId, function (res) {
		            //console.log(res);
		            if (res.code == "0000") {
		                var data = res.data;
		                var data = JSON.parse(strDec(res.data, key1, "", ""));
		                //console.log(data);
		                that.setState({
		                	markId:data.markId
		                },function(){
		                	api.delSave(that.state.markId, "LOAN", function (res) {
			                   // console.log(res);
			                    if (res.code == "0000") {
			                        that.setState({
			                            isMark: 0,
			                            flag:false
			                        })
			                    } else {
			                    	that.setState({
				                    	flag:false
				                    })
			                        toast.show(res.msg, 2000);
			                    }
			                }, function () {
			                	that.setState({
			                    	flag:false
			                    })
			                    toast.show("连接错误", 2000);
			                })
		                })
	            	}else{
	            		that.setState({
	                    	flag:false
	                    })
	            		toast.show(res.msg, 2000);
	            	}
            	}, function () {
            		that.setState({
                    	flag:false
                    })
                    toast.show("连接错误", 2000);
                })

            	
            } else {//未收藏,添加收藏
                api.save(objId, "LOAN", function (res) {
                    //console.log(res);
                    if (res.code == "0000") {
                        that.setState({ isMark: 1 })
                    } else {
                        toast.show(res.msg, 2000);
                    }
                }, function () {
                    toast.show("连接错误", 2000);
                })
            }
        } else {
            var path = {
                pathname: '/Login',
            }
            hashHistory.push(path);
        }


    },
    toAuthInfo:function(btnStatus,toAuthTap){
    	//if(btnStatus==="0"){
    		 var path = {
                pathname: `${toAuthTap}`,
                query:{loanId:this.state.loanId}
            }
            hashHistory.push(path);
    	//}
    	
    },
    render: function () {
        //console.log(this.state.myRateMoney);
        var that = this;
        var loanDetail = that.state.loanDetail;
        var value1 = that.state.value1 * 1;
        var value2 = that.state.value2 * 1;
        var myRateMoney = Number(that.state.myRateMoney);
        var myTotalMoney = (loanDetail.fee + myRateMoney + value1).toFixed(2)||"";
        var userCertInfo=loanDetail.userCertInfo||"";
		//console.log(userCertInfo);
        return (
            <div className="app_Box listDetail">
                <Header title={loanDetail.loanName} />
                <div className="listDetailCon content">
                    <Loading flag={that.state.flag} />
                    <ul className="rangeInfo">
                        <li>
                            <div className="numBox">
                                金额
	        					<div>
                                    <input type="number" value={that.state.value1onChange} onChange={this.handleChange1} onBlur={this.handleBlur1} />
                                    {/*<input type="number"  value={that.state.value1}  onChange = {this.handleChange1}/>*/}
                                    <span>元</span>
                                </div>
                            </div>
                            <p>额度范围:{loanDetail.moneyMin}~{loanDetail.moneyMax}元</p>
                        </li>
                        <li>
                            <div className="numBox">
                                期限
	        					<div>
                                    <input type="number" value={that.state.value2onChange} onChange={this.handleChange2} onBlur={this.handleBlur2} />
                                    {/*<input type="number"  value={that.state.value2}  onChange = {this.handleChange2}/>*/}
                                    <span>{loanDetail.limitType == "D" ? "天" : "月"}</span>
                                </div>
                            </div>
                            <p>期限范围:{that.state.limitMin}~{that.state.limitMax}{loanDetail.limitType == "D" ? "天" : "个月"}</p>
                        </li>
                    </ul>
                    <div className="circle">
                    	<div className="circleBox">
                            <div id="main" className="chart" style={{ "height": "3rem" }}></div>
                        </div>
                        <div className="noClick"></div>
                        <div className="totalmoney"><p>{myTotalMoney}元</p>还款金额</div>
                    </div>
                    <div className="moneyDetailBox">
                        <p onClick={that.toIntroKSD} className="showBtn">查看产品详情<img className="toIntroKSD" src="src/img/icon/right.png"/></p>
                    </div>
                   <div className="authBox">
                   		<h2>基本材料</h2>
                        <ul className="authTap">
                        	<li className={userCertInfo.qualify>0?"activeAuthLi":""} onClick={that.toAuthInfo.bind(that,userCertInfo.qualify,"BaseInfo")}><i className="iconfont authIcon">&#xe647;</i>基本信息<div className="goAuth"><span>{userCertInfo.qualify>0?"已认证":"去认证"}</span><i className="iconfont">&#xe60b;</i></div></li>
                        	<li className={userCertInfo.idcard>0?"activeAuthLi":""} onClick={that.toAuthInfo.bind(that,userCertInfo.idcard,"IdCard")}><i className="iconfont authIcon">&#xe604;</i>身份证<div className="goAuth"><span>{userCertInfo.idcard>0?"已认证":"去认证"}</span><i className="iconfont">&#xe60b;</i></div></li>
                        	<li className={userCertInfo.phone>0?"activeAuthLi":""} onClick={that.toAuthInfo.bind(that,userCertInfo.phone,"IdCard")}><i className="iconfont authIcon">&#xe60a;</i>手机运营商<div className="goAuth"><span>{userCertInfo.phone>0?"已认证":"去认证"}</span><i className="iconfont">&#xe60b;</i></div></li>
                        	<li className={userCertInfo.zm>0?"activeAuthLi":""} onClick={that.toAuthInfo.bind(that,userCertInfo.zm,"LoanFeedback")}><i className="iconfont authIcon">&#xe645;</i>芝麻认证<div className="goAuth"><span>{userCertInfo.zm>0?"已认证":"去认证"}</span><i className="iconfont">&#xe60b;</i></div></li>
                        	<li className={userCertInfo.info>0?"activeAuthLi":""} onClick={that.toAuthInfo.bind(that,userCertInfo.info,"OtherInfo")}><i className="iconfont authIcon">&#xe61e;</i>其他信息<div className="goAuth"><span>{userCertInfo.info>0?"已认证":"去认证"}</span><i className="iconfont">&#xe60b;</i></div></li>
                        </ul>
                   </div>
                </div>

                <div className="applyBtnBox footer">
                    <div className="applySaveBtn" onClick={that.saveThis} data-markId={loanDetail.markId}><img src={that.state.isMark == 1 ? "src/img/icon/sc2.png" : "src/img/icon/sc1.png"} /><p>{that.state.isMark == 1 ? "取消收藏" : "收藏"}</p></div>
                    <div className="applyBtn" onClick={that.toApplyInfo}>开始认证</div>
                </div>
            </div>
        )
    }
});


export default ListDetailKSD;

