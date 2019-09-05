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
            data: {},
            imglist:[],
            userprice:''
        };
        this.exchange=()=>{
            this.props.promptInfo({
                content:'使用'+this.state.data.goodsPrice+'积分兑换'+this.state.data.goodsName,
                Prompt:true,
                fun:()=>{
                    this.props.ajax({
                        url:'/server/lexiu3-app/business/tmxcgoodsinfo/integralChange',
                        type:'post',
                        data:{
                            token: this.props.user.data.token,
                            userId: this.props.user.data.LxAqYhxxb.id,
                            changeIntegral:this.state.data.goodsPrice,
                            changeRemark:'',
                            changeState:'2',
                            exchangeGoodsId:this.state.data.id,
                            exchangeGoodsName:this.state.data.goodsName,
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
                                        this.props.promptInfo()
                                        window.history.back(-1)
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
        console.log(this.props)
        console.log(this.props.location.state.intedate)
        var intedate=this.props.location.state.intedate
        var userprice=this.props.location.state.userprice
        console.log(intedate)
        var imglist=intedate.goodsDetailsPic
        var imgarr=imglist.split(',')
        this.setState({
            data:intedate,
            imglist:imgarr,
            userprice:userprice
        })
    }

    componentDidMount() {
        this.props.changeTitle('商品详情');

    }
    render() {
        console.log(this.state)
        return (
            <div className="recoverList">
                <div style={{width: '100%', height: '4rem',background: '#fff'}}>
                    <img src={this.state.data.goodsPic} alt="" style={{width:'100%',height:'100%'}}/>
                </div>
                <div style={{width:'100%',margin:'auto',background:'#fff',fontSize:'0.32rem',padding:'0.15rem 0'}}>
                    <div style={{width:'90%',height:'0.4rem',margin:'auto',lineHeight:'0.4rem',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                        {this.state.data.goodsName}
                    </div>
                    <div style={{width:'90%',height:'0.5rem',margin:'auto'}}>
                        <span className="fontcolor">{this.state.data.goodsPrice}积分</span>
                    </div>
                </div>
                <div style={{
                    width: '100%',
                    marginTop: '0.3rem',
                }}>
                    <h3 style={{fontSize:'0.32rem',fontWeight:'bold',
                        padding:'0.3rem 0',letterSpacing:'0.02rem',width:'90%',margin:'auto'}}>
                        商品详情
                    </h3>
                    <ul style={{paddingBottom:'0.2rem',width:'90%',marginLeft:'5%',marginBottom:'1.4rem'}}>
                        {
                            this.state.imglist[0] && this.state.imglist.map((item, index) => {
                                return (
                                    <li key={index} style={{
                                        width: '100%', margin: 'auto', border: '0', minHeight: 'auto',marginBottom:'0.02rem',
                                        backgroundColor: '#fff', boxShadow: 'none',paddingBottom:'0.2rem'
                                    }}>
                                        {/*<img src="http://beidouchaxun.cn/damagePicture/ad_msg_pic/235111-1301110T93020.jpg" alt=""/>*/}
                                        <img src={item} style={{width:'100%',height:'4rem',margin:'auto'}} alt=""/>
                                    </li>
                                )
                            })}
                    </ul>
                </div>
                <div style={{width:'100vw',height:'1.4rem',marginTop:'0.5rem',position:' fixed',bottom:'0',background:'#fff'}}>
                    {parseInt(this.state.userprice)>=parseInt(this.state.data.goodsPrice)?
                    <button onClick={this.exchange} style={{border:'0px',width:'92%',height:'1rem',position:' fixed',bottom:'0.2rem',left:'4%',background:'#F95456',color:'#fff',borderRadius:'0.5rem',fontSize:'0.32rem'}}>
                        兑换
                    </button>:<button style={{border:'0px',width:'92%',height:'1rem',position:' fixed',bottom:'0.2rem',left:'4%',background:'#ccc',color:'#EAEAEA',borderRadius:'0.5rem',fontSize:'0.32rem'}}>
                            积分不足
                        </button>}
                </div>
            </div>
        )
    }
}