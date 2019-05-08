/**
 * Created by 23174 on 2017/9/13.
 */
import React from 'react'
import $ from 'jquery'

const Detail = React.createClass({
    getInitialState(){
        return {
            activeItem: 0,
            pagesNum1: 0,
            pagesNum2: 0,
            pagesNum3: 0,
            showPages: false,
            // 选择框默认页码
            pageIndex: 0,
            checkRate:false,
            listFl: [],
            listGs: [],
            listParts: [],
            priceTotal: {},
            pagesShow1: false,
            messageList: []
        }
    },
    componentDidUpdate(){

    },
    componentDidMount(){
        // const data = this.props.data||this.props.location.state;
        // this.setState({dataState: data})
        // console.log(this.props.location.state)

    },
    nihao(num){
        if(this.state.zongJia != num){
            this.setState({
                zongJia:num
            })
        }
    },
    serverRequest (data){
        console.log('开始查询',data);
        $.ajax({
            url: "/lexiugo-app/skyNet/getEvalInfo",
            data: data,
            dataType: "json",
            type: "post",
            success: function (msg) {
                console.log('查询结果', msg)
                if (msg.code == "0000" || msg.code == "0006") {
                    this.setState({dataState: msg},()=>{
                    })
                    this.props.keepListParts && this.props.keepListParts(this)
                    this.setState({listGs: msg.data.listGs})
                    this.setState({listFl: msg.data.listFl})
                    this.setState({listParts: msg.data.listParts}, () => {
                        this.props.dataType&&this.props.dataType(this);
                        for(let i of msg.data.listParts){
                            if(i.partType==1||i.partType==2||i.partType==3||i.partType==4||i.partType==5||i.partType==6){
                                this.setState({checkRate:true})
                            }
                        }
                        if (this.state.listParts.length > 10) {
                            this.setState({pagesShow1: true})
                        }
                        if (this.state.listGs.length > 10) {
                            this.setState({pagesShow2: true})
                        }
                        if (this.state.listFl.length > 10) {
                            this.setState({pagesShow3: true})
                        }
                    })
                    this.setState({priceTotal: msg.data.priceTotal})
                    this.setState({messageList: msg.data.messageList})
                    this.setState({pagesNum1: parseInt((msg.data.listParts.length - 1) / 10) + 1})
                    this.setState({pagesNum2: parseInt((msg.data.listGs.length - 1) / 10) + 1})
                    this.setState({pagesNum3: parseInt((msg.data.listFl.length - 1) / 10) + 1})
                    // document.getElementById('appWrapper').addEventListener('scroll', this.orderScroll2.bind(this));
                }
            }.bind(this),
            error: function (eee) {
                this.setState({modalState: false});
                console.log(eee)
            }.bind(this)
        });
    },
    componentWillMount(){
        document.getElementById('appWrapper').scrollTop=0
        this.setState({Tthis: this})
        console.log('4444444444',this.props.location.state,this.props.data)
        const data = this.props.datasent || this.props.location.state;
        this.setState({dataState: data}, () => {
            this.setState({accessoryindex: 0})
            this.setState({timeindex: 0})
            this.setState({materialindex: 0})
            this.setState({layerEnd: 0})
            this.setState({layerEndF: 0})
            this.setState({pushTaskId: data.taskId})
            this.serverRequest({'pushTaskId': data.taskId})
        })
    },
    chooseItem(index, e){
        this.state.activeItem = index
    },
    layerStart(e){
        console.log('开始')
        e.stopPropagation();
        e.preventDefault();
        $('body').css({overflow: 'hidden'})
        $('.loseInfo').eq(0).css({overflow: 'hidden'})
        this.setState({layerStart: e.touches[0].pageY})
    },
    layerMove(e){
        e.stopPropagation();
        e.preventDefault();
        $('body').css({overflow: 'hidden'})
        $('.loseInfo').eq(0).css({overflow: 'hidden'})
        const pagey = e.touches[0].pageY - this.state.layerStart   // 走过的y轴值
        const degy = pagey * 360 / (2 * 3.14 * 100) % 360  // 走过的y弧度 并取余数
        if ((this.state.layerEndF + degy) < 0 || (this.state.layerEndF + degy) > this.state.numsDeg) {
            return
        }
        this.setState({layerEnd: degy})   // 保存这个y弧度
        for (let i = 0, divDeg = 0, divOpercity = 0, divFontSize = 0; i < 24; i++) {
            divDeg = Math.abs((-this.state.layerEndF - degy + 15 * i) % 360)
            if (divDeg >= 90 && divDeg <= this.state.numsDeg) {
                $('.divLayer').eq(i).css({opacity: 0})
            }
            if (divDeg < 90) {
                divOpercity = 1 - divDeg / 90;
                divFontSize = divOpercity * 20 + 'px'
                $('.divLayer').eq(i).css({opacity: divOpercity, fontSize: divFontSize})
            }
            if (divDeg > this.state.numsDeg) {
                divOpercity = 1 - (360 - divDeg) / 90;
                divFontSize = divOpercity * 20 + 'px'
                $('.divLayer').eq(i).css({opacity: divOpercity, fontSize: divFontSize})
            }
        }
        $('#layerMain').css({'transform': 'rotatex(' + (-this.state.layerEndF - degy) + 'deg)'});
    },
    layerEnd(e){
        e.stopPropagation();
        e.preventDefault();
        $('body').css({overflow: 'scroll'})
        $('.loseInfo').eq(0).css({overflow: 'scroll'})
        let yy = this.state.layerEndF + this.state.layerEnd
        if (yy < 0 || yy > this.state.numsDeg) {
            return
        }
        let pageindex = Math.ceil((yy - 7.5) / 15)
        if (pageindex < 0) {
            pageindex = 0
        }
        this.setState({pageIndex: pageindex})
        this.setState({layerEndF: yy})
    },
    changePage(index, nums, e){
        for (let i = 0; i < nums; i++) {
            document.getElementsByClassName('divLayer')[i].innerHTML = i + 1
        }
        this.setState({numsDeg: (nums - 1) * 15})
        if (index == 0) {
            this.setState({layerEndF: 15 * this.state.accessoryindex}, () => {
                for (let i = 0, divDeg = 0, divOpercity = 0, divFontSize = 0; i < 24; i++) {
                    divDeg = Math.abs((-this.state.layerEndF + 15 * i) % 360)
                    if (divDeg >= 90 && divDeg <= this.state.numsDeg) {
                        $('.divLayer').eq(i).css({opacity: 0})
                    }
                    if (divDeg < 90) {
                        divOpercity = 1 - divDeg / 90;
                        divFontSize = divOpercity * 20 + 'px'
                        $('.divLayer').eq(i).css({opacity: divOpercity, fontSize: divFontSize})
                    }
                    if (divDeg > this.state.numsDeg) {
                        divOpercity = 1 - (360 - divDeg) / 90;
                        // console.log('透明度',divOpercity)
                        divFontSize = divOpercity * 20 + 'px'
                        $('.divLayer').eq(i).css({opacity: divOpercity, fontSize: divFontSize})
                    }
                }
                $('#layerMain').css({'transform': 'rotatex(' + (-this.state.layerEndF) + 'deg)'});
                this.setState({showPages: true})
            })
        } else if (index == 1) {
            this.setState({layerEndF: 15 * this.state.timeindex}, () => {
                for (let i = 0, divDeg = 0, divOpercity = 0, divFontSize = 0; i < 24; i++) {
                    divDeg = Math.abs((-this.state.layerEndF + 15 * i) % 360)
                    if (divDeg >= 90 && divDeg <= this.state.numsDeg) {
                        $('.divLayer').eq(i).css({opacity: 0})
                    }
                    if (divDeg < 90) {
                        divOpercity = 1 - divDeg / 90;
                        divFontSize = divOpercity * 20 + 'px'
                        $('.divLayer').eq(i).css({opacity: divOpercity, fontSize: divFontSize})
                    }
                    if (divDeg > this.state.numsDeg) {
                        divOpercity = 1 - (360 - divDeg) / 90;
                        // console.log('透明度',divOpercity)
                        divFontSize = divOpercity * 20 + 'px'
                        $('.divLayer').eq(i).css({opacity: divOpercity, fontSize: divFontSize})
                    }
                }
                $('#layerMain').css({'transform': 'rotatex(' + (-this.state.layerEndF) + 'deg)'});
                this.setState({showPages: true})
            })
        } else {
            this.setState({layerEndF: 15 * this.state.materialindex}, () => {
                for (let i = 0, divDeg = 0, divOpercity = 0, divFontSize = 0; i < 24; i++) {
                    divDeg = Math.abs((-this.state.layerEndF + 15 * i) % 360)
                    if (divDeg >= 90 && divDeg <= this.state.numsDeg) {
                        $('.divLayer').eq(i).css({opacity: 0})
                    }
                    if (divDeg < 90) {
                        divOpercity = 1 - divDeg / 90;
                        divFontSize = divOpercity * 20 + 'px'
                        $('.divLayer').eq(i).css({opacity: divOpercity, fontSize: divFontSize})
                    }
                    if (divDeg > this.state.numsDeg) {
                        divOpercity = 1 - (360 - divDeg) / 90;
                        divFontSize = divOpercity * 20 + 'px'
                        $('.divLayer').eq(i).css({opacity: divOpercity, fontSize: divFontSize})
                    }
                }
                $('#layerMain').css({'transform': 'rotatex(' + (-this.state.layerEndF) + 'deg)'})
                this.setState({showPages: true})
            })
        }
        this.setState({changeItem: index})
    },
    pageCancel(){
        this.setState({showPages: false})
    },
    keepHight(){
        console.log('开始高',document.getElementsByClassName('Detail')[0].offsetHeight)
      this.setState({laterHeight:document.getElementsByClassName('Detail')[0].offsetHeight},()=>{
          // console.log(document.getElementsByClassName('Detail')[0].offsetHeight)
          // console.log('保存的高',this.state.laterHeight)
          // console.log(document.getElementsByClassName('Detail')[0].offsetHeight-this.state.laterHeight)
          document.getElementById('appWrapper').scrollTop=document.getElementById('appWrapper').scrollTop+document.getElementsByClassName('Detail')[0].offsetHeight-this.state.laterHeight
          console.log('keepHeight',document.getElementById('appWrapper').scrollTop,document.getElementsByClassName('Detail')[0].offsetHeight)
          console.log('后到达的',document.getElementById('appWrapper').scrollTop)
      })
    },
    pageConfirm(){
        if (this.state.changeItem == 0) {
            this.setState({accessoryindex: this.state.pageIndex})
        } else if (this.state.changeItem == 1) {
            console.log('到了第二个', this.state.pageIndex)
            this.setState({timeindex: this.state.pageIndex})
        } else {
            this.setState({materialindex: this.state.pageIndex})
        }
        this.setState({showPages: false})
    },
    lookQuote(){
        console.log('taskid',this.state.pushTaskId)
        this.props.history.pushState(this.state.pushTaskId, '/quote')
    },
    render(){
        let {accessoryindex, timeindex, materialindex, priceTotal} = this.state
        if (accessoryindex < 0) {
            accessoryindex = 0
        }
        if (accessoryindex > this.state.pagesNum1) {
            accessoryindex = this.state.pagesNum1 - 1
        }
        if (timeindex < 0) {
            timeindex = 0
        }
        if (timeindex > this.state.pagesNum2) {
            timeindex = this.state.pagesNum2 - 1
        }
        if (materialindex < 0) {
            materialindex = 0
        }
        if (materialindex > this.state.pagesNum3) {
            materialindex = this.state.pagesNum3 - 1
        }
        let listFl = this.state.listFl
        let listGs = this.state.listGs
        let listParts = this.state.listParts
        let accessorypage = []
        let timepage = []
        // 少于10个的计算
        let accessoryLast = 0
        if (listParts.length < (10 * this.state.accessoryindex + 10)) {
            accessoryLast = listParts.length
        } else {
            accessoryLast = 10 * this.state.accessoryindex + 10
        }
        // 单价计算
        let accessoryAllPrice = 0, accessoryManage = 0,accessorypartCz=0
        for (let i = 0; i < listParts.length; i++) {
            if (listParts[i].jmPrice == 0 || listParts[i].jmPrice == null) {
                accessoryAllPrice += (listParts[i].lossPrice * listParts[i].partNum)
            } else {
                accessoryAllPrice += (listParts[i].jmPrice * listParts[i].partNum)
            }
            console.log(listParts[i].partCz)
            accessoryManage += parseFloat((listParts[i].manageFee == null ? 0.00 : listParts[i].manageFee).toFixed(2))
            accessorypartCz +=(listParts[i].partCz || 0)*1
        }
        for (let i = this.state.accessoryindex * 10; i < accessoryLast; i++) {
            accessorypage.push(
                <tbody className="losePartBody">
                <tr className="accessoryInfo accessoryInfoFirst" style={{backgroundColor: '#fff'}}>
                    <td style={{width: '1.24rem', padding: '.1rem .05rem .1rem .16rem'}}>
                        {listParts[i].partStandard}
                    </td>
                    <td
                        style={{
                            width: '1rem', padding: '.1rem 0.05rem'
                        }}>{
                            listParts[i].priceFlag == 1 ?
                                (listParts[i].partType == 1 ? '原厂流通件' : (listParts[i].partType == 2 ? 'OEM件' : (listParts[i].partType == 3 ? '认证件' : (listParts[i].partType == 4 ? '品牌件' : (listParts[i].partType == 5 ? '拆车件' : (listParts[i].partType == 6 ? '其他' : '修理厂自采')))))):
                                (listParts[i].partType == 1 ? '修理厂自采(原厂流通件)' : (listParts[i].partType == 2 ? '修理厂自采(OEM件)' : (listParts[i].partType == 3 ? '修理厂自采(认证件)' : (listParts[i].partType == 4 ? '修理厂自采(品牌件)' : (listParts[i].partType == 5 ? '修理厂自采(拆车件)' : (listParts[i].partType == 6 ? '修理厂自采(其他)' : '修理厂自采'))))))
                        }</td>
                    <td style={{width: '.8rem'}}>{listParts[i].partNum}</td>
                    <td
                        style={{
                            width: '1.3rem',
                            fontSize: '0.22rem'
                        }}>{'￥' + (listParts[i].jmPrice == null || listParts[i].jmPrice == 0 ? (listParts[i].lossPrice == null ? 0.00 : listParts[i].lossPrice) : (listParts[i].jmPrice == null ? 0.00 : listParts[i].jmPrice)).toFixed(2)}</td>
                    <td
                        style={{
                            width: '1.4rem',
                            fontSize: '0.22rem'
                        }}>{'￥' + ((listParts[i].jmPrice == null || listParts[i].jmPrice == 0 ? (listParts[i].lossPrice == null ? 0.00 : listParts[i].lossPrice) : (listParts[i].jmPrice == null ? 0.00 : listParts[i].jmPrice)) * listParts[i].partNum).toFixed(2)}</td>
                    <td style={{width: '2.1rem'}}>
                        {'￥' + (((listParts[i].jmPrice == 0 || listParts[i].jmPrice == null ? (listParts[i].lossPrice == null ? 0.00 : listParts[i].lossPrice) : listParts[i].jmPrice) * listParts[i].partNum + (listParts[i].manageFee == null ? 0.00 : listParts[i].manageFee))-(listParts[i].partCz||0)).toFixed(2)}
                    </td>
                </tr>
                <tr className="accessoryDetail">
                    <td colSpan={'6'}>
                        <table style={{padding: '0',width:'94vw',margin:'1vw 3vw',background:'#f4f8fb',borderRadius:'6px',padding:'0.1rem'}}>
                            <tr>
                                <td style={{padding: '0.1rem 0', width: '3rem',textAlign:'left'}}>
                                    <span style={{textAlign:'left'}}>
                                        <span style={{textAlign:'left'}}>零件号:</span>
                                        <span style={{textAlign:'left'}}>{listParts[i].factPartCode}</span>
                                    </span>
                                </td>
                                <td style={{padding: '0.1rem 0', width: '3rem',textAlign:'left'}}>
                                    {this.state.dataState.code == '0000' &&
                                        <span style={{textAlign: 'left'}}>
                                            <span style={{textAlign: 'right'}}>残值:</span>
                                            <span
                                                style={{textAlign: 'left'}}>{'￥' + (parseFloat(listParts[i].partCz) || 0).toFixed(2)}</span>
                                        </span>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td style={{padding: '0.1rem 0', width: '3.2rem',textAlign:'left'}}>
                                    <span style={{textAlign:'left'}} onBlur={this.props.rateblur ? this.props.rateblur.bind(this, this.state.Tthis, i) : ''} >
                                        <span style={{paddingRight:'0.1rem',textAlign:'right'}}>管理费率:</span>
                                        <span style={this.props.rateblur && this.props.location.state.lossState ==1 && listParts[i].partType && listParts[i].priceFlag==1 ? {border:'1px solid #ccc',display:'inline-block',padding:'0.04rem 0rem',minWidth:'1rem',textAlign:'left'}:{textAlign:'left'}} onClick={this.props.rate ? this.props.rate.bind(this, this.state.Tthis, i) : ''}>{(listParts[i].manageFeePct == null ? 0.00 :listParts[i].manageFeePct * 100).toFixed(0)}</span>
                                        <span style={{textAlign:'left'}}>%</span>
                                    </span>
                                </td>
                                <td style={{padding: '0.1rem 0', width: '3rem',textAlign:'left'}}>
                                    <span style={{textAlign:'left'}}>
                                        <span style={{textAlign:'left'}}>管理费:</span>
                                        <span style={{textAlign:'left'}}>{'￥' + (listParts[i].manageFee == null ? 0.00 : listParts[i].manageFee).toFixed(2)}</span>
                                    </span>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                </tbody>
            )
        }
        let timeLast = 0
        if (listGs.length < (10 * this.state.timeindex + 10)) {
            timeLast = listGs.length
        } else {
            timeLast = 10 * this.state.timeindex + 10
        }
        let workAllPrice = 0
        for (let i = 0; i < listGs.length; i++) {
            workAllPrice += listGs[i].repairPrice
        }
        for (let i = this.state.timeindex * 10; i < timeLast; i++) {
            timepage.push(
                <div>
                    <div className="timeInfo">
                        <span style={{width: '2rem'}}>{listGs[i].repairItemName}</span>
                        <span style={{width: '1.7rem', textAlign: 'center'}}>{listGs[i].repairName}</span>
                        <span style={{
                            width: '1.4rem',
                            textAlign: 'center',
                            fontSize: '.22rem'
                        }}>{listGs[i].manHour}</span>
                        <span style={{
                            width: '1.7rem',
                            textAlign: 'center',
                            fontSize: '.22rem'
                        }}>{'￥' + listGs[i].repairPrice.toFixed(2)}</span>
                    </div>
                </div>
            )
        }
        let flpage = []
        let flLast = 0
        if (listFl.length < (10 * this.state.materialindex + 10)) {
            flLast = listFl.length
        } else {
            flLast = 10 * this.state.materialindex + 10
        }
        let flAllPrice = 0
        for (let i = 0; i < listFl.length; i++) {
            flAllPrice += (listFl[i].accountg||0) * (listFl[i].unitPrice||0)
        }
        for (let i = this.state.materialindex * 10; i < flLast; i++) {
            flpage.push(
                <div>
                    <div className="timeInfo">
                        <span style={{width: '2rem'}}>{listFl[i].materialName}</span>
                        <span style={{
                            width: '1.7rem',
                            textAlign: 'center',
                            fontSize: '.22rem'
                        }}>{listFl[i].accountg}</span>
                        <span style={{
                            width: '1.4rem',
                            textAlign: 'center',
                            fontSize: '.22rem'
                        }}>{'￥' + (listFl[i].unitPrice.toFixed(2))}</span>
                        <span style={{
                            width: '1.7rem',
                            textAlign: 'center',
                            fontSize: '.22rem'
                        }}>{'￥' + (listFl[i].accountg * listFl[i].unitPrice).toFixed(2)}</span>
                    </div>
                </div>
            )
        }
        let messageList = this.state.messageList
        let messpage = []
        for (let i = 0; i < messageList.length; i++) {
            messpage.push(
                <div className="messpageItem feedBackItem">
                    <div className="accessoryInfo">
                        <span style={{width: '2rem'}}>{messageList[i].feedname}</span>
                        <span style={{
                            float: 'right',
                            color: 'rgba(7,17,27,0.3)'
                        }}>{messageList[i].createdtime.split(".")[0]}</span>
                    </div>
                    <div>{messageList[i].lossmessage}</div>
                </div>
            )
        }
        return (
            <div className="loseInfo">
                <div className="changeInfo">
                    <div className="detailsList" style={{padding: '0.3rem 0 0.2rem'}}>
                        <div style={{margin: '0 0.3rem 0.2rem'}}>
                            <div className="detailH">换件信息 {/*{this.props.showFLTS && <span style={{fontWeight:500,color:'#666;'}} className="iconfonts" onClick={this.props.showFLTS}>&#xe602;</span>*/}{/*}*/}</div>
                            <div className="checkQuote" onClick={this.lookQuote} style={this.state.checkRate?{display:'block'}:{display:'none'}}>查看报价
                                <svg aria-hidden="true" className="icon">
                                    <use xlinkHref={'#icon-iconfontyoujiantou'}></use>
                                </svg>
                            </div>
                        </div>
                        <table style={{padding:'0',border:'none',borderBottom:'0.5px solid #d7dee3',borderCollapse:'collapse'}}>
                        <tr className="losePartsTh" style={{borderBottom:'0.5px solid #d7dee3'}}>
                            <td style={{width: '1.27rem',borderRight:'0.5px solid #d7dee3'}}>
                                名称
                            </td>
                            <td
                                style={{
                                    width: '1.02rem',borderRight:'0.5px solid #d7dee3'
                                }}>品质
                            </td>
                            <td style={{width: '.76rem',borderRight:'0.5px solid #d7dee3'}}>数量</td>
                            <td
                                style={{
                                    width: '1.31rem',borderRight:'0.5px solid #d7dee3'
                                }}>单价
                            </td>
                            <td
                                style={{
                                    width: '1.42rem',borderRight:'0.5px solid #d7dee3'
                                }}>总价
                            </td>
                            <td style={{width: '2.1rem'}}>
                                小计(含管理费)
                            </td>
                        </tr>
                        {/*</tbody>*/}
                        {/*为了以后滑动不要删*/}
                        {/*<div className="accessoryDiv">*/}
                        {/*<div className="accessoryPages">*/}
                        {accessorypage}</table>
                        {/*</div>*/}
                        {/*</div>*/}
                        <div className="accessoryPageIndex"
                             style={this.state.pagesShow1 ? {display: 'block'} : {display: 'none'}}>
                            <div className="indexPage indexLast"
                                 onClick={() => {this.setState({accessoryindex: accessoryindex - 1});this.keepHight()}}>上一页
                            </div>
                            <div className="indexPage index"
                                 onClick={this.changePage.bind(this, 0, this.state.pagesNum1)}>{accessoryindex + 1}/{this.state.pagesNum1}
                            </div>
                            <div className="indexPage indexNext"
                                 onClick={() => {if(accessoryindex==this.state.pagesNum1-1){return};this.setState({accessoryindex: accessoryindex + 1});this.keepHight()}}>下一页
                            </div>
                        </div>
                        <div className="pageLayer"
                             style={this.state.showPages ? {display: 'block'} : {display: 'none'}}>
                            <div className="layerTitle">
                                <div onClick={this.pageCancel}>取消</div>
                                <div onClick={this.pageConfirm}>确定</div>
                            </div>
                            <div className="layerMain" id="layerMain" onTouchStart={this.layerStart}
                                 onTouchMove={this.layerMove} onTouchEnd={this.layerEnd}>
                                <div className="divLayer div1_1"></div>
                                <div className="divLayer div1_2"></div>
                                <div className="divLayer div1_3"></div>
                                <div className="divLayer div1_4"></div>
                                <div className="divLayer div1_5"></div>
                                <div className="divLayer div1_6"></div>
                                <div className="divLayer div1_7"></div>
                                <div className="divLayer div1_8"></div>
                                <div className="divLayer div1_9"></div>
                                <div className="divLayer div1_10"></div>
                                <div className="divLayer div1_11"></div>
                                <div className="divLayer div1_12"></div>
                                <div className="divLayer div1_13"></div>
                                <div className="divLayer div1_14"></div>
                                <div className="divLayer div1_15"></div>
                                <div className="divLayer div1_16"></div>
                                <div className="divLayer div1_17"></div>
                                <div className="divLayer div1_18"></div>
                                <div className="divLayer div1_19"></div>
                                <div className="divLayer div1_20"></div>
                                <div className="divLayer div1_21"></div>
                                <div className="divLayer div1_22"></div>
                                <div className="divLayer div1_23"></div>
                                <div className="divLayer div1_24"></div>
                            </div>
                            {/*<div className="layerBottom" onTouchStart={this.stopSlide.bind(this)} onTouchMove={this.ooo} onTouchEnd={this.startSlide.bind(this)}></div>*/}
                        </div>
                        <div style={{margin: '0 0.3rem'}}>
                            <div className="accessorySum"
                                 style={{borderBottom: '0.5px solid rgba(7,17,27,0.1)', marginBottom: '.2rem'}}>合计
                            </div>
                            <div className="sumMoney"><span>配件总价</span><span
                                style={{float: 'right', fontSize: '.24rem'}}>{'￥' + accessoryAllPrice.toFixed(2)}</span>
                            </div>
                            <div className="sumMoney"><span>管理费</span><span
                                style={{float: 'right', fontSize: '.24rem'}}>{'￥' + accessoryManage.toFixed(2)}</span>
                            </div>
                            {this.state.dataState.code == '0000' &&
                                <div className="sumMoney"><span>残值</span><span
                                    style={{float: 'right', fontSize: '.24rem'}}>{'￥' + accessorypartCz.toFixed(2)}</span>
                                </div>
                            }
                            <div className="sumMoney"><span>小计(含管理费)</span><span
                                style={{
                                    float: 'right',
                                    fontSize: '.24rem'
                                }}>{'￥' + (parseFloat(accessoryAllPrice.toFixed(2)) + parseFloat(accessoryManage)-parseFloat(accessorypartCz)).toFixed(2) }</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="changeInfo">
                    <div className="detailsList">
                        <div className="detailH" style={{borderLeft: '3px solid #ffda46'}}>工时信息</div>
                        <div className="accessoryTitle">
                            <span style={{width: '1.7rem', textAlign: 'center'}}>修理项目</span>
                            <span style={{width: '1.7rem', textAlign: 'center'}}>工种</span>
                            <span style={{width: '1.7rem', textAlign: 'center'}}>工时</span>
                            <span style={{width: '1.8rem', textAlign: 'center'}}>工时总价</span>
                        </div>
                        {timepage}
                        <div className="accessoryPageIndex"
                             style={this.state.pagesShow2 ? {display: 'block'} : {display: 'none'}}>
                            <div className="indexPage indexLast"
                                 onClick={() => {this.setState({timeindex: timeindex - 1});this.keepHight()}}>上一页
                            </div>
                            <div className="indexPage index"
                                 onClick={this.changePage.bind(this, 1, this.state.pagesNum2)}>{timeindex + 1}/{this.state.pagesNum2}
                            </div>
                            <div className="indexPage indexNext"
                                 onClick={() => {if(accessoryindex==this.state.pagesNum2-1){return};this.setState({timeindex: (timeindex + 1)});this.keepHight()}}>下一页
                            </div>
                        </div>
                        <div className="sumInfo">
                            <span style={{width: '5.0rem', marginLeft: '.34rem'}}>工时合计</span>
                            <span style={{
                                width: '1.4rem',
                                textAlign: 'center',
                                fontSize: '.22rem'
                            }}>{'￥' + workAllPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                <div className="changeInfo">
                    <div className="detailsList">
                        <div className="detailH" style={{borderLeft: '3px solid #76d597'}}>辅料信息</div>
                        <div className="accessoryTitle">
                            <span style={{width: '1.7rem'}}>辅料信息</span>
                            <span style={{width: '1.7rem'}}>数量</span>
                            <span style={{width: '1.7rem'}}>单价</span>
                            <span style={{width: '1.8rem'}}>金额</span>
                        </div>
                        {flpage}
                        <div className="accessoryPageIndex"
                             style={this.state.pagesShow3 ? {display: 'block'} : {display: 'none'}}>
                            <div className="indexPage indexLast"
                                 onClick={() => {this.setState({materialindex: materialindex - 1});this.keepHight()}}>上一页
                            </div>
                            <div className="indexPage index"
                                 onClick={this.changePage.bind(this, 2, this.state.pagesNum3)}>{materialindex + 1}/{this.state.pagesNum3}
                            </div>
                            <div className="indexPage indexNext"
                                 onClick={() =>{if(accessoryindex==this.state.pagesNum3-1){return};this.setState({materialindex: materialindex + 1});this.keepHight()}}>下一页
                            </div>
                        </div>
                        <div className="sumInfo">
                            <span style={{width: '5.0rem', marginLeft: '.34rem'}}>辅料合计</span>
                            <span style={{
                                width: '1.4rem',
                                textAlign: 'center',
                                fontSize: '.22rem'
                            }}>{'￥' + flAllPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                <div className="changeInfo">
                    <div className="detailsList" style={{padding:'0'}}>
                        <div style={{padding:'0.2rem 0.3rem'}}>
                            <div className="detailH" style={{borderLeft: '3px solid #ff5959'}}>金额汇总</div>
                        </div>
                         <ul>
                            <li style={{display:'flex',textAlign:'center'}}><span style={{flex:'1'}}>项目</span><span style={{flex:'1',textAlign:'center'}}>金额</span></li>
                            <li style={{display:'flex',textAlign:'center',background:'#f4f8fb'}}><span style={{flex:'1'}}>换件金额</span><span style={{flex:'1',textAlign:'center'}}>{'￥' + accessoryAllPrice.toFixed(2)}</span></li>
                            <li style={{display:'flex',textAlign:'center'}}><span style={{flex:'1'}}>工时总价</span><span style={{flex:'1',textAlign:'center'}}>{'￥' + workAllPrice.toFixed(2)}</span></li>
                            <li style={{display:'flex',textAlign:'center',background:'#f4f8fb'}}><span style={{flex:'1'}}>辅料费</span><span style={{flex:'1',textAlign:'center'}}>{'￥' + flAllPrice.toFixed(2)}</span></li>
                            <li style={{display:'flex',textAlign:'center'}}><span style={{flex:'1'}}>管理费</span><span style={{flex:'1',textAlign:'center'}}>{'￥' + accessoryManage.toFixed(2)}</span></li>
                             {this.state.dataState.code == '0000' &&
                             <li style={{display: 'flex', textAlign: 'center', background: '#f4f8fb'}}><span
                                 style={{flex: '1'}}>残值</span><span
                                 style={{flex: '1', textAlign: 'center'}}>{'￥' + accessorypartCz.toFixed(2)}</span></li>
                             }
                             <li style={{display:'flex',textAlign:'center'}}><span style={{flex:'1'}}>合计</span><span style={{flex:'1',textAlign:'center'}}>{'￥' + (accessoryAllPrice+workAllPrice+flAllPrice+accessoryManage-accessorypartCz).toFixed(2)}
                                {this.nihao(accessoryAllPrice+workAllPrice+flAllPrice+accessoryManage-accessorypartCz)}</span></li>
                        </ul>
                    </div>
                </div>
                <div className="changeInfo">
                    <div className="detailsList">
                        <div>
                            <div className="detailH" style={{borderLeft: '3px solid #44b6fe'}}>反馈信息</div>
                            {
                                this.props.addFeedback &&
                                <svg aria-hidden="true" className="icon" onClick={this.props.addFeedback}
                                     style={this.props.location.state.taskState=='待审核'?{display:'block',fontSize: '.4rem', float: 'right'}:{display:'none',fontSize: '.4rem', float: 'right'}}>
                                    <use
                                        xlinkHref={'#icon-chuyidong'}></use>
                                </svg>
                            }

                        </div>

                        <div style={{marginTop: '0.2rem'}}>
                            {messpage}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

export default Detail