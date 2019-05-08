import React from 'react';
import $ from 'jquery'
import {Prompt,PublicHeader} from './assembly/someAssembly'
import someEvent from './baseFun/someEvent'
import smallFunction from './baseFun/smallFunction'
import wxConfig from '../config/WXConfig'
import {statelessBaseJson} from './assembly/Stateless'
require('./css/style.css');
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setProps:'',
            user:{
                data:{
                    LxAqYhxxb:{},
                    LxAqZz:{},
                }
            },
            OK:true,
            isSHU:true,
            changeTitle:someEvent.ChangeTitle,
            showBase:''
        };
        this.touchStart=(e)=>{someEvent.touchStart(e,this)}
        this.touchMove=(e)=>{someEvent.touchMove(e,this)}
        this.touchEnd=(e)=>{someEvent.touchEnd(e,this)}

        this.hengshuping=()=>{
            if(window.orientation==180||window.orientation==0){
                this.setState({isSHU:true})
            }
            if(window.orientation==90||window.orientation==-90){
                this.setState({isSHU:false})
            }
        }
    }
   /* ParentComponent(props){
        return props.children
    }*/
    componentDidMount(){
        someEvent.GetUserInfo(this);//获取用户信息
        someEvent.ajaxEvent(null,this);//ajax转圈圈
        this.setState({index:this});
        $(window).resize(()=>{
            this.setState({winHeight:$(window).height()})
        });
        window.onresize =function(){
        }
        this.hengshuping()
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", this.hengshuping, false);
    }
    componentWillMount(){
        $('body').on('touchmove', function (event) {event.preventDefault();});
        _$=$;var _this=this;
        wxConfig.getSignature(this);
        this.setState({
            setProps:(a,b)=>{
                var oldState=this.state;
                var newState = Object.assign({},this.state,a);
                this.setState(newState,()=>{
                    if(b){
                        b(this);
                    }
                })
            },
            setScroll:(a)=>{
                this.refs.bodyIndex.style.transition='top 0s';
                this.refs.bodyIndex.style.top=a+'px';
            },
            resetScroll:()=>{
                // console.log(
                //     this.refs.bodyIndex.offsetHeight,
                //     this.refs.bodyIndex.offsetTop,
                //     $(window).height(),
                //     )
                setTimeout(()=>{
                    if(this.refs.bodyIndex && (-this.refs.bodyIndex.offsetTop)+$(window).height() > this.refs.bodyIndex.offsetHeight){
                        this.refs.bodyIndex.style.top=$(window).height()-this.refs.bodyIndex.offsetHeight+'px';
                    }
                },200)
            },
            baseUrl:'http://www.toumingxiuche.cn',
            ...smallFunction(this),
            ...statelessBaseJson,

        })
    }
    componentWillReceiveProps(){
        this.state.setScroll(0)
        this.setState({childrens:this.props.children})
        // console.log(window.history)
    }
    render() {
        return(
            <div className="appRouter" style={{height:this.state.winHeight || $(window).height(),position:'relative',overflow:'hidden',background:'#f5f5f5'}}>
                {/*<PublicHeader {...this.state}/>      && this.state.wxConfig*/}

                    <div  className={"routerContainer "+(!this.state.isSHU && 'disNone')} ref="bodyIndex"
                         style={{position: 'relative', minHeight: '100%', height: 'initial', overflow: 'hidden'}}
                         onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd}>
                        {this.state.OK && this.props.children && React.cloneElement(this.props.children, {
                            project: this.state,...this.state
                        })}

                    </div>
                    <div className={'mtbtmd '+(this.state.isSHU && 'disNone')}>
                        请竖屏看
                    </div>

                <Prompt T={this} data={this.state.PromptData || {}}/>
                {this.state.showBase}
            </div>
        )
    }
}