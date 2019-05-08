import React from 'react';
import $ from "jquery";
var ChangePosword=React.createClass({
    getInitialState () {
        return {
            modalState:'',
            errText:'',
            data:{
                oldPassword:'',
                newPassword:'',
                confirmNewPassword:'',
            },
            oldPassword:'',
            newPassword:'',
            confirmNewPassword:'',
            errState:{
                oldPassword:'',
                newPassword:'',
                confirmNewPassword:'',
            },
        }
    },
    toRecord(){
        this.props.history.replaceState(null, "/home");
    },
    submit(){
        const _this=this;

        var arrs=this.state.data;
        var newState={};

        for(var i in arrs){
            var $Class='.'+i;
            if(arrs[i]==''){
                $($Class).css({border:'1px solid red'}).focus();
                newState[i]='密码不能为空';
                this.setState({errState:Object.assign({},this.state.errState,newState)});
                return;
            }else{
                switch(i){
                    case 'oldPassword':
                        break;
                    case 'newPassword':
                        var regp =/^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/;
                        if(!regp.test(arrs.newPassword) || arrs.newPassword.length<6 || arrs.newPassword.length>20){
                            $($Class).css({border:'1px solid red'}).focus();
                            newState[i]='密码必须为6-20位的数字和字母的组合';
                            this.setState({errState:Object.assign({},this.state.errState,newState)});
                            return;
                        }
                        break;
                    case 'confirmNewPassword':
                        if(arrs.newPassword != arrs.confirmNewPassword){
                            $($Class).css({border:'1px solid red'}).focus();
                            newState[i]='两次密码不一致'
                            this.setState({errState:Object.assign({},this.state.errState,newState)});
                            return;
                        }

                        break;
                }
            }
        }
        this.setState({scmodalState:true});
        $.ajax({
            url: "/lexiugo-app/weixin/insurance/changePwd",
            data:_this.state.data ,
            dataType: "json",
            type: "post",
            success: function (msg) {
                if(msg){
                    this.setState({modalState:'修改成功'});
                    localStorage.setItem("username", '');
                }
            }.bind(this)
        })
    },
    inputFocus(e){
        $('.'+e.target.name).css({border:'1px solid #ccc'});
        var newState={};
        newState[e.target.name]=''
        this.setState({errState:Object.assign({},this.state.errState,newState)});
    },
    changeText(e){
        var newState={};
        newState[e.target.name]=e.target.value;
        this.setState({data:Object.assign({},this.state.data,newState)});
    },
    modalStateChange(){
        if (this.state.modalState=="修改成功"){
            this.props.history.replaceState(null, "/login");
        }
        this.setState({modalState: ""});
    },
    render(){
        return(
            <div className="changePassword">
                <div className="headerInfo">
                    <span className="newBuildBtn" onClick={this.toRecord}>返回</span>
                        修改密码
                </div>
                <div className="CPBody caseBox">
                    <ul>
                        <li>
                            <input type="text" className="oldPassword" name="oldPassword" placeholder="请输入旧密码" onChange={this.changeText} onFocus={this.inputFocus}/>
                            <p className="errTS">{this.state.errState.oldPassword}</p>
                        </li>
                        <li>
                            <input type="text" className="newPassword" name="newPassword" placeholder="请输入新密码" onChange={this.changeText} onFocus={this.inputFocus}/>
                            {this.state.errState.newPassword ? <p className="err">{this.state.errState.newPassword}</p> : <p className="errTS">请输入6-20位字符（不能用纯数字或英文字母)</p>}
                        </li>
                        <li>
                            <input type="text" className="confirmNewPassword" name="confirmNewPassword" placeholder="请确认新密码" onChange={this.changeText} onFocus={this.inputFocus}/>
                            {this.state.errState.confirmNewPassword ? <p className="err">{this.state.errState.confirmNewPassword}</p> : <p className="errTS">请确保两次输入密码一致</p>}
                        </li>
                        <li>
                            <div className="bottomSubmit">
                                <button className="publicBtn" type="submit" onClick={this.submit}>确认修改</button>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="weui_dialog_alert" style={this.state.modalState==""?{display:"none"}:{display:"block"}}>
                    <div className="weui_mask"></div>
                    <div className="weui_dialog">
                        <div className="weui_dialog_hd"><strong className="weui_dialog_title" onClick={this.modalStateChange}></strong></div>
                        <div className="weui_dialog_bd">{this.state.modalState}</div>
                        <div className="weui_dialog_ft">
                            <a className="weui_btn_dialog primary" onClick={this.modalStateChange}>确定</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})
export default ChangePosword;