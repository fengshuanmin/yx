import React from 'react'
import $ from 'jquery'
import { Switch } from 'antd';

export default class NewAddress extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <ul className="newadd">
                    <li><label id="name1">收货人：</label><input type="text" name="name1" placeholder="请填写收件人"/></li>
                    <li><label id="movephone">手机号码：</label><input type="text" name="movephone" placeholder="请填写手机号码"/></li>
                    <li><label id="contry">所在地区：</label><input type="text" name="contry"/></li>
                    <li><label id="address1">详细地址：</label><input type="text" name="address1" placeholder="请填写详细地址"/></li>
                </ul>
                <p></p>
                <div style={{width:'100vw',height:'1rem',marginTop:'0.5rem'}}>
                    <button onClick={()=>this.props.history.pushState(this.props.location.state,'/newaddress')} style={{border:'0px',width:'92%',height:'1rem',marginLeft:'4%',background:'#3A97F7',color:'#fff',borderRadius:'0.1rem',fontSize:'0.32rem'}}>保存</button>
                </div>
            </div>
        )
    }
}