/**
 * Created by Administrator on 2016/7/23 0023.
 * APP维修
 */
import React from 'react';
import $ from 'jquery';
import {IconFont,HeaderIf} from '../commonComponent/common'
import cookie from '../commonComponent/cookieJs'
import {XLCFooter} from '../../../../common/assembly/someAssembly'

const Service = React.createClass({
	getInitialState: function() {
		return {d: [],rectotal:"",pageNo:1};
	},
	componentWillUnmount: function () {
        this.serverRequest.abort();
    },
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
	componentDidMount: function() {
	     var data = {
             state: "3",
             sendType: "0000",
             pageSize: "10",
       	     pageNo: "1",
       	     flag:"0",
         };
		 this.loadCommentsFromServer(data); 
	  },
	  handleSubmit(e){
		  e.preventDefault();
		  $("#queryInput").keyup(function(e){
				//点击go按钮或者搜索按钮查询
				if(e.which == 13)
				{ 
					$("#queryInput").blur();
				    this.souClick();
				}
	      }.bind(this));
	  },
	  handleChange(e) {
	        var newState = {};
	        newState[e.target.name] = e.target.value;
	        this.setState(newState);
	  },
	  aClick(){
		  var data = {
		          state: "3",
		          sendType: "0000",
		          pageSize: "10",
		          pageNo: this.state.pageNo,
		          plateNo: this.state.plateNo,
		          flag:"0",
		 };
		 this.loadCommentsFromServer(data);
	  },
	  souClick(){
		  var data = {
		          state: "3",
		          sendType: "0000",
		          pageSize: "10",
		          pageNo: "1",
		          plateNo: this.state.plateNo,
		          flag:"1",
		 };
		 this.loadCommentsFromServer(data);
	  },
	  cheClick(){
		  $("#sou").slideToggle();
	  },
	  componentDidUpdate:function(){
		  var a = this
		  var data = this.state.d;
		  var sss = $(".listContainer")
		  for (var i = 0; i < sss.length; i++) {
			  sss.eq(i).unbind()
			  sss.eq(i).bind("click",function(){
					 var inde = $(this).index()-2
					 for(var j = 0;j < data.length; j++){
						  if(inde == j){
								var idata = data[j];
								a.props.history.pushState(idata, "/service_detail")
						  }
					 }
			  })
		  }
	  },
      render() {
    		  var item_surveyNodes = [];
			  const arr = this.state.d
			  for (var i = 0; i < arr.length; i++) {
				  var item_survey = arr[i];
				  var progress = "";
				  if (item_survey.taskprogress == 3) {
					  progress = "维修待命";
				  } else if (item_survey.taskprogress == 4) {
					  progress = "钣金喷漆";
				  } else if (item_survey.taskprogress > 4) {
					  progress = "维修结束";
				  } else {
					  progress = "维修待命";
				  }
				  ;
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
				  var cname = item_survey.send_car_person;
				  if(cname == "" || cname == null){
					  cname = item_survey.customername;
				  }
				  var odd = {
					  backgroundColor: "#e5f5fb"
				  }
				  var eve = {
					  backgroundColor: "#f0f0f0"
				  }
				  item_surveyNodes.push(
						  <div className="listContainer clearfix" style={i%2==0?odd:eve} key={i}>
							  <li><span>车牌号 :</span>{item_survey.plateno}</li>
							  <li><span>车 主 :</span>{cname}</li>
							  <li><span>保险公司 :</span>{item_survey.inscompanyname}</li>
							  <li><span>车辆描述 :</span>{item_survey.cximc}</li>
							  <li><span>接车时间 :</span>{item_survey.inRepairTimeString}</li>


							 </div>
					  );
			  }

    	return (
    		  <div className="item_survey_list clearfix">
	    		  {/*<div className="headerInfo">
					<HeaderIf numBer={this.state.rectotal} name="维修"></HeaderIf>
					<IconFont name="&#xe607;" onClick={this.cheClick}/>
				  </div>*/}
				  <div className="hiddenDiv" id="sou">
						<form onSubmit={this.handleSubmit}>
		    		  	  	<input type="text" id="queryInput" required="required" name="plateNo"
		    		  	  		onChange={this.handleChange} placeholder="请输入车牌号"/>
	    		  	  	</form>
    		  	  </div>
					{item_surveyNodes}
    		      <div>
    		      <section id="Loading" className="Loading" value={this.state.pageNo} onClick={this.aClick}>点击加载更多...</section>
			   	  </div>


				  <XLCFooter/>

    		  </div>
    	);
    }
});

export default Service;