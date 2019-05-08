import React from 'react';
import $ from 'jquery';
import DatePicker from 'react-mobile-datepicker';
import {BaseLi,SubmitOk} from '../../../../../common/assembly/Stateless';
import someEvent from '../../../../../common/baseFun/someEvent'
import SelectParts from './SelectionParts'
require('../../../css/addinquiry.css')
/**发起残件回收**/
export default class AddInquiry extends React.Component {
    constructor(props){
        super(props)
        this.state={
            tmxCarType:0,
            tmxReportNo:'',
            plateNo:'',
            vin:'',
            vehicleName:'',
            engineNumber:'',
            imgList:[],
            requestFrom:'WEIXIN',
            showYXZ:true
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
            this.props.wxUpdata(1,(imgid, id, isend) => {
                this.props.ajax({
                    loading: true,
                    url: '/lexiugo-app/weixin/analysisVinPhoteByOcr',
                    data: {lossNo: this.state.reportData.lossNo, serverId: id,taskId:this.state.reportData.taskId},
                    suc: (msg) =>{
                        if (msg.code * 1 == 7000){
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
                                content:'OCR解析失败',
                                Prompt:true
                            })
                        }
                    }
                })
            })
        }
        this.bfun=()=>{
            var m =$('input[name=vin]').val()
            this.setState({
                vin:$('input[name=vin]').val(this.state.vin)
            })
            $('input[name=vin]').val(m)
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
            this.setState({
                ...this.state
            })
        }
        this.blur=()=>{
            window.scrollTo(0, 0);
            console.log('bulr')
        }
        this.selectParts=(e)=>{
            e.preventDefault();e.stopPropagation();
            this.props.history.pushState('', 'inquiry/SelectionParts')
            this.setState({component:true})
        },
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
            carInfo[0].id=item.tmxEnquiryZzid
            var SubmitData=this.state.SubmitData||{}
            SubmitData.inquiryArea=item.tmxEnquiryZzid
            this.setState({carInfo:carInfo,SubmitData:SubmitData},()=>{
                // console.log(this.state.SubmitData)
            })
        },
        this.submit = () => {
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
                "tmxCarType":this.state.tmxCarType,
                "engineNumber":this.state.engineNumber||'',
                "tmxReportNo":this.state.tmxReportNo,
                "plateNo":this.state.plateNo,
                "vin":this.state.vin,
                "requestFrom":this.state.requestFrom
            }
            console.log(requestDate)
            if(this.state.imgList.length==0){
                this.props.promptInfo({
                    content: '请上传至少一张车头、车尾或配件照片', Prompt: true
                })
                return;
            }
            !this.props.PromptData.content && !this.props.PromptData.loading&&
            this.props.promptInfo({
                content:'是否发起询价？',
                Prompt:true,
                fun:()=>{
                    this.props.ajax({
                        loading: true,
                        data: {requestData: JSON.stringify(requestDate)},
                        url: '/lexiugo-app/app/enquiry/addEnquiry',
                        suc: (dat) => {
                            if (dat.errorCode == '0000') {
                               /* localStorage.setItem("PJAdd", '')
                                localStorage.setItem("PJAddjj", '')
                                localStorage.setItem("SubmitData", '');
                                localStorage.setItem("VinInfo", '');
                                localStorage.setItem("imgList", '');*/
                                this.props.setProps({
                                    inquiryData:false,
                                    PJAdd:false,
                                    addinquiry:false
                                });
                                this.props.promptInfo({
                                    content: dat.errorMsg, Prompt: true, onlyOK: true, fun: () => {
                                        this.props.ajax({
                                            url:'/server/lexiu3-app/business/tmxcadvertinfo/applist',
                                            data:{showType:'2',showPoint:'2',showRoleType:'1',showChannel:'3'},
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
        if(this.props.inquiryData){
            let dat={data:this.props.inquiryData}
            if(dat.data.areaList){
                this.state.carInfo.unshift({
                    key: <span style={{display: 'flex', alignItems: 'center'}}>询价区域 <b
                        style={{color: 'red', padding: '0 0.1rem'}}>*</b></span>,
                    Style:{ico2:'&#xe607;'},
                    next:'',
                    fun:()=>{
                        this.props.setProps({showBase:<this.props.SelectLikeIos Selected={this.Provice} {...this.props} defVal="provinceName" dataList={[this.state.reportData.areaList]}/>})
                        return;
                        this.state.carInfo[0].next=(
                            <ul style={{position:'absolute',top:'100%',width:'100%',padding:'0.3rem',
                                left:'0px',background:'#fff',zIndex:'999',overflow:'hidden'}}>
                                {
                                    this.state.reportData.areaList.map((item,index)=>{
                                        return(
                                            <li key={index} onClick={this.Provice.bind(this,item)}>{item.provinceName}</li>
                                        )
                                    })
                                }
                            </ul>
                        )
                        this.setState({carInfo:this.state.carInfo})
                    }
                })
            }
            this.setState({
                reportData:dat.data,carInfo:this.state.carInfo
            })
        }else{this.props.ajax({
            url:'/lexiugo-app/weixin/insurance/getAppCountTask',
            loading:true,
            suc:(dat)=>{
                if(dat.code=='0000'){
                    if(dat.data.areaList){
                        this.state.carInfo.unshift({
                            key: <span style={{display: 'flex', alignItems: 'center'}}>询价区域 <b
                                style={{color: 'red', padding: '0 0.1rem'}}>*</b></span>,
                            Style:{ico2:'&#xe607;'},
                            next:'',
                            fun:()=>{
                                /*for(var i=0;i<5;i++){
                                    this.state.reportData.areaList.push({provinceName:';l来计算拉杆夹数量单价第三方'+i})
                                }*/
                                this.props.setProps({showBase:<this.props.SelectLikeIos Selected={this.Provice} {...this.props} defVal="provinceName" dataList={[this.state.reportData.areaList]}/>})
                                return;
                                this.state.carInfo[0].next=(
                                    <ul style={{position:'absolute',top:'100%',width:'100%',padding:'0.3rem',
                                        left:'0px',background:'#fff',zIndex:'999',overflow:'hidden'}}>
                                        {
                                            this.state.reportData.areaList.map((item,index)=>{
                                                return(
                                                    <li key={index} onClick={this.Provice.bind(this,item)}>{item.provinceName}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                )
                                this.setState({carInfo:this.state.carInfo})
                            }
                        })
                    }
                    this.setState({reportData:dat.data,carInfo:this.state.carInfo});
                    this.props.setProps({inquiryData:dat.data})
                }
            }
        })}
    }
    componentWillUnmount(){
        this.props.promptInfo();
        var vincode=$('input[name=vin]').val()
        this.props.setProps({
            addinquiry:{SubmitData:this.state.SubmitData||{},imgList:this.state.imgList||{},tmxReportNo:this.state.tmxReportNo,
            plateNo:this.state.plateNo,vin:vincode,vehicleName:this.state.vehicleName,engineNumber:this.state.engineNumber,
            tmxCarType:this.state.tmxCarType}
        })
    }
    // componentWillUpdate(){
    //
    // }
    render(){
        console.log(this.state)
        console.log(this.props)
        return(
            <div onClick={this.closeDocument} className="adddiv">
                <this.props.InfoTitle T={this} data={{key:'案件信息'}}/>
                <div className="baseLi" style={{color:'#1C1C1C',fontSize:'0.28rem'}}>
                    <div className="style1">
                        <div style={{borderTop:'1px solid #e9e9e9',flex:'1',height:'0.8rem',lineHeight:'0.8rem',borderBottom: '1px solid #e9e9e9'}}>
                            <div className="onece" style={{display:'flex'}}>
                                <span style={{fontWeight:'600',fontSize:'0.28rem'}}><span style={{color:"#1C1C1C"}}></span>车辆类型</span>
                                <span style={{padding:'0 4vw'}}>
                                    <span className={this.state.tmxCarType==0?'cx cxborder':'cx cxbord'} onClick={this.cyccx}>乘用车</span>
                                    <span className={this.state.tmxCarType==1?'cx cxborder':'cx cxbord'} onClick={this.syccx}>商用车</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <this.props.BaseLi style={{color:'#1C1C1C',fontWeight:'600',fontSize:'0.28rem'}} data={[
                    {
                        typeName: 'tmxReportNo',
                        key: '报案号',
                        input: true,
                        val:this.state.tmxReportNo||'',
                        placeholder: '请输入报案号*非必填',
                        change: (e) => {
                            this.setState({tmxReportNo: e})
                        },
                        blur:()=> {
                            this.blur()
                        }
                    },
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
                            <div className="onece" style={{display:'flex'}}>
                                <span className="listValue" style={{flex:'none',fontWeight:'600'}}>车架号<b
                                    style={{color: 'red', padding: '0 0.1rem'}}>*</b></span>
                                <input type="text" style={{flex:'1',border:'0px',padding:'0 4vw',overflow:'hidden'}}
                                       id="vin" placeholder="请输入车架号*必填" onBlur={this.blur} name="vin"/>
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
                </span>:<span style={{display:'none'}}></span>}
                <this.props.InfoTitle T={this} data={{key:'零件清单',butR:(<span className="butR" onClick={this.selectParts}><span>+</span>添加</span>)}}/>
                <this.props.StateLess.DetailedList {...this.props} detailedList={this.state.datailedList} T={this}/>
                <this.props.InfoTitle T={this} data={{key:'上传车头车尾或配件照片'}}/>
                <this.props.StateLess.ImgListShow type='upLoadTop' imgList={this.state.imgList||[]} {...this.props} T={this}/>

                <this.props.BaseSubmit submit={this.submit} {...this.props}/>
                {this.state.component &&
                <SelectParts {...this.props} T={this}/>
                }
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