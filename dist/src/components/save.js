'use strict';
// import React from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import { hashHistory, Link } from 'react-router';
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'reactjs-iscroll';
import { Modal,Toast } from 'antd-mobile';
var imgPath = globalData.imgPath;
var Save = React.createClass({

    getInitialState: function () {
        return {
            rightBtn: "编辑",
            isShow: false,
            activeSaveTab: 0,
            display: "none",
            mask: "none",
            list: [],
            list1: [],
            currentPage: 1,
            pageSize: 10
        }
    },


    toNewsDetail: function (id) {
        var data = { articleId: id };
        var path = {
            pathname: '/NewsDetail',
            query: data,
        }
        hashHistory.push(path);
    },
    toBack: function () {
        localStorage.removeItem("newsDetailTab");
        const backRouter = this.props.backRouter;
        if (backRouter) {
            hashHistory.push(backRouter);
            /*hashHistory.push({  
                  pathname: '/Mine',  
                  query: {  
                      name:'qin',  
                      price:'100'  
                  }  
              })  */

        } else {
            //window.history.back()
            history.go(-1);
        }


    },
    toListDetail: function (id) {
        //var loanId=event.target.getAttribute("data-loanId");
        var data = { loanId: id };
        var path = {
            pathname: '/ListDetail',
            query: data,
        }
        hashHistory.push(path);
    },
    saveTab: function (e) {
        var id = e.target.id * 1;
        this.setState({
            activeSaveTab: id,
        })
        localStorage.setItem("newsDetailTab", id);
        this.loadData();
    },
    logoError: function (event) {
        event.target.src = "src/img/icon/capitalLogo.jpg";
        event.target.onerror = null; //控制不要一直跳动 
        //console.log(event.target.src);
    },
	/*edit:function(){
		var that=this;
		that.setState({
			display:"block"
		})
		console.log(that.state.display)
	},*/
	/*agreeRule:function(event){
		console.log(event.target.checked);
		this.setState({
			checked:event.target.checked
		})
	},*/
    longPress: function (id) {
        //console.log(id)
        this.setState({
            id: id,
            mask: 'block'
        })
        //console.log("long")
    },
    componentWillMount: function () {
        var that = this;
        var timeout = undefined;
    },

    cancelHandle: function () {
        // var toast = globalData.toast;
        //Toast.info("进来",1000);
        this.setState({
            mask: 'none'
        })
        //console.log(this.state.id);
    },
    sureHandle: function () {
        var that = this;
        var key1 = globalData.key;
        // var toast = globalData.toast;
        //Toast.info("进来",1000);
        api.delSave(that.state.id, "mySave", function (res) {
            //console.log(res);
            if (res.code == "0000") {
                that.setState({
                    mask: 'none'
                })
                that.loadData();
                var data = JSON.parse(strDec(res.data, key1, "", ""));
                //console.log(data);
            } else if (res.code == "5555") {
                that.setState({
                    mask: 'none'
                })
                Toast.info("登录过时，请重新登录", 2);
                var path = {
                    pathname: '/Login',
                }
                hashHistory.push(path);
            } else {
                that.setState({
                    mask: 'none'
                })
                Toast.info(res.msg, 2);
            }
        }, function () {
            that.setState({
                mask: 'none'
            })
            Toast.info("连接错误", 2);
        })

        //console.log(this.state.id);
    },
    render: function () {
        var that = this;
        var activeSaveTab = that.state.activeSaveTab;
        var saveCapitalCon = [];
        var saveNewsCon = [];
        saveCapitalCon.push(<div key={Math.random()}><ReactIScroll iScroll={iScroll} handleRefresh={that.handleRefresh} >
            <div className="capitalBox" id="capitalBox">
                {that.state.list}
            </div></ReactIScroll></div>)

        saveNewsCon.push(<div key={Math.random()}><ReactIScroll iScroll={iScroll} handleRefresh={that.handleRefresh} >
            <div className="newsBox" id="newsBox" >
                {that.state.list1}
            </div></ReactIScroll></div>)

        return (
            <div className="app_Box save">
                <div className="header">
                    <div className="toBack" onClick={this.toBack}><img src="src/img/icon/back.png" /></div>
                    <p className="title">我的收藏</p>
                    <div className="headerLinkBtn"></div>
                    {/*<div className="headerLinkBtn">{that.state.rightBtn}</div>*/}
                </div>
                <div className="content saveCon">
                    <ul className="saveTab">
                        <li key="li1" className={activeSaveTab == 0 ? "activeSaveTab" : ""} onClick={that.saveTab} id="0">贷款</li>
                        <li key="li2" className={activeSaveTab == 1 ? "activeSaveTab" : ""} onClick={that.saveTab} id="1">资讯</li>
                    </ul>
                    <div className="saveConBox">
                        {activeSaveTab == "0" ? saveCapitalCon : saveNewsCon}
                    </div>

                </div>

                {/*<div className="saveBot">
	        		<div className="checkInput">
						<input className="magic-checkbox" type="checkbox"  id="ruleCheck"   />
						<label htmlFor="ruleCheck">全选</label>
					</div>
					<p>取消收藏</p>
	        	</div>*/}
                <div className="mask" style={{ "display": that.state.mask }}>
                    <div className="cancelSaveBox">
                        <div className="note">提示<p>你确定要删除吗?</p></div>
                        <div className="cancelSaveDiv"><span onClick={that.cancelHandle}>取消</span><span onClick={that.sureHandle}>确定</span></div>
                    </div>
                </div>


            </div>
        )

	},
	
	touchStart:function(event){
		 event.stopPropagation();
		var markId=event.currentTarget.getAttribute("data-articleid");
		//console.log(markId);
		this.setState({isLong:false})
 		this.timeout = setTimeout(function(){
	 		this.longPress(markId);
	 		this.setState({isLong:true})
	 	}.bind(this), 800);  //长按时间超过800ms，则执行传入的方法
		
	},
	touchEndLoan:function(event){
		clearTimeout(this.timeout);  //长按时间少于800ms，不会执行传入的方法
		event.stopPropagation();
		 if(!this.state.isLong){
		 	var detailId=event.currentTarget.getAttribute("data-id");
			this.toListDetail(detailId);
		 }
	},
	touchEndArticle:function(event){
		clearTimeout(this.timeout);  //长按时间少于800ms，不会执行传入的方法
		 event.stopPropagation();
		 if(!this.state.isLong){
		 	var detailId=event.currentTarget.getAttribute("data-id");
			this.toNewsDetail(detailId);
		 }
		
	},
	toLoanDetail:function(event){
		var detailId=event.currentTarget.getAttribute("data-id");
		 var type = event.currentTarget.getAttribute("data-type");
		 
		var data = {loanId:detailId};
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
	toZiDetail:function(event){
		var detailId=event.currentTarget.getAttribute("data-id");
			var data = {articleId:detailId};
			var path = {
			  pathname:'/NewsDetail',
			  query:data,
			}
			hashHistory.push(path);
	},
	loadData:function(downOrUp,callback) {
  		var that=this;
  		var key1 = globalData.key;
		//var toast=globalData.toast;
		var tag=that.props.tag;
	 	const {currentPage,pageSize,list,list1} = that.state;
	 	var arr=[];
	 	var newsDetailTab= localStorage.getItem("newsDetailTab");
	 //	//console.log(newsDetailTab+typeof newsDetailTab);
	 	if(newsDetailTab=="1"){//资讯
	 		//console.log("new")
	 		api.saveArticle(currentPage,pageSize,function(res){
	 			if(res.code=="0000"){
					var data =JSON.parse(strDec(res.data,key1,"",""));
					//console.log(data);
					var articleList=data.list;
					var total=data.total;
					var articleArr=[];
					//console.log(articleList)
					for(var i in articleList){
						//articleArr.push(<dl className="newsList" data-id={articleList[i].articleId} data-articleid={articleList[i].markId} key={Math.random()}  onTouchStart={that.touchStart} onTouchEnd={that.touchEndArticle}>
						articleArr.push(<dl className="newsList" data-id={articleList[i].articleId} data-articleid={articleList[i].markId} key={Math.random()} onClick={that.toZiDetail}>
	    							<dd>
	    								<h4>{articleList[i].articleTitle}</h4>
	    								<p><span>{articleList[i].addTime}</span> <span>{articleList[i].readerNum}阅读</span></p>
	    							</dd>
	    							<dt>
	    								<img src={imgPath + articleList[i].imgUrl} onError={that.logoError} />
	    							</dt>
	    					</dl>)
					}
					if(downOrUp=='up'){
						var c=list1.concat(articleArr);
					}else{
						var c=articleArr;
					}
					that.setState({
						total:total,
						list1:c
					})
					if (callback && typeof callback === 'function') {
			            callback();
			          }
				}else if(res.code=="5555"){
					Toast.info("登录过时，请重新登录",2);
					var path = {
					  pathname:'/Login',
					}
					hashHistory.push(path);
				}else{
					Toast.info(res.msg,2);
				}
	 		},function(){
				Toast.info("连接错误",2);
			})
	 	}else{//贷款
	 		//console.log("dai")
		 	api.saveLoan(currentPage,pageSize,function(res){
				//console.log(res);
				if(res.code=="0000"){
					var data =JSON.parse(strDec(res.data,key1,"",""));
					var loanList=data.list;
					var total=data.total;
					//console.log(data);
					for(var i in loanList){
						var theDateTxt;
						 var theDate = loanList[i].limitType;
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
						//arr.push(<div className="capitalList" data-id={loanList[i].loanId} data-articleid={loanList[i].markId} key={Math.random()}  onTouchStart={that.touchStart} onTouchEnd={that.touchEndLoan}>
						arr.push(<div className="capitalList" data-id={loanList[i].loanId} data-articleid={loanList[i].markId} data-type={loanList[i].type}  key={Math.random()} onClick={that.toLoanDetail}>
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
		        						<li>{theDateRateTxt}费率{loanList[i].rate}%</li>
		        						<li>贷款期限{loanList[i].limitMin}-{loanList[i].limitMax}{theDateTxt}</li>
		        					</ul>
		        					<div className="apply">
		        						<a  data-loanId={loanList[i].loanId}>申请贷款</a>
		        					</div>
		        				</div>
		        				
		        			</div>)
					}
					if(downOrUp=='up'){
						var c=list.concat(arr);
					}else{
						var c=arr;
					}
					that.setState({
						total:total,
						list:c
					})
					if (callback && typeof callback === 'function') {
			            callback();
			          }
					
				}else if(res.code=="5555"){
					Toast.info("登录过时，请重新登录",2);
					var path = {
					  pathname:'/Login',
					}
					hashHistory.push(path);
				}else{
					Toast.info(res.msg,2);
				}
			},function(){
				Toast.info("连接错误",2);
			})
		 }		
	 	
       },

handleRefresh:function(downOrUp, callback) {
	    //真实的世界中是从后端取页面和判断是否是最后一页
	    var that=this;
	    let {currentPage, lastPage,pageSize,total} = that.state;
	    var totalPage=Math.ceil(total/pageSize);
	    //console.log(totalPage);
		    if (downOrUp === 'up') { // 加载更多
		      if (currentPage == totalPage) {
		      	//console.log("zuihou")
		        lastPage = true;
		        	if (callback && typeof callback === 'function') {
			            callback();
			          }
		      } else {
		        currentPage++;
		        //console.log(currentPage);
		        lastPage = false;
		        that.setState({
			      currentPage,
			      lastPage
			    }, () => {
			      that.loadData(downOrUp, callback);
				});
		      }
		    } else { // 刷新
		      lastPage = false;
		      currentPage = 1;
		        that.setState({
			      currentPage,
			      lastPage
			    }, () => {
			      that.loadData(downOrUp, callback);
				});
		    }
	  
  },
	componentDidMount:function(){
		var that=this;
		var newsDetailTab= localStorage.getItem("newsDetailTab");
		if(newsDetailTab){
			that.setState({
				activeSaveTab:newsDetailTab
			})
		}
		
		that.loadData();
	
	},
	componentWillUnMount:function(){
		window.removeEventListener('touchstart');
		window.removeEventListener('touchend');
	}
});


export default Save;


