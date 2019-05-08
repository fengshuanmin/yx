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
            reqParam:{url:'',data:{pageNo:1}},
            caseList:[],
            orderList:[],
            data:[],
            data1:[]
        };
        this.Purchase=(item,e)=>{
            if(this.props.addre){
                this.props.setProps({
                    addre:false
                })
            }
            if(this.props.tick){
                this.props.setProps({
                    tick:false
                })
            }
            if(this.props.payWay){
                this.props.setProps({
                    payWay:false
                })
            }
            if(this.props.lis){
                this.props.setProps({
                    lis:false
                })
            }
            e.stopPropagation();e.preventDefault();
            console.log(this.state.data)
            console.log(item)
            var evalId=''
            /*this.props.ajax({
                loading: true,
                url: '/toumingxiu/insEnquiry/getInsEnquiryTask.do',
                data: {taskId: item.taskId},
                suc: (data) => {
                    //PriceFlag 1直供 2自采
                    console.log(data)

                    evalId=data.result.evalId
                    /!*this.setState({
                        evalId:data.result.evalId
                    })*!/
                    console.log(evalId)*/
                    $.ajax({
                        url: '/server/lexiu1-app/api/evaluationcar/infoByTaskId/' + item.taskId + '?token=' + this.props.user.data.token,
                        data: {taskId: item.taskId},
                        type: 'get',
                        dataType: "json",
                        success: (dat) => {
                            console.log(dat)
                            let id = dat.evaluationCar.id
                            evalId=dat.evaluationCar.id
                            console.log(id)
                            this.setState({
                                id: dat.evaluationCar.id,
                                evalId:dat.evaluationCar.id
                            })
                            $.ajax({
                                url: '/server/lexiu1-app/api/evaluationpart/list/' + dat.evaluationCar.id + '?token=' + this.props.user.data.token,
                                data: {id: dat.evaluationCar.id, token: this.props.user.data.token},
                                type: 'get',
                                dataType: "json",
                                success: (data) => {
                                    console.log(data)
                                    console.log(data.parts.length)
                                    if (data.parts.length == 0) {
                                        this.props.promptInfo({
                                            content: '您暂时没有可采购的零件，若继续采购，请选择报价',
                                            Prompt: true,
                                            onlyOK:true,
                                            fun: () => {
                                                this.props.history.pushState({taskId: item.taskId}, '/purchase/info')
                                            }
                                        })
                                    }else{
                                        this.props.history.pushState({taskId:item.taskId,evalId:evalId},'/purchase/partsBuy')
                                    }
                                }
                            })
                        }
                    })
                }
            // console.log(this.state.evalId)
        this.dataReform=(datas,type,im)=> {
            var dat = []
            var dat1=[]
            if (datas && (datas.errorCode == '0000' || datas.code==0)) {

                console.log(datas,99999)
                if(datas.page){
                    dat=datas.page.list, im = im || 'am'
                    console.log(dat)
                }else{
                    dat1 = (datas.result && datas.result[0]) || [], im = im || 'cm'
                    for(var m in dat1){
                        if(dat1[m].status!=1){
                            if(dat1[m].status!=0){
                                dat.push(dat1[m])
                            }
                        }
                    }
                    console.log(dat)
                }

                var datArr = {
                    cm: {datArr: ['plateNo', 'cxmc'], path: '/purchase/info'},
                    am: {datArr: ['appointLibraryName','carNumber', 'cardTypeName','partNames'], path: '/purchase/dingdan'}
                }
                var arrname = {xlcName: '修理厂', plateNo: '车牌', cxmc: '车型', partDetail: '残件'}
                var arrname1 = {appointLibraryName:'', carNumber: '车牌', cardTypeName: '车型', partNames: '配件'}
                if(im=='am'){
                    for (var i in dat) {
                        dat[i].type = im;
                        dat[i].appointLibraryName = dat[i].appointLibraryName
                        dat[i].path = datArr[im].path
                        dat[i].time = dat[i].createTime
                        dat[i].show = [];
                        for (var j in datArr[im].datArr) {
                            var jm = '', tmd;
                            /*if (datArr[im].datArr[j] == 'partDetail') {
                                for (var tm in dat[i][datArr[im].datArr[j]]) {
                                    jm += dat[i][datArr[im].datArr[j]][tm].partName + (tm < dat[i][datArr[im].datArr[j]].length - 1 ? '/' : '')
                                }
                                tmd = (<p style={{
                                    overflow: 'hidden', textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>{jm}</p>)
                            }*/
                            datArr[im].datArr[j] && dat[i].show.push({
                                key: arrname1[datArr[im].datArr[j]],
                                value: (jm && tmd) || dat[i][datArr[im].datArr[j]] || '-'
                            })
                        }

                    }
                }else{
                    for (var i in dat) {
                        dat[i].type = im;
                        dat[i].insReportNo = '报案号:' + dat[i].insReportNo
                        dat[i].path = datArr[im].path
                        dat[i].time = dat[i].createTime
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

            }
            var newData;
            switch (type) {
                case 'loadMore':
                    // debugger
                    newData = this.state.data.concat(dat)
                    break;
                case 'Reload':
                    newData = dat;
                    break;
                case 'loadFirst':
                    newData=[]
                    this.loadList('cm','','','firstJJkbsdfsdfsdfsdfser35345t')
                    break;
                default:
            }
            this.setState({
                data: newData,
                loadingOk: true,
                tishiyu: type != 'loadFirst' && this.props.ErrorShow({type: 'zanwu', content: '未查询到询价订单'})
            })
        }
        this.loadList=(a,t,state,jtb)=>{
            var url={cm:'/lexiugo-app/app/enquiry/getInsEnquiryTask',am:'/server/lexiu1-app/api/tmxcorder/getOrderList'}
            var newState=this.props.loadParam || this.props.myParam || this.state.reqParam;
            newState.type=a
            newState.url=url[a];
            if(a=='am'){
                newState.data.token=this.props.user.data.token;
                newState.data.page=1;
                newState.data.limit=10;
                newState.data.orderStatus=state;
            }
            if( jtb !='firstJJkbsdfsdfsdfsdfser35345t'){
                newState.data.taskState= state=='0' ? state :( state || '')
                t ? (newState.data.searchKey=t) : delete newState.data.searchKey
            }
            this.props.setScroll(0);
            this.props.setProps({loadParam:newState,myParam:newState},()=>{
                this.state.Logical && this.state.Logical.Reload();
            })
        }
        /*this.search=(v)=>{
            this.loadList('bm',v)
        }*/
    }
    componentWillMount(){
        this.props.setProps({loadParam:this.props.myParam||this.state.reqParam})
    }
    componentDidMount() {
        this.props.changeTitle('采购列表')


    }
    componentDidUpdate(){
    }
    render(){
        console.log(this.state)
        // console.log(this.state.data)
        console.log(this.props)
        for(var i in this.state.data){
            this.state.data[i].purchaseState===''?this.state.data[i].purchaseState='8':this.state.data[i].purchaseState=this.state.data[i].purchaseState
            this.state.data[i].purchaseState===null?this.state.data[i].purchaseState='8':this.state.data[i].purchaseState=this.state.data[i].purchaseState
        }

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
         var loadParam1= this.props.loadParam && this.props.loadParam.data.orderStatus
        console.log(loadParam)
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
                        {/*<this.props.TopList datas={[
                            {text:'采购列表',fun:()=>{this.setState({titleType:false},()=>this.loadList('cm', false, ''))},isvalue:!this.state.titleType,style:{flex:'1',}},
                            {text:'采购订单',fun:()=>{this.setState({titleType:true},()=>this.loadList('am', false, ''))},isvalue:this.state.titleType ,style:{flex:'1',}},
                        ]} IStyle={{background:'#000'}} defaultFun={()=>this.props.location.state==='a'? this.setState({titleType:true},()=>this.loadList('am', false, '')):this.setState({titleType:false},()=>this.loadList('cm', false, ''))} Style={{BStyle:{position:'relative'}}} {...this.props} T={this}/>*/}
                       {/*{ <this.props.TopList datas={[
                            {text:'全部',fun:()=>this.loadList('am', false, ''),isvalue:loadParam1 === '' || loadParam1 === undefined,style:loadParam1 === '' || loadParam1 === undefined ? {color: '#5682f1'} : {}},
                            {text:'待付款',fun:()=>this.loadList('am', false, 100),isvalue:loadParam1 == 100,style:loadParam1 == 100  ? {color: '#5682f1'} : {}},
                            {text:'待发货',fun:()=>this.loadList('am', false, 101),isvalue:loadParam1 == 101,style:loadParam1 == 101  ? {color: '#5682f1'} : {}},
                            {text:'待收货',fun:()=>this.loadList('am', false, 102),isvalue:loadParam1 == 102 ,style:loadParam1 == 102  ? {color: '#5682f1'} : {}},
                            {text:'已完成',fun:()=>this.loadList('am', false, 103),isvalue:loadParam1 == 103,style:loadParam1 == 103  ? {color: '#5682f1'} : {}},
                            ]}  IStyle={{background:'#5682f1'}} Style={{BStyle:{position:'relative'}}} {...this.props} T={this}/>
                        }*/}
                        < this.props.TopList datas={[
                            {text:'全部',fun:()=>this.loadList('cm', false, 9),isvalue:loadParam === 9 || loadParam === undefined,style:loadParam === 9 || loadParam === undefined ? {color: '#5682f1'} : {}},
                            {text:'待采购',fun:()=>this.loadList('cm', false, 8),isvalue:loadParam === 8 ,style:loadParam === 8? {color: '#5682f1'} : {}},
                            {text:'部分采购',fun:()=>this.loadList('cm', false, 6),isvalue:loadParam == 6,style:loadParam == 6  ? {color: '#5682f1'} : {}},
                            {text:'全部采购',fun:()=>this.loadList('cm', false, 7),isvalue:loadParam == 7 ,style:loadParam == 7  ? {color: '#5682f1'} : {}},
                        ]}  IStyle={{background:'#5682f1'}} Style={{BStyle:{position:'relative'}}} {...this.props} T={this}/>

                    </div>
                </div>
               <LoadList {...this.props}  dataReform={this.dataReform} T={this}>
                    {
                           this.state.data[0] ? this.state.data.map((item,index)=>{
                                return(
                                    <div key={index}>
                                        <this.props.StateLess.caseList iteDat={item} Purchase={this.Purchase.bind(this,item)} {...this.props}/>
                                    </div>
                                )
                            }):this.state.loadingOk && this.state.tishiyu
                    }
               </LoadList>
                <DSYButton ButtonFrom="Mys" T={this} on={'purchase'} {...this.props}/>

            </div>
        )
    }
}