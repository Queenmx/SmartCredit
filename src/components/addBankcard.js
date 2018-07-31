

// import React, { Component } from 'react'
// import { hashHistory } from 'react-router';
// import { NavBar, Icon, List, InputItem, WhiteSpace, Button, WingBlank } from 'antd-mobile';
// import "../css/addBankcard.css";
// class addBankcard extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             btntext: "获取验证码",
//             timer: 60,
//             discodeBtn: false,
//             clearInterval: false
//         }
//     }

//     //获取持卡人信息
//     name(namecoke) {
//         console.log(namecoke)
//         if (namecoke != 0) {
//             var reg = /^([\u4e00-\u9fa5]){2,7}$/;
//             if (!reg.test(namecoke)) {
//                 console.log("输入不合法!")
//             } else {
//                 console.log("输入合法")
//             }
//         }

//     }
//     //获取身份证信息
//     identity(identitycoke) {
//         console.log(identitycoke)

//         //身份证号合法性验证
//         //支持15位和18位身份证号
//         //支持地址编码、出生日期、校验位验证
//         var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
//         var row = {
//             'pass': true,
//             'msg': '验证成功'
//         };
//         console.log(row)
//         if (!identitycoke || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(identitycoke)) {
//             row = {
//                 'pass': false,
//                 'msg': '身份证号格式错误'
//             };
//             console.log(row)
//         } else if (!city[identitycoke.substr(0, 2)]) {
//             row = {
//                 'pass': false,
//                 'msg': '身份证号地址编码错误'
//             };
//             console.log(row)
//         } else {
//             //18位身份证需要验证最后一位校验位
//             if (identitycoke.length == 18) {
//                 identitycoke = identitycoke.split('');
//                 //∑(ai×Wi)(mod 11)
//                 //加权因子
//                 var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
//                 //校验位
//                 var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
//                 var sum = 0;
//                 var ai = 0;
//                 var wi = 0;
//                 for (var i = 0; i < 17; i++) {
//                     ai = identitycoke[i];
//                     wi = factor[i];
//                     sum += ai * wi;
//                 }
//                 if (parity[sum % 11] != identitycoke[17].toUpperCase()) {
//                     row = {
//                         'pass': false,
//                         'msg': '身份证号校验位错误'
//                     };
//                     console.log(row)
//                 }
//             }
//         }
//         return row;
//     }
//     //获取银行卡卡号
//     cardnumber(value) {
//         console.log(value)
//     }
//     //获取手机号码
//     phone(phonecoke) {

//         if (phonecoke.length == 0 && phonecoke.length == '') {
//             console.log('请输入手机号码!')
//             return false
//         }
//         if (phonecoke.length != 11) {
//             console.log(phonecoke)
//             console.log('请输入有效的手机号码!')
//             return false
//         }
//         var PATTERN_CHINAMOBILE = /^1(3[4-9]|5[012789]|8[23478]|4[7]|7[8])\d{8}$/; //移动号
//         var PATTERN_CHINAUNICOM = /^1(3[0-2]|5[56]|8[56]|4[5]|7[6])\d{8}$/; //联通号
//         var PATTERN_CHINATELECOM = /^1((33|53|77|8[019])[0-9]|349)|(700\\d{7}$)/; //电信号
//         if (PATTERN_CHINAUNICOM.test(phonecoke)) {
//             console.log("欢迎您联通用户");
//             return true;
//         } else if (PATTERN_CHINAMOBILE.test(phonecoke)) {
//             console.log("欢迎您移动用户");
//             return true;
//         } else if (PATTERN_CHINATELECOM.test(phonecoke)) {
//             console.log("欢迎您电信用户");
//             return true;
//         } else {
//             console.log("请输入正确的手机号");
//             return false;
//         }
//     }
//     //获取验证码value
//     code(value) {
//         console.log(value)

//     }
//     //验证码倒计时
//     btncoke = () => {
//         const Time = setInterval(() => {
//             let times = this.state.timer - 1;
//             this.setState(
//                 {
//                     timer: times,
//                     btntext: times+"s",
//                     discodeBtn: true
//                 }, () => {
//                     if (this.state.timer === 0) {
//                         this.setState({
//                             timer: 60,
//                         })
//                     clearInterval(Time);
//                     this.setState({ btntext: '重新发送', discodeBtn: false })
//                     }
//                 });
//         }, 1000);
//     }
//     btn() {
//         hashHistory.push('/choiceBankcard')
//     }
//     render() {
//         return (
//             <div className="mywallet">
//                 <NavBar
//                     mode="dark"
//                     className="fixed-header"
//                     ref={el => (this.lv = el)}
//                     icon={<Icon type="left" />}
//                     onLeftClick={() => {
//                         hashHistory.goBack();
//                     }}
//                 >
//                     添加银行卡
//                  </NavBar>
//                 <div className="content">
//                     <div className="promptTitle">
//                         <WingBlank>
//                             请绑定本人卡的银行卡
//                         </WingBlank>
//                     </div>
//                     <List>
//                         <InputItem
//                             placeholder=""
//                             style={{
//                                 fontSize: "0.3rem"
//                             }}
//                             clear
//                             onChange={(value) => {
//                                 this.name(value)
//                             }}
//                         >持卡人</InputItem>
//                     </List>
//                     <List>
//                         <InputItem
//                             placeholder="请输入身份证号"
//                             style={{
//                                 fontSize: "0.3rem"
//                             }}
//                             clear
//                             onChange={(identitycoke) => {
//                                 this.identity(identitycoke)
//                             }}
//                         >身份证号</InputItem>
//                     </List>
//                     <WhiteSpace size="sm" />
//                     <List>
//                         <InputItem
//                             placeholder="请输入银行卡号"
//                             style={{
//                                 fontSize: "0.3rem"
//                             }}
//                             clear
//                             onChange={(value) => {
//                                 this.cardnumber(value)
//                             }}
//                         >银行卡号</InputItem>
//                     </List>
//                     <List>
//                         <InputItem
//                             placeholder="输入卡号后识别并展示"
//                             style={{
//                                 fontSize: "0.3rem"
//                             }}
//                             clear
//                         >所属银行</InputItem>
//                     </List>
//                     <WhiteSpace size="sm" />
//                     <List>
//                         <InputItem
//                             placeholder="请输入手机号码"
//                             style={{
//                                 fontSize: "0.3rem"
//                             }}
//                             clear
//                             onChange={(phonecoke) => {
//                                 this.phone(phonecoke)
//                             }}
//                         >预留手机号</InputItem>
//                     </List>
//                     <List>
//                         <InputItem
//                             className="codeinput"

//                             placeholder="请输入验证码"
//                             style={{
//                                 fontSize: "0.3rem"
//                             }}
//                             clear
//                             onChange={(value) => {
//                                 this.code(value)
//                             }}
//                         >
//                             <p>验证码</p>

//                         </InputItem>
//                         <div className="code">
//                             <Button type="ghost" inline size="small" className="btncode" onClick={() => {
//                                 this.btncoke()
//                             }}>{this.state.btntext}</Button>
//                         </div>
//                     </List>
//                     <div className="supportbank">
//                         <WingBlank> <div className="supporttitle">支持银行</div></WingBlank>
//                         <WingBlank className="SubmissionContent">
//                             <Button type="primary"
//                                 onClick={() => {
//                                     this.btn()
//                                 }}
//                             >提交</Button><WhiteSpace />
//                         </WingBlank>

//                     </div>
//                 </div>

//             </div>

//         )
//     }
// }
// export default addBankcard





import React, { Component } from 'react'
import { hashHistory } from 'react-router';
import api from './api';
import Header from './header';
import { globalData } from './global.js';
import { List, InputItem, WhiteSpace, Button, WingBlank, Toast } from 'antd-mobile';
import "../css/addBankcard.css";
import { Item } from '../../node_modules/antd-mobile/lib/tab-bar';
var key1 = globalData.key;
class addBankcard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btntext: "获取验证码",  //提示
            timer: 60,          //点击按钮倒计时
            beoverdueTime: 600,  //最长有效的过期时间
            isClickable: false, //按钮点击初始状态
            clearInterval: true,
            nameError: false,  //持卡人信息 默认为false
            namevalue: '',     //持卡人信息初始值

            identityError: false, //身份证 默认为false
            identityvalue: '',    //身份证信息初始值

            cardError: false,    //卡号默认为false
            cardnumbervalue: '', //卡号信息初始值

            bankError: false,    //所属银行默认为false
            banknamevalue: '',   //所属银行

            phoneError: false,  //预留手机号码 默认为false
            phonevalue: '',     //预留手机号初始值

            codeError: false,    //验证码 默认为false
            codevalue: '',       //验证码初始值
            newcode: '',
            pass: null,          //null 显示的状态  false or true
            msg: null,           //显示的内容 身份证号格式错误 身份证号地址编码错误 身份证号校验位错误


            btnsuccess: null,  //提交成功初始值
            btnError: null,    //提交失败

            namecount: 0,      //条件正确content++
            cardnumbercount: 0,
            banknamecount: 0,
            phonecount: 0,
            identitycount: 0,
            btncokecount: 0,
            codecount: 0,
            btn: false,
            data: '',
        }
    }
    /**组件将被卸载**/
    componentWillUnmount() {
        /**重写组件的setState方法，直接返回空**/
        this.setState = (state, callback) => {
            return;
        };
    }
    /**获取持卡人信息**/
    name = (namevalue) => {
        if (namevalue.replace(/\s/g, '').length < 2 || namevalue.replace(/\s/g, '').length < 5 || namevalue.length == 0 || namevalue.length == '') {
            this.setState({
                nameError: true
            })
        } else {
            this.setState({
                nameError: false
            })
        }
        var reg = /^([\u4e00-\u9fa5]){2,5}$/;
        if (!reg.test(namevalue)) {
            this.setState({
                nameError: true
            })
            console.log('持卡人信息有误!')
        } else {
            this.setState({
                nameError: false,
            })
            console.log('正确')
        }
        if (this.state.nameError == false) {
            this.setState({
                namebtn: this.state.namecount++
            })
            console.log(this.state.namecount)
        }
        this.setState({
            namevalue,
        });
    }

    /**获取身份证信息**/
    identity = (identityvalue) => {
        console.log(identityvalue)
        if ((!identityvalue.replace(/\s/g, '').length < 15 || identityvalue.replace(/\s/g, '').length > 18 || identityvalue.length == 0 || identityvalue.length == '') && !identityvalue || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(identityvalue)) {
            this.setState({
                identityError: true,
            });
        } else {
            this.setState({
                identityError: false,
                identitybtn: this.state.identitycount++
            })
        }
        this.setState({
            identityvalue,
        });
        /**身份证号合法性验证**/
        /**支持15位和18位身份证号**/
        /**支持地址编码、出生日期、校验位验证**/
        var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
        if (!identityvalue || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(identityvalue)) {
            this.setState({
                identityError: true,
                pass: false,
                msg: '身份证号格式错误'
            })
            console.log(this.state.msg)
        } else if (!city[identityvalue.substr(0, 2)]) {
            this.setState({
                identityError: true, //显示提示
                pass: false,
                msg: '身份证号地址编码错误'
            });
            console.log(this.state.msg)
        } else {
            //18位身份证需要验证最后一位校验位
            if (identityvalue.length == 18) {
                identityvalue = identityvalue.split('');
                //加权因子
                var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++) {
                    ai = identityvalue[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                if (parity[sum % 11] != identityvalue[17].toUpperCase()) {
                    this.setState({
                        identityError: true,
                        pass: false,
                        msg: '身份证号校验位错误'
                    });
                    console.log(this.state.msg)
                }
            }
        }
    }

    /**获取银行卡卡号**/
    cardnumber = (cardnumbervalue) => {
        var cardnumberinput = document.getElementById('cardnumber').value.length
        var reg = /^[0-9]+$/
        if ((!cardnumbervalue.replace(/\s/g, '').length < 16 && cardnumbervalue.replace(/\s/g, '').length > 19 || cardnumberinput.length == 0 || cardnumberinput.length == '')) {
            this.setState({
                cardError: true,
            });
        } else {
            this.setState({
                cardError: false,
            })
        }
        if (/^\s+$/gi.test(document.getElementById('cardnumber').value)) {
            // Toast.info("不能输入空格", );
            this.setState({
                cardError: true,
                cardnumbervalue: '',
            }, function () {
                console.log(this.state.cardnumbervalue)
            })
        } else if (!reg.test(cardnumbervalue) && cardnumberinput == '' && cardnumberinput == 0) {
            this.setState({
                cardError: true,
            });
            // Toast.info('请输入卡号');
        }
        let that = this
        this.setState({
            cardnumbervalue,
            cardnumberbtn: this.state.cardnumbercount++
        }, function () {
            var bankNum = that.state.cardnumbervalue;
            // console.log(bankNum)
            api.seebank(bankNum, function (res) {
                console.log(bankNum)
                console.log(res)
                if (res.code === "0000") {
                    var data = strDec(res.data, key1, "", "");
                    var newdata = JSON.parse(data)
                    console.log(newdata)
                    console.log(newdata.bank)
                    that.setState({
                        banknamevalue: newdata.bank
                    })
                    console.log(newdata.bank)
                }
            })

        })
    }
    /**获取手机号码**/
    phone = (phonevalue) => {
        if (phonevalue.replace(/\s/g, '').length < 11 || phonevalue.replace(/\s/g, '').length > 11 || phonevalue.length == 0 && phonevalue.length == '') {
            console.log('点击不了')
            this.setState({
                phoneError: true, //显示提示
                isClickable: false  //改变按钮点击状态 false
            });
        } else {
            console.log('可以点击')
            this.setState({
                phoneError: false, //不显示提示
                isClickable: true, //改变按钮点击状态 true
                phonebtn: this.state.phonecount++
            });
        }
        this.setState({
            phonevalue,
        });
        /**判断手机号码归属运营商**/
        var PATTERN_CHINAMOBILE = /^1(3[4-9]|5[012789]|8[23478]|4[7]|7[8])\d{8}$/; //移动号
        var PATTERN_CHINAUNICOM = /^1(3[0-2]|5[56]|8[56]|4[5]|7[6])\d{8}$/; //联通号
        var PATTERN_CHINATELECOM = /^1((33|53|77|8[019])[0-9]|349)|(700\\d{7}$)/; //电信号
        if (PATTERN_CHINAMOBILE.test(phonevalue)) {
            console.log("欢迎您移动用户");
        } else if (PATTERN_CHINAUNICOM.test(phonevalue)) {
            console.log("欢迎您联通用户");
        } else if (PATTERN_CHINATELECOM.test(phonevalue)) {
            console.log("欢迎您电信用户");
        }
        this.setState({
            phonevalue,
        });
    }
    /**获取验证码value**/
    code = (codevalue) => {
        //判断最大长度输入6位验证码
        var codeinput = document.getElementById('codeinput').value.length
        var reg = /^[0-9]+$/ //只能输入数字
        if (/^\s+$/gi.test(document.getElementById('codeinput').value)) {
            // Toast.info("不能输入空格", );
            this.setState({
                codeError: true,
                codevalue: '',
            }, function () {
                console.log(this.state.codevalue)
            })
        } else if (!reg.test(codevalue) && codeinput == '' && codeinput == 0) {
            this.setState({
                codeError: false,
            })
            // Toast.info('只能输入数字');
        } else if (codeinput > 6) {
            this.setState({
                codeError: true,
            })
            // Toast.info('请输入6位数字验证码');
        }
        this.setState({
            codevalue,
        });
    }
    /**验证码倒计时**/
    btncoke = () => {
        var phonevalue = this.state.phonevalue;
        console.log(phonevalue)
        if (phonevalue.replace(/\s/g, '').length < 11 || phonevalue.replace(/\s/g, '').length > 11 || phonevalue.length == 0 && phonevalue.length == '') {
            this.setState({
                isClickable: false,
                discodeBtn: false,
                clearInterval: false
            })
        } else {
            this.setState({
                isClickable: true,
                discodeBtn: true,
                clearInterval: true
            })
            const Time = setInterval(() => {
                let times = this.state.timer - 1;
                /**设置初始的状态**/
                this.setState(
                    {
                        isClickable: false,
                        timer: times,
                        btntext: times + "秒",
                        discodeBtn: false,
                    }, () => {
                        /**恢复状态**/
                        if (this.state.timer === 0) {
                            this.setState({
                                timer: 60,
                                isClickable: true
                            })
                            clearInterval(Time);
                            this.setState({ btntext: '重新发送', discodeBtn: false })
                        }
                    });
            }, 1000);
        }
        /**接口请求**/
        api.verifyCode(phonevalue, '', function (res) {
            console.log(res)
            if (res.code === "0000") {
                var data = strDec(res.data, key1, "", "");
                console.log(data)
            }
        })
    }
    /**点击提交**/
    btn = () => {
        var cardName = this.state.namevalue;
        var idCard = this.state.identityvalue;
        var cardNumber = this.state.cardnumbervalue;
        var bankName = this.state.banknamevalue;
        var cardPhone = this.state.phonevalue;
        var verifyCode = this.state.codevalue
        console.log(cardName)
        console.log(idCard)
        console.log(cardNumber)
        console.log(bankName)
        console.log(cardPhone)
        console.log(verifyCode)
        /**满足验证条件的 count+1 点击统计满足调接,不满足提示,满足请求接口**/
        if (this.state.btncount !== 1 && this.state.cardnumbercount !== 1 && this.state.banknamecount !== 1 && this.state.phonecount !== 1 && this.state.identitycount !== 1 && this.state.codecount !== 1) {
            Toast.info('请输入完整的信息')
        } else {
            Toast.info("绑定成功")
            /**接口请求**/
            api.addBankcard(cardName, idCard, cardNumber, bankName, cardPhone, verifyCode, function (res) {
                console.log(res)
                if (res.code === "0000") {
                    let Decdata = strDec(res.data, key1, "", "");
                    let data = JSON.parse(Decdata);
                    console.log(data)
                    var path = {
                        pathname: "/choiceBankcard",
                    
                    };
                    hashHistory.push(path)
                } else {
                    Toast.info('银行卡绑定失败')
                }
                if (res.code === "1022") {
                    Toast.info('该卡不能重复绑定')
                }
                if (res.code === "9999") {
                    Toast.info('实名认证不通过')
                }
            })
        }
    }
    render() {
        return (
            <div className="mywallet">
                <Header title="添加银行卡" />
                <div className="content">
                    <div className="promptTitle">
                        <WingBlank>
                            请绑定本人卡的银行卡
                        </WingBlank>
                    </div>
                    <List>
                        <InputItem
                            type="text"
                            placeholder="张三"
                            style={{
                                fontSize: "0.28rem"
                            }}
                            error={this.state.nameError}
                            onChange={this.name}
                            value={this.state.namevalue}
                            clear
                        >持卡人</InputItem>
                    </List>
                    <List>
                        <InputItem
                            type="text"
                            placeholder="请输入身份证号"
                            style={{
                                fontSize: "0.28rem"
                            }}
                            error={this.state.identityError}
                            onChange={this.identity}
                            value={this.state.identityvalue}
                            clear

                        >身份证号</InputItem>
                    </List>
                    <WhiteSpace size="sm" />
                    <List>
                        <InputItem
                            type="text"
                            placeholder="请输入银行卡号"
                            style={{
                                fontSize: "0.28rem"
                            }}
                            id="cardnumber"
                            error={this.state.cardError}
                            onChange={this.cardnumber}
                            value={this.state.cardnumbervalue}
                            clear
                        >银行卡号</InputItem>
                    </List>
                    <List>
                        <InputItem
                            type="text"
                            disabled
                            placeholder="输入卡号后识别并展示"
                            style={{
                                fontSize: "0.28rem"
                            }}
                            // disabled='disabled'
                            error={this.state.bankError}
                            // onChange={this.bankname}
                            value={this.state.banknamevalue}
                            clear
                        >所属银行</InputItem>
                    </List>
                    <WhiteSpace size="sm" />
                    <List>
                        <InputItem
                            type="text"
                            placeholder="请输入手机号码"
                            style={{
                                fontSize: "0.28rem"
                            }}
                            error={this.state.phoneError}
                            onChange={this.phone}
                            value={this.state.phonevalue}
                            clear

                        >预留手机号</InputItem>
                    </List>
                    <List>
                        <InputItem
                            type="text"
                            className="codeinput"
                            id="codeinput"
                            placeholder="请输入验证码"
                            style={{
                                fontSize: "0.28rem"
                            }}
                            error={this.state.codeError}
                            onChange={this.code}
                            value={this.state.codevalue}
                            clear
                        >
                            <p>验证码</p>

                        </InputItem>
                        <div className="code">
                            <Button type="ghost" inline size="small" className="btncode"
                                disabled={!this.state.isClickable}
                                onClick={() => {
                                    this.btncoke()
                                }}>{this.state.btntext}</Button>
                        </div>
                    </List>
                    <div className="supporttitle">支持银行</div>
                    <div className="supportbank">

                        <div className="SubmissionContent" onClick={this.btn}
                            disabled={!this.state.isClickable}
                        >提交</div>
                    </div>
                </div>

            </div>

        )
    }
}
export default addBankcard