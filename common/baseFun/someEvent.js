import React from 'react'
//import SmallFun from './smallFunction'
import $ from "jquery";
export var touchStart=(e,t)=>{
    e.stopPropagation();
    e.currentTarget.style.top=e.currentTarget.offsetTop+'px';
    e.currentTarget.style.transition='top 0s'
    var nowTop=e.currentTarget.style.top;
    let startX=e.touches[0].clientX;let startY=e.touches[0].clientY;
    t.setState({old:{startX:startX,startY:startY,Top:nowTop,nowTime:(new Date()).valueOf()}})
    t.state.onStart && t.state.onStart(nowTop)
}

export var touchMove=(e,t)=>{
    e.stopPropagation();e.preventDefault();
    const old = t.state.old;
    var moveX=e.touches[0].clientX;var moveY=e.touches[0].clientY;
    var distX=moveX-old.startX,distY=moveY-old.startY,newTop=parseFloat(old.Top || 0);
    var top=e.currentTarget.offsetHeight-e.currentTarget.parentElement.offsetHeight;

    /*
    * 出现左右滑动大于上下滑动则终止上下滑动，
    * 上下滑动大于左右滑动终止左右滑动
    * */
    if((newTop+distY)>=0){
        e.currentTarget.style.top='0px';
        t.state.onTop && t.state.onTop((newTop+distY),e);
        //t.state.onMove && t.state.onMove(distY,'top');
        //下拉实现
    }else if(-top>=(newTop+distY) || top==0){
        e.currentTarget.style.top=-top+'px';
        t.state.onBottom && t.state.onBottom((newTop+distY)+top,e);
        //t.state.onMove && t.state.onMove(distY,'bottom');
        //上拉实现
    }else{
        //t.state.onMove && t.state.onMove(distY);
        e.currentTarget.style.top=(newTop+distY)+'px';
    }
}
export var touchEnd=(e,t)=>{
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
        t.state.onMove && t.state.onMove(distY,e.currentTarget.offsetTop);
        //下拉加速
    }else if(distY<0 && sd <-300){
        t.state.onMove && t.state.onMove(distY,e.currentTarget.offsetTop);
        e.currentTarget.offsetTop+sd <=-top
            ? e.currentTarget.style.top=-top+'px': e.currentTarget.style.top=(e.currentTarget.offsetTop+sd) +'px';
        //上拉加速
    }else{
        t.state.onMove && t.state.onMove(distY,e.currentTarget.offsetTop);
    }
}
/*ajax */
export var ajaxEvent=(e,t)=>{
    $.ajaxSetup({
        beforeSend:(xhr)=>{
            return;
            !(t.state.PromptData && t.state.PromptData.loading) ? t.setState({PromptData:{loading:true}}):''
        }
    });
    $( document ).ajaxSuccess(( event, request, settings )=>{
        var url='/server/fonts';
        console.log(settings.url,'//',settings.url.split('?')[0])
        if(url != settings.url.split('?')[0] && !settings.url.split('/server/fonts')[1]){
            switch(settings.url.split('?')[0]){
                case "/server/BQXX":
                    //$('.brandItem').attr('id','brandItem')
                    //SmallFun.getFonts('PingFangRegular','#brandItem');
                    break;
                case "/lexiugo-app/weixin/getPushTaskList":
                    //SmallFun().getFonts('PingFangRegular','.recordList');
                    break;
                default:
                    //SmallFun.getFonts('PingFangRegular','#appWrapper');
            }
        }
        return;
        t.state.PromptData && t.state.PromptData.loading && t.setState({PromptData:{}})
    });
    $(document).ajaxError(()=>{
        return;
        t.state.PromptData && t.state.PromptData.loading && t.setState({PromptData:{}})
    });
}
/*修改微信头部*/
export var ChangeTitle=(text)=>{
    var $body = $('body');
    document.title = text;
    var $iframe = $("<iframe src="+require('../../newBuild/src/img/left_black.png')+" style='display:none;'></iframe>");
    $iframe.on('load',function() {
        setTimeout(function() {
            $iframe.off('load').remove();
        }, 0);
    }).appendTo($body);
}
//*获取用户信息*//
export const GetUserInfo=(t)=>{
    $.post('/lexiugo-app/weixin/reFreshUserInfo',{},(data)=>{
        if(!data.data)return;
        var datas=t.state.user.data
        datas.LxAqYhxxb=data.data.LxAqYhxxb
        datas.JsonIntegral =data.JsonIntegral
        t.setState(datas,()=>{
            t.setState({OK:true})
        });
    })
}
export default {touchStart,touchMove,touchEnd,ajaxEvent,ChangeTitle,GetUserInfo}