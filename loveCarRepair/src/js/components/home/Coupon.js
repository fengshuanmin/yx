/**个人中心**/
import React from 'react';
import $ from "jquery";
import {UserHeader,BaseLi,MoTai} from '../../../../../common/assembly/Stateless'
import {LoadList} from '../../../../../common/assembly/Logical'
import ChangeTitle from '../../../../../common/baseFun/someEvent'
import {Quan,EWM} from '../../common/baseComponent'
export default class Coupon extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            newQuan:[],
            outQuan:[],
            showData:[],
            sOk:false
        };
        this.QuanLi=(item)=>{
            if(item.outType != 'canuse')return;
            this.setState({EWM:item})
        };
        this.lodYHQ=(data,mt,add)=>{
            $.post('/lexiugo-app/weixin/getCouponList',data,(msg)=>{
                var arr=[],arrCant=[];
                if(!msg.data)return;
                var state=['canuse','used','timeOut','nojh']
                for(var i in (msg.data && msg.data.datas)) {
                    /*if(msg.data.datas[i].useStatus*1 == -1) {
                        msg.data.datas[i].useStatus = 3
                    }else{

                    }*/
                    var timeT=(Date.parse( new Date())-msg.data.datas[i].useTime)
                    var isNews=false;
                    if(data.state==0 && timeT <86400000){
                        isNews=true;
                    }
                    arr.push({
                        isNews:isNews,
                        useStatus:msg.data.datas[i].useStatus,
                        money: msg.data.datas[i].couponMoney,//555
                        minConsume: msg.data.datas[i].lowerLimit >= 1000 ? (msg.data.datas[i].lowerLimit>=10000 ? msg.data.datas[i].lowerLimit/10000+'万' : msg.data.datas[i].lowerLimit/1000+'千'):msg.data.datas[i].lowerLimit ,
                        maxConsume:msg.data.datas[i].upperLimit == Infinity || msg.data.datas[i].upperLimit =='Infinity'? 'Infinity':(msg.data.datas[i].upperLimit>= 1000 ? (msg.data.datas[i].upperLimit>=10000 ? msg.data.datas[i].upperLimit/10000+'万' : msg.data.datas[i].upperLimit/1000+'千'):msg.data.datas[i].upperLimit),
                        typeName: msg.data.datas[i].couponName,
                        startTime: this.props.project.timeString(msg.data.datas[i].createTime),
                        endTime: this.props.project.timeString(msg.data.datas[i].endTime),
                        phone: msg.data.datas[i].xlcPhone,//修理厂电话
                        store: msg.data.datas[i].xlcName,//限制修理厂
                        QId: msg.data.datas[i].ticketId,
                        TId: msg.data.datas[i].taskId,
                        useTime: this.props.project.timeString(msg.data.datas[i].useTime,'y-m-d h:m:s'),
                        outType: state[msg.data.datas[i].useStatus],
                        canSubmit:true
                    })
                }
                if(data.pageNum*1>1){
                    var datas=this.state.showData[0];
                    arr=datas.concat(arr);
                }else{
                    this.props.project.setScroll(0)
                }
                /*data.state==1 ? this.props.project.changeTitle('历史优惠券'):this.props.project.changeTitle('优惠券');*/
                this.setState({showData:[arr,data.state],query: (data.state=='0'),isCanNotShow:true},()=>{
                    mt ? mt(msg.data.datas.length || 0):'';
                    console.log(this.state.showData)
                })
            })
        }
        /*查询历史已使用或已过期 1 */
        this.lookOld=()=>{
            this.props.project.changeTitle('优惠券(过期或已使用)');
            this.setState({
                subData:{
                    taskId:this.props.project.firstList.id || '2c905cc86243402101626c10f6c21cc2',
                    pageNum:1,
                    state:1
                }
            },()=>{
                this.lodYHQ(this.state.subData)
            })
        }
        /*可用 0*/
        this.lookCanUse=(mt)=>{
            this.props.project.changeTitle('优惠券(可使用)');
            this.setState({
                subData:{
                    taskId:this.props.project.firstList.id || '2c905cc86243402101626c10f6c21cc2',
                    pageNum:1,
                    state:0
                }
            },()=>{
                this.lodYHQ(this.state.subData,mt||false)
            })
            /*this.lodYHQ(1)
            this.setState({showData:[this.state.QuanData,3]})*/
        }
        /**未激活 2**/
        this.cantUSer=()=>{
            this.props.project.changeTitle('优惠券(暂不可使用)');
            this.setState({
                subData:{
                    taskId:this.props.project.firstList.id || '2c905cc86243402101626c10f6c21cc2',
                    pageNum:1,
                    state:2
                }
            },()=>{
                this.lodYHQ(this.state.subData)
            })
        }

        this.Reload=(mt)=>{
            var newSUData=this.state.subData ||{};
            newSUData.pageNum=1;
            this.setState({
                subData:newSUData
            },()=>{
                this.lodYHQ(this.state.subData,mt||false)
            })
        }
        this.loadMore=(mt)=>{
            var newSUData=this.state.subData;
            newSUData.pageNum+=1;
            this.setState({
                subData:newSUData
            },()=>{
                this.lodYHQ(this.state.subData,mt ||false,'add')
            })
        }
    }
    componentWillMount(){
        this.lookCanUse((lt)=>{
            if(lt<=0){
                this.cantUSer();
            }
        })
        this.props.project.setProps({
            haveAdian:false
        })
    }

    componentDidMount(){
        this.props.project.changeTitle('优惠券');
    }
    render() {
        return (
            <div>
                {this.state.EWM && <MoTai><EWM data={this.state.EWM} sOk={this.state.sOk} T={this} /></MoTai>}
                <div style={{height:'1rem'}}>
                    <div style={{position:'fixed',zIndex:'999',width:'100%',left:'0px',top:'0px',background:'#fff',display:'flex',textAlign:'center'}}>
                        <span onClick={this.cantUSer} style={{flex:'1',padding:'0.3rem 0',borderBottom:this.state.showData[1]==2 && '1px solid #3f9bf3',color:this.state.showData[1]==2 && '#3f9bf3'}}>未激活</span>
                        <span onClick={this.lookCanUse} style={{flex:'1',padding:'0.3rem 0',borderBottom:this.state.showData[1]==0 && '1px solid #3f9bf3',color:this.state.showData[1]==0 && '#3f9bf3'}}>已激活</span>
                        <span onClick={this.lookOld} style={{flex:'1',padding:'0.3rem 0',borderBottom:this.state.showData[1]==1 && '1px solid #3f9bf3',color:this.state.showData[1]==1 && '#3f9bf3'}}>历史优惠券</span>
                    </div>
                </div>


                {((!this.state.showData[0] || !this.state.showData[0][0]) && this.state.isCanNotShow) && <div className="noDatas"><span>暂无优惠券</span></div>}
                <LoadList T={this} {...this.props} Reload={this.Reload} loadMore={this.loadMore}>
                    <Quan T={this} {...this.props} data={this.state.showData[0] || []}/>
                </LoadList>

            </div>
        )
    }
}