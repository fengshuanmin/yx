import React from 'react';
export default (props)=>{
    var data=props.data;
    var arr=["fact_part_name","partsCompany","partSpareType","partNum","partPrice",'partManageFee','enquiryDesc','cz']
    console.log(data)
    return(
        <div className="offerListStyle">
            <div className="Ttitle"><h4>报价零件列表</h4><span className="packUp"></span></div>
            <div className="ntBox">
                <ul className="Utr">
                    {
                        data.length < 1 ?<li style={{textAlign:'center'}}>没有报价信息</li>:
                        data.map((item,index)=>{
                           return(
                               <li key={index}>
                                   <ul className="Utd">
                                   {
                                       arr.map((m,i)=>{
                                           return(
                                               <li key={i+index} style={i==0 &&item[m]!='名称' ? {color:'#1081df',flex:1,cursor:'pointer'}:{flex:m=='partsCompany' || m=='partSpareType' || m=='fact_part_name' ? '1':'none',width:'100px'}} onClick={i==0 &&item[m]!='名称'?()=>props.T.toLoad(item,index) :''}>
                                                   {item[m]}
                                                   {(index > 0 && i==arr.length-1 && item.isSelected*1 !==1 && !item.DataQs) ?<span className="gg ggs" onClick={()=>props.T.toLoad(item,index)}>选择报价</span>:''}
                                                   {(index > 0 && i==arr.length-1 && item.isSelected*1 !==1 && item.DataQs) ?<span className="gg" onClick={()=>props.T.quxiao(item,index)}>取消</span>:''}
                                                   {(index > 0 && i==arr.length-1 && item.isSelected*1 ==1 ) ? <span className="gg ggs" >已选择</span>:''}
                                                </li>
                                           )
                                       })
                                   }
                                   </ul>
                               </li>
                           )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}