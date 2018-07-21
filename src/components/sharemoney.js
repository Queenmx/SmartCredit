import React, { Component } from 'react'
import { hashHistory } from 'react-router';
import { NavBar, Icon, Button, WingBlank, WhiteSpace, Tabs, Modal, List } from 'antd-mobile';
import "../css/sharemoney.css";


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
                    text: '微信朋友',
                    id: 1,
                },
                {
                    text: '微信朋友圈',
                    id: 2,
                },
                {
                    text: 'QQ好友',
                    id: 3,
                },
                {
                    text: 'QQ空间',
                    id: 4,
                },
                {
                    text: '微博',
                    id: 5,
                },
                {
                    text: '二维码',
                    id: 6,
                },
                {
                    text: '复制链接',
                    id: 7,
                },
                {
                    text: '邮件',
                    id: 8,
                }
            ],
            modal1: false,
            modal2: false
        }
    }
    showModal = key => (e) => {

        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
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
        // axios.get('/user?ID=1')
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        switch (item.text) {
            case '微信朋友':
                console.log('微信朋友')
                break;
            case '微信朋友圈':
                console.log('微信朋友圈')
                break;
            case 'QQ好友':
                console.log('QQ好友')
                break;
            case 'QQ空间':
                console.log('QQ空间')
                break;
            case '微博':
                console.log('微博')
                break;
            case '二维码':
                console.log('二维码')
                break;
            case '复制链接':
                console.log('复制链接')
                break;
            case '邮件':
                console.log('邮件')
                break;
        }

    }

    selectImg(level) {
        switch (level) {
            case '微信朋友':
                return 'weixin';
            case '微信朋友圈':
                return 'pengyouquan';
            case 'QQ好友':
                return 'qq';
            case 'QQ空间':
                return 'qqkongjian';
            case '微博':
                return 'weibo';
            case '二维码':
                return 'erweima';
            case '复制链接':
                return 'fuzhi';
            case '邮件':
                return 'youjian';
        }
    }

    render() {

        return (
            <div className="mywallet">
                <NavBar
                    mode="dark"
                    className="fixed-header"
                    ref={el => (this.lv = el)}
                    icon={<Icon type="left" />}
                    onLeftClick={() => {
                        hashHistory.goBack();
                    }}
                >
                    分享赚钱
                 </NavBar>
                <div className="content">
                    <div className="time">
                        <p>62,100.365</p>
                        <p>累计收益<span></span>(元)</p>
                    </div>
                    <div className="share">
                        <Button type="primary" inline style={{ marginRight: '4px' }} className="sharebtn" onClick={this.showModal('modal2')}> 分享好友,一起赚钱</Button>
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
                        <ul className="listitem">
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                        </ul>
                    </div>
                    <div className="extract">
                        <div className="extractnav">
                            <div>用户账号</div>
                            <div>分享时间</div>
                            <div>总提成(元)</div>
                        </div>
                    </div>

                </Tabs>








            </div>
        )
    }
}

export default sharemoney