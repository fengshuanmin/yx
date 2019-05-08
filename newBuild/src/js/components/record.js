/**
 * Created by Administrator on 2016/9/13.
 */
import React from 'react';
import $ from "jquery";
import {TCarLists,HeaderList,JFHTML,DSYButton} from '../../../../common/assembly/someAssembly';
import ChangeTitle from '../../../../common/baseFun/someEvent'

const Record = React.createClass({
    getInitialState() {
        return{
            menuState:false,
            navActiveState:"0",
            allNum:'0',
            noReciveNum:'0',
            hasReciveNum:'0',
            hasFinishNum:'0',
            liNum:"0",
            modalState:false,
            mostModalState:false,
            allPageNo:"1",
            noRecivePageNo:"1",
            hasRecivePageNo:"1",
            hasFinishPageNo:"1",
            taskList:[],
        }
    },
    toNewBuild(){
        this.props.history.pushState(null, "/caseInfo");
    },
    caseInfo(){
        if(this.props.news){
            this.props.setProps({
                news:false
            })
        }
        if(this.props.xlcmap){
            this.props.setProps({
                xlcmap:false
            })
        }
        this.props.history.pushState(null, "/newcaseInfo");
    },
    close(){
        console.log('123')
        this.props.setProps({
            adver:false
        })
        this.setState({
            adver:0
        })
    },
    urllink(){
        console.log(this.state.locationUrl)
        window.location.href = this.state.locationUrl
        // this.props.history.pushState({locationUrl:this.state.locationUrl}, "/adver");
    },
    toLogin(){
        var openId = $("#openid").val()
        // alert(openId);
        $.ajax({
            url: "/lexiugo-app/logout",
            data: {
                openId: openId
            },
            dataType: "json",
            type: "post",
            success: function (msg) {
                if (msg.flag =="0"){
                    localStorage.setItem("password", '');
                    this.props.history.replaceState(null, "/login")
                }else if(msg.flag =="1"){
                    alert("退出失败")
                }
            }.bind(this)
        })
    },
    toQuery(){
        this.props.history.replaceState(null, "/query");
    },
    MenuShow(){
        this.state.menuState?this.setState({menuState:false}):this.setState({menuState:true})
    },
    AllNum(){
        this.setState({navActiveState:"0"});
        const d = {
            taskState:"0",
            pageNo:"1"
        }
        this.serverRequest(d);
    },
    NoReciveNum(){
        this.setState({navActiveState:"1"});
        const d = {
            taskState:"1",
            pageNo:"1"
        }
        this.serverRequest(d);
    },
    HasReciveNum(){
        this.setState({navActiveState:"2"});
        const d = {
            taskState:"2",
            pageNo:"1"
        }
        this.serverRequest(d);
    },
    HasFinishNum(){
        this.setState({navActiveState:"3"});
        const d = {
            taskState:"3",
            pageNo:"1"
        }
        this.serverRequest(d);
    },
    loadMore(){
        var a = this.state.navActiveState
        if(a=="0"){
            var pageN= this.state.allPageNo,mostNumber=this.state.allNum;
        }else if(a=="1"){
            var pageN= this.state.noRecivePageNo,mostNumber=this.state.noReciveNum;
        }else if(a=="2"){
            var pageN= this.state.hasRecivePageNo,mostNumber=this.state.hasReciveNum;
        }else if(a=="3"){
            var pageN= this.state.hasFinishPageNo,mostNumber=this.state.hasFinishNum;
        }
        var d = {
            taskState:this.state.navActiveState,
            pageNo:parseFloat(pageN)+1
        }
        if(this.state.taskList.length<mostNumber){
            this.setState({modalState:true});
            console.log('开始查询');
            $.ajax({
                url: "/lexiugo-app/weixin/getPushTaskList",
                data:d,
                dataType: "JSON",
                type: "post",
                success: function(msg) {
                    console.log(msg);
                    if (msg.code=="0000"){
                        this.setState({modalState:false});
                        var taskListCon = this.state.taskList;
                        //console.log(msg.taskList)
                        $.merge(taskListCon,msg.taskList);
                        this.setState({taskList:taskListCon});
                        this.setState({liNum:this.state.taskList.length});
                        if(a=="0"){
                            pageN++
                            this.setState({allPageNo:pageN});
                        }else if(a=="1"){
                            pageN++
                            this.setState({noRecivePageNo:pageN});
                        }else if(a=="2"){
                            pageN++
                            this.setState({hasRecivePageNo:pageN});
                        }else if(a=="3"){
                            pageN++
                            this.setState({hasFinishPageNo:pageN});
                        }
                    }
                }.bind(this),
                error:function(eee){
                    this.setState({modalState:false});
                    console.log(eee)
                }
            });
        }else{
            this.setState({mostModalState:true})
        }

    },
    modalStateChange(){
        this.setState({mostModalState:false})
    },
    linkurl(){
        this.setState({
            adver:'0'
        })
        console.log(this.state)
        this.props.history.pushState({locationUrl:this.state.locationUrl,locationTitle:this.state.locationTitle},'/inquiry/windurl')
    },
    serverRequest (data){
        this.setState({modalState:true})
        console.log('开始查询');
        $.ajax({
            url: "/lexiugo-app/weixin/getPushTaskList?jj=ee",
            data:data,
            dataType: "json",
            type: "post",
            success: function(msg) {
                console.log('查询结果',msg)
                if (msg.code=="0000"){
                    this.setState({modalState:false})
                    this.setState({allNum:msg.data.totalPushTask});
                    this.setState({noReciveNum:msg.data.noPushTask});
                    this.setState({hasReciveNum:msg.data.alreadyPushTask});
                    this.setState({hasFinishNum:msg.data.completedPushTask});
                    this.setState({taskList:msg.taskList});
                    this.setState({liNum:this.state.taskList.length});
                    var headerData={
                        allNum:msg.data.totalPushTask,
                        noReciveNum:msg.data.noPushTask,
                        hasReciveNum:msg.data.alreadyPushTask,
                        hasFinishNum:msg.data.completedPushTask,
                        checkPushTask:msg.data.checkPushTask,
                        liNum:this.state.taskList.length
                    }
                    this.setState({headerData:headerData});
                }
            }.bind(this),
            error:function(eee){
                this.setState({modalState:false});
                console.log(eee)
            }.bind(this)
        });
    },
    checkDetail(){
        const  data = {

        }
        this_.props.history.replaceState(null, "/query");
    },
    componentDidUpdate(){
        /* const taskList=this.state.taskList,$recordListLi= $(".recordList li"),this_=this;
         $recordListLi.bind("click",function(){
             var  dd=taskList[$(this).index()]["prePathname"]="/record"
             this_.props.history.replaceState(taskList[$(this).index()], "/details");
         })*/
    },
    RouteAndData(m,e){
        this.props.history.replaceState(m, "/details");
    },
    componentDidMount(){
        if(this.props.xlcmap){
            this.props.setProps({
                xlcmap:false
            })
        }
        console.log(this.props)
        ChangeTitle.ChangeTitle('推修列表');
        if(this.props.adver&&this.props.adver=='1'){
            this.props.ajax({
                url:'/server/lexiu3-app/business/tmxcadvertinfo/applist',
                data:{showType:'2',showPoint:'1',showRoleType:'1',showChannel:'3'},
                suc:(data)=>{
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
                    console.log(data)
                }
            })
        }
        window.addEventListener('scroll', this.handleScroll);
        this.setState({formData:{taskState:"0", pageNo:1},ok:true},()=>{
            setTimeout(()=>{
                this.setState({ok:false})
            })
        });
        var JF =this.props.project.user && this.props.project.user.data && this.props.project.user.data.JsonIntegral &&this.props.project.user.data.JsonIntegral.integral;
        this.setState({JFHTML:JF},()=>{
            setTimeout(()=>{
                this.setState({classe:'goudow'})
            },300)

        })
    },
    onTop(){
        console.log(this.children);
        return;
        var newformData=this.state.formData;
        newformData.pageNo=0;
        this.setState({formData:newformData},()=>{
            newformData.pageNo=1;
            this.setState({
                ok:true,
                formData:newformData
            },()=>{
                setTimeout(()=>{
                    this.setState({ok:false})
                },300)
            })
        })
    },
    onBottom(){
        var newformData=this.state.formData;
        newformData.pageNo=this.state.formData.pageNo*1+1;
        this.setState({
            ok:true,
            formData:newformData
        },()=>{
            setTimeout(()=>{
                this.setState({ok:false})
            },300)
        })
    },
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        var newFormData=this.state.formData;
        newFormData.pageNo=1
        this.setState({formData:newFormData,ok:true})
        var jmtb=this.props.user
        jmtb.data.JsonIntegral=''
        this.props.setProps({user:jmtb})
        this.setState({JFHTML:''})
    },
    handleScroll(){
        /*console.log(document.body.offsetHeight+document.body.scrollTop,document.body.scrollHeight)
        alert(document.body.offsetHeight+document.body.scrollTop,document.body.scrollHeight)*/
        if($(window).height()+document.body.scrollTop==document.body.scrollHeight && !this.state.ok){
            var newformData=this.state.formData;
            newformData.pageNo=this.state.formData.pageNo*1+1;
            this.setState({
                ok:true,
                formData:newformData
            },()=>{
                setTimeout(()=>{
                    this.setState({ok:false})
                },300)
            })
            console.log(document.body.offsetHeight,document.body.scrollHeight,document.body.scrollTop)
        }

    },
    PushCar(e){
        this.props.history.pushState(null, "/caseInfo");
    },
    render(){
        // var TXCLStyle={
        //     padding:'0.7rem',
        //     width:'0px',height:'0px',
        //     position:'fixed',
        //     right:'0rem',
        //     bottom:'0.3rem',
        //     background:'url('+require('../../img/PushCar.png')+')',
        //     backgroundSize:'100% 100%',
        //     border:'0px',
        //     borderRadius:'100%'
        // }
        console.log(this.state)
        return (
            <div className="Record Rcontainer">
                <HeaderList {...this.props} data={this.state.headerData || {}} parents={this}/>
                <TCarLists data={{formData:this.state.formData || {},parents:this}} T={this} {...this.props}/>
                {/*<button className="TXCLStyle" style={TXCLStyle} onClick={this.PushCar}></button>*/}
                {/*<DSYButton ButtonFrom="DSYs" T={this} on={1} {...this.props}/>*/}
                <button className="addXBJ" onClick={this.caseInfo}></button>
                {/*{zw.length>1?<DSYButton ButtonFrom="DSYs" T={this} on={'caseInfo'} {...this.props}/>:zw[0]=='DSY'?<DSYButton ButtonFrom="DSYs" T={this} on={'caseInfo'} {...this.props}/>:''}*/}
                <DSYButton ButtonFrom="DSYs" T={this} on={'caseInfo'} {...this.props}/>
                {this.state.JFHTML && <JFHTML classe={this.state.classe} integral={this.state.JFHTML}/>}
                <div className={this.state.adver&&this.state.adver==1 ? "partsBuyShow basicStyle1" : "partsBuyHide basicStyle1"}>
                    <div className="adverdiv">
                        {this.state.locationUrl? <span onClick={this.linkurl} style={{cursor:'pointer'}}>
                            <img className="adverimg" src={this.state.ulr} alt=""/>
                        </span>:<span>
                            <img className="adverimg" src={this.state.ulr} alt=""/>
                        </span>}
                       {/* <a href={this.state.locationUrl}>
                            <img className="adverimg" src={this.state.ulr} alt=""/>
                        </a>*/}
                    </div>
                    <div style={{width:'100%',textAlign:'center'}}>
                    <span className="adverdelt" onClick={this.close}>

                    </span>
                    </div>
                </div>
            </div>
        )
    }
})
//
//    <div id="actionSheet_wrap" style={this.state.menuState?{display:"block"}:{display:"none"}}>
//<div className="weui_mask_transition"></div>
//    <div className="weui_actionsheet">
//    <div className="weui_actionsheet_menu">
//    <div className="weui_actionsheet_cell">精确查询</div>
//    <div className="weui_actionsheet_cell" onClick={this.toLogin}>重新登录</div>
//</div>
//<div className="weui_actionsheet_action">
//    <div className="weui_actionsheet_cell" id="actionsheet_cancel">取消</div>
//    </div>
//    </div>
//    </div>
//
//
//    <div id="actionSheet_wrap">
//    <div class="weui_mask_transition" id="mask"></div>
//    <div className="weui_actionsheet_menu">
//    <div className="weui_actionsheet_cell"></div>
//    <div className="weui_actionsheet_cell" onClick={this.toLogin}></div>
//</div>
//<div className="weui_actionsheet_action">
//    <div className="weui_actionsheet_cell" id="actionsheet_cancel">取消</div>
//    </div>
//    </div>
//const RecordQuery = React.createClass({
//
//    render(){
//        return(
//            <div>jignqi</div>
//        )
//    }
//})
export default Record
