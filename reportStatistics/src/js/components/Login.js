import React from 'react';
import $ from "jquery";
import cookie from '../cookieJs';
//import {Tabs,Toast} from '../antd-mobile/index.web'
//const TabPane = Tabs.TabPane;
//
//function callback(key) {
//    console.log(key);
//}

//var wxOpenId = "";
//module.exports = wxOpenId;

const LoginForm = React.createClass({
    getInitialState () {
        return {
            username: "",
            password: "",
            loginIn:"",
            modalState:"",
            loadmodalState:false
        };
    },
    handleChange(e) {
        var newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    },
    //serverRequest (data,url){
    //    this.setState({loadmodalState:true})
    //    $.ajax({
    //        url: url,
    //        data:data,
    //        //contentType: "application/javascript",
    //        dataType: "json",
    //        //jsonp: "callback",
    //        type: "post",
    //        success: function(msg) {
    //            console.log(msg);
    //            this.setState({loadmodalState:false});
    //            if (msg.code == "0000") {
    //                this.props.history.replaceState(null, "/reportStatistics");
    //            }else {
    //                this.setState({modalState:msg.mess})
    //            }
    //        }.bind(this)
    //    });
    //},
    serverRequest (data,url){
        this.setState({loadmodalState:true})
        $.ajax({
            url: url,
            data:data,
            dataType: "json",
            type: "post",
            success: function(msg) {
                this.setState({loadmodalState:false});
                //alert(data.openId)
                //alert(msg.code)
                //alert(msg.openId)
                if (msg.code == "0000") {
                    if (msg.openId){
                        //alert("1="+msg.openId)
                        $("#openid").val(msg.openId)
                        //alert($("#openid").val())
                    }
                    this.props.history.replaceState(null, "/reportStatistics");
                }else if(msg.code == "0005"){
                    //获取openid
                    if (msg.openId){
                        //alert("0="+msg.openId)
                        $("#openid").val(msg.openId)
                    }
                }else {
                    if (msg.openId){
                        //alert("0="+msg.openId)
                        $("#openid").val(msg.openId)
                    }
                    this.setState({modalState:msg.mess})
                }
            }.bind(this)
        });
    },
    handleSubmit(e) {
        e.preventDefault();
        var data = {
            username: this.state.username,
            password: this.state.password,
            openId: $("#openid").val(),
            zw: "GLY"
        };
        if (data.userName == "" || data.password == "") {
            this.setState({modalState:"账号密码未填写"})
        } else {
            this.serverRequest(data,"/lexiugo-app/app_login")
        }
    },
    modalHide(){
        this.setState({modalState:""})
    },
    componentDidMount: function () {
        const locationPathName = this.props.location.pathname;
        if (locationPathName == "/") {
            //$.ajax({
            //    url: "/lexiugo-app/user/getUserinfo",
            //    data:"",
            //    //contentType: "application/javascript",
            //    dataType: "json",
            //    //jsonp: "callback",
            //    type: "post",
            //    success: function(msg) {
            //        console.log(msg);
            //        if (msg.code == "0000") {
            //            this.props.history.replaceState(null, "/reportStatistics");
            //        }
            //    }.bind(this)
            //});
            //alert("zw=GLY&url="+window.location.href);
            this.serverRequest("zw=GLY&url="+window.location.href,"/lexiugo-app/user/getUserinfo")
        }
        else if (locationPathName == "/login") {
            console.log("重新登录，请填写账号信息")
        }
    },

    render(){
        return (
            <div className="loginForm appRouter">
                <div className="logoItem"></div>
                <form onSubmit={this.handleSubmit}>
                    <div className="eleItem">
                        <label><span className="iconfont">&#xe605;</span></label>
                        <input type="text"  name="username"
                               placeholder="请输入用户名" onChange={this.handleChange}/>
                    </div>
                    <div className="eleItem">
                        <label><span className="iconfont">&#xe604;</span></label>
                        <input type="password"  name="password"
                               placeholder="请输入密码" onChange={this.handleChange}/>
                    </div>
                    <div className="btnItem">
                        <button type="submit">登录</button>
                    </div>
                </form>
                <div id="toast" style={this.state.modalState==""?{display:"none"}:{display:"block"}}>
                    <div className="weui_mask_transparent"  onClick={this.modalHide}></div>
                    <div className="weui_toast">
                        <i className="weui_icon_warn"></i>
                        <p className="weui_toast_content">{this.state.modalState}</p>
                    </div>
                </div>
                <div id="loadingToast" className="weui_loading_toast" style={this.state.loadmodalState?{display:"block"}:{display:"none"}}>
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
                        <p className="weui_toast_content">正在登录中</p>
                    </div>
                </div>
            </div>
        )
    }
})
export default LoginForm;
