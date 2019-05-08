import React from 'react'
import $ from 'jquery'
require('../../../css/home.css')
export default class AddAddress extends React.Component{
    constructor(props){
        super(props);
        this.state={}
        this.checkpay=(item,e)=>{

            this.props.ajax({
                url:'/server/lexiu1-app/api/tmxcorder/addTax?token='+this.props.user.data.token,
                data:{
                    id:item.id,customerId:item.customerId,name:item.name,phone:item.phone,
                    addrDetail:item.addrDetail,isDefault:true
                },
                suc:(result)=>{
                    this.state.nowDefault=item.id
                    console.log(result)
                    this.props.ajax({
                        url:'/server/lexiu1-app/api/tmxcorder/listTaxs?token='+this.props.user.data.token,
                        data:{customerId:this.props.user.data.LxAqYhxxb.id,isDefault:''},
                        suc:(data)=>{
                            console.log(data.list)
                            let list=data.list
                            console.log(list.txtNumber)
                            this.setState({
                                address:list
                            })
                        }
                    })
                }
            })


        }
        this.updata=(item,e)=>{
            this.props.history.pushState({tcklist:item},'/updatatittck')
        }
        this.delect=(item,e)=>{
            console.log(item.isDefault)
            if(item.isDefault=='true'){
                this.props.promptInfo({
                    content:'删除的是默认发票，是否确认删除',
                    Prompt:true,
                    fun:()=>{
                        this.props.ajax({
                            url:'/server/lexiu1-app/api/tmxcorder/delTax/'+item.id+'?token='+this.props.user.data.token,
                            type:'get',
                            suc:(result)=>{
                                console.log(result)
                                if(result.code='0'){
                                    this.props.ajax({
                                        url:'/server/lexiu1-app/api/tmxcorder/listAddrs?token='+this.props.user.data.token,
                                        data:{customerId:this.props.user.data.LxAqYhxxb.id,isDefault:''},
                                        suc:(data)=>{
                                            console.log(data.list)
                                            let list=data.list
                                            this.setState({
                                                address:list
                                            })
                                        }
                                    })
                                }
                            }
                        })
                        this.props.promptInfo();
                    }
                })
            }else{
                this.props.ajax({
                    url:'/server/lexiu1-app/api/tmxcorder/delTax/'+item.id+'?token='+this.props.user.data.token,
                    type:'get',
                    suc:(result)=>{
                        console.log(result)
                        if(result.code='0'){
                            this.props.ajax({
                                url:'/server/lexiu1-app/api/tmxcorder/listTaxs?token='+this.props.user.data.token,
                                data:{customerId:this.props.user.data.LxAqYhxxb.id,isDefault:''},
                                suc:(data)=>{
                                    console.log(data.list)
                                    let list=data.list
                                    this.setState({
                                        address:list
                                    })
                                }
                            })
                        }
                    }
                })
            }
        }
    }
    componentWillMount(){
        this.props.changeTitle('发票管理')
        console.log(this.props.user.data.LxAqYhxxb.id)
        this.props.ajax({
            url:'/server/lexiu1-app/api/tmxcorder/listTaxs?token='+this.props.user.data.token,
            data:{customerId:this.props.user.data.LxAqYhxxb.id,isDefault:''},
            suc:(data)=>{
                console.log(data.list)
                let list=data.list
                console.log(list.txtNumber)
                this.setState({
                    address:list
                })
            }
        })
    }
    render(){
        console.log(this.state.address)

        return(
            <div>
                {this.state.address&&this.state.address.map((item,index)=>{
                    return(
                        <ul style={{width:'100%',height:'100%',fontSize:'0.28rem',background:'#fff',marginTop:'0.1rem',...(index==this.state.address.length-1 ? {marginBottom:'1.2rem'}:{})}}>
                            {item.taxType==3?<li style={{border:'none',padding:'0.2rem 0.3rem'}}>个人</li>:<li style={{border:'none',padding:'0.2rem 0.3rem'}}>企业</li>}
                            <li style={{border:'none',padding:'0.2rem 0.3rem',paddingTop:'0',flex:'inherit'}}><span style={{flex:'inherit'}}>发票抬头：</span><span style={{color:'#212121'}}>{item.title}</span></li>
                            {item.taxType==3?<li></li>:<li style={{border:'none',padding:'0.2rem 0.3rem',paddingTop:'0',flex:'inherit'}}><span style={{flex:'inherit'}}>纳税人识别号：</span><span style={{color:'#212121'}}>{item.taxNumber}</span></li>}
                            <li style={{padding:'0.2rem',borderTop:'0.01rem solid #F6F6F6',display: 'flex'}}>
                                <p style={{display: 'flex'}} onClick={this.checkpay.bind(this, item)}>
                                    <label style={{
                                        display: 'inline-block', width: '0.3rem', height: '0.3rem',
                                        ...(this.state.nowDefault == item.id || (item.isDefault == 'true' &&!this.state.nowDefault)?
                                                {background: 'url(' +
                                                require('../../../img/checked.png')  + ') no-repeat center/cover'}
                                                :
                                                {background: 'url(' +
                                                require('../../../img/nochecked.png') + ') no-repeat center/cover'}
                                        )


                                    }}></label>
                                    {/*<input style={{float:'right',width:'0.3rem',height:'0.3rem',display:'none'}}  checked
                                           type="checkbox" name="pay" value={item.value} refs={item.value} />*/}
                                    <span style={{marginLeft: '0.2rem',fontSize:'0.26rem'}}>设为默认</span>
                                </p>
                                <p style={{height:'0.3rem',display:'flex',marginLeft:'3rem'}} onClick={this.updata.bind(this,item)}><span style={{display:'inline-block',width:'0.3rem',height:"0.3rem",backgroundImage:'url('+require('../../../img/updata.png')+')',backgroundSize:'contain'}}></span><span style={{marginLeft:'0.1rem',fontSize:'0.26rem',color:'#212121'}}>编辑</span></p>
                                <p style={{height:'0.3rem',display:'flex',marginLeft:'0.4rem'}} onClick={this.delect.bind(this,item)}><span style={{display:'inline-block',width:'0.28rem',height:"0.31rem",backgroundImage:'url('+require('../../../img/delect.png')+')',backgroundSize:'contain'}}></span><span style={{marginLeft:'0.1rem',fontSize:'0.26rem',color:'#212121'}}>删除</span></p>
                            </li>
                        </ul>
                    )
                })}
                <div style={{width:'100vw',height:'1.3rem',position:' fixed',bottom:'0',background:'#fff'}}>
                    <button onClick={()=>this.props.history.pushState(this.props.location.state,'/newtitck')} style={{border:'0px',width:'92%',height:'0.9rem',position:' fixed',bottom:'0.2rem',left:'4%',background:'linear-gradient(to right,#40A8DF,#2F6BE1)',color:'#fff',borderRadius:'0.1rem',fontSize:'0.32rem'}}>新增发票信息</button>
                </div>
            </div>
        )
    }
}