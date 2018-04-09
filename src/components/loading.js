
'use strict';
// import React from 'react';
// import ReactDom from 'react-dom';
import {Toast } from 'antd-mobile';
var Loading = React.createClass({
    getInitialState: function () {
        return {

        }
    },


    render: function () {
        var that = this;
        var flag = this.props.flag;
        return (
            <div className="spinnerBox" style={{ display: `${flag ? 'block' : 'none'}` }}>
                <div className="spinner" style={{ display: `${flag ? 'block' : 'none'}` }}>
                    <div className="spinner-container container1">
                        <div className="circle1"></div>
                        <div className="circle2"></div>
                        <div className="circle3"></div>
                        <div className="circle4"></div>
                    </div>
                    <div className="spinner-container container2">
                        <div className="circle1"></div>
                        <div className="circle2"></div>
                        <div className="circle3"></div>
                        <div className="circle4"></div>
                    </div>
                    <div className="spinner-container container3">
                        <div className="circle1"></div>
                        <div className="circle2"></div>
                        <div className="circle3"></div>
                        <div className="circle4"></div>
                    </div>
                </div>
            </div>
        )
    }

});


export default Loading;


