'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';
import ProgressStep from './ProgressStep';
import '../sass/progressDetail.scss';
// var appBasePath = globalData.appBasePath;
var imgPath = globalData.imgPath;
var ProgressDetail = React.createClass({
    getInitialState: function () {
        return {
            activeTab: 1,
            isShow: false,
            activeIndex: 0
        }
    },
    goContract: function (contractId) {
        var data = { contractId: contractId };
        var path = {
            pathname: '/Contract',
            state: data,
        }
        hashHistory.push(path);
    },

    render: function () {
        var that = this;
        var progressItem = that.props.location.state.progressItem;
        var theDate = progressItem.rateType;
        var theDateTxt;
        switch (theDate) {
            case "Y":
                theDateTxt = "年"
                break;
            case "M":
                theDateTxt = "月"
                break;
            case "D":
                theDateTxt = "日"
                break;
            default:
                break;
        }
        return (
            <div className="app_Box progressDetail">
                <Header title='借款进度' />
                <div className="hit">您的借款申请已通过，3个工作日内完成放款</div>
                <div className="capitalBox">
                    <div className="capitalList">
                        <h3>
                            <img src={imgPath + progressItem.logo} onError={that.logoError} />
                            <span>{progressItem.loanName}</span>
                        </h3>
                        <div className="capitalInfo">
                            <div className="limit">
                                <h2>{progressItem.moneyMin}~{progressItem.moneyMax}</h2>
                                <p>额度范围(元)</p>
                            </div>
                            <ul className="special">
                                <li>{progressItem.loanTime}</li>
                                <li>{theDateTxt}利率{progressItem.rate}%</li>
                                <li>贷款期限{progressItem.limitMin}-{progressItem.limitMax}{theDateTxt}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="step-wrap">
                    <ProgressStep />
                </div>
                <div className="footer-btn" onClick={this.goContract.bind(null, 1)}>查看合同</div>
            </div>
        )
    }
});


export default ProgressDetail;


