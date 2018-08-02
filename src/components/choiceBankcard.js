

import React, { Component } from 'react'
import { hashHistory } from 'react-router';
import api from './api';
import Header from './header';
import { globalData } from './global.js';
import { List, WhiteSpace, Radio, Toast } from 'antd-mobile';
import '../css/choiceBankcard.css';
import { Item } from '../../node_modules/antd-mobile/lib/tab-bar';
var key1 = globalData.key;
const RadioItem = Radio.RadioItem;
class choiceBankcard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldid: '',       //首选id
            // oldcardNumber: '', //首选银行卡号
            // oldmainCard: '',   //首选 1主卡(首选打勾的) 0副卡
            // oldbankName: '',   //首选银行名称(所属银行)
            id: '',         //银行卡表主键
            cardNumber: '', //银行卡号
            mainCard: '',   //1主卡(首选打勾的) 0副卡
            bankName: '',   //银行名称(所属银行)
            basicdata: [],  //获取的所有数据
            btncount: 0,
            checked: false,
            checkedid: null,
            value: 0,
            localStorageid: 0,
            onSelected: false,
            isLoading: true,
            defaultid: null,
            defaultcardNumber: '',
            defaultidbankName: '',
        }
    }


    componentDidMount() {
        let that = this;
        api.choiceadd(function (res) {
            console.log(res)
            if (res.code === "0000") {
                let Decdata = strDec(res.data, key1, "", "");
                let data = JSON.parse(Decdata);
                console.log(data.list.length);
                that.setState({
                    basicdata: data.list,
                })
                /*页面第一次加载默认选中第一条*/
                if (!localStorage.getItem("cardid")) {
                    /*没有储存过数据 */
                    localStorage.setItem("cardid",data.list[0].id);
                    localStorage.setItem("cardNumber",data.list[0].cardNumber);
                    localStorage.setItem("mainCard",data.list[0].mainCard);
                    localStorage.setItem("bankName",data.list[0].bankName);
                    that.setState({
                        oldid: data.list[0].id,
                        oldcardNumber: data.list[0].cardNumber,
                        oldmainCard: data.list[0].mainCard,
                        oldbankName: data.list[0].bankName,
                        /*页面加载默认勾选 */
                        id: data.list[0].id,
                        cardNumber: data.list[0].cardNumber,
                        mainCard: data.list[0].mainCard,
                        bankName: data.list[0].bankName,
                        isLoading: false,
                        onSelected: true,
                        
                    }, function () {
                        console.log(this.state.oldid)
                    })
                }
                /*有储存过数据 */
                else {
                    console.log('有存过数据')
                    that.setState({
                        /*页面加载默认勾选 */
                        id: localStorage.getItem("cardid"),
                        cardNumber: localStorage.getItem("cardNumber"),
                        mainCard: localStorage.getItem("mainCard"),
                        bankName: localStorage.getItem("bankName"),
                        onSelected: true,
                        isLoading: true
                    }, function () {
                        // console.log(localStorage.getItem("oldid"))
                        console.log(localStorage.getItem("cardid"))
                        console.log(localStorage.getItem("cardNumber"))
                        console.log(localStorage.getItem("mainCard"))
                        console.log(localStorage.getItem("bankName"))
                    })
                }

            }
        })
    }
    /*点击该列表对应的对象 
    * 获取 id 银行卡号 主卡或者副卡 所属银行
    */
    choiceadd(id, cardNumber, mainCard, bankName) {
        this.setState({
            id: id,
            cardNumber: cardNumber,
            mainCard: mainCard,
            bankName: bankName,
        }, function () {

        })
    }
    /*判断是否选中银行卡*/
    onSelected(item, cardNumber, mainCard, bankName) {

        if (item) {
            this.setState({
                oldid:localStorage.getItem("cardid"),
                id: item,
                cardNumber: cardNumber,
                mainCard: mainCard,
                bankName: bankName,
                onSelected: true
            }, function () {
                localStorage.setItem("oldid", this.state.oldid);
                localStorage.setItem("cardid", this.state.id);
                localStorage.setItem("cardNumber", this.state.cardNumber);
                localStorage.setItem("mainCard", this.state.mainCard);
                localStorage.setItem("bankName", this.state.bankName);
                console.log(localStorage.getItem("oldid"))
                console.log(localStorage.getItem("cardid"))
                console.log(localStorage.getItem("cardNumber"))
                console.log(localStorage.getItem("mainCard"))
                console.log(localStorage.getItem("bankName"))
            });
        }
        if (item == '') {
            this.setState({
                onSelected: false
            }, function () {
            });
        }
    }
    /*提交申请
    *原首选卡id 
    *现在选中卡id
    */
    submissionApply = () => {
        if (this.state.onSelected == true) {
            var mainId = this.state.oldid;
            console.log(mainId)
            var selectId = this.state.id;
            api.update(mainId, selectId, function (res) {
                console.log(res)
                if (res.code === "0000") {
                    let Decdata = strDec(res.data, key1, "", "");
                    let data = JSON.parse(Decdata);
                }
            })
            let path = {
                pathname: "/getmoney",
                query: {
                    id: this.state.id,
                    cardNumber: this.state.cardNumber,
                    mainCard: this.state.mainCard,
                    bankName: this.state.bankName,
                    onSelected: true
                }
            };
            hashHistory.push(path)
        }
        if (this.state.onSelected == false) {
            Toast.info("请选择银行卡");
        }
    }

    render() {
        let arr = this.state.basicdata
        return (
            <div>
                <Header title="选择银行卡" />
                {arr.map(item => (
                    // console.log(item),
                    <List className="list" key={item.id} data-id={item.id} id="list"
                        onClick={() => {
                            this.choiceadd(item.id, item.cardNumber, item.mainCard, item.bankName, item)
                        }}
                    >
                        <div className="content">
                            <RadioItem
                                checked={this.state.id === item.id} onChange={() => this.onSelected(item.id, item.cardNumber, item.mainCard, item.bankName)}>
                                {/* checked={!this.state.isLoading ? this.state.id === item.id : this.state.id == localStorage.getItem("cardid")} onChange={() => this.onSelected(item.id, item.cardNumber, item.mainCard, item.bankName)}> */}
                                <div className="list">
                                    <div className="listimg"><img src={require('../img/img/web/bankcard.png')} /></div>
                                    <div className="listtext">{item.bankName}</div>
                                </div>
                                <div className="displaylastnumber">尾号  ({item.cardNumber.substr(item.cardNumber.length - 4)})</div>
                            </RadioItem>
                        </div>
                        <WhiteSpace size="sm" />
                    </List>
                ))}
                <div className="Submission">
                    <div type="primary" onClick={this.submissionApply} className="Submissionbtn">确认</div>
                </div>

            </div>
        )
    }
}

export default choiceBankcard