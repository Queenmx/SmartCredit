import React, { Component } from 'react'
import { hashHistory } from 'react-router';
import { Button, Tabs, Modal } from 'antd-mobile';
import "../css/sharemoney.css";
import Header from './header';
import api from './api';
import { globalData } from './global.js';


function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}
class sharemoney extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabs: [
                { title: '分享明细' },
                { title: '提成明细' },
            ],
            selectorContent: [
                {
                    text: '微信',
                    id: 1,
                    className: '-mob-share-weixin',

                },
                // {
                //     text: '微信朋友圈',
                //     id: 2,
                // },
                {
                    text: 'QQ好友',
                    id: 3,
                    className: "-mob-share-qq"
                },
                {
                    text: 'QQ空间',
                    id: 4,
                    className: '-mob-share-qzone'
                },
                {
                    text: '新浪微博',
                    id: 5,
                    className: '-mob-share-weibo'
                },
                // {
                //     text: '二维码',
                //     id: 6,
                // },
                // {
                //     text: '复制链接',
                //     id: 7,
                // },
                // {
                //     text: '邮件',
                //     id: 8,
                // }
            ],
            modal1: false,
            modal2: false,
            loading : false
            //-mob-share-weixin  -mob-share-qq -mob-share-qzone -mob-share-weibo
        }
        this.lock = false;
    }
    componentWillMount() {
        this.lock = true;
        var user=JSON.parse(localStorage.getItem("user"));
        this.setState({
            user:user
        })
    }
    componentDidMount() {

        // debugger;
        var key1 = globalData.key;
        var that = this;
        var userName = JSON.parse(localStorage.getItem("user")).userName;
        api.shareDetail(userName, function (res) {
            if (res.code == "0000") {
                var data = JSON.parse(strDec(res.data, key1, "", ""));
                var shareArr = [];
                var ExtractArr = [];
                that.setState({
                    money: data.money
                })
                for (var i in data.listShare) {
                    shareArr.push(
                        <ul className="listitem" key={i}>
                            <li>{data.listShare[i].userName}</li>
                            <li>{data.listShare[i].shareTime}</li>
                            <li>{data.listShare[i].shareMoney}</li>
                        </ul>
                    )
                }
                that.setState({
                    shareArr: shareArr
                })
                for (var i in data.listExtract) {
                    ExtractArr.push(
                        <ul className="listitem" key={i + 1}>
                            <li>{data.listExtract[i].userName}</li>
                            <li>{data.listExtract[i].submissionTime}</li>
                            <li>{data.listExtract[i].extract}</li>
                        </ul>
                    )
                }
                that.setState({
                    ExtractArr: ExtractArr
                })
            }
        })

    }

    showModal = key => (e) => {

        // e.preventDefault(); // 修复 Android 上点击穿透
        // this.setState({
        //     [key]: true,
        // });
        this.start();
    }
    nativeInteractive(fn, obj){
        // console.log(123);
        var self = this;
        self.setupWebViewJavascriptBridge(function (bridge) {
            if (obj) {
                bridge.callHandler('webview_call_native', obj, function (response) { });
            }
            bridge.registerHandler('native_call_webview', function (data, response) {
                fn(data);
            })
        });
        if (window.start && obj) {
            var str = JSON.stringify(obj);
            window.start.webview_call_native(str);
        }

        window.native_call_webview = function (data) {
            var obj = eval('(' + data + ')');
            fn(obj);
        }
    }
    start() {
        var phone=this.state.user.phone;
        var data={
            type:"4",
            url:"http://h5.xinyzx.com:82/SmartCreditShare/index.html#/?share="+phone,
            title:"万融汇邀您注册",
            pic:"http://xrjf.oss-cn-shanghai.aliyuncs.com/uploadImg/2.jpg",
            message:"啦啦啦啦啦啦啦"
        };
        // console.log(phone)
        var native = function (data) {
            // console.log(111)
        }
        return this.nativeInteractive(native,data);//登录设置
    }
    setupWebViewJavascriptBridge(callback) {
        // console.log("3333");
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }
    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }
    clickshare(item) {
        switch (item.text) {
            case '微信':
                console.log('微信朋友');
                var weixin = mobShare( 'weixin' );
                weixin.send();
                break;
            // case '微信朋友圈':
            //     console.log('微信朋友圈')
            //     break;
            case 'QQ好友':
                console.log('QQ好友');
                var qq = mobShare('qq');
                qq.send();
                break;
            case 'QQ空间':
                console.log('QQ空间');
                var qzone = mobShare( 'qzone' );
                qzone.send();
                break;
            case '新浪微博':
                console.log('微博');                
                var weibo = mobShare( 'weibo' );
                weibo.send();
                break;
            // case '二维码':
            //     console.log('二维码')
            //     break;
            // case '复制链接':
            //     console.log('复制链接')
            //     break;
            // case '邮件':
            //     console.log('邮件')
            //     break;
        }

    }

    selectImg(level) {
        switch (level) {
            case '微信':
                return 'weixin';
            // case '微信朋友圈':
            //     return 'pengyouquan';
            case 'QQ好友':
                return 'qq';
            case 'QQ空间':
                return 'qqkongjian';
            case '新浪微博':
                return 'weibo';
            case '二维码':
                return 'erweima';
            case '复制链接':
                return 'fuzhi';
            case '邮件':
                return 'youjian';
        }
    }
    wx = () => {
        console.log('微信')

    }
    xl = () => {
        console.log('新浪')
    }
    qqkj = () => {
        console.log('qq空间')
    }
    qqhy = () => {
        console.log('QQ好友')

    }


    share = () => {
        // var a = document.getElementById("a");
        // a.style.display = "block"
        // console.log(456)

    }
    render() {
        return (
            <div className="mywallet">
                <Header title="分享赚钱" />
                <div className="content">
                    <div className="time">
                        <p>{this.state.money = "null" ? 0 : this.state.money}</p>
                        <p>累计收益<span></span>(元)</p>
                    </div>
                    <div className="share">
                        <Button type="primary" inline style={{ marginRight: '4px' }} className="sharebtn" onClick={this.showModal('modal2')}> 分享好友 一起赚钱</Button>

                        <Modal
                            popup
                            visible={this.state.modal2}
                            onClose={this.onClose('modal2')}
                            animationType="slide-up"
                            className="modifymodal"
                        >

                            {this.state.selectorContent.map((item, index) => (
                                <div
                                    key={index}
                                    className="rendering"
                                    onClick={() => {
                                        this.clickshare(item)
                                    }}
                                >
                                    <div className="renderingimg">
                                        <img src={require(`../img/img/web/${this.selectImg(item.text)}.png`)} />
                                    </div>
                                    <div className="renderingtext">{item.text}</div>
                                </div>
                            ))}
                            <div />
                            <Button type="primary" onClick={this.onClose('modal2')} className="cancelbtn">取消</Button>
                        </Modal>
                    </div>
                    {/* <div className="share">
                        <div className="-mob-share-ui-button -mob-share-open">分享好友 一起赚钱</div>
                        <div className="-mob-share-ui -mob-share-ui-theme -mob-share-ui-theme-slide-bottom" style={{ display: "none" }}>
                             <ul className="-mob-share-list">
                                <li className="-mob-share-weixin" onClick={this.wx}><p>微信</p></li>
                                <li className="-mob-share-qq"><p onClick={this.qqhy}>QQ好友</p></li>
                                <li className="-mob-share-qzone" onClick={this.qqkj}><p>QQ空间</p></li>
                                <li className="-mob-share-weibo" onClick={this.xl}><p>新浪微博</p></li>
                            </ul>
                            <div className="-mob-share-close">取消</div>
                        </div>
                        <div className="-mob-share-ui-bg"></div>
                    </div> */}
                </div>
                <Tabs tabs={this.state.tabs}
                    initalPage={'t2'}
                >
                    <div className="detailed">
                        <div className="detailednav">
                            <div>用户账号</div>
                            <div>分享时间</div>
                            <div>总提成(元)</div>
                        </div>
                        {this.state.shareArr}
                    </div>
                    <div className="extract">
                        <div className="extractnav">
                            <div>用户账号</div>
                            <div>分享时间</div>
                            <div>总提成(元)</div>
                        </div>
                        {this.state.ExtractArr}
                    </div>

                </Tabs>
            </div>
        )
    }
}

export default sharemoney

/***以上最初***/






