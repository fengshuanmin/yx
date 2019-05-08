import React from 'react';
import $ from 'jquery';
import DatePicker from 'react-mobile-datepicker';
import GD from "../../../../config/GDConfig"
import {BaseLi,SubmitOk} from '../../../../common/assembly/Stateless';
import ChangeTitle from '../../../../common/baseFun/someEvent'
import ShowEWM from '../assembly/showEWM'
require('../../css/home.css')
require('../../css/newcaseInfo.css')

export default class NewcaseInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag:false,
            waitloss:true,
            xlcloss:false,
            loss:false,
            lossNo:'',
            taskId:'',
            reportNo:'',
            carList:[],
            imagList:[],
            showEWMBol:[],
            lossWay:'2',
            fastConfirmLossMoney:'',
            shotName:'',
            pushDesc:''
        }
        this.uploadImg=(how,e)=>{
            console.log(how);
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: [''], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    console.log( "调用相机");
                    if( res.errMsg == 'ok' || res.errMsg == 'chooseImage:ok' ){
                        var localIds = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        var Nstate = this.state.imagList;
                        Nstate.push(
                            <li key={Nstate.length}><img onClick={this.showImg.bind(this,'change',localIds)}  src={localIds} alt=""/></li>
                        );
                        this.setState({imagList:Nstate});
                        this._uploadImage( localIds);
                    }else {
                        alert( '拍照失败' );
                    }
                }.bind(this)
            });
        },
        this._uploadImage=(localIds)=>{
            var _this=this;
            wx.uploadImage({
                localId: localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                    var serverId = res.serverId; // 返回图片的服务器端ID
                    var photoType ='all';
                    var urlList={ "imageType" : photoType, "serverId" : serverId };
                    var paramDatas=_this.state.paramData;
                    paramDatas.push( { "imageType" : '', "serverId" : serverId } );
                    _this.setState({paramData:paramDatas});
                }
            });
        },
        this.showImg=(type,obj,e)=>{
            wx.previewImage({
                current:obj,
                urls:[
                    obj
                ]
            });
        }
        this.choseaddress=(e)=>{
            if($('input[name=brandName]').val()==''||$('input[name=brandName]').val()==null){
                this.props.promptInfo({
                    content: '选择修理厂前，请先选择车辆品牌！',
                    Prompt: true
                })
            }else{
                this.props.setProps({
                    news:this.state
                })
                wx.getLocation({
                    type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function (res) {
                        let lat = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        let lon = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                        localStorage.setItem("lat",lat)
                        localStorage.setItem("lon",lon)
                    }
                });
                // console.log(this.state)
                this.props.history.pushState({mtc:this.state.mtc},'/vehicle')
            }
        }
        this.ocr=()=>{
            console.log(this.state)
            /*this.props.wxUpdata(1, (imgid, id, isend) => {
                this.props.ajax({
                    loading: true,
                    url: '/lexiugo-app/weixin/analysisVinPhoteByOcr',
                    data: {lossNo: this.state.lossNo, serverId: id,taskId:this.state.taskId},
                    suc: (msg) => {
                        if (msg.code * 1 == 7000) {
                            var yuanarr = {
                                vinCode: 'vin',
                                familyName: 'familyName'
                            }
                            var jd = {...msg.data}, carInfos = this.state.carInfo,
                                SubmitData= this.state.SubmitData
                            for (var i in msg.data) {
                                if (yuanarr[i]) {
                                    jd[yuanarr[i]] = msg.data[i];
                                    SubmitData[i]=msg.data[i]
                                }
                            }

                            for (var i in this.state.carInfo) {
                                if (jd[this.state.carInfo[i].typeName]) {
                                    carInfos[i].val = jd[this.state.carInfo[i].typeName]
                                    if (this.state.carInfo[i].typeName == 'brandName') {
                                        carInfos[i].disabled = true
                                    }
                                }
                            }
                            carInfos[3].next = '';
                            SubmitData={...this.state.SubmitData,...jd}
                            this.setState({SubmitData:SubmitData,carInfo:carInfos,VinInfo: {...(this.state.VinInfo || {}), ...(jd || {})}})
                        } else if(msg.code * 1 == 7002){
                            var jd = {...msg.data}, carInfos = this.state.carInfo;
                            carInfos[3].next = ''
                            carInfos[1].val = ''
                            carInfos[3].val = ''
                            var yuanarr = {
                                vin:'vinCode',
                                plateNo: 'plateNo'
                            }
                            var SubmitData= this.state.SubmitData
                            for (var i in carInfos) {
                                if (yuanarr[carInfos[i].typeName]) {
                                    SubmitData[yuanarr[carInfos[i].typeName]]=msg.data[yuanarr[carInfos[i].typeName]]
                                    carInfos[i].val = msg.data[yuanarr[carInfos[i].typeName]]
                                }
                            }
                            jd.vin=m;

                            this.setState({SubmitData:{...SubmitData,...jd,vehicleName:''},carInfo:carInfos,VinInfo: {...(jd || {})}},()=>{
                                this.props.promptInfo({
                                    content: msg.mess, Prompt: true
                                })
                            })
                        }else {
                            var carInfos = this.state.carInfo,SubmitData=this.state.SubmitData;
                            carInfos[3].next = ''
                            carInfos[1].val = ''
                            carInfos[3].val = ''
                            SubmitData.vin='';SubmitData.vehicleName=''
                            this.setState({carInfo:carInfos,SubmitData:SubmitData})
                            this.props.promptInfo({
                                content: msg.mess, Prompt: true
                            })
                        }
                    }
                })
            })*/
            this.props.wxUpdata(1, (imgid, id, isend) => {
                this.props.ajax({
                    loading: true,
                    url: '/lexiugo-app/weixin/analysisVinPhoteByOcr',
                    data: {lossNo: this.state.lossNo, serverId: id,taskId:this.state.taskId},
                    suc: (msg) => {
                        // console.log(msg)
                        if (msg.code * 1 == 7000) {
                            this.setState({
                                submitData:msg.data,
                                plateNo:msg.data.plateNo,
                                mtc:{brandName:msg.data.brandName,brandCode:msg.data.brandCode},
                                brandName:msg.data.brandName
                            })
                            $('input[name=brandName]').val(msg.data.brandName)
                        }else{
                            this.props.promptInfo({
                                content:msg.mess,
                                Prompt:true
                            })
                        }
                    }
                })
            })
        }
        this.waitloss=()=>{
            this.setState({
                waitloss:true,
                xlcloss:false,
                loss:false,
                lossWay:2,
                fastConfirmLossMoney:''
            })
        }
        this.xlcloss=()=>{
            this.setState({
                waitloss:false,
                xlcloss:true,
                loss:false,
                lossWay:1,
                fastConfirmLossMoney:''
            })
        }
        this.loss=()=>{
            this.setState({
                waitloss:false,
                xlcloss:false,
                loss:true,
                lossWay:3,
                fastConfirmLossMoney:this.state.fastConfirmLossMoney
            })
        }
        this.newSubmit=()=>{
            if(this.state.reportPersonName==''||this.state.reportPersonName==null){
                this.props.promptInfo({
                    content:'请输入车主姓名',
                    Prompt:true
                })
            }else if(this.state.reportMoblePhone==''||this.state.reportMoblePhone==null){
                this.props.promptInfo({
                    content:'请输入手机号码',
                    Prompt:true
                })
            }else if(this.state.plateNo==''||this.state.plateNo==null){
                this.props.promptInfo({
                    content:'请输入车牌号',
                    Prompt:true
                })
            }else if(this.state.brandName==''||this.state.brandName==null){
                this.props.promptInfo({
                    content:'请选择车辆品牌',
                    Prompt:true
                })
            }else if(this.state.shotName==''||this.state.shotName==null){
                this.props.promptInfo({
                    content:'请选择修理厂',
                    Prompt:true
                })
            }else if(this.state.lossWay==''||this.state.lossWay==null){
                this.props.promptInfo({
                    content:'请选择定损方式',
                    Prompt:true
                })
            }else if(this.state.lossWay=='3'&&this.state.fastConfirmLossMoney==''||this.state.fastConfirmLossMoney==null){
                this.props.promptInfo({
                    content:'现场快速定损模式下定损金额不能为空',
                    Prompt:true
                })
            }else if(this.state.imagList.length==0){
                this.props.promptInfo({
                    content:'请选择您要上传的照片',
                    Prompt:true
                })
            }else{
                this.props.ajax({
                    loading: true,
                    url:'/lexiugo-app/weixin/insurance/basic',
                    data:{
                        pushSource:'W',tmxReportNo:'',reportNo:this.state.reportNo,lossNo:this.state.lossNo,
                        taskId:this.state.taskId,
                        registPersion:this.props.user.data.LxAqYhxxb.yhxm,
                        registPersionPhone:this.props.user.data.LxAqYhxxb.registPersionPhone,
                        reportPersonName:this.state.reportPersonName,
                        reportMoblePhone:this.state.reportMoblePhone,
                        plateNo:this.state.plateNo,
                        fastConfirmLossMoney:this.state.fastConfirmLossMoney,pushDesc:this.state.pushDesc,
                        repairType:'0',tmxCarType:'0',tmxhavepjType:'0',taskType:'0201',lossWay:this.state.lossWay,
                        xlcRepairLevel:'com',ggSelectIns:''
                    },
                    suc:(data)=>{
                        console.log(data)
                        if(data.code=="0000"){
                            this.props.ajax({
                                loading: true,
                                url:'/lexiugo-app/weixin/insurance/vehicle',
                                data:{
                                    brandName:this.state.brandName,
                                    brandId:this.state.brandId,
                                    importFlag:'',
                                    brandCode:this.state.brandCode,
                                    brandInitial:'',VehicleModel:'',familyAbbr:'', vin:'',
                                    xlcName:this.props.xlcmap.shotName,xlcCode:this.props.xlcmap.id
                                },
                                suc:(result)=>{
                                    if(data.code=="0000"){
                                        this.props.ajax({
                                            loading: true,
                                            url:'/lexiugo-app/weixin/insurance/push',
                                            data:{taskId:this.state.taskId},
                                            suc:(msg)=>{
                                                if(msg.code=='3000'){
                                                    this.showEWM(msg.data.pushImgPath)
                                                    /*this.props.promptInfo({
                                                        content:'推修成功',
                                                        Prompt:true,
                                                        fun:()=>{

                                                            this.props.promptInfo();
                                                        }
                                                    })*/
                                                }else{
                                                    this.props.promptInfo({
                                                        content:'推修成功，但图片上传失败',
                                                        Prompt:true
                                                    })
                                                }
                                            }
                                        })
                                    }else{
                                        this.props.promptInfo({
                                            content:'推修失败',
                                            Prompt:true
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }

        this.brandArr=(e)=>{
            console.log(e.target.value)
            $('.brandItem').eq(0).slideDown();
            this.props.ajax({
                url:"/server/BQXX",
                data:{data:'/brand/getBrandCode/'+(e.target.value || 'a')},
                type: "post",
                suc:(msg)=> {
                    console.log(msg)
                    let carList=msg.result
                    this.setState({
                        carList:carList
                    })
                }
            })
        }
        this.TBlur=()=>{
            $('.brandItem').css({display:'none'})
            window.scrollTo(0,0)
        }
        this.xCar=(obj,type,e)=>{
            console.log(obj)
            console.log(type)
            console.log(e)
            var mtc={}
            if(type=='brand'){
                $('input[name=brandName]').val(obj.brandName);
                this.setState({
                    brandName:obj.brandName,
                    brandId:obj.brandId,
                    brandCode:obj.brandCode,
                    mtc:obj
                })
            }
            $('.brandItem').hide();
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
        this.showEWM=(url)=>{
            this.setState({pushImgPath:url})
            if(url=='open'){
                this.setState({showEWMBol:[false]})
                this.props.history.replaceState(null, "/record")
            }else{
                this.setState({showEWMBol:[true]})
            }
        }
        this.blur=()=>{
            window.scrollTo(0, 0);
            console.log('bulr')
            // $('#vin').animate({scrollTop: 0}, 500)
            // var adddiv=$('.adddiv')[0].scrollTop
            // this.props.promptInfo({
            //     content:sct,
            //     Prompt:true
            // })
        }
    }
    componentDidUpdate(){
        this.props.resetScroll()
    }
    componentDidMount() {
        this.props.changeTitle('推修');
        this.props.ajax({
            url:'/lexiugo-app/weixin/insurance/getCountTask',
            suc:(data)=>{
                console.log(data)
                this.setState({
                    lossNo:data.data.lossNo,
                    taskId:data.data.taskId,
                    reportNo:data.data.reportNo
                })
            }
        })
        if(this.state.brandName){
            $('input[name=brandName]').val(this.state.brandName)
        }
    }
    componentWillMount(){
        this.props.location.state={...(this.props.location.state||{}),...(this.props.news||{}),...(this.props.xlcmap||{})}
        this.state={...(this.state||{}),...(this.props.location.state||{})}
    }
    componentWillUnmount(){

    }
    render(){
        console.log(this.state)
        return(
            <div>
                <div>
                    <this.props.BaseLi style={{padding:'0.15rem 0 0rem 0',margin:'0.1rem'}} data={[
                        {
                            typeName:'reportPersonName',
                            key: '车主姓名',
                            input: true,
                            val: this.state.reportPersonName||'',
                            placeholder:'请输入车主姓名',
                            change: (e) => {
                                this.setState({reportPersonName: e})
                            },
                            blur:()=> {
                                this.blur()
                            }
                        },{
                            typeName:'reportMoblePhone',
                            key: '车主电话',
                            input: true,
                            val: this.state.reportMoblePhone||'',
                            placeholder:'请输入车主电话',
                            maxlength:11,
                            change: (e1) => {
                                if(isNaN(e1)){
                                    this.props.promptInfo({
                                        content:"车主电话必须为数字",
                                        Prompt:true
                                    })
                                }else{
                                    this.setState({reportMoblePhone: e1})
                                }
                            },
                            blur:()=> {
                                this.blur()
                            }
                        }
                    ]} {...this.props} T={this}/>
                </div>
                <div style={{padding:'0rem 0 0.15rem 0',margin:'0 0.1rem',background:'#fff',position:'relative'}}>
                    <ul style={{display:'flex'}}>
                        <li style={{flex:'1'}}>
                            <this.props.BaseLi data={[
                                {
                                    typeName:'plateNo',
                                    key: '车牌号码',
                                    capital: true,
                                    isMust: true,
                                    input: true,
                                    maxlength:10,
                                    val: this.state.plateNo||'',
                                    placeholder: '录入或扫描行驶证',
                                    change: (e) => {
                                        this.setState({plateNo: e})
                                    },
                                    blur:()=> {
                                        this.blur()
                                    }
                                }
                            ]} {...this.props} T={this}/>
                            <ul className="baseLi">
                                <li className="style1" style={{position:'relative'}}>
                                    <div className="LiTRight">
                                        <div className="onece">
                                            <span className="listValue" style={{flex:'none'}}>车辆品牌</span>
                                            <input type="text" style={{flex:'1',border:'0px',padding:'0 4vw',overflow:'hidden'}} placeholder="选择或扫描行驶证" name="brandName"
                                                   onFocus={this.brandArr} onBlur={this.TBlur} onChange={this.brandArr}/>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div className="brandItem" style={{height:'3rem',position:'absolute',overflow:'hidden',zIndex:9999}}>
                                <ul
                                    onTouchEnd={this.touchs.bind(this,'end')}
                                    onTouchMove={this.touchs.bind(this,'move')}
                                    onTouchStart={this.touchs.bind(this,'start')}
                                    style={{overflow:'hidden',position:'relative'}}
                                >
                                    {this.state.carList.map((item,index)=>{
                                        return(
                                            <li key={index} onClick={this.xCar.bind(this,item,'brand')}>{item.brandName}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </li>
                        <li style={{width:'1.8rem',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}} onClick={this.ocr}>
                            <span className="saomiao"></span><span style={{paddingTop:'0.2rem',color:'#70A9FD'}}>扫描行驶证</span>
                        </li>
                    </ul>
                </div>
                <div style={{margin:'0.1rem',background:'#fff',display:'flex'}}>
                    <div style={{flex:'1',paddingLeft:'0.2rem'}} className="mapinput">
                        <span style={{display:'block',padding:'0.2rem 0'}}>选择修理厂</span>
                        <this.props.BaseLi data={[
                            {
                                key: '',
                                input: true,
                                val:this.state.shotName||'',
                                disabled: true,
                                placeholder:'点开地图选择修理厂'
                            }
                        ]} {...this.props} T={this}/>
                        {/*<span style={{display:'block',padding:'0.2rem 0',color:'#9E9E9E'}}>{this.props.xlcmap?this.props.xlcmap.shotName:'点开地图选择修理厂'}</span>*/}
                    </div>
                    <div style={{width:'1.8rem',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}} onClick={this.choseaddress}>
                        <span className="ditu"></span>
                        <span style={{paddingTop:'0.2rem',color:'#70A9FD'}}>地图</span>
                    </div>
                </div>
                <div style={{margin:'0.1rem',background:'#fff'}}>
                   <h4 style={{padding:'0.2rem 0.2rem 0'}}>定损方式</h4>
                    <div style={{display:'flex',justifyContent:"center"}}>
                        <span className={this.state.waitloss?'looss1':'loss1'} onClick={this.waitloss}>等我到店拆解定损</span>
                        <span className={this.state.xlcloss?'looss2':'loss2'} onClick={this.xlcloss}>委托修理厂定损</span>
                        <span className={this.state.loss?'looss3':'loss3'} onClick={this.loss}>现场定损完毕</span>
                    </div>
                    <div className={this.state.loss?'blo':'noblo'}>
                        <this.props.BaseLi data={[
                            {
                                typeName:'fastConfirmLossMoney',
                                key: '定损金额',
                                input: true,
                                val: this.state.fastConfirmLossMoney,
                                change: (e) => {
                                    if(!isNaN(e)){
                                        this.setState({fastConfirmLossMoney: e})
                                    }
                                },
                                blur:()=> {
                                    this.blur()
                                }
                            }
                        ]} {...this.props} T={this}/>
                    </div>
                </div>
                <div className="remark" style={{margin:'0.1rem',background:'#fff'}}>
                    <h4 style={{padding:'0.2rem 0.2rem 0'}}>备注</h4>
                    <this.props.BaseLi  className="remark" data={[
                        {
                            typeName:'pushDesc',
                            key: '',
                            input: true,
                            val: this.state.pushDesc,
                            placeholder: '请填写备注信息',
                            change: (e) => {
                                this.setState({pushDesc: e})
                            },
                            blur:()=> {
                                this.blur()
                            }
                        }
                    ]} {...this.props} T={this}/>
                </div>
                <div className="caseBox" style={{background:'#fff',margin:'0.1rem',marginBottom:'1.3rem'}}>
                    <h4 style={{color:'#000',fontSize:'0.3rem'}}>上传照片</h4>
                    <div className="imgList">
                        <ul>
                            {this.state.imagList}
                            <li onClick={this.uploadImg.bind(this,'new')} style={{margin:'2.5% 2.5% 2.5% 2.5%'}}><span>+</span></li>
                        </ul>
                    </div>
                </div>
                <div style={{width:'100vw',height:'1.3rem',position:' fixed',bottom:'0',background:'#fff'}}>
                    <button onClick={this.newSubmit} style={{border:'0px',width:'92%',height:'0.9rem',position:' fixed',bottom:'0.2rem',left:'4%',background:'#5398FC',color:'#fff',borderRadius:'0.1rem',fontSize:'0.32rem'}}>确认推修</button>
                </div>
                {this.state.showEWMBol[0] && <ShowEWM imgPath22={this.state.imgPath} pushImgPath={this.state.pushImgPath} showEWM={this.showEWM}/>}
            </div>
        )
    }
}