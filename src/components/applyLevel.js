'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import LevelList from './levelList';
import { Toast } from 'antd-mobile';
// var toast = new Toast();
var ApplyLevel = React.createClass({
    getInitialState: function () {
        return {
            checked: true,
            flag: false,
            valSelect: [],
            qualifyListArr: [],
            second: []
        }
    },

    componentWillMount: function () {
        var loanId = this.props.location.state.loanId;
        var applyQuery = this.props.location.state.applyQuery;
        //console.log(applyQuery);
        this.setState({ loanId: loanId,applyQuery: applyQuery });

    },
    toBack: function () {
        const backRouter = this.props.backRouter;
        if (backRouter) {
            hashHistory.push(backRouter);
        } else {
            //window.history.back()
            history.go(-1);
        }
    },
    getQualit:function(qualifySelect){
    	this.setState({
    		valSelect:qualifySelect
    	})
    },
    toApplyResult: function () {
        var that = this;
        ////console.log(that.state.valSelect);
        var key1 = globalData.key;
        // var toast=globalData.toast;
        var isOver;
        if (!this.state.checked) {
            // Toast.info("请同意万融汇服务协议",2);
            Toast.info("请同意万融汇服务协议", 2);
        } else {
            this.refs.toChildSaveBtn.toSaveBtn(

                function () {
                    that.setState({
                        flag: true
                    })
                    //console.log("申请贷款");
                    //申请贷款
                    const { limitDay, limitType, loanId, money } = that.state.applyQuery;
                    var qualifyList = that.state.valSelect;
                    //console.log(that.state.applyQuery);
                    var money1 = parseFloat(money) * 100;
                    //console.log(money);
                    api.applyLoan(limitDay, limitType, loanId, money1, qualifyList, function (res) {
                        //console.log(res);
                        if (res.code == "0000") {
                            that.setState({
                                flag: false
                            })
                            var data = JSON.parse(strDec(res.data, key1, "", ""));
                            // console.log(data);
                            var queryData = { apiUrl: data.apiUrl, apiWay: data.apiWay, logo: data.logo,tapNum:that.props.location.state.tapNum };
                            //Toast.info("申请订单成功",2);
                            var path = {
                                pathname: '/ApplyResult',
                                state: queryData
                            }
                            hashHistory.push(path);
                        } else if (res.code == "5555") {
                            that.setState({
                                flag: false
                            })
                            Toast.info("登录过时，请重新登录", 2);
                            var path = {
                                pathname: '/Login',
                            }
                            hashHistory.push(path);
                        } else {
                            that.setState({
                                flag: false
                            })
                            Toast.info(res.msg, 2);
                        }
                    }, function () {
                        that.setState({
                            flag: false
                        })
                        Toast.info("连接错误", 2);
                    })

                }
            );
        }
    },
    agreeRule: function (event) {
        //console.log(event.target.checked);
        this.setState({
            checked: event.target.checked
        })
    },
    toChildSaveBtn: function () {
        //父组件调用子主键进行通信  
        this.refs.toChildSaveBtn.toSaveBtn();
    },
    render: function () {
        var that = this;

        return (
            <div className="app_Box applyFlow">
                <div className="header">
                    <div className="toBack" onClick={that.toBack}><img src="src/img/icon/backWhite.png" /></div>
                    <p className="title">申请人资质</p>
                    <div className="headerLinkBtn"></div>
                </div>
                <div className="applyLevelCon content">
                    <ul className="stepBox">
                        <li>
                            <h1 className="stepActive">1</h1>
                            <p>申请人信息</p>
                        </li>
                        <span></span>
                        <li>
                            <h1 className="stepActive">2</h1>
                            <p>申请人资质</p>
                        </li>
                        <span></span>
                        <li>
                            <h1>3</h1>
                            <p>申请结果</p>
                        </li>
                    </ul>
                    <div className="applyLevel">
                        <Loading flag={that.state.flag} />
                        {/*<form className="applyLevelForm">
							<ul className="applyLevelZero">
								{that.state.qualifyListArr}
							</ul>
						</form>*/}
                        <LevelList objId={that.state.loanId} getQualit={that.getQualit} ref="toChildSaveBtn" loanType='JZD'/>
                        <div className="rule">
                            <input className="magic-checkbox" type="checkbox" id="ruleCheck" checked={that.state.checked} onChange={that.agreeRule} />
                            <label htmlFor="ruleCheck">我已同意</label>
                            <Link to={
                                {
                                    pathname: "/txt",
                                    //hash:'#ahash',    
                                    state: { title: '万融汇服务条款', fromId: 2 }
                                }
                            } >
                                《万融汇服务条款》
							</Link>

                        </div>
                    </div>
                </div>
                <div className="botBtn footer" onClick={that.toApplyResult}>下一步</div>
            </div>
        )
    },

    componentDidMount: function () {
    }

});


export default ApplyLevel;


