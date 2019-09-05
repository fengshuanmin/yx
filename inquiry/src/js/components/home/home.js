/**个人中心**/
import React from 'react';
import $ from "jquery";
import ChangeTitle from '../../../../../common/baseFun/someEvent'
import {DSYButton} from '../../../../../common/assembly/someAssembly'

require('../../../css/home.css')
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phonecode:false,
            flag:true,
            yzmflag:false,
            myJF: {nt: ''},
            dingDan: [{
                name: '待付款',
                where: 100,
                background: {backgroundImage: 'url(' + require('../../../img/daifukuan.png') + ')'}
            },
                {
                    name: '待发货',
                    where: 101,
                    background: {backgroundImage: 'url(' + require('../../../img/daifahuo.png') + ')'}
                },
                {
                    name: '待收货',
                    where: 102,
                    background: {backgroundImage: 'url(' + require('../../../img/daishouhuo.png') + ')'}
                },
                {
                    name: '已完成',
                    where: 103,
                    background: {backgroundImage: 'url(' + require('../../../img/yiwancheng.png') + ')'}
                }
                /* {name:'退换货',where:104,background:{background:'url('+require('../../../img/tuihuanhuo.png')+') no-repeat center'}}*/]
        };
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
                    url:'/toumingxiu/personalRegister/sendLoginVerificationCode.do',
                    data:{mobile:this.refs['phone'].value,channel:'9'},
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
            // this.props.history.pushState(null,'/myPoint')
            if(this.refs['phone'].value==''){
                this.props.promptInfo({
                    content:'请输入手机号码',
                    Prompt:true,
                    onlyOK:true
                })
            }else if(this.refs['yzm'].value==''){
                this.props.promptInfo({
                    content:'请输入验证码',
                    Prompt:true,
                    onlyOK:true
                })
            }else{
                this.props.ajax({
                    url:'/toumingxiu/personalRegister/integralVerificationCode.do',
                    data:{
                        mobile:this.refs['phone'].value,
                        vertifyCode:this.refs['yzm'].value,
                        channel:'9'
                    },
                    suc:(data)=>{
                        console.log(data)
                        if( data.errorCode=='000000'){
                            this.props.history.pushState(null,'/myPoint')
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
        this.phonecodeevent=()=>{
            this.setState({
                phonecode:true,
                phoneval:this.props.user.data.LxAqYhxxb.registPersionPhone
            })
        }
        this.colsecodeevent=()=>{
            this.setState({
                phonecode:false
            })
        }
        this.howShow = (dat) => {
            if (dat > 80) {
                return 'UpShow'
            }
        }
        this.getIntegral = () => {
            $.post('/lexiugo-app/weixin/getCurrUserRank', {
                userId: this.props.project.user.data.LxAqYhxxb.id,
                countType: 1
            }, (data) => {
                this.setState({myJF: data.data.currUserRank});
            })
        }
        this.gomess = () => {
            console.log(this.props)
            console.log(this.state)
            this.props.ajax({
                url: '/server/lexiu3-app/business/tmxcmsguserreadinfo/save',
                data: {token: this.props.user.data.token, showChannel: '3'},
                suc: (data) => {
                    console.log(data)
                    if (data.code == '0') {
                        this.props.history.pushState(null, "/message")
                    }
                }
            })
        }
    }

    componentDidMount() {
        ChangeTitle.ChangeTitle('个人中心');
        this.getIntegral();
    }

    componentWillMount() {
        this.props.ajax({
            url: '/server/lexiu3-app/business/tmxcmsginfo/queryUserNotReadMsg',
            data: {token: this.props.user.data.token, showChannel: '3', showRoleType: '9'},
            suc: (data) => {
                console.log(data)
                if (data.code == '0') {
                    this.setState({
                        mesglistsize: data.tmxcMsgInfoListSize
                    })
                }
            }
        })
    }

    render() {
        return (
            <div>
                {this.state.phonecode ?
                    <div style={{background: '#fff', width: '100%', height: '100%', position: 'absolute'}}>
                        <div className="loginBox ln">
                            <span className="closecode" style={{float: 'right'}} onClick={this.colsecodeevent}></span>
                            <b style={{
                                display: 'inline-block',
                                marginTop: '0.8rem',
                                width: '100%',
                                textAlign: 'center',
                                fontSize: '0.36rem',
                                marginBottom: '1rem'
                            }}>手机短信验证</b>
                            <ul style={{fontSize: '0.32rem'}}>
                                <li>
                                    {/*<span className="label">手机号</span>*/}
                                    <input ref="phone" value={this.state.phoneval} disabled placeholder="请输入手机号" onBlur={this.blur} type="text"
                                           name="phone"/>
                                    <span onClick={this.YZM}
                                          style={{width: '40%', textAlign: 'right', color: '#8C8C8C'}}>
                                <span style={{width: '100%', color: '#000'}}
                                      className={this.state.flag ? 'YZM YZMshow' : 'YZM YZMnone'}>获取验证码</span>
                                <span style={{width: '100%', fontSize: '0.30rem'}}
                                      className={this.state.yzmflag ? 'YZM YZMtimershow' :
                                          'YZM YZMtimernone'}><span
                                    style={{fontSize: '0.3rem'}}>({this.state.timer}s)重新获取</span></span>
                            </span>
                                    {/*<span className="empty" style={{marginLeft:'7.666vw'}} onClick={this.empty.bind(this,'phone')}></span>*/}
                                </li>
                                <li style={{borderBottom: '1px solid #dedede'}}>
                                    {/*<span className="label" style={{width:'1.2rem'}}>验证码</span>*/}
                                    <input className="yzlab" style={{flex: '1'}} ref="yzm" onBlur={this.blur}
                                           placeholder="请输入验证码" type="text" name="yzm"/>
                                </li>
                            </ul>
                            <div className="submitLogin" style={{width: 'auto', textAlign: 'center'}}>
                                <button onClick={this.loginSubmit} style={{
                                    width: 'auto',
                                    height: 'auto',
                                    padding: '0.2rem 1rem',
                                    background: '#5398FC'
                                }}>验证
                                </button>
                            </div>
                        </div>
                    </div> :
                    <div>
                        <div className="DSYHome">
                            <ul>
                                <li>
                                    <span className="img"><img src={this.state.myJF && this.state.myJF.headImgUrl}
                                                               alt=""/></span>
                                    <span>
                                <h4>{this.props.project.user.data.LxAqYhxxb.username}</h4>
                            </span>
                                </li>
                            </ul>
                            <div style={{background: '#fff', marginTop: '0.2rem'}}>
                                <ul style={{
                                    display: 'flex',
                                    padding: '0.2rem 0.3rem',
                                    borderBottom: ' 0.01rem solid #e9e9e9'
                                }}>
                                    <li style={{flex: '1', fontSize: '0.3rem', padding: '0'}}>我的订单</li>
                                    <li style={{float: 'right', padding: '0', fontSize: '0.3rem', color: '#999'}}
                                        onClick={() => this.props.history.pushState({
                                            a: true,
                                            where: ''
                                        }, '/dingdan/list')}>全部订单
                                    </li>
                                    <li className="iconfonts" style={{
                                        float: 'right', width: '0.3rem', padding: '0', color: '#999'
                                    }} onClick={() => this.props.history.pushState({
                                        a: true,
                                        where: ''
                                    }, '/dingdan/list')}>&#xe607;</li>
                                </ul>
                                <ul style={{display: 'flex'}}>
                                    {
                                        this.state.dingDan.map((item, index) => {
                                            return (
                                                <li key={index} style={{
                                                    flex: '1',
                                                    paddingBottom: '0.1rem',
                                                    fontSize: '0.28rem',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    textAlign: 'center'
                                                }} onClick={() => this.props.history.pushState({
                                                    a: true,
                                                    where: item.where
                                                }, '/dingdan/list')}>
                                        <span style={{display: 'block', width: '80%', height: '65%'}}>
                                            <span className="zp" style={item.background}></span>
                                        </span>
                                                    <span>{item.name}</span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            {/*<ul className="icoLeft">
                        <li onClick={()=>{this.props.history.pushState({myJF:this.state.myJF}, "/integral");}}>
                            <span className="iconfonts imgIcon"></span>
                            <span className="rightTopBorder">积分榜</span>
                        </li>
                        <li onClick={()=>{this.props.history.pushState(null, "/IntegralRecord");}}>
                            <span className="iconfonts imgIcon"></span>
                            <span className="rightTopBorder">积分记录</span>
                        </li>
                    </ul>*/}
                            <ul className="icoLeft">
                                <li onClick={this.phonecodeevent}>
                                    <span className="iconfonts imgIcon"></span>
                                    <span className="rightTopBorder">
                                         我的积分
                                        <span className="iconfonts" style={{float: 'right'}}>&#xe607;</span>
                                    </span>
                                </li>
                                <li onClick={() => {
                                    this.props.history.pushState(null, "/person");
                                }}>
                                    <span className="iconfonts GR"></span>
                                    <span className="rightTopBorder">
                                个人信息<span className="iconfonts" style={{float: 'right'}}>&#xe607;</span>
                            </span>
                                </li>
                                <li onClick={this.gomess}>
                                    <span className="iconfonts imgIcon"></span>
                                    <span className="rightTopBorder">
                                消息
                                <span style={{float: 'right', position: 'relative'}}>
                                    {this.state.mesglistsize > 0 ? <span className="mesbacred">
                                        {this.state.mesglistsize}</span> : ''}
                                    <span className="iconfonts">&#xe607;</span>
                                </span>
                            </span>
                                </li>
                            </ul>
                            <div className="shezhi" onClick={() => {
                                this.props.history.pushState(null, "/SetUp");
                            }}>
                                <span className="iconfonts">&#xe70c;</span>
                                <span>设置</span>
                            </div>
                        </div>
                        <DSYButton ButtonFrom="Mys" T={this} on={'home'} {...this.props}/>
                    </div>}
            </div>
        )
    }
}