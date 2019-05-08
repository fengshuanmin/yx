import React from 'react';
import $ from 'jquery';
var vxConfig = {
        getSignature:(T)=> {
            /*$.post('/server/getSignature',{url:window.location.href},(msg)=>{
                vxConfig.redyWXconfig(msg);
                T.setState({
                    wxConfig:msg
                })
                localStorage.setItem("openid", msg.openid);
                localStorage.setItem("plateNo", msg.plateNo);
                localStorage.setItem("flag", msg.flag);
            })*/
            console.log(window.location.search)
            console.log(window.location.href)
            $.ajax({
                url: "/lexiugo-app/weixin/getSignature" + window.location.search,
                data: 'url=' + encodeURIComponent(window.location.href),
                dataType: "json",
                success: (msg)=>{
                    vxConfig.redyWXconfig(msg);
                    console.log(msg)
                    T.setState({
                        wxConfig:msg
                    })
                    localStorage.setItem("openid", msg.openid);
                    localStorage.setItem("plateNo", msg.plateNo);
                    localStorage.setItem("flag", msg.flag);
                },
                error:(xhr, status, err)=>{
                    //console.error(this.props.url, status, err.toString());
                }
            });
        },
    redyWXconfig:(obj)=>{
        wx.config({
            debug : false,
            appId :obj.appid,// 微信appid
            timestamp : obj.timestamp,// 时间戳
            nonceStr : obj.noncestr,// 随机数
            signature : obj.signature,// 签名,
            jsApiList : [
                'chooseImage',
                'uploadImage',
                'getLocation',
                'openLocation',
                'checkJsApi',
                'checkJsApi',
                'previewImage',
                'scanQRCode'
            ]
        })
        //隐藏右上角菜单接 口
        wx.hideOptionMenu();
    }
}
export default vxConfig
