import React from 'react';
require('../css/carInfo.css')
export default (props)=>{
    var ul1=[],ul2=[],b=0;
    for(var i in props.data){
        if(i%2==0){
            ul1.push(<li key={i} style={i==props.data.length-1 ? {borderRight:i==props.data.length-1? '1px solid #ccc':'0px',width:'200%'}:{}}><span>{props.data[i].key+':'}</span><span>{props.data[i].value}</span></li>)
        }else{
            ul2.push(<li key={i}><span>{props.data[i].key+':'}</span><span>{props.data[i].value}</span></li>)
        }
    }
    return (
        <div className="carInfoStyle">
            <div className="Ttitle"><h4>车辆信息</h4><span className="packUp"></span></div>
            <div className="ntBox">
                <ul>{ul1}</ul>
                <ul>{ul2}</ul>
            </div>
        </div>
    )
}