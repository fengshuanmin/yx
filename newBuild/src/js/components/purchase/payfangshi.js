import React from 'react'
require('../../../css/home.css')
export default class Info extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state={
            nochecked:{background:'url('+require('../../../img/nochecked.png')+') no-repeat center/cover'},
            checked:{background:'url('+require('../../../img/checked.png')+') no-repeat center/cover'},
            payList:[{name:'修理厂代付',value:'XLCDF',background:{background:'url('+require('../../../img/xlcdaifu.png')+') no-repeat center/cover'}},
                {name:'微信支付',value:'INS',background:{background:'url('+require('../../../img/weixinpay.png')+') no-repeat center/cover'}},
                {name:'保险直赔',value:'INS_COMPENSATION',background:{background:'url('+require('../../../img/pei.png')+') no-repeat center/cover'}}]
        }
        this.checkpay=(item,e)=>{
            console.log(item)
            this.setState({
                pay:item.value
            })

            this.props.setProps({addre:{xlcname:this.props.location.state.xlcname,taskId:this.props.location.state.taskId,
                pay:item.value||'XLCDF',evalId:this.props.location.state.evalId||this.state.evalId,
                lis:this.props.location.state.lis}})
            this.props.history.goBack();

            return
            /*this.props.history.pushState({...this.props.location.state,pay:item.value,
                taskId:this.props.location.state.taskId,evalId:this.props.location.state.evalId,
                lis:this.props.location.state.lis,id:this.props.location.state.id},'/purchase/partsBuy')*/
        }
    }
    handleChange(event) {
        console.log(this.state.pay)
        // localStorage.setItem("value", event.target.value);
        // this.props.history.replaceState({...this.props.location.state,pay:this.state.pay||this.props.location.state.pay,
        //     taskId:this.props.location.state.taskId,evalId:this.props.location.state.evalId,
        //     lis:this.props.location.state.lis,id:this.props.location.state.id},"/purchase/partsBuy")
    }
    componentDidMount() {
        this.props.changeTitle('支付方式');
    }
    componentWillMount(){
        this.props.location.state={...(this.props.location.state||{}),...(this.props.payWay||{})}
    }
    componentWillUnmount(){
       /*console.log(this.state.pay)
         this.props.history.replaceState({...this.props.location.state,pay:this.state.pay,
            taskId:this.props.location.state.taskId,evalId:this.props.location.state.evalId,
            lis:this.props.location.state.lis,id:this.props.location.state.id},"/purchase/partsBuy")*/
    }
    render() {
        console.log(this.state)
        console.log(this.props)
        return (
            <div style={{background: '#fff',marginTop:'0.3rem'}}>
                <ul>
                    {this.state.payList.map((item,index)=>{
                        return(
                            this.props.location.state.pay&&this.props.location.state.pay==item.value?
                                <li style={{display:'flex',padding:'0.2rem 0.2rem 0.2rem 0',marginLeft:'0.2rem',borderBottom:'0.01rem solid #ddd'}} onClick={this.checkpay.bind(this,item)}>
                                <span className="payspan" style={item.background}></span>
                                <span style={{display:'inline-block',flex:'1',padding:'0 0.2rem',fontSize:'0.32rem'}}>{item.name}</span>
                                <label style={{display:'inline-block',width: '0.4rem',height:'0.4rem',float:'right',
                                    background:'url('+require('../../../img/checked.png')+') no-repeat center/cover'}}></label>
                                <input style={{float:'right',width:'0.4rem',height:'0.4rem',display:'none'}}  checked
                                       type="radio" name="pay" value={item.value} refs={item.value} onChange={this.handleChange}/>
                            </li>:<li style={{display:'flex',padding:'0.2rem 0.2rem 0.2rem 0',marginLeft:'0.2rem',borderBottom:'0.01rem solid #ddd'}} onClick={this.checkpay.bind(this,item)}>
                                <span className="payspan" style={item.background}></span>
                                <span style={{display:'inline-block',flex:'1',padding:'0 0.2rem',fontSize:'0.32rem'}}>{item.name}</span>
                                <label style={{display:'inline-block',width: '0.4rem',height:'0.4rem',float:'right',
                                    background:'url('+require('../../../img/nochecked.png')+') no-repeat center/cover'}}></label>
                                <input style={{float:'right',width:'0.4rem',height:'0.4rem',display:'none'}}
                                       type="radio" name="pay" value={item.value} refs={item.value} onChange={this.handleChange}/>
                            </li>
                        )
                    })}
                    {/*<li style={{padding:'0.2rem 0.2rem 0.2rem 0',marginLeft:'0.2rem',borderBottom:'0.01rem solid #ddd'}} onChange={this.handleChange}>
                        <span style={{display:'inline-block',width:'0.4rem',height:'0.4rem',background:'url(' + require('../../../img/xlcdaifu.png') + ') no-repeat center/cover',}}></span>
                        <span style={{display:'inline-block',padding:'0 0.2rem',fontSize:'0.32rem'}}>修理厂代付</span>
                        <input style={{float:'right',width:'0.4rem',height:'0.4rem'}}
                               type="radio" name="pay" value="XLCDF" refs="XLCDF" onChange={this.handleChange}/>
                    </li>
                    <li style={{padding:'0.2rem 0.2rem 0.2rem 0',marginLeft:'0.2rem'}}>
                        <span style={{display:'inline-block',width:'0.4rem',height:'0.4rem',background:'url(' + require('../../../img/wxpay.png') + ') no-repeat center/cover',}}></span>
                        <span style={{display:'inline-block',padding:'0 0.2rem',fontSize:'0.32rem'}}>微信支付</span>
                        <input style={{float:'right',width:'0.4rem',height:'0.4rem'}}
                               type="radio" name="pay" value="INS" onChange={this.handleChange}/>
                    </li>*/}
                </ul>
            </div>
        )
    }
}