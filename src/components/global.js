import { Toast } from 'antd-mobile';

const request = {    
    QueryString: function (val) {       
        var uri = window.location.search;
        var re = new RegExp("" + val + "=([^&?]*)", "ig");
        return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);
    }    

}
const platform = request.QueryString("platform");
const deviceno = request.QueryString("deviceno");

const user = localStorage.getItem("user");
// const p=JSON.parse(localStorage.getItem("platform"));

// console.log(p.platform);
Toast.info("aa和"+platform+deviceno,2);
if (user&&user!="null") {
    var userObj = JSON.parse(user);
    var userId = userObj.userId;
    var token = userObj.token;
} else {
    var userId = "";
    var token = "";
}
// var key = "ZND171030APIMM"
// var keyarr = []
// for (var i in key) {
//     keyarr.push(key.charCodeAt(i))
// }
// console.log(keyarr)
const globalData = {
    // toast: toast,
    selectedCityName: '',
    key: "ZND20171030APIMM",
    // key: '1234567812345678',
    // key: [Z, N, D, 2, 0, 1, 7, 1, 0, 3, 0, A, P, I, M, M],
    // key: [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8],
    // appBasePath: "http://www.91ymfq.com/XR/",
    path: "http://xingrongjinfu.iask.in:8886",//测试地址
    pathone:"http://192.168.0.156:8886",
    // path: "http://wrhapi.istarcredit.com:8886",//正式地址
    // path: "http://wuhanxingrong.vicp.io:28886/",
    // path: "http://wrhapi.istarcredit.com:8102/",//正式地址
    // path:"http://192.168.0.111:8886",
    // path: "http://192.168.0.43:8886",
    // path:"http://wuhanxingrong.vicp.io:8888",

    //path:"http://wangjuan6.free.ngrok.cc",
    // path:"http://wuhanxingrong.vicp.io:8886",
    //path:"http://101.132.32.72:8102/",
    // path:"http://192.168.1.17:8886",
    imgPath: "http://xrjf.oss-cn-shanghai.aliyuncs.com/",
    backPath:"http://h5.xinyzx.com:82/SmartCredit/index.html#/",//信息认证页的返回
    user: localStorage.getItem("user") || "",
    // userObj:JSON.parse(this.user);
    //userId: this.userObj.userId || "",
    userId: userId || "",
    requestData: {
        "platform": platform,
        "deviceno": deviceno,
        "appFlag": "C",
        "token": token
    }
}
export { globalData };



