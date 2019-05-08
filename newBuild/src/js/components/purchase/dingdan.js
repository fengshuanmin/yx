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
            xlcName:[]
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
                                this.props.history.replaceState(null,'/purchase/list')
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
                    /*this.props.history.pushState({a:true},'/purchase/list')
                    this.props.promptInfo()*/
                    this.props.ajax({
                        url:"/server/lexiu1-app/api/tmxcorder/cancelOrder/"+this.state.lingjian[0].orderId+"?token="+this.props.user.data.token,
                        data:{orderId:this.state.lingjian[0].orderId},
                        type:'get',
                        suc:(data)=>{
                            if(data.code=='0'){
                                this.props.history.replaceState({taskId:this.props.location.state.taskId,a:true},'/purchase/partsBuy')
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
                this.props.history.pushState({partsList:this.state.lingjian,xlcname:this.state.xlc},'/purchase/erweima')
            }else if(this.state.xlc.settleMethod=='WEIXIN'){
                this.props.ajax({
                    loading:true,
                    url: "/server/lexiu1-app/wxpay/webPay/"+data.orderList[0].id+"/"+wxConfig.openid+"?token="+this.props.user.data.token,
                    data:{orderId:this.state.lingjian.orderId,openid:wxConfig.openid},
                    suc:(result)=>{
                        console.log(result)
                        wx.chooseWXPay({
                            appId:result.data.appId,
                            timestamp: result.data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                            nonceStr: result.data.noncestr, // 支付签名随机串，不长于 32 位
                            package: result.data.prepayId, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                            signType:result.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            paySign: result.data.signature, // 支付签名
                            success: function (res) {
                                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                                    this.props.promptInfo({
                                        content:'支付成功',
                                        Prompt:true,
                                        onlyOK:true,
                                        fun:()=>{
                                            history.back(-1)
                                            this.props.promptInfo()
                                        }
                                    })
                                }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                                    this.props.promptInfo({
                                        content:'您确定要取消支付吗？',
                                        Prompt:true,
                                        onlyOK:true
                                    })
                                }else{
                                    this.props.promptInfo({
                                        content:'支付失败',
                                        Prompt:true,
                                        onlyOK:true
                                    })
                                }// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                            }
                        });
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
        $.ajax({
            url:"/server/lexiu1-app/api/tmxcorder/info/"+this.props.location.state.id+"?token="+this.props.user.data.token,
            type:'get',
            data:{},
            dataType: "json",
            success:(msg)=>{
                console.log(msg)
                console.log(msg.tmxcOrder)
                console.log(msg.parts)
                var EVALarr = ['partName','partType','partPlatform','partEc','unitPrice','quantity'],
                    //顶层数据
                    EVALINFO=[{'partName':'名称','partType':'品质','partPlatform':'配件平台','partEc':'配件电商','unitPrice':'单价','quantity':'数量'}]
                for(var i in msg.parts){
                    EVALINFO.push(msg.parts[i])
                }
                console.log(EVALINFO)
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
        console.log(this.state.xlc.finishPayTime==null)
        console.log(this.state.lingjian!='')
        return(
            <div>
               <div>
                    <div style={{background:'linear-gradient(to right,#2AB1DA,#212DD6)',width:'100%',height:'1.2rem',color:'#fff',lineHeight:'1.2rem',fontSize:'0.32rem'}}>
                        <span style={{display:'inline-block',marginLeft:'0.4rem'}}>{this.props.location.state.orderStatus=='100'?'待付款':''||this.props.location.state.orderStatus=='101'?'待发货':''||this.props.location.state.orderStatus=='102'?'已发货':''||this.props.location.state.orderStatus=='103'?'已收货':''||this.props.location.state.orderStatus=='105'?'支付失败':''||this.props.location.state.orderStatus=='200'?'已取消':''}
                        </span>
                    </div>
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
                    <div style={{marginTop:'0.3rem',background:'#fff'}}>
                        <this.props.InfoTitle T={this} data={{key:'配件信息',Lcolor:'#5998ff'}}/>
                        <this.props.ListInfo className="noFlex" DataList={this.state.EVALINFO||[]} orderArr={this.state.EVALarr ||[]} {...this.props} T={this}/>
                        <p style={{padding:'0.3rem',borderTop:'0.01rem solid #F4F8FB'}}><span style={{display:'inline-block',marginLeft:'5rem'}}>{this.props.location.state.orderStatus=='100'?'需付款 :':'实付款 :'}</span><span style={{color:'red'}}> ￥{this.state.xlc.totalPrice}</span></p>
                    </div>
                    <div style={{background:'#fff',marginTop:'0.3rem'}}>
                        <ul style={{borderBottom:'0.01rem solid #ddd',padding:'0.1rem 0'}}>
                            <li style={{padding:'0.1rem 0.2rem'}}>订单编号 ：<span style={{display:'inline-block',color:'#5B5B5B'}}>{this.state.xlc.code}</span></li>
                            <li style={{padding:'0.1rem 0.2rem'}}>下单时间 ：<span style={{display:'inline-block',color:'#5B5B5B'}}>{this.state.xlc.createDate}</span></li>
                        </ul>
                        <ul style={{borderBottom:'0.01rem solid #ddd',padding:'0.1rem 0'}}>
                            <li style={{padding:'0.1rem 0.2rem'}}>支付方式 ：<span style={{display:'inline-block',color:'#5B5B5B'}}>{this.state.xlc.source=='XLCDF'?'修理厂支付':this.state.xlc.settleMethod=='WEIXIN'?'微信':'支付宝'}</span></li>
                            {/*<li style={{padding:'0.1rem 0.2rem'}}>{this.state.xlc.finishPayTime=null?'':'支付时间:'+this.state.xlc.finishPayTime}</li>*/}
                            {this.state.xlc.finishPayTime==null?'':<li style={{padding:'0.1rem 0.2rem'}}>支付时间 ：<span style={{display:'inline-block',color:'#5B5B5B'}}>{this.state.xlc.finishPayTime}</span></li>}
                        </ul>
                        <ul style={{borderBottom:'0.01rem solid #ddd',padding:'0.1rem 0'}}>
                            <li style={{padding:'0.1rem 0.2rem'}}>配送方式 : <span style={{display:'inline-block',marginLeft:'0.12rem',color:'#5B5B5B'}}>卖家发货</span></li>
                        </ul>
                    </div>
                    {this.props.location.state.orderStatus=='100'?<div style={{width:'100%',padding:'0.2rem 0',borderTop:'0.01rem solid #ddd',position:'fixed',bottom:'0',background:'#fff'}}>
                        <ul style={{marginLeft:'2rem',display:'flex'}}>
                            <li style={{padding:'0.1rem 0.3rem',border:'0.01rem solid #ccc',borderRadius:'0.15rem',marginRight:'0.25rem'}} onClick={this.Quxiao}>取消订单</li>
                            <li style={{padding:'0.1rem 0.3rem',border:'0.01rem solid #ccc',borderRadius:'0.15rem',marginRight:'0.25rem'}} onClick={this.replacepay}>重新下单</li>
                            <li style={{padding:'0.1rem 0.3rem',border:'0.01rem solid #f00',borderRadius:'0.15rem',color:'#f00'}} onClick={this.pay}>付款</li>
                        </ul>
                    </div>:''}
                </div>
            </div>
        )


    }
}