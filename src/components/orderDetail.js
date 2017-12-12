'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import Loading from './loading';
import { globalData } from './global.js';
import { hashHistory, Link } from 'react-router';
import Header from './header';

var orderDetail = React.createClass({
    getInitialState: function () {
        return {
            orderDetail: "",
            isMark: 0,
            flag: true,
            status: {
                "PENDING": {
                	"-2":{
                		"btnTxt":"删除订单",
                		"dataId":"2",//1取消贷款，2删除订单，3签约，4立即还款
                		"btnTwo":false,
                		"text": "已取消",
                	},
                	"1":{
                		"btnTxt":"取消借款",
                		"dataId":"1",
                		"btnTwo":false,
                		"text": "待处理"
                	}
                },
                "APRING": {
                	"-2":{
                		"btnTxt":"删除订单",
                		"dataId":"2",//1取消贷款，2删除订单，3签约，4立即还款
                		"btnTwo":false,
                		"text": "已取消",
                	},
                	"1":{
                		"btnTxt":"取消借款",
                		"dataId":"1",
                		"btnTwo":false,
                		"text": "待审核"
                	}
                },
                "APRNO": {//审核不通过
                	"-2":{
                		"btnTxt":"删除订单",
                		"dataId":"2",//1取消贷款，2删除订单，3签约，4立即还款
                		"btnTwo":false,
                		"text": "已取消",
                	},
                	"1":{
                		"btnTxt":"取消借款",
                		"dataId":"1",
                		"btnTwo":false,
                		"text": "审核不通过"
                	}
                },
                "APRYES": {//审核通过 ，就是待签合同
                	"-2":{
                		"btnTxt":"删除订单",
                		"dataId":"2",//1取消贷款，2删除订单，3签约，4立即还款
                		"btnTwo":false,
                		"text": "已取消",
                	},
                	"1":{
                		"btnTxt":"取消借款",
                		"dataId":"1",
                		"btnTwo":true,
                		"text": "审核通过"
                	},
                	"2":{
                		"btnTxt":"绑卡签约",
                		"dataId":"3",
                		"btnTwo":true,
                		"text": "审核通过"
                	}
                },
                "CONYES":{//已签合同 就是等待放款
                	"-2":{
                		"btnTxt":"删除订单",
                		"dataId":"2",//1取消贷款，2删除订单，3签约，4立即还款
                		"btnTwo":false,
                		"text": "已取消",
                	},
                	"1":{
                		"btnTxt":"取消借款",
                		"dataId":"1",
                		"btnTwo":false,
                		"text": "等待放款"
                	}
                },
                "LOANNO":{// 放款失败
                	"-2":{
                		"btnTxt":"删除订单",
                		"dataId":"2",//1取消贷款，2删除订单，3签约，4立即还款
                		"btnTwo":false,
                		"text": "放款失败",
                	},
                	"1":{
                		"btnTxt":"删除订单",
                		"dataId":"1",
                		"btnTwo":false,
                		"text": "放款失败"
                	}
                },
                "LOANYES":{//放款成功
                	"-2":{
                		"btnTxt":"删除订单",
                		"dataId":"2",//1取消贷款，2删除订单，3签约，4立即还款
                		"btnTwo":false,
                		"text": "已取消",
                	},
                	"1":{
                		"btnTxt":"立即放款",
                		"dataId":"4",
                		"btnTwo":false,
                		"text": "放款成功"
                	}
                
                },
                "REPAYYES":{// 还款结束
                	"-2":{
                		"btnTxt":"删除订单",
                		"dataId":"2",//1取消贷款，2删除订单，3签约，4立即还款
                		"btnTwo":false,
                		"text": "已取消",
                	},
                	"1":{
                		"btnTxt":"删除订单",
                		"dataId":"2",
                		"btnTwo":false,
                		"text": "放款成功"
                	}
                }
            },
           
             loanType:{
            	XYD :'信用贷',
            	CD :'车贷',
            	FD:'房贷'
            }
        }
    },
    getTabId: function (e) {
        var that = this;
        var id = e.target.getAttribute('data-id');
        that.setState({
            activeTab: id,
            isShow: false
            //dataStatus: 0
        }, () => {
			/*api.queryBanner(function(data){
				//console.log(data);
			})*/
        })
    },
    componentWillMount: function () {
        let applyId = this.props.location.query.applyId;
        this.setState({ 
        	applyId: applyId,
        	lixiType:{
        	 	D: '日',
                M: '月',
                Y: '年'
        	} 
        });
        //console.log(articleId);
    },
    formateMoney: function (money) {
        if (money % 100 === 0) {
            return (money / 100)
        } else {
             return (money / 100.0).toFixed(2)
        }
    },
	//字符串转换为时间戳
	
	getDateDiff: function (dateStr) {
	  if(dateStr){
	    var publishTime = dateStr/1000,
	        d_seconds,
	        d_minutes,
	        d_hours,
	        d_days,
	        timeNow = parseInt(new Date().getTime()/1000),
	        d,
	
	        date = new Date(publishTime*1000),
	        Y = date.getFullYear(),
	        M = date.getMonth() + 1,
	        D = date.getDate(),
	        H = date.getHours(),
	        m = date.getMinutes(),
	        s = date.getSeconds();
	        //小于10的在前面补0
	        if (M < 10) {
	            M = '0' + M;
	        }
	        if (D < 10) {
	            D = '0' + D;
	        }
	        if (H < 10) {
	            H = '0' + H;
	        }
	        if (m < 10) {
	            m = '0' + m;
	        }
	        if (s < 10) {
	            s = '0' + s;
	        }
	
	    d = timeNow - publishTime;
	    d_days = parseInt(d/86400);
	    d_hours = parseInt(d/3600);
	    d_minutes = parseInt(d/60);
	    d_seconds = parseInt(d);
		return Y + '-' + M + '-' + D + ' ' + H + ':' + m;
	 }else{
	 	return ""
	 }
	} ,

    render: function () {
        let that = this;
        let orderDetail = that.state.orderDetail;
       // var addTime = orderDetail.addTime || "";
       var nextRepay;
        if(orderDetail.nextNo>0){
        	 const nextRepayTime=orderDetail.nextRepayDate||"";
       		 nextRepay=orderDetail.nextNo+"期还款时间："+that.getDateDiff(nextRepayTime.time);
        }else{
        	 nextRepay="你的贷款申请已提交,3个工作日内完成";
        }
       
        return (
            <div className="app_Box orderDetail">
                <Header title="订单详情" />
                 <Loading flag={that.state.flag} />
                <div className="content orderDetailCon">
               		<p className="note">{nextRepay}</p>
               		<div className="orderDetailInfo">
	                        <div className="orderNum">
	                            <span>订单号：{orderDetail.applyNo}</span>
	                            {/*that.state.status[orderDetail.applyStatus][orderDetail.status].text*/}
	                            <span  className="order_n">待处理</span>
	                        </div>
	                        <h3 className="list_title">
	                            <img src={'http://xrjf.oss-cn-shanghai.aliyuncs.com/' + orderDetail.logo} onError={that.logoError}/>
	                            <span>{orderDetail.loanName}</span>
	                            <span className="p_name">{that.state.loanType[orderDetail.loanType]}</span>
	                        </h3>
	                        <ul className="container">
	                            <li>借款金额 {that.formateMoney(orderDetail.money)}元</li>
	                            <li>期限{orderDetail.limitDay}{that.state.lixiType[orderDetail.limitType]}</li>
	                            <li>利息{that.formateMoney(orderDetail.interest)}元</li>
	                            <li>费用{orderDetail.fee}元</li>
	                        </ul>
               		</div>
                </div>    
            </div>
        )
    },
    componentDidMount: function () {
        var that = this;
        let key1 = globalData.key;
        let toast = globalData.toast;
        api.orderDetail(that.state.applyId, function (res) {
           // console.log(res);
            if (res.code == "0000") {
                let data = strDec(res.data, key1, "", "");
                let orderDetail = JSON.parse(data);
                console.log(orderDetail);
                that.setState({
                	flag:false,
                    orderDetail: orderDetail,
                    //isMark: orderDetail.isMark,
                    //markId:orderDetail.markId
                })
            } else if (res.code == "5555") {
            	that.setState({
		        	flag:false
		        })
                toast.show("登录过时，请重新登录", 2000);
                var path = {
                    pathname: '/Login',
                }
                hashHistory.push(path);
            } else {
            	that.setState({
		        	flag:false
		        })
                toast.show(res.msg, 2000);
            }
        }, function () {
        	that.setState({
	        	flag:false
	        })
            toast.show("连接错误", 2000);
        })
    }
});


export default orderDetail;


