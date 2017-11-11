'use strict';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import { hashHistory, Link } from 'react-router';
// import Cropper from 'react-cropper';


// var Cropper = require('react-cropper').default;
// import Cropper from '../../src/react-cropper';
// const src = 'img/child.jpg';
// export default class Demo extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             src,
//             cropResult: null,
//         };
//         this.cropImage = this.cropImage.bind(this);
//         this.onChange = this.onChange.bind(this);
//         this.useDefaultImage = this.useDefaultImage.bind(this);
//     }

//     onChange(e) {
//         e.preventDefault();
//         let files;
//         if (e.dataTransfer) {
//             files = e.dataTransfer.files;
//         } else if (e.target) {
//             files = e.target.files;
//         }
//         const reader = new FileReader();
//         reader.onload = () => {
//             this.setState({ src: reader.result });
//         };
//         reader.readAsDataURL(files[0]);
//     }

//     cropImage() {
//         if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
//             return;
//         }
//         this.setState({
//             cropResult: this.cropper.getCroppedCanvas().toDataURL(),
//         });
//     }

//     useDefaultImage() {
//         this.setState({ src });
//     }

//     render() {
//         return (
//             <div>
//                 <div style={{ width: '100%' }}>
//                     <input type="file" onChange={this.onChange} />
//                     <button onClick={this.useDefaultImage}>Use default img</button>
//                     <br />
//                     <br />
//                     <Cropper
//                         style={{ height: 400, width: '100%' }}
//                         aspectRatio={16 / 9}
//                         preview=".img-preview"
//                         guides={false}
//                         src={this.state.src}
//                         ref={cropper => { this.cropper = cropper; }}
//                     />
//                 </div>
//                 <div>
//                     <div className="box" style={{ width: '50%', float: 'right' }}>
//                         <h1>Preview</h1>
//                         <div className="img-preview" style={{ width: '100%', float: 'left', height: 300 }} />
//                     </div>
//                     <div className="box" style={{ width: '50%', float: 'right' }}>
//                         <h1>
//                             <span>Crop</span>
//                             <button onClick={this.cropImage} style={{ float: 'right' }}>
//                                 Crop Image
//                   </button>
//                         </h1>
//                         <img style={{ width: '100%' }} src={this.state.cropResult} alt="cropped image" />
//                     </div>
//                 </div>
//                 <br style={{ clear: 'both' }} />
//             </div>
//         );
//     }
// }

var appBasePath = globalData.appBasePath;
var UserInfo = React.createClass({
    getInitialState: function () {
        return {

        }
    },
    finishID: function () {
        var data = {};
        var path = {
            pathname: '/Mine',
            state: data,
        }
        hashHistory.push(path);
    },

    rePsd: function () {
        var path = {
            pathname: '/RePsd',
        }
        hashHistory.push(path);
    },
    realName: function () {
        var path = {
            pathname: '/RealName',
        }
        hashHistory.push(path);
    },
    render: function () {
        var that = this;
        return (
            <div className="app_Box userInfo">
                <Header title="个人信息" />
                <ul className="userInfoCon">
                    <li><img src="src/img/icon/tx.png" /><div className="infoRight"><img src="src/img/icon/right.png" /></div></li>
                    <li><span>手机号</span><div className="infoRight"><b>135****9763</b></div></li>
                    <li onClick={that.rePsd}><span>修改密码</span><div className="infoRight"><img src="src/img/icon/right.png" /></div></li>
                    <li onClick={that.realName}><span>真实姓名</span><div className="infoRight"><img src="src/img/icon/right.png" /></div></li>
                    <li><span>身份证号码</span><div className="infoRight"><b>未验证/**君</b><img src="src/img/icon/right.png" /></div></li>
                    {/*<li className="userInfoLi"><span>关于我们</span><div className="infoRight"><img src="src/img/icon/right.png"/></div></li>*/}
                </ul>

            </div>
        )
    }

});


export default UserInfo;


