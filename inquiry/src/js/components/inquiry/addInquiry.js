import React from 'react';
import $ from 'jquery';
// import DatePicker from 'react-mobile-datepicker'
import { Picker, List, WhiteSpace } from 'antd-mobile';
import {BaseLi,SubmitOk} from '../../../../../common/assembly/Stateless';
import someEvent from '../../../../../common/baseFun/someEvent'
import SelectParts from './SelectionParts'
// import Picker from './Picker';
require('../../../css/addinquiry.css')
require('../../../css/home.css')
/**发起残件回收**/
export default class AddInquiry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tmxCarType:0,
            tmxReportNo:'',
            plateNo:'',
            vin:'',
            vehicleName:'',
            engineNumber:'',
            imgList:[],
            submitDraw:false,
            areaList:[],
            requestFrom:'WEIXIN'
        };
        this.cyccx=()=>{
            this.setState({
                tmxCarType:'0',
                engineNumber:''
            })
        },
        this.syccx=()=>{
            this.setState({
                tmxCarType:'1'
            })
        },
        this.b2fun=()=>{
            this.props.wxUpdata(1, (imgid, id, isend) => {
                this.props.ajax({
                    loading: true,
                    url: '/lexiugo-app/weixin/analysisVinPhoteByOcr',
                    data: {lossNo: this.state.reportData.lossNo, serverId: id,taskId:this.state.reportData.taskId},
                    suc: (msg) => {
                        if (msg.code * 1 == 7000) {
                            var SubmitData=this.state.SubmitData
                            $('input[name=vin]').val(msg.data.vinCode)
                            this.setState({
                                SubmitData:msg.data,
                                vehicleName:msg.data.vehicleName,
                                vin:msg.data.vinCode
                            })
                            if(msg.data.plateNo!=''){
                                this.setState({
                                    plateNo:msg.data.plateNo
                                })
                            }else{
                                this.setState({
                                    plateNo:this.state.plateNo
                                })
                            }
                        }else{
                            this.props.promptInfo({
                                content:"OCR解析失败",
                                Prompt:true
                            })
                        }
                    }
                })
            })
        }
        this.vinval=(e)=>{
            this.setState({
                vin:e.target.value
            })
        }
        this.bfun=()=>{
            var m =this.state.vin
            if (!this.props.verification('vin', m).isTrue) return
            this.props.ajax({
                loading: true,
                url: '/lexiugo-app/weixin/analysisVinByEpc',
                data: {vinCode: m},
                suc: (data) => {
                    if(data.code*1==7000) {
                        console.log(data.data)
                        console.log(data.data.vehicleName)
                        this.setState({
                            SubmitData:data.data,
                            vehicleName:data.data.vehicleName
                        })
                        if(data.data.plateNo!=''){
                            this.setState({
                                plateNo:data.data.plateNo
                            })
                        }else{
                            this.setState({
                                plateNo:this.state.plateNo
                            })
                        }
                    }else{
                        this.props.promptInfo({
                            content:msg.mess,
                            Prompt:true
                        })
                    }
                }
            })
        },
        //展开零件清单
        this.selectParts=()=>{
            this.props.history.pushState(null, 'inquiry/SelectionParts')
            this.setState({component:true})
        },

        //提交
        this.submit = () => {
            if (!this.state.inquiryArea) {
                this.props.promptInfo({
                    content: '请选择区域！', Prompt: true
                })
                return;
            }
            this.setState({
                submitDraw:false
            })
           /* var datailedList = this.state.datailedList || {}, partList = []
            for (var i in datailedList) {
                console.log(datailedList, 55)
                partList.push({
                    partNum: datailedList[i].num,
                    partStandard: datailedList[i].data.name,
                    partRemark: datailedList[i].text,
                    factPartCode: datailedList[i].data.id
                })
            }
            if($('input[name=vin]').val()==''){
                this.props.promptInfo({
                    content: '请填写车架号', Prompt: true
                })
                return;
            }
            if(!this.state.vehicleName){
                this.props.promptInfo({
                    content: '请填写车型', Prompt: true
                })
                return;
            }
            if(this.state.tmxCarType=='1'){
                    if(!this.state.engineNumber){
                        this.props.promptInfo({
                            content: '请填写发动机号', Prompt: true
                        })
                        return;
                    }
                }
            if (partList.length < 1) {
                this.props.promptInfo({
                    content: '你至少需要选择一个零件！', Prompt: true
                })
                return;
            }
            var requestDate = {
                ...(this.state.reportData || {}),
                "familyAbbr":this.state.SubmitData.familyName||'',
                "partList": partList,
                ...(this.state.SubmitData || {}),
                tmxCarType:this.state.tmxCarType,
                engineNumber:this.state.engineNumber||'',
                tmxReportNo:this.state.tmxReportNo,
                plateNo:this.state.plateNo,
                vin:this.state.vin
            }
            console.log(requestDate)
            if(this.state.imgList.length==0){
                this.props.promptInfo({
                    content: '请上传至少一张车头、车尾或配件照片', Prompt: true
                })
                return;
            }*/
            var requestDate1 = {
                ...(this.state.requestDate || {}),
                inquiryArea:this.state.inquiryArea||''
            }
            console.log(requestDate1)
            !this.props.PromptData.content && !this.props.PromptData.loading&&
            this.props.promptInfo({
                content:'是否发起询价？',
                Prompt:true,
                fun:()=>{
                    this.setState({
                        submitDraw:false
                    })
                    this.props.ajax({
                        loading: true,
                        data: {requestData: JSON.stringify(requestDate1)},
                        url: '/lexiugo-app/app/enquiry/addEnquiry',
                        suc: (dat) => {
                            if (dat.errorCode == '0000') {
                                this.props.setProps({
                                    inquiryData:false,
                                    PJAdd:false,
                                    addinquiry:false
                                });
                                this.props.promptInfo({
                                    content: dat.errorMsg, Prompt: true, onlyOK: true, fun: () => {
                                        this.props.ajax({
                                            url:'/server/lexiu3-app/business/tmxcadvertinfo/applist',
                                            data:{showType:'2',showPoint:'2',showRoleType:'9',showChannel:'3'},
                                            suc:(data)=>{
                                                console.log(data)
                                                if(data.tmxcAdvertInfoList.length>0){
                                                    this.setState({
                                                        adver:1,
                                                        ulr:data.tmxcAdvertInfoList[0].adPic,
                                                        locationUrl:data.tmxcAdvertInfoList[0].locationUrl,
                                                        locationTitle:data.tmxcAdvertInfoList[0].locationTitle
                                                    })
                                                }else{
                                                    this.props.history.replaceState('null', '/inquiry')
                                                }
                                            }
                                        })
                                        // this.props.history.replaceState('null', '/inquiry');
                                        this.props.promptInfo()
                                    }
                                })
                            } else {
                                this.props.promptInfo({content: dat.errorMsg, Prompt: true, onlyOK: true})
                            }
                        }
                    })
                }
            })
        }
        this.reduceOrPlus = (item, index, how) => {
            var newDatailed = this.state.datailedList
            switch (how) {
                case 'delete':
                    delete newDatailed[item.id]
                    break
                case 'change':
                    newDatailed[item.id].text = index;
                    break
                default:
                    newDatailed[item.id].num = (how == 'plus') ? item.num * 1 + 1 : item.num * 1 - 1 || 1;
            }
            localStorage.setItem("PJAdd", JSON.stringify(newDatailed));
            this.setState({datailedList: newDatailed})
        }
        this.Provice=(item)=>{
            var carInfo =this.state.carInfo;
            carInfo[0].next='';
            carInfo[0].value=item.provinceName
            carInfo[0].id=item.zzid
            var SubmitData1=this.state.SubmitData1||{}
            SubmitData1.inquiryArea=item.zzid
            SubmitData1.inquiryAreas=item.provinceName
            this.setState({carInfo:carInfo,SubmitData1:SubmitData1},()=>{
                // console.log(this.state.SubmitData1)
            })
        }
        this.Sure=()=>{
            var datailedList = this.state.datailedList || {}, partList = []
            for (var i in datailedList) {
                partList.push({
                    partNum: datailedList[i].num,
                    partStandard: datailedList[i].data.name,
                    partRemark: datailedList[i].text,
                    factPartCode: datailedList[i].data.id
                })
            }
            if($('input[name=vin]').val()==''){
                this.props.promptInfo({
                    content: '请填写车架号', Prompt: true
                })
                return;
            }
            if(!this.state.vehicleName){
                this.props.promptInfo({
                    content: '请解析车架号', Prompt: true
                })
                return;
            }
            if(this.state.tmxCarType=='1'){
                if(!this.state.engineNumber){
                    this.props.promptInfo({
                        content: '请填写发动机号', Prompt: true
                    })
                    return;
                }
            }
            if (partList.length < 1) {
                this.props.promptInfo({
                    content: '你至少需要选择一个零件！', Prompt: true
                })
                return;
            }
            var requestDate = {
                ...(this.state.reportData || {}),
                "familyAbbr":this.state.SubmitData.familyName||'',
                "partList": partList,
                ...(this.state.SubmitData || {}),
                tmxCarType:this.state.tmxCarType,
                engineNumber:this.state.engineNumber||'',
                tmxReportNo:this.state.tmxReportNo,
                plateNo:this.state.plateNo,
                vin:this.state.vin,
                "requestFrom":this.state.requestFrom
            }
            this.setState({
                requestDate:requestDate
            })
            if(this.state.imgList.length==0){
                this.props.promptInfo({
                    content: '请上传至少一张车头、车尾或配件照片', Prompt: true
                })
                return;
            }
            this.setState({
                submitDraw:true,
                isOpen:true
            })
        }
        this.areaList=(item)=> {
            this.state.areaList.map((item2,index2)=>{
                if(item2.provinceName==item.provinceName){
                    item2.select=true
                }else{
                    item2.select=false
                }
            })
            this.setState({
                inquiryArea:item.zzid,
                provinceName:item.provinceName,
            })
            this.props.setProps({
                inquiryData:item
            })
        }
        this.touchs=(m,e)=>{
            switch(m){
                case 'start':
                    this.props.touchStarts(e,this);
                    break;
                case 'end':
                    this.props.touchEnds(e,this);
                    break;
                case 'move':
                    e.preventDefault();e.stopPropagation();
                    this.props.touchMoves(e,this);
                    var e= window.e || e
                    if(document.all){
                        e.returnValue = false;
                    }else{
                        e.preventDefault();
                    }
                    break;
            }
        }
        this.quxiao=()=>{
            this.setState({
                submitDraw:false,
            })
        }
        this.blur=()=>{
            window.scrollTo(0, 0);
            console.log('bulr')
        }
        this.close=()=>{
            console.log('123')
            this.setState({
                adver:0
            })
            this.props.history.replaceState('null', '/inquiry')
        }
        this.linkurl=()=>{
            this.setState({
                adver:'0'
            })
            console.log(this.state)
            this.props.history.replaceState({locationUrl:this.state.locationUrl,locationTitle:this.state.locationTitle},'/inquiry/windurl')
        }
    }
    componentDidUpdate(){
        this.props.resetScroll()
    }
    componentDidMount() {
        this.props.changeTitle('询价');
        if(this.state.vin!=''){
            console.log('123')
            $('input[name=vin]').val(this.state.vin)
        }
    }
    componentWillMount(){
        if(localStorage.getItem('PJAdd')){
            var json=JSON.parse(localStorage.getItem('PJAdd'))
            this.setState({datailedList:json||{}})
        }else{
            this.setState({datailedList:{}})
        }
        this.props.location.state={...(this.props.location.state||{}),...(this.props.addinquiry||{}),...(this.props.PJAdd||{})}
        this.state={...(this.state||{}),...(this.props.location.state||{})}
        console.log(this.state)
        // this.setState({datailedList:this.props.PJAdd||{}})
        if(this.props.areaList&&this.props.inquiryData){
            let dat={data:this.props.inquiryData}
            this.setState({
                reportData:dat.data,carInfo:this.state.carInfo,provinceName:dat.data.provinceName,
                areaList:this.props.areaList,lossNo:this.props.lossNo,reportNo:this.props.reportNo,
                taskId:this.props.taskId
            })
        }else{this.props.ajax({
            url:'/toumingxiu/insEnquiry/getEnquiryArea.do',
            loading:true,
            suc:(dat)=>{
                if(dat.errorCode=='000000'){
                    var areaList=[]
                    dat.data.areaList.map((item1,index1)=>{
                        areaList.push({provinceName:item1.provinceName,zzid:item1.zzid,select:false})
                    })
                    this.setState({
                        areaList:areaList,
                        lossNo:dat.data.lossNo,
                        reportNo:dat.data.reportNo,
                        taskId:dat.data.taskId
                    })
                    if(dat.data.areaList){
                    }
                    this.setState({reportData:dat.data,carInfo:this.state.carInfo});
                }
            }
        })}
        // this.state.carInfo.unshift({
        //     typeName:'inquiryAreas',
        //     key: <span style={{display: 'flex', alignItems: 'center'}}>询价区域 <b
        //         style={{color: 'red', padding: '0 0.1rem'}}>*</b></span>,
        //     Style:{ico2:'&#xe607;'},
        //     next:'',
        //     value:'',
        //     fun:()=>{
        //         this.props.setProps({
        //             showBase:<this.props.SelectLikeIos Selected={this.Provice} {...this.props} defVal="provinceName"
        //                                                dataList={[this.state.reportData.areaList]}/>
        //         })
        //         return;
        //         this.state.carInfo[0].next=(
        //             <ul style={{position:'absolute',top:'100%',width:'100%',padding:'0.3rem',
        //                 left:'0px',background:'#fff',zIndex:'999',overflow:'hidden'}}>
        //                 {
        //                     this.state.reportData.areaList.map((item,index)=>{
        //                         return(
        //                             <li key={index} onClick={this.Provice.bind(this,item)}>{item.provinceName}</li>
        //                         )
        //                     })
        //                 }
        //             </ul>
        //         )
        //         this.setState({carInfo:this.state.carInfo})
        //     }
        // })
      /*  for(var i in this.state.carInfo){
            if(this.state.carInfo[i] && this.state.carInfo[i].input){
                !this.state.carInfo[i].change && (this.state.carInfo[i].change=this.valueCall)
                this.state.carInfo[i].inputClick=this.inputClick
            }
        }
        if(localStorage.getItem("PJAdd") ||localStorage.getItem("imgList") || localStorage.getItem("SubmitData1") ||localStorage.getItem("VinInfo")){
            try {
                var json=JSON.parse(localStorage.getItem("PJAdd")),
                    imgList=JSON.parse(localStorage.getItem('imgList')),
                    SubmitData1=localStorage.getItem("SubmitData1") && JSON.parse(localStorage.getItem("SubmitData1")),
                    VinInfo=localStorage.getItem("VinInfo") && JSON.parse(localStorage.getItem("VinInfo")),
                    carInfo=this.state.carInfo;
                console.log('7896')
                console.log(carInfo)
                for(var i in carInfo){
                    carInfo[i].val=SubmitData1[carInfo[i].typeName] || VinInfo[carInfo[i].typeName] || ''
                    console.log(carInfo[i])
                }
                this.setState({
                    carInfo:carInfo,
                    datailedList:json,
                    SubmitData1:SubmitData1 || this.state.SubmitData1,
                    VinInfo:VinInfo|| this.state.VinInfo,
                    imgList:imgList||this.state.imgList
                })
            }catch (e){
                this.setState({datailedList:{}})
            }
        }*/
    }
    componentWillUnmount(){
        //this.refs.selete.close()
        /*this.props.setProps({showBase:<span></span>},()=>{
            //this.props.setProps({showBase:''})
        })*/
        this.props.promptInfo();
        var vincode=$('input[name=vin]').val()
        this.props.setProps({
            addinquiry:{SubmitData:this.state.SubmitData||{},imgList:this.state.imgList||{},tmxReportNo:this.state.tmxReportNo,
                plateNo:this.state.plateNo,vin:vincode,vehicleName:this.state.vehicleName,engineNumber:this.state.engineNumber,
                tmxCarType:this.state.tmxCarType}
        })
        // localStorage.setItem("reportDataarea", JSON.stringify(this.state.reportDataarea||{}));
    }
    render(){
        console.log(this.props)
        console.log(this.state)
        return(
            <div>
                <this.props.InfoTitle T={this} data={{key:'案件信息'}}/>
                <ul className="baseLi" style={{color:'#1C1C1C',fontSize:'0.28rem'}}>
                    <li className="style1">
                        <div className="LiTRight" style={{borderTop: '1px solid #e9e9e9',borderBottom: '1px solid #e9e9e9'}}>
                            <div className="onece" style={{display:'flex'}} onClick={this.checkadd}>
                                <span classname="listValue" style={{fontWeight:'600',fontSize:'0.28rem'}}><span style={{color:"#1C1C1C"}}></span>车辆类型</span>
                                <span style={{padding:'0 4vw'}}>
                                    <span className={this.state.tmxCarType==0?'cx cxborder':'cx cxbord'} onClick={this.cyccx}>乘用车</span>
                                    <span className={this.state.tmxCarType==1?'cx cxborder':'cx cxbord'} onClick={this.syccx}>商用车</span>
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
                <this.props.BaseLi style={{color:'#1C1C1C',fontWeight:'600',fontSize:'0.28rem'}} data={[
                    {
                        typeName: 'plateNo',
                        key: '车牌号',
                        capital: true,
                        isMust: true,
                        input: true,
                        maxlength:10,
                        val:this.state.plateNo||'',
                        placeholder: '请输入车牌号*非必填',
                        change: (e) => {
                            this.setState({plateNo: e})
                        },
                        blur:()=> {
                            this.blur()
                        }
                    }
                ]} {...this.props} T={this}/>
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
                {this.state.tmxCarType==1?<span className="fdj">
                    <this.props.BaseLi data={[
                        {
                            key: <span style={{display: 'flex', alignItems: 'center'}}>发动机号<b
                                style={{color: 'red', padding: '0 0.1rem'}}>*</b></span>,
                            input: true,
                            val: this.state.engineNumber||'',
                            placeholder:'请输入发动机号*必填',
                            change: (e) => {
                                this.setState({engineNumber: e})
                            },
                            blur:()=> {
                                this.blur()
                            }
                        }
                    ]}{...this.props} T={this}/>
                </span>:''}
                <this.props.InfoTitle T={this} data={{key:'零件清单',butR:(<span className="butR" onClick={this.selectParts}><span>+</span>添加</span>)}}/>
                <this.props.StateLess.DetailedList {...this.props} detailedList={this.state.datailedList} T={this}/>
                <this.props.InfoTitle T={this} data={{key:'上传车头车尾或配件照片'}}/>
                <this.props.StateLess.ImgListShow type='upLoadTop' imgList={this.state.imgList||[]} {...this.props} T={this}/>

                <this.props.BaseSubmit submit={this.Sure} {...this.props}/>
                {this.state.component &&
                <SelectParts {...this.props} T={this}/>
                }
                <div className={this.state.submitDraw ? "partsBuyShow basicStyle1" : "partsBuyHide basicStyle1"}>
                    <div className="qy1" style={{overflow:'hidden'}}>
                        <h4 className="checkqy1">
                            <span style={{width:'1rem'}} onClick={this.quxiao}>取消</span>
                            <span style={{flex:'1'}}>请选择配件商所在地</span>
                            <span style={{width:'1rem'}} onClick={this.submit}>确定</span>
                        </h4>
                        <div style={{flex:1,position:'relative',overflow:'hidden'}}>
                            <ul className="sfdiv"
                                onTouchEnd={this.touchs.bind(this,'end')}
                                onTouchMove={this.touchs.bind(this,'move')}
                                onTouchStart={this.touchs.bind(this,'start')}
                                style={{overflow:'hidden',position:'absolute',width:'100%'}}>
                                {this.state.areaList&&this.state.areaList.map((item,index)=>{
                                    return(
                                       item.select==true?<li className="lilist areali" style={{background:'#EEEEEE'}} key={index} onClick={this.areaList.bind(this,item)}>
                                            <span>{item.provinceName}</span>
                                            <span style={{marginRight:'0.2rem',width:'0.36rem',height:'0.32rem',
                                                backgroundSize:'contain',backgroundImage:'url('+require('../../../img/duihao.png')+')',float:'right'}}></span>
                                        </li>:<li className="lilist areali" key={index} onClick={this.areaList.bind(this,item)}>
                                           <span>{item.provinceName}</span></li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={this.state.adver&&this.state.adver==1 ? "partsBuyShow basicStyle1" : "partsBuyHide basicStyle1"}>
                    <div className="adverdiv">
                        {this.state.locationUrl? <span onClick={this.linkurl} style={{cursor:'pointer'}}>
                            <img className="adverimg" src={this.state.ulr} alt=""/>
                        </span>:<span>
                            <img className="adverimg" src={this.state.ulr} alt=""/>
                        </span>}
                    </div>
                    <div style={{width:'100%',textAlign:'center'}}>
                    <span className="adverdelt" onClick={this.close}>

                    </span>
                    </div>
                </div>
            </div>
        )
    }
}
