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
        this.Quxiao=(item,e)=>{
            e.stopPropagation();e.preventDefault();
            console.log(this.state.data)
            console.log(item)
            this.props.promptInfo({
                content:'是否取消订单？',
                Prompt:true,
                fun:()=>{
                    this.props.ajax({
                        url:"/server/lexiu1-app/api/tmxcorder/cancelOrder/"+item.id+"?token="+this.props.user.data.token,
                        data:{orderId:item.id},
                        type:'get',
                        dataType: "json",
                        suc:(data)=>{
                            console.log(data)
                            if(data.code=='0'){
                                this.state.Logical.Reload && this.state.Logical.Reload();
                            }
                        }
                    })
                    this.props.promptInfo()
                }
            })
        }
        this.replacepay=(item,e)=>{
            console.log(item)
            e.stopPropagation();e.preventDefault();
            this.props.promptInfo({
                content:'您好，如需重新下单，会自动取消当前订单，是否重新下单？',
                Prompt:true,
                fun:()=>{
                    /*this.props.history.pushState({a:true},'/purchase/list')
                    this.props.promptInfo()*/
                    this.props.ajax({
                        url:"/server/lexiu1-app/api/tmxcorder/cancelOrder/"+item.id+"?token="+this.props.user.data.token,
                        data:{orderId:item.id},
                        type:'get',
                        suc:(data)=>{
                            if(data.code=='0'){
                                this.props.history.pushState({taskId:item.taskId},'/purchase/partsBuy')
                            }
                        }
                    })
                    this.props.promptInfo()
                }
            })
        }
        let wxConfig=this.props.wxConfig
        this.pay=(item,e)=>{
            console.log(item)
            e.stopPropagation();e.preventDefault();
            if(item.source=='XLCDF'){
                this.props.history.pushState({xlcPartsList:item,taskId:item.taskId},'/dingdan/erweima')
            }else if(item.settleMethod=='WEIXIN'){
                this.props.ajax({
                    loading:true,
                    url: "/server/lexiu1-app/wxpay/webPay/"+item.id+"/"+wxConfig.openid+"?token="+this.props.user.data.token,
                    data:{orderId:item.id,openid:wxConfig.openid},
                    suc:(result)=>{
                        console.log(result)
                        WeixinJSBridge.invoke(
                            'getBrandWCPayRequest', {
                                "appId":result.data.appId,     //公众号名称，由商户传入
                                "timeStamp":(result.data.timestamp).toString(),         //时间戳，自1970年以来的秒数
                                "nonceStr":result.data.noncestr, //随机串
                                "package":result.data.prepayId,
                                "signType":result.data.signType,         //微信签名方式：
                                "paySign":result.data.signature //微信签名
                            },
                            (res)=>{
                                if (res.err_msg == "get_brand_wcpay_request:ok") {
                                    this.props.promptInfo({
                                        content: '支付成功',
                                        Prompt: true,
                                        onlyOK: true,
                                        fun: () => {
                                            this.state.Logical.Reload && this.state.Logical.Reload();
                                            // history.back(-1)
                                            // this.props.history.pushState({a:true,where:'101'},'/dingdan/list')
                                            this.props.promptInfo()
                                        }
                                    })
                                }else {
                                    this.props.promptInfo({
                                        content: '支付失败',
                                        Prompt: true,
                                        onlyOK: true,
                                        fun: () => {
                                            // history.back(-1)
                                            this.props.promptInfo()
                                        }
                                    })
                                }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                            }
                        );
                    }
                })
            }else{
                this.props.promptInfo({
                    content:'微信公众号不支持“支付宝”支付，请去APP或网页中支付',
                    Prompt:true,
                    onlyOK:true
                })
            }
        }
        this.dataReform=(datas,type,im)=>{
            console.log(datas,im,type)
            var dat=[]
            if(datas && datas.code==0) {
                dat=datas.page.list, im = im || 'am'
                var datArr = {
                    am: {datArr: ['receiverAddr','carNumber', 'cardTypeName','partNames'], path: '/dingdan/dingdan'}
                }
                var arrname = {receiverAddr:'', carNumber: '车牌', cardTypeName: '车型', partNames: '配件'}
                for (var i in dat) {
                    dat[i].type = im;
                    dat[i].appointLibraryName = dat[i].appointLibraryName
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
                    let aa=this.props.location.state
                    console.log(aa.where)
                    this.setState(this.loadList('am','',aa.where,'firstJJkbsdfsdfsdfsdfser35345t'))
                    break;
                default:
            }
            this.setState({data:newData,loadingOk:true,tishiyu:type !='loadFirst' && this.props.ErrorShow({type:'zanwu',content:'未查询到询价订单'})})
        }
        this.loadList=(a,t,state,jtb)=>{
            this.setState({loadingOk:false})
            var url={am:'/server/lexiu1-app/api/tmxcorder/getOrderList'}
            var newState=this.props.loadParam || this.props.myParam || this.state.reqParam;
            newState.type=a
            newState.url=url[a];
            newState.data.token=this.props.user.data.token;
            newState.data.page=1;
            newState.data.limit=10;
            newState.data.orderStatus=state;
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
            this.loadList('am',v)
        }
    }
    componentWillMount(){
        this.props.setProps({loadParam:this.props.myParam||this.state.reqParam})
    }
    componentDidMount() {
        this.props.changeTitle('订单列表')

    }
    componentDidUpdate(){}
    render(){
        console.log(this.state)
        console.log(this.state.data)
        console.log(this.props)
        var moveType =this.state.onMove || false
        var dHeight={height:'1rem'},bHeight={height:'1rem'}
        if(!moveType || Math.abs(moveType.where)<50){
            dHeight={height:'1rem'}
            bHeight = {height:'1rem'}
            console.log(moveType)
        }else if(moveType.up){
            dHeight={height:'1rem'}
            bHeight = {height:'1rem'}
        }else{
            dHeight={height:'1rem'}
            bHeight = {height:'1rem'}
        }
        // var loadParam= this.props.loadParam && this.props.loadParam.data.taskState
        var loadParam= this.props.loadParam && this.props.loadParam.data.orderStatus
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
                        <this.props.TopList datas={[
                            {text:'全部',fun:()=>this.loadList('am', false, ''),isvalue:loadParam === '' || loadParam === undefined,style:loadParam === '' || loadParam === undefined ? {color: '#5682f1'} : {}},
                            {text:'待付款',fun:()=>this.loadList('am', false, 100),isvalue:loadParam == 100,style:loadParam == 100  ? {color: '#5682f1'} : {}},
                            {text:'待发货',fun:()=>this.loadList('am', false, 101),isvalue:loadParam == 101,style:loadParam == 101  ? {color: '#5682f1'} : {}},
                            {text:'待收货',fun:()=>this.loadList('am', false, 102),isvalue:loadParam == 102 ,style:loadParam == 102  ? {color: '#5682f1'} : {}},
                            {text:'已完成',fun:()=>this.loadList('am', false, 103),isvalue:loadParam == 103,style:loadParam == 103  ? {color: '#5682f1'} : {}},
                        ]}  IStyle={{background:'#5682f1'}} defaultFun={()=>this.setState(this.loadList('am', false, ''))} Style={{BStyle:{position:'relative'}}} {...this.props} T={this}/>
                    </div>
                </div>
                <LoadList {...this.props}  dataReform={this.dataReform} T={this}>
                    {
                        this.state.data[0] ?
                            this.state.data.map((item,index)=>{
                                return(
                                    <this.props.StateLess.caseList iteDat={item} Quxiao={this.Quxiao.bind(this,item)} replacepay={this.replacepay.bind(this,item)} pay={this.pay.bind(this,item)} {...this.props} key={index}/>
                                )
                            }) :
                            this.state.loadingOk && this.state.tishiyu
                    }
                </LoadList>
            </div>
        )
    }
}
