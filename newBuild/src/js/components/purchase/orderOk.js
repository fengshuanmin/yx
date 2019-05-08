/**
 * Created by zhoukai on 2018/3/26.
 */
import React from 'react';

export default class OrderOk extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div>
                <div style={{display:'flex',alignItems:'center',color:'#9a8787cc',justifyContent:'center',height:'4rem',position:'relative',background:'#fff'}}>
                    <span style={{textAlign:'center'}}>
                        <span style={{display:'inline-block',marginBottom:'0.2rem',width:'1.7rem',height:'1rem',background:'url('+require('../../../../../common/images/cgOk2@3x.png')+')',backgroundSize:'100% 100%'}}></span>
                        <p style={{padding:'0 0.7rem'}}>由于您所选择配件来自不同的配件电商，该单拆分为以下多个订单</p>
                        <p style={{position:'absolute',bottom:'0px',left:'0px',width:'100%',height:'1rem',display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <span style={{flex:'1'}}
                                  onClick={()=>{this.props.history.replaceState(this.props.location.state,'/purchase/info')}}>
                                查看订单
                            </span>
                            <span style={{flex:'1',borderLeft:'1px solid #ccc'}}
                                  onClick={()=>{this.props.history.replaceState('','/inquiry')}}>返回首页</span>
                        </p>
                    </span>
                </div>
                <div style={{marginTop:'.3rem'}}>
                    <this.props.BaseLi {...this.props} data={[
                        {key:'车件2⃣️',value:'JKSFIEJJNE',path:'/',Style:{ico2:''}},
                        {key:'车件2⃣️',value:'JKSFIEJJNE',path:'/',Style:{ico2:''}}
                    ]} />
                </div>
                <span style={{position:'absolute',color:'#100f0fcc',bottom:'2rem',
                    display:'flex',width:'100%',alignItems:'center',justifyContent:'center'}}
                      onClick={()=>{this.props.history.replaceState('','/inquiry')}}
                >返回首页</span>
            </div>
        )
    }
}