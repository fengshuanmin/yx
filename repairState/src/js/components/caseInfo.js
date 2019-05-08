/**
 * Created by 23174 on 2017/9/13.
 */
import React from 'react'
import $ from 'jquery'
import ShowEWM from '../assembly/showEWM'
import verification from '../../../../config/verification'
import VehicleInfo from '../../../../newBuild/src/js/components/vehicleInfo';
import ChangeTitle from '../../../../common/baseFun/someEvent'
import {BaseLi} from '../../../../common/assembly/Stateless'
const Detail = React.createClass({
    getInitialState(){
        return {
            activeItem: 0,
            showEWMBol: [false],
            dis: false,
            receGiveUP: '1',
            callPage:false,
            XLCData:{}
        }
    },
    componentWillMount(){
        const data = this.props.location.state;
        this.setState({dataState: data})
        document.getElementById('appWrapper').scrollTop=0
        // document.body.addEventListener('touchstart', this.toStart, false);
    },
    tStart(index, e){
        if (document.getElementsByClassName('itemImgs')[index].getElementsByClassName('imgSingle').length < 4) {
            return
        }
        let firstx = document.getElementsByClassName('itemImgs')[index].offsetLeft - this.state.xState
        this.setState({xStart: e.touches[0].pageX})
        this.setState({xLeft: firstx})
    },
    tMove(index, e){
        if (document.getElementsByClassName('itemImgs')[index].getElementsByClassName('imgSingle').length < 4) {
            return
        }
        const pagex = e.touches[0].pageX - this.state.xStart
        document.getElementsByClassName('itemImgs')[index].style.left = this.state.xLeft + pagex + 'px'
    },
    tEnd(index, e){
        if (document.getElementsByClassName('itemImgs')[index].getElementsByClassName('imgSingle').length < 4) {
            return
        }
        if ((document.getElementsByClassName('itemImgs')[index].offsetLeft - this.state.xState) > 0) {
            document.getElementsByClassName('itemImgs')[index].style.left = 0
        }
        console.log(this.state.xState)
        if (document.getElementsByClassName('itemImgs')[index].offsetLeft < -(document.getElementsByClassName('itemImgs')[index].offsetWidth - document.body.offsetWidth + this.state.xState)) {
            document.getElementsByClassName('itemImgs')[index].style.left = -(document.getElementsByClassName('itemImgs')[index].offsetWidth - document.body.offsetWidth + this.state.xState * 2) + 'px'
        }
    },
    // toEnd(e){
    //     // if(document.getElementsByClassName('homeListSmall')[0].offsetHeight!=0){
    //     //     document.getElementsByClassName('homeListSmall')[0].style.height=0
    //     // }
    //     document.body.removeEventListener('touchmove', this.toMove, false);
    //     document.body.removeEventListener('touchend', this.toEnd, false);
    // },
    showEWM(){
        this.setState({dis: true})
    },
    cancelEWM(){
        this.setState({dis: false})
    },
    callPhone(){
        this.setState({callPage:true})
    },
    cancelPhone(){
        this.setState({callPage:false})
    },
    showImg(obj,index,e){
        let zhouKai=[]
        for(var i in obj){
            zhouKai[i]= "http://"+location.hostname+"/damagePicture/"+obj[i].split("app/").pop().replace('/small','');
        }
        wx.previewImage({
            current:zhouKai[index],
            urls:zhouKai
        });
    },
    toRecord(){
        this.props.history.replaceState(null, 'record');
    },

    _setState(name,value) {
        var newState = {};
        newState[name] = value;
        this.setState(newState);
    },
    componentDidMount: function () {
        // document.body.addEventListener('touchmove', this.toMove, false);
        // document.body.addEventListener('touchend', this.toEnd, false);
        const data = this.props.location.state;
        this.setState({dataState:data})
        this.setState({prePathname:data.prePathname})
        // this.setState({showState:data.showState})
        console.log(data)
        this.setState({showState: data.showState},()=>{
            let xstate = document.getElementsByClassName('itemImgs')[0].offsetLeft
            this.setState({xState: xstate})
        })
        console.log(this.props)
        console.log(data)
        if(this.props.xlcmap){
            this.props.ajax({
                loading:true,
                url:'/lexiugo-app/weixin/insurance/changeXlc',
                data:{
                    taskId:data.taskId,
                    xlcId:this.props.xlcmap.id
                },
                suc:(dat)=>{
                    console.log(dat)
                    if(dat.code=='0000'){
                        var j=data
                        j.xlcId=dat.xlcId;
                        j.xlcName=dat.xlcName;
                        j.xlcTel=dat.xlcTel;
                        j.xlcShotName=dat.xlcShortName || dat.xlcName;
                        j.xlcTel=dat.xlcTel
                        this.setState({dataState:j})
                        /*this.props.project.setProps({
                            PromptData:{
                                content:'变更修理厂成功',
                                Prompt:true,
                                onlyOK:true
                            }
                        });*/
                    }
                }
            })
        }
    },
    changeXLC(m,e){
        m=='open' && this.setState({changeXLC:!this.state.changeXLC});
    },
    //查询修车厂
    xlcHandleChange(e){
        const data= e.target.value
        this.setState({xlcData:data});
        var brandName=$('input[name=brandName]').val();
        var tmxhavepjType=this.props.location.query.tmxhavepjType;
        var tmxCarType=this.props.location.query.tmxCarType;
        var _this=this;
        $('.brandItem').eq(1).show();
        $.ajax({
            url: "/lexiugo-app/weixin/insurance/getXlc",
            data:{
                val:data,
                brandName:this.state.dataState.brandName || '',
                tmxhavepjType:this.state.dataState.tmxhavepjType || '',
                tmxCarType:this.state.dataState.tmxCarType || '',
                xlcRepairLevel:this.state.dataState.xlcRepairLevel || ''
            },
            dataType: "json",
            type: "post",
            success: function(msg) {
                var XCCList=[];
                var list=msg.data.xlc;
                for(var i in list){
                    XCCList.push(<li key={i} onClick={_this.xCar.bind(_this,list[i],'xcc')}>{list[i].libShotName}</li>)
                }
                _this.setState({XCCList:XCCList},()=>{
                    $('.brandItem').show();
                })
            }.bind(this)
        });
    },
    TBlur(){
        $('.brandItem').slideUp()
    },
    xCar(obj,type,e){
        if(type=='brand'){
            $('input[name=brandName]').val(obj.brandName);
        }else{
            var mtc={}
            $('input[name=xlcName]').val(obj.libShotName ||obj.shotName);
            mtc.xlcName=obj.libName||obj.name,mtc.xlcCode=obj.zzid|| obj.id;
            mtc.xlcShotName=obj.libShotName ||obj.shotName
            this.setState({xlcId:mtc.xlcCode})
        }
        this.setState({type2:Object.assign({},this.state.type2,mtc)});
        var xlcdata=this.state.XLCData;
        xlcdata.xlcName=mtc.xlcName
        this.setState({XLCData:xlcdata})
        $('.brandItem').hide();

    },
  /*  submits(){
        if(!this.state.xlcId){
            this.props.project.setProps({PromptData:{content:'请选择修理厂！',Prompt:true}});
            return;
        }
        var _this=this;
        this.props.project.setProps({
            PromptData:{content:'确定要变更修理厂吗?',Prompt:true,onlyOK:true,fun:(e,colse)=>{
                this.props.project.setProps({PromptData:{loading:true}})
                $.post('/lexiugo-app/weixin/insurance/changeXlc',{taskId:this.state.dataState.taskId,xlcId:this.state.xlcId},(data)=>{
                    if(data.code=='0000'){
                        var j=_this.state.dataState
                        j.xlcId=data.xlcId;
                        j.xlcName=data.xlcName;
                        j.xlcTel=data.xlcTel;
                        j.xlcShotName=data.xlcShortName || data.xlcName;
                        j.xlcTel=data.xlcTel
                        _this.setState({dataState:j})
                        this.props.project.setProps({PromptData:{content:'变更修理厂成功',Prompt:true,onlyOK:true,fun:(e,close)=>{
                            _this.changeXLC('open');
                            close();
                        }}});
                    }else{
                        this.props.project.setProps({PromptData:{content:'变更修理厂失败',Prompt:true}});
                    }

                })

            }}
        })
    },*/
    /*showEWM(a,e){
        return;
        var mk=this.state.dataState;
        var text=mk.plateNo+';'+mk.sendCarPerson+';'+null+';'+mk.taskId;
        this.setState({showEWM:!this.state.showEWM,text:text})
    },*/
    modalStateChange(){
        this.setState({modalState:!this.state.modalState})
    },
    Choice(m,e){
        if(m=='open'){
            this.setState({mapState:!this.state.mapState})
        }else{
            this.xCar(m,"xcc",null);
            this.Choice('open')
        }
    },
    choseaddress(e){
        wx.getLocation({
            type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
                let lat = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                let lon = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                localStorage.setItem("lat",lat)
                localStorage.setItem("lon",lon)
            }
        });
        // console.log(this.state)
        this.props.history.pushState({mtc:{brandCode:'',brandName:''},flagbg:'1'},'/vehicle')
},
    touchs(m,e){
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
    },
    render(){
        const progressStyle = {
            color: "#1E7BE3"
        };
        const detailsData = this.state.dataState;
        const chaKanList = this.state.dataState.chaKanList||[];
        let imgsPic = []
        if(chaKanList.length==0){
            imgsPic.push(
                <div className="imgSingle"><img style={{width: '100%', height: '100%'}}
                                                src={require('../../img/nopic.png')}/>
                </div>
            )
        }else{
            for (let i = 0; i < chaKanList.length; i++) {
                imgsPic.push(
                    <div className="imgSingle"><img style={{width: '100%', height: '100%'}}  onClick={this.showImg.bind(this,chaKanList,i)}
                                                    src={'/toumingxiu/jyshowPhoto/getUrl.do?photoUrl=' + chaKanList[i]}/>
                    </div>
                )
            }
        }
        return (
            <div className="caseInfo">
                <div className="caseConfirm">
                    <div className="confirmLeft">{detailsData.taskState}</div>
                    <div className="confirmRight">
                        <svg aria-hidden="true" className="icon" style={{color: 'white',height:'1rem',width:'1rem'}} onClick={this.showEWM}>
                            <use xlinkHref={'#icon-erweima'}></use>
                        </svg>
                    </div>
                </div>
                <div className="modalBg" style={this.state.dis||this.state.callPage? {display: "block"} : {display: "none"}}
                     onClick={this.cancelEWM}></div>
                <div className="EWMBox" style={this.state.dis? {display: "block"} : {display: "none"}}>
                    <div className="EWMtitle">案件码</div>
                    <div className="modalContent imgBox">
                        <img id="EWMimg" src={'/toumingxiu/jyshowPhoto/getUrl.do?photoUrl=' + detailsData.twoCodeImgPath}/>
                    </div>
                    <div className="EWMbottom">
                        扫二维码查看维修信息
                    </div>
                </div>
                <div className="caseBase">
                    <div className="detailsList">
                        <h4>基本信息</h4>
                        <ul>
                            <li><span>车牌号:</span>{detailsData.plateNo}</li>
                            <li><span>推修类型:</span>{detailsData.pushType =='推修' && '送修'}</li>
                            <li><span>定损员:</span>{(detailsData.insCompanyName ? detailsData.insCompanyName :'')  +'　'+ detailsData.lossBy}</li>
                            <li><span>修理厂:</span>
                                <span>
                                        {detailsData.xlcShotName}
                                    </span>
                            </li>
                            <li><span>联系修理厂</span><span></span><span
                                style={{marginLeft: '0.3rem'}}><a className="CallDcc"
                                                                  href={"tel:" + detailsData.xlcTel}>
                                <svg aria-hidden="true" className="icon" style={{width:'0.56rem',height:'.56rem',color:'#3b98e4'}}>
                                        <use xlinkHref={'#icon-dianhua1'}></use>
                                    </svg>
                            </a></span></li>
                            {(detailsData.taskState == "未接收" || detailsData.taskState == "修理厂放弃") &&
                            <li>
                                <span>变更修理厂:</span>
                                {/*<span onClick={this.changeXLC.bind(this,'open')}>变更</span>*/}
                                <span onClick={this.choseaddress}>变更</span>
                                <span className="iconfonts">&#xe607;</span>
                            </li>
                            }



                        </ul>
                    </div>
                </div>
                <div className="caseBase">
                    <div className="detailsList">
                        <h4>
                            案件信息</h4>
                        <ul>
                            <li><span>标的/三者:</span>{detailsData.taskCarType}</li>
                            <li><span>维修金额:</span>{parseFloat(detailsData.repairMoneny).toFixed(2)}</li>
                            <li><span>车主姓名:</span>{detailsData.sendCarPerson}</li>
                            <li><span>车主电话:</span>{detailsData.telePhone}</li>
                            <li><span>状态:</span>{detailsData.taskState}</li>
                            <li><span>接车时间:</span>{detailsData.inRepairTime}</li>
                            <li><span>推修时间:</span>{detailsData.createdTime}</li>
                            <li><span>备注:</span><span style={{textAlign:'right'}}>{detailsData.pushDesc}</span></li>
                        </ul>
                    </div>
                </div>
                <div className="caseBase">
                    <div className="detailsList" id="lastImgs">
                        <h4 style={{marginLeft:'0.3rem'}}>
                            查勘照片</h4>
                        <div className="maintainItem">
                            <div className='imgsDiv'>
                                <div className="itemImgs" style={{width:imgsPic.length*2.2-0.2+'rem'}} onTouchStart={this.tStart.bind(this, 0)}
                                     onTouchMove={this.tMove.bind(this, 0)} onTouchEnd={this.tEnd.bind(this, 0)}>
                                    {imgsPic}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={!this.state.changeXLC ? {display:'none'}:{display:'flex'}} className="showEWM">
                    <div className="box">
                        <p>请选择要变更的修理厂 <span style={{float:'right',color:'#1083D1'}} onClick={this.choseaddress}>地图点选修理厂</span></p>
                        <ul>
                            <li>
                                {this.state.xlcData && <span onClick={()=>{$('input[name=xlcName]').val('')}}></span>}
                                <input type="text" name="xlcName" placeholder="修理厂名称*必填" onChange={this.xlcHandleChange} onFocus={this.xlcHandleChange} onBlur={this.TBlur}/>
                                {/*<input className="mapButtom" type="button" value="地图点选" onClick={this.Choice.bind(this,'open')}/>*/}
                                <div className="brandItem" style={{height:'3rem',position:'absolute',overflow:'hidden'}}>
                                    <ul
                                        onTouchEnd={this.touchs.bind(this,'end')}
                                        onTouchMove={this.touchs.bind(this,'move')}
                                        onTouchStart={this.touchs.bind(this,'start')}
                                        style={{overflow:'hidden',position:'relative'}}
                                    >
                                        {this.state.XCCList}
                                    </ul>
                                </div>

                            </li>
                        </ul>
                        <div className="buttons">
                            <input onClick={this.changeXLC.bind(this,'open')}  type="button" value="取消"/>
                            <input type="button" value="确定" onClick={this.submits}/>
                        </div>
                    </div>
                </div>
                {this.state.showEWM && <ShowEWM showEWM={this.showEWM} texts='查看二维码' imgPath={this.state.text}/>}
                {this.state.mapState&&<div className="SMap"><VehicleInfo xlcRepairLevel={detailsData.xlcRepairLevel} Choice={this.Choice}/></div>}

            </div>
        )
    }
})

export default Detail