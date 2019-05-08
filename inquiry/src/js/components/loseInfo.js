import React from 'react';
import $ from "jquery";

import Detail  from '../../../../repairState/src/js/components/loseInfo';
import {CKYButton,Prompt} from '../../../../common/assembly/someAssembly';
import {MoTai} from '../../../../common/assembly/Stateless'
const LoseInfo = React.createClass({
    getInitialState () {
        return {
            username: "",
            password: "",
            loginIn:"",
            //openId:"",
            modalState:""
        };
    },
    componentDidMount(){
        console.log();



        window.onresize =function(){

        }
    },
    componentWillUnmount() {
    },
    handleScroll(){
    },
    rate(m,i,e){
        if(this.props.location.state.ggDsyId !=this.props.user.data.LxAqYhxxb.id){
            return;
        }
        if(m.state.listParts[i].partType<1 || m.state.listParts[i].partType > 6 || m.state.listParts[i].priceFlag*1 !=1)return;
        document.onkeyup = (s)=>{
            let code= s.charCode || s.keyCode;
            if(code == 13){
                this.rateblur(m,i,e);
            }
        }
        if(this.props.location.state.lossState != 1 && this.props.location.state.lossState !=1){return;}
        e.currentTarget.setAttribute('contenteditable',"true");
        e.currentTarget.focus();
    },
    rateblur(m,i,e){

        e.currentTarget.setAttribute('contenteditable',"false");
        var newStateList=m.state.listParts;

        console.log(newStateList[i].maxFL,newStateList[i].minFL);


        var newText=parseFloat(e.target.innerHTML) || 0;
        newText > 99 ? newText=100 : newText;
        /*e.target.innerHTML=newText*/
        newStateList[i].mtbct=999;
        e.target.innerHTML=parseInt(newText);
        var innerh=e.target.innerHTML
        newStateList[i].manageFeePct=newText/100 || 0
        newStateList[i].manageFee=newStateList[i].manageFeePct*(newStateList[i].lossPrice || newStateList[i].jmPrice)*newStateList[i].partNum
        newStateList[i].target=e.target
        m.setState({listParts:newStateList},
            ()=>{
                newText=parseInt(newText)
                newStateList[i].mtbct='sdfsdgdsfsd';
                newText == 100 ? newText=99 : newText;
                newStateList[i].manageFeePct=newText/100 || 0
                newStateList[i].manageFee=newStateList[i].manageFeePct*(newStateList[i].lossPrice || newStateList[i].jmPrice)*newStateList[i].partNum
                m.setState({listParts:newStateList},()=>{
                    if(newStateList[i].maxFL && (parseFloat(innerh) > newStateList[i].maxFL || parseInt(innerh) < newStateList[i].minFL)){
                        this.props.project.setProps(
                            {PromptData:{content:'费率必须在'+newStateList[i].minFL+'%-'+newStateList[i].maxFL+'%', Prompt:true,onlyOK:true,fun:()=>{
                                newStateList[i].target.focus();
                                this.props.project.setProps(
                                    {PromptData:{}})
                            }}})
                        return
                    }else{
                        this.state.updataPM && this.state.updataPM();
                    }

                })
            }
        );
    },
    showFLTS(){
        return ;
        this.setState({
            tishies:(<MoTai {...this.props}>
                <div className="defaultFlv">
                    <span>管理费率设定规则</span>
                    <ul>
                        {this.state.defFv}
                    </ul>
                </div>
            </MoTai>)
        })
    },
    componentWillUnmount() {
        //this.state.updataPM && this.state.updataPM();
    },
    addFeedback(e){
        //反馈信息
        if(this.state.addShow){
            this.setState({showStyle:{
                height: 0+'px',
            }},()=>{
                setTimeout(()=>{
                    this.setState({addShow:!this.state.addShow})
                },700)
            })
        }else{
            this.setState({
                addShow:!this.state.addShow,
            },()=>{
                setTimeout(()=>{
                    this.setState({showStyle:{
                        height:0 || (this.state.addShow && 5+'rem'),
                    }})
                },100)
            })
        }

    },
    getLocalTime(nS) {
        if(nS==null){
            return
        }
        let now=new Date(nS)
        var   month=now.getMonth()+1;
        var   date=now.getDate();
        var   hour=now.getHours();
        hour<10?(hour='0'+hour):''
        var   minute=now.getMinutes();
        minute<10?(minute='0'+minute):''
        var   second=now.getSeconds();
        second<10?(second='0'+second):''
        return   month+"月"+date+"日 "+hour+":"+minute+":"+second;
    },
    toSubmit(e){
        if(!this.state.textarea){return}
        $.post('/toumingxiu/evaluation/saveMsg.do',{
            msg:this.state.textarea,
            yhxm:this.props.project.user.data.LxAqYhxxb.yhxm,
            zzbh:this.props.project.user.data.LxAqZz.zzbh,
            taskId:this.props.location.state.taskId
        },(data)=>{
            if(data.message){
                var md=this.state.detThis.state.messageList || [];
                data.message.createdtime=this.props.project.timeString(data.message.createdTime,'y-m-d h:m:s')+'.'
                data.message.feedname=data.message.feedName
                data.message.feedzzname=data.message.feedZzName
                data.message.createdby=data.message.createdBy
                data.message.lossmessage=data.message.lossMessage
                md.unshift(data.message)
                this.state.detThis.setState({messageList:md});
                this.setState({addShow:false})
            }
        })
    },
    keepListParts(e){
       this.setState({detThis:e});//.state.listParts
    },
    //获取默认管理费
    dataType(e){
        if(this.props.location.state.lossState != 1 && this.props.location.state.lossState !=1){return;}
        var sdata=e.state.listParts
        var newStateList=e.state.listParts || [];
        //this.setState({defaultFeePct:data})
        var amt=[]
        for(var i in newStateList){
            console.log(newStateList[i].priceFlag)
            if(newStateList[i].partType && newStateList[i].priceFlag*1==1){
               /* amt.push(<li>
                    <span>{newStateList[i].partStandard}</span>
                    <span>{data[j].description}</span>
                </li>)*/
                !newStateList[i].manageFeePct ? newStateList[i].manageFeePct=newStateList[i].defaultManFee :'';
                newStateList[i].minFL=parseInt(newStateList[i].minManFee*100);
                newStateList[i].maxFL=parseInt(newStateList[i].maxManFee*100);
                !newStateList[i].manageFeePct ? newStateList[i].manageFeePct=sdata[i].manageFeePct : ''
                !newStateList[i].manageFee ? newStateList[i].manageFee=newStateList[i].manageFeePct*(newStateList[i].lossPrice || newStateList[i].jmPrice)*newStateList[i].partNum :''
            }else if(newStateList[i].priceFlag==2){
                newStateList[i].manageFeePct=0;
                newStateList[i].manageFee=0;
                newStateList[i].minManFee=0;
                newStateList[i].maxManFee=0;
                newStateList[i].minFL=0;
                newStateList[i].maxFL=0
            }
        }
        e.setState({listParts:newStateList})
        this.setState({defFv:amt})
/*return;
        $.post('/toumingxiu/dict/defaultManageFee.do',{zzbh:this.props.location.state.pushTargetId},(data)=>{
            var sdata=e.state.listParts
            var newStateList=e.state.listParts || [];
            this.setState({defaultFeePct:data})
            var amt=[]
            for(var i in newStateList){
                for(var j in data){
                    if(newStateList[i].partType==data[j].label && newStateList[i].priceFlag*1==1){
                        debugger;
                        amt.push(<li>
                            <span>{newStateList[i].partStandard}</span>
                            <span>{data[j].description}</span>
                        </li>)
                        !newStateList[i].manageFeePct ? newStateList[i].manageFeePct=data[j].value/100 :'';
                        newStateList[i].minFL=parseInt(data[j].description);
                        newStateList[i].maxFL=parseInt(data[j].description.split('%-')[1]);
                        !newStateList[i].manageFeePct ? newStateList[i].manageFeePct=sdata[i].manageFeePct : ''
                        !newStateList[i].manageFee ? newStateList[i].manageFee=newStateList[i].manageFeePct*(newStateList[i].lossPrice || newStateList[i].jmPrice)*newStateList[i].partNum :''
                    }
                }
            }
            e.setState({listParts:newStateList})
            this.setState({defFv:amt})
        })*/
    },
    render(){
        return (
            <div className="jjjjj">
                {this.state.tishies}
                <Detail showFLTS={this.showFLTS} dataType={this.dataType} keepListParts={this.keepListParts} addFeedback={this.addFeedback} rate={this.rate} rateblur={this.rateblur} datasent={this.props.location.state} {...this.props}/>
                <CKYButton data={{parents:this}} T={this} detThis={this.state.detThis} {...this.props}/>
                {
                    this.state.addShow &&
                    <div className="PromptModality">
                        <div className="addFeedback" style={this.state.showStyle}>
                            <p>
                                <span className="closes" onClick={this.addFeedback}>取消</span>
                                <span className="submit" onClick={this.toSubmit} style={this.state.textarea &&{color:'#658dff'}}>发布</span>
                            </p>
                            <textarea onChange={(e)=>{this.setState({textarea:e.target.value})}}  placeholder="请输入150字以内反馈信息"></textarea>
                        </div>
                    </div>
                }

            </div>
        )
    }
})
export default LoseInfo