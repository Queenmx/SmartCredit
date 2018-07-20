import React, { Component } from 'react'
import { hashHistory } from 'react-router';
import { NavBar, Icon, List, WhiteSpace,Button,WingBlank } from 'antd-mobile';
import '../css/choiceBankcard.css';
class choiceBankcard extends Component {
    render() {
        return (
            <div>
                <NavBar
                    mode="dark"
                    className="fixed-header"
                    ref={el => (this.lv = el)}
                    icon={<Icon type="left" />}
                    onLeftClick={() => {
                        hashHistory.goBack();
                    }}
                >
                    选择银行卡
                 </NavBar>
                <div className="content">
                    <WhiteSpace size="sm" />
                    <List className="list">
                        <List.Item extra={'招商银行'}>  <img src={require('../img/img/web/icon_14@3x.png')} /></List.Item>
                        <div className="displaylastnumber">尾号 (1225)</div>
                    </List>
                    <WhiteSpace size="sm" />
                </div>

                <WingBlank className="Submission">
                    <Button type="primary" >提交申请</Button><WhiteSpace />
                </WingBlank>
            </div>
        )
    }
}

export default choiceBankcard