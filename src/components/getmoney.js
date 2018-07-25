import React, { Component } from 'react'
import { hashHistory } from 'react-router';
import Header from './header';
import { Toast } from 'antd-mobile';
import { globalData } from './global.js';
import { List, WhiteSpace, InputItem, WingBlank } from 'antd-mobile';
import api from './api';
var key1 = globalData.key;
import "../css/getmoney.css";

class getmoney extends Component {
    constructor(props) {
        super(props);
        this.state = {
            procedurestext: null,
            number: null,
            display: "none",
            id: null,
            bankCardName: '',//银行卡名称
            cardNumber: '',//银行卡号
            cash: '',//提现金额
            serviceCharge: '',//提现手续费
            userName: '', //用户名
            showMask: false
        }
    }
    componentDidMount() {
        if (this.props.location.query.id !== undefined) {
            this.setState({
                showMask: true
            })
        }
        this.setState({
            id: this.props.location.query.id,
            bankCardName: this.props.location.query.bankName,
            cardNumber: this.props.location.query.cardNumber,
        })
    }
    //判断提现金额
    putforward = (cash) => {
        var blance = localStorage.getItem("blance");
        var putforward = document.getElementById('putforward').value.length
        /*
        * 1. 不能有空格
        * 2. 开头不能为0
        * 3. 小于100
        * 4. 大于等于100
        * 5. 没有绑定银行卡，点击提交申请，判断DOM节点DIV显示的状态，判断是否能提交
        * 6. 判断输入后删除数字的长度是否等于0
        * 7. 判断输入的最大额度,是否大于账户余额
        */
        if (/^\s+$/gi.test(document.getElementById('putforward').value)) {
            Toast.info("不能输入空格", );
            this.setState({
                serviceCharge: '',
                cash: ''
            }, function () {
                console.log(this.state.serviceCharge)
            })
        } else if (document.getElementById('putforward').value.indexOf('0') == 0) {
            Toast.info("开头数字不能为0", );
            this.setState({
                serviceCharge: '',
                cash: ''
            }, function () {
                console.log(this.state.serviceCharge)
            })
        } else if (cash < 100) {
            this.setState({
                serviceCharge: 2,
                cash: cash
            }, function () {
            })
        } else if (cash >= 100) {
            this.setState({
                serviceCharge: cash * 0.05,
                cash: cash
            }, function () {
                console.log(this.state.serviceCharge)
            })
        }
        if (hiddenPop.style.display == "none") {
            console.log(hiddenPop.style.display == "none")
            Toast.info("请先绑定银行卡再进行操作!");
        }
        if (putforward == '' && putforward == 0) {
            console.log(putforward)
            this.setState({
                serviceCharge: '',
                cash: ''
            }, function () {
                console.log(this.state.serviceCharge)
            })
        }
        if (Number(cash) > Number(blance)) {
            Toast.info("请输入有效的金额", );
            this.setState({
                serviceCharge: ''
            })
        }

    }
    //添加银行卡
    addCard() {
        hashHistory.push('/addBankcard')
    }
    submissionApply = () => {
        //获取DOM节点，判断该DOM节点是在display是不是none
        //如果display 不是等于none 证明在页面存在，既可调用接口
        var hiddenPop = document.getElementById("hiddenPop")
        if (hiddenPop.style.display !== "block") {
            Toast.info("请先绑定银行卡 !", );
        } else {
            var bankCardName = this.state.bankCardName;
            var cardNumber = this.state.cardNumber;
            var cash = this.state.cash;
            var serviceCharge = this.state.serviceCharge;
            var userName = JSON.parse(localStorage.getItem("user")).realName
            this.setState({
                cash: cash
            })
            console.log(bankCardName)
            console.log(cardNumber)
            console.log(serviceCharge)
            console.log(cash)
            console.log(userName)
            api.replacecard(bankCardName, cardNumber, cash, serviceCharge, userName, function (res) {
                console.log(res)
                if (res.code === "0000") {
                    let Decdata = strDec(res.data, key1, "", "");
                    let data = JSON.parse(Decdata);
                    console.log(data)
                }
            })
        }

    }
    render() {
        var that = this;
        var blance = localStorage.getItem("blance")
        return (
            <div className="mywallet">
                <Header title="申请提现" />
                <div className="content">
                    <div className="time">
                        <p>{blance}</p>
                        <p>账户余额<span></span>(元)</p>
                    </div>
                    <WhiteSpace size="sm" />
                    <List className="addCard"
                        onClick={() => {
                            this.addCard()
                        }}
                    >
                        <List.Item extra={'添加银行卡'}>
                            <img src={require('../img/img/web/icon_13@2x.png')} />
                        </List.Item>
                    </List>
                    <WhiteSpace size="sm" />
                    <List className="addBank" id={`${this.state.showMask == true ? 'downloadPop' : 'hiddenPop'}`}>
                        <List.Item extra={this.state.bankCardName} style={{ fontSize: "18px" }}>
                            <img src={require('../img/img/web/icon_14@3x.png')} />
                        </List.Item>
                        <div className="displaylastnumber">尾号 ({this.state.cardNumber ? this.state.cardNumber.substr(this.state.cardNumber.length - 4) : ""})</div>
                        {/* <div className="displaylastnumber">尾号 ({this.state.cardNumber})</div> */}
                    </List>
                    <WhiteSpace size="sm" />
                    <List >
                        <InputItem
                            type="text"
                            className="putforward"
                            placeholder={this.state.cash}
                            style={{
                                fontSize: "0.3rem"
                            }}
                            onChange={this.putforward}
                            id='putforward'
                        >提现金额</InputItem>
                    </List>
                    <p></p>
                    <List >
                        <InputItem
                            className="procedures"
                            placeholder={this.state.serviceCharge}
                            extra="元"
                            // disabled="disabled"
                            style={{ color: "#fff" }}
                        >提现手续费</InputItem>
                    </List>
                    <p></p>
                    <WingBlank>
                        <div className="promptContent">
                            <div>提现提示</div>
                        </div>
                    </WingBlank>
                </div>
                <WingBlank>
                    <div className="promptNotes">
                        <div >可提交提现申请时间:工作日 09: 00 一一 18: 00</div>
                        <div >提现手续费费率:5%</div>
                        <div >提现货款额度小于100元固定收取2元手续费</div>
                        <div >提现货款额度大于100元按照手续费费率收取</div>
                        <div className="promptNotestitle">预计审核时间1-2个工作日</div>
                    </div>
                </WingBlank>
                <div className="Submission">
                    <div type="primary" onClick={this.submissionApply} className="buttoncolor" >提交申请</div>
                </div>


            </div>

        )
    }
}
export default getmoney