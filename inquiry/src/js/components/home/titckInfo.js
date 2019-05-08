import React from 'react';
import $ from "jquery";
import ChangeTitle from '../../../../../common/baseFun/someEvent'
require('../../../css/IntegralRecord.css')
require('../../../css/home.css')
export default class IntegralRecord extends React.Component {
    constructor(props) {
        super(props);
        console.log()
        this.state = {
           // NameList:[{tit:'个人',tcktit:'发票抬头',name:'张小明'},{tit:'企业',tcktit:'发票抬头',name:'张小明'}]
            name:'张小明',
            companyname:'上海浦东盛夏路修理厂',
            personnumber:'133457843475412'
        };
        this.state.userId=this.props.project.user.data.LxAqYhxxb.id
    }

    componentDidMount() {
        console.log('this.props', this.props)
        ChangeTitle.ChangeTitle('发票管理');
    }
    componentWillMount(){

    }


    render() {
        return (
            <div className="DSYHome">
                <ul className="SetUpLi" style={{color:'#808080'}}>
                    <li style={{border:'none'}}>个人</li>
                    <li style={{border:'none',paddingTop:'0',flex:'inherit'}}><span style={{flex:'inherit'}}>发票抬头：</span><span style={{color:'#212121'}}>{this.state.name}</span></li>
                    <li>
                        <p style={{height:'0.3rem',display:'flex',marginLeft:'4.8rem'}} onClick={this.updata}><span style={{display:'inline-block',width:'0.3rem',height:"0.3rem",backgroundImage:'url('+require('../../../img/updata.png')+')',backgroundSize:'contain'}}></span><span style={{marginLeft:'0.1rem',fontSize:'0.22rem',color:'#212121'}}>编辑</span></p>
                        <p style={{height:'0.3rem',display:'flex',marginLeft:'0.2rem'}} onClick={this.delect}><span style={{display:'inline-block',width:'0.28rem',height:"0.31rem",backgroundImage:'url('+require('../../../img/delect.png')+')',backgroundSize:'contain'}}></span><span style={{marginLeft:'0.1rem',fontSize:'0.22rem',color:'#212121'}}>修改</span></p>
                    </li>
                </ul>
                <ul className="SetUpLi" style={{color:'#808080'}}>
                    <li style={{border:'none'}}>企业</li>
                    <li style={{border:'none',paddingTop:'0',flex:'inherit'}}><span style={{flex:'inherit'}}>发票抬头：</span><span style={{color:'#212121'}}>{this.state.companyname}</span></li>
                    <li style={{border:'none',paddingTop:'0',flex:'inherit'}}><span style={{flex:'inherit'}}>纳税人识别号：</span><span style={{color:'#212121'}}>{this.state.personnumber}</span></li>
                    <li>
                        <p style={{height:'0.3rem',display:'flex',marginLeft:'4.8rem'}} onClick={this.updata}><span style={{display:'inline-block',width:'0.3rem',height:"0.3rem",backgroundImage:'url('+require('../../../img/updata.png')+')',backgroundSize:'contain'}}></span><span style={{marginLeft:'0.1rem',fontSize:'0.22rem',color:'#212121'}}>编辑</span></p>
                        <p style={{height:'0.3rem',display:'flex',marginLeft:'0.2rem'}} onClick={this.delect}><span style={{display:'inline-block',width:'0.28rem',height:"0.31rem",backgroundImage:'url('+require('../../../img/delect.png')+')',backgroundSize:'contain'}}></span><span style={{marginLeft:'0.1rem',fontSize:'0.22rem',color:'#212121'}}>修改</span></p>
                    </li>
                </ul>
                <this.props.BaseSubmits style={{box:{padding:'0 0.3rem',marginBottom:'0.5rem'}}} submits={[{style:{borderRadius:'0.1rem',background:'linear-gradient(to right,#40A8DF,#2F6AE1)'},value:'新增发票信息',fun:()=>this.props.history.pushState({rechargeFor:this.state.rechargeFor},"/newtitck")}]} value="新增发票信息" {...this.props} />
            </div>
        )
    }
}