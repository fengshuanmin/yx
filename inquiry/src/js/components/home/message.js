import React from 'react';
import $ from 'jquery';
require('../../../css/message.css')
import {LoadList} from '../../../../../common/assembly/Logical'
import {DSYButton} from '../../../../../common/assembly/someAssembly'
/**残件列表**/
export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reqParam:{url:'/server/lexiu3-app/business/tmxcmsginfo/applist',data:{page:1,showChannel:'3',showRoleType:'9',limit:'10'}},
            caseList:[],
            orderList:[],
            data:[]
        };
        this.dataReform=(datas,type,im)=>{
            console.log(datas)
            var dat=[]
            if(datas && datas.code=='0') {
                dat = (datas.page.list && datas.page.list) || [], im = im || 'bm'
                var datArr = {
                    bm: {datArr: ['plateNo', 'cxmc'], path: '/inquiry/info'}
                }
            }
            var newData;
            switch(type){
                case 'loadMore':
                    newData=this.state.data.concat(dat)
                    break;
                case 'Reload':
                    newData=dat;
                    break;
                case 'loadFirst':
                    newData=[]
                    this.loadList('bm','','','firstJJkbsdfsdfsdfsdfser35345t')
                    break;
                default:
            }
            console.log(newData)
            this.setState({data:newData,loadingOk:true,tishiyu:type !='loadFirst' && this.props.ErrorShow({type:'zanwu',content:'暂无消息'})})
        }
        this.loadList=(a,t,state,jtb)=>{
            this.setState({loadingOk:false})
            var url={bm:'/server/lexiu3-app/business/tmxcmsginfo/applist'}
            var newState=this.state.reqParam;
            newState.type=a
            newState.url=url[a];
            if( jtb !='firstJJkbsdfsdfsdfsdfser35345t'){
                newState.data.taskState= state=='0' ? state :( state || '')
                t ? (newState.data.searchKey=t) : delete newState.data.searchKey
            }
            this.props.setScroll(0);
            this.props.setProps({loadParam:newState,myParam:newState},()=>{
                this.state.Logical && this.state.Logical.Reload();
            })
        }
        this.overnews=()=>{
            console.log('123')
            this.props.promptInfo({
                content:'活动已结束',
                Prompt:true
            })
        }
        this.linkurl=(item)=>{
            console.log(item)
            this.props.history.pushState({locationUrl:item.locationUrl,locationTitle:item.locationTitle},'/newsurl')
        }
    }
    componentWillMount(){
        this.props.setProps({
            newaddflag:false
        })
        this.props.setProps({loadParam:this.props.myParam||this.state.reqParam})
    }
    componentDidMount() {
        this.props.changeTitle('消息中心')

    }
    componentDidUpdate(){}
    render(){
        console.log(this.state)
        console.log(this.props)
        var moveType =this.state.onMove || false
        var dHeight={height:'1rem'},bHeight={height:'1rem'}
        var loadParam= this.props.loadParam && this.props.loadParam.data.taskState
        return(
            <div className="recoverList">
                <LoadList {...this.props}  dataReform={this.dataReform} T={this}>
                    <ul>
                        {
                            this.state.data[0] ? this.state.data.map((item,index)=>{
                                return(
                                    <li key={index} className="msgli">
                                        <h3 style={{width:'100%',textAlign:'center',color:'#BDBDBD'}}>{item.msgBegindate}</h3>
                                        <div className="msgdiv">
                                            {item.pushDes=='已失效'?
                                                <div style={{position:'relative'}} onClick={this.overnews}>
                                                    {item.msgPic==''?
                                                        <span>
                                                            <h2 style={{fontSize:'0.34rem',fontWeight:'600',color:'#353535'}}>{item.msgTitle}</h2>
                                                            <p style={{wordWrap:'break-word',color:'#787878' }}>{item.msgContent}</p>
                                                        </span>
                                                        :
                                                        <span>
                                                            <div style={{width: "100%",height: "3rem"}}>
                                                                    <img style={{width: "100%",height: "100%"}} src={item.msgPic} alt=""/>
                                                                    <div style={{width:"100%",height:"3rem",position:"absolute",top:"0",background:"rgba(0,0,0,0.5)",textAlign:'center',lineHeight:'3rem',color:'#fff',fontSize:'0.32rem'}}>活动结束</div>
                                                            </div>
                                                            <h2 style={{fontSize:'0.34rem',fontWeight:'600',color:'#353535'}}>{item.msgTitle}</h2>
                                                            <p style={{wordWrap:'break-word',color:'#787878' }}>{item.msgContent}</p>
                                                        </span>
                                                    }
                                                </div>
                                                :
                                                <div>
                                                    {item.locationUrl==''?
                                                        (item.msgPic==''?
                                                            <span>
                                                                <h2 style={{fontSize:'0.34rem',fontWeight:'600',color:'#353535'}}>{item.msgTitle}</h2>
                                                                <p style={{wordWrap:'break-word',color:'#787878' }}>{item.msgContent}</p>
                                                            </span>:
                                                            <span>
                                                                <img style={{width: "100%",height: "3rem"}} src={item.msgPic} alt=""/>
                                                                <h2 style={{fontSize:'0.34rem',fontWeight:'600',color:'#353535'}}>{item.msgTitle}</h2>
                                                                <p style={{wordWrap:'break-word',color:'#787878' }}>{item.msgContent}</p>
                                                            </span>
                                                        )
                                                        :
                                                        (item.msgPic==''?
                                                                <span onClick={this.linkurl.bind(this,item)}>
                                                                <h2 style={{fontSize:'0.34rem',fontWeight:'600',color:'#353535'}}>{item.msgTitle}</h2>
                                                                <p style={{wordWrap:'break-word',color:'#787878' }}>{item.msgContent}</p>
                                                            </span>:
                                                                <span onClick={this.linkurl.bind(this,item)}>
                                                                <img style={{width: "100%",height: "3rem"}} src={item.msgPic} alt=""/>
                                                                <h2 style={{fontSize:'0.34rem',fontWeight:'600',color:'#353535'}}>{item.msgTitle}</h2>
                                                                <p style={{wordWrap:'break-word',color:'#787878' }}>{item.msgContent}</p>
                                                            </span>
                                                        )
                                                    }
                                                </div>
                                            }
                                        </div>
                                    </li>
                                )
                            }):this.state.loadingOk && this.state.tishiyu
                        }
                    </ul>
                </LoadList>
            </div>
        )
    }
}