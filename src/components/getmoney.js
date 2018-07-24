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
        // var addBank = document.getElementById("addBank");
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
    //判断是手续费
    putforward = (cash) => {
        var blance = localStorage.getItem("blance");
        if (cash < 100 && cash.length !== '') {
            console.log('手续费2元')
            this.setState({
                serviceCharge: 2,
                cash: cash
            }, function () {
                console.log(this.state.serviceCharge)
            })
        }
        if (cash > 100) {
            this.setState({
                serviceCharge: cash * 0.05,
                cash: cash
            })
        }
        var putforward = document.getElementById('putforward').value.length
        console.log(putforward)
        if (putforward == '' && putforward == 0) {
            this.setState({
                serviceCharge: ''
            }, function () {
                console.log(this.state.serviceCharge)
            })
        }
        console.log(blance)
        console.log(cash)
        if (Number(cash) > Number(blance)) {
            Toast.info("请输入有效的金额", );
            // console.log('请输入有效的金额')
        }

    }

    //失去焦点判断输入的金额是否有效
    amountofmoney = () => {
        // var putforward = document.getElementById('putforward').value.length
        // console.log(putforward)
        // if (putforward == '' && putforward == 0) {
        //     this.setState({
        //         serviceCharge: ''
        //     }, function () {
        //         console.log(this.state.serviceCharge)
        //     })
        // }
    }


    addCard() {

        hashHistory.push('/addBankcard')
    }
    submissionApply = () => {

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

    // var blance = localStorage.getItem("blance")

    buttoncolor = () => {

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
                            onBlur={this.amountofmoney}
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