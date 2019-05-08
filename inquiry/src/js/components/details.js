/**
 * Created by Administrator on 2016/9/13.
 */
import React from 'react';
import $ from "jquery";
import ShowEWM from '../assembly/showEWM'
import verification from '../../../../config/verification'
import VehicleInfo from './vehicleInfo';
const Details = React.createClass({
    getInitialState() {
        return{
            progressState:"0",
            dataState:"",
            prePathname:"",
            showState:"",
            XLCData:{}
        }
    },
    toRecord(){
        //var prePathname= this.props.location.state.prePathname
        //console.log(prePathname)
        this.props.history.replaceState(null, 'record');
    },

    _setState(name,value) {
        var newState = {};
        newState[name] = value;
        this.setState(newState);
    },
    componentDidMount: function () {
        const data = this.props.location.state;
        this.setState({dataState:data})
        this.setState({prePathname:data.prePathname})
        this.setState({showState:data.showState})
        console.log(data)
    },
    changeXLC(m,e){
        m=='open' && this.setState({changeXLC:!this.state.changeXLC});
    },
    //查询修车厂
    xlcHandleChange(e){
        const data= e.target.value
        this.setState({xlcData:data});
        var brandName=$('input[name=brandName]').val();
        var tmxhavepjType=this.props.location.query.tmxhavepjType;
        var tmxCarType=this.props.location.query.tmxCarType;
        var _this=this;
        $('.brandItem').eq(1).show();
        $.ajax({
            url: "/lexiugo-app/weixin/insurance/getXlc",
            data:{
                val:data,
                brandName:this.state.dataState.brandName || '',
                tmxhavepjType:this.state.dataState.tmxhavepjType || '',
                tmxCarType:this.state.dataState.tmxCarType || '',
                xlcRepairLevel:this.state.dataState.xlcRepairLevel || ''
            },
            dataType: "json",
            type: "post",
            success: function(msg) {
                var XCCList=[];
                var list=msg.data.xlc;
                for(var i in list){
                    XCCList.push(<li key={i} onClick={_this.xCar.bind(_this,list[i],'xcc')}>{list[i].libName}</li>)
                }
                _this.setState({XCCList:XCCList},()=>{
                    $('.brandItem').show();
                })
            }.bind(this)
        });
    },
    TBlur(){
        $('.brandItem').slideUp()
    },
    xCar(obj,type,e){
        if(type=='brand'){
            $('input[name=brandName]').val(obj.brandName);
        }else{
            var mtc={}
            $('input[name=xlcName]').val(obj.libName ||obj.name);
            mtc.xlcName=obj.libName||obj.name,mtc.xlcCode=obj.zzid|| obj.id;
            this.setState({xlcId:mtc.xlcCode})
        }
        this.setState({type2:Object.assign({},this.state.type2,mtc)});
        var xlcdata=this.state.XLCData;
        xlcdata.xlcName=mtc.xlcName
        this.setState({XLCData:xlcdata})
        $('.brandItem').hide();
    },
    submits(){
        if(!this.state.xlcId){
            this.setState({modalState:'请先选择修理厂'})
            return;
        }
        var _this=this;
        $.post('/lexiugo-app/weixin/insurance/changeXlc',{taskId:this.state.dataState.taskId,xlcId:this.state.xlcId},(data)=>{
            if(data.code=='0000'){
                var j=_this.state.dataState
                j.xlcId=data.xlcId;
                j.xlcName=data.xlcName;
                j.xlcTel=data.xlcTel;
                _this.setState({dataState:j})
                _this.changeXLC('open');
                _this.setState({modalState:'修改修理厂成功'})
            }else{
                _this.setState({modalState:'修改修理厂失败'})
            }

        })
    },
    showEWM(a,e){
        var mk=this.state.dataState;
        var text=mk.plateNo+';'+mk.sendCarPerson+';'+null+';'+mk.taskId;
        this.setState({showEWM:!this.state.showEWM,text:text})
    },
    modalStateChange(){
        this.setState({modalState:!this.state.modalState})
    },
    Choice(m,e){
        if(m=='open'){
            this.setState({mapState:!this.state.mapState})
        }else{
            this.xCar(m,"xcc",null);
            $('.choseXlcInput').val(m.name);
            this.Choice('open')
        }
    },
    render(){
        const progressStyle={
            color:"#1E7BE3"
        };
        const detailsData = this.state.dataState;
        var type='';
        if(this.state.showState >=1){
            type="已到店"
        }else if(!detailsData.tmxIsRead){
            type="修理厂未读"
        }else{
            type="已读未到店"
        }
        return (
            <div className="details Rcontainer" style={{background:'#fafafa'}}>
                <div className="headerInfo">
                    <span className="iconfont" onClick={this.toRecord}>&#xe609;</span>
                    推修详情
                </div>
                <div className="detailsContext">
                    <div className="iconProgress">
                        <p style={this.state.showState>=1?progressStyle:{}}>
                           <span style={this.state.showState>=1?progressStyle:{}} className="iconfont">&#xe611;</span>
                            {type}
                        </p>
                        <span style={this.state.showState>=2?progressStyle:{}} className="iconfont">&#xe612;</span>
                        <p style={this.state.showState>=2?progressStyle:{}}>
                           <span style={this.state.showState>=2?progressStyle:{}} className="iconfont">&#xe611;</span>
                            维修中
                        </p>
                        <span style={this.state.showState>=3?progressStyle:{}} className="iconfont">&#xe612;</span>
                        <p style={this.state.showState>=3?progressStyle:{}}>
                           <span style={this.state.showState>=3?progressStyle:{}} className="iconfont">&#xe611;</span>
                            已完成
                        </p>
                    </div>
                    <div>
                        <div className="detailsList">
                            <h4>基本信息</h4>
                            <ul>
                                <li><span>车牌号:</span>{detailsData.plateNo}</li>
                                <li><span>推修类型:</span>{detailsData.pushType}</li>
                                <li><span>定损员:</span>{detailsData.lossBy}</li>
                                <li><span>修理厂:</span>
                                    <span>
                                        {detailsData.xlcName}
                                    </span>
                                </li>
                                <li><span>联系修理厂</span><span>{(detailsData.xlcTel)}</span><span  style={{marginLeft:'0.3rem'}}><a className="CallDcc" href={"tel:"+detailsData.xlcTel}></a></span></li>
                                {this.state.showState<1 ?
                                    <li>
                                        <span>变更修理厂:</span>
                                        <span onClick={this.changeXLC.bind(this,'open')}>变更</span>
                                    </li>:''
                                }

{/*
                                <li><span>修理厂联系方式:</span><span>{detailsData.xlcTel}</span><span><a className="CallDcc" href={"tel:"+detailsData.xlcTel}></a></span></li>
*/}
                            </ul>
                        </div>
                        <div className="detailsList">
                            <h4>案件信息 <span style={{float:'right',fontSize:'0.3rem',color:'#1c86ee',fontWeight:'500'}} onClick={this.showEWM}>点这里获取车主二维码</span></h4>
                            <ul>
                                <li><span>案件车辆:</span>{detailsData.taskCarType}</li>
                                <li><span>维修金额:</span>{detailsData.repairMoneny}</li>
                                <li><span>车主姓名:</span>{detailsData.sendCarPerson}</li>
                                <li><span>车主电话:</span>{detailsData.telePhone}</li>
                                <li><span>状态:</span>{detailsData.taskState}</li>
                                <li><span>接车时间:</span>{detailsData.inRepairTime}</li>
                                <li><span>推修时间:</span>{detailsData.createdTime}</li>
                            </ul>
                        </div>


                        {/*<table border="0">
                            <caption >基本信息</caption>
                            <tbody>
                            <tr>
                                <td>车牌号：<span>{detailsData.plateNo}</span></td>
                                <td>报案号：<span>{detailsData.reportNo}</span></td>
                            </tr>
                            <tr>
                                <td>定损员：<span>{detailsData.lossBy}</span></td>
                                <td >推修类型：<span>{detailsData.pushType}</span></td>
                            </tr>
                            <tr>
                                <td colSpan="2">修理厂：<span>{detailsData.xlcName}</span></td>
                                <td colSpan="2">联系方式：<span>{detailsData.xlcName}</span></td>
                            </tr>
                            </tbody>
                        </table>
                        <table border="0">
                            <caption >案件信息</caption>
                            <tbody>
                            <tr>
                                <td>案件车辆：<span>{detailsData.taskCarType}</span></td>
                                <td>维修金额：<span>{detailsData.repairMoneny}</span></td>
                            </tr>
                            <tr>
                                <td>电话：<span>{detailsData.telePhone}</span></td>
                                <td>状态：<span>{detailsData.taskState}</span></td>
                            </tr>
                            <tr>
                                <td colSpan="2">接车时间：<span>{detailsData.pushTime}</span></td>
                            </tr>
                            <tr>
                                <td colSpan="2">推修时间：<span>{detailsData.inRepairTime}</span></td>
                            </tr>
                            </tbody>
                        </table>*/}
                    </div>
                </div>

                <div style={!this.state.changeXLC ? {display:'none'}:{display:'flex'}} className="showEWM">
                    <div className="box">
                        <p>请选择要变更的修理厂 <span style={{float:'right',color:'#1083D1'}} onClick={this.Choice.bind(this,'open')}>地图点选修理厂</span></p>
                        <ul>
                            <li>
                                {this.state.xlcData && <span onClick={()=>{$('input[name=xlcName]').val('')}}></span>}
                                <input type="text" name="xlcName" placeholder="修理厂名称*必填" onChange={this.xlcHandleChange} onFocus={this.xlcHandleChange} onBlur={this.TBlur}/>
                                {/*<input className="mapButtom" type="button" value="地图点选" onClick={this.Choice.bind(this,'open')}/>*/}
                                <ul className="brandItem">
                                    {this.state.XCCList}
                                </ul>
                            </li>
                        </ul>
                        <div className="buttons">
                            <input onClick={this.changeXLC.bind(this,'open')}  type="button" value="取消"/>
                            <input type="button" value="确定" onClick={this.submits}/>
                        </div>
                    </div>
                </div>


                <div className="weui_dialog_alert" style={this.state.modalState=="" || !this.state.modalState?{display:"none"}:{display:"block"}}>
                    <div className="weui_mask"></div>
                    <div className="weui_dialog">
                        <div className="weui_dialog_hd"><strong className="weui_dialog_title" onClick={this.modalStateChange}></strong></div>
                        <div className="weui_dialog_bd">{this.state.modalState}</div>
                        <div className="weui_dialog_ft">
                            <a className="weui_btn_dialog primary" onClick={this.modalStateChange}>确定</a>
                        </div>
                    </div>
                </div>
                {this.state.showEWM && <ShowEWM showEWM={this.showEWM} texts='查看二维码' imgPath={this.state.text}/>}
                {this.state.mapState&&<div className="SMap"><VehicleInfo Choice={this.Choice}/></div>}
            </div>
        )

    }
})

export default Details