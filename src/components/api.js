var http = require("./http");
import { globalData } from './global.js';

var key1 = globalData.key;
var ip = returnCitySN["cip"];


//标签
module.exports.tag = function (type, cb1, cb2) {
    //getNewUser();
    var data = globalData.requestData;
    //data.token=token;
    data.tagType = "LOAN";
    data.type = type;//BQ 标签 FL 分类
    var param = JSON.stringify(data);
    // console.log(param);
    var str = strEnc(param, key1);
    // console.log(str);
    http(`${globalData.path}/zndai/tag/list`, { params: str }, cb1, cb2);
    delete data.tagType;
    delete data.type;
}


//获取城市列表
module.exports.getCityList = function (cb1, cb2) {
    var data = globalData.requestData;
    //data.token=token;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/city/list`, { params: str }, cb1, cb2);
}


//热门城市
module.exports.getHotCity = function (cb1, cb2) {
    var data = globalData.requestData;
    // data.token=token;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/city/hot`, { params: str }, cb1, cb2);
}

//登录
module.exports.login = function (loginType, phone, pwd, verifyCode, cb1, cb2) {
    var data = globalData.requestData;
    // data.token=token;
    data.loginType = loginType;
    data.phone = phone;
    data.pwd = pwd;//login_type为PWD时必填
    data.type = "C";
    data.verifyCode = verifyCode;//	login_type为CODE时必填
    var param = JSON.stringify(data);
    //console.log(param);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/user/login`, { params: str }, cb1, cb2);
    delete data.loginType;
    delete data.phone;
    delete data.pwd;
    delete data.type;
    delete data.verifyCode;
}

//注册
module.exports.register = function (phone, pwd, verifyCode,sharePhone, cb1, cb2) {
    var data = globalData.requestData;
    // data.token=token;
    data.phone = phone;
    data.pwd = pwd;
    data.type = "C";
    data.verifyCode = verifyCode;
    data.ip = ip;
    data.sharePhone=sharePhone;
    var param = JSON.stringify(data);
    console.log(param);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/user/add`, { params: str }, cb1, cb2);
    delete data.phone;
    delete data.pwd;
    delete data.type;
    delete data.verifyCode;
    delete data.ip;
    delete data.sharePhone;
}

//忘记密码，重置密码
module.exports.forgot = function (phone, pwd, verifyCode, cb1, cb2) {
    var data = globalData.requestData;
    // data.token=token;
    data.phone = phone;
    data.pwd = pwd;
    data.verifyCode = verifyCode;
    var param = JSON.stringify(data);
    //console.log(param);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/user/pwd/forgot`, { params: str }, cb1, cb2);
    delete data.phone;
    delete data.pwd;
    delete data.verifyCode;
}

//发送手机验证码
module.exports.verifyCode = function (phone, type, cb1, cb2) {
    var data = globalData.requestData;
    // data.token=token;
    data.phone = phone;
    data.type = type;//REG 注册 ，FPWD忘记密码

    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    // console.log(data)
    // console.log(param);
    http(`${globalData.path}/zndai/user/verifyCode`, { params: str }, cb1, cb2);
    delete data.phone;
    delete data.type;

}
//退出
module.exports.exit = function (cb1, cb2) {
    var data = globalData.requestData;
    // data.token=token;
    data.userId = globalData.userId;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/user/exit`, { params: str }, cb1, cb2);
    delete data.userId;
    globalData.userId = "";
}
//领取保险
module.exports.getInsurance = function (item, cb1, cb2) {
    // var data = globalData.requestData;  
    // Object.assign(data,item);
    var param = JSON.stringify(item);
    var str = strEnc(param, key1);
    http(`${globalData.path}/insurance/insuranceDoPost`, { params: str }, cb1, cb2);
    globalData.userId = "";
}
//实名认证
module.exports.authName = function (item, cb1, cb2) {
    var data = globalData.requestData;
    Object.assign(data, item);
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/user/idCard`, { params: str }, cb1, cb2);
    delete data.userId;
    globalData.userId = "";
}
//----------------个人中心

//个人信息修改
module.exports.edit = function (idCard, located, realName, cb1, cb2) {
    var data = globalData.requestData;
    // data.token=token;
    data.idCard = idCard;
    data.located = located;
    data.realName = realName;
    data.userId = globalData.userId;;
    var param = JSON.stringify(data);
    //console.log(param);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/user/edit`, { params: str }, cb1, cb2);
    delete data.idCard;
    delete data.located;
    delete data.realName;
    delete data.userId;
}

//个人信息查询
module.exports.userInfo = function (cb1, cb2) {
    var data = globalData.requestData;
    //data.token=token;
    data.userId = globalData.userId;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/user/userInfo`, { params: str }, cb1, cb2);
    delete data.userId;
}

//修改密码
module.exports.updatePsd = function (newPwd, oldPwd, cb1, cb2) {
    var data = globalData.requestData;
    //  data.token=token;
    data.newPwd = newPwd;
    data.oldPwd = oldPwd;
    data.userId = globalData.userId;;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/user/pwd/edit`, { params: str }, cb1, cb2);
    delete data.newPwd;
    delete data.oldPwd;
    delete data.userId;
}

//用户个人资质保存
module.exports.qualifyListSave = function (qualifySelect, cb1, cb2) {
    let data = globalData.requestData;
    data.qualifyList = JSON.stringify(qualifySelect);
    var param1 = JSON.stringify(data);
    var str1 = strEnc(param1, key1);
    //console.log(data);
    //console.log(param1);
    http(`${globalData.path}/zndai/user/qualify/add`, { params: str1 }, cb1, cb2);
    delete data.qualifyList;
}

//用户个人资质查询
module.exports.qualifyList = function (loanId, parentId, cb1, cb2) {
    let data = globalData.requestData;
    // data.token=token;
    data.loanId = loanId;
    data.parentId = parentId;
    data.userId = globalData.userId;;
    let param = JSON.stringify(data);
    //console.log(param);
    let str = strEnc(param, key1);
    http(`${globalData.path}/zndai/user/qualify/list`, { params: str }, cb1, cb2);
    delete data.loanId;
    delete data.parentId;
    delete data.userId;
}
//字典查询
module.exports.dictionary = function (objId, parentId, typeCode, cb1, cb2) {
    let data = globalData.requestData;
    //data.token=token;
    data.parentId = parentId;
    data.objId = objId;
    data.typeCode = typeCode;
    let param = JSON.stringify(data);
    // console.log(param);
    let str = strEnc(param, key1);
    http(`${globalData.path}/zndai/dictionary/list`, { params: str }, cb1, cb2);
    delete data.objId;
    delete data.parentId;
    delete data.typeCode;
}


//用户头像上传
module.exports.userHead = function (headPic, cb1, cb2) {
    var data = globalData.requestData;
    // data.token=token;
    //data.headPic = headPic;
    data.userId = globalData.userId;;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/user/userHead`, { params: str, headPic: headPic }, cb1, cb2);
    //delete data.headPic;
    delete data.userId;
}

//身份认证
module.exports.identityUserCert = function (backPic, frontPic, cb1, cb2) {
    var data = globalData.requestData;
    // data.token=token;
    //data.backPic = backPic;
    //data.frontPic = frontPic;
    data.userId = globalData.userId;
    var param = JSON.stringify(data);
    //console.log(param)
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/user/cert/identity`, { params: str, backPic: backPic, frontPic: frontPic }, cb1, cb2);
    delete data.userId;
    delete data.backPic;
    delete data.frontPic;
}


//-------------------资讯

//banner
module.exports.banner = function (cb1, cb2) {
    var data = globalData.requestData;
    // data.token=token;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/banner/list`, { params: str }, cb1, cb2);
}

//资讯列表
module.exports.articleList = function (pageNum, pageSize, cb1, cb2) {
    var data = globalData.requestData;
    //data.token=token;
    data.pageNum = pageNum;
    data.pageSize = pageSize;
    var param = JSON.stringify(data);
    // console.log(param)
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/news/list`, { params: str }, cb1, cb2);
    delete data.pageNum;
    delete data.pageSize;
}
//热门借款产品
module.exports.hotLoanList = function (hot, cb1, cb2) {
    var data = globalData.requestData;
    //data.token=token;
    var param = JSON.stringify(data);
    // console.log(param)
    var str = strEnc(param, key1);
    http(`${globalData.path}/loan/product/viewProducts`, { params: str }, cb1, cb2);

}

//信用卡列表
module.exports.creditCardList = function (pageNum, pageSize, cb1, cb2) {
    var data = globalData.requestData;
    //data.token=token;
    data.pageNum = pageNum;
    data.pageSize = pageSize;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/credit/list`, { params: str }, cb1, cb2);
    // delete data.pageNum;
    // delete data.pageSize;
}
//热门信用卡列表
module.exports.hotCreditCardList = function (cb1, cb2) {
    var data = globalData.requestData;
    //data.token=token;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/credit/hot`, { params: str }, cb1, cb2);
    // delete data.pageNum;
    // delete data.pageSize;
}


//资讯详情
module.exports.articleDetail = function (newsId, cb1, cb2) {
    var data = globalData.requestData;
    //data.token=token;
    data.newsId = newsId;
    data.userId = globalData.userId;;
    var param = JSON.stringify(data);
    // console.log(param);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/news/detail`, { params: str }, cb1, cb2);
    delete data.newId;
    delete data.userId;
}


//---------------------贷款产品
//借款列表
module.exports.productList = function (cb1, cb2) {
    var data = globalData.requestData;
    //data.token=token;    
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/loan/product/viewProducts`, { params: str }, cb1, cb2);

}
//详情
module.exports.loanDetail = function (loanId, cb1, cb2) {
    var data = globalData.requestData;
    data.id = loanId;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/loan/product/productDetails`, { params: str }, cb1, cb2);
    delete data.loanId;
}
//借款产品领取
module.exports.setProductNum = function (item, cb1, cb2) {
    var data = globalData.requestData;
    data.totalNum = item;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/loan/product/setProductNum`, { params: str }, cb1, cb2);
    delete data.totalNum;
}
//模糊查询
module.exports.findProduct = function (item, cb1, cb2) {
    var data = globalData.requestData;
    data.categoryName = item.categoryName;
    data.loanTermStart = item.loanTermStart;
    data.loanTermEnd = item.loanTermEnd;
    data.miniScope = item.miniScope;
    data.maxScope = item.maxScope;
    data.creditReport = item.creditReport;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/loan/product/findProduct`, { params: str }, cb1, cb2);
    delete data.categoryName;
    delete data.loanTermStart;
    delete data.loanTermEnd;
    delete data.miniScope;
    delete data.maxScope;
    delete data.creditReport;
}
//贷款类型
module.exports.productTypeQuery = function (cb1, cb2) {
    var data = globalData.requestData;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/loan/product/productTypeQuery`, { params: str }, cb1, cb2);
}

//精准贷
//列表
module.exports.loanList = function (pageNum, pageSize, tag, type, cb1, cb2) {
    var data = globalData.requestData;
    //data.token=token;
    data.pageNum = pageNum;
    data.pageSize = pageSize;
    data.tag = tag;
    data.type = type;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/loan/list`, { params: str }, cb1, cb2);
    delete data.pageNum;
    delete data.pageSize;
    delete data.tag;
    delete data.type;
}

//利息
module.exports.lixi = function (limitDay, limitType, loanId, money, cb1, cb2) {
    var data = globalData.requestData;
    //data.token=token;
    data.limitDay = limitDay;
    data.limitType = limitType;
    data.loanId = loanId;
    data.money = money;
    data.userId = globalData.userId;;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    //console.log(str)
    http(`${globalData.path}/zndai/loan/lixi`, { params: str }, cb1, cb2);
    delete data.limitDay;
    delete data.limitType;
    delete data.loanId;
    delete data.money;
    delete data.userId;
}

//申请贷款

module.exports.applyLoan = function (limitDay, limitType, loanId, money, qualifyList, cb1, cb2) {
    var data = globalData.requestData;
    //data.token=token;
    data.limitDay = limitDay;
    data.limitType = limitType;
    data.loanId = loanId;
    data.money = money;
    data.qualifyList = qualifyList;
    data.userId = globalData.userId;
    var param = JSON.stringify(data);
    //console.log(param)
    var str = strEnc(param, key1);
    // console.log(str)
    http(`${globalData.path}/zndai/loan/apply/add`, { params: str }, cb1, cb2);
    delete data.limitDay;
    delete data.limitType;
    delete data.loanId;
    delete data.qualifyList;
    delete data.money;
    delete data.userId;
}




//------------------------问题
//我的钱包
module.exports.myWallet = function (userName, userId, cb1, cb2) {
    var data = globalData.requestData;
    // data.token=token;
    data.userName = userName;
    data.userId = globalData.userId;
    var param = JSON.stringify(data);
    console.log(param)
    var str = strEnc(param, key1);

    http(`${globalData.path}/zndai/wallet/my`, { params: str }, cb1, cb2);
    delete data.userName;
    delete data.userId;
}
//提交反馈
module.exports.feedBackAdd = function (content, userName, cb1, cb2) {
    var data = globalData.requestData;
    // data.token=token;
    data.content = content;
    data.userName = userName;;
    var param = JSON.stringify(data);
    console.log(param)
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/backQuestion/add`, { params: str }, cb1, cb2);
    delete data.content;
    delete data.userId;
}

//我要提问
module.exports.questionAdd = function (content, objId, objType,userName, cb1, cb2) {
    var data = globalData.requestData;
    // data.token=token;
    data.content = content;
    data.objId = objId;
    data.objType = objType;
    data.userName = userName;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/question/add`, { params: str }, cb1, cb2);
    delete data.content;
    delete data.objId;
    delete data.objType;
    delete data.userId;
}

//问题列表
module.exports.questionList = function (cb1, cb2) {
    var data = globalData.requestData;
    // data.token=token;

    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/sysQuestion/list`, { params: str }, cb1, cb2);

}
//我的问题列表

module.exports.myQuestion = function (userName, cb1, cb2) {
    var data = globalData.requestData;
    // data.token=token;
    data.userName = userName;
    var param = JSON.stringify(data);
    console.log(param)
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/backQuestion/show`, { params: str }, cb1, cb2);
    delete data.userName;
}
//个人中心设置修改密码
module.exports.resetPsd = function (userId, oldPwd, newPwd, cb1, cb2) {
    var data = globalData.requestData;
    // data.token=token;
    // console.log(data.token)
    data.userId = globalData.userId;
    data.oldPwd = oldPwd;
    data.newPwd = newPwd
    var param = JSON.stringify(data);
    console.log(param)
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/user/pwd/edit`, { params: str }, cb1, cb2);
    delete data.userId;
}

//收藏——————————————————————————
//添加收藏
module.exports.save = function (objId, objType, cb1, cb2) {
    var data = globalData.requestData;
    // data.token=token;
    data.objId = objId;
    data.objType = objType;//ARTICLE   LOAN 
    data.userId = globalData.userId;;
    var param = JSON.stringify(data);
    //console.log(param);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/mark/add`, { params: str }, cb1, cb2);
    delete data.objId;
    delete data.objType;
    delete data.userId;
}
//取消收藏
module.exports.delSave = function (markIds, objType, cb1, cb2) {
    var data = globalData.requestData;
    // data.token=token;
    data.markIds = markIds;
    data.objType = objType;//ARTICLE   LOAN 
    data.userId = globalData.userId;;
    var param = JSON.stringify(data);
    // console.log(param);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/mark/del`, { params: str }, cb1, cb2);
    delete data.markIds;
    delete data.objType;
    delete data.userId;
}

//收藏贷款列表
module.exports.saveLoan = function (pageNum, pageSize, cb1, cb2) {
    var data = globalData.requestData;
    // data.token=token;
    data.pageNum = pageNum;
    data.pageSize = pageSize;
    data.userId = globalData.userId;;
    var param = JSON.stringify(data);
    //console.log(param);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/mark/loan/list`, { params: str }, cb1, cb2);
    delete data.pageNum;
    delete data.pageSize;
    delete data.userId;
}

//收藏贷款列表

module.exports.saveArticle = function (pageNum, pageSize, cb1, cb2) {
    var data = globalData.requestData;
    // data.token=token;
    data.pageNum = pageNum;
    data.pageSize = pageSize;
    data.userId = globalData.userId;;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/mark/article/list`, { params: str }, cb1, cb2);
    delete data.pageNum;
    delete data.pageSize;
    delete data.userId;
}


/**
 * 功能描述：搜索 
 * 函数名：queryFind
 * @para:参数描述
 * KEYWORDS:搜索关键词
 */
/*module.exports.querySearch=function(KEYWORDS,cb){
	var data=globalData.requestData;
    data.ACTION="search";
	data.KEYWORDS= KEYWORDS;
    var param=JSON.stringify(data);
    var queryData = base64encode(des(key,utf16to8(param),1,0, iv, 1));
  	http(`${globalData.path}`,queryData,cb);
}*/

/**
 * 功能描述：我的订单
 * 函数名：orderList
 * @param {String} pageNum
 * @param {String} pageSize
 * @param {String} tag
 * ACTION
 */
module.exports.orderList = function (pageNum, pageSize, flag, cb1, cb2) {
    var data = globalData.requestData;
    //data.token=token;
    data.pageNum = pageNum;
    data.pageSize = pageSize;
    data.flag = flag;
    data.userId = globalData.userId;;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/loan/apply/list/c`, { params: str }, cb1, cb2);
    delete data.pageNum;
    delete data.pageSize;
    delete data.flag;
    delete data.userId;
}
/**
 * 功能描述：取消订单
 * 函数名：orderList
 * @param {String} applyId
 * @param {String} userId
 * ACTION
 */
module.exports.cancleOrder = function (applyId, flag, cb1, cb2) {
    var data = globalData.requestData;
    //data.token=token;
    data.applyId = applyId;
    data.flag = flag;
    data.userId = globalData.userId;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    console.log(param);
    // console.log(userId);
    http(`${globalData.path}/zndai/loan/apply/cancel`, { params: str }, cb1, cb2);
    delete data.applyId;
    delete data.flag;
    delete data.userId;
}

/**
 * 功能描述：饼图
 * 函数名：circle
 * ACTION
 */
module.exports.circle = function (cb1, cb2) {
    var data = globalData.requestData;
    //data.token=token;
    data.userId = globalData.userId;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/loan/apply/list/b`, { params: str }, cb1, cb2);
    delete data.userId;
}
//订单详情
module.exports.orderDetail = function (applyId, cb1, cb2) {
    var data = globalData.requestData;
    data.applyId = applyId;
    data.userId = globalData.userId;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/loan/apply/detail`, { params: str }, cb1, cb2);
    delete data.userId;
    delete data.applyId;
}

/**
 * 功能描述：进展列表
 * 函数名：progressList
 * ACTION
 */
module.exports.progressList = function (pageNum, pageSize, cb1, cb2) {
    var data = globalData.requestData;
    data.pageNum = pageNum;
    data.pageSize = pageSize;
    data.userId = globalData.userId;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/loan/apply/process/list`, {
        params: str
    }, cb1, cb2);
    delete data.userId;
}

/**
 * 功能描述：进展详情
 * 函数名：processDetail
 * ACTION
 */
module.exports.processDetail = function (applyId, cb1, cb2) {
    var data = globalData.requestData;
    data.applyId = applyId;
    data.userId = globalData.userId;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/loan/apply/process/detail`, {
        params: str
    }, cb1, cb2);
    delete data.applyId;
    delete data.userId;
}
//还款H5
module.exports.h5applyrepay = function (capitalId, loanId, orderSn, cb1, cb2) {
    var data = globalData.requestData;
    data.capitalId = capitalId;
    data.loanId = loanId;
    data.orderSn = orderSn;
    data.userId = globalData.userId;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    //console.log(param);
    http.get(`${globalData.path}/zndai/capital/h5applyrepay`, {
        params: str
    }, cb1, cb2);
    delete data.capitalId;
    delete data.loanId;
    delete data.orderSn;
    delete data.userId;
}
//H5绑卡跳转
module.exports.h5bindcard = function (capitalId, loanId, orderSn, cb1, cb2) {
    var data = globalData.requestData;
    data.capitalId = capitalId;
    data.loanId = loanId;
    data.orderSn = orderSn;
    data.userId = globalData.userId;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    //console.log(param);
    http(`${globalData.path}/zndai/capital/h5bindcard`, {
        params: str
    }, cb1, cb2);
    delete data.capitalId;
    delete data.loanId;
    delete data.orderSn;
    delete data.userId;
}
//H5绑卡跳转
module.exports.certCheck = function (tag, cb1, cb2) {
    var data = globalData.requestData;
    data.type = tag
    data.userId = globalData.userId;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/user/cert/check`, {
        params: str
    }, cb1, cb2);
    delete data.type;
    delete data.userId;
}

//运营商认证
module.exports.phoneCert = function (loanId, cb1, cb2) {
    var data = globalData.requestData;
    data.loanId = loanId
    data.userId = globalData.userId;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/user/cert/authorizationPhone`, {
        params: str
    }, cb1, cb2);
    delete data.loanId;
    delete data.userId;
}

//芝麻认证
module.exports.zmCert = function (loanId, cb1, cb2) {
    var data = globalData.requestData;
    data.loanId = loanId
    data.userId = globalData.userId;
    var param = JSON.stringify(data);
    // console.log("=======" + param)
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/user/cert/authorizationZm`, {
        params: str
    }, cb1, cb2);
    delete data.loanId;
    delete data.userId;
}

//申请单号获取订单号
module.exports.getApplyId = function (orderId, cb1, cb2) {
    var data = globalData.requestData;
    data.loanId = orderId
    data.userId = globalData.userId;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/user/cert/authorizationZm`, {
        params: str
    }, cb1, cb2);
    delete data.loanId;
    delete data.userId;
}

//联系人关系列表
module.exports.contact = function (cb1, cb2) {
    var data = globalData.requestData;
    data.typeCode = 'CONTACT';
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    //console.log(param);
    http(`${globalData.path}/zndai/dictionary/list`, {
        params: str
    }, cb1, cb2);
    delete data.typeCode;
}
//联系人信息保存
module.exports.contactSave = function (contactWay, name, relation, cb1, cb2) {
    var data = globalData.requestData;
    data.contactWay = contactWay;
    data.name = name;
    data.relation = relation;
    data.userId = globalData.userId;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    // console.log(param);
    http(`${globalData.path}/zndai/user/cert/contact`, {
        params: str
    }, cb1, cb2);
    delete data.contactWay;
    delete data.name;
    delete data.relation;
    delete data.userId;
}
//用户公司信息保存
module.exports.company = function (comp, compAddr, cb1, cb2) {
    var data = globalData.requestData;
    data.comp = comp;
    data.compAddr = compAddr;
    data.userId = globalData.userId;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    //  console.log(param);
    http(`${globalData.path}/zndai/user/cert/company`, {
        params: str
    }, cb1, cb2);
    delete data.comp;
    delete data.compAddr;
    delete data.userId;
}
//用户其他信息查询
module.exports.getCompAndContact = function (cb1, cb2) {
    var data = globalData.requestData;
    data.userId = globalData.userId;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    // console.log(param);
    http(`${globalData.path}/zndai/user/cert/getCompAndContact`, {
        params: str
    }, cb1, cb2);
    delete data.userId;
}
// 任务中心
module.exports.taskcenter = function (phone, cb1, cb2) {
    var data = globalData.requestData;
    data.appId = phone;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    // console.log(param);
    http(`${globalData.path}/task/missionCenter/list`, {
        params: str
    }, cb1, cb2);
    delete data.appId;
}
//任务详情
module.exports.viewTask = function (id, taskName, cb1, cb2) {
    var data = globalData.requestData;
    data.id = id;
    data.taskName = taskName;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    // console.log(param);
    http(`${globalData.path}/task/missionCenter/viewTask`, {
        params: str
    }, cb1, cb2);
    delete data.id;
    delete data.taskName;
}
//领取任务
module.exports.recieveTask = function (item, cb1, cb2) {
    var data = globalData.requestData;
    data.identity = item.identity;
    data.appName = item.realName;
    data.appId = item.phone;
    data.taskId = item.taskId;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    // console.log(param);
    http(`${globalData.path}/task/missionCenter/recieveTask`, {
        params: str
    }, cb1, cb2);
    delete data.identity;
    delete data.appName;
    delete data.appId;
    delete data.taskId;
}
//我的任务
module.exports.myTask = function (item, cb1, cb2) {
    var data = globalData.requestData;
    data.userId = item.userId;
    data.appId = item.phone;
    data.appFlag = "C";
    data.userId=item.userId;
    data.appId=item.phone;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    // console.log(param);
    http(`${globalData.path}/zndai/user/task/myTask`, {
        params: str
    }, cb1, cb2);
    delete data.userId;
    delete data.appId;
}
//提交任务
module.exports.submitTask = function (item, cb1, cb2) {
    var data = globalData.requestData;
    // data.submitPic=item.pic;
    data.reviewId=item.id,
    data.userId=item.userId;
    data.taskPhone=item.phone;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    console.log(param);
    http(`${globalData.path}/zndai/user/task/submitTask`, {
        params: str, submitPic: item.pic
    }, cb1, cb2);
    delete data.reviewId;
    delete data.userId;
    delete data.taskPhone;
}
//当前版本
module.exports.version = function (cb1, cb2) {
    var data = globalData.requestData;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    // console.log(param);
    http(`${globalData.path}/zndai/version/versionInfoC`, {
        params: str
    }, cb1, cb2);
}
//消息列表
module.exports.newsList = function (phone, cb1, cb2) {
    var data = globalData.requestData;
    data.phone = phone;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    // console.log(param);
    http(`${globalData.path}/zndai/news/newsList`, { params: str }, cb1, cb2);
    delete data.phone;
}
//消息改状态
module.exports.modifyStatus= function (item,cb1, cb2) {
    var data = globalData.requestData;
    data.userId=item.userId;
    data.userName=item.userName;
    data.phone=item.phone;
    data.title=item.title;
    data.id=item.id,
    data.content="";
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    // console.log(param);
    http(`${globalData.path}/zndai/news/modifyStatus`, {params: str}, cb1, cb2);
    delete data.userId;
    delete data.userName;
    delete data.phone;
    delete data.title;
    delete data.id;
}
//绑定银行卡
module.exports.addBankcard = function (cardName, idCard, cardNumber, bankName, cardPhone, verifyCode, cb1, cb2) {
    var data = globalData.requestData;
    data.userId = globalData.userId;
    data.cardName = cardName;
    data.idCard = idCard;
    data.cardNumber = cardNumber;
    data.bankName = bankName;
    data.cardPhone = cardPhone;
    data.verifyCode = verifyCode;
    var param = JSON.stringify(data);
    console.log(param)
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/platform/bankCardFeedback`, { params: str }, cb1, cb2);
    delete data.cardName;
    delete data.idCard;
    delete data.cardNumber;
    delete data.bankName;
    delete data.cardPhone;
    delete data.verifyCode;
}
// 查看所属银行
module.exports.seebank = function (bankNum,cb1, cb2) {
    var data = globalData.requestData;
    data.userId = globalData.userId;
    data.bankNum = bankNum;
    var param = JSON.stringify(data);
    console.log(param)
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/query/bank`, { params: str }, cb1, cb2);
    delete data.bankNum;
}
//选择银行卡 
module.exports.choiceadd = function (cb1, cb2) {
    var data = globalData.requestData;
    data.userId = globalData.userId;
    var param = JSON.stringify(data);
    console.log(param)
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/wallet/cardList`, { params: str }, cb1, cb2);
    delete data.userId;
}

//更换银行卡
module.exports.update = function (mainId, selectId, cb1, cb2) {
    console.log(mainId)
    console.log(selectId)
    var data = globalData.requestData;
    data.userId = globalData.userId;
    data.mainId = mainId;
    data.selectId = selectId;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/wallet/update`, { params: str }, cb1, cb2);
    delete data.userId;
    delete data.cardName;
    delete data.selectId;
}
//提现
module.exports.replacecard = function (bankCardName, cardNumber, cash, serviceCharge,userName, cb1, cb2) {
    var data = globalData.requestData;
    data.userId = globalData.userId;
    data.bankCardName = bankCardName;
    data.cardNumber = cardNumber;
    data.cash = cash;
    data.serviceCharge = serviceCharge;
    data.userName = userName;
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    http(`${globalData.path}/zndai/wallet/submit`, { params: str }, cb1, cb2);
    delete data.userId;
    delete data.bankCardName;
    delete data.cardNumber;
    delete data.cash;
    delete data.serviceCharge;
    delete data.userName;
}
//第三方验证
module.exports.partyverification = function (bankCard, idCard, name,phone, cb1, cb2) {
    var data = globalData.requestData;
    data.userId = globalData.userId;
    data.bankCard = bankCard;
    data.idCard = idCard;
    data.name = name;
    data.phone = phone;
    var param = JSON.stringify(data);
    console.log(param)
    var str = strEnc(param, key1);
    http(`${globalData.pathone}/zndai/identityCard/identity`, { params: str }, cb1, cb2);
    delete data.userId;
    delete data.bankCard;
    delete data.idCard;
    delete data.name;
    delete data.phone;
}
//消息推送
module.exports.whetherMsgPush= function (item,cb1, cb2) {
    var data = globalData.requestData;
    data.userId=item.userId;
    data.whetherMsgPush=item.whetherMsgPush;    
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    // console.log(param);
    http(`${globalData.path}/zndai/user/whetherMsgPush`, {params: str}, cb1, cb2);
    delete data.userId;
    delete data.whetherMsgPush;
}
module.exports.shareDetail= function (userName,cb1, cb2) {
    var data = globalData.requestData;
    data.userId=globalData.userId;
    data.userName = userName
    var param = JSON.stringify(data);
    var str = strEnc(param, key1);
    // console.log(param);
    http(`${globalData.path}/zndai/share/detailed`, {params: str}, cb1, cb2);
    delete data.userId;
    delete data.userName;
}
