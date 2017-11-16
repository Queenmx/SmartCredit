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


var Order = React.createClass({
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
			scrollShow:false
        }
    },
    componentWillMount:function(){
    	this.setState({
    		 status: {
                PENDING: {
                    text: '待处理',
                    btntext: '取消借款',
                    dataId: '1'
                },
                APRING: {
                    text: '待审核',
                    btntext: '取消借款',
                    dataId: '2'
                },
                APRNO: {
                    text: '审核不通过',
                    btntext: '删除订单',
                    dataId: '3'
                },
                APRYES: {
                    text: '审核通过',
                    btntext: '确认借款',
                    dataId: '4'
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
    	})
    },
   logoError:function(event){
	    	event.target.src="src/img/icon/logo.png";
			event.target.onerror=null; //控制不要一直跳动 
 	},
	handleRefresh:function(downOrUp, callback) {
    //真实的世界中是从后端取页面和判断是否是最后一页
    var that=this;
    let {currentPage, lastPage,pageSize,totalPage} = that.state;
    
    console.log(totalPage);
	    if (downOrUp === 'up') { // 加载更多
	      if (currentPage == totalPage) {
	      	console.log("zuihou")
	        lastPage = true;
	        	if (callback && typeof callback === 'function') {
		            callback();
		          }
	      } else {
	        currentPage++;
	        console.log(currentPage);
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
    toCancel: function (e) {
        var that = this;
        var key1 = globalData.key;
		var toast=globalData.toast;
        // e.target.style.backgroundColor = e.target.style.backgroundColor === "rgb(221, 221, 221)" ? "#53a6ff" : "rgb(221, 221, 221)";
        // console.log(e.target)
        var id = e.target.getAttribute('data-id');
        var dataId = that.state.status[that.orderList[id].applyStatus].dataId;
        console.log(dataId);
        console.log(that.orderList[id].status);
        if ((dataId == 1 || dataId == 2) && that.orderList[id].status > 0) {
            api.cancleOrder(that.orderList[id].applyId, function (res) {
                if (res.code == "0000") {
                	toast.show("取消订单成功",2000);
                    e.target.style.backgroundColor = "#555"
                }else{
                	toast.show(res.msg,2000);
                }
            })
        }
    },
    formateMoney: function (money) {
        if (money % 100 === 0) {
            return (money / 100).toFixed(2)
        } else {
            return money / 100.0
        }
    },
      loadData:function(downOrUp,callback) {
  		var that=this;
  		var key1 = globalData.key;
		var toast=globalData.toast;
		var tag=that.props.tag;
	 	const {currentPage,pageSize,list} = that.state;
	 	var arr=[];
	 	//console.log(tag);
	 	 api.orderList(currentPage, pageSize, "", function (res) {
            if (res.code == "0000") {
            	that.setState({
					flag:false
				})
                var data = JSON.parse(strDec(res.data, key1, "", "") || []);
                var orderList = data.list;
                that.orderList = data.list
                var total=data.total;
				var totalPage=Math.ceil(total/pageSize);
				if(totalPage>1){
					that.setState({scrollShow:true})
				}
                console.log(data);
                if(orderList.length<1){
					arr.push(<div key={Math.random()} style={{'textAlign':'center','lineHeight':'1rem'}}>暂无订单</div>)
				}else{
					
	                for (var i in orderList) {
	                    var status = orderList[i].status;
	                    arr.push(<li key={i}>
	                        <div className="orderNum">
	                            <span className="order_n">订单号：{orderList[i].applyNo}</span>
	                            <span>{that.state.status[orderList[i].applyStatus].text}</span>
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
	                            <li>{orderList[i].rateType}费用{orderList[i].rate}%</li>
	                        </ul>
	                        <div className="listFoot">
	                            <span className="status">您的贷款申请已提交，3个工作日内完成</span>
	                            <span onClick={that.toCancel} className='statusBtn' data-id={i} style={{ backgroundColor: status < 0 ? 'rgb(221, 221, 221)' : '#53a6ff' }}>
	                                {that.state.status[orderList[i].applyStatus].btntext}
	                            </span>
	                            {/* <span onClick={that.toCancel} className='statusBtn' data-id={that.state.status[orderList[i].applyStatus].dataId} data-sign={orderList[i].applyId} style={}>
	                                {that.state.status[orderList[i].applyStatus].btntext}
	                            </span> */}
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
            <div className="app_Box orderList">
                <Header title="我的订单" />
                <Loading flag={that.state.flag} />
                <div className="orderCon content">
                    <ul>
                       {scollTxt}
                    </ul>
                    
                </div>
            </div>
        )
    }
})



export default Order; 
