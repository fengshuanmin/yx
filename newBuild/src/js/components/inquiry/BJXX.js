import React from 'react';
import $ from 'jquery';
import DatePicker from 'react-mobile-datepicker';
import {BaseLi,SubmitOk} from '../../../../../common/assembly/Stateless';
import SelectParts from './SelectionParts'
/**发起残件回收**/
export default class BJXX extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            BJXX:[]
        };
        this.yb=(item,index,e)=>{
            console.log(item)
            console.log(this.props.location.state.taskId)
            var partid=item.partId
            this.props.setProps({
                EQPs:this.state.EQPs
            })
            this.props.history.pushState(
                {partId:partid,taskId:this.props.location.state.taskId,status:this.props.location.state.status,
                    fact_part_name:item.fact_part_name}
                ,'/inquiry/accessories')
        }
        this.submit=()=>{
            var text='',array=[]
            // console.log(this.state.EQPs)
            if(!this.props.BJXX){
                this.props.promptInfo({content:'请选择一个零件进行报价！',Prompt:true,onlyOK:true})
                return;
            }else{
                if(this.state.EQPs){
                    var EQPs=this.state.EQPs
                    EQPs.map((item,index)=>{
                        console.log(item)
                        item.enquiryPatrs&&item.enquiryPatrs.map((item1,index1)=>{
                            console.log(item1)
                            if(item1.id){
                                array.push(item1.id)
                            }
                        })
                    })
                }
                console.log(array)
                var text=array.join(',')
                console.log(text)
                this.props.ajax({
                    loading:true,
                    url:'/toumingxiu/quote/chooseEnquiryQuotePart.do',
                    data:{
                        taskId:this.props.location.state.taskId,
                        enquiryPart:text
                    },
                    suc:(dat)=>{
                        console.log(dat)
                        if(dat.success){

                           console.log(this.props.promptInfo)

                            var BJXXshowD=this.props.BJXXshowD;
                            delete BJXXshowD[this.props.location.state.taskId]
                            this.props.setProps({BJXX:false,BJXXshowD:BJXXshowD},()=>{
                                this.props.promptInfo({
                                    content:'提交成功确认返回',
                                    Prompt:true,onlyOK:true,
                                    fun:()=>{
                                        window.history.go(-1)
                                        this.props.promptInfo()
                                    }
                                })
                            })
                        }else{
                            this.props.promptInfo({
                                content:dat.errorMsg,
                                Prompt:true
                            })
                        }
                    }
                })
            }
        }

    }
    componentDidMount() {
        this.props.changeTitle('报价信息');
    }
    componentWillMount(){
        console.log(this.props)
        if(this.props.BJXX){
            this.props.EQPs&&this.props.EQPs.map((itee,indq)=>{
                console.log(itee.enquiryPatrs)
                itee.enquiryPatrs&&itee.enquiryPatrs.map((itet,inqx)=>{
                    console.log(itet)
                    if(itet.partId){
                        if(itet.partId===this.props.BJXX.partId){
                            // itet=this.props.BJXX
                            itee.enquiryPatrs.splice(inqx,1,this.props.BJXX)
                        }
                    }
                })
            })
            console.log(this.props.EQPs)
            this.setState({
                EQPs:this.props.EQPs,
                EVALarr:['fact_part_name', 'partsCompany', 'partSpareType', 'partNum', 'partPrice', 'yb']
            })
        }else{
            this.props.ajax({
                loading: true,
                url: '/toumingxiu/insEnquiry/getAppEnquiryPartInfo.do',
                data: {taskId: this.props.location.state.taskId},
                suc: (data) => {
                    console.log(data)
                    if (data.success && data.result.enquiryQuoteParts && data.result.enquiryQuoteParts[0]) {
                        var dat = data.result
                        var EQPs = dat.enquiryQuoteParts, linJText = '',
                            newData = [{show: ['名称', '配件商', '配件类型', '数量', '单价', 'icom'], data: {}}];
                        var EVALarr = ['fact_part_name', 'partsCompany', 'partSpareType', 'partNum', 'partPrice', 'yb']
                        var BJXX = this.props.BJXX || {}
                        console.log(BJXX)
                        var jb = ['配件类型', '原厂流通件', 'OEM件', '认证件', '品牌件', '拆车件', '其他'];
                        for (var i in EQPs) {
                            for (var j in EQPs[i].enquiryPatrs) {
                                /*newData.push(
                                    {
                                        show: [
                                            EQPs[i].enquiryPatrs[j].fact_part_name===BJXX.Pid ? EQPs[i].enquiryPatrs[j].fact_part_name :EQPs[i].enquiryPatrs[j].fact_part_name,
                                            EQPs[i].enquiryPatrs[j].fact_part_name===BJXX.Pid ? BJXX.companyName : EQPs[i].enquiryPatrs[j].partsCompany,
                                            EQPs[i].enquiryPatrs[j].fact_part_name===BJXX.Pid? jb[BJXX.tmxPartType] : (EQPs[i].enquiryPatrs[j].partSpareType=='OEM品牌件'?'品牌件':EQPs[i].enquiryPatrs[j].partSpareType),
                                            EQPs[i].enquiryPatrs[j].fact_part_name===BJXX.Pid? BJXX.partNum : EQPs[i].partNum,
                                            EQPs[i].enquiryPatrs[j].fact_part_name===BJXX.Pid? BJXX.partPrice && '￥' +BJXX.partPrice : EQPs[i].enquiryPatrs[j].partPrice&&'￥' +EQPs[i].enquiryPatrs[j].partPrice,
                                            'icom'],
                                        data: ({...EQPs[i].enquiryPatrs[j],Pid:EQPs[i].enquiryPatrs[j].fact_part_name===BJXX.Pid ? BJXX.id:false})
                                    }
                                )*/
                                EQPs[i].enquiryPatrs[j].yb = 'com';
                            }
                            EQPs[i].enquiryPatrs.unshift({
                                'fact_part_name': '名称',
                                'partsCompany': '配件商',
                                'partSpareType': '配件类型',
                                'partNum': '数量',
                                'partPrice': '单价',
                                yb: ''
                            })
                        }
                        console.log(EQPs)
                        var Err = false
                        if (newData.length > 1) {
                            Err = true;
                        }
                        var BJXXshowD = this.props.BJXXshowD || {};
                        BJXXshowD[this.props.location.state.taskId] = newData
                        this.props.setProps({BJXXshowD: BJXXshowD})
                        this.setState({BJXX: newData, Err: Err, EQPs: EQPs, EVALarr: EVALarr})
                    }
                }
            })
        }
       /* this.props.BJXXshowD && this.props.BJXXshowD[this.props.location.state.taskId] ? (()=>{
           var BJXX=this.props.BJXX || {}
           var jb=['配件类型','原厂流通件','OEM件','认证件','品牌件','拆车件','其他'];
           var EQPs=this.props.BJXXshowD[this.props.location.state.taskId],
               newData = [{show: ['名称', '配件商', '配件类型', '数量', '单价', 'icom'], data: {}}];
           for (var i in EQPs) {
               EQPs[i].show[0]!='名称' && newData.push(
                   {
                       show: [
                           EQPs[i].data.fact_part_name===BJXX.Pid ? EQPs[i].show[0] :EQPs[i].show[0],
                           EQPs[i].data.fact_part_name===BJXX.Pid ? BJXX.companyName :EQPs[i].show[1],
                           EQPs[i].data.fact_part_name===BJXX.Pid? jb[BJXX.tmxPartType] : EQPs[i].show[2],
                           EQPs[i].data.fact_part_name===BJXX.Pid? BJXX.partNum : EQPs[i].show[3],
                           EQPs[i].data.fact_part_name===BJXX.Pid? '￥' +BJXX.partPrice : EQPs[i].show[4],
                           'icom'],
                       data: ({...EQPs[i].data,Pid:EQPs[i].data.fact_part_name===BJXX.Pid ? BJXX.id:EQPs[i].data.Pid
                       })
                   }
               )
           }
           var BJXXshowD=this.props.BJXXshowD;
            BJXXshowD[this.props.location.state.taskId]=newData
           this.props.setProps({BJXXshowD:BJXXshowD})
           this.setState({BJXX:newData,Err:true})
       })(): this.props.ajax({
            loading:true,
            url:'/toumingxiu/insEnquiry/getAppEnquiryPartInfo.do',
            data:{taskId:this.props.location.state.taskId},
            suc:(data)=>{
                console.log(data)
                if(data.success && data.result.enquiryQuoteParts && data.result.enquiryQuoteParts[0]) {
                    var dat=data.result
                    var EQPs = dat.enquiryQuoteParts,linJText='',
                        newData = [{show: ['名称', '配件商', '配件类型', '数量', '单价', 'icom'], data: {}}];
                    var EVALarr=['fact_part_name','partsCompany','partSpareType','partNum','partPrice','yb']
                    var BJXX=this.props.BJXX || {}
                    console.log(BJXX)
                    var jb=['配件类型','原厂流通件','OEM件','认证件','品牌件','拆车件','其他'];
                    for (var i in EQPs) {
                        for(var j in EQPs[i].enquiryPatrs){
                            /!*newData.push(
                                {
                                    show: [
                                        EQPs[i].enquiryPatrs[j].fact_part_name===BJXX.Pid ? EQPs[i].enquiryPatrs[j].fact_part_name :EQPs[i].enquiryPatrs[j].fact_part_name,
                                        EQPs[i].enquiryPatrs[j].fact_part_name===BJXX.Pid ? BJXX.companyName : EQPs[i].enquiryPatrs[j].partsCompany,
                                        EQPs[i].enquiryPatrs[j].fact_part_name===BJXX.Pid? jb[BJXX.tmxPartType] : (EQPs[i].enquiryPatrs[j].partSpareType=='OEM品牌件'?'品牌件':EQPs[i].enquiryPatrs[j].partSpareType),
                                        EQPs[i].enquiryPatrs[j].fact_part_name===BJXX.Pid? BJXX.partNum : EQPs[i].partNum,
                                        EQPs[i].enquiryPatrs[j].fact_part_name===BJXX.Pid? BJXX.partPrice && '￥' +BJXX.partPrice : EQPs[i].enquiryPatrs[j].partPrice&&'￥' +EQPs[i].enquiryPatrs[j].partPrice,
                                        'icom'],
                                    data: ({...EQPs[i].enquiryPatrs[j],Pid:EQPs[i].enquiryPatrs[j].fact_part_name===BJXX.Pid ? BJXX.id:false})
                                }
                            )*!/
                            EQPs[i].enquiryPatrs[j].yb='com';
                        }
                        EQPs[i].enquiryPatrs.unshift({'fact_part_name':'名称','partsCompany':'配件商','partSpareType':'配件类型','partNum':'数量','partPrice':'单价',yb:''})
                    }
                    console.log(EQPs)
                    var Err=false
                    if(newData.length > 1){
                        Err=true;
                    }
                    var BJXXshowD=this.props.BJXXshowD || {};
                    BJXXshowD[this.props.location.state.taskId]=newData
                    this.props.setProps({BJXXshowD:BJXXshowD})
                    this.setState({BJXX: newData,Err:Err,EQPs:EQPs,EVALarr:EVALarr})
                }
            }
        })*/
    }
    componentWillUnmount(){
        this.props.promptInfo()
    }
    componentWillReceiveProps(nextProps){
    }
    render(){
console.log(this.state)
        const style={
            bjUl:{
                width:'100%',display:'flex',alignItems:'center',padding:'0.2rem',
            },
            bjLi:{fontSize:'13px'},
            iconFont:{}
        },liStyleArr=[{flex:1},{flex:1},{flex:1},{width:'0.8rem'},{width:'1.6rem'},{fontSize:'16px'}]
        return(
            <div style={{minHeight:'100vh'}}>
                {this.state.EQPs&&this.state.EQPs.map((item1,index1)=>{
                    console.log(item1)
                    return(
                        <div style={{background:'#fff',marginTop:'0.3rem'}}>
                            <div style={{padding:'0.2rem 0.3rem',display:'flex',alignItems:'center'}}>
                                <span style={{display:'inline-block',width:'0.03rem',height:'0.5rem',background:'#5998ff'}}></span>
                                <h4 style={{paddingLeft:'0.1rem',display:'inline-block',width:'1.5rem',fontSize:'0.3rem',fontWeight:'bold'}}>{this.state.EQPs.length=='1'?'询价单':'询价单'+(index1+1)}</h4>
                                <span style={{flex:'1'}}><span>报价时间</span>{this.props.timeString(item1.enquiryDate,'y-m-d h:m:s')}</span>
                            </div>
                            <this.props.ListInfo3 DataList={item1.enquiryPatrs||[]} orderArr={this.state.EVALarr ||[]} yb={this.yb} {...this.props} T={this}/>
                            {/*{ this.state.BJXX.map((item,index)=>{
                                var styletb=(index%2 == 0 && {backgroundColor:'#f5f8fa'});
                                index==0 && (styletb={border:'1px solid #e9e9e9',borderLeft:'0px',borderRight:'0px'})
                                return(
                                    index==0?<ul key={index} style={{...style.bjUl,...styletb}}>
                                            {item.show.map((items,indexs)=>{
                                                return(
                                                    <li key={indexs} className={items=='icom' && 'iconfonts'} style={{...style.bjLi,...liStyleArr[indexs]}}>{items=='icom'? index > 0 ? <span>&#xe607;</span>:<span style={{opacity:'0'}}>&#xe607;</span>:items}</li>
                                                )
                                            })}
                                        </ul>:
                                        <ul key={index} style={{...style.bjUl,...styletb}} onClick={()=>this.props.history.pushState({...item.data,BJXX:this.state.BJXX,taskId:this.props.location.state.taskId,status:this.props.location.state.status,zhuangtai:this.props.location.state.zhuangtai[index-1]},'/inquiry/accessories')}>
                                            {item.show.map((items,indexs)=>{
                                                return(
                                                    <li key={indexs} className={items=='icom' && 'iconfonts'} style={{...style.bjLi,...liStyleArr[indexs]}}>{items=='icom'? index > 0 ? <span>&#xe607;</span>:<span style={{opacity:'0'}}>&#xe607;</span>:items}</li>
                                                )
                                            })}
                                        </ul>
                                )
                            })}*/}
                        </div>
                    )
                })}
                {/*{
                    this.state.BJXX.map((item,index)=>{
                        console.log(index%2)
                        console.log(item.data)
                       var styletb=(index%2 == 0 && {backgroundColor:'#f5f8fa'});
                       index==0 && (styletb={border:'1px solid #e9e9e9',borderLeft:'0px',borderRight:'0px'})
                        return(
                            index==0?<ul key={index} style={{...style.bjUl,...styletb}}>
                                {item.show.map((items,indexs)=>{
                                    return(
                                        <li key={indexs} className={items=='icom' && 'iconfonts'} style={{...style.bjLi,...liStyleArr[indexs]}}>{items=='icom'? index > 0 ? <span>&#xe607;</span>:<span style={{opacity:'0'}}>&#xe607;</span>:items}</li>
                                    )
                                })}
                            </ul>:
                            <ul key={index} style={{...style.bjUl,...styletb}} onClick={()=>this.props.history.pushState({...item.data,BJXX:this.state.BJXX,taskId:this.props.location.state.taskId,status:this.props.location.state.status,zhuangtai:this.props.location.state.zhuangtai[index-1]},'/inquiry/accessories')}>
                                {item.show.map((items,indexs)=>{
                                    return(
                                        <li key={indexs} className={items=='icom' && 'iconfonts'} style={{...style.bjLi,...liStyleArr[indexs]}}>{items=='icom'? index > 0 ? <span>&#xe607;</span>:<span style={{opacity:'0'}}>&#xe607;</span>:items}</li>
                                    )
                                })}
                            </ul>
                        )
                    })
                }*/}
                {this.state.BJXX[0]?<this.props.BaseSubmit
                        Style={{background: '#ccc'}}
                        {...this.props}/>:
                    <this.props.BaseSubmit
                        submit={this.submit} {...this.props}/>}
               {/* <this.props.BaseSubmit
                    submit={this.submit} {...this.props}/>*/}
            </div>
        )
    }
}