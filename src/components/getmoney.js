import React, { Component } from 'react'
import { hashHistory } from 'react-router';
import { NavBar, Icon, List, WhiteSpace, InputItem, WingBlank, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import "../css/getmoney.css";


class getmoney extends Component {
    constructor(props) {
        super(props);
        this.state = {
            procedurestext: null,
            number: null,
        }
    }
    componentDidMount() {

    }
    // <input onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
    putforward = (number) => {
        // console.log(number)
        // if (number != '' && number.substr(0, 1) == '.') {
        //     number = '';
        // }
        // number = number.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
        // number = number.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的       
        // number = number.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        // number = number.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数   
        // if (number.indexOf('.') < 0 && number != '') {
        //     if (number.substr(0, 1) == '0' && number.length == 2) {
        //         number = number.substr(1, number.length)
        //     }
        // }
        // if (parseFloat(number) >= 0 && parseFloat(number) < 10000) {
        //     return
        // } else {
        //     number = number.substr(0, number.length - 1)
        // }
        // let that = this;
        // console.log(that)
        // console.log(number)
        // if (number < 1) {
        //     console.log('number < 1')
        //     this.setState({
        //         number: 1
        //     },()=>{
        //         that.setState({
        //             number: 1
        //         })
        //         this.forceUpdate()
        //         console.log(this.state.number)
        //     })
        // }

        if (number < 100 || number) {
            console.log('手续费2元')
            this.setState({
                procedurestext: 2
            })
        }
        if (number > 100) {
            this.setState({
                procedurestext: number * 0.05
            })
        }
    }


    addCard() {
        hashHistory.push('/addBankcard')
    }
    render() {
        // const { getFieldProps } = this.props.form;
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
                    申请提现
                 </NavBar>
                <div className="content">
                    <div className="time">
                        <p>62,100.365</p>
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
                    <List className="addBank">
                        <List.Item extra={'招商银行'} style={{ fontSize: "18px" }}>
                            <img src={require('../img/img/web/icon_14@3x.png')} />
                        </List.Item>
                        <div className="displaylastnumber">尾号 (1225)</div>
                    </List>
                    <WhiteSpace size="sm" />
                    <List >
                        <InputItem
                            className="putforward"
                            // {...getFieldProps('preice')}
                            placeholder="请输入金额(元)"
                            style={{
                                fontSize: "0.3rem"
                            }}
                            extra="元"
                            onChange={this.putforward}
                        // onChange={(value) => {
                        //     this.putforward(value)
                        // }}
                        >提现金额</InputItem>
                    </List>
                    <p></p>
                    <List >
                        <InputItem
                            className="procedures"
                            placeholder={this.state.procedurestext}
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
                        <div >可提交提现申请时间:工作日09:00-18:00</div>
                        <div >提现手续费费率:5%</div>
                        <div >提现货款额度小于100元固定收取2元手续费</div>
                        <div >提现货款额度大于100元按照手续费费率收取</div>
                        <div>预计审核时间1-2个工作日</div>
                    </div>
                </WingBlank>
                <WingBlank className="Submission">
                    <Button type="primary" >提交申请</Button><WhiteSpace />
                </WingBlank>

            </div>

        )
    }
}
export default getmoney