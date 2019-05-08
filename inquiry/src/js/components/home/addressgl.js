import React from 'react'
import $ from 'jquery'
require('../../../css/home.css')
export default class AddAddress extends React.Component{
    constructor(props){
        super(props);
        this.state={}
       /* this.add=(item,e)=>{
            console.log("0123456")
            console.log(item,e)
            for(var i in this.state.address){
                console.log(this.state.address[i].id==item.id)
                if(this.state.address[i].id==item.id){
                    console.log(this.state.address[i])
                    this.state.address[i].isDefault='true';
                    this.setState({
                        xlcname:this.state.address[i]
                    })
                }else{
                    this.state.address[i].isDefault='false';
                }
            }
        }*/
        this.submit=()=>{
            this.props.setProps({
                list:false,
                payWay:false,
                ssq:false
            })
            this.props.history.pushState('','/newaddress')
        }
        this.checkpay=(item,e)=>{

                this.props.ajax({
                    url:'/server/lexiu1-app/api/tmxcorder/addAddrs?token='+this.props.user.data.token,
                    data:{
                        id:item.id,customerId:item.customerId,name:item.name,phone:item.phone,
                        addrDetail:item.addrDetail,isDefault:true
                    },
                    suc:(result)=>{
                        this.state.nowDefault=item.id
                        console.log(result)
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
                })
        }
        this.updata=(item,e)=>{
            console.log(item)
            this.props.history.pushState({addlist:item},'/updataaddress')
        }
        this.delect=(item,e)=>{
            console.log(item)
            if(item.isDefault=='true'){
                this.props.promptInfo({
                    content:'删除的是默认地址，是否确认删除',
                    Prompt:true,
                    fun:()=>{
                        this.props.ajax({
                            url:'/server/lexiu1-app/api/tmxcorder/delAddrs/'+item.id+'?token='+this.props.user.data.token,
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
                    url:'/server/lexiu1-app/api/tmxcorder/delAddrs/'+item.id+'?token='+this.props.user.data.token,
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
            }
        }
    }
    componentWillMount(){
        this.props.changeTitle('地址管理')
        console.log(this.props.user.data.LxAqYhxxb.id)
        this.props.ajax({
            url:'/server/lexiu1-app/api/tmxcorder/listAddrs?token='+this.props.user.data.token,
            data:{customerId:this.props.user.data.LxAqYhxxb.id,isDefault:''},
            suc:(data)=>{
                console.log(data.list)
                let list=data.list
                this.setState({
                    address:list
                })
                /*if(list[i].isDefault=='true'||list[j].isDefault=='true'){
                                list[j].isDefault='true'
                                liat.unshift(list[j])
                            }else{
                                liat.push(list[i])
                            }*/
                /*for(var i=0;i<liat.length;i++){
                    var flag = true;
                    for(var j=0;j<lilt.length;j++){
                        if(liat[i].addr1Id == lilt[j].addr1Id){
                            flag = false;
                        };
                    };
                    if(flag){
                        lilt.push(liat[i]);
                    };
                };
                console.log(lilt)*/
                /*this.setState({
                        address:lilt
                })*/
            }
        })
    }
    render(){
        console.log(this.state)
        return(
            <div>
                {this.state.address&&this.state.address.map((item,index)=> {
                    return (
                        <ul key={index}
                            style={{width: '100%', height: '100%',fontSize:'0.28rem', background: '#fff', marginTop: '0.1rem',...(index==this.state.address.length-1 ? {marginBottom:'1.2rem'}:{})}}>
                            <li style={{padding: '0.2rem'}}><span>{item.name}</span><span
                                style={{float: 'right'}}>{item.phone}</span></li>
                            <li style={{padding: '0 0.2rem 0.2rem 0.2rem'}}>
                                <p>{item.addr1}{item.addr2}{item.addr3}{item.addrDetail}</p></li>
                            <li style={{padding: '0.2rem', borderTop: '0.01rem solid #F6F6F6', display: 'flex'}}>
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
                                {/*{item.isDefault=='true'?<p style={{display:'flex'}}><input type="radio" style={{width:'0.3rem',height:'0.3rem'}} checked="checked" value="设为默认" onClick={this.add.bind(this,item)}/><span style={{marginLeft:'0.1rem',fontSize:'0.24rem',color:'#212121'}}>设为默认</span></p>:
                                    <p style={{display:'flex'}}><input type="radio" style={{width:'0.3rem',height:'0.3rem'}}  value="设为默认" onClick={this.add.bind(this,item)}/><span style={{marginLeft:'0.1rem',fontSize:'0.24rem',color:'#212121'}}>设为默认</span></p>
                                }*/}
                                <p style={{height: '0.3rem', display: 'flex', marginLeft: '3rem'}}
                                   onClick={this.updata.bind(this, item)}><span style={{
                                    display: 'inline-block',
                                    width: '0.3rem',
                                    height: "0.3rem",
                                    backgroundImage: 'url(' + require('../../../img/updata.png') + ')',
                                    backgroundSize: 'contain'
                                }}></span><span
                                    style={{marginLeft: '0.1rem', fontSize: '0.26rem', color: '#212121'}}>编辑</span></p>
                                <p style={{height: '0.3rem', display: 'flex', marginLeft: '0.4rem'}}
                                   onClick={this.delect.bind(this, item)}><span style={{
                                    display: 'inline-block',
                                    width: '0.28rem',
                                    height: "0.31rem",
                                    backgroundImage: 'url(' + require('../../../img/delect.png') + ')',
                                    backgroundSize: 'contain'
                                }}></span><span
                                    style={{marginLeft: '0.1rem', fontSize: '0.26rem', color: '#212121'}}>删除</span></p>
                            </li>
                        </ul>
                    )
                })}
                <div style={{width:'100vw',height:'1.3rem',position:' fixed',bottom:'0',background:'#fff'}}>
                    <button onClick={this.submit} style={{border:'0px',width:'92%',height:'0.9rem',position:' fixed',bottom:'0.2rem',left:'4%',background:'linear-gradient(to right,#40A8DF,#2F6BE1)',color:'#fff',borderRadius:'0.1rem',fontSize:'0.32rem'}}>添加新地址</button>
                </div>
            </div>
        )
    }
}