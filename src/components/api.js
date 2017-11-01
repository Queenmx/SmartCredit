var http=require("./http");
import {globalData} from './global.js';

var key1 = globalData.key;
var appBasePath = globalData.appBasePath;
var iv = new String(0);
var toast = new Toast();


//获取城市列表
module.exports.getCityList=function(cb){ 
    var data=globalData.requestData;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
    console.log(str);
  	http(`${globalData.path}/zndai/city/list`,{params:str},cb);
}

 
//热门城市
module.exports.getHotCity=function(cb){ 
    var data=globalData.requestData;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
    console.log(str);
  	http(`${globalData.path}/zndai/city/hot`,{params:str},cb);
}

//登录
module.exports.login=function(pwd,type,userName,cb){ 
    var data=globalData.requestData;
    data.type="C";
    data.userName=userName;
    data.pwd=pwd;
    var param=JSON.stringify(data);
    var str = strEnc(param,key1);
    console.log(str);
  	http(`${globalData.path}/zndai/capital/login`,{params:str},cb);
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












