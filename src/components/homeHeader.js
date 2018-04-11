'use strict';
// import React from 'react';
// import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import { Router, Route, Link } from 'react-router';
import { Toast } from 'antd-mobile';
import MyMap from './myMap';
//import BMap from 'BMap';

var appBasePath = globalData.appBasePath;
var HomeHeader = React.createClass({
    getInitialState: function () {
        return {
            address: "其他城市"
        }
    },

    componentDidMount: function () {
        var that = this;
        var dingwei = localStorage.getItem("dingwei");
        //var curCity=localStorage.getItem("curCity");
        if (!dingwei) {
            //自动定位
            var map = new BMap.Map("allmap");
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    var point = new BMap.Point(r.point.lng, r.point.lat);
                    var gc = new BMap.Geocoder();
                    gc.getLocation(point, function (rs) {
                        var addComp = rs.addressComponents;
                        /*var mapAddress = addComp.province+addComp.city + addComp.district
                                + addComp.street + addComp.streetNumber;*/
                        that.setState({
                            address: addComp.city
                        });
                        localStorage.setItem("dingwei", addComp.city);
                    });
                }
                else {
                    alert('failed' + this.getStatus());
                }
            }, { enableHighAccuracy: true });

        } else {
            //localStorage.setItem("address",dingwei);
        }

        var curCity = that.props.curCity;
        if (curCity) {
            localStorage.setItem("curCity", curCity);
            that.setState({
                address: curCity
            });
        } else {
            var curCity = localStorage.getItem("curCity");
            that.setState({
                address: curCity || dingwei || "选择城市"
            });
            //localStorage.setItem("curCity",dingwei);
        }

        //}

    },

    /* toAddress:function(){
     	hashHistory.push({  
		        pathname: '/myMap',  
		        query: {  
		            cityId:cityId,  
		            price:'100'  
		        }  
		    })
     },*/
    render: function () {
        return (
            <div className="homeHeader">
                <div className="dingwei">
                    <img src="src/img/icon/map.jpg" />
                    <Link to="/myMap">{this.state.address}</Link>
                </div>
                <p className="title">万融汇</p>
                <p className="headerLinkBtn"></p>
            </div>
        )
    }

});


export default HomeHeader;


