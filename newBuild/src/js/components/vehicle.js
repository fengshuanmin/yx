/**
 * Created by Administrator on 2016/8/26 0026.
 */
import React from 'react';
import $ from "jquery"
import GD from "../../../../config/GDConfig"
import ChangeTitle from '../../../../common/baseFun/someEvent'

export default class newVehicleInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            XLCList:[],
            map:null,
            oneDat:[],
            markers:[],
            newMarker:false,
            filter:true,
            tmxc1:false,
            hzcs1:false,
            gdzx1:false,
            xdsq1:false,
            cjzx1:false,
            khzx1:false,
            lat:'',
            lon:'',
            startClient:{}
        }
        this.changeCenterPoint=(m,e)=>{
            console.log('123')
            var map=this.state.map;//提取map对象
            map.clearMap();
            console.log(m)
            var markers = new AMap.Marker({
                // position: new AMap.LngLat(lon,lat),
                // 121.626216362847       31.2084575737847经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                position: new AMap.LngLat(m.position[0],m.position[1]),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            });
            map.add(markers);
            m.marker=GD.NewMarker(map,m,"1",(n)=>{
                this.changeCenterPoint(m)
            });
            /*m.marker=GD.NewMarker(map,m,"1",(n)=>{
                this.changeCenterPoint(n)
            });*/
            /* if(e=="I"){
                 map.setZoomAndCenter(12, m.position);//修改中心坐标
             }else{
                 map.setZoomAndCenter(12, m.position);//修改中心坐标
             }*/
            setTimeout(()=>{
                /*  var markersList=this.state.markers
                  for(var t in markersList){
                      if(markersList[t] != m.marker){
                          markersList[t] && markersList[t].setContent(GD.lStyle(t*1+1));
                      }
                  }
                  e=='I'? '':m.marker.setContent(GD.lStyle('SXLC'))*/;//修改map    sdfsdf
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
                console.log(m)
                // var locat=this.props.location ? this.props.location.state.isYY : false
                newList[0]=(
                    <li key="j" className="details">
                        <div className="boxAgo">
                            <div className="thTop mtB">
                                <div className="leftD ">
                                    <h5 className="AllTitle">{m.shotName}</h5>
                                    <p className="adress">{m.tmxDistance > 1000 ? parseInt(m.tmxDistance/100)/10+'km': m.tmxDistance+'m'} | {m.addr}</p>
                                    <p className="xing"><span style={{width:(4)*20+'%'}}></span></p>
                                </div>
                                <div className="STXLC"><span className="STXLCBUTTON">选这家</span></div>
                                {/*{(!locat)&& <div className="STXLC"><span className="STXLCBUTTON">选这家</span></div>}*/}
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
                    // this.mapGOut(m.position,13);//地图位移到指定高度
                    var cList=this.state.oneDat;
                    cList[2]=m;
                    this.setState({oneDat:cList})
                    $(".XLCList").height($('.boxAgo').eq(0).outerHeight(true))
                })
            },500)
        }
        this.choosexlc=(m,e)=>{
            console.log(m)
            this.props.setProps({
                xlcmap:m
            })
            if(this.props.location.state.flagbg){
                window.history.go(-1)
            }else{
                this.props.history.pushState(null, '/newcaseInfo')
            }
        }
        //选择数据
        this.Choice=(m,e)=>{
            switch(e.target.className){
                case 'STXLCBUTTON':
                    m =this.state.oneDat[2] || {};
                    this.choosexlc(m,e);
                    // this.props.Choice(m,null)
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
        }
        this.showImg=(obj,index,e)=>{
            for(var i in obj){
                obj[i]= "http://"+location.hostname+"/tmxcImg/"+obj[i].split("/").pop();
            }
            wx.previewImage({
                current:obj[index],
                urls:obj
            });
        }
        this.touchStart=(m,e)=>{
            $('.XLCList').css({transition:'height 0ms'});
            console.log(e.target.className);
            var oneData=this.state.oneDat;
            oneData[1]=false;
            this.setState({oneDat:oneData})
            const startX=e.touches[0].clientX;
            const startY=e.touches[0].clientY;
            var startHeight=$('.XLCList').height()
            this.setState({startClient:{startX:startX,startY:startY,startHeight:startHeight}});
            console.log(startHeight);
        }
        this.touchMove=(m,e)=>{
            e.preventDefault();e.stopPropagation();
            var startY=this.state.startClient.startY;
            var startHeight=this.state.startClient.startHeight;
            var moveX=e.touches[0].clientX,moveY=e.touches[0].clientY;
            var cha =startY-moveY;
            $('.XLCList').height((cha)+startHeight);
            // console.log(moveY,'xxx',moveY-startY)
            return false;
        }
        this.touchEnd=(m,e)=>{
            var map=this.state.map;
            var ti=0;
            var startClient=this.state.startClient
            for(var j=0;j<$('.XLCList > ul>li').length;j++){
                ti+=$('.XLCList ul > li').eq(j).outerHeight(true);
            }
            if($('.XLCList').height() >ti){
                $('.XLCList').height(ti);
                return;
            }
            // console.log(ti,$('.XLCList ul>li').length);
            var startY=startClient.startY;
            var endX=e.changedTouches[0].clientX,endY=e.changedTouches[0].clientY;
            var cha =startY-endY,newOffSet=$('.XLCList').offset().top;
            var offCha=newOffSet-this.state.offSet;
            // console.log('startY',startY,'endy',endY,cha,'jjj',startY);
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
                    // map.setZoomAndCenter(10, position)
                    // this.mapGOut(position)
                }else{
                    !m ? this.Choice(m,e) :this.changeCenterPoint(m,this);
                }
            }else if(offCha>0){
                if(cha>5){
                    $('.XLCList').css({height:this.state.OveHeight});
                    this.state.oneDat[2] ? position=this.state.oneDat[2].position :position=this.state.newPosthion;
                    // map.setZoomAndCenter(10, position)
                    // this.mapGOut(position)
                }else if(cha<-5){
                    $('.XLCList').css({height:'50px'})
                    this.state.oneDat[2] ? position=this.state.oneDat[2].position :position=this.state.newPosthion;
                    // map.setZoomAndCenter(10, position)
                    // this.mapGOut(position)
                }else{
                    !m ? this.Choice(m,e) :this.changeCenterPoint(m,this);
                }
            }else{
                !m ? this.Choice(m,e) :this.changeCenterPoint(m,this);
            }
        }
        this.toBack=()=>{
            const map=this.state.map;
            window.history.goBack(-1);
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
        }
        this.touchs=(m,e)=>{
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
        }
        this.filter=()=>{
            this.setState({
                filter:!this.state.filter
            })
        }
        this.tmxc1=()=>{
            console.log('tmxc')
            this.setState({
                tmxc1:!this.state.tmxc1, hzcs1:false, gdzx1:false, xdsq1:false, cjzx1:false, khzx1:false,
                cooperateSource:'insureCompany'
            })
            this.getXlc([this.state.lat,this.state.lon],'','insureCompany','','','','','',(data)=>{
                console.log(console.log(data))
                this.setState({newPosthion:[this.state.lat,this.state.lon]})
                this.mapGOut(this.state.lat,this.state.lon);
            })
        }
        this.hzcs1=()=>{
            this.setState({
                tmxc1:false, hzcs1:!this.state.hzcs1, gdzx1:false, xdsq1:false, cjzx1:false, khzx1:false,
                isCarDealer:'1'
            })
            this.getXlc([this.state.lat,this.state.lon],'','','1','','','','',()=>{
                this.setState({newPosthion:[this.state.lat,this.state.lon]})
                this.mapGOut(this.state.lat,this.state.lon);
            })
        }
        this.gdzx1=()=>{
            this.setState({
                tmxc1:false, hzcs1:false, gdzx1:!this.state.gdzx1, xdsq1:false, cjzx1:false, khzx1:false,
                xlcRepairLevel:'adv'
            })
            this.getXlc([this.state.lat,this.state.lon],'','','','adv','','','',()=>{
                this.setState({newPosthion:[this.state.lat,this.state.lon]})
                this.mapGOut(this.state.lat,this.state.lon);
            })
        }
        this.xdsq1=()=>{
            this.setState({
                tmxc1:false, hzcs1:false, gdzx1:false, xdsq1:!this.state.xdsq1, cjzx1:false, khzx1:false,
                xdsq:'1'
            })
            this.getXlc([this.state.lat,this.state.lon],'','','','','1','','',()=>{
                this.setState({newPosthion:[this.state.lat,this.state.lon]})
                this.mapGOut(this.state.lat,this.state.lon);
            })
        }
        this.cjzx1=()=>{
            this.setState({
                tmxc1:false, hzcs1:false, gdzx1:false, xdsq1:false, cjzx1:!this.state.cjzx1, khzx1:false,
                cjzx:'1'
            })
            this.getXlc([this.state.lat,this.state.lon],'','','','','','1','',()=>{
                this.setState({newPosthion:[this.state.lat,this.state.lon]})
                this.mapGOut(this.state.lat,this.state.lon);
            })
        }
        this.khzx1=()=>{
            this.setState({
                tmxc1:false, hzcs1:false, gdzx1:false, xdsq1:false, cjzx1:false, khzx1:!this.state.khzx1,
                khzx:'1'
            })
            this.getXlc([this.state.lat,this.state.lon],'','','','','','','1',()=>{
                this.setState({newPosthion:[this.state.lat,this.state.lon]})
                this.mapGOut(this.state.lat,this.state.lon);
            })
        }
        this.toBack=()=>{
            if(this.state.oneDat.length==0){
                window.history.go(-1);
            }else{
                this.setState({
                    oneDat:[]
                })
                this.state.map.clearMap();
                this.getXlc([this.state.lat,this.state.lon], '', '', '', '', '', '', '', () => {
                    this.setState({newPosthion:[this.state.lat,this.state.lon]})
                    this.mapGOut(this.state.lat,this.state.lon);
                })
            }
        }
        this.change=(e)=>{
            var val=e.target.value
            console.log(val)
            console.log(this.state.cooperateSource,this.state.isCarDealer,this.state.xlcRepairLevel,
                this.state.xdsq,this.state.cjzx,this.state.khzx)
            this.getXlc([this.state.lat,this.state.lon],val,this.state.cooperateSource,this.state.isCarDealer,this.state.xlcRepairLevel,
                this.state.xdsq,this.state.cjzx,this.state.khzx,()=>{
                    this.setState({newPosthion:[this.state.lat,this.state.lon]})
                    this.mapGOut(this.state.lat,this.state.lon);
                })
        }
    }
    componentDidMount(){
        console.log(this.props)
        this.state={...(this.state||{}),...(this.props.location.state||{})}
        console.log(this.state)
        var mtc=this.state.mtc
        var lat=localStorage.getItem('lat')||'31.20846'
        var lon=localStorage.getItem('lon')||'121.62622'
        this.setState({
            lat:lat,
            lon:lon
        })
        /*this.setState({
            lat:'31.20846',
            lon:'121.62622'
        })*/
        GD.addScript();//加载高德sdk
        window.init = ()=>{
            var map = new AMap.Map('container', {
                resizeEnable: true,
                center:[lon,lat],
                zoom: 12
            });
            this.setState({
                map:map
            })
            //给指定点添加自定义图标
            var marker = new AMap.Marker({
                // position: new AMap.LngLat(lon,lat),
                // 121.626216362847       31.2084575737847经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                position: new AMap.LngLat(lon,lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            });
            map.add(marker);
            /*var markers = new AMap.Marker({
                icon:require('../../img/dwzx.png'),
                //点标记在地图上显示的位置
                position:[121.62622,31.20846],
            });
            markers.setMap(map);*/
            this.getXlc([lat,lon],'','','','','','','',()=>{
                this.setState({newPosthion:[lat,lon]})
                this.mapGOut(lat,lon);
            })
        }
        console.log(mtc.brandName)
        console.log(mtc.brandCode)
        this.getXlc=(a,b,c,d,e1,xdsq,cjzx,khzx,fun)=>{
            this.props.ajax({
                loading:true,
                url:'/lexiugo-app/skyNet/getSkyNetMapInfo',
                data:{
                    lat:a[0],
                    lon:a[1],
                    xlcName:b,
                    cooperateSource:c,
                    isCarDealer:d,
                    xlcRepairLevel:e1,
                    xdsq:xdsq,
                    cjzx:cjzx,
                    khzh:khzx,
                    brandCode:mtc.brandCode,
                    brandName:mtc.brandName},
                suc:(data)=>{
                    console.log(data)
                    var date=data.xlcSkyNetVoList,posi={},position=[]
                    for(var i in date){
                        posi={lon:date[i].longitude,lat:date[i].latitude}
                        position.push(posi)
                    }
                    console.log(position)
                    /* var markers=''
                     for(var j in position){
                         var posit=[ position[j].lon,position[j].lat];
                         markers = new AMap.Marker({
                             icon:require('../../img/touming.png'),
                             //点标记在地图上显示的位置
                             position: posit[i],
                             size: new AMap.Size(52, 52),
                             imageSize:new AMap.Size(26,26)
                         });
                         console.log(posit)
                         markers.setMap(this.state.map);
                     }*/
                    for(var i in data.xlcSkyNetVoList){
                        data.xlcSkyNetVoList[i].fwList=[];
                        data.xlcSkyNetVoList[i].imglist=[];
                        var fwdata=data.xlcSkyNetVoList[i].addedKinds ? data.xlcSkyNetVoList[i].addedKinds.split(',') : []
                        var xlcTags=data.xlcSkyNetVoList[i].xlcTags
                        for(var j=0;j<fwdata.length;j++){
                            data.xlcSkyNetVoList[i].fwList.push([fwdata[j],''])
                        }
                        // for(var m in imglist){
                        //     for(var j in data.xlcSkyNetVoList[i]){
                        //         if(m==j && data.xlcSkyNetVoList[i][m]){
                        //             data.xlcSkyNetVoList[i].imglist.push([data.xlcSkyNetVoList[i][m],imglist[m]]);
                        //         }
                        //     }
                        // }
                        // console.log(data.xlcSkyNetVoList[i].imglist);
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
                }
            })
        }
        this.mapGOut=(lat,lon,lp)=>{
            var mj=[lon,lat]
            console.log(lon,lat)
            setTimeout(()=>{
                var map=this.state.map;
                // var ll = map.containTolnglat(new AMap.Pixel(0, 0));//获取地图坐标位置
                //map.panTo([ ll.getLng(),ll.getLat()]);
                var mtop=($('.XLCList').offset().top-$('.GDMapStyle').offset().top)/2;
                var mleft=$('.XLCList').width()/2;
                //期望显示的坐标
                var  toD = map.containTolnglat(new AMap.Pixel(mleft, mtop));
                mj[1]=lat-((toD.getLat()*10000-lat*10000)/10000)
                map.setZoomAndCenter(lp || 12, mj);
            },300)
        }
        this.htmlList=(arr)=>{
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
                var xlcTagshtml=[],xlcTagscolor={}
                for(var k in arr[i].xlcTags){
                    xlcTagscolor={background:arr[i].xlcTags[k].tagColor,color:arr[i].xlcTags[k].tagColor=='#FFE300'?'#000':'#fff'}
                    /* xlcTagshtml.push(<span style={{background:arr[i].xlcTags[k].tagName=='透明'?'#5398FC'
                         :arr[i].xlcTags[k].tagName=='综合I类||综合II类||4S'?'#FFE300'
                             :arr[i].xlcTags[k].tagName=='高端车'?'#9567D8'
                                 :arr[i].xlcTags[k].tagName=='配件直供'?'#F64C4C':'#4BCEFC',
                         color:arr[i].xlcTags[k].tagName=='综合I类||综合II类||4S'?'#000':'#fff'
                     }} key={k}>{arr[i].xlcTags[k].tagName}</span>)*/
                    xlcTagshtml.push(<span style={xlcTagscolor}>{arr[i].xlcTags[k].tagName}</span>)
                }
                console.log(arr)
                XLCList.push(
                    <li key={i}  onTouchEnd={this.touchEnd.bind(null,arr[i])}>
                        <div className="thTop">
                            <div className="leftD">
                                <h4 style={{fontSize:'0.36rem',fontWeight:'bold'}}>{arr[i].shotName}</h4>
                                <p className="xlcTag">{xlcTagshtml}</p>
                                <p className="adress">{parseInt(arr[i].tmxDistance/100)/10+'km'} | {arr[i].addr}</p>
                                <p className="xing"><span style={{width:(4)*20+'%'}}></span></p>
                            </div>
                            <div className="img">
                                {arr[i].appearancePhoto==''||arr[i].appearancePhoto==null?
                                    <img src={require('../../img/default.png')} alt=""/>:
                                    <img src={"/toumingxiu/jyshowPhoto/getUrl.do?photoUrl="+arr[i].appearancePhoto} alt=""/>}
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
        }
    }
    render(){
        console.log(this.state)
        console.log(this.props)
        return(
            <div className="GDMapStyle">
                <div className="select" style={{background:'#fff'}}>
                    <div className="selectBlack" style={{marginTop:'0.2rem',padding:' 0rem 0.2rem 0 0'}}>
                        <span className="back1" onTouchEnd={this.toBack}></span>
                        <span className="searchxlc">
                            <span className="iconfonts">&#xe634;</span>
                            <input id="selectAdress" onChange={this.change} type="text" placeholder="搜索修理厂名称"/>
                        </span>
                        <span className="filter" onClick={this.filter}></span>
                    </div>
                    <div className={this.state.filter?'filtdiv':'filtdivnon'}>
                        <span className={this.state.tmxc1?'filtspan filtblo':'filtspan filtnon'} onClick={this.tmxc1}>透明车坊</span>
                        <span className={this.state.hzcs1?'filtspan filtblo':'filtspan filtnon'} onClick={this.hzcs1}>合作车商</span>
                        <span className={this.state.gdzx1?'filtspan filtblo':'filtspan filtnon'} onClick={this.gdzx1}>高端专修</span>
                        <span className={this.state.xdsq1?'filtspan filtblo':'filtspan filtnon'} onClick={this.xdsq1}>限定市区</span>
                        <span className={this.state.cjzx1?'filtspan filtblo':'filtspan filtnon'} onClick={this.cjzx1}>拆解中心</span>
                        <span className={this.state.khzx1?'filtspan filtblo':'filtspan filtnon'} onClick={this.khzx1}>客户自选</span>
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
}