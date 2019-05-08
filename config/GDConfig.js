import React from 'react';
import $ from "jquery"
require('../common/css/map.css')
var GDMap= {
    lStyle:(a,tb)=>{
        console.log(tb)
        var i="";
        switch(tb){
            case '透明':
                tb=require('../newBuild/src/img/touming.png');
                break;
            case '车商':
                tb=require('../newBuild/src/img/cs.png');
                break;
            default:
                tb=require('../newBuild/src/img/touming.png');

        }
        /*if(a != 'I' && a != 'CXLC' && a != 'SXLC' && a!= 'new'){
            i=a;/!*a="CXLC"*!/
            a=require('../newBuild/src/img/CXLC.png')
        }else{
            a=require('../newBuild/src/img/'+a+'.png')
        }*/
        //a=(typeof(a)== "number")
        /*var j=parseInt(a);
        if(typeof j == "number"){
            i=a;a='CXLC'
        }else{
            i='';a=''
        }*///SXLC
        var ico='<div class="amap-icon ico'+a+'" style="position: absolute; width: 22px; height: '+22*55/44+'px; opacity: 1;">' +
            '<img src="'+tb+'" style="width: 22px; top: 0px; left: 0px;">' +
            /*'<span class="icoSpan" style="width:22px;line-height:'+22*55/44+'px;text-align:center;position:absolute;left:0px;top:0px;color:#fff;">'+i+'</span>' +*/
            '</div>'
        return ico;
    },
    addScript:(T)=>{
        $('script.map').remove();
        var newScript =document.createElement('script');
        newScript.type='text/javascript';
        newScript.className='map';
        newScript.src="http://webapi.amap.com/maps?v=1.4.3&key=d8602031080ab3ed46ff5eaaf092619c&callback=init";
        var jsDom=document.getElementById('appWrappers') || document.getElementById('appWrapper')
        $('body').append(newScript);
        T=='iframe' ? $('body',window.parent.document).append(newScript) :$('body').append(newScript);
    },
    NewMap:(id)=>{
        var map = new AMap.Map(id  ? id : 'container', {
            resizeEnable: true,
            center: [121.489638, 31.217761],
            zoom: 9999
        });
        return map;
    },
    //自定义图标
    NewMarker:(map,data,i,fun)=>{
        console.log('单独',data)
        var Tags=[],tb=''
        for(var m in data.xlcTags){
            Tags.push(data.xlcTags[m].tagName)
        }
        for(var n in Tags){
            if(Tags[n].indexOf('透明')){
                tb='透明'
            }else if(Tags[n].indexOf('车商')){
                tb='车商'
            }else{
                tb='其他'
            }
        }
        if(!data.position ||  !data.position[0])return;
        var marker = new AMap.Marker({ //添加自定义点标记
            map: map,
            position: data.position || [0,0], //基点位置
            offset: new AMap.Pixel(0,0), //相对于基点的偏移位置
            content:GDMap.lStyle(i,tb),
            draggable: false,  //是否可拖动
            index:0
            //content: '<div class="marker-route marker-marker-bus-from">111</div>'   //自定义点标记覆盖物内容
        });
        AMap.event.addListener(marker, 'click', function() {
            //GDMap.openInfoWindow(data,map);
            if(fun){
                data.marker=marker;
                fun(data);
            }
        });
        return marker
    },
    //打开信息窗口
    openInfoWindow:(data,map)=>{
        GDMap.InfoWindow(data).open(
            map,data.position
        )
    },
    //信息窗口
    InfoWindow:(data,map)=>{
        var InfoWindow = new AMap.InfoWindow({
            isCustom: true,  //使用自定义窗体
            content: '<div>'+data.name +'</div>',
            offset: new AMap.Pixel(0, 0)
        });
        return InfoWindow;
    },
    //修改中心点
    changeCenterPoint:(map,location)=>{
        map.setZoomAndCenter(18, location);//修改坐标
        this.mapGOut(m.position);//
        GD.openInfoWindow(m,map);//展开坐标点信息
    },
    //拖动地图松手调用
    moveEnd:(map)=>{
        return AMap.event.addListener(map,"dragend", function(e) {
            alert();
        });
    }
}
export default GDMap