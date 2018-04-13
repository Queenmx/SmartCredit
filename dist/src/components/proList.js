// import React, { Component, PropTypes } from 'react';
// import { render } from 'react-dom';
import { Component, PropTypes } from 'react';
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'reactjs-iscroll';
import api from './api';
import Loading from './loading';
import { globalData } from './global.js';
import { hashHistory, Link } from 'react-router';
import {  Toast } from 'antd-mobile';
class ProList extends Component {
    constructor() {
        super();
        this.state = {
            flag: true,
            list: [],
            currentPage: 1,
            lastPage: false,
            pageSize: 10,
            scrollShow: false
        };

        this.toListDetail = (event) => {
            // var toast = globalData.toast;
            var loanId = event.currentTarget.getAttribute("data-loanId");
            var type = event.currentTarget.getAttribute("data-type");
            var data = { loanId: loanId };
            //console.log(type);
            if (type == "JZD") {
                var path = {
                    pathname: '/ListDetail',
                    query: data,
                }
            } else if (type == "KSD") {
                var path = {
                    pathname: '/ListDetailKSD',
                    query: data,
                }
            } else {
                Toast.info("数据错误", 2)
            }

            hashHistory.push(path);
        }
        this.handleRefresh = this.handleRefresh.bind(this);
        this.loadData = this.loadData.bind(this);
        this.logoError = (event) => {
            event.target.src = "src/img/icon/capitalLogo.jpg";
            event.target.onerror = null; //控制不要一直跳动 
            //console.log(event.target.src);
        }
    }
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

    }
    loadData(downOrUp, callback) {
		var imgPath = globalData.imgPath;
        var that = this;
        var key1 = globalData.key;
        // var toast = globalData.toast;
        var tag = that.props.tag;
        const { currentPage, pageSize, list } = that.state;
        var arr = [];
        //console.log(tag);
        api.loanList(currentPage, pageSize, tag, "JZD", function (res) {
            //console.log(res);
            if (res.code == "0000") {
                that.setState({
                    flag: false
                })
                var data = JSON.parse(strDec(res.data, key1, "", ""));
                var loanList = data.list;
                var total = data.total;
                var totalPage = Math.ceil(total / pageSize);
                if (totalPage > 1) {
                    that.setState({ scrollShow: true })
                }
                if (loanList.length < 1) {
                    arr.push(<div key={Math.random()} style={{ 'textAlign': 'center', 'lineHeight': '1rem' }}>暂无数据</div>)
                } else {
                    //console.log(data);
                    for (var i in loanList) {
                        var theDate = loanList[i].limitType;
                        var theDateTxt;
                        switch (theDate) {
                            case "Y":
                                theDateTxt = "年"
                                break;
                            case "M":
                                theDateTxt = "月"
                                break;
                            case "D":
                                theDateTxt = "日"
                                break;
                            default:
                                break;
                        }
                         var theDateRate = loanList[i].rateType;
                var theDateRateTxt;
                switch (theDateRate) {
                    case "Y":
                        theDateRateTxt = "年"
                        break;
                    case "M":
                        theDateRateTxt = "月"
                        break;
                    case "D":
                        theDateRateTxt = "日"
                        break;
                    default:
                        break;
                }
                        arr.push(<div className="capitalList" key={Math.random()} data-loanId={loanList[i].loanId} data-type={loanList[i].type} onClick={that.toListDetail}>
                            <h3>
                                <img src={imgPath + loanList[i].logo} onError={that.logoError} />
                                <span>{loanList[i].loanName}</span>
                            </h3>
                            <div className="capitalInfo">
                                <div className="limit">
                                    <h2>{loanList[i].moneyMin}~{loanList[i].moneyMax}</h2>
                                    <p>额度范围(元)</p>
                                </div>
                                <ul className="special">
                                    <li>{loanList[i].loanTime}</li>
                                    <li>{theDateRateTxt}费率{loanList[i].rate}%</li>
                                    <li>贷款期限{loanList[i].limitMin}-{loanList[i].limitMax}{theDateTxt}</li>
                                </ul>
                                <div className="apply">
                                    <a href="javascript:;" >申请贷款</a>
                                </div>
                            </div>

                        </div>)
                    }
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
                that.setState({
                    flag: false
                })
                Toast.info("登录过时，请重新登录", 2);
                var path = {
                    pathname: '/Login',
                }
                hashHistory.push(path);
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


    }
    componentDidMount() {
        var that = this;
        that.loadData();

    }


    render() {
        var that = this;
        var scollTxt = [];
        if (that.state.scrollShow) {
            //if(true){
            scollTxt.push(<ReactIScroll iScroll={iScroll} key={Math.random()} handleRefresh={this.handleRefresh} >
                {that.state.list}
            </ReactIScroll>)
        } else {
            scollTxt = that.state.list;
        }
		/*var scollFlag=that.props.scollFlag;
		//console.log(scollFlag);
		let box=[];
		if(scollFlag==='true'){//不iscoll
			 box.push(<ReactIScroll key={1} iScroll={iScroll} handleRefresh={this.handleRefresh.bind(this)} >
		        		{that.state.list}
		        </ReactIScroll>)
		}else{
			box=that.state.list;
		}*/
        return (
            <div className="capitalBox">
                <Loading flag={that.state.flag} />
                {scollTxt}
            </div>
        )
    }
};

export default ProList;