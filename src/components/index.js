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
//<Route path='/detail/:id' component={Detail} />

ReactDom.render((
    <Router history={hashHistory}>
        <Route path='/' component={Home}></Route>
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
   </Router>
), document.getElementById('app'));