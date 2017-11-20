'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory } from 'react-router';

var appBasePath = globalData.appBasePath;
var Repsd = React.createClass({
    getInitialState: function () {
        return {
			isLoading:false
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
        var toast = new Toast();
        if (oldPsd && newPsd && surePsd) {
            if (newPsd !== surePsd) {
                toast.show("两次密码不一致",2000);
            }else if(newPsd==oldPsd){
            	toast.show("新密码不能与近期用过密码相同",2000);
            }else {
            	that.setState({isLoading:true})
                api.updatePsd(newPsd, oldPsd, function (res) {
                    //console.log(res);
           		 if (res.code == "0000") {
           		 	that.setState({isLoading:false})
           		 	toast.show("修改成功,请重新登录", 2000);
           		 	localStorage.removeItem("user");
           		 	localStorage.removeItem("isLogin");
           		 	globalData.user="";
           		 	globalData.requestData.token="";
           		 	var path = {
					  pathname:'/Login/Mine',
					}
					hashHistory.push(path);
           		 }else if(res.code=="5555"){
           		 	that.setState({isLoading:false})
					toast.show("登录过时，请重新登录",2000);
					var path = {
					  pathname:'/Login',
					}
					hashHistory.push(path);
				}else{
					that.setState({isLoading:false})
					toast.show(res.msg,2000);
				}
                    // window.history.back();
                    
                },function(){
                	that.setState({isLoading:false})
					toast.show("连接错误",2000);
				})

            }
        } else {
            toast.show("输入不能为空", 2000);
        }


    },
    render: function () {
        var that = this;
        return (
            <div className="setPsd app_Box">
                <Header title="修改密码" />
                <Loading flag={that.state.isLoading}/>
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
        )
    }

});


export default Repsd;


