/**
 * Created by 23174 on 2017/9/12.
 */
import React from 'react'
import $ from 'jquery'
import {IconFont, HeaderIf, IconFontt} from '../commonComponent/common'
import {TCarLists,HeaderList,DSYButton} from '../../../../common/assembly/someAssembly'
const Home = React.createClass({
    getInitialState(){
        return {
            mostModalState: false,
            menuState: false,
            // 数据条数
            liNum: "0",
            // 被点击的模块
            navActiveState: "0",
            // 四个模块的首页
            allPageNo: "1",
            // 数据加载中的模态框
            modalState: false,
            noRecivePageNo: "1",
            hasRecivePageNo: "1",
            hasFinishPageNo: "1",
            // 数据条数组
            taskList: []
        }
    },
    serverRequest (data){
        this.setState({modalState: true})
        console.log('开始查询');
        $.ajax({
            url: "/lexiugo-app/weixin/tmxYunying",
            data: data,
            dataType: "json",
            type: "post",
            success: function (msg) {
                console.log('查询结果', msg)
                if (msg.code == "0000") {
                    this.setState({modalState: false})
                    this.setState({allNum: msg.data.totalPushTask});
                    this.setState({noReciveNum: msg.data.noPushTask});
                    this.setState({hasReciveNum: msg.data.alreadyPushTask});
                    this.setState({hasFinishNum: msg.data.completedPushTask});
                    this.setState({taskList: msg.taskList});
                    this.setState({liNum: this.state.taskList.length});
                }
            }.bind(this),
            error: function (eee) {
                this.setState({modalState: false});
                console.log(eee)
            }.bind(this)
        });
    },
    componentDidMount(){
        this.props.project.changeTitle('案件列表')

        window.addEventListener('scroll', this.handleScroll.bind(this));
        // document.body.addEventListener('touchmove', function(e){e.preventDefault()}, false);
        console.log('pingmu', window.screen.height, document.body.clientHeight)
        // document.getElementById('appWrapper').style.height = window.screen.height + 'px'
        let dd
        // console.log(localStorage.setItem('homePage','2'))
        console.log(localStorage.getItem('homePage'))
        if (localStorage.getItem('homePage') == null || localStorage.getItem('homePage') == 'undefined') {
            dd = '0'
        } else {
            dd = localStorage.getItem('homePage')
        }
        this.setState({navActiveState: dd})
        console.log('dd', dd)
        const d = {
            taskState: dd,
            pageNo: "1"
        }
        this.serverRequest(d);
        let time1 = null
        let ttime = 0
        clearInterval(time1)
        this.setState({timex: 0})
        time1 = setInterval(function () {
            ttime += 30
            $('#littleBlock2').css({'transform': 'rotatez(' + (-ttime) + 'deg)'});
        }.bind(this), 150)
    },
    // 模态框设置不显示
    modalStateChange(){
        this.setState({mostModalState: false})
    },
    AllNum(){
        this.setState({navActiveState: "0"});
        const d = {
            taskState: "0",
            pageNo: "1"
        }
        this.serverRequest(d);
    },
    NoReciveNum(){
        this.setState({navActiveState: "1"});
        const d = {
            taskState: "1",
            pageNo: "1"
        }
        this.serverRequest(d);
    },
    HasReciveNum(){
        this.setState({navActiveState: "2"});
        const d = {
            taskState: "2",
            pageNo: "1"
        }
        this.serverRequest(d);
    },
    HasFinishNum(){
        this.setState({navActiveState: "3"});
        const d = {
            taskState: "3",
            pageNo: "1"
        }
        this.serverRequest(d);
    },
    // 左上角menu是否显示
    MenuShow(){
        this.state.menuState ? this.setState({menuState: false}) : this.setState({menuState: true})
    },
    // 查询页面
    toQuery(){
        this.props.history.replaceState(null, "/query")
    },
    // 重新登陆
    toLogin(){
        var openId = $("#openid").val()
        //alert(openId);
        $.ajax({
            url: "/lexiugo-app/logout",
            data: {
                openId: openId
            },
            dataType: "json",
            type: "post",
            success: function (msg) {
                if (msg.flag == "0") {
                    localStorage.setItem("password", '');
                    this.props.history.replaceState(null, "/login")
                } else if (msg.flag == "1") {
                    alert("退出失败")
                }
            }.bind(this)
        })
    },
    // 加载更多
    loadMore(){
        this.setState({lookMore: false})
        this.setState({liNum: 0})  // 隐藏加载更多
        var a = this.state.navActiveState
        if (a == "0") {
            var pageN = this.state.allPageNo, mostNumber = this.state.allNum;
        } else if (a == "1") {
            var pageN = this.state.noRecivePageNo, mostNumber = this.state.noReciveNum;
        } else if (a == "2") {
            var pageN = this.state.hasRecivePageNo, mostNumber = this.state.hasReciveNum;
        } else if (a == "3") {
            var pageN = this.state.hasFinishPageNo, mostNumber = this.state.hasFinishNum;
        }
        var d = {
            taskState: this.state.navActiveState,
            pageNo: parseFloat(pageN) + 1
        }
        if (this.state.taskList.length < mostNumber) {
            this.setState({modalState: true});

            console.log('开始查询');
            $.ajax({
                url: "/lexiugo-app/weixin/tmxYunying",
                data: d,
                dataType: "JSON",
                type: "post",
                success: function (msg) {
                    console.log(msg);
                    if (msg.code == "0000") {
                        this.setState({modalState: false});
                        var taskListCon = this.state.taskList;
                        //console.log(msg.taskList)
                        $.merge(taskListCon, msg.taskList);
                        this.setState({taskList: taskListCon});
                        this.setState({liNum: this.state.taskList.length});
                        if (a == "0") {
                            pageN++
                            this.setState({allPageNo: pageN});
                        } else if (a == "1") {
                            pageN++
                            this.setState({noRecivePageNo: pageN});
                        } else if (a == "2") {
                            pageN++
                            this.setState({hasRecivePageNo: pageN});
                        } else if (a == "3") {
                            pageN++
                            this.setState({hasFinishPageNo: pageN});
                        }
                    }
                }.bind(this),
                error: function (eee) {
                    this.setState({modalState: false});
                    console.log(eee)
                }
            });
        } else {
            this.setState({mostModalState: true})
        }

    },
    historygo(){
        // history.go(-1)
        this.props.history.replaceState(null, 'login')
    },
    RouteAndData(m, e){
        console.log('state', this.state.navActiveState)
        localStorage.setItem('homePage', this.state.navActiveState)
        console.log('homePage', localStorage.getItem('homePage'))
        this.props.history.pushState(m, "/detail/caseInfo");
    },
    tStart(e){
        this.setState({
            yStart: e.touches[0].pageY,
            yMore: document.getElementById('appWrapper').scrollTop,
            scrolY:document.body.scrollTop|| document.documentElement.scrollTop,
            yHeight: document.getElementsByClassName('appRouter')[0].offsetHeight
        })
        // this.setState({yMore: document.getElementById('appWrapper').scrollTop})
        // $('#littleBlock2').css({'transform': 'rotatez(' + (roteDeg) + 'deg)'});
    },
    tMove(e){
        console.log('1', document.body.offsetHeight)
        console.log('2', window.screen.height, document.documentElement.clientHeight)
        // let uu=document.body.scrollTop
        // setTimeout(function () {
        //     alert(uu)
        // }, 2000)
        console.log('3', document.body.scrollTop|| document.documentElement.scrollTop)
        if ((document.body.scrollTop|| document.documentElement.scrollTop)== document.body.offsetHeight - document.documentElement.clientHeight) {
             this.setState({lookMore: true})
            console.log('执行！')
        }
        if ((e.touches[0].pageY-this.state.yStart-this.state.scrolY)>-2) {
            console.log('22')
            // document.getElementsByClassName('homeListSmall')[0].style.height = e.touches[0].pageY-this.state.yStart-this.state.scrolY + 'px';
            e.preventDefault()
        }
    },
    // tMove(e){
    //     console.log('body',document.documentElement.scrollTop)
    //     if ((this.state.yStart - e.touches[0].pageY + this.state.yMore) - (this.state.yHeight - document.body.clientHeight)>0) {
    //     console.log('uu',e.touches[0].pageY)
    //     // if ((this.state.yStart - e.touches[0].pageY)>0) {
    //
    //         this.setState({lookMore: true})
    //         // document.getElementsByClassName('Rcontainer')[0].style.top=document.getElementsByClassName('Rcontainer')[0].offsetHeight-document.body.offsetHeight-(this.state.yStart-e.touches[0].pageY+this.state.yMore)
    //     }
    //     console.log(this.state.yMore)
    //     console.log(this.state.yHeight)
    //     // if ((this.state.yStart - e.touches[0].pageY + this.state.yMore) < 0) {
    //     //     // console.log('触发了')
    //     //     // let h2 = document.getElementsByClassName('homeListSmall')[0]
    //     //     // let h3 = e.touches[0].pageY - this.state.yStart
    //     //     console.log('22')
    //     //     document.getElementsByClassName('homeListSmall')[0].style.height = e.touches[0].pageY - this.state.yStart + 'px';
    //     //     e.preventDefault()
    //     // }
    //
    //     // console.log('差值', this.state.yStart - e.touches[0].pageY + this.state.yMore)
    // },
    tEnd(e){
        if ((document.body.scrollTop|| document.documentElement.scrollTop) - document.body.offsetHeight + document.documentElement.clientHeight>=0) {
            if(this.state.lookMore){
                this.loadMore()
                this.setState({lookMore: false})
            }

        }
        if (document.getElementsByClassName('homeListSmall')[0].offsetHeight != 0) {
            document.getElementsByClassName('homeListSmall')[0].style.height = 0
        }
    },
    // tEnd(e){
    //     if (this.state.lookMore) {
    //         this.loadMore()
    //         this.setState({lookMore: false})
    //     }
    //     // if (document.getElementsByClassName('homeListSmall')[0].offsetHeight != 0) {
    //     //     document.getElementsByClassName('homeListSmall')[0].style.height = 0
    //     // }
    // },
    handleScroll(e){
        console.log('监听到了')
        let scrollTop=document.body.scrollTop|| document.documentElement.scrollTop
        if(scrollTop<9){
            // e.preventDefault()
            // alert('333')
            // scrollTop=5
        }else if(scrollTop==document.body.offsetHeight - document.documentElement.clientHeight){
            this.loadMore()
        }
    }
    ,
    render(){
        return (
        <div className="Record Rcontainer" id="Rcontainer">
            <HeaderList actions='YY' {...this.props} data={this.state.headerData || {}} parents={this}/>
            <TCarLists actions="YY" {...this.props} T={this} />
            <DSYButton {...this.props} T={this} on={1} ButtonFrom="YY"/>
        </div>
        )
    }
})
export default Home