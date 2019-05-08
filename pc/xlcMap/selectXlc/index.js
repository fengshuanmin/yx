import React from 'react';
import ReactDOM from 'react-dom'
import $ from 'jquery'
require('../../../common/css/style.css')
require('./style.css');
import GD from '../../../config/GDConfig'
import smalFun from '../../../common/baseFun/smallFunction';
import mapJs from '../assembly/map';
export default class AppRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...smalFun};
        this.showTbody=()=>{

        }
        this.getXlc=(a)=>{
            console.log(a);
            var XRL = $('#xlcRepairLevelNode').val()
            var BC =$('#brandCodeNode').val()
            var userId = $('#MapUseUserId').val()
            var brandName = $('#brandName').val()
            try {
                $.ajax({
                    url: window.location.origin+'/lexiugo-app/skyNet/getSkyNetMapInfo',
                    data: {
                        lat: a[1], lon: a[0],
                        xlcRepairLevel: XRL,
                        brandCode: BC,
                        userId: userId,
                        brandName:brandName
                    },
                    dataType: "json",
                    type: 'post',
                    async: false,
                    success: (dat) => {
                        this.setState({xlcList: dat.xlcSkyNetVoList}, () => {
                            //this.state.getFonts('PingFangBold', '#fontsDs')
                        });
                    }
                })
            } catch(e){
                console.log(e)
            }
            /*$.post('/lexiugo-app/skyNet/getSkyNetMapInfo',{
                lat:a[1],lon:a[0],
                xlcRepairLevel:$('#xlcRepairLevelNode').val()||this.state.getQuery('XRL'),
                brandCode:$('#brandCodeNode').val() ||this.state.getQuery('BC'),
                userId:$('#MapUseUserId').val() ||this.state.getQuery('userId'),
            },(dat)=>{
                this.setState({xlcList:dat.xlcSkyNetVoList},()=>{
                    this.state.getFonts('PingFangBold','#fontsDs')
                });
            })*/
        }
        this.goNow=()=>{
            var map=this.state.maps
            map.setZoomAndCenter(12, this.state.nowDz);
            if(!this.state.isheight){
                map.panBy(-180,0)
            }else{
                map.panBy(0,0)
            }
        }
        this.mapinit=()=>{
            var map=GD.NewMap('containerses');
            this.setState({maps:map})

            //var moveEnd=GD.moveEnd(map)
            map.plugin(["AMap.Autocomplete",'AMap.CitySearch','AMap.Geolocation','AMap.Geocoder',"AMap.PlaceSearch"],()=>{
                console.log('进来了')
                //查询
                var autoOptions = {
                    input: "selectAdress"
                };
                var auto = new AMap.Autocomplete(autoOptions);//注册查询列表功能
                AMap.event.addListener(auto, "select", (e)=>{
                    console.log(e);
                    if(!e.poi || !e.poi.location){
                        alert('请选择详细地址')
                        return;
                    }
                    e.poi.position=[e.poi.location.lng,e.poi.location.lat];
                    var dats={position:e.poi.position,msg:'搜索位置',name:'搜索位置'}
                    GD.NewMarker(map,dats,'I',(m)=>{
                        GD.openInfoWindow(dats,map);
                    });
                    this.getXlc(e.poi.position);
                    map.setZoomAndCenter(12, e.poi.position);
                    if(!this.state.isheight){
                        map.panBy(-180,0)
                    }else{
                        map.panBy(0,0)
                    }
                });
                //获取当前位置信息
                var geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true,//是否使用高精度定位，默认:true
                    timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                    buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    buttonPosition:'RB'
                });
                geolocation.getCurrentPosition();
                AMap.event.addListener(geolocation, 'complete', this.onComplete);//返回定位信息
                AMap.event.addListener(geolocation, 'error', this.onError);      //返回定位出错信息

            })
        }
        this.onComplete=(data)=>{
            var map = this.state.maps;
            map.setZoomAndCenter(12, [data.position.getLng(),data.position.getLat()]);
            var dats={position:[data.position.getLng(),data.position.getLat()],msg:'当前位置',name:'我的位置'}
            GD.NewMarker(map,dats,'I',(m)=>{
                GD.openInfoWindow(dats,map);
            });
            if(!this.state.isheight){
                map.panBy(-180,0)
            }else{
                map.panBy(0,0)
            }
            this.setState({myposition:[data.position.getLng(),data.position.getLat()]})
            this.getXlc([data.position.getLng(),data.position.getLat()]);
        }
        this.onError=(data)=>{
            console.log('定位失败')
            var map=this.state.maps
            var citysearch = new AMap.CitySearch();
            citysearch.getLocalCity((status, result)=>{
                if (status === 'complete' && result.info === 'OK') {
                    if (result && result.city && result.bounds) {
                        try {
                            var cityinfo = result.city;
                            var citybounds = result.rectangle;
                            console.log(result)
                            console.log(citybounds)
                            var dizhi = citybounds && citybounds.split(';')
                            var dz1 = dizhi[0] && dizhi[0].split(',')
                            var dz2 = dizhi[1] && dizhi[1].split(',')

                            this.setState({myposition: [(dz1[0] + dz2[0]) / 2, (dz1[1] + dz2[1]) / 2]}, () => {
                                map.setZoomAndCenter(12, this.state.myposition);
                                if (!this.state.isheight) {
                                    map.panBy(-180, 0)
                                } else {
                                    map.panBy(0, 0)
                                }
                                this.getXlc(this.state.myposition);
                            });
                        }catch (e){
                            var cityList={
                                上海:[121.477451,31.227009],
                                杭州市:[120.213116,30.290998],
                                北京:[116.42792,39.902896]
                            }
                            this.setState({myposition:cityList[$('input#cityName').val()]},()=>{
                                map.setZoomAndCenter(12, this.state.myposition);
                                if(!this.state.isheight){
                                    map.panBy(-180,0)
                                }else{
                                    map.panBy(0,0)
                                }
                                this.getXlc(this.state.myposition);
                            })

                        }
                    }
                } else {
                    var cityList={
                        上海:[121.477451,31.227009],
                        杭州市:[120.213116,30.290998],
                        北京:[116.42792,39.902896]
                    }
                    this.setState({myposition:cityList[$('input#cityName').val()]},()=>{
                        map.setZoomAndCenter(12, this.state.myposition);
                        if(!this.state.isheight){
                            map.panBy(-180,0)
                        }else{
                            map.panBy(0,0)
                        }
                        this.getXlc(this.state.myposition);
                    })

                }
            });
            /*map.setZoomAndCenter(12, [121.522082,31.195884]);
            if(!this.state.isheight){
                map.panBy(-180,0)
            }else{
                map.panBy(0,0)
            }
            this.getXlc([121.522082,31.195884]);*/
        }
    }
    scrollFunc(e){

    }
    componentDidMount(){
        /*//window.parent.document.getElementById('newTask').appendChild('<span/>')
        $('#newTask', window.parent.document).append('<div id="containerses" />')
        parent.addScript=GD.addScript;
        parent.init=()=>{alert();this.mapinit()}
        parent.addScript('iframe');*/
        $('#mapSelectBox').css({
            width:$('iframe.exframe').width(),
            height:$('iframe.exframe').height(),
            left:$('iframe.exframe').offset().left,
            top:$('iframe.exframe').offset().top,
            zIndex:$('iframe.exframe').css('z-index')
        })
        $(window).resize(function() {
            $('#mapSelectBox').css({
                width:$('iframe.exframe').width(),
                height:$('iframe.exframe').height(),
                left:$('iframe.exframe').offset().left,
                top:$('iframe.exframe').offset().top,
                zIndex:$('iframe.exframe').css('z-index')
            })
        });
        GD.addScript();
        window.init = ()=>this.mapinit()
    }
    componentWillMount() {
        $('#iframeList').on('DOMNodeInserted',function(){
            $('#mapSelectBox').remove();
        })
        $('body').append('<script>' +
            'var glabData={};' +
            '</script>');
    }
    render(){
        return (
            <div id="fontsDs">
                <div style={{width:'100%',height:$('iframe.exframe').height()}} className="map" id="containerses"></div>
                <div style={{width:'100%',height:$('iframe.exframe').height()}} className="map" id="containerses"></div>
                <div className="showBox">
                    {
                        !this.state.xlcInfo ?
                            <div className="headers">
                                {/*<span className="logo"></span>*/}
                                <span onClick={()=>$('#mapSelectBox').remove()}><i className="iconfonts">&#xe618;</i></span>
                                <input onFocus={()=>{this.setState({isheight:false});}} id="selectAdress" type="text" placeholder="请输入您要查询的位置"/>
                                <span onClick={()=>this.setState({isheight:!this.state.isheight})}  className="select"> <i className="iconfonts" style={this.state.isheight ? {transform:'rotate(180deg)'}:{transform:'rotate(0deg)'}}>&#xe629;</i> </span>
                                {/*<span className="close iconfonts">&#xe604;</span>*/}
                            </div>
                            :
                            <div className="headers">
                                <span onClick={()=>{this.setState({xlcInfo:false});this.state.maps.setZoomAndCenter(12, this.state.myposition);}}><i className="iconfonts">&#xe618;</i></span>
                                <span onClick={()=>{console.log(glabData);glabData=this.state.xlcInfo;newGlbData(glabData);$('#mapSelectBox').remove();}}><i className="iconfonts">&#xe6fc;</i>选这家</span>
                                <span onClick={()=>this.setState({isheight:!this.state.isheight})}><i className="iconfonts" style={this.state.isheight ? {transform:'rotate(180deg)'}:{transform:'rotate(0deg)'}}>&#xe622;</i> {this.state.isheight ? '展开':'收起'}</span>
                                <span><i className="iconfonts">&#xe623;</i>距离:{this.state.xlcInfo.tmxDistance >1000 ?this.state.xlcInfo.tmxDistance/1000+'千米':this.state.xlcInfo.tmxDistance+'米' }</span>
                            </div>
                    }
                    <div className="tbody" ref="tbody" style={this.state.isheight ? {height:'0px'}:{height:$('iframe.exframe').height()-75+'px'}}>
                        {
                            this.state.xlcInfo ?
                                <mapJs.MapXlicInfo T={this} {...this.props} data={this.state.xlcInfo} maps={this.state.maps}/>:
                            (this.state.xlcList ?
                                ( this.state.xlcList[0] ?
                                    <ul>
                                        {
                                            this.state.xlcList.map((item, index) => {
                                                return(
                                                    <mapJs.MapXlcList key={index} index={index+1} maps={this.state.maps} T={this} {...this.props} data={item}/>
                                                )
                                            })
                                        }
                                    </ul>:
                                        <p>附近没有修理厂，换个地址试试</p>
                                )
                                :<p>输入地址查询附近修理厂</p>)
                        }
                    </div>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<AppRouter />, document.getElementById("appWrappers"));