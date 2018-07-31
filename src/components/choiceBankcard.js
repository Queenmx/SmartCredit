// import React, { Component } from 'react'
// import { hashHistory } from 'react-router';
// import api from './api';
// import Header from './header';
// import { globalData } from './global.js';
// import { List, WhiteSpace, WingBlank, Radio, Flex } from 'antd-mobile';
// import '../css/choiceBankcard.css';
// import { Item } from '../../node_modules/antd-mobile/lib/tab-bar';
// var key1 = globalData.key;
// const RadioItem = Radio.RadioItem;
// class choiceBankcard extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             oldid: '',       //首选id
//             oldcardNumber: '', //首选银行卡号
//             oldmainCard: '',   //首选 1主卡(首选打勾的) 0副卡
//             oldbankName: '',   //首选银行名称(所属银行)
//             id: '',         //银行卡表主键
//             cardNumber: '', //银行卡号
//             mainCard: '',   //1主卡(首选打勾的) 0副卡
//             bankName: '',   //银行名称(所属银行)
//             basicdata: '',  //获取的所有数据
//             basicdataArr: [], //新数组
//             value: 0,
//         }
//     }


//     componentDidMount() {
//         let that = this;
//         const { value } = this.state;
//         // const { value } = this.state;
//         api.choiceadd(function (res) {
//             console.log(res)
//             if (res.code === "0000") {
//                 let Decdata = strDec(res.data, key1, "", "");
//                 let data = JSON.parse(Decdata);
//                 console.log(data)
//                 let basicdataArr = [];
//                 that.setState({
//                     basicdata: data,
//                     oldid: data.list[0].id,
//                     oldcardNumber: data.list[0].cardNumber,
//                     oldmainCard: data.list[0].mainCard,
//                     oldbankName: data.list[0].bankName
//                 })
//                 console.log(that.state.oldid)
//                 console.log(that.state.oldcardNumber)
//                 console.log(that.state.oldmainCard)
//                 console.log(that.state.oldbankName)

//                 let length = data.list.length;
//                 for (let i = 0; i < length; i++) {
//                     basicdataArr.push(
//                         <div className="content" key={i} data-id={data.list[i].id} onClick={() => {
//                             that.choiceadd(data.list[i].id, data.list[i].cardNumber, data.list[i].mainCard, data.list[i].bankName)
//                         }}
//                         >
//                             <WhiteSpace size="sm" />
//                             <List className="list" >
//                                 <List.Item extra={data.list[i].bankName} className="listimg">   <img src={require('../img/img/web/icon_14@3x.png')} /></List.Item>
//                                 <div className="displaylastnumber">尾号  ({data.list[i].cardNumber.substr(data.list[i].cardNumber.length - 4)})</div>
//                             </List>
//                         </div>
//                     )
//                 }
//                 that.setState({
//                     basicdataArr: basicdataArr,
//                 })

//             }
//         })
//     }
//     /*点击该列表对应的对象 
//     * 获取 id 银行卡号 主卡或者副卡 所属银行
//     */
//     choiceadd(id, cardNumber, mainCard, bankName) {
//         this.setState({
//             id: id,
//             cardNumber: cardNumber,
//             mainCard: mainCard,
//             bankName: bankName,
//             showMask: true
//         }, function () {
//             console.log(this.state.id)
//             console.log(this.state.cardNumber)
//             console.log(this.state.mainCard)
//             console.log(this.state.bankName)
//         })
//     }
//     /*提交申请
//     *原首选卡id 
//     *现在选中卡id
//     */
//     submissionApply = () => {
//         var mainId = this.state.oldid;
//         var selectId = this.state.id;

//         api.update(mainId, selectId, function (res) {
//             console.log(res)
//             if (res.code === "0000") {
//                 let Decdata = strDec(res.data, key1, "", "");
//                 let data = JSON.parse(Decdata);
//                 console.log(data)
//             }
//         })
//         let path = {
//             pathname: "/getmoney",
//             query: {
//                 bankName: this.state.bankName,
//                 cardNumber: this.state.cardNumber,
//                 id: this.state.id
//             }
//         };
//         hashHistory.push(path)
//     }
//     render() {
//         let that = this;
//         return (
//             <div>
//                 <Header title="选择银行卡" />
//                 {that.state.basicdataArr}
//                 <div className="Submission">
//                     <div type="primary" onClick={this.submissionApply} className="Submissionbtn">提交申请</div>
//                 </div>
//             </div>
//         )
//     }
// }

// export default choiceBankcard

/**以上初始代码**/

// import React, { Component } from 'react'
// import { hashHistory } from 'react-router';
// import api from './api';
// import Header from './header';
// import { globalData } from './global.js';
// import { List, WhiteSpace, Radio } from 'antd-mobile';
// import '../css/choiceBankcard.css';
// import { Item } from '../../node_modules/antd-mobile/lib/tab-bar';
// var key1 = globalData.key;
// const RadioItem = Radio.RadioItem;
// class choiceBankcard extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             oldid: '',       //首选id
//             oldcardNumber: '', //首选银行卡号
//             oldmainCard: '',   //首选 1主卡(首选打勾的) 0副卡
//             oldbankName: '',   //首选银行名称(所属银行)
//             id: '',         //银行卡表主键
//             cardNumber: '', //银行卡号
//             mainCard: '',   //1主卡(首选打勾的) 0副卡
//             bankName: '',   //银行名称(所属银行)
//             basicdata: '',  //获取的所有数据
//             basicdataArr: [], //新数组
//             btncount: 0,
//             checked: false,
//             checkedid: null,
//         }
//     }


//     componentDidMount() {
//         let that = this;
//         api.choiceadd(function (res) {
//             console.log(res)
//             if (res.code === "0000") {
//                 let Decdata = strDec(res.data, key1, "", "");
//                 let data = JSON.parse(Decdata);
//                 console.log(data)
//                 let basicdataArr = [];
//                 that.setState({
//                     basicdata: data,
//                     oldid: data.list[0].id,
//                     oldcardNumber: data.list[0].cardNumber,
//                     oldmainCard: data.list[0].mainCard,
//                     oldbankName: data.list[0].bankName
//                 })
//                 console.log(that.state.oldid)
//                 console.log(that.state.oldcardNumber)
//                 console.log(that.state.oldmainCard)
//                 console.log(that.state.oldbankName)


//                 let length = data.list.length;
//                 for (let i = 0; i < length; i++) {
//                     basicdataArr.push(
//                         <List className="list" key={i} data-id={data.list[i].id} id="list"
//                             onClick={() => {
//                                 that.choiceadd(data.list[i].id, data.list[i].cardNumber, data.list[i].mainCard, data.list[i].bankName)
//                             }}
//                             checked={that.state.checkedid === data.list[i].id ? true : false}
//                             onChange={that.onSelected(data.list[i].id)}
//                         >
//                             {console.log(that.state.checkedid)}
//                             <div className="content">
//                                 <RadioItem className="radioItem" >
//                                     <div className="list">
//                                         <div className="listimg"><img src={require('../img/img/web/icon_14@3x.png')} /></div>
//                                         <div className="listtext">{data.list[i].bankName}</div>
//                                     </div>
//                                     <div className="displaylastnumber">尾号  ({data.list[i].cardNumber.substr(data.list[i].cardNumber.length - 4)})</div>

//                                 </RadioItem>
//                             </div>
//                             <WhiteSpace size="sm" />
//                         </List>
//                     )
//                 }
//                 that.setState({
//                     basicdataArr: basicdataArr,
//                 })

//             }
//         })
//     }
//     /*点击该列表对应的对象 
//     * 获取 id 银行卡号 主卡或者副卡 所属银行
//     */
//     choiceadd(id, cardNumber, mainCard, bankName) {
//         this.setState({
//             id: id,
//             cardNumber: cardNumber,
//             mainCard: mainCard,
//             bankName: bankName,
//         }, function () {
//             console.log(this.state.id)
//             console.log(this.state.cardNumber)
//             console.log(this.state.mainCard)
//             console.log(this.state.bankName)
//         })
//     }
//     onSelected(item) {
//         console.log(item)
//     }
//     checked() {

//     }
//     /*提交申请
//     *原首选卡id 
//     *现在选中卡id
//     */
//     submissionApply = () => {
//         var mainId = this.state.oldid;
//         var selectId = this.state.id;

//         api.update(mainId, selectId, function (res) {
//             console.log(res)
//             if (res.code === "0000") {
//                 let Decdata = strDec(res.data, key1, "", "");
//                 let data = JSON.parse(Decdata);
//                 console.log(data)
//             }
//         })
//         let path = {
//             pathname: "/getmoney",
//             query: {
//                 bankName: this.state.bankName,
//                 cardNumber: this.state.cardNumber,
//                 id: this.state.id
//             }
//         };
//         hashHistory.push(path)
//     }
//     onSelected(item) {
//         console.log(item)
//     }
//     render() {
//         let that = this;
//         return (
//             <div>
//                 <Header title="选择银行卡" />
//                 {that.state.basicdataArr}
//                 <div className="Submission">
//                     <div type="primary" onClick={this.submissionApply} className="Submissionbtn">提交申请</div>
//                 </div>
//             </div>
//         )
//     }
// }

// export default choiceBankcard



/**V2版本**/

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
            oldcardNumber: '', //首选银行卡号
            oldmainCard: '',   //首选 1主卡(首选打勾的) 0副卡
            oldbankName: '',   //首选银行名称(所属银行)
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
            isLoading: true
        }
    }


    componentDidMount() {
        let that = this;
        if (this.state.isLoading) {
            api.choiceadd(function (res) {
                console.log(res)
                if (res.code === "0000") {
                    let Decdata = strDec(res.data, key1, "", "");
                    let data = JSON.parse(Decdata);
                    // console.log(data)
                    /*页面第一次加载默认选中第一条*/
                    that.setState({
                        basicdata: data.list,
                        oldid: data.list[0].id,
                        oldcardNumber: data.list[0].cardNumber,
                        oldmainCard: data.list[0].mainCard,
                        oldbankName: data.list[0].bankName,
                        value: data.list[0].id,
                    })
                    console.log(that.state.value)
                    console.log(that.state.oldid)
                }
            })
        }else{
            localStorage.get("cardid");
            localStorage.get("cardNumber");
            localStorage.get("bankName");
        }

    }
    /*点击该列表对应的对象 
    * 获取 id 银行卡号 主卡或者副卡 所属银行
    */
    choiceadd(id, cardNumber, mainCard, bankName) {
        // console.log(cardid)
        // console.log(id)
        // console.log(cardNumber)
        // console.log(mainCard)
        // console.log(bankName)
        this.setState({
            id: id,
            cardNumber: cardNumber,
            mainCard: mainCard,
            bankName: bankName,
        }, function () {
            localStorage.setItem("cardid", this.state.id);
            localStorage.setItem("cardNumber", this.state.cardNumber);
            localStorage.setItem("bankName", this.state.bankName);
        })

    }
    /*提交申请
    *原首选卡id 
    *现在选中卡id
    */
    submissionApply = () => {
        if (this.state.onSelected == true) {
            var mainId = this.state.oldid;
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
                    bankName: this.state.bankName,
                    cardNumber: this.state.cardNumber,
                    id: this.state.id,
                    onSelected: true
                }
            };
            hashHistory.push(path)
        }
        if (this.state.onSelected == false) {
            Toast.info("请选择银行卡");
        }
    }
    /*判断是否选中银行卡*/
    onSelected(item) {
        if (item == item) {
            this.setState({
                value: item,
                onSelected: true
            }, function () {
                console.log(this.state.value)
                console.log(this.state.onSelected)
            });
            console.log(item)
        }
        if (item == '') {
            this.setState({
                onSelected: false
            }, function () {
            });
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
                            <RadioItem checked={this.state.value === item.id} onChange={() => this.onSelected(item.id)}>
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