/**
 * Created by Administrator on 2016/9/13.
 */
import React from 'react';
import $ from "jquery";
import DatePicker from 'react-mobile-datepicker';
var datetime = new Date();
module.exports = datetime;
const Query = React.createClass({
    getInitialState() {
        return {
            modalState: false,
            alertModalState:"",
            xlcData:[],
            taskList:[],
            isOpen: false
        }
    },
    toRecord(){
        this.props.history.replaceState(null, "/record");
    },
    xlcHandleChange(e){
        const data= e.target.value;
        this.serverRequest=$.ajax({
            url: "/lexiugo-app/weixin/insurance/getXlc",
            data:'val=' + data,
            dataType: "json",
            type: "post",
            success: function(msg) {
                this.setState({xlcData:msg.data.xlc});
                //console.log(this.state.xlcData)
                $(".xlcItem").show()
            }.bind(this)
        });
    },
    componentDidUpdate(){
        const xlcData=this.state.xlcData,$xlcNameLi= $(".xlcItem li"),this_=this,taskList=this.state.taskList,$recordListLi= $(".recordList li");
        $xlcNameLi.bind("click",function(){
            $(".xlcName").val(xlcData[$(this).index()].libName);
            $(".xlcItem").hide();
            $(".xlcId").val(xlcData[$(this).index()].zzid);
        })
        $recordListLi.bind("click",function(){
            taskList[$(this).index()]["prePathname"]="/query"
            //alert(dd)
            this_.props.history.pushState(taskList[$(this).index()], "/details");
        })
        //console.log(new Data())
        //this.setState({time:new Date()})
    },

    formOnSubmit(e){
        e.preventDefault();
        if($(".plateNo").val()==""&&$(".reportNo").val()==""&&$(".pushOrUpDate").val()==""&&$(".xlcName").val()==""&&$(".xlcId").val()==""){
            this.setState({alertModalState:"至少填写一个查询项"});
        }else{
            this.setState({modalState:true});
            var d = {
                taskState:"0",
                pageNo:"-1",
                plateNo:$(".plateNo").val(),
                reportNo:$(".reportNo").val(),
                pushOrUpDate:$(".pushOrUpDate").val(),
                xlcId:$(".xlcId").val(),
                xlcName:$(".xlcName").val()
            };
            console.log('开始请求');
            $.ajax({
                url: "/lexiugo-app/weixin/getPushTaskList",
                data:d,
                dataType: "JSON",
                type: "post",
                success: function(msg) {
                    console.log(msg);
                    if (msg.code=="0000"){
                        this.setState({modalState:false});
                        this.setState({taskList:msg.taskList});
                        console.log(this.state.taskList);
                        if (msg.data.totalPushTask=="0"){
                            this.setState({alertModalState:"没有查询到相关内容"})
                        }
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                    this.setState({modalState:false});
                }.bind(this)
            });
        }
    },
    alertModalStateChange(){
        this.setState({alertModalState:""})
    },


    handleCancel () {
        this.setState({ isOpen: false });
    },
    handleClick () {
        this.setState({ isOpen: true });
    },
    handleSelect (date) {
    datetime = date
    var date = date.getFullYear()
        + "-"// "年"
        + ((date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : "0"
        + (date.getMonth() + 1))
        + "-"// "月"
        + (date.getDate() < 10 ? "0" + date.getDate() : date
            .getDate());
        $(".pushOrUpDate").val(date);
        this.setState({isOpen: false });
        this.setState({pushOrUpDate: date});
    },
    componentDidMount(){

    },
    changeData(e){
        var newStart={};
        newStart[e.target.name]=e.target.value;
        this.setState(newStart);
    },
    render(){
        var xlcArr=[],xlcData = this.state.xlcData,recordArr=[],taskList = this.state.taskList;
        const xlcDatas= xlcData ? xlcData:'';
        for(var i=0;i<xlcDatas.length;i++){
            var item=xlcData[i];
            xlcArr.push(
                <li key={i} >{item.libName}</li>
            )
        }
        for(var i=0;i<taskList.length;i++){
            var item=taskList[i];
            recordArr.push(
                <li key={i}>
                    <table border="0" className="deTable">
                        <tbody>
                        <tr>
                            <td>报案号：<span>{item.reportNo}</span></td>
                            <td >{item.taskState}</td>
                            <td style={{textAlign:"right",color:"#1E7BE3"}}>查看详情<span className="iconfont">&#xe608;</span></td>
                        </tr>
                        <tr>
                            <td>车牌号：<span>{item.plateNo}</span></td>
                            <td colSpan="2">推修类型：<span>{item.pushType}</span></td>
                        </tr>
                        <tr>
                            <td colSpan="3">修理厂：<span>{item.xlcName}</span></td>
                        </tr>
                        <tr>
                            <td colSpan="3" style={{textAlign:"right",fontSize:".16rem"}}>{item.createdTime}</td>
                        </tr>
                        </tbody>
                    </table>
                </li>
            )

        }

        return (
                <div className="query Rcontainer">
                    <div className="headerInfo">
                        <span className="iconfont" onClick={this.toRecord}>&#xe609;</span>
                        报案查询
                    </div>
                    <div className="queryContainer">
                        <form method="post" action="" id="queryForm" name="queryForm" onSubmit={this.formOnSubmit}>
                            <table border="0">
                                <tbody>
                                    <tr>
                                        <td style={{position:'relative'}}>
                                            {this.state.plateNo && <span className="close" onClick={()=>{$('input[name=plateNo]').val('');this.setState({plateNo:''})}}></span>}
                                            <input className="form-input plateNo"  name="plateNo" autoComplete="off"  placeholder="车牌号" type="text" onChange={this.changeData} />
                                        </td>
                                    </tr><tr>
                                        <td style={{position:'relative'}}>
                                            {this.state.reportNo && <span className="close" onClick={()=>{$('input[name=reportNo]').val('');this.setState({reportNo:''})}}></span>}
                                            <input className="form-input reportNo"  name="reportNo" autoComplete="off"  placeholder="报案号" type="text" onChange={this.changeData} />
                                        </td>
                                    </tr><tr>
                                        <td colSpan="3" className="xlcNameRelative" style={{position:'relative'}}>
                                            {this.state.xlcName && <span className="close" onClick={()=>{$('input[name=xlcName],input[name=xlcId]').val('');this.setState({xlcName:''})}}></span>}
                                            <input className="form-input xlcName"  name="xlcName" autoComplete="off"  placeholder="修理厂名称" onChange={this.xlcHandleChange && this.changeData} type="text" />
                                            <input className="xlcId" name="xlcId"  type="hidden" />
                                            <div className="xlcItem">
                                                    {xlcArr}
                                            </div>
                                        </td>

                                    </tr><tr>
                                        <td style={{position:'relative'}}>
                                            {this.state.pushOrUpDate && <span className="close" onClick={()=>{$('input[name=pushOrUpDate]').val('');this.setState({pushOrUpDate:''})}} ></span>}
                                            <input className="form-input pushOrUpDate"  readOnly onFocus ={this.handleClick}  name="pushOrUpDate" autoComplete="off"  placeholder="推修/弃修时间" type="text" onChange={this.changeData} />
                                            <DatePicker
                                                value={datetime}
                                                isOpen={this.state.isOpen}
                                                onSelect={this.handleSelect}
                                                theme="ios"
                                                dateFormat={ ['YYYY年', 'MM月', 'DD日']}
                                                onCancel={this.handleCancel} />

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className="publicBtn queryBtn" type="submit" >精确查询</button>
                        </form>
                            <ul className="recordList">
                                {recordArr}
                            </ul>
                    </div>
                    <div className="weui_dialog_alert" style={this.state.alertModalState==""?{display:"none"}:{display:"block"}}>
                        <div className="weui_mask"></div>
                        <div className="weui_dialog">
                            <div className="weui_dialog_hd"><strong className="weui_dialog_title" onClick={this.modalStateChange}></strong></div>
                            <div className="weui_dialog_bd">{this.state.alertModalState}</div>
                            <div className="weui_dialog_ft">
                                <a className="weui_btn_dialog primary" onClick={this.alertModalStateChange}>确定</a>
                            </div>
                        </div>
                    </div>
                    <div id="loadingToast" className="weui_loading_toast" style={this.state.modalState?{display:"block"}:{display:"none"}}>
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

                        </div>
                    </div>
                </div>
            )
    }
})

export default Query
//<div className="loadMore" style={this.state.liNum<=10?{display:"none"}:{display:"block"}}>
//点击加载更多
//</div>
//<input className="form-input pushOrUpDate"  name="pushOrUpDate" autoComplete="off"  placeholder="推修/弃修时间" type="date" />