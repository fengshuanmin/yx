/**
 * Created by Administrator on 2016/7/23 0023.
 * APP维修
 */
import React from 'react';
import $ from 'jquery';
import {IconFont,HeaderIf,ModalBg} from '../commonComponent/common'
import cookie from '../commonComponent/cookieJs'
import verification from '../../../../config/verification'
import ChangeTitle from '../../../../common/baseFun/someEvent'
import {BaseLi,SubmitOk} from '../../../../common/assembly/Stateless';
require('../../css/windurl.css')
const Receive_detail = React.createClass({
    getInitialState(){
        return{
            dis:false,
            receGiveUP:"0",
            phoneType:true,
            showDio:false,
            dataBrand:{
                userName:"lexiugo",
                passwd:"n27H3lNGL7wJSePFsrr0g16UTU0+tDfsGHMVZ2pmxsDaFV4cVSzVwQ==",
            },
            type2:{
                vin:''
            },
            data:{},
            carList:[],
            err:{
                aa:'1'
            },
            carsflag:false,
            vehicleName:''
        }
    },
    //请求
    loadCommentsFromServer: function(data) {
        this.serverRequest=$.ajax({
            url: "/lexiugo-app/weixin/AfterMarketLoginServlet",
            data:data,
            //contentType: "application/x-www-form-urlencoded; charset=ISO8859-1",
            //contentType: "application/javascript",
            dataType: "json",
            //jsonp: "callback",
            type: "post",
            success: function(msg) {
                if(msg.data.ResponseMessage == "放弃成功"){
                    this.setState({ResponseMessage:"放弃成功"});
                }else if(msg.data.ResponseCode == "0000"){
                    this.setState({ResponseMessage:"接车成功"});
                }else if(msg.data.ResponseCode == "0010"){
                    this.setState({ResponseMessage:"接车失败"});
                }else if(msg.data.ResponseCode == "0018"){
                    this.setState({ResponseMessage:"放弃失败"});
                }
                console.log(this.state.ResponseMessage)
                this.modalState("sucOrfai");
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
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
    //文本框值改变调用
    handleChange(e) {
        var newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    },
    //接车确认  调用
    PickClick(){
        var data = {
            sendType: "0002",
            taskId: this.props.location.state.id,
        };
        this.loadCommentsFromServer(data);
        this.modalState();

    },
    PickClick1(){
        console.log(this.props.location.state)
        this.props.history.replaceState({vinCode:this.props.location.state.vincode,
            id:this.props.location.state.id},'ComplementingInformation')
    },
    //放弃接车确认  调用
    giveClick(){
        if(!this.state.reasonDescrip || this.state.reasonDescrip.length<=10){
            this.setState({jb:true});
            return;
        }
        var data = {
            sendType: "0003",
            abandonReason: '4',//this.state.val,
            taskId: this.props.location.state.id,
            reasonDescrip:this.state.reasonDescrip
        };
        this.loadCommentsFromServer(data);
        this.modalState();
    },
    //详情调用
    receiveClick(){
        var detailsData = this.props.location.state;
        this.props.history.pushState(detailsData, "/receive_details")
    },
    //返回接车
    returnreceiveClick(){
        this.props.history.replaceState(null, "/XList");
    },
    //初始化渲染执行之后立刻调用
    componentDidMount: function() {
        var n = cookie.getCookie("userInfo")
        var u = navigator.userAgent;
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
            this.setState({phoneType:true});
        } else if (u.indexOf('iPhone') > -1) {//苹果手机
            this.setState({phoneType:false});
        }
        $('input[name=vin]').val(this.props.location.state.vincode);
        this.setState({yVin:this.props.location.state.vincode})
        $.ajax({
            url:"/lexiugo-app/weixin/insurance/isRead",
            data:{xlcBm:this.props.location.state.xlcbm,pushTaskId:this.props.location.state.id},
            dataType: "json",
            type: "post",
            success: function(msg) {
                console.log(msg);
            }
        })

    },
    dataPush(data,d,w,e){
        var cList=[];
        for(var i in data){
            var text=data[i].brandName || data[i].familyAbbr || data[i].groupName || data[i].vehicleName;
            data[i].textValue=text;
            cList.push(<li key={i} onClick={this.brandArr.bind(this,d+1,data[i])}>{text}</li>)
        }
        return cList;
    },
    //查询车辆品牌
    brandArr(d,c,e){
        const _this=this;
        if(c){
            this.setState({data:Object.assign({},this.state.data,c)});
            $('.infoSty li.jt').eq(d-1).find('.datList').hide();
            $('.infoSty li.jt').eq(d-1).find('input').val(c.textValue)
            if(d==4){
                return;
            }
        }else if(d==0){
            $('.infoSty li.jt').eq(1).hide().find('input').val('');
            $('.infoSty li.jt').eq(2).hide().find('input').val('');
            $('.infoSty li.jt').eq(3).hide().find('input').val('');
            _this.setState({data:{}});
        }
        var md=e && e.target && e.target.value ? md=e.target.value : '';
        var a={
            0:'/brand/getBrandCode/'+md,//获取品牌value
            1:'/family/getFamilyBrandId/'+c.brandId,//获取车系brandData[$(this).index()].brandId
            2:'/group/getGroupFamilyId/'+c.familyId,//获取车组
            3:"/vehicle/getVehicleGroupId/"+c.groupId, //+e.target.value+"";//获取车型 vehicleId
        }

        //$('.brandItem').eq(0).slideDown();
        $.ajax({
            url:"/server/BQXX",
            data:{data:a[d]},
            type: "post",
            success: function(msg) {
                var newCarList=_this.state.carList,j=0;
                newCarList[d]=(_this.dataPush(msg.result,d));
                _this.setState({carList:newCarList});
                d==0? j=d : j=d+1;
                $('.infoSty li.jt').eq(d).slideDown().find('.datList').fadeIn();
            }
        })
    },
    vinJX(){
        if(!verification.vin($('input[name=vin]').val())){
            this.setState({receGiveUP:'911'})
            this.setState({dis:!this.state.dis})
            this.setState({ResponseMessage:"VIN码格式错误"});
            return false;
        }
        $.get('/toumingxiu/app/vinAnalysis.do',{vinCode:$('input[name=vin]').val()},(data)=>{
            if(data.errorCode == '000000'){
                this.showCarInfo(data);
            }else{
                this.setState({receGiveUP:'911'})
                this.setState({dis:!this.state.dis})
                this.setState({ResponseMessage:"VIN码解析异常"});
            }
        })
    },
    showCarInfo(c,g){
        g=g||0;
        var a={
            0:'/family/getFamilyBrandId/'+c.brandId,//获取车系brandData[$(this).index()].brandId
            1:'/group/getGroupFamilyId/'+c.familyId,//获取车组
            2:"/vehicle/getVehicleGroupId/"+c.groupId, //+e.target.value+"";//获取车型 vehicleId
        }
        $.ajax({
            url:"/server/BQXX",
            data:{data:a[g]},
            type: "post",
            success: (msg)=>{
                switch(g){
                    case 0:
                        $('.infoSty li.jt').eq(0).show().find('input').val(c.brandName);
                        for(var i in msg.result){
                            if(msg.result[i].familyAbbr==c.familyName && msg.result[i].familyCode==c.familyCode){
                                var data = Object.assign({},c,msg.result[i])
                                this.showCarInfo(data,1,)
                            }
                        }
                        break
                    case 1:
                        $('.infoSty li.jt').eq(1).show().find('input').val(c.familyAbbr);
                        var data = Object.assign({},c,msg.result[0]);
                        data.textValue=c.familyAbbr;
                        this.brandArr(2,data,this);
                        break;
                    /*case 2:
                        $('.infoSty li.jt').eq(2).show().find('input').val(c.groupName);
                        var data = Object.assign({},c,msg.result[0])
                        $('.infoSty li.jt').eq(3).show().find('input').val(data.vehicleName);
                        this.setState({data:data})
                        break*/
                }
            }
        })
    },
    //提交补全信息
    Infosubmit(){
        var _this=this;
        var newData=_this.state.data;
        newData.pushTaskId=_this.props.location.state.id
        newData.vin=$('input[name=vin]').val();
        console.log(newData);
        var arr=[
            'vin',
            'brandId',
            'familyId',
            'groupId',
            'vehicleId',
            'pushTaskId',

        ]
        for(var i=0;i<arr.length;i++){
            if(!newData[arr[i]] || newData[arr[i]]==''){
                this.setState({receGiveUP:'911'})
                this.setState({dis:!_this.state.dis})
                if(arr[i]=='vin'){
                    this.setState({ResponseMessage:"VIN码必填"});
                }else{
                    this.setState({ResponseMessage:"请点选车辆信息"});
                }
                return;
            }else if(!verification.vin(newData[arr[i]]) && arr[i]=='vin'){
                this.setState({receGiveUP:'911'})
                this.setState({dis:!_this.state.dis})
                this.setState({ResponseMessage:"VIN码格式错误"});
                return false;
            }
        }
        $.ajax({
            url: "/lexiugo-app/weixin/insurance/perfectCarInfo",
            data:newData,
            dataType: "json",
            type: "post",
            success: function(msg) {
                if(msg=='1' || msg==1){
                    _this.modalState("receive")
                }else{
                    this.setState({receGiveUP:'911'})
                    this.setState({dis:!_this.state.dis})
                    this.setState({ResponseMessage:"信息补全失败"});
                }
            }
        })
    },
    vinval(e){
        console.log(e)
        this.setState({
            vin:e.target.value
        })
    },
    bfun(){
        var vn=$('input[name=vin]').val()
        var m =this.state.vin
        console.log(vn)
        if (!this.props.verification('vin', vn).isTrue) return
        this.props.ajax({
            loading: true,
            url: '/lexiugo-app/weixin/getCarsAnalysisVinByEpc',
            data: {vinCode: vn},
            suc: (data) => {
                if(data.code*1==7000) {
                    console.log(data.data)
                    if(data.data.cars){
                        this.setState({
                            vin:vn,
                            carsflag:true,
                            vecarList:data.data.cars
                        })
                    }

                }
            }
        })
    },
    quxiao(){
        this.setState({
            carsflag:false
        })
    },
    areaList(item){
        this.setState({
            vehicleName:item.vehicleName,
            carsflag:false,
            submitdata:item
        })
    },
    blur(){
        window.scrollTo(0, 0);
        console.log('bulr')
    },
    b2fun(){
        this.props.wxUpdata(1, (imgid, id, isend) => {
            this.props.ajax({
                loading: true,
                url: '/lexiugo-app/weixin/analysisVinPhoteByOcr',
                data: {serverId: id},
                suc: (msg) => {
                    if (msg.code * 1 == 7000) {
                        /*this.props.promptInfo({
                            content:msg,
                            Prompt:true
                        })
                        this.setState({
                            // vehicleName:msg.data.vehicleName,
                            vin:msg.data.vinCode,
                            // carsflag:true,
                            // vecarList:data.data.cars
                        })*/
                        $('input[name=vin]').val(msg.data.vinCode)
                        this.props.ajax({
                            loading: true,
                            url: '/lexiugo-app/weixin/getCarsAnalysisVinByEpc',
                            data: {vinCode:msg.data.vinCode},
                            suc: (data) => {
                                if(data.code*1==7000) {
                                    console.log(data.data)
                                    if(data.data.cars){
                                        this.setState({
                                            vin:msg.data.vinCode,
                                            carsflag:true,
                                            vecarList:data.data.cars
                                        })
                                    }

                                }
                            }
                        })
                    }else{
                        this.props.promptInfo({
                            content:"OCR解析失败",
                            Prompt:true
                        })
                    }
                }
            })
        })
    },
    areasubmit(){
        console.log(this.state)
        console.log(this.props)
        var requestData={
            pushTaskId:this.props.location.state.id,
            vin:this.state.vin,
            brandId:this.state.submitdata.brandId||"",
            brandName:this.state.submitdata.brandName,
            brandCode:this.state.submitdata.brandCode,
            importFlag:this.state.submitdata.importFlag||"",
            familyId:this.state.submitdata.familyId||"",
            familyAbbr:this.state.submitdata.familyName,
            familyCode:this.state.submitdata.familyCode||"",
            groupId:this.state.submitdata.groupId||"",
            groupName:this.state.submitdata.groupName,
            groupCodeOld:this.state.submitdata.groupCodeOld||"",
            groupCode:this.state.submitdata.groupCode||"",
            vehicleId:this.state.submitdata.vehicleId,
            vehicleName:this.state.submitdata.vehicleName,
            vehicleCode:this.state.submitdata.vehicleCode||""
        }
        console.log(this.props.location.state.push_TYPE)
        var nameapp=JSON.parse(localStorage.getItem("lexiuApp"))
        console.log(nameapp.username)
        console.log(nameapp.password)
        /* var requestapp={
             UserName:nameapp.username,
             Password:nameapp.Password,
             SendType:"0002",
             PushTaskId:this.props.location.state.id,
             PushType:this.props.location.state.push_TYPE,
             SystemFlag:"1",
             Key:'',
             DamageConditionList:""
         }*/
        this.props.ajax({
            loading: true,
            url: '/lexiugo-app/weixin/insurance/appPerfectCarInfo',
            data:requestData,
            suc: (msg) => {
                console.log(msg)
                if(msg=='1'){
                    this.props.ajax({
                        loading:true,
                        url:'/lexiugo-app/weixin/AfterMarketLoginServlet',
                        data:{sendType: "0002", taskId: this.props.location.state.id},
                        suc:(data)=>{
                            console.log(data)
                           /* if(data.data.ResponseMessage == "放弃成功"){
                                this.setState({ResponseMessage:"放弃成功"});
                            }else if(data.data.ResponseCode == "0000"){
                                this.setState({ResponseMessage:"接车成功"});
                            }else if(data.data.ResponseCode == "0010"){
                                this.setState({ResponseMessage:"接车失败"});
                            }else if(data.data.ResponseCode == "0018"){
                                this.setState({ResponseMessage:"放弃失败"});
                            }*/

                            // console.log(this.state.ResponseMessage)
                            // this.modalState("sucOrfai");
                            if(data.data.ResponseCode=='0000'){
                                this.props.promptInfo({
                                    content: '接车成功', Prompt: true, onlyOK: true,fun:()=>{
                                        this.setState({
                                            showDio:false
                                        })
                                        window.history.go(-1);
                                        this.props.promptInfo()
                                    }
                                })
                            }else if(data.data.ResponseMessage == "放弃成功"){
                                this.props.promptInfo({
                                    content: '放弃成功', Prompt: true, onlyOK: true,fun:()=>{
                                        this.setState({
                                            showDio:false
                                        })
                                        window.history.go(-1);
                                        this.props.promptInfo()
                                    }
                                })
                            }else if(data.data.ResponseCode == "0010"){
                                this.props.promptInfo({
                                    content: '接车失败', Prompt: true, onlyOK: true,fun:()=>{
                                        this.setState({
                                            showDio:false
                                        })
                                        window.history.go(-1);
                                        this.props.promptInfo()
                                    }
                                })
                            }else if(data.data.ResponseCode == "0018"){
                                this.props.promptInfo({
                                    content: '放弃失败', Prompt: true, onlyOK: true,fun:()=>{
                                        this.setState({
                                            showDio:false
                                        })
                                        window.history.go(-1);
                                        this.props.promptInfo()
                                    }
                                })
                            }
                            // this.modalState("sucOrfai");
                        }
                    })
                }
            }
        })
    },
    //控制模态框
    modalState(a){
        if(a=='receiveDio'){
            this.setState({showDio:!this.state.showDio});
            $('.infoSty li.jt').hide().find('.datList').hide();
            $('.infoSty li.jt').eq(0).show();
            $('.infoSty li.jt').find('input').val('')
            this.setState({data:{}});
            return;
        }
        //修改this.state.dis控制模态框出现消失
        if (!this.state.dis){
            this.setState({dis:true})
        }else {
            this.setState({dis:false})
        }//修改this.state.receGiveUP控制模态框内容区出现接车部分或者放弃部分
        if(a=="receive"){
            this.setState({receGiveUP:"1"})
        }else if(a=="giveUp"){

            this.setState({receGiveUP:"2"})
        }else if(a=="sucOrfai"){
            this.setState({receGiveUP:"3"})
        }else {}
    },
    componentDidUpdate(){
        $(".infoSty:before").bind('click',function(){
            alert();
        })
    },
    closeModie(){
        this.setState({receGiveUP:"0"})
        this.setState({dis:!this.state.dis})
        this.setState({ResponseMessage:""});
    },
    toUppe(obj,e){
        var newState={};
        newState[e.target.name]=e.target.value.toUpperCase();
        //e.target.value=newState[e.target.name];
        this.setState({[obj]:Object.assign({},this.state[obj],newState)});

    },
    render(){
        var idata = this.props.location.state ;
        console.log(idata);
        var zzbh = idata.zzbh;
        var cname = idata.send_car_person;
        if(cname == "" || cname == null){
            cname = idata.customername;
        }
        var comname = idata.inscompanyname;
        var insuranceLogoBg = "";
        switch (zzbh){
            case "CCIC":
                insuranceLogoBg="insLogoCcic";
                break;
            case "CIC":
                insuranceLogoBg="insLogoCic";
                break;
            case "YGBX":
                insuranceLogoBg="insLogoYgbx";
                break;
            case "PICC":
                insuranceLogoBg="insLogoPicc";
                break;
            default:
                insuranceLogoBg="";
        }
        var sms=encodeURIComponent("尊敬的"+idata.customername+"先生/女士，您好！您的爱车｛"+idata.plateno+"｝经｛"+idata.insZgsName+"｝推荐至｛"+idata.xlcName+"｝维修。您可以通过关注“透明修车网”公众号查看维修状态")
        return (
            <div className="item_survey_single">
                {/*<div className="headerInfo">
					<IconFont name="&#xe609;" onClick={this.returnreceiveClick}/>
					<HeaderIf numBer="" name="接车信息"></HeaderIf>
				</div>*/}
                {/*<p className="insurceInfo clearfix">
					<span className="insurceLogo" id={insuranceLogoBg}></span>
					<span className="">{comname}</span>
					<span className="detail" onClick={this.receiveClick}>详情 ></span>
				</p>*/}
                <p className="title">
                    <span>基本信息　</span>
                    <span className="detail" onClick={this.receiveClick}>详情 ></span>
                </p>
                <div className="detailLabel listContainer">

                    <ul>
                        <li><span>车牌号 :</span>{idata.plateno}</li>
                        <li><span>车辆品牌 :</span>{idata.ppmc}</li>
                        <li><span>保险公司 :</span>{idata.inscompanyname}</li>
                        <li><span>车主 :</span>{cname}</li>
                    </ul>
                </div>
                <div className="detailLabel listContainer" style={{marginTop:'0.3rem'}}>
                    <li　style={{height:"0.5rem"}}><span>定损员　</span>{idata.lossby} <span style={{paddingRight:'0.15rem'}}>{'　('+idata.yddh+')'}</span><span style={{flex:'1',textAlign:'right',color:'#979596'}}><a className="CallDcc"  href={"tel:"+idata.yddh}></a></span></li>
                </div>
                <div className="telSms">
                    <a href={"tel:"+idata.telephone}>
                        <span className="takePhone"></span>
                        打电话
                    </a>

                    <a className="androidSms" style={this.state.phoneType?{display:"inline-block"}:{display:"none"}} href={"sms:"+idata.telephone+"?body="+sms+""}>
                        <span className="shortMessage"></span>
                        发短信</a>
                    <a className="iPhoneSms" style={this.state.phoneType?{display:"none"}:{display:"inline-block"}} href={"sms:"+idata.telephone}>
                        <span className="shortMessage"></span>
                        发短信</a>
                </div>

                <div className="btnGroup">
                    <button type="button" className="deflBtn" onClick={()=>this.modalState("giveUp")}>放弃接车</button>
                    <button type="button" className="blueBtn" onClick={()=>{!idata.cxbm || idata.cxbm=='null' || idata.cxmc=='-'? this.modalState("receiveDio") : this.modalState("receive")}}>到店确认</button>
                    {/*<button type="button" className="blueBtn" onClick={this.PickClick1}>到店确认</button>*/}
                </div>
                <div className="modalBox" style={this.state.dis?{display:"block"}:{display:"none"}}>
                    <div className="receiveCar" style={this.state.receGiveUP=="1"?{display:"block"}:{display:"none"}}>
                        <div className="modalContent">确定接车吗？</div>
                        <div className="modalBtn">
                            <button classID="btnCancle" className="btn btnC" onClick={this.modalState}>取消</button>
                            <button classID="btnSure" className="btn btnS" onClick={this.PickClick}>确认</button>
                        </div>
                    </div>
                    <div className="giveUpCar" style={this.state.receGiveUP=="2"?{display:"block"}:{display:"none"}}>
                        <div className="modalContent">放弃接车</div>
                        <div>你确定要放弃接车吗？请选择放弃原因</div>
                        <div>
                            <form className="giveUpForm" onChange={this.handleChange}>
                                <ul>
                                    {/*<li>
										<input type="radio" id="rad1" name="val" value="1"/>
										<label htmlFor="rad1">不在承修范围</label>
									</li>
									<li>
										<input type="radio" id="rad2" name="val" value="2"/>
										<label htmlFor="rad2">客户不愿意到店</label>
									</li>
									<li>
										<input type="radio" id="rad3" name="val" value="3"/>
										<label htmlFor="rad3">无法联系客户</label>
									</li>*/}
                                    <li hidden='hidden'>
                                        <input type="radio" id="rad4" name="val" value="4"/>
                                        <label htmlFor="rad4">其他原因</label>
                                    </li>
                                    <li>
                                        {this.state.val && this.state.val==4 || true ? <p><input  type="text" placeholder="请输入放弃理由" name="reasonDescrip" /></p> : ''}
                                        {this.state.jb && <p style={{fontSize:'0.1rem',color:'red'}}>至少输入10个字</p>}
                                    </li>
                                </ul>


                            </form>
                        </div>
                        <div className="modalBtn">
                            <button className="btn btnC" onClick={this.modalState}>取消</button>
                            <button className="btn btnS" onClick={this.giveClick}>确认</button>
                        </div>
                    </div>
                    <div className="sucOrfai" style={this.state.receGiveUP== "3"?{display:"block"}:{display:"none"}}>
                        <div className="modalContent">{this.state.ResponseMessage}</div>
                        <div className="modalBtn">
                            <button className="btn btnS" onClick={this.returnreceiveClick}>确认</button>
                        </div>
                    </div>
                    <div className="sucOrfai" style={this.state.receGiveUP== "911"?{display:"block"}:{display:"none"}}>
                        <div className="modalContent">{this.state.ResponseMessage}</div>
                        <div className="modalBtn">
                            <button className="btn btnS" onClick={this.closeModie}>确认</button>
                        </div>
                    </div>

                </div>
                <ModalBg dis={this.state.dis}></ModalBg>
                {/*补全信息*/}
                <div className="addInfo"  style={this.state.showDio ? {display:'flex'}:{display:'none'}}>
                    <div className="InfoBox" style={{height:'100%',background:'#F1F1F1'}}>
                        <div className="infoSty">
                            <span className="close" onClick={()=>{this.modalState('receiveDio')}}></span>
                            <ul className="baseLi" style={{color:'#1C1C1C',fontSize:'0.28rem'}}>
                                <li className="style1">
                                    <div className="LiTRight" style={{borderTop: '1px solid #e9e9e9',borderBottom: '1px solid #e9e9e9'}}>
                                        <div className="onece" style={{display:'flex'}} onClick={this.checkadd}>
                                <span className="listValue" style={{flex:'none',fontWeight:'600'}}>车架号<b
                                    style={{color: 'red', padding: '0 0.1rem'}}>*</b></span>
                                            <input type="text" style={{flex:'1',border:'0px',padding:'0 4vw',overflow:'hidden'}}
                                                   id="vin" onChange={this.vinval.bind(this,event)} onBlur={this.blur} placeholder="请输入车架号*必填" name="vin"/>
                                            <span onClick={this.b2fun} className="buttonRight backImg"></span>
                                            <span onClick={this.bfun } className="buttonRight">解析</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <this.props.BaseLi classname="vehic" style={{color:'#1C1C1C',fontSize:'0.28rem'}} data={[
                                {
                                    typeName: 'vehicleName',
                                    key: <span style={{display: 'flex', alignItems: 'center'}}>车型 <b
                                        style={{color: 'red', padding: '0 0.1rem'}}>*</b></span>,
                                    placeholder: '请输入车型*必填',
                                    disabled: true,
                                    val:this.state.vehicleName||'',
                                    value:'',
                                    Style:{V:{color:"#333",padding:'0 4vw',textAlign:'left'},K:{flex:'none'}}
                                }
                            ]} {...this.props} T={this}/>
                            <div style={{width:'100vw',height:'1rem',marginTop:'2rem',position:'relative'}}>
                                <button onClick={this.areasubmit} style={{border:'0px',width:'92%',height:'1rem',position:'absolute',left:'4%',background:'#3A97F7',color:'#fff',borderRadius:'0.1rem',fontSize:'0.34rem'}}>保 存</button>
                            </div>
                            <div className={this.state.carsflag ? "partsBuyShow basicStyle1" : "partsBuyHide basicStyle1"}>
                                <div className="qy1" style={{overflow:'hidden'}}>
                                    <h4 className="checkqy1">
                                        <span style={{flex:'1'}}>请选择车型</span>
                                        <span style={{width:'1rem'}} onClick={this.quxiao}>取消</span>
                                    </h4>
                                    <div style={{flex:1,position:'relative',overflow:'hidden'}}>
                                        <ul className="sfdiv"
                                            onTouchEnd={this.touchs.bind(this,'end')}
                                            onTouchMove={this.touchs.bind(this,'move')}
                                            onTouchStart={this.touchs.bind(this,'start')}
                                            style={{overflow:'hidden',position:'absolute',width:'100%'}}>
                                            {this.state.vecarList&&this.state.vecarList.map((item,index)=>{
                                                return(
                                                    <li className="lilist areali" style={{background:'#fff',padding:'0.3rem 0'}} key={index} onClick={this.areaList.bind(this,item)}>
                                                        <span style={{whiteSpace:'nowrap'}}>{item.vehicleName}</span>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/*<ul>
								<li>
                                    {(this.state.type2.vin || this.state.yVin) &&
                                    <input type="button" onClick={()=>{
                                        $('.datList').hide();
                                        this.setState({carList:[]},this.vinJX)
                                    }} className="jiexi" value="解析"/>
                                    }
									<input type="text" name="vin"   placeholder="VIN码*必填" value={this.state.type2.vin} onChange={this.toUppe.bind(this,'type2')} onBlur={this.toUppe.bind(this,'type2')}/>
								</li>
								<li className="jt">
									<input type="text" onChange={this.brandArr.bind(this,0,false)} placeholder="请输入品牌拼音首字母进行查询"/>
									<div className="datList" style={{height:'3rem',position:'absolute',overflow:'hidden'}}>
										<ul
                                            onTouchEnd={this.touchs.bind(this,'end')}
                                            onTouchMove={this.touchs.bind(this,'move')}
                                            onTouchStart={this.touchs.bind(this,'start')}
                                            style={{overflow:'hidden',position:'relative'}}
                                        >
                                            {this.state.carList[0]}
										</ul>
									</div>
								</li>
								<li className="jt">
									<input type="text" placeholder="请选择车系"/>
									<div className="datList" style={{height:'3rem',position:'absolute',overflow:'hidden'}}>
										<ul
                                            onTouchEnd={this.touchs.bind(this,'end')}
                                            onTouchMove={this.touchs.bind(this,'move')}
                                            onTouchStart={this.touchs.bind(this,'start')}
                                            style={{overflow:'hidden',position:'relative'}}
                                        >
                                            {this.state.carList[1]}
										</ul>
									</div>
								</li>
								<li className="jt">
									<input className="aa" type="text"  placeholder="请选择车组"/>
									<div className="datList" style={{height:'3rem',position:'absolute',overflow:'hidden'}}>
										<ul
                                            onTouchEnd={this.touchs.bind(this,'end')}
                                            onTouchMove={this.touchs.bind(this,'move')}
                                            onTouchStart={this.touchs.bind(this,'start')}
                                            style={{overflow:'hidden',position:'relative'}}
                                        >
                                            {this.state.carList[2]}
										</ul>
									</div>
								</li>
								<li className="jt">
									<input className="aa" type="text"  placeholder="请选择车型"/>
									<div className="datList" style={{height:'3rem',position:'absolute',overflow:'hidden'}}>
										<ul
                                            onTouchEnd={this.touchs.bind(this,'end')}
                                            onTouchMove={this.touchs.bind(this,'move')}
                                            onTouchStart={this.touchs.bind(this,'start')}
                                            style={{overflow:'hidden',position:'relative'}}
                                        >
                                            {this.state.carList[3]}
										</ul>
									</div>
								</li>
								<li>
									<input type="button" onClick={this.Infosubmit} value="确定"/>
								</li>
							</ul>*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
})
export default Receive_detail;