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
    goDetail(){
        var path = {
            pathname: '/msgDetail',
        }
        hashHistory.push(path);
    },
    render: function () {
        
        return (
            <div className="app_Box message">
                <Header title="消息"/>
                <div className="content">
                    <List className="my-list">
                        <Item onClick={this.goDetail}>
                            <div className="title">
                                <p className={this.state.isRead?'isRead':''}>订单支付成功<span style={{backgroundImage:"url('src/img/icon/redIcon.png')"}}></span></p>   
                                <p>06-21</p>
                            </div>
                            <div className="title msg-content">
                                <p>消息打发打法撒旦法师大幅度发发生打发打发</p>
                                <p style={{backgroundImage:"url('src/img/icon/go1.png')"}}></p>
                            </div>                       
                        </Item>
                        <Item onClick={() => {}}>
                            <div className="title">
                                <p>订单支付成功<span style={{backgroundImage:"url('src/img/icon/redIcon.png')"}}></span></p>   
                                <p>06-21</p>
                            </div>
                            <div className="title msg-content">
                                <p>消息打发打法撒旦法师大幅度发发生打发打发</p>
                                <p style={{backgroundImage:"url('src/img/icon/go1.png')"}}></p>
                            </div>                       
                        </Item>
                        
                    </List>
                    <div className={[this.state.isShow?"hide":"","isShow"].join(' ')}>
                        <img src="src/img/icon/msg-no.png" alt=""/>
                        <p>暂无消息</p>
                    </div>
                </div>
                
                
                
            </div>
        )
    }

});

export default Login;


