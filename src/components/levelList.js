'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import { Modal, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
// var toast = new Toast();
var levelList = React.createClass({
    getInitialState: function () {
        return {
            flag: false,
            valSelect: [],
            qualifyListArr: [],
            second: []
        }
    },

    componentWillMount: function () {


    },

    toSaveBtn: function (callback) {
        var that = this;
        that.setState({
            flag: true
        })
        var isOver;
        var qualifySelect = that.state.valSelect;
        for (var i in qualifySelect) {
            if (qualifySelect[i].selectName == "") {
                Toast.info(qualifySelect[i].dictionaryName + '必填', 2);
                isOver = false;
                that.setState({
                    flag: false
                })
                break;

            } else {
                isOver = true;
            }
        }
        if (isOver) {
            //console.log(qualifySelect);
            api.qualifyListSave(qualifySelect, function (res) {
                //console.log(res);
                if (res.code == "0000") {
                    that.setState({
                        flag: false
                    })
                    //window.history.back();
                    callback();
                } else if (res.code == "5555") {
                    Toast.info("登录过时，请重新登录", 2);
                    that.setState({
                        flag: false
                    })
                    var path = {
                        pathname: '/Login',
                    }
                    hashHistory.push(path);
                } else {
                    that.setState({
                        flag: false
                    })
                    Toast.info(res.msg, 2);
                }
            }, function () {
                that.setState({
                    flag: false
                })
                Toast.info("连接错误", 2);
            })
        }
    },
    render: function () {
        var that = this;
        return (


            <form className="applyLevel">
                <Loading flag={that.state.flag} />
                <ul>
                    {that.state.qualifyListArr}
                </ul>
            </form>

        )
    },
    inputSelect: function (event) {
        var toast = globalData.toast;
        var val = $(event.target).prev().val();
        if (!(/^[0-9]{1,2}$/).test(val)) {
            Toast.info("请输入正确的年龄", 2);
        } else {
            var indexId = event.target.getAttribute("data-indexId") * 1;
            this.state.valSelect[indexId].selectName = val;
            //console.log(this.state.valSelect);
            $(".levelInfoFirst" + indexId).hide();
            $(".selectValue" + indexId).html(val);
        }

    },
    checkHandle: function (event) {
        var that = this;
        var toast = globalData.toast;
        var selectId = event.target.getAttribute("data-dictionaryId");
        var parentIndex = event.target.getAttribute("data-parentIndex") * 1;
        var txt = event.target.innerHTML;
        var activeIndexId = that.state.activeIndexId;
        that.state.valSelect[parentIndex].selectName = txt;
        that.state.valSelect[parentIndex].selectId = selectId;
        $(".levelInfoFirst" + parentIndex).hide();
        that.state.second[parentIndex].isShow = !that.state.second[parentIndex].isShow;
        that.setState({ second: that.state.second, qualifyListArr: that.state.qualifyListArr });
        $(".selectValue" + parentIndex).html(txt);

    },
    selectHandle: function (event) {
        var that = this;
        var key1 = globalData.key;
        var toast = globalData.toast;
        var curEvent = event.target;
        var dictionaryId = event.target.getAttribute("data-dictionaryId");
        var indexId = event.target.getAttribute("data-indexId") * 1;
        that.setState({ activeIndexId: indexId });
        if (that.state.second[indexId].isRequest) {
            that.state.second[indexId].isShow = !that.state.second[indexId].isShow;
            if (that.state.second[indexId].isShow) {
                $(".levelInfoFirst" + indexId).show();
            } else {
                $(".levelInfoFirst" + indexId).hide();
            }
            that.setState({ second: that.state.second, qualifyListArr: that.state.qualifyListArr });
        } else {
            that.state.second[indexId].isRequest = true;
            that.state.second[indexId].isShow = true;
            that.setState({ second: that.state.second, qualifyListArr: that.state.qualifyListArr });
            api.dictionary(that.state.loanId, dictionaryId, "", function (res) {
                //console.log(res);
                if (res.code == "0000") {
                    var qualifyList = JSON.parse(strDec(res.data, key1, "", ""));
                    //console.log(qualifyList);
                    if (qualifyList.length > 0) {//说明有下级
                        for (var i in qualifyList) {
                            that.state.second[indexId].push(<li className="second" data-parentIndex={indexId} data-dictionaryId={qualifyList[i].dictionaryId} style={{ 'color': '#333333' }} onClick={that.checkHandle} key={i}>
                                {qualifyList[i].name}
                            </li>)
                        }
                    } else {//没有下级.点击即选
                        //console.log("没有下级");
                        that.state.second[indexId].push(<li className="second" data-parentIndex={indexId} data-dictionaryId={dictionaryId} style={{ 'color': '#333333' }} >
                            请输入:<input className='insertInput' type="text" /><span className="insertSure" data-indexId={indexId} onClick={that.inputSelect}>确定</span>
                        </li>)

                    }
                    that.setState({ second: that.state.second, qualifyListArr: that.state.qualifyListArr, valSelect: that.state.valSelect });
                } else if (res.code == "5555") {
                    Toast.info("登录过时，请重新登录", 2);
                    var path = {
                        pathname: '/Login',
                    }
                    hashHistory.push(path);
                } else {
                    Toast.info(res.msg, 2);
                }
            }, function () {
                Toast.info("连接错误", 2);
            })
        }
    },
    componentDidMount: function () {
        var key1 = globalData.key;
        var toast = globalData.toast;
        var that = this;
        that.setState({
            flag: true
        })
        //获取资质列表
        var objId = that.props.objId;
        api.qualifyList(objId, "095c2c011ef740508bf27785e0ffe8f1", function (res) {
            console.log(res);

            if (res.code == "0000") {
                var data = JSON.parse(strDec(res.data, key1, "", ""));
                console.log(data);
                that.setState({
                    flag: false,
                    qualifyList: data
                }, () => {
                    var qualifyList = that.state.qualifyList;
                    //console.log(qualifyList);
                    for (var i in qualifyList) {
                        var selectName = qualifyList[i].selectName;
                        that.state.second.push([]);
                        that.state.second[i].isShow = false;
                        that.state.second[i].isRequest = false;
                        that.state.valSelect.push({});
                        that.state.valSelect[i].userId = globalData.userId;
                        that.state.valSelect[i].qualifyId = qualifyList[i].qualifyId;
                        that.state.valSelect[i].dictionaryId = qualifyList[i].dictionaryId;
                        that.state.valSelect[i].dictionaryName = qualifyList[i].dictionaryName;
                        that.state.valSelect[i].dictionaryParentId = qualifyList[i].dictionaryParentId;
                        that.state.valSelect[i].selectName = qualifyList[i].selectName;
                        that.state.valSelect[i].selectId = qualifyList[i].selectId;
                        that.state.qualifyListArr.push(<li className="levelInfo" key={i}>
                            <label htmlFor={i}>{qualifyList[i].dictionaryName}</label>
                            <i data-dictionaryId={qualifyList[i].dictionaryId} style={{ 'color': '#333333' }} data-indexId={i} data-txt={qualifyList[i].name} className={"selectValue" + i} onClick={that.selectHandle}>{that.state.valSelect[i].selectName || '请选择'}</i>
                            <ul className={"levelInfoFirst" + i} >
                                {that.state.second[i]}
                            </ul>
                        </li>)
                    }
                    that.setState({ second: that.state.second, qualifyListArr: that.state.qualifyListArr, valSelect: that.state.valSelect });
                })

            } else if (res.code == "5555") {
                that.setState({
                    flag: false
                })
                Toast.info("登录过时，请重新登录", 2);
                var path = {
                    pathname: '/Login',
                }
                hashHistory.push(path);
            } else {
                that.setState({
                    flag: false
                })
                Toast.info(res.msg, 2);
            }
        }, function () {
            that.setState({
                flag: false
            })
            Toast.info("连接错误", 2);
        })
        // console.log(that.state.qualifyList);


    }
});


export default levelList;

