'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import '../sass/order.scss';


var Order = React.createClass({
    getInitialState: function () {
        return {
            //btnActive: 0,
            isLoading: false,
            pageNum: 1,
            pageSize: 10,
            list: [],
            status: {
                PENDING: {
                    text: '待处理',
                    btntext: '取消借款',
                    dataId: '1'
                },
                APRING: {
                    text: '待审核',
                    btntext: '取消借款',
                    dataId: '2'
                },
                APRNO: {
                    text: '审核不通过',
                    btntext: '删除订单',
                    dataId: '3'
                },
                APRYES: {
                    text: '审核通过',
                    btntext: '确认借款',
                    dataId: '4'
                }
            },
            name: {
                KSD: '快速贷',
                JZD: '精准贷'
            },
            rate: {
                D: '日',
                M: '月',
                Y: '年'
            },
            orderList: []
        }
    },
    toCancel: function (e) {
        var that = this;
        // e.target.style.backgroundColor = e.target.style.backgroundColor === "rgb(221, 221, 221)" ? "#53a6ff" : "rgb(221, 221, 221)";
        // console.log(e.target)
        var id = e.target.getAttribute('data-id');
        var dataId = that.state.status[that.orderList[id].applyStatus].dataId;
        if (dataId == 1 || dataId == 2 && that.orderList[id].status > 0) {
            api.cancleOrder(that.orderList[id].applyId, function (res) {
                if (res.code == "0000") {
                    e.target.style.backgroundColor = "#555"
                }
            })
        }
    },
    formateMoney: function (money) {
        if (money % 100 === 0) {
            return (money / 100).toFixed(2)
        } else {
            return money / 100.0
        }
    },
    componentDidMount: function () {
        var key1 = globalData.key;
        var toast = globalData.toast;
        var that = this;
        api.orderList(1, 5, "", function (res) {
            console.log(res);
            if (res.code == "0000") {
                var data = JSON.parse(strDec(res.data, key1, "", "") || []);
                var orderList = data.list;
                that.orderList = data.list
                var arr = [];

                for (var i in orderList) {
                    var status = orderList[i].status;
                    arr.push(<li key={i}>
                        <div className="orderNum">
                            <span className="order_n">订单号：{orderList[i].applyNo.slice(0, 20)}</span>
                            <span>{that.state.status[orderList[i].applyStatus].text}</span>
                        </div>
                        <h3 className="list_title">
                            <img src={'http://xrjf.oss-cn-shanghai.aliyuncs.com/' + orderList[i].logo} />
                            <span>{orderList[i].loanName}</span>
                            <span className="p_name">{that.state.name[orderList[i].loanType]}</span>
                        </h3>
                        <ul className="container">
                            <li>借款金额 {that.formateMoney(orderList[i].money)}元</li>
                            <li>期限{orderList[i].limitDay}{that.state.rate[orderList[i].limitType]}</li>
                            <li>利息{that.formateMoney(orderList[i].interest)}元</li>
                            <li>{orderList[i].rateType}费用{orderList[i].rate}%</li>
                        </ul>
                        <div className="listFoot">
                            <span className="status">您的贷款申请已提交，3个工作日内完成</span>
                            <span onClick={that.toCancel} className='statusBtn' data-id={i} style={{ backgroundColor: status < 0 ? 'rgb(221, 221, 221)' : '#53a6ff' }}>
                                {that.state.status[orderList[i].applyStatus].btntext}
                            </span>
                            {/* <span onClick={that.toCancel} className='statusBtn' data-id={that.state.status[orderList[i].applyStatus].dataId} data-sign={orderList[i].applyId} style={}>
                                {that.state.status[orderList[i].applyStatus].btntext}
                            </span> */}
                        </div>
                    </li >)
                }
                that.setState({
                    list: arr
                })
            }
            // else if (res.code == "5555") {
            //     var isLogin = localStorage.getItem("isLogin");
            //     if (isLogin) {
            //         var path = {
            //             pathname: '/Login',
            //             //query:data,
            //         }
            //         hashHistory.push(path);
            //     } else {
            //         var path = {
            //             pathname: '/Order',
            //             //query:data,
            //         }
            //         hashHistory.push(path);
            //     }
            // }

        }, function () {
            toast.show("连接错误", 2000);
        })
    },
    render: function () {
        var that = this;
        return (
            <div className="app_Box orderList">
                <Header title="我的订单" />
                <div className="orderCon content">
                    <ul>
                        {/* <li>
                            <div className="orderNum">
                                订单号：201705092356412
	                            <span>已申请</span>
                            </div>
                            <h3 className="list_title">
                                <img src="src/img/icon/order.png" />
                                <span>现金借款（多期）</span>
                                <span className="p_name">信用贷</span>
                            </h3>
                            <ul className="container">
                                <li>借款金额 ¥5000</li>
                                <li>期限12月</li>
                                <li>利息480元</li>
                                <li>月费用3.17%</li>
                            </ul>
                            <div className="listFoot">
                                <span className="status">您的贷款申请已提交，3个工作日内完成</span>
                                <span onClick={that.toCancel} className='statusBtn'>取消借款</span>
                            </div>
                        </li>*/}
                        {that.state.list}
                    </ul>
                    <Loading flag={that.state.isLoading} />
                </div>
            </div>
        )
    }
})



export default Order; 
