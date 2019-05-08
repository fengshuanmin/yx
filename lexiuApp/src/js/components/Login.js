/*
 * App登录
 * */
import React from 'react';
import $ from 'jquery';
import { createHistory, createHashHistory, useBasename } from 'history';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, Link, IndexRoute, IndexLink, Redirect  } from 'react-router'
import {IconFont,HeaderIf,ModalBg} from '../commonComponent/common'
//import cookie from '../commonComponent/cookieJs'

const LoginForm = React.createClass({
    getInitialState () {
        return {
            username: "",
            password: "",
            loginIn:"",
            dis:false,
        };
    },
    handleChange(e) {
        var newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    },
  //控制模态框
	modalState(a){
		var scrollHeight = $(window).scrollTop();
		$('.modalBox').css({
			"top":scrollHeight+150+"px"
		})
		console.log(scrollHeight);
		//修改this.state.dis控制模态框出现消失
		if (!this.state.dis){
			this.setState({dis:true})
		}else {
			this.setState({dis:false})
		}//修改this.state.receGiveUP控制模态框内容区出现接车部分或者放弃部分
		if(a=="prompt"){
			this.setState({receGiveUP:"1"})
		}else {}
	},
	queClick(){
		this.modalState();
	},
    handleSubmit(e) {
        e.preventDefault();
        var wxOpenId = $("#openid").val()
        var data = {
        	username: this.state.username,
            password: this.state.password,
            openId:localStorage.getItem("openid"),
            zw:"XLC"
        };
        $.ajax({
            url: "/lexiugo-app/app_login",
            data: data,
            //contentType: "application/javascript",
            dataType: "json",
            //jsonp: "callback",
            //jsonpCallback: data.jsonpca,
            type: "post",
            success: function (msg) {
            	if(msg.code == '0000'){
            		this.props.history.replaceState(data, "/home");
                    localStorage.setItem("usernamexlc", this.state.username);
                    localStorage.setItem("passwordxlc", this.state.password);
                    //cookie.setCookie("userInfo", data.username, data.password, 30);
            	}else{
            		this.setState({ResponseMessage:msg.mess});
            		this.modalState("prompt");
            	}
            }.bind(this)
        })
    },
    componentDidMount: function () {
        this.setState({username:localStorage.getItem("usernamexlc")})
        this.setState({password:localStorage.getItem("passwordxlc")})
        $("input[name=username]").val(localStorage.getItem("usernamexlc"));
        $("input[name=password]").val(localStorage.getItem("passwordxlc"));
        setTimeout(()=>{
            if($("input[name=password]").val() && $("input[name=username]").val()){
                $('button.submits').trigger("click")
            }
        },1300)
        //console.log(this.props.location.pathname)
        const locationPathName = this.props.location.pathname;
        var flag = $("#flag").val()
        if (locationPathName == "/") {
            if (flag == "1") {
                //const data = {
                //    username: n[0],
                //    password: n[1],
                //    zw:"XLC",
                //};
                //$.ajax({
                //    url: "/lexiugo-app/app_login",
                //    data: data,
                //    dataType: "json",
                //    type: "post",
                //    success: function (msg) {
                //    	if(msg.code == '0000'){
                //    		this.props.history.replaceState(data, "/home");
                //            cookie.setCookie("userInfo", data.username, data.password, 30);
                //    	}else{
                //    		this.setState({ResponseMessage:msg.mess});
                //    		this.modalState("prompt");
                //    	}
                //    }.bind(this)
                //})
                this.props.history.replaceState(null, "/home");
            } else if(flag == "0"){
                console.log("初次登录请填写账号信息")
            }
        } else if (locationPathName == "/login") {
            console.log("重新登录，请填写账号信息")
        }
    },

    //componentWillUnmount: function () {
    //    this.serverRequest.abort();
    //},
    render(){
	    console.log(this.state)
        console.log(this.props)
        return (
            <div className="loginForm appRouter" style={{position:'absolute',left:'0px',top:'0px'}}>
                <div className="logoItem"></div>
                <form onSubmit={this.handleSubmit}>
                    <div className="eleItem">
                        <label><IconFont name="&#xe605;"/></label>
                        <input type="text" required="required" name="username"
                               placeholder="请输入用户名" onChange={this.handleChange}/>
                    </div>
                    <div className="eleItem">
                        <label><IconFont name="&#xe604;"/></label>
                        <input type="password" required="required" name="password"
                               placeholder="请输入密码" onChange={this.handleChange}/>
                    </div>
                    <div className="btnItem">
                        <button type="submit" className="submits">登录</button>
                    </div>
                </form>
                <div className="modalBox" style={this.state.dis?{display:"block"}:{display:"none"}}>
				  <div className="uploadCar" style={this.state.receGiveUP=="1"?{display:"block"}:{display:"none"}}>
					  	<div className="modalContent">{this.state.ResponseMessage}</div>
						<div className="modalBtn">
						  	<button className="btn btnS " onClick={this.queClick}>确认</button>
					    </div>
				  </div>
			  </div>
			  <ModalBg dis={this.state.dis}></ModalBg>
            </div>
        )
    }
})
export default LoginForm;
