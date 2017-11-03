var http=require("./http");
import {globalData} from './global.js';

var key1 = globalData.key;
var appBasePath = globalData.appBasePath;
var iv = new String(0);
var toast = new Toast();
var id=localStorage.getItem("id");

//获取城市列表
module.exports.getCityList=function(cb){ 
    var data=globalData.requestData;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/city/list`,{params:str},cb);
}

 
//热门城市
module.exports.getHotCity=function(cb){ 
    var data=globalData.requestData;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/city/hot`,{params:str},cb);
}

//登录
module.exports.login=function(loginType,phone,pwd,verifyCode,cb){ 
    var data=globalData.requestData;
    data.loginType=loginType;
    data.phone=phone;
    data.pwd=pwd;//login_type为PWD时必填
    data.type="C";
    data.verifyCode=verifyCode;//	login_type为CODE时必填
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
   // console.log(data);
  	http(`${globalData.path}/zndai/user/login`,{params:str},cb);
}

//注册
module.exports.register=function(phone,pwd,verifyCode,cb){ 
    var data=globalData.requestData;
    data.phone=phone;
    data.pwd=pwd;
    data.type="C";
    data.verifyCode=verifyCode;
    console.log(data);
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/user/add`,{params:str},cb);
}

//忘记密码，重置密码
module.exports.forgot=function(phone,pwd,verifyCode,cb){ 
    var data=globalData.requestData;
    data.phone=phone;
    data.pwd=pwd;
    data.verifyCode=verifyCode;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/user/pwd/forgot`,{params:str},cb);
}

//发送手机验证码
module.exports.verifyCode=function(phone,type,cb){ 
    var data=globalData.requestData;
    data.phone=phone;
    data.type="REG";//REG 注册 ，FPWD忘记密码
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
    console.log(data);
  	http(`${globalData.path}/zndai/user/verifyCode`,{params:str},cb);
}
//退出
module.exports.exit=function(userId,cb){ 
    var data=globalData.requestData;
    data.userId=userId;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/user/exit`,{params:str},cb);
}

//----------------个人中心

//个人信息修改
module.exports.edit=function(idCard,located,realName,userId,cb){ 
    var data=globalData.requestData;
    data.idCard=idCard;
    data.located=located;
    data.realName=realName;
    data.userId=userId;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/user/edit`,{params:str},cb);
}

//个人信息查询
module.exports.userInfo=function(userId,cb){ 
    var data=globalData.requestData;
    data.userId=userId;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/user/userInfo`,{params:str},cb);
}

//修改密码
module.exports.userInfo=function(newPwd,oldPwd,userId,cb){ 
    var data=globalData.requestData;
    data.newPwd=newPwd;
    data.oldPwd=oldPwd;
    data.userId=userId;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/user/pwd/edit`,{params:str},cb);
}

//用户个人资质保存

module.exports.qualifyListAdd=function(parentId,qualifyName,qualifyNo,selectName,userId,cb){ 
    var data=globalData.requestData;
    data.qualifyList={
    	parentId:parentId,
    	qualifyName:qualifyName,
    	qualifyNo:qualifyNo,
    	selectName:selectName
    };
    data.userId=userId;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/user/qualify/add`,{params:str},cb);
}

//用户个人资质查询
module.exports.qualifyList=function(parentId,cb){ 
    var data=globalData.requestData;
    data.parentId=parentId;
    data.userId=userId;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/user/qualify/list`,{params:str},cb);
}

//用户头像上传
module.exports.userHead=function(headPic,userId,cb){ 
    var data=globalData.requestData;
    data.userId=userId;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/user/userHead`,{params:str,headPic:headPic},cb);
}

//身份认证
module.exports.identityUserCert=function(backPic,frontPic,userId,cb){ 
    var data=globalData.requestData;
    data.userId=userId;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/user/identityUserCert`,{params:str,backPic:backPic,frontPic:frontPic},cb);
}


//-------------------资讯

//banner
module.exports.banner=function(cb){ 
    var data=globalData.requestData;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/banner/list`,{params:str},cb);
}

//资讯列表
module.exports.articleList=function(pageNum,pageSize,cb){ 
    var data=globalData.requestData;
    data.pageNum=pageNum;
    data.pageSize=pageSize;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/article/list`,{params:str},cb);
}

//资讯详情
module.exports.articleDetail=function(articleId,cb){ 
    var data=globalData.requestData;
    data.articleId=articleId;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/article/detail`,{params:str},cb);
}


//---------------------贷款产品
//精准贷
//列表
module.exports.loanList=function(pageNum,pageSize,tag,cb){ 
    var data=globalData.requestData;
    data.pageNum=pageNum;
    data.pageSize=pageSize;
    data.tag=tag;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/loan/list`,{params:str},cb);
}
//详情
module.exports.loanDetail=function(loanId,cb){ 
    var data=globalData.requestData;
    data.loanId=loanId;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/loan/detail`,{params:str},cb);
}


//------------------------问题

//提交反馈
module.exports.feedBackAdd=function(content,userId,cb){ 
    var data=globalData.requestData;
    data.content=content;
    data.userId=userId;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/feedBack/add`,{params:str},cb);
}

//我要提问
module.exports.questionAdd=function(content,objId,objType,userId,cb){ 
    var data=globalData.requestData;
    data.content=content;
    data.objId=objId;
    data.objType=objType;
    data.userId=userId;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/question/add`,{params:str},cb);
}

//问题列表
module.exports.questionList=function(objId,pageNum,pageSize,cb){ 
    var data=globalData.requestData;
    data.objId=objId;
    data.pageNum=pageNum;
    data.pageSize=pageSize;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/question/list`,{params:str},cb);
}





/*module.exports.queryBanner=function(cb){ 
    var data=globalData.requestData;
    data.ACTION="main_v2";
    var param=JSON.stringify(data);
    var queryData = base64encode(des(key,utf16to8(param),1,0, iv, 1));
  	http(`${globalData.path1}`,queryData,cb);
}*/

/**
 * 功能描述：发现
 * 函数名：queryFind
 * @para:参数描述
 * ACTION
 */
/*module.exports.queryFind=function(cb){
	var data=globalData.requestData;
    data.ACTION="find";
    data.DEVICE_ID="aaaaaaaaaaaaaaa123";
    var param=JSON.stringify(data);
    var queryData = base64encode(des(key,utf16to8(param),1,0, iv, 1));
  	http(`${globalData.path}`,queryData,cb);
}*/


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












