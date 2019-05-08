import React from 'react'
import $ from 'jquery'
require('../../../css/home.css')
import {BaseLi,SubmitOk} from '../../../../../common/assembly/Stateless';
import { Switch } from 'antd'
export default class NewAddress extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            phone:'',
            addrDetail:'',
            isDefault:'',
            isChecked:false,
            submitDraw:false
        }
        this.btnClick=()=>{
            this.setState({
                isChecked:!this.state.isChecked
            })
        }
        this.checkadd=()=>{
            console.log('123')
            this.props.ajax({
                url: '/server/lexiu1-app/business/dictAddr/sf?token=' + this.props.user.data.token,
                type: 'GET',
                suc: (dat) => {
                    console.log(dat)
                    this.setState({
                        submitDraw:true,
                        checksf:true,
                        sfList:dat.sf
                    })
                }
            })
        }
        this.touchs=(m,e)=>{
            switch(m){
                case 'start':
                    this.props.touchStarts(e,this);
                    break;
                case 'end':
                    this.props.touchEnds(e,this);
                    break;
                case 'move':
                    e.preventDefault();e.stopPropagation();
                    this.props.touchMoves(e,this);
                    var e= window.e || e
                    if(document.all){
                        e.returnValue = false;
                    }else{
                        e.preventDefault();
                    }
                    break;
            }
        }
        this.blur=()=>{
            window.scrollTo(0, 0);
            console.log('bulr')
        }
        this.sfList=(item,e)=>{
            e.stopPropagation();e.preventDefault();
            this.setState({
                sfval:item.SFMC,
                sfid:item.id,
                sqval:'',
                qyval:'',
                checksf:false,
                checksq:true,
            })
            this.props.ajax({
                url: '/server/lexiu1-app/business/dictAddr/cs/'+item.id+'?token='+this.props.user.data.token,
                type: 'GET',
                suc: (data) => {
                    console.log(data)
                    this.setState({
                        sqList:data.cs
                    })
                }
            })
        }
        this.sqList=(item1,e)=>{
            this.setState({
                sqval:item1.CSMC,
                sqid:item1.id,
                qyval:'',
                checksf:false,
                checksq:false,
                checkqy:true
            })
            this.props.ajax({
                url: '/server/lexiu1-app/business/dictAddr/x/'+item1.id+'?token='+this.props.user.data.token,
                type: 'GET',
                suc: (result) => {
                    console.log(result.x.length==0)
                    if(result.x.length==0){
                        this.setState({
                            checksf:false,
                            checksq:false,
                            checkqy:false,
                            submitDraw:false,
                            qyval:'',
                            qyid:'',
                        })
                    }else{
                        this.setState({
                            qyList:result.x
                        })
                    }
                }
            })
        }
        this.qyList=(item2,e)=>{
            this.setState({
                qyval:item2.XMC,
                qyid:item2.id,
                checksf:false,
                checksq:false,
                checkqy:false,
                submitDraw:false,
                dq:this.state.sfval+this.state.sqval+item2
            })
        }
        this.quxiao=()=>{
            this.setState({
                submitDraw:false,
            })
        }
        this.submit=()=>{
            if(!this.state.name){
                console.log('12345')
                this.props.promptInfo({
                    content:'请输入收货人姓名',
                    Prompt:true,
                    onlyOK:true
                })
            }else if(!this.state.phone){
                this.props.promptInfo({
                    content:'请输入收货人电话',
                    Prompt:true,
                    onlyOK:true
                })
            }else if(this.state.sf==''){
                this.props.promptInfo({
                    content:'请输入所在区域',
                    Prompt:true,
                    onlyOK:true
                })
            }else if(!this.state.addrDetail){
                this.props.promptInfo({
                    content:'请输入详细地址',
                    Prompt:true,
                    onlyOK:true
                })
            }else{
                this.props.ajax({
                url:'/server/lexiu1-app/api/tmxcorder/addAddrs?token='+this.props.user.data.token,
                data:{
                    id:this.state.id,
                    customerId:this.props.user.data.LxAqYhxxb.id,
                    name:this.state.name,
                    phone:this.state.phone,
                    addrDetail:this.state.addrDetail,
                    addr1Id:this.state.sfid,
                    addr1:this.state.sfval,
                    addr2Id:this.state.sqid,
                    addr2:this.state.sqval,
                    addr3Id:this.state.qyid,
                    addr3:this.state.qyval,
                    isDefault:this.state.isChecked
                },
                suc:(dat)=>{
                    console.log(dat)
                    if(dat.code=='0'){
                        this.props.promptInfo({
                            content:'地址修改成功',
                            Prompt:true,
                            onlyOK:true,
                            fun:()=>{
                                this.props.promptInfo();
                                this.props.history.goBack();
                            }
                        })
                    }
                }
            })
            }
        }
        this.onChange=(checked)=> {
            console.log('switch to ${checked}');
        }
    }
    componentWillMount(){
        this.props.location.state={...(this.props.location.state||{}),...(this.props.ssq||{}),...(this.props.list||{})};
        this.state=this.props.location.state.addlist
        console.log(this.props.location.state)
        console.log(this.props)
        if(this.props.location.state.addlist){
            this.setState({
                sfval:this.props.location.state.addlist.addr1,
                sfid:this.props.location.state.addlist.addr1Id,
                sqval:this.props.location.state.addlist.addr2,
                sqid:this.props.location.state.addlist.addr2Id,
                qyval:this.props.location.state.addlist.addr3,
                qyid:this.props.location.state.addlist.addr3Id
            })
        }
    }
    render(){
        console.log(this.props)
        console.log(this.state)
        return(
            <div>
                <this.props.BaseLi style={{borderTop: '1px solid #ccc',padding:'0.3rem 0 0 0',color:'#1C1C1C',fontWeight:'600',fontSize:'0.28rem'}} data={[
                    {
                        key:'收货人',
                        input: true,
                        val: this.state.name,
                        change: (e) => {
                            this.setState({name: e})
                        },
                        blur:()=>{
                            this.blur()
                        }
                    },
                    {
                        key: '手机号码',
                        input: true,
                        val: this.state.phone,
                        change: (e) => {
                            this.setState({phone: e})
                        },
                        blur:()=>{
                            this.blur()
                        }
                    }
                ]} {...this.props} T={this}/>
                <ul className="baseLi" style={{color:'#1C1C1C',fontSize:'0.28rem'}}>
                    <li className="style1">
                        <div className="LiTRight" style={{borderTop: '1px solid #ccc',borderBottom: '1px solid #ccc'}}>
                            <div className="onece" style={{display:'flex'}} onClick={this.checkadd}>
                                <span classname="listValue" style={{fontWeight:'600'}}>所在地区</span>
                                <span style={{flex:'1',marginLeft:'0.2rem'}}>
                                    <span>{this.state.sfval||''}</span>
                                    <span>{this.state.sqval||''}</span>
                                    <span>{this.state.qyval||''}</span>
                                </span>
                                <span style={{display:'inline-block',width:'0.6rem'}} className="iconfonts">&#xe607;</span>
                            </div>
                        </div>
                    </li>
                </ul>

                <this.props.BaseLi style={{padding:'0 0 0.3rem 0',color:'#1C1C1C',fontWeight:'600',fontSize:'0.28rem'}} data={[
                    {
                        key: '详细地址',
                        input: true,
                        val: this.state.addrDetail,
                        change: (e) => {
                            this.setState({addrDetail: e})
                        },
                        blur:()=>{
                            this.blur()
                        }
                    }
                ]} {...this.props} T={this}/>
                <p style={{background:'#fff',padding:'0.3rem'}}>
                    <span>设为默认</span>
                    {this.state.isChecked==true||this.props.location.state.addlist.isDefault=='true'?<label className="switch2 labe1 switch" onClick={this.btnClick}>
                        {/*<input type="checkbox" />*/}
                        <span className="sp"></span>
                    </label>:<label className="switch1 labe switch" onClick={this.btnClick}>
                        {/*<input type="checkbox" />*/}
                        <span className="spa"></span>
                    </label>}
                </p>

                <div style={{width:'100vw',height:'1rem',marginTop:'0.5rem'}}>
                    <button onClick={this.submit} style={{border:'0px',width:'92%',height:'1rem',marginLeft:'4%',background:'#3A97F7',color:'#fff',borderRadius:'0.1rem',fontSize:'0.32rem'}}>保存</button>
                </div>
                <div className={this.state.submitDraw ? "partsBuyShow basicStyle" : "partsBuyHide basicStyle"}>
                    <div className="qy" style={{overflow:'hidden'}}>
                        <h4 className="checkqy">选择地区<span onClick={this.quxiao} className="zp1" style={{backgroundImage:'url('+require('../../../img/close1.png')+')'}}></span></h4>
                        <p className="sfp">
                            <span className="qytitle" onClick={this.sfdiv}>{this.state.sfval||'请选择'}</span>
                            {this.state.sfval?<span onClick={this.sqdiv} className="qytitle">{this.state.sqval||'请选择'}</span>:''}
                            {this.state.sqval?<span className="qytitle">{this.state.qyval||'请选择'}</span>:''}
                        </p>
                        <div style={{flex:1,position:'relative',overflow:'hidden'}}>
                            <ul className={this.state.checksf?'sfdiv':'sfdivnone'}
                                onTouchEnd={this.touchs.bind(this,'end')}
                                onTouchMove={this.touchs.bind(this,'move')}
                                onTouchStart={this.touchs.bind(this,'start')}
                                style={{overflow:'hidden',position:'absolute',width:'100%'}}
                            >
                                {this.state.sfList&&this.state.sfList.map((item,index)=>{
                                    return(
                                        <li className="lilist" key={index} onClick={this.sfList.bind(this,item)}>{item.SFMC}</li>
                                    )
                                })}
                            </ul>
                            <ul className={this.state.checksq?'sfdiv':'sfdivnone'}
                                onTouchEnd={this.touchs.bind(this,'end')}
                                onTouchMove={this.touchs.bind(this,'move')}
                                onTouchStart={this.touchs.bind(this,'start')}
                                style={{overflow:'hidden',position:'absolute',width:'100%'}}
                            >
                                {this.state.sqList&&this.state.sqList.map((item1,index1)=>{
                                    return(
                                        <li className="lilist" key={index1} onClick={this.sqList.bind(this,item1)}>{item1.CSMC}</li>
                                    )
                                })}
                            </ul>
                            <ul className={this.state.checkqy?'sfdiv':'sfdivnone'}
                                onTouchEnd={this.touchs.bind(this,'end')}
                                onTouchMove={this.touchs.bind(this,'move')}
                                onTouchStart={this.touchs.bind(this,'start')}
                                style={{overflow:'hidden',position:'absolute',width:'100%'}}
                            >
                                {this.state.qyList&&this.state.qyList.map((item2,index2)=>{
                                    return(
                                        <li className="lilist" key={index2} onClick={this.qyList.bind(this,item2)}>{item2.XMC}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}