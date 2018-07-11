'use strict';
// import React from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import '../css/messages.css';
import { Toast,List } from 'antd-mobile';


// var toast = globalData.toast;
const Item = List.Item;
const Brief = Item.Brief;
var key1 = globalData.key;
var Login = React.createClass({
    getInitialState: function () {
        return {
            isRead:true,
            isShow:true
        }
    },
    componentWillMount: function () {

    },
    componentDidMount(){
        
    },
    componentWillUnmount() {
        
    },
    render: function () {
        
        return (
            <div className="app_Box message msg">
                <Header title="消息"/>
                <div className="content">
                    <p>订单支付成功</p>
                    <p>2018-06-07</p>  
                    <p>打发打发对方水电费水电费是对方是否单身电风扇的发生范德萨地方电风扇的发生范德萨打发的水电费电风扇是的发的发生大大幅度发地方的反复打</p>
                </div>                                                
            </div>
        )
    }

});

export default Login;


