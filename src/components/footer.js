'use strict';
// import React from "react";
// import ReactDom from 'react-dom';
import { Router, Route, Link } from 'react-router';
import {Toast } from 'antd-mobile';
import util from "./util";

var Footer = React.createClass({
    getInitialState: function () {
        return {
            //activeIndex:0
        }
    },
    loan(){
        /**
         * 底部借款埋点
         */
        var data={
            eventName:"底部(借款)",
            eventId:"9",
            message1:"",
            message2:"",
            message3:""
        }
        util.appBrige.start(data);
    },
    task(){
        /**
         * 底部任务中心埋点
         */
        var data={
            eventName:"底部(任务中心)",
            eventId:"10",
            message1:"",
            message2:"",
            message3:""
        }
        util.appBrige.start(data);
    },
    render: function () {
        var activeIndex = this.props.activeIndex;
        return (
            <div className="tabBar" id="tabBar">
                <Link to="/">
                    {/* <div data-id="0"><img src={activeIndex == 0 ? "src/img/icon/foot-home.png" : "src/img/icon/foot-home2.png"} data-id="0" /></div> */}
                    <div data-id="0"><img src={activeIndex == 0 ? require(`../img/img/web/foot-home.png`) :require(`../img/img/web/foot-home2.png`)} data-id="0" /></div>                    
                    <p className={activeIndex == 0 ? "activeNav" : ""}>首页</p>
                </Link>
                <Link to="/loanList" onClick={this.loan}>
                    {/* <div data-id="1"><img src={activeIndex == 1 ? "src/img/icon/foot-loan.png" : "src/img/icon/foot-loan2.png"} data-id="1" /></div> */}
                    <div data-id="1"><img src={activeIndex == 1 ?  require(`../img/img/web/foot-loan.png`) : require(`../img/img/web/foot-loan2.png`)} data-id="1" /></div>
                    <p className={activeIndex == 1 ? "activeNav" : ""}>借款</p>
                </Link>            
                <Link to="/task" className="taskIcon" onClick={this.task}>
                    {/* <div data-id="2"><img src={"src/img/icon/foot-task.png"} data-id="2" /></div> */}
                    <div data-id="2"><img src={require(`../img/img/web/foot-task.png`)} data-id="2" /></div>
                    <p className={activeIndex == 2 ? "activeNav" : ""}>任务中心</p>
                </Link>
                <Link to="/licai">
                    {/* <div data-id="3"><img src={activeIndex == 3 ? "src/img/icon/foot-money.png" : "src/img/icon/foot-money2.png"} data-id="3" /></div> */}
                    <div data-id="3"><img src={activeIndex == 3 ? require(`../img/img/web/foot-money.png`) : require(`../img/img/web/foot-money2.png`)} data-id="3" /></div>
                    <p className={activeIndex == 3 ? "activeNav" : ""}>理财</p>
                </Link>
                <Link to="/mine">
                    {/* <div data-id="4"><img src={activeIndex == 4 ? "src/img/icon/foot-pel.png" : "src/img/icon/foot-pel2.png"} data-id="4" /></div> */}
                    <div data-id="4"><img src={activeIndex == 4 ? require(`../img/img/web/foot-pel.png`) : require(`../img/img/web/foot-pel2.png`)} data-id="4" /></div>
                    <p className={activeIndex == 4 ? "activeNav" : ""}>个人中心</p>
                </Link>
            </div>
        )
    }

})

export default Footer;