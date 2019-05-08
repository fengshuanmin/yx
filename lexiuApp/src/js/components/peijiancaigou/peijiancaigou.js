import React from 'react'
import $ from 'jquery'
import {BaseLi} from '../../../../../common/assembly/Stateless'

export default class CaiDetail extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <ul style={{background:'#fff',display:'flex',padding:'0.2rem',alignItems:'center'}}>
                    <li style={{width:'0.8rem',fontSize:'0.4rem'}} className="iconfonts">&#xe623;</li>
                    <li style={{flex:'1',lineHeight:'0.4rem'}}>
                        <p><span>收货人：</span><span>张艳艳</span><span style={{float:'right',display:'inline-block'}}>123456789</span></p>
                        <p><span>收获地址：</span><span>上海市浦东新区盛夏路560号306室上海市浦东新区盛夏路560号306室</span></p>
                    </li>
                    <li style={{width:'0.5rem',fontSize:'0.4rem'}} className="iconfonts" onClick={()=>{this.props.history.pushState(null,'/address')}}>&#xe607;</li>
                </ul>
                <p style={{height:'0.1rem',background:'url('+require('../../../img/bgt.png')+') repeat'}}></p>
                <div style={{background:'#fff',marginTop:'0.15rem'}}>
                    <h4 style={{padding: '0.2rem 4%',
                        fontSize: '0.36rem',
                        fontWeight:'600'}}>配件信息</h4>
                </div>
                <this.props.BaseLi data={[{
                    Style:{ico2:'微信支付',S:{color:'#97989b'}},
                    key:'支付方式',
                    fun:this.saoSao
                },{
                    Style:{ico2:'卖家推荐物流&#xe607;',S:{color:'#97989b'}},
                    key:'配送方式',
                    fun:()=>this.props.history.pushState(null,'/couponHistory')
                },
                {
                    Style:{ico2:'&#xe607;',S:{color:'#97989b'}},
                    key:'发票信息',
                    fun:()=>this.props.history.pushState(null,'/couponHistory')
                }
                ]} {...this.props}/>
                <div style={{width:'100vw',height:'1rem'}}>
                    <span style={{display:'inline-block',width:'80%',height:'1rem',background:'#fff',color:'#F65354',position:' fixed',bottom:'0px',left:'0px',lineHeight:'1rem',paddingRight:'0.2rem',fontSize:'0.3rem'}}><span style={{display:'block',float:'right'}}>合计金额：￥41421</span></span>
                    <button onClick={()=>this.props.history.pushState(this.props.location.state,'/peijiancaigou')} style={{border:'0px',width:'20%',height:'1rem',position:' fixed',bottom:'0px',left:'80%',background:'#F65354',color:'#fff',fontSize:'0.3rem'}}>提交订单</button>
                </div>
            </div>
        )
    }
}