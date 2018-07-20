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
        var msg=JSON.parse(localStorage.getItem("msg"));
        
        this.setState({
            msg:msg
        })
    },
    componentDidMount(){
        var id=this.state.msg.id;
        api.modifyStatus(id,function(res){
            if(res.code=="0000"){
            }else{
                Toast.info(res.msg,2);
            }
        })
    },
    componentWillUnmount() {
        
    },
    render: function () {
        
        return (
            <div className="app_Box message msg">
                <Header title="消息"/>
                <div className="content">
                    <p>{this.state.msg.title}</p>
                    <p>{this.state.msg.addTime.year+1900}-{this.state.msg.addTime.month}-{this.state.msg.addTime.day}</p>  
                    <p>{this.state.msg.content}</p>
                </div>                                                
            </div>
        )
    }

});

export default Login;


