'use strict';
// import React from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';
import { Toast } from 'antd-mobile';
var appBasePath = globalData.appBasePath;
var HelpDetail = React.createClass({
    getInitialState: function () {
        return {

        }
    },
    helpDetail: function () {
        var data = {};
        var path = {
            pathname: '/HelpDetail',
            state: data,
        }
        hashHistory.push(path);
    },
    anp: function (e) {
        var $i = $("<b>").text("+" + 1);
        var x = e.pageX,
            y = e.pageY;
        $i.css({
            top: y - 20,
            left: x,
            position: "absolute",
            color: "#53a6ff"
        });
        $("body").append($i);
        $i.animate({
            top: y - 120,
            opacity: 0,
            "font-size": "1.4em"
        }, 1500, function () {
            $i.remove();
        });
        e.stopPropagation();
    },

    render: function () {
        var that = this;
        return (
            <div className="app_Box helpDetail">
                <Header title="问题详情" />
                <div className="helpDetailCon">
                    <div className="helpDetailTxt">
                        <h4>如何还款</h4>
                        <p>万融汇上的产品目前均由第三方资方进行发布（代理），申请贷款需要经过第三方资方的电话审核或者相关资方的网页服务和数据审核。</p>
                        {/*<div className="solve">
        					<span onClick={that.anp}><img src="src/img/icon/yes.png"/>解决</span>
        					<span onClick={that.anp}><img src="src/img/icon/no.png"/>未解决</span>
        				</div>*/}
                    </div>
                </div>

            </div>
        )
    }

});


export default HelpDetail;


