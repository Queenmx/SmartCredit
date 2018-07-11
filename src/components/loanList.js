'use strict';

import { Component, PropTypes } from 'react';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Footer from './footer';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import '../css/home.css';
import { Toast,Accordion, List,Menu, ActivityIndicator, NavBar } from 'antd-mobile';

const data = [
    {
      value: '1',
      label: 'Food',
    }, {
      value: '2',
      label: 'Supermarket',
    },
    {
      value: '3',
      label: 'Extra',
      isLeaf: true,
    },
  ];
// var toast=globalData.toast;
var key1 = globalData.key;
var LoanList = React.createClass({
    getInitialState: function () {
        return {
            initData: '',
            show: false,
            flag: false,
        }
    },
    
    onChange (arr){        
        console.log(arr);
        
        this.setState({
            show: !this.state.show,
        });
        
    },
   
    onMaskClick(e){
        console.log(e)
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
        const menuEl = (
            <List className="my-list">
                <List.Item onClick={this.onMaskClick}>
                    类型
                    <span className="selecticon" style={{backgroundImage:"url('src/img/icon/proselect-icon1.png')"}}></span>  
                </List.Item>
                <List.Item onClick={this.onMaskClick}>
                    类型2
                    <span className="selecticon" style={{backgroundImage:"url('src/img/icon/proselect-icon1.png')"}}></span>  
                </List.Item>
                <List.Item onClick={this.onMaskClick}>
                    类型3
                    <span className="selecticon" style={{backgroundImage:"url('src/img/icon/proselect-icon1.png')"}}></span>  
                </List.Item>
                    
            </List>
        )

        return (
            <div className="app_Box loanlist">
                 <header>贷款产品列表</header>
                 <Loading flag={that.state.flag} />
                 <div className="content">
                    <div className="selection">
                        <Accordion  className="my-accordion" onChange={this.onChange}>
                            <Accordion.Panel header="类型"></Accordion.Panel>
                            <Accordion.Panel header="金额" className="pad"></Accordion.Panel>
                            <Accordion.Panel header="期限" className="pad"></Accordion.Panel>
                            <Accordion.Panel header="征信" className="pad"></Accordion.Panel>                            
                        </Accordion>
                        {show ? menuEl : null}
                        {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}                        
                    </div>
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
                 </div>
                <Footer activeIndex="1" />
            </div>

        )
    }
});


//面板
// class LoanList extends Component {
//     constructor(...args) {
//       super(...args);
//       this.state = {
//         initData: '',
//         show: false,
//         flag: false
//       };
//     }
//     onChange = (value) => {
//       let label = '';
//       data.forEach((dataItem) => {
//         if (dataItem.value === value[0]) {
//           label = dataItem.label;
//           if (dataItem.children && value[1]) {
//             dataItem.children.forEach((cItem) => {
//               if (cItem.value === value[1]) {
//                 label += ` ${cItem.label}`;
//               }
//             });
//           }
//         }
//       });
//       console.log(label);
//     }
//     handleClick = (e) => {
//       e.preventDefault(); // Fix event propagation on Android
//       this.setState({
//         show: !this.state.show,
//       });
//       // mock for async data loading
//       if (!this.state.initData) {
//         setTimeout(() => {
//           this.setState({
//             initData: data,
//           });
//         }, 500);
//       }
//     }
  
//     onMaskClick = () => {
//       this.setState({
//         show: false,
//       });
//     }
  
//     render() {
//         var that=this;
//         const { initData, show } = this.state;
//         const menuEl = (
//             <Menu
//             className="single-foo-menu"
//             data={initData}
//             value={['1']}
//             level={1}
//             onChange={this.onChange}
//             height={document.documentElement.clientHeight * 0.6}
//             />
//         );
//         const loadingEl = (
//             <div style={{ position: 'absolute', width: '100%', height: document.documentElement.clientHeight * 0.6, display: 'flex', justifyContent: 'center' }}>
//             <ActivityIndicator size="large" />
//             </div>
//         );
//         return (
//             <div className="app_Box loanlist">
//                 <header>贷款产品列表</header>
//                 <Loading flag={that.state.flag} />
//                 <div className="content">
//                     <div className={show ? 'single-menu-active' : ''}>
//                         <div>
//                             <NavBar
//                                 leftContent="类型"
//                                 mode="light"
//                                 onLeftClick={this.handleClick}
//                                 className="single-top-nav-bar"
//                                 >
//                             </NavBar>
//                             <NavBar
//                                 leftContent="金额"
//                                 mode="light"
//                                 onLeftClick={this.handleClick}
//                                 className="single-top-nav-bar"
//                                 >                               
//                             </NavBar>
//                         </div>
//                         {show ? initData ? menuEl : loadingEl : null}
//                         {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}
//                     </div>
//                     的防晒霜代发发的
//                 </div>
//                 <Footer activeIndex="1" />
//             </div>
            
//         );
//     }
// }
  



  export default LoanList;


