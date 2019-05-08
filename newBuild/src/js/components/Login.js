import React from 'react';
import $ from "jquery";
import ChangeTitle from '../../../../common/baseFun/someEvent'
//import cookie from '../cookieJs';

const LoginForm = React.createClass({
    getInitialState () {
        return {
            username: "",
            password: "",
            loginIn:"",
            //openId:"",
            modalState:""
        };
    },
    handleChange(e) {
        var newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    },
    serverRequest (data,url){
        //this.props.history.pushState(null, "/record");return;
        $.ajax({
            url: url,
            data:data,
            dataType: "JSON",
            type: "post",
            success: function(msg) {
                console.log(msg)
                if (msg.code == "0000") {
                    this.props.project.setProps({user:msg})
                    if (msg.openId){
                        //wxOpenId = msg.openId;
                        //alert(msg.openId)
                        $("#openid").val(msg.openId)
                    }
                    localStorage.setItem("username", this.state.username);
                    localStorage.setItem("password", this.state.password);
                    localStorage.setItem("yhxm", msg.data.LxAqYhxxb.yhxm);
                    localStorage.setItem("yhId", msg.data.LxAqYhxxb.id);
                    //localStorage.setItem("username", 1);
                    this.props.history.replaceState(msg.openId, "/record");
                }else if(msg.code == "0005"){
                    //获取openid
                    //alert(msg.openId)
                    if (msg.openId){
                        //alert("0="+msg.openId)
                        //wxOpenId = msg.openId;
                        $("#openid").val(msg.openId)
                    }
                }else {
                    if (msg.openId){
                        //alert("0="+msg.openId)
                        //wxOpenId = msg.openId;
                        $("#openid").val(msg.openId)
                    }
                    this.setState({modalState:msg.mess || '系统异常'})
                }
            }.bind(this)
        });
    },
    handleSubmit(e) {
        e.preventDefault();
        var data = {
            username: this.state.username,
            password: this.state.password,
            openId: localStorage.getItem("openid"),
            //this.state.openid
            zw : 'DSY'
        };
        //alert(data.openId)
        if (data.userName == "" || data.password == "") {
            this.setState({modalState:"账号密码未填写"})
        } else {
            this.serverRequest(data,"/lexiugo-app/app_login")
        }
    },
    modalHide(){
        this.setState({modalState:""})
    },
    modalStateChange(){
        this.setState({modalState:""})
    },
    /*componentDidMount: function () {
        const locationPathName = this.props.location.pathname;
        if (locationPathName == "/") {
            //alert("zw=DSY&url="+window.location.href);
                this.serverRequest("zw=DSY&url="+window.location.href,"/lexiugo-app/user/getUserinfo")
        }
        else if (locationPathName == "/login") {
            console.log("重新登录，请填写账号信息")
        }
    },*/
    componentDidMount(){
        ChangeTitle.ChangeTitle('案件推修');
        this.setState({username:localStorage.getItem("username")})
        this.setState({password:localStorage.getItem("password")})
        $("input[name=username]").val(localStorage.getItem("username"));
        $("input[name=password]").val(localStorage.getItem("password"));
        setTimeout(()=>{
            !localStorage.getItem("password") && $("input[name=password]").val('')
            if(localStorage.getItem("password") && $("input[name=password]").val() && $("input[name=username]").val()){
                $('button.submits').trigger("click")
            }
        },500)


    },
    render(){
        return (
            <div className="loginForm appRouter">
                <div className="logoItem"></div>
                <form onSubmit={this.handleSubmit}>
                    <div className="eleItem">
                        <label><span className="iconfont">&#xe605;</span></label>
                        <input type="text" className="username"  name="username" autocomplete="off"
                               placeholder="请输入用户名" onChange={this.handleChange}/>
                    </div>
                    <div className="eleItem">
                        <label><span className="iconfont">&#xe604;</span></label>
                        <input type="password" autocomplete="off"  name="password"
                               placeholder="请输入密码" onChange={this.handleChange}/>
                    </div>
                    <div className="btnItem">
                        <button type="submit" className="submits">登录</button>
                    </div>
                </form>
                <div className="weui_dialog_alert" style={this.state.modalState==""?{display:"none"}:{display:"block"}}>
                    <div className="weui_mask"></div>
                    <div className="weui_dialog">
                        <div className="weui_dialog_hd"><strong className="weui_dialog_title" onClick={this.modalStateChange}></strong></div>
                        <div className="weui_dialog_bd">{this.state.modalState}</div>
                        <div className="weui_dialog_ft">
                            <a className="weui_btn_dialog primary" onClick={this.modalStateChange}>确定</a>
                        </div>
                    </div>
                </div>
                {/*<div id="toast" style={this.state.modalState==""?{display:"none"}:{display:"block"}}>
                    <div className="weui_mask_transparent"  onClick={this.modalHide}></div>
                    <div className="weui_toast">
                        <i className="weui_icon_warn"></i>
                        <p className="weui_toast_content">{this.state.modalState}</p>
                    </div>
                </div>*/}
            </div>
        )
    }
})
export default LoginForm;
