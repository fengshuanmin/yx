import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import CarInfo from './statelessComponent/carInfo';
import OfferList from './statelessComponent/offerList';
import PeijianDs from './components/peijianDs'
require('../../common/css/style.css')
export default class ACCESSORIES extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PData:{
//零件列表
                "enquiryQuoteParts": [],
                "task": {
                    "lossUrl": "http://assessor.lexiugo.com/assessor/ShowLossFactServlet?fileName=365e50a1895d42cb9cc6cc7a5c4cc64f&requestType=001",
                    "xlc": {}
                }
            },
            oldData:{
//零件列表
                "enquiryQuoteParts": [],
                "task": {
                    "lossUrl": "http://assessor.lexiugo.com/assessor/ShowLossFactServlet?fileName=365e50a1895d42cb9cc6cc7a5c4cc64f&requestType=001",
                    "xlc": {
                    }
                }
            },
            offerListData:[]
        };
        this.toLoad=(a,b,c)=>{
            console.log(a,b)
            this.setState({showlog:[a,b,c]});
        }
        this.quxiao=(a,b)=>{
            console.log(this.state.oldData.enquiryQuoteParts[b-1])
            var newState=this.state.offerListData;
            var qxArr=['partNum','partsCompany','partPrice','partSpareType','partManageFee','id','DataQs'];
            for(var i in qxArr){
                newState[b][qxArr[i]]='';
            }
            this.setState({offerListData:newState})
        }
        this.getQuery=(action)=>{
            var reg = new RegExp("(^|&)" + action + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(!r){return false;}
            var actionViue=unescape(r[2]);
            return actionViue
        }
        this.upData=()=>{
            var dataList='',haveIsSelected=false;
            for(var i in this.state.offerListData){
                if(this.state.offerListData[i].DataQs){
                    console.log(this.state.offerListData[i].DataQs)
                    dataList+=dataList ? ','+this.state.offerListData[i].DataQs.id: this.state.offerListData[i].DataQs.id
                }
                if(this.state.offerListData[i].isSelected*1 ==1){
                    haveIsSelected=true;
                }
            }
            if(!dataList){
                if(haveIsSelected){
                    alert('您没有更改报价')
                }else{
                    alert('您没有选择报价')
                }
                return;
            }
            $.post('/toumingxiu/quote/chooseEnquiryQuotePart.do',{
                taskId:this.state.taskId,enquirySrc:this.state.enquirySrc,
                enquiryPart:dataList
            },(dat)=>{
                alert(dat.message)
                var newStates=this.state.offerListData;
                for(var i in this.state.offerListData){
                    if(newStates[i].DataQs){
                        newStates[i].DataQs=''
                        newStates[i].isSelected='1'
                    }
                }
                this.setState({offerListData:newStates})
            })
        }
    }
    componentDidMount(){
        var enquirySrc=this.getQuery('enquirySrc');
        var taskId=this.getQuery('taskId');
        this.setState({taskId:taskId,enquirySrc:enquirySrc});
        //获取报价

        $.post('/toumingxiu/insEnquiry/getEnquiryPartInfo.do',{enquirySrc:enquirySrc,taskId:taskId},(dat)=>{
            console.log(dat,'报价');
            var xlc=$.extend(dat.task.xlc,dat.task.enquiry);
            console.log(xlc)
            console.log(dat.task)
            this.setState({ PData:dat,oldData:dat,isOk:true},()=>{
                var iData=["insReportNo","partPlatformNames","vincode","plateNo","ppmc","cxmc","isInvoice","invoiceType"],
                   /* ,'配件电商','是否需要发票','发票类型'*/
                    jData=['报案号','配件电商','VIN码','车牌号','品牌名称','车型名称','是否需要发票','发票类型'],
                    newCardata=[];
                for(var i in iData){
                    var dats=this.state.PData.task.xlc[iData[i]];
                    dats=='0'? dats='-':dats
                    newCardata.push({key:jData[i],value:dats})
                }
                this.setState({carInfoData:newCardata})

                var QuotePartsdata=this.state.PData;
                var titleL={"fact_part_name":'名称',"partsCompany":'配件商',"partSpareType":'配件类型',"partNum":'数量',"partPrice":'单价',partManageFee:'管理费',"enquiryDesc":'备注',cz:'操作'}
                if(QuotePartsdata.enquiryQuoteParts[0] && QuotePartsdata.enquiryQuoteParts[0].partsCompany != '名称'){
                    QuotePartsdata.enquiryQuoteParts.unshift(titleL)
                }
                /*console.log(QuotePartsdata.enquiryQuoteParts)
                var Qep=QuotePartsdata.enquiryQuoteParts
                var status=this.state.PData.task.xlc.status*/
                /*for(var t in QuotePartsdata.enquiryQuoteParts){
                    /!*QuotePartsdata.enquiryQuoteParts[t].push(status)*!/
                    QuotePartsdata.enquiryQuoteParts[t]['status']=this.state.PData.task.xlc.status
                }*/
                this.setState({offerListData:QuotePartsdata.enquiryQuoteParts})
            })
        })
    }
    render(){
        console.log(this.state.carInfoData)
        console.log(this.state.offerListData,'offerListDate')
        console.log(this.state.flag,'flag')
        console.log(this.state.showlog)
        return (
            <div style={{minHeight:'100vh',background:'rgba(255,255,255,1)'}}>
                {this.state.showlog ?
                    <PeijianDs T={this}  getQuery={this.getQuery} dat={this.state.showlog} taskId={this.state.taskId}/>
                    :
                    <div>
                        <CarInfo  getQuery={this.getQuery} data={this.state.carInfoData || {}} T={this}/>
                        {this.state.isOk && <OfferList data={this.state.offerListData ||[]} getQuery={this.getQuery}  T={this}/>}
                        <div className="buttom">
                            {this.state.flag==2&&this.state.offerListData[0] ? <span onClick={this.upData}>确认保存</span>:<span style={{display:'none'}}>确认保存</span>}
                            <span onClick={()=>window.history.go(-1)}>返回</span>
                        </div>
                    </div>
                }


            </div>
        )
    }
}
ReactDOM.render(<ACCESSORIES />, document.getElementById("appWrapper"));