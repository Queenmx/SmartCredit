'use strict';
// import React from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import { hashHistory } from 'react-router';
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
                    backgroundColor: "#ffa81e",
                    color: "#ffffff"
                }
            }
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

        if (!(/^1[34578]\d{9}$/.test(phoneNum))) {
            //console.log(phoneNum);
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
                api.verifyCode(phoneNum, "FPWD", function (res) {
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
        if (!(/^1[34578]\d{9}$/.test(phoneNum))) {
            ////console.log(phoneNum);
            Toast.info("请输入正确格式的手机号码", 2);
        } else {
            if (that.state.reg) {//注册了,忘记密码
                fromWhy = "forgetPsd";
            } else {//号码还没注册过
                fromWhy = "register";
            }
            //console.log(fromWhy);
            if (phoneNum && yzCode) {
                if (yzCode == verifyCode) {
                    var data = { fromWhy: fromWhy, phoneNum: phoneNum, verifyCode: yzCode };
                    let path = {
                        pathname: '/SetPsd',
                        state: data
                    }
                    hashHistory.push(path);
                    Toast.info("验证通过", 2);
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
        //let changeMsgTxt=that.state.changeMsgTxt;
        var text = this.state.liked ? '获取验证码' : this.state.count + '秒后重发';
        //var phoneNum=this.props.location.state.phoneNum;
        return (
            <div className="forgotPsd app_Box">
                <Header title="忘记密码" />
                <div className="forgotPsdCon">
                    <div className="inputPsd">
                        <label htmlFor="phoneNum">手机号</label>
                        <input id="phoneNum" type="number" name="phoneNum" placeholder="请输入手机号" onChange={that.vauleChange} />
                    </div>

                    <div className="inputPsd">
                        <label htmlFor="yzCode">验证码</label>
                        <input id="yzCode" className="shortInput" type="text" name="yzCode" placeholder="请输入验证码" onChange={that.vauleChange} />
                        {/*<input type="text" onClick={that.getMsg} placeholder="获取验证码" readOnly="readOnly" disabled={disabled} style={getMsgStyle} className="getMsg" id="getMsg"  value={getMsgTxt} onChange={that.changeMsgTxt}/>*/}
                        <span onClick={that.getMsg} style={getMsgStyle} className="getMsg">{text}</span>
                    </div>
                    <div className="psdLogin" onClick={that.yzHandle}>验证</div>
                </div>
            </div>
        )
    },
    componentWillUnmount() {
        clearInterval(this.timer);
    }

});


export default ForgotPsd;


