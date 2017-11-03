import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'reactjs-iscroll';

class Simple extends Component {
  render() {
    return (
      <div>
        <ReactIScroll iScroll={iScroll} className="example">
          <div>数据</div>
        </ReactIScroll>
      </div>
    );
  }
}


export default Simple;