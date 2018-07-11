'use strict';
// import React from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory } from 'react-router';
import { Toast,Tabs} from 'antd-mobile';

const tabs = [
    { title:'密码验证' },
    { title:'短信验证'},
];
var key1 = globalData.key;  
var appBasePath = globalData.appBasePath;
var Repsd = React.createClass({
    getInitialState: function () {
        return {
            isLoading: false,

            phoneNum: "",
            liked: true,
            count: 60,
            getMsg: {
                style: {
                    backgroundColor: "#ffa81e",
                    color: "#ffffff"
                }
            },
        }
    },
    vauleChange: function (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    },
    savePsd: function () {

        var that = this;
        let oldPsd = that.state.oldPsd;
        let newPsd = that.state.newPsd;
        let surePsd = that.state.surePsd;
        var userId = localStorage.getItem("userId");
        // var toast = new Toast();
        if (oldPsd && newPsd && surePsd) {
            if (newPsd !== surePsd) {
                Toast.info("两次密码不一致", 2);
            } else if (newPsd == oldPsd) {
                Toast.info("新密码不能与近期用过密码相同", 2);
            } else {
                that.setState({ isLoading: true })
                api.updatePsd(newPsd, oldPsd, function (res) {
                    //console.log(res);
                    if (res.code == "0000") {
                        that.setState({ isLoading: false })
                        Toast.info("修改成功,请重新登录", 2);
                        localStorage.removeItem("user");
                        localStorage.removeItem("isLogin");
                        globalData.user = "";
                        globalData.requestData.token = "";
                        var path = {
                            pathname: '/Login/Mine',
                        }
                        hashHistory.push(path);
                    } else if (res.code == "5555") {
                        that.setState({ isLoading: false })
                        Toast.info("登录过时，请重新登录", 2);
                        var path = {
                            pathname: '/Login',
                        }
                        hashHistory.push(path);
                    } else {
                        that.setState({ isLoading: false })
                        Toast.info(res.msg, 2);
                    }
                    // window.history.back();

                }, function () {
                    that.setState({ isLoading: false })
                    Toast.info("连接错误", 2);
                })

            }
        } else {
            Toast.info("输入不能为空", 2);
        }


    },
    changeInputTxt: function (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    },
    getMsg: function () {//获取验证码
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
                        Toast.info(res.msg, 2);
                    }
                }, function () {
                    Toast.info("连接错误", 2);
                })

            }
        }
    },
    render: function () {
        var that = this;
        let getMsgStyle = that.state.getMsg.style;
        var text = this.state.liked ? '获取验证码' : this.state.count + '秒后重发';
        return (
            // <div className="setPsd app_Box">
            //     <Header title="修改密码" />
            //     <Loading flag={that.state.isLoading} />
            //     <div className="setPsdCon">
            //         <div className="inputPsd">
            //             <label htmlFor="oldPsd">请输入旧密码</label>
            //             <input id="oldPsd" type="password" name="oldPsd" placeholder="" onChange={that.vauleChange} />
            //         </div>
            //         <div className="inputPsd">
            //             <label htmlFor="psd">请输入新密码</label>
            //             <input id="psd" type="password" name="newPsd" placeholder="" onChange={that.vauleChange} />
            //         </div>
            //         <div className="inputPsd">
            //             <label htmlFor="surePsd">请确认新密码</label>
            //             <input id="surePsd" type="password" name="surePsd" placeholder="" onChange={that.vauleChange} />
            //         </div>
            //         <div className="psdLogin" onClick={that.savePsd}>保存</div>
            //     </div>
            // </div>
            <div>
                <Header title="修改密码" />
                <Loading flag={that.state.isLoading} />
                <Tabs tabs={tabs} initialPage={0} onChange={(tab, index) => { console.log('onChange', index, tab); }} onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                        <div className="setPsd app_Box">                           
                            <div className="setPsdCon">
                                <div className="inputPsd">
                                    <label htmlFor="oldPsd">请输入旧密码</label>
                                    <input id="oldPsd" type="password" name="oldPsd" placeholder="" onChange={that.vauleChange} />
                                </div>
                                <div className="inputPsd">
                                    <label htmlFor="psd">请输入新密码</label>
                                    <input id="psd" type="password" name="newPsd" placeholder="" onChange={that.vauleChange} />
                                </div>
                                <div className="inputPsd">
                                    <label htmlFor="surePsd">请确认新密码</label>
                                    <input id="surePsd" type="password" name="surePsd" placeholder="" onChange={that.vauleChange} />
                                </div>
                                <div className="psdLogin" onClick={that.savePsd}>保存</div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                        <div className="setPsd app_Box">                           
                            <div className="setPsdCon">
                                <div className="inputPsd">
                                    <label htmlFor="phoneNum">手机号</label>
                                    <input id="phoneNum" type="password" name="phoneNum" onChange={that.changeInputTxt} value={that.state.phoneNum} placeholder="请输入手机号"  />
                                </div>
                                <div className="inputPsd inputLine">
                                    <label htmlFor="psd">验证码</label>
                                    <input  type="password"  placeholder="请输入验证码" />
                                    <span onClick={that.getMsg} style={getMsgStyle} className="getMsg">{text}</span>
                                </div>                                
                                <div className="psdLogin" >下一步</div>
                            </div>
                        </div>
                    </div>
                </Tabs>
           
          </div>
        )
    }

});


export default Repsd;


