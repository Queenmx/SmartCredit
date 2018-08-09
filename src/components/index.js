'use strict';
import React from 'react';
import ReactDom from 'react-dom';
//var api = require("./api");
import { Router, Route, Link } from 'react-router';
import { hashHistory } from 'react-router';
//import {globalData} from './global.js';
import Home from './home';
import News from './news';
import Mine from './mine';
import MyMap from './myMap';
import Login from './login';
import Txt from './txt';
import SetPsd from './setPsd';
import NewsDetail from './newsDetail';
import ListDetail from './listDetail';
import Problem from './problem';
import Ask from './ask';
import Help from './help';
import HelpDetail from './helpDetail';
import IdCard from './idCard';
import UserInfo from './userInfo';
import Set from './set';
import RePsd from './rePsd';
import ForgotPsd from './forgotPsd';
import Authname from './Authname';
import loanList from './loanList';
import licai from './licai';
import task from './task';
import messages from './messages';
import msgDetail from './msgDetail';
import taskDetail from './taskDetail';
import taskMy from './taskMy';
import creditCard from './creditCard';
import myWallet from './myWallet';
import lookques from './lookques';
import btn from './btn';
import Insurance from './insurance';
import Getbaoxian from './getbaoxian';
import Getmoney from './getmoney';//提现
import AddBankcard from './addBankcard';//添加银行卡
import ChoiceBankcard from './choiceBankcard';//选择银行卡
import Sharemoney from './sharemoney';//选择银行卡
import CreditPay from './CreditPay';//信用卡待还


//<Route path='/detail/:id' component={Detail} />
// const Home = (location, cb) => {
//     require.ensure([], require => {
//         cb(null, require('./home').default)
//     },'Home')
// }

ReactDom.render((
    <Router history={hashHistory}>    
        {/* <Route path='/' getComponent={Home}></Route> */}
        <Route path='/' component={Home}></Route>
        <Route path='/news' component={News}></Route>
        <Route path='/mine' component={Mine}></Route>
        <Route path='/myMap' component={MyMap}></Route>
        <Route path='/Login(/:backRouter)' component={Login} />
        <Route path='/txt(/:txtData)' component={Txt} />
        <Route path='/SetPsd' component={SetPsd} />
        <Route path='/NewsDetail' component={NewsDetail} />
        <Route path='/ListDetail' component={ListDetail} />
        <Route path='/Problem' component={Problem} />
        <Route path='/Ask' component={Ask} />
        <Route path='/Help' component={Help} />
        <Route path='/HelpDetail' component={HelpDetail} />
        <Route path='/IdCard' component={IdCard} />
        <Route path='/UserInfo' component={UserInfo} />
        <Route path='/Set' component={Set} />
        <Route path='/RePsd' component={RePsd} />
        <Route path='/ForgotPsd' component={ForgotPsd} />
        <Route path='/Authname' component={Authname} />
        <Route path='/loanList' component={loanList} />
        <Route path='/licai' component={licai} />
        <Route path='/CreditPay' component={CreditPay} />
        <Route path='/task' component={task} />
        <Route path='/messages' component={messages} />
        <Route path='/msgDetail' component={msgDetail} />
        <Route path='/taskDetail' component={taskDetail} />
        <Route path='/taskMy' component={taskMy} />
        <Route path='/creditCard' component={creditCard} />
        <Route path='/myWallet' component={myWallet} />
        <Route path='/lookques' component={lookques} />
        <Route path='/btn' component={btn} />
        <Route path='/Insurance' component={Insurance} />
        <Route path='/Getbaoxian' component={Getbaoxian} />
        <Route path='/Getmoney' component={Getmoney} />
        <Route path='/AddBankcard' component={AddBankcard} />
        <Route path='/ChoiceBankcard' component={ChoiceBankcard} />
        <Route path='/Sharemoney' component={Sharemoney} />
        
    </Router >
), document.getElementById('app'));