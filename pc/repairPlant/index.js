/**
 * 修理厂介绍
 * **/
import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import GD from '../../config/GDConfig';
import smallFun from '../../common/baseFun/smallFunction'
require('../../common/css/style.css')
require('./css/repairPlant.css')
export default class AppRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...smallFun,data:{},pdata:{},
            imgList: {
                AB: require('./images/bxgs/AB.png'),
                AXATP: require('./images/bxgs/AXATP.png'),
                CCIC: require('./images/bxgs/CCIC.png'),
                TAIC: require('./images/bxgs/TAIC.png'),
                TPIC: require('./images/bxgs/TPIC.png'),
                YGBX: require('./images/bxgs/YGBX.png'),
                CIC: require('./images/bxgs/CIC.png'),
                huatai:require('./images/bxgs/huatai.png'),
                SAMSUNG:require('./images/bxgs/SAMSUNG.png'),
                API:require('./images/bxgs/API.png'),
                yongcheng:require('./images/bxgs/yongcheng.png'),
                ZF:require('./images/bxgs/ZF.png'),

                yejian: require('./images/bxgs/zh.png'),
                LDCS: require('./images/bxgs/yg.png'),
                zyy: require('./images/bxgs/ta.png'),
            }
        };
        this.addScripts=()=>{
            GD.addScript();
            window.init = ()=>{
                var map = new AMap.Map('container', {
                    resizeEnable: true,
                    //zoomEnable:false,
                    //dragEnable: false,
                    zoom: 12
                });
                map.setZoomAndCenter(12, [this.state.data.xlcSkyNetVoList[0].longitude,this.state.data.xlcSkyNetVoList[0].latitude]);
                GD.NewMarker(map,{position:[this.state.data.xlcSkyNetVoList[0].longitude,this.state.data.xlcSkyNetVoList[0].latitude],msg:'修理厂位置',name:'修理厂位置'},'I',(m)=>{
                    /*_this.changeCenterPoint('I',m)*/
                });
            }
        }
        this.DH=()=>{
            //[this.state.data.xlcSkyNetVoList.longitude,this.state.data.xlcSkyNetVoList.latitude]
            window.location.href='http://uri.amap.com/marker?position='+this.state.data.xlcSkyNetVoList[0].longitude+','+this.state.data.xlcSkyNetVoList[0].latitude
        }
        this.LX=()=>{
            window.location.href='tel:'+this.state.pdata.tel
        }
    }// /lexiugo-app/skyNet/getXlcLinkInfo
    componentWillMount(){
        $.post('/lexiugo-app/skyNet/getXlcLinkInfo',{xlcId:window.location.pathname.split("/").pop()},(dat)=>{
            if(dat.code=='0000'){
                if(dat.data.xlcSkyNetVoList[0].addedKinds && dat.data.xlcSkyNetVoList[0].addedKinds != 'null'){
                    var ad = dat.data.xlcSkyNetVoList[0].addedKinds.split(','), cd = [];
                    for (var i = 0; i < ad.length - 1; i++) {
                        for (var j = 0; j < ad.length - 1 - i; j++) {
                            if (ad[j].length > ad[j + 1].length) {
                                var swap = ad[j];
                                ad[j] = ad[j + 1];
                                ad[j + 1] = swap;
                            }
                        }
                    }
                }
                var pdata=dat.data.xlcSkyNetVoList[0]
                this.setState({data:dat.data,fw:ad,ok:true,pdata:pdata},()=>{
                    this.addScripts();
                    this.state.getFonts('PingFangRegular','#appWrapper','appWrapper');
                })
            }
        })
    }
    componentDidMount(){


    }
    render(){
        return (
            <div>
                <div className="plantTop">
                    <div><h4 className="logo"><img src={require('../../common/images/logoCar.png')} alt=""/></h4></div>
                    {/*<div className="BXGSList">
                        <ul>
                            {this.state.data.insZgsList && this.state.data.insZgsList.map((item,index)=>{
                                return (
                                    <li key={index}><img src={this.state.imgList[item.zzbh]} alt=""/></li>
                                )
                            })}
                        </ul>
                    </div>*/}
                    <div className="xlcMap">
                        <h2>{this.state.pdata && this.state.pdata.shotName}</h2>
                        <div className="xlcInfo">
                            <div className="map" id="container"></div>
                            <div className="xlcInfobutton">
                                <div onClick={this.DH}>
                                    <span className="Navigation iconfonts">&#xe645;</span>
                                    <span onClick={this.DH}>导航</span>
                                </div>
                                <div onClick={this.LX}>
                                    <span className="phone iconfonts">&#xe61e;</span>
                                    <span>联系</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="BigGiftBag" onClick={()=>{
                    //window.location.href='weixin://dl/business/?ticket='+$('#titcit').val()
                    //window.location.href='weixin://dl/business/?ticket=t7dd5590222a95ba258fceb5aa230a79f'
                    //window.location.href='weixin://dl/business/?ticket=t5cf26aa0f0539b082cb5e357834dc8ef';
                    this.setState({showit:!this.state.showit})
                }}>
                <div className="tishis" style={this.state.showit ? {display:'block'}:{display:'none'}}>
                    <h4>关注公众号方法提示</h4>
                    <p style={{margin:'10px 0'}}><span className="span1">方法一.</span>保存二维码图片，在微信扫一扫中点击右上角的“相册”选择已保存的图片即可识别。</p>
                    <p><span className="span1">方法二.</span>微信中搜索并关注“透明修车网”，进入公众号后在 “我的爱车”中查看维修详情，领取优惠券。</p>
                 </div>
                <img src={require('./images/pngs.png')} alt=""/>
                </div>
                <div className="xlcScenery">
                    <h2>/修理厂实景/</h2>
                    <div className="xlcimg">
                        <ul className="imgList">
                            <li style={{overflow:'hidden'}}><img style={{width:'100%',height:'100%'}} src={'/toumingxiu/jyshowPhoto/getUrl.do?photoUrl='+this.state.pdata.appearancePhoto} alt=""/></li>
                            <li style={{overflow:'hidden'}}><img style={{width:'100%',height:'100%'}} src={'/toumingxiu/jyshowPhoto/getUrl.do?photoUrl='+this.state.pdata.paintRoomPhoto} alt=""/></li>
                            <li style={{overflow:'hidden'}}><img style={{width:'100%',height:'100%'}} src={'/toumingxiu/jyshowPhoto/getUrl.do?photoUrl='+this.state.pdata.receptionRoomPhoto} alt=""/></li>
                        </ul>
                    </div>
                    <div className="pingfen">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <ul className="jieche">
                        {
                            this.state.fw && this.state.fw.map((item,index)=>{
                                return(
                                    <li>{item}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="ourPromise">
                    <img src={require('./images/bottoms.png')} alt=""/>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<AppRouter />, document.getElementById("appWrapper"));