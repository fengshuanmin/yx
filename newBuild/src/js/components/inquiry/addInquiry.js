import React from 'react';
import $ from 'jquery';
import DatePicker from 'react-mobile-datepicker';
import {BaseLi,SubmitOk} from '../../../../../common/assembly/Stateless';
import SelectParts from './SelectionParts'
/**发起残件回收**/
export default class AddInquiry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tmxCarType:0,
            engineNumber:'',
            carInfo: [
                {
                    typeName: 'tmxReportNo',
                    key: '报案号',
                    input: true,
                    val: '',
                    placeholder: '请输入报案号*非必填',

                },
                {
                    typeName: 'plateNo',
                    key: '车牌号',
                    capital: true,
                    isMust: true,
                    input: true,
                    val: '',
                    placeholder: '请输入车牌号*非必填'
                },
                {
                    typeName: 'vin',
                    capital: true,
                    isMust: true,
                    key: <span style={{display: 'flex', alignItems: 'center'}}>车架号 <b
                        style={{color: 'red', padding: '0 0.1rem'}}>*</b></span>,
                    placeholder: '请输入车架号*必填',
                    buttonR: '解析',
                    buttonR2: '   ',
                    b2fun: (m) => {
                        this.props.wxUpdata(1, (imgid, id, isend) => {
                            this.props.ajax({
                                loading: true,
                                url: '/lexiugo-app/weixin/analysisVinPhoteByOcr',
                                data: {lossNo: '', serverId: id},
                                suc: (msg) => {
                                    if (msg.code * 1 == 7000) {
                                        var yuanarr = {
                                            vinCode: 'vin',
                                            familyName: 'familyAbbr'
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
                        })
                    },
                    input: true,
                    val: '',
                    bfun: (m) => {
                        if (!this.props.verification('vin', m).isTrue) return
                        this.props.ajax({
                            loading: true,
                            url: '/lexiugo-app/weixin/analysisVinByEpc',
                            data: {vinCode: m},
                            suc: (data) => {
                                if(data.code*1==7000){
                                    var newState=this.state.carInfo
                                    newState[3].val = data.data.vehicleName;
                                    newState[1].val=data.data[newState[1].typeName]
                                    data.data.vin=m

                                    var SubmitData ={...this.state.SubmitData,...data.data,vin:m}

                                    this.setState({SubmitData:SubmitData,carInfo:newState,VinInfo: data.data || []}, () => {
                                        return;
                                        this.props.carSelect(this.state.VinInfo, 1, (dom, index, item, List) => {
                                            this.setState({VinInfo: {...(this.state.VinInfo || {}), ...(item || {})}})
                                            newState[3].disabled = false
                                            switch (index) {
                                                case 0:
                                                    newState[3].next = dom
                                                    break;
                                                case 1:
                                                    debugger;
                                                    for (var i in List) {
                                                        if (List[i] && List[i].familyCode == item.familyCode) {
                                                            this.props.carSelect(List[i], 2, (dom, index, item, List) => {
                                                                this.setState({VinInfo: {...(this.state.VinInfo || {}), ...(item || {})}})
                                                                switch (index) {
                                                                    case 0:
                                                                        newState[3].next = dom
                                                                        break;
                                                                    case 1:
                                                                        break;
                                                                    case 2:
                                                                        newState[4].val = item.familyAbbr;
                                                                        newState[4].familyCode = item.familyCode
                                                                        newState[4].familyName = item.familyAbbr
                                                                        newState[4].next = ''
                                                                        newState[5].next = dom
                                                                        break;
                                                                    case 3:
                                                                        newState[5].val = item.groupName;
                                                                        newState[5].next = ''
                                                                        newState[6].next = dom
                                                                        break;
                                                                    case 4:
                                                                        newState[6].val = item.vehicleName;
                                                                        newState[6].next = ''
                                                                        //newState[6].next=dom
                                                                        break;
                                                                }
                                                            })
                                                        }
                                                    }
                                                    newState[3].next = ''
                                                    newState[4].next = dom
                                                    break;
                                                case 2:
                                                    newState[4].val = item.familyAbbr;
                                                    newState[4].familyCode = item.familyCode
                                                    newState[4].familyName = item.familyAbbr
                                                    newState[4].next = ''
                                                    newState[5].next = dom
                                                    break;
                                                case 3:
                                                    newState[5].val = item.groupName;
                                                    newState[5].next = ''
                                                    newState[6].next = dom
                                                    break;
                                                case 4:
                                                    newState[6].val = item.vehicleName;
                                                    newState[6].next = ''
                                                    //newState[6].next=dom
                                                    break;
                                            }
                                        })
                                    })
                                }else{

                                    var newState=this.state.carInfo,SubmitData=this.state.SubmitData,VinInfo=this.state.VinInfo;
                                    newState[3].val = '';
                                    newState[1].val = '';
                                    SubmitData.vehicleName=''
                                    SubmitData.plateNo=''
                                    VinInfo.vehicleName='';
                                    VinInfo.plateNo=''
                                    this.setState({carInfo:newState,SubmitData:SubmitData})
                                    this.props.promptInfo({
                                        content: data.mess, Prompt: true
                                    })
                                }
                                return;
                                console.log(data)
                                var newData = this.state.carInfo;
                                var newState = newData;
                                newState[3].next = ''
                                newState[4].next = ''
                                newState[5].next = ''
                                newState[6].next = ''
                                this.setState({VinInfo: data || []}, () => {
                                    this.props.carSelect(this.state.VinInfo, 1, (dom, index, item, List) => {
                                        this.setState({VinInfo: {...(this.state.VinInfo || {}), ...(item || {})}})
                                        newState[3].disabled = false
                                        switch (index) {
                                            case 0:
                                                newState[3].next = dom
                                                break;
                                            case 1:
                                                debugger;
                                                for (var i in List) {
                                                    if (List[i] && List[i].familyCode == item.familyCode) {
                                                        this.props.carSelect(List[i], 2, (dom, index, item, List) => {
                                                            this.setState({VinInfo: {...(this.state.VinInfo || {}), ...(item || {})}})
                                                            switch (index) {
                                                                case 0:
                                                                    newState[3].next = dom
                                                                    break;
                                                                case 1:
                                                                    break;
                                                                case 2:
                                                                    newState[4].val = item.familyAbbr;
                                                                    newState[4].familyCode = item.familyCode
                                                                    newState[4].familyName = item.familyAbbr
                                                                    newState[4].next = ''
                                                                    newState[5].next = dom
                                                                    break;
                                                                case 3:
                                                                    newState[5].val = item.groupName;
                                                                    newState[5].next = ''
                                                                    newState[6].next = dom
                                                                    break;
                                                                case 4:
                                                                    newState[6].val = item.vehicleName;
                                                                    newState[6].next = ''
                                                                    //newState[6].next=dom
                                                                    break;
                                                            }
                                                        })
                                                    }
                                                }
                                                newState[3].next = ''
                                                newState[4].next = dom
                                                break;
                                            case 2:
                                                newState[4].val = item.familyAbbr;
                                                newState[4].familyCode = item.familyCode
                                                newState[4].familyName = item.familyAbbr
                                                newState[4].next = ''
                                                newState[5].next = dom
                                                break;
                                            case 3:
                                                newState[5].val = item.groupName;
                                                newState[5].next = ''
                                                newState[6].next = dom
                                                break;
                                            case 4:
                                                newState[6].val = item.vehicleName;
                                                newState[6].next = ''
                                                //newState[6].next=dom
                                                break;
                                        }
                                    })
                                })
                                newData[3].val = data.brandName;
                                newData[3].brandName = data.brandName;
                                newData[3].brandId = data.brandId;
                                newData[3].brandCode = data.brandCode;

                                newData[4].val = data.familyName;
                                newData[4].familyCode = data.familyCode;
                                newData[4].familyName = data.familyName;

                                newData[5].val = data.groupName;
                                newData[5].groupCode = data.groupCode;
                                newData[5].groupId = data.groupId;
                                this.setState({carInfo: newData}, () => {

                                })
                                console.log(data)
                            }
                        })
                    },
                    blur: (value, key, item) => {
                        var newState = this.state.carInfo
                        var SubmitData = this.state.SubmitData || {}
                        item.capital && (value = value.toUpperCase())
                        newState[key].val = value;
                        SubmitData[item.typeName] = value
                        this.setState({carInfo: newState, SubmitData: SubmitData})
                    }
                },
                /*{
                    typeName: 'brandName',
                    key: <span style={{display: 'flex', alignItems: 'center'}}>品牌 <b
                        style={{color: 'red', padding: '0 0.1rem'}}>*</b></span>,
                    placeholder: '请输入品牌*必填',
                    input: true,
                    val: '',
                    next: '',
                    change: (v) => {
                        var newState = this.state.carInfo;
                        var VinInfo = this.state.VinInfo || {};
                        if (VinInfo.brandId) delete VinInfo.brandId
                        newState[3].val = v;
                        this.setState({carInfo: newState, VinInfo: VinInfo})
                        this.props.carSelect(v, 0, (dom, index, item) => {
                            this.setState({VinInfo: {...(this.state.VinInfo || {}), ...(item || {})}})
                            newState[3].next = ''
                            newState[4].next = ''
                            newState[5].next = ''
                            newState[6].next = ''
                            switch (index) {
                                case 0:
                                    this.setState({VinInfo: this.state.VinInfo.vin || this.state.VinInfo.vinCode || ''})
                                    newState[4].val = '';
                                    newState[5].val = '';
                                    newState[6].val = '';
                                    newState[3].next = dom
                                    break;
                                case 1:
                                    newState[3].val = item.brandName;
                                    newState[3].next = ''
                                    newState[4].next = dom
                                    break;
                                case 2:
                                    newState[4].val = item.familyAbbr;
                                    newState[4].next = ''
                                    newState[5].next = dom
                                    break;
                                case 3:
                                    newState[5].val = item.groupName;
                                    newState[5].next = ''
                                    newState[6].next = dom
                                    break;
                                case 4:
                                    newState[6].val = item.vehicleName;
                                    newState[6].next = ''
                                    //newState[6].next=dom
                                    break;
                            }
                            this.setState({carInfo: newState})
                        })
                    }
                },
                {
                    typeName: 'familyAbbr',
                    key: <span style={{display: 'flex', alignItems: 'center'}}>车系 <b
                        style={{color: 'red', padding: '0 0.1rem'}}>*</b></span>,
                    placeholder: '请输入车系*必填',
                    input: true,
                    disabled: true,
                    val: '',
                },
                {
                    typeName: 'groupName',
                    key: <span style={{display: 'flex', alignItems: 'center'}}>车组 <b
                        style={{color: 'red', padding: '0 0.1rem'}}>*</b></span>,
                    placeholder: '请输入车组*必填',
                    input: true,
                    disabled: true,
                    val: '',
                },*/
                {
                    typeName: 'vehicleName',
                    key: <span style={{display: 'flex', alignItems: 'center'}}>车型 <b
                        style={{color: 'red', padding: '0 0.1rem'}}>*</b></span>,
                    placeholder: '请输入车型*必填',
                    disabled: true,
                    val: '',
                    value:'',
                    Style:{V:{color:"#333",padding:'0 4vw',textAlign:'left'},K:{flex:'none'}}
                }
            ], datailedList: {},
            showYXZ:true
        };
        this.cyccx=()=>{
            this.setState({
                tmxCarType:'0',
                engineNumber:''
            })
        }
        this.syccx=()=>{
                this.setState({
                    tmxCarType:'1'
                })
            },
        this.valueCall = (value, key, item) => {
            var newState = this.state.carInfo
            var SubmitData = this.state.SubmitData || {}
            newState[key].val = value;
            item.capital && (value = value.toUpperCase())
            SubmitData[item.typeName] = value
            this.setState({carInfo: newState, SubmitData: SubmitData})
        }
        this.inputClick = (item, key, value) => {
            return;
            switch (item.typeName) {
                case 'brandName':
                    var VinInfo = {vin: this.state.VinInfo.vin || this.state.SubmitData.vin};
                    this.carBreak('a', 0)
                    break;
                case 'familyAbbr':
                    this.carBreak('a', 0)
                    break;
                case 'groupName':
                    break;
                case 'vehicleName':
                    break;

            }
        }
        this.carBreak = (v, x) => {
            var newState = this.state.carInfo;
            newState[3].val = v;
            this.setState({carInfo: newState})
            this.props.carSelect(v, x, (dom, index, item) => {
                this.setState({VinInfo: {...(this.state.VinInfo || {}), ...(item || {})}})
                switch (index) {
                    case 0:
                        newState[3].next = dom
                        break;
                    case 1:
                        newState[3].val = item.brandName;
                        newState[3].brandId = item.brandId
                        newState[3].brandCode = item.brandCode
                        newState[3].next = ''
                        newState[4].next = dom
                        break;
                    case 2:
                        newState[4].val = item.familyAbbr;
                        newState[4].familyCode = item.familyCode
                        newState[4].familyName = item.familyAbbr
                        newState[4].next = ''
                        newState[5].next = dom
                        break;
                    case 3:
                        newState[5].val = item.groupName;
                        newState[5].next = ''
                        newState[6].next = dom
                        break;
                    case 4:
                        newState[6].val = item.vehicleName;
                        newState[6].next = ''
                        //newState[6].next=dom
                        break;
                }
                this.setState({carInfo: newState})
            })
        }
        this.loadAll = () => {
            this.setState({
                carInfo: [
                    {
                        key: '报案号:',
                        input: true,
                        val: this.state.contactPerson || '',
                        placeholder: '非必填',
                        change: (value) => {

                        }
                    },
                    {
                        key: '车牌号:',
                        input: true,
                        val: this.state.contactPhone || '',
                        placeholder: '非必填',
                        change: (value) => {

                        }
                    }
                ]
            })
        }
        //展开零件清单
        this.selectParts = () => {
            this.props.history.pushState(null, 'inquiry/SelectionParts')
            //this.setState({component:true})
        }

        //提交
        this.submit = () => {
            var datailedList = this.state.datailedList || {}, partList = []
            for (var i in datailedList) {
                console.log(datailedList, 55)
                partList.push({
                    partNum: datailedList[i].num,
                    partStandard: datailedList[i].data.name,
                    partRemark: datailedList[i].text,
                    factPartCode: datailedList[i].data.id
                })
            }
            var requestDate = {
                ...(this.state.SubmitData || {}),
                ...(this.state.VinInfo || {}),
                ...(this.state.reportData || {}),
                "familyAbbr":this.state.SubmitData.familyName,
                "partList": partList,
                "tmxCarType":this.state.tmxCarType,
                "engineNumber":this.state.engineNumber||'',
                "requestFrom":'WEIXIN',
            }
            var Must = [
                {type: 'vin', name: '车架号'},
                {type: 'vehicleName', name: '车型'},

            ], cango = true
            for (var i in Must) {
                if (!requestDate[Must[i].type]) {

                    this.props.promptInfo({
                        content: '请输入' + Must[i].name, Prompt: true
                    })
                    cango = false
                    return;
                } else {

                }
            }
            if(this.state.tmxCarType=='1'){
                if(!this.state.engineNumber){
                    this.props.promptInfo({
                        content: '请填写发动机号', Prompt: true
                    })
                    return;
                }
            }
            if (!this.props.verification('vin', this.state.carInfo[2].val)) {
                cango = false
                return;
            }
            if (partList.length < 1) {
                this.props.promptInfo({
                    content: '你至少需要选择一个零件！', Prompt: true
                })
                return;
            }

            cango && this.props.ajax({
                loading: true,
                data: {requestData: JSON.stringify(requestDate)},
                url: '/lexiugo-app/app/enquiry/addEnquiry',
                suc: (dat) => {
                    if (dat.errorCode == '0000') {
                        localStorage.setItem("PJAdd", '')
                        localStorage.setItem("PJAddjj", '')
                        localStorage.setItem("SubmitData", '');
                        localStorage.setItem("VinInfo", '');
                        this.props.promptInfo({
                            content: '已自动发起询价，请等待报价，点击确认返回！', Prompt: true, onlyOK: true, fun: () => {
                                this.props.history.replaceState('null', '/inquiry');
                                this.props.promptInfo()
                            }
                        })
                    } else {
                        this.props.promptInfo({content: dat.errorMsg, Prompt: true, onlyOK: true})
                    }
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
                    console.log(item)
                default:
                    newDatailed[item.id].num = how == 'plus' ? item.num * 1 + 1 : item.num * 1 - 1 || 1;
            }
            localStorage.setItem("PJAdd", JSON.stringify(newDatailed));
            this.setState({datailedList: newDatailed})
        }
        this.Provice=(item)=>{
            var carInfo =this.state.carInfo;
            carInfo[0].next='';
            console.log(carInfo[0].next)
            carInfo[0].value=item.provinceName
            carInfo[0].id=item.tmxEnquiryZzid
            var SubmitData=this.state.SubmitData||{}
            SubmitData.inquiryArea=item.tmxEnquiryZzid
            this.setState({carInfo:carInfo,SubmitData:SubmitData},()=>{
                console.log(this.state.SubmitData)
            })
        }
        this.closeDocument=(e)=>{return;
            let isChild=false;
            let node=e.target;
            while(node){
                if(node==this.refs.SelectBottom){
                    isChild=true;
                    break;
                }
                node=node.parentNode;
            }
            if(!isChild){
                this.setState({
                    showYXZ:false
                })
            }
        }
    }
    componentDidUpdate(){
        this.props.resetScroll()
    }
    componentDidMount() {
        this.props.changeTitle('询价');
    }
    componentWillMount(){
        this.props.ajax({
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
                }
            }
        })

        for(var i in this.state.carInfo){
            if(this.state.carInfo[i] && this.state.carInfo[i].input){
                !this.state.carInfo[i].change && (this.state.carInfo[i].change=this.valueCall)
                this.state.carInfo[i].inputClick=this.inputClick
            }
        }

        if(localStorage.getItem("PJAdd") || localStorage.getItem("SubmitData") ||localStorage.getItem("VinInfo")){
            try {
                var json=JSON.parse(localStorage.getItem("PJAdd")),
                SubmitData=localStorage.getItem("SubmitData") && JSON.parse(localStorage.getItem("SubmitData")),
                VinInfo=localStorage.getItem("VinInfo") && JSON.parse(localStorage.getItem("VinInfo"))
                var carInfo=this.state.carInfo;
                for(var i in carInfo){
                    carInfo[i].val=SubmitData[carInfo[i].typeName] || VinInfo[carInfo[i].typeName] || ''
                }
                this.setState({
                    carInfo:carInfo,
                    datailedList:json,
                    SubmitData:SubmitData || this.state.SubmitData,
                    VinInfo:VinInfo|| this.state.VinInfo
                })
            }catch (e){
                this.setState({datailedList:{}})
            }
        }
    }
    componentWillUnmount(){
        this.props.promptInfo();
        localStorage.setItem("SubmitData", JSON.stringify(this.state.SubmitData||{}));
        localStorage.setItem("VinInfo", JSON.stringify(this.state.VinInfo||{}));
    }
    render(){
        console.log(this.state.SubmitData)
        console.log(this.state.VinInfo)
        return(
            <div onClick={this.closeDocument}>
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
                <BaseLi {...this.props} data={this.state.carInfo} T={this}/>
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
                            }
                        }
                    ]}{...this.props} T={this}/>
                </span>:''}
                <this.props.InfoTitle T={this} data={{key:'零件清单',butR:(<span className="butR" onClick={this.selectParts}><span>+</span>添加</span>)}}/>

                <this.props.StateLess.DetailedList detailedList={this.state.datailedList} T={this}/>

                <this.props.InfoTitle T={this} data={{key:'上传车头车尾或配件照片'}}/>
                <this.props.StateLess.ImgListShow type='upLoadTop' imgList={[]} {...this.props} T={this}/>

                <this.props.BaseSubmit submit={this.submit} {...this.props}/>
                {this.state.component &&
                    <SelectParts {...this.props} T={this}/>
                }
            </div>
        )
    }
}