import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import {globalData} from './global.js';
import Header from './header';
import { hashHistory } from 'react-router';
import '../css/map.css';

var key1 = globalData.key;
var MyMap=React.createClass({
	getInitialState:function(){
		return{
			address:localStorage.getItem('dingwei')||"无法定位到当前城市",
			user:JSON.parse(localStorage.getItem('users')),
			shop_id:40,
			url_interface:"tc.ggrsc.com"
		}
	},
	componentWillMount:function(){
		var that = this;
		var url_interface = that.state.url_interface;
		
		$.ajax({
			type:"get",
			url:"http://"+url_interface+"/sopa/shop/index",
			data:{tcggsc:'c2726d9cbd6f600f12d60352729060c3'},
			success:function(data){
				//console.log(data.result);
				if(data.state == 1){
					var li_arr = [];//循环的li
					var loutiarr= [];//右侧楼梯字母的数据
					for(var i in data.result){
						var div_arr = [];//循环的站点名称
						var div_zim = [];//字母
						
						div_zim.push(<div className="greyTitle" id={i} key={Math.random()}>{data.result[i].pinying}</div>);
						for(var j = 0 ; j < data.result[i].res.length ; j++){
							div_arr.push(<div className="each_main_1 sendCityId" key={'main_1'+j} data-shop_id={data.result[i].res[j].shop_id}>{data.result[i].res[j].name}</div>);
						}
						li_arr.push(<li key={i}>
										{div_zim}
										<div className="each_main sendCityId" >
											{div_arr}
										</div>
									</li>);
						loutiarr.push(<li key={Math.random()}><a href={'#'+i}>{data.result[i].pinying}</a></li>)			
					}
				}
				
				var hotCity=["上海","深圳","上海","深圳","上海","深圳","上海","深圳","上海","深圳"];
				var hotCityHtml=[];
				$.each(hotCity,function(index,value){
					hotCityHtml.push(<li className="hotCityLi sendCityId">{value}</li>)
				})
				/*hotCity.forEach(function(i){
					
				})*/
				that.setState({
					li_arr:li_arr,
					loutiarr:loutiarr,
					hotCity:hotCity,
					hotCityHtml:hotCityHtml
				});
			}
		});
	},
	render:function(){
		return(
			<div className="map app_Box">
				<Header title="城市选择" />
				<div className="mapCon" id="mapCon">
					<div className="currentAddressBox">
						<p className="greyTitle">当前定位城市</p>
						<div className="currentAddress sendCityId">{this.state.address}</div>
					</div>
					<div className="hotAddressBox">
						<p className="greyTitle">热门城市</p>
						<ul className="hotAddress">{this.state.hotCityHtml}</ul>
					</div>
					
					<ul className="cityList">
						{this.state.li_arr}
					</ul>
					<div className="rightLetter">
						<ul className="louti">
							{this.state.loutiarr}
						</ul>
					</div>
				</div>
				
			</div>
		)
	},
	componentDidMount:function(){
		var that = this;

			api.getCityList(function (res) {
				console.log(res.data);
				var deResult = strDec(res.data,key1,"","");
            	console.log(deResult);
			});


//============滑动屏幕使对应的值相对定位
//			
//			function getTopDistance() {
//				return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
//			}
//			document.addEventListener("touchmove",function(){
//				var scrollTop = $("#content").scrollTop();
//				var qian=$(".zhandian_search").height()+$(".dangqian").height()+$(".dingwei_city").height();
//				if(scrollTop==qian){
//					$(".all_address li").eq(0).find(".each_word").css({
//						"position":"fixed",
//						"left":0,
//						"top":"0.88rem"
//						})
//				}
//				var sum=0;
//				for(var i=0;i<index;i++){
//					sum+=$(".all_address li").eq(i).height();
//				}
//				$("#content").scrollTop(sum+qian);
				
//				var aheight=$(".all_address li").height();
//				for(var i=0;i<$(".all_address li").length;i++){
//					var aheight=$(".all_address li").eq(i).height();
////					alert(aheight);
////					return false;
////					if(scrollTop==aheight+100){
////								alert("sss")		
////					}
////					return false;
//				}
//				alert(aheight);
//			})
	
	},
	componentDidUpdate:function(){
	    var that = this;
		/*$(".each_main_1").click(function(){
			var shop_id = $(this).attr('data-shop_id');
			//此操根据shop_id重新加载首页内容，
			JSON.stringify(localStorage.setItem('shop_id',shop_id));
		});*/
		
		$("#mapCon").on("click",".sendCityId",function(){
			var cityId=$(this).attr("data-shop_id");
			//console.log(cityId);
			
			hashHistory.push({  
		        pathname: '/',  
		        query: {  
		            cityId:cityId,  
		            price:'100'  
		        }  
		    })
			
			
		})
		
		
//============点击右边楼梯的字母进行切换地区
		/*$(".louti li").click(function(){
			var index=$(this).index();
			console.log(index);
			var qian=$(".zhandian_search").height()+$(".dangqian").height()+$(".dingwei_city").height();
			if(index==0){
				$("#content").scrollTop(qian)
			}else{
				var sum=0;
				for(var i=0;i<index;i++){
					sum+=$(".all_address li").eq(i).height();
				}
				$("#content").scrollTop(sum+qian)
			}
		})*/	
		
	}
});
export default MyMap;

