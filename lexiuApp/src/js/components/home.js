/**
 * Created by Administrator on 2016/7/23 0023.
 * 首页
 */
import React from 'react';
import $ from 'jquery';
import {IconFont,HeaderIf,IconFontt} from '../commonComponent/common'
import cookie from '../commonComponent/cookieJs'
import ReactEcharts from 'echarts-for-react'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, Link, IndexRoute, IndexLink, Redirect  } from 'react-router'
import {XLCFooter,DSYButton} from '../../../../common/assembly/someAssembly'
import {CarLists} from '../common/Stateless'
const Home = React.createClass({
    getInitialState(){
        return {
            data: [],
            showMe:false
        }
    },
    serverR (redata){
        this.serverRequest = $.ajax({
            url: "/lexiugo-app/weixin/StatisticsCarController.do",
            data: redata,
            //contentType: "application/javascript",
            dataType: "json",
            //jsonp: "callback",
            //jsonpCallback: "suc",
            type: "post",
            success: function (msg) {
                this.setState({data: msg.data})
            }.bind(this)
        });
    },
    componentWillMount() {
        var data = {
        	sendType: "0001",	
        }
        this.serverR(data);
    },
    componentWillUnmount: function () {
        this.serverRequest.abort();
    },
    componentDidMount(){
        this.props.project.changeTitle('首页')
        if(this.props.adver&&this.props.adver=='1'){
            this.props.ajax({
                url:'/server/lexiu3-app/business/tmxcadvertinfo/applist',
                data:{showType:'2',showPoint:'1',showRoleType:'0',showChannel:'3'},
                suc:(data)=>{
                    if(data.tmxcAdvertInfoList.length>0){
                        if(data.tmxcAdvertInfoList.length>0){
                            this.props.setProps({
                                adver:'0'
                            })
                            this.setState({
                                adver:1,
                                ulr:data.tmxcAdvertInfoList[0].adPic,
                                locationUrl:data.tmxcAdvertInfoList[0].locationUrl,
                                locationTitle:data.tmxcAdvertInfoList[0].locationTitle
                            })
                        }
                    }
                    console.log(data)
                }
            })
        }
    },
    changes(){
        this.props.history.pushState(null, "/ChangePosword")
    },
    closeadver(){
        console.log('123')
        this.props.setProps({
            adver:false
        })
        this.setState({
            adver:0
        })
    },
    linkurl(){
        console.log('123')
        this.setState({
            adver:'0'
        })
        console.log(this.state)
        this.props.history.pushState({locationUrl:this.state.locationUrl,locationTitle:this.state.locationTitle},'/windurl')
        // this.props.history.pushState({locationUrl:this.state.locationUrl}, "/adver");
    },
    showMe(){
        if(this.state.showMe){
            this.setState({showMe:false});
            $('.libal').slideUp();
        }else{
            this.setState({showMe:true});
            $('.libal').slideDown();
        }
    },
    toLogin(){
        var wxOpenId = $("#openid").val()
        //alert(wxOpenId)
        $.ajax({
            url: "/lexiugo-app/logout",
            data: {
                openId: wxOpenId
            },
            dataType: "json",
            type: "post",
            success: function (msg) {
                if (msg.flag =="0"){
                    var data = JSON.parse(localStorage.getItem(this.props.project.getQuery()))
                    data.password=''
                    localStorage.setItem(this.props.project.getQuery(), JSON.stringify(data));
                    this.props.history.replaceState(null, "/login")
                }else if(msg.flag =="1"){
                    alert("退出失败")
                }
            }.bind(this)
        })

    },
    render() {
        console.log(this.props.user.data)
        console.log(this.state.data)
        return (
            <div className="item_container">
                {/*<div className="headerInfo">
                    <IconFontt name="&#xe606;" showMe={this.showMe} changes={this.changes} onClick={this.toLogin}/>
                    <HeaderIf name="首页" numBer=""></HeaderIf>
                </div>*/}
                <ReceiveNum data={this.state.data}/>
                <DynamicChartComponent da={this.state.data}/>
                {/*<XLCFooter/>*/}
                <DSYButton  ButtonFrom="XLC" T={this} on={1}/>
                <div className={this.state.adver&&this.state.adver==1 ? "partsBuyShow basicStyle1" : "partsBuyHide basicStyle1"}>
                    <div className="adverdiv">
                        {this.state.locationUrl? <span onClick={this.linkurl} style={{cursor:'pointer'}}>
                            <img className="adverimg" src={this.state.ulr} alt=""/>
                        </span>:<span>
                            <img className="adverimg" src={this.state.ulr} alt=""/>
                        </span>}
                    </div>
                    <div style={{width:'100%',textAlign:'center'}}>
                    <span className="adverdelt" onClick={this.closeadver}>

                    </span>
                    </div>
                </div>
            </div>
        );
    }
});

class ReceiveNum extends  React.Component {

    toDecimal2(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return false;
        }
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    }
    render() {
        console.log(this.props.data)
        return (
            <div className="receNum clearfix">
                <div>
                    <span>未接车（辆）</span>
                    <span className="fontBig">{this.props.data ? this.props.data.unAcceptTaskTotal : "重新登录"}</span>
                </div>
                <div>
                    <div>
                        <span>已接车（辆）</span>
                        <span className="jiacu">{this.props.data.acceptTaskTotal}</span>
                    </div>
                    <div>
                        <span>价值（元）</span>
                        <span className="jiacu">{this.toDecimal2(this.props.data.repairMonenyToatal) }</span>
                    </div>
                </div>
            </div>
        )
    }
}

const DynamicChartComponent = React.createClass({
    getInitialState() {
        return {option: this.getOption()};
    },
    prosReceive(){
        let option = this.state.option;
        let chartXY = this.props.da.chartList;
        if (!chartXY == []) {
            console.log(chartXY);
            for (var i = 0; i < 7; i++) {
                option.xAxis.data[i] = chartXY[i].acceptTaskDate;
                option.series[0].data[i] = chartXY[i].acceptTaskNum
            }
            clearInterval(this.timeTicket)
            this.setState({option: option});
        }

    },
    componentWillMount() {
        this.timeTicket = setInterval(this.prosReceive, 100);
    },
    getOption() {
        let option = {
            title: {
                text: '近七日数据',
                textStyle: {
                    fontSize: 14,
                    color: '#242424'
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['接车数量'],

            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['', '', '', '', '', '', ''],
                axisLabel: {
                    interval: 0,
                    rotate: 50,

                }
            },
            yAxis: {
                type: 'value',
            },
            grid: {
                x: "50",
                y: "50",
                x2: "30",
                y2: "70"
            },
            series: [
                {
                    name: '接车数量',
                    type: 'line',
                    stack: '总量',
                    data: ["", "", "", "", "", "", ""],
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                color: "#019cdc"
                            }
                        }
                    }
                }

            ]
        };

        return option;
    },
    render() {
        let RechStyle = {
            height: "100%",
            width: "100%",
            margin: " .6rem auto"
        }
        return (
            <div className="reactEc">
                <ReactEcharts ref='echarts_react' option={this.state.option} style={RechStyle}/>
            </div>
        );
    }
})
function iOSFuc() {
    alert("调用成功")
}

export default Home;
