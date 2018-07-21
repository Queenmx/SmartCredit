'use strict';
// import React from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Btn from './btn';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import { Toast,List, Switch} from 'antd-mobile';
import { createForm } from 'rc-form';
var Set = React.createClass({
    getInitialState: function () {
        return {
            isLoading: false,
        }
    },
    componentWillMount(){

    },
    componentDidMount(){
        var that=this;
        api.version(function(res){
            var anversion=res.androidCode;
            var iosversion=res.iosCode;
            var u = navigator.userAgent;
        　　var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        　　var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            var version=1.2;
            console.log(isAndroid,isiOS);       
            if(isAndroid){                
                version=anversion;              
            }
            if(isiOS){                
                version=iosversion;    
                $(".header").css({"height":"1.1rem","line-height":"1.1rem"});          
            }
            var arr=(
                <div className="infoRight">V{version}</div>
            )
            that.setState({
                versionArr:arr
            })
        })
    },
    quitLogin: function () {
        var that = this;
        that.setState({ isLoading: true })
        var user = localStorage.getItem("user");
        if (user) {
            api.exit(function (res) {
                //console.log(res);
                if (res.code == "0000") {
                    that.setState({ isLoading: false })
                    localStorage.removeItem("user");
                    localStorage.removeItem("isLogin");
                    localStorage.removeItem("phoneNum");
                    localStorage.removeItem("curCity");
                    globalData.user = "",
                    globalData.requestData.token = "",
                        //window.history.back();
                        history.go(-1);
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
            Toast.info("当前未登录", 2);
        }


    },
    clearCache: function () {

        localStorage.removeItem("curCity");
        sessionStorage.clear();
        this.timer = setTimeout(function () { Toast.info("清空缓存成功", 2) }, 500)
    },
    aboutUs: function () {
        let path = {
            pathname: "/txt",
            state: { title: '关于我们', fromId: 1 }
        }
        hashHistory.push(path);
    },
    rePsd: function () {//修改登录密码
        var path = {
            pathname: '/RePsd',
        }
        hashHistory.push(path);
    },
    render: function () {
        var that = this;
        return (
            <div className="userInfo app_Box">
                <Header title="设置" />
                <Loading flag={that.state.isLoading} />
                <div className="userInfoCon content">
                    <ul className="setLi">
                    <Btn />
                        {/* <li><i style={{backgroundImage:"url('src/img/icon/set-icon1.png')"}}></i><span>消息推送</span><div className="infoRight"><img src="src/img/icon/right.png" /></div></li>                         */}
                        <li onClick={that.clearCache}><i style={{backgroundImage:"url('src/img/icon/set-icon2.png')"}}></i><span>清空缓存</span><div className="infoRight"></div></li>
                        <li ><i style={{backgroundImage:"url('src/img/icon/set-icon3.png')"}}></i><span>当前版本</span>{this.state.versionArr}</li> 
                        <li onClick={that.rePsd}><i style={{backgroundImage:"url('src/img/icon/set-icon4.png')"}}></i><span>修改登录密码</span><div className="infoRight"><img src="src/img/icon/right.png" /></div></li>                                               
                        <li onClick={that.aboutUs}><i style={{backgroundImage:"url('src/img/icon/set-icon5.png')"}}></i><span>关于万融汇</span><div className="infoRight"><img src="src/img/icon/right.png" /></div></li>
                    </ul>
                    {/* <div className="quit" onClick={that.quitLogin}>退出登录</div> */}                   
                </div>
                <div className="footer">
                        <div className="applyBtn" onClick={that.quitLogin}>退出登录</div>
                    </div>
            </div>
        )
    },
    componentWillUnmount() {
        clearInterval(this.timer);
    }
});
export default Set;




