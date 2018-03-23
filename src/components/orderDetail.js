'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import Loading from './loading';
import { globalData } from './global.js';
import { hashHistory, Link } from 'react-router';
import Header from './header';
import { Modal, Toast, List } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
var orderDetail = React.createClass({
    getInitialState: function () {
        return {
            orderDetail: "",
            isMark: 0,
            flag: true,
            statusTxt: "",
            btnTxt: "",
            btnTwo: false,
            		statusJZD:{
				"PENDING": {
                	"-2":{
                		"btnTxt":"删除订单",
                		"dataId":"2",//1取消贷款，2删除订单，3签约，4立即还款
                		"btnOne":true,
                		"text": "已取消",
                	},
                	"1":{
                		"btnTxt":"取消借款",
                		"dataId":"1",
                		"btnOne":false,
                		"text": "待处理"
                	}
                },
                 "APRING": {
                	"-2":{
                		"btnTxt":"删除订单",
                		"dataId":"2",//1取消贷款，2删除订单，3签约，4立即还款
                		"btnOne":true,
                		"text": "已取消",
                	},
                	"1":{
                		"btnTxt":"取消借款",
                		"dataId":"1",
                		"btnOne":false,
                		"text": "待审核"
                	}
                },
                 "APRNO": {//审核不通过
                	"-2":{
                		"btnTxt":"删除订单",
                		"dataId":"2",//1取消贷款，2删除订单，3签约，4立即还款
                		"btnOne":true,
                		"text": "审核不通过",
                	},
                	"1":{
                		"btnTxt":"删除订单",
                		"dataId":"2",
                		"btnOne":true,
                		"text": "审核不通过"
                	}
                },
                "APRYES": {//审核通过 ，就是待签合同
                	"-2":{
                		"btnTxt":"删除订单",
                		"dataId":"2",//1取消贷款，2删除订单，3签约，4立即还款
                		"btnOne":true,
                		"text": "已取消",
                	},
                	"1":{
                		"btnTxt":"取消订单",
                		"dataId":"1",//1取消贷款，2删除订单，3签约，4立即还款
                		"btnOne":false,
                		"text": "审核通过",
                	},
                	"2":{
                		"btnTxt":"删除订单",
                		"dataId":"2",//1取消贷款，2删除订单，3签约，4立即还款
                		"btnOne":false,
                		"text": "",
                	}
                },
                "CONYES":{//已签合同 就是等待放款
                	"-2":{
                		"btnTxt":"删除订单",
                		"dataId":"2",//1取消贷款，2删除订单，3签约，4立即还款
                		"btnOne":true,
                		"text": "已取消",
                	},
                	"1":{
                		"btnTxt":"取消借款",
                		"dataId":"1",
                		"btnOne":false,
                		"text": ""
                	}
                },
                "LOANNO":{// 放款失败
                	"-2":{
                		"btnTxt":"删除订单",
                		"dataId":"2",//1取消贷款，2删除订单，3签约，4立即还款
                		"btnOne":true,
                		"text": "已取消",
                	},
                	"1":{
                		"btnTxt":"删除订单",
                		"dataId":"1",
                		"btnOne":false,
                		"text": ""
                	}
                },
                "LOANYES":{//放款成功
                	"-2":{
                		"btnTxt":"删除订单",
                		"dataId":"2",//1取消贷款，2删除订单，3签约，4立即还款
                		"btnOne":true,
                		"text": "已取消",
                	},
                	"1":{
                		"btnTxt":"立即还款",
                		"dataId":"4",
                		"btnOne":false,
                		"text": ""
                	}
                
                },
                "REPAYYES":{// 还款结束
                	"-2":{
                		"btnTxt":"删除订单",
                		"dataId":"2",//1取消贷款，2删除订单，3签约，4立即还款
                		"btnOne":true,
                		"text": "已取消",
                	},
                	"1":{
                		"btnTxt":"删除订单",
                		"dataId":"2",
                		"btnOne":false,
                		"text": ""
                	}
                },
                "":{
                	"-2":{
                		"btnTxt":"删除订单",
                		"dataId":"2",//1取消贷款，2删除订单，3签约，4立即还款
                		"btnOne":false,
                		"text": "",
                	},
                	"1":{
                		"btnTxt":"删除订单",
                		"dataId":"2",
                		"btnOne":false,
                		"text": ""
                	}
                }
			},
            status: {
                "PENDING": {
                    "-2": {
                        "btnTxt": "删除订单",
                        "dataId": "2",//1取消贷款，2删除订单，3签约，4立即还款
                        "btnOne":true,
                        "btnTwo": false,
                        "text": "已取消",
                    },
                    "1": {
                        "btnTxt": "取消借款",
                        "dataId": "1",
                        "btnOne":false,
                        "btnTwo": false,
                        "text": "待处理"
                    }
                },
                "APRING": {
                    "-2": {
                        "btnTxt": "删除订单",
                        "dataId": "2",//1取消贷款，2删除订单，3签约，4立即还款
                        "btnOne":true,
                        "btnTwo": false,
                        "text": "已取消",
                    },
                    "1": {
                        "btnTxt": "取消借款",
                        "btnOne":false,
                        "dataId": "1",
                        "btnTwo": false,
                        "text": "待审核"
                    }
                },
                "APRNO": {//审核不通过
                    "-2": {
                        "btnTxt": "删除订单",
                        "dataId": "2",//1取消贷款，2删除订单，3签约，4立即还款
                        "btnOne":true,
                        "btnTwo": false,
                        "text": "已取消",
                    },
                    "1": {
                        "btnTxt": "删除订单",
                        "dataId": "2",
                        "btnOne":true,
                        "btnTwo": false,
                        "text": "审核不通过"
                    }
                },
                "APRYES": {//审核通过 ，就是待签合同
                    "-2": {
                        "btnTxt": "删除订单",
                        "dataId": "2",//1取消贷款，2删除订单，3签约，4立即还款
                        "btnOne":true,
                        "btnTwo": false,
                        "text": "已取消",
                    },
                    "1": {
                        "btnTxt": "取消借款",
                        "dataId": "1",
                        "btnOne":false,
                        "btnTwo": true,
                        "text": "审核通过"
                    },
                    "2": {
                        "btnTxt": "绑卡签约",
                        "dataId": "3",
                        "btnOne":true,
                        "btnTwo": true,
                        "text": "审核通过"
                    }
                },
                "CONYES": {//已签合同 就是等待放款
                    "-2": {
                        "btnTxt": "删除订单",
                        "dataId": "2",//1取消贷款，2删除订单，3签约，4立即还款
                        "btnOne":true,
                        "btnTwo": false,
                        "text": "已取消",
                    },
                    "1": {
                        "btnTxt": "取消借款",
                        "dataId": "1",
                        "btnOne":false,
                        "btnTwo": false,
                        "text": "等待放款"
                    }
                },
                "LOANNO": {// 放款失败
                    "-2": {
                        "btnTxt": "删除订单",
                        "dataId": "2",//1取消贷款，2删除订单，3签约，4立即还款
                        "btnOne":true,
                        "btnTwo": false,
                        "text": "放款失败",
                    },
                    "1": {
                        "btnTxt": "删除订单",
                        "dataId": "1",
                        "btnOne":true,
                        "btnTwo": false,
                        "text": "放款失败"
                    }
                },
                "LOANYES": {//放款成功
                    "-2": {
                        "btnTxt": "删除订单",
                        "dataId": "2",//1取消贷款，2删除订单，3签约，4立即还款
                        "btnOne":true,
                        "btnTwo": false,
                        "text": "已取消",
                    },
                    "1": {
                        "btnTxt": "立即还款",
                        "dataId": "4",
                        "btnOne":true,
                        "btnTwo": false,
                        "text": "放款成功"
                    }

                },
                "REPAYYES": {// 还款结束
                    "-2": {
                        "btnTxt": "删除订单",
                        "dataId": "2",//1取消贷款，2删除订单，3签约，4立即还款
                        "btnOne":true,
                        "btnTwo": false,
                        "text": "已取消",
                    },
                    "1": {
                        "btnTxt": "删除订单",
                        "dataId": "2",
                        "btnOne":true,
                        "btnTwo": false,
                        "text": "还款结束"
                    }
                },
                "":{
                	"-2":{
                		"btnTxt":"删除订单",
                		"dataId":"2",//1取消贷款，2删除订单，3签约，4立即还款
                		"btnOne":false,
                		"btnTwo":false,
                		"text": "",
                	},
                	"1":{
                		"btnTxt":"删除订单",
                		"dataId":"2",
                		"btnOne":false,
                		"btnTwo":false,
                		"text": ""
                	}
                }
            },
            lixiType: {
                D: '日',
                M: '月',
                Y: '年'
            },
            loanType: {
                XYD: '信用贷',
                CD: '车贷',
                FD: '房贷'
            }
        }
    },

    showAlert: function (e) {
        e.stopPropagation();
        var that = this;
        var $e = e.target;
        const applyId = that.state.applyId;
        const alert = Modal.alert;
        var id = $e.getAttribute('data-id');
        if (id == "1") {
            const alertInstance = alert('提示', '确定取消该订单？', [
                { text: '取消', onPress: () => console.log('quxiao'), style: 'default' },
                {
                    text: '确定', onPress: () => {
                        api.cancleOrder(applyId, "", function (res) {
                            //console.log(res);
                            //if(true){
                            if (res.code == "0000") {
                                Toast.info("取消订单成功", 2);
                                that.setState({
                                    statusTxt: "已取消",
                                    btnTxt: "删除订单",
                                    dataId: "2",
                                    btnTwo: false
                                })
                            } else {
                                Toast.info(res.msg, 2);
                            }
                        })
                    }
                },
            ]);
            /*  setTimeout(() => {
               // 可以调用close方法以在外部close
               console.log('auto close');
               alertInstance.close();
             }, 500000);*/
        } else if (id == "2") {
            const alertInstance = alert('提示', '确定删除该订单？', [
                { text: '取消', onPress: () => console.log('quxiao'), style: 'default' },
                {
                    text: '确定', onPress: () => {
                        api.cancleOrder(applyId, "DELETE", function (res) {
                            if (res.code == "0000") {
                                Toast.info("删除订单成功", 2);
                                //window.history.back();
                                history.go(-1);
                                // $($e).parents("li").hide("slow");
                                // $($e).parents("li").find(".orderNum span:nth-child(2)").html("已取消");                   
                            } else {
                                Toast.info(res.msg, 2);
                            }
                        })
                    }
                },
            ]);
            /* setTimeout(() => {
            // 可以调用close方法以在外部close
            console.log('auto close');
            alertInstance.close();
          }, 500000);*/

        } else if (id == "3") {
            //console.log("签约");
            const capitalId = that.state.orderDetail.capitalId;
            const loanId = that.state.orderDetail.loanId;
            const applyNo = that.state.orderDetail.applyNo;
            const key1 = globalData.key;
            api.h5bindcard(capitalId, loanId, applyNo, function (res) {
                //console.log(res)
                if (res.code == "0000") {
                    let data = JSON.parse(strDec(res.data, key1, "", ""));
                    //console.log(data);
                    const url=data.url;
                    if(url){
                    	 window.location.href=url;
                    }else{
                    	Toast.info("跳转地址出错", 2);
                    }
                } else {
                    Toast.info(res.msg, 2);
                }
            }, function () {
                Toast.info("连接错误", 2);
            })

        } else if (id == "4") {
            //console.log("放宽");
            const capitalId = that.state.orderDetail.capitalId;
            const loanId = that.state.orderDetail.loanId;
            const applyNo = that.state.orderDetail.applyNo;
            const key1 = globalData.key;

            api.h5applyrepay(capitalId, loanId, applyNo, function (res) {
                //console.log(res)
                if (res.code == "0000") {
                    let data = JSON.parse(strDec(res.data, key1, "", ""));
                    //console.log(data);
                    const url=data.url;
                    if(url){
                    	 window.location.href=url;
                    }else{
                    	Toast.info("跳转地址出错", 2);
                    }
                } else {
                    Toast.info(res.msg, 2);
                }
            }, function () {
                Toast.info("连接错误", 2);
            })
        }

    },

    componentWillMount: function () {
        let applyId = this.props.location.query.applyId;
        //console.log("===" + applyId)
        this.setState({
            applyId: applyId

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
        if (dateStr) {
            var publishTime = dateStr / 1000,
                d_seconds,
                d_minutes,
                d_hours,
                d_days,
                timeNow = parseInt(new Date().getTime() / 1000),
                d,

                date = new Date(publishTime * 1000),
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
            d_days = parseInt(d / 86400);
            d_hours = parseInt(d / 3600);
            d_minutes = parseInt(d / 60);
            d_seconds = parseInt(d);
            return Y + '-' + M + '-' + D;
        } else {
            return ""
        }
    },

    render: function () {
        let that = this;
        let orderDetail = that.state.orderDetail;

        var repayList = orderDetail.repayList || [];
        var loanMoney = (orderDetail.loanMoney) * 100 || "";
        var repayWay = orderDetail.repayWay;
        return (
            <div className="app_Box orderDetail">
                <Header title="订单详情" />
                <Loading flag={that.state.flag} />
                <div className="content orderDetailCon">
                    <div className="orderDetailInfo">
                        <div className="orderNum">
                            <span>订单号：{orderDetail.applyNo}</span>
                            <span className="order_n">{orderDetail.apiWay=='H5'?'':that.state.statusTxt}</span>
                        </div>
                        <h3 className="list_title">
                            <img src={'http://xrjf.oss-cn-shanghai.aliyuncs.com/' + orderDetail.logo} onError={that.logoError} />
                            <span>{orderDetail.loanName}</span>
                            <span className="p_name">{that.state.loanType[orderDetail.loanType]}</span>
                        </h3>
                        <div className="infoContainer">
                            <ul className="container">
                                <li>借款金额 {that.formateMoney(orderDetail.money)}元</li>
                                <li>期限{orderDetail.limitDay}{that.state.lixiType[orderDetail.limitType]}</li>
                                <li>利息{that.formateMoney(orderDetail.interest)}元</li>
                                <li>费用{that.formateMoney(orderDetail.fee)}元</li>
                            </ul>
                            <p style={{ 'display': orderDetail.nextNo > 0 ? 'block' : 'none' }}>放款金额 <span>¥{loanMoney}</span></p>
                        </div>
                    </div>
                    <div className="repayList" style={{ 'display': repayList.length > 0 ? 'block' : 'none' }}>
                        <List renderHeader={() => '还款时间'} className="my-list">
                            {
                                repayList.map(function (item) {
                                    const planRepayTime = item.planRepayDate || "";
                                    return <Item key={item.no} multipleLine extra={that.getDateDiff(planRepayTime.time)}>{item.no + "期还款时间"}</Item>
                                })
                            }
                            <Item className='repayWay' extra={''}>分{orderDetail.repayNum}期还清</Item>
                        </List>


                    </div>
                    <div className="listDetailFoot">
                        <span data-id={that.state.dataId} onClick={that.showAlert} className='statusBtn' style={{ "display": that.state.btnOne ? 'block' : 'none' }}>
                            {that.state.btnTxt}
                        </span>
                        <span data-id="3" onClick={that.showAlert} className='statusBtn' style={{ "display": that.state.btnTwo ? 'block' : 'none' }}>
                            绑卡签约
	                            </span>
                    </div>
                </div>
            </div >
        )
    },
    componentDidMount: function () {
        var that = this;
        let key1 = globalData.key;
        // let toast = globalData.toast;
        api.orderDetail(that.state.applyId, function (res) {
            // console.log(res);
            if (res.code == "0000") {
                let data = strDec(res.data, key1, "", "");
                let orderDetail = JSON.parse(data);
                console.log(orderDetail);
                that.setState({
                    flag: false,
                    orderDetail: orderDetail,
                    statusTxt: orderDetail.type=='KSD'?that.state.status[orderDetail.applyStatus][orderDetail.status].text:that.state.statusJZD[orderDetail.applyStatus][orderDetail.status].text,
                    btnTxt: orderDetail.type=='KSD'?that.state.status[orderDetail.applyStatus][orderDetail.status].btnTxt:that.state.statusJZD[orderDetail.applyStatus][orderDetail.status].btnTxt,
                    btnOne:orderDetail.type=='KSD'?that.state.status[orderDetail.applyStatus][orderDetail.status].btnOne:that.state.statusJZD[orderDetail.applyStatus][orderDetail.status].btnOne,
                    btnTwo: orderDetail.type=='KSD'&&that.state.status[orderDetail.applyStatus][orderDetail.status].btnTwo,
                    dataId: that.state.status[orderDetail.applyStatus][orderDetail.status].dataId
                })
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
});


export default orderDetail;


