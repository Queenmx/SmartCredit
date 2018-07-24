'use strict';
// import React from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'reactjs-iscroll';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import '../sass/order.scss';
import { Modal, Toast } from 'antd-mobile';

var OrderList = React.createClass({
	getInitialState: function () {
		return {
			flag: true,
			pageNum: 1,
			list: [],
			orderList: [],
			currentPage: 1,
			lastPage: false,
			pageSize: 10,
			scrollShow: false,
			statusJZD: {
				"PENDING": {
					"-2": {
						"btnTxt": "删除订单",
						"dataId": "2",//1取消贷款，2删除订单，3签约，4立即还款
						"btnOne": true,
						"text": "已取消",
					},
					"1": {
						"btnTxt": "取消借款",
						"dataId": "1",
						"btnOne": false,
						"text": "待处理"
					}
				},
				"APRING": {
					"-2": {
						"btnTxt": "删除订单",
						"dataId": "2",//1取消贷款，2删除订单，3签约，4立即还款
						"btnOne": true,
						"text": "已取消",
					},
					"1": {
						"btnTxt": "取消借款",
						"dataId": "1",
						"btnOne": false,
						"text": "待审核"
					}
				},
				"APRNO": {//审核不通过
					"-2": {
						"btnTxt": "删除订单",
						"dataId": "2",//1取消贷款，2删除订单，3签约，4立即还款
						"btnOne": true,
						"text": "审核不通过",
					},
					"1": {
						"btnTxt": "删除订单",
						"dataId": "2",
						"btnOne": true,
						"text": "审核不通过"
					}
				},
				"APRYES": {//审核通过 ，就是待签合同
					"-2": {
						"btnTxt": "删除订单",
						"dataId": "2",//1取消贷款，2删除订单，3签约，4立即还款
						"btnOne": true,
						"text": "已取消",
					},
					"1": {
						"btnTxt": "取消订单",
						"dataId": "1",//1取消贷款，2删除订单，3签约，4立即还款
						"btnOne": false,
						"text": "审核通过",
					},
					"2": {
						"btnTxt": "删除订单",
						"dataId": "2",//1取消贷款，2删除订单，3签约，4立即还款
						"btnOne": false,
						"text": "",
					}
				},
				"CONYES": {//已签合同 就是等待放款
					"-2": {
						"btnTxt": "删除订单",
						"dataId": "2",//1取消贷款，2删除订单，3签约，4立即还款
						"btnOne": true,
						"text": "已取消",
					},
					"1": {
						"btnTxt": "取消借款",
						"dataId": "1",
						"btnOne": false,
						"text": ""
					}
				},
				"LOANNO": {// 放款失败
					"-2": {
						"btnTxt": "删除订单",
						"dataId": "2",//1取消贷款，2删除订单，3签约，4立即还款
						"btnOne": true,
						"text": "已取消",
					},
					"1": {
						"btnTxt": "删除订单",
						"dataId": "1",
						"btnOne": false,
						"text": ""
					}
				},
				"LOANYES": {//放款成功
					"-2": {
						"btnTxt": "删除订单",
						"dataId": "2",//1取消贷款，2删除订单，3签约，4立即还款
						"btnOne": true,
						"text": "已取消",
					},
					"1": {
						"btnTxt": "立即还款",
						"dataId": "4",
						"btnOne": false,
						"text": ""
					}

				},
				"REPAYYES": {// 还款结束
					"-2": {
						"btnTxt": "删除订单",
						"dataId": "2",//1取消贷款，2删除订单，3签约，4立即还款
						"btnOne": true,
						"text": "已取消",
					},
					"1": {
						"btnTxt": "删除订单",
						"dataId": "2",
						"btnOne": false,
						"text": ""
					}
				},
				"": {
					"-2": {
						"btnTxt": "删除订单",
						"dataId": "2",//1取消贷款，2删除订单，3签约，4立即还款
						"btnOne": false,
						"text": "",
					},
					"1": {
						"btnTxt": "删除订单",
						"dataId": "2",
						"btnOne": false,
						"text": ""
					}
				}
			},
			status: {
				"PENDING": {
					"-2": {
						"btnTxt": "删除订单",
						"dataId": "2",//1取消贷款，2删除订单，3签约，4立即还款
						"btnOne": true,
						"btnTwo": false,
						"text": "已取消",
					},
					"1": {
						"btnTxt": "取消借款",
						"dataId": "1",
						"btnOne": false,
						"btnTwo": false,
						"text": "待处理"
					}
				},
				"APRING": {
					"-2": {
						"btnTxt": "删除订单",
						"dataId": "2",//1取消贷款，2删除订单，3签约，4立即还款
						"btnOne": true,
						"btnTwo": false,
						"text": "已取消",
					},
					"1": {
						"btnTxt": "取消借款",
						"btnOne": false,
						"dataId": "1",
						"btnTwo": false,
						"text": "待审核"
					}
				},
				"APRNO": {//审核不通过
					"-2": {
						"btnTxt": "删除订单",
						"dataId": "2",//1取消贷款，2删除订单，3签约，4立即还款
						"btnOne": true,
						"btnTwo": false,
						"text": "已取消",
					},
					"1": {
						"btnTxt": "删除订单",
						"dataId": "2",
						"btnOne": true,
						"btnTwo": false,
						"text": "审核不通过"
					}
				},
				"APRYES": {//审核通过 ，就是待签合同
					"-2": {
						"btnTxt": "删除订单",
						"dataId": "2",//1取消贷款，2删除订单，3签约，4立即还款
						"btnOne": true,
						"btnTwo": false,
						"text": "已取消",
					},
					"1": {
						"btnTxt": "取消借款",
						"dataId": "1",
						"btnOne": false,
						"btnTwo": true,
						"text": "审核通过"
					},
					"2": {
						"btnTxt": "绑卡签约",
						"dataId": "3",
						"btnOne": true,
						"btnTwo": true,
						"text": "审核通过"
					}
				},
				"CONYES": {//已签合同 就是等待放款
					"-2": {
						"btnTxt": "删除订单",
						"dataId": "2",//1取消贷款，2删除订单，3签约，4立即还款
						"btnOne": true,
						"btnTwo": false,
						"text": "已取消",
					},
					"1": {
						"btnTxt": "取消借款",
						"dataId": "1",
						"btnOne": false,
						"btnTwo": false,
						"text": "等待放款"
					}
				},
				"LOANNO": {// 放款失败
					"-2": {
						"btnTxt": "删除订单",
						"dataId": "2",//1取消贷款，2删除订单，3签约，4立即还款
						"btnOne": true,
						"btnTwo": false,
						"text": "放款失败",
					},
					"1": {
						"btnTxt": "删除订单",
						"dataId": "1",
						"btnOne": true,
						"btnTwo": false,
						"text": "放款失败"
					}
				},
				"LOANYES": {//放款成功
					"-2": {
						"btnTxt": "删除订单",
						"dataId": "2",//1取消贷款，2删除订单，3签约，4立即还款
						"btnOne": true,
						"btnTwo": false,
						"text": "已取消",
					},
					"1": {
						"btnTxt": "立即还款",
						"dataId": "4",
						"btnOne": true,
						"btnTwo": false,
						"text": "放款成功"
					}

				},
				"REPAYYES": {// 还款结束
					"-2": {
						"btnTxt": "删除订单",
						"dataId": "2",//1取消贷款，2删除订单，3签约，4立即还款
						"btnOne": true,
						"btnTwo": false,
						"text": "已取消",
					},
					"1": {
						"btnTxt": "删除订单",
						"dataId": "2",
						"btnOne": true,
						"btnTwo": false,
						"text": "还款结束"
					}
				},
				"": {
					"-2": {
						"btnTxt": "删除订单",
						"dataId": "2",//1取消贷款，2删除订单，3签约，4立即还款
						"btnOne": false,
						"btnTwo": false,
						"text": "",
					},
					"1": {
						"btnTxt": "删除订单",
						"dataId": "2",
						"btnOne": false,
						"btnTwo": false,
						"text": ""
					}
				}
			},

			rate: {
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
	componentWillMount: function () {
		var that = this;
		var statusType = that.props.statusType;
		this.setState({ statusType: statusType })
	},
	logoError: function (event) {
		event.target.src = "src/img/icon/logo.png";
		event.target.onerror = null; //控制不要一直跳动 
	},
	handleRefresh: function (downOrUp, callback) {
		//真实的世界中是从后端取页面和判断是否是最后一页
		var that = this;
		let { currentPage, lastPage, pageSize, totalPage } = that.state;

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



	showAlert: function (applyId, capitalId, loanId, applyNo, e) {
		e.stopPropagation();
		var that = this;
		var $e = e.target;
		const alert = Modal.alert;
		//var status = $e.getAttribute('data-status');
		var id = $e.getAttribute('data-id');
		if (id == "1") {
			const alertInstance = alert('提示', '确定取消该订单？', [
				{ text: '取消', onPress: () => console.log('quxiao'), style: 'default' },
				{
					text: '确定', onPress: () => {
						api.cancleOrder(applyId, "", function (res) {
							//console.log(res);
							if (res.code == "0000") {
								Toast.info("取消订单成功", 2);
								$($e).parents("li").find(".orderNum span:nth-child(2)").html("已取消");
								$e.setAttribute("data-id", "2");
								$e.innerHTML = "删除订单";
								$($e).next("span").hide();
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
								$($e).parents("li").hide("slow");
								$($e).parents("li").find(".orderNum span:nth-child(2)").html("已取消");
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
			const key1 = globalData.key;
			api.h5bindcard(capitalId, loanId, applyNo, function (res) {
				//console.log(res)
				if (res.code == "0000") {
					let data = strDec(res.data, key1, "", "");
					const dataObj = JSON.parse(data);
					//console.log(dataObj);
					const url = dataObj.url;
					if (url) {
						window.location.href = url;
					} else {
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
			const key1 = globalData.key;
			api.h5applyrepay(capitalId, loanId, applyNo, function (res) {
				//console.log(res)
				if (res.code == "0000") {
					let data = strDec(res.data, key1, "", "");
					const dataObj = JSON.parse(data);
					//console.log(dataObj);
					const url = dataObj.url;
					if (url) {
						window.location.href = url;
					} else {
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
	formateMoney: function (money) {
		if (money % 100 === 0) {
			return (money / 100).toFixed(2)
		} else {
			return money / 100.0
		}
	},
	toOrderDetail: function (event) {
		var applyId = event.currentTarget.getAttribute("data-applyId");

		const path = {
			pathname: '/orderDetail',
			query: { applyId: applyId }
		}
		hashHistory.push(path);

	},
	loadData: function (downOrUp, callback) {
		var that = this;
		var key1 = globalData.key;
		var tag = that.props.tag;
		const { currentPage, pageSize, list } = that.state;
		var arr = [];
		////console.log(tag);
		//console.log(that.state.status)
		//console.log(that.state.status.APRNO.btnTwo)
		api.orderList(currentPage, pageSize, that.state.statusType, function (res) {
			if (res.code == "0000") {
				that.setState({
					flag: false
				})
				var data = JSON.parse(strDec(res.data, key1, "", "") || []);
				var orderList = data.list;
				console.log(orderList)
				that.orderList = data.list
				var total = data.total;
				var totalPage = Math.ceil(total / pageSize);
				if (totalPage > 1) {
					that.setState({ scrollShow: true })
				}
				//console.log(data);
				if (orderList.length < 1) {
					arr.push(<div key={Math.random()} style={{ 'textAlign': 'center', 'lineHeight': '1rem' }}>暂无订单</div>)
				} else {

					for (var i in orderList) {
						var status = orderList[i].status;
						var applyStatus = orderList[i].applyStatus;
						var nextRepay;
						if (applyStatus != "REPAYYES") {
							if (orderList[i].nextNo > 0) {
								const nextRepayTime = orderList[i].nextRepayDate || "";
								nextRepay = orderList[i].nextNo + "期还款时间：" + that.getDateDiff(nextRepayTime.time);
							} else {
								nextRepay = "你的贷款申请已提交,3个工作日内完成"
							}
						} else {
							nextRepay = "已结清"
						}
						const loanMoney = (orderList[i].loanMoney) * 100 || "";
						arr.push(<li key={Math.random()} data-applyId={orderList[i].applyId} onClick={that.toOrderDetail}>
							<div className="orderNum">
								<span>订单号：{orderList[i].applyNo}</span>
								<span className="order_n" style={{ 'display': orderList[i].apiWay == 'H5' ? 'none' : 'block' }}>{orderList[i].type == 'JZD' ? that.state.statusJZD[applyStatus][status].text : that.state.status[applyStatus][status].text}</span>
							</div>
							<h3 className="list_title">
								<img src={'http://xrjf.oss-cn-shanghai.aliyuncs.com/' + orderList[i].logo} onError={that.logoError} />
								<span>{orderList[i].loanName}</span>
								<span className="p_name">{that.state.loanType[orderList[i].loanType]}</span>
							</h3>
							<div className="infoContainer">
								<ul className="container">
									<li>借款金额 {that.formateMoney(orderList[i].money)}元</li>
									<li>期限{orderList[i].limitDay}{that.state.rate[orderList[i].limitType]}</li>
									<li>利息{that.formateMoney(orderList[i].interest)}元</li>
									<li>费用{that.formateMoney(orderList[i].fee)}元</li>
								</ul>
								<p style={{ 'display': orderList[i].loanMoney > 0 ? 'block' : 'none' }}>放款金额 <span>¥{loanMoney}</span></p>
							</div>
							<div className="listFoot">
								<span className="status">{nextRepay}</span>
								<span data-id={orderList[i].type == 'JZD' ? that.state.statusJZD[applyStatus][status].dataId : that.state.status[applyStatus][status].dataId} onClick={that.showAlert.bind(that, orderList[i].applyId, orderList[i].capitalId, orderList[i].loanId, orderList[i].applyNo)} className='statusBtn' style={{ "display": (orderList[i].type == 'KSD' ? that.state.status[applyStatus][status].btnOne : that.state.statusJZD[applyStatus][status].btnOne) ? 'block' : 'none' }}  >
									{orderList[i].type == 'JZD' ? that.state.statusJZD[applyStatus][status].btnTxt : that.state.status[applyStatus][status].btnTxt}
								</span>
								<span data-id="3" onClick={that.showAlert.bind(that, orderList[i].applyId, orderList[i].capitalId, orderList[i].loanId, orderList[i].applyNo)} className='statusBtn' style={{ "display": orderList[i].type == 'KSD' && that.state.status[applyStatus][status].btnTwo ? 'block' : 'none' }}>
									绑卡签约
	                            </span>
							</div>
						</li >)
					}
				}
				if (downOrUp == 'up') {
					var c = list.concat(arr);
				} else {
					var c = arr;
				}
				that.setState({
					totalPage: totalPage,
					list: c
				})
				if (callback && typeof callback === 'function') {
					callback();
				}
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


	},
	componentDidMount: function () {
		var that = this;
		that.loadData();
	},
	render: function () {
		var that = this;
		var scollTxt = [];
		if (that.state.scrollShow) {
			scollTxt.push(<ReactIScroll iScroll={iScroll} key={Math.random()} handleRefresh={this.handleRefresh} >
				{that.state.list}
			</ReactIScroll>)
		} else {
			scollTxt = that.state.list;
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
