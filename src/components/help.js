'use strict';
// import React from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';
import '../css/help.css';
import { Toast } from 'antd-mobile';
var appBasePath = globalData.appBasePath;
var Help = React.createClass({
    getInitialState: function () {
        return {

        }
    },
    helpDetail: function () {
        var data = {};
        var path = {
            pathname: '/HelpDetail',
            state: data,
        }
        hashHistory.push(path);
    },
    toAsk: function () {
        var user = localStorage.getItem("user");
        if (user) {
            var data = { fromWho: "help" };
            var path = {
                pathname: '/Ask',
                query: data,
            }
            hashHistory.push(path);
        } else {
            var path = {
                pathname: '/Login',
            }
            hashHistory.push(path);
        }
    },
    toLook(){
       
        var path = {
            pathname: '/lookques',
            
        }
        hashHistory.push(path);
    },
    componentDidMount: function () {
        var key1 = globalData.key;
        var toast = globalData.toast;
        var that = this;
        api.questionList(function (res) {
                if(res.code == "0000"){
                    var data = JSON.parse(strDec(res.data, key1, "", ""));
                    console.log(data);
                    var questionArr = [];
                    for (var i in data) {
                        questionArr.push(
                            <li key={i}>
                                <div>
                                    <p style={{backgroundImage:"url('src/img/icon/help-icon2.png')"}}></p>
                                    <p>{data[i].question}</p>    
                                </div>
                                <div>
                                    <p style={{backgroundImage:"url('src/img/icon/help-icon1.png')"}}></p>
                                    <p>{data[i].solve}</p>   
                                </div>
                            </li>
                        )
                    }
                    that.setState({
                        questionArr: questionArr
                    })
                    // console.log(that.state.creditCardArr)
                }
               
        })
    },
    render: function () {
        var that = this;
        return (
            <div className="app_Box help">
                <Header title="帮助与反馈" />
                
                <div className="askCon content">                   
                    <ul className="helpList">
                        {that.state.questionArr}
                        {/* <li>
                            <div>
                               <p style={{backgroundImage:"url('src/img/icon/help-icon2.png')"}}></p>
                               <p>如何借款</p>    
                            </div>
                            <div>
                               <p style={{backgroundImage:"url('src/img/icon/help-icon1.png')"}}></p>
                               <p>点击借贷款->获取额度-->借出，绑定一张银行信用卡，输入借出金额，比如2000，点击确定即可 </p>   
                            </div>
                        </li>
                        <li>
                            <div>
                               <p style={{backgroundImage:"url('src/img/icon/help-icon2.png')"}}></p>
                               <p>如何审核</p>    
                            </div>
                            <div>
                               <p style={{backgroundImage:"url('src/img/icon/help-icon1.png')"}}></p>
                               <p>点击借贷款->获取额度-->借出，绑定一张银行信用卡，输入借出金额，比如2000，点击确定即可 </p>   
                            </div>
                        </li>
                        <li>
                            <div>
                               <p style={{backgroundImage:"url('src/img/icon/help-icon2.png')"}}></p>
                               <p>如何还款</p>    
                            </div>
                            <div>
                               <p style={{backgroundImage:"url('src/img/icon/help-icon1.png')"}}></p>
                               <p>点击借贷款->获取额度-->借出，绑定一张银行信用卡，输入借出金额，比如2000，点击确定即可 </p>   
                            </div>
                        </li> */}
                    </ul>
                </div>
                <div className="footer">
                    <div className="applyBtn" onClick={that.toAsk}>反馈问题</div>
                    <div className="applyBtn" onClick={that.toLook}>查看问题</div>
                </div>
            </div>
        )
    }

});


export default Help;


