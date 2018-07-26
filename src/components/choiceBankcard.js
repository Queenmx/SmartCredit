import React, { Component } from 'react'
import { hashHistory } from 'react-router';
import api from './api';
import Header from './header';
import { globalData } from './global.js';
import { List, WhiteSpace, WingBlank, Radio } from 'antd-mobile';
import '../css/choiceBankcard.css';
import { Item } from '../../node_modules/antd-mobile/lib/tab-bar';
var key1 = globalData.key;
const RadioItem = Radio.RadioItem;
class choiceBankcard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldid: '',       //首选id
            oldcardNumber: '', //首选银行卡号
            oldmainCard: '',   //首选 1主卡(首选打勾的) 0副卡
            oldbankName: '',   //首选银行名称(所属银行)
            id: '',         //银行卡表主键
            cardNumber: '', //银行卡号
            mainCard: '',   //1主卡(首选打勾的) 0副卡
            bankName: '',   //银行名称(所属银行)
            basicdata: '',  //获取的所有数据
            basicdataArr: [], //新数组
        }

    }


    componentDidMount() {

        let that = this;
        // const { value } = this.state;
        api.choiceadd(function (res) {
            console.log(res)
            if (res.code === "0000") {
                let Decdata = strDec(res.data, key1, "", "");
                let data = JSON.parse(Decdata);
                console.log(data)
                let basicdataArr = [];
                that.setState({
                    basicdata: data,
                    oldid: data.list[0].id,
                    oldcardNumber: data.list[0].cardNumber,
                    oldmainCard: data.list[0].mainCard,
                    oldbankName: data.list[0].bankName
                })
                console.log(that.state.oldid)
                console.log(that.state.oldcardNumber)
                console.log(that.state.oldmainCard)
                console.log(that.state.oldbankName)

                let length = data.list.length;
                for (let i = 0; i < length; i++) {
                    basicdataArr.push(
                        <div className="content" key={i} data-id={data.list[i].id} onClick={() => {
                            that.choiceadd(data.list[i].id, data.list[i].cardNumber, data.list[i].mainCard, data.list[i].bankName)
                        }}
                        >
                            {/* <RadioItem
                                checked={value === that.state.value} onChange={() => that.onChange(that.state.value)}
                                defaultChecked={true}
                                disabled={false}
                            >
                            </RadioItem> */}
                            <WhiteSpace size="sm" />
                            <List className="list" >
                                <List.Item extra={data.list[i].bankName} className="listimg">   <img src={require('../img/img/web/icon_14@3x.png')} /></List.Item>
                                <div className="displaylastnumber">尾号  ({data.list[i].cardNumber.substr(data.list[i].cardNumber.length - 4)})</div>
                            </List>
                        </div>
                    )
                }
                that.setState({
                    basicdataArr: basicdataArr,
                })

            }
        })
    }
    //cardNumber, mainCard, bankName
    choiceadd(id, cardNumber, mainCard, bankName) {
        this.setState({
            id: id,
            cardNumber: cardNumber,
            mainCard: mainCard,
            bankName: bankName
        }, function () {
            console.log(this.state.id)
            console.log(this.state.cardNumber)
            console.log(this.state.mainCard)
            console.log(this.state.bankName)
        })


    }
    submissionApply = () => {

        var mainId = this.state.oldid;
        var selectId = this.state.id;

        api.update(mainId, selectId, function (res) {
            console.log(res)
            if (res.code === "0000") {
                let Decdata = strDec(res.data, key1, "", "");
                let data = JSON.parse(Decdata);
                console.log(data)
            }
        })
        let path = {
            pathname: "/getmoney",
            query: {
                bankName: this.state.bankName,
                cardNumber: this.state.cardNumber,
                id: this.state.id
            }
        };
        hashHistory.push(path)
    }
    render() {
        let that = this;
        return (
            <div>
                <Header title="选择银行卡" />
                {that.state.basicdataArr}
                <div className="Submission">
                    <div type="primary" onClick={this.submissionApply} className="Submissionbtn">提交申请</div>
                </div>
            </div>
        )
    }
}

export default choiceBankcard



