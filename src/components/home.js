'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import HomeHeader from './homeHeader';
import Footer from './footer';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
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
            list: []
        }
    },

    componentWillMount: function () {
    },
    toListDetail: function (event) {
        var loanId = event.currentTarget.getAttribute("data-loanId");
        var data = { loanId: loanId };
        var path = {
            pathname: '/ListDetail',
            query: data,
        }
        hashHistory.push(path);
    },

    logoError: function (event) {
        event.target.src = "src/img/icon/logo.png";
        event.target.onerror = null; //控制不要一直跳动 
        //console.log(event.target.src);
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
            pathname: '/Loan',
        }
        hashHistory.push(path);
    },
    toProgress: function () {
        var path = {
            pathname: '/Progress',
        }
        hashHistory.push(path);
    },
    componentDidMount: function () {
        var key1 = globalData.key;
        var toast = globalData.toast;
        var that = this;

        var homeLoan = sessionStorage.getItem("homeLoan");
        if (homeLoan) {
            var loanList = JSON.parse(homeLoan);
            var arr = [];
            //console.log(loanList)
            for (var i in loanList) {
                var theDate = loanList[i].rateType;
                var theDateTxt;
                switch (theDate) {
                    case "Y":
                        theDateTxt = "年"
                        break;
                    case "M":
                        theDateTxt = "月"
                        break;
                    case "D":
                        theDateTxt = "日"
                        break;
                    default:
                        break;
                }
                arr.push(<div className="capitalList" key={i} data-loanId={loanList[i].loanId} onClick={that.toListDetail}>
                    <h3>
                        <img src={imgPath + loanList[i].logo} onError={that.logoError} />
                        <span>{loanList[i].loanName}</span>
                    </h3>
                    <div className="capitalInfo">
                        <div className="limit">
                            <h2>{loanList[i].moneyMin}~{loanList[i].moneyMax}</h2>
                            <p>额度范围(元)</p>
                        </div>
                        <ul className="special">
                            <li>{loanList[i].loanTime}</li>
                            <li>{theDateTxt}费率{loanList[i].rate}%</li>
                            <li>贷款期限{loanList[i].limitMin}-{loanList[i].limitMax}{theDateTxt}</li>
                        </ul>
                        <div className="apply">
                            <a href="javascript:;" >申请贷款</a>
                        </div>
                    </div>

                </div>)
            }

            that.setState({
                list: arr
            })
        } else {
            api.loanList(1, 5, "", function (res) {
                if (res.code == "0000") {
                    var data = JSON.parse(strDec(res.data, key1, "", ""));
                    //var data=res.data;
                    var loanList = data.list;

                    sessionStorage.setItem("homeLoan", JSON.stringify(loanList));
                    var arr = [];
                    for (var i in loanList) {
                        var theDate = loanList[i].rateType;
                        var theDateTxt;
                        switch (theDate) {
                            case "Y":
                                theDateTxt = "年"
                                break;
                            case "M":
                                theDateTxt = "月"
                                break;
                            case "D":
                                theDateTxt = "日"
                                break;
                            default:
                                break;
                        }
                        arr.push(<div className="capitalList" key={i} data-loanId={loanList[i].loanId} onClick={that.toListDetail}>
                            <h3>
                                <img src={imgPath + loanList[i].logo} onError={that.logoError} />
                                <span>{loanList[i].loanName}</span>
                            </h3>
                            <div className="capitalInfo">
                                <div className="limit">
                                    <h2>{loanList[i].moneyMin}~{loanList[i].moneyMax}</h2>
                                    <p>额度范围(元)</p>
                                </div>
                                <ul className="special">
                                    <li>{loanList[i].loanTime}</li>
                                    <li>{theDateTxt}利率{loanList[i].rate}%</li>
                                    <li>贷款期限{loanList[i].limitMin}-{loanList[i].limitMax}{theDateTxt}</li>
                                </ul>
                                <div className="apply">
                                    <a href="javascript:;">申请贷款</a>
                                </div>
                            </div>

                        </div>)
                    }

                    that.setState({
                        list: arr
                    })

                } else {
                    toast.show("连接错误", 2000);
                }
            }, function () {
                toast.show("连接错误", 2000);
            })
        }

        var homeArticle = sessionStorage.getItem("homeArticle");
        if (homeArticle) {
            var articleList = JSON.parse(homeArticle);
            var articleArr = [];
            for (var i in articleList) {
                articleArr.push(<dl className="newsList" data-articleid={articleList[i].articleId} key={Math.random()} onClick={that.toNewsDetail}>
                    <dd>
                        <h4>{articleList[i].articleTitle}</h4>
                        <p><span>{articleList[i].addTime}</span> <span>{articleList[i].readerNum}阅读</span></p>
                    </dd>
                    <dt>
                        <img src={imgPath + articleList[i].imgUrl} onError={that.logoError} />
                    </dt>
                </dl>)
            }
            that.setState({
                articleArr: articleArr
            })
        } else {
            api.articleList(1, 3, function (res) {
                //console.log(res);
                if (res.code == "0000") {
                    var data = JSON.parse(strDec(res.data, key1, "", ""));
                    //var data =JSON.parse(res.data);
                    //console.log(data);
                    var articleList = data.list;
                    sessionStorage.setItem("homeArticle", JSON.stringify(articleList));
                    var articleArr = [];
                    for (var i in articleList) {
                        articleArr.push(<dl className="newsList" data-articleid={articleList[i].articleId} key={Math.random()} onClick={that.toNewsDetail}>
                            <dd>
                                <h4>{articleList[i].articleTitle}</h4>
                                <p><span>{articleList[i].addTime}</span> <span>{articleList[i].readerNum}阅读</span></p>
                            </dd>
                            <dt>
                                <img src={imgPath + articleList[i].imgUrl} onError={that.logoError} />
                            </dt>
                        </dl>)
                    }
                    that.setState({
                        articleArr: articleArr
                    })

                } else {
                    toast.show(res.msg, 2000);
                }
            }, function () {
                toast.show("连接错误", 2000);
            })
        }
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
            pathname: '/Loan',
        }
        hashHistory.push(path);
    },

    componentDidMount: function () {
        var key1 = globalData.key;
        var toast = globalData.toast;
        var that = this;

        var homeLoan = sessionStorage.getItem("homeLoan");
        if (homeLoan) {
            var loanList = JSON.parse(homeLoan);
            var arr = [];
            //console.log(loanList)
            for (var i in loanList) {
                var theDate = loanList[i].rateType;
                var theDateTxt;
                switch (theDate) {
                    case "Y":
                        theDateTxt = "年"
                        break;
                    case "M":
                        theDateTxt = "月"
                        break;
                    case "D":
                        theDateTxt = "日"
                        break;
                    default:
                        break;
                }
                arr.push(<div className="capitalList" key={i} data-loanId={loanList[i].loanId} onClick={that.toListDetail}>
                    <h3>
                        <img src={imgPath + loanList[i].logo} onError={that.logoError} />
                        <span>{loanList[i].loanName}</span>
                    </h3>
                    <div className="capitalInfo">
                        <div className="limit">
                            <h2>{loanList[i].moneyMin}~{loanList[i].moneyMax}</h2>
                            <p>额度范围(元)</p>
                        </div>
                        <ul className="special">
                            <li>{loanList[i].loanTime}</li>
                            <li>{theDateTxt}费率{loanList[i].rate}%</li>
                            <li>贷款期限{loanList[i].limitMin}-{loanList[i].limitMax}{theDateTxt}</li>
                        </ul>
                        <div className="apply">
                            <a href="javascript:;" >申请贷款</a>
                        </div>
                    </div>

                </div>)
            }

            that.setState({
                list: arr
            })
        } else {
            api.loanList(1, 10, "", "", function (res) {
                if (res.code == "0000") {
                    var data = JSON.parse(strDec(res.data, key1, "", ""));
                    //var data=res.data;
                    var loanList = data.list;

                    sessionStorage.setItem("homeLoan", JSON.stringify(loanList));
                    var arr = [];
                    for (var i in loanList) {
                        var theDate = loanList[i].rateType;
                        var theDateTxt;
                        switch (theDate) {
                            case "Y":
                                theDateTxt = "年"
                                break;
                            case "M":
                                theDateTxt = "月"
                                break;
                            case "D":
                                theDateTxt = "日"
                                break;
                            default:
                                break;
                        }
                        arr.push(<div className="capitalList" key={i} data-loanId={loanList[i].loanId} onClick={that.toListDetail}>
                            <h3>
                                <img src={imgPath + loanList[i].logo} onError={that.logoError} />
                                <span>{loanList[i].loanName}</span>
                            </h3>
                            <div className="capitalInfo">
                                <div className="limit">
                                    <h2>{loanList[i].moneyMin}~{loanList[i].moneyMax}</h2>
                                    <p>额度范围(元)</p>
                                </div>
                                <ul className="special">
                                    <li>{loanList[i].loanTime}</li>
                                    <li>{theDateTxt}利率{loanList[i].rate}%</li>
                                    <li>贷款期限{loanList[i].limitMin}-{loanList[i].limitMax}{theDateTxt}</li>
                                </ul>
                                <div className="apply">
                                    <a href="javascript:;">申请贷款</a>
                                </div>
                            </div>

                        </div>)
                    }

                    that.setState({
                        list: arr
                    })

                } else {
                    toast.show("连接错误", 2000);
                }
            }, function () {
                toast.show("连接错误", 2000);
            })
        }

        var homeArticle = sessionStorage.getItem("homeArticle");
        if (homeArticle) {
            var articleList = JSON.parse(homeArticle);
            var articleArr = [];
            for (var i in articleList) {
                articleArr.push(<dl className="newsList" data-articleid={articleList[i].articleId} key={Math.random()} onClick={that.toNewsDetail}>
                    <dd>
                        <h4>{articleList[i].articleTitle}</h4>
                        <p><span>{articleList[i].addTime}</span> <span>{articleList[i].readerNum}阅读</span></p>
                    </dd>
                    <dt>
                        <img src={imgPath + articleList[i].imgUrl} onError={that.logoError} />
                    </dt>
                </dl>)
            }
            that.setState({
                articleArr: articleArr
            })
        } else {
            api.articleList(1, 3, function (res) {
                //console.log(res);
                if (res.code == "0000") {
                    var data = JSON.parse(strDec(res.data, key1, "", ""));
                    //var data =JSON.parse(res.data);
                    //console.log(data);
                    var articleList = data.list;
                    sessionStorage.setItem("homeArticle", JSON.stringify(articleList));
                    var articleArr = [];
                    for (var i in articleList) {
                        articleArr.push(<dl className="newsList" data-articleid={articleList[i].articleId} key={Math.random()} onClick={that.toNewsDetail}>
                            <dd>
                                <h4>{articleList[i].articleTitle}</h4>
                                <p><span>{articleList[i].addTime}</span> <span>{articleList[i].readerNum}阅读</span></p>
                            </dd>
                            <dt>
                                <img src={imgPath + articleList[i].imgUrl} onError={that.logoError} />
                            </dt>
                        </dl>)
                    }
                    that.setState({
                        articleArr: articleArr
                    })

                } else {
                    toast.show(res.msg, 2000);
                }
            }, function () {
                toast.show("连接错误", 2000);
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
                    <div className="loanTab">
                        <div onClick={that.toLoan}><img src="src/img/icon/daikuan.png" /><p>我要贷款</p></div>
                        <div onClick={that.toProgress}><img src="src/img/icon/progress.png" /><p>进度查询</p></div>
                    </div>
                    {/*<ul className="homeTab">
	        			{that.state.tagArr}
	        			<li data-tag="SBZ" data-txt="上班族" onClick={that.toList}>
	        				<img src="src/img/icon/group.png"/>
	        				<p>上班族</p>
	        			</li>
	        			<li data-tag="GTH"  data-txt="个体户" onClick={that.toList}>
	        				<img src="src/img/icon/personal.png"/>
	        				<p>个体户</p>
	        			</li>
	        			<li data-tag="QY" data-txt="企业主" onClick={that.toList}>
	        				<img src="src/img/icon/qiye.png"/>
	        				<p>企业主</p>
	        			</li>
	        			<li data-tag="ZYZY" data-txt="自由职业" onClick={that.toList}>
	        				<img src="src/img/icon/ziyou.png"/>
	        				<p>自由职业</p>
	        			</li>
	        		</ul>*/}
                    <div className="capitalBox">
                        {that.state.list}
                    </div>
                    <div className="newsBox">
                        <h3>你关心的资讯</h3>
                        <div>
                            {/*<dl className="newsList" data-articleId="" onClick={that.toNewsDetail}>
	        							<dd>
	        								<h4>小呆还不起遇到暴力催收,我该怎么办?</h4>
	        								<p><span>2017-10-20</span> <span>355阅读</span></p>
	        							</dd>
	        							<dt>
	        								<img src=""/>
	        							</dt>
	        					</dl>
		        				<dl className="newsList" onClick={that.toNewsDetail}>
	        							<dd>
	        								<h4>小呆还不起遇到暴力催收,我该怎么办?</h4>
	        								<p><span>2017-10-20</span> <span>355阅读</span></p>
	        							</dd>
	        							<dt>
	        								<img src=""/>
	        							</dt>
	        					</dl>*/}
                            {that.state.articleArr}
                        </div>
                        <Link to="/news" className="linkNews">全部热门资讯<img src="" /></Link>
                    </div>
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
