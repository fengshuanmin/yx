import React from 'react'
import $ from 'jquery'
import {MoTai} from '../../../../common/assembly/Stateless'
import ChangeTitle from '../../../../common/baseFun/someEvent'
require('./css/Logical.css')

export class Chakan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passport:[
                {name:'身份证(正面)',type:'survey_1',url:''},
                {name:'身份证(反面)',type:'survey_2'},
                {name:'行驶证',type:'survey_3'},
                {name:'驾驶证',type:'survey_4'}
            ],
            dsData:[],
            serverId:[],
            oldId:[]
        };
        this.submits=()=>{
            var arr=this.state.passport.concat(this.state.dsData);
            var data={
                taskId:this.props.location.state.id,
                imageId:'',type:'',addr:'',date:'',
                tasktype:'2',taskProgress:'3',
                reportNo:this.props.location.state.reportno,
                userName : '',// req.userName,//'LX19586471',
                passWord : '',// req.passWord,//'LX19586471',
                openId : this.props.project.wxConfig && this.props.project.wxConfig.openid,
            }
            var oldId=this.state.oldId || [];
            for(var i=0;i<arr.length;i++){
                for(var j in this.state.oldId){
                    if(arr[i].rid==this.state.oldId[j]){
                        arr[i].rid=false;
                    }
                }
                if(arr[i].rid){
                    oldId.push(arr[i].rid)
                    var a='';
                    data.imageId !='' && (a=',')
                    data.imageId+=a+(arr[i].rid);
                    data.type+=a+(arr[i].type);
                    data.addr+=a+('定位失败');
                    data.date+=a+(arr[i].date || '-');

                }
            }
            this.setState({oldId:oldId});
            if(data.imageId.length<=0){
                this.props.project.setProps({
                    PromptData:{content:'没有上传任何照片',Prompt:true}
                })
                return;
            }
            this.props.project.setProps({PromptData:{loading:true}})
            $.get('/lexiugo-app/weixin/chakan',data,(dat)=>{
                if(dat==1){
                    this.props.project.setProps({
                        PromptData:{content:'上传成功,您还需要前往电脑端完成车辆定损！是否继续上传照片？',Prompt:true,fun:(e,close)=>{
                            e.close();
                        },refuse: (e, close) => {
                            this.props.history.replaceState('null','/XList');
                            close();
                        }}
                    })
                }
            })
        }
    }
    componentDidMount() {
        $.post('/server/selectCKImg', {
            reportno: this.props.location.state.reportno,
            plateno: this.props.location.state.plateno,
            pushtaskno: this.props.location.state.push_TASK_NO
        }, (dat) => {
            var newDsState=this.state.dsData,dsNum=0;
            var newPassport=this.state.passport,PNum=0
            for(var i in dat){
                if(dat[i].type=='survey_5'){
                    newDsState.push({
                        url:dat[i].ImgPath,
                        type:'survey_5'
                    });
                    dsNum++
                }else{
                    for(var j=0;j< newPassport.length;j++){
                        if(dat[i].type== newPassport[j].type){
                            PNum++
                            newPassport[j].url=this.props.project.baseUrl+dat[i].ImgPath
                        }
                    }
                }
            }
            this.setState({
                dsData:newDsState,
                passport:newPassport,
                PNum:PNum,
                dsNum:dsNum
            })
        })
    }
    render() {
        return (
            <div>
                <PhotoShow title="证件照" ddType="passport" data={this.state.passport} {...this.props}  T={this} defNum={this.state.PNum || 0} maxNum="4"/>
                <PhotoShow title="车损" ddType="dsData" data={this.state.dsData} last={true} {...this.props} maxNum='20' defNum={this.state.dsNum || 0}  T={this}/>
                <div className="CKbuttonBox">
                    <div className="CKbutton"><span onClick={this.submits}>结束查勘上传照片</span></div>
                </div>
            </div>
        )
    }
}

export class Jieche extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tishi:''
        };
        this.callCZ=()=>{
            window.location.href="tel:"+this.props.location.state.telephone
        }
        this.DXTCZ=()=>{
            var sms=encodeURIComponent("尊敬的"+this.props.location.state.customername+"先生/女士，您好！您的爱车｛"+this.props.location.state.plateno+"｝经｛"+this.props.location.state.insZgsName+"｝推荐至｛"+this.props.location.state.xlcName+"｝维修。您可以通过关注“透明修车网”公众号查看维修状态")
            var u = navigator.userAgent,datas=''
            if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
                datas="sms:"+this.props.location.state.telephone+"?body="+sms+""
            } else if (u.indexOf('iPhone') > -1) {//苹果手机
                datas="sms:"+this.props.location.state.telephone
            }
            window.location.href=datas
        }
        this.FangQi=()=>{
            this.setState({
                tishi:(<MoTai {...this.props}><FangQi {...this.props} T={this} /></MoTai>)
            })
        }
        this.JieChe=()=>{
            if(this.props.location.state.task_flag*1==5){
                this.setState({
                    data:{
                        sendType: "0002",
                        taskId: this.props.location.state.id,
                    }
                },()=>{
                    this.props.project.setProps({
                        PromptData:{content:'确定接车吗',Prompt:true,onlyOK:false,fun:()=>{
                            this.submit();
                        }}
                    })
                })
            }else{
                this.setState({
                    tishi:(<MoTai {...this.props}><BQXX {...this.props} T={this} /></MoTai>)
                })
            }
        }
        this.submit=()=>{
            $.post('/lexiugo-app/weixin/AfterMarketLoginServlet',this.state.data,(msg)=>{
                var contents=''
                if(msg.data.ResponseMessage == "放弃成功"){
                    contents="放弃成功"
                }else if(msg.data.ResponseCode == "0000"){
                    contents="接车成功";
                }else if(msg.data.ResponseCode == "0010"){
                    contents="接车失败"
                }else if(msg.data.ResponseCode == "0018"){
                    contents="放弃失败"
                }
                this.props.project.setProps({
                    PromptData:{content:contents,Prompt:true,onlyOK:true,fun:()=>{
                        if(msg.data.ResponseCode == "0018" && msg.data.ResponseCode == "0010"){
                            this.props.project.setProps({PromptData:{}})
                        }else{
                            this.props.project.setProps({PromptData:{}},()=>{
                                this.props.history.replaceState(null, "/XList");
                            })
                        }
                    }}
                })
            })
        }
    }
    render() {
        return (
            <div className="jieche">
                <div className="BACKWright">
                    <span className="DXTCZ" onClick={this.DXTCZ}></span>
                    <span className="callCZ" onClick={this.callCZ} ></span>
                </div>
                <div className="JCbuttom">
                    <input type="button" onClick={this.FangQi} value="放弃"/>
                    <input type="button" onClick={this.JieChe} value="接车"/>
                </div>
                {this.state.tishi}
            </div>
        )
    }
}

export class Weixiu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            WXDM:[],
            BJPQ:[],
            WXJS:[],
            upLoaded:[]
        };
        this.dataADD=(arr,tasktype,taskProgress,type)=>{
            var data={
                taskId:this.props.location.state.id,
                imageId:'',type:'',addr:'',date:'',
                tasktype:tasktype,taskProgress:taskProgress,
                reportNo:this.props.location.state.reportno,
                userName : '',// req.userName,//'LX19586471',
                passWord : '',// req.passWord,//'LX19586471',
                openId : this.props.project.wxConfig && this.props.project.wxConfig.openid,
            }
            var oldArr=[]
            for(var i=0;i<arr.length;i++){
                if(this.state['old'+type] &&this.state['old'+type][0] ){
                    for(var k in this.state['old'+type]){
                        if(this.state['old'+type][k]==arr[i].rid){
                            arr[i].rid=false
                        }
                    }
                }
                if(arr[i].rid){
                    var a=''
                    oldArr.push(arr[i].rid);
                    data.imageId !='' && (a=',')
                    data.imageId+=a+(arr[i].rid);
                    data.type+=a+(arr[i].type);
                    data.addr+=a+('定位失败');
                    data.date+=a+(arr[i].date || '-');
                }
            }
            if(!data.imageId && arr.length<=0){
                var cantG={};cantG['err'+type]=false;
                this.setState(cantG)
                return;
            }else if(!data.imageId && arr.length>0){
                var cantG={};cantG['err'+type]=true;
                this.setState(cantG,()=>{
                    var a= (this.state.isUpOk ||0)+1
                    this.setState({isUpOk:a})
                })
            }else if(data.imageId){
                this.props.project.setProps({PromptData:{loading:true}})
                $.get('/lexiugo-app/weixin/weixiu',data,(dat)=>{
                    if(dat==1){
                        var cantG={};cantG['err'+type]=true;
                        var oldImgId = this.state['old'+type] || [];
                        cantG['old'+type]=oldImgId.concat(oldArr);
                        this.setState(cantG,()=>{
                            var a= (this.state.isUpOk ||0)+1
                            this.setState({isUpOk:a,loadType:true})
                        })
                    }
                })
            }
        }
        this.submits=()=>{
            var ab={
                'WXDM':{dat:this.state.WXDM,tasktype:'3',taskProgress:'3'},
                'BJPQ':{dat:this.state.BJPQ,tasktype:'3',taskProgress:'4'},
                'WXJS': {dat:this.state.WXJS,tasktype:'4',taskProgress:'5'},
            }
            for(var i in ab){
                if(ab[i].dat.length <1){
                    this.props.project.setProps({
                        PromptData:{content:'缺少照片信息',Prompt:true}
                    })
                }
                this.dataADD(ab[i].dat,ab[i].tasktype,ab[i].taskProgress,i);
            }
        }
        this.endWX=()=>{
            var idata = this.props.location.state;
            var data = {
                sendType: "0004",
                taskId: idata.id,
            };
            this.props.project.setProps({PromptData:{loading:true}})
            $.ajax({
                url: "/lexiugo-app/weixin/AfterMarketLoginServlet",
                data:data,
                dataType: "json",
                type: "post",
                success: (msg)=>{
                    //防侧漏
                    var cantG={errWXDM:false,errBJPQ:false,errWXJS:false};
                    this.setState(cantG,()=>{
                        this.setState({isUpOk:0})
                    })
                    if(msg.data.ResponseCode == "0000"){
                        this.props.project.setProps({
                            PromptData:{content:'您已完成维修请前往电脑端完成出厂',Prompt:true,onlyOK:true,fun:()=>{

                            }}
                        })
                    }else{
                        this.props.project.setProps({
                            PromptData:{content:'请求失败请稍后尝试',Prompt:true}
                        })
                    }
                },
                error: (xhr, status, err)=>{
                    console.error(this.props.url, status, err.toString());
                }
            });
        }
    }
    componentDidMount() {
        $.post('/server/selectWXImg', {pushTaskId:this.props.location.state.id},(dat)=>{
            var WXDM=this.state.WXDM,WXDMnum=0,
                BJPQ=this.state.BJPQ,BJPQnum=0,
                WXJS=this.state.WXJS,WXJSnum=0,
                urls=this.props.project.baseUrl;
            for(var i in dat.data){
                switch(dat.data[i].type){
                    case 'repair_1':
                        WXDMnum++
                        WXDM.push({type:'repair_1',url:urls+dat.data[i].ImgPath});
                        break;
                    case 'repair_2':
                        BJPQnum++;
                        BJPQ.push({type:'repair_2',url:urls+dat.data[i].ImgPath});
                        break;
                    case 'repair_3':
                        WXJSnum++;
                        WXJS.push({type:'repair_3',url:urls+dat.data[i].ImgPath});
                        break;
                    default:
                }
            }
            this.setState({
                WXDM:WXDM,BJPQ:BJPQ,WXJS:WXJS,
                WXDMnum:WXDMnum,BJPQnum:BJPQnum,WXJSnum:WXJSnum
            })
        })
    }
    componentWillUpdate(){
        if(this.state.errWXDM && this.state.errBJPQ && this.state.errWXJS){
            var content= this.state.loadType ? '上传成功是否结束维修？':'确定结束维修吗？'
            var cantG={errWXDM:false,errBJPQ:false,errWXJS:false};
            this.setState(cantG,()=>{
                this.setState({isUpOk:0,loadType:false})
            })
            this.props.project.setProps({
                PromptData:{content:content,Prompt:true,fun:()=>{
                    this.endWX();
                }}
            })
        }
    }
    render() {
        return (
            <div>
                <PhotoShow title="维修待命" ddType="WXDM" type="repair_1" defNum={this.state.WXDMnum || 0} data={this.state.WXDM} last={true} {...this.props}  maxNum="20"  T={this}/>
                <PhotoShow title="钣金喷漆" ddType="BJPQ" type="repair_2" defNum={this.state.BJPQnum || 0} data={this.state.BJPQ} last={true} {...this.props} maxNum='20' T={this}/>
                <PhotoShow title="维修结束" ddType="WXJS" type="repair_3" defNum={this.state.WXJSnum || 0} data={this.state.WXJS} last={true} {...this.props} maxNum='20' T={this}/>

                <div className="CKbuttonBox">
                    <div className="CKbutton"><span onClick={this.submits}>结束维修并上传照片</span></div>
                </div>
            </div>
        )
    }
}

/**放弃接车**/
export class FangQi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submit=()=>{
            if(!this.state.vals || this.state.vals.length<10){
                this.props.project.setProps({
                    PromptData:{content:'理由至少十个字',Prompt:true}
                })
                return;
            }
            this.props.T.setState({
                data:{sendType: "0003",
                abandonReason: '4',//this.state.val,
                taskId: this.props.location.state.id,
                reasonDescrip:this.state.vals}
            },()=>{
                this.props.T.submit(()=>{
                    this.props.T.setState({tishi:''})
                });
            })

        }
    }
    render() {
        return (
            <div className="jieche">
                <p>请输入放弃理由</p>
                <input type="text" placeholder="请输入放弃理由(至少十个字)" onChange={(e)=>{
                    this.setState({
                        vals:e.target.value
                    })
                }}/>
                <div>
                <span onClick={()=>{this.props.T.setState({tishi:''})}}>取消</span>
                    <span onClick={this.submit}>确认</span>
                </div>
            </div>
        )
    }
}
/**确认接车补全信息**/
export class BQXX extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataBrand:{
                userName:"lexiugo",
                passwd:"n27H3lNGL7wJSePFsrr0g16UTU0+tDfsGHMVZ2pmxsDaFV4cVSzVwQ==",
            },
            BQXX:[
                {text:'选择车牌号',dList:[{value:'234234'}]}
            ]
        }
        //滚动
        this.touchs=(m,e)=>{
            switch(m){
                case 'start':
                    ChangeTitle.touchStart(e,this);
                    break;
                case 'end':
                    ChangeTitle.touchEnd(e,this);
                    break;
                case 'move':
                    ChangeTitle.touchMove(e,this);
                    break;
            }
        }
        this.submit=()=>{
        }
        this.Selected=(m,t,e)=>{
            //选择
            var arr=['车辆品牌','车型','车组']
            this.refs['jt'+t].value=m.brandName;
            var newState=this.state.BQXX
            newState[t].dList=[];
            newState[t+1].value=arr[t+1]
            this.setState({
                BQXX:newState
            },()=>{
                this.brandArr((t>3 && t+1),m);
            })
        }
        this.brandArr=(d,c,e)=>{
            var md=e && e.target && e.target.value ? md=e.target.value : '';
            var a={
                0:'/brand/getBrandCode/'+md,//获取品牌value
                1:'/family/getFamilyBrandId/'+c.brandId,//获取车系brandData[$(this).index()].brandId
                2:'/group/getGroupFamilyId/'+c.familyId,//获取车组
                3:"/vehicle/getVehicleGroupId/"+c.groupId, //+e.target.value+"";//获取车型 vehicleId
            }
            $.ajax({
                url:"/server/BQXX",
                data:{data:a[d]},
                dataType: "json",
                type: "post",
                success: (msg)=>{
                    var newState=this.state.BQXX;
                    d>0 && (newState[d-1].dList=[]);
                    newState[d].dList=msg.result;
                    this.setState({
                        BQXX:newState
                    })
                }
            })
        }
    }
    render() {
        console.log(this.state.BQXX)
        return (
            <div className="BQXX">
                <p className="title">补全信息</p>
                <div className="BQListBox">
                    <div><input type="text" placeholder="请输入放弃理由(车架号)"/></div>
                    {
                        this.state.BQXX.map((item,index)=>{
                           return(
                               <div key={index+100000000} className="BQList">
                                   <input type="text" placeholder={item.text} ref={'jt'+index} onChange={this.brandArr.bind(this,index,1)}/>
                                   {item.dList &&
                                       <div style={{height:'3rem',position:'absolute',overflow:'hidden'}}>
                                           <div
                                               onTouchEnd={this.touchs.bind(this,'end')}
                                               onTouchMove={this.touchs.bind(this,'move')}
                                               onTouchStart={this.touchs.bind(this,'start')}
                                               style={{overflow:'hidden',position:'relative'}}
                                           >
                                               {
                                                   item.dList.map((items,indexs)=>{
                                                       return(
                                                           <li key={indexs} onClick={this.Selected.bind(this,items,index)}>{items.brandName}</li>
                                                       )
                                                   })
                                               }
                                           </div>
                                       </div>
                                   }
                               </div>
                           )
                        })
                    }
                </div>
            </div>
        )
    }
}


/**照片只是的list**/
export class PhotoShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        //展示图片
        this.showUl=(z,e)=>{
            var t=0,rot=0;
            if(this.refs.ulB.style.display == 'block' && !z){
                setTimeout(()=>this.refs.ulB.style.display='none',500)
            }else{
                rot=90
                this.refs.ulB.style.display='block';
                for(var i=0;i<(this.props.data.length+1);i++){
                    if(i%3==0){
                        var m='m'+i;
                        t+= parseInt(this.refs[m].clientHeight)
                    }
                }
            }
            this.refs.rights.style.transform='rotate('+rot+'deg)';
            this.refs.ulB.style.height=t+'px';
        }
        //选择照片
        this.closePhoto=(p,e)=>{
            var oveType=this.props.ddType;
            if(p.type != 'ds'){
                this.props.project.wxUpdata(1, (imgid,id)=> {
                    var newData ={};
                    newData[oveType]=this.props.data
                    newData[oveType][p.type].url = imgid;
                    newData[oveType][p.type].rid=id;
                    newData[oveType][p.type].date='2015-1-1';
                    this.props.T.setState(newData,()=>{
                        this.showUl(true,true);
                        this.numKong();
                    })
                });
            }else{
                var num =9;
                if(this.props.data.length+9 > this.props.maxNum){
                    num=this.props.maxNum-this.props.data.length;
                    if(num<1){
                        this.props.project.setProps({
                            PromptData:{content:'上传已达到上限',Prompt:true}
                        })
                        return false;
                    }
                }
                this.props.project.wxUpdata(num, (imgid,id) => {
                    var newData = {};
                    newData[oveType]=this.props.data;
                    newData[oveType].push({url:imgid,type:this.props.type||'survey_5',rid:id,addr:'获取地址失败',date:'2015-1-2'});
                    this.props.T.setState(newData,()=>{
                        this.showUl(true,true);
                        this.numKong();
                    })
                });
            }
        }
        //控制数量
        this.numKong=()=>{
            var c=0;
            for(var i=0;i<=this.props.data.length;i++){
                if(this.props.data[i] && this.props.data[i].url){
                    c++
                }
            }
            if(c != this.state.myName){
                this.setState({myNum:c})
            }
        }
    }
    componentWillUpdate(){
        /**/
    }
    render() {
        return (
            <div style={{marginTop:'0.3rem'}}>
                <div className="photoLi" onClick={this.showUl.bind(this,false)}>
                    <span>{this.props.title}</span>
                    <div>
                        <span className="iconfonts">&#xe658;</span>
                        <span>{'('+(this.state.myNum || this.props.defNum)+'/'+this.props.maxNum+')'}</span>
                        <span ref="rights" className="iconfonts">&#xe611;</span>
                    </div>
                </div>
                <div ref="ulB" className="ulB">
                    <ul>
                        {
                            this.props.data.map((item,index)=>{
                                return (
                                    <li onClick={this.closePhoto.bind(this,{type:index})} className="photo+" ref={'m'+index} key={index}>
                                        {item.url ? <img src={item.url} alt={item.name || ''}/> : <span className="iconfonts">&#xe610;</span>}
                                        {item.name && <span>{item.name}</span>}
                                    </li>
                                )
                            })
                        }
                        {
                            this.props.last &&
                            <li ref={'m'+(this.props.data.length || 0)} className="photo+" onClick={this.closePhoto.bind(this,{type:'ds'})}>
                                <span className="iconfonts">&#xe610; ss</span>
                            </li>
                        }
                        <li style={{height:'0px'}}></li>
                        <li style={{height:'0px'}}></li>
                    </ul>
                </div>
            </div>
        )
    }
}


/**公共的顶端**/
export class BaseTop extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        var idata= this.props.location.state;
        return (
            <div className="baseTitle">
                <p className="title">
                    <span>基本信息　</span>
                    <span className="detail" onClick={()=>this.props.history.pushState(this.props.location.state,'/carDetales')}>详情 <span className="iconfonts">&#xe607;</span></span>
                </p>
                <div className="baseJS">
                    <ul>
                        <li><span className="textV">车牌号 :</span><span>{idata.plateno}</span></li>
                        <li><span className="textV">保险公司 :</span><span>{idata.inscompanyname}</span></li>
                        <li><span className="textV">车主 :</span><span>{idata.customername}</span></li>
                        <li><span className="textV">车型 :</span><span>{idata.carvehiclename}</span></li>
                    </ul>
                </div>
                <div className="callDSY" style={{margin:'0.3rem 0'}}>
                    <span>定损员</span>{' '+idata.lossby} <span style={{paddingRight:'0.15rem'}}>{'　('+idata.yddh+')'}</span><span style={{flex:'1',textAlign:'right',color:'#979596'}}><a className="CallDcc"  href={"tel:"+idata.yddh}></a></span>
                </div>
            </div>
        )
    }
}

