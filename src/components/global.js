import { Toast } from 'antd-mobile';

const request = {   
    QueryString: function (name) {       
        // var uri = window.location.search;
        // var re = new RegExp("" + val + "=([^&?]*)", "ig");
        // return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);

        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        if (r !== null) return unescape(r[2]);
        return null;
    },   
}
const platform = request.QueryString("platform");
const deviceno = request.QueryString("deviceno");
const user = localStorage.getItem("user");
// Toast.info("apple:"+platform+"==号码:"+deviceno,4);
// Toast.info("返回的地址是"+window.location.href,8);
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
    imgPath: "http://xrjf.oss-cn-shanghai.aliyuncs.com/",
    backPath:"http://h5.xinyzx.com:82/SmartCredit/index.html#/",//信息认证页的返回
    urlPath:"http://h5.xinyzx.com:82/",//测试分享地址
    // urlPath:"http://wrh.istarcredit.com:8104/",//正式分享地址
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



