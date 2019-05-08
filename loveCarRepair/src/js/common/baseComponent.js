import React from 'react';
import QRCode from 'qrcode.react'
require('./baseComponent.css')
export const Quan = (props)=>{
    console.log(props.data,'quan')
    return (
        <ul className="YHQuanList">
            {
                props.data.map((item,index)=>{
                    return(
                        <li className="QuanLi" onClick={props.T.QuanLi && (()=>{props.T.QuanLi(item)})} key={index}>
                            <div className={ item.outType != 'canuse' ? 'QuanLeft '+(!item.isHistry &&'outType'):'QuanLeft'}>
                                <div>
                                    <span className="QuanMoney">
                                        <span style={{position:'relative'}}>
                                            <span className="rmbico">￥</span>
                                            <span className="rMoney">{item.money}</span>
                                        </span>
                                    </span>
                                    <span style={item.outType == 'canuse' || (item.maxConsume=='Infinity' && item.minConsume*1 <=0) ? {flex:'1'}:{}}>{item.outType != 'canuse' && (item.maxConsume=='Infinity'? (parseInt(item.minConsume)*1>0 ? '维修费'+item.minConsume+'以上激活' : '') :('维修费'+item.minConsume+ '-'+item.maxConsume+'激活'))}</span>
                                </div>
                                <span className="jiszhiStyle">价值</span>
                            </div>
                            <div className="QuanRight">
                                <h5>{item.typeName}</h5>
                                <span className="time">{ item.useStatus*1==1 ? '兑换时间: '+item.useTime : item.startTime +' - '+item.endTime}</span>
                                <span className="phone">{ item.userName ? '车主:'+item.userName : (item.userPhone ? '车主电话:' + item.userPhone :'预约电话：'+item.phone)}</span>
                                <span className="adrees">{item.reportno ? '车牌号：'+item.reportno : '门店：'+item.store}</span>
                                {item.outType != 'canuse' && <span className={item.outType}></span>}
                                {item.isNews && <i className="isNews"></i>}
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export const EWM=(props)=>{
    /*var arr=['cxmc','plateno','telePhone','customername']
    props.data.cxmc=props.T.props.project.firstList.cxmc
    props.data.plateno=props.T.props.project.firstList.plateno
    props.data.telePhone=props.T.props.project.firstList.telePhone
    props.data.customername=props.T.props.project.firstList.customername*/
    var a={};a.QId=props.data.QId
    var a=JSON.stringify(a);
    var b=a.replace(/[^\u0000-\u00FF]/g,function($0){return escape($0).replace(/(%u)(\w{4})/gi,"Zu$2")});
    var ws = new WebSocket("ws://116.62.162.134:8181");
    ws.onopen = function (e) {
        console.log('Connection to server opened');
        var sWS={id:props.data.QId,type:'toUse'}
        var newJson=JSON.stringify(sWS);
        ws.send(newJson);
    }
    ws.onclose=function(e){
        console.log(e)
    };
    ws.onmessage =  (e)=>{
        console.log(e)
        switch(e.data){
            case 'ok':
                props.T.setState({EWM:false,sOk:false},()=>{
                    props.T.Reload();
                    ws.close();
                });
                break;
            case 'nOk':
                props.T.props.project.setProps({
                    PromptData:{content:'使用失败',Prompt:true,onlyOK:true,fun:(e,close)=>{
                        props.T.setState({EWM:false,sOk:false});
                        close();
                        ws.close();
                    }}
                })
                break;
            case 'sOk':
                props.T.setState({sOk:true});
                break;
            default:
                props.T.setState({sOk:true});
        };
    };
    var styles= props.sOk ? {display:'none'} : {}
    return(
        <div className="EWMNEW" style={{width:window.innerWidth*0.7}}>
            <div>
                {props.sOk ? <span><i className="iconfonts" style={{color:'rgb(63, 155, 243)'}}>&#xe636;  </i><span style={{display:'inline-block;',border:'0px'}}>{props.data.typeName}</span></span> :<span>{props.data.typeName}</span>}
                <QRCode value={b}/>
            </div>
            <span className="iconfonts close" onClick={()=>{props.T.setState({EWM:false,sOk:false});ws.close();}}>&#xe604;</span>
        </div>
    )
}