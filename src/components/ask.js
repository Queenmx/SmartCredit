'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';
import '../css/problem.css';


var appBasePath = globalData.appBasePath;
var Ask = React.createClass({
    getInitialState: function () {
        return {
            content: ''
        }
    },

    componentWillMount: function () {

    },

    toNewsDetail: function () {
        var data = { id: 3, name: "qin", age: 18 };
        var path = {
            pathname: '/NewsDetail',
            query: data,
        }
        hashHistory.push(path);
    },
    submitAsk: function () {
        var content = that.state;
        api.questionAdd(content, '', function (res) {
            if (res.code == "0000") {

            }
        })
    },

    render: function () {
        var that = this;
        //console.log("cityId",cityId);

        return (
            <div className="app_Box ask">
                <Header title="我要提问" />
                <div className="askCon content">
                    <p>向用钱宝提问</p>
                    <textarea placeholder="问题描述(200个字以内)" value={that.state.content}></textarea>
                </div>
                <div className="botBtn" onClick={that.submitAsk}>提交</div>
            </div>
        )
    }
});


export default Ask;


