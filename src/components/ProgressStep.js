'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import { hashHistory, Link } from 'react-router';
import { formateTime } from './util'
import '../sass/progressStep.scss';
import { Modal, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
// var appBasePath = globalData.appBasePath;
var ProgressStep = React.createClass({
    getInitialState: function () {
        return {
            activeTab: 1,
            isShow: false,
            activeIndex: 0
        }
    },
    formatTime: function (time) {
        if (!time) return
        time = new Date(time)
        return formateTime(time, 'yyyy-MM-dd hh:mm')
    },
    render: function () {
        return (
            <div className="progressStep">
                <ul className="step-list">
                    {this.props.steps.map((item, index) =>
                        <li className="item" key={Math.random()}>
                            <p className="left">
                                <i className={item.time ? 'blue' : 'grey'}>{index + 1}</i>
                                <span className={item.time ? 'fontblack' : 'fontgrey'}>{item.text}</span>
                            </p>
                            <p className="right">{this.formatTime(item.time)}</p>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
});


export default ProgressStep;


