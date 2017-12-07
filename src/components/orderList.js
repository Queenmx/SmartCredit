'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'reactjs-iscroll';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import '../sass/order.scss';


var OrderList = React.createClass({
    getInitialState: function () {
        return {
            //btnActive: 0,
            flag: true,
            pageNum: 1,
            list: [],
            orderList: [],
            currentPage: 1,
	      	lastPage: false,
			pageSize:10,
			scrollShow:false,
			status: {
                "PENDING": {
                	"btnTwo":false,
                	"-2":"删除订单",
                	"1":"取消借款",
                    "text": "待处理",
                    "dataId": 1
                },
                "APRING": {
                	"btnTwo":false,
                	"-2":"删除订单",
                	"1":"取消借款",
                    "text": "待审核",
                    "dataId": 2
                },
                "APRNO": {
                	"btnTwo":false,
                	"-2":"删除订单",
                	"1":"取消借款",
                    "text": "审核不通过",
                    "dataId": 3
                },
                "APRYES": {
                	"btnTwo":true,
                	"1":"取消借款",
                	"2":"绑卡签约",
                    "text": "审核通过",
                    "dataId": 4
                }
            },
            name: {
                KSD: '快速贷',
                JZD: '精准贷'
            },
            rate: {
                D: '日',
                M: '月',
                Y: '年'
            }
       }
    },
    componentWillMount:function(){
    	var that=this;
    	var statusType=that.props.statusType;
    	console.log(statusType);
    },
   logoError:function(event){
	    	event.target.src="src/img/icon/logo.png";
			event.target.onerror=null; //控制不要一直跳动 
 	},
	handleRefresh:function(downOrUp, callback) {
    //真实的世界中是从后端取页面和判断是否是最后一页
    var that=this;
    let {currentPage, lastPage,pageSize,totalPage} = that.state;
    
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
  
   /* toCancel: function (e) {
    	var btn=e.target;
        var that = this;
       	e.stopPropagation();
        var key1 = globalData.key;
		var toast=globalData.toast;
		var $e=e.target;
        // //console.log(e.target)
        var id = e.target.getAttribute('data-id');//id=1 取消订单，id=-2 删除订单 ,id=3 签约
        console.log(id);
            api.cancleOrder(that.orderList[id].applyId, function (res) {
            	//console.log(res);
                if (res.code == "0000") {
                	toast.show("取消订单成功",2000);
                   btn.style.backgroundColor = "#DDDDDD";
                  // btn.style.display = "none";
                  $($e).parents("li").find(".orderNum span:nth-child(2)").html("已取消");                   
                }else{
                	toast.show(res.msg,2000);
                }
            })
       
    },*/
    toCancel: function (status,applyId,e) {
    	//var btn=e.target;
        var that = this;
       	e.stopPropagation();
        var key1 = globalData.key;
		var toast=globalData.toast;
		//var $e=e.target;
        // //console.log(e.target)
       // var id = e.target.getAttribute('data-id');//id=1 取消订单，id=-2 删除订单 ,id=3 签约
        console.log(status);
        if(status==1){
        	 api.cancleOrder(applyId, function (res) {
            	console.log(res);
                if (res.code == "0000") {
                	toast.show("取消订单成功",2000);
                  // btn.style.backgroundColor = "#DDDDDD";
                  // btn.style.display = "none";
                  //$($e).parents("li").find(".orderNum span:nth-child(2)").html("已取消");                   
                }else{
                	toast.show(res.msg,2000);
                }
            })
        }else if(status==-2){
        	console.log("删除订单");
        	
        }else if(status==3){
        	console.log("签约");
        }
           
       
    },
    formateMoney: function (money) {
        if (money % 100 === 0) {
            return (money / 100).toFixed(2)
        } else {
            return money / 100.0
        }
    },
    toOrderDetail:function(event){
    	var applyId=event.currentTarget.getAttribute("data-applyId");
    	const path = {
		  pathname:'/orderDetail',
		  query:{applyId:applyId}
		}
		hashHistory.push(path);
    	
    },
      loadData:function(downOrUp,callback) {
  		var that=this;
  		var key1 = globalData.key;
		var toast=globalData.toast;
		var tag=that.props.tag;
	 	const {currentPage,pageSize,list} = that.state;
	 	var arr=[];
	 	////console.log(tag);
	 	console.log(that.state.status)
	 	console.log(that.state.status.APRNO.btnTwo)
	 	 api.orderList(currentPage, pageSize, "", function (res) {
            if (res.code == "0000") {
            	that.setState({
					flag:false
				})
                var data = JSON.parse(strDec(res.data, key1, "", "") || []);
                var orderList = data.list;
                    console.log(orderList)
                that.orderList = data.list
                var total=data.total;
				var totalPage=Math.ceil(total/pageSize);
				if(totalPage>1){
					that.setState({scrollShow:true})
				}
                //console.log(data);
                if(orderList.length<1){
					arr.push(<div key={Math.random()} style={{'textAlign':'center','lineHeight':'1rem'}}>暂无订单</div>)
				}else{
					
	                for (var i in orderList) {
	                    var status = orderList[i].status;
	                    var applyStatus=orderList[i].applyStatus;
	                    arr.push(<li key={Math.random()} data-applyId={orderList[i].applyId} onClick={that.toOrderDetail}>
	                        <div className="orderNum">
	                            <span>订单号：{orderList[i].applyNo}</span>
	                            <span  className="order_n">{status==-2?"已取消":that.state.status[applyStatus].text}</span>
	                        </div>
	                        <h3 className="list_title">
	                            <img src={'http://xrjf.oss-cn-shanghai.aliyuncs.com/' + orderList[i].logo} onError={that.logoError}/>
	                            <span>{orderList[i].loanName}</span>
	                            <span className="p_name">{that.state.name[orderList[i].loanType]}</span>
	                        </h3>
	                        <ul className="container">
	                            <li>借款金额 {that.formateMoney(orderList[i].money)}元</li>
	                            <li>期限{orderList[i].limitDay}{that.state.rate[orderList[i].limitType]}</li>
	                            <li>利息{that.formateMoney(orderList[i].interest)}元</li>
	                            <li>费用{orderList[i].fee}元</li>
	                        </ul>
	                        <div className="listFoot">
	                            <span className="status">您的贷款申请已提交，我们会尽快处理</span>
	                            {/*<span onClick={that.toCancel} className='statusBtn' data-id={i} style={{ backgroundColor: status < 0 ? 'rgb(221, 221, 221)' : '#53a6ff' ,'display':orderList[i].applyStatus== "APRYES"||orderList[i].applyStatus== "APRNO"? 'none':'block'}}>*/}
	                            <span onClick={that.toCancel.bind(that,status,orderList[i].applyId)} className='statusBtn' >
	                            	{that.state.status[applyStatus][status]}
	                            </span>
	                             <span onClick={that.toCancel.bind(that,3,orderList[i].applyId)} className='statusBtn'  style={{"display":that.state.status[applyStatus].btnTwo? 'block':'none'}}>
	                            	绑卡签约
	                            </span>
	                        </div>
	                    </li >)
	                }
               }
                if(downOrUp=='up'){
					var c=list.concat(arr);
				}else{
					var c=arr;
				}
				that.setState({
					totalPage:totalPage,
					list:c
				})
				if (callback && typeof callback === 'function') {
		            callback();
		          }
            }else{
            	that.setState({
						flag:false
					})
				toast.show(res.msg,2000);
			}
        }, function () {
        	that.setState({
        	flag:false
        })
            toast.show("连接错误", 2000);
        })

	
       },
    componentDidMount: function () {
        var that = this;
		that.loadData();
    },
   
    render: function () {
        var that = this;
        var scollTxt=[];
        if(that.state.scrollShow){
			scollTxt.push(<ReactIScroll iScroll={iScroll} key={Math.random()} handleRefresh={this.handleRefresh} >
					        	{that.state.list}
					        </ReactIScroll>)
		}else{
			scollTxt=that.state.list;
		}
        return (
            <div className="orderCon content">
                <Loading flag={that.state.flag} />
                <ul>
                   {scollTxt}
                </ul>
            </div>
        )
    }
})



export default OrderList; 
