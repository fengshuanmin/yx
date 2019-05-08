/**
 * Created by Administrator on 2016/7/23 0023.
 * APP维修
 */
import React from 'react';
import $ from 'jquery';
import {IconFont,HeaderIf,ModalBg} from '../commonComponent/common'
import cookie from '../commonComponent/cookieJs'
import weixinpic from '../weixnphoto/weixinpic'

const Service_detail = React.createClass({
	getInitialState(){
		return{
			dis:false,
			receGiveUP:"0",
			standShrinkage:false,
			paintShrinkage:false,
			endShrinkage:false,
			toBan:false,
			butt:"0",
			upl:false,
		}
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
		}//修改this.state.receGiveUP控制模态框内容区
		this.setState({toBan:false});
		if(a=="uploadPhoto"){
			this.setState({receGiveUP:"1"})
		}else if(a=="sucOrfai"){
			this.setState({receGiveUP:"2"})
		}else if(a=="butStand"){
			this.setState({receGiveUP:"3"})
		}else if(a=="butPaint"){
			this.setState({receGiveUP:"4"})
		}else if(a=="butEnd"){
			this.setState({receGiveUP:"5"})
		}else if(a=="queding"){
			this.setState({receGiveUP:"6"})
		}else{}
	},
	//控制模态框2
	modalState2(a){
		var scrollHeight = $(window).scrollTop();
		$('.modalBox').css({
			"top":scrollHeight+150+"px"
		})
		//修改this.state.dis控制模态框出现消失
		if (a=="one"){
			this.setState({upl:true})
		}else {
			this.setState({upl:false})
		}
	},
	//详情
	serviceClick(){
		var detailsData = this.props.location.state;
		this.props.history.pushState(detailsData, "/service_details")
	},
	//返回维修
	returnServiceClick(){
		this.props.history.replaceState(null, "/XList");
	},
	//初始化渲染执行之后立刻调用
	componentDidMount: function() {
		  var n = cookie.getCookie("userInfo")
	      this.taskprogress();
	      localStorage.setItem("msg", "3");//存
	},
	taskprogress(){
		var idata = this.props.location.state ;
	      if(idata.taskprogress >= 5){
	    	  this.setState({endShrinkage:true});
	    	  $('.iconPoint1 .iconfont').html("&#xe60b;");
	    	  $('.iconPoint2 .iconfont').html("&#xe60b;");
	    	  $('.iconPoint3 .iconfont').html("&#xe60a;");
	      }else if(idata.taskprogress == 4){
	    	  this.setState({paintShrinkage:true});
	    	  $('.iconPoint1 .iconfont').html("&#xe60b;");
	    	  $('.iconPoint2 .iconfont').html("&#xe60a;");
	    	  $('.iconPoint3 .iconfont').html("&#xe60b;");
	      }else{
	    	  this.setState({standShrinkage:true});
	    	  $('.iconPoint1 .iconfont').html("&#xe60a;");
	    	  $('.iconPoint2 .iconfont').html("&#xe60b;");
	    	  $('.iconPoint3 .iconfont').html("&#xe60b;");
	      }
	},
	//维修待命显示控制
	standShrinkage(){
		if (!this.state.standShrinkage){
			this.setState({standShrinkage:true});
			this.setState({endShrinkage:false});
			this.setState({paintShrinkage:false});
			$('.iconPoint1 .iconfont').html("&#xe60a;");
			$('.iconPoint2 .iconfont').html("&#xe60b;");
	    	$('.iconPoint3 .iconfont').html("&#xe60b;");
		}else {
			this.setState({standShrinkage:false});
			$('.iconPoint1 .iconfont').html("&#xe60b;");
		}
	},
	//钣金喷漆显示控制
	paintShrinkage(){
		if (!this.state.paintShrinkage){
			this.setState({paintShrinkage:true});
			this.setState({standShrinkage:false});
			this.setState({endShrinkage:false});
			$('.iconPoint2 .iconfont').html("&#xe60a;");
			$('.iconPoint1 .iconfont').html("&#xe60b;");
	    	$('.iconPoint3 .iconfont').html("&#xe60b;");
		}else {
			this.setState({paintShrinkage:false});
			$('.iconPoint2 .iconfont').html("&#xe60b;");
		}
	},
	//维修结束显示控制
	endShrinkage(){
		if (!this.state.endShrinkage){
			this.setState({endShrinkage:true});
			this.setState({standShrinkage:false});
			this.setState({paintShrinkage:false});
			$('.iconPoint3 .iconfont').html("&#xe60a;");
			$('.iconPoint1 .iconfont').html("&#xe60b;");
	    	$('.iconPoint2 .iconfont').html("&#xe60b;");
		}else {
			this.setState({endShrinkage:false});
			$('.iconPoint3 .iconfont').html("&#xe60b;");
		}
	},
	//维修待命完成
	butStand(){
		var idata = this.props.location.state ;
		var s1 = weixinpic.getsessionOrcookieforup(idata.id,"repair_1");
		if(s1.length > 0){
			var data = {
				taskId : idata.id,
				taskProgress : "3",
				reportNo : idata.reportno,
				n : 2,
			}
			this.modalState();
			this.toUpload();
			weixinpic.upload(data);
			this.modalState2("one");
		}else{
			this.setState({receGiveUP:"0"})
			this.setState({toBan:true});
		}
	},
	//钣金喷漆完成
	butPaint(){
		var idata = this.props.location.state ;
		var s2 = weixinpic.getsessionOrcookieforup(idata.id,"repair_2");
		if(s2.length > 0){
			var data = {
				taskId : idata.id,
				taskProgress : "4",
				reportNo : idata.reportno,
				n : 2,
			}
			this.modalState();
			this.toUpload();
			weixinpic.upload(data);
			this.modalState2("one");
		}else{
			this.setState({receGiveUP:"0"})
			this.setState({toBan:true});
		}
	},
	//维修结束完成
	butEnd(){
		var idata = this.props.location.state ;
		var s3 = weixinpic.getsessionOrcookieforup(idata.id,"repair_3");
		if(s3.length > 0){
			var data = {
				taskId : idata.id,
				taskProgress : "5",
				reportNo : idata.reportno,
				n : 2,
			}
			this.modalState();
			this.toUpload();
			weixinpic.upload(data);
			this.modalState2("one");
		}else{
			this.setState({receGiveUP:"0"})
			this.setState({toBan:true});
		}
	},
	toUpload(){
		var idata = this.props.location.state ;
		var repair11 = this.state.repair1;
		var repair21 = this.state.repair2;
		var repair31 = this.state.repair3;
		var choicet
		choicet = setInterval(function(){
			var msg=localStorage.getItem("msg");
			if(msg == 1){
				var repair12 = weixinpic.getsessionOrcookie(idata.id,"repair_1");
				var repair22 = weixinpic.getsessionOrcookie(idata.id,"repair_2");
				var repair32 = weixinpic.getsessionOrcookie(idata.id,"repair_3");
				if(repair12.length > 0){
					for (var i=0;i<repair11.length;i++){
						var repair13 = repair11[i];
						for (var j=0;j<repair12.length;j++){
							var repair14 = repair12[j];
							if(repair13.localid == repair14.localid){
								if(repair13.flag != repair14.flag){
									clearInterval(choicet);
									this.modalState2("one1");
									this.setState({ResponseMessage:"上传照片成功"});
									this.setState({dis:false});
									this.modalState("queding");
									localStorage.setItem("msg", "3");//存
									this.theCache();
									this.setState({standShrinkage:false});
									this.setState({paintShrinkage:true});
									$('.iconPoint1 .iconfont').html("&#xe60b;");
									$('.iconPoint2 .iconfont').html("&#xe60a;");
								}
							}
						}
					}
				}
				if(repair22.length > 0){
					for (var i=0;i<repair21.length;i++){
						var repair23 = repair21[i];
						for (var j=0;j<repair22.length;j++){
							var repair24 = repair22[j];
							if(repair23.localid == repair24.localid){
								if(repair23.flag != repair24.flag){
									clearInterval(choicet);
									this.modalState2("one1");
									this.setState({ResponseMessage:"上传照片成功"});
									this.setState({dis:false});
									this.modalState("queding");
									localStorage.setItem("msg", "3");//存
									this.theCache();
									this.setState({paintShrinkage:false});
									this.setState({endShrinkage:true});
									$('.iconPoint2 .iconfont').html("&#xe60b;");
							    	$('.iconPoint3 .iconfont').html("&#xe60a;");
								}
							}
						}
					}
				}
				if(repair32.length > 0){
					for (var i=0;i<repair31.length;i++){
						var repair33 = repair31[i];
						for (var j=0;j<repair32.length;j++){
							var repair34 = repair32[j];
							if(repair33.localid == repair34.localid){
								if(repair33.flag != repair34.flag){
									clearInterval(choicet);
									this.modalState2("one1");
									this.setState({ResponseMessage:"上传照片成功"});
									this.setState({dis:false});
									this.modalState("queding");
									localStorage.setItem("msg", "3");//存
									this.theCache();
									this.setState({endShrinkage:false});
							    	$('.iconPoint3 .iconfont').html("&#xe60b;");
								}
							}
						}
					}
				}
			}else if(msg == 0){
				clearInterval(choicet);
				this.modalState2("one1");
				this.setState({ResponseMessage:"上传照片失败"});
				this.modalState("queding");
				localStorage.setItem("msg", "3");//存
			}
		}.bind(this),500)
	},
	queClick(){
		this.modalState();
	},
	//初始化渲染执行之前立刻调用  获取缓存
	componentWillMount:function() {
		this.theCache();
	},
	theCache(){
		var idata = this.props.location.state ;
		this.setState({butt:"1"});
		var retarr = [];
		  retarr = weixinpic.getsessionOrcookie(idata.id,"repair_1");
			  if(retarr.length == 0) {this.setState({repair1:"0"});}
				  else {this.setState({repair1:retarr});};
			  this.toButt(retarr);
		  retarr = weixinpic.getsessionOrcookie(idata.id,"repair_2");
			  if(retarr.length == 0) {this.setState({repair2:"0"});}
			  	  else {this.setState({repair2:retarr});}
			  this.toButt(retarr);
		  retarr = weixinpic.getsessionOrcookie(idata.id,"repair_3");
			  if(retarr.length == 0) {this.setState({repair3:"0"});}
			  	  else {this.setState({repair3:retarr});}
			  this.toButt(retarr);
	},
	toButt(retarr){
		if(retarr.length > 0){
			for(var i = 0; i < retarr.length; i++){
				var repair = retarr[i];
				if(repair.flag == 0){
					this.setState({butt:"2"});
				}
			}
		}
	},
	//点击图片调用
	imageCilck(a){
		if(a.indexOf("stand") > -1){
			var e = a.substring(5);
			var sss = $(".ServiceAccording");
			for (var i = 0; i < sss.length; i++) {
				if(i==e-1){
					var srcs = sss.eq(i).attr("id");
					if(srcs){
						var data = {
							taskid : this.props.location.state.id,
							ty : 6,
						}
						//调用拍照
						weixinpic.photoImage(data);
						var choicet
						choicet = setInterval(function(){
							var idata = this.props.location.state ;
							var retarr11 = weixinpic.getsessionOrcookie(idata.id,"repair_1");
							var retarr12 = this.state.repair1;
							if(retarr12 == "0"){
								if(retarr11.length > 0){
									clearInterval(choicet);
									this.theCache();
								}
							}else if(retarr11.length != retarr12.length){
								clearInterval(choicet);
								this.theCache();
							}
						}.bind(this),200)
					}else{
						srcs = sss.eq(i).attr("src");
					    var data = {
					    	idata : this.props.location.state,
					    	localid : srcs,
					    	ty : 6,
					    }
						this.props.history.replaceState(data, "/service_image");
					}
				}
			}
		}
		if(a.indexOf("paint") > -1){
			var e = a.substring(5);
			var sss = $(".paintAccording");
				for (var i = 0; i < sss.length; i++) {
					if(i==e-1){
						var srcs = sss.eq(i).attr("id");
						if(srcs){
							var data = {
								taskid : this.props.location.state.id,
								ty : 7,
							}
							//调用拍照
							weixinpic.photoImage(data);
							var choicet
							choicet = setInterval(function(){
								var idata = this.props.location.state ;
								var retarr21 = weixinpic.getsessionOrcookie(idata.id,"repair_2");
								var retarr22 = this.state.repair2;
								if(retarr22 == "0"){
									if(retarr21.length > 0){
										clearInterval(choicet);
										this.theCache();
									}
								}else if(retarr21.length != retarr22.length){
									clearInterval(choicet);
									this.theCache();
								}
							}.bind(this),200)
						}else{
							srcs = sss.eq(i).attr("src");
						    var data = {
						    	idata : this.props.location.state,
						    	localid : srcs,
						    	ty : 7,
						    }
							this.props.history.replaceState(data, "/service_image");
						}
					}
				}
		}
		if(a.indexOf("end") > -1){
			var e = a.substring(3);
			var sss = $(".endAccording");
				for (var i = 0; i < sss.length; i++) {
					if(i==e-1){
						var srcs = sss.eq(i).attr("id");
						if(srcs){
							var data = {
								taskid : this.props.location.state.id,
								ty : 8,
							}
							//调用拍照
							weixinpic.photoImage(data);
							var choicet
							choicet = setInterval(function(){
								var idata = this.props.location.state ;
								var retarr31 = weixinpic.getsessionOrcookie(idata.id,"repair_3");
								var retarr32 = this.state.repair3;
								if(retarr32 == "0"){
									if(retarr31.length > 0){
										clearInterval(choicet);
										this.theCache();
									}
								}else if(retarr31.length != retarr32.length){
									clearInterval(choicet);
									this.theCache();
								}
							}.bind(this),200)
						}else{
							srcs = sss.eq(i).attr("src");
						    var data = {
						    	idata : this.props.location.state,
						    	localid : srcs,
						    	ty : 8,
						    }
							this.props.history.replaceState(data, "/service_image");
						}
					}
				}
			}
	},
	//渲染之后绑定事件
	componentDidUpdate:function(){
		  var a = this;
		  var s1 = $(".imageAccordi");
		  for (var i = 0; i < s1.length; i++) {
			  s1.eq(i).unbind()
			  s1.eq(i).bind("click",function(){
					var inde = $(this).index()+1;
					var aaa = "stand" + inde;
					a.imageCilck(aaa);
			  })
		  }
		  var s2 = $(".paintAccordi");
		  for (var i = 0; i < s2.length; i++) {
			  s2.eq(i).unbind()
			  s2.eq(i).bind("click",function(){
					var inde = $(this).index()+1;
					var aaa = "paint" + inde;
					a.imageCilck(aaa);
			  })
		  }
		  var s3 = $(".endAccordi");
		  for (var i = 0; i < s3.length; i++) {
			  s3.eq(i).unbind()
			  s3.eq(i).bind("click",function(){
					var inde = $(this).index()+1;
					var aaa = "end" + inde;
					a.imageCilck(aaa);
			  })
		  }
	},
	toUploadPhoto(){
		var idata = this.props.location.state ;
		var data = {
			taskId : idata.id,
			taskProgress : "6",
			reportNo : idata.reportno,
			n : 2,
		}
		this.toUpload();
		weixinpic.upload(data);
		this.modalState2("one");
	},
	//确认结束
	endClick(){
		var idata = this.props.location.state ;
		this.modalState();
		var data = {
				sendType: "0004",
				taskId: idata.id,
		};
		$.ajax({
		      url: "/lexiugo-app/weixin/AfterMarketLoginServlet",
		      data:data,
//		      contentType: "application/javascript",
	          dataType: "json",
//	          jsonp: "callback",
	          type: "post",
		      success: function(msg) {
		    	  if(msg.data.ResponseCode == "0000"){
		    		  this.setState({ResponseMessage:"维修结束成功"});
		    	  }else{
		    		  this.setState({ResponseMessage:"维修结束失败"});
		    	  }
		    	  this.modalState("sucOrfai");
		      }.bind(this),
		      error: function(xhr, status, err) {
		        console.error(this.props.url, status, err.toString());
		      }.bind(this)
		 });
	},
	render(){
		var standList = [];
		var paintList = [];
		var endList = [];
		var imageList = [];
		var idata = this.props.location.state ;
		console.log(idata)
		var standLists = this.state.repair1;
		if(standLists == "0"){
			standList.push(
					<div className="imageAccordi" key="66666666666666666">
						<div className="ServiceAccording" id="repair1"></div>
		  	  		</div>
			);
		}else{
			imageList = this.state.repair1;
			for (var i = 0; i < imageList.length; i++) {
				var image = imageList[i];
				if(image.flag == 1){
					standList.push(
						<div className="imageAccordi" key={image.localid}>
							<img className="ServiceAccording" src={image.localid}/>
							<div className="imageRelative"><div className="imageService"></div></div>
					  	</div>
					);
				}else{
					standList.push(
						<div className="imageAccordi" key={image.localid}>
							<img className="ServiceAccording" src={image.localid}/>
				  	  	</div>
					);
				}
				if(i == imageList.length - 1){
					standList.push(
						<div className="imageAccordi" key="21657468746532545174854164">
							<div className="ServiceAccording" id={100+i}></div>
					  	</div>
					);
				}
			}
		}
		var paintLists = this.state.repair2;
		if(paintLists == "0"){
			paintList.push(
					<div className="paintAccordi" key="77777777777777777">
						<div className="paintAccording" id="repair2"></div>
		  	  		</div>
			);
		}else{
			imageList = this.state.repair2;
			console.log(imageList)
			for (var i = 0; i < imageList.length; i++) {
				var image = imageList[i];
				if(image.flag==1){
					paintList.push(
						<div className="paintAccordi" key={image.localid}>
							<img className="paintAccording" src={image.localid}/>
							<div className="imageRelative"><div className="imageService"></div></div>
					  	</div>
					);
				}else{
					paintList.push(
						<div className="paintAccordi" key={image.localid}>
							<img className="paintAccording" src={image.localid}/>
				  	  	</div>
					);
				}
				if(i == imageList.length - 1){
					paintList.push(
						<div className="paintAccordi" key="2165746874653525415174854164">
							<div className="paintAccording" id={200+i}></div>
					  	</div>
					);
				}
			}
		}
		var endLists = this.state.repair3;
		if(endLists == "0"){
			endList.push(
					<div className="endAccordi" key="8888888888888888">
						<div className="endAccording" id="repair3"></div>
		  	  		</div>
			);
		}else{
			imageList = this.state.repair3;
			for (var i = 0; i < imageList.length; i++) {
				var image = imageList[i];
				if(image.flag==1){
					endList.push(
						<div className="endAccordi" key={image.localid}>
							<img className="endAccording" src={image.localid}/>
							<div className="imageRelative"><div className="imageService"></div></div>
				  	  	</div>
					);
				}else{
					endList.push(
						<div className="endAccordi" key={image.localid}>
							<img className="endAccording" src={image.localid}/>
				  	  	</div>
					);
				}
				if(i == imageList.length - 1){
					endList.push(
						<div className="endAccordi" key="2165746872514546535174854164">
							<div className="endAccording" id={300+i}></div>
					  	</div>
					);
				}
			}
		}
        return (
        	 <div className="item_survey_single">
	    		  {/*<div className="headerInfo">
	    		  	<IconFont name="&#xe609;" onClick={this.returnServiceClick}/>
					<HeaderIf numBer="" name="维修状况"></HeaderIf>
				  </div>*/}
				  {/*<p className="insurceInfo clearfix">
					  <span className="">{idata.plateno}</span>
					  <span className="detail" onClick={this.serviceClick}>详情 ></span>
				  </p>*/}
				 <p className="title">
					 <span>基本信息　</span>
					 <span className="detail" onClick={this.serviceClick}>详情 ></span>
				 </p>
				 <div className="detailLabel listContainer">
					 <ul>
						 <li><span>车牌号 :</span>{idata.plateno}</li>
						 <li><span>车型 :</span>{idata.carvehiclename}</li>
						 <li><span>保险公司 :</span>{idata.inscompanyname}</li>
						 <li><span>车主 :</span>{idata.customername}</li>
					 </ul>
				 </div>
				 <div className="detailLabel listContainer" style={{marginTop:'0.3rem'}}>
					 <li　style={{height:"0.5rem"}}><span>定损员　</span>{idata.lossby} <span style={{paddingRight:'0.15rem'}}>{'　('+idata.yddh+')'}</span><span style={{flex:'1',textAlign:'right',color:'#979596'}}><a className="CallDcc"  href={"tel:"+idata.yddh}></a></span></li>
				 </div>
				 <div style={{margin:'0.25rem 0',paddingBottom:'0.4rem',background:'#fff'}}>
					 <div className="checkDiv">
						 <div className="imageDiv iconPoint1">
							 <div onClick={this.standShrinkage} style={{display:'inline-block'}}>
								 <span className="checkPoint"></span>
								 <span className="checkFont">维修待命</span>
								 <IconFont name="" />
							 </div>
							 <button classID="btnCancle" className="btnService" onClick={()=>this.modalState("butStand")}>完成</button>
						 </div>
					 </div>
					 <div className="imageAccord" style={this.state.standShrinkage?{display:"flex"}:{display:"none"}}>
                         {standList}
                         <span className="dd"></span>
						 <span className="dd"></span>
					 </div>
					 <div>
						 <div className="imageDiv iconPoint2">
							 <div onClick={this.paintShrinkage} style={{display:'inline-block'}}>
								 <span className="checkPoint"></span>
								 <span className="checkFont">钣金喷漆</span>
								 <IconFont name="" />
							 </div>
							 <button classID="btnCancle" className="btnService" onClick={()=>this.modalState("butPaint")}>完成</button>
						 </div>
					 </div>
					 <div className="imageAccord" style={this.state.paintShrinkage?{display:"flex"}:{display:"none"}}>
                         {paintList}
						 <span className="dd"></span>
						 <span className="dd"></span>
					 </div>
					 <div>
						 <div className="imageDiv iconPoint3">
							 <div onClick={this.endShrinkage} style={{display:'inline-block'}}>
								 <span className="checkPoint"></span>
								 <span className="checkFont">维修结束</span>
								 <IconFont name="" />
							 </div>
							 <button classID="btnCancle" className="btnService" onClick={()=>this.modalState("butEnd")}>完成</button>
						 </div>
					 </div>
					 <div className="imageAccord" style={this.state.endShrinkage?{display:"flex"}:{display:"none"}}>
                         {endList}
						 <span className="dd"></span>
						 <span className="dd"></span>
					 </div>
				 </div>
					 <div className="btnGroup" style={this.state.butt=="1"?{display:"block"}:{display:"none"}}>
						 <button type="button" className="blueBtn" onClick={()=>this.modalState("uploadPhoto")}>维修结束</button>
					 </div>
					 <div className="btnGroup" style={this.state.butt=="2"?{display:"block"}:{display:"none"}}>
						 <button type="button" className="blueBtn" onClick={this.toUploadPhoto}>上传照片</button>
					 </div>


		  		  <div className="modalBox" style={this.state.dis?{display:"block"}:{display:"none"}}>
					  <div className="endCar" style={this.state.receGiveUP=="1"?{display:"block"}:{display:"none"}}>
							<div className="modalContent">温馨提醒</div>
							<div>亲！照片都拍好了吗？是否确认结束维修？</div>
						  	<div className="modalBtn">
							  <button classID="btnCancle" className="btn btnC" onClick={this.modalState}>还想拍照</button>
							  <button classID="btnSure" className="btn btnS" onClick={this.endClick}>确认结束</button>
						  	</div>
					  </div>
					  <div className="sucOrfai" style={this.state.receGiveUP=="2"?{display:"block"}:{display:"none"}}>
							<div className="modalContent">{this.state.ResponseMessage}</div>
							<div className="modalBtn">
							  <button className="btn btnS" onClick={this.returnServiceClick}>确认</button>
						    </div>
					  </div>
					  <div className="butStand" style={this.state.receGiveUP=="3"?{display:"block"}:{display:"none"}}>
					  		<div className="modalContent">请您确认是否完成</div>
							<div className="modalBtn">
								<button className="btn btnC" onClick={this.modalState}>取消</button>
								<button className="btn btnS" onClick={this.butStand}>确认</button>
						    </div>
				     </div>
				     <div className="butPaint" style={this.state.receGiveUP=="4"?{display:"block"}:{display:"none"}}>
				     		<div className="modalContent">请您确认是否完成</div>
							<div className="modalBtn">
								<button className="btn btnC" onClick={this.modalState}>取消</button>
								<button className="btn btnS" onClick={this.butPaint}>确认</button>
						    </div>
				     </div>
				     <div className="butEnd" style={this.state.receGiveUP=="5"?{display:"block"}:{display:"none"}}>
				     		<div className="modalContent">请您确认是否完成</div>
							<div className="modalBtn">
								<button className="btn btnC" onClick={this.modalState}>取消</button>
								<button className="btn btnS" onClick={this.butEnd}>确认</button>
						    </div>
				     </div>
				     <div className="aaa" style={this.state.toBan?{display:"block"}:{display:"none"}}>
				     		<div className="modalContent">至少上传一张照片</div>
							<div className="modalBtn">
								<button className="btn btnS" onClick={this.modalState}>确认</button>
						    </div>
				     </div>
				     <div className="queding" style={this.state.receGiveUP=="6"?{display:"block"}:{display:"none"}}>
						<div className="modalContent">{this.state.ResponseMessage}</div>
						<div className="modalBtn">
						  <button className="btn btnS" onClick={this.queClick}>确认</button>
					    </div>
					 </div>
			      </div>
				  <ModalBg dis={this.state.dis}></ModalBg>
				  <div className="modalBox" style={this.state.upl?{display:"block"}:{display:"none"}}>
					  <div className="upl">
			  	  	  		<div className="modalContent">温馨提醒</div>
			  	  	  		<div className="modalContent">照片上传中，请勿关闭退出!</div>
			  	  	  		<div className="modalContent">照片上传完成此窗口将自动关闭！</div>
		  	  		  </div>
				  </div>
				  <ModalBg dis={this.state.upl}></ModalBg>
  		  </div>
        )
    }
})
	  


export default Service_detail;