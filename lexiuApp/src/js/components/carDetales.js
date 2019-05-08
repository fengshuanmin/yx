import React from 'react';
import {BaseLi} from '../../../../common/assembly/Stateless'
export default class CarDetales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            BAList:[
                {
                    key:'保险公司',
                    value:this.props.location.state.inscompanyname
                },{
                    key:'接车时间',
                    value:this.props.location.state.inRepairTimeString,
                },{
                    key:'金额状态',
                    value:this.props.location.state.repair_Money_State == "0" ? "预估状态" : "最终状态",
                },{
                    key:'维修金额',
                    value:this.props.location.state.repair_Moneny,
                },{
                    key:'推修类型',
                    value:this.props.location.state.push_TYPE=="0" ? "送修" : "返修",
                },
            ],
            carInfo:[
                {
                    key:'车牌号',
                    value:this.props.location.state.plateno,
                },{
                    key:'车型名称',
                    value:this.props.location.state.cxmc,
                },{
                    key:'客户姓名',
                    value:this.props.location.state.send_car_person || this.props.location.state.customername ,
                },{
                    key:'联系方式',
                    value:this.props.location.state.telephone,
                }
            ],
            dsInfo:[
                {
                    key:'定损员',
                    value:this.props.location.state.lossby,
                },{
                    key:'联系号码',
                    value:this.props.location.state.lossbyphone,
                }
            ]
        };
    }
    render(){
        return(
            <div className="carDetales">
                <h4 style={{padding: '0.2rem 4%',
                    fontSize: '0.3rem',
                    fontWeight:'600'}}>报案信息</h4>
                <BaseLi {...this.props} data={this.state.BAList} T={this}/>
                <h4 style={{padding: '0.2rem 4%',
                    fontSize: '0.3rem',
                    fontWeight:'600'}}>车辆信息</h4>
                <BaseLi {...this.props} data={this.state.carInfo} T={this}/>
                <h4 style={{padding: '0.2rem 4%',
                    fontSize: '0.3rem',
                    fontWeight:'600'}}>定损员信息</h4>
                <BaseLi {...this.props} data={this.state.dsInfo} T={this}/>
            </div>
        )
    }
}