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
var BaseInfo = React.createClass({
    getInitialState: function () {
        return {
            checked: true,
            flag: false,
            valSelect: [],
            qualifyListArr: [],
            second: []
        }
    },
    toChildSaveBtn: function () {
        var that = this;
        ////console.log(that.state.valSelect);
        if (!this.state.checked) {
            Toast.info("请同意万融汇服务协议", 2);
        } else {
            //父组件调用子主键进行通信  
            this.refs.toChildSaveBtn.toSaveBtn(
                function () {
                    Toast.info("提交成功", 2)
                    //window.history.back()
                }

            );
        }

    },
    componentWillMount: function () {
        //var authTap=this.props.location.query.authTap;
        //console.log(authTap);
         var userStr = globalData.user;
    },
    agreeRule: function (event) {
        //console.log(event.target.checked);
        this.setState({
            checked: event.target.checked
        })
    },
	getQualit:function(){
    	//console.log('子传父')
    },
    render: function () {
        var that = this;
        var objId = this.props.location.query.loanId;
       // console.log(objId);
        return (
            <div className="app_Box personalLevel">
                <Header title="基本信息认证" />
                <div className="applyLevel content">
                	
                    <LevelList objId={objId} ref="toChildSaveBtn" getQualit={that.getQualit} loanType='KSD'/>
                    <div className="rule">
                        <input className="magic-checkbox" type="checkbox" id="ruleCheck" checked={that.state.checked} onChange={that.agreeRule} />
                        <label htmlFor="ruleCheck">我已同意</label>
                        <Link to={
                            {
                                pathname: "/txt",
                                //hash:'#ahash',    
                                state: { title: '贷款知情书', fromId: 2 }
                            }
                        } >
                            《贷款知情书》
							</Link>

                    </div>
                </div>
                <div className="botBtn footer" onClick={that.toChildSaveBtn}>保存</div>
            </div>

        )
    },



    componentDidMount: function () {


    }
});


export default BaseInfo;


