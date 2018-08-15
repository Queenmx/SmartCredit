
module.exports = (url, data, cb1, cb2) => {
    $.ajax({
        url: url,
        data: data,
        type: "POST",
        dataType: "json",
        success: function (res) {
            cb1(res)
        },
        xhrFields: {
		      withCredentials: true
		},
        error: function (event, XMLHttpRequest, ajaxOptions, thrownError) {
            //console.log(event);
            cb2();
        }
    })
};
module.exports.get = (url, data, cb, cb2) => {
    $.ajax({
        url: url,
        data: data,
        type: "GET",
        dataType: "json",
        success: function (res) {
            cb(res)
        },
        error: function (event, XMLHttpRequest, ajaxOptions, thrownError) {
            //console.log(event);
            cb2();
        }
    })

};