import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'reactjs-iscroll';
import api from './api';
import {globalData} from './global.js';
import { hashHistory, Link } from 'react-router';
var toast=new Toast();
class News extends Component {
	constructor() {
	    super();
	    this.state = {
	  		list: [],
	  		currentPage: 1,
	      	lastPage: false,
			pageSize:10
	    };
	    this.toNewsDetail = () => {
	    	var data = {id:3,name:"qin",age:18};
			var path = {
			  pathname:'/NewsDetail',
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
	 	var url="http://admin.91ymfq.com/api/h5Service.do";
	 	//var url="http://test.91ymfq.com/api/h5Service.do";
        var key="YMFQ2016";
     	var iv = new String(0);
	    var param = "{\"APP_VERSION\":\"v1.0\",\"ACTION\":\"getHospital\",\"TOKEN_ID\":\"\",\"DEVICE_ID\":\"999kkkk\",\"KEYWORDS\":\"\",\"DEPARTMENT_ID\":\"\",\"PAGE_INDEX\":\""+currentPage+"\"}";
	    console.log(param)
	    var iv = new String(0);
	    var requestData = base64encode(des(key,utf16to8(param),1,0, iv, 1));
	    var arr=[];
	    const {list} = that.state;
	/*	$.ajax({
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
	         });*/
        }
	componentDidMount(){
		var that=this;
		var currentPage=that.state.currentPage;
		var pageSize=that.state.pageSize;
		this.loadData();
		var banner=[];
		var mPost=[];
		/*		api.banner(function(res){
				//console.log(res);
				if(res.code=="0000"){
					var data =strDec(res.data,key1,"","");
					//console.log(data);
					const  bannerList=data.list;
					
					that.setState({
		                bannerList: bannerList//轮播图片
		            },()=>{
		            	var bannerList=that.state.bannerList;
		               for (var i in bannerList) {
			            	banner.push(
			              	 <div className="swiper-slide" key={i}>
			              	 	<img src={appBasePath+bannerList[i].img_URL}/>
			              	 </div>
			              	 )
			            };
			            that.setState({
			            	banner:banner
			            })
				}else{
					toast.show(res.msg,2000);
				}
				
			});*/
		

	
		
	}
	
	
	render(){
		var that=this;
        return (
        	<div className="app_Box news">
        		<header>资讯中心</header>
	        	<div className="newsCon content">
		        	<div className="swiper-container" id="bannerList">
					    <div className="swiper-wrapper">
					      	{that.state.banner}
					    </div>
					    <div className="swiper-pagination">{that.state.paginationCustomRender}</div>
					</div>
					<div className="newsBox">
			        	<h3>你关心的资讯</h3>
				        <div className="listWrap">
						 	<ReactIScroll iScroll={iScroll} handleRefresh={this.handleRefresh.bind(this)} >
					        	{that.state.list}你好吧代表大会的防火防盗还返还话费返还<br/>你好吧代表大会的防火防盗还返还话费返还<br/>你好吧代表大会的防火防盗还返还话费返还<br/>你好吧代表大会的防火防盗还返还话费返还<br/>你好吧代表大会的防火防盗还返还话费返还<br/>你好吧代表大会的防火防盗还返还话费返还<br/>
					        </ReactIScroll>
		        		</div>
				    </div>
				</div>
	        	<Footer activeIndex="1"/>
        	</div>
        )
	}
	componentDidUpdate(){
		var current=$(".swiper-slide swiper-slide-active").index();
		var length=this.state.length;
		var swiper = new Swiper("#bannerList",{
			loop:true,
			autoplay : 3000,
			speed:500,
			pagination: '.swiper-pagination',
			autoplayDisableOnInteraction:false
			//paginationType : 'custom',
			 // paginationCustomRender: function (swiper, current, length) {
			     //this.setState({
			    // 	paginationCustomRender:{current + ' of ' + length}
			    // }) 
			    //console.log( {current + ' of ' + length});
			    //console.log(current); 
			 // }
		});     
	}
};

export default News;


