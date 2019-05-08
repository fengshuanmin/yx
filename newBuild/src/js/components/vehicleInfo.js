/**
 * Created by Administrator on 2016/8/26 0026.
 */
import React from 'react';
import $ from "jquery"
import GD from "../../../../config/GDConfig"
import ChangeTitle from '../../../../common/baseFun/someEvent'
const  VehicleInfo= React.createClass({
    getInitialState() {
        return{
            XLCList:[],
            map:null,
            oneDat:[],
            markers:[],
            newMarker:false
        }
    },
    componentDidMount(){

        const _this=this;
        GD.addScript();//加载高德sdk
        window.init = ()=>{
            var map = new AMap.Map('container', {
                resizeEnable: true,
                zoom: 12
            });

            _this.setState({map:map})//存储map对象
            /*var arr=[
                {
                    libName:'云端修理厂南天门店',
                    name:'云端修理厂南天门店',
                    agree:'天宫凌霄宝殿西侧20里',
                    msg:'我们只修宝马',
                    position:[121.489638, 31.217761],
                    img:'http://www.toumingxiuche.cn/toumingxiu/resource/img/repair.jpg',
                    imgList:[
                        'http://www.toumingxiuche.cn/toumingxiu/resource/img/repair.jpg',
                        'http://www.toumingxiuche.cn/toumingxiu/resource/img/repair.jpg',
                        'http://www.toumingxiuche.cn/toumingxiu/resource/img/repair.jpg',
                    ]
                },
                {
                    libName:'云端修理厂凌霄宝殿店',
                    name:'云端修理厂凌霄宝殿店',
                    agree:'天宫凌霄宝殿西侧20里',
                    msg:'我们只修宝马',
                    position:[121.589638, 31.217761],
                    img:'http://www.toumingxiuche.cn/toumingxiu/resource/img/repair.jpg',
                    imgList:[
                        'http://www.toumingxiuche.cn/toumingxiu/resource/img/repair.jpg',
                        'http://www.toumingxiuche.cn/toumingxiu/resource/img/repair.jpg',
                        'http://www.toumingxiuche.cn/toumingxiu/resource/img/repair.jpg',
                    ]
                }
            ]*/
            //plugin插件

            map.plugin(["AMap.Autocomplete"],function() {
                return;
                var autoOptions = {
                    input: "selectAdress"
                };
                var auto = new AMap.Autocomplete(autoOptions);//注册查询列表功能
                //这里有点问题

                AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发

                function select(e) {
                    console.log(e);
                    if(!e.poi || !e.poi.location){
                        alert('请选择详细地址')
                        return;
                    }
                    e.poi.position=[e.poi.location.lng || 121.589638,e.poi.location.lat || 31.217761];
                    var Marker=_this.state.newMarker;
                    if(!Marker){
                        Marker= GD.NewMarker(map,e.poi,'new',function(m){
                        });
                    }else{
                        Marker.setPosition(e.poi.position);
                    }
                    e.poi.marker=Marker;
                    GD.openInfoWindow(e.poi,map);
                    _this.setState({newMarker:Marker})
                    //markers.push(Marker)
                    map.setZoomAndCenter(12, e.poi.position)

                    _this.getXLC(e.poi.position,()=>{//555555555555555555555555555555
                        _this.mapGOut(e.poi.position);
                    });
                }
            })


            _this.getLocation(function(a){

                map.setZoomAndCenter(12, a);

                GD.NewMarker(map,{position:a,msg:'我的位置',name:'我的位置'},'I',function(m){
                    _this.changeCenterPoint('I',m)
                });
                _this.getXLC(a,()=>{
                    _this.setState({newPosthion:a})
                    _this.mapGOut(a);
                });

            });

        }
    },
    touchStart(m,e){

        $('.XLCList').css({transition:'height 0ms'});
        console.log(e.target.className);
        var oneData=this.state.oneDat;
        oneData[1]=false;
        this.setState({oneDat:oneData})
        const startX=e.touches[0].clientX;
        const startY=e.touches[0].clientY;
        var startHeight=$('.XLCList').height();
        this.setState({startClient:{startX:startX,startY:startY,startHeight:startHeight}});
        console.log(startX,startY);
    },
    touchMove(m,e){
        e.preventDefault();e.stopPropagation();
        var startY=this.state.startClient.startY;
        var startHeight=this.state.startClient.startHeight;
        var moveX=e.touches[0].clientX,moveY=e.touches[0].clientY;
        var cha =startY-moveY;
        $('.XLCList').height((cha)+startHeight);
        console.log(moveY,'xxx',moveY-startY)
        return false;
    },
    getXLC(a,fun){

        var map=this.state.map;
        if(this.state.markers[0]){
            map.remove(this.state.markers);
        }
        setTimeout(()=>{
            var imglist={
                /*jgdm:"机构代码图片名称",
               yyzz:"营业执照图片存放位置",
               wxzz:"维修资质图片存放位置",*/
                appearancePhoto:"外观正面照",
                maintenanceSitePhoto:"维修场地",
                paintRoomPhoto:"漆房",
                receptionRoomPhoto:"接待室",
                restRoomPhoto:"休息室",
            }
            var jsons={
                freeWash:"免费洗车",
                freeDetection:"免费车辆检测",
                freeGlasswater:"免费玻璃水",
                accidentRescue:"事故车救援",
                expeditedService:"代办年检",
                wheelPosition:"四轮定位",
                engineMaintenance:"发动机小保养",
                maintenanceVehicleTransfer:"维修车辆接送",
                discountedHours:"工时打折优惠",
                carService:"代步车服务",
                smallcasesFreemaintenance:"小额案件免费维修",
                otherServices:"其他特色服务",
            }
            var locat=this.props.location ? this.props.location.state.isYY : false
            $.post('/lexiugo-app/skyNet/getSkyNetMapInfo',{
                lat:a[1],lon:a[0],
                ...((!locat) ? {
                    xlcRepairLevel:this.props.xlcRepairLevel,
                    brandCode:this.props.types.brandCode,
                    brandName:this.props.types.brandName
                }:{})},(data)=>{
                for(var i in data.xlcSkyNetVoList){
                    data.xlcSkyNetVoList[i].fwList=[];
                    data.xlcSkyNetVoList[i].imglist=[];
                    var fwdata=data.xlcSkyNetVoList[i].addedKinds ? data.xlcSkyNetVoList[i].addedKinds.split(',') : []
                    for(var j=0;j<fwdata.length;j++){
                        data.xlcSkyNetVoList[i].fwList.push([fwdata[j],''])
                    }
                    for(var m in imglist){
                        for(var j in data.xlcSkyNetVoList[i]){
                            if(m==j && data.xlcSkyNetVoList[i][m]){
                                data.xlcSkyNetVoList[i].imglist.push([data.xlcSkyNetVoList[i][m],imglist[m]]);
                            }
                        }
                    }
                    console.log(data.xlcSkyNetVoList[i].imglist);
                }
                var XLCList =this.htmlList(data.xlcSkyNetVoList);
                this.setState({XLCList:XLCList},()=>{
                    $('.XLCList').slideDown()
                    var startX,startY,
                        OveHeight=$('.XLCList li').eq(0).outerHeight(true) || 0;/*+$('.XLCList li').eq(1).outerHeight(true)*/
                    $('.XLCList').height(OveHeight);
                    var offSet=$('.XLCList').offset().top;
                    this.setState({OveHeight:OveHeight,offSet:offSet},()=>{
                        fun();
                    });
                })
            })
        },500)
    },
    htmlList(arr){
        var XLCList=[]
        var map = this.state.map;
        var markers=[]
        if(arr.length<=0){
            XLCList.push(
                <li style={{textAlign:'center',lineHeight:'1rem',color:'#555'}}>该区域没有合适修理厂</li>
            )
        }
        for(var i in arr){
            var j=i*1+1;
            arr[i].position=[arr[i].longitude ||0 ,arr[i].latitude || 0]
            arr[i].marker=GD.NewMarker(map,arr[i],(i*1+1),(m)=>{
                this.changeCenterPoint(m)
            });
            markers.push(arr[i].marker)
            var fwHtml=[];
            for(var j in arr[i].fwList){
                fwHtml.push(<span key={j}>{arr[i].fwList[j][0]}</span>);
            }
            XLCList.push(
                <li key={i}  onTouchEnd={this.touchEnd.bind(null,arr[i])}>
                    <div className="thTop">
                        <div className="leftD">
                            <h4><span>{(i*1+1)}</span>{arr[i].shotName}</h4>
                            <p className="adress">{arr[i].tmxDistance > 1000 ? parseInt(arr[i].tmxDistance/100)/10+'km': arr[i].tmxDistance+'m'} |{arr[i].addr}</p>
                            <p className="xing"><span style={{width:(4)*20+'%'}}></span></p>
                        </div>
                        <div className="img">
                            <img src={"/toumingxiu/jyshowPhoto/getUrl.do?photoUrl="+arr[i].appearancePhoto} alt=""/>
                        </div>
                    </div>
                    <div className="ZZFW">
                        {fwHtml}
                    </div>
                </li>
            )
        }
        console.log(markers)
        this.setState({markers:markers});
        return XLCList
    },
    touchEnd(m,e){
        var map=this.state.map;
        var ti=0;
        for(var j=0;j<$('.XLCList > ul>li').length;j++){
            ti+=$('.XLCList ul > li').eq(j).outerHeight(true);
        }
        if($('.XLCList').height() >ti){
            $('.XLCList').height(ti);
            return;
        }
        console.log(ti,$('.XLCList ul>li').length);
        var startY=this.state.startClient.startY;
        var endX=e.changedTouches[0].clientX,endY=e.changedTouches[0].clientY;
        var cha =startY-endY,newOffSet=$('.XLCList').offset().top;
        var offCha=newOffSet-this.state.offSet;
        console.log('startY',startY,'endy',endY,cha,'jjj',startY);
        $('.XLCList').css({transition:'height 400ms'});
        if(this.state.oneDat[0]){
            $('.STXLC span').css({transition:'top 400ms',top:'0.35rem'});
        }
        if($('.XLCList').height() < ti && $('.XLCList').height() > $('.XLCList').parent().height()){
            if(cha != 0){
                return;
            }
        }
        var position=[];
        if(offCha<0){
            if(cha>5){
                $('.XLCList').css({height:'100%'});
                if(this.state.oneDat[0]){
                    $('.STXLC span').css({transition:'top 400ms',top:'0.35rem'});
                }
            }else if(cha<-5){
                $('.XLCList').css({height:this.state.OveHeight+20});
                this.state.oneDat[2] ? position=this.state.oneDat[2].position :position=this.state.newPosthion;
                map.setZoomAndCenter(10, position)
                this.mapGOut(position)
            }else{
                !m ? this.Choice(m,e) :this.changeCenterPoint(m,this);
            }
        }else if(offCha>0){
            if(cha>5){
                $('.XLCList').css({height:this.state.OveHeight});
                this.state.oneDat[2] ? position=this.state.oneDat[2].position :position=this.state.newPosthion;
                //map.setZoomAndCenter(10, position)
                //this.mapGOut(position)
            }else if(cha<-5){
                $('.XLCList').css({height:'50px'})
                this.state.oneDat[2] ? position=this.state.oneDat[2].position :position=this.state.newPosthion;
                //map.setZoomAndCenter(10, position)
                //this.mapGOut(position)
            }else{
                !m ? this.Choice(m,e) :this.changeCenterPoint(m,this);
            }
        }else{
            !m ? this.Choice(m,e) :this.changeCenterPoint(m,this);
        }
    },
    //选择数据
    Choice(m,e){
        switch(e.target.className){
            case 'STXLCBUTTON':
                m =this.state.oneDat[2] || {};
                this.props.Choice(m,null)
                break;
            case 'DH':
                m =this.state.oneDat[2] || {};
                //打開導航
                wx.openLocation({
                    latitude: m.position[1]*1, // 纬度，浮点数，范围为90 ~ -90
                    longitude: m.position[0]*1, // 经度，浮点数，范围为180 ~ -180。
                    name: m.name, // 位置名
                    address: m.addr, // 地址详情说明
                    scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
                });
                break;
            case 'showImages':
                m=this.state.oneDat[2] || {};
                var index=parseInt(e.target.getAttribute("data-index"));
                this.showImg(m.showImg,index,null)
                break;
            case 'LX':
                m=this.state.oneDat[2] || {};
                window.location.href="tel:"+m.tel;
                break;

        }
    },
    //修改中心坐标
    changeCenterPoint(m,e){
        var map=this.state.map;//提取map对象
        if(e=="I"){
            map.setZoomAndCenter(12, m.position);//修改中心坐标
        }else{
            map.setZoomAndCenter(12, m.position);//修改中心坐标
        }
        setTimeout(()=>{
            var markersList=this.state.markers
            for(var t in markersList){
                if(markersList[t] != m.marker){
                    markersList[t] && markersList[t].setContent(GD.lStyle(t*1+1));
                }
            }
            e=='I'? '':m.marker.setContent(GD.lStyle('SXLC'));//修改map    sdfsdf
            var newList=[];
            var fwHtml=[];
            for(var j in m.fwList){
                fwHtml.push(<span>{m.fwList[j][0]}</span>);
            }
            var imgList=[];m.showImg=[]
            for(var j in m.imglist){
                imgList.push(
                    <li key={j}>
                        <img className="showImages" data-index={j} src={"/toumingxiu/jyshowPhoto/getUrl.do?photoUrl="+m.imglist[j][0]} alt="1"/>
                    </li>);
                m.showImg.push(m.imglist[j][0])
            }
            var locat=this.props.location ? this.props.location.state.isYY : false
            newList[0]=(
                <li key="j" className="details">
                    <div className="boxAgo">
                        <div className="thTop mtB">
                            <div className="leftD ">
                                <h5 className="AllTitle">{m.shotName}</h5>
                                <p className="adress">{m.tmxDistance > 1000 ? parseInt(m.tmxDistance/100)/10+'km': m.tmxDistance+'m'} | {m.addr}</p>
                                <p className="xing"><span style={{width:(4)*20+'%'}}></span></p>
                            </div>
                            {(!locat)&& <div className="STXLC"><span className="STXLCBUTTON">选这家</span></div>}
                        </div>
                        <div className="call">
                            {navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1 ?<span className="DH">导航</span>:<span className="DH">导航</span>}
                            <span className="LX">联系</span>
                        </div>
                    </div>
                    {fwHtml[0]? <div className="ZZFWBox boxAgo">
                        <h5 className="AllTitle">增值服务</h5>
                        <div className="ZZFW">
                            {fwHtml}
                        </div>
                    </div> : ''}
                    {imgList[0] ?<div className="XLCImgList boxAgo">
                        <h5 className="AllTitle">照片</h5>
                        <div>
                            <ul>
                                {imgList}
                            </ul>
                        </div>
                    </div>:''}
                </li>
            )
            this.setState({oneDat:newList},()=>{
                this.mapGOut(m.position,13);//地图位移到指定高度
                var cList=this.state.oneDat;
                cList[2]=m;
                this.setState({oneDat:cList})
                $(".XLCList").height($('.boxAgo').eq(0).outerHeight(true))
            })
        },500)
    },
    //地图坐标平移
    mapGOut(a,lp){
        var mj=[a[0],a[1]]
        setTimeout(()=>{
            var map=this.state.map;
            // var ll = map.containTolnglat(new AMap.Pixel(0, 0));//获取地图坐标位置
            //map.panTo([ ll.getLng(),ll.getLat()]);
            var mtop=($('.XLCList').offset().top-$('.GDMapStyle').offset().top)/2;
            var mleft=$('.XLCList').width()/2;
            //期望显示的坐标
            var  toD = map.containTolnglat(new AMap.Pixel(mleft, mtop));
            mj[1]=a[1]-((toD.getLat()*10000-a[1]*10000)/10000)
            map.setZoomAndCenter(lp || 12, mj);
        },300)
    },
    //使用微信获取当前坐标
    getLocation(fun){

        wx.getLocation({
            success: function (res) {
                fun([res.longitude,res.latitude])
            },
            cancel: function (res) {
            }
        });
    },
    showImg(obj,index,e){
        for(var i in obj){
            obj[i]= "http://"+location.hostname+"/tmxcImg/"+obj[i].split("/").pop();
        }
        wx.previewImage({
            current:obj[index],
            urls:obj
        });
    },
    toBack(){
        const map=this.state.map;
        if(this.state.oneDat[0]){
            map.setZoomAndCenter(12, this.state.newPosthion);
            setTimeout(()=>{
                var markersList=this.state.markers
                for(var t in markersList){
                    if(markersList[t]) {
                        markersList[t].setContent(GD.lStyle(t * 1 + 1));
                    }
                }
                $('.XLCList').height(this.state.OveHeight);
                map.setZoomAndCenter(12, this.state.newPosthion);
                this.mapGOut(this.state.newPosthion)
                this.setState({oneDat:[]})
            },500)

        }else{
            this.props.Choice?this.props.Choice('open',null):history.back(-1);
        }
    },
    showType(){
        if(this.state.oneDat){
            return this.state.oneDat
        }else{
            return this.state.XLCList
        }
    },
    touchs(m,e){
        switch(m){
            case 'start':
                ChangeTitle.touchStart(e,this);
                break;
            case 'end':
                ChangeTitle.touchEnd(e,this);
                break;
            case 'move':
                ChangeTitle.touchMove(e,this);
                break;
        }
    },
    render(){
        return(
            <div className="GDMapStyle">
                <div className="select">
                    <div className="selectBlack">
                        <span onTouchEnd={this.toBack}></span>
                        <input id="selectAdress" type="text" onChange={(e)=>{this.setState({inputValue:e.target.value})}} onFocus={()=>{$('.XLCList').slideUp()}} onBlur={()=>$('.XLCList').slideDown()} disabled='disabled' placeholder="查询功能暂不可用！"/>
                        <div className="button">
                            {this.state.inputValue ? <input type="button" onTouchEnd={()=>{$("#selectAdress").val('')}} /> : ''}
                            {/*<input type="button" value="搜索"/>*/}
                        </div>
                    </div>
                </div>
                <div id="container" style={{width:'100%',height:'100%',overflow:'hidden'}}></div>
                <div className="XLCList"
                     style={{overflow:'hidden',}}
                     onTouchStart={this.touchStart.bind(this,null)}
                     onTouchMove={this.touchMove.bind(this,null)}
                     onTouchEnd={this.touchEnd.bind(this,null)}>
                    <p className="upOrdow"><span></span></p>
                    <ul>
                        {this.state.oneDat[0] ? this.state.oneDat[1] || this.state.oneDat[0] : this.state.oneDat[1]||this.state.XLCList}
                    </ul>
                </div>

            </div>


        )
    }
});

export default VehicleInfo