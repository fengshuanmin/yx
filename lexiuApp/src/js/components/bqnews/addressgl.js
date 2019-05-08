import React from 'react'
import $ from 'jquery'

export default class AddAddress extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <ul style={{width:'100%',height:'100%',background:'#fff',marginTop:'0.1rem'}}>
                    <li style={{padding:'0.2rem'}}><span>张艳艳</span><span style={{float:'right'}}>12345678912</span></li>
                    <li style={{padding:'0 0.2rem 0.2rem 0.2rem'}}><p>上海市浦东新区盛夏路560号306室上海市浦东新区盛夏路560号306室</p></li>
                    <li style={{padding:'0.2rem',borderTop:'0.01rem solid #F6F6F6'}}><input type="radio"/>设为默认</li>
                </ul>

                <div style={{width:'100vw',height:'1.4rem',marginTop:'0.5rem',position:' fixed',bottom:'0',background:'#fff'}}>
                    <button onClick={()=>this.props.history.pushState(this.props.location.state,'/newaddress')} style={{border:'0px',width:'92%',height:'1rem',position:' fixed',bottom:'0.2rem',left:'4%',background:'linear-gradient(to right,#40A8DF,#2F6BE1)',color:'#fff',borderRadius:'0.1rem',fontSize:'0.32rem'}}>添加新地址</button>
                </div>
            </div>
        )
    }
}