import React from 'react'
import $ from 'jquery'
import someEvent from '../../../../common/baseFun/someEvent'
require('./css/stateless.css');
var jtm={

    caseList:(props)=>{

        // console.log(props.iteDat)
        // console.log(props.iteDat.purchaseState)
        !props.iteDat.show && (props.iteDat.show=[]);
        var ab={
            '待处理':[(props.iteDat.tmxcOrderStatus=='待处理') ,{color:"#fff"}],
            '待派单':[(props.iteDat.tmxcOrderStatus=='待派单') ,{color:"#fff"}],
            '待回收':[(props.iteDat.tmxcOrderStatus=='待回收') ,{color:"#fff"}],
            '整单回收':[(props.iteDat.tmxcOrderStatus=='整单回收') ,{color:"#fff"}],
            '部分回收':[(props.iteDat.tmxcOrderStatus=='部分回收') ,{color:"#fff"}]
        },Dtext={}
        for(var i in ab){
            if(ab[i][0]){
                Dtext.text=i;Dtext.style=ab[i][1]
            }
        }
        //0待询价，1待报价，2已报价，4询价失败
        //
        var bmState=[
            {style:'#fb676b',text:'新建未询价'},
            {style:'#febf52',text:'已询待报价'},
            {style:'#3fcf9e',text:'人工已报价'},
            {style:'#3fcf9e',text:'系统已秒报'},
            {style:'#dadada',text:'询价已超时'},
            {style:'#3fcf9e',text:'已发起采购'},
            {style:'#7DB0F5',text:'部分采购'},
            {style:'#3fcf9e',text:'全部采购'},
            {style:'#fb676b',text:'待采购'}
        ]
        /*var cmState=[
            {style:'#fb676b',text:'代采购'},
            {style:'#5A98F4',text:'部分采购'},
            {style:'#3fcf9e',text:'全部采购'},
            {style:'#dadada',text:'未成功采购'},
        ]*/
        return(
            <div className="caseList" onClick={()=>props.history.pushState(props.iteDat,props.iteDat.path)}>
                {/*{props.iteDat.type=='am' && <div className="icom"><span>已发起</span><span>{(props.iteDat.totalNum-props.iteDat.remainNum || 0) +'/'+props.iteDat.totalNum}</span></div>}*/}
                {/*
                dispatchStatus 已分派，未派单
未处理/未派单/未回收/已回收/部分回收
当未回收的时候判断==‘未派单’，如果==，则是未派单，！=是未回收
                */}
                {/*{props.iteDat.type=='hm' && <div className="icomc" style={Dtext.style}>{Dtext.text}</div>}*/}


                {/*{props.iteDat.type=='bm' && <div className="icomc" style={{background:bmState[props.iteDat.status].style}}>{bmState[props.iteDat.status].text}</div>}
                {props.iteDat.type !='bm' && <h4>{props.iteDat.orderId || props.iteDat.xlcName || '数据错误'}</h4>}
                {props.iteDat.type =='bm' && props.iteDat.insReportNo !='报案号:null' && <h4 style={{width:'60vw',overflow: 'hidden',textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'}}>{props.iteDat.insReportNo || ''}</h4>}*/}

                {props.iteDat.type=='bm' && <div className="icomc" style={{background:bmState[props.iteDat.status].style}}>{props.iteDat.statusDesc}</div>}
                {/*{props.iteDat.type !='bm' && <h4>{props.iteDat.orderId || props.iteDat.xlcName || '数据错误'}</h4>}*/}
                {props.iteDat.type =='bm' && props.iteDat.insReportNo !='报案号:null' && <h4 style={{width:'60vw',overflow: 'hidden',textOverflow: 'ellipsis',padding:'0 4vw',paddingTop:'0.15rem',
                    whiteSpace: 'nowrap'}}>{props.iteDat.insReportNo || ''}</h4>}
                {props.iteDat.type=='cm' && <div className="icomc" style={{background:bmState[props.iteDat.purchaseState].style}}>{bmState[props.iteDat.purchaseState].text}</div>}
                {/*{props.iteDat.type !='cm' && <h4>{props.iteDat.orderId || props.iteDat.xlcName || '数据错误'}</h4>}*/}
                {props.iteDat.type =='cm' && props.iteDat.insReportNo !='报案号:null' && <h4 style={{width:'60vw',overflow: 'hidden',textOverflow: 'ellipsis',padding:'0 4vw',paddingTop:'0.15rem',
                    whiteSpace: 'nowrap'}}>{props.iteDat.insReportNo || ''}</h4>}
                {props.iteDat.type=='am' && <div className="icomc" style={{background:props.iteDat.orderStatus=='100'?'#fb676b':''||props.iteDat.orderStatus=='101'?'#febf52':''||props.iteDat.orderStatus=='102'?'#7DB0F5':''||props.iteDat.orderStatus=='103'?'#3fcf9e':''||props.iteDat.orderStatus=='200'?'#dadada':''}}>
                    {props.iteDat.orderStatus=='100'?'待付款':''||props.iteDat.orderStatus=='101'?'待发货':''||props.iteDat.orderStatus=='102'?'待收货':''||props.iteDat.orderStatus=='103'?'已完成':''||props.iteDat.orderStatus=='200'?'已取消':''}</div>}
                {/*{props.iteDat.type !='cm' && <h4>{props.iteDat.orderId || props.iteDat.xlcName || '数据错误'}</h4>}*/}
                {/*{props.iteDat.type =='am' && props.iteDat.insReportNo !='报案号:null' && <h4 style={{width:'60vw',overflow: 'hidden',textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'}}>{props.iteDat.insReportNo || ''}</h4>}*/}
                <ul style={{padding:'3vw 4vw'}}>
                    {
                        props.iteDat.show.map((item,index)=>{
                            item.Styles=item.Styles || {}
                            return(
                                <li key={index}>{item.key?<span>{item.key+':'}</span>:''}{item.key?<span style={item.Styles.V || {}}>{item.value}</span>:<span className="mar" style={item.Styles.V || {}}>{item.value}</span>}</li>
                            )
                        })
                    }
                </ul>
                {
                    props.iteDat.type =='cm'&&props.iteDat.status==2||props.iteDat.type =='cm'&&props.iteDat.status==3 ||props.iteDat.type =='cm'&&props.iteDat.status==5?
                    <p style={{display:'flex',textAlign:'left',padding:'3vw 4vw',borderTop:'0.01rem solid #F4F4F4'}}>
                       <time style={{color:'#999',flex:'1'}} dateTime={props.iteDat.pushTime || props.iteDat.createTime || props.iteDat.time}>{props.timeString(props.iteDat.pushTime || props.iteDat.createTime || props.iteDat.time,'y-m-d h:m:s')}</time>
                        {props.iteDat.type =='cm'&& props.iteDat.purchaseState==null||props.iteDat.type =='cm'&&props.iteDat.purchaseState==''||props.iteDat.type =='cm'&&props.iteDat.purchaseState==8||props.iteDat.type =='cm'&&props.iteDat.purchaseState==6?<span style={{
                            padding:'0.1rem 0.4rem',height:'0.6rem',display:'flex',alignItems:'center',
                            border:'1px solid #ccc',borderRadius:'0.5rem',fontSize:'0.26rem'
                        }} onClick={props.Purchase} /*onClick={(event)=>{event.stopPropagation();props.history.pushState({taskId:props.iteDat.taskId},'/purchase/partsBuy');return;}}*/>配件采购</span>:''}
                    </p>

                        :
                    <p  style={{padding:'3vw 4vw',...(props.iteDat.type=='am'?{display:'none'}:{})}}><time style={{color:'#999'}} dateTime={props.iteDat.pushTime || props.iteDat.createTime || props.iteDat.time}>{props.timeString(props.iteDat.pushTime || props.iteDat.createTime || props.iteDat.time,'y-m-d h:m:s')}</time></p>
                }
                {props.iteDat.orderStatus=='100'?<p style={{padding:'3vw 4vw',borderTop:'0.01rem solid #ccc',marginTop:'0.1rem'}}>
                    <span style={{display:'inline-block',marginLeft:'0.8rem',padding:'0.06rem 0.3rem',border:'1px solid #ccc',borderRadius:'0.5rem',marginRight:'0.2rem'}} onClick={props.Quxiao}>取消订单</span>
                    <span style={{display:'inline-block',padding:'0.06rem 0.3rem',border:'1px solid #ccc',borderRadius:'0.5rem',marginRight:'0.2rem'}} onClick={props.replacepay}>重新下单</span>
                    <span style={{display:'inline-block',padding:'0.06rem 0.3rem',border:'1px solid #ccc',borderRadius:'0.5rem',marginRight:'0.2rem'}} onClick={props.pay}>付款</span></p>:''}

            </div>

        )
    },
    ImgListShow:class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {imgList:this.props.imgList || []};
            this.TouEnd=(e)=>{
                var index=parseInt( e.currentTarget.getAttribute('data-index'));
                var startX =this.state.MoveType[index][0];
                var startLeft =this.state.MoveType[index][1];
                var moveX=e.changedTouches[0].clientX
                var cha =moveX-startX;
                if(e.currentTarget.offsetWidth<=this.refs.UlDom.clientWidth){
                    e.currentTarget.style.transition="left 200ms"
                    e.currentTarget.style.left=0+'px'
                }else if(e.currentTarget.offsetWidth-Math.abs(e.currentTarget.offsetLeft) <= this.refs.UlDom.clientWidth){
                    e.currentTarget.style.transition="left 400ms"
                    e.currentTarget.style.left=-e.currentTarget.offsetWidth+this.refs.UlDom.clientWidth+'px';
                }else if(e.currentTarget.offsetLeft>15){
                    e.currentTarget.style.transition="left 200ms"
                    e.currentTarget.style.left=0+'px'
                }
                if(cha==0){
                    //var keys = e.currentTarget.firstElementChild.getAttribute('data-key');

                    //this.showImg(this.state.imgList,keys);
                }
            }
            this.showImg=(imglist,index,e)=>{
                wx.previewImage({
                    current:imglist[index],
                    urls:imglist
                });
            }
            this.TouMove=(e)=>{
                var index=parseInt( e.currentTarget.getAttribute('data-index'));
                var startX =this.state.MoveType[index][0];
                var startLeft =this.state.MoveType[index][1];
                var moveX=e.touches[0].clientX;
                var cha =moveX-startX;
                e.currentTarget.style.left=startLeft + cha+'px'

            }
            this.TouStart=(e)=>{
                e.currentTarget.style.transition="left 0ms"
                const startX=e.touches[0].clientX;
                var index=parseInt(e.currentTarget.getAttribute('data-index'));
                var movetype=this.state.MoveType || [];
                movetype[index]=[];
                movetype[index][0]=startX;
                movetype[index][1]=e.currentTarget.offsetLeft;
                this.setState({MoveType:movetype});
                e.currentTarget.style.left=e.currentTarget.offsetLeft;

            }

            this.upLoadImg=()=>{

                if(this.state.imgList.length>=20){
                    this.props.promptInfo({
                        content: '上传照片最多上传20张！',
                        Prompt: true,
                    })
                    return;
                }

                this.props.wxUpdata(this.state.imgList.length<12 ? 9:20-this.state.imgList.length, (imgid,id,isend) => {
                    this.props.promptInfo({loading:true})
                    var imgList=this.state.imgList || [],newImgList,
                        serverIdList=this.state.serverIdList || []
                    imgList.unshift(imgid);//{url:imgid,serverId:id,isNew:true}
                    serverIdList.push(id);
                    this.setState({serverIdList:serverIdList,imgList:imgList,newImgList:true},()=>{
                        if(!isend){
                            var serverIdText=''
                            for(var i in this.state.serverIdList){
                                this.state.serverIdList[i] &&
                                (serverIdText+='array['+i+'].imageType=survey_5&array['+i+'].lossNo='+this.props.T.state.reportData.lossNo+'&array['+i+'].serverId='+this.state.serverIdList[i])
                            }
                        }
                        console.log(this.props.T.state.reportData.lossNo)
                        this.props.ajax({
                            url:'/lexiugo-app/weixin/enquiryImg',
                            data:'array[0].imageType=survey_5&array[0].lossNo='+this.props.T.state.reportData.lossNo+'&array[0].serverId='+id+'&array[0].taskId='+this.props.T.state.reportData.taskId,
                            suc:(dat)=>{
                                if(dat.code=='3003'){
                                    !isend && this.props.promptInfo({
                                        content: '图片上传成功！',
                                        Prompt: true,
                                    })
                                }else{
                                    this.props.promptInfo({content:'上传失败，请稍后上传！',Prompt:true,onlyOK:true})
                                }
                            }
                        })
                    })
                });
            }
            this.imgShow=()=>{
                var dm=this.props.location.state.newData
                var uri = new Array(),paramData=this.state.imgList;
                for( var i in paramData ) {
                    var serverId = paramData[i];
                    var n = 'array[' + i + '].';
                    serverId && uri.push(
                        n +'lossNo='+this.props.T.state.reportData.lossNo +
                        '&' + n + 'serverId=' + serverId
                    );
                }
                ['array[1].lossNo=1&array[2].serverId=2']
                uri.push( 'address=' + this.state.address );
                return uri.join("&");
            }
        }
        render() {
            var upLoadImg={
                width:'25vw',height:'25vw',
                fontSize:'10vw',display:'flex',alignItems:'center',
                minWidth:'25vw',margin:'0 0.25rem',border:'1px solid #C5CDDC',
                justifyContent:'center',lineHeight: '23vw',color:'#C5CDDC'
            }
            return (
                <div style={{display:'flex',padding:'0.2rem 0rem', background:'#fff'}}>
                    {this.props.type=='upLoadTop' && <span className="iconfonts" onClick={this.upLoadImg} style={upLoadImg}>&#xe610;</span>}
                    <div style={{position:'relative',overflow:'hidden'}} ref="UlDom">
                        <ul  data-index={1} onTouchEnd={this.TouEnd} onTouchMove={this.TouMove} onTouchStart={this.TouStart}  style={{width:this.state.imgList.length*28+'vw',display:'flex',padding:'0px',position:'relative'}}>
                            {
                                this.state.imgList.map((item,index)=>{
                                    return(
                                        <li data-key={index} onClick={()=>this.showImg(this.state.imgList,index)} style={{width:'25vw',height:'25vw',marginRight:'3vw',overflow:'hidden'}}>
                                            <img style={{width:'100%'}} src={item} alt=""/>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    {this.props.type=='upLoadBottom' && <span style={upLoadImg}></span>}
                </div>
            )
        }
    },
    /**询价清单列表**/
    DetailedList:(props)=>{
        var datArr=[]
        for(var i in props.detailedList){
            datArr.push({
                name:props.detailedList[i].data.name,
                num:props.detailedList[i].num,
                text:props.detailedList[i].text,
                id:i,
                change:props.T.reduceOrPlus
            })
        }
        return (
            <ul className="DetailedList">
                {
                    datArr[0]?
                    datArr.map((item,index)=>{
                        return(
                            <li style={{marginBottom:'0.3rem'}}>
                                <div className="detailedBox">
                                    <span className="titleBiao">{item.name}</span>
                                    <div className="bottomBox">
                                        <span onClick={()=>{props.T.reduceOrPlus(item,index,'reduce')}}>-</span>
                                        <span style={{color:'#68a2f8'}}>{item.num}</span>
                                        <span onClick={()=>{props.T.reduceOrPlus(item,index,'plus')}}>+</span>
                                        <span onClick={()=>{props.T.reduceOrPlus(item,index,'delete')}} className="iconfonts">&#xe604;</span>
                                    </div>
                                </div>
                                <input type="text" onChange={(e)=>item.change(item,e.target.value,'change')} value={item.text} placeholder="请输入其他询价要素"/>
                            </li>
                        )
                    }) :
                        props.T.props.ErrorShow({type:'baseLi',content:'暂无零件'})
                }
            </ul>
        )
    },
    /**残件清单**/
    // datailList:(props)=>{
    //     console.log(props.detailedList)
    //     var datArr=[]
    //     for(var i in props.detailedList){
    //         datArr.push({
    //             name:props.detailedList[i].data.name,
    //             id:i,
    //             change:props.T.reduceOrPlus
    //         })
    //     }
    //     console.log(datArr)
    //     return (
    //         <ul className="datailedList">
    //             {
    //                 datArr[0]?
    //                     datArr.map((item,index)=>{
    //                         return(
    //                             <li style={{marginBottom:'0.3rem',background:'#fff'}}>
    //                                 <ul style={{background:'#fff',width:'100%',marginTop:'0.1rem',display:'flex'}}>
    //                                     <li style={{width:'0.8rem'}}>
    //                                     <i style={{width:'0.26rem',height:'0.26rem',margin:'0.35rem 0.1rem 0 0.4rem',display:'inline-block',background: 'url(' + require('../../../img/square_check_fill@2x.png') + ') no-repeat center/cover'}}></i>
    //                                     </li>
    //                                     <li style={{flex:'1'}}>
    //                                         <ul style={{background:'#fff',width:'100%',marginTop:'0.1rem'}}>
    //                                             <li style={{width:'100%',padding:'0.2rem 0.2rem 0.2rem 0',display:'flex',fontSize:'0.26rem',borderBottom:'0.02rem solid #eee'}}>
    //                                                 {item.name}
    //                                             </li>
    //                                             <li style={{width:'100%',display:'flex',fontSize:'0.26rem',padding:'0.2rem 0.2rem 0.2rem 0',borderBottom:'0.02rem solid #eee'}}>
    //                                                 <span style={{flex:"1"}}>易碎贴<input type="radio" name={item.id} value='易碎贴'/></span>
    //                                                 <span style={{flex:"1"}}>大件<input type="radio" name={item.id} value='大件'/></span>
    //                                                 <span style={{flex:"1"}}>价值件<input type="radio" name={item.id} value='价值件'/></span>
    //                                             </li>
    //                                             <li style={{width:'100%',padding:'0.2rem 0.2rem 0.2rem 0',display:'flex',fontSize:'0.26rem',borderBottom:'0.02rem solid #eee'}}>
    //                                             <span>照片上传</span>
    //                                             </li>
    //                                         </ul>
    //                                     </li>
    //                                 </ul>
    //                             </li>
    //                         )
    //                     }) :
    //                     props.T.props.ErrorShow({type:'baseLi',content:'暂无零件'})
    //             }
    //         </ul>
    //     )
    // },
    /**询价列表**/
    inquiryList:(props)=>{
        return(
            <div className="caseList" onClick={()=>props.history.pushState(props.iteDat,props.iteDat.path)}>
                {props.iteDat.type=='hm' && <div className="icomc" style={Dtext.style}>{Dtext.text}</div>}
                <h4>{props.iteDat.orderId || props.iteDat.xlcName }</h4>
                <ul>
                    {
                        props.iteDat.show.map((item,index)=>{
                            return(
                                <li key={index}><span>{item.key+':'}</span><span>{item.value}</span></li>
                            )
                        })
                    }
                </ul>
                <p><time dateTime={props.iteDat.pushTime || props.iteDat.createTime}>{props.timeString(props.iteDat.pushTime || props.iteDat.createTime,'y-m-d h:m:s')}</time></p>
            </div>
        )
    },

    /**询价导航1**/
    DHLeft:class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                classification:[]
            };
            this.touchs=(m,e)=>{
                switch(m){
                    case 'start':
                        someEvent.touchStart(e,this);
                        break;
                    case 'end':
                        someEvent.touchEnd(e,this);
                        break;
                    case 'move':
                        someEvent.touchMove(e,this);
                        break;
                }
            }//
            this.Ajaxc=(id)=>{
                $('.SPUlRight').css({'top':'0px',transition:'top 0'})
                if(id=='addMy'){
                    this.setState({showAddMy:true})
                    if(localStorage.getItem("myLjlist")){
                        try {
                            var json=JSON.parse(localStorage.getItem("myLjlist"));

                            this.props.T.setState({classification:json })
                        }catch (e){
                            console.log(e)
                        }
                    }else{
                        this.props.T.setState({classification:[{
                            name:'新增自定义零件',
                            type:'addMy',
                            childList:[
                                {
                                    name:'已新增自定义零件',
                                    childList:[]
                                }
                            ]
                        }]})
                    }

                }else {
                    this.setState({showAddMy:false})
                    this.props.ajax({
                        loading: true,
                        url: '/lexiugo-app/app/partEnquiry/getEnquiryPart',
                        data: {partTypeLvl1Id: id || ''},
                        suc: (data) => {
                            if (data.errorCode == '0000') {
                                var classification = [], datafor = []
                                this.dataTrue(data.result[0])
                            }
                        }
                    })
                }
            }
            this.dataTrue=(data)=>{
                var newData=this.state.classification || [],newDatas=[],newStates=[]
                for(var i in data){
                    if(data[i].partTypeLvl1Id || data[i].partTypeLvl1Name=='常用零件'){
                        var newData=this.state.classification || []
                        newData[i]=({name:data[i].partTypeLvl1Name,id:data[i].partTypeLvl1Id,childList:data[i].enquiryPartList})
                        if(data[i].partTypeLvl1Name=='常用零件d' && data[i].enquiryPartList && data[i].enquiryPartList[0]){
                            var newDatas=[
                                {
                                    childList:[
                                        {
                                            name:'A',
                                            childList:[]
                                        }
                                    ]
                                }
                                ];
                            for(var m in data[i].enquiryPartList){
                                if(data[i].enquiryPartList[m]){
                                    newDatas[0].childList[0].childList.push({
                                        name:data[i].enquiryPartList[m].partTypeLvl3Name,
                                        id:data[i].enquiryPartList[m].partTypeLvl3Id
                                    })
                                }
                            }
                            this.setState({classification:newData})
                            this.props.T.setState({classification:newDatas})
                        }else{
                            if(data[i].enquiryPartList && data[i].enquiryPartList[0]){
                                var newDatas=[{type:'',childList:[]}];
                                newDatas[0].childList=this.dataTrue(data[i].enquiryPartList || [],i) || []

                                this.props.T.setState({classification:newDatas})
                            }
                            this.setState({classification:newData},()=>{
                                this.props.T.state.click && this.refs.zdyLj.click();
                                this.props.T.setState({click:false})
                            })
                        }
                    }else{
                        if(data[i].partTypeLvl2Name){
                            newStates.push({
                                name:data[i].partTypeLvl2Name,
                                id:data[i].partTypeLvl2Id,
                                childList:this.dataTrue(data[i].enquiryPartList || [])
                            })
                        }else if(data[i].partTypeLvl3Name){
                            newStates.push({
                                name:data[i].partTypeLvl3Name,
                                id:data[i].partTypeLvl3Id
                            })
                        }else{
                        }
                    }
                }

                return newStates;
            }
        }
        componentDidMount() {
            this.Ajaxc();
            this.props.T.setState({DHLeft:this.refs.zdyLj})
        }
        render(){
            var style={

            }
            return(
                <ul className="SPUlLeft" onTouchEnd={this.touchs.bind(this,'end')}
                    onTouchMove={this.touchs.bind(this,'move')}
                    onTouchStart={this.touchs.bind(this,'start')}
                    style={{overflow:'hidden',position:'relative',minHeight:'100vh',paddingBottom:'3rem'}}>
                    {this.state.classification.map((item,index)=>{
                        return(
                            <li style={(item.childList && !this.state.showAddMy) ? {background:'#fff'}:{}} onClick={(e)=>{this.Ajaxc(item.id)}}>{item.name}</li>
                        )
                    })}
                    <li ref="zdyLj" style={this.state.showAddMy ? {background:'#fff'}:{}} onClick={(e)=>{this.Ajaxc('addMy')}}>自定义</li>
                </ul>
            )
        }
    },
    /**询价导航2**/
    DHRight:class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {classification:this.props.classification};
            this.touchs=(m,e)=>{
                switch(m){
                    case 'start':
                        someEvent.touchStart(e,this);
                        break;
                    case 'end':
                        someEvent.touchEnd(e,this);
                        break;
                    case 'move':
                        someEvent.touchMove(e,this);
                        break;
                }
            }
            this.showUl=(leng,index,e)=>{
                this.state.showWho !=index ?
                this.setState({
                    showWho:index
                }):this.setState({
                        showWho:''
                    })
            }
            this.AddOrMinus=(id,type,e)=>{
                var newState=this.props.T.state.AlreadyChosen || {}
                newState[id]=newState[id] || {};
                newState[id].num=newState[id].num || 0;
                switch (type){
                    case '-':
                        newState[id].num<=1 ? delete newState[id] : (newState[id].num--)
                        break;
                    case '+':
                        newState[id].num++
                        break;
                    default:
                }
                this.props.T.setState({AlreadyChosen:newState})
            }
            //添加自定义
            this.addBJ=()=>{
                if(!this.state.AddMy){
                    this.props.promptInfo({content:'请输入自定义零件名称！',Prompt:true});
                    return;
                }
                this.props.ajax({
                    loading:true,
                    data:{partName:this.state.AddMy},
                    url:'/lexiugo-app/app/partEnquiry/addDefinedEnquiryPart',
                    suc:(data)=>{
                        if(data.errorCode=='0000'){
                            var classification=this.props.T.state.classification;
                            classification[0].childList[0].childList.push({
                                name:this.state.AddMy,
                                id:classification[0].childList[0].childList.length+'new'
                            })
                            this.props.T.setState({
                                classification:classification
                            },()=>{
                                localStorage.setItem("myLjlist", JSON.stringify(classification));

                                this.setState({AddMy:''})
                            })
                        }else{
                            this.props.promptInfo({content:'保存失败！请稍后重试',Prompt:true});
                        }
                    }
                })
            }
        }
        componentDidMount() {
            $("#addMyKeyDown").keydown((event)=>{
                if(event.keyCode == 13){
                    this.addBJ()
                }
            });
            this.props.T.setState({DHRight:this.refs.DHRight})
        }
        componentWillMount(){


        }
        render(){
            return(
                <div className="SPUlRight" ref="DHRight" onTouchEnd={this.touchs.bind(this,'end')}
                    onTouchMove={this.touchs.bind(this,'move')}
                    onTouchStart={this.touchs.bind(this,'start')}
                    style={{overflow:'hidden',position:'relative',minHeight:'100vh',...(this.props.classification && this.props.classification[0].type=='addMy' ? {background:'#fff'}:{})}}>
                    {
                        this.props.classification && this.props.classification.map((ListItems,index)=> {
                                return(
                                    <div>
                                        {ListItems.name && <h4>{ListItems.name}</h4>}
                                        {
                                            ListItems.type=='addMy' &&
                                                <div className="addMy">
                                                    <input id="addMyKeyDown" type="text" value={this.state.AddMy} onChange={(e)=>this.setState({AddMy:e.target.value})}/>
                                                    <span onClick={this.addBJ}>新增</span>
                                                </div>
                                        }
                                        <ul >
                                        {
                                            ListItems.childList.map((item, index1) => {
                                            return (
                                                <li className="boxonce" >
                                                    <div className="titles" style={this.state.showWho == index + 'k' + index1 || ListItems.type=='addMy' ? {border:'0px',paddingLeft:'0.3rem'}:{paddingLeft:'0.3rem'}} onClick={this.showUl.bind(this,item.childList.length,index+'k'+index1)}>
                                                        {item.name && <span className="tvalue">{item.name}</span>}
                                                        {
                                                            (ListItems.type != 'addMy' && ListItems.type == 'asdfsdf') &&
                                                            <span className="iconfonts"
                                                                  style={this.state.showWho == index + 'k' + index1 ? {transform: 'rotateX(180deg)'} : {transform: 'rotateX(0deg)'}}>&#xe605;</span>
                                                        }
                                                    </div>
                                                    <ul className="UlboxTwo" style={this.state.showWho==index+'k'+index1 || ListItems.type=='addMy' ? {height:item.childList.length*0.9+'rem'}:{height:item.childList.length*0.9+'rem'}}>
                                                        {item.childList.map((mt, index2) => {
                                                            return (
                                                                <this.props.StateLess.AddAndC item={mt} AlreadyChosen={this.props.T.state.AlreadyChosen}  T={this.props.T}/>
                                                            )
                                                        })}
                                                    </ul>
                                                </li>
                                            )
                                        })
                                        }
                                        </ul>
                                    </div>
                                )
                            }
                        )
                    }
                </div>
            )
        }
    },
    //金额总汇
    EvalManeyInfo:class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                typeArr:[
                    {
                        data1:['换件金额','管理费','合计'],
                    },
                    {
                        data1:['','2',3],
                        data2:[{key:'零件号:',value:'asdf'},{key:'零件号:',value:'asdf'},{key:'零件号:',value:'asdf'},{key:'零件号:',value:'asdf'}]
                    }
                ]
            }
        }
        componentWillMount(){
        }
        render(){
            return(
                <div style={{margin: '0.2rem 0',}}>
                    {this.props.Car.map((item,index)=>{
                        return(
                            <div>
                                <ul style={{
                                    display:'flex',justifyContent:'space-between',overflow:'hidden',
                                    margin:'0 0.2rem'
                                }}>
                                    {item.data1.map((item1,index1)=>{

                                        return(
                                            <li style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'0.5rem',flex:1}}>{item1}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )
                    })}
                </div>
            )
        }
    },
    //换件信息
    EvalInfo:class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                typeArr:this.props.ListArr ||[]
            }
        }
        componentWillMount(){

        }
        componentDidMount(){
            console.log(this.refs.changes)
            if(this.refs.changes){
                this.refs.changes.style.contenteditable='true'
            }
        }
        render(){
            // console.log(this.props.ListArr)
            var typeArr=this.props.ListArr||[]
            return(
                <div style={{padding: '0.2rem 0',...(this.props.style||{})}}>
                    {typeArr[1]? typeArr.map((item,index)=>{
                            return(
                                <div key={index}>
                                    <ul style={{
                                        display:'flex',justifyContent:'space-between',overflow:'hidden',
                                        ...(index==0 ? {fontWeight:600}:{})
                                    }}>
                                        {item.data1.map((item1,index1)=>{
                                            var style=[
                                                {width:'0.8rem',padding:'0 0 0 0.2rem'},{flex:'1'},{width:'1rem'},
                                                {width:'1rem'},{width:'1.2rem'},{width:'1.2rem'},
                                            ]
                                            return(
                                                <li  className='aaa' style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'0.5rem',...style[index1]}} key={index1}>
                                                    {
                                                        item1=='checkbox' ? <this.props.checkbox index={index} checked={item.checked}
                                                                                                 change={this.props.checkBoxChange}
                                                            />:
                                                            item1
                                                    }
                                                </li>
                                                // <li key={index1} style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'0.5rem',...style[index1]}}>{item1}</li>
                                            )
                                        })}
                                    </ul>
                                    {item.data2 && (<ul style={{
                                        overflow:'hidden',background:'#f4f8fb',padding:'0.08rem 0.3rem',
                                        margin:'0 0.15rem',display:'flex',justifyContent:'space-between'
                                    }}>
                                        {
                                            item.data2.map((item2,index2)=>{
                                                return(
                                                    <li key={index2} style={{margin:'0.08rem 0'}} onClick={()=>item2.type=='glf' && this.props.glfFun && this.props.glfFun(item,index)}>
                                                        <span>{item2.key}</span>
                                                        {
                                                            item2.vChang?
                                                                <span><input style={{width:'0.8rem',height:'0.5rem',border:'1px solid #ccc',display:'inline-block',marginLeft:'0.08rem'}} type="number" onChange={this.props.change.bind(this,index)} value={parseInt(item.data.ManageFeePct*100)} />%</span>:<span>{item2.value}</span>
                                                        }

                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>)}
                                </div>
                            )
                        }):
                        this.props.ErrorShow({type:'p',content:'暂无换件信息'})
                    }
                </div>
            )
        }
    },
    //换件default


    /**++--**/
    AddAndC:(props)=>{
        console.log(props)
        return(
            <li className="addAndClose">
                <span style={{flex: 1}}>{props.item.name}</span>
                {
                    props.AlreadyChosen && props.AlreadyChosen[props.item.id] &&
                    <span style={{color: '#666666'}} className="iconfonts" onClick={(e)=>jtm.AddOrMinus(props.item, '-',props.T)}>&#xe643;</span>
                }
                {
                    props.AlreadyChosen && props.AlreadyChosen[props.item.id] &&
                    <span style={{color: '#68a2f8'}}>{props.AlreadyChosen[props.item.id].num}</span>
                }
                <span style={{color: '#666666'}} className="iconfonts" onClick={(e)=>jtm.AddOrMinus(props.item,'+',props.T)}>&#xe610;</span>
            </li>
        )
    },

    /****/
    AddOrMinus:(item,type,e)=>{
        var newState=e.state.AlreadyChosen || {}
        newState[item.id]=newState[item.id] || {};
        newState[item.id].num=newState[item.id].num || 0;
        switch (type){
            case '-':
                newState[item.id].num<=1 ? delete newState[item.id] : (newState[item.id].num--)
                break;
            case '+':
                newState[item.id].num++
                newState[item.id].data=item;
                break;
            default:
        }
        e.setState({AlreadyChosen:newState})
    }
}
export default jtm