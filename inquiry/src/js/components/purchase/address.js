import React from 'react'
import $ from 'jquery'
require('../../../css/home.css')
export default class AddAddress extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
        this.submit=()=>{
            this.props.setProps({
                list:false,
                payWay:false,
                ssq:false
            })
            this.props.history.pushState(null,'/newaddress')
            /*this.props.history.pushState({taskId:this.props.location.state.taskId,
                pay:this.props.location.state.pay?this.props.location.state.pay:'XLCDF',
                evalId:this.props.location.state.evalId||this.state.evalId,
                lis:this.state.lis,xlcname:this.state.xlcname,id:this.state.id,
                isChecked:this.state.isChecked},"/newaddress")*/
        }
        this.add=(item,e)=>{
            console.log(this.props)
            console.log(item,e)
            // this.state.address[index].isDefault=true
            // this.setState({
            //     xlcname:this.state.address[index]
            // })
            for(var i in this.state.address){
                console.log(this.state.address[i].id==item.id)
                if(this.state.address[i].id==item.id){
                    console.log(this.state.address[i])
                    this.state.address[i].checked='true';
                    this.setState({
                        xlcname:this.state.address[i]
                    })
                    console.log(this.state.name)
                    this.props.setProps({addre:{xlcname:this.state.address[i],taskId:this.props.addre.taskId,
                        evalId:this.props.addre.evalId||this.state.evalId,lis:this.props.addre.lis,pay:this.props.addre.pay||'XLCDF',
                        customerTaxId:this.props.addre.customerTaxId,id:this.props.addre.id
                    }})
                    // this.props.setProps({addre:{taskId:this.props.addre.taskId,pay:this.props.addre.pay||'XLCDF',evalId:this.props.addre.evalId,
                    //    xlcname:this.state.address[i],id:this.props.addre.id,isChecked:this.props.addre.isChecked,isClick:true,customerTaxId:this.props.addre.customerTaxId}})
                    // this.props.ajax({
                    //     url:'/server/lexiu1-app/api/tmxcorder/addAddrs?token='+this.props.user.data.token,
                    //     data:{id:this.state.address[i].id,customerId:this.state.address[i].customerId,name:this.state.address[i].name,phone:this.state.address[i].phone,
                    //         addrDetail:this.state.address[i].addrDetail,isDefault:this.state.address[i].isDefault},
                    //     suc:(result)=>{
                    //         console.log(result)
                    //     }
                    // })
                    // this.props.setProps({payWay:{...this.props.location.state,pay:this.props.location.state.pay,xlcname:this.props.location.state.xlcname,
                    //     taskId:this.props.location.state.taskId,evalId:this.props.location.state.evalId,
                    //     lis:this.props.location.state.lis,id:this.props.location.state.id,isChecked:this.props.location.state.isChecked}})
                    this.props.history.goBack();
                }else{
                    this.state.address[i].checked='false';
                }
            }
        }

    }
    componentWillMount(){
        this.props.changeTitle('收货地址')
        // this.props.location.state={...this.props.location.state,...this.props.xlcname}
        console.log(this.props.user.data.LxAqYhxxb.id)
        console.log(this.props)
        let list=[]
        this.props.ajax({
            url:'/server/lexiu1-app/api/tmxcorder/listAddrs?token'+this.props.user.data.token,
            data:{customerId:this.props.user.data.LxAqYhxxb.id,isDefault:''},
            suc:(data)=>{
                console.log(data.list)
                list=data.list
                for(var i in list){
                    console.log(list[i].isDefault=='true')
                    if(this.props.addre.xlcname.checked){
                        if(this.props.addre.xlcname.id==list[i].id){
                            list[i].checked='true'
                        }else{
                            list[i].checked='false'
                        }
                    }else{
                        if(list[i].isDefault=='true'){
                            console.log('q')
                            list[i].checked='true'
                        }else{
                            list[i].checked='false'
                        }
                    }
                }
                this.setState({
                    address: list
                })
            }
        })
    }
    /*componentDidMount(){
        var list=this.state.address
        if(this.props.addre){
             if(this.props.addre.xlcname){
                 if(this.props.addre.xlcname.checked){
                     for(var i in list){
                         if(list[i].id==this.props.addre.xlcname.id){
                             list[i].checked=true
                         }else{
                             list[i].checked=false
                         }
                     }
                 }
             }else{
                 for(var i in list){
                     if(list[i].isDefault==true){
                         list[i].checked=true
                     }else{
                         list[i].checked=false
                     }
                 }
             }
        }
        this.setState({
            address: list
        })
    }*/
    render(){
        console.log(this.state)
        console.log(this.props)
        return(
            <div>
                {this.state.address&&this.state.address.map((item,index)=>{
                    console.log(item)
                    console.log(item.checked=='true')
                    return(
                        <ul key={index} style={{width:'100%',height:'100%',padding:'0.3rem 0.1rem',background:'#fff',marginTop:'0.1rem',
                            fontSize:'0.3rem',display:'flex',justifyContent:'center',alignItems:'center',...(index==this.state.address.length-1 ? {marginBottom:'1.2rem'}:{})}}
                        onClick={this.add.bind(this,item)}>
                            {item.checked=='true'?
                                <li style={{width:'0.8rem',height:'0.45rem',background:'url('+require('../../../../../common/images/cgOk2@3x.png')+')',backgroundSize:'contain'}}></li>:<li></li>
                            }
                            {item.checked=='true'?<li style={{color:'#F87A7A',flex:'1',padding:'0 0.2rem'}}>
                                <p style={{}}><span>{item.name}</span><span style={{float:'right'}}>{item.phone}</span></p>
                                <p style={{}}>{item.addr1}{item.addr2}{item.addr3}{item.addrDetail}</p>
                            </li>:<li style={{flex:'1'}}>
                                    <p style={{padding:'0.2rem'}}><span>{item.name}</span><span style={{float:'right'}}>{item.phone}</span></p>
                                    <p style={{padding:'0 0.2rem 0.2rem 0.2rem'}}>{item.addr1}{item.addr2}{item.addr3}{item.addrDetail}</p>
                                </li>}
                        </ul>
                    )
            })}
            {/*<this.props.BaseSubmits style={{box:{padding:'0 0.3rem',marginBottom:'0.5rem'}}} submits={[{style:{borderRadius:'0.1rem',background:'linear-gradient(to right,#40A8DF,#2F6AE1)'},value:'添加新地址',
                fun:()=>this.props.history.pushState({taskId:this.props.location.state.taskId,
                    pay:this.props.location.state.pay?this.props.location.state.pay:'XLCDF',
                    evalId:this.props.location.state.evalId||this.state.evalId,
                lis:this.state.lis,xlcname:this.state.xlcname,id:this.state.id,
                    isChecked:this.state.isChecked},"/newaddress")}]} value="添加新地址" {...this.props} />*/}
                <div style={{position:'fixed',bottom:'0rem',background:'#fff'}}>
                    <div style={{width:'100vw',padding:'0.25rem 0'}}>
                        <button onClick={this.submit} style={{border:'0px',width:'92%',height:'0.9rem',marginLeft:'4%',background:'#3A97F7',color:'#fff',borderRadius:'0.1rem',fontSize:'0.32rem'}}>添加新地址</button>
                    </div>
                </div>
            </div>
        )
    }
}