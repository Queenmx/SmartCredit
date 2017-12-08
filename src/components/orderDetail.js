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
            flag: true
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

    render: function () {
        let that = this;
        let orderDetail = that.state.orderDetail;
        var addTime = orderDetail.addTime || "";
        return (
            <div className="app_Box orderDetail">
                <Header title="订单详情" />
                 <Loading flag={that.state.flag} />
                <div className="content orderDetailCon">
               		<p className="note">你的贷款申请已提交,3个工作日内完成</p>
               		<div className="orderDetailInfo">
	                        <div className="orderNum">
	                            <span>订单号：{orderDetail.applyNo}</span>
	                            <span  className="order_n">{orderDetail.status==-2?"已取消":"审核中"}</span>
	                        </div>
	                        <h3 className="list_title">
	                            <img src={'http://xrjf.oss-cn-shanghai.aliyuncs.com/' + orderDetail.logo} onError={that.logoError}/>
	                            <span>{orderDetail.loanName}</span>
	                            <span className="p_name">{orderDetail.loanType}</span>
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
            console.log(res);
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


