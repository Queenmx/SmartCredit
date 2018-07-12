'use strict';
// import React from "react";
// import ReactDom from 'react-dom';
import { Router, Route, Link } from 'react-router';
import {Toast } from 'antd-mobile';
import { List, Switch } from 'antd-mobile';
import { createForm } from 'rc-form';

let SwitchExample = (props) => {
  const { getFieldProps } = props.form;
  return (
    <List>
      <List.Item
        thumb="src/img/icon/set-icon1.png"
        extra={<Switch
          {...getFieldProps('Switch1', {
            initialValue: true,
            valuePropName: 'checked',
          })}
          onClick={(checked) => { console.log(checked); }}
        />}
      >消息推送</List.Item>
    </List>
  );
};

SwitchExample = createForm()(SwitchExample);

export default SwitchExample;