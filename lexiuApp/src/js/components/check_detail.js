/**
 * Created by Administrator on 2016/7/23 0023.
 * APP查勘上传照片
 */
import React from 'react';
import $ from 'jquery';
import {IconFont,HeaderIf,ModalBg} from '../commonComponent/common'
import cookie from '../commonComponent/cookieJs'
import weixinpic from '../weixnphoto/weixinpic'

const Survey = React.createClass({
	getInitialState(){
		return{
			dis:false,
			receGiveUP:"0",
			shrinkage:true,
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
		}//修改this.state.receGiveUP控制模态框内容区出现接车部分或者放弃部分
		if(a=="uploadPhoto"){
			var idata = this.props.location.state ;
			var survey13 = weixinpic.getsessionOrcookieforup(idata.id,"survey_1");
			var survey23 = weixinpic.getsessionOrcookieforup(idata.id,"survey_2");
			var survey33 = weixinpic.getsessionOrcookieforup(idata.id,"survey_3");
			var survey43 = weixinpic.getsessionOrcookieforup(idata.id,"survey_4");
			var survey53 = weixinpic.getsessionOrcookieforup(idata.id,"survey_5");
			if(survey13.length == 0 && survey23 == 0 && survey33 == 0 && survey43 == 0 && survey53 == 0){
				this.setState({receGiveUP:"4"});
				this.setState({ResponseMessage:"暂无新照片"});
			}else{
				var sss = $(".imageAccording");
				for (var i = 0; i < 5; i++) {
						var srcs = sss.eq(i).attr("id");//http://192.168.110.206:8080/app/check_detail
						if(srcs){
							switch (i){
								case 0:
									this.setState({ima:"身份证(正面)"});
									this.setState({receGiveUP:"1"});
									break;
								case 1:
									this.setState({ima:"身份证(反面)"});
									this.setState({receGiveUP:"1"});
									break;
								case 2:
									this.setState({ima:"行驶证"});
									this.setState({receGiveUP:"1"});
									break;
								case 3:
									this.setState({ima:"驾驶证"});
									this.setState({receGiveUP:"1"});
									break;
								case 4:
									this.setState({ima:"车损"});
									this.setState({receGiveUP:"1"});
									break;
							}
							return
						}else{
							this.setState({receGiveUP:"3"});
						}
				}
			}
		}else if(a=="sucOrfai"){
			this.setState({receGiveUP:"2"})
		}else if(a=="queding"){
			this.setState({receGiveUP:"6"})
		}else {}
	},
	//控制模态框2
	modalState2(a){
		//修改this.state.dis控制模态框出现消失
		if (a=="one"){
			this.setState({upl:true})
		}else {
			this.setState({upl:false})
		}
	},
	//初始化渲染前执行
	componentWillMount:function() {
		this.theCache();
	},
	//从缓存去数据
	theCache(){
		var idata = this.props.location.state;
		var retarr = [];
		  retarr = weixinpic.getsessionOrcookie(idata.id,"survey_1");
			  if(retarr.length == 0) {this.setState({survey1:"0"});}
				  else {this.setState({survey1:retarr});};
		  retarr = weixinpic.getsessionOrcookie(idata.id,"survey_2");
			  if(retarr.length == 0) {this.setState({survey2:"0"});}
			  	  else {this.setState({survey2:retarr});}
		  retarr = weixinpic.getsessionOrcookie(idata.id,"survey_3");
			  if(retarr.length == 0) {this.setState({survey3:"0"});}
			  	  else {this.setState({survey3:retarr});}
		  retarr = weixinpic.getsessionOrcookie(idata.id,"survey_4");
			  if(retarr.length == 0) {this.setState({survey4:"0"});}
			  	  else {this.setState({survey4:retarr});}
		  retarr = weixinpic.getsessionOrcookie(idata.id,"survey_5");
			  if(retarr.length == 0) {this.setState({survey5:"0"});}
			  	  else {this.setState({survey5:retarr});}
	},
	//初始化渲染执行之后立刻调用
	componentDidMount: function() {
		  var n = cookie.getCookie("userInfo")
	      localStorage.setItem("msg", "3");//存
	},
	//点击查看拍照调用
	checkShrinkage(){
		if (!this.state.shrinkage){
			this.setState({shrinkage:true})
			$(".imageDiv .iconfont").html("&#xe60a;")
		}else {
			this.setState({shrinkage:false})
			$(".imageDiv .iconfont").html("&#xe60b;")
		}
	},
	guanClick(){
		this.returnClick();
	},
	//确认调用
	uploadClick(){
		var idata = this.props.location.state ;
			var data1 = {
				taskId : idata.id,
				taskProgress : "2",
				reportNo : idata.reportno,
				n : 1,
			}
			weixinpic.upload(data1);
			this.modalState();
			this.modalState2("one");
			var survey11 = this.state.survey1;
			var survey21 = this.state.survey2;
			var survey31 = this.state.survey3;
			var survey41 = this.state.survey4;
			var survey51 = this.state.survey5;
			var choicet
			choicet = setInterval(function(){
				var msg=localStorage.getItem("msg");
				if(msg == 1){
					var survey12 = weixinpic.getsessionOrcookie(idata.id,"survey_1");
					var survey22 = weixinpic.getsessionOrcookie(idata.id,"survey_2");
					var survey32 = weixinpic.getsessionOrcookie(idata.id,"survey_3");
					var survey42 = weixinpic.getsessionOrcookie(idata.id,"survey_4");
					var survey52 = weixinpic.getsessionOrcookie(idata.id,"survey_5");
					if(survey12.length > 0){
						var survey13 = survey11[0];
						var survey14 = survey12[0];
						if(survey13.flag != survey14.flag){
							clearInterval(choicet);
	//						this.modalState2("one1");
	//						this.theCache();
							this.setState({ResponseMessage:"上传照片成功"});
							localStorage.setItem("msg", "3");//存
							this.modalState2("one1");
							this.setState({dis:false})
							this.modalState("sucOrfai");
						}
					}
					if(survey22.length > 0){
						var survey23 = survey21[0];
						var survey24 = survey22[0];
						if(survey23.flag != survey24.flag){
							clearInterval(choicet);
							this.setState({ResponseMessage:"上传照片成功"});
							localStorage.setItem("msg", "3");//存
							this.modalState2("one1");
							this.setState({dis:false})
							this.modalState("sucOrfai");
						}
					}
					if(survey32.length > 0){
						var survey33 = survey31[0];
						var survey34 = survey32[0];
						if(survey33.flag != survey34.flag){
							clearInterval(choicet);
							this.setState({ResponseMessage:"上传照片成功"});
							localStorage.setItem("msg", "3");//存
							this.modalState2("one1");
							this.setState({dis:false})
							this.modalState("sucOrfai");
						}
					}
					if(survey42.length > 0){
						var survey43 = survey41[0];
						var survey44 = survey42[0];
						if(survey43.flag != survey44.flag){
							clearInterval(choicet);
							this.setState({ResponseMessage:"上传照片成功"});
							localStorage.setItem("msg", "3");//存
							this.modalState2("one1");
							this.setState({dis:false})
							this.modalState("sucOrfai");
						}
					}
					if(survey52.length > 0){
						for (var i=0;i<survey51.length;i++){
							var survey53 = survey51[i];
							for (var j=0;j<survey52.length;j++){
								var survey54 = survey52[j];
								if(survey53.localid == survey54.localid){
									if(survey53.flag != survey54.flag){
										clearInterval(choicet);
										this.setState({ResponseMessage:"上传照片成功"});
										localStorage.setItem("msg", "3");//存
										this.modalState2("one1");
										this.setState({dis:false})
										this.modalState("sucOrfai");
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
	//返回查勘列表
	returnClick(){
		this.props.history.replaceState(null, "/XList");
	},
	//进入查勘详情
	detailsClick(){
		var detailsData = this.props.location.state;
		this.props.history.pushState(detailsData, "/check_details")
	},
	//点击图片调用
	imageCilck(e){
		var sss = $(".imageAccording")
		for (var i = 0; i < sss.length; i++) {
			if(i==e-1){
				var ty;
				if(e == 1) ty = 1;
				if(e == 2) ty = 2;
				if(e == 3) ty = 3;
				if(e == 4) ty = 4;
				if(e >= 5) ty = 5;
				var srcs = sss.eq(i).attr("id");//http://192.168.110.206:8080/app/check_detail
				if(srcs){
					var data = {
						taskid : this.props.location.state.id,
					    ty : ty,
					}
					//调用拍照 
					weixinpic.photoImage(data);
					var choicet
					choicet = setInterval(function(){
						var idata = this.props.location.state ;
						if(e == 1){
							var survey11 = weixinpic.getsessionOrcookie(idata.id,"survey_1");
							if(survey11.length == 1){
								clearInterval(choicet);
								this.theCache();
							}
						}else if(e == 2){
							var survey11 = weixinpic.getsessionOrcookie(idata.id,"survey_2");
							if(survey11.length == 1){
								clearInterval(choicet);
								this.theCache();
							}
						}else if(e == 3){
							var survey11 = weixinpic.getsessionOrcookie(idata.id,"survey_3");
							if(survey11.length == 1){
								clearInterval(choicet);
								this.theCache();
							}
						}else if(e == 4){
							var survey11 = weixinpic.getsessionOrcookie(idata.id,"survey_4");
							if(survey11.length == 1){
								clearInterval(choicet);
								this.theCache();
							}
						}else if(e >= 5){
							var survey11 = weixinpic.getsessionOrcookie(idata.id,"survey_5");
							var survey12 = this.state.survey5;
							if(survey12 == "0"){
								if(survey11.length > 0){
									clearInterval(choicet);
									this.theCache();
								}
							}else if(survey11.length != survey12.length){
								clearInterval(choicet);
								this.theCache();
							}
						}
					}.bind(this),200)
				}else{
					srcs = sss.eq(i).attr("src");
				    var data = {
				    	idata : this.props.location.state,
				    	localid : srcs,
				    	ty : ty,
				    }
					this.props.history.replaceState(data, "/check_image");
				}
			}
		}
	},
//	componentWillUnmount: function() {
//	    this.serverRequest.abort();
//	},
	//渲染之后绑定事件
	componentDidUpdate:function(){
		  var a = this;
		  var sss = $(".imageAccordi");
		  for (var i = 0; i < sss.length; i++) {
			  if(i > 3){
				  sss.eq(i).unbind()
				  sss.eq(i).bind("click",function(){
					  var inde = $(this).index()+1;
					  a.imageCilck(inde);
				  })
			  }
		  }
	},
    render() {
		var imageList = [];
		var checkList = [];
		var idata = this.props.location.state ;
		console.log(idata)//路由跳转传递数据 {this.props.location.state} 
		var survey1s = this.state.survey1;
		if(survey1s=="0"){
			imageList.push(
				<div className="imageAccordi" key="11111111111111">
			  	  	<div className="imageAccording" id="survey1" onClick={()=>this.imageCilck("1")}></div>
			  	  	<span className="checkSize">身份证(正面)</span>
			  	</div>
			);
		}else{
			checkList = this.state.survey1;
			for (var i = 0; i < 1; i++) {
				var image = checkList[i];
				if(image.flag==1){
					imageList.push(
						<div className="imageAccordi" key={image.localid}>
						  	  <img className="imageAccording" src={image.localid} onClick={()=>this.imageCilck("1")}/>
						  	  <div className="imageRelative"><div className="imageSelect"></div></div>
						  	  <span className="checkSize">身份证(正面)</span>
						</div>
					);
				}else{
					imageList.push(
						<div className="imageAccordi" key={image.localid}>
					  	  	<img className="imageAccording" src={image.localid} onClick={()=>this.imageCilck("1")}/>
					  	  	<span className="checkSize">身份证(正面)</span>
					  	</div>
					);
				}
			}
		}
		var survey2s = this.state.survey2;
		if(survey2s=="0"){
			imageList.push(
				<div className="imageAccordi" key="22222222222222">
				  	 <div className="imageAccording" id="survey2" onClick={()=>this.imageCilck("2")}></div>
				  	 <span className="checkSize">身份证(反面)</span>
				</div>
			);
		}else{
			checkList = this.state.survey2;
			for (var i = 0; i < 1; i++) {
				var image = checkList[i];
				if(image.flag==1){
					imageList.push(
						<div className="imageAccordi" key={image.localid}>
							  <img className="imageAccording" src={image.localid} onClick={()=>this.imageCilck("2")}/> 
							  <div className="imageRelative"><div className="imageSelect"></div></div>
							  <span className="checkSize">身份证(反面)</span>
						</div>
					);
				}else{
					imageList.push(
						<div className="imageAccordi" key={image.localid}>
						  	  <img className="imageAccording" src={image.localid} onClick={()=>this.imageCilck("2")}/> 
						  	  <span className="checkSize">身份证(反面)</span>
						</div>
					);
				}
			}
		}
		var survey3 = this.state.survey3;
		if(survey3=="0"){
			imageList.push(
				<div className="imageAccordi" key="33333333333333">
				  	 <div className="imageAccording" id="survey3" onClick={()=>this.imageCilck("3")}></div>
				  	 <span className="checkSize">行驶证</span>
				</div>
			);
		}else{
			checkList = this.state.survey3;
			for (var i = 0; i < 1; i++) {
				var image = checkList[i];
				if(image.flag==1){
					imageList.push(
						<div className="imageAccordi" key={image.localid}>
							  <img className="imageAccording" src={image.localid} onClick={()=>this.imageCilck("3")}/>
							  <div className="imageRelative"><div className="imageSelect"></div></div>
							  <span className="checkSize">行驶证</span>
						</div>
					);
				}else{
					imageList.push(
						<div className="imageAccordi" key={image.localid}>
						  	  <img className="imageAccording" src={image.localid} onClick={()=>this.imageCilck("3")}/>
						  	  <span className="checkSize">行驶证</span>
						</div>
					);
				}
			}
		}
		var survey4 = this.state.survey4;
		if(survey4=="0"){
			imageList.push(
				<div className="imageAccordi" key="444444444444444444">
				  	 <div className="imageAccording" id="survey4" onClick={()=>this.imageCilck("4")}></div>
				  	 <span className="checkSize">驾驶证</span>
				</div>
			);
		}else{
			checkList = this.state.survey4;
			for (var i = 0; i < 1; i++) {
				var image = checkList[i];
				if(image.flag==1){
					imageList.push(
						<div className="imageAccordi" key={image.localid}>
							  <img className="imageAccording" src={image.localid} onClick={()=>this.imageCilck("4")}/>
							  <div className="imageRelative"><div className="imageSelect"></div></div>
							  <span className="checkSize">驾驶证</span>
						</div>
					);
				}else{
					imageList.push(
						<div className="imageAccordi" key={image.localid}>
						  	  <img className="imageAccording" src={image.localid} onClick={()=>this.imageCilck("4")}/>
						  	  <span className="checkSize">驾驶证</span>
						</div>
					);
				}
			}
		}
		var survey5 = this.state.survey5;
		if(survey5=="0"){
			imageList.push(
				<div className="imageAccordi" key="555555555555555">
				  	 <div className="imageAccording" id="survey5"></div>
				  	 <span className="checkSize">车损(1)</span>
				</div>
			);
		}else{
			checkList = this.state.survey5;
			for (var i = 0; i < checkList.length; i++) {
				var image = checkList[i];
				if(image.flag==1){
					imageList.push(
						<div className="imageAccordi" key={image.localid}>
						  	  <img className="imageAccording" src={image.localid}/>
						  	  <div className="imageRelative"><div className="imageSelect"></div></div>
						  	  <span className="checkSize">车损({i+1})</span>
						</div>
					);
				}else{
					imageList.push(
						<div className="imageAccordi" key={image.localid}>
							  <img className="imageAccording" src={image.localid}/>
							  <span className="checkSize">车损({i+1})</span>
						</div>
					);
				}
				if(i == checkList.length - 1){
					imageList.push(
						<div className="imageAccordi" key="13248564687456456441">
						  	 <div className="imageAccording" id={i}></div>
						  	 <span className="checkSize">车损({i+2})</span>
						</div>
					);
				} 
			}
		}

    	return (
    		  <div className="item_survey_single">
	    		  {/*<div className="headerInfo">
	    		  	<IconFont name="&#xe609;" onClick={this.returnClick}/>
					<HeaderIf numBer="" name="查勘拍照"></HeaderIf>
				  </div>*/}
				  {/*<p className="insurceInfo clearfix">
					  <span className="">{idata.plateno}</span>
					  <span className="detail" onClick={this.detailsClick}>详情 ></span>
				  </p>*/}


				  <p className="title">
					  <span>基本信息　</span>
					  <span className="detail" onClick={this.detailsClick}>详情 ></span>
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
					  <div className="checkDiv" onClick={this.checkShrinkage}>
						  <div className="imageDiv">
							  <span className="checkPoint"></span>
							  <span className="checkFont">查勘拍照</span>
							  <IconFont name="&#xe60a;"/>
						  </div>
					  </div>
					  <div className="imageAccord" style={this.state.shrinkage?{display:"flex"}:{display:"none"}}>
                          {imageList}
						  <span className="dd"></span>
						  <span className="dd"></span>
					  </div>
				  </div>
					  <div className="btnGroup">
						  <button type="button" className="blueBtn" onClick={()=>this.modalState("uploadPhoto")}>结束勘察上传照片</button>
					  </div>


	    		  <div className="modalBox" style={this.state.dis?{display:"block"}:{display:"none"}}>
					  <div className="uploadCar" style={this.state.receGiveUP=="1"?{display:"block"}:{display:"none"}}>
							<div className="modalContent">温馨提醒</div>
							<div>缺少【{this.state.ima}】照，是否需要上传</div>
						  	<div className="modalBtn">
							  <button classID="btnCancle" className="btn btnC" onClick={this.modalState}>取消</button>
							  <button classID="btnSure" className="btn btnS" onClick={this.uploadClick}>确认</button>
						  	</div>
					  </div>
					  <div className="uploadCa" style={this.state.receGiveUP=="3"?{display:"block"}:{display:"none"}}>
							<div className="modalContent">温馨提醒</div>
							<div>照片齐全，是否需要上传</div>
						  	<div className="modalBtn">
							  <button classID="btnCancle" className="btn btnC" onClick={this.modalState}>取消</button>
							  <button classID="btnSure" className="btn btnS" onClick={this.uploadClick}>确认</button>
						  	</div>
					  </div>
					  <div className="sucOrfai" style={this.state.receGiveUP== "2"?{display:"block"}:{display:"none"}}>
							<div className="modalContent">{this.state.ResponseMessage}</div>
							<div className="modalBtn">
							  <button className="btn btnS" onClick={this.returnClick}>确认</button>
						    </div>
					  </div>
					  <div className="guan" style={this.state.receGiveUP== "4"?{display:"block"}:{display:"none"}}>
							<div className="modalContent">{this.state.ResponseMessage}</div>
							<div className="modalBtn">
								<button className="btn btnS" onClick={this.guanClick}>确认</button>
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
    	);
    }
});


export default Survey;