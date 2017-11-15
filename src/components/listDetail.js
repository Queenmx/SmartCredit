'use strict';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import '../css/listDetail.css';
// 引入 ECharts 主模块
import echarts from "echarts";

var appBasePath = globalData.appBasePath;
var ListDetail = React.createClass({
    getInitialState: function () {
        return {
            activeTab: 1,
            isMark: 0,
            flag: true,
            activeIndex: 0,
            isShowDetail: false,
            loanDetail: {},
            problemList: [],
            value1onChange: "",
            value2onChange: "",
            myTotalMoney: "",
            rateMoney: ""
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
        console.log(that.state);
        api.lixi(value2, limitType, loanId, value1 * 100, function (res) {
            //console.log(res);
            if (res.code == "0000") {
                var data = JSON.parse(strDec(res.data, key1, "", ""));
                //console.log(data);
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
        const { limitMin, limitMax } = this.state.loanDetail;
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
    toMoneyDetail: function () {
        //参照我的收藏
        this.setState({ isShowDetail: !this.state.isShowDetail });
    },
    toProblem: function () {
        var data = { objId: this.state.loanId, loanName: this.state.loanName };
        var path = {
            pathname: '/Problem',
            query: data,
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



    componentDidMount: function () {
        var that = this;
        var key1 = globalData.key;
        var toast = globalData.toast;
        var loanId = that.state.loanId;
        api.loanDetail(loanId, function (res) {
            //console.log(res);
            if (res.code == "0000") {
                var data = res.data;
                var data = JSON.parse(strDec(res.data, key1, "", ""));
                console.log(data);

                var moneyMin = data.moneyMin;
                var limitMin = data.limitMin;
                var rate=data.rate;
                var limitType = data.limitType;
                if (limitType == "D") {
                    limitType = "D"
                } else {
                    limitType = "M"
                }
                //var rate=data.rate;
                /*		var getMyRate;
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
                            }*/

                //var rateMoney=
                that.setState({
                    loanName: data.loanName,
                    loanDetail: data,
                    value1: moneyMin,
                    value2: limitMin,
                    value1onChange: moneyMin,
                    value2onChange: limitMin,
                    limitType: limitType,
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
                toast.show(res.msg, 2000);
            }
        }, function () {
            toast.show("连接错误", 2000);
        })

        //问题列表
        api.questionList(loanId, 1, 3, function (res) {
            //console.log(res);
            if (res.code == "0000") {
                var data = JSON.parse(strDec(res.data, key1, "", ""));
                var problemList = data.list;
                var total = data.total;
                //console.log(problemList);
                var arr = [];
                if (problemList.length > 0) {
                    for (var i in problemList) {
                        arr.push(<div className="problemList" key={i}>
                            <div className="problemBlock">
                                <img src="src/img/icon/problem.png" />
                                <p>{problemList[i].content}</p>
                                <span>提问时间:{problemList[i].addTime}</span>
                            </div>
                            <div className="answerBlock">
                                <img src="src/img/icon/answer.png" />
                                <p><span>{problemList[i].answerUser}</span><span>{problemList[i].answerTime}</span></p>
                                <p>{problemList[i].answer}</p>
                            </div>
                        </div>)
                    }
                } else {
                    arr.push(<div key={Math.random()} style={{ 'textAlign': 'center', 'lineHeight': '1rem' }}>暂无数据</div>)
                }
                that.setState({
                    problemList: arr
                })
            } else {
                toast.show(res.msg, 2000);
            }
        }, function () {
            toast.show("连接错误", 2000);
        })

    },
    
    chart:function(){
    	var that=this;
    	var day1=that.state.limitType=="D"?'天':"个月";
    	var day2=that.state.rateType=="D"?'天':"个月";
    	var loanMoney="贷款"+that.state.value1+"/"+that.state.value2+day1;
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
                        radius: ["60%", "80%"],
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
        if (parseFloat(money) % 100 === 0) {
            return (money / 100).toFixed(2);
        } else {
            return money / 100.0;
        }
    },
   
  
    saveThis: function (event) {
        var that = this;
        var objId = that.state.loanId;
        var key1 = globalData.key;
        let toast = globalData.toast;
        if (that.state.isLogin) {
        	var markId=event.currentTarget.getAttribute("data-markId");
        	console.log(markId);
            if (that.state.isMark == 1) {//已收藏,取消
            	api.loanDetail(objId, function (res) {
		            //console.log(res);
		            if (res.code == "0000") {
		                var data = res.data;
		                var data = JSON.parse(strDec(res.data, key1, "", ""));
		                console.log(data);
		                that.setState({
		                	markId:data.markId
		                },function(){
		                	api.delSave(that.state.markId, "LOAN", function (res) {
			                    console.log(res);
			                    if (res.code == "0000") {
			                        that.setState({
			                            isMark: 0
			                        })
			                    } else {
			                        toast.show(res.msg, 2000);
			                    }
			                }, function () {
			                    toast.show("连接错误", 2000);
			                })
		                })
	            	}else{
	            		toast.show(res.msg, 2000);
	            	}
            	}, function () {
                    toast.show("连接错误", 2000);
                })

            	
            } else {//未收藏,添加收藏
                api.save(objId, "LOAN", function (res) {
                    console.log(res);
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
    render: function () {
        //console.log(this.state.myRateMoney);
        var that = this;
        var loanDetail = that.state.loanDetail;
        var value1 = that.state.value1 * 1;
        var value2 = that.state.value2 * 1;
        //var myRate=that.state.myRate*1;
        //var myRateMoney=value2*myRate*value1*0.01;
        //myRateMoney=parseFloat(myRateMoney.toFixed(2)); 
        //var myFeeMoney=myRateMoney+value1;
        
        var myRateMoney = parseFloat(that.state.myRateMoney);
        console.log(that.state.myRateMoney);
        var myTotalMoney = loanDetail.fee + myRateMoney + value1;
        //console.log(loanDetail);
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
                            <p>额度范围:{loanDetail.moneyMin}~{loanDetail.moneyMax}</p>
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
                            <p>期限范围:{loanDetail.limitMin}~{loanDetail.limitMax}{loanDetail.limitType == "D" ? "天" : "个月"}</p>
                        </li>
                    </ul>
                    <div className="circle">
                    	<div className="circleBox">
                            <div id="main" className="chart" style={{ "height": "3rem" }}></div>
                        </div>
                       {/* <div className="circlePic">
                            <div className="rings" onClick={that.echartDraw}>
                                <div></div>
                                <div id="main" className="chart"></div>
                                <p>
                                    {myTotalMoney}元
	        							<span>还款金额</span>
                                </p>
                            </div>

                        </div>
                        <ul className="circleInfo">
                            <li><i></i>贷款 {that.state.value1}/{that.state.value2}{loanDetail.limitType == "D" ? "天" : "个月"}</li>
                            <li><i></i>利息 {myRateMoney}元({loanDetail.rate}%/{loanDetail.rateType == "D" ? "天" : "月"})</li>
                            <li><i></i>一次性{loanDetail.fee}元(0%)</li>
                        </ul>*/}
                    </div>
                    <div className="moneyDetailBox">
                        <div className="moneyDetail" style={{ "display": that.state.isShowDetail ? "block" : "none" }} dangerouslySetInnerHTML={{__html: loanDetail.loanIntro}}></div>
                        <p onClick={that.toMoneyDetail}>查看详情<img src="src/img/icon/down.png" /></p>
                    </div>
                    <div className="flowBox">
                        <h2>办理流程(门店办理)</h2>
                        <div className="flowPic" dangerouslySetInnerHTML={{__html: loanDetail.loanFlow}}>
                        	
                        </div>
                        <h2>申请条件</h2>
                        <div className="application">
                            {loanDetail.loanCondition}
                        </div>
                        <h2>所需材料</h2>
                        <div className="application">
                            {loanDetail.loanDoc}
                        </div>

                        <h2 onClick={this.toProblem}>常见问题<span>更多回复<img src="src/img/icon/right.png" /></span></h2>
                        {that.state.problemList}
                    </div>
                </div>

                <div className="applyBtnBox footer">
                    <div className="applySaveBtn" onClick={that.saveThis} data-markId={loanDetail.markId}><img src={that.state.isMark == 1 ? "src/img/icon/sc2.png" : "src/img/icon/sc1.png"} /><p>{that.state.isMark == 1 ? "取消收藏" : "收藏"}</p></div>
                    <div className="applyBtn" onClick={that.toApplyInfo}>申请借款</div>
                </div>
            </div>
        )
    }
});


export default ListDetail;

