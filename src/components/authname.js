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
        return {
            isLoading: false,
            flag: false,
        }
    },
    componentWillMount() {
        var user =JSON.parse(localStorage.getItem("user"));
        this.setState({
            userId: user.userId,
        })
    },
    vauleChange: function (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
        
    },
    psdLogin: function () {
        var that = this;
        let realName = this.state.realName;
        var idCartReg = /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/;
        let idCard = that.state.idCard;
        if (!(/^[\u4e00-\u9fa5]{2,4}$/.test(realName))) {
            Toast.info("姓名至少2个字符,最多4个中文字符");
            return false;
        }else if(idCartReg.test(idCard)) {
            var data={
                userId:this.state.userId,
                idCard:idCard,
                name:realName,
            }
            console.log(data);
            api.authName(data,function(res){
                if(res.code=="0000"){
                    var path={
                        pathname: '/insurance', 
                    }
                    var user =JSON.parse(localStorage.getItem("user"));
                    Object.assign(user,{realName:realName,idCard:idCard});
                    localStorage.setItem("user",JSON.stringify(user));
                }else{
                    Toast.info(res.msg, 2);    
                }
                hashHistory.push(path);
            })
            // var path={
            //     pathname: '/myMap', 
            // }
            
           
        } else {
            Toast.info("请输入正确的身份证号", 2);                
           
        }
    },

    render: function () {
        var that = this;
       
        return (
            <div className="setPsd auth app_Box">
                <Header title="实名认证" />
                <Loading flag={that.state.isLoading} />
                <div className="setPsdCon">
                    <div className="inputPsd">
                        <label htmlFor="realName">真实姓名</label>
                        <input id="realName" type="text" name="realName" value={that.state.realName} placeholder="请输入真是姓名" onChange={that.vauleChange} />
                    </div>
                    <div className="inputPsd">
                        <label htmlFor="idCard">身份证号</label>
                        <input id="idCard" type="text" name="idCard" value={that.state.idCard} placeholder="请输入真是身份证号" onChange={that.vauleChange} />
                    </div>
                    {/* <div className="inputPsd">
                        <label htmlFor="surePsd">赠送保险</label>
                        <input id="" type="password" name="surePsd" />
                    </div> */}
                    <div className="psdLogin" onClick={that.psdLogin}>提交</div>
                </div>
            </div>
        )
    }

});


export default SetPsd;


