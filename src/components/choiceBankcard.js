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
        const { value } = this.state;
        api.choiceadd(function (res) {

            console.log(res)
            if (res.code === "0000") {
                let Decdata = strDec(res.data, key1, "", "");
                let data = JSON.parse(Decdata);
                let basicdataArr = [];
                that.setState({
                    basicdata: data,
                    id: data[0].id,
                    cardNumber: data[0].cardNumber,
                    mainCard: data[0].mainCard,
                    bankName: data[0].bankName
                })
                console.log(that.state.id)
                console.log(that.state.cardNumber)
                console.log(that.state.mainCard)
                console.log(that.state.bankName)

                let length = data.length;
                for (let i = 0; i < length; i++) {
                    basicdataArr.push(
                        <div className="content" key={i} data-id={data[i].id} onClick={() => {
                            that.choiceadd(data[i].id, data[i].cardNumber, data[i].mainCard, data[i].bankName)
                            // that.choiceadd(data[i].id)
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
                                <List.Item extra={data[i].bankName} className="listimg">   <img src={require('../img/img/web/icon_14@3x.png')} /></List.Item>
                                <div className="displaylastnumber">尾号  ({data[i].cardNumber.substr(data[i].cardNumber.length - 4)})</div>
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



