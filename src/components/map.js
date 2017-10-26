import React from 'react';
import ReactDom from 'react-dom';
var Map=React.createClass({
	getInitialState:function(){
		return{
			kindList:"",
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
				console.log(data.result);
				if(data.state == 1){
					var li_arr = [];//循环的li
					var loutiarr= [];//右侧楼梯字母的数据
					for(var i in data.result){
						var div_arr = [];//循环的站点名称
						var div_zim = [];//字母
						
						div_zim.push(<div className="each_word" key={Math.random()}>{data.result[i].pinying}</div>);
						for(var j = 0 ; j < data.result[i].res.length ; j++){
							div_arr.push(<div className="each_main_1" key={j} data-shop_id={data.result[i].res[j].shop_id}>{data.result[i].res[j].name}</div>);
						}
						li_arr.push(<li key={i}>
										{div_zim}
										<div className="each_main">
											{div_arr}
										</div>
									</li>);
						loutiarr.push(<li key={Math.random()}>{data.result[i].pinying}</li>)			
					}
				}
				that.setState({
					li_arr:li_arr,
					loutiarr:loutiarr
				});
			}
		});
	},
	render:function(){
		return(
			<div className="zhandianContent">
				<div className="zhandian_search">
					<div className="search">
						<div className="search_logo">
							<img src="img/zhandian_search.png"/>
						</div>
						<input type="text" placeholder="输入城市名或拼音查询" />
					</div>
					<div className="quxiao">取消</div>
				</div>
				<div className="dangqian">
					<span>当前:</span>
					<span>上海全城</span>
				</div>
				<div className="dingwei_city">
					<p>定位城市</p>
					<p>郑州</p>
					<p>最近访问城市</p>
					<p>
						<span>舞阳</span>
						<span>济源</span>
						<span>舞阳</span>
					</p>
				</div>
				<ul className="all_address">
					{this.state.li_arr}
				</ul>
				<div className="fixed">
					<ul className="louti">
						{this.state.loutiarr}
					</ul>
				</div>
			</div>
		)
	},
	componentDidMount:function(){
		var that = this;
//=============点击搜索变换搜索样式
		$(".search input").click(function(){
			$(".search").css("width","6.2rem");
			$(".search_logo").css("margin-left","0.3rem");
			$(this).css("width","5.3rem")
			$(".quxiao").css("display","block");
		});
//============点击搜索旁边的取消按钮（即取消搜索的操作，使input框不获取焦点）
		$(".quxiao").click(function(){
			$(".search").css("width","6.9rem");
			$(".search_logo").css("margin-left","2.15rem");
			$(".search input").css("width","4.2rem")
			$(".quxiao").css("display","none");
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
		$(".each_main_1").click(function(){
			var shop_id = $(this).attr('data-shop_id');
			//此操根据shop_id重新加载首页内容，
			JSON.stringify(localStorage.setItem('shop_id',shop_id));
		});
//============点击右边楼梯的字母进行切换地区
		$(".louti li").click(function(){
			var index=$(this).index();
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
		})	
		
	}
});
export default Map;

