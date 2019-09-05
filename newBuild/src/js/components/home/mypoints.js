import React from 'react';
import $ from 'jquery';

require('../../../css/message.css')
import {LoadList} from '../../../../../common/assembly/Logical'
import {DSYButton} from '../../../../../common/assembly/someAssembly'

/**残件列表**/
export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            intedata:{},
            phoneimg:require('../../../img/tel.png')
        };
        this.callphone=()=>{
            window.location.href = "tel://" + "4000022298";
        }
        this.intedetail=(item)=>{
            this.props.history.pushState({intedate:item,userprice:this.state.inteprice},'/intedetail')
        }
        this.exchange=(item)=>{
            this.props.promptInfo({
                content:'使用'+item.goodsPrice+'积分兑换'+item.goodsName,
                Prompt:true,
                fun:()=>{
                    this.props.ajax({
                        url:'/server/lexiu3-app/business/tmxcgoodsinfo/integralChange',
                        type:'post',
                        data:{
                            token: this.props.user.data.token,
                            userId: this.props.user.data.LxAqYhxxb.id,
                            changeIntegral:item.goodsPrice,
                            changeRemark:'',
                            changeState:'2',
                            exchangeGoodsId:item.id,
                            exchangeGoodsName:item.goodsName,
                            exchangeType:'0'
                        },
                        suc:(dat)=>{
                            console.log(dat)
                            if(dat.code==0){
                                this.props.promptInfo({
                                    content: '兑换成功',
                                    Prompt: true,
                                    onlyOK: true,
                                    fun:()=>{
                                        this.props.ajax({
                                            url:'/server/lexiu3-app/business/tmxcuserintegralinfo/userIntegralAndGoodsInfo',
                                            type:'post',
                                            data:{
                                                token: this.props.user.data.token,
                                                userId: this.props.user.data.LxAqYhxxb.id
                                            },
                                            suc:(dat)=>{
                                                console.log(dat)
                                                if(dat.code==0){
                                                    this.setState({
                                                        data: dat.goodsInfo,
                                                        intedata:dat.tmxcUserIntegralInfoList[0],
                                                        inteprice:dat.tmxcUserIntegralInfoList[0].userRemainderIntegral,
                                                        loadingOk:true,
                                                        tishiyu:this.props.ErrorShow({type:'zanwu',content:'暂无可兑换商品'})
                                                    })
                                                }
                                            }
                                        })
                                        this.props.promptInfo()
                                    }
                                })
                            }
                        }
                    })
                    this.props.promptInfo()
                },
            })
        }
    }


    componentWillMount() {
    }

    componentDidMount() {
        this.props.changeTitle('我的积分');
        this.props.ajax({
            url:'/server/lexiu3-app/business/tmxcuserintegralinfo/userIntegralAndGoodsInfo',
            type:'post',
            data:{
                token: this.props.user.data.token,
                userId: this.props.user.data.LxAqYhxxb.id
            },
            suc:(dat)=>{
                console.log(dat)
                if(dat.code==0){
                    this.setState({
                        data: dat.goodsInfo,
                        intedata:dat.tmxcUserIntegralInfoList[0],
                        inteprice:dat.tmxcUserIntegralInfoList[0].userRemainderIntegral,
                        loadingOk:true,
                        tishiyu:this.props.ErrorShow1({type:'zanwu',content:'暂无可兑换商品'})
                    })
                }
            }
        })
    }
    render() {
        console.log(this.state)
        return (
            <div className="recoverList" style={{background: '#fff'}}>
                <div>
                    <div style={{width: '100%', height: '6rem', background: 'linear-gradient(#74ACFF,#4F88F0)'}}>
                       <div style={{height: '3rem', textAlign: 'center'}}>
                           <div style={{paddingTop: '1rem', color: '#fff'}}>现有积分</div>
                           <div style={{color: '#fff', fontSize: '0.66rem'}}>
                               {this.state.intedata.userRemainderIntegral}
                               </div>
                       </div>
                    </div>
                    <div style={{
                        width: '90%',
                        background: '#fff',
                        borderRadius: '0.3rem 0.3rem 0 0',
                        float:'left',
                        marginLeft:'5%',
                        marginTop: '-3rem',
                    }}>
                        {this.state.data[0] ?<div>
                            <h3 style={{textAlign: 'center',fontSize:'0.32rem',fontWeight:'bold',padding:'0.3rem 0',letterSpacing:'0.02rem'}}>
                                积分兑换商品
                            </h3>
                            <ul style={{float:'left',width:'100%'}}>
                                {this.state.data.map((item, index) => {
                                    return (
                                    <li key={index} style={{
                                        width: '50%', margin: 'auto', border: '0', minHeight: 'auto',marginBottom:'0.02rem',
                                        backgroundColor: '#fff', boxShadow: 'none', height: '3.3rem',float:'left'
                                    }}>
                                    {/*<img src="http://beidouchaxun.cn/damagePicture/ad_msg_pic/235111-1301110T93020.jpg" alt=""/>*/}
                                    <img onClick={this.intedetail.bind(this,item)} src={item.goodsPic} style={{width:'90%',height:'2rem',margin:'auto'}} alt=""/>
                                    <div style={{width:'90%',height:'0.5rem',margin:'auto',lineHeight:'0.5rem',fontSize:'0.3rem',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{item.goodsName}</div>
                                    <div style={{width:'90%',height:'0.8rem',margin:'auto',display:'flex',alignItems:'center'}}>
                                    <span className="fontcolor" style={{flex:'1'}}>{item.goodsPrice}积分</span>
                                    <span style={{display:'inline-block', width:'40%'}}>
                                    {parseInt(this.state.inteprice)>=parseInt(item.goodsPrice)?<span style={{border:'1px solid red',color:'red',display:'inline-block',
                                        padding:'0.05rem 0.25rem',borderRadius:'0.25rem'}} onClick={this.exchange.bind(this,item)}>
                                                        兑换
                                        </span>:<span style={{border:'1px solid #ccc',color:'#B8B8B8',display:'inline-block',
                                        padding:'0.05rem 0.25rem',borderRadius:'0.25rem'}}>兑换</span>}</span>
                                    </div>
                                    </li>
                                    )
                                })}
                                </ul>
                            </div>: this.state.loadingOk && this.state.tishiyu}
                        </div>
                    </div>
                <div style={{position:'fixed',bottom:'1rem',right:'0.8rem',width:'1.5rem'}}>
                    <img src={this.state.phoneimg} alt="" style={{width:'100%',height:'100%'}} onClick={this.callphone}/>
                </div>
            </div>
        )
    }
}