import React from 'react';
import $ from 'jquery';
import {BaseLi} from '../../../../../common/assembly/Stateless'
/**案件详情**/
export default class CaseInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showData:{},partsData:[]};
    }
    componentDidMount() {
        this.props.changeTitle('案件详情');
    }
    componentWillMount(){
        // console.log(this.props.location.state);
        //parts 应该收的种类和数量
        //details 已回收
        //deals 订单
        this.props.promptInfo({loading:true})
        $.post('/lexiugo-app/weixin/getSingleCase',{recoverId:this.props.location.state.recoverId},(msg)=>{
            this.props.promptInfo({loading:false})
            if(msg.code=='0000'){
                var data=msg.data.datas;
                var jtbc=[]
                //遍历可回收的订单
                for(var i in data.orderList){
                    var ab={
                        // '未处理':[(data.deals[i].dispatchStatus=='未派单' && data.deals[i].status=='未处理') || (data.deals[i].dispatchStatus=='' && data.deals[i].status=='未处理'),{color:"#ff9da0"}],
                        // '未派单':[data.deals[i].dispatchStatus=='未派单' && data.deals[i].status=='未回收',{color:"#fb676b"}],
                        // '已派单':[data.deals[i].dispatchStatus=='已分派' && data.deals[i].status=='未回收',{color:"#febf52"}],
                        // '部分回收':[(data.deals[i].dispatchStatus=='已分派' && data.deals[i].status=='部分回收'),{color:'#5a98f4'}],
                        // '整单回收':[(data.deals[i].dispatchStatus=='已分派' && data.deals[i].status=='已回收'),{color:"#3fcf9e"}],
                        '待处理':[(data.orderList[i].tmxcOrderStatus=='待处理') ,{color:"#ff9da0"}],
                        '待派单':[(data.orderList[i].tmxcOrderStatus=='待派单') ,{color:"#fb676b"}],
                        '待回收':[(data.orderList[i].tmxcOrderStatus=='待回收') ,{color:"#febf52"}],
                        '整单回收':[(data.orderList[i].tmxcOrderStatus=='整单回收') ,{color:"#3fcf9e"}],
                        '部分回收':[(data.orderList[i].tmxcOrderStatus=='部分回收') ,{color:"#5a98f4"}]

                    },Dtext={}
                    for(var m in ab){
                        if(ab[m][0]){
                            Dtext.text=m;Dtext.style=ab[m][1];
                        }
                    }
                    data.orderList[i] && jtbc.push(
                        {
                            Style:{ico2:'&#xe607;',V:Dtext.style},
                            key:data.orderList[i].orderId,
                            value:Dtext.text,
                            path:'/recovery/orderInfo',
                            datas:data.orderList[i]
                        }
                    )
                }

                var partsData=[]
                // for(var i in data.parts){
                //     //得到每种零件的数据
                //     var LJnum=0;
                //     for(var j in data.details){
                //         //得到这种零件的数量
                //         if(data.details[j].partId==data.parts[i].id){
                //             LJnum++//已回收数量
                //         }
                //     }
                //     partsData.push({
                //         name:data.parts[i].partStandard,
                //         sum:data.parts[i].partNum,
                //         NotReclaimed:data.parts[i].partNum-LJnum,
                //         reclaimed:LJnum
                //     })
                // }
                var cjxx=false;
                // for(var i in partsData){
                //     partsData[i].noRecover > 0 && (cjxx=true)
                // }
                if(data.partList[i].noRecover&&data.partList[0].noRecover>0){
                    cjxx=true
                }
                !jtbc[0] && jtbc.push({key:'暂无回收订单'})
                !partsData[0] && partsData.push({key:'暂无残件信息'})
                this.setState({cjxx:cjxx,showData:msg.data.datas,jtbc:jtbc,partsData:data.partList})
            }
        })
    }
    componentWillUnmount(){
        this.props.promptInfo()
    }
    render(){
        var style={
            divStyle:{
                background:'#fff',marginTop:'4vw'
            }
        }
        return(
            <div style={{paddingTop:'4vw'}}>
                <div style={style.divStyle}>
                    <h4 style={{padding: '0.2rem 4%',
                        fontSize: '0.3rem',
                        fontWeight:'600'}}>案件信息</h4>
                    <BaseLi {...this.props} data={[
                        {
                            key:'修理厂',
                            value:this.props.location.state.xlcName
                        },{
                            key:'车牌号',
                            value:this.props.location.state.plateNo
                        },{
                            key:'车型',
                            value:this.props.location.state.cxmc,
                            Style:{V:{textAlign:'right'}}
                        },{
                            key:'推修时间',
                            value:this.props.timeString(this.props.location.state.pushTime,'y-m-d h:m:s')
                        },
                    ]} T={this}/>
                </div>
                <div style={style.divStyle}>
                    <h4 style={{padding: '0.2rem 4%',
                        fontSize: '0.3rem',
                        fontWeight:'600'}}>回收订单</h4>
                    <BaseLi {...this.props} data={this.state.jtbc || []} T={this}/>
                </div>
                <div style={style.divStyle}>
                    <h4 style={{padding: '0.2rem 4%',
                        fontSize: '0.3rem',
                        fontWeight:'600'}}>残件信息</h4>

                    <ul>
                        <li>
                            <ul style={{textAlign:'center',display:'flex',padding:'4vw',alignItems:'center'}}>
                                <li style={{flex:1,textAlign:'left'}}>名称</li>
                                <li style={{width:'1.5rem'}}>总数量</li>
                                <li style={{width:'1.5rem'}}>已发起</li>
                                <li style={{width:'1.5rem'}}>未发起</li>
                            </ul>
                        </li>
                        {
                            this.state.partsData.map((item,index)=>{
                                return(
                                    <li key={index} style={{background:index*1%2==0 && '#f4f8fb'}}>
                                        <ul style={{textAlign:'center',display:'flex',padding:'4vw',alignItems:'center'}}>
                                            <li style={{flex:1,textAlign:'left'}}>{item.partName}</li>
                                            <li style={{width:'1.5rem'}}>{item.partNum}</li>
                                            <li style={{width:'1.5rem'}}>{item.isRecover}</li>
                                            <li style={{width:'1.5rem'}}>{item.noRecover}</li>
                                        </ul>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div style={{width:'100vw',height:'1rem'}}>
                    <button onClick={ ()=>this.state.cjxx && this.props.history.pushState(this.props.location.state,'/recovery/addRecovery')} style={{border:'0px',width:'100%',height:'1rem',position:' fixed',bottom:'0px',left:'0px',background:this.state.cjxx ? '#4680f7' : '#ccc',color:'#fff'}}>残件回收</button>
                </div>
            </div>
        )
    }
}