'use strict';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import { Toast } from 'antd-mobile';
var introKSD = React.createClass({
    getInitialState: function () {
        return {
            flag: false,
            loanDetail: {},
            problemList: []
        }
    },

    componentWillMount: function () {
        var user = localStorage.getItem("user");
        var loanDetail = this.props.location.state.loanDetail;
        if (user) {
            this.setState({
                isLogin: false,
                loanId: loanDetail.loanId,
                loanName: loanDetail.loanName
            })
        } else {
            this.setState({
                isLogin: false,
                loanId: loanDetail.loanId,
                loanName: loanDetail.loanName
            })
        }
    },




    toProblem: function () {
        var data = { objId: this.state.loanId, loanName: this.state.loanName };
        var path = {
            pathname: '/Problem',
            query: data,
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


    componentDidMount: function () {
        var that = this;
        var key1 = globalData.key;
        var toast = globalData.toast;
        var loanId = that.state.loanId;


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
                        var theTime = problemList[i].addTime || "";
                        var answerTime = problemList[i].answerTime || "";
                        var theAnswerTime = that.getDateDiff(answerTime.time);
                        var theAddTime = that.getDateDiff(theTime.time);
                        //console.log(theAddTime);
                        arr.push(<div className="problemList" key={i}>
                            <div className="problemBlock">
                                <img src="src/img/icon/problem.png" />
                                <p>{problemList[i].content}</p>
                                <span>提问时间:{theAddTime}</span>
                            </div>
                            <div className="answerBlock">
                                <img src="src/img/icon/answer.png" />
                                <p><span>{problemList[i].answerUser}</span><span>{theAnswerTime}</span></p>
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
                Toast.info(res.msg, 2);
            }
        }, function () {
            Toast.info("连接错误", 2);
        })

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
    toAsk: function () {
        var user = localStorage.getItem("user");
        if (user) {
            var data = { objId: this.state.loanId, objType: "LOAN", fromWho: "problem", loanName: this.state.loanName };
            var path = {
                pathname: '/Ask',
                query: data,
            }
            hashHistory.push(path);
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
        var loanDetail = this.props.location.state.loanDetail;
        return (
            <div className="app_Box listDetail">
                <Header title="产品详情" />
                <div className="listDetailCon content">
                    <Loading flag={that.state.flag} />
                    <div className="flowBox">
                    	<h2>利率详情</h2>
                        <div className="application" dangerouslySetInnerHTML={{ __html: loanDetail.loanIntro }}></div>
                        <h2>办理流程</h2>
                        <div className="flowPic" dangerouslySetInnerHTML={{ __html: loanDetail.loanFlow }}>
                        </div>
                        <h2>申请条件</h2>
                        <div className="application" dangerouslySetInnerHTML={{ __html: loanDetail.loanCondition }}>
                        </div>
                        <h2>所需材料</h2>
                        <div className="application" dangerouslySetInnerHTML={{ __html: loanDetail.loanDoc }}>
                        </div>

                        <h2 onClick={this.toProblem}>常见问题<span>更多回复<img src="src/img/icon/right.png" /></span></h2>
                        <div>{that.state.problemList}</div>
                    </div>
                </div>

                <div className="botBtn" onClick={that.toAsk}>
                    我要提问
                </div>
            </div>
        )
    }
});


export default introKSD;

