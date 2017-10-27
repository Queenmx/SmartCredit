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
    render:function(){
        var self = this;
        var backRouter=this.props.params.backRouter;
        return (
            <div className="app_Box orderList">
                <Header title="我的订单" backRouter={backRouter}/>
                <div className="orderNum">
                    订单号：201705092356412
                    <span>已申请</span>
                </div>
                <h3>
                    <img src="src/img/icon/capitalLogo.jpg" />
                    <span>现金借款（多期）</span>
                    <span className="p_name">信用贷</span>
                </h3>
                <div className="container"></div>
            </div>
        )
    }
})
export default Order; 
