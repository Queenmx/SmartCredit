/*(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };
 
    // Abort if browser does not support addEventListener
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
*/
(function(){
	    function sizeHtml(){
	        var size = $(window).width()/7.5;
	        size1 = size>55.2?55.2:size;
	        // console.log("size1"+size1)
	        $("html").css("font-size",size1+"px");
	    }
	    sizeHtml();
	        $(window).resize(function(){
	        sizeHtml();
	    })
	})();
	