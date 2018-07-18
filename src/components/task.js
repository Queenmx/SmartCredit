'use strict';
// import React from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import Footer from './footer';
import { hashHistory, Link } from 'react-router';
import '../css/home.css';
import { Modal, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
var imgPath = globalData.imgPath;
var Loan = React.createClass({
    getInitialState: function () {
        return {
            activeLoanId: 0,
            isLoading: false,
            activeIndex: 0,
            pageNum: 1,
            pageSize: 10,
            // tagArr: [],
            listKSD: [],
            listJZD: []
        }
    },

    componentWillMount: function () {
    },
    // toListDetail: function (event) {
    //     var loanId = event.currentTarget.getAttribute("data-loanId");
    //     var type = event.currentTarget.getAttribute("data-type");
    //     var data = { loanId: loanId };
    //     if (type == "JZD") {
    //         var path = {
    //             pathname: '/ListDetail',
    //             query: data,
    //         }
    //     } else if (type == "KSD") {
    //         var path = {
    //             pathname: '/ListDetailKSD',
    //             query: data,
    //         }
    //     } else {
    //         Toast.info("数据错误", 2)
    //     }
    //     hashHistory.push(path);
    // },

    logoError: function (event) {
        event.target.src = "src/img/icon/logo.png";
        event.target.onerror = null; //控制不要一直跳动 
        //console.log(event.target.src);
    },

    toList: function (event) {
        const tag = event.currentTarget.getAttribute("data-tag");
        const txt = event.currentTarget.getAttribute("data-txt");
        const tagId = event.currentTarget.getAttribute("data-tagId");
        const data = { tag: tagId, tagId: tagId, txt: txt };
        const path = {
            pathname: '/List',
            state: data
        }
        hashHistory.push(path);
    },

    loankindHandle: function (event) {
        var activeLoanId = event.currentTarget.getAttribute("data-activeLoanId");
        this.setState({
            activeLoanId: activeLoanId
        }, () => { this.loadData(); })
        localStorage.setItem("activeLoanId", activeLoanId);
    },


    componentDidMount: function () {
        var key1 = globalData.key;
        var toast = globalData.toast;
        var that = this;

        var activeLoanId = localStorage.getItem("activeLoanId");
        if (activeLoanId) {
            that.setState({
                activeLoanId: activeLoanId
            }, () => { that.loadData(); })
        }else{
        	that.ksd()
        }

        var homeTag = sessionStorage.getItem("homeTag");
        if (homeTag) {
            var tagdata = JSON.parse(homeTag);
            //console.log(tagdata);
            // for (var i in tagdata) {
            //     that.state.tagArr.push(
            //         <li key={i} data-tag={tagdata[i].tagNo} data-txt={tagdata[i].tagName} data-tagId={tagdata[i].tagId} onClick={that.toList}>
            //             <img src={imgPath + tagdata[i].tagPic} />
            //             <p>{tagdata[i].tagName}</p>
            //         </li>)
            // }
            // that.setState({ tagArr: that.state.tagArr })
        } else {
        
        }

    },
    goTask(){
        var path = {
            pathname: '/taskDetail',
        }
        hashHistory.push(path);
    },
    //（理财任务）
    jzd: function () {
        var key1 = globalData.key;
        var toast = globalData.toast;
        var that = this;
        var homeLoanJZD = sessionStorage.getItem("homeLoanJZD");
        const arr=(
            <div className="notask">
                <img src="src/img/icon/task-icon1.png" alt=""/> 
                <p>暂无任务</p>
            </div>
        )
        that.setState({
            listJZD: arr
        })
       
    },
    //（贷款任务）
    ksd: function () {
        var key1 = globalData.key;
        var toast = globalData.toast;
        var that = this;
        var homeLoanKSD = sessionStorage.getItem("homeLoanKSD");
        if (homeLoanKSD) {
            var loanList = JSON.parse(homeLoanKSD);
            var arr = [];
           // console.log(loanList)
            for (var i in loanList) {
                arr.push(
                  
                    <ul className="tasklist">
                        <li>
                            <img src="src/img/icon/product1.png" />
                            <div className="loanTitle">
                                <p>任务名称</p>
                                <p><span>任务奖励</span>：完成任务可获得<span>500</span>积分</p>
                            </div>
                            <div className="high">
                                <p onClick={this.goTask}>查看任务  </p>
                                <p>已领取</p>
                            </div>
                        </li>
                        <li>
                            <img src="src/img/icon/product1.png" />
                            <div className="loanTitle">
                                <p>任务名称</p>
                                <p><span>任务奖励</span>：完成任务可获得<span>500</span>积分</p>
                            </div>
                            <div className="high">
                                <p>
                                    查看任务    
                                </p>
                                <p>未领取</p>
                            </div>
                        </li>
                    </ul>
                )
            }

            that.setState({
                listKSD: arr
            })
        } else {
           
        }


    },


    loadData: function () {
        var that = this;
        var key1 = globalData.key;
        var toast = globalData.toast;
        var activeLoanId = that.state.activeLoanId;
        //console.log(activeLoanId);
        if (activeLoanId == "1") {//精准贷
            that.jzd()
        } else {//快速贷
            that.ksd()
        }

    },

    render: function () {
        var that = this;
        var curCity = that.props.location.query.cityId;
        var activeLoanId = that.state.activeLoanId;
        //var capitalHtml=activeLoanId=="0"?"":that.state.list
        
        return (
            <div className="app_Box task">
                <header>任务中心</header>
                <div className="content">
                    <div className="loankind">
                        <div className="loankindTab">
                            <p data-activeLoanId="0" className={activeLoanId == "0" ? "activeLoan" : ""} onClick={that.loankindHandle}>贷款任务</p>
                            <p data-activeLoanId="1" className={activeLoanId == "1" ? "activeLoan" : ""} onClick={that.loankindHandle}>理财任务</p>
                        </div>
                    </div>
                    <div className="empty"></div>
                    {/* <div style={{ "display": activeLoanId == "0" ? "none" : "block" }}>
                        <ul className="homeTab" >
                            {that.state.tagArr}
                        </ul>
                    </div> */}
                    <div className="capitalBox">
                        {activeLoanId == "0" ? that.state.listKSD : that.state.listJZD}
                    </div>
                    <Loading flag={that.state.isLoading} />
                </div>
                <Footer activeIndex="2" />
            </div>
        )
    }
});


export default Loan;


