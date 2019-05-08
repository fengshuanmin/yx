/**
 * Created by Administrator on 2016/10/13 0013.
 */
import React from 'react';
import $ from "jquery";
import DatePicker from 'react-mobile-datepicker';
import {ProportionPie} from './ReactEcharts'

var repair_datetime = new Date();
var initDatetime = new Date(new Date()-24*60*60*1000)
function dateZH(date) {
    return date.getFullYear() + "-"+ ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1)) + "-" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
}
const RepairStraight = React.createClass({
    getInitialState() {
        return {
			loadmodalState: false,
            allData:[],
            isOpen: false,
            inputName:"",
            startDatetime:"",
            endDatetime:""
        }
    },
    handleCancel () {
        this.setState({ isOpen: false });
    },
    handleClick (datetimeName) {
        this.setState({ isOpen: true });
        this.setState({ inputName: datetimeName });
    },
    handleSelect (date) {
        repair_datetime = date;
        this.state.inputName=="startDatetime"?this.setState({startDatetime:dateZH(date)}):this.setState({endDatetime:dateZH(date)})
        this.setState({isOpen: false });
    },
    componentDidMount(){
        var intiTime = dateZH(initDatetime);
        this.setState({startDatetime:intiTime,endDatetime:intiTime});
		var data = {
			startTime:intiTime,
			endTime:intiTime
		}
		this.serverRequest(data)
	},
	componentDidUpdate(){
		var $echartsToggles = $(".repairStraight .echartsToggles"),$echartsContainers = $(".repairStraight .echartsContainers");
		$echartsToggles.unbind().bind("click", function () {
			$echartsContainers.stop().slideUp(300);
			$(this).next(".echartsContainers").stop().slideToggle(300);
		})
	},
	serverRequest (data){
		this.props.setLoadmodalState("true");
		$.ajax({
			url: "/lexiugo-app/weixin/getSupplyReport",
			data:data,
			//contentType: "application/javascript",
			dataType: "json",
			//async:false,
			//jsonp: "callback",
			type: "POST",
			success: function(msg) {
				this.props.setLoadmodalState("false");
				if(msg.code=="0000"){
					//console.log(msg.supplyAllDate)
				this.setState({allData:msg.supplyAllDate})
				}
			}.bind(this),
			error:function(eee){
				this.props.setLoadmodalState("false")
			}.bind(this)
		});

	},
	//componentWillUnmount(){
	//	this.serverRequest.abort()
	//},
	dataQuery(){
		var data = {
			startTime:this.state.startDatetime,
			endTime:this.state.endDatetime
		}
		console.log(data);
		this.serverRequest(data)
	},
    render(){
		const allData = this.state.allData;
        return(
            <section className="repairStraight">
				<p>
				</p>
                <div className="queryContainer">
                    <input className="form-input startDatetime" onFocus ={this.handleClick.bind(this,"startDatetime")} readOnly name="pushOrUpDate" autoComplete="off" value={this.state.startDatetime}  type="text" />
                    <span className="zhi">至</span>
                    <input className="form-input endDatetime" onFocus ={this.handleClick.bind(this,"endDatetime")} readOnly name="pushOrUpDate" autoComplete="off" value={this.state.endDatetime} type="text" />
                    <button className="publicBtn" onClick={this.dataQuery}>查询</button>
                    <DatePicker
                        value={repair_datetime}
                        isOpen={this.state.isOpen}
                        onSelect={this.handleSelect}
                        theme="ios"
                        dateFormat={ ['YYYY', 'MM', 'DD']}
                        onCancel={this.handleCancel} />
                </div>
                <div className="listContainer">
                    <ul>
                        <li className="stacItem ">
                            <div className="echartsToggles clearfix">
                                <div className="stacItem_left">
                                    <span className="ajtjfxspm StacIcon"></span>
                                    <div className="StacInfo">
                                        <span className="StacName">直供案件统计分析</span>
                                        <ul className="StacList clearfix">
                                            <li>完成</li>
                                            <li>未完成</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="stacItem_right">
                                    <table className="table_straight">
                                        <tbody>
                                        <tr>
                                            <td><em>{allData.launchCase}</em>笔</td>
                                        </tr><tr>
                                            <td>直供案件总量</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="echartsContainers">
								<ProportionPie dat={this.state.allData} dw="1"/>
                            </div>
                        </li>
                        <li className="stacItem clearfix">
	                        <div className="echartsToggles clearfix">
	                        	<div className="stacItem_left">
	                                <span className="pjtjfxspm StacIcon"></span>
	                                <div className="StacInfo">
	                                    <span className="StacName">直供配件统计分析</span>
	                                    <ul className="StacList clearfix">
	                                        <li>完成</li>
	                                        <li>未完成</li>
	                                    </ul>
	                                </div>
	                            </div>
	                            <div className="stacItem_right">
	                                <table className="table_straight">
	                                    <tbody>
	                                    <tr>
	                                        <td><em>{allData.launchPart}</em>件</td>
	                                    </tr><tr>
	                                        <td>直供配件总量</td>
	                                    </tr>
	                                    </tbody>
	                                </table>
	                            </div>
	                        </div>
	                        <div className="echartsContainers">
								<ProportionPie dat={this.state.allData} dw="2"/>
							</div>
                        </li>
                        <li className="stacItem clearfix">
	                        <div className="echartsToggles clearfix">
	                        	<div className="stacItem_left">
	                                <span className="fqajzbspm StacIcon"></span>
	                                <div className="StacInfo">
	                                    <span className="StacName">直供发起案件占比</span>
	                                    <ul className="StacList clearfix">
	                                        <li>直供</li>
	                                        <li>非直供</li>
	                                    </ul>
	                                </div>
	                            </div>
	                            <div className="stacItem_right" >
	                                <table className="table_straight">
	                                    <tbody>
	                                    <tr>
	                                        <td>直供案件：</td>
	                                        <td><em>{allData.launchCase}</em>笔</td>
	                                    </tr><tr>
	                                        <td>非直供案件：</td>
	                                        <td><em>{allData.unLaunchCase}</em>笔</td>
	                                    </tr>
	                                    </tbody>
	                                </table>
	                            </div>
	                        </div>
	                        <div className="echartsContainers">
								<ProportionPie dat={this.state.allData} dw="3"/>

							</div>
                        </li>
                        <li className="stacItem clearfix">
	                        <div className="echartsToggles clearfix">
	                        	<div className="stacItem_left">
	                                <span className="fqajzbspm StacIcon"></span>
	                                <div className="StacInfo">
	                                    <span className="StacName">直供完成配件品质占比</span>
	                                    <ul className="StacList clearfix">
	                                        <li>品质件</li>
	                                        <li>原厂件</li>
	                                        <li>适用件</li>
	                                    </ul>
	                                </div>
	                            </div>
	                            <div className="stacItem_right" >
	                                <table className="table_straight">
	                                    <tbody>
	                                    <tr>
	                                        <td><em>{allData.completePart}</em>件</td>
	                                    </tr><tr>
	                                        <td>直供完成配件总量</td>
	                                    </tr>
	                                    </tbody>
	                                </table>
	                            </div>
	                        </div>
	                        <div className="echartsContainers">
								<ProportionPie dat={this.state.allData} dw="4"/>

							</div>
                        </li>
                        <li className="stacItem clearfix">
	                        <div className="echartsToggles clearfix">
                                <span className="StacName">直供完成金额</span>
                                <span className="span_right"><em>{allData.completePrice}</em>元</span>
	                        </div>
	                    </li>
	                    <li className="stacItem clearfix">
	                        <div className="echartsToggles clearfix">
                                <span className="StacName">直供减损金额</span>
                                <span className="span_right"><em>{allData.reducePrice}</em>元</span>
	                        </div>
	                    </li>
                    </ul>
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
            </section>
        )
    }
})



export default RepairStraight
