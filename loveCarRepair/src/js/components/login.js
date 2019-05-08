/**
 * Created by Administrator on 2016/9/21 0021.
 */
import React from 'react';
import $ from 'jquery';
import ShowEWM from '../../../../newBuild/src/js/assembly/showEWM';
import fun from '../common/nowFunction'

export default class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {modalState:"", scmodalState:false}

        //开启微信二维码
        this.scanQRCode=()=>{
            wx.scanQRCode({
                needResult: 1,
                desc: 'scanQRCode desc',
                success: function (res) {
                    var result = res.resultStr;
                    if(result.split("/").pop()){
                        var cdat=result.split("/").pop()
                        cdat=cdat.split("?")[0]
                        result=unescape(cdat.replace(/Zu/g,'%u'));
                    }
                    var data = {
                        openid : this.props.project.wxConfig.openid,
                        resultStr : result,
                    };
                    this.toLogin(data);
                }.bind(this)
            });
        }
        this.toLogin=(data)=>{
            $.ajax({
                url: "/lexiugo-app/weixin/evaluation/getPage.do",
                data:data,
                dataType: "json",
                type: "post",
                success: function(msg) {
                    if(msg.plateNo!=null && msg.plateNo!=""){
                        var plateNo = msg.plateNo;
                        localStorage.setItem("plateNo", plateNo);

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
        this.queryMessage=()=>{
            this.props.history.pushState(null,"/message_login");
        }
        this.modalStateChange=()=>{
            this.setState({modalState:""});

        }
        this.showEWM=()=>{
            this.setState({toGZ:false});
            this.props.history.replaceState(null,"/record");
        }
        this.toBindNewCarAndUnBindOldCar=(flag,newParams,_this)=>{
            var val=unescape(newParams.replace(/Zu/g,'%u'));
            $.post('/lexiugo-app/weixin/evaluation/getPage.do',{openid:this.props.project.wxConfig.openid,resultStr:val},(data)=>{
                if(data.plateNo!=null && data.plateNo!=""){
                    var oldState=this.props.project.wxConfig;
                    oldState.plateNo=data.plateNo;oldState.flag=1;
                    this.props.project.setProps({
                        wxConfig:oldState
                    })
                    localStorage.setItem("plateNo",data.plateNo);
                    $.get('/server/showEWM/isAdd',{token:data.token,openid:this.props.project.wxConfig.openid},(datas)=>{
                        if(datas.subscribe!=1){
                            _this.setState({toGZ:true});
                        }else{
                            _this.props.history.replaceState(null,"/record");
                        }
                    })
                }else{
                    _this.setState({modalState:data.message});

                }
            })
        }
    }
    componentDidMount(){
        //二維碼
        this.props.project.setProps(fun,()=> {
            wx && wx.ready(() => {
                var _this = this;
                var newParams = window.location.pathname.split("/").pop();
                var flag = this.props.project.wxConfig.flag;
                var plateNo = this.props.project.wxConfig.plateNo;
                var newPlateNo=unescape(newParams.replace(/Zu/g,'%u'));
                if (newParams !== '' && newParams != 'server' && flag != '1') {//newParams && newParams != 'server'
                    this.toBindNewCarAndUnBindOldCar(flag, newParams, _this)
                } else if (newParams !== '' && newParams != 'server' && flag * 1 == 1) {
                    if(plateNo==newPlateNo.split(";")[0]){
                        this.props.history.replaceState(plateNo, "/record");
                        return;
                    }
                    this.props.project.setProps({
                        PromptData: {
                            content: '您已绑定了车辆，确定解绑原车辆并绑定新车吗？', Prompt: true,
                            fun: (e, close) => {
                                this.props.project.unBindCar(this, () => {
                                    this.toBindNewCarAndUnBindOldCar(flag, newParams, _this)
                                });
                                close();
                            },
                            refuse: (e, close) => {
                                this.props.history.replaceState(plateNo, "/record");
                                close();
                            }
                        }
                    })
                } else {
                    if (flag * 1 == 1) {
                        this.props.history.replaceState(plateNo, "/record");
                    }
                }

            })
        })
    }
    //初始化渲染前执行
    componentWillMount(){

    }
    render(){
        return(
			<div className="login Rcontainer">
				<div className="Rheader">
					<span>绑定爱车</span>
				</div>
				<div className="promptInfo commPadding">
					<h3> <span className='iconfont'>&#xe60c;</span> 未绑定提示：</h3>
					<p>您好，您还未绑定爱车信息，绑定后才可准确提供服务！
						<br/>绑定方式有：
						<br/>1：扫描定损员PAD生成二维码进行绑定
						<br/>2：手工录入信息绑定
						<br/>
						<br/>主要服务有：
						<br/>1：车辆维修历史查看
						<br/>2：维修进度实时查看
						<br/>3：车辆维修照片查看
						<br/>4：车主评价
						<br/>
						<br/> 看完了，还等什么？
						<br/> 赶快给爱车绑定吧，让它享受我们为它制定的服务！
					</p>
				</div>
				<div className="loginBtnGroup">
					<button className="" onClick={this.scanQRCode}><span className="iconfont">&#xe60e;</span>&nbsp;扫一扫绑定</button>
					<button className="" onClick={this.queryMessage}>手动输入</button>
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
                {this.state.toGZ && <ShowEWM  showEWM={this.showEWM}/>}
			</div>
        )
    }
}

