import React from 'react'
import $ from 'jquery'
require('../../../css/home.css')
export default class AddAddress extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
        this.add=(item,e)=>{
            console.log(this.state.ticlist)
            console.log(item,e)
            for(var i in this.state.ticlist){
                if(this.state.ticlist[i].id==item.id){
                    console.log(this.state.ticlist[i])
                    this.state.ticlist[i].isDefault='true';
                    this.setState({
                        ticlist:this.state.ticlist[i],
                        customerTaxId:this.state.ticlist[i]
                    })
                    this.props.ajax({
                        url:'/server/lexiu1-app/api/tmxcorder/addTax?token='+this.props.user.data.token,
                        data:{id:this.state.ticlist[i].id,customerId:this.state.ticlist[i].customerId,name:this.state.ticlist[i].name,phone:this.state.ticlist[i].phone,
                            addrDetail:this.state.ticlist[i].addrDetail,isDefault:this.state.ticlist[i].isDefault},
                        suc:(result)=>{
                            console.log(result)
                        }
                    })
                    this.props.setProps({addre:{xlcname:this.state.xlcname,taskId:this.props.location.state.taskId,
                        evalId:this.props.location.state.evalId||this.state.evalId,lis:this.props.location.state.lis,pay:this.state.pay||'XLCDF',
                        customerTaxId:item.id,id:this.props.location.state.id,isChecked:this.props.location.state.isChecked
                    }})
                    // this.props.setProps({tick:{...this.props.location.state,xlcname:this.props.location.state.xlcname,
                    //     taskId:this.props.location.state.taskId,evalId:this.props.location.state.evalId,customerTaxId:item.id,
                    //     id:this.props.location.state.id,isChecked:this.props.location.state.isChecked}})
                    this.props.history.goBack();
                }else{
                    this.state.ticlist[i].isDefault='false';
                }
            }
        }

    }
    componentWillMount(){
        this.props.changeTitle('选择发票信息')
        // this.props.location.state={...this.props.location.state,...this.props.xlcname}
        console.log(this.props.user.data.LxAqYhxxb.id)
        this.props.ajax({
            url:'/server/lexiu1-app/api/tmxcorder/listTaxs?token='+this.props.user.data.token,
            data:{customerId:this.props.user.data.LxAqYhxxb.id,isDefault:''},
            suc:(data)=>{
                console.log(data)
                let list=data.list
                this.setState({
                    ticlist: list
                })
                for(var l in list){
                    if(list[l].isDefault==true){
                        this.state({
                            customerTaxId:list[l].id
                        })
                    }
                }
            }
        })
    }
    componentWillUnmount(){
        /*this.props.setProps({payWay:{...this.props.location.state,pay:this.props.location.state.pay,xlcname:this.props.location.state.xlcname,
            taskId:this.props.location.state.taskId,evalId:this.props.location.state.evalId,customerTaxId:this.state.id,
            lis:this.props.location.state.lis,id:this.props.location.state.id,isChecked:this.props.location.state.isChecked}})
   */ }
    render(){
        console.log(this.state)
        console.log(this.props)
        return(
            <div>
                {this.state.ticlist&&this.state.ticlist.map((item,index)=>{
                    return(
                        <ul key={index} style={{width:'100%',height:'100%',padding:'0.3rem 0.3rem',background:'#fff',marginTop:'0.1rem',fontSize:'0.3rem',
                            display:'flex',justifyContent:'center',alignItems:'center',...(index==this.state.ticlist.length-1 ? {marginBottom:'1.2rem'}:{})}}
                        onClick={this.add.bind(this,item)}>
                            {item.isDefault=='true'?
                                <li style={{width:'0.8rem',height:'0.45rem',background:'url('+require('../../../../../common/images/cgOk2@3x.png')+')',backgroundSize:'contain'}}></li>:<li></li>
                            }
                            {item.isDefault=='true'?<li style={{color:'#F87A7A',flex:'1',padding:'0 0.2rem'}}>
                                <p><span>{item.taxType==4?'企业':'个人'}</span></p>
                                <p><span>发票抬头：</span><span>{item.title}</span></p>
                                {item.taxType==4?<p><span>纳税人识别号：</span><span>{item.taxNumber}</span></p>:''}
                            </li>:<li style={{flex:'1'}}>
                                <p><span>{item.taxType==4?'企业':'个人'}</span></p>
                                <p><span>发票抬头：</span><span>{item.title}</span></p>
                                {item.taxType==4?<p><span>纳税人识别号：</span><span>{item.taxNumber}</span></p>:''}
                                </li>}
                        </ul>
                    )
            })}
                <div style={{position:'fixed',bottom:'0rem',background:'#fff'}}>
                    <div style={{width:'100vw',padding:'0.25rem 0'}}>
                        <button onClick={()=>{this.props.history.pushState({rechargeFor:this.state.rechargeFor},"/newtitck")}} style={{border:'0px',width:'92%',height:'0.9rem',marginLeft:'4%',background:'#3A97F7',color:'#fff',borderRadius:'0.1rem',fontSize:'0.32rem'}}>新增发票信息</button>
                    </div>
                </div>
            {/*<this.props.BaseSubmits style={{box:{padding:'0 0.3rem',marginBottom:'0.5rem'}}} submits={[{style:{borderRadius:'0.1rem',background:'linear-gradient(to right,#40A8DF,#2F6AE1)'},value:'新增发票信息',fun:()=>this.props.history.pushState({rechargeFor:this.state.rechargeFor},"/newtitck")}]} value="新增发票信息" {...this.props} />*/}
            </div>
        )
    }
}