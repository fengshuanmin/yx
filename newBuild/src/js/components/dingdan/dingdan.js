import React from 'react'
import $ from 'jquery'
import wxConfig from '../../../../../config/WXConfig'
export default class Info extends React.Component {
    constructor(props){
        super(props),
        this.state = {
            titleList:['名称','品质','配件平台','配件电商','单价','数量'],
            xlc:[],
            lingjian:[],
            xlcName:[],
            loading:true
        }
        this.Quxiao=()=>{
            this.props.promptInfo({
                content:'是否取消订单？',
                Prompt:true,
                fun:()=>{
                    this.props.ajax({
                        url:"/server/lexiu1-app/api/tmxcorder/cancelOrder/"+this.state.lingjian[0].orderId+"?token="+this.props.user.data.token,
                        data:{orderId:this.state.lingjian[0].orderId},
                        type:'get',
                        dataType: "json",
                        suc:(data)=>{
                            console.log(data)
                            if(data.code=='0'){
                                if(this.props.location.state.flag&&this.props.location.state.flag=='purchaseinfo'){
                                    this.props.history.replaceState({taskId:this.props.location.state.taskId},'/purchase/info')
                                }else{
                                    window.history.back(-1)
                                }
                                // this.props.history.replaceState({taskId:this.props.location.state.taskId},'/purchase/info')
                            }
                        }
                    })
                    this.props.promptInfo()
                }
            })
        }
        this.replacepay=()=>{
            this.props.promptInfo({
                content:'您好，如需重新下单，会自动取消当前订单，是否重新下单？',
                Prompt:true,
                fun:()=>{
                    this.props.ajax({
                        url:"/server/lexiu1-app/api/tmxcorder/cancelOrder/"+this.state.lingjian[0].orderId+"?token="+this.props.user.data.token,
                        data:{orderId:this.state.lingjian[0].orderId},
                        type:'get',
                        suc:(data)=>{
                            if(data.code=='0'){
                                this.props.history.replaceState({taskId:this.props.location.state.taskId},'/purchase/partsBuy')
                            }
                        }
                    })
                    this.props.promptInfo()
                }
            })
        }
        let wxConfig=this.props.wxConfig
        this.pay=()=>{
            if(this.state.xlc.source=='XLCDF'){
                this.props.history.replaceState({partsList:this.state.lingjian,xlcname:this.state.xlc,taskId:this.props.location.state.taskId},'/dingdan/erweima')
            }else if(this.state.xlc.settleMethod=='WEIXIN'){
                console.log(this.state.lingjian[0].orderId)
                console.log(this.props.user.data.token)
                debugger
                this.props.ajax({
                    loading:true,
                    url: '/server/lexiu1-app/wxpay/webPay/'+this.state.lingjian[0].orderId+'/'+wxConfig.openid+'?token='+this.props.user.data.token,
                    data:{orderId:this.state.lingjian[0].orderId,openid:wxConfig.openid},
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
                                            history.back(-1)
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
    }

    componentWillMount() {
        this.props.changeTitle('订单详情');
        this.setState({
            tishiyu:this.props.ErrorShow({type:'zanwu',content:<span>暂无数据</span>})
        })

    }
    componentDidMount(){
        this.props.ajax({
            loading:true,
            url:"/server/lexiu1-app/api/tmxcorder/info/"+this.props.location.state.id+"?token="+this.props.user.data.token,
            type:'get',
            data:{},
            dataType: "json",
            suc:(msg)=>{
                console.log(msg)
                /*console.log(msg.tmxcOrder)
                console.log(msg.parts)*/
                var PartTypeArr=[
                    '',
                    '原厂流通件',
                    'OEM件',
                    '认证件',
                    '品牌件',
                    '拆车件',
                    '其他',
                ]
                var EVALarr = ['partName','partType','partPlatform','partEc','unitPrice','quantity'],
                    //顶层数据
                    EVALINFO=[{'partName':'名称','partType':'品质','partPlatform':'配件平台','partEc':'配件电商','unitPrice':'单价','quantity':'数量'}]
                for(var i in msg.parts){
                   /* EVALINFO.push(msg.parts[i])*/
                   console.log(PartTypeArr[msg.parts[i].partType])
                    EVALINFO.push({
                        partName: msg.parts[i].partName,
                        partType: PartTypeArr[msg.parts[i].partType],
                        partPlatform: msg.parts[i].partPlatform,
                        partEc: msg.parts[i].partEc,
                        unitPrice: msg.parts[i].unitPrice,
                        quantity:msg.parts[i].quantity
                    })
                }
                // console.log(EVALINFO)
                this.setState({
                    xlc:msg.tmxcOrder,
                    lingjian:msg.parts,
                    xlcName:msg.lxXlcLibraryEntity,
                    EVALINFO:EVALINFO,
                    EVALarr:EVALarr
                })
            }
        })
    }
    render(){
        console.log(this.state)
        console.log(this.props)
        console.log(this.props.location.state.id)
        console.log(this.props.user.data.token)
       /* console.log(this.state.xlc.finishPayTime==null)
        console.log(this.state.lingjian!='')*/
        return(
            <div>
                {this.state.lingjian!=''&&<div>
                    <div style={{background:'linear-gradient(to right,#2AB1DA,#212DD6)',width:'100%',height:'1.2rem',color:'#fff',lineHeight:'1.2rem',fontSize:'0.32rem'}}>
                        <span style={{display:'inline-block',marginLeft:'0.4rem'}}>{this.props.location.state.orderStatus=='100'?'待付款':''||this.props.location.state.orderStatus=='101'?'待发货':''||this.props.location.state.orderStatus=='102'?'已发货':''||this.props.location.state.orderStatus=='103'?'已收货':''||this.props.location.state.orderStatus=='105'?'支付失败':''||this.props.location.state.orderStatus=='200'?'已取消':''}
                        </span>
                    </div>
                    {this.state.loading?<div>
                        <div style={{background:'#fff'}}>
                            <ul style={{background:'#fff',display:'flex',padding:'0.2rem',alignItems:'center'}}>
                                <li style={{width:'0.8rem',fontSize:'0.4rem'}} className="iconfonts">&#xe623;</li>
                                <li style={{flex:'1',lineHeight:'0.4rem'}}>
                                    <p><span style={{display:'block',fontSize:'0.3rem',fontWeight:'600'}}>{this.state.xlcName.shotName}</span></p>
                                    <p style={{display:'block',color:'#8C8C8C',marginTop:'0.08rem'}}><span>收货人：</span><span>{this.state.xlc.receiver}</span><span style={{marginLeft:'0.1rem'}}>{this.state.xlc.receiverPhone}</span></p>
                                    <p style={{display:'block',color:'#8C8C8C'}}><span>收获地址：</span><span>{this.state.xlc.receiverAddr}</span></p>
                                </li>
                            </ul>
                        </div>
                        <div style={{marginTop:'0.3rem',background:'#fff',paddingBottom:'0.2rem'}}>
                            <this.props.InfoTitle T={this} data={{key:'配件信息',Lcolor:'#5998ff'}}/>
                            <this.props.ListInfo className="noFlex" DataList={this.state.EVALINFO||[]} orderArr={this.state.EVALarr ||[]} {...this.props} T={this}/>
                            <p style={{padding:'0.3rem',borderTop:'0.01rem solid #F4F8FB'}}><span style={{display:'inline-block',color:'red',float:'right'}}> ￥{this.state.xlc.totalPrice}</span><span style={{display:'inline-block',float:'right'}}>{this.props.location.state.orderStatus=='101'?'实付款 :':'需付款 :'}</span></p>
                        </div>
                        <div style={{background:'#fff',marginTop:'0.3rem'}}>
                            <ul style={{borderBottom:'0.01rem solid #ddd',padding:'0.1rem 0'}}>
                                <li style={{padding:'0.1rem 0.2rem'}}>订单编号 ：<span style={{display:'inline-block',color:'#5B5B5B'}}>{this.state.xlc.code}</span></li>
                                <li style={{padding:'0.1rem 0.2rem'}}>下单时间 ：<span style={{display:'inline-block',color:'#5B5B5B'}}>{this.state.xlc.createDate}</span></li>
                            </ul>
                            <ul style={{borderBottom:'0.01rem solid #ddd',padding:'0.1rem 0'}}>
                                <li style={{padding:'0.1rem 0.2rem'}}>支付方式 ：<span style={{display:'inline-block',color:'#5B5B5B'}}>{this.state.xlc.source=='XLCDF'?'修理厂支付':(this.state.xlc.settleMethod=='WEIXIN'?'微信支付':this.state.xlc.settleMethod=='INS_COMPENSATION'?'保险直赔':'支付宝支付')}</span></li>
                                {/*<li style={{padding:'0.1rem 0.2rem'}}>{this.state.xlc.finishPayTime=null?'':'支付时间:'+this.state.xlc.finishPayTime}</li>*/}
                                {this.state.xlc.finishPayTime==null?'':<li style={{padding:'0.1rem 0.2rem'}}>支付时间 ：<span style={{display:'inline-block',color:'#5B5B5B'}}>{this.state.xlc.finishPayTime}</span></li>}
                            </ul>
                            <ul style={{borderBottom:'0.01rem solid #ddd',padding:'0.1rem 0'}}>
                                <li style={{padding:'0.1rem 0.2rem'}}>配送方式 : <span style={{display:'inline-block',marginLeft:'0.12rem',color:'#5B5B5B'}}>卖家发货</span></li>
                            </ul>
                        </div>
                    </div>:''}

                    {this.props.location.state.orderStatus=='100'?<div style={{width:'100%',padding:'0.2rem 0',borderTop:'0.01rem solid #ddd',position:'fixed',bottom:'0',background:'#fff'}}>
                        <ul style={{marginLeft:'2rem',display:'flex'}}>
                            <li style={{padding:'0.1rem 0.3rem',border:'1px solid #ccc',borderRadius:'0.15rem',marginRight:'0.25rem'}} onClick={this.Quxiao}>取消订单</li>
                            <li style={{padding:'0.1rem 0.3rem',border:'1px solid #ccc',borderRadius:'0.15rem',marginRight:'0.25rem'}} onClick={this.replacepay}>重新下单</li>
                            <li style={{padding:'0.1rem 0.3rem',border:'1px solid #f00',borderRadius:'0.15rem',color:'#f00'}} onClick={this.pay}>付款</li>
                        </ul>
                    </div>:''}
                </div>}
            </div>
        )


    }
}