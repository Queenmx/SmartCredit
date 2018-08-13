'use strict';
// import React from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header1';
import Loading from './loading';
import { hashHistory,Link } from 'react-router';
import {  Toast } from 'antd-mobile';
import util from "./util";
var key1 = globalData.key;
var appBasePath = globalData.appBasePath;
var ip = returnCitySN["cip"];   
var SetPsd = React.createClass({
    getInitialState: function () {
        return {
            isLoading: false,
            flag: false,
            arr1:["0-5岁","6-13岁","13岁以上","无子女"],
            arr2:["自驾车","火车或公交","飞机"],
            arr3:["意外保障","重疾保障","医疗保障"],
            arr4:["10万","20万","30万","50万"],
            
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
        if (!(/^[\u4e00-\u9fa5]{2,10}$/.test(realName))) {
            Toast.info("姓名至少2个字符,最多10个中文字符");
            return false;
        }else if(idCartReg.test(idCard)) {
            var data={
                userId:this.state.userId,
                idCard:idCard,
                name:realName,
            }
            // console.log(data);
            api.authName(data,function(res){
                if(res.code=="0000"){  
                    that.getBaoxin(idCard,realName)                  
                    var user =JSON.parse(localStorage.getItem("user"));
                    Object.assign(user,{realName:realName,idCard:idCard,idCert:1});
                    localStorage.setItem("user",JSON.stringify(user));
                }else{
                    Toast.info(res.msg, 2);    
                }              
            })           
        } else {
            Toast.info("请输入正确的身份证号", 2);                           
        }
        /**
         * 实名认证埋点
         */
        var data={
            eventName:"实名认证",
            eventId:"1",
            message1:"",
            message2:"",
            message3:""
        }
        util.appBrige.start(data)
    },
    getBaoxin(idCard,realName){
        var that=this;
        var user=JSON.parse(localStorage.getItem("user"));
        var index1=parseInt(3*Math.random());
        var index2=parseInt(2*Math.random());
        var index3=parseInt(2*Math.random());
        var index4=parseInt(3*Math.random());
        var data={
            adCode:'d6dbecc6',                
            activityConfigNum:0,
            policyHolderName:realName,
            mobile:user.phone,
            policyHolderIdCard:idCard,
            fromIp:ip,
            userAgent:navigator.userAgent,
            premiumInfo: {
                "sumInsured": 10000000
            },
                "questionnaire": [
                {
                    "question": "请问您是否有子女？",
                    "answers": [(this.state.arr1)[index1]]
                },
                {
                    "question": "请问您和家人常以哪种方式出游？",
                    "answers": [(this.state.arr2)[index2]]
                },
                {
                    "question": "请问您更倾向于哪种商业保障？",
                    "answers": [(this.state.arr3)[index3]]
                },
                {
                    "question": "您期望的保障金额是多少？",
                    "answers": [(this.state.arr4)[index4]]
                }
            ],
            tag: {
                "hasCar":"有",
                "hasHouse":"没有",
                "income":"9999",
                "loanAmount":100000,
                "paymentType":"ANNUAL",
                "searchWord":"阳光保险",
                "keyWord":"保险"
            }
        }
        console.log(data)
        api.getInsurance(data,function(res){
            if (res.code == "0000") {
                Toast.info("领取成功",2);
            }else{                   
                Toast.info(res.msg,2);
            }
            var path={
                pathname: '/', 
            }
            that.timer=setTimeout(function(res){
                hashHistory.push(path);
            },1000)            
        })
    },
    componentWillUnmount(){
        clearTimeout(this.timer);
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
                        <input id="realName" type="text" name="realName" value={that.state.realName} placeholder="请输入真实姓名" onChange={that.vauleChange} />
                    </div>
                    <div className="inputPsd">
                        <label htmlFor="idCard">身份证号</label>
                        <input id="idCard" type="text" name="idCard" value={that.state.idCard} placeholder="请输入真实身份证号" onChange={that.vauleChange} />
                    </div>
                    {/* <div className="inputPsd">
                        <label htmlFor="surePsd">赠送保险</label>
                        <input id="" type="password" name="surePsd" />
                    </div> */}
                    <div className="psdLogin" onClick={that.psdLogin}>提交</div>
                    <div className={this.props.location.query.fromWhere=='forget'?'hide':"agree"}>
                        <p>
                            {/* <input type="radio" value="" name="info" defaultChecked/> */}
                            <span className="checkicon" style={{backgroundImage:"url('src/img/icon/bao-icon6.png')"}}></span>本人已知
                            <Link to={
                        {
                            pathname: "/txt",
                            //hash:'#ahash',    
                            state: { title: '投保规则', fromId: 5 }
                            //state:{data:'hello'}     
                        }
                    } >《投保规则》</Link>及
                    <Link to={
                        {
                            pathname: "/txt",
                            //hash:'#ahash',    
                            state: { title: '信息安全说明', fromId: 6    }
                            //state:{data:'hello'}     
                        }
                    } >《信息安全说明》</Link>
                    并同意领取免费保险
                    </p>
                </div>
                </div>
               
            </div>
        )
    }

});


export default SetPsd;


