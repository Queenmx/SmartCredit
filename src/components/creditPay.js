'use strict';
// import React from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import '../css/home.css';
import { Toast } from 'antd-mobile';

// var toast=globalData.toast;
var key1 = globalData.key;
var Ask = React.createClass({
    getInitialState: function () {
        return {
            
            
             flag: false
        }
    },

    componentWillMount: function () {
       
    },
    componentDidMount(){
    },
   
    render: function () {
        var that = this;
        //console.log("cityId",cityId);

        return (
            <div className="app_Box licai">
                <Header title="信用卡待还" />
                <Loading flag={that.state.flag} />
                <div className="content">
                    <div className="notPro">
                        <img src="src/img/icon/licai-icon1.png" alt=""/>  
                        <p className="update">功能升级，敬请期待</p>
                    </div>                    
                </div>
            </div>
        )
    }
});


export default Ask;


