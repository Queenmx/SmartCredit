'use strict';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import '../css/login.css';
import { Toast } from 'antd-mobile';
var key1 = globalData.key;
var Login = React.createClass({
    getInitialState: function () {
        return {
        }   
    },
    componentWillMount: function () {
    },
    componentDidUpdate(){
        var that=this;

    },

    componentWillUnmount() {
        clearInterval(this.timer);
    },
    submitHandler(){

    },
    render: function () {
        var that = this;
        
        return (
            <div className="login baoxian">
                {/* <Header title="登录" backRouter={backRouter} /> */}
                <div className="head" style={{backgroundImage:"url('src/img/icon/bao-icon5.png')"}}>
                    <p><span><img src="src/img/icon/back2.png" alt=""/></span><span>立即领取</span></p>
                </div>
                <div className="loginCon">                   
                    <p>领取要求</p>
                    <p>1：领取规则：每人限领一次（1年），其他6个月的就是6个月。</p>
                    <p>2：年龄：XX-XX岁。</p>
                    <p>3：领取范围：全国或指定的城市。</p>
                    <p>4：领取须知：领取后保险公司可能会进行电话回访。</p>
                    
                    <div>
                        <p>
                            <span></span>
                            本人已知
                            <Link to={
                        {
                            pathname: "/txt",
                            //hash:'#ahash',    
                            state: { title: '投保规则', fromId: 3 }
                            //state:{data:'hello'}     
                        }
                    } >《投保规则》</Link>
                    及
                    <Link to={
                        {
                            pathname: "/txt",
                            //hash:'#ahash',    
                            state: { title: '信息安全说明', fromId: 3 }
                            //state:{data:'hello'}     
                        }
                    } >《信息安全说明》 </Link>并同意领取免费保险
                        </p>
                        <a className="loginBtn" onClick={that.submitHandler}>立即领取</a>
                    </div>
                </div>
                <Loading flag={that.state.flag} />

            </div>
        )
    }

});

export default Login;


