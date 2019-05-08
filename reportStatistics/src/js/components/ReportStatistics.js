/**
 * Created by Administrator on 2016/10/12 0012.
 */
import React from 'react';
import $ from "jquery";
import RepairReport from "./RepairReport"
import RepairStraight from "./RepairStraight"
import {Tabs} from '../antd-mobile/index.web'
const TabPane = Tabs.TabPane;
function callback(key) {
    console.log(key);
}

const ReportStatistics = React.createClass({
    getInitialState () {
        return {
            parentLoadmodalState:"false",
            username: "",
            password: "",
            loginIn:"",
            modalState:""
        };
    },
    setLoadmodalState(newState){
        this.setState({
            parentLoadmodalState:newState
        })
    },
    toLogin(){
        var openId = $("#openid").val()
        //var openid = document.getElementById("openid").value
        //alert(openid)
        $.ajax({
            url: "/lexiugo-app/logout",
            data: {
                openId: openId
            },
            dataType: "json",
            type: "post",
            success: function (msg) {
                //alert(msg.flag)
                if (msg.flag =="0"){
                    this.props.history.replaceState(null, "/login")
                }else if(msg.flag =="1"){
                    alert("退出失败")
                }
            }.bind(this),
            error: function (error) {
                //alert(error)
            }
        })
    },
    render(){
        return (
            <div className="ReportStatistics Rcontainer">
                <Tabs defaultActiveKey="1" swipeable={false}>
                    <TabPane tab="推修统计报表" key="1">
                        <RepairReport setLoadmodalState = {this.setLoadmodalState}></RepairReport>
                    </TabPane>
                    <TabPane tab="配件直供报表" key="2">
                        <RepairStraight setLoadmodalState = {this.setLoadmodalState}></RepairStraight>
                    </TabPane>
                </Tabs>
                <div id="loadingToast" className="weui_loading_toast" style={this.state.parentLoadmodalState=="true"?{display:"block"}:{display:"none"}}>
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
                <span className="reLogin" onClick={this.toLogin}>
                    <em className="iconfont">&#xe605;</em>
                </span>
            </div>
        )
    }
});


//<div className="weui_mask_transparent"></div>
export default ReportStatistics;
