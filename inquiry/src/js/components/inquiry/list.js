import React from 'react';
import $ from 'jquery';
require('../../../css/recovery.css')
import {LoadList} from '../../../../../common/assembly/Logical'
import {DSYButton} from '../../../../../common/assembly/someAssembly'
/**残件列表**/
export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reqParam:{url:'/lexiugo-app/app/enquiry/getInsEnquiryTask',data:{pageNo:1}},
            caseList:[],
            orderList:[],
            data:[]
        };
        this.addinquiry=()=>{
            localStorage.setItem("PJAdd", '')
            localStorage.setItem("SubmitData", '');
            localStorage.setItem("imgList", '');
            localStorage.setItem("tmxReportNo", '');
            localStorage.setItem("plateNo", '');
            localStorage.setItem("vehicleName", '');
            localStorage.setItem("vin", '');
            localStorage.setItem("engineNumber", '');
            localStorage.setItem("tmxCarType", '');
            this.props.setProps({
                    inquiryData:false,
                    PJAdd:false,
                    addinquiry:false
            })
            this.props.history.pushState(null,'inquiry/addInquiry')
        }
        this.dataReform=(datas,type,im)=>{
            var dat=[]
            if(datas && datas.errorCode=='0000') {
                dat = (datas.result && datas.result[0]) || [], im = im || 'bm'
                var datArr = {
                    bm: {datArr: ['plateNo', 'cxmc'], path: '/inquiry/info'}
                }
                var arrname = {xlcName: '修理厂', plateNo: '车牌', cxmc: '车型', partDetail: '残件'}
                for (var i in dat) {
                    dat[i].type = im;
                    dat[i].insReportNo='报案号:'+dat[i].insReportNo
                    dat[i].path = datArr[im].path
                    dat[i].time=dat[i].createTime
                    dat[i].show = [];
                    for (var j in datArr[im].datArr) {
                        var jm = '', tmd;
                        if (datArr[im].datArr[j] == 'partDetail') {
                            for (var tm in dat[i][datArr[im].datArr[j]]) {
                                jm += dat[i][datArr[im].datArr[j]][tm].partName + (tm < dat[i][datArr[im].datArr[j]].length - 1 ? '/' : '')
                            }
                            tmd = (<p style={{
                                overflow: 'hidden', textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>{jm}</p>)
                        }
                        datArr[im].datArr[j] && dat[i].show.push({
                            key: arrname[datArr[im].datArr[j]],
                            value: (jm && tmd) || dat[i][datArr[im].datArr[j]] || '-'
                        })
                    }

                }
            }
            var newData;
            switch(type){
                case 'loadMore':
                    newData=this.state.data.concat(dat)
                    break;
                case 'Reload':
                    newData=dat;
                    break;
                case 'loadFirst':
                    newData=[]
                    this.loadList('bm','','','firstJJkbsdfsdfsdfsdfser35345t')
                    break;
                default:
            }
            this.setState({data:newData,loadingOk:true,tishiyu:type !='loadFirst' && this.props.ErrorShow({type:'zanwu',content:'未查询到询价订单'})})
        }
        this.loadList=(a,t,state,jtb)=>{
            this.setState({loadingOk:false})
            var url={bm:'/lexiugo-app/app/enquiry/getInsEnquiryTask'}
            var newState=this.props.loadParam || this.props.myParam || this.state.reqParam;
            newState.type=a
            newState.url=url[a];
            if( jtb !='firstJJkbsdfsdfsdfsdfser35345t'){
                newState.data.taskState= state=='0' ? state :( state || '')
                t ? (newState.data.searchKey=t) : delete newState.data.searchKey
            }
            this.props.setScroll(0);
            this.props.setProps({loadParam:newState,myParam:newState},()=>{
                this.state.Logical && this.state.Logical.Reload();
            })
        }
        this.search=(v)=>{
            this.loadList('bm',v)
        }
        this.change=(v)=>{
            this.loadList('bm',v)
        }
        this.closeadver=()=>{
            console.log('123')
            this.props.setProps({
                adver:false
            })
            this.setState({
                adver:0
            })
        }
        this.linkurl=()=>{
            this.setState({
                adver:'0'
            })
            console.log(this.state)
            this.props.history.pushState({locationUrl:this.state.locationUrl,locationTitle:this.state.locationTitle},'/inquiry/windurl')
        }
    }
    componentWillMount(){
        this.props.setProps({
            newaddflag:false
        })
        console.log(this.props.adver)
        this.props.setProps({loadParam:this.props.myParam||this.state.reqParam})
        if(this.props.adver&&this.props.adver=='1'){
            this.props.ajax({
                url:'/server/lexiu3-app/business/tmxcadvertinfo/applist',
                data:{showType:'2',showPoint:'1',showRoleType:'1',showChannel:'3'},
                suc:(data)=>{
                    console.log(data)
                    if(data.tmxcAdvertInfoList.length>0){
                        this.props.setProps({
                            adver:'0'
                        })
                        this.setState({
                            adver:1,
                            ulr:data.tmxcAdvertInfoList[0].adPic,
                            locationUrl:data.tmxcAdvertInfoList[0].locationUrl,
                            locationTitle:data.tmxcAdvertInfoList[0].locationTitle
                        })
                    }
                }
            })
        }
    }
    componentDidMount() {
        this.props.setProps({showBase:''})
        this.props.changeTitle('询价列表')

    }
    componentDidUpdate(){}
    render(){
        console.log(this.state)
        var moveType =this.state.onMove || false
        var dHeight={height:'1rem'},bHeight={height:'1rem'}
        if(!moveType || Math.abs(moveType.where)<50){
            dHeight={height:'1rem'}
            bHeight = {height:'1rem'}
        }else if(moveType.up){
            dHeight={height:'1rem'}
            bHeight = {height:'1rem'}
        }else{
            dHeight={height:'1rem'}
            bHeight = {height:'1rem'}
        }
        var loadParam= this.props.loadParam && this.props.loadParam.data.taskState
        return(
            <div className="recoverList">
                <div style={{
                    height:'1rem',...dHeight
                }} >
                    <div ref="boxs" style={{
                        position:'fixed',top:'0px',width:'100%',zIndex:901,
                        height:'1rem',background:'#f5f5f5',paddingBottom:'0.2rem',
                        overflow:'hidden',transition:'height 300ms',...bHeight
                    }}>
                        <this.props.TopList datas={[
                            {text:'全部',fun:()=>this.loadList('bm', false, 10),isvalue:loadParam === 10 ,style:loadParam === 10 ? {color: '#5682f1'} : {}},
                            {text:'待询价',fun:()=>this.loadList('bm', false, 0),isvalue:loadParam === 0 ,style:loadParam === 0? {color: '#5682f1'} : {}},
                            {text:'待报价',fun:()=>this.loadList('bm', false, 1),isvalue:loadParam == 1,style:loadParam == 1  ? {color: '#5682f1'} : {}},
                            {text:'已报价',fun:()=>this.loadList('bm', false, 2),isvalue:loadParam == 2 ,style:loadParam == 2  ? {color: '#5682f1'} : {}},
                            /*{text:'询价失败',fun:()=>this.loadList('bm', false, 4),isvalue:loadParam == 4,style:loadParam == 4  ? {color: '#5682f1'} : {}},*/
                        ]} defaultFun={()=>this.loadList('bm', false, 10)}  IStyle={{background:'#5682f1'}} {...this.props} T={this}/>


                    </div>
                </div>
                <LoadList {...this.props}  dataReform={this.dataReform} T={this}>
                        <this.props.SelectInput {...this.props}
                                                change={this.change}
                                                blur={this.blur}
                                                placeholder="车牌号/车型"
                                                focus={()=>this.setState({data:[],loadingOk:true,tishiyu:this.props.ErrorShow({type:'p',content:<span>输入关键字搜索询价订单！</span>})})}
                                                close={()=>this.loadList('bm')}
                                                search={this.search}
                                                style={{paddingTop:'4vw'}}
                                                T={this}/>
                    {
                        this.state.data[0] ?
                            this.state.data.map((item,index)=>{
                            return(
                                <this.props.StateLess.caseList iteDat={item} {...this.props} key={index}/>
                            )
                        }) :
                        this.state.loadingOk && this.state.tishiyu
                    }
                </LoadList>
                <button className="addXBJ" onClick={this.addinquiry}></button>
                <DSYButton ButtonFrom="Mys" T={this} on={'inquiry'} {...this.props}/>
                <div className={this.state.adver&&this.state.adver==1 ? "partsBuyShow basicStyle1" : "partsBuyHide basicStyle1"}>
                    <div className="adverdiv">
                        {this.state.locationUrl? <span onClick={this.linkurl} style={{cursor:'pointer'}}>
                            <img className="adverimg" src={this.state.ulr} alt=""/>
                        </span>:<span>
                            <img className="adverimg" src={this.state.ulr} alt=""/>
                        </span>}
                    </div>
                    <div style={{width:'100%',textAlign:'center'}}>
                    <span className="adverdelt" onClick={this.closeadver}>

                    </span>
                    </div>
                </div>
            </div>
        )
    }
}