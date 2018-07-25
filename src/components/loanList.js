'use strict';

import { Component, PropTypes } from 'react';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Footer from './footer';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import '../css/home.css';
import { Toast,Accordion, List,Menu, ActivityIndicator, NavBar,Radio } from 'antd-mobile';

const RadioItem = Radio.RadioItem;
// var toast=globalData.toast;
var key1 = globalData.key;
var imgPath = globalData.imgPath;
var LoanList = React.createClass({
    getInitialState: function () {
        return {
            initData: '',
            show: false,
            jiantou:false,
            flag: false,
            selectData:[],
            value:19,
            checkData:[
                {name:'类型',value:0},
                {name:'金额',value:1},
                {name:'期限',value:2},
                {name:'征信',value:3},
            ],
            checkedItem:10
        }
    },
    componentDidMount() {
        var that=this;
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    　　var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端  
        if(isiOS){                 
            $(".hed p").css({"height":"1.3rem","line-height":"1.3rem"});      
        }
        api.productList(function (res) {
            if(res.code=='0000'){                
                var data = JSON.parse(strDec(res.data, key1, "", ""));
                console.log(data);
                var arr=[];
                for(var i in data){
                    arr.push(
                        <ul className="loan-list" onClick={that.goDetail.bind(that,data[i].id)} key={i}>
                            <li>
                                <img src={imgPath + data[i].logo} />
                                <div className="loanTitle">
                                    <p>{data[i].name}</p>
                                    <p>适用人群：{data[i].intendedFor}</p>
                                    <p>申请人数：{data[i].totalNum}人</p>
                                </div>
                                <div className="high">
                                    <p>
                                        <span>{data[i].maximumAmount}</span>万    
                                    </p>
                                    <p>最高额度</p>
                                </div>
                            </li>   
                            <li className="numdetail">
                                <div>
                                    <p><span>{data[i].timeLimit}</span>月</p>
                                    <p>平均期限</p>
                                </div>
                                <div>
                                    <p><span>{data[i].averageAmount}</span>万</p>
                                    <p>平均额度</p>
                                </div>
                                <div>
                                    <p><span>{data[i].meanTime}</span>天</p>
                                    <p>平均用时</p>
                                </div>
                                <div>
                                    <p><span>{data[i].annualRate}</span>%</p>
                                    <p>年利率</p>
                                </div>                                
                            </li> 
                        </ul>
                        
                    )
                }
                that.setState({
                    productList:arr
                }) 
            }else {
                Toast.info("连接错误", 2);
            }
        })
    },
    onChange (arr){        
        // console.log(arr);
        switch(arr){
            case "0":
                this.setState({
                    selectData:[
                        { value: 19, label: '全部' },
                        { value: 15, label: '小额零用贷' },
                        { value: 16, label: '大额低息贷' },
                        { value: 17, label: '工薪贷' },
                        { value: 18, label: '车辆贷' },
                    ]
                });
                break;
            case "1":
                this.setState({
                    selectData:[
                        { value: 5, label: '全部' },
                        { value: 6, label: '1000~5000' },
                        { value: 7, label: '5000~10000' },
                        { value: 8, label: '1万元以上' },
                    ]
                });
                break;
            case "2":
                this.setState({
                    selectData:[
                        { value: 9, label: '全部' },
                        { value: 10, label: '1个月以下' },
                        { value: 11, label: '1~6个月' },
                        { value: 12, label: '6~12个月' },
                        { value: 13, label: '12个月' },
                        { value: 14, label: '24个月' },
                    ]
                });
                break;
            case "3":
                this.setState({
                    selectData:[
                        { value: 123, label: '全部' },                        
                        { value: 1, label: '芝麻信用' },
                        { value: 2, label: '电商账号' },
                        { value: 3, label: '征信报告' },
                    ]
                });
                break;
            default:
                break;    
        }
        
        if(arr==undefined){
            this.setState({
                show: false,
            });
        }else{
            this.setState({
                show: true,
            });
        }
        
    },
    onSelected (item) {
        console.log(item)
        var active=this.state.checkedItem;
        var data={
            categoryName:'',
            loanTermStart:'',
            loanTermEnd:'',
            miniScope:'',
            maxScope:'',
            creditReport:''
        }
        switch(item){
            // case 123:
            //     data.creditReport="";
            //     break;
            case 1:
                data.creditReport=1;
                break;
            case 2:
                data.creditReport=2;
                break;
            case 3:
                data.creditReport=3;
                break;
            case 4:
                data.miniScope=1000;
                data.maxScope=5000;
                break;
            case 5:
                data.miniScope=0;
                break;
            case 6:
                data.miniScope=1000;
                data.maxScope=5000;
                break;
            case 7:
                data.miniScope=5000;
                data.maxScope=10000;
                break;
            case 8:
                data.miniScope=10000;
                break;
            case 9:
                data.loanTermStart=0;
                break;
            case 10:
                data.loanTermStart=1;
                break;
            case 11:
                data.loanTermStart=1;
                data.loanTermEnd=6;
                break;
            case 12:
                data.loanTermStart=6;
                data.loanTermEnd=12;
                break;
            case 13:
                data.loanTermStart=12;
                data.loanTermEnd=13;
                break;
            case 14:
                data.loanTermStart=24;
                data.loanTermEnd=25;
                break;
            case 15:
                data.categoryName="小额零用贷";
                break;
            case 16:
                data.categoryName="大额低息贷";
                break;
            case 17:
                data.categoryName="工薪贷";
                break;
            case 18:
                data.categoryName="车辆贷";
                break;
            case 19:
                data.categoryName="贷";
                break;
            default:
                break;

        }
        console.log(data)
        this.getInit(data);
        this.setState({
            value:item,
            show: false,
            checkedItem:22,
        });
    },
    checked(temp){
        // console.log(temp);           
        if(!this.state.show){
            switch(temp){
                case 0:
                    this.setState({
                        selectData:[
                            { value: 19, label: '全部' },
                            { value: 15, label: '小额零用贷' },
                            { value: 16, label: '大额低息贷' },
                            { value: 17, label: '工薪贷' },
                            { value: 18, label: '车辆贷' },
                        ]
                    });
                    break;
                case 1:
                    this.setState({
                        selectData:[
                            { value: 5, label: '全部' },
                            { value: 6, label: '1000~5000' },
                            { value: 7, label: '5000~10000' },
                            { value: 8, label: '1万元以上' },
                        ]
                    });
                    break;
                case 2:
                    this.setState({
                        selectData:[
                            { value: 9, label: '全部' },
                            { value: 10, label: '1个月以下' },
                            { value: 11, label: '1~6个月' },
                            { value: 12, label: '6~12个月' },
                            { value: 13, label: '12个月' },
                            { value: 14, label: '24个月' },
                        ]
                    });
                    break;
                case 3:
                    this.setState({
                        selectData:[
                            { value: 123, label: '全部' },                        
                            { value: 1, label: '芝麻信用' },
                            { value: 2, label: '电商账号' },
                            { value: 3, label: '征信报告' },
                        ]
                    });
                    break;
                default:
                    break;    
            }
            this.setState({
                show:true,
                checkedItem:temp,               
            })
        }
        
    },
    onMaskClick(e){
        // console.log(e)
        // this.setState({
        // show: false,
        // });
    },
    goDetail(item,name){    
        console.log(item)   
        var path = {
            pathname: '/ListDetail',
            query:{id:item}
        }
        hashHistory.push(path);
    },
    getInit(item){
        var that=this;
        api.findProduct(item,function (res) {
            if(res.code=='0000'){                
                var data = JSON.parse(strDec(res.data, key1, "", ""));
                console.log(data);
                if(!data.length){
                    Toast.info("未匹配到相关产品！",2);
                }  
                var arr=[];
                for(var i in data){
                    arr.push(
                        <ul className="loan-list" onClick={that.goDetail.bind(that,data[i].id)} key={i}>
                            <li>
                                <img src={imgPath + data[i].logo} />
                                <div className="loanTitle">
                                    <p>{data[i].name}</p>
                                    <p>适用人群：{data[i].intendedFor}</p>
                                    <p>申请人数：{data[i].totalNum}人</p>
                                </div>
                                <div className="high">
                                    <p>
                                        <span>{data[i].maximumAmount}</span>万    
                                    </p>
                                    <p>最高额度</p>
                                </div>
                            </li>   
                            <li className="numdetail">
                                <div>
                                    <p><span>{data[i].timeLimit}</span>月</p>
                                    <p>平均期限</p>
                                </div>
                                <div>
                                    <p><span>{data[i].averageAmount}</span>万</p>
                                    <p>平均额度</p>
                                </div>
                                <div>
                                    <p><span>{data[i].meanTime}</span>天</p>
                                    <p>平均用时</p>
                                </div>
                                <div>
                                    <p><span>{data[i].annualRate}</span>%</p>
                                    <p>年利率</p>
                                </div>                                
                            </li> 
                        </ul>
                        
                    )
                }
                that.setState({
                    productList:arr
                })              
            }else {
                Toast.info("连接错误", 2);
            }
        }) 
    },
    render(){
        var that=this;
        const { initData, show } = this.state;
        const data = this.state.selectData;        
        const menuEl = (
            <List className="my-list">
                  {data.map(i => (
                    <RadioItem key={i.value} checked={this.state.value === i.value} onChange={() => this.onSelected(i.value)}>
                        {i.label}
                    </RadioItem>
                    ))}
            </List>
        )
        const accordion=(
            this.state.checkData.map(function(item,i){
                return(
                    <div className="am-accordion-item" role="tablist" key={i} onClick={that.checked.bind(that,item.value)} >                
                        <div className="am-accordion-header" role="tab" aria-expanded={that.state.checkedItem==i?"true":'false'}>
                            <span className={that.state.checkedItem==i?"showbottom":''}>{item.name}</span>
                            <i className="arrow" style={{backgroundImage:"url('src/img/icon/loanlist-icon1.png')"}}></i>
                        </div>
                    </div>  
                ) 
            })            
        )
        return (
            <div className="app_Box loanlist">
                 <div className="hed">
                    <p>贷款产品列表</p>                   
                        {/* <Accordion  accordion className="my-accordion" onChange={this.onChange} >
                            <Accordion.Panel header="类型" className={this.state.jiantou?"down":''}></Accordion.Panel>
                            <Accordion.Panel header="金额" className="pad"></Accordion.Panel>
                            <Accordion.Panel header="期限" className="pad"></Accordion.Panel>
                            <Accordion.Panel header="征信" className="pad"></Accordion.Panel>                            
                        </Accordion>       */}
                        <div className="am-accordion my-accordion">
                            {accordion}
                        </div>
                </div>
                 <Loading flag={that.state.flag} />
                 <div className="content">   
                    {this.state.productList}                 
                    {/* <ul className="loan-list" onClick={this.goDetail}>
                        <li>
                            <img src="src/img/icon/product1.png" />
                            <div className="loanTitle">
                                <p>产品名称</p>
                                <p>适用人群：上班族，企业主</p>
                                <p>申请人数：2356人</p>
                            </div>
                            <div className="high">
                                <p>
                                    <span>5</span>万    
                                </p>
                                <p>最高额度</p>
                            </div>
                        </li>   
                        <li className="numdetail">
                            <div>
                                <p><span>18</span>月</p>
                                <p>平均期限</p>
                            </div>
                            <div>
                                <p><span>18</span>万</p>
                                <p>平均期限</p>
                            </div>
                            <div>
                                <p><span>18</span>天</p>
                                <p>平均期限</p>
                            </div>
                            <div>
                                <p><span>18</span>%</p>
                                <p>年利率</p>
                            </div>
                              
                        </li> 
                    </ul> 
                    <ul className="loan-list">
                        <li>
                            <img src="src/img/icon/product1.png" />
                            <div className="loanTitle">
                                <p>产品名称</p>
                                <p>适用人群：上班族，企业主</p>
                                <p>申请人数：2356人</p>
                            </div>
                            <div className="high">
                                <p>
                                    <span>5</span>万    
                                </p>
                                <p>最高额度</p>
                            </div>
                        </li>   
                        <li className="numdetail">
                            <div>
                                <p><span>18</span>月</p>
                                <p>平均期限</p>
                            </div>
                            <div>
                                <p><span>18</span>万</p>
                                <p>平均期限</p>
                            </div>
                            <div>
                                <p><span>18</span>天</p>
                                <p>平均期限</p>
                            </div>
                            <div>
                                <p><span>18</span>%</p>
                                <p>年利率</p>
                            </div>
                              
                        </li> 
                    </ul>
                    <ul className="loan-list">
                        <li>
                            <img src="src/img/icon/product1.png" />
                            <div className="loanTitle">
                                <p>产品名称</p>
                                <p>适用人群：上班族，企业主</p>
                                <p>申请人数：2356人</p>
                            </div>
                            <div className="high">
                                <p>
                                    <span>5</span>万    
                                </p>
                                <p>最高额度</p>
                            </div>
                        </li>   
                        <li className="numdetail">
                            <div>
                                <p><span>18</span>月</p>
                                <p>平均期限</p>
                            </div>
                            <div>
                                <p><span>18</span>万</p>
                                <p>平均期限</p>
                            </div>
                            <div>
                                <p><span>18</span>天</p>
                                <p>平均期限</p>
                            </div>
                            <div>
                                <p><span>18</span>%</p>
                                <p>年利率</p>
                            </div>
                              
                        </li> 
                    </ul>  */}
                    {show ? menuEl : null}
                    {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null} 
                 </div>
                <Footer activeIndex="1" />
            </div>

        )
    }
});






  export default LoanList;


