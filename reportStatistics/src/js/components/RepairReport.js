/**
 * Created by Administrator on 2016/10/13 0013.
 */
import React from 'react';
import $ from "jquery";
import DatePicker from 'react-mobile-datepicker';
import {QuantityStac,CoRanking} from './ReactEcharts'

var repair_datetime = new Date();
var initDatetime = new Date(new Date()-24*60*60*1000);
//module.exports = repair_datetime;
function dateZH(date) {
    return date.getFullYear() + "-"+ ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1)) + "-" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
}
const RepairReport = React.createClass({
    getInitialState() {
        return {
            //loadmodalState: false,
            allData:[],
            //rank:"1",
            isOpen: false,
            inputName:"",
            intiTime:"",
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
        //this.setState({rank:"3"})
    },
    componentDidUpdate(){
        var $echartsToggle = $(".repairReport .echartsToggle"),$echartsContainer = $(".repairReport .echartsContainer");
        $echartsToggle.unbind().bind("click", function () {
            $echartsContainer.stop().slideUp(300);
            $(this).next(".echartsContainer").stop().slideToggle(300);
        });
    },
    serverRequest (data){
        this.props.setLoadmodalState("true")
        $.ajax({
            url: "/lexiugo-app/weixin/getPushTaskReport",
            data:data,
            //contentType: "application/javascript",
            dataType: "json",
            //jsonp: "callback",
            //async:false,
            type: "POST",
            success: function(msg) {
                this.props.setLoadmodalState("false")
                if(msg.code=="0000"){

                    this.setState({allData:msg.pushTaskReport})
                    console.log(msg.pushTaskReport)
                    if((this.state.startDatetime == this.state.intiTime )&&( this.state.endDatetime  == this.state.intiTime)){
                        $(".yesterday").show()
                    }else {
                        $(".yesterday").hide()
                    }
                }
            }.bind(this),
            error:function(eee){
                this.props.setLoadmodalState("false")
            }.bind(this)
        });
    },
    componentDidMount(){
        var intiTime = dateZH(initDatetime);
        this.setState({startDatetime:intiTime,endDatetime:intiTime,intiTime:intiTime});
        var data = {
            startTime:intiTime,
            endTime:intiTime
        };
        console.log(data);
        this.serverRequest(data)
    },
    //componentWillUnmount(){
    //    this.serverRequest.abort()
    //},
    dataQuery(){
        var data = {
            startTime:this.state.startDatetime,
            endTime:this.state.endDatetime
        }
        console.log(data)
        this.serverRequest(data)
    },
    render(){
        var allData = this.state.allData;
        return(
            <section className="repairReport">
                <p>
                    合作修理厂 <span> {allData.hzXlcCount}</span>家
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
                            <div className="echartsToggle clearfix">
                                <div className="stacItem_left">
                                    <span className="amount StacIcon"></span>
                                    <div className="StacInfo">
                                        <span className="StacName">数量统计</span>
                                        <ul className="StacList clearfix">
                                            <li>推修</li>
                                            <li>接车</li>
                                            <li>估损</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="stacItem_right">
                                    <table >
                                        <tbody>
                                        <tr>
                                            <td><span className="yesterday">昨日</span>推修：</td>
                                            <td><em>{allData.txCountStr}</em>&nbsp;辆</td>
                                        </tr><tr>
                                            <td><span className="yesterday">昨日</span>接车：</td>
                                            <td><em>{allData.jcCountStr}</em>&nbsp;辆</td>
                                        </tr><tr>
                                            <td><span className="yesterday">昨日</span>估损：</td>
                                            <td><em>{allData.gsCountStr}</em>&nbsp;辆</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="echartsContainer EC5">
                              <QuantityStac data={allData} dw="1"></QuantityStac>
                            </div>
                        </li><li className="stacItem clearfix">
                        <div className="echartsToggle clearfix">
                        <div className="stacItem_left">
                                <span className="sum StacIcon"></span>
                                <div className="StacInfo">
                                    <span className="StacName">金额统计</span>
                                    <ul className="StacList clearfix">
                                        <li>推修</li>
                                        <li>接车</li>
                                        <li>估损</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="stacItem_right">
                                <table >
                                    <tbody>
                                    <tr>
                                        <td><span className="yesterday">昨日</span>推修金额：</td>
                                        <td><em>{allData.txMoneyStr}</em>&nbsp;元</td>
                                    </tr><tr>
                                        <td><span className="yesterday">昨日</span>接车金额：</td>
                                        <td><em>{allData.jcMoneyStr}</em>&nbsp;元</td>
                                    </tr><tr>
                                        <td><span className="yesterday">昨日</span>估损金额：</td>
                                        <td><em>{allData.gsMoneyStr}</em>&nbsp;元</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        <div className="echartsContainer EC5">
                            <QuantityStac data={allData} dw="2"></QuantityStac>

                        </div>
                        </li><li className="stacItem clearfix">
                        <div className="echartsToggle clearfix">
                        <div className="stacItem_left">
                                <span className="hzcspm StacIcon"></span>
                                <div className="StacInfo">
                                    <span className="StacName">合作车商排名</span>
                                    <ul className="StacList clearfix">
                                        <li>金额</li>
                                        <li>数量</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="stacItem_right stacItem_tr" >
                                <table >
                                    <tbody>
                                    <tr>
                                        <td><span className="yesterday">昨日</span>接车：</td>
                                        <td><em>{allData.hzJcCountStr}</em>&nbsp;辆</td>
                                    </tr><tr>
                                        <td><span className="yesterday">昨日</span>接车金额：</td>
                                        <td><em>{allData.hzJcMoneyStr}</em>&nbsp;元</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        <div className="echartsContainer">
                            <CoRanking data={allData} dw="hz"></CoRanking>
                        </div>
                        </li><li className="stacItem clearfix">
                        <div className="echartsToggle clearfix">
                        <div className="stacItem_left">
                                <span className="fhzcspm StacIcon"></span>
                                <div className="StacInfo">
                                    <span className="StacName">非合作车商排名</span>
                                    <ul className="StacList clearfix">
                                        <li>金额</li>
                                        <li>数量</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="stacItem_right stacItem_tr" >
                                <table >
                                    <tbody>
                                    <tr>
                                        <td><span className="yesterday">昨日</span>接车：</td>
                                        <td><em>{allData.fhzJcCountStr}</em>&nbsp;辆</td>
                                    </tr><tr>
                                        <td><span className="yesterday">昨日</span>接车金额：</td>
                                        <td><em>{allData.fhzJcMoneyStr}</em>&nbsp;元</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        <div className="echartsContainer">
                            <CoRanking data={allData} dw="fhz"></CoRanking>
                        </div>
                        </li>
                    </ul>
                </div>

            </section>
        )
    }
})



export default RepairReport
