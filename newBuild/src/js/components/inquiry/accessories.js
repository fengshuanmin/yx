import React from 'react';
import $ from 'jquery';
import DatePicker from 'react-mobile-datepicker';
import {BaseLi,SubmitOk} from '../../../../../common/assembly/Stateless';
import SelectParts from './SelectionParts'
import {disabled} from "../../../../../reportStatistics/src/img/js/antd-mobile/tag/index.web";
/**发起残件回收**/
const style={
    bjUl:{
        width:'100%',display:'flex',alignItems:'stretch',padding:'0 00rem',
    },
    bjLi:{
        fontSize:'12px',flex:1,display:'flex',alignItems:'center',flexDirection:'column',justifyContent: 'center',
        borderLeft:'1px solid #ccc',minHeight:'50px'
    },
    iconFont:{},
    divStyle:{
        width:'100%',lineHeight:'0.55rem',flex:1,display:'flex',alignItems:'center',flexDirection:'column',justifyContent: 'center',
        borderTop:'1px solid #ccc'
    },
    tuijian:{
        background:'url('+require('../../../img/jian@3x.png')+') no-repeat',
        backgroundPosition:'100% 0%',backgroundSize:'0.5rem 0.5rem',
        border:'0px'
    },
    xuanze:{
        background:'url('+require('../../../img/duigou.png')+') no-repeat',
        backgroundPosition:'100% 100%',backgroundSize:'0.4rem 0.4rem ',
        border:'1px solid rgba(255, 101, 101, 0.74)'
    }
}

export default class Accessories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            partList: [],
            GLF:30
        }
        this.submits=()=>{
            console.log(this.state)
            if(this.state.selectData||this.props.location.state.Pid){

            }else{
                this.props.promptInfo({content:'请选择一个报价！',Prompt:true,onlyOK:true})
                return;
            }
            console.log(this.state.selectData)
            var bjxx={}
            if(this.state.selectData){
                bjxx={enquiryDesc:"null",enquiryIndex:1,fact_part_name:this.state.selectData.platformFactPartName,id:this.state.selectData.id,
                    isSelected:this.state.selectData.isSelected,partBrandName:this.state.selectData.partBrandName,partId:this.state.selectData.partId,partManageFee:this.state.selectData.partManageFee,
                    partNum:this.state.selectData.partNum,partPrice:this.state.selectData.partPrice,partSpareType:this.state.selectData.platformPartType=='4'?"品牌件":this.state.selectData.platformPartType=='2'?"OEM件":
                        this.state.selectData.platformPartType=='1'?'原厂件':'其他',part_platform_id:"1",partsCompany:this.state.selectData.companyName,yb: "com"}
            }
            console.log(bjxx)
            this.props.setProps({
                BJXX: {
                    ...bjxx||this.props.EQPs, Pid: this.props.location.state.fact_part_name
                }
            },()=>{
                console.log(this.props)
                window.history.go(-1)
            })
            return;
            this.props.ajax({
                loading:true,
                url:'/toumingxiu/quote/chooseEnquiryQuotePart.do',
                data:{
                    taskId:this.props.location.state.taskId,
                    enquiryPart:this.state.selectId
                },
                suc:(dat)=>{
                    if(dat.success){
                        this.props.promptInfo({
                            content:'提交成功确认返回',
                            Prompt:true,
                            onlyOK:true,
                            fun:()=>{
                                window.history.go(-1)
                                this.props.promptInfo()
                            }
                        })
                    }else{
                        console.log(this)
                        this.props.promptInfo({
                            content:dat.errorMsg,
                            Prompt:true
                        })
                    }
                }
            })
        }
    }
    componentDidMount() {
        console.log(this.props.location.state.fact_part_name)
        this.props.changeTitle(this.props.location.state.fact_part_name);
    }
    componentWillMount(){
        /*if(this.props.location.state.Pid){
            this.setState({selectId:this.props.location.state.Pid},()=>{
                debugger;
            })
        }*/
        console.log(this.props.location.state)
        this.props.ajax({
            loading:true,
            url:'/toumingxiu/insEnquiry/getAppPartQuoteInfo.do',
            data:{
                partId:this.props.location.state.partId,
                taskId:this.props.location.state.taskId
            },
            suc:(dat)=>{
                console.log(dat)
                if(dat.success){
                    var PFList=dat.result.platformList ||[],domArr=[],
                        partPlatformId,
                        jb=['配件类型','原厂流通件','OEM件','认证件','品牌件','拆车件','其他'];
                    for(var i in PFList){
                        //配件商城
                        var PFArr=[]
                        for(var d in jb){
                            var jbList=[{type:'title',text:jb[d]}]
                            PFList[i].platformId==4 && d==2 ? jbList[0].isPinpai=true:""
                            for(var j in PFList[i].busniessList){
                                if(d==0){
                                    jbList.push({type:'title',text:PFList[i].busniessList[j].businessName})
                                }else{
                                    var jtbc=[]
                                    for(var t in PFList[i].busniessList[j].quoteList){
                                        if(PFList[i].busniessList[j].quoteList[t].tmxPartType*1==d){
                                            jtbc.push(PFList[i].busniessList[j].quoteList[t]);
                                            if(PFList[i].busniessList[j].quoteList[t].isSelected==1){
                                                this.setState({canSelect:true})
                                            }
                                        }
                                    }
                                    jbList.push({type:'val',text:jtbc,data:{num:1,pice:'100'}})
                                }
                            }

                            //重组数列
                            if(d==3 || d==5 || d==6){
                                //顺应领导要求将其过滤
                            }else {
                                //调整顺序，将原按序号排列换成
                                let iNums = (d == 1 && 3) || (d == 2 && 2) || (d == 4 && 1) || 0;
                                PFArr[iNums]=jbList
                            }


                        }
                        domArr.push({
                            partName:PFList[i].platformName,
                            List:PFArr
                        })
                    }
                    console.log(this.state.partList,domArr)
                    this.setState({partList:domArr || [],avgPrice:dat.result.avgPrice,isPurchase:dat.result.isPurchase})
                }
                console.log(dat)
            }
        })
    }
    componentWillUnmount(){
        this.props.promptInfo()
    }
    componentWillReceiveProps(nextProps){
    }
    render() {
        console.log(this.state)
        console.log(this.props)
        return (
            <div>
                {this.props.location.state.status == 3 ?
                    <p style={{background: '#83A9F6', color: '#FFFFFE', padding: '0.2rem', marginBottom: '0.2rem'}}>
                        如需等待供货商报价，请稍后再查看</p> : <p></p>}
                {
                    // this.props.location.state.zhuangtai==0 || (this.props.location.state.zhuangtai!=1&&this.props.location.state.status!=5)?
                    this.state.isPurchase!='1'?this.state.partList.map((item, index) => {
                        return (
                            <div style={{background: '#fff', marginBottom: '0.2rem', paddingBottom: '0.2rem'}} key={index}>
                                <h4 style={{
                                    padding: '0.25rem',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    background: '#DDE2E5'
                                }}>{item.partName}</h4>
                                {item.List.map((item1, index1) => {
                                    return (
                                        <ul style={{...style.bjUl, ...(index1 % 2 > 0 ? {background: '#f5f8fa'} : {}),...(index1==0?{borderBottom:'0.01rem solid #ccc'}:{})}} key={index1}>
                                            {item1.map((item2, index2) => {
                                                return (
                                                    <li style={{
                                                        ...style.bjLi, ...(index2 == 0 ? {border: '0'} : {}), ...(index1 == 0 ? {
                                                            fontWeight: '600',
                                                            padding: '0.2rem 0'
                                                        } : {fontWeight: '400'})
                                                    }} key={index2}>
                                                        {
                                                            typeof item2.text != 'string' ?
                                                                item2.text.map((item6, index6) => {
                                                                    return (
                                                                        <div key={index6} onClick={() => this.setState({
                                                                            selectId: item6.id,
                                                                            selectData: {...item6}
                                                                        })}
                                                                             style={{
                                                                                 ...style.divStyle
                                                                                 , ...(index6 == 0 ? {border: '0'} : {}),
                                                                                 ...(item6.recommendFlag == 1 ? style.tuijian : {}),
                                                                                 ...(item6.isSelected * 1 == 1 && !this.state.selectId && !this.props.location.state.Pid ? style.xuanze : {}),
                                                                                 ...(item6.id == this.state.selectId ? style.xuanze : {}),
                                                                                 ...(item6.id == this.props.location.state.Pid && !this.state.selectId ? style.xuanze : {}),
                                                                                 position: 'relative'
                                                                             }}>
                                                                            <i style={{
                                                                                position: 'absolute',
                                                                                left: '0px',
                                                                                top: '0px',
                                                                                width: '100%',
                                                                                height: '100%',
                                                                                ...(item6.recommendFlag == 1 ? style.tuijian : {})
                                                                            }}></i>
                                                                            <span>{'单价:￥' + item6.partPrice}</span>
                                                                            <span>{'数量:' + item6.partNum}</span>
                                                                        </div>
                                                                    )
                                                                }) :
                                                                (
                                                                    <span style={{maxWidth: '80%'}}>
                                                                        {item2.text}
                                                                        {item2.isPinpai &&
                                                                        <span style={{color: 'red'}}></span>}
                                                                    </span>)


                                                        }
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    )
                                })}
                            </div>
                        )
                    }):this.state.partList.map((item, index) => {
                            return (
                                <div style={{background: '#fff', marginBottom: '0.2rem', paddingBottom: '0.2rem'}} key={index}>

                                    <h4 style={{
                                        padding: '0.25rem',
                                        fontSize: '14px',
                                        fontWeight: '600',background:'##DDE2E5'
                                    }}>{item.partName}</h4>
                                    {item.List.map((item1, index1) => {
                                        console.log(item1)
                                        return (
                                            <ul style={{...style.bjUl, ...(index1 % 2 > 0 ? {background: '#f5f8fa'} : {}),...(index1==0?{borderBottom:'0.01rem solid #ccc'}:{})}} key={index1}>
                                                {item1.map((item2, index2) => {
                                                    return (
                                                        <li style={{
                                                            ...style.bjLi, ...(index2 == 0 ? {border: '0'} : {}), ...(index1 == 0 ? {
                                                                fontWeight: '600',
                                                                padding: '0.2rem 0'
                                                            } : {fontWeight: '400'})
                                                        }} key={index2}>
                                                            {
                                                                typeof item2.text != 'string' && item2.text.length==1 ?
                                                                    item2.text.map((item6, index6) => {
                                                                        return (
                                                                            <div key={index6}
                                                                                 style={{
                                                                                     ...style.divStyle,
                                                                                     ...(index6 == 0 ? {border: '0'} : {}),
                                                                                     ...(item6.recommendFlag == 1 ? style.tuijian : {}),
                                                                                     ...(item6.isSelected * 1 == 1 && !this.state.selectId && !this.props.location.state.Pid ? style.xuanze : {}),
                                                                                     ...(item6.id == this.state.selectId ? style.xuanze : {}),
                                                                                     ...(item6.id == this.props.location.state.Pid && !this.state.selectId ? style.xuanze : {}),
                                                                                     position: 'relative'
                                                                                 }}>
                                                                                <i style={{
                                                                                    position: 'absolute',
                                                                                    left: '0px',
                                                                                    top: '0px',
                                                                                    width: '100%',
                                                                                    height: '100%',
                                                                                    ...(item6.recommendFlag == 1 ? style.tuijian : {})
                                                                                }}></i>
                                                                                <span>{'单价:￥' + item6.partPrice}</span>
                                                                                <span>{'数量:' + item6.partNum}</span>
                                                                            </div>
                                                                        )
                                                                    }) :
                                                                    (
                                                                        <span style={{maxWidth: '80%'}}>
                                                                        {item2.text}
                                                                            {item2.isPinpai &&
                                                                            <span style={{color: 'red'}}></span>}
                                                                    </span>)


                                                            }
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        )
                                    })}
                                </div>
                            )
                        })
                }
                {this.state.isPurchase=='1'?'':!this.state.selectId && this.state.canSelect?<this.props.BaseSubmit
                    Style={{background: '#ccc'}}
                    {...this.props} value={'确认选择'}/>:
                <this.props.BaseSubmit
                    submit={this.submits} {...this.props} value={'确认选择'}/>}
            </div>
        )
    }
}