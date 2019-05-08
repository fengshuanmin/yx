import React from 'react';
import $ from 'jquery';
import {LoadList} from '../../../../../common/assembly/Logical'
import {Quan} from '../../../../../loveCarRepair/src/js/common/baseComponent'
export default class CouponHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showData:[],loaderNum:1};
        this.QuanLi=(item)=>{
            this.props.history.pushState(item,'/couponDetails');
        }
        this.loaderList=(num,mt,add)=>{
            $.post('/lexiugo-app/weixin/historyXlcTicket',{pageNum:num},(msg)=>{
                var arrCant=[]
                var state=['canuse','used','timeOut','nojh']

                for(var i=0;i<msg.data.datas.data.length;i++) {
                    arrCant.push({
                        useStatus: msg.data.datas.data[i].useStatus,
                        money: msg.data.datas.data[i].couponMoney,//555
                        minConsume: msg.data.datas.data[i].lowerLimit >= 1000 ? (msg.data.datas.data[i].lowerLimit>=10000 ? msg.data.datas.data[i].lowerLimit/10000+'万' : msg.data.datas.data[i].lowerLimit/1000+'千'):msg.data.datas.data[i].lowerLimit ,
                        maxConsume:msg.data.datas.data[i].upperLimit == Infinity || msg.data.datas.data[i].upperLimit =='Infinity'? 'Infinity':(msg.data.datas.data[i].upperLimit>= 1000 ? (msg.data.datas.data[i].upperLimit>=10000 ? msg.data.datas.data[i].upperLimit/10000+'万' : msg.data.datas.data[i].upperLimit/1000+'千'):msg.data.datas.data[i].upperLimit),
                        typeName: msg.data.datas.data[i].couponName,
                        startTime: this.props.project.timeString(msg.data.datas.data[i].createTime),
                        endTime: this.props.project.timeString(msg.data.datas.data[i].endTime),
                        phone: msg.data.datas.data[i].userId,//修理厂电话
                        store: msg.data.datas.data[i].xlcName,//限制修理厂
                        QId: msg.data.datas.data[i].ticketId,//优惠券id
                        TId: msg.data.datas.data[i].taskId,//退修单id
                        useTime:this.props.project.timeString(msg.data.datas.data[i].useTime,'y-m-d h:m:s'),
                        outType: '1',
                        canSubmit:true,
                        isHistry:true,
                        reportno:msg.data.datas.data[i].plateNo,
                        userName:msg.data.datas.data[i].userName
                    })
                }
                mt && mt(msg.data.datas.data.length || 0)
                if(add=='add'){
                    var datas=this.state.showData;
                    arrCant=datas.concat(arrCant);
                }
                this.setState({showData:arrCant})
            })
        }
        this.Reload=(mt)=>{
            this.setState({
                loaderNum:1
            },()=>{
                this.loaderList(1,mt,'')
            })
        }
        this.loadMore=(mt)=>{
            var newNum=this.state.loaderNum+1;
            this.setState({
                loaderNum:newNum
            })
            this.loaderList(this.state.loaderNum,mt,'add')
        }
    }
    componentWillMount(){
        this.props.project.changeTitle('历史优惠券');
        var xlcId=this.props.project.user.data.LxAqYhxxb.id;
        this.Reload(false)
    }
    render() {
        return (
            <div>
                {/**/}
                {(!this.state.showData[0]) && <div className="noDatas"><span>暂无优惠券</span></div>}

                <LoadList {...this.props} Reload={this.Reload} loadMore={this.loadMore}>
                    <Quan T={this} {...this.props} data={this.state.showData || []}/>
                </LoadList>
            </div>
        )
    }
}