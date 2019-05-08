/**
 * Created by Administrator on 2016/7/23 0023.
 * APP查勘详情
 */
import React from 'react';
import $ from 'jquery';
import {IconFont,HeaderIf} from '../commonComponent/common'
const Receive_details = React.createClass({
	receiveDatailClick(){
		var detailsData = this.props.location.state;
		this.props.history.replaceState(detailsData, '/receive_detail')
	},
    render() {
		console.log(this.props.location.state)
    	var data = this.props.location.state;
    	var cname = data.send_car_person;
		if(cname == "" || cname == null){
			  cname = data.customername;
		}
		var zzbh = data.zzbh;
		var comname = data.inscompanyname;
    	return (
    		 <div className="item_details_single" style={{margin:'0rem',padding:'0rem'}}>
				 {/*<div className="detailBox">
					 <span>s</span>
		    	  <div className="headerInfo">
					  <IconFont name="&#xe609;" onClick={this.receiveDatailClick}/>
				  		<HeaderIf numBer="" name="接车信息"></HeaderIf>
				  </div>
				 </div>*/}
				 <div className="headerMin">报案信息</div>
  		  	  	  <div className="detailsDiv">
  		  	  		    <div className="detailsDiv2">保险公司：
  		  	  		    	<span className="rightSpan">{comname}</span>
  		  	  		    </div>
	    		  	    {/*<div className="detailsDiv2">报案号：
	    		  	    	<span className="rightSpan">{data.reportno}</span>
	    		  	    </div>*/}
		    		    <div className="detailsDiv2">推修时间：
		    		    	<span className="rightSpan">{data.createTimeString}</span>
		    		    </div>
		    		    <div className="detailsDiv2">金额状态：
		    		    	<span className="rightSpan">{data.repair_Money_State == "0" ? "预估状态" : "最终状态"}</span>
		    		    </div>
		    		    <div className="detailsDiv2">维修金额：
		    		    	<span className="rightSpan">{data.repair_Moneny}</span>
		    		    </div>
		    		  	<div className="detailsDiv2">推修类型：
		    		  		<span className="rightSpan">{data.push_TYPE=="0" ? "送修" : "返修"}</span>
		    		  	</div>
					  <div className="detailsDiv2">备注：
						  <span className="rightSpan" style={{textAlign:'left'}}>{data.pushDesc}</span>
					  </div>
  		  	      </div>
				 <div className="headerMin">车辆信息</div>
  		  	      <div className="detailsDiv">
			  	  		<div className="detailsDiv2">车牌号码：
			  	  			<span className="rightSpan">{data.plateno}</span>
			  	  		</div>
			  	  		<div className="detailsDiv2">车辆品牌：
			  	  			<span className="rightSpan">{data.ppmc}</span>
			  	  		</div>
				  	  	<div className="detailsDiv2">客户姓名：
				  	  		<span className="rightSpan">{cname}</span>
				  	  	</div>
		    		  	<div className="detailsDiv2">联系方式：
		    		  		<span className="rightSpan">{data.telephone}</span>
		    		  	</div>
  		  	      </div>
				 <div className="headerMin">定损员信息</div>
				 <div className="detailsDiv">
					 <div className="detailsDiv2">定损员：
						 <span className="rightSpan">{data.lossby}</span>
					 </div>
					 <div className="detailsDiv2">联系号码：
						 <span className="rightSpan">{data.lossbyphone}</span>
					 </div>
				 </div>
  		   </div>
    	);
    }
});


export default Receive_details;