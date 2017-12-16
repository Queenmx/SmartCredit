'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';
import ProList from './proList';
import { Toast } from 'antd-mobile';
var appBasePath = globalData.appBasePath;
var List = React.createClass({
    getInitialState: function () {
        return {
            activeTab: 1,
            isShow: false,
            activeIndex: 0
        }
    },


    render: function () {
        var that = this;
        var title = that.props.location.state.txt;
        var tag = that.props.location.state.tag;
        return (
            <div className="app_Box home">
                <Header title={title} />
                <div className="content">
                    <ProList scollFlag="true" tag={tag} />
                </div>
            </div>
        )
    }
});


export default List;


