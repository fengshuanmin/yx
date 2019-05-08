import React from 'react'
import $ from 'jquery'
import wxConfig from '../../../../../config/WXConfig'
export default class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[],xlcname:{...(this.props.location.state.xlcname||{})},pay:'XLCDF',
            lis:[...(this.props.location.state.lis||[])],
            submitDraw: false,
            img1:require('../../../img/zhifubaopay.png'),
            img2:require('../../../img/weixinpay.png'),
            zhifubao:'',
            weixin:'',
            ...(this.props.location.state||{}),
            ...(this.props.payWay||{})
        }
        this.address=()=>{
            this.props.setProps({addre:{xlcname:this.state.xlcname,taskId:this.props.location.state.taskId,
                evalId:this.props.location.state.evalId||this.state.evalId,lis:this.state.lis,pay:this.state.pay||'XLCDF'
                }})
            console.log(this.props.addre)
            this.props.history.pushState({taskId:this.props.location.state.taskId,
               evalId:this.props.location.state.evalId||this.state.evalId,lis:this.state.lis,pay:this.state.pay||'XLCDF'
                }, '/purchase/addXlc')
        }
        this.fangshi=()=>{
            this.props.setProps({addre:{xlcname:this.state.xlcname,taskId:this.props.location.state.taskId,
                evalId:this.props.location.state.evalId||this.state.evalId,lis:this.state.lis,pay:this.state.pay||'XLCDF'
            }})
            // this.props.setProps({
            //     payWay:{taskId:this.props.location.state.taskId,evalId:this.props.location.state.evalId||this.state.evalId,
            //         pay:this.state.pay||'XLCDF'}})
            this.props.history.pushState({taskId:this.props.location.state.taskId,
                evalId:this.props.location.state.evalId||this.state.evalId,lis:this.state.lis,xlcname:this.state.xlcname,
                isChecked:this.state.isChecked,id:this.state.id,pay:this.state.pay||'XLCDF'
               }, '/purchase/payfangshi')
        }
        this.checkChange=(val,index,e)=>{
            var partsList=this.state.partsList;
            var money=this.state.money || 0
            if(index==0){
                for(var i in partsList){
                    partsList[i].checked=val;
                    money+=partsList[i].JmPrice
                }
            }else{
                partsList[index].checked=val;
                val==false && (partsList[0].checked=val);
            }
            var lis=[]
            for(var j in partsList){
                if(partsList[j].checked==true) {
                    lis.push(partsList[j])
                }
            }
            if(lis.length==partsList.length-1){
                // console.log("1111")
                partsList[0].checked=true
            }

            if(lis.length==partsList.length){
                lis.splice(0,1)
            }
            var price=0,id=[];
            for(var m in lis){
                price+=lis[m].JmPrice*lis[m].PartNum,
                id.push(lis[m].id)
            }
            var id1=id.join()
            this.setState({partsList:partsList,price:price,lis:lis,id:id1})
            // this.props.setProps({
            //     lis:lis
            // })
        }

        let wxConfig=this.props.wxConfig
        this.submit=()=>{
            if(!this.state.xlcname.libraryId && !this.state.xlcname.libId && !this.state.xlcname.id){
                this.props.promptInfo({
                    content:'请录入修理厂信息',
                    Prompt:true,
                    onlyOK:true
                })
            }else if(this.state.lis&&this.state.lis.length==0){
                this.props.promptInfo({
                    content:'请选择采购零件',
                    Prompt:true,
                    onlyOK:true
                })
            }else{
                if(this.state.pay=='INS') {
                    this.props.ajax({
                        url: '/server/lexiu1-app/api/tmxcorder/save',
                        data: {
                            libraryId: this.state.xlcname.libraryId || this.state.xlcname.libId || this.state.xlcname.id,
                            carId: this.props.location.state.evalId||this.state.evalId,
                            partIds: this.state.id,
                            token: this.props.user.data.token,
                            distribMode: 'tjwl',
                            netType: 'weixin',
                            payType:'WEIXIN',
                            source: 'INS'
                        },
                        suc: (data) => {
                            this.props.promptInfo({
                                content:wxConfig.openid,
                                Prompt: true,
                            })
                            this.props.ajax({
                                loading: true,
                                url: "/server/lexiu1-app/wxpay/webPay/" + data.orderList[0].id + "/" + wxConfig.openid + "?token=" + this.props.user.data.token,
                                data: {orderId: data.orderList[0].id, openid: wxConfig.openid},
                                suc: (result) => {
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
                                                        history.back(-1)
                                                        this.props.promptInfo()
                                                    }
                                                })
                                            }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                                        }
                                    );
                                }
                            })
                        }
                    })
                }else if(this.state.pay=='INS_COMPENSATION'){
                    this.props.ajax({
                        url: '/server/lexiu1-app/api/tmxcorder/save',
                        data: {
                            libraryId: this.state.xlcname.orgId || this.state.xlcname.libId || this.state.xlcname.id,
                            carId: this.props.location.state.evalId||this.state.evalId,
                            partIds: this.state.id,
                            token: this.props.user.data.token,
                            distribMode: 'tjwl',
                            netType: 'weixin',
                            payType:'INS_COMPENSATION',
                            source: 'INS'
                        },
                        suc: (data) => {
                            this.props.promptInfo({
                                content: '下单成功',
                                Prompt: true,
                                onlyOK: true,
                                fun: () => {
                                    history.back(-1)
                                    this.props.promptInfo()
                                }
                            })
                        }
                    })
                }else{
                    this.setState({
                        submitDraw: true,
                    })
                    this.zhifubao=()=>{
                        this.props.ajax({
                            url: '/server/lexiu1-app/api/tmxcorder/save',
                            data: {
                                libraryId: this.state.xlcname.orgId || this.state.xlcname.libId || this.state.xlcname.id,
                                carId: this.props.location.state.evalId||this.state.evalId,
                                partIds: this.state.id,
                                token: this.props.user.data.token,
                                distribMode: 'tjwl',
                                netType: 'weixin',
                                payType:'ALIPAY',
                                source: 'XLCDF'
                            },
                            suc: (data) => {
                                var time1 = new Date().getTime();
                                var time2=time1+72000;
                                var time3=time2.toLocaleString()
                                this.setState({
                                    time1:time2,
                                    submitDraw: false,
                                    zhifubao:'zhifubao'
                                })
                                var lis1=[]
                                for(var m in this.state.lis){
                                    lis1.push(this.state.lis[m].FactPartName)
                                }
                                this.props.history.replaceState({partsList1:lis1,orderList:data.orderList[0],pay:'ALIPAY',taskId:this.props.location.state.taskId},'/dingdan/erweima')

                            }
                        })
                    }
                    this.weixin=()=>{
                        this.props.ajax({
                            url: '/server/lexiu1-app/api/tmxcorder/save',
                            data: {
                                libraryId: this.state.xlcname.orgId || this.state.xlcname.libId || this.state.xlcname.id,
                                carId: this.props.location.state.evalId||this.state.evalId,
                                partIds: this.state.id,
                                token: this.props.user.data.token,
                                distribMode: 'tjwl',
                                netType: 'weixin',
                                payType:'WEIXIN',
                                source: 'XLCDF'
                            },
                            suc: (data) => {
                                var time1 = new Date().toLocaleTimeString();
                                var time2=time1+2*60*60*100;
                                this.setState({
                                    time1:time2,
                                    submitDraw: false,
                                    weixin:'weixin'
                                })
                                var lis1=[]
                                for(var m in this.state.lis) {
                                    lis1.push(this.state.lis[m].FactPartName)
                                }
                                this.props.history.replaceState({partsList1:lis1,orderList:data.orderList[0],time:this.state.time1,pay:'WEIXIN',taskId:this.props.location.state.taskId},'/dingdan/erweima')

                            }
                        })
                    }
                    this.quxiao=()=>{
                        this.setState({
                            submitDraw: false
                        })
                    }
                }
            }
        }

    }
    componentWillMount() {
        this.props.location.state={...(this.props.location.state||{}),...(this.props.addre||{})}
        /*this.setState({
            xlcname:this.props.location.state.xlcname||{}
        })*/
        this.state={...(this.state||{}),...(this.props.location.state||{})}
        console.log(this.state)
        console.log(this.props.location.state)
        this.props.changeTitle('配件采购');
        this.props.ajax({
            loading: true,
            url: '/toumingxiu/insEnquiry/getInsEnquiryTask.do',
            data: {taskId: this.props.location.state.taskId},
            suc: (data) => {
                //PriceFlag 1直供 2自采
                this.setState({
                    evalId: data.result.evalId
                })
            }
        })
        $.ajax({
            url:'/server/lexiu1-app/api/evaluationcar/infoByTaskId/'+this.props.location.state.taskId+'?token='+this.props.user.data.token,
            data:{taskId:this.props.location.state.taskId},
            type:'get',
            dataType: "json",
            success:(dat)=>{
                let id=dat.evaluationCar.id
                this.setState({
                    id:dat.evaluationCar.id
                })
                $.ajax({
                    url:'/server/lexiu1-app/api/evaluationpart/list/'+dat.evaluationCar.id+'?token='+this.props.user.data.token,
                    data:{id:dat.evaluationCar.id,token:this.props.user.data.token},
                    type:'get',
                    dataType: "json",
                    success:(data)=>{
                        var PartTypeArr=[
                            '',
                            '原厂流通件',
                            'OEM件',
                            '认证件',
                            '品牌件',
                            '拆车件',
                            '其他',
                        ]
                        var arr1=[]
                        for(var item of data.parts){
                            arr1.push({FactPartName:item.partStandard,PartType:PartTypeArr[item.partType],pingtai:item.partPlatformName,companyName:item.companyName,JmPrice:item.jmPrice,PartNum:item.partNum,id:item.id})
                        }
                        var parts=[]
                        for(var item of data.unParts){
                            parts.push({FactPartName:item.partStandard,PartType:'',pingtai:'',companyName:'',JmPrice:'',PartNum:''})
                        }
                        var arr=arr1.concat(parts)

                        var disAbleList=[],partsList=[]

                        for(let i in arr){
                            if(!arr[i].JmPrice){
                                arr[i].disabled=true
                                arr[i].disablep="       "
                                arr[i].disableText="未选择报价"
                                disAbleList.push(arr[i])
                            }else{
                                partsList.push(arr[i])
                            }
                        }
                        this.setState({partsList,disAbleList},()=>{
                            this.state.partsList.unshift({
                                FactPartName:'名称',
                                PartType:'品质',
                                pingtai:'配件平台',
                                companyName:'配件电商',
                                JmPrice:'单价',
                                PartNum:'数量',
                                id:this.state.partsList.id
                            });
                            let orderArr=['checkbox','FactPartName','PartType','pingtai','companyName','JmPrice','PartNum'];
                            let disableArr=['checkbox','FactPartName','disablep','disableText'];
                            let ida=[],price=''
                            this.props.location.state.lis&&this.props.location.state.lis.map((item,index)=>{
                                ida.push(item.id)
                            })
                            if(this.props.location.state.lis){
                                // console.log(this.props.location.state.lis)
                                // console.log(this.props.location.state.lis.length+1)
                                // console.log(this.state.partsList.length)
                                for(var l in this.props.location.state.lis){
                                    var t=this.props.location.state.lis[l].checked
                                    for(var p in this.state.partsList){
                                        if(this.props.location.state.lis.length+1==this.state.partsList.length){
                                            // this.state.partsList[0].checked=t
                                            this.state.partsList[p].checked=t
                                        }else if(this.props.location.state.lis[l].id==this.state.partsList[p].id){
                                            this.state.partsList[p].checked=t
                                        }
                                    }
                                }
                            }
                            let idb=ida.join()
                            this.setState({
                                id:idb
                            })
                            this.props.location.state.lis?
                                this.setState({disAbleList:this.state.disAbleList,partsList:this.state.partsList,
                                orderArr:orderArr,disableArr:disableArr,lis:this.props.location.state.lis
                            }):this.setState({disAbleList:this.state.disAbleList,partsList:this.state.partsList,orderArr:orderArr,disableArr:disableArr
                            },this.checkChange(true,'0',''))
                        });
                        (!this.props.location.state||!this.props.location.state.xlcname) && this.setState({
                            xlcname:data.lxXlcLibraryEntity||{}
                        })
                    }
                })
            }
        })
    }

    componentDidMount(){}
    render(){
        console.log(this.props)
        console.log(this.state)
        // console.log(this.state.xlcname)
        var price=0;
        for(var i in this.state.lis){
            price+=this.state.lis[i].JmPrice*this.state.lis[i].PartNum
        }
        var sumPrice =price || this.state.price || '0'
        return(
            <div>
                <div style={{background: '#fff'}}>
                    <ul style={{background: '#fff', display: 'flex', padding: '0.2rem', alignItems: 'center'}}>
                        <li style={{width: '0.8rem', fontSize: '0.4rem'}} className="iconfonts">&#xe623;</li>
                        {!this.state.xlcname.id &&!this.state.xlcname.orgId&&!this.state.xlcname.libId ?
                            <li style={{flex: '1', lineHeight: '0.4rem'}}>修理厂</li>
                            :
                            <li style={{flex: '1', lineHeight: '0.4rem'}}>
                                <p><span style={{
                                    display: 'block',
                                    fontSize: '0.3rem',
                                    fontWeight: '600'
                                }}>{this.state.xlcname.shotName||this.state.xlcname.libShotName||this.state.xlcname.jyfw}</span></p>
                                <p style={{display: 'block', color: '#848484', marginTop: '0.08rem'}}>
                                    <span>收货人：</span><span>{this.state.xlcname.businessContact}</span><span
                                    style={{
                                        display: 'inline-block',
                                        marginLeft: '0.1rem'
                                    }}>{this.state.xlcname.businessContactTel}</span></p>
                                <p style={{display: 'block', color: '#848484'}}>
                                    <span>收获地址：</span><span>{this.state.xlcname.addr||this.state.xlcname.receiveAddress}</span></p>
                            </li>}
                        {!this.state.xlcname.id || (this.state.xlcname.id&&this.state.xlcname.libraryId) ?
                            <li style={{width: '0.5rem', fontSize: '0.4rem'}} className="iconfonts" onClick={this.address}>&#xe607;</li> : <li></li>}
                    </ul>
                    <p style={{
                        height: '0.05rem',
                        background: 'url(' + require('../../../img/bgt.png') + ') repeat'
                    }}></p>
                </div>
                <div style={{marginTop: '0.3rem', background: '#fff', padding: '0.1rem 0'}}>
                    <this.props.InfoTitle T={this} data={{key: '选择配件', Lcolor: '#5998ff'}}/>
                    <this.props.ListInfo1 checkBoxChange={this.checkChange} DataList={this.state.partsList || []}
                                         orderArr={this.state.orderArr || []}  {...this.props} T={this}/>
                    <this.props.ListInfo1 className="noBold" checkBoxChange={this.checkChange}
                                         DataList={this.state.disAbleList || []}
                                         orderArr={this.state.disableArr || []}  {...this.props} T={this}/>
                    {/* <this.props.ListInfo1 checkBoxChange={this.checkChange} unParts={this.state.unParts||[]}
                             DataList={this.state.partsList ||[]} {...this.props} T={this}/>*/}

                </div>
                <div style={{marginTop: '0.3rem', background: '#fff'}}>
                    <ul>
                        <li style={{padding: '0.25rem', borderBottom: '0.01rem solid #ddd'}} onClick={this.fangshi}>
                            <span>支付方式</span>
                            <span className="iconfonts" style={{
                                display: 'inline-block',
                                float: 'right',
                                marginRight: '0.2rem'
                            }}>&#xe607;</span>
                            <span style={{
                                display: 'inline-block',
                                float: 'right',
                                marginRight: '0.05rem',
                                color: '#878787'
                            }}>{this.state.pay=='INS' ? '微信支付' :this.state.pay=='XLCDF'?'修理厂代付':'保险直赔'}</span>
                        </li>
                        <li style={{padding: '0.25rem', borderBottom: '0.01rem solid #ddd'}}>
                            <span>配送方式</span>
                            <span style={{
                                display: 'inline-block',
                                float: 'right',
                                marginRight: '0.2rem',
                                color: '#878787'
                            }}>卖家发货</span>
                        </li>
                    </ul>
                </div>
                <div style={{marginTop: '0.3rem'}}>
                    <this.props.BaseSubmits submits={[
                        {
                            value: '合计金额: ￥' + sumPrice,
                            style: {
                                background: '#fff',
                                textAlign: 'right',
                                paddingRight: '0.25rem',
                                color: '#ff5f5f',
                                fontSize: '16px'
                            }
                        },
                        {
                            value: '提交订单',
                            style: {flex: 'none', padding: '0 1rem', background: "#f65454", fontSize: '16px'},
                            fun: this.submit
                            /* fun:()=>{this.props.history.replaceState(this.props.location.state,'/purchase/orderOk')}*/
                        }
                    ]} {...this.props} T={this}/>
                </div>
                <div className={this.state.submitDraw ? "partsBuyShow basicStyle" : "partsBuyHide basicStyle"}>
                    <div className="payMoneyTypeWrap">
                        <div>
                            <div className="payType" onClick={this.zhifubao}>
                                <img src={this.state.img1}/>
                                <span>生成支付宝付款码</span>
                            </div>
                            <div className="payType" onClick={this.weixin}>
                                <img src={this.state.img2}/>
                                <span>生成微信付款码</span>
                            </div>
                        </div>
                        <div className="cancle" onClick={this.quxiao}>取消</div>
                    </div>
                </div>
            </div>
        )
    }
}