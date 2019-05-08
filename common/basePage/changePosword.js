import React from 'react';
import $ from "jquery";
import ChangeTitle from '../baseFun/someEvent'
require('../css/basePage/changePosword.css')

export default class SetUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword:'',
            newPassword:'',
            confirmNewPassword:'',
        };
        this.goOut = () => {
            localStorage.setItem("password", '');
            this.props.project.setProps({PromptData:{}});
            this.props.history.pushState(null, "/login");
        }
        this.dataState=(e)=>{
            var newState={}
            newState[e.target.name]=e.target.value;
            this.setState(newState)
        }
        this.check=(d,e)=>{

        }
        this.submit=()=>{
            for(var i in this.state){
                switch(i){
                    case 'oldPassword':
                        if(!this.state.oldPassword){
                            this.props.project.setProps({PromptData:{content:'请输入旧密码',Prompt:this.props.project.index,fun:()=>this.focusOn('oldPassword')}});
                            return false;
                        }
                        break;
                    case 'newPassword':
                        var regp =/^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/;
                        if(!this.state.oldPassword){
                            this.props.project.setProps({PromptData:{content:'请输入新密码',Prompt:this.props.project.index,fun:()=>this.focusOn('oldPassword')}});
                            return false;
                        }else if(!regp.test(this.state.newPassword) || this.state.newPassword.length<6){
                            this.props.project.setProps({PromptData:{content:'密码必须为6-20位的数字和字母的组合',Prompt:this.props.project.index,fun:()=>this.focusOn('newPassword')}});
                            return false;
                        }
                        break;
                    case 'confirmNewPassword':
                        if(!this.state.confirmNewPassword){
                            this.props.project.setProps({PromptData:{content:'请输入确认密码',Prompt:this.props.project.index,fun:()=>this.focusOn('confirmNewPassword')}});
                            return false;
                        }else if(this.state.confirmNewPassword!=this.state.newPassword){
                            this.props.project.setProps({PromptData:{content:'两次输入密码不一致',Prompt:this.props.project.index,fun:()=>this.focusOn('confirmNewPassword')}});
                            return false;
                        }
                        break;
                }
            }
            $.ajax({
                url: "/lexiugo-app/weixin/insurance/changePwd",
                data:this.state,
                dataType: "json",
                type: "post",
                success: (msg)=>{
                    var arr=['0','修改成功','初始密码输入有误','两次密码不一致','新老密码一致']
                    if(msg ==1 || msg=='1' ){
                        this.props.project.setProps({PromptData:{content:'修改成功请重新登录',Prompt:this.props.project.index,fun:this.goOut}});
                    }else{
                        this.props.project.setProps({PromptData:{content:arr[msg],Prompt:this.props.project.index}});
                    }
                }
            })

        }
        this.focusOn=(e)=>{
            $('input[name='+e+']').focus();
            this.props.project.setProps({PromptData:{}});
        }
    }
    componentDidMount() {
        ChangeTitle.ChangeTitle('修改密码');
    }

    render() {
        return (
            <div className="changePassword">
                <ul>
                    <li>
                        <span>初始密码:</span>
                        <input type="text" name="oldPassword" onChange={this.dataState} />
                    </li>
                    <li>
                        <span>新密码:</span>
                        <input type="password" name="newPassword" onChange={this.dataState}/>
                    </li>
                    <li>
                        <span>再次输入新密码:</span>
                        <input type="password" name="confirmNewPassword" onChange={this.dataState} onblur={this.check} />
                    </li>
                </ul>
                <div className="buttonStyle">
                    <input onClick={this.submit} type="button" value="确认"/>
                </div>
            </div>
        )
    }
}