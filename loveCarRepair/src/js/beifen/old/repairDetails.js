/**
 * Created by Administrator on 2016/9/21 0021.
 */
/**
 * Created by Administrator on 2016/9/21 0021.
 */
import React from 'react'
import $ from 'jquery'
import { Router, Route, IndexRoute } from 'react-router'
import { createHashHistory, useBasename } from 'history'
import ReactDOM from 'react-dom'
import Rate from '../rate'
require('../../css/index.css')

const RepairDetails = React.createClass({
	getInitialState () {
		return {
			modalState:"",
			imgShowAll:true,
			imgShowAll1:true,
			imgShowAll2:true,
            value: 3,
            count: null,
            responseJson: [],
            GalleryPic:"",
            loadmodalState:false,
		};
	},
    imgShowAll(){
        this.setState({imgShowAll:false})
    },
    imgHideAll(){
        this.setState({imgShowAll:true})
    },
    imgShowAll1(){
        this.setState({imgShowAll1:false})
    },
    imgHideAll1(){
        this.setState({imgShowAll1:true})
    },
    imgShowAll2(){
        this.setState({imgShowAll2:false})
    },
    imgHideAll2(){
        this.setState({imgShowAll2:true})
    },
   //初始化渲染执行之后立刻调用
	componentDidMount: function() {
		this.setState({loadmodalState:true});
		$(".detailsToggle").bind("click",function(){
	        if ($(this).hasClass("show")){
	            $(this).removeClass("show").children(".iconfont").html("&#xe60b;");
	        }else {
	            $(this).addClass("show").children(".iconfont").html("&#xe60a;");
	        }
	        $(this).parent().next(".detailsArea").slideToggle(300);
        });
		var taskId = localStorage.getItem("taskId");
		var data = {
			taskId : taskId,
		};
		$.ajax({
//			url: "/lexiugo_test/weixin/evaluation/taskDetails.do",
			url: "/lexiugo-app/weixin/evaluation/taskDetails.do",
		    data:data,
	        dataType: "json",
	        type: "post",
			success: function(msg) {
				console.log(msg)
				this.setState({responseJson:msg});
				this.setState({loadmodalState:false});
		    }.bind(this)
		})
	},
	componentDidUpdate(){
	    var this_ = this
	    $(".progessImg li img").unbind().bind("click", function () {
	        var $thisSrc = $(this).attr("src").split("small/");
	        this_.setState({GalleryPic:$thisSrc[0]+$thisSrc[1]});
	        $(".weui-gallery").fadeIn(100)
	    })
	    $(".iconfontRight").unbind().bind("click",function(){
	        $(".weui-gallery").fadeOut(200)
	    })
	},
	evalClick(){
		this.props.history.replaceState(null,'/repairDiscuss');
	},
	//返回
	toLogin(){
		this.props.history.replaceState(null, "/repairRecord");
	},
    render(){
		var response = this.state.responseJson;
		var proPic=response.ImgList;
		var picSize = response.ImgCount;
		var imgPaint = response.imgPaintList;
		var imgPaintSize = response.imgPaintCount;
		var imgDspic = response.imgDspicList;
		var imgDspicSize = response.imgDspicCount;
		
		var ImgList = [];
		var imgPaintList = [];
		var imgDspicList = [];
		
		if(picSize > 0){
			for (var i = 0; i < picSize; i++) {
				var pro = proPic[i];
				ImgList.push(                                             
					<li><img className="imgSrc"  src={"/toumingxiu/jyshowPhoto/getUrl.do?photoUrl="+pro.picturename} /></li>
				);
			}
		}
		if(imgPaintSize > 0){
			for (var i = 0; i < imgPaintSize; i++) {
				var paint = imgPaint[i];
				imgPaintList.push(
					<li><img className="imgSrc" src={"/toumingxiu/jyshowPhoto/getUrl.do?photoUrl="+paint.picturename} /></li>
				);
			}
		}
		if(imgDspicSize > 0){
			for (var i = 0; i < imgDspicSize; i++) {
				var dspic = imgDspic[i];
				imgDspicList.push(
					<li><img className="imgSrc"  src={"/toumingxiu/jyshowPhoto/getUrl.do?photoUrl="+dspic.picturename} /></li>
				);
			}
		}
        return(
            <div className="repairDetails Rcontainer">
                <div className="Rheader">
                    <span className="headerBtn" onClick={this.toLogin}><em className="iconfont">&#xe609;</em></span>
                    <span>维修详情</span>
                </div>
                <div className="repairInfo commPadding">
                    <p className="titleInfo clearfix">
                        <span className="wxxx titleImg"></span>
                        <span className="titleContext">维修信息</span>
                        <span className="detailsToggle" ref="detailsToggle">展开 <em className="iconfont">&#xe60b;</em></span>
                    </p>
                    <div className="infoTable detailsArea" ref="detailsArea">
                        <ul className="loveCar">
							{/*<li>
								<span>报案号：</span>
								<span>{response.ReportNo}</span>
							</li>*/}
							<li>
								<span>维修金额：</span>
								<span>{response.RepairMoneny}</span>
							</li>
							<li>
								<span>修理厂名称：</span>
								<span>{response.XlcName}</span>
							</li>
							<li>
								<span>修理厂地址：</span>
								<span>{response.XlcAddr}</span>
							</li>
							<li>
								<span>联系修理厂：</span>
								<span>{response.XlcTel}</span>
								<span style={{float:'right'}}><a className="CallDcc" href={"tel:"+response.XlcTel}></a></span>
							</li>
						</ul>
                    </div>
                </div>
                <div className="repairProgess commPadding">
                    <p className="titleInfo clearfix">
                        <span className="wxjd titleImg"></span>
                        <span className="titleContext">维修进度</span>
                        <span className="detailsToggle" ref="detailsToggle">展开 <em className="iconfont">&#xe60b;</em></span>
                    </p>
                    <div className="detailsArea progessDetails">
                        <ul>
                            <li style={response.fla>=1?{display:"flex"}:{display:"none"}}>
                                <em className="progessIcon iconfont">&#xe615;</em>
                                <div className="progessItem clearfix">
                                    <p className="progessInfo">您的车辆信息已经发送到修理厂，等待修理厂确认</p>
                                    <p className="progessTime">{response.PushTimeMdms}</p>
                                </div>
                            </li>
                            <li style={response.fla>=2?{display:"flex"}:{display:"none"}}>
                                <em className="progessIcon iconfont">&#xe615;</em>
                                <div className="progessItem clearfix">
                                    <p className="progessInfo">接车</p>
                                    <p className="progessTime">{response.EnterTime}</p>
                                </div>
                            </li>
                            <li style={response.fla>=3?{display:"flex"}:{display:"none"}}>
                                <em className="progessIcon iconfont">&#xe615;</em>
                                <div className="progessItem clearfix">
                                    <p className="progessInfo">维修待命</p>
                                    <p className="progessTime">{response.WaitRepairTime}</p>
                                    <ul className="progessImg clearfix" style={this.state.imgShowAll?{overflow:"hidden"}:{overflow:"visible"}}>
                                        {ImgList}
                                    </ul>
                                    <div className="showHide" style={response.ImgCount > 3?{display:"block"}:{display:"none"}}>
                                        <span className="showAll" style={this.state.imgShowAll?{display:"inline-block"}:{display:"none"}} onClick={this.imgShowAll}>全部</span>
                                        <span className="showAll" style={this.state.imgShowAll?{display:"none"}:{display:"inline-block"}} onClick={this.imgHideAll}>收起</span>
                                    </div>
                                </div>
                            </li>
                            <li style={response.fla>=4?{display:"flex"}:{display:"none"}}>
                                <em className="progessIcon iconfont">&#xe615;</em>
                                <div className="progessItem clearfix">
                                    <p className="progessInfo">钣金喷漆</p>
                                    <p className="progessTime">{response.SheetMetaTime}</p>
                                    <ul className="progessImg clearfix" style={this.state.imgShowAll1?{overflow:"hidden"}:{overflow:"visible"}}>
		                                {imgPaintList}
		                            </ul>
		                            <div className="showHide" style={response.imgPaintCount > 3?{display:"block"}:{display:"none"}}>
		                                <span className="showAll" style={this.state.imgShowAll1?{display:"inline-block"}:{display:"none"}} onClick={this.imgShowAll1}>全部</span>
		                                <span className="showAll" style={this.state.imgShowAll1?{display:"none"}:{display:"inline-block"}} onClick={this.imgHideAll1}>收起</span>
		                            </div>
                                </div>
                            </li>
                            <li style={response.fla>=5?{display:"flex"}:{display:"none"}}>
                                <em className="progessIcon iconfont">&#xe615;</em>
                                <div className="progessItem clearfix">
                                    <p className="progessInfo">维修完毕</p>
                                    <p className="progessTime">{response.OverRepairTime}</p>
                                    <ul className="progessImg clearfix" style={this.state.imgShowAll2?{overflow:"hidden"}:{overflow:"visible"}}>
		                                {imgDspicList}
		                            </ul>
		                            <div className="showHide" style={response.imgDspicCount > 3?{display:"block"}:{display:"none"}}>
		                                <span className="showAll" style={this.state.imgShowAll2?{display:"inline-block"}:{display:"none"}} onClick={this.imgShowAll2}>全部</span>
		                                <span className="showAll" style={this.state.imgShowAll2?{display:"none"}:{display:"inline-block"}} onClick={this.imgHideAll2}>收起</span>
		                            </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="" style={response.fla==6?{display:"block"}:{display:"none"}}>
                    <button className="publicBtn" onClick={this.evalClick}>确认取车并评价</button>
                </div>
                <div className="discussContext commPadding" style={response.fla==7?{display:"block"}:{display:"none"}}>
                    <p className="titleInfo clearfix">
                        <span className="titleContext">评价内容</span>
                        <span className="detailsToggle" ref="detailsToggle">展开 <em className="iconfont">&#xe60b;</em></span>
                    </p>
                    <div className="detailsArea">
	                    <div className="infoTable spanLi">
	                    	<ul className="discussList">
		                    	<li>
			                        <span className="bxgs titleImgs"></span>
			                        <span className="liSpan">保险公司服务评价</span>
			                        <span>
			                            <Rate disabled allowHalf value={parseFloat(response.BxEvaluation)} />
			                        </span>
			                    </li>
	                    	</ul>
	                    </div>
	                    <div className="infoTable">
	                        <ul className="discussList">
	                            <li>
		                            <span className="pjnr titleImgs"></span>
		                            <span className="liSpan">修理厂服务评价</span>
	                                <span>
	                                    <Rate disabled allowHalf value={parseFloat(response.XlcEvaluation)}  />
	                                </span>
	                            </li>
	                            <li>
	                                <span>服务体验</span>
	                                <span>
	                                    <Rate disabled allowHalf value={parseFloat(response.RepairServer)}  />
	                                </span>
	                            </li>
	                            <li>
	                                <span>维修速度</span>
	                                <span>
	                                    <Rate disabled allowHalf value={parseFloat(response.RepairAging)}  />
	                                </span>
	                            </li>
	                            <li>
	                                <span>专业技能</span>
	                                <span>
	                                    <Rate disabled allowHalf value={parseFloat(response.RepairQuality)}  />
	                                </span>
	                            </li>
	                        </ul>
	                        <div className="disscussText">
	                        	{response.CustomerRemark}
	                            <p className="disscussTime">{response.crectTime}</p>
	                        </div>
	                    </div>
	                    </div>
                </div>
                <div className="weui-gallery">
                	
                		<span className="iconfontRight iconfont">&#xe614;</span>
                	
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
	                <span className="weui-gallery__img" style={{backgroundImage:"url("+this.state.GalleryPic+")"}}>
	                </span>
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
export default RepairDetails
//<input id="input-id" type="number" class="rating" min="0" max="5" step="0.5" data-size="lg" />



