'use strict';
// import React from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import '../css/problem.css';
import { Toast } from 'antd-mobile';

// var toast=globalData.toast;
var key1 = globalData.key;
var Ask = React.createClass({
    getInitialState: function () {
        return {
            content: '',
            title: "",
             flag: false
        }
    },

    componentWillMount: function () {
        var fromWho = this.props.location.query.fromWho;

        if (fromWho == "help") {//反馈建议
            this.setState({
                title: "反馈问题",
                head: "感谢您宝贵的建议，我们将为您提供更优质的服务",
                placeholder: "反馈",
                fromWho: "help"
            })
        } else {
            var loanName = this.props.location.query.loanName;
            this.setState({
                title: "我要提问",
                // head: "向" + loanName + "提问",
                head: "感谢您宝贵的建议，我们将为您提供更优质的服务",                
                placeholder: "问题",
                fromWho: "problem"
            })
        }
    },


    submitAsk: function () {
        var content = this.state.content;
        var userName =JSON.parse(localStorage.getItem("user")).phone
        //var content=$("textarea").val().trim();
        var that=this;
        if (content.length > 0) {
        	that.setState({
                    flag: true
                })
            if (this.state.fromWho == "help") {//反馈建议
                api.feedBackAdd(content,userName, function (res) {
                    //console.log('feedBackAdd',res);
                    if (res.code == "0000") {
                    	that.setState({
		                    flag: false
                        });
                        // var data = JSON.parse(strDec(res.data, key1, "", ""));
                        // console.log(data)
                        Toast.info("提交成功", 2);
                       window.history.back();
                    //    history.go(-1);
                    } else {
                    	that.setState({
		                    flag: false
		                })
                        Toast.info(res.msg, 2);
                    }
                }, function () {
                	that.setState({
		                    flag: false
		                })
                    Toast.info("连接错误", 2);
                })
            } else {//提问问题
                api.feedBackAdd(content,userName, function (res) {
                    //console.log('feedBackAdd',res);
                    if (res.code == "0000") {
                    	that.setState({
		                    flag: false
                        });
                        // var data = JSON.parse(strDec(res.data, key1, "", ""));
                        // console.log(data)
                        Toast.info("提交成功", 2);
                       window.history.back();
                    //    history.go(-1);
                    } else {
                    	that.setState({
		                    flag: false
		                })
                        Toast.info(res.msg, 2);
                    }
                }, function () {
                	that.setState({
		                    flag: false
		                })
                    Toast.info("连接错误", 2);
                })
                // var objId = this.props.location.query.objId;
                // var objType = this.props.location.query.objType;
                // api.questionAdd(content, objId, objType, function (res) {
                //    // console.log('questionAdd',res);
                //     if (res.code == "0000") {
                //     	that.setState({
		        //             flag: false
		        //         })
                //         Toast.info("提交成功", 2);
                //         //window.history.back();
                //         history.go(-1);
                //     } else {
                //     	that.setState({
		        //             flag: false
		        //         })
                //         Toast.info(res.msg, 2);
                //     }
                // }, function () {
                // 	that.setState({
		        //             flag: false
		        //         })
                //     Toast.info("连接错误", 2);
                // })
            }



        } else {
        	
            Toast.info("请输入内容", 2);
        }

    },
    upText: function (event) {
        var upTextCon = event.target.value;
        if (upTextCon.length > 200) {
            Toast.info("请将字数控制在200字以内", 2);
        } else {
            this.setState({
                content: upTextCon
            })
        }


    },

   
    render: function () {
        var that = this;
        //console.log("cityId",cityId);

        return (
            <div className="app_Box ask">
                <Header title={that.state.title} />
                <Loading flag={that.state.flag} />
                <div className="askCon content">                   
                    <textarea type="text" cols="50" rows="10" placeholder="描述(200个字以内)" onChange={that.upText}></textarea>
                    <p>{that.state.head}</p>
                </div>
                <div className="footer">
                    <div className="applyBtn" onClick={that.submitAsk}>提交</div>
                </div>
            </div>
        )
    }
});


export default Ask;


