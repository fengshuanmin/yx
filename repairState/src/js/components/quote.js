/**
 * Created by 23174 on 2017/9/25.
 */
import React from 'react'
import $ from 'jquery'
import {Link} from 'react-router'

const Quote = React.createClass({
    getInitialState(){
        return {
            toCar: false,
            pageNum: 0,
            loadTip: '',
            noInfo:true
        }
    },
    componentDidMount(){
        const data = this.props.location.state
        this.setState({datastate: data})
        console.log('data', this.props.location.state)
        this.serverRequest({"taskId": data}, {"taskId": data, "pageNum": '0',"yhId":this.props.project.user.data.LxAqYhxxb.id})
    },
    chooseItem(index, e){
        this.state.activeItem = index
        console.log(this.state.activeItem)
    },
    toItem(i, e){
        this.props.history.pushState(i, '/partQuote')
    },
    toCar(){
        if (this.state.toCar == true) {
            this.props.history.pushState(this.state.carInfo, '/carInfo')
        }
    },
    toXLC(){
        this.props.history.pushState(null, '/XLCInfo')
    },
    serverRequest (data, data1){
        this.setState({modalState: true})
        console.log('开始查询');
        console.log(data)
        $.ajax({
            url: "/toumingxiu/quote/quoteInfo.do",
            data: data,
            dataType: "json",
            type: "post",
            success: function (msg) {
                console.log('查询结果', msg)
                this.setState({carInfo: msg})
                this.setState({toCar: true})
            }.bind(this),
            error: function (eee) {
                this.setState({modalState: false});
                console.log(eee)
            }.bind(this)
        })
        $.ajax({
            url: "/toumingxiu/insEnquiry/getAppEnquiryPartInfo.do",
            data: data1,
            dataType: "json",
            type: "post",
            success: function (msg) {
                console.log('查询结果', msg)
                if (msg == null || msg.length < 15) {
                    this.setState({loadTip: ''})
                }else{
                    this.setState({loadTip: '...'})
                }

                this.setState({dataList: msg}, () => {
                    console.log(this.state.dataList)
                    // let lll=[{'partName':'222222','fact_part_name':'2222','business_name':'2222','spareTypeName':'222222','part_num':'222222','price':'22222'}]
                    this.list(this.state.dataList)
                })
                if (msg.code == "911") {
                    this.setState({loadTip:'暂无报价'})
                    this.setState({noInfo:true})
                }else{
                    this.setState({noInfo:false})
                }
                console.log('changdu', msg.length)
            }.bind(this),
            error: function (eee) {
                this.setState({modalState: false});
                this.setState({loadTip:'暂无报价'})
                this.setState({noInfo:true})
                console.log(eee)
            }.bind(this)
        })
    },
    loadMore(){
        this.setState({lookMore: false})
        this.setState({loadTip: '加载中...'})
        this.setState({liNum: 0})  // 隐藏加载更多
        let pagenum = this.state.pageNum + 1
        this.setState({pageNum: pagenum}, () => {
            var d = {
                taskId: this.props.location.state,
                pageNum: this.state.pageNum.toString(),
                yhId:this.props.project.user.data.LxAqYhxxb.id
            }
            // if (this.state.taskList.length < mostNumber) {
            // this.setState({modalState: true});
            console.log('开始查询');
            $.ajax({
                url: "/toumingxiu/insEnquiry/getAppEnquiryPartInfo.do",
                data: d,
                dataType: "JSON",
                type: "post",
                success: (msg)=>{
                    console.log('fenye', msg);
                    if (msg.length==undefined||msg.length < 15) {
                        this.setState({loadTip: ''})
                    }else{
                        this.setState({loadTip: '...'})
                    }
                    let arry = this.state.dataList
                    if(msg.length>0){
                        arry = arry.concat(msg)
                    }
                    console.log('加载后', arry)
                    this.list(arry)
                    this.setState({dataList: arry})
                },
                error:(eee)=>{
                    // this.setState({modalState: false});
                    this.setState({loadTip: ''})
                    console.log(eee)
                }
            });
        })
    },
    tStart(e){
        console.log('bodyscroll',document.body.scrollTop,document.getElementById('appWrapper').scrollTop)
        this.setState({yStart: e.touches[0].pageY})
        this.setState({yMore: document.getElementById('appWrapper').scrollTop})
    },
    tMove(e){
        if ((this.state.yStart - e.touches[0].pageY + this.state.yMore) > (document.getElementsByClassName('Quote')[0].offsetHeight - document.body.offsetHeight)) {
            console.log(document.getElementsByClassName('Quote')[0].style.top)
            this.setState({lookMore: true})
        }
    },
    tEnd(e){
        if (this.state.lookMore == true) {
            // alert('加载更多')
            this.loadMore()
        }
    },
    loadLoad(){
        if (this.state.loadTip == '...') {
            this.loadMore()
        }
    },
    list(list){
        console.log(this.state.dataList.result.enquiryQuoteParts)
        let item = this.state.dataList.result.enquiryQuoteParts;
        let items = []
        for (let i = 0; i < item.length; i++) {
            items.push(
                <div className="quotePart" key={i} onClick={this.toItem.bind(this, {
                    "partName": item[i].fact_part_name,
                    "taskId": this.props.location.state,
                    "reMark": item[i].remark,
                    "spareTypeName": item[i].spareTypeName,
                    "price": item[i].price,
                    'businessName': item[i].business_name,
                    "num": item[i].part_num,
                    "id":item[i].id,
                    "yhId":this.props.project.user.data.LxAqYhxxb.id,
                    partId:item[i].partId
                })}>
                    <span style={{width: '1.4rem'}}>{item[i].fact_part_name}</span>
                    <span style={{width: '1.6rem'}}>{item[i].partsCompany}</span>
                    <span style={{width: '1.5rem'}}>{item[i].partSpareType}</span>
                    <span style={{width: '.6rem'}}>{item[i].partNum}</span>
                    <span style={{width: '1.5rem'}}>{item[i].partPrice != '' ? ('￥' + item[i].partPrice) : ''}</span>
                    <span><svg aria-hidden="true" className="icon">
                            <use xlinkHref={'#icon-iconfontyoujiantou'}></use>
                        </svg></span>
                </div>
            )
        }
        this.setState({items: items})
    },
    render(){
        return (
            <div className="Quote" onTouchStart={this.tStart} onTouchMove={this.tMove}
                 onTouchEnd={this.tEnd}>
                <div className="quoteInfo">
                    <div className="partInfo" onClick={this.toCar}>
                        车辆信息
                        <svg aria-hidden="true" className="icon" style={this.state.noInfo==true?{display:'none',float: 'right', marginTop: '.36rem'}:{display:'block',float: 'right', marginTop: '.36rem'}}>
                            <use xlinkHref={'#icon-iconfontyoujiantou'}></use>
                        </svg>
                    </div>
                </div>
                <div className="quoteParts">
                    <div className="quoteTitle">报价零件列表</div>
                    <div className="quoteItem">
                        <span style={{width: '1.4rem'}}>名称</span>
                        <span style={{width: '1.6rem'}}>配件商</span>
                        <span style={{width: '1.48rem'}}>配件类型</span>
                        <span style={{width: '.7rem'}}>数量</span>
                        <span style={{width: '1.4rem'}}>单价</span>
                    </div>
                    {this.state.items}
                    <div className="quoteBottom" onClick={this.loadLoad}>
                        {this.state.loadTip}
                    </div>
                </div>
            </div>
        )
    }
})

export default Quote