'use strict';
// import React from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory } from 'react-router';
import { Toast} from 'antd-mobile';


var key1 = globalData.key;  
var appBasePath = globalData.appBasePath;
var Repsd = React.createClass({
    getInitialState: function () {
        var eyeImg = [<img src="src/img/icon/by.png" key={"by"} />];
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
     eyesHandle: function () {
         $(".img").css("display","none")
        var type = $("#psd")[0].type;
        console.log(type)
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
        $(".img1").css("display","none")
        var type = $("#surePsd")[0].type;
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
    eyesHandle2: function () {
        $(".img2").css("display","none")
        var type = $("#surePsd1")[0].type;
        var eyeImg = [];
        if (type == "password") {
            eyeImg.push(<img src="src/img/icon/zy.png" key={"zy"} />);
            this.setState({
                inputType2: "text",
                eyeImg2: eyeImg
            })

        } else {
            eyeImg.push(<img src="src/img/icon/by.png" key={"by"} />);
            this.setState({
                inputType2: "password",
                eyeImg2: eyeImg
            })
        }
    },
    vauleChange: function (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    },
    vauleChange1: function (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    },
    vauleChange2: function (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    },
    psdConfirm: function () {

        var that = this;
        let oldPsd = that.state.psd;
        let newPsd = that.state.surePsd;
        let surePsd = that.state.surePsd1;
        var userId = localStorage.getItem("userId");
        // var toast = new Toast();
        if (oldPsd && newPsd && surePsd) {
            if (newPsd !== surePsd) {
                Toast.info("两次密码不一致", 2);
            } else if (newPsd == oldPsd) {
                Toast.info("新密码不能与近期用过密码相同", 2);
            } else {
                that.setState({ isLoading: true })
                api.resetPsd(userId,oldPsd,newPsd,function (res) {
                    //console.log(res);
                    if (res.code == "0000") {
                        that.setState({ isLoading: false })
                        Toast.info("修改成功", 2);
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

              
              

            }
        }
    },
    toBack: function () {
        const backRouter = this.props.backRouter;
        //console.log(backRouter);
        if (backRouter) {
            hashHistory.push(backRouter);
         
        } else {
        
        	 history.go(-1); 
        }


    },
    render: function () {
        var that = this;
        // let getMsgStyle = that.state.getMsg.style;
        // var text = this.state.liked ? '获取验证码' : this.state.count + '秒后重发';
        return (
            <div className="setPsd app_Box">
                {/* <Header title={'修改登录密码'} /> */}
                <div className="header">
                    <div className="toBack" onClick={this.toBack}><img src="src/img/icon/back3.png"/></div>
                    <p className="title">修改登录密码</p>
                    <div className="headerLinkBtn"></div>
                </div>
           
                {/* <Loading flag={that.state.isLoading} /> */}
                <div className="setPsdCon">
                    <div className="inputPsd">
                        <label htmlFor="psd" style={{backgroundImage:"url('src/img/icon/login-icon5.png')"}}></label>
                        <input id="psd" type={that.state.inputType} name="psd" placeholder="请输入原密码" onChange={that.vauleChange} />
                        <span className="eyes" id="eyes" onClick={that.eyesHandle}>
                        <img src="src/img/icon/zy.png" key={"zy"}  className="img"/>
                            {that.state.eyeImg}
                        </span>
                    </div>
                    <div className="inputPsd">
                        <p className={this.state.isshow?"tips":'hide'}><span style={{backgroundImage:"url('src/img/icon/login-icon7.png')"}}></span>请使用6-20位数字和字母（包含特殊字符）</p>
                        <label htmlFor="surePsd" style={{backgroundImage:"url('src/img/icon/login-icon6.png')"}}></label>
                        <input id="surePsd" type={that.state.inputType1} name="surePsd" placeholder="请输入新密码" onChange={that.vauleChange1} />
                        <span className="eyes" id="eyes" onClick={that.eyesHandle1}>
                            <img src="src/img/icon/zy.png" key={"zy"} className="img1"/>
                            {that.state.eyeImg1}
                        </span>
                    </div>
                    <div className="inputPsd">
                        <p className={this.state.isshow?"tips":'hide'}><span style={{backgroundImage:"url('src/img/icon/login-icon7.png')"}}></span>请使用6-20位数字和字母（包含特殊字符）</p>
                        <label htmlFor="surePsd1" style={{backgroundImage:"url('src/img/icon/login-icon6.png')"}}></label>
                        <input id="surePsd1" type={that.state.inputType2} name="surePsd1" placeholder="请输入新密码" onChange={that.vauleChange2} />
                        <span className="eyes" id="eyes" onClick={that.eyesHandle2}>
                            <img src="src/img/icon/zy.png" key={"zy"} className="img2"/>
                            {that.state.eyeImg2}
                        </span>
                    </div>
                    <div className="psdLogin" onClick={that.psdConfirm}>下一步</div>
                </div>
            </div>
            // <div className="setPsd app_Box rePsd">
            //     <Header title="修改密码" />
            //     {/* <Loading flag={that.state.isLoading} /> */}
            //     <div className="setPsdCon">
            //         <div className="inputPsd">
            //             <img src=""/>
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
            // <div>
            //     <Header title="修改密码" />
            //     <Loading flag={that.state.isLoading} />
            //     <Tabs tabs={tabs} initialPage={0} onChange={(tab, index) => { console.log('onChange', index, tab); }} onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}>
            //         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            //             <div className="setPsd app_Box">                           
            //                 <div className="setPsdCon">
            //                     <div className="inputPsd">
            //                         <label htmlFor="oldPsd">请输入旧密码</label>
            //                         <input id="oldPsd" type="password" name="oldPsd" placeholder="" onChange={that.vauleChange} />
            //                     </div>
            //                     <div className="inputPsd">
            //                         <label htmlFor="psd">请输入新密码</label>
            //                         <input id="psd" type="password" name="newPsd" placeholder="" onChange={that.vauleChange} />
            //                     </div>
            //                     <div className="inputPsd">
            //                         <label htmlFor="surePsd">请确认新密码</label>
            //                         <input id="surePsd" type="password" name="surePsd" placeholder="" onChange={that.vauleChange} />
            //                     </div>
            //                     <div className="psdLogin" onClick={that.savePsd}>保存</div>
            //                 </div>
            //             </div>
            //         </div>
            //         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            //             <div className="setPsd app_Box">                           
            //                 <div className="setPsdCon">
            //                     <div className="inputPsd">
            //                         <label htmlFor="phoneNum">手机号</label>
            //                         <input id="phoneNum" type="password" name="phoneNum" onChange={that.changeInputTxt} value={that.state.phoneNum} placeholder="请输入手机号"  />
            //                     </div>
            //                     <div className="inputPsd inputLine">
            //                         <label htmlFor="psd">验证码</label>
            //                         <input  type="password"  placeholder="请输入验证码" />
            //                         <span onClick={that.getMsg} style={getMsgStyle} className="getMsg">{text}</span>
            //                     </div>                                
            //                     <div className="psdLogin" >下一步</div>
            //                 </div>
            //             </div>
            //         </div>
                // </Tabs>
           
        //   </div>
        )
    }

});


export default Repsd;


