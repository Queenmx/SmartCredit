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
            list: []
        }
    },
    toCancel: function (e) {
        e.target.style.backgroundColor = e.target.style.backgroundColor === "grey" ? "#53a6ff" : "grey";
    },
    componentDidMount: function () {
        var key1 = globalData.key;
        var toast = globalData.toast;
        var that = this;
        api.orderList(1, 5, "", function (res) {
            if (res.code == "0000") {
                var data = JSON.parse(strDec(res.data, key1, "", "") || []);
                var orderList = data.list;
                console.log(data);
                var arr = [];
                for (var i in orderList) {
                    arr.push(<li key={i}>
                        <div className="orderNum">
                            <span className="order_n">订单号：{orderList[i].applyId}</span>
                            <span>{orderList[i].applyStatus}</span>
                        </div>
                        <h3 className="list_title">
                            <img src="src/img/icon/order.png" />
                            <span>{orderList[i].loanType}</span>
                            <span className="p_name">{orderList[i].loanName}</span>
                        </h3>
                        <ul className="container">
                            <li>借款金额 {orderList[i].money}</li>
                            <li>期限12月</li>
                            <li>利息480元</li>
                            <li>月费用3.17%</li>
                        </ul>
                        <div className="listFoot">
                            <span className="status">您的贷款申请已提交，3个工作日内完成</span>
                            <span onClick={that.toCancel} className='statusBtn'>取消借款</span>
                        </div>
                    </li>)
                }
                that.setState({
                    list: arr
                })
            }

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
                        </li>
                        <li>
                            <div className="orderNum">
                                订单号：201705092356412
	                            <span>审核中</span>
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
                                <span className="status">您的贷款申请正在审核中，3个工作日内完成</span>
                                <span onClick={that.toCancel} className='statusBtn'>取消借款</span>
                            </div>
                        </li> */}
                        {that.state.list}
                    </ul>
                    <Loading flag={that.state.isLoading} />
                </div>
            </div>
        )
    }
})



export default Order; 
