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
var LoanList = React.createClass({
    getInitialState: function () {
        return {
            initData: '',
            show: false,
            jiantou:false,
            flag: false,
            selectData:[],
            value:0,
        }
    },
    
    onChange (arr){        
        console.log(arr);
        switch(arr){
            case "0":
                this.setState({
                    selectData:[
                        { value: 0, label: '类型' },
                        { value: 1, label: '小额零用贷' },
                        { value: 2, label: '大额低息贷' },
                        { value: 3, label: '工薪贷' },
                        { value: 4, label: '车辆贷' },
                    ]
                });
                break;
            case "1":
                
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
        this.setState({
            value:item,
            show: false,
            jiantou:true
        });

    },
    onMaskClick(e){
        // console.log(e)
        this.setState({
        show: false,
        });
    },
    goDetail(){       
        var path = {
            pathname: '/ListDetail',
        }
        hashHistory.push(path);
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
        return (
            <div className="app_Box loanlist">
                 <div className="hed">
                    <p>贷款产品列表</p>                   
                        <Accordion  accordion className="my-accordion" onChange={this.onChange} >
                            <Accordion.Panel header="类型" className={this.state.jiantou?"down":''}></Accordion.Panel>
                            <Accordion.Panel header="金额" className="pad"></Accordion.Panel>
                            <Accordion.Panel header="期限" className="pad"></Accordion.Panel>
                            <Accordion.Panel header="征信" className="pad"></Accordion.Panel>                            
                        </Accordion>                    
                </div>
                 <Loading flag={that.state.flag} />
                 <div className="content">                    
                    <ul className="loan-list" onClick={this.goDetail}>
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
                    </ul> 
                    {show ? menuEl : null}
                    {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null} 
                 </div>
                <Footer activeIndex="1" />
            </div>

        )
    }
});






  export default LoanList;


