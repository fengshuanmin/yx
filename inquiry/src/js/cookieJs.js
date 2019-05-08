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

            cookieStr += name + '=' + value1 +'&'+ value2+ ';expires=' + oDate;

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
