var http=require("./http");
import {globalData} from './global.js';

var key = globalData.key;
var appBasePath = globalData.appBasePath;
var iv = new String(0);
var toast = new Toast();

/**
 * 功能描述：首页
 * 函数名：queryBanner
 * @para:参数描述
 * ACTION
 */
module.exports.queryBanner=function(cb){ 
    var data=globalData.requestData;
    data.ACTION="main_v2";
    var param=JSON.stringify(data);
    var queryData = base64encode(des(key,utf16to8(param),1,0, iv, 1));
  	http(`${globalData.path}`,queryData,cb);
}

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
module.exports.querySearch=function(KEYWORDS,cb){
	var data=globalData.requestData;
    data.ACTION="search";
	data.KEYWORDS= KEYWORDS;
    var param=JSON.stringify(data);
    var queryData = base64encode(des(key,utf16to8(param),1,0, iv, 1));
  	http(`${globalData.path}`,queryData,cb);
}












