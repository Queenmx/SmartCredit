'use strict';
// import React from "react";
// import ReactDom from 'react-dom';
import { Router, Route, Link } from 'react-router';
import {Toast } from 'antd-mobile';
var Footer = React.createClass({
    getInitialState: function () {
        return {
            //activeIndex:0
        }
    },
    render: function () {
        var activeIndex = this.props.activeIndex;
        return (
            <div className="tabBar" id="tabBar">
                <Link to="/">
                    <div data-id="0"><img src={activeIndex == 0 ? "src/img/icon/foot-home.png" : "src/img/icon/foot-home2.png"} data-id="0" /></div>
                    <p className={activeIndex == 0 ? "activeNav" : ""}>首页</p>
                </Link>
                <Link to="/loanList">
                    <div data-id="1"><img src={activeIndex == 1 ? "src/img/icon/foot-loan.png" : "src/img/icon/foot-loan2.png"} data-id="1" /></div>
                    <p className={activeIndex == 1 ? "activeNav" : ""}>借款</p>
                </Link>            
                <Link to="/task" className="taskIcon">
                    <div data-id="2"><img src={"src/img/icon/foot-task.png"} data-id="2" /></div>
                    <p className={activeIndex == 2 ? "activeNav" : ""}>任务中心</p>
                </Link>
                <Link to="/licai">
                    <div data-id="3"><img src={activeIndex == 3 ? "src/img/icon/foot-money.png" : "src/img/icon/foot-money2.png"} data-id="3" /></div>
                    <p className={activeIndex == 3 ? "activeNav" : ""}>理财</p>
                </Link>
                <Link to="/mine">
                    <div data-id="4"><img src={activeIndex == 4 ? "src/img/icon/foot-pel.png" : "src/img/icon/foot-pel2.png"} data-id="4" /></div>
                    <p className={activeIndex == 4 ? "activeNav" : ""}>个人中心</p>
                </Link>
            </div>
        )
    }

})

export default Footer;