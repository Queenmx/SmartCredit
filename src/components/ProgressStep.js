'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import { hashHistory, Link } from 'react-router';
import '../sass/progressStep.scss';
// var appBasePath = globalData.appBasePath;
var ProgressStep = React.createClass({
    getInitialState: function () {
        return {
            activeTab: 1,
            isShow: false,
            activeIndex: 0
        }
    },
    render: function () {
        return (
            <div className="progressStep">
                <ul className="step-list">
                    <li className="item">
                        <p className="left">
                            <i className="index">1</i>
                            <span>填写基本信息</span>
                        </p>
                        <p className="right">2017.12.23:23:23:90</p>
                    </li>
                    <li className="item">
                        <p className="left">
                            <i className="index">1</i>
                            <span>填写基本信息</span>
                        </p>
                        <p className="right">2017.12.23:23:23:90</p>
                    </li>
                    <li className="item">
                        <p className="left">
                            <i className="index">1</i>
                            <span>填写基本信息</span>
                        </p>
                        <p className="right">2017.12.23:23:23:90</p>
                    </li>
                </ul>
            </div>
        )
    }
});


export default ProgressStep;


