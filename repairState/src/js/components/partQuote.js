import React from 'react';
import $ from 'jquery';
import DatePicker from 'react-mobile-datepicker';
import {BaseLi,SubmitOk} from '../../../../common/assembly/Stateless';
/*import SelectParts from './SelectionParts'*/
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
        background:'url('+require('../../img/jian@3x.png')+') no-repeat',
        backgroundPosition:'100% 0%',backgroundSize:'0.5rem 0.5rem',
        border:'0px'
    },
    xuanze:{
        background:'url('+require('../../img/duigou.png')+') no-repeat',
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
    }
    componentDidMount() {
        console.log(this.props.location.state.fact_part_name)
        this.props.changeTitle("零件信息");
    }
    componentWillMount(){
        console.log(this.props.location.state.Pid)
        console.log(this.props.location.state)
        /*if(this.props.location.state.Pid){
            this.setState({selectId:this.props.location.state.Pid},()=>{
                debugger;
            })
        }*/
        this.props.ajax({
            loading:true,
            url:'/toumingxiu/insEnquiry/getAppPartQuoteInfo.do',
            data:{
                partId:this.props.location.state.partId,
                taskId:this.props.location.state.taskId
            },
            suc:(dat)=>{
                if(dat.success){
                    var PFList=dat.result.platformList ||[],domArr=[],
                        partPlatformId,
                        jb=['配件类型','原厂流通件', 'OEM件', '认证件', '品牌件', '拆车件', '其他'];
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
                            /*if(d==3 || d==5 || d==6){
                                //顺应领导要求将其过滤
                            }else {
                                //调整顺序，将原按序号排列换成
                                let iNums = (d == 1 && 3) || (d == 2 && 2) || (d == 4 && 1) || 0;
                                PFArr[iNums]=jbList
                            }*/
                            let iNums = d || 0;
                            PFArr[iNums]=jbList
                        }
                        domArr.push({
                            partName:PFList[i].platformName,
                            List:PFArr
                        })
                    }
                    console.log(this.state.partList,domArr)
                    this.setState({partList:domArr || [],avgPrice:dat.result.avgPrice,reMark:dat.result.remark})
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
        console.log(this.state.partList)
        console.log(this.props.location.state)
        console.log(this.state.remark==null||this.state.remark=='')
        return (
            <div className="partQuote">
                <div className="quoteInfo">
                    <div className="partInfo" style={{borderBottom:'0.01rem solid #ccc'}}>
                        配件名称
                        <span style={{float: 'right'}}>{this.props.location.state.partName}</span>
                    </div>
                    {this.state.remark==null||this.state.remark==''?<div className="partInfo">
                        备注
                        <span className="iconfonts" style={{float:'right'}}>&#xe607;</span>
                        <span style={{float:'right'}}>{this.state.remark}</span>
                    </div>:<div className="partInfo">
                            备注
                            <span className="iconfonts" style={{float: 'right'}} onClick={()=>{this.props.history.pushState({remark:this.state.remark},'/remark')}}>&#xe607;</span>
                            <span style={{float: 'right'}}>{this.state.reMark}</span>
                        </div>}
                </div>
                {this.state.partList.map((item, index) => {
                    return (
                        <div style={{background: '#fff', marginBottom: '0.2rem', paddingBottom: '0.2rem'}}>

                            <h4 style={{
                                padding: '0.25rem',
                                fontSize: '14px',
                                fontWeight: '600',
                                background: '#DDE2E5'
                            }}>{item.partName}</h4>
                            {item.List.map((item1, index1) => {

                                return (
                                    <ul style={{...style.bjUl, ...(index1 % 2 > 0 ? {background: '#f5f8fa'} : {})}}>
                                        {item1.map((item2, index2) => {
                                            return (
                                                <li style={{
                                                    ...style.bjLi, ...(index2 == 0 ? {border: '0'} : {}), ...(index1 == 0 ? {
                                                        fontWeight: '600',
                                                        // border: '0px',
                                                        padding: '0.2rem 0'
                                                    } : {fontWeight: '400'})
                                                }}>
                                                    {
                                                        typeof item2.text != 'string' ?
                                                            item2.text.map((item6, index6) => {
                                                                return (
                                                                    <div key={index6}
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
                })}
            </div>
        )
    }
}