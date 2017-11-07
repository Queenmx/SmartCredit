import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'reactjs-iscroll';
import api from './api';
import {globalData} from './global.js';
import { hashHistory, Link } from 'react-router';

class ProList extends Component {
	constructor() {
	    super();
	    this.state = {
	  		list: [],
	  		currentPage: 1,
	      	lastPage: false,
			pageSize:10
	    };
	    
	    this.toListDetail=(event)=>{
	    	var loanId=event.target.getAttribute("data-loanId");
			var data = {loanId:loanId};
			var path = {
			  pathname:'/ListDetail',
			  query:data,
			}
			hashHistory.push(path);
	    }
	  
	    this.logoError=(event)=>{
	    	event.target.src="src/img/icon/capitalLogo.jpg";
			event.target.onerror=null; //控制不要一直跳动 
			//console.log(event.target.src);
	    }
 	}
		handleRefresh(downOrUp, callback) {
    //真实的世界中是从后端取页面和判断是否是最后一页
    var that=this;
    let {currentPage, lastPage,pageSize,total} = that.state;
    var totalPage=Math.ceil(total/pageSize);
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
	  
  }
  loadData(downOrUp,callback) {
  	
  		var that=this;
  		var key1 = globalData.key;
		var toast=globalData.toast;
		var tag=that.props.tag;
	 	const {currentPage,pageSize,list} = that.state;
	 	var arr=[];
	 	//console.log(tag);
	 	api.loanList(currentPage,pageSize,tag,function(res){
	 		
			//console.log(res);
			if(res.code=="0000"){
				var data =JSON.parse(strDec(res.data,key1,"",""));
				var loanList=data.list;
				var total=data.total;
				//console.log(data);
				for(var i in loanList){
					arr.push(<div className="capitalList" key={Math.random()}>
	        				<h3>
	        					<img src={loanList[i].logo} onError={that.logoError} />
	        					<span>{loanList[i].loanName}</span>
	        				</h3>
	        				<div className="capitalInfo">
	        					<div className="limit">
	        						<h2>{loanList[i].moneyMin}~{loanList[i].moneyMax}</h2>
	        						<p>额度范围(元)</p>
	        					</div>
	        					<ul className="special">
	        						<li>{loanList[i].loanTime}小时放款</li>
	        						<li>日费率{loanList[i].rate}%</li>
	        						<li>贷款期限{loanList[i].limitMin}-{loanList[i].limitMax}天</li>
	        					</ul>
	        					<div className="apply">
	        						<a href="javascript:;" data-loanId={loanList[i].loanId} onClick={that.toListDetail}>申请贷款</a>
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
				
			}
		},function(){
			toast.show("连接错误",2000);
		})
	 	
	
        }
	componentDidMount(){
		var that=this;
		var key1 = globalData.key;
		var toast=globalData.toast;
		var currentPage=that.state.currentPage;
		var pageSize=that.state.pageSize;
		that.loadData();
		
	}
	
	
	render(){
		var that=this;
		/*var scollFlag=that.props.scollFlag;
		//console.log(scollFlag);
		let box=[];
		if(scollFlag==='true'){//不iscoll
			 box.push(<ReactIScroll key={1} iScroll={iScroll} handleRefresh={this.handleRefresh.bind(this)} >
		        		{that.state.list}
		        </ReactIScroll>)
		}else{
			box=that.state.list;
		}*/
        return (
        	 <div className="capitalBox">
		        <ReactIScroll key={1} iScroll={iScroll} handleRefresh={this.handleRefresh.bind(this)} >
		        		{that.state.list}
		        </ReactIScroll>
		      </div>
        )
	}
};

export default ProList;


