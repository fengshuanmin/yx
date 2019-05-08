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
import wxconfig from '../../../../config/WXConfig';
const LoginForm = React.createClass({
    getInitialState () {
        return {
            yyusername: "",
            yypassword: "",
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
        	username: this.state.yyusername,
            password: this.state.yypassword,
            // 微信号id
            // openId:wxOpenId,
            openId:localStorage.getItem('openid'),
            // 登录身份
            zw:"Yunying"
        };

        $.ajax({
            url: "/lexiugo-app/app_login",
            data: data,
            dataType: "json",
            type: "post",
            success: function (msg) {
            	if(msg.code == '0000'){
                    localStorage.setItem('homePage','0')
                    console.log('mss',msg)
            		this.props.history.replaceState(data, "/home");
                    localStorage.setItem("usernameyy", this.state.yyusername);
                    localStorage.setItem("passwordyy", this.state.yypassword);
                    localStorage.setItem("yhId", msg.data.LxAqYhxxb.id);
                    //cookie.setCookie("userInfo", data.username, data.password, 30);
            	}else{
            		this.setState({ResponseMessage:msg.mess});
            		this.modalState("prompt");
            	}
            }.bind(this)
        })
    },
    componentDidMount: function () {
        this.setState({yyusername:localStorage.getItem("usernameyy")})
        this.setState({yypassword:localStorage.getItem("passwordyy")})
        $("input[name=yyusername]").val(localStorage.getItem("usernameyy"));
        $("input[name=yypassword]").val(localStorage.getItem("passwordyy"));
        setTimeout(()=>{
            if($("input[name=yypassword]").val() && $("input[name=yyusername]").val()){
                $('button.submits').trigger("click")
            }
        },1300)
        const locationPathName = this.props.location.pathname;
        var flag = $("#flag").val()
        if (locationPathName == "/") {
            if (flag == "1") {
                this.props.history.replaceState(null, "/home");
            } else if(flag == "0"){
                console.log("初次登录请填写账号信息")
            }
        } else if (locationPathName == "/login") {
            console.log("重新登录，请填写账号信息")
        }
    },
    render(){
        return (
            <div className="loginForm appRouter">
                <div className="logoItem"></div>
                <form onSubmit={this.handleSubmit}>
                    <div className="eleItem">
                        <label><IconFont name="&#xe605;"/></label>
                        <input type="text" required="required" name="yyusername"
                               placeholder="请输入用户名" onChange={this.handleChange}/>
                    </div>
                    <div className="eleItem">
                        <label><IconFont name="&#xe604;"/></label>
                        <input type="password" required="required" name="yypassword"
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
