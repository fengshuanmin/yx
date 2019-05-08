/**
 * Created by Administrator on 2016/7/28 0028.
 */
var cookie = {
    setCookie: function (name, value1,value2, iDay) {

        var cookieStr = '';

        if (iDay == undefined) {

            cookieStr += name + '=' + value1+'&'+ value2+ ';';

        } else {

            var oDate = new Date();

            oDate.setDate(oDate.getDate() + iDay);

            cookieStr += name + '=' + value1 +'&'+ value2+ ';express=' + oDate;

        }

        document.cookie = cookieStr;

    },

    getCookie: function (name) {

        var arr = document.cookie.split(';');

        for (var i = 0; i < arr.length; i++) {

            var arr2 = arr[i].split('=');

            if (arr2[0] == name) {
                var arr3 = arr2[1].split('&')
                return arr3;

            }

        }

        return '';

    },

    removeCookie: function (name) {

        this.setCookie(name, '1', -1);

    }

}
export default cookie

//function ControlAlert() {
//
//    var flag = cookie.getCookie('flag');
//
//    if (!flag) {
//
//        console.log("我是第一次加载的哟！");
//
//        cookie.setCookie('flag', true);
//
////cookie.setCookie('flag',true,1);//如果有第三个参数则保存cookie的天数，如果不设置，浏览器关闭时cookie过期
//
//    }
//
//}
//
//(function () {
//
//    ControlAlert();
//
//}());

