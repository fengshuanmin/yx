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
                <div style={{background:'#fff',marginTop:'0.15rem'}}>
                    <h4 style={{padding: '0.2rem 4%',
                        fontSize: '0.3rem',
                        fontWeight:'600'}}>案件信息</h4>
                    <BaseLi {...this.props} data={[
                        {
                            key:'询价单号'
                        },
                        {
                            key:'修理厂'
                        },
                        {
                            key:'车牌号'
                        },
                        {
                            key:'车型',
                            Style:{V:{textAlign:'right'}}
                        },{
                            key:'接车时间'
                        },
                    ]} T={this}/>
                </div>
                <div style={{background:'#fff',marginTop:'0.15rem'}}>
                    <h4 style={{padding: '0.2rem 4%',
                        fontSize: '0.3rem',
                        fontWeight:'600'}}>采购订单</h4>
                </div>
                <div style={{background:'#fff',marginTop:'0.15rem'}}>
                    <h4 style={{padding: '0.2rem 4%',
                        fontSize: '0.3rem',
                        fontWeight:'600'}}>配件信息</h4>
                </div>
                <div style={{width:'100vw',height:'1rem'}}>
                    <button onClick={ ()=>this.props.history.pushState(this.props.location.state,'/peijiancaigou')} style={{border:'0px',width:'100%',height:'1rem',position:' fixed',bottom:'0px',left:'0px',background:'#4680f7',color:'#fff'}}>配件采购</button>
                </div>
            </div>
        )
    }
}