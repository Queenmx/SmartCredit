'use strict';
// import React from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header1';
import { hashHistory,Link } from 'react-router';
import { Toast } from 'antd-mobile';

// var toast=globalData.toast;
var key1 = globalData.key;
var ForgotPsd = React.createClass({
    getInitialState: function () {
        return {
            count: 60,
            liked: true,
            getMsg: {
                style: {
                    backgroundColor: "#e6e6e6",
                    color: "#2b2b2b"
                }
            },
        }
    },
    componentWillMount(){
        var phoneNum = localStorage.getItem("curPhone") || "";
        var sharePhone=this.getUrlParms("share");
        console.log("sharePhone"+sharePhone);
        localStorage.setItem("sharePhone",sharePhone);
       
        
        this.setState({ 
            phoneNum: phoneNum
        })
       
    },
    //获取地址栏参数，name:参数名称
    getUrlParms(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r =this.props.location.search.substr(1).match(reg);
        if(r!=null){
            return unescape(r[2]);
        }else{
            return null;
        }       
    },
    componentWillReceiveProps(nextProps){
        if(nextProps.location.query.state=="rgs"){
            location.reload();
        }
    },
	/*changeMsgTxt:function(e){
		this.setState({
			getMsg: {
				getMsgTxt: e.target.value
			}
		})
	},*/
    getMsg: function () {
        var that = this;

        //input在disable且readonly之后，onClick会在iOS上触发不起来，onTouchEnd又会在Android上把键盘弹出来，这边笔者做了个Hack，ios下用onTouchEnd，android下用onClick，就正常了。
        var phoneNum = that.state.phoneNum;
        if (!(/^1[345678]\d{9}$/.test(phoneNum))) {
            // console.log(phoneNum);
            Toast.info("请输入正确格式的手机号码", 2);
        } else {
            //console.log(phoneNum);
            if (that.state.liked) {
                that.timer = setInterval(function () {
                    var count = that.state.count;
                    that.setState({
                        liked: false,
                        getMsg: {
                            style: {
                                backgroundColor: "#aaaaaa",
                                color: "#ffffff"
                            },
                        }
                    })
                    count -= 1;
                    if (count < 1) {
                        that.setState({
                            liked: true,
                            getMsg: {
                                style: {
                                    backgroundColor: "#e6e6e6",
                                    color: "#2b2b2b"
                                },
                            }
                        });
                        count = 60;
                        clearInterval(that.timer);
                    }
                    that.setState({
                        count: count
                    });
                }.bind(that), 1000);
                //发送短信验证码
                api.verifyCode(phoneNum, "", function (res) {
                    //console.log(res);
                    if (res.code == "0000") {
                        Toast.info('发送成功', 2);
                        var data = JSON.parse(strDec(res.data, key1, "", ""));
                        //console.log(data);
                        var reg = data.reg;
                        var verifyCode = data.verify;
                        that.setState({
                            reg: reg,
                            verifyCode: verifyCode
                        })
                    } else {
                        Toast.info(res.msg, 2);
                    }
                }, function () {
                    Toast.info("连接错误", 2);
                })

            }
        }
    },


    vauleChange: function (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    },
    yzHandle: function () {
        var that = this;
        let phoneNum = that.state.phoneNum;
        let yzCode = that.state.yzCode;
        let verifyCode = that.state.verifyCode;
        var fromWhy;
        if (!(/^1[345678]\d{9}$/.test(phoneNum))) {
            ////console.log(phoneNum);
            Toast.info("请输入正确格式的手机号码", 2);
        } else {           
            if (phoneNum && yzCode) {
                if (yzCode == verifyCode) {
                    if(this.props.location.query.fromWhere=='forget'){//忘记密码页面
                        if (that.state.reg) {//注册了,忘记密码
                            fromWhy = "forgetPsd";
                            var data = { fromWhy: fromWhy, phoneNum: phoneNum, verifyCode: yzCode };                       
                            var path = {
                                pathname: '/SetPsd',
                                state: data
                            }                           
                            Toast.info("验证通过", 2);
                        } else {//号码还没注册过
                            fromWhy = "register";
                            Toast.info("手机号未注册", 2);
                            var path = {
                                pathname: '/ForgotPsd',
                                query:{fromWhere:'rgs',state:'rgs'}
                            }
                        }
                    }else{//注册页面
                        if (that.state.reg) {//注册了
                            fromWhy = "forgetPsd";
                            Toast.info("手机号已注册，请先登录", 2);
                            var path = {
                                pathname: '/Login/Mine',
                            }                                                       
                        } else {//号码还没注册过
                            fromWhy = "register";
                            var data = { fromWhy: fromWhy, phoneNum: phoneNum, verifyCode: yzCode };                       
                            var path = {
                                pathname: '/SetPsd',
                                state: data
                            }
                            Toast.info("验证通过", 2);
                        }                        
                    }
                    localStorage.setItem("phoneNum",phoneNum)
                    setTimeout(function(){
                        hashHistory.push(path);
                    },2000) 
                    console.log(fromWhy);
                    
                } else {
                    Toast.info("验证码不正确", 2);
                }

            } else {
                Toast.info("输入不能为空", 2);
            }
        }
    },
    render: function () {
        var that = this;
        let getMsgStyle = that.state.getMsg.style;
        let display = that.state.display;
        let getMsgTxt = that.state.getMsg.getMsgTxt;
        let disabled = that.state.getMsg.disabled;
        var text = this.state.liked ? '获取验证码' : this.state.count + '秒后重发';
        return (
            <div className="forgotPsd app_Box">
                <Header title={this.props.location.query.fromWhere=='forget'?"忘记密码":'注册' }/>
                <div className="forgotPsdCon">
                    <div className="inputPsd">
                        <label htmlFor="phoneNum" style={{backgroundImage:"url('src/img/icon/login-icon2.png')"}}></label>
                        <input id="phoneNum" type="number" name="phoneNum" placeholder="请输入手机号码" onChange={that.vauleChange} value={that.state.phoneNum}/>
                    </div>

                    <div className="inputPsd">
                        <label htmlFor="yzCode" style={{backgroundImage:"url('src/img/icon/login-icon4.png')"}}></label>
                        <input id="yzCode" className="shortInput" type="text" name="yzCode" placeholder="请输入验证码" onChange={that.vauleChange} />
                        {/*<input type="text" onClick={that.getMsg} placeholder="获取验证码" readOnly="readOnly" disabled={disabled} style={getMsgStyle} className="getMsg" id="getMsg"  value={getMsgTxt} onChange={that.changeMsgTxt}/>*/}
                        <span onClick={that.getMsg} style={getMsgStyle} className="getMsg">{text}</span>
                    </div>
                    <div className="psdLogin" onClick={that.yzHandle}>下一步</div>
                    <div className={this.props.location.query.fromWhere=='forget'?'hide':"agree"}>
                        <p>
                            {/* <input type="radio" value="" name="info" defaultChecked/> */}
                            <span className="checkicon" style={{backgroundImage:"url('src/img/icon/bao-icon6.png')"}}></span>同意
                            <Link to={
                        {
                            pathname: "/txt",
                            //hash:'#ahash',    
                            state: { title: '用户注册协议', fromId: 2 }
                            //state:{data:'hello'}     
                        }
                    } >《用户注册协议》	</Link>
                    <Link to={
                        {
                            pathname: "/txt",
                            //hash:'#ahash',    
                            state: { title: '数据解析服务协议', fromId: 3 }
                            //state:{data:'hello'}     
                        }
                    } >《数据解析服务协议》</Link>
                    <Link to={
                        {
                            pathname: "/txt",
                            //hash:'#ahash',    
                            state: { title: '个人信息使用授权书', fromId:4 }
                            //state:{data:'hello'}     
                        }
                    } >《个人信息使用授权书》</Link>
                        </p>
                        {/* <p>
                            <input type="radio" value="" name="info1" defaultChecked/>本人同意领取免费意外保障协议
                        </p> */}
                        
                    </div>
                </div>
            </div>
        )
    },
    componentWillUnmount() {
        clearInterval(this.timer);
    }

});


export default ForgotPsd;


