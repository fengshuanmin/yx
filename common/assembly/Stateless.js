import React from "react"
import $ from 'jquery'
require('../css/Stateless.css')
require('../../inquiry/src/css/home.css')
/*
*/
//*用户中心头部*//
export const UserHeader=(props)=>{
    let style = props.style ||{}
    var userdata=((props.project.user && props.project.user.data) && props.project.user.data.LxAqYhxxb) || {}
    return(
        <ul className="headerInfoStyle" style={style.U}>
            <li style={style.LI}>
                <span className="img"><img src={props.headImgUrl || require("../images/morentouxiang.jpg")} alt=""/></span>
                <span>
                    <h4>{userdata.username || '修理厂用户'}</h4>
                    { props.type=='JF' &&
                        <p>
                            <span>当前积分:<span style={{color:"#fa4b4c",fontWeight:600}}>{props.currIntegralSum}</span></span>
                            <span>总积分:<span style={{fontWeight:600}}>{props.totalGetSum}</span></span>
                        </p>
                    }
                </span>
            </li>
        </ul>
    )
}
/*公共li
* 传入参数：
{
    Style:{}//必填，留空使用默认样式
    value:''//li里的文字，
    valueR:
    num:''//是否有数量标记
    ico:''//前图标
    ico2:''//后图标不填则没有
}
* */


export const BaseLi =(props)=>{
    if(!props.data[0])return(<span></span>)
    return(
        <ul className="baseLi" style={props.style}>
            {
                props.data.map((item,index)=>{
                    item.Style || (item.Style={})
                    return(
                        <li className="style1" key={index} style={{...item.Style.li,position:'relative'}}
                            onClick={item.fun ? ()=>item.fun(item) : (()=>{item.path && props.history.pushState(item,item.path)})}
                        >
                            {item.Style.ico &&
                            <span className="iconfonts icon" style={item.Style.S || {}}  dangerouslySetInnerHTML={{__html:item.Style.ico}}></span>}
                            <div className="LiTRight" style={item.R || {}}>
                                <div className="onece" style={item.Style.onece||{}}>
                                    {item.key && <span className="listValue" style={{flex:item.value || item.input ? 'none' : '1',...(item.Style.K ? item.Style.K :{} )}}>{item.key}</span>}
                                    {item.num && <span className="junNum">{item.num}</span> }
                                    {(item.value ||item.value==='')  && <span className="LValue" onClick={()=>{item.Vfun && item.Vfun(item)}} style={{flex:'1',textAlign:'right',...(item.Style.V ||{})}}>{item.value || item.val}</span>}


                                    {
                                        item.textarea && (

                                            item.disabled ? <textarea type={item.inputType || 'text'} disabled  placeholder={item.placeholder} defaultValue={item.val} value={item.val}   onClick={(e)=>{
                                            item.inputClick(item,index,e.target.value)
                                        }
                                        } style={{flex:'1',border:'0px',padding:'0 4vw',paddingTop:'0.3rem',overflow:'hidden',background:'#fff',resize:'none',
                                            ...(item.capital?{textTransform:'uppercase'}:{})
                                            }}></textarea>:<textarea type={item.inputType || 'text'}  placeholder={item.placeholder} defaultValue={item.val} value={item.val} onBlur={(e)=>{
                                                item.blur(item.capital ? e.target.value : e.target.value,index,item)
                                            }} onChange={(e)=>{
                                                item.change(item.capital ? e.target.value : e.target.value,index,item)
                                            }} onClick={(e)=>{
                                                item.inputClick(item,index,e.target.value)
                                            }
                                            } style={{flex:'1',border:'0px',padding:'0 4vw',paddingTop:'0.3rem',overflow:'hidden',background:'#fff',resize:'none',
                                                ...(item.capital?{textTransform:'uppercase'}:{})
                                            }}></textarea>
                                        )
                                    }
                                    {
                                        item.input && item.disabled && <input type={item.inputType || 'text'} disabled  placeholder={item.placeholder} defaultValue={item.val} value={item.val} maxLength={item.maxlength}  onClick={(e)=>{
                                            item.inputClick && item.inputClick(item,index,e.target.value)
                                        }
                                        } style={{flex:'1',border:'0px',padding:'0 4vw',overflow:'hidden',
                                            ...(item.capital?{textTransform:'uppercase'}:{})
                                        }}/>
                                    }
                                    {item.input && !item.disabled&& <input type={item.inputType || 'text'}  placeholder={item.placeholder} defaultValue={item.val} value={item.val} maxLength={item.maxlength} onBlur={(e)=>{
                                        item.blur &&item.blur(item.capital ? e.target.value : e.target.value,index,item)
                                    }} onChange={(e)=>{
                                        item.change && item.change(item.capital ? e.target.value : e.target.value,index,item)
                                    }} onClick={(e)=>{
                                        item.inputClick && item.inputClick(item,index,e.target.value)
                                    }
                                    } style={{flex:'1',border:'0px',padding:'0 4vw',overflow:'hidden',
                                        ...(item.capital?{textTransform:'uppercase'}:{})
                                    }}/>}

                                    {item.buttonR2 && <span onClick={()=>item.b2fun && item.b2fun(item.val)} className="buttonRight backImg">{item.buttonR2}</span> }
                                    {item.buttonR && <span onClick={()=>item.bfun && item.bfun(item.val)} className="buttonRight">{item.buttonR}</span> }

                                    {item.radio &&
                                        item.radio.map((m,d)=>{
                                            return(
                                                <label htmlFor={m.name} style={{flex:'1',display:'flex',alignItems: 'center'}}>
                                                    <span>{m.key}</span>
                                                    <span style={{
                                                        display:'flex',alignItems: 'center',
                                                        width:'0.3rem',height:'0.3rem',
                                                        ...(props.T.state.partList &&
                                                            props.T.state.partList[item.newData.lineNo] &&
                                                            props.T.state.partList[item.newData.lineNo][m.type]=='是' ?
                                                                {
                                                                    background:'url('+require('../images/yuanxing.png')+')',
                                                                    backgroundSize:'100% 100%'
                                                                } :
                                                                {
                                                                    background:'url('+require('../images/yuanxingwei.png')+')',
                                                                    backgroundSize:'100% 100% '
                                                                }
                                                        ),margin:'0 0.2rem'
                                                    }}><input  id={m.name} checked={ props.T.state.partList[item.newData.lineNo] && props.T.state.partList[item.newData.lineNo][m.type]=='是'} onChange={(e)=>{
                                                        var rideoValue="否"
                                                        if(e.target.checked){
                                                            //e.currentTarget.parentElement.style.background='url('+require('../images/yuanxing.png')+') 100% 100% 100%';
                                                           // e.currentTarget.parentElement.style.backgroundSize='cover';
                                                            rideoValue='是'
                                                        }else{
                                                            //e.currentTarget.parentElement.style.background='url('+require('../images/yuanxingwei.png')+')100% 100% 100%';
                                                            //e.currentTarget.parentElement.style.backgroundSize='cover';
                                                            rideoValue='否'
                                                        }
                                                        item.change(item,m.type,rideoValue)
                                                    }} type="checkbox" name={m.name} style={{width:'100%',height:'100%',opacity:'0'}}/></span>
                                                </label>
                                            )
                                        })
                                    }
                                    {item.valueR && <span >{item.valueR}</span>}
                                    {(item.Style.ico2 ||item.Style.ico2 =='') && <span className="iconfonts mar_R03"  dangerouslySetInnerHTML={item.Style.ico2==''?{__html:'&#xe607;'}:{__html:item.Style.ico2}}></span>}
                                </div>
                                {item.childes && <BaseLi {...props} data={item.childes} />}
                                {item.next}
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}
export const BaseLi1 =(props)=>{
    if(!props.data[0])return(<span></span>)
    return(
        <ul className="baseLi" style={props.style}>
            {
                props.data.map((item,index)=>{
                    item.Style || (item.Style={})
                    return(
                        <li className="style1" key={index} style={{...item.Style.li,position:'relative'}}
                            onClick={item.fun ? ()=>item.fun(item) : (()=>{item.path && props.history.pushState(item,item.path)})}
                        >
                            {item.Style.ico &&
                            <span className="iconfonts icon" style={item.Style.S || {}}  dangerouslySetInnerHTML={{__html:item.Style.ico}}></span>}
                            <div className="LiTRight" style={item.R || {}}>
                                <div className="onece" style={item.Style.onece||{}}>
                                    {item.key && <span className="listValue" style={{flex:item.value || item.input ? 'none' : '1',...(item.Style.K ? item.Style.K :{} )}}>{item.key}</span>}
                                    {item.num && <span className="junNum">{item.num}</span> }
                                    {(item.value ||item.value==='')  && <span className="LValue" onClick={()=>{item.Vfun && item.Vfun(item)}} style={{flex:'1',textAlign:'right',...(item.Style.V ||{})}}>{item.value || item.val}</span>}


                                    {
                                        item.textarea && (

                                            item.disabled ? <textarea type={item.inputType || 'text'} disabled  placeholder={item.placeholder} defaultValue={item.val} value={item.val}   onClick={(e)=>{
                                                item.inputClick(item,index,e.target.value)
                                            }
                                            } style={{flex:'1',border:'0px',padding:'0 4vw',paddingTop:'0.3rem',overflow:'hidden',background:'#fff',resize:'none',
                                                ...(item.capital?{textTransform:'uppercase'}:{})
                                            }}></textarea>:<textarea type={item.inputType || 'text'}  placeholder={item.placeholder} defaultValue={item.val} value={item.val} onBlur={(e)=>{
                                                item.blur(item.capital ? e.target.value : e.target.value,index,item)
                                            }} onChange={(e)=>{
                                                item.change(item.capital ? e.target.value : e.target.value,index,item)
                                            }} onClick={(e)=>{
                                                item.inputClick(item,index,e.target.value)
                                            }
                                            } style={{flex:'1',border:'0px',padding:'0 4vw',paddingTop:'0.3rem',overflow:'hidden',background:'#fff',resize:'none',
                                                ...(item.capital?{textTransform:'uppercase'}:{})
                                            }}></textarea>
                                        )
                                    }
                                    {
                                        item.input && item.disabled && <input type={item.inputType || 'text'} disabled  placeholder={item.placeholder} defaultValue={item.val} value={item.val} maxLength={item.maxlength}  onClick={(e)=>{
                                            item.inputClick && item.inputClick(item,index,e.target.value)
                                        }
                                        } style={{flex:'1',border:'0px',padding:'0 4vw',overflow:'hidden',
                                            ...(item.capital?{textTransform:'uppercase'}:{})
                                        }}/>
                                    }
                                    {item.input && !item.disabled&& <input type={item.inputType || 'text'}  placeholder={item.placeholder} defaultValue={item.val} value={item.val} maxLength={item.maxlength} onBlur={(e)=>{
                                        item.blur &&item.blur(item.capital ? e.target.value : e.target.value,index,item)
                                    }} onChange={(e)=>{
                                        item.change && item.change(item.capital ? e.target.value : e.target.value,index,item)
                                    }} onClick={(e)=>{
                                        item.inputClick && item.inputClick(item,index,e.target.value)
                                    }
                                    } style={{flex:'1',border:'0px',padding:'0 4vw',overflow:'hidden',
                                        ...(item.capital?{textTransform:'uppercase'}:{})
                                    }}/>}

                                    {item.buttonR2 && <span onClick={()=>item.b2fun && item.b2fun(item.val)} className="buttonRight backImg">{item.buttonR2}</span> }
                                    {item.buttonR && <span onClick={()=>item.bfun && item.bfun(item.val)} className="buttonRight">{item.buttonR}</span> }

                                    {item.radio &&
                                    item.radio.map((m,d)=>{
                                        return(
                                            <label htmlFor={m.name} style={{flex:'1',display:'flex',alignItems: 'center'}}>
                                                <span>{m.key}</span>
                                                <span style={{
                                                    display:'flex',alignItems: 'center',
                                                    width:'0.3rem',height:'0.3rem',
                                                    ...(props.T.state.partList &&
                                                        props.T.state.partList[item.newData.lineNo] &&
                                                        props.T.state.partList[item.newData.lineNo][m.type]=='是' ?
                                                            {
                                                                background:'url('+require('../images/yuanxing.png')+')',
                                                                backgroundSize:'100% 100%'
                                                            } :
                                                            {
                                                                background:'url('+require('../images/yuanxingwei.png')+')',
                                                                backgroundSize:'100% 100% '
                                                            }
                                                    ),margin:'0 0.2rem'
                                                }}><input  id={m.name} checked={ props.T.state.partList[item.newData.lineNo] && props.T.state.partList[item.newData.lineNo][m.type]=='是'} onChange={(e)=>{
                                                    var rideoValue="否"
                                                    if(e.target.checked){
                                                        //e.currentTarget.parentElement.style.background='url('+require('../images/yuanxing.png')+') 100% 100% 100%';
                                                        // e.currentTarget.parentElement.style.backgroundSize='cover';
                                                        rideoValue='是'
                                                    }else{
                                                        //e.currentTarget.parentElement.style.background='url('+require('../images/yuanxingwei.png')+')100% 100% 100%';
                                                        //e.currentTarget.parentElement.style.backgroundSize='cover';
                                                        rideoValue='否'
                                                    }
                                                    item.change(item,m.type,rideoValue)
                                                }} type="checkbox" name={m.name} style={{width:'100%',height:'100%',opacity:'0'}}/></span>
                                            </label>
                                        )
                                    })
                                    }
                                    {item.valueR && <span >{item.valueR}</span>}
                                    {(item.Style.ico2 ||item.Style.ico2 =='') && <span className="iconfonts mar_R03"  dangerouslySetInnerHTML={item.Style.ico2==''?{__html:'&#xe607;'}:{__html:item.Style.ico2}}></span>}
                                </div>
                                {item.childes && <BaseLi {...props} data={item.childes} />}
                                {item.next}
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}
/**模态蒙层**/
export const MoTai =(props)=>{
    return(
        <div className="MoTai">
           {props.children}
        </div>
    )
}
/*关闭主要和蒙层一起用*/
export const Close =(props)=>{
    return(
        <div style={{textAlign:'center'}}>
            <span className="iconfonts closeAll" onClick={()=>{props.T.setState({tishi:false})}}>&#xe604;</span>
        </div>
    )
}
/**退出登陆**/
export const GoOut =(props)=>{
    return (
        <div className="SetUpbutton" onClick={()=>{
            var data = JSON.parse(localStorage.getItem(props.project.getQuery()))
            data.password=''
            localStorage.setItem(props.project.getQuery(), JSON.stringify(data));
            props.history.pushState(null, "/login");
        }}><button>退出登录</button></div>
    )
}
//蓝底提示窗口
export const SubmitOk =(props)=>{
    return(
        <div className="SSOK">
            <div>
                <span className="gogoStyle"></span>
                <p>{props.showData.text}</p>
            </div>
            <div className="buttomStyle">
                <button
                    onClick={()=>props.showData.butFun && props.showData.butFun()}
                >{props.showData.button}</button>
                <div>
                    <span onClick={()=>props.showData.lefFun && props.showData.lefFun()}>{props.showData.leftT}</span>
                    <span onClick={()=>props.showData.rigFun && props.showData.rigFun()}>{props.showData.rightT}</span>
                </div>
            </div>
        </div>
    )
}


/*搜索框*/
export const statelessBaseJson={
    InfoTitle:(props)=>{
        return(
            <div className="BaseTitle">
                <h4 className={props.data.Lcolor && 'L'} style={{borderLeft:'2px solid '+props.data.Lcolor}}>{props.data.key}</h4>
                {props.data.butR && props.data.butR}
            </div>
        )
    },
    SelectInput: class extends React.Component{
        constructor(props) {
            super(props);
            this.state = {}
        }
        componentDidMount() {
            $("#selectInput").keydown((event)=>{
                if(event.keyCode == 13){
                    this.props.search(this.state.value,null)
                }
            });
        }
        render(){
            let Style=this.props.Style || {}
            return(
                <div className="selectInput" style={Style.Box||{}}>
                    <div className="inputT" style={Style.input||{}}>
                        <span style={Style.S||{}} className="iconfonts" onClick={this.props.search && this.props.search.bind(null,this.state.value)}>&#xe634;</span>
                        <input type="text" id="selectInput" style={Style.input||{}}
                               placeholder={this.props.placeholder}
                               value={this.state.value} onChange={(e)=>{this.setState({value:e.target.value});this.props.change(e.target.value)}} onBlur={this.props.blur} onFocus={(e)=>{this.setState({quxiao:true});this.props.focus(e)}} />
                        {this.state.value && <span style={Style.C||{}} className="iconfonts" onClick={(e)=>this.setState({value:''})}>&#xe604;</span>}
                    </div>
                    {this.state.quxiao && <span style={Style.Q||{}} className="Close" onClick={()=>{this.setState({quxiao:false,value:''});this.props.close()}}>取消</span>}
                </div>
            )
        }
    },
    BaseSubmit:(props)=>{
        return(
            <div style={{width:'100vw',height:'1rem',marginTop:'0.5rem',...(props.BoxStyle || {})}}>
                <button onClick={props.submit} style={{border:'0px',width:'100%',height:'1rem',position:'fixed',bottom:'0px',left:'0px',background:'#4680f7',color:'#fff',...(props.Style || {})}}>{props.value || '提交'}</button>
            </div>
        )
    },
    BaseSubmits:(props)=>{
        let style=props.style || {}
        return(
            <div style={{width:'100vw',height:'1rem',marginTop:'0.5rem'}}>
                <div style={{display:'flex',border:'0px',width:'100%',height:'1rem',position:' fixed',bottom:'0px',left:'0px',background:'#fff'}}>
                    <div  style={{display:'flex',border:'0px',width:'100%',height:'1rem',position:' fixed',bottom:'0px',left:'0px',background:'#fff',...(style.box || {})}}>
                        {props.submits.map((item,index)=>{
                            if(!item)return('')
                            return(
                                <button key={index} style={{flex:'1',height:'100%',border:'0px',background:'#4680f7',color:'#fff'
                                    ,...(style.button || {}),...(item.style || {})}} onClick={()=>item.fun && item.fun()}>{item.value || '提交'}</button>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    },
    BaseLi:BaseLi,
    TopList:class extends React.Component{
        constructor(props) {
            super(props);
            this.state = {}
            this.clickItem=(e)=>{
                var leftNum =(e.currentTarget.offsetLeft+(e.currentTarget.offsetWidth-this.refs.heng.offsetWidth)/2)+'px';
                this.refs.heng.style.left=leftNum;
            }
        }
        componentDidMount() {
            // this.refs.span0.click();
            // setTimeout(()=>this.props.defaultFun && this.props.defaultFun(),1000)
            // this.props.defaultFun && this.props.defaultFun();
        }
        componentDidUpdate(){
            /*if(this.props.location.state){
                if(this.props.location.state.where==''){
                    this.refs['spandef']=this.refs['span0']
                }else if(this.props.location.state.where=='100'){
                    this.refs['spandef']=this.refs['span1']
                }else if(this.props.location.state.where=='101'){
                    this.refs['spandef']=this.refs['span2']
                }else if(this.props.location.state.where=='102'){
                    this.refs['spandef']=this.refs['span3']
                }else if(this.props.location.state.where=='103'){
                    this.refs['spandef']=this.refs['span4']
                }
            }else{
                this.refs['spandef']=this.refs['spandef']
            }*/
            if(this.refs.heng){
                var er=this.refs['spandef'] || this.refs['span0']
                var leftNum =(er.offsetLeft+(er.offsetWidth-this.refs.heng.offsetWidth)/2)+'px';
                this.refs.heng.style.left=leftNum;
            }
        }
        render() {
            var style=this.props.Style ||{}
            return (
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.3rem 0.35rem', background: '#fff',position:'relative',
                    boxShadow:'1px 1px 10px rgba(197, 193, 193, 0.34)',
                    ...(style.BStyle)
                }}>
                    {
                        this.props.datas.map((item,index)=>{
                            if(item.isvalue && this.refs.heng){
                               /* var er=this.refs['span'+index]
                                var leftNum =(er.offsetLeft+(er.offsetWidth-this.refs.heng.offsetWidth)/2)+'px';
                                this.refs.heng.style.left=leftNum;*/
                            }else{

                            }
                            return(
                                <span key={index} ref={'span'+(item.isvalue?'def':index)} style={{textAlign:'center',...item.style}} onClick={(e)=>{this.clickItem(e);item.fun && item.fun()}}>{item.text}</span>
                            )
                        })
                    }
                    { !this.state.noHeng &&
                        <i ref="heng" style={{
                            width:'0.3rem',height:'0px',height:'1px',background:'#666',borderRadius:'1px',
                            position:'absolute',bottom:'0.2rem',left:'0',transition:'left 300ms',...(this.props.IStyle || {})
                        }}></i>
                    }
                </div>
            )
        }
    },
    TopList1:class extends React.Component{
        constructor(props) {
            super(props);
            this.state = {}
            this.clickItem=(e)=>{
                var leftNum =(e.currentTarget.offsetLeft+(e.currentTarget.offsetWidth-this.refs.heng.offsetWidth)/2)+'px';
                this.refs.heng.style.left=leftNum;
            }
        }
        componentDidMount() {
            // this.refs.span0.click();
            // setTimeout(()=>this.props.defaultFun && this.props.defaultFun(),1000)
            // this.props.defaultFun && this.props.defaultFun();
        }
        componentDidUpdate(){
                if(this.props.location.state.where==''){
                    this.refs['spandef']=this.refs['span0']
                }else if(this.props.location.state.where=='100'){
                    this.refs['spandef']=this.refs['span1']
                }else if(this.props.location.state.where=='101'){
                    this.refs['spandef']=this.refs['span2']
                }else if(this.props.location.state.where=='102'){
                    this.refs['spandef']=this.refs['span3']
                }else if(this.props.location.state.where=='103'){
                    this.refs['spandef']=this.refs['span4']
                }
            console.log(this.refs['spandef'])
            if(this.refs.heng){
                var er=this.refs['spandef']
                var leftNum =(er.offsetLeft+(er.offsetWidth-this.refs.heng.offsetWidth)/2)+'px';
                this.refs.heng.style.left=leftNum;
            }
        }
        render() {
            var style=this.props.Style ||{}
            return (
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.3rem 0.35rem', background: '#fff',position:'relative',
                    boxShadow:'1px 1px 10px rgba(197, 193, 193, 0.34)',
                    ...(style.BStyle)
                }}>
                    {
                        this.props.datas.map((item,index)=>{
                            if(item.isvalue && this.refs.heng){
                               /* var er=this.refs['span'+index]
                                var leftNum =(er.offsetLeft+(er.offsetWidth-this.refs.heng.offsetWidth)/2)+'px';
                                this.refs.heng.style.left=leftNum;*/
                            }else{

                            }
                            return(
                                <span key={index} ref={'span'+(item.isvalue?'def':index)} style={{textAlign:'center',...item.style}} onClick={(e)=>{this.clickItem(e);item.fun && item.fun()}}>{item.text}</span>
                            )
                        })
                    }
                    { !this.state.noHeng &&
                        <i ref="heng" style={{
                            width:'0.3rem',height:'0px',height:'1px',background:'#666',borderRadius:'1px',
                            position:'absolute',bottom:'0.2rem',left:'0',transition:'left 300ms',...(this.props.IStyle || {})
                        }}></i>
                    }
                </div>
            )
        }
    },

    ListInfo:class extends React.Component{
        constructor(props) {
            super(props);
            this.state = {widthData:[]}
        }
        componentDidMount(){
            setTimeout(()=>this.setState({widthData:this.state.widthData,a:Math.random()}),300)
        }
        componentDidUpdate(){
            //this.setState({widthData:this.state.widthData})
        }
        render(){

            return(
                <div>
                    {
                        this.props.DataList.map((item,index)=>{
                            return(
                                <ul className={this.props.className || ''} key={index} style={{
                                    display:'flex',alignItems:'center',justifyContent:'center',
                                    background:index%2==0?'#fff':'#f4f8fb',padding:'0.2rem 0.15rem',
                                    ...(index==0 ? {fontWeight:'600'}:{})
                                }}>
                                    {
                                        this.props.orderArr && this.props.orderArr.map((item2,index2)=>{
                                            item[item2] && item[item2].length > (this.state.widthData[index2] || 0) && (this.state.widthData[index2]=item[item2].length);
                                            item2=='checkbox' && (this.state.widthData[index2]='none')
                                            return(
                                                <li  className='aaa' style={{flex:this.state.widthData[index2],display:'flex',justifyContent:'center'}} key={index2}>

                                                    {
                                                        item2=='checkbox' ? <this.props.checkbox disabled={item.disabled} index={index} checked={item.checked}
                                                                                                 change={this.props.checkBoxChange}
                                                            />:
                                                        item[item2]
                                                    }
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            )
                        })
                    }
                </div>
            )
        }
    },
    ListInfo1:class extends React.Component{
        constructor(props) {
            super(props);
            this.state = {widthData:[]}
        }
        componentDidMount(){
            setTimeout(()=>this.setState({widthData:this.state.widthData,a:Math.random()}),300)
        }
        componentDidUpdate(){
            //this.setState({widthData:this.state.widthData})
        }
        render(){

            return(
                <div>
                    {
                        this.props.DataList.map((item,index)=>{
                            return(
                                <ul className={this.props.className || ''} key={index} style={{
                                    display:'flex',alignItems:'center',justifyContent:'center',
                                    background:index%2==0?'#fff':'#f4f8fb',padding:'0.2rem 0.15rem',
                                    ...(index==0 ? {fontWeight:'600'}:{})
                                }}>
                                    {
                                        this.props.orderArr && this.props.orderArr.map((item2,index2)=>{
                                            var style=[
                                                {width:'0.8rem',textAlign:'center'},{flex:'1',padding:'0 0.2rem',textAlign:'center'},{width:'1.1rem',textAlign:'center'},{width:'1.2rem',textAlign:'center'},{width:'1.2rem',textAlign:'center'},
                                                {width:'0.8rem',textAlign:'center'},{width:'0.8rem',textAlign:'center'}
                                            ]
                                            // item[item2] && item[item2].length > (this.state.widthData[index2] || 0) && (this.state.widthData[index2]=item[item2].length);
                                            // item2=='checkbox' && (this.state.widthData[index2]='none')
                                            return(
                                                <li  className='aaa' style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'0.5rem',...style[index2]}} key={index2}>
                                                {/*<li  className='aaa' style={{flex:this.state.widthData[index2],display:'flex',justifyContent:'center',textAlign:'center'}} key={index2}>*/}

                                                    {
                                                        item2=='checkbox' ? <this.props.checkbox disabled={item.disabled} index={index} checked={item.checked}
                                                                                                 change={this.props.checkBoxChange}
                                                            />:
                                                            item[item2]
                                                    }
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            )
                        })
                    }
                </div>
            )
        }
    },
    ListInfo2:class extends React.Component{
        constructor(props) {
            super(props);
            this.state = {widthData:[]}
        }
        componentDidMount(){
            setTimeout(()=>this.setState({widthData:this.state.widthData,a:Math.random()}),300)
        }
        componentDidUpdate(){
            //this.setState({widthData:this.state.widthData})
        }
        render(){

            return(
                <div>
                    {
                        this.props.DataList.map((item,index)=>{
                            return(
                                <ul className={this.props.className || ''} key={index} style={{
                                    display:'flex',alignItems:'center',justifyContent:'center',
                                    background:index%2==0?'#fff':'#f4f8fb',padding:'0.2rem 0.15rem',
                                    ...(index==0 ? {fontWeight:'600'}:{})
                                }}>
                                    {
                                        this.props.orderArr && this.props.orderArr.map((item2,index2)=>{
                                            var style=[
                                                {flex:'1',padding:'0 0.2rem'},{width:'1rem'},{width:'0.8rem'},{width:'0.8rem'},
                                                {width:'0.8rem'},{width:'1.5rem'},{width:'0.5rem',position:'fixed',right:'0'},
                                            ]
                                            return(
                                                <li  className='aaa' style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'0.5rem',...style[index2]}} key={index2}>

                                                    {
                                                        item2=='checkbox' ? <this.props.checkbox disabled={item.disabled} index={index} checked={item.checked}
                                                                                                 change={this.props.checkBoxChange}
                                                            />:item2=='bj'&&item[item2]==true?<span className="ajxxbj" onClick={this.props.delt.bind(this,item)}></span>:
                                                            item2=='bj'&&item[item2]!=true?<span></span>:
                                                            item[item2]
                                                    }
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            )
                        })
                    }
                </div>
            )
        }
    },
    /*EvalInfo:class extends React.Component {
       constructor(props) {
           super(props);
           this.state = {
               typeArr:this.props.ListArr ||[]
           }
       }
       componentWillMount(){

       }
       componentDidMount(){
           console.log(this.refs.changes)
           if(this.refs.changes){
               this.refs.changes.style.contenteditable='true'
           }
       }
       render(){
           console.log(this.props.ListArr)
           var typeArr=this.props.ListArr||[]
           return(
               <div style={{padding: '0.2rem 0',...(this.props.style||{})}}>
                   {typeArr[1]? typeArr.map((item,index)=>{
                           return(
                               <div key={index}>
                                   <ul style={{
                                       display:'flex',justifyContent:'space-between',overflow:'hidden',
                                       ...(index==0 ? {fontWeight:600}:{})
                                   }}>
                                       {item.data1.map((item1,index1)=>{
                                           console.log(item1)
                                           var style=[
                                               {flex:'1',padding:'0 0.2rem'},{flex:'1'},{width:'1rem'},
                                               {width:'1rem'},{width:'1rem'},{width:'1.5rem'},
                                           ]
                                           return(
                                               <li  className='aaa' style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'0.5rem',...style[index1]}} key={index1}>
                                                   {
                                                       item1=='checkbox' ? <this.props.checkbox disabled={item1.disabled} index={index1} checked={item1.checked}
                                                                                                change={this.props.checkBoxChange}
                                                           />:
                                                           {item1}
                                                   }
                                               </li>
                                               // <li key={index1} style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'0.5rem',...style[index1]}}>{item1}</li>
                                           )
                                       })}
                                   </ul>
                                   {item.data2 && (<ul style={{
                                       overflow:'hidden',background:'#f4f8fb',padding:'0.08rem 0.3rem',
                                       margin:'0 0.15rem',display:'flex',justifyContent:'space-between'
                                   }}>
                                       {
                                           item.data2.map((item2,index2)=>{
                                               return(
                                                   <li key={index2} style={{margin:'0.08rem 0'}} onClick={()=>item2.type=='glf' && this.props.glfFun && this.props.glfFun(item,index)}>
                                                       <span>{item2.key}</span>
                                                       {
                                                           item2.vChang?
                                                               <span><input style={{width:'0.8rem',height:'0.5rem',border:'1px solid #ccc',display:'inline-block',marginLeft:'0.08rem'}} type="number" onChange={this.props.change.bind(this,index)} value={parseInt(item.data.ManageFeePct*100)} />%</span>:<span>{item2.value}</span>
                                                       }

                                                   </li>
                                               )
                                           })
                                       }
                                   </ul>)}
                               </div>
                           )
                       }):
                       this.props.ErrorShow({type:'p',content:'暂无换件信息'})
                   }
               </div>
           )
       }
   },*/
    ListInfo3:class extends React.Component{
        constructor(props) {
            super(props);
            this.state = {widthData:[]}
        }
        componentDidMount(){
            setTimeout(()=>this.setState({widthData:this.state.widthData,a:Math.random()}),300)
        }
        componentDidUpdate(){
            //this.setState({widthData:this.state.widthData})
        }
        render(){

            return(
                <div>
                    {
                        this.props.DataList.map((item,index)=>{
                            return(
                                <ul className={this.props.className || ''} key={index} style={{
                                    display:'flex',alignItems:'center',justifyContent:'center',
                                    background:index%2==0?'#fff':'#f4f8fb',padding:'0.2rem 0.15rem',
                                    ...(index==0 ? {fontWeight:'600'}:{})
                                }}>
                                    {
                                        this.props.orderArr && this.props.orderArr.map((item2,index2)=>{
                                            var style=[
                                                {width:'1.2rem',padding:'0 0.2rem'},{flex:'1'},{width:'1.2rem'},
                                                {width:'1rem'},{width:'1rem'},{width:'0.8rem'},
                                            ]
                                            return(
                                                <li  className='aaa' style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'0.5rem',...style[index2]}} key={index2}>

                                                    {
                                                        item2=='yb'&&item[item2]=='com'?<span className="iconfonts" onClick={this.props.yb.bind(this,item)}>&#xe607;</span>:
                                                                item[item2]
                                                    }
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            )
                        })
                    }
                </div>
            )
        }
    },
    SelectLikeIos1:class extends React.Component{
        constructor(props){
            super(props);
            this.state = {where:1}
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
        }
        comppnentWillMount(){
            console.log(this.props)
        }
        render(){

            return(
                <div style={{flex:1,position:'relative',overflow:'hidden'}}>
                    <ul className='sfdiv'>
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
                </div>
            )
        }
    },
    SelectLikeIos:class extends React.Component{
        constructor(props){
            super(props);
            this.state = {where:1}
            this.setInt=()=>{
                this.setState({where:this.state.where+0.1},()=>{
                    setTimeout(()=>{
                        this.setInt()
                    },100)
                })
            }
            this.TouchMove=(index,e)=>{
                e.preventDefault();e.stopPropagation();
                const old = this.state.old;
                var moveX=e.touches[0].clientX;var moveY=e.touches[0].clientY;
                var distX=moveX-old[index].startX,distY=moveY-old[index].startY

                var item=this.props.dataList[index]

                if(item.length<10 && (this.state.where-distY/100)%360<=this.state.datalength){
                    return
                }
                this.setState({where:this.state.where-distY/100})
            }
            this.TouchStart=(index,e)=>{
                this.props.setProps({otherMove:true})
                const old = this.state.old||[];
                let startX=e.touches[0].clientX;let startY=e.touches[0].clientY;
                old[index]={startX:startX,startY:startY}
                this.setState({old:old})
            }
            this.liClick=(item,e)=>{
                if(!item[this.props.defVal])return;
                this.close();
                this.props.Selected && this.props.Selected(item);
            }
            this.close=()=>{
                this.setState({closeit:false},()=>{
                    setTimeout(()=>{
                        this.props.setProps({showBase:''})
                    },500)
                })
            }
            this.select=()=>{
                for(var i in this.props.dataList){
                    if(this.props.dataList[i]){
                        for(var j in this.props.dataList[i]){
                            if(this.props.dataList[i][j]){
                                try{
                                    var deg=parseFloat(this.refs[i+'k'+j].style.transform.split('rotateX(')[1]);
                                    if(deg>=0&&deg<360/this.props.dataList[i].length){
                                        this.liClick(this.props.dataList[i][j])
                                    }
                                    // this.liClick(this.props.dataList[i][j])
                                }catch (e){

                                }
                            }
                        }
                    }
                }
            }
        }
        componentDidMount() {
            this.setState({closeit:true});
        }
        componentWillMount(){
            this.setState({datalength:this.props.dataList[0].length})
        }
        render(){
            console.log(this.props)
            return(
                <div style={{position:'fixed',width:'100%',height:'0rem',bottom:'0px',display:'flex',
                    flexFlow:'column',overflow:'hidden',background:"#fff",transition:'height 500ms',
                    ...(this.state.closeit ? {height:'5rem'}:{height:'0px'})
                }}>
                    <div style={{display:'flex',padding:'0.25rem 0.25rem',alignItems:'center',
                        justifyContent:'space-between',width:'100%',borderBottom:'0.01rem solid #ccc',position:'relative',zIndex:999
                    }}>
                        {!this.props.noDefault &&<span style={{color:'#108EE9',fontSize:'16px'}} onClick={this.close}>取消</span>}
                        {!this.props.noDefault &&<span style={{color:'#108EE9',fontSize:'16px'}} onClick={this.select}>确定</span>}
                        {this.props.myButton}
                    </div>
                    <div style={{flex:1,display:'flex',}}>
                        {
                            this.props.dataList.map((item,index)=>{
                                if(item.length<10){
                                    for(var i=item.length;i<10;i++){
                                        item.push({})
                                    }
                                }
                                return(
                                    <ul onTouchMove={this.TouchMove.bind(this,index)} onTouchStart={this.TouchStart.bind(this,index)} key={index} style={{display:'flex',flex:'1',alignItems:'center',flexFlow:'column',position:'relative'}}>
                                        {item.map((item2,index2)=>{
                                            var deg=(360/item.length*index2+10*this.state.where)%360
                                            item2.deg=deg;item2.index=index2;
                                            return(
                                                <li ref={index+'k'+index2} key={index2}
                                                    style={{background:'#fff',
                                                        width:'100%',display:'flex',justifyContent:'center',alignItems:'center',height:'40px',textAlign:'center',
                                                        transform:'rotateX('+deg+'deg) translateZ('+item.length*40/3.14/2+'px)',...(deg>90 && deg<270?{opacity:0,zIndex:0}:{zIndex:99} ),
                                                        position:'absolute',width:'100%',left:'0px',top:'50%',marginTop:'-20px',...(deg>=0&&deg<360/item.length?{borderTop:'0.01rem solid #ccc',borderBottom:'0.01rem solid #ccc',color:'#000'}:{})
                                                    }}
                                                    onClick={this.liClick.bind(this,item2)}
                                                ><span style={deg >180 &&deg>90 ? { transform:'rotateX(360deg)'}:{}}>{item2[this.props.defVal]}</span></li>
                                            )
                                        })}
                                    </ul>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
    },

    checkbox:class extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                inputStyle:{
                    width:'100%',height:'100%',position:'absolute',left:'0px',top:'0px',opacity:'0'
                },
            }
            this.change=(e)=>{
                if(e.target.checked){

                }else{

                }
                this.props.change(e.target.checked,this.props.index,e)
            }
        }
        render() {
            let img={
                checked:this.props.checked ? {background:'url('+require('../images/fangxing.png')+')',backgroundSize:'100% 100%'}:{background:'url('+require('../images/fangxingwei.png')+')',backgroundSize:'100% 100% '},
                disabled:this.props.disabled ? {background:'url('+require('../images/cantChick@3x.png')+')',backgroundSize:'100% 100%'} :{}
            }
            return (
                <span style={{width:'0.3rem',height:'0.3rem',position:'relative',...img.checked,...img.disabled}}>
                {this.props.checked &&<input style={this.state.inputStyle} type="checkbox" onChange={this.change} checked={this.props.checked}/>}
                {!this.props.checked &&
                    this.props.disabled ?
                    <input style={this.state.inputStyle} checked={this.props.checked} type="checkbox" disabled onChange={this.change}/>:
                    <input style={this.state.inputStyle} checked={this.props.checked} type="checkbox" onChange={this.change}/>
                }

            </span>
            )
        }
    },
    UserHeader:UserHeader,
}