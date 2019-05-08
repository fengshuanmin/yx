import React from 'react'
import Logical from './Stateless';
import $ from 'jquery'
require('../css/Logical.css')
export class LoadList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onStart=()=>{
            this.refs.loadMore.style.transition='0ms'
            this.refs.Reload.style.transition='0ms'
            this.refs.recordBox.style.transition='0ms'
            this.setState({
                nowTop:this.refs.recordBox.offsetTop*1
            })
        }
        this.onBottom=(a,b)=>{
            /*console.log(this.refs.recordBox)*/
            this.refs.recordBox.style.position='relative'
            a<0 && (this.refs.recordBox.style.top=(a*1+this.state.nowTop)+'px')
            this.refs.loadMore.style.display='inline-block'
            this.refs.loadMore.style.bottom=-(a*1+this.state.nowTop)-(this.refs.loadMore.offsetHeight+20)+'px'
            this.setState({moveType:'onBottom'})
        }
        this.onTop=(a,b)=>{
            /*console.log(this.refs.recordBox)*/
            this.refs.recordBox.style.position='relative'
            a>0 && (this.refs.recordBox.style.top=(a*1+this.state.nowTop)+'px');
            this.refs.Reload.style.display='inline-block'
            this.refs.Reload.style.top=(a*1+this.state.nowTop-this.refs.Reload.offsetHeight-50)+'px'
            this.setState({moveType:'onTop'});
        }
        this.onEnd=(a,b)=>{
            this.refs.loadMore.style.transition='top 100ms'
            this.refs.Reload.style.transition='top 100ms'
            this.refs.recordBox.style.transition='top 100ms'
            this.state.moveType=='onTop' && this.Reload();
            this.state.moveType=='onBottom' && this.loadMore();
        }
        this.Reload=()=>{
            this.refs.Reload.style.display='inline-block'
            this.refs.Reload.style.top=20+'px';
            this.refs.recordBox.style.top=this.refs.Reload.offsetHeight+40+'px';
            if(this.props.Reload) {
                this.props.Reload((ab) => {
                    this.setState({moveType: ''})
                    this.loadOver(ab)
                })
            }else{
                console.log(this.props,'reload')
                var datas=this.props.project.loadParam || {};
                console.log(datas)
                datas.data.pageNo=1;
                datas.data.pageNum=1;
                datas.data.page=1;
                datas.data.limit=10;
                datas.data.abTo=(datas.data.abTo || 1)+1
                this.props.project.setProps({loadParam:datas},()=>{
                    this.loadAjax('Reload');
                })
            }
        }
        this.loadMore=()=>{
            this.refs.loadMore.style.bottom=(20)+'px'
            this.refs.recordBox.style.top=-this.refs.loadMore.offsetHeight-40+'px';
            if(this.props.loadMore){
                this.props.loadMore((ab)=>{
                    this.setState({moveType:''})
                    this.loadOver(ab)
                })
            }else{
                console.log(this.props,'loadMore')
                var datas=this.props.project.loadParam ||{};
                datas.data.pageNo+=1;
                datas.data.pageNum+=1;
                datas.data.page+=1;

                this.props.project.setProps({loadParam:datas},()=>{
                    this.loadAjax('loadMore')
                })
            }
        }
        this.onMove=(ab,c)=>{
            var up;
            if(ab>0) {
                up = true
            }else{
                up=false
            }
            this.props.T.setState({onMove:{up:up,where:c,oTop:this.refs.recordBox.offsetTop}})
           /* console.log(this.refs.recordBox.offsetTop)*/
        }
        this.loadOver=(ab)=>{
            this.refs.loadMore.style.transition='top 900ms'
            this.refs.Reload.style.transition='opacity 900ms'
            this.refs.recordBox.style.transition='top 900ms'
            this.refs.loadMore.style.display='none'
            this.refs.Reload.style.display='none'
            this.refs.recordBox.style.top=0+'px';
            if(ab==0){
                this.setState({isNone:true,moveType:false})
            }else{
                this.setState({isNone:false,moveType:false})
            }
        }
        this.loadAjax=(add)=>{
            this.setState({loadOk:false})
            $.ajax({
                url: this.props.project.loadParam.url,
                data: this.props.project.loadParam.data,
                dataType: "json",
                type:'post',
                success: (msg) => {
                    this.props.dataReform(msg,add,this.props.project.loadParam.type || '');
                    this.loadOver(msg.length);
                    this.setState({loadOk:true})
                },
                error: (xhr, status, err) => {
                    this.setState({loadOk:true})
                    this.loadOver(0)
                    //console.error(this.props.url, status, err.toString());
                }
            })
        }
    }
    componentWillMount(){
        console.log(this.props)
        this.props.setProps({
            onBottom:false,
            onTop:false,
            onStart:false,
            onEnd:false,
            onMove:false
        },()=>{
            this.props.setProps({
                onBottom:this.onBottom,
                onTop:this.onTop,
                onStart:this.onStart,
                onEnd:this.onEnd,
                onMove:this.onMove
            },()=>{
                this.props.T.setState({
                    Logical:this
                },()=>{
                    this.props.T.dataReform && this.props.T.dataReform(null,'loadFirst')
                })
            })
        })
    }
    componentWillUnmount(){
        this.props.project.setProps({
            onBottom:false,
            onTop:false,
            onStart:false,
            onEnd:false,
            onMove:false,
            loadParam:false
        })
    }
    render() {
        console.log(this.props)
        return (
            <div className="recordBox" style={{position:'relative'}} >
                <span className="Reload" ref="Reload"></span>
                <div className="recordList" ref="recordBox" style={{position:'relative'}}>
                    {this.props.children  ? this.props.children :(this.state.loadOk && this.props.T.props.ErrorShow({type:'zanwu',content:'暂无数据'}))}
                    {this.state.isNone &&<div className="buttonNone"><p>已经到底了</p></div>}
                </div>
{/*
                <p ref="myDX" style={{textAlign:'center',display:'none'}}>您已触及我的底线</p>
*/}
                <span className="loadMore" ref="loadMore"></span>
            </div>
        )
    }
}



export class newComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}

