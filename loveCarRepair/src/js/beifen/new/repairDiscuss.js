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
        this.setState({hidTaskId:localStorage.getItem("taskId")});
        this.setState({openid:localStorage.getItem("openid")});
    },
    evalClick(){
    	var data = this.state;
        console.log(data);
        this.setState({loadmodalState:true});
    	$.ajax({
//			url: "/lexiugo_test/weixin/evaluation/getEvaluate.do",
			url: "/lexiugo-app/weixin/evaluation/getEvaluate.do",
		    data:data,
//		    contentType: "application/javascript",
	        dataType: "json",
//	        jsonp: "callback",
	        type: "post",
//	        jsonpCallback: data.jsonpca,
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
            this.props.history.replaceState(null,'/repairRecord');
        }
    },
    render(){
        return(
            <div className="repairDiscuss Rcontainer">
                <div className="Rheader">
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




