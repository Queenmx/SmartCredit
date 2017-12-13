'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import Header from './header';
import OrderList from './orderList';
import { Modal, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
var Order = React.createClass({
    getInitialState: function () {
        return {
        }
    },

    render: function () {
        var that = this;
        var title = that.props.location.state.title;
        var statusType = that.props.location.state.statusType;//全部订单1，待还款2，待完成3
        return (
            <div className="app_Box orderList">
                <Header title={title} />
                <OrderList scollFlag="true" statusType={statusType} />
            </div>
        )
    }
})



export default Order;


