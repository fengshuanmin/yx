import React from 'react'
import $ from 'jquery'
import {BaseLi} from '../../../../../common/assembly/Stateless'

export default class CaiDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            news:['名称','品质','配件平台','配件电商','单价','数量'],
            pjnews:[]
        }
    }
    render(){
        return(
            <div>
                <div style={{background:'#fff'}}>
                    <ul style={{background:'#fff',display:'flex',padding:'0.2rem',alignItems:'center'}}>
                        <li style={{width:'0.8rem',fontSize:'0.4rem'}} className="iconfonts">&#xe623;</li>
                        {/*<li style={{flex:'1',lineHeight:'0.4rem'}}>
                            <p><span>收货人：</span><span>张艳艳</span><span style={{float:'right',display:'inline-block'}}>123456789</span></p>
                            <p><span>收获地址：</span><span>上海市浦东新区盛夏路560号306室上海市浦东新区盛夏路560号306室</span></p>
                        </li>*/}
                        <li style={{flex:'1',lineHeight:'0.4rem'}}>修理厂</li>
                        <li style={{width:'0.5rem',fontSize:'0.4rem'}} className="iconfonts" onClick={()=>{this.props.history.pushState(null,'/address')}}>&#xe607;</li>
                    </ul>
                    <p style={{height:'0.1rem',background:'url('+require('../../../img/bgt.png')+') repeat'}}></p>
                </div>
                <div style={{background:'#fff',marginTop:'0.15rem',marginBottom:'0.15rem'}}>
                    <this.props.InfoTitle T={this} data={{key:'选择配件',Lcolor:'#5998ff'}}/>
                    <ul style={{width:'100%',display:'flex'}}>
                        <li style={{width:'100%',padding:'0.1rem',display:'flex'}}>
                            <span style={{display:'inline-block',width:'0.4rem',background:'url('+require('../../../img/fangxing.png')+') no-repeat center'}}></span>
                            {/*{this.state.news.map((item,index)=>{
                                return(
                                    <span style={{display:'inline-block',flex:'1',textAlign:'center'}}>{item}</span>
                                    )
                                })
                            }*/}
                        </li>
                    </ul>
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