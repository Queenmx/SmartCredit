import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'reactjs-iscroll';
import api from './api';
import {globalData} from './global.js';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
var toast=new Toast();
class Simple extends Component {
	constructor() {
    super();
    this.state = {
  		isLoading: false,
  		list: [],
  		currentPage: 1,
      	lastPage: false,
		pageSize:10
    };
 	}
	  //调用 IScroll refresh 后回调函数
  handleRefresh(downOrUp, callback) {
  	
    //真实的世界中是从后端取页面和判断是否是最后一页
    let {currentPage, lastPage} = this.state;
    let {TOTALPAGE} = this.state;
   // toast.show(downOrUp+"---"+currentPage+"----"+lastPage,1000);
    if (downOrUp === 'up') { // 加载更多
      if (currentPage == TOTALPAGE) {
        lastPage = true;
      } else {
        currentPage++;
      }
    } else { // 刷新
      lastPage = false;
      currentPage = 1;
    }
    this.setState({
      currentPage,
      lastPage
    }, () => {
      this.loadData(downOrUp, callback);
    });
  }
	
	
	loadData(downOrUp,callback) {
	 	var that=this;
	 	const {currentPage} = that.state;
	 	var appBasePath="http://www.91ymfq.com/XR/";
	 	//var url="http://admin.91ymfq.com/api/h5Service.do";
	 	var url="http://test.91ymfq.com/api/h5Service.do";
        var key="YMFQ2016";
     	var iv = new String(0);
	    var param = "{\"APP_VERSION\":\"v1.0\",\"ACTION\":\"getHospital\",\"TOKEN_ID\":\"\",\"DEVICE_ID\":\"999kkkk\",\"KEYWORDS\":\"\",\"DEPARTMENT_ID\":\"\",\"PAGE_INDEX\":\""+currentPage+"\"}";
	    console.log(param)
	    var iv = new String(0);
	    var requestData = base64encode(des(key,utf16to8(param),1,0, iv, 1));
	    var arr=[];
	    const {list} = that.state;
		$.ajax({
	            type:"post",
	            data:requestData,
	            url:url,
	            contentType:"text/plain",
	            success:function(data) {
	            	console.log(data.data);
	            	var BASEPATH=data.data.BASEPATH;
	            	  var appHospitals = data.data.HOSPITALS;
	                $(appHospitals).each(function(index){
	                	list.push(<div className='listBox' key={Math.random()}><dl className='txt_img'><dt><img  className='pull-left' src={appBasePath+this.IMG_LOGO}/></dt><dd><p ><span>{this.NAME}</span></p></dd> </dl></div>);
	                });
	                 var TOTALPAGE=data.data.TOTALPAGE;
	                 setTimeout(() => {
				          that.setState({
				          	TOTALPAGE:TOTALPAGE,
				            list:list 
				          });
				          if (callback && typeof callback === 'function') {
				            callback();
				          }
				        }, 1000);
	               
	            },
	            error:function(XMLHttpRequest, textStatus, errorThrown){
	                alert("网络异常，请联系管理员！");
	            }
	         });
        }
	
	 
	componentDidMount(){
		var that=this;
		var currentPage=that.state.currentPage;
		var pageSize=that.state.pageSize;
		this.loadData();
		
		/*api.loanList(currentPage,pageSize,"SBZ",function(res){
			console.log(res);
			if(res.code=="0000"){
				//var data =strDec(res.data,key1,"","");
				//console.log(data);
				var data=res.data.list;
				var list=[];
				for(var i in data){
					list.push(<div className="capitalList" key={i}>
	        				<h3>
	        					<img src={data[i].logo} onError={that.logoError} />
	        					<span>用钱宝</span>
	        				</h3>
	        				<div className="capitalInfo">
	        					<div className="limit">
	        						<h2>{data[i].moneyMin}~{data[i].moneyMax}</h2>
	        						<p>额度范围(元)</p>
	        					</div>
	        					<ul className="special">
	        						<li>{data[i].loanTime}小时放款</li>
	        						<li>日费率{data[i].rate}%</li>
	        						<li>贷款期限{data[i].limitMin}-{data[i].limitMax}天</li>
	        					</ul>
	        					<div className="apply">
	        						<a href="javascript:;" data-loanId={data[i].loanId} onClick={that.toListDetail}>申请贷款</a>
	        					</div>
	        				</div>
	        				
	        			</div>)
				}
				that.setState({
					total:res.total,
					list:list
				})
			}
		})*/
		
	}
	
  render() {
    return (
      <div className="capitalBox">
        <ReactIScroll iScroll={iScroll} handleRefresh={this.handleRefresh.bind(this)} >
          数据数据数据
        			{this.state.list}
        </ReactIScroll>
      </div>
    );
  }
}


export default Simple;