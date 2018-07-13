'use strict';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import '../css/login.css';
import { Toast,Modal, Button,TabBar } from 'antd-mobile';
var key1 = globalData.key;
// var Login = React.createClass({
class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            modal:false,
            selectedTab: 'redTab',
            hidden: false,
        };
        this.submitHandler=(e)=>{
            e.preventDefault(); // 修复 Android 上点击穿透
            this.setState({
                title:'问卷小调查',
                modal: true,
            });
        };
        this.select=(e)=>{
            console.log(e.target.value);
            this.setState({
                currentId:e.target.value
            })
        }
    }
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        if(key=='modal1'){
            this.setState({title:'投保规则'});
        }else{
            this.setState({title:'信息安全说明'});
        }
        this.setState({
            modal: true,
        });
        
        // console.log(key)
    }
    onClose = key => () => {
        this.setState({
            
            modal: false,            
        });
    }
    
    toBack(){
        hashHistory.go(-1);


    }
    getInitialState() {
        return {
        }   
    }
    componentWillMount() {
    }
    componentDidUpdate(){
        var that=this;

    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }


    render() {
        var that = this;
        
        return (
            <div className="login baoxian">
                {/* <Header title="登录" backRouter={backRouter} /> */}
                <div className="head" style={{backgroundImage:"url('src/img/icon/bao-icon5.png')"}}>
                    <p><span onClick={this.toBack}><img src="src/img/icon/back2.png" alt=""/></span><span>立即领取</span></p>
                </div>
                <div className="loginCon">                   
                    <p>领取要求</p>
                    <p>1：领取规则：每人限领一次（1年），其他6个月的就是6个月。</p>
                    <p>2：年龄：XX-XX岁。</p>
                    <p>3：领取范围：全国或指定的城市。</p>
                    <p>4：领取须知：领取后保险公司可能会进行电话回访。</p>
                    
                    <div className="btninfo">
                        <p>
                            <span style={{backgroundImage:"url('src/img/icon/bao-icon6.png')"}}></span>
                            本人已知<Button onClick={this.showModal('modal1')}>《投保条款》</Button>及
                            {/* <Link to={
                        {
                            pathname: "/txt",
                            //hash:'#ahash',    
                            state: { title: '投保规则', fromId: 3 }
                            //state:{data:'hello'}     
                        }
                    } >《投保规则》</Link>
                    及
                    <Link to={
                        {
                            pathname: "/txt",
                            //hash:'#ahash',    
                            state: { title: '信息安全说明', fromId: 3 }
                            //state:{data:'hello'}     
                        }
                    } >《信息安全说明》 </Link> */}
                                        
                        <Button onClick={this.showModal('modal2')}>《信息安全说明》</Button>并同意领取免费保险
                        </p>                        
                        <Modal
                            visible={this.state.modal}
                            closable={true}
                            transparent
                            maskClosable={false}
                            onClose={this.onClose('modal')}
                            title={this.state.title}
                            // footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                            wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                            >
                            <div style={{overflow: 'scroll' }} className={this.state.title=='投保规则'?'':'hide'}>
                               1.投保规定：本保险身故受益人为法定受益人。本保险的保险对象为25-50周岁身体健康、能正常工作或正常生活的自然人。 <br />
                               2.保险限制：每位客户受赠保险以1份为限。根据监管新规，大都会保险投保人、被保人是外国政要或国际组织高级管理人员不得承保免费保险。  <br />
                               3.保险期限：本保险的保障期限为以保障详情为准，以保单载明的保险起止日期为准。对保险起止日期外所发生的保险事故本公司不承担保险金责任。 <br />
                                4.告知义务：依据我国《保险法》规定，投保人、被保险人应如实告知，否则保险人有权依法解除保险合同，并对于保险合同解除前发生的保险事故不负任何责任。投保人、被保险人在投保时，应对投保书内各项内容如实详细地说明或填写清楚。否则，保险人有权依法解除保险合同。 <br />
                                5.保险凭证：本保险仅提供电子保单，仅限赠送。保单生效后客户会自动收到短信通知，请将短信保存并将短信上的电子保单号记录在适当的位置，以方便查询及理赔。您也可以通过所获赠险相应保险公司官方平台查询您的保单信息。
<br />
                                6.赠险赞助商：相关赠险由相应保险公司友情赞助。为保证服务质量后续可能会接到保险代理人的电话落实赠险生效事宜。 <br />
                                7.保险金申请：发生保险事故后，请被保险人或受益人及时凭电子保险单号及身份信息向保险公司报案，并提供相关证明和资料，保险公司将尽快按照有关条款履行给付责任。 <br/>
                                8.本保险不接受撤保、退保、加保及被保险人更换，相关赠险仅限本人领取。 
<br/>
                                9.如对本活动有疑问和建议请拨打【400-960-9190】进行咨询(咨询时间:工作日9:30至17:30); 如对赠险内容及理赔有疑问请联系所获赠险的保险公司进行咨询(咨询时间:24小时)。
<br/>
                                10.本活动解释权归活动主办方所有。<br/>
                               
                            </div>
                            <div style={{overflow: 'scroll' }} className={this.state.title=='信息安全说明'?'':'hide'}>
                            &nbsp;&nbsp; &nbsp;&nbsp;本人授权保险公司，除法律另有规定之外，将本人提供给保险公司的信息、享受保险公司服务产生的信息（包括本〔单证〕签署之前提供和产生的信息）以及保险公司根据本条约定查询、收集的信息，用于保险公司及其因服务必要委托的合作伙伴为本人提供服务、推荐产品、开展市场调查与信息数据分析。
 <br />
                            &nbsp;&nbsp; &nbsp;&nbsp;本人授权保险公司，除法律另有规定之外，基于为本人提供更优质服务和产品的目的，向保险公司因服务必要开展合作的伙伴提供、查询、收集本人的信息。为确保本人信息的安全，保险公司及其合作伙伴对上述信息负有保密义务，并采取各种措施保证信息安全。 <br />
                            &nbsp;&nbsp; &nbsp;&nbsp;本条款自本〔单证〕签署时生效，具有独立法律效力 , 不受合同成立与否及效力状态变化的影响。<br/>                              
                            </div>
                            <div className="survey">
                                <p>1.请问您是否有子女？</p>
                                <ul>
                                    <li onClick={this.select} value="1" className={this.state.currentId=='1'?'active':''}>0-3岁</li>
                                    <li onClick={this.select} value="2" className={this.state.currentId=='2'?'active':''}>6-13岁</li>
                                    <li>13岁以上</li>
                                    <li>无子女</li>
                                </ul>
                                <p>2.请问您和家人常以哪种方式出游？</p>
                                <ul>
                                    <li>自驾车</li>
                                    <li className="long">火车或公交</li>
                                    <li>飞机</li>
                                </ul>
                                <p>3.请问您更倾向于哪种商业保障？ </p>
                                <ul>
                                    <li>意外保障</li>
                                    <li>重疾保障</li>
                                    <li>医疗保障</li>
                                </ul>
                                <p>4.您期望的保障金额是多少？ </p>
                                <ul>
                                    <li>10万</li>
                                    <li>20万</li>
                                    <li>30万</li>
                                    <li>50万</li>
                                </ul>
                                <div className="subtn">提交</div>
                            </div>
                        </Modal>
                        <a className="loginBtn" onClick={that.submitHandler}>立即领取</a>
                    </div>
                </div>
                <Loading flag={that.state.flag} />

            </div>
        )
    }

};

export default Login;


