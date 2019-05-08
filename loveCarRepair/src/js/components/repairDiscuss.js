/**
 * Created by Administrator on 2016/9/23 0023.
 */
import React from 'react'
import $ from 'jquery'
import { Router, Route, IndexRoute } from 'react-router'
import { createHashHistory, useBasename } from 'history'
import ReactDOM from 'react-dom'
import Rate from '../rate'
require('../../css/index.css')
const RepairDiscuss = React.createClass({
    getInitialState() {
        return {
        	fromFlag:"02",
        	bxEvaluation:"5",
        	xlcEvaluation:"5",
        	repairServer:"5",
        	repairAging:"5",
        	repairQuality:"5",
        	customerRemark:"",
        	hidTaskId:"",
        	openid:"",
            tsmodalState:"",
            loadmodalState:false,
            hei:['很差','还行','很好','非常好','一级棒']
        }
    },
    onChange(name,value) {
        var newState = {};
        newState[name] = value;
        this.setState(newState);
    },
    handleChange(e) {
    	this.setState({customerRemark:e.target.value});
    },
    toLogin(){
    	this.props.history.replaceState(null,'/repairDetails');
    },
    componentWillMount:function() {
    	window.scrollTo(0,0);
        var itemData=this.props.location.state;
        this.setState({hidTaskId:itemData.id || ''});
        this.setState({openid:localStorage.getItem("openid")});
        if(itemData.fla ==7){
				this.setState({
                    nowFla:itemData.fla,
					bxEvaluation:parseInt(itemData.BxEvaluation),
                    xlcEvaluation:parseInt(itemData.XlcEvaluation),
                    repairServer:parseInt(itemData.RepairServer),
                    repairAging:parseInt(itemData.RepairAging),
                    repairQuality:parseInt(itemData.RepairQuality),
                    customerRemark:parseInt(itemData.CustomerRemark)
				})
            $('.miaoShu').val(itemData.CustomerRemark);
		}else if(!itemData.fla && itemData.id){
            $.ajax({
                url: "/lexiugo-app/weixin/evaluation/taskDetails.do",
                data:{taskId:itemData.id},
                dataType: "json",
                type: "post",
                success: (msg)=>{
					if(msg.fla==7){
                        this.setState({
							nowFla:msg.fla,
                            bxEvaluation:parseInt(msg.BxEvaluation),
                            xlcEvaluation:parseInt(msg.XlcEvaluation),
                            repairServer:parseInt(msg.RepairServer),
                            repairAging:parseInt(msg.RepairAging),
                            repairQuality:parseInt(msg.RepairQuality),
                            customerRemark:msg.CustomerRemark
                        })
						$('.miaoShu').val(msg.CustomerRemark);
					}
                }
            })
		}
    },
    evalClick(){
    	//var data = this.state;
    	var data={
            fromFlag:this.state.fromFlag,
            bxEvaluation:this.state.bxEvaluation,
            xlcEvaluation:this.state.xlcEvaluation,
            repairServer:this.state.repairServer,
            repairAging:this.state.repairAging,
            repairQuality:this.state.repairQuality,
            customerRemark:this.state.customerRemark,
            hidTaskId:this.state.hidTaskId,
            openid:this.state.openid,
            tsmodalState:this.state.tsmodalState,
		}
        this.setState({loadmodalState:true});
    	$.ajax({
			url: "/lexiugo-app/weixin/evaluation/getEvaluate.do",
		    data:data,
	        dataType: "json",
	        type: "post",
			success: function(msg) {
				this.setState({loadmodalState:false});
				if(msg.dataStr=="1"){
                    this.setState({tsmodalState:"评价发表成功！"})
				}else if(msg.dataStr=="2"){
                    this.setState({tsmodalState:"已评价，请勿重复评价！"})
				}else{
                    this.setState({tsmodalState:"评价失败，请稍后重试！"})
				}
		    }.bind(this)
		})
    },
    tsmodalStateChange(){
        const str = this.state.tsmodalState;
        this.setState({tsmodalState:""});
        if (str.indexOf("成功")!=-1){
            this.props.history.replaceState(null,'/record');
        }
    },
    CXing(m,e){
		if(this.state.nowFla == 7){
			return;
		}
       var cha=e.changedTouches[0].clientX-e.target.offsetLeft;
        var newState={};
       if(e.target.className == 'Pxing' && cha < e.target.clientWidth){
           newState[m]=parseInt(((cha/e.target.clientWidth)*100)/20+1)
        }else{
       		if(cha < e.target.parentElement.clientWidth){
                newState[m]=parseInt(((cha/e.target.parentElement.clientWidth)*100)/20+1)
            }
	   }
        this.setState(newState);
	},
    vlueBind(e){
    	var newState={};
    	newState[e.target.name]=e.target.value;
    	this.setState(newState)
	},
    render(){
        return(
            <div className="repairDiscuss Rcontainer">
				<div className="pingJBox">
					<h4>保险公司服务评价</h4>
					<div className="pingList">
						<ul>
							<li>
								<span>服务体验</span>
								<span className="Pxing" onTouchEnd={this.CXing.bind(this,'bxEvaluation')}>
								<i style={{width:this.state.bxEvaluation*20+'%'}}></i></span>
								{this.state.hei[this.state.bxEvaluation-1]}
							</li>
						</ul>
					</div>
				</div>

				<div className="pingJBox">
					<h4>修理厂服务评价</h4>
					<div className="pingList">
						<ul>
							<li><span>服务体验</span>
								<span className="Pxing" onTouchEnd={this.CXing.bind(this,'repairServer')}>
								<i style={{width:this.state.repairServer*20+'%'}}></i>
								</span>
                                {this.state.hei[this.state.repairServer-1]}
							</li>
							<li><span>维修进度</span>
								<span className="Pxing" onTouchEnd={this.CXing.bind(this,'repairAging')}>
									<i style={{width:this.state.repairAging*20+'%'}}></i></span>
                                {this.state.hei[this.state.repairAging-1]}
							</li>
							<li><span>专业技能</span>
								<span className="Pxing" onTouchEnd={this.CXing.bind(this,'repairQuality')}>
								<i style={{width:this.state.repairQuality*20+'%'}}></i></span>
                                {this.state.hei[this.state.repairQuality-1]}
							</li>
						</ul>
					</div>
				</div>
				<div className="pingJBox">
					<h4>描述</h4>
					<textarea name="customerRemark" disabled={this.state.nowFla== 7 && 'disabled'} onBlur={this.vlueBind} onClick={this.vlueBind} className="miaoShu" placeholder={this.state.nowFla == 7 ? this.state.customerRemark:"有什么需要反馈的可以写在这里" }></textarea>
				</div>
				<div className="pingJBox pJSubmit">
					{
						this.state.nowFla==7 ?
							<button className="pJSubmit">您已经评价</button> :
							<button onClick={this.evalClick} className="pJSubmit">确认评价</button>

					}

				</div>


                {/*<div className="Rheader">
                    <span className="headerBtn" onClick={this.toLogin}><em className="iconfont">&#xe609;</em></span>
                    <span>发表评论</span>
                </div>
                <div className="discussContext commPadding">
	                <div className="infoTable detailsArea spanLi">
		            	<ul className="discussList">
		                	<li>
		                        <span className="bxgs titleImgs"></span>
		                        <span className="liSpan">保险公司服务评价</span>
		                        <span>
		                        	<Rate allowHalf value={parseFloat(this.state.bxEvaluation)} onChange={this.onChange.bind(this,"bxEvaluation")}/>
		                        </span>
		                    </li>
		            	</ul>
		            </div>
	                <div className="infoTable detailsArea">
		                <ul className="discussList ">
		                    <li>
		                    	<span className="pjnr titleImgs"></span>
		                        <span className="liSpan">修理厂服务评价</span>
		                        <span>
		                            <Rate allowHalf value={parseFloat(this.state.xlcEvaluation)} onChange={this.onChange.bind(this,"xlcEvaluation")}/>
		                        </span>
		                    </li>
		                    <li>
		                        <span>服务体验</span>
		                        <span>
		                            <Rate allowHalf value={parseFloat(this.state.repairServer)} onChange={this.onChange.bind(this,"repairServer")} />
		                        </span>
		                    </li>
		                    <li>
		                        <span>维修速度</span>
		                        <span>
		                            <Rate allowHalf value={parseFloat(this.state.repairAging)} onChange={this.onChange.bind(this,"repairAging")} />
		                        </span>
		                    </li>
		                    <li>
		                        <span>专业技能</span>
		                        <span>
		                            <Rate allowHalf value={parseFloat(this.state.repairQuality)} onChange={this.onChange.bind(this,"repairQuality")} />
		                        </span>
		                    </li>
		                </ul>
		            </div>
                    <p className="tsInfo"><em className="iconfont">&#xe60c;</em>当您完成评价，修理厂才会得到维修费用</p>
                    <div className="">
                        <textarea className="disscussTextArea" onChange={this.handleChange} name="textArea" placeholder="有什么需要反馈的，可以写在这里。"></textarea>
                    </div>

                </div>
                <div className="discussBtn">
                    <button className="publicBtn" onClick={this.evalClick}>确认评价</button>
                </div>
                */}


                <div className="weui_dialog_alert" style={this.state.tsmodalState==""?{display:"none"}:{display:"block"}}>
                    <div className="weui_mask"></div>
                    <div className="weui_dialog">
                        <div className="weui_dialog_hd"><strong className="weui_dialog_title"  onClick={this.modalStateChange}></strong></div>
                        <div className="weui_dialog_bd">{this.state.tsmodalState}</div>
                        <div className="weui_dialog_ft">
                            <a className="weui_btn_dialog primary" onClick={this.tsmodalStateChange}>确定</a>
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
            
            </div>
        )
    }
});
export default RepairDiscuss




