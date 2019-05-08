import React from 'react';
import $ from 'jquery'
require('../css/peijianDs.css')
export default class PEIJIANDS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isWhere:0,
            iHeight:[],
            values:[],
            GLF:30,
            platformInfos:[]
        }
    }
    componentWillMount(){
        this.setState({
            factPartName:this.props.dat[0].fact_part_name
        })
        var taskId=this.props.taskId,partId=this.props.dat[0].partId
        $.post('/toumingxiu/insEnquiry/getPartQuoteInfo.do',{taskId:taskId,partId:partId,platformId:''},(dat)=>{
            console.log(dat)
            this.setState({
                platformInfos:dat.enquiryQuoteList
            })
        })
    }
    componentDidMount(){

    }
    componentDidUpdate(){

    }
    render(){
        var statusCode=this.props.T.state.oldData.task.xlc.status
        console.log(this.props)
        console.log(this.state.platformInfos)
        return(
           <div id="peijianDs">
               <div className="title" style={{background:'#5e93fb'}}>{this.state.factPartName+'报价'}</div>
               <div className="DSBox">
                   {statusCode==3?<p style={{background:'#F6F6F7',color:'#fe884e',fontWeight:'bold',fontSize:'14px',padding:'15px',marginBottom:'15px',marginTop:'-15px'}}>如需等待供货商报价，请稍后再查看</p>:<p></p>}
                   <div className="nav" style={{borderBottom:'1px solid #5e93fb'}}>
                       <ul>
                           {this.state.platformInfos&&this.state.platformInfos.map((item,i)=>{
                               return(
                                   <li key={i}
                                       style={{background:'#5e93fb',border:'0px',position:'relative',top:'1px',color:'#fff',
                                           marginRight:'15px',...(this.state.isWhere==i ? {background:'#fff',color:'#5e93fb',border:'1px solid #5e93fb',borderTop:'2px solid #5e93fb',borderBottom:'0'}:{})
                                       }}
                                       className={this.state.isWhere==i ? 'on':'' }
                                       onClick={this.changeList.bind(null,item,i)}>
                                       {item.name}
                                   </li>
                               )
                           })}
                       </ul>
                   </div>
               </div>
           </div>
        )
    }
}