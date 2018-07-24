'use strict';
// import React from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import { hashHistory, Link } from 'react-router';
import Footer from './footer';
import Set from './set';
import Login from './login';
import '../css/mine.css';
import { Toast,List } from 'antd-mobile';
var appBasePath = globalData.appBasePath;
const Item = List.Item;
var Mine = React.createClass({
    getInitialState: function () {
        return {
            activeTab: 1,
            isShow: false,
            activeIndex: 2
            //dataStatus: 0
        }
    },

    componentDidMount: function () {
        //console.log(this.props.location.query.price);
    },
    componentWillMount: function () {
        var that = this;
        var user = localStorage.getItem("user");
        //console.log(user);
        if (user) {//已登陆
            var userObj = JSON.parse(user);
            console.log(userObj)
            that.setState({
                user: userObj,
                certStatus: userObj.certStatus,
                isLogin: true
            })

        } else {
            that.setState({
                user: {
                    certLevel: "",
                    headPic: "",
                    idCard: "",
                    located: "",
                    phone: "",
                    realName: "",
                    token: "",
                    userId: "",
                    userName: "未登录",
                },
                isLogin: false
            })
        }

    },
    goLogin: function () {
        if (this.state.isLogin) {
            var path = {
                pathname: '/UserInfo',
                //query:data,
            }
            hashHistory.push(path);
        } else {
            var path = {
                pathname: '/Login/Mine',
                //query:data,
            }
            hashHistory.push(path);
        }
    },
    toSave: function () {
        if (this.state.isLogin) {
            var path = {
                pathname: '/Save',
                //query:data,
            }
            hashHistory.push(path);
        } else {
            var path = {
                pathname: '/Login/Mine',
                //query:data,
            }
            hashHistory.push(path);
        }
    },
    goCredit(){
        if (this.state.isLogin) {
            Toast.info("去往第3方了哦");
        } else {
            var path = {
                pathname: '/Login',
            }      
            hashHistory.push(path);     
        }
        
        
    },
    goTask(){
        if (this.state.isLogin) {
            var path = {
                pathname: '/taskMy',
            }
        } else {
            var path = {
                pathname: '/Login',
            }           
        }
        hashHistory.push(path);
    },
    goWallet(){
        if (this.state.isLogin) {
            var path = {
                pathname: '/myWallet',
                //query:data,
            }
        } else {
            var path = {
                pathname: '/Login',
                //query:data,
            }           
        }
        hashHistory.push(path);
    },
    goSet(){
        if (this.state.isLogin) {
            var path = {
                pathname: '/Set',
                //query:data,
            }
        } else {
            var path = {
                pathname: '/Login',
                //query:data,
            }           
        }
        hashHistory.push(path);
    },
    toHelp: function () {
        var path = {
            pathname: '/Help',
        }
        hashHistory.push(path);
    },
    toShare(){
        var path = {
            pathname: '/Sharemoney',
        }
        hashHistory.push(path);
    },
    toIdCard: function () {
        // var toast = globalData.toast;
        //Toast.info("身份证认证功能尚未开放",2);
        if (this.state.isLogin) {
            //console.log(this.state.certStatus);
            if (this.state.certStatus == 1) {
                Toast.info("认证已通过，无需重复上传", 2);
                var path = {
                    pathname: '/idCard',
                    //query:data,
                }
                hashHistory.push(path);

            } else if (this.state.certStatus == 0) {
                Toast.info("正在审核中，无需重复上传", 2);
                var path = {
                    pathname: '/idCard',
                    //query:data,
                }
                hashHistory.push(path);
            } else {
                var path = {
                    pathname: '/idCard',
                    //query:data,
                }
                hashHistory.push(path);
            }

        } else {
            var path = {
                pathname: '/Login/Mine',
                //query:data,
            }
            hashHistory.push(path);
        }
    },
    toPersonalLevel: function () {
        var key1 = globalData.key;
        // var toast = globalData.toast;
        var user = globalData.user;
        //console.log(user);
        if (this.state.isLogin) {
            var path = {
                pathname: '/PersonalLevel',
            }
            hashHistory.push(path);
        } else {
            var path = {
                pathname: '/Login/Mine',
                //query:data,
            }
            hashHistory.push(path);
        }
    },
    imgError: function (e) {
        e.target.src = "src/img/icon/header.png";
        e.target.onerror = null; //控制不要一直跳动 
    },
    render: function () {
        var that = this;
        var imgPath = globalData.imgPath;
        var userObj = that.state.user;
        return (
            <div className="app_Box mine">                
                <div className="mineContent content">                    
                    <div className="userHeader" onClick={that.goLogin}>
                        <p>个人中心</p>
                        {/* <div className="userImg"><img src={imgPath + userObj.headPic} onError={that.imgError} /></div> */}
                        <div className="userInfo"><p>ID:{userObj.userName}</p><span>{userObj.idCert != 2 ? "已认证" : "未认证"}</span></div>
                        <div className="goLogin"><img src="src/img/icon/go.png" /></div>
                    </div>
                    {/* <div className="creditLevel"><p>我的信用等级:<b>{userObj.certLevel}</b></p><span>去提升,5000轻松拿<img src="src/img/icon/right.png" /></span></div> */}
                    <div className="userOrder">
                        <ul>
                            <li onClick={that.goCredit}><img src="src/img/icon/my-icon5.png" /><p>信用卡待还</p></li>
                            <li onClick={that.goTask}><img src="src/img/icon/my-icon6.png" /><p>我的任务</p></li>
                            <li onClick={that.goWallet}><img src="src/img/icon/my-icon7.png" /><p>我的钱包</p></li>
                        </ul>
                        {/* <ul>
                            <li onClick={that.toOrder} data-title="待完成订单" data-statusType="ING"><img src="src/img/icon/order.png" /><p>待完成订单</p></li>
                            <li onClick={that.toOrder} data-title="待还款订单" data-statusType="REPAY"><img src="src/img/icon/dd2.png" /><p>待还款订单</p></li>
                            <li onClick={that.toOrder} data-title="全部订单" data-statusType=""><img src="src/img/icon/dd3.png" /><p>全部订单</p></li>
                        </ul>
                        <ul>
                            <li onClick={that.toPersonalLevel}><img src="src/img/icon/personLevel.png" /><p>个人资质</p></li>
                            <li onClick={that.toIdCard}><img src="src/img/icon/id.png" /><p>身份证认证</p></li>
                            <li onClick={that.toSave}><img src="src/img/icon/sc.png" /><p>我的收藏</p></li>
                            <li onClick={that.toHelp}><img src="src/img/icon/bz.png" /><p>帮助与反馈</p></li>
                        </ul>
                        <div className="toSet"><Link to="/Set">设置</Link></div>*/}
                        <List>
                            <Item
                            thumb="src/img/icon/my-icon1.png"
                            arrow="horizontal"
                            onClick={that.toShare}
                            >分享赚钱</Item>
                        </List>
                        <List>
                            <Item
                            thumb="src/img/icon/my-icon2.png"
                            arrow="horizontal"
                            onClick={that.toHelp}
                            >帮助与反馈</Item>
                        </List>
                        <List>
                            <Item
                            thumb="src/img/icon/my-icon3.png"
                            arrow="horizontal"
                            onClick={() => {window.location.href="https://tb.53kf.com/code/client/10179904/1"}}
                            >在线客服</Item>
                        </List>
                        <List>
                            <Item
                            thumb="src/img/icon/my-icon4.png"
                            arrow="horizontal"
                            onClick={this.goSet}
                            >设置</Item>
                        </List>
                    </div>
                </div>
                <Footer activeIndex="4" />
            </div>
        )
    },
    componentDidUpdate: function () {

    }
});


export default Mine;


