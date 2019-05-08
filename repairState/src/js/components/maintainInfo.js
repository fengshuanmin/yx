/**
 * Created by 23174 on 2017/9/13.
 */
import React from 'react'
import $ from 'jquery'
const Detail = React.createClass({
    getInitialState(){
        return {
            activeItem: 0,
            dataState: {},
            xStart: [],
            xLeft: 0,
            timeInfo:{'inRepairTime':null,'waitRepairTime':null,'sheetMetalTime':null,'overRepairTime':null,outRepairTime:null},
            repairOneList:[],
            repairTwoList:[],
            repairThreeList:[],
            repairFourList:[],
            imgDivLength:0,
            lendiv1:0,
            lendev2:0,
            lendev3:0
        }
    },
    componentWillMount(){
        document.getElementById('appWrapper').scrollTop=0
    },
    componentDidMount(){
        this.serverRequest({'pushTaskId': this.props.location.state.taskId})
        // console.log('woshi',document.getElementsByClassName('imgSingle').length)
        // for (let i of document.getElementsByClassName('itemImgs')) {
        //     i.style.width = (i.getElementsByClassName('imgSingle').length) * 2.2 - 0.2 + 'rem'
        //     console.log('啊啊啊啊',(i.getElementsByClassName('imgSingle').length) * 2.2)
        // }
        this.setState({xState: document.getElementsByClassName('itemImgs')[0].offsetLeft},()=>{ console.log('chushi111',this.state.xState)})
        this.setState({tState: document.getElementsByClassName('itemTitle')[0].offsetLeft})
    },
    serverRequest(data){
        console.log('开始查询');
        $.ajax({
            url: "/lexiugo-app/weixin/getWeixiuImages",
            data: data,
            dataType: "json",
            type: "post",
            success: function (msg) {
                console.log('查询结果', msg)
                if (msg.code == "0000") {
                    this.setState({dataState: msg.data})
                    if(msg.data.lxPushHistory){
                        this.setState({timeInfo: msg.data.lxPushHistory})
                    }
                    this.setState({timeInfo1:this.getLocalTime(this.state.timeInfo.inRepairTime)},()=>{console.log('222',typeof this.state.timeInfo1)})
                    this.setState({timeInfo2:this.getLocalTime(this.state.timeInfo.waitRepairTime)},()=>{console.log('222',typeof this.state.timeInfo2)})
                    this.setState({timeInfo3:this.getLocalTime(this.state.timeInfo.sheetMetalTime)})
                    this.setState({timeInfo4:this.getLocalTime(this.state.timeInfo.overRepairTime)})
                    this.setState({timeInfo5:this.getLocalTime(this.state.timeInfo.outRepairTime)})
                    this.setState({repairOneList:msg.data.repairOneList})
                    this.setState({repairTwoList:msg.data.repairTwoList})
                    this.setState({repairFourList:msg.data.repairFourList})
                    this.setState({repairThreeList:msg.data.repairThreeList},()=>{this.setState({xState: document.getElementsByClassName('itemImgs')[0].offsetLeft},()=>{ console.log('chushi111',this.state.xState)})})
                    // console.log(this.state.timeInfo1,this.state.timeInfo2,this.state.timeInfo3,this.state.timeInfo4,this.state.timeInfo5)
                    let lengthDiv=0
                    let lendiv1=0
                    let lendev2=0
                    let lendev3=0
                    if(this.state.repairOneList.length>0){
                        lengthDiv++
                        this.setState({lendiv1: 1})
                    }
                    if(this.state.repairTwoList.length>0){
                        lengthDiv++
                        this.setState({lendiv2: 1})
                    }
                    if(this.state.repairThreeList.length>0){
                        lengthDiv++
                        this.setState({lendev3: 1})
                    }
                    this.setState({imgDivLength: lengthDiv})




                }
            }.bind(this),
            error: function (eee) {
                this.setState({modalState: false});
                console.log(eee)
            }.bind(this)
        });
    },
    componentWillMount(){
        const data = this.props.location.state;
        this.setState({dataState: data})
    },
    chooseItem(index, e){
        this.state.activeItem = index
    },
    tStart(index, e){
        console.log('tStart',index)
        if (document.getElementsByClassName('itemImgs')[index].getElementsByClassName('imgSingle').length < 4) {
            return
        }
        let firstx = document.getElementsByClassName('itemImgs')[index].offsetLeft - this.state.xState
        this.setState({xStart: e.touches[0].pageX})
        this.setState({xLeft: firstx})
    },
    tMove(index, e){
        console.log('tMove',index)
        if (document.getElementsByClassName('itemImgs')[index].getElementsByClassName('imgSingle').length < 4) {
            return
        }
        const pagex = e.touches[0].pageX - this.state.xStart
        document.getElementsByClassName('itemImgs')[index].style.left = this.state.xLeft + pagex + 'px'
    },
    tEnd(index, e){
        console.log('end',index)
        if (document.getElementsByClassName('itemImgs')[index].getElementsByClassName('imgSingle').length < 4) {
            return
        }
        if ((document.getElementsByClassName('itemImgs')[index].offsetLeft - this.state.xState) > 0) {
            document.getElementsByClassName('itemImgs')[index].style.left = 0
        }
        console.log(document.getElementsByClassName('itemImgs')[index].offsetLeft)
        console.log(document.getElementsByClassName('itemImgs')[index].style.left)
        if (document.getElementsByClassName('itemImgs')[index].offsetLeft < -(document.getElementsByClassName('itemImgs')[index].offsetWidth - document.body.offsetWidth + this.state.tState)) {
            document.getElementsByClassName('itemImgs')[index].style.left = -(document.getElementsByClassName('itemImgs')[index].offsetWidth - document.body.offsetWidth + this.state.tState + this.state.xState) + 'px'
        }
    },
    getLocalTime(nS) {
        if(nS==null){
            return
        }
        let now=new Date(nS)
        var   month=now.getMonth()+1;
        var   date=now.getDate();
        var   hour=now.getHours();
        hour<10?(hour='0'+hour):''
        var   minute=now.getMinutes();
        minute<10?(minute='0'+minute):''
        var   second=now.getSeconds();
        second<10?(second='0'+second):''
        return   month+"月"+date+"日 "+hour+":"+minute+":"+second;
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
    toItem(m,n,x,e){
        // for(let i=0;i<$('.routerItem').length;i++){
        //     $('.routerItem').eq(i).css('color','black')
        // }
        // $('.routerItem').eq(x).css('color','rgb(42,146,248)')
        this.props.history.pushState(m, n)
    },

    render(){
        const detailsData = this.state.dataState;
        let timeInfo=this.state.timeInfo
        let timeList=this.state.repairOneList
        let slide1=this.state.repairOneList
        let slideImg1=[]
        for(let i=0;i<slide1.length;i++){
            slideImg1.push(
                <div className="imgSingle"><img style={{width:'100%',height:'100%'}} onClick={this.showImg.bind(this,slide1,i)} src={'/toumingxiu/jyshowPhoto/getUrl.do?photoUrl='+slide1[i]} /></div>
            )
        }
        let slide2=this.state.repairTwoList
        let slideImg2=[]
        for(let i=0;i<slide2.length;i++){
            slideImg2.push(
                <div className="imgSingle"><img style={{width:'100%',height:'100%'}} onClick={this.showImg.bind(this,slide2,i)} src={'/toumingxiu/jyshowPhoto/getUrl.do?photoUrl='+slide2[i]} /></div>
            )
        }
        let slide3=this.state.repairThreeList ||[]
        let slideImg3=[]
        for(let i=0;i<slide3.length;i++){
            slideImg3.push(
                <div className="imgSingle"><img style={{width:'100%',height:'100%'}} onClick={this.showImg.bind(this,slide3,i)} src={'/toumingxiu/jyshowPhoto/getUrl.do?photoUrl='+slide3[i]} /></div>
            )
        }

        let slide5=this.state.repairFourList
        let slideImg5=[]
        for(let i=0;i<slide5.length;i++){
            slideImg5.push(
                <div className="imgSingle"><img style={{width:'100%',height:'100%'}} onClick={this.showImg.bind(this,slide5,i)} src={'/toumingxiu/jyshowPhoto/getUrl.do?photoUrl='+slide5[i]} /></div>
            )
        }

        let imgDivLength=this.state.imgDivLength
        return (
            <div className="maintainItems">
                <div className="maintainItem">
                    <div className="itemTitle">
                        <div className="itemImg">
                            {/*<img src={require('../../img/maintainInfo2.png')} style={timeInfo.outRepairTime==null?{display:'block'}:{display:'none'}}/>*/}
                            {/*<img src={require('../../img/maintainInfo1.png')} style={timeInfo.outRepairTime==null?{display:'none'}:{display:'block'}}/>*/}
                            <img src={require('../../img/maintainInfo2.png')} style={timeInfo.outRepairTime==null?{display:'block'}:{display:'none'}}/>
                            <img src={require('../../img/maintainInfo1.png')} style={timeInfo.outRepairTime==null?{display:'none'}:{display:'block'}}/>
                        </div>
                        <span className="itemSpan">车辆出厂</span>
                        <span className="itemSpan itemTime">{this.state.timeInfo5}</span>
                    </div>
                    <div className="itemBottomBorder"></div>
                </div>
                <div className="maintainItem">
                    <div className="itemTitle">
                        <div className="itemImg">
                            <img src={require('../../img/maintainInfo2.png')} style={slide3.length==0?{display:'block'}:{display:'none'}}/>
                            <img src={require('../../img/maintainInfo1.png')} style={slide3.length==0?{display:'none'}:{display:'block'}}/>
                        </div>
                        <span className="itemSpan">维修完成</span>
                        <span className="itemSpan itemTime">{this.state.timeInfo4}</span>
                    </div>
                    <div className='imgsDiv' style={slide3.length>0?{display:'block'}:{display:'none'}}>
                        <div style={{width:slideImg3.length*2.2-0.2+'rem'}} className="itemImgs" onTouchStart={this.tStart.bind(this,0)}
                             onTouchMove={this.tMove.bind(this,0)} onTouchEnd={this.tEnd.bind(this,0)}>
                            {slideImg3}
                        </div>
                    </div>
                    <div className="itemBottomBorder"></div>
                </div>
                <div className="maintainItem">
                    <div className="itemTitle">
                        <div className="itemImg">
                            <img src={require('../../img/maintainInfo2.png')} style={slide2.length==0?{display:'block'}:{display:'none'}}/>
                            <img src={require('../../img/maintainInfo1.png')} style={slide2.length==0?{display:'none'}:{display:'block'}}/>
                        </div>
                        <span className="itemSpan">钣金喷漆</span>
                        <span className="itemSpan itemTime">{this.state.timeInfo3}</span>
                    </div>
                    <div className='imgsDiv' style={slide2.length>0?{display:'block'}:{display:'none'}}>
                        <div style={{width:slideImg2.length*2.2-0.2+'rem'}} className="itemImgs" onTouchStart={this.tStart.bind(this,1)}
                             onTouchMove={this.tMove.bind(this,1)} onTouchEnd={this.tEnd.bind(this,1)}>
                            {slideImg2}
                        </div>
                    </div>
                    <div className="itemBottomBorder"></div>
                </div>
                {slide5[0] &&
                    <div className="maintainItem">
                        <div className="itemTitle">
                            <div className="itemImg">
                                <img src={require('../../img/maintainInfo2.png')}
                                     style={slide5.length == 0 ? {display: 'block'} : {display: 'none'}}/>
                                <img src={require('../../img/maintainInfo1.png')}
                                     style={slide5.length == 0 ? {display: 'none'} : {display: 'block'}}/>
                            </div>
                            <span className="itemSpan">配件图片</span>
                            <span className="itemSpan itemTime"></span>
                        </div>
                        <div className='imgsDiv' style={slide5.length > 0 ? {display: 'block'} : {display: 'none'}}>
                            <div style={{width: slideImg5.length * 2.2 - 0.2 + 'rem'}} className="itemImgs"
                                 onTouchStart={this.tStart.bind(this, 0)}
                                 onTouchMove={this.tMove.bind(this, 0)} onTouchEnd={this.tEnd.bind(this, 0)}>
                                {slideImg5}
                            </div>
                        </div>
                        <div className="itemBottomBorder"></div>
                    </div>
                }
                <div className="maintainItem">
                    <div className="itemTitle">
                        <div className="itemImg">
                            <img src={require('../../img/maintainInfo2.png')} style={slide1.length==0?{display:'block'}:{display:'none'}}/>
                            <img src={require('../../img/maintainInfo1.png')} style={slide1.length==0?{display:'none'}:{display:'block'}}/>
                        </div>
                        <span className="itemSpan">维修待命</span>
                        <span className="itemSpan itemTime">{this.state.timeInfo2}</span>
                    </div>
                    <div className='imgsDiv' style={slide1.length>0?{display:'block'}:{display:'none'}}>
                        <div style={{width:slideImg1.length*2.2-0.2+'rem'}} className="itemImgs" onTouchStart={this.tStart.bind(this,2)}
                             onTouchMove={this.tMove.bind(this,2)} onTouchEnd={this.tEnd.bind(this,2)}>
                            {slideImg1}
                        </div>
                    </div>
                    <div className="itemBottomBorder"></div>
                </div>
                <div className="maintainItem">
                    <div className="itemTitle">
                        <div className="itemImg">
                            <img src={require('../../img/maintainInfo2.png')} style={timeInfo.inRepairTime==null && (this.props.location.state.taskState =='未接收' || this.props.location.state.taskState =='修理厂放弃')?{display:'block'}:{display:'none'}}/>
                            <img src={require('../../img/maintainInfo1.png')} style={timeInfo.inRepairTime==null && (this.props.location.state.taskState =='未接收' || this.props.location.state.taskState =='修理厂放弃') ?{display:'none'}:{display:'block'}}/>
                        </div>
                        <span className="itemSpan">车辆到店</span>
                        <span className="itemSpan itemTime">{this.state.timeInfo1}</span>
                    </div>
                    <div className="itemBottomBorder"></div>
                </div>
            </div>
        )
    }
})

export default Detail