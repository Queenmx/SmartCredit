export function formateTime(date, fmt) {
    // (x) 匹配 'x' 并且记住匹配项，就像下面的例子展示的那样。括号被称为 捕获括号。
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt
}
function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}
var appBrige={
    setupWebViewJavascriptBridge(callback) {
        // console.log("3333");
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
    },
    start(data) {
        // console.log("start")
        var native = function (data) {
            
        }
        return this.nativeInteractive(native,data);
    },
    nativeInteractive(fn, obj) {
        // console.log(123);
        var self = this;
        self.setupWebViewJavascriptBridge(function (bridge) {
            if (obj) {
                bridge.callHandler('webview_call_native', obj, function (response) { });
            }
            bridge.registerHandler('native_call_webview', function (data, response) {
                fn(data);
            })
        });
        if (window.start && obj) {
            var str = JSON.stringify(obj);
            window.start.webview_call_native(str);
        }
    
        window.native_call_webview = function (data) {
            var obj = eval('(' + data + ')');
            fn(obj);
        }
    }
}


export default {"appBrige":appBrige};