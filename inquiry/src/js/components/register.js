import React from 'react';
import $ from "jquery";

import wxConfig from '../../../../config/WXConfig'

require('../../css/login.css')
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag:true,
            yzmflag:false,
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
        this.tologin=()=>{
            this.props.history.pushState('','login')
        }
        this.YZM=()=>{
            var reg=/^\d{11}$/
            if(this.refs['phone'].value==''){
                this.props.promptInfo({
                    content:'请输入手机号码',
                    Prompt:true,
                    onlyOK:true
                })
            }else if(!reg.test(this.refs['phone'].value)){
                this.props.promptInfo({
                    content:'手机号码输入有误，请重新输入',
                    Prompt:true,
                    onlyOK:true
                })
            }else{
                this.props.ajax({
                    url:'/toumingxiu/personalRegister/sendVerificationCode.do',
                    data:{mobilePhone:this.refs['phone'].value,vertifyType:'0'},
                    suc:(data)=>{
                        console.log(data)
                        if(data.success==true){
                            this.setState({
                                flag:false,
                                yzmflag:true,
                                timer:59
                            })
                            var n = setInterval(()=>{
                                var j = this.state.timer;
                                this.setState({
                                    timer:j
                                })
                                this.state.timer--;
                                if (this.state.timer <= 0) {
                                    clearInterval(n);
                                    this.setState({
                                        flag:true,
                                        yzmflag:false
                                    })
                                }
                            }, 1000);
                            this.setState({
                                n:n
                            })
                        }else{
                            this.props.promptInfo({
                                content:data.errorMsg,
                                Prompt:true,
                                onlyOk:true
                            })
                        }
                    }
                })
            }
        }
        this.loginSubmit=(e)=> {
            this.props.ajax({
                    url:'/toumingxiu/personalRegister/registerByVerificationCode.do',
                    data:{
                        mobilePhone:this.refs['phone'].value,
                        vertifyCode:this.refs['yzm'].value,
                        passWord:this.refs['psd'].value
                    },
                    suc:(data)=>{
                        console.log(data)
                        if( data.errorCode=='000000'){
                            this.props.promptInfo({
                                content:'注册成功',
                                Prompt:true,
                                onlyOK:true,
                                fun:()=>{
                                    localStorage.setItem("Inquiry", '')
                                    this.props.history.pushState(null,'/login')
                                    this.props.promptInfo()
                                }
                            })
                        }else{
                            this.props.promptInfo({
                                content:data.errorMsg,
                                Prompt:true,
                                onlyOK:true
                            })
                        }
                    }
                })
        }
    }
    componentWillMount(){

    }
    componentWillUnmount(){
        clearInterval(this.state.n);
    }
    componentDidMount(){
        this.props.changeTitle('个人询价采购');
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
                            <input  ref="phone" placeholder="请输入手机号" onBlur={this.blur} type="text" name="phone"/>
                             <span className="empty" style={{marginLeft:'7.666vw'}} onClick={this.empty.bind(this,'phone')}></span>
                        </li>
                        <li style={{borderBottom: '1px solid #dedede'}}>
                            <span className="label" style={{width:'1.2rem'}}>验证码</span>
                            <input className="yzlab" style={{flex:'1'}} ref="yzm" onBlur={this.blur} placeholder="请输入验证码" type="text" name="yzm"/>
                            <span onClick={this.YZM} style={{width:'40%',textAlign:'right',color:'#8C8C8C'}}>
                                <span style={{width:'100%',color:'#5489F2'}} className={this.state.flag?'YZM YZMshow':'YZM YZMnone'}>获取验证码</span>
                                <span style={{width:'100%',fontSize:'0.30rem'}} className={this.state.yzmflag?'YZM YZMtimershow':
                                'YZM YZMtimernone'}><span style={{fontSize:'0.3rem'}}>({this.state.timer}s)重新获取</span></span>
                            </span>
                        </li>
                        <li>
                            <span className="label">密码</span>
                            <input ref="psd" placeholder="请输入登录密码" onBlur={this.blur} type="password" name="psd"/>
                            <span className="hidePassword" onClick={this.showPassword.bind(this,'psd')}></span>
                            <span className="empty" onClick={this.empty.bind(this,'psd')}></span>
                        </li>
                    </ul>
                    <div className="submitLogin">
                        <button onClick={this.loginSubmit}>注册</button>
                    </div>
                    <div className="ptit">
                        <p>还没有账号? 点击<span className="tit" onClick={this.tologin}>登录</span></p>
                    </div>
                </div>
            </div>
        )
    }
}