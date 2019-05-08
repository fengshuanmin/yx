import React from 'react'
import $ from 'jquery'
import html2canvas from 'html2canvas'
var QRCode = require('qrcode.react')

export default class Erweima extends React.Component{
    constructor(props){
        super(props);
        this.state={
            url:'',
            size:200,
            img1:require('../../../img/zhifubaopay.png'),
            img2:require('../../../img/weixinpay.png')
        }
    }
   /* componentDidUpdate(){
        var t = window.setInterval(()=>{
            $.ajax({
                url:"/server/lexiu1-app/api/tmxcorder/info/"+
                ((this.props.location.state.partsList&&this.props.location.state.partsList[0].orderId)||(this.props.location.state.xlcPartsList&&this.props.location.state.xlcPartsList.id)||(this.props.location.state.orderList&&this.props.location.state.orderList.id))
                +"?token="+this.props.user.data.token,
                type:'get',
                data:{},
                dataType: "json",
                success:(msg)=> {
                    if(msg.tmxcOrder.orderStatus!='100'){
                        /!*this.props.history.replaceState({taskId:this.props.location.state.xlcPartsList.taskId||this.props.location.state.xlcname.taskId||this.props.location.state.orderList.taskId},'/purchase/info')*!/
                        history.back(-1);
                    }
                }
            })
        },3000)
        this.setState({
            t:t
        })
    }
    componentWillUnmount(){
        window.clearInterval(this.state.t);
    }*/
    /*componentDidMount(){
        var ws = new WebSocket("ws://116.62.162.134:8181");
        ws.onopen = function (e) {
            console.log('Connection to server opened');
            var sWS={id:id是个,type:'toUse'}
            var newJson=JSON.stringify(sWS);
            ws.send(newJson);
        }
        ws.onclose=function(e){
            console.log(e)
        };
        ws.onmessage =  (e)=>{
            console.log(e)
            switch(e.data){

            };
        };

    }*/
    componentWillMount(){
        this.props.changeTitle('二维码支付');
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
        var t = window.setInterval(()=>{
            $.ajax({
                url:"/server/lexiu1-app/api/tmxcorder/info/"+
                ((this.props.location.state.partsList&&this.props.location.state.partsList[0].orderId)||(this.props.location.state.xlcPartsList&&this.props.location.state.xlcPartsList.id)||(this.props.location.state.orderList&&this.props.location.state.orderList.id))
                +"?token="+this.props.user.data.token,
                type:'get',
                data:{},
                dataType: "json",
                success:(msg)=> {
                    if(msg.tmxcOrder.orderStatus!='100'){
                        clearInterval(t)
                        history.back(-1);
                    }
                }
            })
        },3000)
        this.setState({
            t:t
        })
    }
    componentWillUnmount(){
        clearInterval(this.state.t)
    }
    render(){
        console.log(this.state)
        console.log(this.props)
        console.log(this.props.location.state)
        let pn=[],ps=[],total='',len1=''
        for(var i in this.props.location.state.partsList){
            pn.push(this.props.location.state.partsList[i].partName)
        }
        if(this.props.location.state.partsList1){
            len1=this.props.location.state.partsList1.length
            ps=(this.props.location.state.partsList1).join()
        }
        console.log(pn)
        var len=pn.length
        var partname=pn.join()
        console.log(partname)
        return(
            <div>
                {this.state.url!=''?<div style={{width:'6.5rem',borderRadius:'0.2rem 0.2rem 0 0',height:'8rem',margin:'0.4rem auto'}}>
                    {/*<img src={this.state.canvas.getContext('2d').toDataURL('image/jpeg')} alt=""/>*/}
                    {this.state.canvas}
                    <div style={{background:'#fff',width:'100%',textAlign:'center',boxShadow:' 0 0.1rem 0.2rem #ccc'}}>
                        <div style={{color:'#f00',fontSize:'0.52rem',padding:'0.3rem 0 0 0.1rem'}}>￥
                            {(this.props.location.state.xlcname&&this.props.location.state.xlcname.totalPrice)||
                            (this.props.location.state.xlcPartsList&&this.props.location.state.xlcPartsList.totalPrice)||
                            (this.props.location.state.orderList &&this.props.location.state.orderList.totalPrice)}</div>
                        <div style={{color:'#666',fontSize:'0.28rem',padding:'0.2rem'}}>
                            {(this.props.location.state.partsList&&partname)||(this.props.location.state.partsList1&&ps)||
                            (this.props.location.state.xlcPartsList&&this.props.location.state.xlcPartsList.partNames)||
                            (this.state.partsListName&&this.state.partsListName
                            )||(this.props.location.state.partsList&&this.props.location.state.partsList)}
                            共{(this.props.location.state.partsList&&len)||(this.props.location.state.xlcPartsList&&this.props.location.state.xlcPartsList.partNumTotal)||(this.props.location.state.partsList1&&len1)}个配件</div>
                        <div style={{width:'4rem',height:'4rem',margin:'0.3rem auto',position:'relative'}}>
                            <QRCode value={this.state.url} size={this.state.size}/>
                            {((this.props.location.state.xlcname&&this.props.location.state.xlcname.settleMethod=='WEIXIN')
                                ||(this.props.location.state.xlcPartsList&&this.props.location.state.xlcPartsList.settleMethod=='WEIXIN')
                                ||(this.props.location.state.orderList&&this.props.location.state.orderList.settleMethod=='WEIXIN'))?<img src={this.state.img2} style={{width:'0.7rem',height:'0.7rem',position:'absolute',top:'1.65rem',left:'1.65rem'}}/>
                            :<img src={this.state.img1} style={{width:'0.7rem',height:'0.7rem',position:'absolute',top:'1.65rem',left:'1.65rem'}}/>}
                        </div>
                        <div style={{color:'#666',fontSize:'0.28rem',padding:'0.1rem'}}>使用
                            {((this.props.location.state.xlcname&&this.props.location.state.xlcname.settleMethod=='WEIXIN')
                                ||(this.props.location.state.xlcPartsList&&this.props.location.state.xlcPartsList.settleMethod=='WEIXIN')
                                ||(this.props.location.state.orderList&&this.props.location.state.orderList.settleMethod=='WEIXIN'))?'微信':'支付宝'}付款</div>
                        <div style={{color:'#666',fontSize:'0.28rem',padding:'0.1rem'}}>该二维码<span style={{color:'#f00'}}>{this.state.time}</span>前有效</div>
                        <div style={{color:'#666',fontSize:'0.28rem',paddingBottom:'0.2rem'}}>超时需重新生成</div>
                    </div>
                    <div style={{background:'#699AFF',color:'#fff',width:'100%',height:'0.8rem',textAlign:'center',boxShadow:' 0 0.1rem 0.2rem #ccc',
                        lineHeight:'0.8rem',borderRadius:'0 0 0.2rem 0.2rem',fontWeight:'600',fontSize:'0.28rem'}}>本产品已投保“质量责任保险”，请放心购买</div>
                </div>:''}
            </div>
        )
    }
}