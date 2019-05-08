import React from 'react'
import $ from 'jquery'
import html2canvas from 'html2canvas'
var QRCode = require('qrcode.react')

export default class Erweima extends React.Component{
    constructor(props){
        super(props);
        this.state={
            url:'',
            size:175,
            img1:require('../../../img/zhifubaopay.png'),
            img2:require('../../../img/weixinpay.png')
        }
    }
    componentWillUpdate(){
        setInterval(()=>{
            $.ajax({
                url:"/server/lexiu1-app/api/tmxcorder/info/"+
                ((this.props.location.state.partsList&&this.props.location.state.partsList[0].orderId)
                    ||(this.props.location.state.xlcPartsList&&this.props.location.state.xlcPartsList.id)||
                    (this.props.location.state.orderList&&this.props.location.state.orderList.id))
                +"?token="+this.props.user.data.token,
                type:'get',
                data:{},
                dataType: "json",
                success:(msg)=> {
                    console.log(msg.tmxcOrder.orderStatus)
                    console.log(msg.tmxcOrder.orderStatus!='100')
                    if(msg.tmxcOrder.orderStatus!='100'){
                        this.props.history.replaceState(null,'/purchase/list')
                        // history.back(-1);
                    }
                }
            })
        },1000)
    }
    componentWillMount(){
        this.props.changeTitle('修理厂代付');
        setTimeout(()=>{
            html2canvas(document.body).then((canvas)=>{
                this.state.canvas=canvas
                // $('body').append(canvas)
                console.log(canvas)
            })
        },1000)
        console.log(new Date().getTime())
        var d=new Date().getTime()+7200000
        var time1=new Date(d)
        var year = time1.getFullYear();
        var month = time1.getMonth()+1>10||time1.getMonth()+1==10?time1.getMonth()+1:'0'+(time1.getMonth()+1);
        var date = time1.getDate()>10||time1.getDate()==10?time1.getDate():'0'+time1.getDate();
        var hour = time1.getHours()>10||time1.getHours()==10?time1.getHours():'0'+time1.getHours();
        var minute = time1.getMinutes()>10||time1.getMinutes()==10?time1.getMinutes():'0'+time1.getMinutes();
        var second = time1.getSeconds()>10||time1.getSeconds()==10?time1.getSeconds():'0'+time1.getSeconds();
        var time2=year+'-'+month+'-'+date
        var time3=hour+':'+minute+':'+second
        this.setState({
            time:time2+'  '+time3
        })
        console.log(time2)
        console.log(time3)
        console.log(this.props.location)
        if((this.props.location.state.xlcname&&this.props.location.state.xlcname.settleMethod=='WEIXIN')||(this.props.location.state.xlcPartsList&&this.props.location.state.xlcPartsList.settleMethod=='WEIXIN')||(this.props.location.state.orderList&&this.props.location.state.orderList.settleMethod=='WEIXIN')){
            console.log("1111")
            this.props.ajax({
                url:'/server/lexiu1-app/wxpay/scanCode2ByApp/'+((this.props.location.state.partsList&&this.props.location.state.partsList[0].orderId)||(this.props.location.state.xlcPartsList&&this.props.location.state.xlcPartsList.id)||(this.props.location.state.orderList&&this.props.location.state.orderList.id))+'?&token='+this.props.user.data.token,
                data:{},
                type:'get',
                suc:(data)=>{
                    console.log(data)
                    this.setState({
                        url:data.qrCodeUrl
                    })
                }
            })
        }else{
            this.props.ajax({
                url:'/server/lexiu1-app/alipay/tradePrecreatePay/'+((this.props.location.state.partsList&&this.props.location.state.partsList[0].orderId)||(this.props.location.state.xlcPartsList&&this.props.location.state.xlcPartsList.id)||(this.props.location.state.orderList&&this.props.location.state.orderList.id))+'?token='+this.props.user.data.token,
                data:{},
                type:'get',
                suc:(data)=>{
                    console.log(data)
                    this.setState({
                        url:data.qrCodeUrl
                    })
                }
            })
        }
    }
    render(){
        console.log(this.state)
        console.log(this.props.location.state)

        return(
            <div>
                {this.state.url!=''?<div style={{width:'6.5rem',height:'8rem',margin:'0.4rem auto'}}>
                    {/*<img src={this.state.canvas.getContext('2d').toDataURL('image/jpeg')} alt=""/>*/}
                    {this.state.canvas}
                    <div style={{background:'#fff',width:'100%',height:'7.2rem',textAlign:'center'}}>
                        <div style={{color:'#f00',fontSize:'0.36rem',padding:'0.3rem 0 0 0.1rem'}}>￥
                            {(this.props.location.state.partsList&&this.props.location.state.partsList[0].totalPrice)||
                            (this.props.location.state.xlcPartsList&&this.props.location.state.xlcPartsList.totalPrice)||
                            (this.props.location.state.orderList &&this.props.location.state.orderList.totalPrice)}</div>
                        <div style={{color:'#A4A4A4',fontSize:'0.28rem',padding:'0.1rem'}}>
                            {(this.props.location.state.partsList&&this.props.location.state.partsList[0].partName)||
                            (this.props.location.state.xlcPartsList&&this.props.location.state.xlcPartsList.partNames)||(this.state.partsListName&&this.state.partsListName
                            )}
                            共{(this.props.location.state.partsList&&this.props.location.state.partsList[0].quantity)||(this.props.location.state.xlcPartsList&&this.props.location.state.xlcPartsList.partNumTotal)||(this.props.location.state.partsList&&this.props.location.state.partsList.length)}个配件</div>
                        <div style={{width:'3.5rem',height:'3.5rem',margin:'0.3rem auto',position:'relative'}}>
                            <QRCode value={this.state.url} size={this.state.size}/>
                            {((this.props.location.state.xlcname&&this.props.location.state.xlcname.settleMethod=='WEIXIN')
                                ||(this.props.location.state.xlcPartsList&&this.props.location.state.xlcPartsList.settleMethod=='WEIXIN')
                                ||(this.props.location.state.orderList&&this.props.location.state.orderList.settleMethod=='WEIXIN'))?<img src={this.state.img2} style={{width:'0.7rem',height:'0.7rem',position:'absolute',top:'1.4rem',left:'1.4rem'}}/>
                            :<img src={this.state.img1} style={{width:'0.7rem',height:'0.7rem',position:'absolute',top:'1.4rem',left:'1.4rem'}}/>}
                        </div>
                        <div style={{color:'#A4A4A4',fontSize:'0.28rem',padding:'0.1rem'}}>使用
                            {((this.props.location.state.xlcname&&this.props.location.state.xlcname.settleMethod=='WEIXIN')
                                ||(this.props.location.state.xlcPartsList&&this.props.location.state.xlcPartsList.settleMethod=='WEIXIN')
                                ||(this.props.location.state.orderList&&this.props.location.state.orderList.settleMethod=='WEIXIN'))?'微信':'支付宝'}付款</div>
                        <div style={{color:'#A4A4A4',fontSize:'0.28rem',padding:'0.1rem'}}>该二维码<span style={{color:'#f00'}}>{this.state.time}</span>前有效</div>
                        <div style={{color:'#A4A4A4',fontSize:'0.28rem'}}>超时需重新生成</div>
                    </div>
                    <div style={{background:'#699AFF',color:'#fff',width:'100%',height:'0.8rem',textAlign:'center',
                        lineHeight:'0.8rem',borderRadius:'0 0 0.2rem 0.2rem',fontWeight:'600',fontSize:'0.28rem'}}>本产品已投保“质量责任保险”，请放心购买</div>
                </div>:''}
            </div>
        )
    }
}