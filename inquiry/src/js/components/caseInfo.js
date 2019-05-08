/**
 * Created by Administrator on 2016/8/26 0026.
 */
import React from 'react';
import $ from "jquery";
import VehicleInfo from './vehicleInfo';
import verification from '../../../../config/verification'
import {ChooseXLC} from "../../../../common/assembly/somejs"
import ChangeTitle from '../../../../common/baseFun/someEvent'
//import cookie from '../cookieJs';
import ShowEWM from '../assembly/showEWM'
const  CaseInfo= React.createClass({
    getInitialState() {
        return {
            tmxhavepjType:0, tmxCarType:0,
            registPersion:"",
            registPersionPhone:"",
            modalState:"",
            modalStated:"",
            scmodalState:false,
            carList:[],
            XCCList:[],
            XLCData:{},
            dataBrand:{
                userName:"lexiugo",
                passwd:"n27H3lNGL7wJSePFsrr0g16UTU0+tDfsGHMVZ2pmxsDaFV4cVSzVwQ==",
            },
            type1:{
                pushSource:'W',//微信标识
                reportNo:'',
                lossNo:'',
                registPersion:'',
                registPersionPhone:'',
                reportPersonName:'',
                reportMoblePhone:'',
                plateNo:'',
                fastConfirmLossMoney:0,
                repairType:'0',
                tmxCarType:'0',
                tmxhavepjType:'0',
                taskType:'0201',
                lossWay:'2',
                xlcRepairLevel:'com',
            },
            type2:{
                brandName:'',
                brandId	:'',
                importFlag:'',
                brandCode:'',
                brandInitial:'',
                VehicleModel:'',
                familyAbbr:'',
                vin:'',
                xlcName:'',
                xlcCode:'',
            },
            type3:{
                checkPhotoes:[]
            },
            paramData:[],
            imagList:[],
            showEWMBol:[]
    }
    },

    componentDidMount: function () {
        ChangeTitle.ChangeTitle('推修车辆');
        $.ajax({
            url: "/lexiugo-app/user/getUserinfo?zw=DSY&url="+window.location.href,
            dataType: "json",
            data:{zw:'DSY'},
            type: "post",
            success: function(msg) {
                const data= msg.data.LxAqYhxxb;
                console.log(msg,'getUserinfo');
                if(data){
                    this.setState({
                        registPersion:data.registPersion ? data.registPersion : ''
                        ,registPersionPhone:data.registPersionPhone ? data.registPersionPhone :''
                    });
                }
                console.log(this.state.registPersion,'registPersion');
            }.bind(this)
        });
        $.ajax({
            url: "/lexiugo-app/weixin/insurance/getCountTask",
            dataType: "json",
            type: "post",
            success: function(msg) {
                console.log(msg,'getCountTask');
                const reportNo= msg.data.reportNo
                const lossNo= msg.data.lossNo
                const taskId=msg.data.taskId
                this.setState({type1:Object.assign({},this.state.type1,{reportNo:reportNo,lossNo:lossNo,taskId:taskId})})
            }.bind(this)
        });
    },
    formOnSubmit(e){
        e.preventDefault();
        const arr={
            ggSelectIns:{name:'保险公司',type:'def'},
            registPersion:{name:'推修人姓名',type:'def'},
            registPersionPhone:{name:'推修人电话',type:'phone'},
            xlcName:{name:'修理厂名称'},
            xlcCode:{name:'修理厂id'},
            reportNo:{name:'报案号'},
            lossNo:{name:'定损单号'},
            reportMoblePhone:{name:'车主电话',type:'phone'},
            reportPersonName:{name:'车主姓名'},
            plateNo:{name:'车牌号'},
            tmxhavepjType:{name:'是否有配件'},
            tmxCarType:{name:'推车类型'}
        };
        for(var key in arr){
            if(!this.valueData($('input[name='+key+']').val(),arr[key].type,arr[key].name)){
                return;
            };
        }
        /*if($("input[name='registPersion']").val()==""){
            this.valueData($("input[name='registPersion']").val(),'def','推修人姓名');
        }else if($("input[name='registPersionPhone']").val()==""){
            this.valueData($("input[name='registPersion']").val(),'phone','推修人电话');
        }else if($("input[name='xlcName']").val()==""){
            this.setState({modalState:"修理厂名称尚未填写"})
        }/!*else if($("input[name='xlcCode']").val()==""){
            this.setState({modalState:"请点选修理厂名称进行填写"})
        }*!/else if($("input[name='reportNo']").val()==""){
            this.setState({modalState:"报案号尚未填写"})
        }else if($("input[name='lossNo']").val()==""){
            this.setState({modalState:"定损单号尚未填写"})
        }else if($("input[name='reportMoblePhone']").val()==""){
            this.setState({modalState:"车主电话尚未填写"})
        }else if($("input[name='reportPersonName']").val()==""){
            this.setState({modalState:"车主姓名尚未填写"})
        }else if($("input[name='plateNo']").val()==""){
            this.setState({modalState:"车牌号尚未填写"})
        }else {*/
            this.setState({scmodalState:true});
            var dataArr= $("#caseInfoForm").serializeArray();
            $.ajax({
                url: "/lexiugo-app/weixin/insurance/basic",
                data:dataArr,
                dataType: "json",
                type: "post",
                success: function(msg) {
                    this.setState({scmodalState:false});
                    this.props.history.replaceState(this.state.reInfo,"/vehicleInfo?tmxhavepjType="+$('.tmxhavepjType').val() || 0+'&tmxCarType='+$('.tmxCarType').val() || 0)
                }.bind(this),
                error: function(xhr, status, err) {
                    this.setState({scmodalState:false});
                    this.setState({modalState:err.toString()})
                }.bind(this)
            });

    },
    valueData(data,type,text){
        var isTrue=true;
        switch(type){
            case 'phone':
                if(data==''){
                    this.setState({modalState:text+"尚未填写"});
                    isTrue=false;
                }else if(!(/^1[34578]\d{9}$/.test(data))){
                    this.setState({modalState:text+"格式错误"})
                    isTrue=false;
                }
                break;
            case 'plateNo':
                var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
                if(false){//!(express.test(data))
                    this.setState({modalState:text+"填写不正确"})
                    isTrue=false;
                }else if(data==''){
                    this.setState({modalState:text+"尚未填写"})
                    isTrue=false;
                }
                break;
            case 'vin':
                if(!verification.vin(data) && data){
                    this.setState({modalState:text+"格式错误"});
                    isTrue=false;
                }
                break;
            default:
                if(data=='' || !data){
                    this.setState({modalState:text+"尚未填写"})
                    isTrue=false;
                }
        }
        return isTrue;
    },
    modalStateChange(){
        if (this.state.modalState=="推修请求成功"){
            this.props.history.replaceState(null, "/caseInfo");
        }
        this.setState({modalState: ""});
    },
    handleChange(e) {
        var newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    },
    toRecord(){
        this.props.history.replaceState(null, "/record")
    },
    changeCheck(e){
        var newState = {};
        newState[e.target.name] = e.target.value;
        if($('input[name='+e.target.name+']').is(':checked')){
            newState[e.target.name]=1;
        }else{
            newState[e.target.name]=0;
        }
        this.setState(newState);
    },
    //隔断
    changeModel(obj,e){
        console.log(e.target.value.toUpperCase());
        var newState={};
        newState[e.target.name]=e.target.value;
        if(e.target.name=='lossWay' && e.target.value*1==3){
            this.props.project.setProps({
                PromptData:{content:'您现在选择的是现场快速定损模式，请录入定损金额并上传定损单照片，否则，请重新选择',Prompt:true,onlyOK:true,fun:(e,close)=>{
                    this.setState({[obj]:Object.assign({},this.state[obj],newState)});
                    close();
                }}
            })
            return;
        }

        this.setState({[obj]:Object.assign({},this.state[obj],newState)});
    },
    toUppe(obj,e){
        var newState={};
        newState[e.target.name]=e.target.value.toUpperCase();
        e.target.value=newState[e.target.name];
        this.setState({[obj]:Object.assign({},this.state[obj],newState)});

    },
    paramUrl () {
        var uri = new Array();
        var paramData = this.state.paramData;
        for( var i in paramData ) {
            var imageType = paramData[i]['imageType'];
            var serverId = paramData[i]['serverId'];
            var n = 'array[' + i + '].';
            uri.push( n + 'imageType=' + imageType + '&' + n + 'serverId=' + serverId );
        }
        uri.push( 'address=' + this.state.address );
        return uri.join("&");
    },
    newSubmit(){
        const _this=this;
        /*this.props.history.replaceState(this.state.reInfo,"/vehicleInfo")
        return;*/
       // this.showEWM("/home/weblogic/lexiu_path/app//twoCode/TMXC2017072000991DSTMXC2017072000992TMXC2017072000990TMXC0032017090600007.png")

        this.setState({scmodalState:true})
        var arr={
            ggSelectIns:{name:'保险公司',type:'def'},
            reportNo:{name:'报案号',type:'def'},
            lossNo:{name:'定损单号',type:'def'},
            reportPersonName:{name:'车主姓名',type:'def'},
            reportMoblePhone:{name:'车主电话',type:'phone'},
            plateNo:{name:'车牌号',type:'plateNo'},
            fastConfirmLossMoney:{name:'快速定损金额',type:'def'},
            vin:{name:'vin码',type:'vin'},
            brandName:{name:'车辆品牌',type:'def'},
            brandCode:{name:'车辆品牌',type:'def'},
            xlcName:{name:'修理厂名称',type:'def'},
            xlcCode:{name:'修理厂id',type:'def'},
        };
        if(!(this.props.user.data.LxAqZz.zzType*1==3 && this.props.user.data.LxAqYhxxb.zw=='GG')){
            delete arr['ggSelectIns'];
        }
        this.state.type1.lossWay!=3 && (delete arr['fastConfirmLossMoney'])
        var arrs=Object.assign({},this.state.type2,this.state.type1)
        for(var key in arr){
            if(!this.valueData(arrs[key],arr[key].type,arr[key].name)){
                $('input[name='+key+']').css({border:'1px solid red'}).focus();
                setTimeout(function(){
                    _this.setState({modalState:""})
                },1500)
                return;
            }else{
                $('input[name='+key+']').css({border:'1px solid #ccc'})
            };
        }
        if(this.state.type1.lossWay==3 && !this.state.paramData[0]){
            this.props.project.setProps({
                PromptData:{content:'快速定损时必须上传查勘照片',Prompt:true}
            })
            return;
        }


        console.log(_this.state.type1,_this.state.type3,_this.state.type2);
        $.post("/lexiugo-app/weixin/insurance/basic",_this.state.type1,function(data){
            _this.setState({modalStated:'已完成30%'})
            $.post("/lexiugo-app/weixin/insurance/vehicle",_this.state.type2,function(data1){
                _this.setState({modalStated:'已完成80%'})
                $.post("/lexiugo-app/weixin/insurance/push",_this.imgShow(),function(data2){
                    if(data2.mess=='推修成功|图片下载失败' || data2.mess=='推修成功' || data2.mess=='推修请求成功') {
                        _this.setState({modalStated: '已完成100%'})
                        _this.setState({modalStated: ''})
                        _this.showEWM(data2.data.pushImgPath);//encoderContent pushImgPath
                    }
                   // _this.setState({modalState:data2.mess});
                    /*setTimeout(()=>{
                        if(data2.mess=='推修成功|图片下载失败' || data2.mess=='推修成功' || data2.mess=='推修请求成功'){
                            if(data2.imgPath){
                                _this.showEWM(data2.data.encoderContent);
                            }else{
                                _this.props.history.replaceState(null, "/Record");
                            }

                        }
                    },2000)*/
                })
            })
        })
    },
    showEWM(url){
        this.setState({pushImgPath:url})
        if(url=='open'){
            this.setState({showEWMBol:[false]})
            this.props.history.replaceState(null, "/record")

        }else{
            this.setState({showEWMBol:[true]})
        }
        /*const html = (<div className="showEWM">
            <div>
            <img src={"http://www.beidouchaxun.cn/toumingxiu/jyshowPhoto/getUrl.do?photoUrl="+url} alt=""/>
            </div>
        </div>)
        var newState=[true,html];
        this.setState({showEWMBol:newState})*/
    },
    //查询修车厂
    xlcHandleChange(e){
        if(!this.state.type2.brandName || !this.state.type2.brandCode){
            this.props.promptInfo({
                content: '选择修理厂前，请先选择车辆品牌！', Prompt: true
            })
            return;
        }
        this.setState({XLCData:{
            brandName:this.state.type2.brandName || '',
            tmxhavepjType:this.state.type1.tmxhavepjType || '',
            tmxCarType:this.state.type1.tmxCarType || '',
            xlcRepairLevel:this.state.type1.xlcRepairLevel || ''
        }})
        const data= e.target.value
        this.setState({xlcData:data});
        var brandName=$('input[name=brandName]').val();
        var tmxhavepjType=this.props.location.query.tmxhavepjType;
        var tmxCarType=this.props.location.query.tmxCarType;
        var _this=this;
        $('.brandItem').eq(1).show();
        $.ajax({
            url: "/lexiugo-app/weixin/insurance/getXlc",
            data:{
                val:data,
                brandName:this.state.type2.brandName,
                tmxhavepjType:this.state.type1.tmxhavepjType,
                tmxCarType:this.state.type1.tmxCarType,
                xlcRepairLevel:this.state.type1.xlcRepairLevel,
                brandCode:this.state.type2.brandCode
            },
            dataType: "json",
            type: "post",
            success: function(msg) {
                var XCCList=[];
                var list=msg.data.xlc;
                for(var i in list){
                    XCCList.push(<li key={i} onClick={_this.xCar.bind(_this,list[i],'xcc')}>{list[i].libShotName}</li>)
                }
                _this.setState({XCCList:XCCList})
            }.bind(this)
        });
    },
    //查询车辆品牌
    brandArr(e){
        var type2=this.state.type2
        type2.brandCode='';
        type2.xlcName='',type2.xlcCode='';
        var datase=e.target.value;
        if(type2.brandName && !datase){
            return;
        }
        type2.brandName=e.target.value;
        $('input[name=xlcName]').val('')
        this.setState({type2:type2})
        const _this=this;
        $('.brandItem').eq(0).slideDown();
        $.ajax({
            url:"/server/BQXX",
            data:{data:'/brand/getBrandCode/'+(this.state.type2.brandName || 'a')},
            type: "post",
            success: function(msg) {
                let carList=[];
               for(var i in msg.result){
                   carList.push(<li key={i} onClick={_this.xCar.bind(_this,msg.result[i],'brand')}>{msg.result[i].brandName}</li>)
               }
                _this.setState({carList:carList})
            }
        })
    },
    TBlur(){
        setTimeout(()=>{
            $('.brandItem').slideUp()
        },200)
    },
    xCar(obj,type,e){
        var mtc={}
        if(type=='brand'){
            $('input[name=brandName]').val(obj.brandName);
            mtc=obj;
        }else{
            $('input[name=xlcName]').val(obj.libShotName ||obj.shotName);
            mtc.xlcName=obj.libName||obj.name,mtc.xlcCode=obj.zzid|| obj.id;
        }
        this.setState({type2:Object.assign({},this.state.type2,mtc)});
        var xlcdata=this.state.XLCData;
        xlcdata.xlcName=mtc.xlcName
        this.setState({XLCData:xlcdata})
        $('.brandItem').hide();
    },
//上传图片
    uploadImg(how,e){
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
    _uploadImage(localIds){
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
    showImg(type,obj,e){
        wx.previewImage({
            current:obj,
            urls:[
                obj
            ]
        });
    },
    //处理字符串
    imgShow(){
        var uri = new Array(),paramData=this.state.paramData;
        for( var i in paramData ) {
            var imageType = paramData[i]['imageType'];
            var serverId = paramData[i]['serverId'];
            var n = 'array[' + i + '].';
            uri.push( n + 'imageType=survey_5&' + n + 'serverId=' + serverId );
        }
        uri.push( 'address=' + this.state.address );
        return uri.join("&");
    },
    goOut(){
        this.props.history.pushState(null,"/vehicleInfo")
    },
    Choice(m,e){
        if(m=='open'){
            if((!this.state.type2.brandName || !this.state.type2.brandCode) && !this.state.mapState){
                this.props.promptInfo({
                    content: '选择修理厂前，请先选择车辆品牌！', Prompt: true
                })
                return;
            }
            this.setState({mapState:!this.state.mapState})
        }else{
            this.xCar(m,"xcc",null);
            $('.choseXlcInput').val(m.name);
            this.Choice('open')
        }
    },
    ChooseXLC(m,b,fun,e){
        if(b){
            this.xCar(m,"xcc",null);
        }else {
            var datm=this.state.XLCData;
            if(!datm.tmxCarType){
                this.setState({XLCData:{
                    brandName:this.state.type2.brandName || '',
                    tmxhavepjType:this.state.type1.tmxhavepjType || '',
                    tmxCarType:this.state.type1.tmxCarType || '',
                    xlcRepairLevel:this.state.type1.xlcRepairLevel || ''
                }},()=>{
                        fun();
                    }
                )
            }else if(m){
                datm.xlcRepairLevel=m
                this.setState({XLCData:datm},()=>{
                    if(fun){
                        fun();
                    }
                })
            }
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
    baoxiangongsi(m,e){
        e.target.nextElementSibling.style.display='block'
        $.post('/lexiugo-app/gg/getGgSelectIns ',(dat)=>{
            console.log(dat)
            if(dat.code=='0000'){
                var newstate=[];
                console.log(dat.data,dat.data.getGgSelectIns)
                for(var i in dat.data.getGgSelectIns){
                    newstate.push(
                        <li key={i} style={{padding:'0.1rem 0.3rem'}} onClick={this.updastet.bind(null,dat.data.getGgSelectIns[i],i)}>{dat.data.getGgSelectIns[i]}</li>
                    )
                }
                this.setState({baoxian:newstate})
            }
        })
    },
    updastet(dats,it) {
        $('input[name=ggSelectIns]').val(dats);
        var newStates = {};
        newStates.ggSelectIns = it;
        this.setState({type1: Object.assign({}, this.state.type1, newStates)}, () => {
            $('.brandItemse').hide();
        });
    },
    render(){
        const LinkActiveStyle = {
            color: "#1E7BE3",
            background: "#F5F5F5"
        }
        return (
            <div className="caseInfo Rcontainer">
                <div className="caseBox">
                    <h4 onclick={this.goOut}>推修信息</h4>
                    <div className="caseBox" style={{padding:0}}>
                        {
                            this.props.user.data.LxAqZz.zzType*1==3 && (this.props.user.data.LxAqYhxxb.zw).indexOf('GG')==0  &&
                            <li>
                                <input type="text" placeholder="案件所属公司*必填" name="ggSelectIns" onFocus={this.baoxiangongsi.bind(this,'null')} onChange={this.baoxiangongsi.bind(this,'null')}/>
                                <div  className="brandItemse" style={{display:'none',width:'100%',background:'#fff',maxHeight:'3rem',position:'absolute',overflow:'hidden',zIndex:99}}>
                                    <ul
                                        onTouchEnd={this.touchs.bind(this,'end')}
                                        onTouchMove={this.touchs.bind(this,'move')}
                                        onTouchStart={this.touchs.bind(this,'start')}
                                        style={{overflow:'hidden',position:'relative'}}
                                    >
                                        {this.state.baoxian}
                                    </ul>
                                </div>
                            </li>
                        }
                    </div>
                    <ul className="radioType">
                        <li style={{display:'none'}}>
                            <span>推车类型</span>
                            <span><input type="radio" defaultChecked value="0" name="tmxCarType" id="tmxCarType1" onChange={this.changeModel.bind(this,'type1')}/><label htmlFor="tmxCarType1">乘用车</label></span>
                            <span><input type="radio" value="1" name="tmxCarType" id="tmxCarType2" onChange={this.changeModel.bind(this,'type1')}/><label htmlFor="tmxCarType2">商用车</label></span>
                        </li>
                        <li style={{display:'none'}}>
                            <span>推修类型</span>
                            <span><input type="radio" defaultChecked value="0" name="repairType" id="repairType" onChange={this.changeModel.bind(this,'type1')}/><label htmlFor="repairType">送修</label></span>
                            <span>{/*<input type="radio" value="1" name="repairType" id="repairType1" onChange={this.changeModel.bind(this,'type1')}/><label htmlFor="repairType1">返修</label>*/}</span>
                        </li>
                        <li style={{display:'none'}}>
                            <span>有无配件</span>
                            <span><input type="radio" defaultChecked value="0" name="tmxhavepjType" id="tmxhavepjType" onChange={this.changeModel.bind(this,'type1')}/><label htmlFor="tmxhavepjType">有配件</label></span>
                            <span><input type="radio" value="1" name="tmxhavepjType" id="tmxhavepjType1" onChange={this.changeModel.bind(this,'type1')}/><label htmlFor="tmxhavepjType1">无配件</label></span>
                        </li>
                        <li>
                            <span>案件车辆</span>
                            <span><input type="radio" defaultChecked value="0201" name="taskType" id="taskType" onChange={this.changeModel.bind(this,'type1')}/><label htmlFor="taskType">标的</label></span>
                            <span><input type="radio" value="0202" name="taskType" id="taskType1" onChange={this.changeModel.bind(this,'type1')}/><label htmlFor="taskType1">三者车</label></span>
                        </li>
                        <li>
                            <span>车辆级别</span>
                            <span><input type="radio" defaultChecked value="com" name="xlcRepairLevel" id="xlcRepairLevel" onChange={this.changeModel.bind(this,'type1')}/><label htmlFor="xlcRepairLevel">常规</label></span>
                            <span><input type="radio" value="adv" name="xlcRepairLevel" id="xlcRepairLevel1" onChange={this.changeModel.bind(this,'type1')} /><label htmlFor="xlcRepairLevel1">高端</label></span>
                        </li>
                        <li>
                            <span>推估损方式</span>
                            <span><input type="radio" defaultChecked value="2" name="lossWay" id="lossWay1" onChange={this.changeModel.bind(this,'type1')}/><label htmlFor="lossWay1">到店辅助</label></span>
                            <span><input type="radio" value="1" name="lossWay" id="lossWay" onChange={this.changeModel.bind(this,'type1')} /><label htmlFor="lossWay">全权委托</label></span>
                        </li>
                        <li>
                            <span></span>
                            <span><input type="radio" value="3" name="lossWay" id="KS" onChange={this.changeModel.bind(this,'type1')} /><label htmlFor="KS">现场快速定损</label></span>
                        </li>
                    </ul>
                </div>
                 <div className="caseBox">
                     <h4>案件信息</h4>
                     <ul>
                         <li><input type="text" placeholder="" value={this.props.project.user.data.LxAqYhxxb.yhxm} disabled="disabled"  name="registPersion"  /></li>
                         <li><input type="text" placeholder="车主姓名*必填" name="reportPersonName" onChange={this.changeModel.bind(this,'type1')}/></li>
                         <li><input type="tel" placeholder="车主电话*必填" name="reportMoblePhone" onChange={this.changeModel.bind(this,'type1')} /></li>
                         <li><input type="text" placeholder="车牌号*必填" name="plateNo" onBlur={this.toUppe.bind(this,'type1')}/></li>
                         {this.state.type1.lossWay==3 &&  <li><input type="number" placeholder="定损金额*必填" name="fastConfirmLossMoney" onChange={this.toUppe.bind(this,'type1')} onBlur={this.toUppe.bind(this,'type1')}/></li>}
                         <li><input type="text" placeholder="报案号" name="tmxReportNo"  onBlur={this.toUppe.bind(this,'type1')}/></li>
                         <li>
                             <input type="hidden" placeholder="报案号*必填" name="reportNo" onChange={this.changeModel.bind(this,'type1')}/>
                             <input type="hidden" placeholder="定损单号*必填" name="lossNo" onChange={this.changeModel.bind(this,'type1')}/>
                         </li>
                     </ul>
                 </div>
                <div className="caseBox">
                    <h4>车辆信息</h4>
                    <ul>
                        <li>
                            <input type="text" placeholder="选择车辆品牌*必填" name="brandName" onFocus={this.brandArr} onBlur={this.TBlur} onChange={this.brandArr}/>
                            <div  className="brandItem" style={{height:'3rem',position:'absolute',overflow:'hidden',zIndex:9999}}>
                                <ul
                                    onTouchEnd={this.touchs.bind(this,'end')}
                                    onTouchMove={this.touchs.bind(this,'move')}
                                    onTouchStart={this.touchs.bind(this,'start')}
                                    style={{overflow:'hidden',position:'relative'}}
                                >
                                    {this.state.carList}
                                </ul>
                            </div>

                        </li>
                        <li><input type="text" placeholder="车系简称" name="familyAbbr" onChange={this.changeModel.bind(this,'type2')} /></li>
                        <li><input type="text" placeholder="VIN" name="vin" onChange={this.changeModel.bind(this,'type2') } onBlur={this.toUppe.bind(this,'type2')} /></li>
                        <li>
                            <input type="text" name="xlcName" placeholder="修理厂名称*必填" onChange={this.xlcHandleChange} onFocus={this.xlcHandleChange} onBlur={this.TBlur}/>
                            <input className="mapButtom" type="button" value="地图点选" onClick={this.Choice.bind(this,'open')}/>
                            {/*<ChooseXLC data={this.state.XLCData} />*/}
                            <div className="brandItem junt19" style={{height:'3rem',position:'absolute',overflow:'hidden'}}>
                                <ul
                                    onTouchEnd={this.touchs.bind(this,'end')}
                                    onTouchMove={this.touchs.bind(this,'move')}
                                    onTouchStart={this.touchs.bind(this,'start')}
                                    style={{overflow:'hidden',position:'absolute'}}
                                >
                                    {this.state.XCCList}
                                </ul>
                            </div>
                            <input className="mapButtom" type="button" value="地图点选" onClick={this.Choice.bind(this,'open')}/>
                            {/*<ChooseXLC ChooseXLC={this.ChooseXLC} data={this.state.XLCData} />*/}
                        </li>
                    </ul>
                </div>
                <div className="caseBox">
                    <h4>查勘照片</h4>
                    <div className="imgList">
                        <p>请上传完整的清晰的各位置</p>
                        <ul>
                            {this.state.imagList}
                            <li onClick={this.uploadImg.bind(this,'new')}><span>+</span></li>
                        </ul>
                    </div>
                </div>
                <div className="bottomSubmit">
                    <button className="publicBtn" type="submit" onTouchEnd={this.newSubmit} >确认并推修</button>
                </div>






                {/*<div className="headerInfo">
                    <span className="newBuildBtn" onClick={this.toRecord}>列表</span>
                    新建推修
                </div>
                <div className="menuList">
                    <span style={LinkActiveStyle}>案件信息</span>
                </div>
            <form id="caseInfoForm" name="caseInfoForm"  onSubmit={this.formOnSubmit}>
            <table border="0">
            <tbody>
            <tr>
                <td className="tdShort"><input className="form-input"  autoComplete="off"  onChange={this.handleChange} name="registPersion" placeholder="必填*推修人姓名" type="text" /></td>
                <td>
                    <label htmlFor="sx">送修</label>
                    <input type="radio" defaultChecked name="repairType" id="sx" value="0"/>
                </td>
                <td>
                    <label htmlFor="fx">返修</label>
                    <input type="radio" name="repairType" id="fx" value="1" />
                </td>
            </tr>
            <tr>
                <td>
                    <label htmlFor="sxp">是否有配件</label>
                    <input type="checkbox" name="tmxhavepjType" onChange={this.changeCheck} className="tmxhavepjType" id="sxp" value={this.state.tmxhavepjType}/>
                    <input type="hidden" name="tmxhavepjType" value={this.state.tmxhavepjType}/>
                </td>
                <td style={{paddingLeft:'0px',paddingRight:'0px'}}>
                    <label htmlFor="fxs">是否商用车</label>
                    <input type="checkbox" name="tmxCarType" onChange={this.changeCheck} class="tmxCarType" id="fxs" value={this.state.tmxCarType}  />
                    <input type="hidden" name="tmxCarType" value={this.state.tmxCarType}/>
                </td>
            </tr>

            <tr><td colSpan="3"><input className="form-input"  name="registPersionPhone" autoComplete="off"   onChange={this.handleChange} placeholder="必填*推修人电话" type="tel" /></td></tr>

            <tr hidden="hidden"><td colSpan="3"><input className="form-input"  name="reportNo" value={this.state.reportNo} onChange={this.handleChange} placeholder="必填*报案号" type="text" /></td></tr>
            <tr hidden="hidden"><td colSpan="3"><input className="form-input"  name="lossNo" value={this.state.lossNo} onChange={this.handleChange} placeholder="必填*定损单号" type="text" /></td></tr>
            <tr><td colSpan="3"><input className="form-input"  name="reportMoblePhone" placeholder="必填*车主电话" type="tel" /></td></tr>
            <tr>
            <td className="tdShort"><input className="form-input" name="reportPersonName" placeholder="必填*车主姓名" type="text" /></td>
            <td>
            <label htmlFor="zc">主车</label>
            <input type="radio" defaultChecked name="taskType" id="zc" value="0201" />
            </td>
            <td>
            <label htmlFor="szc">三者车</label>
            <input type="radio" name="taskType" id="szc" value="0202" />
            </td>
            </tr>
            <tr><td colSpan="3"><input className="form-input" name="plateNo" placeholder="必填*车牌号" type="text" /></td></tr>
            <tr>
            <td style={{textAlign:"right"}}>估损方式:
            </td>
            <td colSpan="2" style={{textAlign:"left"}}>
            <input type="radio" defaultChecked name="lossWay" value="1" id="qqwt" />
            <label htmlFor="qqwt">全权委托(开拆)</label>
            </td>
            </tr>
            <tr>
            <td></td>
            <td colSpan="2" style={{textAlign:"left"}}>
                <input type="radio" name="lossWay" value="2" id="ddfz" />
                <label htmlFor="ddfz">到店辅助(先别动)</label>
                </td>
            </tr>
            </tbody>
            </table>
            <button className="publicBtn" type="submit">提交并下一步</button>
            </form>*/}

                <div className="weui_dialog_alert" style={this.state.modalState==""?{display:"none"}:{display:"block"}}>
                    <div className="weui_mask"></div>
                    <div className="weui_dialog">
                        <div className="weui_dialog_hd"><strong className="weui_dialog_title" onClick={this.modalStateChange}></strong></div>
                        <div className="weui_dialog_bd">{this.state.modalState}</div>
                        <div className="weui_dialog_ft">
                            <a className="weui_btn_dialog primary" onClick={this.modalStateChange}>确定</a>
                        </div>
                    </div>
                </div>
                <div className="weui_dialog_alert" style={this.state.modalStated==""?{display:"none"}:{display:"block"}}>
                    <div className="weui_mask"></div>
                    <div className="weui_dialog">
                        <div className="weui_dialog_bd">{this.state.modalStated}</div>
                    </div>
                </div>


                <div id="loadingToast" className="weui_loading_toast" style={this.state.scmodalState?{display:"block"}:{display:"none"}}>
                    <div className="weui_mask_transparent"></div>
                    <div className="weui_toast">
                        <div className="weui_loading">
                            <div className="weui_loading_leaf weui_loading_leaf_0"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_1"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_2"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_3"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_4"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_5"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_6"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_7"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_8"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_9"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_10"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_11"></div>
                        </div>
                    </div>
                </div>
                {this.state.mapState&&<div className="SMap"><VehicleInfo xlcRepairLevel={this.state.type1.xlcRepairLevel} types={{...this.state.type1,...this.state.type2,...this.state.type3}} Choice={this.Choice}/></div>}
                {this.state.showEWMBol[0] && <ShowEWM imgPath22={this.state.imgPath} pushImgPath={this.state.pushImgPath} showEWM={this.showEWM}/>}
            </div>
        )
    }
})
export default CaseInfo