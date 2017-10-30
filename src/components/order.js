'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';
import '../css/order.css';


var appBasePath = globalData.appBasePath;

var Order=React.createClass({
    getInitialState:function(){
        return {
            num:1,
            checked: false
        }
    },
    handleClick:function(e){
        this.setState({
            num:2,
            checked: !this.state.checked
        });
    },
    render:function(){
        var self = this;
        var backRouter=this.props.params.backRouter;
        var num = this.state.num;
        var btnStyle = {
            backgroundColor: this.state.checked ? '#ddd' : '#53a6ff'
        }
        return (
            <div className="app_Box orderList">
                <Header title="我的订单" backRouter={backRouter}/>
                <ul>
                    <li >
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
                            <span className={this.state.num == 1 ? "statusBtn ":'grayBtn'} onClick={this.handleClick} style={btnStyle}>取消审核</span>
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
                            <span className={this.state.num == 1 ? "statusBtn ":'grayBtn'} onClick={this.handleClick} style={btnStyle}>取消审核</span>
                        </div>
                    </li>
                </ul>
                
            </div>
        )
    }
})
export default Order; 
