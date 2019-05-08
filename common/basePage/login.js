import React from 'react';
import $ from "jquery";

import wxConfig from '../../config/WXConfig'

require('../css/basePage/login.css')
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{}
        }
        this.updataValue=(m,e)=>{
            var newState=this.state.data || {};
            newState[m]=e.target.value;
            this.setState({data:newState});
        }
        this.empty=(m,e)=>{
            this.refs[m].value=''
        }
        this.blur=()=>{
            window.scrollTo(0, 0);
            console.log('bulr')
        }
        this.showPassword=(m,e)=>{
            this.refs[m].type=='text' ? this.refs[m].type='password' : this.refs[m].type='text';
            e.target.className=='showPassword' ? e.target.className='hidePassword':e.target.className='showPassword'
        }
        this.loginSubmit=(e)=>{
            var arr={username:{content:'登录账号不能为空'},password:{content:'登录密码不能为空'}}
            if(!this.state.data)return;
            for(var i in arr){
                if(!this.state.data[i]){
                    this.props.project.setProps({
                        PromptData:{
                            content:arr[i].content,
                            Prompt:this.props.project.index,
                            onlyOK:true,
                            fun:(t)=>{
                                this.refs[i].focus();
                                t.Close();
                            }
                        }
                    })
                    return;
                }
            }
            var arrType = {lexiuApp:['0','/record'],fomeXLC:['0','/record'],newBuild:['1','/record','3'],repairState:['2','/record']}
            var submitData=this.state.data;
            submitData.zw=arrType[this.getQuery()][0];
            if(this.state.canGo)return;
            this.setState({canGo:true})
            this.props.project.setProps({PromptData:{loading:true}})
            console.log(arrType[this.getQuery()])
            $.ajax({
                url: "/lexiugo-app/app_login",
                data: this.state.data,
                dataType: "json",
                type: "post",
                success:(msg)=>{
                    console.log(msg)
                    this.setState({canGo:false,token:msg.data.token});
                    this.props.project.setProps({PromptData:{}})
                    if(msg.code == "0000"){
                        if(msg.data.LxAqYhxxb.userType=='0'){
                            if(!arrType[this.getQuery()] && arrType[this.getQuery()][0]!=msg.data.LxAqZz.zzType
                            ){
                                this.props.project.setProps({
                                    PromptData:{content:'您没有权限登录', Prompt:true}
                                })
                            }else if((!arrType[this.getQuery()][2] && arrType[this.getQuery()][2]== msg.data.LxAqZz.zzType)||(!arrType[this.getQuery()][2]&&arrType[this.getQuery()][0]!=msg.data.LxAqZz.zzType)){
                                this.props.project.setProps({
                                    PromptData:{content:'您没有权限登录', Prompt:true}
                                })
                            }else if(arrType[this.getQuery()][2]&&arrType[this.getQuery()][0]!=msg.data.LxAqZz.zzType){
                                this.props.project.setProps({
                                    PromptData:{content:'您没有权限登录', Prompt:true}
                                })
                            }else {
                                var zw=msg.data.LxAqYhxxb.zw.split(',')
                                localStorage.setItem('zw',zw);
                                this.props.project.setProps({user: msg});
                                localStorage.setItem(this.getQuery(), JSON.stringify(this.state.data));

                                var goWhere={
                                    inquiry:'/inquiry',
                                    addInquiry:'/inquiry/addInquiry'
                                }
                                var newParams = window.location.pathname.split("goWhere/").pop()
                                if(goWhere[newParams]){
                                    console.log(zw)
                                    if(zw.length==1&&zw[0]=='ATUTOEVAL'||zw.length>1){
                                        console.log(arrType[this.getQuery()][1])
                                        this.props.setProps({
                                            adver:'1'
                                        })
                                        this.props.history.replaceState(msg.openId,'/inquiry');
                                    }else{
                                        this.props.project.setProps({
                                            PromptData:{content:'该入口为询价入口', Prompt:true}
                                        })
                                    }
                                    // console.log(this.getQuery('goWhere'),goWhere[newParams])
                                    // this.props.history.replaceState(msg.openId, goWhere[newParams]);
                                }else{
                                    console.log('123')
                                    if(zw.length==1&&zw[0]=='DSY'||zw.length>1){
                                        console.log(arrType[this.getQuery()][1])
                                        this.props.setProps({
                                            adver:'1'
                                        })
                                        this.props.history.replaceState(msg.openId, arrType[this.getQuery()][1]);
                                    }else{
                                        if(zw[0]=='XLC'){
                                            this.props.setProps({
                                                adver:'1'
                                            })
                                            this.props.history.replaceState(msg.openId, arrType[this.getQuery()][1]);
                                        }else{
                                            this.props.project.setProps({
                                                PromptData:{content:'该入口为推修入口', Prompt:true}
                                            })
                                        }
                                    }
                                    // this.props.history.replaceState(msg.openId, arrType[this.getQuery()][1]);
                                }
                            }
                        }else{
                            this.props.project.setProps({
                                PromptData:{content:'当前用户为个人用户，您没有权限登录', Prompt:true}
                            })
                        }
                    }else{
                        this.props.project.setProps({
                            PromptData:{content:msg.mess, Prompt:true}
                        })
                    }
                },
                error:(xhr, status, err)=>{
                    //console.error(this.props.url, status, err.toString());
                    this.props.project.setProps({
                        PromptData:{content:'网络异常，请检查网络！', Prompt:true,onlyOK:true,fun:(e,close)=>{
                            this.setState({canGo:false});
                            close();
                        }}
                    })
                }
            })
        }
    }
    getQuery(Type){
        var reg = new RegExp("(^|&)" + (Type||'action') + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(!r){return false;}
        var actionViue=unescape(r[2]);
        return actionViue
    }
    componentWillMount(){
    window.$=$
    }
    componentDidMount(){
        if(window.location.pathname.indexOf('goWhere')!=-1){
            this.props.changeTitle('询报价')
        }
        var actionViue=this.getQuery();
        var data = JSON.parse(localStorage.getItem(actionViue)) || {};
        this.props.project.setProps({getQuery:this.getQuery})
        if(data.username && data.password){
            this.refs['username'].value=data.username || ''
            this.refs['password'].value=data.password || ''
            this.setState({data:data},()=>{
                this.loginSubmit();
            })
        }else{
            data = data || {}
            localStorage.getItem("usernamexlc") && this.getQuery()=='lexiuApp' ?
                (this.refs['username'].value=(localStorage.getItem("usernamexlc") || '') &&  (data.username=localStorage.getItem("usernamexlc")) && localStorage.setItem("usernamexlc",''))
                :''
            localStorage.getItem("username")  && this.getQuery()=='newBuild' ?
                (this.refs['username'].value=(localStorage.getItem("username") || '') && (data.username=localStorage.getItem("username")) && localStorage.setItem("username",'')):''
            localStorage.getItem("usernameyy") && this.getQuery()=='repairState' ?
                (this.refs['username'].value=(localStorage.getItem("usernameyy") || '') && (data.username=localStorage.getItem("usernameyy")) && localStorage.setItem("usernameyy",'')):''
            this.setState({data:data},()=>{
                this.refs['username'].value=this.state.data.username || '';
            })
        }
    }
    render() {
        console.log(this.state)
        console.log(this.props)
        return (
            <div>
                <div className="loginBg"></div>
                <div className="loginBox">
                    <ul>
                        <li>
                            <span>账号</span>
                            <input onKeyUp={this.updataValue.bind(this,'username')} ref="username" onBlur={this.blur} placeholder="请输入登录账号" type="text" name="username"/>
                            {this.state.data.username && <span className="empty" onClick={this.empty.bind(this,'username')}></span>}
                        </li>
                        <li style={{border:'none'}}>
                            <span>密码</span>
                            <input ref="password" placeholder="请输入登录密码" type="password" onBlur={this.blur} name="password" onChange={this.updataValue.bind(this,'password')}/>
                            <span className="hidePassword" onClick={this.showPassword.bind(this,'password')}></span>
                            {this.state.data.password && <span className="empty" onClick={this.empty.bind(this,'password')}></span>}
                        </li>
                    </ul>
                    <div className="submitLogin">
                        <button onClick={this.loginSubmit}>登录</button>
                    </div>
                </div>
            </div>
        )
    }
}