import React from 'react'
import $ from "jquery";
import { Link ,IndexLink} from 'react-router'
import {IconFont} from '../../lexiuApp/src/js/commonComponent/common'
require('../css/assembly/someAssembly.css');
/*@查询推修列表
* props：params={
*   data:{},
*   type:'DSY'||'YYGL'
* }
* return [elementList]
* */
/*定损员列表
* actions==YY表示运营
* */
export var TCarLists = React.createClass({
    getInitialState() {
        return {
            formData:{}
        }
    },
    onStart(){
        this.refs.loadMore.style.transition='0ms'
        this.refs.Reload.style.transition='0ms'
        this.refs.recordBox.style.transition='0ms'
        this.setState({
            nowTop:this.refs.recordBox.offsetTop*1
        })
    },
    onBottom(a,b){
        this.refs.recordBox.style.position='relative'
        a<0 && (this.refs.recordBox.style.top=(a*1+this.state.nowTop)+'px')
        this.refs.loadMore.style.display='inline-block'
        this.refs.loadMore.style.bottom=-(a*1+this.state.nowTop)-(this.refs.loadMore.offsetHeight+20)+'px'
        this.setState({moveType:'onBottom'})
    },
    onTop(a,b){
        this.refs.recordBox.style.position='relative'
        a>0 && (this.refs.recordBox.style.top=(a*1+this.state.nowTop)+'px');
        this.refs.Reload.style.display='inline-block'
        this.refs.Reload.style.top=(a*1+this.state.nowTop-this.refs.Reload.offsetHeight-50)+'px'
        this.setState({moveType:'onTop'})
    },
    onEnd(){
        this.refs.loadMore.style.transition='top 100ms'
        this.refs.Reload.style.transition='top 100ms'
        this.refs.recordBox.style.transition='top 100ms'
        this.state.moveType=='onTop' && this.Reload();
        this.state.moveType=='onBottom' && this.loadMore();
    },
    Reload(){
        this.refs.Reload.style.top=20+'px'
        this.refs.recordBox.style.top=this.refs.Reload.offsetHeight+40+'px';
        var oldFormData=this.props.project.formData;
        oldFormData.pageNo=1
        this.props.project.setProps({
            formData:oldFormData
        },()=>{
            this.ajaxLoad();
            this.setState({moveType:''})
        })
    },
    loadMore(){
        this.refs.loadMore.style.bottom=(20)+'px'
        this.refs.recordBox.style.top=-this.refs.loadMore.offsetHeight-40+'px';
        var oldFormData=this.props.project.formData;
        oldFormData.pageNo=this.state.formData.pageNo+1
        this.props.project.setProps({
            formData:oldFormData
        },()=>{
            this.setState({moveType:''})
        })
    },
    loadOver(ab){
        this.refs.loadMore.style.transition='top 900ms'
        this.refs.Reload.style.transition='opacity 900ms'
        this.refs.recordBox.style.transition='top 900ms'
        this.refs.loadMore.style.display='none'
        this.refs.Reload.style.display='none'
        this.refs.recordBox.style.top=0+'px';
        if(ab==0){
            this.refs.myDX.style.display='block';
            this.refs.myDX.style.padding='0.3rem';
            setTimeout(()=>{
                this.refs.myDX.style.display='none';
            },3000)
        }
    },
    componentDidMount(){},
    componentWillMount(){
        var newFormData
        if(this.props.project.formData){
            newFormData=this.props.project.formData
            newFormData.pageNo=1
        }else{
            newFormData={
                taskState:"0",
                pageNo:1
            }
        }
        this.props.setProps({
            onBottom:false,
            onTop:false,
            onStart:false,
            onEnd:false,
            onMove:false
        },()=> {
            this.props.project.setProps({
                onBottom: this.onBottom,
                onTop: this.onTop,
                onStart: this.onStart,
                onEnd: this.onEnd,
                formData: newFormData
            }, () => {
                if (this.props.project.formData.pageNo == 0) {
                    this.setState({formData: this.props.project.formData});
                    return;
                }
                if (this.state.formData.taskState == this.props.project.formData.taskState) {
                    return;
                } else {
                    var oldFormData = {
                        pageNo: this.props.project.formData.pageNo,
                        taskState: this.props.project.formData.taskState
                    }
                    this.setState({formData: oldFormData}, () => {
                        this.ajaxLoad();
                    })
                }
            })
        })

    },
    componentDidUpdate(){
        if(this.props.project.formData){
            //归位滚动位置
            if(this.props.project.formData.pageNo==1 && this.state.formData.taskState != this.props.project.formData.taskState){
                this.props.project.setScroll(0);
            }
            if(this.state.formData.taskState == this.props.project.formData.taskState && this.state.formData.pageNo == this.props.project.formData.pageNo){
                return;
            }else{
                var oldFormData={pageNo:this.props.project.formData.pageNo,taskState:this.props.project.formData.taskState}
                this.setState({formData:oldFormData},()=>{
                    this.ajaxLoad();
                })
            }
        }
    },
    componentWillUnmount(){
        this.props.setProps({
                onBottom:false,
                onTop:false,
                onStart:false,
                onEnd:false,
        })
    },
    ajaxLoad(){
        $.ajax({
            url: this.props.actions=='YY' ? "/lexiugo-app/weixin/tmxYunying":"/lexiugo-app/weixin/getPushTaskList?jj=ee",
            data:this.state.formData,//pageNo
            dataType: "json",
            type: "post",
            success: (msg)=>{
                if (msg.code=="0000"){
                    var headerData={
                        allNum:msg.data.totalPushTask,
                        noReciveNum:msg.data.noPushTask,
                        hasReciveNum:msg.data.alreadyPushTask,
                        hasFinishNum:msg.data.completedPushTask,
                        checkPushTask:msg.data.checkPushTask
                    },htmlList={
                        taskList:msg.taskList
                    }
                    //this.props.data.father.setState({headerData:formData});
                    var oldFormData={pageNo:this.props.project.formData.pageNo,taskState:this.props.project.formData.taskState}
                    this.setState({formData:oldFormData},()=>{
                        this.props.project.setProps({headerData:headerData});
                        var add=false;
                        if(this.props.project.formData.pageNo >1){
                            add=this.props.project.formData.pageNo;
                            this.loadOver(msg.taskList.length);
                            this.forEachHtmlList(msg.taskList,add);
                        }else{
                            this.setState({htmlList:[]},()=>{
                                this.loadOver(msg.taskList.length);
                                this.forEachHtmlList(msg.taskList,add);
                            })
                        }

                    });
                }
            },
            error:function(eee){
                this.setState({modalState:false});
            }.bind(this)
        });
    },
    forEachHtmlList(list,add){
        var htmlList=[];
        if(add){
            var htmlList=this.state.htmlList;
        }
        for(var i in list){
            list[i].lossState*1==1 ?  list[i].taskState="待审核" : ''
            list[i].cxmc=list[i].carLongName || list[i].cxmc || ''
            var item=list[i];
            htmlList.push(
                <li key={i+'444'+add} onClick={this.toDetails.bind(this,item)}>
                    <table border="0" className="deTable">
                        <tbody>
                        <tr>
                            <td><span>{item.xlcShotName}</span></td>
                            <td colSpan="1" rowSpan="2" className="labelIcon"
                                style={item.taskState == '未接收' ? {backgroundColor: '#fb6064'} : (item.taskState == '已接车' ? {backgroundColor: '#ffbd49'} : (item.taskState == '已完成' ? {backgroundColor: '#1fc391'} :(item.taskState == '待审核' ? {backgroundColor: 'rgb(125, 119, 39)'} : {backgroundColor: 'rgb(177,178,180)'})))}>
                                <div style={{textAlign: 'center'}}>
                                    <svg aria-hidden="true" className="icon"
                                         style={{color: 'white', fontSize: '.4rem'}}>
                                        <use
                                            xlinkHref={item.taskState == '未接收' ? '#icon-zhongbiao' : (item.taskState == '已接车' ? '#icon-iconfontshezhichilun' : (item.taskState == '已完成' ? '#icon-duihao' : (item.taskState == '待审核' ? '#icon-shenhe' : '#icon-delete')))}></use>
                                    </svg>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>车主：<span>{item.sendCarPerson}</span></td>
                        </tr>
                        <tr>
                            <td>车牌：<span>{item.plateNo}</span></td>
                        </tr>
                        <tr>
                            <td colSpan="3" style={{display: 'inline-block', verticalAlign: 'top'}}>车型：<span style={{
                                display: 'inline-block',
                                width: '4.4rem',
                                verticalAlign: 'top'
                            }}>{item.cxmc == '' ? '未填写' : item.cxmc}</span></td>
                        </tr>
                        <tr>
                            <td colSpan="3"
                                style={{textAlign: "right", fontSize: ".25rem",color:'#999'}}>{item.createdTime}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </li>
            )
        }
        this.setState({htmlList:htmlList,isNotHave:true})
    },
    toDetails(m,e){
        this.props.history.pushState(m, "/detail/caseInfo");
    },
    render(){
        return (
            <div className="recordBox" style={{position:'relative'}} >
                <span className="Reload" ref="Reload"></span>
                <ul className="recordList" ref="recordBox">
                    {(!this.state.htmlList || !this.state.htmlList[0]) && this.state.isNotHave && <div className="noDatas"></div>}
                    {this.state.htmlList}
                </ul>
                {/*<p ref="myDX" style={{textAlign:'center',display:'none'}}>您已触及我的底线</p>*/}
                <span className="loadMore" ref="loadMore"></span>
            </div>
        )
    }
})


/**列表下拉加载**/




/*保险公司状态按钮列*/
export var HeaderList=React.createClass({
    getInitialState() {
        return {
            navActiveState:this.props.project.navActiveState || '0'
        }
    },
    componentDidMount(){
        const headerTab = this.refs.headerTab;
        headerTab.style.height=headerTab.firstChild.clientHeight+'px';
        headerTab.firstChild.style.position='fixed';
        headerTab.firstChild.style.background='#f5f5f5'
        headerTab.firstChild.style.zIndex='1000'
        headerTab.firstChild.style.top='0px'
    },
    componentDidUpdate(){

    },
    queryList(e){
        var index = e.currentTarget.getAttribute('data-index')
        var data={
            taskState:index,
            pageNo:1
        };
        this.props.project.setProps({formData:data,navActiveState:index});
    },
    alerts(){alert()},
    render(){
        var data;
        if(this.props.project){
            data=this.props.project.headerData || {}
        }else{
            data={}
        }
        const navActiveStyle = {
            boxShadow: "0px 2px 1px #1e7be3",
            backgroundColor: "white",
            // borderBottom: '2px solid #1e7be3'
        }
        const navActiveStyle1 = {
            boxShadow: "0px 2px 1px #fb6064",
            backgroundColor: "white",
            // borderBottom: '2px solid #fb6064'
        }
        const navActiveStyle2 = {
            boxShadow: "0px 2px 1px #ffbd49",
            backgroundColor: "white",
            // borderBottom: '2px solid #ffbd49'
        }
        const navActiveStyle3 = {
            boxShadow: "0px 2px 1px #1fc391",
            backgroundColor: "white",
            // borderBottom: '2px solid #1fc391'
        }
        const navActiveStyle4 = {
            boxShadow: "0px 2px 1px rgb(125, 119, 39)",
            backgroundColor: "white",
            // borderBottom: '2px solid #1fc391'
        }
        return (
            <div ref="headerTab" className="headerTab">
                <ul className="recordNav clearfix">
                    <li style={this.props.project.navActiveState == "0" || !this.props.project.navActiveState ? navActiveStyle : {}} data-index='0' onClick={this.queryList}>
                        <p className="allNum">{data.allNum}</p>
                        <p>全部</p>
                    </li>
                    <li style={this.props.project.navActiveState == "1" ? navActiveStyle1 : {}} data-index='1' onClick={this.queryList}>
                        <p className="noReciveNum">{data.noReciveNum}</p>
                        <p>未接车</p>
                    </li>
                    {/*删除已接车*/}
                    <li style={this.props.project.navActiveState == "2" ? navActiveStyle2 : {}} data-index='2' onClick={this.queryList}>
                        <p className="hasReciveNum">{data.hasReciveNum}</p>
                        <p>已接车</p>
                    </li>
                    { this.props.actions !='YY' &&
                    <li style={this.props.project.navActiveState == "4" ? navActiveStyle4 : {}} data-index='4' onClick={this.queryList}>
                        <p className="hasReciveNum" style={{color:'#52d1e4'}}>{data.checkPushTask}</p>
                        <p>待审核</p>
                    </li>
                    }
                    {/*<li style={this.state.navActiveState == "4" ? navActiveStyle4 : {width:'18%',marginRight:'2%'}} data-index='4' onClick={this.queryList}>
                        <p className="hasReciveNum" style={{color:'rgb(125, 119, 39)'}}>{data.checkPushTask}</p>
                        <p>维修中</p>
                    </li>*/}
                    <li style={this.props.project.navActiveState == "3" ? navActiveStyle3 : {}} data-index='3' onClick={this.queryList}>
                        <p className="hasFinishNum">{data.hasFinishNum}</p>
                        <p>已完成</p>
                    </li>
                </ul>
            </div>
        )
    }
})
export var XLCFooter=(props)=>{
    const LinkActiveStyle = {
        color: "#029cdc"
    }
    return(
        <ul className="appMenu clearfix">
            <li><IndexLink to="/login" ></IndexLink></li>
            <li><Link to="/home" activeStyle={LinkActiveStyle}><IconFont name="&#xe600;"/> 首页</Link></li>
            <li><Link to="/receive" activeStyle={LinkActiveStyle}><IconFont name="&#xe601;"/> 接车</Link></li>

            <li><Link to="/check" activeStyle={LinkActiveStyle}><IconFont name="&#xe603;"/> 查勘</Link></li>
            <li><Link to="/service" activeStyle={LinkActiveStyle}><IconFont name="&#xe602;"/> 维修</Link></li>
        </ul>
    )
}
export var CKYButton=React.createClass({
    getInitialState() {
        return {
        }
    },
    componentDidMount(){
        this.props.T.setState({updataPM:this.updataPM})
    },
    componentWillUnmount(){
        this.props.T.setState({updataPM:false})
    },
    updataPM(fun){
        var itid,partManage,partFct,evalTotalSum=0;
        var dataarr={itid:'',partManage:'',partFct:'',evalTotalSum:0,taskId:this.props.location.state.taskId};
        var listParts=this.props.detThis.state.listParts;
        for(var i in listParts){
            if(listParts[i].maxFL && (parseFloat(listParts[i].manageFeePct*100) > listParts[i].maxFL || parseInt(listParts[i].manageFeePct*100) < listParts[i].minFL) && listParts[i].priceFlag==1){
                this.props.project.setProps(
                    {PromptData:{content:'费率必须在'+listParts[i].minFL+'%-'+listParts[i].maxFL+'%', Prompt:true,onlyOK:true,fun:()=>{
                        listParts[i].target.focus();
                        this.props.project.setProps(
                            {PromptData:{}})
                    }}})
                return
            }

            dataarr.itid+='itid='+listParts[i].systemCompCode+ (i<listParts.length-1 ? ',':'')
            dataarr.partManage+='partManage='+(listParts[i].manageFeePct*(listParts[i].lossPrice || listParts[i].jmPrice)*listParts[i].partNum || '0')+(i<listParts.length-1 ? ',':'')
            dataarr.partFct+='partFct='+(listParts[i].manageFeePct *100 || 0)+(i<listParts.length-1 ? ',':'')
            dataarr.evalTotalSum+=(parseFloat(listParts[i].manageFeePct || 0)+1)*
                (listParts[i].jmPrice || listParts[i].lossPrice)*listParts[i].partNum
        }
        dataarr.evalTotalSum=this.props.detThis.state.zongJia
        $.ajax({
            url:'/toumingxiu/evaluation/updatePartManage.do',
            data: dataarr,
            dataType: "JSON",
            type: "post",
            success: (msg)=>{
                console.log(msg)
                fun && fun();
                !fun && this.props.project.setProps({PromptData:{}})
            }
        })
    },
    lookPic(e){
        console.log(this.props.location)
        this.props.promptInfo({
            content:'点击确定查看简图，长按图片可保存',
            Prompt:true,
            fun:()=>{
                this.props.ajax({
                    url:'/toumingxiu/quote/appDownloadPicture.do',
                    data:{taskId:this.props.location.state.taskId},
                    dataType:'text',
                    suc:(dat)=>{
                        console.log(dat,'图片图片')
                        typeof dat == 'string' && (dat=dat.replace('www.toumingxiuche.cn',window.location.host));
                        console.log(dat)
                        wx.previewImage({
                            current:dat+'?mat='+(Math.random()*10000),
                            urls:[dat+'?mat='+(Math.random()*10000)]
                        });
                    }
                })
                this.props.promptInfo()
            }
        })
    },
    goLookIt(e){
        if(this.props.location.state.ggDsyId !=this.props.user.data.LxAqYhxxb.id){
            this.lookPic();
            return;
        }
        this.updataPM(this.lookPic)
        //this.props.data.parents.props.history.pushState(this.props.location.state.taskId, '/quote')
    },
    Reject(){
        var props=this.props.project;
        var fun = (e,close)=>{
            $.post('/toumingxiu/ccic/appInsAddMessage.do',{
                taskId:this.props.location.state.taskId,lossby:props.user.data.LxAqYhxxb.id
            },(data)=>{
                data*1==0 ? data='返回成功' : data='服务器异常';
                this.props.promptInfo({content:data,Prompt:true,onlyOK:true,fun:()=>{
                    this.props.history.replaceState(null,'/record');
                    this.props.promptInfo()
                }})
            })
        }
        this.props.project.setProps({PromptData:{content:'确定要返回到修理厂吗',Prompt:true,fun:fun}})
    },
    AgreeRepair(){
        var props=this.props.project;
        var fun = (e,close)=>{
            this.updataPM(()=>{
            $.post('/toumingxiu/repairFactory/editMaintenanceCar.do',{
                taskId:this.props.location.state.taskId,yhid:props.user.data.LxAqYhxxb.id
            },(dat)=>{
                dat=parseInt(dat)
                var arr=['该车已转入待出厂状态','该车已确认维修','该车转入待出厂状态失败！','已同意维修'],data;
                dat != 1 && dat !=0  && dat !=2 && dat !=3 && dat !=4? dat=2 :data=dat;
                //this.props.project.setProps({PromptData:{content:arr[data],Prompt:this.props.project.index}})
                if(data == 1){
                    close();
                    // console.log(this.props.detThis.state.dataState)
                    if(this.props.detThis.state.dataState.code=='0006'){
                        this.props.history.replaceState(this.props.location.state,"recovery/addRecovery")
                    }else{
                        this.props.history.replaceState(null,"/record")
                    }
                }else{
                    this.props.project.setProps({PromptData:{content:arr[data],Prompt:this.props.project.index}})
                }
            })
            })
        }
        this.props.project.setProps({PromptData:{content:'您确定要同意维修吗？',Prompt:true,fun:fun}})
    },
    render(){
        console.log((this.props.location.state.ggDsyId , (this.props.user.data.LxAqYhxxb.zw).indexOf('GG')), this.props.user.data.LxAqZz.zzTyp)
        return (
<div>
    {
        (this.props.location.state.lossState*1 == 1 || this.props.location.state.lossState*1 == 2) ?
        <div className="CKYButton">
            <button onClick={this.goLookIt}>查看估损单</button>
            {
                this.props.location.state.ggDsyId==this.props.user.data.LxAqYhxxb.id &&

                <button onClick={this.Reject}>退回修理厂</button>
            }
            {
                (this.props.location.state.ggDsyId== this.props.user.data.LxAqYhxxb.id) &&

                <button onClick={this.AgreeRepair}>同意维修</button>
            }
        </div> :
            ''
    }
    {(this.props.location.state.lossState*1 >2 && this.props.location.state.taskState !='修理厂放弃') &&
    <div className="CKYButton">
        <button className="onlyMe" onClick={this.goLookIt}>查看估损单</button>
    </div>
    }
</div>

        )
    }
})
/****
 this.props.project.setProps({PromptData:{content:'',Prompt:this.props.project.index,fun:fun}});调用
 Prompt:当前组件实例，一般在app中
 content:显示内容
 fun:点击确认调用方法，不设置则没有确认取消按钮，确认将执行关闭方法
 this.props.project.setProps({PromptData:{}})关闭方法
 ****/
export var Prompt=React.createClass({
    getInitialState() {return {}},
    close(){this.props.T.setState({PromptData:{}})},
    Close(){
        if(this.props.data.refuse){
            this.props.data.refuse(this,()=>{
                this.props.T.setState({PromptData:{}})
            })
        }else{
            this.props.T.setState({
                PromptData:{}
            })
        }
    },
    ImTrue(){
        if(this.props.data.fun || this.props.data.onlyOK){
            this.props.data.fun ? this.props.data.fun(this,()=>{
                this.props.T.setState({PromptData:{}})
            }) : this.props.T.state.promptInfo()
        }else{
            this.props.T.setState({
                PromptData:{}
            })
        }
    },
    render(){
        return (
            <div className="Prompt">
                {/*提示窗口，带fun有取消不带确定就是取消*/}
                {this.props.data.Prompt &&
                    <div className="PromptModality">
                        <div className="PromBody">
                            <p className="Promheader">提示</p>
                            <p className="Promcontent">{this.props.data.content}</p>
                            <div className="PromButton">
                                {((this.props.data.fun && !this.props.data.onlyOK) ||this.props.data.refuse) && <button onClick={this.Close}>取消</button>}
                                <button onClick={this.ImTrue}>确定</button>
                            </div>
                        </div>
                    </div>
                }
                {/*loading*/}
                {this.props.data.loading &&
                <div className="PromptModality" style={{background:'rgba(0,0,0,0.0)'}}>
                    <div style={{margin:'auto'}}>
                        <img className="loadings" style={{width:'0.8rem',height:'0.8rem'}} src={require('../../newBuild/src/img/loadings.png')} alt=""/>
                    </div>
                </div>
                }
            </div>
        )
    }
})
/****
 ****/
export var PublicHeader=React.createClass({
    getInitialState() {return {}},

    render(){
        return(

            <div className="PublicHeader">
                <div className="zhiZhen">
                    <span>刷新</span>
                    <span></span>
                    <span>导航</span>
                </div>
                <div className="daoHang">
                    <span>注销登录</span>
                    <span>修改密码</span>
                </div>
            </div>
        )
    }
})

/*积分++*/
export const JFHTML = (props)=>{
    return (
        <span className={"JFHTML " +props.classe}><span>{'积分+'+props.integral}</span></span>
    )
}

/*车主端我的维修单*/
export const MaintenanceRecord =(props)=>{
    return(
        <div className="MaintenanceRecord">
            {
                props.data.map((item,i)=>{
                    return (
                        <div className="order" key={i}>
                            {item.cooperateSource  == 'lechebang'
                                ?<h4 className="leCheStyle"><span></span>
                                    <span onClick={()=>{props.history.pushState(item, "/leCheHelp")}}></span>
                                </h4>
                                :<h4><span>{item.xlcName}</span></h4>}
                            <ul className="recordUl">
                                <li><span>维修进度:</span><span>{item.stateStr}</span></li>
                                <li><span>送修时间:</span><span>{item.pushtime}</span></li>
                            </ul>
                            <div className="buttonStyle">
                                {item.taskState==6 &&<input onClick={props.T.toPing.bind(null,item)} type="button" value="发表评价"/>}
                                {/* <input type="button" onClick={()=>{this.props.history.replaceState(null, "/leCheHelp")}} value="选择推修" />*/}
                                {item.cooperateSource  != 'lechebang' && <input type="button"  value="查看详情" onClick={props.T.toDetails.bind(null,item)}/>}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

/**公司积分**/
export class Scoreboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount(){
        setTimeout(()=>{
            for(var i=0;i<$('.JTitem').length;i++){
                var _$ = $(".lanpangzi"+i)
                var parent1 = _$.parent().width();
                var parent2 = _$.parent().parent().width();
                if(parent2-parent1<=_$.width()){
                    _$.css({bottom:'100%',left:'inherit',right:'0px'})
                }
            }
        },300)

    }
    render() {
        var props=this.props
        return (
            <div className="Scoreboard">
                {
                    props.data.map((item,i)=>{
                        return(
                            <div className="ScoreList" key={i}>
                                <span className={i<=3 && ('img'+i)}>{i>=3 && i+1}</span>
                                <div>
                                    <p>{item.orgName}</p>
                                    <div>
                                        <i style={{width:item.totalIntegral/props.data[0].totalIntegral*100+'%'}}>
                                           <span className={'JTitem lanpangzi'+i}>{item.totalIntegral+'分'}</span>
                                        </i>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

/*积分列表*/
export const Scoreboards =(props)=>{
    return(
        <div className="Scoreboard">
            {
                props.data.map((item,i)=>{
                   return(
                       <div className="ScoreList" key={i}>
                           <span className={i<=3 && ('img'+i)}>{i>=3 && i}</span>
                           <div>
                               <p>{item.orgName}</p>
                               <div>
                                   <i style={{width:item.totalIntegral/props.data[0].totalIntegral*100+'%'}}>
                                       <span className={(()=>{
                                           return props.fun(item.totalIntegral/props.data[0].totalIntegral*100,i)
                                       })()}>{item.totalIntegral+'分'}</span>
                                   </i>
                               </div>
                           </div>
                       </div>
                   )
                })
            }
        </div>
    )
}
/*定损员积分列表*/
export const DSJSList =(props)=>{
    return (
        <div className="DSJSList">
            {props.type=='DS' ? <DSTop {...props}/> :<JSTop {...props}/>}
            {
                props.data.map((item,i)=>{
                    if(i<3)return;
                    return(
                        <JFLIst item={item} key={i} i={i}/>
                    )
                })
            }
            {props.myJF && <div className="myJfList"><JFLIst {...props}/></div>}
        </div>
    )
}
export const JFLIst =(props)=>{
    var item=props.item || props.myJF;
    return (
        <div className="PtList" key={item.rankIndex}>
            <span>{item.rankIndex}</span>
            <img src={item.headImgUrl || require("../../newBuild/src/img/morentouxiang.jpg")} alt="头像"/>
            <span>{item.userName}</span>
            <span>{(item.totalMoney || item.totalIntegral)+ (item.totalMoney ? ' 元' :'分')}</span>
            <i className={item.rankChange}>↓</i>
        </div>
    )
}
/*定损员头部*/
export const DSTop =(props)=>{
    var data=[];
    data[0]=props.data[1]
    data[1]=props.data[0]
    data[2]=props.data[2]
    return (
        <div className="DSTop">
            <div className="DSTopBox">
            {data.map((item,i)=>{
                if(i>=3)return;
                return (
                    <div className="listBox" key={i}>
                        <div className="JSList" >
                            <div className="dSImg">
                                <span></span>
                                <img src={item.headImgUrl || require("../../newBuild/src/img/morentouxiang.jpg")} alt=""/>
                            </div>
                            <p>{item.userName}</p>
                            <span>{(item.totalMoney || item.totalIntegral)+ (item.totalMoney ? '元' :'分')}</span>
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}
/*减损头部*/
export const JSTop =(props)=>{
    var data=[];
    data[0]=props.data[1]
    data[1]=props.data[0]
    data[2]=props.data[2]
    return (
        <div className="DSTop">
            <div className="JSTopBox">
                {data.map((item,i)=>{
                    if(i>=3)return;
                    return (
                        <div className="listBox" key={i}>
                            <div className="DSList" >
                                <div className="dSImg">
                                    <span></span>
                                    <img src={item.headImgUrl || require("../../newBuild/src/img/morentouxiang.jpg")} alt=""/>
                                </div>
                                <p>{item.userName}</p>
                                <span>{(item.totalMoney || item.totalIntegral)+ (item.totalMoney ? '元' :'分')}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

/*推修底部导航*/
export const DSYButton = (props)=>{
    var zw=localStorage.getItem('zw').split(',')
    console.log(zw)
    return (
        <div className="DSYButton">
            <ul>
                {/*前往首页*/}
                { props.ButtonFrom =='XLC' &&
                <li className={'iconfonts toRecord '+(props.on==1 && 'on')} onClick={()=>{props.T.props.history.pushState(null, "/record");}}></li>
                }
                { props.ButtonFrom =='myCar' &&
                <li className={'iconfonts toRecord '+(props.on==1 && 'on')} onClick={()=>{props.T.props.history.pushState(null, "/record");}}></li>
                }
                {/*{ props.ButtonFrom =='DSY' &&
                <li className={'iconfonts toRecord1 '+(props.on==1 && 'on')} onClick={()=>{props.T.props.history.pushState(null, "/record");}}></li>
                }*/}
                {/*<li className={'toRecord iconfonts '+(props.on==1 && 'on')} onClick={()=>{props.T.props.history.pushState(null, "/record");}}></li>*/}
                {/*发起推修 有点突出的*/}
                { props.ButtonFrom =='DSY' &&
                <li className="caseInfoes">
                    <span onClick={()=>{props.T.props.history.pushState(null, "/caseInfo");}}></span>
                </li>
                }
                {/*显示地图*/}
                {props.ButtonFrom == 'YY' && <li className={'map '+(props.on=='map' && 'on')} onClick={()=>{props.history.pushState({isYY:true}, "/xlcMap");}}></li>}
                {/* && (props.user.data.LxAqYhxxb.zw).indexOf('ATUTOEVAL')===0*/}
                {/*推修按钮*/}
                {zw.length>1&&props.ButtonFrom =='DSYs'?<li className={'caseInfo '+(props.on=='caseInfo' && 'on')} onClick={()=>{props.history.pushState(null, "/record");}}></li>:
                    zw[0]=='DSY'?<li className={'caseInfo '+(props.on=='caseInfo' && 'on')} onClick={()=>{props.history.pushState(null, "/record");}}></li>:''}
                {/*询价按钮*/}
                {zw.length>1&&props.ButtonFrom =='DSYs'?<li className={'inquiry '+(props.on=='inquiry' && 'on')} onClick={()=>{props.history.pushState(null, "/inquiry");}}></li>:
                    zw[0]=='ATUTOEVAL'?<li className={'inquiry '+(props.on=='inquiry' && 'on')} onClick={()=>{props.history.pushState(null, "/inquiry");}}></li>:''}
                {/*{props.ButtonFrom =='DSYs'  && <li className={'inquiry '+(props.on=='inquiry' && 'on')} onClick={()=>{props.history.pushState(null, "/inquiry");}}></li>}*/}
                {/*个人询价按钮*/}
                {props.ButtonFrom =='Mys'  && <li className={'inquiry '+(props.on=='inquiry' && 'on')} onClick={()=>{props.history.pushState(null, "/inquiry");}}></li>}
                {/*发起推修 不凸起*/}
                {/*{props.ButtonFrom =='DSYs' && <li className={'caseInfo '+(props.on=='caseInfo' && 'on')} onClick={()=>{props.history.pushState(null, "/caseInfo");}}></li>}*/}
                {/*残件按钮*/}
                {/*{props.ButtonFrom =='DSYs' && <li className={'iconfonts recovery '+(props.on=='recovery' && 'on')} onClick={()=>{props.history.pushState(null, "/recovery");}}></li>}*/}
                {/*维修按钮*/}
                { props.ButtonFrom =='XLC' &&
                <li className={'iconfonts toWXList '+(props.on==3 && 'on')} onClick={()=>{props.T.props.history.pushState(null, "/XList");}}></li>
                }
                {/*/!*采购按钮*!/*/}
                {/*{ props.ButtonFrom =='XLC' &&
                <li className={'iconfonts toPurchase '+(props.on==4 && 'on')} onClick={()=>{props.T.props.history.pushState(null, "/CList");}}></li>
                }*/}

                {/*订单按钮*/}
                {zw.length>1&&props.ButtonFrom =='DSYs'?<li className={'iconfonts purchase '+(props.on=='purchase' && 'on')} onClick={()=>{props.history.pushState(null, "/purchase");}}></li>:
                    zw[0]=='ATUTOEVAL'?<li className={'iconfonts purchase '+(props.on=='purchase' && 'on')} onClick={()=>{props.history.pushState(null, "/purchase");}}></li>:''}
                {/*{props.ButtonFrom =='DSYs' && <li className={'iconfonts purchase '+(props.on=='purchase' && 'on')} onClick={()=>{props.history.pushState(null, "/purchase");}}></li>}*/}
                {/*个人订单*/}
                {props.ButtonFrom =='Mys' && <li className={'iconfonts purchase '+(props.on=='purchase' && 'on')} onClick={()=>{props.history.pushState(null, "/purchase");}}></li>}
                {props.ButtonFrom =='Mys' && <li className={'iconfonts toHome '+(props.on=='home' && 'on')} onClick={()=>{props.history.pushState(null, "/Home");}}></li>}
                {/*个人中心按钮*/}
                {props.ButtonFrom =='DSYs' && <li className={'iconfonts toHome '+(props.on=='home' && 'on')}  onClick={()=>{props.T.props.history.pushState(null, "/Home");}}></li>}
                {props.ButtonFrom =='XLC' && <li className={'iconfonts toHome '+(props.on=='home' && 'on')}  onClick={()=>{props.T.props.history.pushState(null, "/Home");}}></li>}
            </ul>
        </div>
    )
}

/*export const DSYButton = (props)=>{
    var zw=localStorage.getItem('zw').split(',')
    return (
        <div className="DSYButton">
            <ul>
                {/!*前往首页*!/}
                { props.ButtonFrom =='XLC' &&
                <li className={'iconfonts toRecord '+(props.on==1 && 'on')} onClick={()=>{props.T.props.history.pushState(null, "/record");}}></li>
                }
                { props.ButtonFrom =='myCar' &&
                <li className={'iconfonts toRecord '+(props.on==1 && 'on')} onClick={()=>{props.T.props.history.pushState(null, "/record");}}></li>
                }
                {/!*{ props.ButtonFrom =='DSY' &&
                <li className={'iconfonts toRecord1 '+(props.on==1 && 'on')} onClick={()=>{props.T.props.history.pushState(null, "/record");}}></li>
                }*!/}
                {/!*<li className={'toRecord iconfonts '+(props.on==1 && 'on')} onClick={()=>{props.T.props.history.pushState(null, "/record");}}></li>*!/}
                {/!*发起推修 有点突出的*!/}
                { zw.length>1||(zw.length==1&&zw[0]=='DSY')&&props.ButtonFrom =='DSY' &&
                    <li className="caseInfoes">
                        <span onClick={()=>{props.T.props.history.pushState(null, "/caseInfo");}}></span>
                    </li>
                }
                {/!*显示地图*!/}
                {props.ButtonFrom == 'YY' && <li className={'map '+(props.on=='map' && 'on')} onClick={()=>{props.history.pushState({isYY:true}, "/xlcMap");}}></li>}
                {/!* && (props.user.data.LxAqYhxxb.zw).indexOf('ATUTOEVAL')===0*!/}
                {/!*询价按钮*!/}
                {zw.length>1||(zw.length==1&&zw[0]=='DSY')&& props.ButtonFrom =='DSYs'  && <li className={'caseInfo '+(props.on=='caseInfo' && 'on')} onClick={()=>{props.history.pushState(null, "/record");}}></li>}
                {zw.length>1||(zw.length==1&&zw[0]=='ATUTOEVAL')&& props.ButtonFrom =='DSYs'  && <li className={'inquiry '+(props.on=='inquiry' && 'on')} onClick={()=>{props.history.pushState(null, "/inquiry");}}></li>}
                {/!*个人询价按钮*!/}
                {props.ButtonFrom =='Mys'  && <li className={'inquiry '+(props.on=='inquiry' && 'on')} onClick={()=>{props.history.pushState(null, "/inquiry");}}></li>}
                {/!*发起推修 不凸起*!/}
                {/!*{props.ButtonFrom =='DSYs' && <li className={'caseInfo '+(props.on=='caseInfo' && 'on')} onClick={()=>{props.history.pushState(null, "/caseInfo");}}></li>}*!/}
                {/!*残件按钮*!/}
                {/!*{props.ButtonFrom =='DSYs' && <li className={'iconfonts recovery '+(props.on=='recovery' && 'on')} onClick={()=>{props.history.pushState(null, "/recovery");}}></li>}*!/}
                {/!*维修按钮*!/}
                { props.ButtonFrom =='XLC' &&
                    <li className={'iconfonts toWXList '+(props.on==3 && 'on')} onClick={()=>{props.T.props.history.pushState(null, "/XList");}}></li>
                }
                {/!*!/!*采购按钮*!/!*!/}
                {/!*{ props.ButtonFrom =='XLC' &&
                <li className={'iconfonts toPurchase '+(props.on==4 && 'on')} onClick={()=>{props.T.props.history.pushState(null, "/CList");}}></li>
                }*!/}

                {/!*订单按钮*!/}
                {zw.length>1||(zw.length==1&&zw[0]=='ATUTOEVAL')&& props.ButtonFrom =='DSYs' && <li className={'iconfonts purchase '+(props.on=='purchase' && 'on')} onClick={()=>{props.history.pushState(null, "/purchase");}}></li>}
                {/!*个人订单*!/}
                {props.ButtonFrom =='Mys' && <li className={'iconfonts purchase '+(props.on=='purchase' && 'on')} onClick={()=>{props.history.pushState(null, "/purchase");}}></li>}
                {props.ButtonFrom =='Mys' && <li className={'iconfonts toHome '+(props.on=='home' && 'on')} onClick={()=>{props.history.pushState(null, "/Home");}}></li>}
                {/!*个人中心按钮*!/}
                {props.ButtonFrom =='DSYs' && <li className={'iconfonts toHome '+(props.on=='home' && 'on')}  onClick={()=>{props.T.props.history.pushState(null, "/Home");}}></li>}
                {props.ButtonFrom =='XLC' && <li className={'iconfonts toHome '+(props.on=='home' && 'on')}  onClick={()=>{props.T.props.history.pushState(null, "/Home");}}></li>}
            </ul>
        </div>
    )
}*/

/**公用input**/
export const LiInput = (props)=>{
    return (
        <li>
             <span></span>
            <input type="text"/>
        </li>
    )
}