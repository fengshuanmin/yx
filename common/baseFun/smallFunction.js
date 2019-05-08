import $ from 'jquery'
import React from 'react'
import verification from './verification'
var mtb=function(t){
        var dmts=(function() {
            return {
                //时间戳转时间格式
                timeString: (nS, i) => {
                    if (!nS) return;
                    var dat = new Date(nS)
                    var year = dat.getYear() + 1900;
                    var month = (dat.getMonth() + 1)<9 ? '0'+(dat.getMonth() + 1) : (dat.getMonth() + 1);
                    var date = dat.getDate() <9 ? '0'+dat.getDate() : dat.getDate();
                    var hour = dat.getHours() <9 ? '0'+dat.getHours():dat.getHours();
                    var minute = dat.getMinutes() <9 ? '0'+dat.getMinutes():dat.getMinutes();
                    var second = dat.getSeconds()<9 ? '0'+dat.getSeconds():dat.getSeconds();
                    switch (i) {
                        case 'y-m-d':
                            return year + "-" + month + "-" + date
                            break;
                        case 'y-m-d h:m:s':
                            return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
                            break;
                        case 'h:m:s':
                            return hour + ":" + minute + ":" + second;
                            break
                        default:
                            return year + "." + month + "." + date
                    }

                },
                //获取url参数
                getQuery: (action) => {
                    var reg = new RegExp("(^|&)" + action + "=([^&]*)(&|$)");
                    var r = window.location.search.substr(1).match(reg);
                    var actionViue = unescape(r[2]);
                    return actionViue
                },
                //获取ziti信息
                getFonts: (fontName, fromevent, events) => {
                    var $events = events || '#appWrapper'
                    $.post('/server/fonts', {data: $(fromevent).text(), fontStyle: fontName}, (dat) => {
                        var paths = dat.path, fontUrl = ''
                        if (location.hostname == 'localhost' || location.hostname == '127.0.0.1') {
                            fontUrl = location.hostname + ':8099'
                        } else {
                            fontUrl = location.hostname
                        }
                        var vurl = 'http://' + fontUrl + '/server/fonts/' + dat.path + '/' + dat.font
                        var style = '' +
                            '<style class="mdbsc">' +
                            '@font-face {\n' +
                            '    font-family: ' + dat.fontFamily + ';\n' +
                            '    src: url("' + vurl + '.eot"); /* IE9 */\n' +
                            '    src: url("' + vurl + '.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */\n' +
                            '    url("' + vurl + '.png") format("woff"), /* chrome, firefox */\n' +
                            '    url("' + vurl + '.ttf") format("truetype"), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */\n' +
                            '    url("' + vurl + '.svg#AaGuiQi") format("svg"); /* iOS 4.1- */\n' +
                            '    font-style: normal;\n' +
                            '    font-weight: normal;\n' +
                            '}' +
                            '</style>'
                        $.get(vurl + '.png', function () {
                            $('head').append(style).append(
                                // "<link id='idset' rel='stylesheet' href='http://"+location.hostname+":8099/server/fonts/"+dat.path+"/"+dat.font+".css'></link>"
                                //'<script> setTimeout(function(){document.getElementById("'+$events+'").style.fontFamily="'+dat.fontFamily+'";},500);' +
                                '<script>_$("' + $events + '").css({fontFamily:"' + dat.fontFamily + '"});' +
                                'var glabData={};' +
                                'setTimeout(function(){},10000)' +
                                '</script>'
                            );
                        });

                        $('body').append(
                            '<div/><span/><p/>'
                        )
                    })
                },
                //提示信息
                promptInfo: (data,fun) => {
                    t.setState({PromptData: data || {}},()=>{
                       fun && fun()
                    })
                },
                ajax:(data)=>{
                    try {
                        data.loading && this.state.promptInfo({loading: true});
                        var ajaxTimeoutTest = $.ajax({
                            url: data.url,
                            data: data.data || {},
                            dataType: data.dataType ||"json",
                            type:data.type ||'post',
                            success: (msg)=>{
                                if(data.loading){
                                    this.state.promptInfo({loading: false},()=>{
                                        data.suc && data.suc(msg);
                                    })
                                }else{
                                    data.suc && data.suc(msg);
                                }
                            },
                            complete : (XMLHttpRequest,status)=>{ //请求完成后最终执行参数
                                if(status=='timeout'){//超时,status还有success,error等值的情况
                                    data.loading && this.state.promptInfo({loading: false});
                                    ajaxTimeoutTest.abort();
                                    this.setState({dataErr:'请求超时，您可能处于网络不稳定状态！'})
                                }
                            },
                            error:(xhr, status, err)=>{
                                data.loading && this.props.promptInfo({loading: false});
                                this.setState({dataErr:'网络异常，请检查网络！'})
                            }
                        })
                        return ajaxTimeoutTest
                    }catch (e){
                        this.setState({dataErr:'未知异常！'})
                    }
                },
                carSelect:(v,ty,fun,obj)=>{
                    var u=['/brand/getBrandCode/','/family/getFamilyBrandId/','/group/getGroupFamilyId/',"/vehicle/getVehicleGroupId/"]
                    var t=[v,'brandId','familyId','groupId']
                    ty < 4 ?this.state.ajax({
                        loading:true,
                        data:{data:u[ty||0]+''+(ty==0? v : v[t[ty]])},
                        url:'/server/BQXX',
                        suc:(dat)=>{
                            if(dat.error_code=='000000'){
                                var next=(
                                    <div style={{
                                        position:'absolute',top:'100%',width:'100%',height:'5rem',overflow:'hidden',zIndex:199,left:'0',background:'#fff',
                                        boxShadow: '-1px 1px 12px #D0C3C3'
                                    }}>
                                    <ul onTouchState={(e)=>this.state.touchStarts(e,this)}
                                        onTouchMove={(e)=>this.state.touchMoves(e,this)}
                                        onTouchEnd={(e)=>this.state.touchEnds(e,this)}
                                        style={
                                            {
                                                overflow:'hidden',position:'relative',minHeight:'100%',padding:'0.2rem',

                                            }
                                        }>
                                        {dat.result.map((item,index)=>{
                                            return (
                                                <li style={{padding:'0.2rem'}} onClick={()=>{this.state.carSelect(item,ty+1,fun)}}>{item.brandName || item.familyAbbr || item.groupName || item.vehicleName}</li>
                                            )
                                        })}
                                    </ul>
                                    </div>
                                )
                                fun && fun(next,ty,v,dat.result);
                            }
                        }
                    }):(fun && fun('',ty,v))
                },

                touchStarts:(e,t)=>{
                    e.stopPropagation();
                    e.currentTarget.style.top=e.currentTarget.offsetTop+'px';
                    e.currentTarget.style.transition='top 0s'
                    var nowTop=e.currentTarget.style.top;
                    let startX=e.touches[0].clientX;let startY=e.touches[0].clientY;
                    t.setState({old:{startX:startX,startY:startY,Top:nowTop,nowTime:(new Date()).valueOf()}})
                    t.state.onStart && t.state.onStart(nowTop)
                },

                touchMoves:(e,t)=>{
                    console.log(t.state.old)
                    e.stopPropagation();e.preventDefault();
                    const old = t.state.old;
                    var moveX=e.touches[0].clientX;var moveY=e.touches[0].clientY;
                    var distX=moveX-old.startX,distY=moveY-old.startY,newTop=parseFloat(old.Top || 0);
                    var top=e.currentTarget.offsetHeight-e.currentTarget.parentElement.offsetHeight;

                    /*
                    * 出现左右滑动大于上下滑动则终止上下滑动，
                    * 上下滑动大于左右滑动终止左右滑动
                    * */
                    console.log(newTop)
                    console.log(distY)
                    console.log(newTop+distY)

                    if((newTop+distY)>=0){
                        console.log("aaaaa")
                        e.currentTarget.style.top='0px';
                        t.state.onTop && t.state.onTop((newTop+distY),e);
                        //下拉实现
                    }else if(-top>=(newTop+distY) || top==0){
                        console.log("bbbbbb")
                        console.log(-top)
                        e.currentTarget.style.top=-top+'px';
                        t.state.onBottom && t.state.onBottom((newTop+distY)+top,e);
                        //上拉实现
                    }else{
                        console.log("ccccc")
                        e.currentTarget.style.top=(newTop+distY)+'px';
                    }
                },
                touchEnds:(e,t)=>{
                    e.currentTarget.style.transition='top 0.9s ease-out';/*
    e.currentTarget.style.transitionTimingFunction='cubic-bezier(0,0,0.25,1)'*/
                    const old = t.state.old
                    const timeC=(new Date()).valueOf()-old.nowTime;
                    t.state.onEnd && t.state.onEnd()
                    var endX=e.changedTouches[0].clientX,endY=e.changedTouches[0].clientY;
                    var distX=endX-old.startX,distY=endY-old.startY,newTop=parseFloat(old.Top || 0);
                    var top=e.currentTarget.offsetHeight-e.currentTarget.parentElement.offsetHeight;
                    var sd=distY/timeC*1000;
                    if(distY>0 && sd >1000){
                        e.currentTarget.offsetTop+sd >=0
                            ? e.currentTarget.style.top='0px': e.currentTarget.style.top=(e.currentTarget.offsetTop+sd) +'px';
                        //下拉加速
                    }else if(distY<0 && sd <-300){
                        e.currentTarget.offsetTop+sd <=-top
                            ? e.currentTarget.style.top=-top+'px': e.currentTarget.style.top=(e.currentTarget.offsetTop+sd) +'px';
                        //上拉加速
                    }
                },

                //wx上传照片
                wxUpdata: (num, fun, tf) => {//tf 布尔值，true 直接上传到微信，false不直接上传
                    wx.chooseImage({
                        count: num, // 默认9
                        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: [''], // 可以指定来源是相册还是相机，默认二者都有
                        success: (res) => {
                            if (res.errMsg == 'ok' || res.errMsg == 'chooseImage:ok') {
                                var localIds = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                                !tf ? this.state.updataImg(res.localIds, fun || null) : fun(res.localIds);
                            } else {

                            }
                        }
                    });
                },
                updataImg: (loc, fun, i) => {
                    if (i <= 0 || !i) {
                        i = 0
                    }
                    var local = loc[i];
                    wx.uploadImage({
                        localId: loc[i], // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: (res) => {
                            fun && fun(local, res.serverId,(i < loc.length - 1));
                            if (i < loc.length - 1) {
                                i++
                                this.state.updataImg(loc, fun, i);
                            }
                        },
                        fail: function (res) {
                            alert('上传失败，请重新上传！');
                        }
                    });
                },

                Socket: (dat, fun) => {
                    var ws = new WebSocket("ws://172.16.1.58:8181");
                    ws.onopen = function (e) {
                        console.log('Connection to server opened');
                    }
                    ws.send(dat);
                    ws.onmessage = function (e) {
                        fun && fun(e.data)
                    };
                },

                //数据校验
                verification:(type,data)=>{
                    var text='',isTrue=true
                    switch(type){
                        case 'phone':
                            if(data==''){
                                text='手机号码尚未填写！'
                                isTrue=false;
                            }else if(!(/^1[34578]\d{9}$/.test(data))){
                                text='手机号码格式有误！'
                                isTrue=false;
                            }
                            break;
                        case 'plateNo':
                            var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
                            if(false){//!(express.test(data))
                                text='车牌号填写错误！'
                                isTrue=false;
                            }else if(data==''){
                                text="车牌号尚未填写"
                                isTrue=false;
                            }
                            break;
                        case 'vin':
                            if(!data){
                                text="请输入车架号"
                                isTrue=false;
                            }
                            if(!verification.vin(data) && data){
                                text="车架号格式错误"
                                isTrue=false;
                            }
                            break;
                        default:
                            if(data=='' || !data){
                                text="不能为空"
                                isTrue=false;
                            }
                    }
                    this.state.promptInfo({content:text,Prompt:true})
                    return {code:text,isTrue:isTrue}
                },

                //共用提示语
                ErrorShow:(obj)=>{
                    var dom;
                    switch (obj.type){
                        case 'p':
                            dom=<p style={{textAlign:'center',lineHeight:'50px',background:'#f3f3f3',padding:'0.2rem'}}>{obj.content}</p>
                            break;
                        case 'zanwu':
                            dom=<div style={{display:'flex',height:'50vh', flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                                <img src={require('../images/zanwu.png')} style={{width:'50vw'}} alt=""/>
                                <span>{obj.content}</span>
                            </div>
                            break;
                        case 'baseLi':
                            dom=<this.state.BaseLi data={[{key:obj.content}]}/>
                    }
                    return dom
                },

                //遍历dom
                mapDom:(e)=>{
                    let isChild=false;
                    let node=e.target;
                    while(node){
                        if(node==this.refs.SelectBottom){
                            isChild=true;
                            break;
                        }
                        node=node.parentNode;
                    }
                    if(!isChild){
                        this.setState({
                            showYXZ:false
                        })
                    }
                }
            }
        }.bind(t))()
        for(var y in dmts){
            dmts[y].bind(t)
        }
        return dmts
}
export default mtb;