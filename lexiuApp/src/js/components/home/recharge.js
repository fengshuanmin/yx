import React from 'react'
import $ from 'jquery';
import wxConfig from '../../../../../config/WXConfig'

export default class Pay extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            list: [
                {url: 'url(' + require('../../../img/wx.png') + ') no-repeat center/cover', title: '微信支付'}
            ],
            tit: '充值'
        }
        console.log(this.props.user.data.token)
        console.log(this.props)
        let wxConfig=this.props.wxConfig
        this.nowrecharge=()=>{
            /*console.log("11111")
            console.log(this.props.location.state.rechargeFor)
            console.log(this.props.user.data.token)
            console.log($("#money").val())*/
            this.props.ajax({
                url: "/server/lexiu-app/api/librarywalletrecharge/saveBalance",
                data:{rechargeFor:this.props.location.state.rechargeFor,settleMethod:'WEIXIN',token:this.props.user.data.token,totalAmount:$("#money").val()},
                suc:(data)=>{
                    console.log(data)
                    this.props.ajax({
                    loading:true,
                    url: "/server/lexiu-app/wxpay/webPay/"+data.rechargeId+"/"+wxConfig.openid+"?token="+this.props.user.data.token,
                    data:{openid:wxConfig.openid},
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
                                            this.props.history.pushState(null,'/pay')
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
                }
            })

        }
    };
    /*componentDidMount(){

        this.props.ajax({
            loading:true,
            url: "/server/lexiu-app/api/librarywalletrecharge/saveBalance",
            data:{rechargeFor:this.props.location.state,settleMethod:'WEIXIN',token:this.props.user.data.token,totalAmount:$("#money").val()},
            suc:(result)=>{
                console.log(result)
            }
        })
    }*/
    render(){
        console.log(this.props)
        return(
            <div className="recharge">
                <div className="charge">
                    <h4 style={{fontSize:'0.34rem'}}>充值金额</h4>
                    <div className="chargemoney">
                        <span>￥</span><input type="number" id="money" />
                    </div>
                </div>
                <div className="chargetype">
                    <h4>支付方式</h4>
                    {
                        <div className="chargemothed">
                            <div>
                                <i></i><span style={{fontSize:'0.32rem'}}>微信支付</span><span className="chk_div"></span>
                            </div>
                        </div>
                    }
                    <this.props.BaseSubmits style={{box:{padding:'0 0.3rem',marginBottom:'0.3rem'}}} submits={[{style:{borderRadius:'0.1rem',background:'linear-gradient(to right,#30b5e7,#2989f3)'},value:'立即充值',fun:this.nowrecharge}]} value="立即充值" {...this.props} />
                    {/*<button style={{width:'92%',border:'none',padding:'0.3rem 0',borderRadius:'0.1rem',outline:'none',position:'fixed',left:'4%',bottom:'0.2rem',background:'linear-gradient(to right,#30b5e7,#2989f3)',color:'#fff',fontSize:'16px'}}>立即充值</button>*/}
                </div>
            </div>
        )
    }
}