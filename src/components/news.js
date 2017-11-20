import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'reactjs-iscroll';
import api from './api';
import Footer from './footer';
import {globalData} from './global.js';
import { hashHistory, Link } from 'react-router';
var key1 = globalData.key;
var toast=globalData.toast;
class News extends Component {
	constructor() {
	    super();
	    this.state = {
	  		list: [],
	  		scrollShow:false,
	  		currentPage: 1,
	      	lastPage: false,
	      	banner:[],
			pageSize:10
	    };
	    this.toNewsDetail = (event) => {
	    	var articleId=event.currentTarget.getAttribute("data-articleid");
	    	var data = {articleId:articleId};
			var path = {
			  pathname:'/NewsDetail',
			  query:data,
			}
			hashHistory.push(path);
		}
	    this.bannerUrl = (event) => {
	    	var objUrl=event.currentTarget.getAttribute("data-objUrl");
	    	if(objUrl){
	    		window.location.href=objUrl;
	    	}
		}
		this.handleRefresh = this.handleRefresh.bind(this);
	  	this.loadData = this.loadData.bind(this);
	    this.logoError=(event)=>{
	    	event.target.src="src/img/icon/capitalLogo.jpg";
			event.target.onerror=null; //控制不要一直跳动 
			//console.log(event.target.src);
	    }
 	}
	
  handleRefresh(downOrUp, callback) {
    //真实的世界中是从后端取页面和判断是否是最后一页
    var that=this;
    //console.log(this);
    //console.log(that);
    let {currentPage, lastPage,pageSize,totalPage} = that.state;
   //console.log(that.state);
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
	  
  }
  loadData(downOrUp,callback) {
  		var that=this;
  		var key1 = globalData.key;
		var toast=globalData.toast;
	 	const {currentPage,pageSize,list} = that.state;
	 	var arr=[];
	 	api.articleList(currentPage,pageSize,function(res){
			////console.log(res);
			if(res.code=="0000"){
				var data =JSON.parse(strDec(res.data,key1,"",""));
				//console.log(data);
				var articleList=data.list;
				var total=data.total;
				var totalPage=Math.ceil(total/pageSize);
				if(totalPage>1){
					that.setState({scrollShow:true})
				}
				var articleArr=[];
				if(articleList.length<1){
					articleArr.push(<div key={Math.random()} style={{'textAlign':'center','lineHeight':'1rem'}}>暂无数据</div>)
				}else{
					for(var i in articleList){
						articleArr.push(<dl className="newsList" data-articleid={articleList[i].articleId} key={Math.random()} onClick={that.toNewsDetail}>
	    							<dd>
	    								<h4>{articleList[i].articleTitle}</h4>
	    								<p><span>{articleList[i].addTime}</span> <span>{articleList[i].readerNum}阅读</span></p>
	    							</dd>
	    							<dt>
	    								<img src={articleList[i].imgUrl} onError={that.logoError} />
	    							</dt>
	    					</dl>)
					}
				}
				if(downOrUp=='up'){
					var c=list.concat(articleArr);
				}else{
					var c=articleArr;
				}
				that.setState({
					totalPage:totalPage,
					list:c
				})
				if (callback && typeof callback === 'function') {
		            callback();
		          }
			}else{
				toast.show(res.msg,2000);
			}
		},function(){
			toast.show("连接错误",2000);
		})

        }
  
	componentDidMount(){
		var that=this;
		var key1 = globalData.key;
		var toast = globalData.toast;
		const {currentPage,pageSize,list} = that.state;
		this.loadData();
		var newsArticle=sessionStorage.getItem("newsArticle");
		if(newsArticle){
			var bannerList=JSON.parse(newsArticle);
			for (var i in bannerList) {
            	that.state.banner.push(
              	 <div className="swiper-slide" key={i} data-objUrl={bannerList[i].objUrl} onClick={that.bannerUrl}>
              	 	<img src={bannerList[i].imgUrl}/>
              	 </div>
              	 )
            };
            that.setState({
	        	banner:that.state.banner
	        })
		}else{
			api.banner(function(res){
					//console.log(res);
					if(res.code=="0000"){
						var bannerList =JSON.parse(strDec(res.data,key1,"",""));
						sessionStorage.setItem("newsArticle",JSON.stringify(bannerList));
						//console.log(bannerList);
			               for (var i in bannerList) {
				            	that.state.banner.push(
				              	 <div className="swiper-slide" key={i} data-objUrl={bannerList[i].objUrl} onClick={that.bannerUrl}>
				              	 	<img src={bannerList[i].imgUrl}/>
				              	 </div>
				              	 )
				            };
				            that.setState({
					        	banner:that.state.banner
					        })
					}else{
						toast.show(res.msg,2000);
					}
					
				},function(){
				toast.show("连接错误",2000);
			});
		}
		//console.log(that.state.banner);
		
		that.timeoutId = setTimeout((event) => {
	      var swiper = new Swiper("#bannerList",{
				loop:true,
				autoplay : 3000,
				speed:500,
				pagination: '.swiper-pagination',
				autoplayDisableOnInteraction:false,
				/*onTap: function(swiper,event){
					var swiperIndex=swiper.activeIndex;
					console.log(swiperIndex);
					var objUrl=$(".swiper-slide:nth-of-child("+[swiperIndex]+")").attr("data-objUrl");
					console.log(objUrl);.children('td').eq(1).
			     	 //var objUrl=event.currentTarget.getAttribute("data-objUrl");
			     	 //console.log(objUrl);
			     	 if(objUrl){
			     	 	window.location.href=objUrl;
			     	 }
			    	
			    }*/
			});
	    }, 500)
		
	}
	
	
	render(){
		var that=this;
		var scollTxt=[];
		if(that.state.scrollShow){
			//if(true){
			scollTxt.push(<ReactIScroll key={Math.random()} iScroll={iScroll}  handleRefresh={this.handleRefresh} >
					        	{that.state.list}
					        </ReactIScroll>)
		}else{
			scollTxt=that.state.list;
		}
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
					<h3>你关心的资讯</h3>
					<div className="newsBox">
				       <div className="listWrap">
						 	{scollTxt}
		        		</div>
				    </div>
				</div>
	        	<Footer activeIndex="1"/>
        	</div>
        )
	}
	 componentWillUnmount() {
	    clearTimeout(this.timeoutId)
	  }
	/*componentDidUpdate(){
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
	}*/
};

export default News;


