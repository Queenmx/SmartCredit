'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import '../css/login.css';

var toast = globalData.toast;
var key1 = globalData.key;
var Login = React.createClass({
    getInitialState: function () {
        var eyeImg = [<img src="src/img/icon/by.png" key={"by"} />];
        //eyeImg.push('<img src="src/img/icon/by.png" />');
        return {
            wayNum: 1,
            eyeImg: eyeImg,
            phoneNum:"",
            inputType: "password",
            count: 60,
            liked: true,
            flag: false,
            getMsg: {
                style: {
                    backgroundColor: "#ffa81e",
                    color: "#ffffff"
                }
            },
            display: {
                display: "none"
            }
        }
    },
    componentWillMount: function () {
        //localStorage.removeItem("user");
        //localStorage.removeItem("isLogin");
        var phoneNum = localStorage.getItem("phoneNum")||"";
        this.setState({ phoneNum: phoneNum })
    },
    checkWay: function (e) {
        var id = e.target.id * 1;
        this.setState({
            wayNum: id
            //loadingstate:2
        });
        switch (id) {
            case 1:
                $("#psdBox").show();
                $("#yzBox").hide();
                break;
            case 2:
                $("#psdBox").hide();
                $("#yzBox").show();
                break;
            default:
                break;
        }

    },
    submitHandler: function () {

        var that = this;
        var wayNum = this.state.wayNum;
        var phoneNum = that.state.phoneNum;

        if (!(/^1[34578]\d{9}$/.test(phoneNum))) {
            /*			this.setState({
                            selecthint:1,
                            hint:"请输入正确格式的手机号码"
                        })
                        setTimeout(() => {
                            this.setState({
                                selecthint:0				
                            })
                        }, 2000);*/
            toast.show("请输入正确格式的手机号码", 2000);
        } else {
            switch (wayNum) {
                case 1:

                    var psd = that.state.password;
                    if (psd == "" || psd == null) {
                        toast.show("请输入密码", 2000);
                    } else {
                        that.setState({
                            flag: true
                        })
                        api.login("PWD", phoneNum, psd, "", function (res) {
                            //console.log(res);
                            that.setState({
                                flag: false
                            })
                            if (res.code == "0000") {
                                //var data =JSON.stringify(res.data);
                                var data = strDec(res.data, key1, "", "");
                                //console.log(data);
                                //成功后
                                localStorage.setItem("user", data);
                                localStorage.setItem("isLogin", true);
                                localStorage.setItem("phoneNum", phoneNum);
                                var user = JSON.parse(data);
                                globalData.user = data;
                                globalData.userId = user.userId;
                                globalData.requestData.token = user.token;
                                toast.show("登录成功", 2000);
                                //location.reload();
                                //window.history.back();
                                const backRouter = that.props.params.backRouter;
								//console.log(backRouter);
						        if (backRouter) {
						            hashHistory.push(backRouter);
						        } else {
						            window.history.back()
						        }
								
                            } else {
                                toast.show(res.msg, 2000);
                            }

                        }, function () {
                            that.setState({
                                flag: false
                            })
                            toast.show("连接错误", 2000);
                        })


                    }
                    break;
                case 2:
                    var yzCode = that.state.yzCode;//输入验证码
                    var verifyCode = that.state.verifyCode;//后台验证码
                    if (yzCode == "" || yzCode == null) {
                        toast.show("请输入验证码", 2000);
                    } else if (yzCode == verifyCode) {
                        //验证码登录
                        that.setState({
                            flag: true
                        })
                        var reg = that.state.reg;
                        //console.log(reg + "mmmmm" + that.state.yzCode)
                        if (reg) {
                            //已注册，调登录接口
                            api.login("CODE", phoneNum, "", yzCode, function (res) {
                                //console.log(res);
                                if (res.code == "0000") {
                                	that.setState({
		                                flag: false
		                            })
                                    var data = strDec(res.data, key1, "", "");
                                    //console.log(data);
                                    //成功后
                                    localStorage.setItem("user", data);
                                    localStorage.setItem("isLogin", true);
                                    localStorage.setItem("phoneNum", phoneNum);
                                    var user = JSON.parse(data);
                                    globalData.user = data;
                                    globalData.userId = user.userId;
                                    globalData.requestData.token = user.token;
                                    toast.show("登录成功", 2000);
                                   // window.history.back();
                                    const backRouter = that.props.params.backRouter;
									//console.log(backRouter);
							        if (backRouter) {
							            hashHistory.push(backRouter);
							        } else {
							            window.history.back()
							        }
                                } else {
                                	that.setState({
		                                flag: false
		                            })
                                    toast.show(res.msg, 2000);
                                }
                            }, function () {
                            	that.setState({
		                                flag: false
		                            })
                                toast.show("连接错误", 2000);
                            })

                        } else {
                        	that.setState({
	                                flag: false
	                            })
                            //注册,去设置密码
                            var data = { fromWhy: "register", phoneNum: phoneNum, verifyCode: yzCode };
                            localStorage.setItem("phoneNum", phoneNum);
                            var path = {
                                pathname: '/setPsd',
                                state: data
                            }
                            hashHistory.push(path);
                        }

                    } else {
                        toast.show("验证码不正确", 2000);
                    }
                    break;
                default:
                    break;
            }

        }
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

    changeMsgTxt: function (e) {
        this.setState({
            getMsg: {
                getMsgTxt: e.target.value
            }
        })
    },

    changeInputTxt: function (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    },
    getMsg: function () {
        var that = this;

        //input在disable且readonly之后，onClick会在iOS上触发不起来，onTouchEnd又会在Android上把键盘弹出来，这边笔者做了个Hack，ios下用onTouchEnd，android下用onClick，就正常了。
        var phoneNum = that.state.phoneNum;

        if (!(/^1[34578]\d{9}$/.test(phoneNum))) {
            //console.log(phoneNum);
            toast.show("请输入正确格式的手机号码", 2000);
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
                                    backgroundColor: "#ffa81e",
                                    color: "#ffffff"
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
                api.verifyCode(phoneNum, "REG", function (res) {
                    //console.log(res);
                    if (res.code == "0000") {
                        var data = JSON.parse(strDec(res.data, key1, "", ""));
                        //console.log(data);
                        var reg = data.reg;
                        var verifyCode = data.verify;
                        that.setState({
                            reg: reg,
                            verifyCode: verifyCode
                        })
                    } else {
                        toast.show(res.msg, 2000);
                    }
                }, function () {
                    toast.show("连接错误", 2000);
                })

            }
        }
    },
    componentWillUnmount() {
        clearInterval(this.timer);
    },
    render: function () {
        var that = this;
        let backRouter = that.props.params.backRouter;
        let getMsgStyle = that.state.getMsg.style;
        let display = that.state.display;
        let getMsgTxt = that.state.getMsg.getMsgTxt;
        let disabled = that.state.getMsg.disabled;
        let changeMsgTxt = that.state.changeMsgTxt;
        var text = this.state.liked ? '获取验证码' : this.state.count + '秒后重发';
        return (
            <div className="login">
                <Header title="登录" backRouter={backRouter} />
                <div className="loginCon">
                    <div className="loginWay">
                        <span className={that.state.wayNum == 1 ? "wayActive" : ''} onClick={that.checkWay} id="1">密码登录</span>
                        <span className={that.state.wayNum == 2 ? "wayActive" : ''} onClick={that.checkWay} id="2">验证码登录</span>
                    </div>
                    <div className="infoBox">

                        <form>
                            <div className="inputLine">
                                <label htmlFor="phoneNum">手机号</label>
                                <input id="phoneNum" type="number" onChange={that.changeInputTxt} value={that.state.phoneNum} className="flex1" name="phoneNum" placeholder="请输入手机号" />
                            </div>
                            <div className="inputLine" id="psdBox">
                                <label htmlFor="psd">密码</label>
                                <span className="flex1 psdInput"><input id="psd" type={that.state.inputType} onChange={that.changeInputTxt} name="password" placeholder="请输入密码" /></span>
                                <span className="eyes" id="eyes" onClick={that.eyesHandle}>
                                    {that.state.eyeImg}
                                </span>
                            </div>
                            <div className="inputLine" id="yzBox" style={display}>
                                <label htmlFor="yzCode">验证码</label>
                                <input className="flex1" id="yzCode" type="text" name="yzCode" placeholder="请输入验证码" onChange={that.changeInputTxt} />
                                <span onClick={that.getMsg} style={getMsgStyle} className="getMsg">{text}</span>
                                {/*<input type="text" onClick={that.getMsg} placeholder="获取验证码" readOnly="readOnly" disabled={disabled} style={getMsgStyle} className="getMsg" id="getMsg"  value={getMsgTxt} onChange={that.changeMsgTxt}/>*/}
                            </div>
                            <a className="loginBtn" onClick={that.submitHandler}>登录</a>
                        </form>

                        <p className="forgotPsd">
                            <Link to="/ForgotPsd" >
                                忘记密码
							</Link>
                        </p>

                    </div>
                </div>
                <Loading flag={that.state.flag} />
                <p className="note footer">
                    <span>登录即表示您同意</span>
                    <Link to={
                        {
                            pathname: "/txt",
                            //hash:'#ahash',    
                            state: { title: '万融汇协议', fromId: 3 }
                            //state:{data:'hello'}     
                        }
                    } >
                        万融汇协议
							</Link>
                </p>
            </div>
        )
    }

});

export default Login;


