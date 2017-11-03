const request = {
	    QueryString : function(val) {
	     var uri = window.location.search;
	     var re = new RegExp("" +val+ "=([^&?]*)", "ig");
	     return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
	    }
	   }
   const platform =  request.QueryString ("platform");
   const deviceno = request.QueryString("deviceno");
const globalData = {
    APP_USER_ID:'',
    selectedCityName:'',
    key:"ZND171030APIMM",
    appBasePath:"http://www.91ymfq.com/XR/",
   // appBasePath:"http://122.144.133.20/XR/",
    path1:"http://admin.91ymfq.com/api/h5Service.do",
    //path:"http://test.91ymfq.com/api/h5Service.do",
   // path:"http://122.144.133.20:8088",
    //path:"http://tdx.free.ngrok.cc",
    path:"http://192.168.1.17:8088",
    requestData:{
        "platform" : platform,
		"deviceno" : deviceno,
		"token" : ""
    }
}
export {globalData};

			
			
