/**
 * Created by Administrator on 2016/9/21 0021.
 */
import React from 'react'
import $ from 'jquery';
import { Router, Route, IndexRoute } from 'react-router'
import { createHashHistory, useBasename } from 'history'

const Message_login = React.createClass({
	getInitialState () {
		return {
			modalState:"",
			scmodalState:false,
		};
	},
	//获取文本框值
	handleChange(e) {
        var newState = {};
        newState[e.target.name] = e.target.value.toUpperCase();
        this.setState(newState);
    },
    //提交表单
	handleSubmit(e) {
        e.preventDefault();
		if($("input[name='plateno']").val()==""){
			this.setState({modalState:"车牌号尚未输入"})
		}else if($("input[name='customerName']").val()==""){
			this.setState({modalState:"车主姓名尚未输入"})
		}else if($("input[name='vincode']").val()==""){
			this.setState({modalState:"手机号码尚未输入"})
		}else{
			var data = {
				openid : localStorage.getItem("openid"),
				resultStr : this.state.plateno.toUpperCase() +";"+this.state.customerName+";null;null;"+ this.state.vincode
			};
			$.ajax({
//				url: "/lexiugo_test/weixin/evaluation/getPage.do",
				url: "/lexiugo-app/weixin/evaluation/getPage.do",
				data:data,
				dataType: "json",
				type: "POST",
				success: function(msg) {
					if(msg.plateNo!=null && msg.plateNo!=""){
						localStorage.setItem("plateNo",msg.plateNo);
                        var oldState=this.props.project.wxConfig;
                        oldState.plateNo=msg.plateNo;oldState.flag=1;
                        this.props.project.setProps({
                            wxConfig:oldState
                        },()=>{
                            this.props.history.replaceState(null,"/record");
						})

					}else{
						this.setState({modalState:msg.message});
					}
				}.bind(this)
			});
		}

    },
	modalStateChange(){
		this.setState({modalState:""});
	},
    //返回
	toLogin(){
		this.props.history.replaceState(null, "/login");
	},
    render(){
        return(
            <div className="messLogin Rcontainer">
            	<div>
		            <form onSubmit={this.handleSubmit}>
							<table border="0" className="messLoginTable">
								<tbody>
									<tr>
										<td>车牌号：</td>
										<td>
											<input type="text" name="plateno" className="form-input"
												   placeholder="请输入车牌号" style={{textTransform: 'uppercase'}}  onChange={this.handleChange}/>
										</td>
									</tr>
									<tr>
										<td>车主姓名：</td>
										<td>
											<input type="text" name="customerName" className="form-input"
												   placeholder="请输入车主姓名" onChange={this.handleChange}/>
										</td>
									</tr>
									<tr>
										<td>手机号：</td>
										<td>
											<input type="text" name="vincode" className="form-input"
												   placeholder="请输入手机号码" onChange={this.handleChange}/>
										</td>
									</tr>
									<tr>
										<td colSpan="2">
											<button type="submit" className="publicBtn">绑定</button>
										</td>
									</tr>
								</tbody>
							</table>

			        </form>
		        </div>
				<div className="weui_dialog_alert" style={this.state.modalState==""?{display:"none"}:{display:"block"}}>
					<div className="weui_mask"></div>
					<div className="weui_dialog">
						<div className="weui_dialog_hd"><strong className="weui_dialog_title"  onClick={this.modalStateChange}></strong></div>
						<div className="weui_dialog_bd">{this.state.modalState}</div>
						<div className="weui_dialog_ft">
							<a className="weui_btn_dialog primary" onClick={this.modalStateChange}>确定</a>
						</div>
					</div>
				</div>
            </div>
        )
    }
})
export default Message_login;