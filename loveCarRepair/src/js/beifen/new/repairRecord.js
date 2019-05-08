/**
 * Created by Administrator on 2016/9/21 0021.
 */
import React from 'react'
import $ from 'jquery'
import { Router, Route, IndexRoute } from 'react-router'
import { createHashHistory, useBasename } from 'history'
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
            czInfo:""
        }
    },
    toLogin(){
        this.props.history.replaceState(null,'/login')
    },
    serverRequest (data){
        this.setState({loadmodalState:true});
        $.ajax({
//            url: "/lexiugo_test/weixin/evaluation/getPTList.do",
            url: "/lexiugo-app/weixin/evaluation/getPTList.do",
            data:data,
            dataType: "json",
            type: "POST",
            success: function(msg) {
            	console.log(msg)
                this.setState({loadmodalState:false});
                const recordList = this.state.recordList,pageN = this.state.pageN;
                    if (recordList==""){
                        this.setState({recordList:msg.list,pageN:parseInt(pageN)+1});
                        this.setState({liNum:this.state.recordList.length,czInfo:this.state.recordList[0],PageTotal:msg.PageTotal});
                    }else {
                        $.merge(recordList,msg.list);
                        this.setState({recordList:recordList,pageN:parseInt(pageN)+1,liNum:recordList.length});
                    }
                    console.log(this.state.pageN)  
            }.bind(this),
            error:function(eee){
                this.setState({modalState:false});
                console.log(eee)
            }
        });
    },
    Unbundling(){
        $.ajax({
//            url: "/lexiugo_test/weixin/evaluation/getEvaluate.do",
            url: "/lexiugo-app/weixin/evaluation/getEvaluate.do",
            data:{fromFlag:5,openid:localStorage.getItem("openid")},
//            contentType: "application/javascript",
            dataType: "json",
//            jsonp: "callback",
            type: "POST",
            success: function(msg) {
                if(msg.dataStr=="1"){
                    // 打开绑定提示
                    this.setState({tsmodalState:"解绑成功！"});
                }else{
                    this.setState({tsmodalState:"解绑失败，请重新尝试！"});
                }
            }.bind(this),
            error:function(eee){
                console.log(eee)
            }
        });
    },
    tsmodalStateChange(){
        var str  =this.state.tsmodalState;
        if (str.indexOf("失败")!=-1||str.indexOf("全部")!=-1){
            this.setState({tsmodalState:""})
        }else {
            this.props.history.replaceState(null,'/login')
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
        const plateNo= localStorage.getItem("plateNo"), data = {
            plateNo : plateNo,
            pageno : "1",
            pagesize : "5"
        };
        this.serverRequest(data)
    },
    toDetails(data,e){
        localStorage.setItem("taskId", data.id);
        this.props.history.replaceState(null, "/repairDetails");
    },
    componentDidUpdate(){
        /*const recordList=this.state.recordList,$recordListLi= $(".recordList"),this_=this;
        $recordListLi.bind("click",function(){
            //var taskId = recordList[$(this).index()].id;
            //localStorage.setItem("taskId", taskId);
            this_.props.history.replaceState(null, "/repairDetails");
        })*/
    },
    render(){
        const recordArr=[],recordList = this.state.recordList,czInfo=this.state.czInfo;
        for(var i=0;i<recordList.length;i++){
            var item=recordList[i];
            recordArr.push(
                <div className="order" key={i}>
                    <ul className="recordUl">
                        <li><span>报案号:</span><span>{item.reportno}</span></li>
                        <li><span>维修金额:</span><span>23233</span></li>
                        <li><span>修理厂名称:</span><span>张江毫克汽修集团</span></li>
                        <li><span>修理厂地址:</span><span>上海市浦东新区张江高科技园区</span></li>
                        <li><span>维修进度:</span><span>{item.stateStr}</span></li>
                    </ul>
                    <div className="buttonStyle">
                        <input type="button" onClick={()=>{this.props.history.replaceState(null, "/leCheHelp")}} value="选择推修" />
                        <input type="button"  value="查看详情" onClick={this.toDetails.bind(this,item)}/>
                    </div>
                </div>
            )
        }


        return(
            <div className="repairRecord Rcontainer">
                <div className="Rheader">
                    <span className="headerBtn" onClick={this.toLogin}><em className="iconfont">&#xe609;</em></span>
                    <span>维修详情</span>
                    <span className="headerBtn" onClick={this.Unbundling}><em className="iconfont">&#xe60f;</em>解绑</span>
                </div>
                <div className="repairRecordBox">
                    <div className="headDetail">
                        <ul className="recordUl">
                        <li><span>车主姓名:</span><span>{czInfo.customername!=null?czInfo.customername:czInfo.sendCarPerson}</span></li>
                        <li><span>车牌号:</span><span>{czInfo!=""?czInfo.plateno:""}</span></li>
                        <li><span>车型:</span><span>{czInfo!=""?czInfo.cxmc:""}</span></li>
                        <li><span>VIN码:</span><span>{czInfo!=""?czInfo.vincode:""}</span></li>
                        </ul>
                    </div>
                </div>
                    <h4>我的维修单</h4>
                <div>
                    {recordArr}
                </div>





{/*
                <div className="carOwnerInfo commPadding">
                    <p className="titleInfo clearfix">
                        <span className="czxx titleImg"></span>
                        <span className="titleContext">车主信息</span>
                    </p>
                    <div className="infoTable">
                        <table border="0">
                            <tbody>
                                <tr>
                                    <td>车主姓名：</td>
                                    <td><span>{czInfo.customername!=null?czInfo.customername:czInfo.sendCarPerson}</span></td>
                                </tr>
                                <tr>
                                    <td>车牌号：</td>
                                    <td><span>{czInfo!=""?czInfo.plateno:""}</span></td>
                                </tr>
                                <tr>
                                    <td>车型：</td>
                                    <td><span>{czInfo!=""?czInfo.cxmc:""}</span></td>
                                </tr>
                                <tr>
                                    <td>VIN码：</td>
                                    <td><span>{czInfo!=""?czInfo.vincode:""}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="repairRecord commPadding">
                    <p className="titleInfo clearfix">
                        <span className="wxjl titleImg"></span>
                        <span className="titleContext">维修记录</span>
                    </p>
                    <div className="infoTable">
                        <ul className="recordList">
                            {recordArr}
                        </ul>
                    </div>
                    <div className="loadMore" onClick={this.loadMore} style={this.state.liNum<5?{display:"none"}:{display:"block"}}>
                        点击加载更多
                    </div>
                </div>

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
                <div id="loadingToast" className="weui_loading_toast" style={this.state.loadmodalState?{display:"block"}:{display:"none"}}>
                    <div className="weui_mask_transparent"></div>
                    <div className="weui_toast">
                        <div className="weui_loading">
                            <div className="weui_loading_leaf weui_loading_leaf_0"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_1"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_2"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_3"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_4"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_5"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_6"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_7"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_8"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_9"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_10"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_11"></div>
                        </div>
                        <p className="weui_toast_content">数据加载中</p>
                    </div>
                </div>
                */}
            </div>
        )
    }
});
export default RepairRecord



