import React from 'react';
import $ from "jquery";

import wxConfig from '../../../../config/WXConfig'

require('../../css/login.css')
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
        this.blur=()=>{
            window.scrollTo(0, 0);
            console.log('bulr')
        }
        this.empty=(m,e)=>{
            this.refs[m].value=''
        }
        this.showPassword=(m,e)=>{
            this.refs[m].type=='text' ? this.refs[m].type='password' : this.refs[m].type='text';
            e.target.className=='showPassword' ? e.target.className='hidePassword':e.target.className='showPassword'
        }
        this.toRegister=()=>{
            this.props.history.pushState('','register')
        }
        this.forgetpsd=()=>{
            this.props.history.pushState('','replacepsd')
        }
        this.loginSubmit=(e)=> {
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
            var arrType = {Inquiry:['0','/inquiry']}
            var submitData=this.state.data;
            if(this.state.canGo)return;
            this.setState({canGo:true})
            this.props.project.setProps({PromptData:{loading:true}})
            console.log(this.state)
            $.ajax({
                url: "/lexiugo-app/app_login",
                data: this.state.data,
                dataType: "json",
                type: "post",
                success:(msg)=>{
                    console.log(msg)
                    this.setState({canGo:false,token:msg.data.token});
                    this.props.project.setProps({PromptData:{}})
                    if(msg.code == "0000") {
                        this.props.project.setProps({user: msg});
                        var zw=msg.data.LxAqYhxxb.zw.split(',')
                        localStorage.setItem('zw',zw);
                        if(msg.data.LxAqZz==null){
                            if(msg.data.LxAqYhxxb.firstLogin!=null){
                                this.props.setProps({
                                    adver:'1'
                                })
                                localStorage.setItem(this.getQuery(), JSON.stringify(this.state.data));
                                this.props.history.replaceState(msg.openId, arrType[this.getQuery()][1]);
                            }else {
                                // localStorage.removeItem("flagger");
                                localStorage.setItem(this.getQuery(), JSON.stringify(this.state.data));
                                this.props.history.pushState({completingType:0},'/news/personnews');
                            }
                        }else{
                            this.props.project.setProps({
                                PromptData:{content:'当前用户不支持个人询价', Prompt:true}
                            })
                        }
                       /*  if(arrType[this.getQuery()] && arrType[this.getQuery()][0]==msg.data.LxAqZz.zzType){*/
                             // localStorage.setItem(this.getQuery(), JSON.stringify({username:this.refs['username'].value,password:this.refs['password'].value}));
                            /*if(msg.data.LxAqZz==null) {
                                this.props.project.setProps({user: msg});
                                localStorage.setItem(this.getQuery(), JSON.stringify(this.state.data));
                                var goWhere = {
                                    inquiry: '/inquiry',
                                    addInquiry: '/inquiry/addInquiry'
                                }
                                var newParams = window.location.pathname.split("goWhere/").pop()
                                if (goWhere[newParams]) {
                                    console.log(this.getQuery('goWhere'), goWhere[newParams])
                                    this.props.history.replaceState(msg.openId, goWhere[newParams]);
                                } else {
                                    this.props.history.replaceState(msg.openId, arrType[this.getQuery()][1]);
                                }
                            }else{
                                this.props.project.setProps({
                                    PromptData:{content:'该手机号未注册', Prompt:true}
                                })
                            }*/

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
        this.props.location.state={...(this.props.location.state||{}),...(this.props.flagger||{})}
    }
    componentDidMount(){
        this.props.changeTitle('个人询价采购');
        var actionViue=this.getQuery();
        var data = JSON.parse(localStorage.getItem(actionViue)) || {};
        this.props.project.setProps({getQuery:this.getQuery})
        if(localStorage.getItem("flagger")){
            if(data.username && data.password){
                this.refs['username'].value=data.username || ''
                this.refs['password'].value=data.password || ''
                this.setState({data:data})
            }else{
                data = data || {}
                localStorage.getItem("username") && this.getQuery()=='Inquiry' ?
                    (this.refs['username'].value=(localStorage.getItem("username") || '') && (data.username=localStorage.getItem("username")) && localStorage.setItem("username",'')):''
                this.setState({data:data},()=>{
                    this.refs['username'].value=this.state.data.username || '';
                })
            }
        }else{
            if(data.username && data.password){
                this.refs['username'].value=data.username || ''
                this.refs['password'].value=data.password || ''
                this.setState({data:data},()=>{
                    this.loginSubmit();
                })
            }else{
                data = data || {}
                localStorage.getItem("username") && this.getQuery()=='Inquiry' ?
                    (this.refs['username'].value=(localStorage.getItem("username") || '') && (data.username=localStorage.getItem("username")) && localStorage.setItem("username",'')):''
                this.setState({data:data},()=>{
                    this.refs['username'].value=this.state.data.username || '';
                })
            }
        }
    }
    render() {
        console.log(this.state)
        return (
            <div>
                <div className="loginBg"></div>
                <div className="loginBox">
                    <ul>
                        <li>
                            <span className="label">手机号</span>
                            <input ref="username" onChange={this.updataValue.bind(this,'username')} placeholder="请输入手机号" onBlur={this.blur} type="text" name="username"/>
                            {this.state.data.username&&<span className="empty" style={{marginLeft: '6.666vw'}} onClick={this.empty.bind(this,'username')}></span>}
                        </li>
                        <li>
                            <span className="label">密码</span>
                            <input ref="password" onChange={this.updataValue.bind(this,'password')} placeholder="请输入登录密码" onBlur={this.blur} type="password" name="password"/>
                            <span className="hidePassword" onClick={this.showPassword.bind(this,'password')}></span>
                            {this.state.data.password&&<span className="empty" onClick={this.empty.bind(this,'password')}></span>}
                        </li>
                    </ul>
                    <p className="forpsd"><span className="forgetpsd" onClick={this.forgetpsd}>忘记密码？</span></p>

                    <div className="submitLogin">
                        <button onClick={this.loginSubmit}>登录</button>
                    </div>
                    <div className="ptit">
                        <p>还没有账号? 点击<span className="tit" onClick={this.toRegister}>注册</span></p>
                    </div>
                </div>
            </div>
        )
    }
}