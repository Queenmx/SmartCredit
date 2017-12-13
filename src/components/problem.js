'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'reactjs-iscroll';
import { globalData } from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';
import '../css/problem.css';
import { Modal, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';

var Problem = React.createClass({
    getInitialState: function () {
        return {
            list: [],
            scrollShow: false,
            currentPage: 1,
            lastPage: false,
            pageSize: 10
        }
    },

    componentWillMount: function () {
        var objId = this.props.location.query.objId;
        this.setState({ objId: objId })
    },

    toAsk: function () {
        var user = localStorage.getItem("user");
        if (user) {
            var loanName = this.props.location.query.loanName;
            var data = { objId: this.state.objId, objType: "LOAN", fromWho: "problem", loanName: loanName };
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
        that.loadData();
    },
    loadData: function (downOrUp, callback) {
        var that = this;
        var key1 = globalData.key;
        // var toast = globalData.toast;
        const { objId, currentPage, pageSize, list } = that.state;
        //console.log(objId);
        var arr = [];
        //console.log(tag);
        api.questionList(objId, currentPage, pageSize, function (res) {
            //console.log(res);
            if (res.code == "0000") {
                var data = JSON.parse(strDec(res.data, key1, "", ""));
                var problemList = data.list;
                var total = data.total;
                var totalPage = Math.ceil(total / pageSize);
                if (totalPage > 1) {
                    that.setState({ scrollShow: true })
                }
                //console.log(problemList);
                if (problemList.length > 0) {
                    for (var i in problemList) {
                        var theTime = problemList[i].addTime || "";
                        var answerTime = problemList[i].answerTime || "";
                        var theAnswerTime = that.getDateDiff(answerTime.time);
                        var theAddTime = that.getDateDiff(theTime.time);
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
                    arr.push(<div key={Math.random()} style={{ 'textAlign': 'center', 'lineHeight': '1rem' }}>暂无问题</div>)
                }

                if (downOrUp == 'up') {
                    var c = list.concat(arr);
                } else {
                    var c = arr;
                }
                that.setState({
                    totalPage: totalPage,
                    list: c
                })
                if (callback && typeof callback === 'function') {
                    callback();
                }

            } else if (res.code == "5555") {
                Toast.info("登录过时，请重新登录", 2);
                var path = {
                    pathname: '/Login',
                }
                hashHistory.push(path);
            } else {
                Toast.info(res.msg, 2);
            }
        }, function () {
            Toast.info("连接错误", 2);
        })
    },
    handleRefresh(downOrUp, callback) {
        //真实的世界中是从后端取页面和判断是否是最后一页
        var that = this;
        let { currentPage, lastPage, pageSize, totalPage } = that.state;
        //console.log(totalPage);
        if (downOrUp === 'up') { // 加载更多
            if (currentPage == totalPage) {
                //console.log("zuihou")
                lastPage = true;
                if (callback && typeof callback === 'function') {
                    callback();
                }
            } else {
                currentPage++;
                //console.log(currentPage);
                lastPage = false;
                that.setState({
                    currentPage,
                    lastPage
                }, () => {
                    that.loadData(downOrUp, callback);
                });
            }
        } else { // 刷新
            lastPage = false;
            currentPage = 1;
            that.setState({
                currentPage,
                lastPage
            }, () => {
                that.loadData(downOrUp, callback);
            });
        }
    },
    render: function () {
        var that = this;
        //console.log("cityId",cityId);
        var htmlTxt = [];
        if (that.state.scrollShow) {
            htmlTxt.push(<ReactIScroll key={1} iScroll={iScroll} handleRefresh={this.handleRefresh} >
                {that.state.list}
            </ReactIScroll>);
        } else {
            htmlTxt = that.state.list
        }
        return (
            <div className="app_Box problem">
                <Header title="常见问题" />
                <div className="problemCon content">
                    {/*<ReactIScroll key={1} iScroll={iScroll} style={{'display':that.scrollShow?'block':'none'}} handleRefresh={this.handleRefresh} >
		        		{that.state.list}
		        	</ReactIScroll>*/}
                    {htmlTxt}
                    <div className="askBtn" onClick={this.toAsk}>提问</div>
                </div>

            </div>
        )
    }
});


export default Problem;


