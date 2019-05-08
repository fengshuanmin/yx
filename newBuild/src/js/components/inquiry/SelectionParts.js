import React from 'react';
import $ from 'jquery';
import {BaseLi} from '../../../../../common/assembly/Stateless';
import someEvent from '../../../../../common/baseFun/someEvent'
/**订单详情**/
export default class SelectionParts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lingList:[]
        };
        this.touchs=(m,e)=>{
            switch(m){
                case 'start':
                    someEvent.touchStart(e,this);
                    break;
                case 'end':
                    someEvent.touchEnd(e,this);
                    break;
                case 'move':
                    someEvent.touchMove(e,this);
                    break;
            }
        }
        this.closeDocument=(e)=>{
            e.preventDefault();e.stopPropagation();
            let isChild=false;
            let node=e.target;
            while(node){
                if(node==this.refs.SelectBottom){
                    isChild=true;
                    break;
                }
                node=node.parentNode;
            }
            if(!isChild){
                this.setState({
                    showYXZ:false
                })
            }
        }
        this.search=(v,e)=>{
            this.setState({selectData:[],tishiyu:this.props.ErrorShow({type:'p',content:<span>输入配件名称搜索配件！</span>})})
            if(!v){
                this.props.promptInfo({content:'请先输入查询关键字！',Prompt:true})
                return;
            }
            this.props.ajax({
                loading:true,
                url:'/lexiugo-app/app/partEnquiry/searchEnquiryPart',
                data:{partName:v},
                suc:(msg)=>{
                    if(msg.errorCode=='0000'){
                        //$('.selectPartsUl').css('top','0px')
                        this.refs.selectPartsUl.style.top='0px'
                        this.refs.selectPartsUl.style.transition='top 0'
                        if(msg.result && msg.result[0]){
                            this.setState({selectData:msg.result})
                        }else{
                            this.setState({selectData:[],tishiyu:this.props.ErrorShow({type:'p',content:<span onClick={()=>{this.state.DHLeft.click();this.setState({selectData:false,click:true})}}>未查询到该零件，您可点击此处新增自定义零件</span>})})
                        }
                    }else{
                        this.setState({selectData:[],tishiyu:this.props.ErrorShow({type:'p',content:<span>服务器异常，请稍后询问！</span>})})
                    }

                }
            })
        }
        this.submit=()=>{
            var nowPropsState=this.props.location.state||{};
            if(nowPropsState.isFromInfo=='yes'){
                var datailedList=this.state.AlreadyChosen,partList=[]
                for(var i in datailedList){
                    console.log(datailedList,55)
                    partList.push({
                        partNum : datailedList[i].num,
                        partStandard : datailedList[i].data.name,
                        partRemark:datailedList[i].text,
                        factPartCode:datailedList[i].data.id
                    })
                }
                var requestDate = {
                    "partList" : partList,
                    taskId:this.props.location.state.taskId
                }
                this.props.ajax({
                    loading:true,
                    url:'/toumingxiu/insEnquiry/addAppSelectPart.do',
                    data:{requestData:JSON.stringify(requestDate)},
                    suc:(dat)=>{
                        if(dat.success){
                            window.history.go(-1)
                        }else{
                            this.props.promptInfo({content: '失败了', Prompt: true})
                        }
                    }
                })
            }else {
                if (this.state.AlreadyChosen) {
                    console.log(this.state.AlreadyChosen)
                    var datArr = []
                    for (var i in this.state.AlreadyChosen) {
                        datArr.push(1)
                    }
                    if (datArr.length < 1) {
                        this.props.promptInfo({content: '请先选择配件！', Prompt: true})
                    } else {
                        localStorage.setItem("PJAdd", JSON.stringify(this.state.AlreadyChosen));
                        window.history.go(-1)
                    }
                }
            }
        }
    }
    componentDidMount() {
        this.props.changeTitle('零件选择');

    }
    componentWillMount(){
        var location=this.props.location.state || {}
        if(location.AlreadyChosen && location.isFromInfo=='yes'){
            this.setState({AlreadyChosen:this.props.location.state.AlreadyChosen })
        }else{
            if(localStorage.getItem("PJAdd")){
                try {
                    var json=JSON.parse(localStorage.getItem("PJAdd"));
                    this.setState({AlreadyChosen:json })
                }catch (e){
                    this.setState({AlreadyChosen:{} })
                }
            }
        }
    }
    componentWillUnmount(){
        this.props.promptInfo()
    }
    render(){
        var jsonDom=[],numAll=0
        for(var i in this.state.AlreadyChosen){
            numAll+=this.state.AlreadyChosen[i].num
            jsonDom.push(<this.props.StateLess.AddAndC item={this.state.AlreadyChosen[i].data} AlreadyChosen={this.state.AlreadyChosen}  T={this}/>)
        }
        return(
            <div onClick={this.closeDocument} className="SelectionPartsBox">
                <this.props.SelectInput {...this.props}
                    change={this.change}
                    blur={this.blur}
                    focus={()=>this.setState({selectData:this.state.selectData || [],tishiyu:this.props.ErrorShow({type:'p',content:<span>输入配件名称搜索配件！</span>})})}
                    close={()=>this.setState({selectData:false})}
                    search={this.search}
                    T={this}/>


                {
                    this.state.selectData ?
                        <div className="SelectionParts selectItem">
                            <ul ref="selectPartsUl" onTouchEnd={this.touchs.bind(this,'end')}
                                onTouchMove={this.touchs.bind(this,'move')}
                                onTouchStart={this.touchs.bind(this,'start')}
                                style={{overflow:'hidden',position:'relative',minHeight:'100%',paddingBottom:'2rem'}}>
                            {this.state.selectData[0] ? this.state.selectData.map((item,index)=>{
                                item.name=item.partTypeLvl3Name;
                                item.id=item.partTypeLvl3Id
                                return (
                                    <this.props.StateLess.AddAndC key={index} item={item} AlreadyChosen={this.state.AlreadyChosen}  T={this}/>
                                )
                            }) :
                                this.state.tishiyu
                            }
                            </ul>
                        </div>
                        :
                        <div className="SelectionParts">
                            <div className="left">
                                {<this.props.StateLess.DHLeft {...this.props}  T={this}/>}
                            </div>
                            <div className="right">
                                <this.props.StateLess.DHRight {...this.props} classification={this.state.classification} T={this}/>
                            </div>
                        </div>

                }

                <div className="SelectBottom" ref="SelectBottom">
                    <div className="alreadyChoose" style={this.state.showYXZ && jsonDom[0] ? {height:'5rem'}:{height:'0'}}>
                        <div className="alreadyTitle">
                            <span className="left">已选零件</span>
                            <span className="right" onClick={()=>{this.props.promptInfo({content:'您确定要删除已选零件吗？',Prompt:true,fun:()=>{this.setState({AlreadyChosen:{}});this.props.promptInfo()}})}}><span className="iconfonts">&#xe7f5;</span>{' 清空'}</span>
                        </div>
                        <div style={{position:'relative',height:'4rem'}}>
                            <div
                                onTouchEnd={this.touchs.bind(this,'end')}
                                onTouchMove={this.touchs.bind(this,'move')}
                                onTouchStart={this.touchs.bind(this,'start')}
                                style={{overflow:'hidden',position:'relative',minHeight:'100%'}}>
                                {jsonDom}
                            </div>
                        </div>
                    </div>
                    <div className="button">
                        <span onClick={()=>this.setState({showYXZ:!this.state.showYXZ})}><span style={{flex:'none'}}>已选零件</span> {jsonDom.length > 0 && <i style={{display:'inline-block',fontSize:'14px',textAlign:'center',position:'relative',top:'-10px',left:'10px',background:'red',width:'0.5rem',height:'0.5rem',lineHeight:'0.5rem',borderRadius:'100%'}}>{numAll}</i>}</span>
                        <span className="submit" onClick={this.submit}>确认</span>
                    </div>
                </div>
            </div>
        )
    }
}