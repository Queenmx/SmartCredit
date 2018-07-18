'use strict';
// import React, { Component } from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import { Toast,Progress, Button, WingBlank, WhiteSpace } from 'antd-mobile';
import '../css/home.css';


var appBasePath = globalData.appBasePath;
var ListDetail = React.createClass({
    getInitialState: function () {
        return {
        }
    },

    componentWillMount: function () {
        var user = localStorage.getItem("user");     
        if (user) {
            this.setState({                
                isLogin: true,                
            })
        } else {
            this.setState({                
                isLogin: false,               
            })
        }
    },
    componentDidMount:function(){
        var key1 = globalData.key;        
        var info=this.props.location.query;
        var that=this;
        api.viewTask(info.id*1,info.taskName,function(res){
            if(res.code=="0000"){
                var result = JSON.parse(strDec(res.data, key1, "", ""));
                console.log(result);
                var arr=[];
                arr.push(
                    <div key={result.id}>
                         <div className="time">
                            <p>剩余时间</p>
                            <p>
                                <span>2&nbsp;</span>天
                                <span>&nbsp;2&nbsp;</span>时
                                <span>&nbsp;2&nbsp;</span>分
                                <span>&nbsp;2&nbsp;</span>秒
                            </p>
                            <p>任务时间：{result.releaseTime.year}年{result.releaseTime.month+1}月{result.releaseTime.day}日起</p>
                        </div>
                        <ul className="detail">
                            <li>
                                <div className="info">
                                    <p>当前剩余任务总数&nbsp;<span className="ftcolor">{result.count}</span>/100</p>
                                    <div className="progress-container">                            
                                        <Progress percent={result.count} position="normal" unfilled={false} appearTransition />                                    
                                    </div>
                                </div>                            
                            </li>
                            <li>
                                <p><span></span><i>任务详情</i><span></span></p>
                                <div className="info">
                                    <p>奖励要求：{result.taskDetails}</p>
                                    
                                </div>                            
                            </li>
                            <li>
                                <p><span></span><i>任务规则</i><span></span></p>
                                <div className="info">
                                {result.taskRule}
                                    {/* <p>任务时间：2018年6月32日起</p>
                                    <div className="step">
                                        <span>任务步骤：</span>
                                        <dl>                                   
                                            <dd>1.沙发垫</dd>
                                            <dd>2.沙发垫</dd>
                                            <dd>3.沙发垫</dd>
                                        </dl>
                                    </div>                                 */}
                                </div>                            
                            </li>
                            <li>
                                <p><span></span><i>任务奖励</i><span></span></p>
                                <div className="info">
                                    <p>任务奖励：<span>{result.taskMoney}</span>元（任务奖励按照每投资100递增）</p>                                
                                </div>                            
                            </li>
                        </ul>
                    </div>
                )
                that.setState({
                    taskInfo:arr
                })
            }
        })
    },
    getTask(){
        if (this.state.isLogin) {
            var path = {
                pathname: '/taskMy',                
            }
        }else{
            var path = {
                pathname: '/Login',                
            }
        }
        hashHistory.push(path);
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
    add(){
        let p = this.state.percent + 10;
        if (this.state.percent >= 100) {
            p = 0;
        }
        this.setState({ percent: p });
    },
    toBack: function () {
        const backRouter = this.props.backRouter;
        //console.log(backRouter);
        if (backRouter) {
            hashHistory.push(backRouter);
        } else {
        	 history.go(-1); 
        }


    },

    formateMoney: function (money) {
        if (money % 100 === 0) {
            return (money / 100)
        } else {
            return (money / 100.0).toFixed(2)
        }
    },
    render: function () {
        var that = this;
        const percent = this.state.percent;
        return (
            <div className="app_Box taskDetail">
                <Header title="任务详情" />
                <div className="listDetailCon content">
                    <Loading flag={that.state.flag} />                                     
                    {this.state.taskInfo}
                    
                </div>
                <div className="footer">
                    <div className="applyBtn" onClick={this.getTask}>领取任务</div>
                </div>
            </div>
        )
    }
});


export default ListDetail;

