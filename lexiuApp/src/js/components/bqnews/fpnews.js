import React from 'react'
import $ from 'jquery'

export default class Fpmews extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <div style={{background:'#fff',paddingBottom:'0.3rem'}}>
                    <h4 style={{padding: '0.2rem 4%',
                        fontSize: '0.32rem',
                        fontWeight:'600'}}>发票类型</h4>
                    <div style={{padding:'0.1rem 0.2rem',border:'0.01rem solid #A9A9A9',display:'inline-block',marginLeft:'0.2rem',borderRadius:'0.05rem'}}>普通发票</div>
                    <div style={{padding:'0.1rem 0.2rem',border:'0.01rem solid #A9A9A9',display:'inline-block',marginLeft:'0.2rem',borderRadius:'0.05rem'}}>增值税发票</div>
                </div>
                <div style={{background:'#fff',marginTop:'0.2rem'}}>
                    <h4 style={{padding: '0.2rem 0',margin:'0 0 0 4%',
                        fontSize: '0.32rem',
                        fontWeight:'600',borderBottom:'0.01rem solid #F7F7F7'}}>发票信息</h4>
                    <p style={{padding:'0.3rem 0',margin:'0 0 0 4%',fontSize:'0.32rem',borderBottom:'0.01rem solid #F7F7F7'}}><label id="company" style={{width:'30%'}}>公司名称 :</label><input type="text" placeholder='请输入公司名称' name="company" style={{width:'60%',paddingLeft:'0.2rem',border:'none',outline:'none'}}/></p>
                    <p style={{padding:'0.3rem 0',margin:'0 0 0 4%',fontSize:'0.32rem',borderBottom:'0.01rem solid #F7F7F7'}}><label id="company" style={{width:'30%'}}>公司名称 :</label><input type="text" placeholder='请输入公司名称' name="company" style={{width:'60%',paddingLeft:'0.2rem',border:'none',outline:'none'}}/></p>
                    <p style={{padding:'0.3rem 0',margin:'0 0 0 4%',fontSize:'0.32rem',borderBottom:'0.01rem solid #F7F7F7'}}><label id="company" style={{width:'30%'}}>公司名称 :</label><input type="text" placeholder='请输入公司名称' name="company" style={{width:'60%',paddingLeft:'0.2rem',border:'none',outline:'none'}}/></p>
                    <p style={{padding:'0.3rem 0',margin:'0 0 0 4%',fontSize:'0.32rem',borderBottom:'0.01rem solid #F7F7F7'}}><label id="company" style={{width:'30%'}}>公司名称 :</label><input type="text" placeholder='请输入公司名称' name="company" style={{width:'60%',paddingLeft:'0.2rem',border:'none',outline:'none'}}/></p>
                    <p style={{padding:'0.3rem 0',margin:'0 0 0 4%',fontSize:'0.32rem',borderBottom:'0.01rem solid #F7F7F7'}}><label id="company" style={{width:'30%'}}>公司名称 :</label><input type="text" placeholder='请输入公司名称' name="company" style={{width:'60%',paddingLeft:'0.2rem',border:'none',outline:'none'}}/></p>
                    <p style={{padding:'0.3rem 0',margin:'0 0 0 4%',fontSize:'0.32rem',borderBottom:'0.01rem solid #F7F7F7'}}><label id="company" style={{width:'30%'}}>公司名称 :</label><input type="text" placeholder='请输入公司名称' name="company" style={{width:'60%',paddingLeft:'0.2rem',border:'none',outline:'none'}}/></p>
                </div>
                <div style={{width:'100vw',height:'1rem',marginTop:'0.5rem'}}>
                    <button onClick={this.submit} style={{border:'0px',width:'92%',height:'1rem',position:' fixed',left:'4%',background:'#3A97F7',color:'#fff',borderRadius:'0.1rem',fontSize:'0.34rem'}}>保 存</button>
                </div>
            </div>
        )
    }
}