import React from "react"
require('./css/Stateless.css');
import $ from 'jquery'
/*
*/

export const Zujian = (props)=>{
    return (
        <div>
            {props.map((item,index)=>{
                return (
                    <div onChange={()=>{props.T.jjj}}>
                        <Zujian {...this} jjj={this.jjj} />
                    </div>
                )
            })}
        </div>
    )
}

export const SSOK =(props)=>{
    return(
        <div className="SSOK">
            <div>
                <span className="gogoStyle"></span>
                <p>该优惠券已完成兑换</p>
            </div>
            <div className="buttomStyle">
                <button
                onClick={()=>props.history.replaceState('mp','/home')}
                >继续扫描</button>
                <div>
                    <span onClick={()=>props.history.replaceState(null,'/couponHistory')}>查看历史纪录</span>
                    <span onClick={()=>props.history.replaceState(null,'/home')}>返回个人中心</span>
                </div>
            </div>
        </div>
    )
}
export const CarLists=(props)=>{
    var arr=['null','JC','CK','WX','WC']
    return(
        <li className="CarLists" onClick={props.toDetail}>
            <div className="carListContent">
                <span className={'icom '+arr[props.taskstate]}>{props.taskstate == '1' && (()=>{
                    var timeT=(Date.parse( new Date())-props.pushTime);
                    if(timeT>86400000 && timeT/86400000 <=30){
                        return parseInt(timeT/86400000)+'天前'
                    }else if(timeT<86400000){
                        if(timeT > 3600000){
                            return parseInt(timeT/(86400000/24))+'小时前'
                        }else if(timeT >= 1000){
                            return parseInt(timeT/60000)+'分钟前'
                        }else{
                            return parseInt(timeT/1000)+'秒前'
                        }
                    }else{
                        var time=parseInt(props.pushTime);
                        var dataTime=new Date(time)
                        var   year=dataTime.getYear();
                        var   month=dataTime.getMonth()+1;
                        return (year-100)+'年'+month+'月';
                    }

                })()}</span>
                <h4>{props.inscompanyname}</h4>
                <p>车主：<span>{props.customername}</span></p>
                <p>车牌号：<span style={{color:'#5b87d6'}}>{props.plateno}</span></p>
                <p>{props.cxmc ? '车型：' : '品牌：'}{props.cxmc || props.ppmc}</p>
                {props.taskstate >1 && <p className="carListTime">接车时间:{props.inRepairTimeString}</p>}
                {props.tmxIsRead*1 != 1 && props.taskstate*1==1 && <span className="noRead"></span>}
            </div>
        </li>
    )
}
/*采购*/
export const CaiList=(props)=>{
    var arr=['null','JC','CK','WX','WC']
    return(
        <li className="CaiLists" onClick={props.toDetail}>
            <div className="caiListContent">
                <span style={{display:'inline-block',padding:'0.15rem 0.3rem',marginRight:'0.2rem',borderRadius:'0 0 0.1rem 0.1rem',color:'#fff',float:'right',background:'#5b87d6',marginTop:'-0.3rem'}}>已采购</span>
                <h4 style={{display:'inline-block'}}>{props.inscompanyname}</h4>
                <p>车主：<span>{props.customername}</span></p>
                <p>车牌号： {props.plateno}</p>
                <p>车型： {props.cxmc}</p>
            </div>
        </li>
    )
}
/*详情里的公共的上半部分 没用*/
export const Details=(props)=>{
    return (
        <div>
            <div>
                <span>基本信息</span>
                <span>详情</span>
                <span className="iconfonts">&#xe607;</span>
            </div>
            <div>
                <ul>
                    <li><span>车牌号</span><span>A888</span></li>
                </ul>
            </div>
        </div>
    )
}

export const FangQi=(props)=>{
    return(
        <div className="jieche">
            <p>请输入放弃理由</p>
            <input type="text" placeholder="请输入放弃理由"/>
            <div>
                <span onClick={()=>{
                    props.T.setState({thishi:''})
                }}>取消</span>
                <span onClick={()=>{
                    props.T.setState({
                        sendType: "0003",
                        abandonReason: '4',//this.state.val,
                        taskId: props.location.state.id,
                        reasonDescrip:props.T.state.reasonDescrip
                    })
                }}>确认</span>
            </div>
        </div>
    )
}