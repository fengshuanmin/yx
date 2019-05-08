import React from 'react';
import $ from "jquery"
import style from '../css/css'
//选择修理厂
export class ChooseXLC extends React.Component {
    constructor(props){
        super(props);
        this.state={
            XCCList:[]
        };
        this.getXlc=this.getXlc.bind(this)
        this.changeCstate=this.changeCstate.bind(this)
    }
    getXlc(e){
        var data=this.props.data;
        data.val=e.target && e.target.value ? e.target.value:data.val||'';
        $.ajax({
            url: "/lexiugo-app/weixin/insurance/getXlc",
            data:data,
            dataType: "json",
            type: "post",
            success: (msg)=>{
                var XCCList=[];
                var list=msg.data.xlc;
                for(var i in list){
                    XCCList.push(<li key={i} onClick={this.changeCstate.bind(this,list[i],false)} >{list[i].libName}</li>)
                }
                this.setState({XCCList:XCCList})
            }
        });
    }
    changeCstate(a,b,e){
        if(b){
            this.props.ChooseXLC(a,false,this.getXlc);
        }else if(a){
            $('.choseXlcInput').val(a.libName);
            this.setState({XCCList:[]});
            this.props.ChooseXLC(a,true,this.getXlc);
        }else{
            this.props.ChooseXLC(a,false,this.getXlc);
        }

    }
    render() {
        return (
            <div className="ChooseXlc">
                <input onFocus={this.changeCstate.bind(this,false,false)} onBlur={()=>{setTimeout(()=>{this.setState({XCCList:[]})},200)}} placeholder="选择修理厂" className="choseXlcInput" type="text" onChange={this.getXlc}/>
                {this.state.XCCList[0] ?
                    <div className="CXlcList">
                        <div>
                            <span className={this.props.data.xlcRepairLevel=="com" ? 'on':''} onClick={this.changeCstate.bind(this,'com',true)}>常规车</span>
                            <span className={this.props.data.xlcRepairLevel=="adv" ? 'on':''} onClick={this.changeCstate.bind(this,'adv',true)}>高端车</span>
                        </div>
                        <ul>
                            {this.state.XCCList}
                        </ul>
                    </div>
                    :''}

            </div>

        )
    }
}