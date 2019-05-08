/**
 * Created by Administrator on 2016/7/23 0023.
 * APP查勘详情
 */
import React from 'react';
import $ from 'jquery';
import {IconFont,HeaderIf} from '../commonComponent/common'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, Link, IndexRoute, IndexLink, Redirect  } from 'react-router'
import cookie from '../commonComponent/cookieJs'
import weixinpic from '../weixnphoto/weixinpic'

const Check_image = React.createClass({
	//返回查勘
	datailClick(){
		var detailsData = this.props.location.state.idata;
		this.props.history.replaceState(detailsData, "/check_detail")
	},
	//重新拍照
	remakeImage(){
		var n = this.props.location.state.ty;
		var detailsData = this.props.location.state.idata;
		var typ = weixinpic.ntoType(n);
		var serviceList1 = weixinpic.getsessionOrcookie(detailsData.id,typ);
		var data = {
			taskid : detailsData.id,
			ty : n,
		}
		weixinpic.photoImage(data);
		var choicet
		choicet = setInterval(function(){
			var serviceList2 = weixinpic.getsessionOrcookie(detailsData.id,typ);
			if(serviceList1.length != serviceList2.length){
				clearInterval(choicet);
				this.deleteImage();
			}
		}.bind(this),500);
	},
	//显示隐藏 搜索框
	cheClick(){
		$("#imageTitle").slideToggle();
		$("#btnGroups").slideToggle();
	},
	//删除照片
	deleteImage(){
		var localid = this.props.location.state.localid;
		var detailsData = this.props.location.state.idata;
		weixinpic.delsessionOrcookie(detailsData.id,localid);
		this.props.history.replaceState(detailsData, "/check_detail")
	},
    render() {
		var data = this.props.location.state;
		console.log(data)
    	return (
    		<div className="item_image_single">
    			  <div className="imageTitle" id="imageTitle">
		    		  <div className="imageInfo">
			    		  	<IconFont name="&#xe609;" onClick={this.datailClick}/>
							<HeaderIf numBer="" name="查勘拍照"></HeaderIf>
					  </div>
				  </div>
				  <span onClick={this.cheClick} className="imageClick"><img className="imagePreview" src={data.localid} /></span>
				  <div className="btnGroups" id="btnGroups">
		 		  	  	<button type="button" className="blueBtn" onClick={this.remakeImage}>重拍</button>
		 		  	  	<button type="button" className="deflBtn" onClick={this.deleteImage}>删除</button>
		 		  </div>
  		    </div>
    	);
    }
});


export default Check_image;