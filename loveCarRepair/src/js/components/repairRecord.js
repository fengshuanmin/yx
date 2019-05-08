/**
 * Created by Administrator on 2016/9/21 0021.
 */
import React from 'react'
import $ from 'jquery'
import { Router, Route, IndexRoute } from 'react-router'
import { createHashHistory, useBasename } from 'history'
import {MaintenanceRecord,DSYButton} from '../../../../common/assembly/someAssembly'
import {MoTai,Close} from '../../../../common/assembly/Stateless'

const RepairRecord = React.createClass({
    getInitialState() {
        return {
            recordList: [],
            pageN:1,
            PageTotal:0,
            plateNo:"",
            loadmodalState:false,
            tsmodalState:"",
            liNum:0,
            czInfo:"",
            tishi:false
        }
    },
    serverRequest (data){
        this.setState({loadmodalState:true});
        $.ajax({
            url: "/lexiugo-app/weixin/evaluation/getPTList.do",
            data:data,
            dataType: "json",
            type: "POST",
            success: function(msg) {
                const recordList = this.state.recordList,pageN = this.state.pageN;
                    if (recordList==""){
                        this.setState({recordList:msg.list,pageN:parseInt(pageN)+1},()=>{
                            this.props.project.setProps({
                                firstList:msg.list[0],
                                user:{data:{LxAqYhxxb:{username:msg.list[0].customername}}}
                            },()=>{
                                var newParams=window.location.pathname.split("/").pop();
                                //if(!(newParams=='server' || newParams ==''))return;
                                $.post('/lexiugo-app/weixin/getCouponList',{taskId:this.props.project.firstList.id,state:'-2'},(msg)=>{
                                    if(msg.data && msg.data.datas && msg.data.datas[0] && msg.code !='0006'){
                                        this.setState({
                                            tishi:(<MoTai>
                                                <div style={{width:'70%'}} >
                                                    <img onClick={()=>{
                                                    this.props.history.pushState(data,"/Coupon");
                                                }} style={{width:'100%'}} src={require('../../img/zu.png')} alt=""/>
                                                    <Close T={this}/>
                                                </div>
                                            </MoTai>)
                                        })
                                        this.props.project.setProps({
                                            haveAdian:true
                                        })
                                    }
                                })
                            })
                        });
                        this.setState({liNum:this.state.recordList.length,czInfo:this.state.recordList[0],PageTotal:msg.PageTotal});
                    }else {
                        $.merge(recordList,msg.list);
                        this.setState({recordList:recordList,pageN:parseInt(pageN)+1,liNum:recordList.length});
                    }
            }.bind(this),
            error:function(eee){
                this.setState({modalState:false});
                console.log(eee)
            }
        });
    },
    jiebang(){
        this.setState({tsmodalState:"确认要解绑吗？"});
    },
    Unbundling(){
        $.ajax({
            url: "/lexiugo-app/weixin/evaluation/getEvaluate.do",
            data:{fromFlag:5,openid:this.props.project.wxConfig.openid},
            dataType: "json",
            type: "POST",
            success: (msg)=>{
                if(msg.dataStr=="1"){
                    // 打开绑定提示
                    this.setState({tsmodalState:"解绑成功！"});
                    localStorage.setItem("plateNo", '');
                    localStorage.setItem("flag", '');
                }else{
                    this.setState({tsmodalState:"解绑失败，请重新尝试！"});
                }
            },
            error:function(eee){
                console.log(eee)
            }
        });
    },
    modalStateChange(){
        this.setState({tsmodalState:''})
    },
    tsmodalStateChange(){
        var str  =this.state.tsmodalState;
        if(str=='确认要解绑吗？'){
            this.props.project.unBindCar(this);
            return;
        }
        if (str.indexOf("失败")!=-1||str.indexOf("全部")!=-1){
            this.setState({tsmodalState:""})
        }else {
            this.props.history.replaceState({canIn:true},'/login')
        }
    },
    loadMore(){
        const pageN = parseInt(this.state.pageN),plateNo=localStorage.getItem("plateNo"), data = {
                plateNo : plateNo,
                pageno : pageN,
                pagesize : "5"
            };
        console.log(this.state.liNum)
        if (this.state.liNum<this.state.PageTotal){
            this.serverRequest (data)
        }else {
            this.setState({tsmodalState:"全部加载完毕"})
        }
        },
    componentDidMount(){
        console.log( this.props.project.timeString(1510229796000));
        const plateNo= this.props.project.wxConfig && this.props.project.wxConfig.plateNo, data = {
            plateNo :  plateNo || '沪H88268',
            pageno : "1",
            pagesize : "5"
        };
        this.serverRequest(data)
    },
    toDetails(data,e){
        localStorage.setItem("taskId", data.id);
        this.props.history.pushState(data,"/repairDetails");
    },
    toPing(data,e){
        localStorage.setItem("taskId", data.id);
        this.props.history.pushState(data,"/RepairDiscuss");
    },
    toJB(){},
    componentDidUpdate(){},
    render(){
        const recordArr=[],recordList = this.state.recordList,czInfo=this.state.czInfo;
        return(
            <div className="repairRecord Rcontainer">
                <div className="repairRecordBox">
                    <div className="headDetail">
                        <span onClick={this.jiebang} className="jiebang"></span>
                        <ul className="recordUl">
                            <li><span>车主姓名:</span><span>{czInfo.customername!=null?czInfo.customername:czInfo.sendCarPerson}</span></li>
                            <li><span>车牌号:</span><span>{czInfo!=""?czInfo.plateno:""}</span></li>
                            <li><span>车型:</span><span>{czInfo!=""?czInfo.cxmc:""}</span></li>
                            <li><span>VIN码:</span><span>{czInfo!=""?czInfo.vincode:""}</span></li>
                        </ul>
                    </div>
                </div>
                <h4 className="ordeTitle">我的维修单</h4>
                <div className="listBoxs" style={{padding:'0.3rem'}}>
                    <MaintenanceRecord data={this.state.recordList || []} {...this.props} T={this}/>
                </div>
                <DSYButton {...this.props} T={this} on={1} ButtonFrom="myCar"/>
                {this.state.tishi}



                <div className="weui_dialog_alert" style={this.state.tsmodalState==""?{display:"none"}:{display:"block"}}>
                    <div className="weui_mask"></div>
                    <div className="weui_dialog">
                        <div className="weui_dialog_hd"><strong className="weui_dialog_title"  onClick={this.modalStateChange}></strong></div>
                        <div className="weui_dialog_bd">{this.state.tsmodalState}</div>
                        <div className="weui_dialog_ft">
                            <a className="weui_btn_dialog primary" onClick={this.tsmodalStateChange}>好</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
export default RepairRecord



