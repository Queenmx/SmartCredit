'use strict';
// import React from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header1';
import Loading from './loading';
import { hashHistory } from 'react-router';
import {  Toast } from 'antd-mobile';
var key1 = globalData.key;
var appBasePath = globalData.appBasePath;
var SetPsd = React.createClass({

    getInitialState: function () {
        var eyeImg = [<img src="src/img/icon/by.png" key={"by"} />];
        var eyeImg1 = [<img src="src/img/icon/by.png" key={"by"} />];
        
        return {
            isLoading: false,
            eyeImg: eyeImg,
            inputType: "password",
            inputType1: "password",
            eyeImg1: eyeImg1,
            isshow:false
        }
    },
    componentWillMount(){
        console.log(this.props.location.state.fromWhy)
    },
    eyesHandle: function () {
        var type = $("#psd")[0].type;
        var eyeImg = [];
        if (type == "password") {
            eyeImg.push(<img src="src/img/icon/zy.png" key={"zy"} />);
            this.setState({
                inputType: "text",
                eyeImg: eyeImg
            })

        } else {
            eyeImg.push(<img src="src/img/icon/by.png" key={"by"} />);
            this.setState({
                inputType: "password",
                eyeImg: eyeImg
            })
        }
    },
    eyesHandle1: function () {
        var type = $("#psd")[0].type;
        var eyeImg = [];
        if (type == "password") {
            eyeImg.push(<img src="src/img/icon/zy.png" key={"zy"} />);
            this.setState({
                inputType1: "text",
                eyeImg1: eyeImg
            })

        } else {
            eyeImg.push(<img src="src/img/icon/by.png" key={"by"} />);
            this.setState({
                inputType1: "password",
                eyeImg1: eyeImg
            })
        }
    },
    vauleChange: function (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    },
    psdLogin: function () {
        var that = this;
        let psd = that.state.psd;
        let surePsd = that.state.surePsd;
        // var toast = new Toast();
        var reg = /^([a-z0-9\.\@\!\#\$\%\^\&\*\(\)]){6,20}$/i;
        if (reg.test(psd)&&reg.test(surePsd)) {
            this.setState({
                isshow:false
            })
        } else{
            this.setState({
                isshow:true
            });
            return false;
        }
        if (psd !== surePsd) {
            Toast.info("两次密码不一致");
        } else {
            var phoneNum = that.props.location.state.phoneNum;
            var verifyCode = that.props.location.state.verifyCode;
            var fromWhy = that.props.location.state.fromWhy;
            that.setState({ isLoading: true })
            //console.log(that.props.location.state);
            if (fromWhy == "register") {//调注册接口
                api.register(phoneNum, psd, verifyCode, function (res) {
                    // console.log(res);
                    if (res.code == "0000") {
                        var data = JSON.parse(strDec(res.data, key1, "", ""));
                        //console.log(data);
                        //自动登录
                        api.login("PWD", phoneNum, psd, "", function (res) {
                            //console.log(res);
                            if (res.code == "0000") {
                                that.setState({ isLoading: false })
                                var data = strDec(res.data, key1, "", "");
                                ////console.log(data);
                                //成功后
                                localStorage.setItem("user", data);
                                localStorage.setItem("isLogin", true);
                                localStorage.setItem("phoneNum", phoneNum);
                                var user = JSON.parse(data);
                                globalData.user = data;
                                globalData.userId = user.userId;
                                globalData.requestData.token = user.token;
                                Toast.info("登录成功", 2);
                                // var path = {
                                //     pathname: '/',
                                // }
                                var path = {
                                    pathname: '/Authname',
                                }
                                hashHistory.push(path);
                               
                            } else {
                                that.setState({ isLoading: false })
                                Toast.info(res.msg, 2);
                            }
                        }, function () {
                            that.setState({ isLoading: false })
                            Toast.info("连接错误", 2);
                        })
                    } else {
                        that.setState({ isLoading: false })
                        Toast.info(res.msg, 2);
                    }
                }, function () {
                    that.setState({ isLoading: false })
                    Toast.info("连接错误", 2);
                })
            } else {//忘记密码，设置密码登陆phone, pwd, verifyCode,
                api.forgot(phoneNum, psd, verifyCode, function (res) {
                    //console.log(res);
                    if (res.code == "0000") {
                        that.setState({ isLoading: false })
                        var data = strDec(res.data, key1, "", "");
                        //console.log(data);
                        Toast.info("登录密码重置完成，请妥善保管", 2);
                        localStorage.setItem("phoneNum", phoneNum);
                        var path = {
                            pathname: '/Login',
                        }
                        hashHistory.push(path);
                    } else {
                        that.setState({ isLoading: false })
                        Toast.info(res.msg, 2);
                    }
                }, function () {
                    that.setState({ isLoading: false })
                    Toast.info("连接错误", 2);
                })
            }
        }
    },
    render: function () {
        var that = this;
        var phoneNum = this.props.location.state.phoneNum;
        return (
            <div className="setPsd app_Box">
                <Header title={that.props.location.state.fromWhy=='register'?"设置密码":'重置登录密码'} />
                <Loading flag={that.state.isLoading} />
                <div className="setPsdCon">
                    <div className="inputPsd">
                        <label htmlFor="psd" style={{backgroundImage:"url('src/img/icon/login-icon5.png')"}}></label>
                        <input id="psd" type={that.state.inputType} name="psd" placeholder="请输入密码" onChange={that.vauleChange} />
                        <span className="eyes" id="eyes" onClick={that.eyesHandle}>
                            {that.state.eyeImg}
                        </span>
                    </div>
                    <div className="inputPsd">
                        <p className={this.state.isshow?"tips":'hide'}><span style={{backgroundImage:"url('src/img/icon/login-icon7.png')"}}></span>请使用6-20位字母、数字、特殊字符的组合</p>
                        <label htmlFor="surePsd" style={{backgroundImage:"url('src/img/icon/login-icon6.png')"}}></label>
                        <input id="surePsd" type={that.state.inputType1} name="surePsd" placeholder="请确认登录密码" onChange={that.vauleChange} />
                        <span className="eyes" id="eyes" onClick={that.eyesHandle1}>
                            {that.state.eyeImg1}
                        </span>
                    </div>
                    <div className="psdLogin" onClick={that.psdLogin}>下一步</div>
                </div>
            </div>
        )
    }

});


export default SetPsd;


