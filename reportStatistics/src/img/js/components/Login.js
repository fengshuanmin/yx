import React from 'react';
import $ from "jquery";
import cookie from '../cookieJs';
//import {Tabs,Toast} from '../antd-mobile/index.web'
//const TabPane = Tabs.TabPane;
//
//function callback(key) {
//    console.log(key);
//}
const LoginForm = React.createClass({
    getInitialState () {
        return {
            username: "",
            password: "",
            loginIn:"",
            modalState:""
        };
    },
    handleChange(e) {
        var newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    },
    serverRequest (data,url){
        //alert("dd")
        $.ajax({
            url: url,
            data:data,
            contentType: "application/javascript",
            dataType: "jsonp",
            jsonp: "callback",
            type: "post",
            success: function(msg) {
                console.log(msg);
                if (msg.code == "0000") {
                    this.props.history.replaceState(null, "/reportStatistics");
                }else {
                    this.setState({modalState:msg.mess})
                }
            }.bind(this)
        });
    },
    handleSubmit(e) {
        e.preventDefault();
        var data = {
            username: this.state.username,
            password: this.state.password
            //zw : 'FGSDSY',
        };
        if (data.userName == "" || data.password == "") {
            this.setState({modalState:"账号密码未填写"})
        } else {

            this.serverRequest(data,"http://192.168.120.124:8080/lexiugo-app/app_login")
        }
    },
    modalHide(){
        this.setState({modalState:""})
    },
    componentDidMount: function () {
        const locationPathName = this.props.location.pathname;
        if (locationPathName == "/") {
                this.serverRequest("","http://192.168.120.124:8080/lexiugo-app/user/getUserinfo")
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
            </div>
        )
    }
})
export default LoginForm;
