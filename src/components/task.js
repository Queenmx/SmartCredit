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
            listKSD: [],//贷款任务
            listJZD: []//理财任务
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
        var phone=JSON.parse(localStorage.getItem("user")).phone;
        var that = this;

        var activeLoanId = localStorage.getItem("activeLoanId");       
        api.taskcenter(phone,function(res){
            if(res.code=='0000'){
                var result= JSON.parse(strDec(res.data, key1, "", ""));                
                that.setState({
                    tasks:result.tasks,//未领取理财任务
                    myTasks:result.myTasks,//已领取理财任务
                    tasksLoan:result.tasksLoan,// 未领取贷款
                    myTasksLoan:result.myTasksLoan//已领取贷款
                })
                console.log(result)
                var arr1=result.tasks.map(function(item,i){//未领取理财任务
                        return (
                            <li key={item.id}>
                                <img src={imgPath+item.url} />
                                <div className="loanTitle">
                                    <p>{item.taskName}</p>
                                    <p><span>任务奖励</span>：完成任务可获得<span>{item.taskMoney}</span>积分</p>
                                </div>
                                <div className="high">
                                    <p onClick={that.goTask.bind(that,item.id,item.taskName)}>查看任务</p>
                                    <p className="geting">未领取</p>
                                </div>
                            </li>
                        )
                })
                var arr2=result.myTasks.map(function(item,i){//已领取理财任务
                    return (
                        <li key={item.id}>
                                <img src={imgPath+item.url} />
                                <div className="loanTitle">
                                    <p>{item.taskName}</p>
                                    <p><span>任务奖励</span>：完成任务可获得<span>{item.taskMoney}</span>积分</p>
                                </div>
                                <div className="high">
                                    <p onClick={that.goTask.bind(that,item.id,item.taskName)}>查看任务</p>
                                    <p>已领取</p>
                                </div>
                            </li>
                    )
                })
                var daikuan1=result.tasksLoan.map(function(item,i){//贷款未领取
                    return (
                        <li key={item.id}>
                            <img src={imgPath+item.url} />
                            <div className="loanTitle">
                                <p>{item.taskName}</p>
                                <p><span>任务奖励</span>：完成任务可获得<span>{item.taskMoney}</span>积分</p>
                            </div>
                            <div className="high">
                                <p onClick={that.goTask.bind(that,item.id,item.taskName)}>查看任务</p>
                                <p className="geting">未领取</p>
                            </div>
                        </li>
                    )
                })
                var daikuan2=result.myTasksLoan.map(function(item,i){//贷款已领取
                    return (
                        <li key={item.id}>
                            <img src={imgPath+item.url} />
                            <div className="loanTitle">
                                <p>{item.taskName}</p>
                                <p><span>任务奖励</span>：完成任务可获得<span>{item.taskMoney}</span>积分</p>
                            </div>
                            <div className="high">
                                <p onClick={that.goTask.bind(that,item.id,item.taskName)}>查看任务</p>
                                <p>已领取</p>
                            </div>
                        </li>
                    )
                })
                const notask=(
                    <div className="notask">
                        <img src="src/img/icon/task-icon1.png" alt=""/> 
                        <p>暂无任务</p>
                    </div>
                )
                if(result.tasks.length||result.myTasks.length){
                    that.setState({                        
                        listJZD:arr1.concat(arr2),
                    })    
                }else{
                    that.setState({                        
                        listJZD:notask
                    })
                }
                if(result.tasksLoan.length||result.myTasksLoan.length){
                    that.setState({                        
                        listKSD:daikuan1.concat(daikuan2),
                    })    
                }else{
                    that.setState({                        
                        listKSD:notask
                    })
                }
                
            }else{
                Toast.info(res.msg,2);
            }
        })
        if (activeLoanId) {
            that.setState({
                activeLoanId: activeLoanId
            }, () => { that.loadData(); })
        }else{
        	that.ksd()
        }
<<<<<<< HEAD

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

=======
>>>>>>> be3696872d318247c9a46ac4ca4677b37aee2c76
    },
    goTask(id,name){
        // console.log(id,name)
        var path = {
            pathname: '/taskDetail',
            query:{id:id,taskName:name}
        }
        hashHistory.push(path);
    },
<<<<<<< HEAD
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
=======
    //理财任务
    jzd: function () {
        var key1 = globalData.key;
        var toast = globalData.toast;
        var that = this;     
    },
    //贷款任务
>>>>>>> be3696872d318247c9a46ac4ca4677b37aee2c76
    ksd: function () {
        var key1 = globalData.key;
        var toast = globalData.toast;
        var that = this;
<<<<<<< HEAD
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


=======
>>>>>>> be3696872d318247c9a46ac4ca4677b37aee2c76
    },


    loadData: function () {
        var that = this;
        var key1 = globalData.key;
        var toast = globalData.toast;
        var activeLoanId = that.state.activeLoanId;
        //console.log(activeLoanId);
        if (activeLoanId == "1") {//理财任务
            that.jzd()
        } else {//贷款任务
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
                        <ul className="tasklist">
                            {activeLoanId == "0" ? that.state.listKSD : that.state.listJZD}
                        </ul>
                    </div>
                    <Loading flag={that.state.isLoading} />
                </div>
                <Footer activeIndex="2" />
            </div>
        )
    }
});


export default Loan;


