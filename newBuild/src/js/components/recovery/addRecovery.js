import React from 'react';
import $ from 'jquery';
import DatePicker from 'react-mobile-datepicker';
import {BaseLi,SubmitOk} from '../../../../../common/assembly/Stateless'
/**发起残件回收**/
export default class AddRecovery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskId:this.props.location.state.taskId,
            YTime:[],
            partList:{},
            jjCd:true,
            imgshow:[{img:{background:'url('+require('../../../img/fangxingwei.png')+')',backgroundSize:'100%  100%'}}]
        };
        this.jjCd=()=>this.setState({jjCd:!this.state.jjCd})
        this.handleSelect=(time)=>{
            var datse=this.state.YTime;
            if((time).valueOf()+86400000 < (new Date()).valueOf()){
                this.props.promptInfo({content:'预约时间不能是过去',Prompt:true,onlyOK:true,fun:()=>{
                    this.setState({ time:new Date(), isOpen: true ,YTime:datse});
                    this.props.promptInfo();
                }})
            }else{
                datse[0].value=this.props.timeString((time).valueOf(),'y-m-d')
                this.setState({ time, isOpen: false ,YTime:datse});
            }
        }
        this.handleCancel=()=>{
            // alert();
        }
        this.submit=()=>{
            var jpartList=[],oldPartList=this.state.partList;
            for(var i in oldPartList){//fragPaste isBig isValue
                /*if(oldPartList[i] && (oldPartList[i].fragPaste || oldPartList[i].isBig || oldPartList[i].isValue) )*/
                jpartList.push(oldPartList[i])
            }
            var data={
                "json": {
                    "orderId": this.props.orderIds,
                    "apptDate":this.state.YTime[0].value,
                    "contactPerson": this.state.contactPerson,
                    "contactPhone": this.state.contactPhone,
                    "plateNo": this.state.yData.plateNo,
                    "carType": this.state.yData.cxmc,
                    "partCount": jpartList.length,
                    "isUrgent": this.state.YTime[1].value,
                    "remark": this.state.remark,
                    "partDetailList":jpartList
                },
                "taskId":this.state.taskId,
            }
            var tsText='';
            for(var i in data.json){
                switch(i){
                    case 'contactPerson':
                        !data.json[i] &&(tsText='联系人不能为空')
                        break;
                    case 'contactPhone':
                        !data.json[i] &&(tsText='联系电话不能为空')
                        !(/^1[34578]\d{9}$/.test(data.json[i])) && (tsText='联系电话格式错误')
                        break;
                    case 'partCount':
                        data.json[i]<=0 && (tsText='残件至少选择一个')
                        break;

                }
            }
            if(tsText){
                this.props.promptInfo({
                    content:tsText,
                    Prompt:true,
                    onlyOK:true,
                })
                return;
            }

            data.json=JSON.stringify(data.json);
            this.props.promptInfo({loading:true});
            $.post('/toumingxiu/lossPartDeal/saveLossPartMain.do',data,(msg)=>{
                this.props.promptInfo()
                console.log("11111")
                console.log(data)
                console.log(msg)
                if(msg=='000000'){
                    var orderId=this.props.orderIds;
                    this.props.setProps({orderIds:false,addRecoveryKey:false},()=>{
                        this.setState({orderId:orderId},()=>{
                            history.back(-1);
                        })
                    })
                    /*this.props.promptInfo({content:'提交成功',prompt:true,onlyOK:true,fun:()=>{
                        this.props.promptInfo();
                    }})*/
                }else{
                    this.props.promptInfo({content:'提交失败',Prompt:true,onlyOK:true,fun:()=>{
                        this.props.promptInfo()

                    }})
                }

            })
        }
        this.loadAll=()=>{
            var oldData=false;
            this.props.location.state.YTime && (oldData=this.props.location.state.YTime);
            console.log(this.props.location.state,this.state.YTime)
            this.setState({
                YTime: [
                    {
                        Style: {ico2: '&#xe607;', V: {}},
                        key: '预约收件时间',
                        value:(oldData && oldData[0].value) || this.props.timeString((new Date()).valueOf(), 'y-m-d'),
                        fun: () => this.setState({isOpen: true})
                    },
                    {
                        Style: {ico2: '&#xe607;'},
                        key: '紧急程度',
                        value:(oldData &&  oldData[1].value) || '正常',
                        fun: () => {
                            var newYtime = this.state.YTime;
                            newYtime[1].value == '正常' ? newYtime[1].value = '紧急' : newYtime[1].value = '正常'
                            this.setState({YTime: newYtime})
                        }
                    },
                    {
                        key: '联系人:',
                        input: true,
                        val:this.state.contactPerson || '',
                        placeholder: '请输入联系人',
                        change: (value) => {
                            var newYtime = this.state.YTime;
                            newYtime[2].val=value
                            this.setState({contactPerson: value,YTime: newYtime})
                        }
                    },
                    {
                        key: '联系电话:',
                        input: true,
                        val:this.state.contactPhone || '',
                        placeholder: '请输入联系电话',
                        change: (value) => {
                            var newYtime = this.state.YTime;
                            newYtime[3].val=value
                            this.setState({contactPhone: value,YTime: newYtime})
                        }
                    },
                    {
                        key: '备注:',
                        input: true,
                        val:this.state.remark || '',
                        placeholder: '输入备注信息（不得超过200字）',
                        change: (value) => {
                            var newYtime = this.state.YTime;
                            if(value.length>=200){
                                this.props.promptInfo({content:'备注文字超出限制！',Prompt:true})
                            }
                            newYtime[4].val=value.substring(0,200)
                            this.setState({remark: value.substring(0,200) ,YTime: newYtime});
                        }
                    }
                ]
            })
            if (!this.props.orderIds) {
                this.props.setProps({orderIds: 'TMXC' + (new Date()).valueOf()/82})
            }
            //details

            this.props.promptInfo({loading:true})
            $.post('/lexiugo-app/weixin/getNewDeal', {taskId: this.state.taskId}, (msg) => {
                this.props.promptInfo()
                console.log(msg)
                if (msg.code == '0000') {
                    var data = msg.data.datas;
                    var datalist = [], ragPaste, isBig, isValue;
                    var newYtime = this.state.YTime;
                    newYtime[2].val=newYtime[2].val || data.xlcContact;
                    newYtime[3].val=newYtime[3].val || data.xlcPhone,
                        this.setState({
                            contactPerson:this.state.contactPerson || data.xlcContact,
                            contactPhone:this.state.contactPhone || data.xlcPhone,
                            YTime: newYtime
                        })
                    for (var i = 0; i < data.partList.length; i++) {
                        data.partList[i].fragPaste = '否'
                        data.partList[i].isBig = '否'
                        data.partList[i].isValue = '否'
                        var dataArr = [
                            {
                                key: data.partList[i].partName
                            },
                            {
                                radio: [
                                    {key: '易碎贴', name: data.partList[i].lineNo + 'sui', type: 'fragPaste'},
                                    {key: '大件', name: data.partList[i].lineNo + 'big', type: 'isBig'},
                                    {key: '价值件', name: data.partList[i].lineNo + 'jz', type: 'isValue'},
                                ],
                                name: data.partList[i].lineNo,
                                change: (dats, m, value) => {
                                    var newState = this.state.partList || {};
                                    newState[dats.newData.lineNo] = dats.newData;
                                    newState[dats.newData.lineNo][m] = value
                                    this.setState({partList: newState})
                                },
                                newData: data.partList[i],
                            },
                            {
                                Style: {ico2: '&#xe607;', V: {}},
                                key: '上传照片',
                                value: this.state.upImgList &&  this.state.upImgList[data.details[i].lineNo] ? this.state.upImgList[data.details[i].lineNo].length + '张' : '0张',
                                //path: '/recovery/photoUpdata',
                                newData: data.partList[i],
                                fun:(dat)=>{
                                    this.setState({newData:dat.newData},()=>{
                                        console.log(this.state)
                                        this.props.history.pushState(this.state,'/recovery/photoUpdata')
                                    })
                                }
                            }
                        ]
                        var newState1 = this.state.partList || {};
                        for(var k in this.state.upImgList){
                            if(k==data.details[i].lineNo){
                                !this.state.partList[k] && (newState1[k] = data.details[i]);
                            }
                        }
                        datalist.push(dataArr)
                    }
                    this.setState({datalist: datalist,partList: newState1, yData: data.partList, TaskId: data.taskId},()=>{

                    })
                }else{
                    this.setState({recoveryErr:true})
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
        !this.props.addRecoveryKey && this.props.history.pushState(this.props.location.state,'recovery/addRecovery');
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
                                this.props.history.pushState(this.props.location.state,'recovery/addRecovery');
                            })
                            close();
                        }
                    }
                })
            })
        }
    }
    render(){
        console.log(this.props.location.state)
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
                <h4 style={{padding: '0.2rem 4%',
                    fontSize: '0.3rem',
                    fontWeight:'600'}}>残件信息</h4>
                {
                    this.state.datalist && this.state.datalist.map((item,index)=>{
                        var newImgShows=this.state.imgshow;

                        return(
                            <div style={{
                                display:'flex',background:'#fff',marginBottom:'4vw'
                            }}>
                                <span style={{
                                    margin:'0.35rem 0vw 0.35rem 4vw',width:'0.3rem',height:'0.3rem',
                                    ...(this.state.partList[item[2].newData.lineNo] ? {background:'url('+require('../../../img/fangxing.png')+')',backgroundSize:'100% 100%'} :{background:'url('+require('../../../img/fangxingwei.png')+')',backgroundSize:'100%  100%'})
                                }}><input style={{width:'0.3rem',height:'0.3rem',opacity:'0'}} type="checkbox"
                                          onChange={(e)=>{
                                              var newImgShow=this.state.imgshow;
                                              !newImgShow[index] && (newImgShow[index]={});
                                              var newState=this.state.partList||{};
                                              if(e.target.checked){
                                                  newState[item[2].newData.lineNo]=item[2].newData;
                                                  this.setState({partList:newState})
                                              }else{
                                                  delete newState[item[2].newData.lineNo]
                                                  this.setState({partList:newState})
                                              }
                                              //e.currentTarget.parentElement
                                          }}
                                /></span>
                                <ul style={{flex:1}}>
                                    <BaseLi {...this.props} data={item} T={this}/>
                                </ul>
                            </div>
                        )
                    })
                }

                <div style={{width:'100vw',height:'1rem',marginTop:'0.5rem'}}>
                    <button onClick={this.submit} style={{border:'0px',width:'100%',height:'1rem',position:' fixed',bottom:'0px',left:'0px',background:'#4680f7',color:'#fff'}}>提交</button>
                </div>


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