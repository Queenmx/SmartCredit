'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import Loading from './loading';
import { hashHistory, Link } from 'react-router';
import '../sass/otherInfo.scss';
import { Picker, List,ActionSheet, Toast  } from 'antd-mobile';
import { createForm } from 'rc-form';
import arrayTreeFilter from 'array-tree-filter';
import {district} from './district.js';
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}
var key1 = globalData.key;
// var toast = globalData.toast;
var OtherInfo1 = React.createClass({
    getInitialState: function () {
        return {
            flag: true,
             visible: false,
             comp:'',
             compAddrThree:'',
             compAddrDetail:'',
             name:'',
             contactWay:'',
             contactArr:[],
             relation:''
        }
    },
    componentWillMount: function () {
    		var that=this;
			  api.getCompAndContact(function (res) {
	            if (res.code == "0000") {
	                let data = JSON.parse(strDec(res.data, key1, "", ""));
	                console.log(data);
	                that.setState({
	                	comp:data.comp,
	                	name:(data.userContactList)[0].name||"",
	                	contactWay:(data.userContactList)[0].contactWay||"",
	                	relation:(data.userContactList)[0].relation||"",
	                })
									if(data.compAddr){
										  const levelArr= data.compAddr.split(',');
										  console.log(levelArr)
										  if(levelArr.length>2){
										  	that.setState({
				                	compAddrThree:levelArr.slice(0,3).join(","),
				                	compAddrDetail:levelArr[3]||""
				                })
										  }else{
											  that.setState({
				                	compAddrDetail:data.compAddr
				                })
										  }
	                }
	            }else{
	            	Toast.info(res.msg,2);
	            }
	        },function () {
	        Toast.info("连接错误", 2);
	    })
    },
    
    componentDidMount: function () {
    	var that=this;
    	api.contact(function (res) {
	            if (res.code == "0000") {
	            	var contactArr=[];
	                let data = JSON.parse(strDec(res.data, key1, "", ""));
	                 data.map(item => {
						  //console.log(item);
						 contactArr.push(item.name)	
						})
	                that.setState({
	                	contactArr:contactArr.concat(['取消']),
	                	flag:false
	                })
	            }else{
	            	that.setState({
	                	flag:false
	                })
	            	Toast.info(res.msg,2);
	            	 
	            }
	        },function () {
	       		 that.setState({
	                	flag:false
	                })
	        Toast.info("连接错误", 2);
	    })
    },
   showActionSheet :function() {
   		var that=this;
	  const BUTTONS=this.state.contactArr;;
	    ActionSheet.showActionSheetWithOptions({
	      options: BUTTONS,
	      cancelButtonIndex: BUTTONS.length - 1,
	      //destructiveButtonIndex: BUTTONS.length - 2,
	      // title: 'title',
	      message: '与直属联系人关系',
	      maskClosable: true,
	      'data-seed': 'logId',
	      wrapProps,
	    },
	    (buttonIndex) => {
	    	if(buttonIndex!==BUTTONS.length - 1){
		      that.setState({
			      	relation:BUTTONS[buttonIndex]
		      	});
	    	}
	    
	    });
  
  },
    onClick :function (){
	    setTimeout(() => {
	      this.setState({
	        data: province,
	      });
	    }, 120);
	  },
	getSel:function() {
		var that=this;
	    const value = this.state.pickerValue;
	     if (!value) {
	      return '';
	    }
	    const treeChildren = arrayTreeFilter(district, (c, level) => c.value === value[level]);
	    return treeChildren.map(v => v.label).join(',');
	 },
	 //提交
	 otherInfoSave:function(){
	 	var that=this;
		this.setState({
			flag:true
		})
	 	//console.log(this.state);
	 	var compAddr;
	 	var getSel=this.getSel();
	 	if(getSel){
	 		 compAddr=getSel+","+this.state.compAddrDetail;
	 	}else{
	 		 compAddr=this.state.compAddrDetail;
	 	}
	 	console.log(compAddr);
	 	const contactWay=this.state.contactWay;
	 	const name=this.state.name;
	 	const relation=this.state.relation;
	 	if(contactWay&&name&&relation){
	 		if(compAddr){
	    		api.company(this.state.comp,compAddr,function (res) {
	            if (res.code == "0000") {
	            console.log('公司保存成功')
	            }else{
	            	Toast.info(res.msg,2);
	            }
	        },function () {
	        Toast.info("连接错误", 2);
	    	})
	    }
	 		api.contactSave(contactWay,name,relation,function (res) {
	            if (res.code == "0000") {
	                that.setState({
										flag:false
									})
	                Toast.info('保存成功',2);
	                window.history.back();
	            }else{
	            	that.setState({
										flag:false
									})
	            	Toast.info(res.msg,2);
	            }
	        },function () {
	        		that.setState({
										flag:false
							})
	        Toast.info("连接错误", 2);
	    });

	 	
	 	}else{
		 	that.setState({
					flag:false
				})
	 		Toast.info('请完善联系人信息',2);
	 	}
	 },
	 inputInfo:function(e){
	 	 this.setState({
	 	 	[e.target.name]: e.target.value
        })
	 },

    render: function () {
        var imgPath = globalData.imgPath;
        var that = this;
        return (
            <div className="app_Box otherInfo">
                <Header title="其他信息认证" />
                <Loading flag={that.state.flag} />
                <div className="wrap hit">恭喜，您已满足放款要求，完成补充信息立即领取贷款！</div>
                <ul className="list">
                    <li className="item">
                        <lable>公司名称</lable>
                        <div className="input-wrap">
                       <input placeholder="请输入内容" name="comp" value={that.state.comp} onChange={that.inputInfo}/>
                        </div>
                    </li>
                   
                    <Picker
                    extra={that.state.compAddrThree}
			          visible={this.state.visible}
			          data={district}
			          value={this.state.pickerValue}
			          onChange={v => this.setState({ pickerValue: v })}
			          onOk={() => this.setState({ visible: false })}
			          onDismiss={() => this.setState({ visible: false })}
			        >
			          <List.Item extra={this.getSel()} onClick={() => this.setState({ visible: true })}>
			            公司地址
			          </List.Item>
			        </Picker>
                    <li className="item">
                        <lable>公司地址</lable>
                        <div className="input-wrap">
                        <input placeholder="详细地址" name='compAddrDetail' value={that.state.compAddrDetail}  onChange={that.inputInfo}/>
                        </div>
                    </li>
                    
                </ul>
                <ul className="list">
                    <List.Item extra={this.state.relation||"请选择"} onClick={that.showActionSheet}>
			            直属联系人关系
			          </List.Item>
                    <li className="item">
                        <lable>直系亲属姓名</lable>
                        <div className="input-wrap">
                      <input placeholder="请输入内容" name="name" value={that.state.name}   onChange={that.inputInfo}/>
                        </div>
                    </li>
                    <li className="item">
                        <lable>直系亲属联系方式</lable>
                        <div className="input-wrap">
                        <input placeholder="请输入内容" name="contactWay" value={that.state.contactWay}  onChange={that.inputInfo}/>
                        </div>
                    </li>
                </ul>
                <div className="footer-btn" onClick={that.otherInfoSave}>提交</div>
            </div>
        )
    }

});
const OtherInfo = createForm()(OtherInfo1);
export default OtherInfo;


