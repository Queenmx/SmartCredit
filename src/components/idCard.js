'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import { Toast } from 'antd-mobile';
var key1 = globalData.key;
// var toast = globalData.toast;
var IdCard = React.createClass({
    getInitialState: function () {
        return {
            flag: false
        }
    },
    componentWillMount: function () {
        var user = globalData.user;
        var userObj = JSON.parse(user);
        this.setState({
            userObj: userObj,
            certStatus: this.props.location.query.certStatus,
            backPic: userObj.backPic,
            frontPic: userObj.frontPic
        })

    },
    finishID: function () {
        var that = this;
        var certStatus = that.state.certStatus;
        if (certStatus >0) {
            Toast.info("认证已通过，无需重复上传", 2);
        } else {
            that.setState({
                flag: true
            })
            var faceImgData = that.state.faceImg;
            var backImgData = that.state.backImg;
            if (faceImgData && backImgData) {
                api.identityUserCert(backImgData, faceImgData, function (res) {
                    //  console.log(res);
                    if (res.code == "0000") {
                        Toast.info("上传成功，等待审核", 2);
                        that.setState({
                            flag: false
                        })
                        var data = JSON.parse(strDec(res.data, key1, "", ""));
                        //  console.log(data);
                        var userObj = that.state.userObj;
                        userObj.backPic = data.backPic;
                        userObj.frontPic = data.frontPic;
                        localStorage.setItem("user", JSON.stringify(userObj));
                        globalData.user = JSON.stringify(userObj);
                        //var queryData = {};
                        var path = {
                            pathname: '/Mine',
                            //  state: queryData,
                        }
                        hashHistory.push(path);

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

            } else {
                that.setState({
                    flag: false
                })
                Toast.info("请选择图片", 2)
            }

        }


    },
    componentDidMount: function () {

    },

    upload: function (c, d, name) {
        var that = this;
        var $c = document.querySelector(c),
            $d = document.querySelector(d),
            myfile = $c.files[0],
            reader = new FileReader();
        //reader.readAsBinaryString(file,'gb2312');
        reader.readAsDataURL(myfile);
        reader.onload = function (e) {
            // 这个事件在读取结束后，无论成功或者失败都会触发
            if (reader.error) {
                // console.log(reader.error);
                alert(reader.error);
            } else {
                $d.setAttribute("src", e.target.result);
                //console.log(e.target.result);
            }

        }
        if (myfile) {
            new html5ImgCompress(myfile, {
                before: function (myfile) {
                    // console.log('单张: 压缩前...');
                },
                done: function (myfile, base64) {
                    //  console.log('单张: 压缩成功...');
                    // Toast.info("单张: 压缩成功...",1000)
                    // console.log(base64);
                    that.setState({
                        [name]: base64
                    })
                },
                fail: function (myfile) {
                    //  Toast.info('单张: 压缩失败...');
                },
                complete: function (myfile) {
                    //  console.log('单张: 压缩完成...');
                    //  console.log(that.state)
                },
                notSupport: function (myfile) {
                    alert('浏览器不支持！');
                }
            });
        }
    },


    errorFace: function (event) {
        event.target.src = "src/img/face.png";
        event.target.onerror = null; //控制不要一直跳动 
    },

    errorback: function (event) {
        event.target.src = "src/img/back.png";
        event.target.onerror = null; //控制不要一直跳动 
    },
    render: function () {
        var imgPath = globalData.imgPath;
        console.log(this.state);
        var that = this;
        return (
            <div className="app_Box idCard">
                <Header title="身份证认证" />
                <Loading flag={that.state.flag} />
                <div className="idCardCon content">
                    <h4>万融汇依法保护你的个人信息</h4>
                    <div className="photoBox">
                        <input id="face" type="file" onChange={that.upload.bind(this, "#face", "#faceImg", "faceImg")} accept="image/*" />
                        <img id="faceImg" src={imgPath + that.state.frontPic} onError={that.errorFace} />
                        <div id="box"></div>
                        <p>身份证人头像,图片清晰,边缘完整</p>
                    </div>
                    <div className="photoBox">
                        <input id="back" type="file" onChange={that.upload.bind(this, "#back", "#backImg", "backImg")} accept="image/*" />
                        <img id="backImg" src={imgPath + that.state.backPic} onError={that.errorback} />
                        <p>身份证反面照,图片清晰,边缘完整</p>
                    </div>
                </div>
                <div className="botBtn" onClick={that.finishID}>{that.state.certStatus>0?'认证已通过，无需上传':'完成身份验证'}</div>
            </div>
        )
    }

});


export default IdCard;


