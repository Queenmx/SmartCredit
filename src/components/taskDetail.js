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
var key1 = globalData.key;  
var ListDetail = React.createClass({
    getInitialState: function () {
        return {

        }
    },
    componentWillUpdate(){
        var that=this;
        // setInterval(function(){	  	
        //     var t=that.state.time;                    
        //     that.getCountDown(t);	
        //     that.setState({
        //         time:t-1000
        //     })
        // },1000);
    },
    componentWillMount: function () {
        var user = localStorage.getItem("user");  
        var isGet=this.props.location.query.isGet;  
        if (user) {
            this.setState({                
                isLogin: true,  
                user:JSON.parse(user)              
            })
        } else {
            this.setState({                
                isLogin: false,               
            })
        }
        if(isGet=="got"){//已领取了
            this.setState({                
                isGet: true,               
            })
        }
    },
    componentDidMount:function(){
              
        var info=this.props.location.query;
        var that=this;
        api.viewTask(info.id*1,info.taskName,function(res){
            if(res.code=="0000"){
                var result = JSON.parse(strDec(res.data, key1, "", ""));
                var timestamp =(new Date()).valueOf();
                console.log(result);
                var time=result.effectiveTime.time-timestamp;
                var taskNum=result.taskNumber-result.count*1;
                
                // var time=3000;
                // console.log(result.effectiveTime.time,timestamp);
                
                if(taskNum<=0){
                    that.setState({
                        isGet:true
                    })
                }
                // that.getCountDown(time); 
                that.timer=setInterval(function(){	
                    if(time<=0){
                        clearInterval(that.timer);
                        time=1000;
                        that.setState({
                            isGet:true
                        });
                    } 
                    time-=1000;
                    that.getCountDown(time);                                                   	                                	
                }.bind(that),1000);  
                                             
                var arr=[];
                arr.push(
                    <div key={result.id}>
                        <div className="stime">
                        <p>任务时间：{result.releaseTime.year+1900}年{result.releaseTime.month+1}月{result.releaseTime.date}日起</p>
                    </div> 
                        <ul className="detail" >
                            <li>
                                <div className="info">
                                    <p>当前剩余任务总数&nbsp;<span className="ftcolor">{taskNum<=0?0:taskNum}</span>/{result.taskNumber}</p>
                                    <div className="progress-container">                            
                                        <Progress percent={(100*result.count*1)/result.taskNumber} position="normal" unfilled={false} appearTransition />                                    
                                    </div>
                                </div>                            
                            </li>
                            <li>
                                <p><span></span><i>任务详情</i><span></span></p>
                                <div className="info">
                                    <p className="jiang">
                                        <span>奖励要求：</span>
                                        <span>       
                                            {result.taskDetails}      
                                        </span>
                                    
                                    </p>
                                    
                                </div>                            
                            </li>
                            <li>
                                <p><span></span><i>任务规则</i><span></span></p>
                                <div className="info">
                                
                                    <p>任务时间：{result.releaseTime.year+1900}年{result.releaseTime.month+1}月{result.releaseTime.date}日起</p>
                                    <div className="step">
                                        <span>任务步骤：</span>
                                        <dl>       
                                        {result.taskRule}                            
                                            {/* <dd>1.沙发垫</dd>
                                            <dd>2.沙发垫</dd>
                                            <dd>3.沙发垫</dd> */}
                                        </dl>
                                    </div>                                
                                </div>                            
                            </li>
                            <li>
                                <p><span></span><i>任务奖励</i><span></span></p>
                                <div className="info">
                                    <p>任务奖励：<span>{result.taskMoney}</span>元</p>                                
                                </div>                            
                            </li>
                        </ul>
                        </div>
                )
                that.setState({
                    taskInfo:arr,
                    time:time,
                    result:result
                })
            }else{
                Toast.info(res.msg,2);
            }
        })
    },
    componentWillUnmount() {
        clearInterval(this.timer);
    },
    getTask(){  
        var info=this.props.location.query;      
        if (this.state.isLogin) {
            var item={
                identity:this.state.user.idCard,
                realName:this.state.user.realName,
                phone:this.state.user.phone,
                taskId:info.id*1
            }
            console.log(item);
            if(this.state.isGet){//不能领取了
                Toast.info("当前任务已领取完毕，请领取其他任务",2);
            }else{
                api.recieveTask(item,function(res){
                    if(res.code=="0000"){
                        Toast.info("领取成功",2);
                        var path = {
                            pathname: '/taskMy',                
                        }
                        hashHistory.push(path);
                    }else{
                        Toast.info(res.msg,2)
                    }
                })
            }
                       
        }else{
            var path = {
                pathname: '/Login',                
            }
            hashHistory.push(path);
        }
        
    },
    //倒计时
    getCountDown(leftTime){
        var that=this;
        var days = parseInt(leftTime / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数 
        var hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时 
        var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟 
        var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数 
        days = checkTime(days); 
        hours = checkTime(hours); 
        minutes = checkTime(minutes); 
        seconds = checkTime(seconds);         
        function checkTime(i){ //将0-9的数字前面加上0，例1变为01 
            if(i<10) 
            { 
                i = "0" + i; 
            } 
            return i; 
        } 
        that.setState({
            d:days,
            h:hours,
            m:minutes,
            s:seconds
        })
        
        // console.log(that.state.s)
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
        const result = that.state.result;
       
        return (
            <div className="app_Box taskDetail">
                <Header title="任务详情" />
                <div className="listDetailCon content">
                    <Loading flag={that.state.flag} /> 
                    <div className="time">
                        <p>剩余时间</p>
                        <p>
                            <span>{that.state.d}&nbsp;</span>天
                            <span>&nbsp;{that.state.h}&nbsp;</span>时
                            <span>&nbsp;{that.state.m}&nbsp;</span>分
                            <span>&nbsp;{that.state.s}&nbsp;</span>秒
                        </p>
                    </div>                                    
                    {this.state.taskInfo}
                    
                </div>
                <div className="footer">
                    <div className={"applyBtn"+" "+(this.state.isGet?"gray":'')} onClick={this.getTask}>领取任务</div>
                </div>
            </div>
        )
    }
});


export default ListDetail;

