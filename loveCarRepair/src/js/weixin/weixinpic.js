import React from 'react';
import $ from 'jquery';

var signature, openid, flag, appid, plateNo;
console.log('asdfasdfsf')
console.log('asdfasdfsf',$('#flag').val(),
    $('#signature').val(),
    $('#appid').val(),
    $('#plateNo').val()
	);

$(function() {
	wx.config({
		debug : true,
		appId : 'wx7bf8faee258e6753',// 微信appid
		timestamp : 1425952357,// 时间戳
		nonceStr : 'OMIE75rRCpMq2540',// 随机数
		signature : signature,// 签名,
		jsApiList : [
		    'scanQRCode',//扫一扫
		]
	});
	wx.ready(function() {
	});
	//隐藏右上角菜单接口
    wx.hideOptionMenu();
})

var weixinpic = {
	tolocalStorage : function () {
		signature = $("#signature").val();
		openid = $("#openid").val();
		flag = $("#flag").val();
		appid = $("#appid").val();
		plateNo = $("#plateNo").val();
		localStorage.setItem("flag", flag);
		localStorage.setItem("openid", openid);
		localStorage.setItem("plateNo", plateNo);
	},
}
export default weixinpic;
