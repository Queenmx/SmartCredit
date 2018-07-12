'use strict';
// import React from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Footer from './footer';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import '../css/home.css';
import { Toast } from 'antd-mobile';

// var toast=globalData.toast;
var key1 = globalData.key;
var Ask = React.createClass({
    getInitialState: function () {
        return {
           
            
            flag: false
        }
    },

    componentWillMount: function () {
        var user = localStorage.getItem("user");
        if (user) {
            this.setState({                
                isLogin: true,
            })
        } else {
            this.setState({               
                isLogin: false,
            })
        }
    },
    goDetail(){
        var path = {
            pathname: '/Getbaoxian',
        }
        hashHistory.push(path);
        
    },
   
    render: function () {
        var that = this;
        //console.log("cityId",cityId);

        return (
            <div className="app_Box creditcard insurance">
                <Header title="保险" />
                <Loading flag={that.state.flag} />
                <div className="content">
                    <div className="loan">
                        <ul>
                            <li onClick={this.goDetail}>
                                <img src="src/img/icon/bao-icon1.png" />
                                <div className="loanTitle">
                                    <p>假日出行意外险</p>
                                    <p>保险范围：自驾/水路/飞机</p>
                                    <p><span>保险时长：<i>365</i>天</span><span>最高保障<i>98</i>万元</span></p>
                                    <p>适用年龄：<i>22-55</i>周岁</p>                                    
                                </div>
                            </li>
                            <li>
                                <img src="src/img/icon/bao-icon2.png" />
                                <div className="loanTitle">
                                    <p>假日出行意外险</p>
                                    <p>保险范围：自驾/水路/飞机</p>
                                    <p><span>保险时长：<i>365</i>天</span><span>最高保障<i>98</i>万元</span></p>
                                    <p>适用年龄：<i>22-55</i>周岁</p>                                    
                                </div>
                            </li>
                            <li>
                                <img src="src/img/icon/bao-icon3.png" />
                                <div className="loanTitle">
                                    <p>假日出行意外险</p>
                                    <p>保险范围：自驾/水路/飞机</p>
                                    <p><span>保险时长：<i>365</i>天</span><span>最高保障<i>98</i>万元</span></p>
                                    <p>适用年龄：<i>22-55</i>周岁</p>                                    
                                </div>
                            </li>
                            <li>
                                <img src="src/img/icon/bao-icon4.png" />
                                <div className="loanTitle">
                                    <p>假日出行意外险</p>
                                    <p>保险范围：自驾/水路/飞机</p>
                                    <p><span>保险时长：<i>365</i>天</span><span>最高保障<i>98</i>万元</span></p>
                                    <p>适用年龄：<i>22-55</i>周岁</p>                                    
                                </div>
                            </li>
                        </ul> 
                    </div>                 
                </div>
                
            </div>
        )
    }
});


export default Ask;


