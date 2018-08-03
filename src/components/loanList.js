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
            defalut:[],
            value:4,
            checkData:[
                {name:'类型',value:0},
                {name:'金额',value:1},
                {name:'期限',value:2},
                {name:'征信',value:3},
            ],
            checkedItem:10
        }
    },
    componentWillMount(){
        var that=this;
        api.productTypeQuery(function (res) {
            if(res.code=="0000"){
                var data = JSON.parse(strDec(res.data, key1, "", ""));
                // console.log(data);
               
                data.map((item,index)=>{
                    
                    item.id=15+index;                    
                })
                var all={ id: 4, name: '全部' };
                data.unshift(all);
                // console.log(data)
                that.setState({
                    defalut:data
                })
            }
        })
    },
    componentDidMount() {
        var that=this;
    //     var u = navigator.userAgent;
    //     var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    // 　　var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端  
    //     if(isiOS){                 
    //         $(".hed p").css({"height":"1.3rem","line-height":"1.3rem"});      
    //     }
        api.productList(function (res) {
            if(res.code=='0000'){                
                var data = JSON.parse(strDec(res.data, key1, "", ""));
                console.log(data);
                var arr=[];
                for(var i in data){
                    var num=data[i].maximumAmount;
                    var averNum=data[i].averageAmount
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
                                    {/* {num > 9999 ? <span>{num/10000}万</span> : <span>{num}元</span>}   */}
                                    <span>{num}</span>万
                                    </p>
                                    <p>最高额度</p>
                                </div>
                            </li>   
                            <li className="numdetail">
                                <div>
                                    <p><span>{data[i].timeLimit}</span>{data[i].timeLimitUnit}</p>
                                    <p>平均期限</p>
                                </div>
                                <div>
                                    {/* <p>{averNum > 9999 ? <span>{averNum/10000}万</span> : <span>{averNum}元</span>}</p> */}
                                    <p><span>{averNum}</span>万</p>
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
    onSelected (item) {
        console.log(name)
        var active=this.state.checkedItem;
        
        var data={
            categoryName:'',
            loanTermStart:'',
            loanTermEnd:'',
            miniScope:'',
            maxScope:'',
            creditReport:''
        }
        
        switch(item.id){
            case 123:
                data.creditReport="";
                break;
            case 1:
                data.creditReport=1;
                break;
            case 2:
                data.creditReport=2;
                break;
            case 3:
                data.creditReport=3;
                break;
            case 5:
                data.miniScope="";
                break;
            case 6:
                data.miniScope=0.1;
                data.maxScope=0.5;
                break;
            case 7:
                data.miniScope=0.5;
                data.maxScope=1.0;
                break;
            case 8:
                data.miniScope=1.0;
                break;
            case 9://期限9-14
                data.loanTermStart="";
                break;
            case 10:
                data.loanTermStart="";
                data.loanTermEnd=1;
                break;
            case 11:
                data.loanTermStart=2;
                data.loanTermEnd=6;
                break;
            case 12:
                data.loanTermStart=7;
                data.loanTermEnd=12;
                break;
            case 13:
                data.loanTermStart=13;
                data.loanTermEnd=24;
                break;
            case 14:
                data.loanTermStart=25;
                data.loanTermEnd="";
                break;
            // case 15:
            //     data.categoryName="小额零用贷";
            //     break;
            // case 16:
            //     data.categoryName="大额低息贷";
            //     break;
            // case 17:
            //     data.categoryName="工薪贷";
            //     break;
            // case 18:
            //     data.categoryName="车辆贷";
            //     break;
            case 4:
                data.categoryName="";
                break;
            default:
                data.categoryName=item.name;
                break;

        }
        console.log(data)
        this.getInit(data);
        this.setState({
            value:item.id,
            show: false,
            checkedItem:22,
        });
    },
    checked(temp){
        // console.log(temp);  
        var data=this.state.defalut;     
        if(!this.state.show){
            switch(temp){
                case 0:

                    this.setState({
                        selectData:data
                    });
                    break;
                case 1:
                    this.setState({
                        selectData:[
                            { id: 5, name: '全部' },
                            { id: 6, name: '0.1~0.5万' },
                            { id: 7, name: '0.5~1万' },
                            { id: 8, name: '1万元以上' },
                        ]
                    });
                    break;
                case 2:
                    this.setState({
                        selectData:[
                            { id: 9, name: '全部' },
                            { id: 10, name: '1个月以下' },
                            { id: 11, name: '1~6个月' },
                            { id: 12, name: '6~12个月' },
                            { id: 13, name: '12个月' },
                            { id: 14, name: '24个月' },
                        ]
                    });
                    break;
                case 3:
                    this.setState({
                        selectData:[
                            { id: 123, name: '全部' },                        
                            { id: 1, name: '芝麻信用' },
                            { id: 2, name: '电商账号' },
                            { id: 3, name: '征信报告' },
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
                    var num=data[i].maximumAmount;
                    var averNum=data[i].averageAmount
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
                                        {/* {num > 9999 ? <span>{num/10000}万</span> : <span>{num}元</span>}    */}
                                        <span>{num}</span>万                                      
                                    </p>
                                    <p>最高额度</p>
                                </div>
                            </li>   
                            <li className="numdetail">
                                <div>
                                    <p><span>{data[i].timeLimit}</span>{data[i].timeLimitUnit}</p>
                                    <p>平均期限</p>
                                </div>
                                <div>                                
                                    {/* <p>{averNum > 9999 ? <span>{averNum/10000}万</span> : <span>{averNum}元</span>}</p> */}
                                    <p><span>{averNum}</span>万</p>
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
                    <RadioItem key={i.id} checked={this.state.value === i.id} onChange={() => this.onSelected(i)}>
                        {i.name}
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
                 {/* <Loading flag={that.state.flag} /> */}
                 <div className="content">   
                    {this.state.productList}   
                    {show ? menuEl : null}
                    {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null} 
                 </div>
                <Footer activeIndex="1" />
            </div>

        )
    }
});






  export default LoanList;


