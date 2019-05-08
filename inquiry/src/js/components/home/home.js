/**个人中心**/
import React from 'react';
import $ from "jquery";
import ChangeTitle from '../../../../../common/baseFun/someEvent'
import {DSYButton} from '../../../../../common/assembly/someAssembly'
require('../../../css/home.css')
export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            myJF:{nt:''},
            dingDan:[{name:'待付款',where:100,background:{backgroundImage:'url('+require('../../../img/daifukuan.png')+')'}},
                {name:'待发货',where:101,background:{backgroundImage:'url('+require('../../../img/daifahuo.png')+')'}},
                {name:'待收货',where:102,background:{backgroundImage:'url('+require('../../../img/daishouhuo.png')+')'}},
                {name:'已完成',where:103,background:{backgroundImage:'url('+require('../../../img/yiwancheng.png')+')'}}
                /* {name:'退换货',where:104,background:{background:'url('+require('../../../img/tuihuanhuo.png')+') no-repeat center'}}*/]
        };
        this.howShow = (dat) => {
            if (dat > 80) {
                return 'UpShow'
            }
        }
        this.getIntegral=()=>{
            $.post('/lexiugo-app/weixin/getCurrUserRank',{userId:this.props.project.user.data.LxAqYhxxb.id,countType:1},(data)=>{
                this.setState({myJF:data.data.currUserRank});
            })
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
    componentDidMount(){
        ChangeTitle.ChangeTitle('个人中心');
        this.getIntegral();
    }
    componentWillMount(){
        this.props.ajax({
            url:'/server/lexiu3-app/business/tmxcmsginfo/queryUserNotReadMsg',
            data:{token:this.props.user.data.token,showChannel:'3',showRoleType:'9'},
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
    render() {
        console.log(this.state.dingDan)
        return (
            <div>
                <div className="DSYHome">
                    <ul>
                        <li>
                            <span className="img"><img src={this.state.myJF && this.state.myJF.headImgUrl} alt=""/></span>
                            <span>
                                <h4>{this.props.project.user.data.LxAqYhxxb.username}</h4>
                                <p>
                                    <span>当前积分:<span style={{color:"#fa4b4c",fontWeight:600}}>{this.state.myJF && this.state.myJF.currIntegralSum||0}</span></span>
                                    <span>总积分:<span style={{fontWeight:600}}>{this.state.myJF && this.state.myJF.totalGetSum||0}</span></span></p>
                            </span>
                        </li>
                    </ul>
                    <div style={{background:'#fff',marginTop:'0.2rem'}}>
                        <ul style={{display:'flex',padding:'0.2rem 0.3rem',borderBottom:' 0.01rem solid #e9e9e9'}}>
                            <li style={{flex:'1',fontSize:'0.3rem',padding:'0'}}>我的订单</li>
                            <li style={{float:'right',padding:'0',fontSize:'0.3rem',color:'#999'}} onClick={()=>this.props.history.pushState({a:true,where:''},'/dingdan/list')}>全部订单</li>
                            <li className="iconfonts" style={{
                                float:'right',width:'0.3rem',padding:'0',color:'#999'}} onClick={()=>this.props.history.pushState({a:true,where:''},'/dingdan/list')}>&#xe607;</li>
                        </ul>
                        <ul style={{display:'flex'}}>
                            {
                                this.state.dingDan.map((item,index)=>{
                                    return(
                                    <li key={index} style={{flex:'1',paddingBottom:'0.1rem',fontSize:'0.28rem',display:'flex',flexDirection:'column',textAlign:'center'}} onClick={()=>this.props.history.pushState({a:true,where:item.where},'/dingdan/list')}>
                                        <span style={{display:'block',width:'80%',height:'65%'}}>
                                            <span className="zp" style={item.background}></span>
                                        </span>
                                        <span>{item.name}</span>
                                    </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    {/*<ul className="icoLeft">
                        <li onClick={()=>{this.props.history.pushState({myJF:this.state.myJF}, "/integral");}}>
                            <span className="iconfonts imgIcon"></span>
                            <span className="rightTopBorder">积分榜</span>
                        </li>
                        <li onClick={()=>{this.props.history.pushState(null, "/IntegralRecord");}}>
                            <span className="iconfonts imgIcon"></span>
                            <span className="rightTopBorder">积分记录</span>
                        </li>
                    </ul>*/}
                    <ul className="icoLeft">
                        <li onClick={()=>{this.props.history.pushState(null, "/person");}}>
                            <span className="iconfonts GR"></span>
                            <span className="rightTopBorder">
                                个人信息<span className="iconfonts" style={{float:'right'}}>&#xe607;</span>
                            </span>
                        </li>
                        <li onClick={this.gomess}>
                            <span className="iconfonts imgIcon"></span>
                            <span className="rightTopBorder">
                                消息
                                <span style={{float:'right',position:'relative'}}>
                                    {this.state.mesglistsize>0?<span className="mesbacred">
                                        {this.state.mesglistsize}</span>:''}
                                    <span className="iconfonts">&#xe607;</span>
                                </span>
                            </span>
                        </li>
                    </ul>
                    <div className="shezhi" onClick={()=>{this.props.history.pushState(null, "/SetUp");}}>
                        <span className="iconfonts">&#xe70c;</span>
                        <span>设置</span>
                    </div>
                </div>
                <DSYButton ButtonFrom="Mys" T={this} on={'home'} {...this.props}/>
            </div>
        )
    }
}