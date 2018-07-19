'use strict';
// import React from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import Footer from './footer';
import { hashHistory, Link } from 'react-router';
import '../css/home.css';
import { Modal, Button, WhiteSpace, WingBlank, Toast,Menu } from 'antd-mobile';
const prompt = Modal.prompt;
var imgPath = globalData.imgPath;
var Loan = React.createClass({
    getInitialState: function () {
        return {
            isLoading: false,
            show: false,
            phoneNum:''
        }
    },

    componentWillMount: function () {
        var user = localStorage.getItem("user"); 
        this.setState({
            user:JSON.parse(user)
        })
    },


    logoError: function (event) {
        event.target.src = "src/img/icon/logo.png";
        event.target.onerror = null; //控制不要一直跳动 
        //console.log(event.target.src);
    },
    onMaskClick(e){
        console.log(e)
        this.setState({
            show: false,
        });
    },
    subNum(){        
        var phoneNum = this.state.phoneNum;
        if(!phoneNum){
            Toast.info("请输入手机号", 2);
            return false;
        }
        if (!(/^1[34578]\d{9}$/.test(phoneNum))) {
            //console.log(phoneNum);
            Toast.info("手机号码格式不对", 2);
        }else{
            this.setState({
                show: false,
            });
            console.log("3434")
        }
    },
    subTk(){
        this.setState({
            show: true,
        });
    },
    changeInputTxt: function (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    },
    upload: function (c, d, name) {
        var that = this;
        var $c = document.querySelector(c),
            $d = document.querySelector(d),
            myfile = $c.files[0],
            reader = new FileReader();
        //reader.readAsBinaryString(file,'gb2312');
        reader.readAsDataURL(myfile);
        reader.onload = function (e) {
            // 这个事件在读取结束后，无论成功或者失败都会触发
            if (reader.error) {
                // console.log(reader.error);
                alert(reader.error);
            } else {
                
                //console.log(e.target.result);
            }

        }
        //在此限制图片的大小
        var imgSize = myfile.size;
         console.log(imgSize);
         //35160  计算机存储数据最为常用的单位是字节(B)
         //在此处我们限制图片大小为2M
        if(imgSize>5*1024*1024){
            Toast.info('上传的图片的大于5M,请重新选择');
            return false;
        }
        if (myfile) {
            new html5ImgCompress(myfile, {
                before: function (myfile) {
                    // console.log('单张: 压缩前...');
                },
                done: function (myfile, base64) {
                    //  console.log('单张: 压缩成功...');
                    // Toast.info("单张: 压缩成功...",1000)
                    // console.log(base64);
                    that.setState({
                        [name]: base64
                    })
                },
                fail: function (myfile) {
                     Toast.info('请选择图片上传');
                },
                complete: function (myfile) {
                    //  console.log('单张: 压缩完成...');
                    //  console.log(that.state)
                    Toast.info('压缩完成');
                },
                notSupport: function (myfile) {
                    alert('浏览器不支持！');
                }
            });
        }
    },
    toBack(){
        var path = {
            pathname: '/mine',                
        }
        hashHistory.push(path);
    },

    componentDidMount: function () {
        var key1 = globalData.key;
        var toast = globalData.toast;
        var that=this;
        var item={
            userId:this.state.user.userId,
            phone:this.state.user.phone,
        }
        api.myTask(item,function(res){
            if(res.code=="0000"){
                var result = JSON.parse(strDec(res.data, key1, "", ""));
                var arr=result.list.map(function(item,i){
                    switch(item.auditStatus){
                        case ""://去第3方
                        return (                        
                            <li key={i}>
                                <img src={imgPath+item.taskUrl} />
                                <div className="loanTitle">
                                    <p>{item.taskName}</p>
                                    <p><span>任务奖励</span>：完成任务可获得<span>{item.taskMoney}</span>积分</p>
                                </div>
                                <div className="high">
                                    <p onClick={this.goTask}>进入任务</p>
                                    <p onClick={this.subTk}> 提交任务</p>                               
                                </div>
                            </li>
                        );
                        break;
                        case "2"://审核通过
                        return (
                        
                            <li key={i}>
                                <img src={imgPath+item.taskUrl} />
                                <div className="loanTitle">
                                    <p>{item.taskName}</p>
                                    <p><span>任务奖励</span>：完成任务可获得<span>{item.taskMoney}</span>积分</p>
                                </div>
                                <div className="high">
                                    <p className="hasPass">通过</p>                                
                                </div>
                            </li>
                        );
                        break;
                        case "3"://审核不通过
                        return (
                        
                            <li key={i}>
                                <img src={imgPath+item.taskUrl} />
                                <div className="loanTitle">
                                    <p>{item.taskName}</p>
                                    <p><span>任务奖励</span>：完成任务可获得<span>{item.taskMoney}</span>积分</p>
                                </div>
                                <div className="high">
                                    <p className="noPass">未通过</p>                                
                                </div>
                            </li>
                        );
                        break;
                    }
                   
                })
                that.setState({
                    listinfo:arr
                })
                console.log(result);
            }else{
                Toast.info(res.msg,2);
            }
        })

    },


    render: function () {
        var that = this;
        const show=this.state.show;
        const menuEl = (
            <div className="upphone">
                <p>请输入手机号</p>                
                <input type="text" onChange={this.changeInputTxt} value={that.state.phoneNum} name="phoneNum" type="number"/>                   
                <p >
                    上传截图
                    <input type="file" id="face" onChange={that.upload.bind(this, "#face", "#faceImg", "faceImg")} accept="image/*"/>
                </p>
                <p >上传图片不能超过5M</p>
                <p onClick={this.subNum}>提交</p>
                <p style={{backgroundImage:"url('src/img/icon/task-icon2.png')"}} onClick={this.onMaskClick}></p>
            </div>
        )
        
        return (
            <div className="app_Box myTask">
                {/* <Header title="我的任务" /> */}
                <div className="header">
                <div className="toBack" onClick={this.toBack}><img src="src/img/icon/back2.png"/></div>
                <p className="title">我的任务</p>
                <div className="headerLinkBtn"></div>
            </div>
                <div className="content">
                    <Loading flag={that.state.isLoading} />
                    <ul className="tasklist">
                        {this.state.listinfo}
                        {/* <li>
                            <img src="src/img/icon/product1.png" />
                            <div className="loanTitle">
                                <p>任务名称</p>
                                <p><span>任务奖励</span>：完成任务可获得<span>500</span>积分</p>
                            </div>
                            <div className="high">
                                <p className="nopass">未通过</p>                                
                            </div>
                        </li>
                        <li>
                            <img src="src/img/icon/product1.png" />
                            <div className="loanTitle">
                                <p>任务名称</p>
                                <p><span>任务奖励</span>：完成任务可获得<span>500</span>积分</p>
                            </div>
                            <div className="high">
                                <p className="hasPass">通过</p>                                
                            </div>
                        </li>
                        <li>
                            <img src="src/img/icon/product1.png" />
                            <div className="loanTitle">
                                <p>任务名称</p>
                                <p><span>任务奖励</span>：完成任务可获得<span>500</span>积分</p>
                            </div>
                            <div className="high">
                                <p onClick={this.goTask}>进入任务</p>
                                <p onClick={this.subTk}> 提交任务</p>
                            </div>
                        </li>
                        <li>
                            <img src="src/img/icon/product1.png" />
                            <div className="loanTitle">
                                <p>任务名称</p>
                                <p><span>任务奖励</span>：完成任务可获得<span>500</span>积分</p>
                            </div>
                            <div className="high">
                                <p>
                                    查看任务    
                                </p>
                                <p>未领取</p>
                            </div>
                        </li> */}
                    </ul>
                    {show ? menuEl : null}
                    {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}   
                </div> 
                
            </div>
        )
    }
});


export default Loan;


