import React from 'react';
import $ from 'jquery';
import DatePicker from 'react-mobile-datepicker';
import {BaseLi,SubmitOk} from '../../../../../common/assembly/Stateless'
import SelectParts from './recoveryParts'
/**发起残件回收**/
export default class AddRecovery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskId: this.props.location.state.taskId,
            YTime: [],
            partList: {},
            jjCd: true,
            imgshow: [{
                img: {
                    background: 'url(' + require('../../../img/fangxingwei.png') + ')',
                    backgroundSize: '100%  100%'
                }
            }]
        };

        this.jjCd = () => this.setState({jjCd: !this.state.jjCd})
        this.handleSelect = (time) => {
            var datse = this.state.YTime;
            if ((time).valueOf() + 86400000 < (new Date()).valueOf()) {
                this.props.promptInfo({
                    content: '预约时间不能是过去', Prompt: true, onlyOK: true, fun: () => {
                        this.setState({time: new Date(), isOpen: true, YTime: datse});
                        this.props.promptInfo();
                    }
                })
            } else {
                datse[0].value = this.props.timeString((time).valueOf(), 'y-m-d')
                this.setState({time, isOpen: false, YTime: datse});
            }
        }
        this.handleCancel = () => {
            // alert();
        }
        this.selectParts = () => {
            // fun: (dat) => {
            //     this.setState({newData: dat.newData}, () => {
            //         console.log(this.state)
            //         this.props.history.pushState(this.state, '/recovery/photoUpdata')
            //     })
            // }
            this.props.history.pushState(this.state.YTime, 'recovery/recoveryParts')
            //this.setState({component:true})
        }
        this.submit = () => {
            var jpartList = [], oldPartList = this.state.partList;
            for (var i in oldPartList) {//fragPaste isBig isValue
                /*if(oldPartList[i] && (oldPartList[i].fragPaste || oldPartList[i].isBig || oldPartList[i].isValue) )*/
                jpartList.push(oldPartList[i])
            }

            var data = {
                "json": {
                    "orderId": this.props.orderIds,
                    "apptDate": this.state.YTime[0].value,
                    "contactPerson": this.state.contactPerson,
                    "contactPhone": this.state.contactPhone,
                    "rfName":this.state.rfName,
                    "plateNo": this.state.plateNo,
                    "carType": this.state.cxmc,
                    "partCount": jpartList.length,
                    "vin":this.state.vin,
                    "isUrgent": this.state.YTime[1].value,
                    "remark": this.state.remark,
                    "partDetailList": jpartList
                },
                "taskId": this.state.nowTaskId,
            }
            var tsText = '';
            for (var i in data.json) {
                switch (i) {
                    case 'contactPerson':
                        !data.json[i] && (tsText = '联系人不能为空')
                        break;
                    case 'contactPhone':
                        !data.json[i] && (tsText = '联系电话不能为空')
                        !(/^1[34578]\d{9}$/.test(data.json[i])) && (tsText = '联系电话格式错误')
                        break;
                    case 'partCount':
                        data.json[i] <= 0 && (tsText = '残件至少选择一个')
                        break;

                }
            }
            if (tsText) {
                this.props.promptInfo({
                    content: tsText,
                    Prompt: true,
                    onlyOK: true,
                })
                return;
            }

            data.json = JSON.stringify(data.json);
            this.props.promptInfo({loading: true});
            $.post('/toumingxiu/lossPartDeal/addLossPartMain.do', data, (msg) => {
                // console.log(msg)
                this.props.promptInfo()
                if (msg == '000000') {
                    var orderId = this.props.orderIds;
                    this.props.setProps({orderIds: false, addRecoveryKey: false}, () => {
                        this.setState({orderId: orderId}, () => {
                            history.back(-1);
                        })
                    })
                    /*this.props.promptInfo({content:'提交成功',prompt:true,onlyOK:true,fun:()=>{
                        this.props.promptInfo();
                    }})*/
                } else {
                    this.props.promptInfo({
                        content: '提交失败', Prompt: true, onlyOK: true, fun: () => {
                            this.props.promptInfo()

                        }
                    })
                }

            })
        }
        this.loadAll = () => {
            var oldData = false;
            this.props.location.state.YTime && (oldData = this.props.location.state.YTime);
            this.setState({
                YTime: [
                    {
                        Style: {ico2: '&#xe607;', V: {}},
                        key: '预约收件时间',
                        value: (oldData && oldData[0].value) || this.props.timeString((new Date()).valueOf(), 'y-m-d'),
                        fun: () => this.setState({isOpen: true})
                    },
                    {
                        Style: {ico2: '&#xe607;'},
                        key: '紧急程度',
                        value: (oldData && oldData[1].value) || '正常',
                        fun: () => {
                            var newYtime = this.state.YTime;
                            newYtime[1].value == '正常' ? newYtime[1].value = '紧急' : newYtime[1].value = '正常'
                            this.setState({YTime: newYtime})
                        }
                    },
                    {
                        key: '汽修厂联系人',
                        input: true,
                        val: this.state.contactPerson || '',
                        placeholder: '请输入联系人',
                        change: (value) => {
                            var newYtime = this.state.YTime;
                            newYtime[2].val = value
                            this.setState({contactPerson: value, YTime: newYtime})
                        }
                    },
                    {
                        key: '汽修厂电话',
                        input: true,
                        val: this.state.contactPhone || '',
                        placeholder: '请输入联系电话',
                        change: (value) => {
                            var newYtime = this.state.YTime;
                            newYtime[3].val = value
                            this.setState({contactPhone: value, YTime: newYtime})
                        }
                    },
                    {
                        key: '汽修厂名称',
                        input: true,
                        val: this.state.rfName || '',
                        placeholder: '请输入名称',
                        change: (value) => {
                            var newYtime = this.state.YTime;
                            newYtime[4].val = value
                            this.setState({rfName: value, YTime: newYtime})
                        }
                    },
                    {
                        key: '汽修厂地址',
                        input: true,
                        val: this.state.xladdress || '',
                        placeholder: '请输入地址',
                        change: (value) => {
                            var newYtime = this.state.YTime;
                            newYtime[5].val = value
                            this.setState({xladdress: value, YTime: newYtime})
                        }
                    },
                    {
                        key: '车牌',
                        input: true,
                        val: this.state.plateNo || '',
                        placeholder: '请输入车牌信息',
                        change: (value) => {
                            var newYtime = this.state.YTime;
                            newYtime[6].val = value
                            this.setState({plateNo: value, YTime: newYtime})
                        }
                    },
                    {
                        key:'车架号',
                        input:true,
                        val:this.state.vin||'',
                        placeholder:'请输入车架号',
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
                                    // console.log(data)
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
                                    // console.log(data)
                                }
                            })
                        },
                        change: (value) => {
                            var newYtime = this.state.YTime;
                            newYtime[7].val = value
                            this.setState({carType: value, YTime: newYtime})
                        }
                    },


                    //
                    //     blur: (value, key, item) => {
                    //         var newState = this.state.carInfo
                    //         var SubmitData = this.state.SubmitData || {}
                    //         item.capital && (value = value.toUpperCase())
                    //         newState[key].val = value;
                    //         SubmitData[item.typeName] = value
                    //         this.setState({carInfo: newState, SubmitData: SubmitData})
                    //     }
                    // },
                    {
                        key: '车型',
                        input: true,
                        val: this.state.carType || '',
                        placeholder: '请输入车牌信息',
                        change: (value) => {
                            var newYtime = this.state.YTime;
                            newYtime[8].val = value
                            this.setState({carType: value, YTime: newYtime})
                        }
                    },
                    {
                        key: '备注:',
                        input: true,
                        val: this.state.remark || '',
                        placeholder: '输入备注信息（不得超过200字）',
                        change: (value) => {
                            var newYtime = this.state.YTime;
                            if (value.length >= 200) {
                                this.props.promptInfo({content: '备注文字超出限制！', Prompt: true})
                            }
                            newYtime[9].val = value.substring(0, 200)
                            this.setState({remark: value.substring(0, 200), YTime: newYtime});
                        }
                    }
                ],

            })
            if (!this.props.orderIds) {
                this.props.setProps({orderIds: 'TMXC' + (new Date()).valueOf() / 82})
            }
            //details
            // for(var i=0;i<this.state.datailedList;i++){
            //
            // }
            this.props.promptInfo({loading: true})
            $.post('toumingxiu/lossPartDeal/getLossPartNo.do', {recoverId: this.state.recoverId}, (msg) => {

                // console.log(msg)
                this.props.promptInfo()
                return;
                if (msg.code == '0000') {
                    var data = msg.data.datas;

                    var datalist = [], ragPaste, isBig, isValue;
                    var newYtime = this.state.YTime;
                    newYtime[2].val = newYtime[2].val || data.xlcContact;
                    newYtime[3].val = newYtime[3].val || data.xlcContactTel,
                        this.setState({
                            contactPerson: this.state.contactPerson || data.xlcContact,
                            contactPhone: this.state.contactPhone || data.xlcContactTel,
                            YTime: newYtime
                        })
                    for (var i = 0; i < data.details.length; i++) {
                        data.details[i].fragPaste = '否'
                        data.details[i].isBig = '否'
                        data.details[i].isValue = '否'
                        var dataArr = [
                            {
                                key: data.details[i].partName
                            },
                            {
                                radio: [
                                    {key: '易碎贴', name: data.details[i].lineNo + 'sui', type: 'fragPaste'},
                                    {key: '大件', name: data.details[i].lineNo + 'big', type: 'isBig'},
                                    {key: '价值件', name: data.details[i].lineNo + 'jz', type: 'isValue'},
                                ],
                                name: data.details[i].lineNo,
                                change: (dats, m, value) => {
                                    var newState = this.state.partList || {};
                                    newState[dats.newData.lineNo] = dats.newData;
                                    newState[dats.newData.lineNo][m] = value
                                    this.setState({partList: newState})
                                },
                                newData: data.details[i],
                            },
                            {
                                Style: {ico2: '&#xe607;', V: {}},
                                key: '上传照片',
                                value: this.state.upImgList && this.state.upImgList[data.details[i].lineNo] ? this.state.upImgList[data.details[i].lineNo].length + '张' : '0张',
                                //path: '/recovery/photoUpdata',
                                newData: data.details[i],
                                fun: (dat) => {
                                    this.setState({newData: dat.newData}, () => {
                                        // console.log(this.state)
                                        this.props.history.pushState(this.state, '/recovery/photoUpdata')
                                    })
                                }
                            }
                        ]
                        var newState1 = this.state.partList || {};
                        for (var k in this.state.upImgList) {
                            if (k == data.details[i].lineNo) {
                                !this.state.partList[k] && (newState1[k] = data.details[i]);
                            }
                        }
                        datalist.push(dataArr)
                    }
                    this.setState({
                        datalist: datalist,
                        partList: newState1,
                        yData: data.details,
                        nowTaskId: data.taskId
                    }, () => {

                    })
                } else {
                    this.setState({recoveryErr: true})
                }
            })
        }
    }
    componentDidMount() {
        this.props.changeTitle('残件回收');
    }
    componentWillMount(){
        this.props.setProps({
            addRecoveryKey:this.props.addRecoveryKey || window.location.href.split('_key=')[1]
        })
        !this.props.addRecoveryKey && this.props.history.pushState(this.props.location.state,'recovery/addCjqd');
        var oldData=false;
        if(this.props.location.state.YTime){
            oldData=this.props.location.state.YTime;
            this.setState({...this.props.location.state},()=>{
                this.loadAll();
                history.back(-1)
            })
        }else{
            this.loadAll();
        }
        if(localStorage.getItem("CJADD")){
            var json=JSON.parse(localStorage.getItem("CJADD"))
            this.setState({
                datailedList:json
            },()=>{
                // console.log(this.state.datailedList)
                var dataList=this.state.datailedList || {},datalists=[];
                for (var i  in dataList) {

                    dataList[i].fragPaste = '否'
                    dataList[i].isBig = '否'
                    dataList[i].isValue = '否'
                    dataList[i].lineNo=i
                    dataList[i].partName=dataList[i].data.name
                    var dataArr = [
                        {
                            key: dataList[i].partName
                        },
                        {
                            radio: [
                                {key: '易碎贴', name: dataList[i].lineNo + 'sui', type: 'fragPaste'},
                                {key: '大件', name: dataList[i].lineNo + 'big', type: 'isBig'},
                                {key: '价值件', name: dataList[i].lineNo + 'jz', type: 'isValue'},
                            ],
                            name: dataList[i].lineNo,
                            change: (dats, m, value) => {
                                var newState = this.state.partList || {};
                                newState[dats.newData.lineNo] = dats.newData;
                                newState[dats.newData.lineNo][m] = value
                                this.setState({partList: newState})
                            },
                            newData: dataList[i],
                        },
                        {
                            Style: {ico2: '&#xe607;', V: {}},
                            key: '上传照片',
                            value: this.state.upImgList && this.state.upImgList[dataList[i].lineNo] ? this.state.upImgList[dataList[i].lineNo].length + '张' : '0张',
                            //path: '/recovery/photoUpdata',
                            newData: dataList[i],
                            fun: (dat) => {
                                this.setState({newData: dat.newData}, () => {
                                    // console.log(this.state)
                                    this.props.history.pushState(this.state, '/recovery/photoUpdata')
                                })
                            }
                        }
                    ]
                    var newState1 = this.state.partList || {};
                    for (var k in this.state.upImgList) {
                        if (k == dataList[i].lineNo) {
                            !this.state.partList[k] && (newState1[k] = dataList[i]);
                        }
                    }
                    datalists.push(dataArr)
                }
                // console.log(datalists,1000000000000)
                this.setState({dataListss:datalists})
            })

        }
    }

    componentWillUnmount(){
        this.props.promptInfo()
    }
    componentWillReceiveProps(nextProps){
        if(window.location.href.split('_key=')[1] == this.props.addRecoveryKey && !this.state.nowIsGo && !this.state.orderId){
            this.setState({nowIsGo:true},()=>{
                this.props.setProps({
                    PromptData: {
                        content: '您确定要放弃本次残件回收吗？', Prompt: true,
                        fun: (e, close) => {
                            this.props.setProps({addRecoveryKey:false},()=>{
                                history.back(-1)
                            })
                            close();
                        },
                        refuse: (e, close) => {
                            this.setState({nowIsGo:false},()=>{
                                this.props.history.pushState(this.props.location.state,'recovery/addCjqd');
                            })
                            close();
                        }
                    }
                })
            })
        }
    }
    render(){
        // console.log(this.state.datailedList)
        var data=this.state.datailedList
        // console.log(data)
        var datArr=[]
        for(var i in data){
            datArr.push({
                name:data[i].data.name,
                id:i
            })
        }
        // console.log(datArr)
        // for(var i in this.state.detailedList){
        //     datArr.push({
        //         name:this.state.detailedList[i].data.name,
        //         id:i
        //     })
        // }
        return(
            <div>
                {this.state.orderId && <SubmitOk  showData={{
                    text:'您已成功提交订单',
                    button:'查看订单',
                    butFun:()=>{this.props.history.replaceState({orderId:this.state.orderId},'recovery/orderInfo')},
                    leftT:'查看案件',
                    lefFun:()=>{this.props.history.replaceState(this.props.location.state,'recovery/caseInfo')},
                    rightT:'返回首页',
                    rigFun:()=>{this.props.history.replaceState(null,'/record')},
                }}/>}
                <h4 style={{padding: '0.2rem 4%',
                    fontSize: '0.3rem',
                    fontWeight:'600'}}>基本信息</h4>
                <BaseLi {...this.props} data={this.state.YTime} T={this}/>
                {/*<h4 style={{padding: '0.2rem 4%',fontSize: '0.3rem',fontWeight:'600',display:'inline-block'}}>零件清单</h4>*/}
                <this.props.InfoTitle T={this} data={{key:'零件清单',butR:(<span className="butR" onClick={this.selectParts}><span>+</span>添加</span>)}}/>
                {this.state.dataListss && this.state.dataListss.map((item,index)=>{
                    return(
                        <div style={{display:'flex',background:'#FFF'}}>
                            <li style={{width:'0.8rem'}}>
                                <i style={{width:'0.26rem',height:'0.26rem',position:'relative',margin:'0.35rem 0.1rem 0 0.4rem',display:'inline-block',
                                    ...(this.state.partList[item[1].newData.lineNo] ? {
                                        background:'url('+require('../../../../../common/images/fangxing.png')+')',
                                        backgroundSize:'100% 100%'
                                    }:{
                                        background:'url('+require('../../../../../common/images/fangxingwei.png')+')',
                                        backgroundSize:'100% 100% '
                                    })
                                }}>
                                    <input type="checkbox" style={{opacity:'0',position:'absolute',top:'0px',left:'0px'}} onChange={(e)=>{
                                        if(e.target.checked){
                                            var newState = this.state.partList || {};
                                            newState[item[1].newData.lineNo] = item[1].newData
                                            // console.log(newState,'partList')
                                            this.setState({partList: newState})
                                        }else{
                                            var newState = this.state.partList || {};
                                            delete newState[item[1].newData.lineNo]
                                            this.setState({partList: newState})
                                        }

                                    }}/>
                                </i>
                            </li>
                            <BaseLi style={{flex:'1'}} {...this.props} data={item} T={this}/>
                        </div>
                    )
                })}
                <div style={{width:'100vw',height:'1rem',marginTop:'0.5rem'}}>
                    <button onClick={this.submit} style={{border:'0px',width:'100%',height:'1rem',position:' fixed',bottom:'0px',left:'0px',background:'#4680f7',color:'#fff'}}>提交</button>
                </div>

                {this.state.component &&
                <SelectParts {...this.props} T={this}/>
                }
                <DatePicker
                    theme='ios'
                    value={this.state.time}
                    isOpen={this.state.isOpen}
                    onSelect={this.handleSelect}
                    onCancel={()=>this.setState({isOpen: false })} />
            </div>
        )
    }
}