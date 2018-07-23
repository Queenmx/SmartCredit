'use strict';
import api from './api';
import { Router, Route, Link } from 'react-router';
import {Toast } from 'antd-mobile';
import { List, Switch } from 'antd-mobile';
import { createForm } from 'rc-form';

let SwitchExample = (props) => {
  const { getFieldProps } = props.form;
 
  var that=this;
  var user=JSON.parse(localStorage.getItem("user"));
  return (
    <List>
      <List.Item
        thumb="src/img/icon/set-icon1.png"
        extra={<Switch
          {...getFieldProps('Switch1', {
            initialValue: true,
            valuePropName: 'checked',
          })}
          onClick={(checked) => { 
            console.log(checked);     
            if(checked){
              Toast.info("开启消息通知",2);
            }else{
              Toast.info("关闭消息通知",2);
            }      
            var item={
              userId:user.userId,
              whetherMsgPush:checked?"1":"0",
            }
            console.log(item)
            api.whetherMsgPush(item,function(res){
              if(res.code=="0000"){
                // Toast.info(res.msg,2);
              }else{
                // Toast.info(res.msg,2);
              }
            })
          }}
          // onClick={this.choose}
        />}
      >消息推送</List.Item>
    </List>
  );
};

SwitchExample = createForm()(SwitchExample);

export default SwitchExample;