const request = {
	    QueryString : function(val) {
	     var uri = window.location.search;
	     var re = new RegExp("" +val+ "=([^&?]*)", "ig");
	     return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
	    }
	   }
   const platform =  request.QueryString ("platform");
   const deviceno = request.QueryString("deviceno");
   const toast=new Toast();
   const user=localStorage.getItem("user");
  // console.log(user);
   if(user){
   	var userObj=JSON.parse(user);
   	var userId=userObj.userId;
   	var token=userObj.token;
   }else{
   	var userId="";
   	var token="";
   }
	

const globalData = {
	toast:toast,
    selectedCityName:'',
    key:"ZND171030APIMM",
    appBasePath:"http://www.91ymfq.com/XR/",
   // appBasePath:"http://122.144.133.20/XR/",
    path1:"http://admin.91ymfq.com/api/h5Service.do",
    //path:"http://xingrongjinfu.iask.in:8886",
    path:"http://122.144.133.20:8088",
   // path:"http://192.168.1.17:8088",
    //path:"http://122.144.133.20:8088",
    imgPath:"http://xrjf.oss-cn-shanghai.aliyuncs.com/",
    //path:"http://192.168.1.17:8088",
   pathCai:"http://apis.juhe.cn/cook/query.php",
   userId:userId||"",
    requestData:{
        "platform" : platform||"",
		"deviceno" : deviceno||"",
		"appFlag":"C",
		"token" :token
    }
}
export {globalData};

			
			
