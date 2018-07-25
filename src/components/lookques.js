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
            var data = { fromWho: "ask" };
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
    componentDidMount: function () {
        var key1 = globalData.key;
        var toast = globalData.toast;
        var that = this;
        var userName = JSON.parse(localStorage.getItem("user")).phone
        api.myQuestion(userName,function (res) {
                if(res.code == "0000"){
                    var data = JSON.parse(strDec(res.data, key1, "", ""));
                    console.log(data);
                    var questionArr = [];
                    for (var i in data) {
                        questionArr.push(
                            <ul className="helpList" key={i}>                    
                                <li>
                                    <div>
                                    <p style={{backgroundImage:"url('src/img/icon/help-icon3.png')"}}></p>
                                    <p>提问时间：{data[i].addTime}</p>    
                                    </div>
                                    <div>
                                    <p></p>
                                    <p>{data[i].content}</p>   
                                    </div>
                                </li>
                                <li className={"answer"+" "+(data[i].answerTime!=""?"":"hide")}>
                                    <div>
                                    <p style={{backgroundImage:"url('src/img/icon/help-icon4.png')"}}></p>
                                    <p>回答时间：{data[i].answerTime}</p>    
                                    </div>
                                    <div>
                                    <p></p>
                                    <p>{data[i].answer}</p>   
                                    </div>
                                </li>
                            </ul>
                        //   <li key={i}>
                        //     <div>
                        //        <p style={{backgroundImage:"url('src/img/icon/help-icon3.png')"}}></p>
                        //        提问时间：
                        //        <p>{data[i].addTime}</p>    
                        //     </div>
                        //     <div>
                        //        <p></p>
                        //        <p>{data[i].content}</p>   
                        //     </div>
                        //     <div>
                        //        <p style={{backgroundImage:"url('src/img/icon/help-icon4.png')"}}></p>
                        //        回答时间：
                        //        <p>{data[i].addTime}</p>   
                        //     </div>
                        //     <div>
                        //        <p></p>
                        //        <p>{data[i].answer}</p>   
                        //     </div>
                        // </li>
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
            <div className="app_Box lookques">
                <Header title="查看问题" />               
                <div className="askCon content">    
                {that.state.questionArr}               
                    {/* <ul className="helpList">                    
                        <li>
                            <div>
                               <p style={{backgroundImage:"url('src/img/icon/help-icon3.png')"}}></p>
                               <p>提问时间：2018-02-02</p>    
                            </div>
                            <div>
                               <p></p>
                               <p>如何借款?</p>   
                            </div>
                        </li>
                        <li className="answer">
                            <div>
                               <p style={{backgroundImage:"url('src/img/icon/help-icon4.png')"}}></p>
                               <p>回答时间：2018-02-02</p>    
                            </div>
                            <div>
                               <p></p>
                               <p>点击借贷款->获取额度-->借出，绑定一张银行信用卡，输入借出金额，比如2000，点击确定即可?</p>   
                            </div>
                        </li>
                    </ul> */}
                </div>
                <div className="footer">
                    <div className="applyBtn" onClick={that.toAsk}>继续提问</div>
                </div>
            </div>
        )
    }

});


export default Help;


