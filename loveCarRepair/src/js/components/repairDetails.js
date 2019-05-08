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
			taskState:["未接车","已接车","维修中","维修完成","已出厂","修理厂放弃","客户放弃"],
            MoveType:[],
            imgList:[]
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
    pushJDList(msg,e){
    	debugger;
    	var htmls=[];
        var goState={};
        var state=['已接车','维修待命','钣金喷漆','维修完成','修理厂已放弃','客户放弃']
        var stateTime=['EnterTime','WaitRepairTime','SheetMetaTime','OverRepairTime']
    	for(var g in state){
    		var picList=[],time='';var classname='';
            var i=g;
    		i==msg.TaskState-1 || i==3 ? '':classname='old'
            var i=g;//5 . 2    i
            //msg.fla<=5   msg.fla>2
            if(msg.fla<5 && msg.fla>2 && i>0){
                break;
            }else if(msg.fla<2){
                break;
            }else if(msg.fla==2 && i > 0){
                break;
            }else if(msg.TaskState ==7){
                i=4;
            }else if(msg.TaskState ==8){
                i=5;
            }
            if(msg.TaskState <7 && i>3){
                break;
            }
    		if(msg.ImgCount && i==1){//维修待命
    			picList=this.ImgListHtml(msg.repairOneList,i);
			}
            if(msg.imgPaintCount && i==2){//钣金喷漆
                picList=this.ImgListHtml(msg.repairTwoList,i);
            }
            if(msg.imgDspicCount && i==3){//维修完毕
                picList=this.ImgListHtml(msg.repairThreeList,i);
            }
			htmls.push(
				<li key={i}>
					<div className="ordTitleBox">
						<div className="dianDiv"><span className={'dian '+classname+''}></span></div>
						<div className="ordRight">
							<div className="orderTitle">
								<h5>{state[i]}</h5>
								<p>{msg[stateTime[g]]}</p>
							</div>
						</div>
					</div>
                    {
                        picList[0] &&
                        <div className="showImgList">
                            <div>
                                <ul className="SimgList" data-index={i} onTouchEnd={this.TouEnd} onTouchMove={this.TouMove} onTouchStart={this.TouStart}  style={{width:picList.length*2.2+'rem',padding:'0px'}}>
                                    {picList}
                                </ul>
                            </div>
                        </div>
                    }
				</li>

			)
		}
		this.setState({pushJDlistHtml:htmls.reverse()})
	},
    TouEnd(e){
        var index=parseInt( e.currentTarget.getAttribute('data-index'));
        var startX =this.state.MoveType[index][0];
        var startLeft =this.state.MoveType[index][1];
        var moveX=e.changedTouches[0].clientX
        var cha =moveX-startX;
        if(e.currentTarget.offsetWidth<=document.body.clientWidth){
            e.currentTarget.style.transition="left 200ms"
            e.currentTarget.style.left=15+'px'
        }else if(e.currentTarget.offsetWidth-Math.abs(e.currentTarget.offsetLeft) <= document.body.clientWidth){
            e.currentTarget.style.transition="left 400ms"
        	e.currentTarget.style.left=-e.currentTarget.offsetWidth+document.body.clientWidth+'px';
        }else if(e.currentTarget.offsetLeft>15){
            e.currentTarget.style.transition="left 200ms"
            e.currentTarget.style.left=15+'px'
        }
        if(cha==0){
            var keys = e.target.getAttribute('data-key');
            this.showImg(this.state.imgList[index],keys);
		}
	},
	TouMove(e){
        var index=parseInt( e.currentTarget.getAttribute('data-index'));
        var startX =this.state.MoveType[index][0];
        var startLeft =this.state.MoveType[index][1];
        var moveX=e.touches[0].clientX;
        var cha =moveX-startX;
        e.currentTarget.style.left=startLeft + cha+'px'
	},
	TouStart(e){
        e.currentTarget.style.transition="left 0ms"
        const startX=e.touches[0].clientX;
        var index=parseInt(e.currentTarget.getAttribute('data-index'));
        var movetype=this.state.MoveType;
        movetype[index]=[];
        movetype[index][0]=startX;
        movetype[index][1]=e.currentTarget.offsetLeft;
        this.setState({MoveType:movetype});
        e.currentTarget.style.left=e.currentTarget.offsetLeft;
        console.log(index);
	},
	ImgListHtml(msg,i){
    	var picList=[];var imgList=this.state.imgList;
    	imgList[i]=[];
        for(var j in msg){
            imgList[i].push(msg[j]);
            picList.push(
				<li key={j}><img data-key={j} src={'/toumingxiu/jyshowPhoto/getUrl.do?photoUrl='+msg[j]} alt=""/></li>
            )
        }
        return picList;
	},
    showImg(obj,index,e){
	    var mtbImg=[]
        for(var i in obj){
            mtbImg[i]= "http://"+location.hostname+"/damagePicture/"+obj[i].split("app/").pop().replace('small/','');
        }
        wx.previewImage({
            current:mtbImg[index],
            urls:mtbImg
        });
    },
   //初始化渲染执行之后立刻调用
	componentDidMount:function(){
		this.setState({loadmodalState:true});
		var taskId = this.props.location.state.id
		var data = {
			taskId :  taskId,
		};
		var _this=this;debugger;
        $.ajax({
            url: "/lexiugo-app/weixin/evaluation/taskDetails.do",
            data:data,
            dataType: "json",
            type: "post",
            success: (msg)=>{
                console.log(msg)
                $.post('/lexiugo-app/weixin/getWeixiuImages',{pushTaskId:data.taskId},(imgData)=>{
                    console.log(imgData);
                    msg=Object.assign({},msg,imgData.data);
                    _this.setState({responseJson:msg},()=>{
                        _this.pushJDList(msg);
                    });
                    _this.setState({loadmodalState:false});
                })

            }
        })
	},

	evalClick(){
		this.props.history.replaceState(null,'/repairDiscuss');
	},
	//返回
	toLogin(){
		this.props.history.replaceState(null, "/record");
	},
	toPing(data,e){
        var itemData=this.props.location.state
        this.props.history.pushState(itemData,"/RepairDiscuss");
    },
    render(){
		var response = this.state.responseJson;
		/*var proPic=response.ImgList;
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
					<li><img className="imgSrc"  src={"/lexiugo/jyshowPhoto/getUrl.do?photoUrl="+pro.picturename} /></li>
				);
			}
		}
		if(imgPaintSize > 0){
			for (var i = 0; i < imgPaintSize; i++) {
				var paint = imgPaint[i];
				imgPaintList.push(
					<li><img className="imgSrc" src={"/lexiugo/jyshowPhoto/getUrl.do?photoUrl="+paint.picturename} /></li>
				);
			}
		}
		if(imgDspicSize > 0){
			for (var i = 0; i < imgDspicSize; i++) {
				var dspic = imgDspic[i];
				imgDspicList.push(
					<li><img className="imgSrc"  src={"/lexiugo/jyshowPhoto/getUrl.do?photoUrl="+dspic.picturename} /></li>
				);
			}
		}*/
        return(


            <div className="repairDetails Rcontainer">
				<p className="headDetail">
					<span>{this.props.location.state.stateStr}</span>
				</p>
				<div className="order">
					<ul className="recordUl" style={{marginTop:'0.3rem'}}>
						<li className="firstUi">
							<div style={{flex:1}}>
								<div><span>修理厂:</span><span>{response.XlcName}</span></div>
								<div><span>地址:</span><span>{response.XlcAddr}</span></div>
							</div>
							<a className="CallDcc" href={"tel:"+response.XlcTel}></a>
						</li>
					</ul>
				</div>
				<div className="order">
					<ul className="recordUl" style={{marginTop:'0.3rem'}}>
						<li>
							<span>维修金额　:</span>
							<span style={{color:'red'}}>{response.RepairMoneny}</span>
						</li>
					</ul>
				</div>
				<div className="order speedOfProgress">
					<h4 className="wxTitle">维修进度</h4>
					<ul className="wxjdList">
						{this.state.pushJDlistHtml}
					</ul>
				</div>
				{
					response.fla==6 &&
					<div className="goPJ">
						<button onClick={this.toPing}>去评价</button>
					</div>
				}
                {
                    response.fla==7 &&
					<div className="goPJ">
						<button onClick={this.toPing}>查看评价</button>
					</div>
                }

				


	{/*
                <div className="repairInfo commPadding">
                    <p className="titleInfo clearfix">
                        <span className="wxxx titleImg"></span>
                        <span className="titleContext">维修信息</span>
                        <span className="detailsToggle" ref="detailsToggle">展开 <em className="iconfont">&#xe60b;</em></span>
                    </p>
                    <div className="infoTable detailsArea" ref="detailsArea">
                        <table border="0">
                            <tbody>
                            <tr>
                                <td>报案号：</td>
                                <td>{response.ReportNo}</td>
                            </tr>
                            <tr>
                                <td>维修金额：</td>
                                <td><span>{response.RepairMoneny}</span>元</td>
                            </tr>
                            <tr>
                                <td>修理厂名称：</td>
                                <td><span>{response.XlcName}</span></td>
                            </tr>
                            <tr>
                                <td>修理厂地址：</td>
                                <td><span>{response.XlcAddr}</span></td>
                            </tr>
                            </tbody>
                        </table>
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
	            </div>*/}
            </div>
        )
    }
});
export default RepairDetails
//<input id="input-id" type="number" class="rating" min="0" max="5" step="0.5" data-size="lg" />



