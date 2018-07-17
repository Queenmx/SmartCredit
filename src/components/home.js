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
            banner: [],
            imgHeight: 447,
        }
    },

    componentWillMount: function () {
    },
    toListDetail: function (event) {
        var loanId = event.currentTarget.getAttribute("data-loanId");
        var type = event.currentTarget.getAttribute("data-type");
        var data = { loanId: loanId };
        if (type == "JZD") {
            var path = {
                pathname: '/ListDetail',
                query: data,
            }
        } else if (type == "KSD") {
            var path = {
                pathname: '/ListDetailKSD',
                query: data,
            }
        } else {
            Toast.info("数据错误", 2)
        }
        hashHistory.push(path);
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
        var articleId = event.currentTarget.getAttribute("data-articleid");
        //console.log(articleId);
        var data = { articleId: articleId };
        var path = {
            pathname: '/NewsDetail',
            query: data,
        }
        hashHistory.push(path);
    },

    toLoan: function () {
        var path = {
            pathname: '/loanList',
        }
        hashHistory.push(path);
    },
    toCard(){
        var path = {
            pathname: '/creditCard',
        }
        hashHistory.push(path);
    },
    toTask(){
        var path = {
            pathname: '/task',
        }
        hashHistory.push(path);
    },
    newsAll(){
        var path = {
            pathname: '/news',
        }
        hashHistory.push(path);
    },
    componentDidMount: function () {
        var key1 = globalData.key;
        var toast = globalData.toast;
        var that = this;

        // var homeLoan = sessionStorage.getItem("homeLoan");
        // if (homeLoan) {
        //     console.log(homeLoan);
        //     var loanList = JSON.parse(homeLoan);
        //     var arr = [];
        //     //console.log(loanList)
        //     for (var i in loanList) {
        //         var theDate = loanList[i].limitType;
        //         var theDateTxt;
        //         switch (theDate) {
        //             case "Y":
        //                 theDateTxt = "年"
        //                 break;
        //             case "M":
        //                 theDateTxt = "月"
        //                 break;
        //             case "D":
        //                 theDateTxt = "日"
        //                 break;
        //             default:
        //                 break;
        //         }
        //         var theDateRate = loanList[i].rateType;
        //         var theDateRateTxt;
        //         switch (theDateRate) {
        //             case "Y":
        //                 theDateRateTxt = "年"
        //                 break;
        //             case "M":
        //                 theDateRateTxt = "月"
        //                 break;
        //             case "D":
        //                 theDateRateTxt = "日"
        //                 break;
        //             default:
        //                 break;
        //         }
        //         arr.push(<div className="capitalList" key={i} data-loanId={loanList[i].loanId} data-type={loanList[i].type} onClick={that.toListDetail}>
        //             <h3>
        //                 <img src={imgPath + loanList[i].logo} onError={that.logoError} />
        //                 <span>{loanList[i].loanName}</span>
        //             </h3>
        //             <div className="capitalInfo">
        //                 <div className="limit">
        //                     <h2>{loanList[i].moneyMin}~{loanList[i].moneyMax}</h2>
        //                     <p>额度范围(元)</p>
        //                 </div>
        //                 <ul className="special">
        //                     <li>{loanList[i].loanTime}</li>
        //                     <li>{theDateRateTxt}费率{loanList[i].rate}%</li>
        //                     <li>贷款期限{loanList[i].limitMin}-{loanList[i].limitMax}{theDateTxt}</li>
        //                 </ul>
        //                 <div className="apply">
        //                     <a href="javascript:;" >申请贷款</a>
        //                 </div>
        //             </div>

        //         </div>)
        //     }

        //     that.setState({
        //         list: arr
        //     })
        // } else {
        //     api.loanList(1, 10, "", "", function (res) {
        //         if (res.code == "0000") {
        //             console.log("=====")
        //             var data = JSON.parse(strDec(res.data, key1, "", ""));
        //             // var data = res.data
        //             console.log(data)
        //             //var data=res.data;
        //             var loanList = data.list;

        //             sessionStorage.setItem("homeLoan", JSON.stringify(loanList));
        //             var arr = [];
        //             for (var i in loanList) {
        //                 var theDate = loanList[i].limitType;
        //                 var theDateTxt;
        //                 switch (theDate) {
        //                     case "Y":
        //                         theDateTxt = "年"
        //                         break;
        //                     case "M":
        //                         theDateTxt = "月"
        //                         break;
        //                     case "D":
        //                         theDateTxt = "日"
        //                         break;
        //                     default:
        //                         break;
        //                 }

        //                 var theDateRate = loanList[i].rateType;
        //                 var theDateRateTxt;
        //                 switch (theDateRate) {
        //                     case "Y":
        //                         theDateRateTxt = "年"
        //                         break;
        //                     case "M":
        //                         theDateRateTxt = "月"
        //                         break;
        //                     case "D":
        //                         theDateRateTxt = "日"
        //                         break;
        //                     default:
        //                         break;
        //                 }
        //                 arr.push(<div className="capitalList" key={i} data-loanId={loanList[i].loanId} data-type={loanList[i].type} onClick={that.toListDetail}>
        //                     <h3>
        //                         <img src={imgPath + loanList[i].logo} onError={that.logoError} />
        //                         <span>{loanList[i].loanName}</span>
        //                     </h3>
        //                     <div className="capitalInfo">
        //                         <div className="limit">
        //                             <h2>{loanList[i].moneyMin}~{loanList[i].moneyMax}</h2>
        //                             <p>额度范围(元)</p>
        //                         </div>
        //                         <ul className="special">
        //                             <li>{loanList[i].loanTime}</li>
        //                             <li>{theDateRateTxt}利率{loanList[i].rate}%</li>
        //                             <li>贷款期限{loanList[i].limitMin}-{loanList[i].limitMax}{theDateTxt}</li>
        //                         </ul>
        //                         <div className="apply">
        //                             <a href="javascript:;">申请贷款</a>
        //                         </div>
        //                     </div>

        //                 </div>)
        //             }

        //             that.setState({
        //                 list: arr
        //             })

        //         } else {
        //             Toast.info("连接错误", 2);
        //         }
        //     }, function () {
        //         Toast.info("连接错误", 2);
        //     })
        // }
        var banner = sessionStorage.getItem("banner");
        if (banner) {
            var bannerList = JSON.parse(banner);
            var bannerArr = [];
            for (var i in bannerList) {
                bannerArr.push(
                    <a style={{ display: 'inline-block', width: '100%'}} key={i}>
                            <img
                                src={imgPath + bannerList[i].imgUrl}
                                // src="src/img/banner.png"
                                alt=""
                                style={{ 'maxWidth': '100%', 'maxHeight': '100%', 'verticalAlign': 'top' }}
                                onLoad={() => {
                                    window.dispatchEvent(new Event('resize'));
                                    // this.setState({ imgHeight: 'auto' });
                                }}
                                />
                            </a>
                    // <div className="v-item" key={i} onClick={that.newsAll}>{articleList[i].articleTitle}</div>
                )
            }
            that.setState({
                bannerArr: bannerArr
            })
        } else {
            api.banner(function (res) {
                console.log(res);
                if (res.code = "0000") {
                    console.log(res.data)
                    var Decdata = JSON.parse(strDec(res.data, key1, "", ""));
                    console.log(Decdata)
                    // var Decdata =JSON.parse(res.data);
                //    console.log(Decdata)
                   
                //    console.log(articleList)
                    sessionStorage.setItem("banner", JSON.stringify(Decdata));
                    var bannerArr = [];
                    for (var i in Decdata) {
                       
                        bannerArr.push(
                            <a style={{ display: 'inline-block', width: '100%'}} key={i}>
                            <img
                                src={imgPath + Decdata[i].imgUrl}
                                // src="src/img/banner.png"
                                alt=""
                                style={{ 'maxWidth': '100%', 'maxHeight': '100%', 'verticalAlign': 'top' }}
                                onLoad={() => {
                                    window.dispatchEvent(new Event('resize'));
                                    // this.setState({ imgHeight: 'auto' });
                                }}
                                />
                            </a>

                                        // <div className="v-item" key={i} onClick={that.newsAll}>{articleList[i].articleTitle}</div>
                                       )
                            //  console.log(articleArr[i].articleTitle)
                    }
                    that.setState({
                        bannerArr: bannerArr
                    })

                } else {
                    Toast.info(res.msg, 2);
                }
            }, function () {
                Toast.info("连接错误", 2);
            })
        }
        var homeArticle = sessionStorage.getItem("homeArticle");
        if (homeArticle) {
            var articleList = JSON.parse(homeArticle);
            var articleArr = [];
            for (var i in articleList) {
                articleArr.push(
                    <div className="v-item" key={i} onClick={that.newsAll}>{articleList[i].articleTitle}</div>
                )
            }
            that.setState({
                articleArr: articleArr
            })
        } else {
            api.articleList("1", "10", function (res) {
                // console.log(res);
                if (res.code = "0000") {
                    // console.log(res.data)
                    var Decdata = JSON.parse(strDec(res.data, key1, "", ""));
                    console.log(Decdata)
                    // var Decdata =JSON.parse(res.data);
                //    console.log(Decdata)
                    var articleList = Decdata.list;
                   console.log(articleList)
                    sessionStorage.setItem("homeArticle", JSON.stringify(articleList));
                    var articleArr = [];
                    for (var i in articleList) {
                       
                        articleArr.push(
                            

                                        <div className="v-item" key={i} onClick={that.newsAll}>{articleList[i].articleTitle}</div>
                                       )
                            //  console.log(articleArr[i].articleTitle)
                    }
                    that.setState({
                        articleArr: articleArr
                    })

                } else {
                    Toast.info(res.msg, 2);
                }
            }, function () {
                Toast.info("连接错误", 2);
            })
        }
        var creditCardList = sessionStorage.getItem("creditCardList");
        if(creditCardList){
            var creditCardList = JSON.parse(creditCardList);
            var creditCardArr = [];
            for (var i in creditCardList ) {
                if(creditCardList[i].hotFlag == "Y"){
                    console.log("11111")
                 creditCardArr.push(
                     <li key={i}>
                        <img src={imgPath + creditCardList[i].logo}  />
                         <div className="loanTitle">
                             <p>{creditCardList[i].cardName}</p>
                             <p>{creditCardList[i].cardType}</p>
                         </div>
                         <div className="high">
                             <img src="src/img/icon/product5.png" />
                         </div>
                     </li>
                               
                 )
                }
                that.setState({
                    creditCardArr: creditCardArr
                })
                 
             }
        }else{
            api.creditCardList("1", "10", function (res) { 
                if(res.code == "0000"){
                    var Decdata = JSON.parse(strDec(res.data, key1, "", ""));
                    console.log(Decdata);
                    var creditCardList = Decdata.list;
                    sessionStorage.setItem("creditCardList", JSON.stringify(creditCardList));
                    var creditCardArr = [];
                    for (var i in creditCardList ) {
                       if(creditCardList[i].hotFlag == "Y"){
                           console.log("11111")
                        creditCardArr.push(
                            <li key={i}>
                                <img src={imgPath + creditCardList[i].logo}  />
                                <div className="loanTitle">
                                    <p>{creditCardList[i].cardName}</p>
                                    <p>{creditCardList[i].cardType}</p>
                                </div>
                                <div className="high">
                                    <img src="src/img/icon/product5.png" />
                                </div>
                            </li>
                                      
                        )
                       }
                        
                    }
                    that.setState({
                        creditCardArr: creditCardArr
                    })
                  
                }
            })
        }
      

    },


    render: function () {
        var that = this;
        var curCity = that.props.location.query.cityId;

        return (
            <div className="app_Box home">
                <HomeHeader curCity={curCity} />
                <div className="content">
                    <div className="bannernews"> 
                        <Carousel
                            autoplay={true}
                            infinite
                            selectedIndex={0}
                            dotStyle={{"backgroundColor":"#fff",'width':'0.28rem','height':'0.04rem','borderRadius':'0.06rem','marginRright':'0.18rem'}}
                            dotActiveStyle={{"backgroundColor":'#4374ff','width':'0.28rem','height':'0.04rem','borderRadius':'0.06rem'}}
                        >
                                
                            {/* {this.state.banner.map(ii => (
                                <a
                                    key={ii}
                                    href={ii.objUrl}
                                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                >
                                    <img
                                        src={imgPath + ii.imgUrl}
                                        alt=""
                                        style={{ 'maxWidth': '100%', 'maxHeight': '100%', 'verticalAlign': 'top' }}
                                        onLoad={() => {
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({ imgHeight: 'auto' });
                                        }}
                                    />
                                </a>
                            ))} */}
                            {this.state.bannerArr}
                            {/* <a
                                    
                                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                >
                                    <img
                                        // src={imgPath + ii.imgUrl}
                                        src="src/img/banner.png"
                                        alt=""
                                        style={{ 'maxWidth': '100%', 'maxHeight': '100%', 'verticalAlign': 'top' }}
                                        onLoad={() => {
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({ imgHeight: 'auto' });
                                        }}
                                    />
                                </a> */}
                                {/* <a
                                    
                                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                >
                                    <img
                                        // src={imgPath + ii.imgUrl}
                                        src="src/img/back.png"
                                        alt=""
                                        style={{ 'maxWidth': '100%', 'maxHeight': '100%', 'verticalAlign': 'top' }}
                                        onLoad={() => {
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({ imgHeight: 'auto' });
                                        }}
                                    />
                                </a>                    */}
                            </Carousel>
                             <ul className="news" onClick={this.newsAll}>
                                <li className="newvoice">
                                    <img src="src/img/icon/voice.png" />
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
                                     {this.state.articleArr}
                                     <div className="v-item" onClick={that.newsAll}></div>
                                     <div className="v-item" onClick={that.newsAll}></div>   
                                   
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
                            <i className="pro-icon" style={{backgroundImage:"url('src/img/icon/pro-icon1.png')"}}></i>
                            产品概要
                            <span></span>
                        </p>
                        <ul className="loanTab loanTan1">                           
                            <li onClick={that.toLoan}>
                                <img src="src/img/icon/product1.png" />
                                <div>
                                    <p>借款</p>
                                    <p>海量产品任你选</p>
                                </div>
                                
                            </li>
                            <li onClick={that.tolicai}>
                                <img src="src/img/icon/product2.png" />
                                <div>
                                    <p>理财</p>
                                    <p>优质的理财产品</p>
                                </div>
                            </li>
                        </ul>
                        <ul className="loanTab loanTab2">                           
                            <li onClick={that.toCard}>
                                <img src="src/img/icon/product1.png" />
                                <div>
                                    <p>信用卡</p>
                                    <p>快卡通道</p>
                                </div>                                
                            </li>
                            <li onClick={that.toTask}>
                                <img src="src/img/icon/product2.png" />
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
                            <i className="pro-icon" style={{backgroundImage:"url('src/img/icon/pro-icon2.png')"}}></i>
                            热门借款产品
                            <span></span>
                        </p>
                        <ul>
                            <li>
                                <img src="src/img/icon/product1.png" />
                                <div className="loanTitle">
                                    <p>点点贷-大额低息贷</p>
                                    <p>适用人群：上班族，企业主</p>
                                </div>
                                <div className="high">
                                    <p>
                                        <span>5</span>万    
                                    </p>
                                    <p>最高额度</p>
                                </div>
                            </li>
                            <li>
                                <img src="src/img/icon/product1.png" />
                                <div className="loanTitle">
                                    <p>点点贷-大额低息贷</p>
                                    <p>适用人群：上班族，企业主</p>
                                </div>
                                <div className="high">
                                    <p>
                                        <span>5</span>万    
                                    </p>
                                    <p>最高额度</p>
                                </div>
                            </li>
                        </ul>
                        
                    </div>
                    <div className="product loan credit">
                        <p>
                            <span></span>
                            <i className="pro-icon" style={{backgroundImage:"url('src/img/icon/pro-icon3.png')"}}></i>
                            热门信用卡
                            <span></span>
                        </p>
                        <ul>
                            {that.state.creditCardArr}
                            {/* <li>
                                <img src="src/img/icon/product1.png" />
                                <div className="loanTitle">
                                    <p>点点贷-大额低息贷</p>
                                    <p>卡种：上班族，企业主</p>
                                </div>
                                <div className="high">
                                    <img src="src/img/icon/product5.png" />
                                </div>
                            </li>
                            <li>
                                <img src="src/img/icon/product1.png" />
                                <div className="loanTitle">
                                    <p>点点贷-大额低息贷</p>
                                    <p>适用人群：上班族，企业主</p>
                                </div>
                                <div className="high">
                                <img src="src/img/icon/product6.png" />
                                </div>
                            </li> */}
                        </ul>
                        
                    </div>
                    {/* <div className="capitalBox">
                        {that.state.list}
                    </div> */}
                    {/* <div className="newsBox">
                        <h3>你关心的资讯</h3>
                        <div>
                            {that.state.articleArr}
                        </div>
                        <Link to="/news" className="linkNews">全部热门资讯<img src="src/img/icon/right.png" /></Link>
                    </div> */}
                    <Loading flag={that.state.isLoading} />
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
