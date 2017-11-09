var http=require("./http");
import {globalData} from './global.js';

var key1 = globalData.key;
var userId=globalData.userId;
//var toast = new Toast();
console.log(userId);
//console.log(globalData.userId);
//var getNewUser=function(){
	/*var user=localStorage.getItem("user");
   console.log(user);
   if(user){
   	var userObj=JSON.parse(user);
   	var userId=userObj.userId;
   	var token=userObj.token;
   }else{
   	var userId="";
   	var token="";
   }*/
//}
 //getNewUser();
 //module.exports.getNewUser;
//ex
/*module.exports.getHospital=function(pn,cb){
	var data=globalData.requestData;
	data.APP_VERSION="v1.0";
	data.ACTION="getHospital";
	data.TOKEN_ID="";
	data.DEVICE_ID="999kkkk";
	data.KEYWORDS="";
    data.PAGE_INDEX=pn;
    var key="YMFQ2016";
     var iv = new String(0);
    var param=JSON.stringify(data);
    var requestData = base64encode(des(key,utf16to8(param),1,0, iv, 1));
	http("http://test.91ymfq.com/api/h5Service.do",requestData,cb);
}
*/
//标签
module.exports.tag=function(type,cb1,cb2){ 
	 //getNewUser();
    var data=globalData.requestData;
    //data.token=token;
    data.tagType="LOAN";
    data.type=type;//BQ 标签 FL 分类
    var param=JSON.stringify(data);
    console.log(param);
    var str = strEnc(param,key1);
    // console.log(str);
  	http(`${globalData.path}/zndai/tag/list`,{params:str},cb1,cb2);
}


//获取城市列表
module.exports.getCityList=function(cb1,cb2){ 
    var data=globalData.requestData;
    //data.token=token;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/city/list`,{params:str},cb1,cb2);
}

 
//热门城市
module.exports.getHotCity=function(cb1,cb2){ 
    var data=globalData.requestData;
   // data.token=token;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/city/hot`,{params:str},cb1,cb2);
}

//登录
module.exports.login=function(loginType,phone,pwd,verifyCode,cb1,cb2){ 
    var data=globalData.requestData;
   // data.token=token;
    data.loginType=loginType;
    data.phone=phone;
    data.pwd=pwd;//login_type为PWD时必填
    data.type="C";
    data.verifyCode=verifyCode;//	login_type为CODE时必填
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/user/login`,{params:str},cb1,cb2);
}

//注册
module.exports.register=function(phone,pwd,verifyCode,cb1,cb2){ 
    var data=globalData.requestData;
   // data.token=token;
    data.phone=phone;
    data.pwd=pwd;
    data.type="C";
    data.verifyCode=verifyCode;
    console.log(data);
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/user/add`,{params:str},cb1,cb2);
}

//忘记密码，重置密码
module.exports.forgot=function(phone,pwd,verifyCode,cb1,cb2){ 
    var data=globalData.requestData;
   // data.token=token;
    data.phone=phone;
    data.pwd=pwd;
    data.verifyCode=verifyCode;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/user/pwd/forgot`,{params:str},cb1,cb2);
}

//发送手机验证码
module.exports.verifyCode=function(phone,type,cb1,cb2){ 
    var data=globalData.requestData;
   // data.token=token;
    data.phone=phone;
    data.type="REG";//REG 注册 ，FPWD忘记密码
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
    console.log(data);
  	http(`${globalData.path}/zndai/user/verifyCode`,{params:str},cb1,cb2);
}
//退出
module.exports.exit=function(userId,cb1,cb2){ 
    var data=globalData.requestData;
   // data.token=token;
    data.userId=userId;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/user/exit`,{params:str},cb1,cb2);
}

//----------------个人中心

//个人信息修改
module.exports.edit=function(idCard,located,realName,cb1,cb2){ 
    var data=globalData.requestData;
   // data.token=token;
    data.idCard=idCard;
    data.located=located;
    data.realName=realName;
    data.userId=userId;
    var param=JSON.stringify(data);
    	console.log(param);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/user/edit`,{params:str},cb1,cb2);
}

//个人信息查询
module.exports.userInfo=function(userId,cb1,cb2){ 
    var data=globalData.requestData;
    //data.token=token;
    data.userId=userId;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/user/userInfo`,{params:str},cb1,cb2);
}

//修改密码
module.exports.userInfo=function(newPwd,oldPwd,userId,cb1,cb2){ 
    var data=globalData.requestData;
  //  data.token=token;
    data.newPwd=newPwd;
    data.oldPwd=oldPwd;
    data.userId=userId;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/user/pwd/edit`,{params:str},cb1,cb2);
}

//用户个人资质保存

module.exports.qualifyListAdd=function(parentId,qualifyName,qualifyNo,selectName,userId,cb1,cb2){ 
    var data=globalData.requestData;
   // data.token=token;
    data.qualifyList={
    	parentId:parentId,
    	qualifyName:qualifyName,
    	qualifyNo:qualifyNo,
    	selectName:selectName
    };
    data.userId=userId;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/user/qualify/add`,{params:str},cb1,cb2);
}

//用户个人资质查询
module.exports.qualifyList=function(loanId,parentId,cb1,cb2){ 
    var data=globalData.requestData;
   // data.token=token;
   data.loanId=loanId;
    data.parentId=parentId;
    data.userId=userId;
    var param=JSON.stringify(data);
   // console.log(param);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/user/qualify/list`,{params:str},cb1,cb2);
}
//字典查询
module.exports.dictionary=function(objId,parentId,typeCode,cb1,cb2){ 
    var data=globalData.requestData;
    //data.token=token;
    data.parentId=parentId;
    data.objId=objId;
    data.typeCode=typeCode;
    var param=JSON.stringify(data);
   // console.log(param);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/dictionary/list`,{params:str},cb1,cb2);
}


//用户头像上传
module.exports.userHead=function(headPic,userId,cb1,cb2){ 
    var data=globalData.requestData;
   // data.token=token;
    data.userId=userId;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/user/userHead`,{params:str,headPic:headPic},cb1,cb2);
}

//身份认证
module.exports.identityUserCert=function(backPic,frontPic,userId,cb1,cb2){ 
    var data=globalData.requestData;
   // data.token=token;
    data.userId=userId;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/user/identityUserCert`,{params:str,backPic:backPic,frontPic:frontPic},cb1,cb2);
}


//-------------------资讯

//banner
module.exports.banner=function(cb1,cb2){ 
    var data=globalData.requestData;
   // data.token=token;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/banner/list`,{params:str},cb1,cb2);
}

//资讯列表
module.exports.articleList=function(pageNum,pageSize,cb1,cb2){ 
    var data=globalData.requestData;
    //data.token=token;
    data.pageNum=pageNum;
    data.pageSize=pageSize;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/article/list`,{params:str},cb1,cb2);
}

//资讯详情
module.exports.articleDetail=function(articleId,cb1,cb2){ 
    var data=globalData.requestData;
    //data.token=token;
    data.articleId=articleId;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/article/detail`,{params:str},cb1,cb2);
}


//---------------------贷款产品
//精准贷
//列表
module.exports.loanList=function(pageNum,pageSize,tag,cb1,cb2){ 
    var data=globalData.requestData;
    //data.token=token;
    data.pageNum=pageNum;
    data.pageSize=pageSize;
    data.tag=tag;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
    //console.log(param);
  	http(`${globalData.path}/zndai/loan/list`,{params:str},cb1,cb2);
}
//详情
module.exports.loanDetail=function(loanId,cb1,cb2){ 
    var data=globalData.requestData;
   // data.token=token;
    data.loanId=loanId;
    data.userId=globalData.userId;
    var param=JSON.stringify(data);
   // console.log(param)
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/loan/detail`,{params:str},cb1,cb2);
}
//申请贷款

module.exports.applyLoan=function(limitDay,limitType,loanId,money,cb1,cb2){ 
    var data=globalData.requestData;
    //data.token=token;
    data.limitDay=limitDay;
    data.limitType=limitType;
    data.loanId=loanId;
    data.money=money;
    data.userId=userId;
    var param=JSON.stringify(data);
    console.log(param)
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/loan/apply/add`,{params:str},cb1,cb2);
}




//------------------------问题

//提交反馈
module.exports.feedBackAdd=function(content,userId,cb1,cb2){ 
    var data=globalData.requestData;
   // data.token=token;
    data.content=content;
    data.userId=userId;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/feedBack/add`,{params:str},cb1,cb2);
}

//我要提问
module.exports.questionAdd=function(content,objId,objType,userId,cb1,cb2){ 
    var data=globalData.requestData;
   // data.token=token;
    data.content=content;
    data.objId=objId;
    data.objType=objType;
    data.userId=userId;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/question/add`,{params:str},cb1,cb2);
}

//问题列表
module.exports.questionList=function(objId,pageNum,pageSize,cb1,cb2){ 
    var data=globalData.requestData;
   // data.token=token;
    data.objId=objId;
    data.pageNum=pageNum;
    data.pageSize=pageSize;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/question/list`,{params:str},cb1,cb2);
}
//问题列表

module.exports.questionAdd=function(content,objId,objType,cb1,cb2){ 
    var data=globalData.requestData;
   // data.token=token;
    data.objId=objId;
    data.content=content;
    data.objType=objType;
    data.userId=userId;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/question/add`,{params:str},cb1,cb2);
}


//收藏——————————————————————————
//添加收藏
module.exports.save=function(objId,objType,cb1,cb2){ 
    var data=globalData.requestData;
   // data.token=token;
    data.objId=objId;
    data.objType=objType;//ARTICLE   LOAN 
    data.userId=userId;
    var param=JSON.stringify(data);
    console.log(param);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/mark/add`,{params:str},cb1,cb2);
}
//取消收藏
module.exports.delSave=function(markIds,objType,cb1,cb2){ 
    var data=globalData.requestData;
   // data.token=token;
    data.markIds=markIds;
    data.objType=objType;//ARTICLE   LOAN 
    data.userId=userId;
    var param=JSON.stringify(data);
    console.log(param);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/mark/del`,{params:str},cb1,cb2);
}

//收藏贷款列表
module.exports.saveLoan=function(pageNum,pageSize,cb1,cb2){ 
    var data=globalData.requestData;
   // data.token=token;
   data.pageNum=pageNum;
   data.pageSize=pageSize;
    data.userId=userId;
    var param=JSON.stringify(data);
    console.log(param);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/mark/loan/list`,{params:str},cb1,cb2);
}

//收藏贷款列表
 
module.exports.saveArticle=function(pageNum,pageSize,cb1,cb2){ 
    var data=globalData.requestData;
   // data.token=token;
   data.pageNum=pageNum;
   data.pageSize=pageSize;
    data.userId=userId;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
  	http(`${globalData.path}/zndai/mark/article/list`,{params:str},cb1,cb2);
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












