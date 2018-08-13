'use strict';
// import React from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import HomeHeader from './homeHeader';
import Footer from './footer';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import { Toast,Carousel } from 'antd-mobile';
import util from "./util";

import '../css/home.css';

var imgPath = globalData.imgPath;
var Home = React.createClass({
    getInitialState: function () {
        return {
            activeTab: 1,
            isLoading: false,
            activeIndex: 0,
            pageNum: 1,
            pageSize: 10,
            list: [],
            banner: [{"imgUrl":"uploadImg/3.jpg"},{"imgUrl":"uploadImg/timg.jpg"}],
            imgHeight: "4.47rem",
            autoplay:false,
            newsList:[
                {newsId:"1531485834",title:"66666"} ,
                {newsId:"1531485835",title:"555"}
            ]
        }
    },
    componentWillMount: function () {
        var that=this;
        var key1 = globalData.key;
        var user = localStorage.getItem("user");
        var that=this;
        if(user){
            this.setState({
                user:JSON.parse(user)
            })
        }else{
            this.setState({
                user:''
            })
        }
    },
    toListDetail: function (event) {
        var id = event.currentTarget.getAttribute("data-id");
        var type = event.currentTarget.getAttribute("data-type");
        var data = { id: id };
            var path = {
                pathname: '/ListDetail',
                query: data,
            }
        hashHistory.push(path);
        /**
         * 热门借款埋点
         */
        var data={
            eventName:"热门借款产品",
            eventId:"7",
            message1:"",
            message2:"",
            message3:""
        }
        util.appBrige.start(data);
    },

    logoError: function (event) {
        event.target.src = "src/img/icon/logo.png";
        event.target.onerror = null; //控制不要一直跳动 
        //console.log(event.target.src);
    },



    tolicai(){
        var path = {
            pathname: '/licai',
        }
        hashHistory.push(path);
    },


    toList: function (event) {
        const tag = event.currentTarget.getAttribute("data-tag");
        const txt = event.currentTarget.getAttribute("data-txt");
        const tagId = event.currentTarget.getAttribute("data-tagId");
        const data = { tag: tagId, tagId: tagId, txt: txt };
        const path = {
            pathname: '/List',
            state: data
        }
        hashHistory.push(path);
    },
    toNewsDetail: function (event) {
        var newsId = event.currentTarget.getAttribute("data-newsId");
        //console.log(articleId);
        var data = { newsId: newsId };
        var path = {
            pathname: '/NewsDetail',
            query: data,
        }
        hashHistory.push(path);
        /**
         * 单条资讯埋点
         */
        var data={
            eventName:"贷款资讯",
            eventId:"2",
            message1:"",
            message2:"",
            message3:""
        }
        util.appBrige.start(data);
    },
    //借款
    toLoan: function () {
        var path = {
            pathname: '/loanList',
        }
        hashHistory.push(path);
         /**
         * 借款埋点
         */
        var data={
            eventName:"产品概要(借款)",
            eventId:"7",
            message1:"",
            message2:"",
            message3:""
        }
        util.appBrige.start(data);
    },
    //信用卡
    toCard(){
        var path = {
            pathname: '/creditCard',
        }
        hashHistory.push(path);
         /**
         * 信用卡埋点
         */
        var data={
            eventName:"产品概要(信用卡)",
            eventId:"5",
            message1:"",
            message2:"",
            message3:""
        }
        util.appBrige.start(data);
    },
    //任务
    toTask(){
        var path = {
            pathname: '/task',
        }
        hashHistory.push(path);
         /**
         * 任务埋点
         */
        var data={
            eventName:"产品概要(任务)",
            eventId:"4",
            message1:"",
            message2:"",
            message3:""
        }
        util.appBrige.start(data);
    },
    newsAll(){
        var path = {
            pathname: '/news',
        }
        hashHistory.push(path);
    },
    //热门信用卡
    goHotCre(){
        /**
         * 热门信用卡埋点
         */
        var data={
            eventName:"热门信用卡",
            eventId:"8",
            message1:"",
            message2:"",
            message3:""
        }
        util.appBrige.start(data);
    },
    componentDidMount: function () {
        var key1 = globalData.key;
        var toast = globalData.toast;
        var that = this;
        // console.log(this.state.user)
        if(this.state.user){
            var phone=this.state.user.phone;
            //消息是否有新的
            api.newsList(phone,function(res){
                var key1 = globalData.key;
                if(res.code=="0000"){
                    var temp = JSON.parse(strDec(res.data, key1, "", ""))[0];
                    // console.log("temp");
                    if(temp.systemNotices.length||temp.viewsMyNews.length)
                        that.setState({
                            hasMsg:true
                        },function(){
                        //    console.log(that.state.hasMsg)
                        })
                }else{
                    Toast.info(res.msg,2);
                }
            })
        }
        
        //轮播图
      
            api.banner(function (res) {
                if (res.code = "0000") {
                    var Decdata = JSON.parse(strDec(res.data, key1, "", ""));
                    sessionStorage.setItem("banner", JSON.stringify(Decdata));
                    // console.log(Decdata)
                    that.setState({
                        banner:Decdata
                    },function(){
                       
                    })
                    // var bannerArr = [];
                    // for (var i in Decdata) {                       
                    //     bannerArr.push(
                    //         <a style={{ display: 'inline-block', width: '100%'}} key={i}>
                    //         <img
                    //             src={imgPath + Decdata[i].imgUrl}
                    //             // src="src/img/banner.png"
                    //             alt=""
                    //             style={{ 'maxWidth': '100%', 'maxHeight': '100%', 'verticalAlign': 'top' }}
                    //             onLoad={() => {
                    //                 window.dispatchEvent(new Event('resize'));
                    //                 // this.setState({ imgHeight: 'auto' });
                    //             }}
                    //             />
                    //         </a>
                    //                    )
                    // }
                    // that.setState({
                    //     bannerArr: bannerArr,
                    // })

            } else {
                Toast.info(res.msg, 2);
            }
        }, function () {
            Toast.info("连接错误", 2);
        })
        
        //咨讯      
        api.articleList(true,function (res) {
            if (res.code = "0000") {
                var Decdata = JSON.parse(strDec(res.data, key1, "", ""));
                // console.log(Decdata)
                that.setState({
                    newsList:Decdata.topList
                },function(){
                    
                })               

            } else {
                Toast.info(res.msg, 2);
            }
        }, function () {
            Toast.info("连接错误", 2);
        })
        
        //热门借款产品     
        api.hotLoanList("0", function (res) { 
            if(res.code == "0000"){
                var Decdata = JSON.parse(strDec(res.data, key1, "", ""));
                // console.log(Decdata);
                // var hotLoanList = Decdata.list;
                sessionStorage.setItem("hotLoanList", JSON.stringify(Decdata));
                var hotLoanArr = [];
                for (var i in Decdata) {
                    if(Decdata[i].hot == 0){
                    //    console.log("abch")
                        hotLoanArr.push(
                        <li key={i} data-id={Decdata[i].id} onClick = {that.toListDetail}>
                        <img src={imgPath + Decdata[i].logo} />
                        <div className="loanTitle">
                            <p>{Decdata[i].name}</p>
                            <p className="adjust">适用人群：{Decdata[i].intendedFor}</p>
                        </div>
                        <div className="high">
                            <p>
                                {Decdata[i].maximumAmount>9999?<span>{Decdata[i].maximumAmount/10000}万</span>:<span>{Decdata[i].maximumAmount}元</span>}
                                {/* <span>{Decdata[i].maximumAmount}</span>万     */}
                            </p>
                            <p>最高额度</p>
                        </div>
                    </li>    
                                    
                    )
                    }
                    
                }
                that.setState({
                    hotLoanArr: hotLoanArr
                })
                
            }
        })

        //热门信用卡      
        api.hotCreditCardList(function (res) { 
            if(res.code == "0000"){
                var Decdata = JSON.parse(strDec(res.data, key1, "", ""));
                // console.log(Decdata);
                var creditCardList = Decdata.list;
                // sessionStorage.setItem("creditCardList", JSON.stringify(creditCardList));
                var creditCardArr = [];
                for (var i in creditCardList ) {
                    if(creditCardList[i].hot == 0){
                    creditCardArr.push(
                        <a key={i} href={creditCardList[i].creditCardLink} onClick={that.goHotCre}>
                            <img src={imgPath + creditCardList[i].logo}  />
                            <div className="loanTitle">
                                <p>{creditCardList[i].name}</p>
                                <p>{creditCardList[i].describeTion}</p>
                            </div>
                            <div className="high">
                                <img src={creditCardList[i].hotImg}/>
                            </div>
                        </a>
                                    
                    )
                    }                    
                }
                that.setState({
                    creditCardArr: creditCardArr
                })
                
            }
        })
       
        
    },
      
    componentWillUpdate(){
    },
    goBanner(url){
        window.location.href=url;
        /**
         * 轮播图埋点
         */
        var data={
            eventName:"轮播图",
            eventId:"6",
            message1:"",
            message2:"",
            message3:""
        }
        util.appBrige.start(data);
    },


    
    render: function () {
        var that = this;
        var curCity = that.props.location.query.cityId;
        return (
            <div className="app_Box home">
                <HomeHeader curCity={curCity} hasMsg={this.state.hasMsg}/>
                <div className="content">
                    <div className="bannernews"> 
                        <Carousel
                            autoplay={true}
                            infinite={true}
                            dotStyle={{"backgroundColor":"#fff",'width':'0.28rem','height':'0.04rem','borderRadius':'0.06rem','marginRright':'0.18rem'}}
                            dotActiveStyle={{"backgroundColor":'#4374ff','width':'0.28rem','height':'0.04rem','borderRadius':'0.06rem'}}
                        >
                           
                            {/* {this.state.bannerArr} */}
                            {this.state.banner.map(function(item,i){
                                return (
                                    <a style={{ display: 'inline-block', width: '100%',height: that.state.imgHeight}} key={i} onClick={that.goBanner.bind(that,item.objUrl)}>
                                    <img
                                        src={imgPath+item.imgUrl}
                                        // src="src/img/banner.png"
                                        alt=""
                                        style={{ 'width': '100%', 'height': '4.47rem', 'verticalAlign': 'top' }}
                                        onLoad={() => {
                                            window.dispatchEvent(new Event('resize'));
                                            that.setState({ imgHeight:"auto" });
                                        }}
                                        />
                                    </a>
                                )
                            })}
                        </Carousel>
                        <ul className="news" onClick={this.newsAll}>
                            <li className="newvoice">
                                {/* <img src="src/img/icon/voice.png" /> */}
                                <img src={require(`../img/img/web/voice.png`)} />
                            </li>
                            <li>贷款资讯：</li>
                            <li>
                                <Carousel 
                                    vertical
                                    dots={false}
                                    dragging={false}
                                    swiping={false}
                                    autoplay
                                    infinite
                                    >
                                {this.state.newsList.map((item,index)=>{
                                    return (
                                        <div className="v-item" key={index} onClick={that.toNewsDetail}  data-newsId={item.newsId} >{item.title}</div>
                                    )
                                 })}
                                </Carousel>
                            </li>
                            <li className="newsgo" onClick={this.newsAll}>
                                <img src="src/img/icon/go1.png" />
                            </li>
                        </ul>                                         
                        </div>
                    <div className="product">
                        <p>
                            <span></span>
                            {/* <i className="pro-icon" style={{backgroundImage:"url('src/img/icon/pro-icon1.png')"}}></i> */}
                            <i className="pro-icon" style={{backgroundImage:`url(${require(`../img/img/web/pro-icon1.png`)})`}}></i>                            
                            产品概要
                            <span></span>
                        </p>
                        <ul className="loanTab loanTan1">                           
                            <li onClick={that.toLoan}>
                                {/* <img src="src/img/icon/product1.png" /> */}
                                <img src={require(`../img/img/web/product1.png`)}/>                                
                                <div>
                                    <p>借款</p>
                                    <p>海量产品任你选</p>
                                </div>
                                
                            </li>
                            <li onClick={that.tolicai}>
                                {/* <img src="src/img/icon/product2.png" /> */}
                                <img src={require(`../img/img/web/product2.png`)}/>                                                                
                                <div>
                                    <p>理财</p>
                                    <p>优质的理财产品</p>
                                </div>
                            </li>
                        </ul>
                        <ul className="loanTab loanTab2">                           
                            <li onClick={that.toCard}>
                                {/* <img src="src/img/icon/product3.png" /> */}
                                <img src={require(`../img/img/web/product3.png`)}/>                                                                
                                <div>
                                    <p>信用卡</p>
                                    <p>快卡通道</p>
                                </div>                                
                            </li>
                            <li onClick={that.toTask}>
                                {/* <img src="src/img/icon/product4.png" /> */}
                                <img src={require(`../img/img/web/product4.png`)}/>                                                                
                                <div>
                                    <p>任务</p>
                                    <p>做任务&nbsp;拿现金</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="product loan">
                        <p>
                            <span></span>
                            {/* <i className="pro-icon" style={{backgroundImage:"url('src/img/icon/pro-icon2.png')"}}></i> */}
                            <i className="pro-icon" style={{backgroundImage:`url(${require(`../img/img/web/pro-icon2.png`)})`}}></i>
                            热门借款产品
                            <span></span>
                        </p>
                        <ul>
                            {that.state.hotLoanArr}  
                        </ul>
                        
                    </div>
                    <div className="product loan credit">
                        <p>
                            <span></span>
                            {/* <i className="pro-icon" style={{backgroundImage:"url('src/img/icon/pro-icon3.png')"}}></i> */}
                            <i className="pro-icon" style={{backgroundImage:`url(${require(`../img/img/web/pro-icon3.png`)})`}}></i>                            
                            热门信用卡
                            <span></span>
                        </p>
                        <ul>
                            {that.state.creditCardArr}
                        </ul>
                        
                    </div>
                </div>
                <Footer activeIndex="0" />
            </div>
        )
    }
});
setInterval(function () {
    //console.log("hhhh")
    sessionStorage.removeItem("homeArticle");
    sessionStorage.removeItem("homeLoan");
    sessionStorage.removeItem("homeTag");
    sessionStorage.removeItem("newsArticle");
}, 300000)

export default Home;
