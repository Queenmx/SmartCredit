'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import LevelList from './levelList';
import { Toast } from 'antd-mobile';
// var toast = new Toast();
var PersonalLevel = React.createClass({
    getInitialState: function () {
        return {
            flag: false,
            valSelect: [],
            qualifyListArr: [],
            second: []
        }
    },
    toChildSaveBtn: function () {
        //父组件调用子主键进行通信  
        this.refs.toChildSaveBtn.toSaveBtn(
            function () {
                Toast.info("提交成功", 2)
                window.history.back()
            }
        );
    },
    componentWillMount: function () {

    },

    render: function () {
        var that = this;
        return (
            <div className="app_Box personalLevel">
                <Header title="个人资质" />
                <div className="personalLevelCon content">
                    {/*<Loading flag={that.state.flag}/>
					<form className="applyLevel">
						<ul>
							{that.state.qualifyListArr}
						</ul>
					</form>*/}
                    <LevelList objId="" ref="toChildSaveBtn" />
                </div>

                <div className="botBtn footer" onClick={that.toChildSaveBtn}>保存</div>
            </div>
        )
    },


});


export default PersonalLevel;


