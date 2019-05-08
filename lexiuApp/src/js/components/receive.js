/**
 * Created by Administrator on 2016/7/23 0023.
 * APP接车
 */
import React from 'react';
import $ from 'jquery';
import {IconFont,HeaderIf,ModalBg} from '../commonComponent/common'
import cookie from '../commonComponent/cookieJs'
import {XLCFooter} from '../../../../common/assembly/someAssembly'

const Receive = React.createClass({
	getInitialState: function() {
		return {d: [],rectotal:"",pageNo:1,};
	},
	componentWillUnmount: function () {
     this.serverRequest.abort();
    },
    //请求
    loadCommentsFromServer: function(data) {
 	    this.serverRequest=$.ajax({
		      url: "/lexiugo-app/weixin/AfterMarketLoginServlet",
		      data:data,
		      //contentType: "application/javascript",
	          dataType: "json",
	          //jsonp: "callback",
	          type: "post",
		      success: function(msg) {
		    	  if( msg.data.ResponseCode == "0000" ){
		    		  if(data.flag=="1"){
		    				this.setState({d:[]});
		    				this.setState({pageNo:1});
		    		  }
		    		  if(msg.data.TaskList.length < 10){
		    			  $("#Loading").hide();
		    		  }else{
		    			  $("#Loading").show();
		    		  }
		    		  for (var int = 0; int < msg.data.TaskList.length; int++) {
						  this.state.d.push(msg.data.TaskList[int]);
					  }
			  	      this.setState({rectotal:msg.data.RecTotal});
			  	      this.setState({pageNo:this.state.pageNo+1});
		    	  }else {
		    		  alert( msg.data.ResponseMessage );
		    	  }
		      }.bind(this),
		      error: function(xhr, status, err) {
		        console.error(this.props.url, status, err.toString());
		      }.bind(this)
		    });
 	},
 	//初始化渲染执行之后立刻调用
	componentDidMount: function() {
	     var data = {
             state: "1",
             sendType: "0000",
             pageSize: "10",
       	     pageNo: "1",
       	     flag:"0",
          };
	     this.loadCommentsFromServer(data);
	},
	//渲染之后绑定事件
	componentDidUpdate:function(){
		  var a = this;
		  var data = this.state.d;
		  var sss = $(".listContainer")
		  for (var i = 0; i < sss.length; i++) {
			  sss.eq(i).unbind();
			  sss.eq(i).bind("click",function(){
					 var inde = $(this).index()-2;
					 for(var j = 0;j < data.length; j++){
						  if(inde == j){
								var idata = data[j];
								a.props.history.pushState(idata, "/receive_detail");
						  }
					 }
			  })
		  }
	},
	handleSubmit(e){
		  e.preventDefault();
		  $("#queryInput").keyup(function(e){
				//点击go按钮或者搜索按钮查询
				if(e.which == 13)
				{ 
					$("#queryInput").blur();
					var data = {
					          state: "1",
					          sendType: "0000",
					          pageSize: "10",
					          pageNo: "1",
					          plateNo: this.state.plateNo,
					          flag:"1",
					 };
					 this.loadCommentsFromServer(data);
				}
	      }.bind(this));
	},
	//文本框值改变调用
	handleChange(e) {
	        var newState = {};
	        newState[e.target.name] = e.target.value;
	        this.setState(newState);
	},
	//更多
	aClick(){
		  var data = {
		          state: "1",
		          sendType: "0000",
		          pageSize: "10",
		          pageNo: this.state.pageNo,
		          plateNo: this.state.plateNo,
		          flag:"0",
		 };
		 this.loadCommentsFromServer(data);
	},
	//显示隐藏 搜索框
	cheClick(){
		  $("#sou").slideToggle();
	},
    render() {
		  var item_surveyNodes = [];
		  const arr = this.state.d
		  for (var i = 0; i < arr.length; i++) {
			  var item_survey = arr[i];
			  var comname = item_survey.inscompanyname;
			  var insuranceLogoBg = "";
			  switch (item_survey.zzbh){
				  case "CCIC":
					  insuranceLogoBg="insLogoCcic";
					  break;
				  case "CIC":
					  insuranceLogoBg="insLogoCic";
					  break;
				  case "YGBX":
					  insuranceLogoBg="insLogoYgbx";
					  break;
				  case "PICC":
					  insuranceLogoBg="insLogoPicc";
					  break;
				  default:
					  insuranceLogoBg="";
			  }
			  var odd = {
				  backgroundColor: "#e5f5fb"
			  };
			  var eve = {
				  backgroundColor: "#f0f0f0"
			  }
			  var cname = item_survey.send_car_person;
			  if(cname == "" || cname == null){
				  cname = item_survey.customername;
			  }

			  item_surveyNodes.push(
				  <div className="listContainer clearfix" style={i%2==0?odd:eve} key={item_survey.id}>
					  <li><span>车牌号 :</span>{item_survey.plateno}</li>
					  <li><span>车 主 :</span>{cname}</li>
					  <li><span>保险公司 :</span>{item_survey.inscompanyname}</li>
					  <li><span>车辆品牌 :</span>{item_survey.ppmc}</li>
					  <li><span>推修时间 :</span>{item_survey.createTimeString}</li>
					  {/*<div className="clearfix">
						  <label className="plateno">{item_survey.plateno}</label>
						  <label className="customerName">{cname}</label>
						  <label className="updatetime">{item_survey.createTimeString}</label>
					  </div>
					  <div className="vehicleDescription">
						  {item_survey.cxmc}
					  </div>
					  <div className="insurceInfo">
						  <span className="insurceLogo" id={insuranceLogoBg}></span>
						  <span className="">{comname}</span>
					  </div>*/}
                 </div>
			  );
		  }
    	return (
			<div className="item_survey_list clearfix">
				<div className="headerInfo">
					<HeaderIf numBer={this.state.rectotal} name="接车"></HeaderIf>
					<IconFont name="&#xe607;" onClick={this.cheClick}/>
				</div>
				<div className="hiddenDiv" id="sou">
					<form onSubmit={this.handleSubmit}>
	    		  	  	<input type="text" id="queryInput" required="required" name="plateNo" 
	    		  	  		onChange={this.handleChange} focus={this.souFocus} placeholder="请输入车牌号"/>
	    		  	</form>
				</div>
    		      {item_surveyNodes}
    		    <div>
					  <section id="Loading" className="Loading" value={this.state.pageNo} onClick={this.aClick}>点击加载更多...</section>
				</div>
				<XLCFooter/>




				{/*<div className="addInfo">
					<div className="InfoBox">
						<div className="infoSty">
							<ul>
								<li>
									<input type="text"/>
									<div>
										<span></span>
									</div>
								</li>
								<li>
									<input type="text"/>
									<div>
										<span></span>
									</div>
								</li>
								<li>
									<input type="text"/>
									<div>
										<span></span>
									</div>
								</li>
								<li>
									<input type="button" value="确定"/>
								</li>
							</ul>
						</div>

					</div>
				</div>*/}







    		  </div>
    	);
    }
});
export default Receive;