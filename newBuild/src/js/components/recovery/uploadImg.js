import React from 'react';
import $ from 'jquery';
import {BaseLi} from '../../../../../common/assembly/Stateless'
/**上传照片**/
export default class UpLoadImg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {imgList:this.props.location.state.newData.imgList || (this.props.location.state.upImgList ? this.props.location.state.upImgList[this.props.location.state.newData.lineNo] : false) || []}
        this.upLoadImg=()=>{
            this.props.wxUpdata(9, (imgid,id) => {
                console.log(imgid,id)
                var imgList=this.state.imgList || [],newImgList;
                imgList.push({url:imgid,serverId:id,isNew:true});
                this.setState({imgList:imgList,newImgList:true},()=>{
                    console.log(imgList)
                })
            });

        }
        this.submit=()=>{
            var datas=this.props.location.state.newData,
                imgList=this.state.imgList,canGo=false,
                dataList=[];
            console.log(datas)

            for(var i=0;i<imgList.length;i++){
                if(imgList[i].serverId){
                    canGo=true;
                }
            }
            if(!canGo)return;
            this.props.promptInfo({loading:true})
            $.post('/lexiugo-app/weixin/lossPartImg',this.imgShow(),(msg)=>{
                if(msg.code=='3003') {
                    this.props.promptInfo({
                        content: '上传完成是否返回继续填写？',
                        Prompt: true,
                        fun: () => {
                            this.props.location.state.upImgList = this.props.location.state.upImgList || {};
                            this.props.location.state.upImgList[datas.lineNo] = this.state.imgList;
                            this.setState({bankAndgo: true}, () => {
                                history.back(-1)
                            })
                            this.props.promptInfo()
                        }
                    })
                }else{
                    this.props.promptInfo({content:'上传失败，请稍后上传！',Prompt:true,onlyOK:true})
                }
            })
        }
        this.imgShow=()=>{
            var dm=this.props.location.state.newData
            var uri = new Array(),paramData=this.state.imgList;
            for( var i in paramData ) {
                var imageType = paramData[i]['imageType'];
                var serverId = paramData[i]['serverId'];
                var n = 'array[' + i + '].';
                serverId && uri.push( n + 'imageType=survey_5&'+ n +'lineNo='+dm.lineNo +
                    '&'+ n +'taskId='+ dm.taskId+
                    '&'+ n +'orderId='+this.props.orderIds+'&' + n + 'serverId=' + serverId );
            }
            uri.push( 'address=' + this.state.address );
            return uri.join("&");
        }
        this.showImg=(i,item)=>{
            var imgList=[];
            for(var t in this.state.imgList){
                this.state.imgList[t] && imgList.push(this.state.imgList[t].url)
            }
            wx.previewImage({
                current:item.url,
                urls:imgList
            });
        }
    }
    componentWillMount(){
        const locaState=this.props.location.state;
        var aImgList=[];
        if(locaState.newData.type != 'read-only') {
            this.props.location.state.upImgList= this.props.location.state.upImgList || {}
            this.setState({
                isokGo: window.location.href.split('_key=')[1]
            })
            aImgList=locaState.upImgList[locaState.newData.lineNo] || [];
            this.props.history.pushState(locaState, 'recovery/photoUpdata');
        }
        var imgList= [],oldImgList=locaState.newData.imgList || []
        if(!aImgList[0]) {
            for (var i = 0; i < oldImgList.length; i++) {
                imgList.push({url: oldImgList[i]});
            }
        }else{
            imgList=aImgList;
        }
        this.setState({imgList:imgList})
    }
    componentDidMount() {
        this.props.location.state.newData.type != 'read-only'? this.props.changeTitle('上传照片') : this.props.changeTitle('定损员照片');
        console.log(this.props.location.state)
    }
    componentWillUnmount(){
        this.props.promptInfo()
    }
    componentWillReceiveProps(nextProps){
        console.log(window.history.length,this.state.isokGo)
        if(window.location.href.split('_key=')[1] == this.state.isokGo && !this.state.nowIsGo){
            if(this.state.bankAndgo){
                this.setState({bankAndgo:false})
                this.props.history.replaceState(this.props.location.state,'recovery/addRecovery')
            }else{
                this.setState({nowIsGo:true},()=>{
                    if(this.state.newImgList){
                        this.props.setProps({
                            PromptData: {
                                content: '是否保存照片？', Prompt: true,
                                refuse: (e, close) => {
                                    this.props.history.replaceState({...this.props.location.state},'recovery/addRecovery')
                                    close();
                                },
                                fun: (e, close) => {
                                    this.setState({nowIsGo:false},()=>{
                                        this.props.history.pushState(this.props.location.state,'recovery/photoUpdata');
                                        this.submit();
                                    })
                                    close();
                                }
                            }
                        })
                    }else{
                        this.props.history.replaceState({...this.props.location.state},'recovery/addRecovery')
                        //close();
                    }
                })
            }

            console.log(nextProps.location.pathname,this.state.isokGo)
        }
    }
    render(){
        var localData=this.props.location.state.newData.imgList
        return(
            <div className="orderUploadImg">
                <ul>
                    {
                        this.state.imgList.map((item,index)=>{
                            console.log(item)
                            return(
                                <li key={index} onClick={()=>this.showImg(index,item)}><img src={item.url} style={{width:'100%'}} alt=""/></li>
                            )
                        })
                    }
                    {this.props.location.state.newData.type != 'read-only' && <li style={{border:'1px solid #ccc'}} onClick={this.upLoadImg}>+</li>}
                    <li style={{height:'0'}}></li><li style={{height:'0'}}></li>
                </ul>
                {this.props.location.state.newData.type != 'read-only' &&
                <div style={{width: '100vw', height: '1rem', marginTop: '0.5rem'}}>
                    <button onClick={this.submit} style={{
                        border: '0px',
                        width: '100%',
                        height: '1rem',
                        position: ' fixed',
                        bottom: '0px',
                        left: '0px',
                        background: '#4680f7',
                        color: '#fff'
                    }}>提交
                    </button>
                </div>
                }
            </div>
        )
    }
}