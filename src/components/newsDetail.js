'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import { hashHistory, Link } from 'react-router';
import Header from './header';

var NewsDetail = React.createClass({
    getInitialState: function () {
        return {
            articleDetail: "",
            isMark: 0
        }
    },
    getTabId: function (e) {
        var that = this;
        var id = e.target.getAttribute('data-id');
        that.setState({
            activeTab: id,
            isShow: false
            //dataStatus: 0
        }, () => {
			/*api.queryBanner(function(data){
				console.log(data);
			})*/
        })
    },
    componentWillMount: function () {
        let articleId = this.props.location.query.articleId;
        this.setState({ articleId: articleId });
        console.log(articleId);
    },
    saveHandle: function (event) {
        var user = localStorage.getItem("user")
        var key1 = globalData.key;
        var toast = globalData.toast;
        var that = this;

        if (user) {
            if (that.state.isMark != 1) {//收藏
                api.save(that.state.articleId, "ARTICLE", function (res) {
                    console.log(res);
                    if (res.code == "0000") {
                        that.setState({
                            isMark: 1
                        })
                    } else {
                        toast.show(res.msg, 2000);
                    }
                }, function () {
                    toast.show("连接错误", 2000);
                })
            } else {//取消收藏
            	var markId=event.currentTarget.getAttribute("data-markId");
                api.delSave(markId, "ARTICLE", function (res) {
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
            }


        } else {
            var path = {
                pathname: '/Login',
                //query:data,
            }
            hashHistory.push(path);
        }
    },
    render: function () {
        let that = this;
        let articleDetail = that.state.articleDetail;
        var addTime = articleDetail.addTime || "";
        var addTimeArr = addTime.split(" ");
        return (
            <div className="app_Box newsDetail">
                <Header title="" />
                <div className="content newsDetailCon">
                    <h1>{articleDetail.articleTitle}</h1>
                    <div className="newsDetailInfo">
                        <span>媒体来源:{articleDetail.mediaSource}</span>
                        <span>{addTimeArr[0]}</span>
                        <span>{articleDetail.readerNum}阅读</span>
                    </div>
                    <div className="newsArticleCon">
                        {articleDetail.content}
                    </div>
                </div>
                <div className="botBtn" data-markId={articleDetail.markId} onClick={that.saveHandle}>{that.state.isMark == 1 ? "取消收藏" : "收藏"}</div>
            </div>
        )
    },
    componentDidMount: function () {
        var that = this;
        let key1 = globalData.key;
        let toast = globalData.toast;
        api.articleDetail(that.state.articleId, function (res) {
            //console.log(res);
            if (res.code == "0000") {
                let data = strDec(res.data, key1, "", "");
                let articleDetail = JSON.parse(data);
                console.log(articleDetail);
                that.setState({
                    articleDetail: articleDetail,
                    isMark: articleDetail.isMark
                })
            } else if (res.code == "5555") {
                toast.show("登录过时，请重新登录", 2000);
                var path = {
                    pathname: '/Login',
                }
                hashHistory.push(path);
            } else {
                toast.show(res.msg, 2000);
            }
        }, function () {
            toast.show("连接错误", 2000);
        })
    }
});


export default NewsDetail;


