'use strict';
// import React from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Footer from './footer';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import '../css/home.css';
import { Toast } from 'antd-mobile';

// var toast=globalData.toast;
var key1 = globalData.key;
var imgPath = globalData.imgPath;
var Ask = React.createClass({
    getInitialState: function () {
        return {
           
            
            flag: false
        }
    },

    componentWillMount: function () {
        var user = localStorage.getItem("user");
        if (user) {
            this.setState({                
                isLogin: true,
            })
        } else {
            this.setState({               
                isLogin: false,
            })
        }
    },
    goDetail(){
        if (this.state.isLogin) {
            Toast.info("要去到第3方了哦", 2);
        }else{
            var path = {
                pathname: '/Login',
            }
            hashHistory.push(path);
        }
    },
    componentDidMount: function () {
        var key1 = globalData.key;
        var toast = globalData.toast;
        var that = this;
        api.creditCardList("1", "20",  function (res) {
                if(res.code == "0000"){
                    var data = JSON.parse(strDec(res.data, key1, "", ""));
                    // console.log(data);
                    var creditCardList = data.list;
                    console.log(creditCardList);
                    var creditCardArr = [];
                    for (var i in creditCardList) {
                       
                        creditCardArr.push(
                            <a key={i} href={creditCardList[i].apiUrl} data-creditCardId ={creditCardList[i].identifier}>
                                <img src={imgPath + creditCardList[i].logo}  />
                                <div className="loanTitle">
                                    <p>{creditCardList[i].name}</p>
                                    <p>适用人群：上班族，企业主</p>
                                    <p><span>{creditCardList[i].totalNum}</span>本月申请</p>                                    
                                </div>
                            </a>

                                      
                                       )
                            //  console.log(articleArr[i].articleTitle)
                    }
                    that.setState({
                        creditCardArr: creditCardArr
                    })
                    console.log(that.state.creditCardArr)
                }
               
        })
    },
    render: function () {
        var that = this;
        //console.log("cityId",cityId);

        return (
            <div className="app_Box creditcard">
                <Header title="信用卡" />
                <Loading flag={that.state.flag} />
                <div className="content">
                    <div className="loan">
                        <ul>
                            {this.state.creditCardArr}
                            {/* <li onClick={this.goDetail}>
                                <img src="src/img/icon/product1.png" />
                                <div className="loanTitle">
                                    <p>点点贷-大额低息贷</p>
                                    <p>适用人群：上班族，企业主</p>
                                    <p><span>100万人</span>本月申请</p>                                    
                                </div>
                            </li>
                            <li>
                                <img src="src/img/icon/product1.png" />
                                <div className="loanTitle">
                                    <p>点点贷-大额低息贷</p>
                                    <p>适用人群：上班族，企业主</p>
                                    <p><span>100万人</span>本月申请</p> 
                                </div>
                            </li> */}
                        </ul> 
                    </div>                 
                </div>
                
            </div>
        )
    }
});


export default Ask;


