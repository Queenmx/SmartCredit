'use strict';
// import React, { Component } from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import { Toast } from 'antd-mobile';
// 引入 ECharts 主模块
import echarts from "echarts";
//var isCarify//是否通过全部验证
//var index = 0//记录那一项需要认证
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
            limitMin: "",
            limitMax: "",
            limitType: "",
            theDateTxt: "",
            rate: "",
            isLoan: "",
            errorMeses: "",
            zmmes: "",
            idmes: "",
            index:0,
            fee:0
        }
    },

    componentWillMount: function () {
        var user = localStorage.getItem("user");
        var loanId = this.props.location.query.loanId;
        if (user) {
            this.setState({
                isLogin: true,
                loanId: loanId,
                idCard:(JSON.parse(user)).idCard
            })
        } else {
            this.setState({
                isLogin: false,
                loanId: loanId,
            })
        }
        //this.getErrorMeses()

    },


    lixi: function () {
        var that = this;
        var key1 = globalData.key;
        // var toast = globalData.toast;
        const { value2, limitType, loanId, value1 } = that.state;
        //console.log(that.state);
        api.lixi(value2, limitType, loanId, value1 * 100, function (res) {
            //console.log(res);
            if (res.code == "0000") {
                var data = JSON.parse(strDec(res.data, key1, "", ""));
                that.setState({
                    //myRateMoney: parseFloat(data.lixi) / 100
                    myRateMoney: that.formateMoney(data.lixi)
                }, function () {
                    that.chart();
                })
            } else {
                // Toast.info(res.msg, 2);
                Toast.info(res.msg, 2);
            }
        }, function () {
            // Toast.info("连接错误", 2);
            Toast.info("连接错误", 2);
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
        var data = { loanDetail: this.state.loanDetail };
        var path = {
            pathname: '/introKSD',
            state: data,
        }
        hashHistory.push(path);
    },

    toApplyInfo: function (event) {
        var that = this;
        var key1 = globalData.key;
           
           if (that.state.isLoan) {
                // Toast.info("您已申请了该产品，不能重复申请", 2);
                Toast.info("您已申请了该产品，不能重复申请", 2);
            } else {
	            that.setState({
	            	flag:true
	            })
                const { value2, limitType, loanId, value1 } = that.state;
                //var qualifyList = that.state.valSelect;
                var money1 = parseFloat(value1) * 100;
                api.qualifyList(loanId, '095c2c011ef740508bf27785e0ffe8f1', function (res) {
                	//console.log(res)
                    if (res.code === '0000') {
                    	var qualifyList = JSON.parse(strDec(res.data, key1, "", ""));
                        api.applyLoan(value2, limitType, loanId, money1, qualifyList, function (ret) {
                        	//console.log(res)
                        	that.setState({
					                flag: false
					            })
                        	var path = {
                                pathname: '/SubmitResult',
                                state: { ret },
                            }
                            hashHistory.push(path);
                        },function () {
				            that.setState({
				                flag: false
				            })
				            Toast.info("连接错误", 2);
				        })
                    } else {
		                that.setState({
			            	flag:false
			            })
                        Toast.info(res.msg, 2);
                    }
                } ,function () {
		            that.setState({
		                flag: false
		            })
		            Toast.info("连接错误", 2);
		        })
            }
     
    },
    //字符串转换为时间戳

    getDateDiff: function (dateStr) {
        if (dateStr) {
            var publishTime = dateStr / 1000,
                d_seconds,
                d_minutes,
                d_hours,
                d_days,
                timeNow = parseInt(new Date().getTime() / 1000),
                d,

                date = new Date(publishTime * 1000),
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
            d_days = parseInt(d / 86400);
            d_hours = parseInt(d / 3600);
            d_minutes = parseInt(d / 60);
            d_seconds = parseInt(d);
            return Y + '-' + M + '-' + D + ' ' + H + ':' + m;
        } else {
            return ""
        }
    },


    componentDidMount: function () {
        var that = this;
        var key1 = globalData.key;
        // var toast = globalData.toast;
        var loanId = that.state.loanId;
        api.loanDetail(loanId, function (res) {
            ////console.log(res);
            if (res.code == "0000") {
                var data = JSON.parse(strDec(res.data, key1, "", ""));
                console.log(data);

                var moneyMin = data.moneyMin;
                var limitMin = data.limitMin;
                var limitMax = data.limitMax;
                var rate = data.rate;
                var limitType = data.limitType;
                var theDateTxt;
                switch (limitType) {
                    case "Y":
                        theDateTxt = "月";
                        limitMin = limitMin * 12;
                        limitMax = limitMax * 12;
                        break;
                    case "M":
                        theDateTxt = "月";
                        break;
                    case "D":
                        theDateTxt = "日";
                        break;
                    default:
                        break;
                }



                if (limitType == "D") {
                    limitType = "D"
                } else {
                    limitType = "M"
                }
				 if (that.state.isLogin) {
                 	var userCertInfo = data.userCertInfo || "";
                 	
			        if (userCertInfo) {
			           /* var qualify;
			            if(that.state.certStatus>0){
			            	qualify=userCertInfo.qualify
			            }else{
			            	qualify=0
			            }*/
			            let userCertInfoArr = [that.state.idCard!==""?userCertInfo.qualify:0, userCertInfo.idcard, userCertInfo.phone, userCertInfo.zm, userCertInfo.info];
			           //console.log(userCertInfoArr);
			           //let userCertInfoArr=[1,0,1,1,1]
			            for (var i = 0; i < userCertInfoArr.length; i++) {
			                if (!(userCertInfoArr[i] > 0)) {
			                     that.setState({
					             	index : i
					             })
			                    break;
			                }else{
			                	that.setState({
					             	index : 5
					             })
			                }
			            }
			            
			        }else{
			        	that.setState({
			             	index : 0
			             })
			        }
                 }else{
                 	that.setState({
			             	index : 0
			             })
                 }
                //var rateMoney=
                that.setState({
                    loanName: data.loanName,
                    loanDetail: data,
                    value1: moneyMin,
                    value2: limitMin,
                    limitMin: limitMin,
                    limitMax: limitMax,
                    value1onChange: moneyMin,
                    value2onChange: limitMin,
                    limitType: limitType,
                    theDateTxt: theDateTxt,
                    rate: rate,
                    rateType: data.rateType,
                    markId: data.markId,
                    fee: data.fee,
                    isMark: data.isMark,//1已收藏
                    isLoan: data.isLoan//大于0不可申请贷款
                }, () => {
                    that.lixi();
                    that.setState({
                        flag: false
                    })
                })
                
                
            } else {
                that.setState({
                    flag: false
                })
                // Toast.info(res.msg, 2);
                Toast.info(res.msg, 2);
            }
        }, function () {
            that.setState({
                flag: false
            })
            // Toast.info("连接错误", 2);
            Toast.info("连接错误", 2);
        })



    },

    chart: function () {
        var that = this;
        var day1 = that.state.limitType == "D" ? '天' : "个月";
        var day2;
        //var day2=that.state.rateType=="D"?'天':"个月";
        switch (that.state.rateType) {
            case "D":
                day2 = "天"
                break;
            case "M":
                day2 = "月"
                break;
            case "Y":
                day2 = "年"
                break;
            default:
                break;
        }
        var loanMoney = "贷款" + that.state.value1 + "元/" + that.state.value2 + day1;
        var loanlixi = "利息" + that.state.myRateMoney + "元" + that.state.rate + "%/" + day2;
        var loanFee = "一次性" + that.state.fee + "元";
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
                    hoverAnimation: false,
                    silent: true,
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
                        { value: that.state.value1, name: loanMoney },
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
    statusToChinese: function (status) {
        var that = this
        // console.log("==========" + status)
        if(!that.state.isLogin){
        	return '去认证'
        }else{
        	if (status === 0 || !status) {
	            return '去认证'
	        } else if (status > 0) {
	            return '已认证'
	        } else {
	            return '重新认证'
	        }
        }
        
    },
    checkSteps: function () {

        var index=this.state.index;
        if(index==0){
        	return '开始认证'
        }else if(index===5){
        	return '提交借款申请'
        }else{
        	return '补充材料'
        }
       
    },
    saveThis: function (event) {
        var that = this;
        var objId = that.state.loanId;
        var key1 = globalData.key;
        // let toast = globalData.toast;
        if (that.state.isLogin) {
            var markId = event.currentTarget.getAttribute("data-markId");
            //console.log(markId);
            if (that.state.isMark == 1) {//已收藏,取消
                that.setState({
                    flag: true
                })
                api.loanDetail(objId, function (res) {
                    //console.log(res);
                    if (res.code == "0000") {
                        var data = res.data;
                        var data = JSON.parse(strDec(res.data, key1, "", ""));
                        that.setState({
                            markId: data.markId
                        }, function () {
                            api.delSave(that.state.markId, "LOAN", function (res) {
                                // console.log(res);
                                if (res.code == "0000") {
                                    that.setState({
                                        isMark: 0,
                                        flag: false
                                    })
                                } else {
                                    that.setState({
                                        flag: false
                                    })
                                    // Toast.info(res.msg, 2);
                                    Toast.info(res.msg, 2);
                                }
                            }, function () {
                                that.setState({
                                    flag: false
                                })
                                // Toast.info("连接错误", 2);
                                Toast.info("连接错误", 2);
                            })
                        })
                    } else {
                        that.setState({
                            flag: false
                        })
                        Toast.info(res.msg, 2);
                    }
                }, function () {
                    that.setState({
                        flag: false
                    })
                    Toast.info("连接错误", 2);
                })


            } else {//未收藏,添加收藏
                api.save(objId, "LOAN", function (res) {
                    //console.log(res);
                    if (res.code == "0000") {
                        that.setState({ isMark: 1 })
                    } else {
                        Toast.info(res.msg, 2);
                    }
                }, function () {
                    Toast.info("连接错误", 2);
                })
            }
        } else {
            var path = {
                pathname: '/Login',
            }
            hashHistory.push(path);
        }


    },
    getErrorMeses: function () {
        var that = this
        var user = localStorage.getItem('user')
        var key1 = globalData.key;
        if (!user) {
            return
        }
        var errormes = {
            'ZM': "",
            'IDCARD': ""
        }
        api.certCheck('ZM', function (res) {
            res.data = JSON.parse(strDec(res.data, key1, "", ""))
            // res.data.status = '-2'
            // res.msg = "错误"
            if (res.data.status === '-2') {
                that.setState({
                    zmmes: res.msg
                })
            }
        })
        api.certCheck('IDCARD', function (res) {
            res.data = JSON.parse(strDec(res.data, key1, "", ""))
            // res.data.status = '-2'
            // res.msg = "错误"
            if (res.data.status === '-2') {
                that.setState({
                    idmes: res.msg
                })
            }
        })
    },
    toChain: function (toAuthTap) {
        if (toAuthTap === 'Operator') {
            toAuthTap = `https://api.51datakey.com/h5/importV3/#/carrier?userId=${globalData.userId}&apiKey=ac251813e8d54e5db9ae86d38472fa44&backUrl=http://h5.xinyzx.com/smartcreditCtest/#/ListDetailKSD?loanId=${this.state.loanId}`
            // toAuthTap = "http://www.baidu.com"
            window.location.href = toAuthTap
        } else if (toAuthTap === 'Operator') {

        }
    },
    toAuthInfo: function (id,event) {
    	//console.log(id);
        var key1 = globalData.key;
        var that = this
       
        if (!that.state.isLogin) {
           var path = {
                pathname: '/Login'
            }
            hashHistory.push(path);
        } else if (id > that.state.index) {
            //Toast.info('请按顺序认证', 2);
            console.log('不能点击')
        } else {
        	switch (id){//基本信息
				case 0:
					var path = {
	                    pathname: '/BaseInfo',
	                    query: { loanId: this.state.loanId }
	                }
	                hashHistory.push(path);
					break;
				case 1://身份证
				 var btnStatus = event.currentTarget.getAttribute("data-btnStatus");
					var path = {
	                    pathname: '/IdCard',
	                    query: { certStatus: btnStatus }
	                }
	                hashHistory.push(path);
					break;
				case 2://手机运营商
					if(that.state.index>2){
						Toast.info('该认证已通过',1)
					}else{
						api.phoneCert(that.state.loanId, function (res) {
	                    if (res.code == "0000") {
		                        // //console.log(data.authInfoUrl)
		                        var data = JSON.parse(strDec(res.data, key1, "", ""));
		                        //console.log(data.authInfoUrl)
		                        window.location.href = data.url
		                    } else {
		                        // Toast.info(res.msg, 2);
		                        Toast.info(res.msg, 2);
		                    }
		                }, function () {
		                    // Toast.info("连接错误", 2);
		                    Toast.info("连接错误", 2);
		                })
					}
					
					break;
				case 3://芝麻
					if(that.state.index>3){
							Toast.info('该认证已通过',1)
					}else{
						api.zmCert(that.state.loanId, function (res) {
		                    if (res.code == "0000") {
		                        // console.log(data.authInfoUrl)
		                        var data = JSON.parse(strDec(res.data, key1, "", ""));
		                        //console.log(data)
		                        window.location.href = data.url;
		                    } else {
		                        // Toast.info(res.msg, 2);
		                        Toast.info(res.msg, 2);
		                    }
		                }, function () {
		                    // Toast.info("连接错误", 2);
		                    Toast.info("连接错误", 2);
		                })
					}
					break;
				case 4://其他信息
					var path = {
	                    pathname: '/OtherInfo',
	                    query: { loanId: this.state.loanId }
	                }
	                hashHistory.push(path);
					break;
				case 5://申请贷款
					that.toApplyInfo();
					break;
				default:
					break;
			}
        	
  
        }
        //}

    },
    toBack(){
        console.log("aa")
        // var path = {
        //     pathname: '/'
        // }
        window.location.href =globalData.backPath;
    },
    render: function () {
        var that = this;
        var loanDetail = that.state.loanDetail;
        var value1 = that.state.value1 * 1;
        var value2 = that.state.value2 * 1;
        var myRateMoney = Number(that.state.myRateMoney);
        var myTotalMoney = ((Number(that.state.fee)+ myRateMoney + value1)).toFixed(2)||"";
        var userCertInfo = loanDetail.userCertInfo || "";
        /*if (userCertInfo) {
            console.log(userCertInfo)
            let userCertInfoArr = ['qualify', 'idcard', 'phone', 'zm', 'info']
            for (var i = 0; i < userCertInfoArr.length; i++) {
                if (!(userCertInfo[userCertInfoArr[i]] > 0)) {
                    index = i
                    break;
                }else{
                	index = 4
                }
            }
            console.log('index',index)
        }*/

        // if (userCertInfo) {
        //     console.log(userCertInfo)
        //     userCertInfo.idcard = 1
        //     userCertInfo.info = 1
        //     userCertInfo.phone = 1
        //     userCertInfo.qualify = 1
        //     userCertInfo.zm = 1
        // }
        var index=that.state.index;
        return (
            <div className="app_Box listDetail">
                {/* <Header title={loanDetail.loanName} /> */}
                <div className="header">
                    <div className="toBack" onClick={this.toBack}><img src="src/img/icon/back.png" /></div>
                    <p className="title">{loanDetail.loanName}</p>
                    <div className="headerLinkBtn"></div>       
                </div>
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
                        <p onClick={that.toIntroKSD} className="showBtn">查看产品详情<img className="toIntroKSD" src="src/img/icon/right.png" /></p>
                    </div>
                    <div className="authBox">
                        <h2>基本材料</h2>
                        <ul className="authTap">
                            <li className="activeAuthLi"  onClick={that.toAuthInfo.bind(that, 0)}><i className="iconfont authIcon">&#xe647;</i>基本信息<div className="goAuth"><span>{that.statusToChinese(that.state.idCard!==""?userCertInfo.qualify:0)}</span><i className="iconfont">&#xe60b;</i></div></li>
                            <li className={(index>0) ? "activeAuthLi" : ""} data-btnStatus={userCertInfo.idcard}    onClick={that.toAuthInfo.bind(that, 1)}><i className="iconfont authIcon">&#xe604;</i>身份证<div className="goAuth"><span>{that.statusToChinese(userCertInfo.idcard)}</span><i className="iconfont">&#xe60b;</i></div></li>
                            <li className={(index>1) ? "activeAuthLi" : ""}   onClick={that.toAuthInfo.bind(that, 2)}><i className="iconfont authIcon">&#xe60a;</i>手机运营商<div className="goAuth"><span>{that.statusToChinese(userCertInfo.phone)}</span><i className="iconfont">&#xe60b;</i></div></li>
                            <li className={(index>2) ? "activeAuthLi" : ""}  onClick={that.toAuthInfo.bind(that, 3)}><i className="iconfont authIcon">&#xe645;</i>芝麻认证<div className="goAuth"><span>{that.statusToChinese(userCertInfo.zm)}</span><i className="iconfont">&#xe60b;</i></div></li>
                            <li className={(index>3) ? "activeAuthLi" : ""} onClick={that.toAuthInfo.bind(that, 4)}><i className="iconfont authIcon">&#xe61e;</i>其他信息<div className="goAuth"><span>{that.statusToChinese(userCertInfo.info)}</span><i className="iconfont">&#xe60b;</i></div></li>
                        </ul>
                    </div>
                </div>

                <div className="applyBtnBox footer">
                    <div className="applySaveBtn" onClick={that.saveThis} data-markId={loanDetail.markId}><img src={that.state.isMark == 1 ? "src/img/icon/sc2.png" : "src/img/icon/sc1.png"} /><p>{that.state.isMark == 1 ? "取消收藏" : "收藏"}</p></div>
                    <div className="applyBtn" onClick={that.toAuthInfo.bind(that,that.state.index)}>{that.checkSteps()}</div>
                </div>
            </div>
        )
    }
});


export default ListDetailKSD;

