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
import Save from './save';
import List from './list';
import ListDetail from './listDetail';
import Problem from './problem';
import Order from './order';
import Ask from './ask';
import ApplyInfo from './applyInfo';
import ApplyLevel from './applyLevel';
import ApplyResult from './applyResult';
import Help from './help';
import HelpDetail from './helpDetail';
import IdCard from './idCard';
import UserInfo from './userInfo';
import Set from './set';
import RePsd from './rePsd';
import ForgotPsd from './forgotPsd';
import RealName from './realName';
import IdNumber from './idNumber';
import PersonalLevel from './personalLevel';
import Loan from './loan';

ReactDom.render((<Router history={hashHistory}>
        <Route path='/' component={Home}></Route>
        <Route path='/Loan' component={Loan}></Route>
   		<Route path='/news' component={News}></Route>
   		<Route path='/mine' component={Mine}></Route>
   		<Route path='/myMap' component={MyMap}></Route>
   		<Route path='/Login(/:backRouter)' component={Login}/>
   		<Route path='/txt(/:txtData)' component={Txt}/>
   		<Route path='/SetPsd' component={SetPsd}/>
   		<Route path='/NewsDetail' component={NewsDetail}/>
   		<Route path='/Save' component={Save}/>
   		<Route path='/List' component={List}/>
   		<Route path='/ListDetail' component={ListDetail}/>
   		<Route path='/Problem' component={Problem}/>
   		<Route path='/Order' component={Order}/>
   		<Route path='/Ask' component={Ask}/>
   		<Route path='/ApplyInfo' component={ApplyInfo}/>
   		<Route path='/ApplyLevel' component={ApplyLevel}/>
   		<Route path='/ApplyResult' component={ApplyResult}/>
   		<Route path='/Help' component={Help}/>
   		<Route path='/HelpDetail' component={HelpDetail}/>
   		<Route path='/IdCard' component={IdCard}/>
   		<Route path='/UserInfo' component={UserInfo}/>
   		<Route path='/PersonalLevel' component={PersonalLevel}/>
 		<Route path='/Set' component={Set}/>
 		<Route path='/RePsd' component={RePsd}/>
 		<Route path='/ForgotPsd' component={ForgotPsd}/>
 		<Route path='/RealName' component={RealName}/>
 		<Route path='/IdNumber' component={IdNumber}/>
   </Router>
), document.getElementById('app'));