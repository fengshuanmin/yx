import React from 'react';
import $ from 'jquery';

var signature, openid, flag, appid, plateNo;
$(function() {
	wx.config({
		debug : false,
		appId : appid,// 微信appid
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
		//localStorage.setItem("flag", "0");
		//localStorage.setItem("openid", "weibosb");
		//localStorage.setItem("plateNo", "冀A0000001");
	},
}
export default weixinpic;

