import React from 'react'
import $ from 'jquery'
import {DSYButton} from '../../../../../common/assembly/someAssembly'
import {SSOK} from '../../common/Stateless'
import {BaseLi,UserHeader,GoOut} from '../../../../../common/assembly/Stateless'
export default class CarList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listData:[],
            listAJXX:[],
            tishi:false,
        };
        this.loding=()=>{
            $.post('/lexiugo-app/weixin/useCouponTicket',{
                ticketId:this.props.location.state.QId,state:'0'
            },(msg)=>{
/**********************************/
                /*var ws = new WebSocket("ws://121.43.165.81:8181");
                ws.onopen = function (e) {
                    console.log('Connection to server opened');
                }
                var sWS={id:this.props.location.state.QId,type:'userd'}
                ws.send(JSON.stringify(sWS));*/
/***************************************/
                var mtb=''
                switch(msg.code){
                    case '0000':
                        mtb='优惠券使用成功'
                        this.setState({tishi:(<SSOK {...this.props} T={this}/>)});
                        $.post('/server/saoOk',{ticketId:this.props.location.state.QId,type:'ok'},()=>{})
                        return;
                        break;
                    case '0001'://过期
                        mtb='优惠券已过期'
                        $.post('/server/saoOk',{ticketId:this.props.location.state.QId,type:'nOk'},()=>{})
                        break;
                    case '0002'://已被使用
                        mtb='优惠券已被使用'
                        $.post('/server/saoOk',{ticketId:this.props.location.state.QId,type:'nOk'},()=>{})
                        break;
                    case '0003'://已被使用
                        mtb='未达到指定金额'
                        $.post('/server/saoOk',{ticketId:this.props.location.state.QId,type:'nOk'},()=>{})
                        break;
                    case '0004'://已被使用
                        mtb='请到指定门店使用该优惠券'
                        $.post('/server/saoOk',{ticketId:this.props.location.state.QId,type:'nOk'},()=>{})
                        break;
                    case '0005'://已被使用
                        mtb='该订单还未定损'
                        $.post('/server/saoOk',{ticketId:this.props.location.state.QId,type:'nOk'},()=>{})
                        break;
                    default:
                        mtb='优惠券使用失败，请稍后尝试'
                        $.post('/server/saoOk',{ticketId:this.props.location.state.QId,type:'nOk'},()=>{})
                }
                this.props.project.setProps({
                    PromptData:{content:mtb,Prompt:true}
                })
            })
        }
    }
    componentDidMount(){
        this.props.project.changeTitle('优惠券详情')
        $.post('/server/getCoupon',{ticketId:this.props.location.state.QId},(dat)=>{
            var listData=[
                {
                    key:'优惠券类型',
                    value:dat.data.coupon_name
                },
                {
                    key:'优惠券价值',
                    value:'￥'+dat.data.coupon_money
                },{
                    key:'有效日期',
                    value:dat.data.end_time && dat.data.end_time
                },
                {
                    key:'使用日期',
                    value:dat.data.use_time && dat.data.use_time
                },
                {
                    key:'使用限额',
                    value:(dat.data.upper_limit=='Infinity'? (parseInt(dat.data.lower_limit)*1>0 ? '￥'+dat.data.lower_limit : '无') :('￥'+dat.data.lower_limit+ '-'+dat.data.upper_limit))
                }
            ]
            if(listData[3].key=='使用日期' && dat.data.use_status*1==0){
                listData.splice(3,3);
            }
            this.setState({
                listData:listData,
                listAJXX:[
                    {
                        key:'车牌号码',
                        value:dat.data.PLATENO
                    },
                    {
                        key:'车型名称',
                        value:dat.data.CXMC
                    },
                    {
                        key:'客户姓名',
                        value:dat.data.CUSTOMERNAME
                    },
                    {
                        key:'联系电话',
                        value:dat.data.TELEPHONE
                    }
                ],
            })
        })
    }
    render() {
        return(
            <div>
                {this.state.tishi}
                <div>
                    <h4 style={{padding:'0.2rem 0.3rem',fontSize:'0.3rem',fontWeight:'600'}}>优惠券信息</h4>
                    <BaseLi style={{marginBottom:'0px'}} data={this.state.listData} {...this.props}/>
                    <h4 style={{padding:'0.2rem 0.3rem',fontSize:'0.3rem',fontWeight:'600'}}>案件信息</h4>
                    <BaseLi data={this.state.listAJXX} {...this.props}/>
                    { !this.props.location.state.canSubmit &&
                        <div style={{textAlign: 'center', marginTop: '1rem'}}>
                            <input
                                style={{
                                    width: '70%',
                                    padding: '0.2rem 0',
                                    border: '0px',
                                    background: ' linear-gradient(to right, #41a9df, #2f6ae1)',
                                    color: '#fff',
                                    borderRadius: '5px'
                                }}
                                type="button" value="确认使用"
                                onClick={this.loding}
                            />
                        </div>
                    }
                </div>
            </div>
        )
    }
}