'use strict';
// import React from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import '../css/messages.css';
import { Toast } from 'antd-mobile';


// var toast = globalData.toast;
var key1 = globalData.key;
var Login = React.createClass({
    getInitialState: function () {
        return {
            isRead:true,
            isShow:true
        }
    },
    componentWillMount: function () {
        var user = localStorage.getItem("user");
        if(user){
            this.setState({
                user:JSON.parse(user)
            })           
        }else{
            this.setState({
                user:""
            })
        }
        
    },
    componentDidMount(){        
        var that=this;
        if(this.state.user){
            var phone=this.state.user.phone;
            api.newsList(phone,function(res){
                var key1 = globalData.key;
                if(res.code=="0000"){
                    var temp = JSON.parse(strDec(res.data, key1, "", ""))[0];                    
                    var arr=temp.systemNotices.concat(temp.myNews).concat(temp.viewsMyNews).concat(temp.viewsSystemNews)
                    console.log(temp);
                    //未读个人消息
                    var arrDom1=temp.viewsMyNews.map(function(item,i){
                        return (
                            <div className="am-list-content" key={item.id} onClick={that.goDetail.bind(that,item)}>
                                <div className="title">
                                    <p className="isRead">
                                        {item.title}
                                    <span style={{backgroundImage:"url('src/img/icon/redIcon.png')"}}></span>
                                    </p>
                                    <p>{item.addTime.month+1}-{item.addTime.date}</p>
                                </div>
                                <div className="title msg-content">
                                    <p>{item.content}</p>
                                    <p style={{backgroundImage:"url('src/img/icon/go1.png')"}}></p>
                                </div>
                            </div>
                        )
                    })
                    //未读系统消息
                    var arrDom2=temp.systemNotices.map(function(item,i){
                        return (
                            <div className="am-list-content" key={item.id} onClick={that.goDetail.bind(that,item)}>
                                <div className="title">
                                    <p className="isRead">
                                        {item.title}
                                    <span style={{backgroundImage:"url('src/img/icon/redIcon.png')"}}></span>
                                    </p>
                                    <p>{item.addTime.month+1}-{item.addTime.date}</p>
                                </div>
                                <div className="title msg-content">
                                    <p>{item.content}</p>
                                    <p style={{backgroundImage:"url('src/img/icon/go1.png')"}}></p>
                                </div>
                            </div>
                        )
                    })
                    //已读个人消息
                    var arrDom3=temp.myNews.map(function(item,i){
                        return (
                            <div className="am-list-content" key={item.id} onClick={that.goDetail.bind(that,item)}>
                                <div className="title">
                                    <p>
                                        {item.title}
                                    <span style={{backgroundImage:"url('src/img/icon/redIcon.png')"}} className='hide'></span>
                                    </p>
                                    <p>{item.addTime.month+1}-{item.addTime.date}</p>
                                </div>
                                <div className="title msg-content">
                                    <p>{item.content}</p>
                                    <p style={{backgroundImage:"url('src/img/icon/go1.png')"}}></p>
                                </div>
                            </div>
                        )
                    })
                    //已读系统消息
                    var arrDom4=temp.viewsSystemNews.map(function(item,i){
                        return (
                            <div className="am-list-content" key={item.id} onClick={that.goDetail.bind(that,item)}>
                                <div className="title">
                                    <p className={item.status?"":"isRead"}>
                                        {item.title}
                                    <span style={{backgroundImage:"url('src/img/icon/redIcon.png')"}} className='hide'></span>
                                    </p>
                                    <p>{item.addTime.month+1}-{item.addTime.date}</p>
                                </div>
                                <div className="title msg-content">
                                    <p>{item.content}</p>
                                    <p style={{backgroundImage:"url('src/img/icon/go1.png')"}}></p>
                                </div>
                            </div>
                        )
                    })
                    if(!(temp.viewsMyNews.length&&temp.systemNotices&&temp.myNews&&temp.viewsSystemNews)){
                        that.setState({
                            isShow:false
                        })
                    }
                    that.setState({
                        nwList:arrDom1.concat(arrDom2).concat(arrDom3).concat(arrDom4)
                    })
                }else{
                    Toast.info(res.msg,2);
                }
            })
        }else{
            that.setState({
                isShow:false
            })
        }
        
    },
    componentWillUnmount() {
        
    },
    goDetail(item){
        // console.log(item)
        localStorage.setItem("msg",JSON.stringify(item));
        var path = {
            pathname: '/msgDetail'
        }
        hashHistory.push(path);
    },
    render: function () {
        
        return (
            <div className="app_Box message">
                <Header title="消息"/>
                <div className="content">
                   {this.state.nwList}
                {/* <div className="am-list-content">
                    <div className="title">
                        <p className="isRead">
                            订单支付成功
                        <span style={{backgroundImage:"url('src/img/icon/redIcon.png')"}}></span>
                        </p>
                        <p>06-21</p>
                    </div>
                    <div className="title msg-content">
                        <p>消息打发打法撒旦法师大幅度发发生打发打发</p>
                        <p style={{backgroundImage:"url('src/img/icon/go1.png')"}}></p>
                    </div>
                </div> */}
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


