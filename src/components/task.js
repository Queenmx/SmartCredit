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
    toListDetail: function (event) {
        var loanId = event.currentTarget.getAttribute("data-loanId");
        var type = event.currentTarget.getAttribute("data-type");
        var data = { loanId: loanId };
        if (type == "JZD") {
            var path = {
                pathname: '/ListDetail',
                query: data,
            }
        } else if (type == "KSD") {
            var path = {
                pathname: '/ListDetailKSD',
                query: data,
            }
        } else {
            Toast.info("数据错误", 2)
        }
        hashHistory.push(path);
    },

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
            api.tag("BQ", function (res) {
                //console.log(res)
                if (res.code == "0000") {
                    var tagdata = JSON.parse(strDec(res.data, key1, "", ""));
                    //console.log(tagdata);
                    sessionStorage.setItem("homeTag", JSON.stringify(tagdata));
                    // for (var i in tagdata) {
                    //     that.state.tagArr.push(
                    //         <li key={i} data-tag={tagdata[i].tagNo} data-txt={tagdata[i].tagName} data-tagId={tagdata[i].tagId} onClick={that.toList}>
                    //             <img src={imgPath + tagdata[i].tagPic} />
                    //             <p>{tagdata[i].tagName}</p>
                    //         </li>)
                    // }
                    // that.setState({ tagArr: that.state.tagArr })
                } else {
                    Toast.info(res.msg, 2);
                }

            }, function () {
                Toast.info("连接错误", 2);
            })
        }

    },
    goTask(){
        var path = {
            pathname: '/taskDetail',
        }
        hashHistory.push(path);
    },
    //精准贷（理财任务）
    jzd: function () {
        //console.log("精准贷")
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
        // if (homeLoanJZD) {
        //     var loanList = JSON.parse(homeLoanJZD);
        //     var arr = [];
        //     //console.log(loanList)
        //     for (var i in loanList) {
        //         var theDate = loanList[i].limitType;
        //         var theDateTxt;
        //         switch (theDate) {
        //             case "Y":
        //                 theDateTxt = "年"
        //                 break;
        //             case "M":
        //                 theDateTxt = "月"
        //                 break;
        //             case "D":
        //                 theDateTxt = "日"
        //                 break;
        //             default:
        //                 break;
        //         }
        //          var theDateRate = loanList[i].rateType;
        //         var theDateRateTxt;
        //         switch (theDateRate) {
        //             case "Y":
        //                 theDateRateTxt = "年"
        //                 break;
        //             case "M":
        //                 theDateRateTxt = "月"
        //                 break;
        //             case "D":
        //                 theDateRateTxt = "日"
        //                 break;
        //             default:
        //                 break;
        //         }
        //         arr.push(
        //             // <div className="capitalList" key={i} data-loanId={loanList[i].loanId} data-type={loanList[i].type} onClick={that.toListDetail}>
        //             //     <h3>
        //             //         <img src={imgPath + loanList[i].logo} onError={that.logoError} />
        //             //         <span>{loanList[i].loanName}</span>
        //             //     </h3>
        //             //     <div className="capitalInfo">
        //             //         <div className="limit">
        //             //             <h2>{loanList[i].moneyMin}~{loanList[i].moneyMax}</h2>
        //             //             <p>额度范围(元)</p>
        //             //         </div>
        //             //         <ul className="special">
        //             //             <li>{loanList[i].loanTime}</li>
        //             //             <li>{theDateRateTxt}费率{loanList[i].rate}%</li>
        //             //             <li>贷款期限{loanList[i].limitMin}-{loanList[i].limitMax}{theDateTxt}</li>
        //             //         </ul>
        //             //         <div className="apply">
        //             //             <a href="javascript:;" >申请贷款</a>
        //             //         </div>
        //             //     </div>
        //             // </div>
                   

        //         )
        //     }

        //     that.setState({
        //         listJZD: arr
        //     })
        // } else {
        //     api.loanList(1, 30, "", "JZD", function (res) {
        //         if (res.code == "0000") {
        //             var data = JSON.parse(strDec(res.data, key1, "", ""));
        //             //var data=res.data;
        //             var loanList = data.list;
		// 			//console.log(loanList)
        //             sessionStorage.setItem("homeLoanJZD", JSON.stringify(loanList));
        //             var arr = [];
        //             for (var i in loanList) {
        //                 var theDate = loanList[i].limitType;
        //                 var theDateTxt;
        //                 switch (theDate) {
        //                     case "Y":
        //                         theDateTxt = "年"
        //                         break;
        //                     case "M":
        //                         theDateTxt = "月"
        //                         break;
        //                     case "D":
        //                         theDateTxt = "日"
        //                         break;
        //                     default:
        //                         break;
        //                 }
        //                   var theDateRate = loanList[i].rateType;
        //         var theDateRateTxt;
        //         switch (theDateRate) {
        //             case "Y":
        //                 theDateRateTxt = "年"
        //                 break;
        //             case "M":
        //                 theDateRateTxt = "月"
        //                 break;
        //             case "D":
        //                 theDateRateTxt = "日"
        //                 break;
        //             default:
        //                 break;
        //         }
        //                 arr.push(<div className="capitalList" key={i} data-loanId={loanList[i].loanId} data-type={loanList[i].type} onClick={that.toListDetail}>
        //                     <h3>
        //                         <img src={imgPath + loanList[i].logo} onError={that.logoError} />
        //                         <span>{loanList[i].loanName}</span>
        //                     </h3>
        //                     <div className="capitalInfo">
        //                         <div className="limit">
        //                             <h2>{loanList[i].moneyMin}~{loanList[i].moneyMax}</h2>
        //                             <p>额度范围(元)</p>
        //                         </div>
        //                         <ul className="special">
        //                             <li>{loanList[i].loanTime}</li>
        //                             <li>{theDateRateTxt}利率{loanList[i].rate}%</li>
        //                             <li>贷款期限{loanList[i].limitMin}-{loanList[i].limitMax}{theDateTxt}</li>
        //                         </ul>
        //                         <div className="apply">
        //                             <a href="javascript:;">申请贷款</a>
        //                         </div>
        //                     </div>

        //                 </div>)
        //             }

        //             that.setState({
        //                 listJZD: arr
        //             })

        //         } else {
        //             Toast.info("连接错误", 2);
        //         }
        //     }, function () {
        //         Toast.info("连接错误", 2);
        //     })
        // }
    },
    //快速贷（贷款任务）
    ksd: function () {
        //console.log("快速贷")
        var key1 = globalData.key;
        var toast = globalData.toast;
        var that = this;
        var homeLoanKSD = sessionStorage.getItem("homeLoanKSD");
        if (homeLoanKSD) {
            var loanList = JSON.parse(homeLoanKSD);
            var arr = [];
           // console.log(loanList)
            for (var i in loanList) {
                var theDate = loanList[i].limitType;
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
                 var theDateRate = loanList[i].rateType;
                var theDateRateTxt;
                switch (theDateRate) {
                    case "Y":
                        theDateRateTxt = "年"
                        break;
                    case "M":
                        theDateRateTxt = "月"
                        break;
                    case "D":
                        theDateRateTxt = "日"
                        break;
                    default:
                        break;
                }
                arr.push(
                    // <div className="capitalList" key={i} data-loanId={loanList[i].loanId} data-type={loanList[i].type} onClick={that.toListDetail}>
                    //     <h3>
                    //         <img src={imgPath + loanList[i].logo} onError={that.logoError} />
                    //         <span>{loanList[i].loanName}</span>
                    //     </h3>
                    //     <div className="capitalInfo">
                    //         <div className="limit">
                    //             <h2>{loanList[i].moneyMin}~{loanList[i].moneyMax}</h2>
                    //             <p>额度范围(元)</p>
                    //         </div>
                    //         <ul className="special">
                    //             <li>{loanList[i].loanTime}</li>
                    //             <li>{theDateRateTxt}费率{loanList[i].rate}%</li>
                    //             <li>贷款期限{loanList[i].limitMin}-{loanList[i].limitMax}{theDateTxt}</li>
                    //         </ul>
                    //         <div className="apply">
                    //             <a href="javascript:;" >申请贷款</a>
                    //         </div>
                    //     </div>
                    // </div>
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
            api.loanList(1, 30, "", "KSD", function (res) {
                if (res.code == "0000") {
                    var data = JSON.parse(strDec(res.data, key1, "", ""));
                    //var data=res.data;
                    var loanList = data.list;
					//console.log(loanList);
                    sessionStorage.setItem("homeLoanKSD", JSON.stringify(loanList));
                    var arr = [];
                    for (var i in loanList) {
                        var theDate = loanList[i].limitType;
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
                        
                         var theDateRate = loanList[i].rateType;
                var theDateRateTxt;
                switch (theDateRate) {
                    case "Y":
                        theDateRateTxt = "年"
                        break;
                    case "M":
                        theDateRateTxt = "月"
                        break;
                    case "D":
                        theDateRateTxt = "日"
                        break;
                    default:
                        break;
                }
                        arr.push(<div className="capitalList" key={i} data-loanId={loanList[i].loanId} data-type={loanList[i].type} onClick={that.toListDetail}>
                            <h3>
                                <img src={imgPath + loanList[i].logo} onError={that.logoError} />
                                <span>{loanList[i].loanName}</span>
                            </h3>
                            <div className="capitalInfo">
                                <div className="limit">
                                    <h2>{loanList[i].moneyMin}~{loanList[i].moneyMax}</h2>
                                    <p>额度范围(元)</p>
                                </div>
                                <ul className="special">
                                    <li>{loanList[i].loanTime}</li>
                                    <li>{theDateRateTxt}利率{loanList[i].rate}%</li>
                                    <li>贷款期限{loanList[i].limitMin}-{loanList[i].limitMax}{theDateTxt}</li>
                                </ul>
                                <div className="apply">
                                    <a href="javascript:;">申请贷款</a>
                                </div>
                            </div>

                        </div>)
                    }

                    that.setState({
                        listKSD: arr
                    })

                } else {
                    Toast.info("连接错误", 2);
                }
            }, function () {
                Toast.info("连接错误", 2);
            })
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


