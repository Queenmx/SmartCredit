'use strict';
// import React, { Component } from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import { Toast } from 'antd-mobile';
import '../css/listDetail.css';
// 引入 ECharts 主模块
// import echarts from "echarts";

var appBasePath = globalData.appBasePath;
var imgPath = globalData.imgPath;
var ListDetail = React.createClass({
    getInitialState: function () {
        return {
            activeTab: 1,
            isMark: 0,
            flag: true,
            activeIndex: 0,
            isShowDetail: false,
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
            isDownImg: true,
            fee: 0
        }
    },

    componentWillMount: function () {
        var user = localStorage.getItem("user");
        var loanId = this.props.location.query.id;
        var name=this.props.location.query.name;
        if (user) {
            this.setState({
                isLogin: true,
            })
        } else {
            this.setState({
                isLogin: false,               
            })
        }
        this.setState({
            loanId: loanId,
            name:name
        })
    },
    componentDidMount: function () {
        var that = this;
        var key1 = globalData.key;
        var toast = globalData.toast;
        var loanId = that.state.loanId;
        api.loanDetail(loanId, function (res) {
            if (res.code == "0000") {
                // var data = res.data;
                var data = JSON.parse(strDec(res.data, key1, "", ""));
                console.log(data);
                that.setState({
                    loanDetail:data
                })
            } else {                
                Toast.info(res.msg, 2);
            }
            that.setState({
                flag: false
            })
        }, function () {
            that.setState({
                flag: false
            })
            Toast.info("连接错误", 2);
        })
    },
    toApplyInfo: function (item) {
        var that = this;
        var key1 = globalData.key;
        if (that.state.isLogin) {
            api.setProductNum(item,function(res){
                if(res.code=="0000"){
                    window.location.href=that.state.loanDetail.loanLink;//去往第3方页面
                }else{
                    Toast.info(res.msg, 2);
                }
            })
            
        } else {
            var path = {
                pathname: '/Login',
                //query:data,
            }
            hashHistory.push(path);
            // window.location.href="http://h5.istarcredit.com/borrowmain.html?id=8"
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


  
  
  
    render: function () {
        //console.log(this.state.myRateMoney);
        var that = this;
        var loanDetail = that.state.loanDetail;
        var value1 = that.state.value1 * 1;
        var value2 = that.state.value2 * 1;
        var myRateMoney = Number(that.state.myRateMoney);
        var myTotalMoney = Number((Number(that.state.fee) + myRateMoney + value1)).toFixed(2) || "";
        return (
            <div className="app_Box listDetail">
                <Header title={loanDetail.name} />
                <div className="listDetailCon content">
                    <Loading flag={that.state.flag} />                                     
                    <ul className="loan-list">
                        <li>
                            <img src={imgPath+loanDetail.logo}/>
                            <div className="loanTitle">
                                <p>{loanDetail.name}</p>
                                <p>{loanDetail.intendedFor}</p>
                                <p>申请人数：<span className="totalpel">{loanDetail.totalNum}人</span></p>
                            </div>
                            <div className="high">
                                <p>
                                    {loanDetail.maximumAmount>9999?<span>{loanDetail.maximumAmount/10000}万</span>:<span>{loanDetail.maximumAmount}元</span>    }
                                </p>
                                <p>最高额度</p>
                            </div>
                        </li>
                        <li className="numdetail">
                            <div>
                                <p><span>{loanDetail.timeLimit}</span>月</p>
                                <p>平均期限</p>
                            </div>
                            <div>
                                <p> {loanDetail.averageAmount>9999?<span>{loanDetail.averageAmount/10000}万</span>:<span>{loanDetail.averageAmount}元</span>    }</p>
                                <p>平均额度</p>
                            </div>
                            <div>
                                <p><span>{loanDetail.meanTime}</span>天</p>
                                <p>平均用时</p>
                            </div>
                            <div>
                                <p><span>{loanDetail.annualRate}</span>%</p>
                                <p>年化利率</p>
                            </div>                              
                        </li> 
                        <li className="numdetail">
                            <div>
                                <p><span>{loanDetail.loanTermStart}-{loanDetail.loanTermEnd}</span>{loanDetail.loanTermUnit}</p>
                                <p>货款期限</p>
                            </div>
                            <div>
                                <p><span>{loanDetail.miniScope/10000}-{loanDetail.maxScope/10000}</span>万</p>
                                <p>额度范围</p>
                            </div>
                            <div>
                                <p><span>{loanDetail.fastestUseTime}</span>天</p>
                                <p>最快用时</p>
                            </div>
                            <div>
                                <p><span>{loanDetail.repaymentMethod}</span></p>
                                <p>还款方式</p>
                            </div>                              
                        </li>
                        <li className="numdetail spe">
                            <p className="must">
                            申请金额必须1万以上,提交申请后,由信贷经理一对一为您服务!
                            </p>
                        </li>
                        <li className="numdetail spe">
                            <div className="flowPic" dangerouslySetInnerHTML={{ __html: loanDetail.loanFlow }}></div>  
                            <img src="src/img/icon/list-icon4.png" alt=""/>  
                        </li> 
                    </ul>
                    <div className="flowBox">
                        {/* <h2>办理流程</h2> */}                        
                        <h2><span style={{backgroundImage:"url('src/img/icon/list-icon1.png')"}}></span>申请条件</h2>
                        <div className="application" dangerouslySetInnerHTML={{ __html: loanDetail.condition }}>
                        </div>
                        <h2><span style={{backgroundImage:"url('src/img/icon/list-icon2.png')"}}></span>需准备材料</h2>
                        <div className="application" dangerouslySetInnerHTML={{ __html: loanDetail.preparData }}>
                        </div>
                        <h2><span style={{backgroundImage:"url('src/img/icon/list-icon3.png')"}}></span>审核及还款说明</h2>
                        <div className="application" dangerouslySetInnerHTML={{ __html: loanDetail.explain }}>
                        </div>
                        {/* <h2 onClick={this.toProblem}>常见问题<span>更多回复<img src="src/img/icon/right.png" /></span></h2>
                        <div>{that.state.problemList}</div> */}
                    </div>                    
                </div>
                <div className="footer">
                    {/* <div className="applySaveBtn" onClick={that.saveThis} data-markId={loanDetail.markId}><img src={that.state.isMark == 1 ? "src/img/icon/sc2.png" : "src/img/icon/sc1.png"} /><p>{that.state.isMark == 1 ? "取消收藏" : "收藏"}</p></div> */}
                    <div className="applyBtn" onClick={that.toApplyInfo.bind(that,loanDetail.totalNum)}>申请借款</div>
                </div>
            </div>
        )
    }
});


export default ListDetail;

