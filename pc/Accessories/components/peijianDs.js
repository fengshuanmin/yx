import React from 'react';
import $ from 'jquery'
require('../css/peijianDs.css')
export default class PEIJIANDS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isWhere:0,iHeight:[],values:[],GLF:30}
        this.changeList=(item,i,e)=>{

            $.post('/toumingxiu/insEnquiry/getPartQuoteInfo.do',
                {taskId:this.props.taskId,partId:this.props.dat[0].partId,platformId:item.id},
                (dat)=>{
                    // console.log(dat)
                    this.setState({isWhere:i},()=>{
                        this.setState({iHeight:[],listDataese:dat,phone:dat.enquiryQuoteList[0].mobilePhone},()=>{
                            this.dataUl(dat);
                        })
                    })
                })

        }
        this.dataUl=(data)=>{
            var newState=[]
            var indexs=0,nowTitle=false;
            //渲染导航
            for(var i in data.platformInfos){
                // console.log(data)
                // console.log(data.enquiryQuoteList[0].mobilePhone)
                if(data.platformInfos[i].name){
                    indexs++;
                    newState.push(<li key={i} className={this.state.isWhere==i ? 'on':'' } onClick={this.changeList.bind(null,data.platformInfos[i],indexs)}>{data.platformInfos[i].name}</li>)
                }
            }
            this.setState({Ullist:newState})
            // console.log(data)
            var pjArr={arr:[
                [{left:'配件类型',right:'配件商',type:'bTitle'}],
                [{name:'原厂流通件',gz:'',type:'bValue'}],
                [{name:'OEM件',gz:data.enquiryQuoteList[0] && data.enquiryQuoteList[0].partPlatformId=='4' ? '': '',type:'bValue'}],
                [{name:'认证件',gz:'',type:'bValue'}],
                [{name:'品牌件',gz:'',type:'bValue'}],
                [{name:'拆车件',gz:'',type:'bValue'}],
                [{name:'其他',gz:'',type:'bValue'}]
            ]},iHeight=[];
            for(var i in data.enquiryQuoteList){
                var newDa=data.enquiryQuoteList[i]
                console.log(newDa)
                if(!pjArr[newDa.businessId]){
                    pjArr[newDa.businessId]=[];
                    pjArr[newDa.businessId][0]=[{type:'pTitle',name:newDa.companyName || '配件电商',phone:newDa.mobilePhone}]
                }
                if(!pjArr[newDa.businessId][newDa.tmxPartType]){
                    pjArr[newDa.businessId][newDa.tmxPartType]=[]
                }
                pjArr[newDa.businessId][newDa.tmxPartType].push({
                    type:'pValue',
                    index:i,
                    num:newDa.partNum,
                    partPrice:newDa.partPrice,
                    PartName:newDa.platformFactPartName,
                    partManageFee:newDa.partManageFee,
                    partManageRate:newDa.partManageRate,
                    tmxPartType:newDa.tmxPartType,
                    companyName:newDa.companyName,
                    isSelected:newDa.isSelected,
                    id:newDa.id,
                    businessId:newDa.businessId,
                    recommendFlag:newDa.recommendFlag,
                    DataQs:newDa,
                    delect:newDa.delect,
                    partBrandName:newDa.partBrandName || '-'
                })
                if(pjArr[newDa.businessId][newDa.tmxPartType].length > iHeight[newDa.tmxPartType] || !iHeight[newDa.tmxPartType]){
                    iHeight[newDa.tmxPartType]=pjArr[newDa.businessId][newDa.tmxPartType].length/*
                    this.setState({iHeight:myData.pjArr[newDa.businessId][newDa.tmxPartType].length})*/
                }
            }
            var newState=[]
            var sArr=['5'];
            for(var i in pjArr){
                if(i=='arr'){
                    sArr[0]=pjArr[i];
                }else{
                    sArr.push(pjArr[i])
                }
            }
            for(var i in sArr){
                sArr[i] && newState.push(this.AddUl(sArr[i],iHeight));
            }

            this.setState({iHeight:[],atdList:newState,sArr:sArr},()=>{
                setTimeout(()=>{
                    this.setState({iHeight:this.state.iHeight})
                },300)
            })
        }
        this.AddUl=(arr,iHeight)=>{
            return;
            var uiArr=[]
            for(var i=0;i<=6;i++){
                if(i==3 || i==5 || i==6){
                    return(false)
                    //顺应领导要求将其过滤
                }else {
                    //调整顺序，将原按序号排列换成
                    let iNums = (i == 1 && 3) || (i == 2 && 2) || (i == 4 && 1) || 0;

                    var myData = [];
                    !arr[i] && (arr[i] = {})
                    // console.log(arr,'arr')
                    for (var m in arr[i]) {
                        switch (arr[i][m].type) {
                            case 'bTitle':
                                myData.push(
                                    <div key={'btm'+i}><span>{arr[i][m].left}</span><span>{arr[i][m].right}</span></div>
                                )
                                break;
                            case 'bValue':
                                myData.push(
                                    <div key={'bv'+i}><span>{arr[i][m].name}</span><span
                                        style={{color: 'red'}}>{' ' + arr[i][m].gz}</span></div>
                                )
                                break;
                            case 'pTitle':
                                myData.push(
                                    <div key={'D'+i}>
                                        <div style={{minWidth: '115px'}}><span>{arr[i][m].name}</span></div>
                                    </div>
                                )
                                break;
                            case 'pValue':
                                var myDatase = []

                                myDatase.push(
                                    <div key={"myDat"+i} style={{flex: 1, display: 'flex', alignItems: 'center'}}>
                                        {(arr[i][m].recommendFlag == '1' || arr[i][m].recommendFlag == 1) &&
                                        <span className="tuijianPeijian"></span>}
                                        {/*删除按钮*/}
                                        {!arr[i][m].delect &&
                                        <span onClick={this.caozuo.bind(this,arr[i][m].index,'delect')} className="spanShow" style={{
                                            position: 'absolute', top: '10px', right: '10px', background: '#fff',
                                            width: '20px', height: '20px', textAlign:' center', borderRadius: '100%',
                                        }}>x</span>}
                                        {/*推荐按钮*/}

                                        <span className="spanShow" style={{
                                            position: 'absolute', bottom: '10px', right: '10px', textAlign:' center',
                                            padding:'5px 10px',background:'#ec5e5e',color:'#fff',borderRadius:'6px'
                                        }}>推荐</span>
                                        {/*恢复按钮*/}
                                        { arr[i][m].delect && <span className="spanHF" style={{
                                            position: 'absolute', top: '10px', right: '10px', background: '#fff',
                                            textAlign:' center', borderRadius: '100%',padding:'5px 10px'
                                        }}>x</span>}
                                        {/*取消推荐按钮*/}
                                        { arr[i][m].recommendFlag*1 == 1 &&
                                        <span  className="spanHF" style={{
                                            position: 'absolute', bottom: '10px', right: '10px', textAlign:' center',
                                            padding:'5px 10px',background:'#ec5e5e',color:'#fff',borderRadius:'6px'
                                        }}>取消推荐</span>}

                                        {
                                            !this.style.isYY && (
                                                this.props.dat[0].id == arr[i][m].id && arr[i][m].isSelected=='1'?
                                                    <input type="radio" id={m + 'inputid' + i} defaultChecked
                                                           disabled={this.props.dat[0].isSelected * 1 == 1 ? false : false}
                                                           name="changeItem" onChange={this.chooce.bind(null, arr[i][m])}/>
                                                    :
                                                    <input type="radio" id={m + 'inputid' + i + arr[i][m].businessId}
                                                           disabled={this.props.dat[0].isSelected * 1 == 1 ? false : false}
                                                           name="changeItem" onChange={this.chooce.bind(null, arr[i][m])}/>
                                            )
                                        }
                                        <label htmlFor={m + 'inputid' + i + arr[i][m].businessId}>
                                            <div style={{minWidth: '115px'}}>
                                                <span>数量:{arr[i][m].num}</span>
                                                <span>单价:{arr[i][m].partPrice}</span>
                                                <span title={arr[i][m].partBrandName}>品牌:{!arr[i][m].partBrandName || arr[i][m].partBrandName.length <= 7 ? arr[i][m].partBrandName : (arr[i][m].partBrandName || '-')}</span>
                                                <span>管理费率:
                                                    <input type="number" onBlur={this.glfChange.bind(this,arr[i][m].index)}
                                                           value={this.state.values[arr[i][m].id] || arr[i][m].partManageRate*100}
                                                           onChange={this.changeInput.bind(this,arr[i][m].id)}
                                                           style={{width:'40px',marginRight:'5px'}}/>%
                                                </span>
                                                <span>预计管理费:{arr[i][m].partManageFee}</span>
                                            </div>
                                        </label>
                                    </div>
                                )
                                myData.push(<div key={'div'+i} className={
                                    !this.props.getQuery('isYY') && 'myDataHover delectTrue '+
                                    (arr[i][m].delect && 'delectTrue')
                                    /* !arr[i][m].isClose && 'lH2'*/
                                } style={{
                                    display: 'flex', flex: 1, alignItems: 'center', flexDirection: 'column',
                                    width: '100%', position: 'relative'
                                }}>
                                    <span className="xiexian">
                                    </span>
                                    {myDatase}</div>)

                                break
                            default:
                        }
                    }

                    uiArr[iNums] = (
                        <li key={i} className={i == 0 && arr[i][0].type == 'bTitle' ? 'lH' : ''}
                            style={{height: 85 * (iHeight[i] || 1) + 'px', position: 'relative'}}>{myData}</li>
                    )
                }
            }
            var ulis=(<ul key={Math.random()}>
                {uiArr}
            </ul>)
            return ulis
        }


        this.chooce=(arr,e)=>{
            if(arr.delect)return
            this.setState({ridioData:arr})
        }
        this.changeItem=()=>{
            var newPData=this.props.T.state.offerListData;
            /*
                            "fact_part_name","partsCompany","partSpareType","partNum","partPrice",'bz','cz'
            */
            let listAstrr=['','品牌件','OEM件','原厂流通件']
            var arrtype=['','原厂流通件','OEM件','认证件','品牌件','拆车件','其他']
            newPData[this.props.dat[1]].partNum=this.state.ridioData.num
            newPData[this.props.dat[1]].partsCompany=this.state.ridioData.companyName
            newPData[this.props.dat[1]].partPrice=this.state.ridioData.partPrice
            newPData[this.props.dat[1]].partSpareType=arrtype[this.state.ridioData.tmxPartType]
            newPData[this.props.dat[1]].DataQs=this.state.ridioData.DataQs
            newPData[this.props.dat[1]].isSelected=this.state.ridioData.isSelected
            newPData[this.props.dat[1]].partBrandName=this.state.ridioData.partBrandName || '-'
            newPData[this.props.dat[1]].partManageFee=this.state.ridioData.partManageFee
            newPData[this.props.dat[1]].partManageRate=this.state.ridioData.partManageRate
            newPData[this.props.dat[1]].delect=this.state.ridioData.delect
            newPData[this.props.dat[1]].id=this.state.ridioData.id
            this.setState({offerListData:newPData},()=>this.props.T.setState({showlog:false,flag:'2'}));
        }
        this.glfChange=(index,e)=>{

            let dat=this.state.listDataese.enquiryQuoteList[index];
            this.state.values[dat.id]=e.target.value
            dat.partManageRate=((e.target.value||0) >100 ? 0:(e.target.value||0))/100
            dat.partManageFee=(dat.partManageRate*dat.partPrice*dat.partNum).toFixed(2);

            this.dataUl(this.state.listDataese);
            this.setState({listDataese:this.state.listDataese,values:this.state.values});
        }
        this.caozuo=(index,type,e)=>{
            let q=this.state.listDataese.enquiryQuoteList;
            let dat=q[index];
            switch(type){
                case 'HF':
                    dat.delect=false
                    break;
                case 'delect':
                    dat.recommendFlag=false;
                    dat.delect=true
                    break;
                case 'QX':
                    dat.recommendFlag=false;
                    break;
                case 'TJ':
                    for(var i in q){
                        if(q[i]){
                            q[i].recommendFlag=false
                        }
                        dat.recommendFlag=1;
                    }
                    break;
                default:
            }
            this.dataUl(this.state.listDataese);
            this.setState({listDataese:this.state.listDataese});
        }
        this.changeInput=(index,e)=>{

            this.state.values[index]=e.target.value;
            this.setState({values:this.state.values},()=>{
                this.dataUl(this.state.listDataese);
            })
        }
    }
    componentDidMount(){
        // console.log(this.props)
        // console.log(this.props.taskId)
        // console.log(this.props.dat[0].partId)
        $.post('/toumingxiu/insEnquiry/getPartQuoteInfo.do',{taskId:this.props.taskId,partId:this.props.dat[0].partId,platformId:''},(dat)=>{
            // console.log(dat)
            this.setState({iHeight:[],listDataese:dat},()=>{
                this.dataUl(dat);
                this.setState({avgPrice:dat.avgPrice,phone:dat.enquiryQuoteList[0].mobilePhone,isPurchase:dat.isPurchase})
            })
        })
        this.setState({isYY:this.props.getQuery('isYY')})
    }
    componentDidUpdate(){
        $('.delectTrue').each((index,item)=>{
            var pai=2*Math.asin(1);
            var height=$(item).height();
            var width=$(item).width();
            var c=Math.sqrt(height*height+width*width)
            var jiao=180*Math.asin(height/c)/pai
            $(item).find('span.xiexian').css({
                width:c+'px',height:'1px',background:'#ccc',transform:'rotate('+jiao+'deg)',
                position:'absolute',top:'0px',left:'0px',transformOrigin:'0% 0%'
            })
        });
    }
    render(){
        // console.log(this.props.T.state.PData.task.xlc.status)
        // console.log(this.state.sArr)
        // console.log(this.props,"123")
        var statusCode=this.props.T.state.oldData.task.xlc.status
        $('.delectTrue').each((index,item)=>{
            var pai=2*Math.asin(1);
            var height=$(item).height();
            var width=$(item).width();
            var c=Math.sqrt(height*height+width*width)
            var jiao=180*Math.asin(height/c)/pai
            $(item).find('span.xiexian').css({
                width:c+'px',height:'1px',background:'#ccc',transform:'rotate('+jiao+'deg)',
                position:'absolute',top:'0px',left:'0px',transformOrigin:'0% 0%'
            })
        })
        let platformInfos=[],enquiryQuoteList=[],sArr=[];
        if(this.state.listDataese){
            platformInfos=this.state.listDataese.platformInfos || []
            enquiryQuoteList=this.state.listDataese.enquiryQuoteList || []
        }
        this.state.sArr && (sArr=this.state.sArr)
        return(
            <div id="peijianDs">
                <div className="title" style={{background:'#5e93fb'}} onClick={()=>false && this.setState({isYY:!this.state.isYY})}>{this.props.dat[0].fact_part_name+'报价'}</div>
                <div className="DSBox">
                   {/* {this.state.avgPrice && <ul style={{display:'flex',aingnItem:'center',justifyContent:'center',padding:'10px 5%'}}>
                    {
                    [{name:'秒报'},
                    {name:'品牌件'},
                    {name:'裸价：',value:this.state.avgPrice*1 ? (this.state.avgPrice*1).toFixed(2) : '暂无报价'},
                    {name:'管理费率：',value:(<span><input
                    onChange={(e)=>{this.state.GLF=e.target.value; this.setState({GLF:this.state.GLF || 0})}}
                    type="number" style={{maxWidth:'35px',textAlign:'center',borderRadius:'3px'}} value={this.state.GLF}/> %</span>)},
                    {name:'管理费：',value:(this.state.avgPrice*(this.state.GLF/100)).toFixed(2)},
                    {name:'合计：',value:(this.state.avgPrice*(1+this.state.GLF/100)).toFixed(2)},
                    ].map((item,index)=>{
                    return(
                    <li style={{flex:'1',textAlign:'center',border:'1px solid #ccc',borderLeft:'0px',color:'#666',
                    ...(index==0?{borderLeft:'1px solid #ccc',background:'#f6f6f8',fontWeight:'600',color:'#0a0a0af0'}:{}),padding:'8px 0',}}><span>{item.name}</span><span>{item.value||''}</span></li>
                    )
                    })
                    }

                    </ul>}*/}
                    {statusCode==3?<p style={{background:'#F6F6F7',color:'#fe884e',fontWeight:'bold',fontSize:'14px',padding:'15px',marginBottom:'15px',marginTop:'-15px'}}>如需等待供货商报价，请稍后再查看</p>:<p></p>}
                    <div className="nav" style={{borderBottom:'1px solid #5e93fb'}}>
                        <ul>
                            {platformInfos.map((item,i)=>{
                                return(
                                    <li key={i}
                                        style={{background:'#5e93fb',border:'0px',position:'relative',top:'1px',color:'#fff',
                                            marginRight:'15px',...(this.state.isWhere==i ? {background:'#fff',color:'#5e93fb',border:'1px solid #5e93fb',borderTop:'2px solid #5e93fb',borderBottom:'0'}:{})
                                        }}
                                        className={this.state.isWhere==i ? 'on':'' }
                                        onClick={this.changeList.bind(null,item,i)}>
                                        {item.name}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="DSBody">
                        {
                            sArr.map((item,index)=>{
                                let arr6=[]
                                for(var g=0; g<6;g++){
                                    arr6.push(g)
                                }
                                return(
                                    <ul>
                                        {
                                            arr6.map((item1,index6)=>{
                                                // console.log(arr6)
                                                let iNums=0,i=index6
                                                if(i==4 || i==5 || i==6){
                                                    return (false);
                                                }else{
                                                    iNums = (i == 1 && 4) || (i == 2 && 2) || (i == 3 && 1) || 0;
                                                }

                                                item[iNums]=item[iNums]||[]
                                                this.state.iHeight[iNums]=
                                                    this.state.iHeight[iNums] >item[iNums].length ?this.state.iHeight[iNums] :item[iNums].length

                                                return(
                                                    <li key={i} className={i == 0 && item[0][0].type == 'bTitle' ? 'lH' : ''}
                                                        style={{height: (i==0?64:100) * (this.state.iHeight[iNums] || 1) + 'px', position: 'relative'}}>
                                                        {
                                                            item[iNums].map((item2,index2)=>{
                                                                if(!item2)return false
                                                                console.log(item2,'item2')
                                                                switch (item2.type) {
                                                                    case 'bTitle':
                                                                        return <div key={'btm'+index2}><span>{item2.left}</span><span>{item2.right}</span></div>

                                                                        break;
                                                                    case 'bValue':
                                                                        return <div key={'bv'+index2}><span>{item2.name}</span><span
                                                                            style={{color: 'red'}}>{' ' + item2.gz}</span></div>

                                                                        break;
                                                                    case 'pTitle':
                                                                        return  <div key={'D'+index2}>
                                                                            <div style={{minWidth: '115px'}}><span>{item2.name} <br/><span>{item2.phone}</span></span></div>
                                                                        </div>
                                                                        break;
                                                                    case 'pValue':

                                                                        return (
                                                                            <div key={'div'+index2} className={
                                                                                this.state.isYY && 'myDataHover '+
                                                                                (item2.delect && 'delectTrue')
                                                                            } style={{
                                                                                display: 'flex', flex: 1, alignItems: 'center', flexDirection: 'column',
                                                                                width: '100%', position: 'relative'
                                                                            }}>
                                                                            <span className="xiexian">
                                                                            </span>
                                                                                <div key={"myDat"+i} style={{flex: 1, display: 'flex', alignItems: 'center'}}>
                                                                                    {(item2.recommendFlag == '1' || item2.recommendFlag == 1) &&
                                                                                    <span className="tuijianPeijian"></span>}
                                                                                    {/*删除按钮*/}
                                                                                    {!item2.delect &&
                                                                                    <span onClick={this.caozuo.bind(this,item2.index,'delect')} className="spanShow" style={{
                                                                                        position: 'absolute', top: '10px', right: '10px', background: '#fff',
                                                                                        width: '20px', height: '20px', textAlign:' center', borderRadius: '100%',
                                                                                    }}>x</span>}
                                                                                    {/*推荐按钮*/}
                                                                                    { item2.recommendFlag*1 != 1 && !item2.delect &&
                                                                                    <span onClick={this.caozuo.bind(this,item2.index,'TJ')} className="spanShow" style={{
                                                                                        position: 'absolute', bottom: '10px', right: '10px', textAlign:' center',
                                                                                        padding:'5px 10px',background:'#ec5e5e',color:'#fff',borderRadius:'6px'
                                                                                    }}>推荐</span>}

                                                                                    {/*恢复按钮*/}
                                                                                    { item2.delect && <span onClick={this.caozuo.bind(this,item2.index,'HF')} className="spanHF" style={{
                                                                                        position: 'absolute', top: '10px', right: '10px', background: '#fff',
                                                                                        textAlign:' center', borderRadius: '6%',padding:'5px 10px',
                                                                                    }}>恢复</span>}

                                                                                    {/*取消推荐按钮*/}
                                                                                    { item2.recommendFlag*1 == 1 && !item2.delect &&
                                                                                    <span onClick={this.caozuo.bind(this,item2.index,'QX')} className="spanHF" style={{
                                                                                        position: 'absolute', bottom: '10px', right: '10px', textAlign:' center',
                                                                                        padding:'5px 10px',background:'#ec5e5e',color:'#fff',borderRadius:'6px'
                                                                                    }}>取消推荐</span>}

                                                                                    {
                                                                                        this.state.isPurchase=='1'? (
                                                                                            // this.props.dat[0].id == item2.id ?
                                                                                            item2.isSelected&&item2.isSelected=='1'?
                                                                                                <input type="radio" id={i + 'inputid' + i} defaultChecked
                                                                                                       disabled={true}
                                                                                                       name={"changeItem"+item2.partPlatformId} />
                                                                                                :
                                                                                                <input type="radio" id={i + 'inputid' + i + item2.businessId}
                                                                                                       disabled={true}
                                                                                                    /*disabled={this.props.dat[0].isSelected * 1 == 1 ? false : false}*/
                                                                                                       name={"changeItem"+item2.partPlatformId}/>
                                                                                        ):!this.state.isYY && (
                                                                                             item2.isSelected=='1'?
                                                                                                <input type="radio" id={i + 'inputid' + i} defaultChecked
                                                                                                       // disabled={false}
                                                                                                       disabled={this.props.dat[0].isSelected * 1 == 1 ? false : false}
                                                                                                       name={"changeItem"+item2.partPlatformId} onChange={this.chooce.bind(null, item2)}/>
                                                                                                :
                                                                                                <input type="radio" id={i + 'inputid' + i + item2.businessId}
                                                                                                       // disabled={false}
                                                                                                       disabled={this.props.dat[0].isSelected * 1 == 1 ? false : false}
                                                                                                       name={"changeItem"+item2.partPlatformId} onChange={this.chooce.bind(null, item2)}/>
                                                                                        )
                                                                                    }
                                                                                    <label htmlFor={i + 'inputid' + i + item2.businessId}>
                                                                                        <div style={{minWidth: '115px'}}>
                                                                                            <span>数量:{item2.num}</span>
                                                                                            <span>单价:{item2.partPrice}</span>
                                                                                            <span title={item2.partBrandName}>品牌:{!item2.partBrandName || item2.partBrandName.length <= 7 ? item2.partBrandName : (item2.partBrandName || '-')}</span>
                                                                                            <span>管理费率:
                                                                                                {
                                                                                                    item2.delect || !this.state.isYY?
                                                                                                        <span>{item2.partManageRate*100}</span>:
                                                                                                        <input type="number" onBlur={this.glfChange.bind(this,item2.index)}
                                                                                                               value={this.state.values[item2.id] || item2.partManageRate*100}
                                                                                                               onChange={this.changeInput.bind(this,item2.id)}
                                                                                                               style={{width:'40px',marginRight:'5px'}}/>

                                                                                                }

                                                                                                <span>%</span>
                                                                                            </span>
                                                                                            <span>管理费:{item2.partManageFee}</span>
                                                                                        </div>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                        var myDatase = []

                                                                        myDatase.push(

                                                                        )

                                                                        break
                                                                    default:
                                                                }
                                                            })
                                                        }
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>

                                )

                            })

                        }
                        {/*{this.state.atdList}*/}
                        {/*<ul className="xian" style={{display:'block'}}>*/}
                        {/*<li></li>*/}
                        {/*<li style={{height:'100px'}}></li>*/}
                        {/*<li style={{height:'100px'}}></li>*/}
                        {/*<li style={{height:'100px'}}></li>*/}
                        {/*</ul>*/}
                    </div>
                    <div className="buttomStyle">{this.state.ridioData && <span onClick={this.changeItem}>确认选择</span>}<span onClick={()=>this.props.T.setState({showlog:false})}>返回</span></div>
                </div>
            </div>
        )
    }
}