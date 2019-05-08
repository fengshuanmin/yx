import React from 'react'
import $ from 'jquery'
import {DSYButton} from '../../../../../common/assembly/someAssembly'
import {BaseLi,UserHeader} from '../../../../../common/assembly/Stateless'
import wxConfig from '../../../../../config/WXConfig'
import {SSOK} from '../../common/Stateless'
require('../../../css/app.css')

export default class CarList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            istData:[],
            money:[],
            token:'',
            dingDan:[{name:'待付款',background:{background:'url('+require('../../../img/daifukuan2.png')+') no-repeat center'}},
                {name:'待发货',background:{background:'url('+require('../../../img/daifahuo2.png')+') no-repeat center'}},
                {name:'待收货',background:{background:'url('+require('../../../img/daishouhuo2.png')+') no-repeat center'}},
                {name:'已完成',background:{background:'url('+require('../../../img/yiwancheng2.png')+') no-repeat center'}},
                {name:'退换货',background:{background:'url('+require('../../../img/tuihuanhuo2.png')+') no-repeat center'}}]
        };
        this.saoSao=()=>{
            wx.scanQRCode({
                needResult: 1,
                desc: 'scanQRCode desc',
                success:  (res)=>{
                    var result = res.resultStr;
                    result=unescape(result.replace(/Zu/g,'%u'));
                    result=JSON.parse(result);
                    this.props.history.pushState(result, "/couponDetails");
                    // this.loding(result)
                }
            });
        }
        this.gomess=()=>{
            console.log(this.props)
            console.log(this.state)
            this.props.ajax({
                url:'/server/lexiu3-app/business/tmxcmsguserreadinfo/save',
                data:{token:this.props.user.data.token,showChannel:'3'},
                suc:(data)=>{
                    console.log(data)
                    if(data.code=='0'){
                        this.props.history.pushState(null, "/message")
                    }
                }
            })
        }
    }
    componentWillMount(){
        this.props.ajax({
            url:'/server/lexiu3-app/business/tmxcmsginfo/queryUserNotReadMsg',
            data:{token:this.props.user.data.token,showChannel:'3',showRoleType:'0'},
            suc:(data)=>{
                console.log(data)
                if(data.code=='0'){
                    this.setState({
                        mesglistsize:data.tmxcMsgInfoListSize
                    })
                }
            }
        })
    }
    /*showmsg(result) {
		// console.log(result)
        var balance=result.wallet.balance;
        var deposit=result.wallet.deposit;
        // console.log(balance)
        // console.log(deposit)
        this.setState({
            money:[{money:balance,color:{color:'blue'},name:'佣金',rechargeFor:2},{money:deposit,color:{color:'green'},name:'压金',rechargeFor:1},{money:'120',color:{color:'red'},name:'注销券'}]
        })
    }*/
    componentDidMount(){
        this.props.project.changeTitle('个人中心');
        if(this.props.location.state=='mp'){
            this.saoSao();
        }
        this.setState({
            token:this.props.user.data.token
        })
        console.log(this.state)
        var token=this.props.user.data.token
        console.log(token)
        // this.props.ajax({
        //     loading:true,
        //     url: "/server/lexiu-app/api/librarywallet/info?token="+this.props.user.data.token,
        //     type:'get',
        //     data:{},
        //     suc:(result)=>{
        //         // this.showmsg(result)
        //         console.log(result)
        //     }
        // })
        /*$.ajax({
            url:"/server/lexiu-app/api/librarywallet/info?token="+this.props.user.data.token,
            type:'get',
            data:{},
            dataType: "json",
            success:(msg)=>{
                this.showmsg(msg)
                console.log(msg)
            }
        })*/

        // this.props.ajax({
        //     loading: true,
        //     url: '/lexiugo-app/weixin/analysisVinPhoteByOcr',
        //     data: {lossNo: '', serverId: id},
        //     suc: (msg) => {
        //
        //        }
        //     })
    }
    render() {
        console.log(this.state)
        console.log(this.props)
        return(
            <div>
                <div style={{background:'#fff',marginBottom:'0.2rem'}}>
                    <this.props.UserHeader style={{U:{marginBottom:'0'}}} {...this.props}/>
                    {/*<ul className="payList">
                        {
                            this.state.money.map((item,index)=>{
                                return(
                                    <li key={index} onClick={()=>this.props.history.pushState({index:index+1,...item,rechargeFor:item.rechargeFor},'/pay')}>
                                        <span>
                                            <em style={item.color}>{item.money}</em>
                                            {index==2 ? ' 张':' 元'}
                                        </span>
                                        <span>{item.name}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>*/}
                </div>
                {/*<div style={{background:'#fff',marginBottom:'0.2rem'}}>*/}
                    {/*<ul style={{display:'flex',padding:'0.2rem 0.3rem'}}>*/}
                        {/*<li style={{flex:'1',fontSize:'0.3rem',fontWeight:'600'}}>我的订单</li>*/}
                        {/*<li style={{width:'1.2rem'}} onClick={()=>this.props.history.pushState(null,'/dingdan')}>全部订单</li>*/}
                        {/*<li className="iconfonts" style={{width:'0.3rem'}} onClick={()=>this.props.history.pushState(null,'/dingdan')}>&#xe607;</li>*/}
                    {/*</ul>*/}
                    {/*<ul style={{display:'flex'}}>*/}
                        {/*{*/}
                            {/*this.state.dingDan.map((item,index)=>{*/}
                                {/*return(*/}
                                    {/*<li key={index} style={{flex:'1',paddingBottom:'0.1rem',display:'flex',flexDirection:'column',textAlign:'center'}} onClick={()=>this.props.history.pushState(null,'/CLIS')}>*/}
                                        {/*<span style={{display:'block',width:'100%',marginLeft:'0.25rem',height:'75%'}}>*/}
                                            {/*<span className="zp" style={item.background}></span>*/}
                                        {/*</span>*/}
                                        {/*<span>{item.name}</span>*/}
                                    {/*</li>*/}
                                {/*)*/}
                            {/*})*/}
                        {/*}*/}
                    {/*</ul>*/}
                {/*</div>*/}
                <this.props.BaseLi data={[{
                    Style:{ico:'&#xe61a;',S:{color:'#97989b'}},
                    key:'扫码用券',
                    fun:this.saoSao
                },{
                    Style:{ico:'&#xe617;',S:{color:'#97989b'}},
                    key:'查看历史优惠券',
                    fun:()=>this.props.history.pushState(null,'/couponHistory')
                },
                ]} {...this.props}/>
                {/*<ul>
                    <li onClick={this.gomess} style={{padding:'0.2rem 0.3rem'}}>
                        <span className="iconfonts imgIcon"></span>
                        <span className="rightTopBorder">
                                消息
                                <span style={{float:'right'}}>
                                    {this.state.mesglistsize>0?<span className="mesbacred">
                                        {this.state.mesglistsize}</span>:''}
                                    <span className="iconfonts">&#xe607;</span>
                                </span>
                            </span>
                    </li>
                </ul>*/}
                <ul className="baseLi" style={{marginBottom:'0.3rem'}}>
                    <li className="style1 imgIcons" style={{position:'relative'}} onClick={this.gomess}>
                        <span className="iconfonts imgIcon"></span>
                        <div className="LiTRight" style={{borderTop:'1px solid #f0f0f0'}}>
                            <div className="onece" style={{display:'block',paddingRight:'0.3rem'}}>
                                <span className="listValue" style={{flex:'none'}}>消息</span>
                                <span style={{float:'right',position:'relative',display:'table-cell',verticalAlign:'middle'}}>
                                    {this.state.mesglistsize>0?<span className="mesbacredq">
                                        {this.state.mesglistsize}</span>:''}
                                    <span className="iconfonts">&#xe607;</span>
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
                <this.props.BaseLi data={
                    [{
                        Style:{ico:'&#xe70c;',ico2:'&#xe607;',S:{color:'#97989b'}},
                        key:'设置',
                        path:'/SetUp'
                    }]
                } {...this.props}/>
                <DSYButton  ButtonFrom="XLC" T={this} on={'home'}/>
            </div>
        )
    }
}