import React from 'react';
import $ from "jquery";
import ChangeTitle from '../../../../../common/baseFun/someEvent'
require('../../../css/IntegralRecord.css')

export default class IntegralRecord extends React.Component {
    constructor(props) {
        super(props);
        console.log()
        this.state = {};
        this.state.userId=this.props.project.user.data.LxAqYhxxb.id
        this.goOut = () => {
            localStorage.setItem("password", '');
            this.props.history.pushState(null, "/login");
        }
        this.loadMore = this.loadMore.bind(this);
    }

    componentDidMount() {
        console.log('this.props', this.props)
        ChangeTitle.ChangeTitle('积分记录');
        $.ajax({
            url: "/lexiugo-app/weixin/getUserIntegralList",
            data: {"pageNo": 1, "userId": this.state.userId},
            dataType: "json",
            type: "post",
            success: function (msg) {
                console.log('msg', msg)
                if (msg.data.userIntegralList) {
                    this.setState({pageNo: 2})
                    this.setState({msgdata: msg.data.userIntegralList}, () => {
                        this.leftLine(this.state.msgdata.length)
                        this.rightBlock(this.state.msgdata)
                    })
                    if (msg.data.userIntegralList.length == 10) {
                        // document.getElementsByClassName('checkMore')[0].innerHTML=
                    }else{
                        document.getElementsByClassName('checkMore')[0].style.visibility='hidden'
                    }
                }
            }.bind(this)
        })
    }
    getLocalTime(nS) {
        if(nS==null){
            return
        }
        let now=new Date(nS)
        var   year=now.getFullYear();
        var   month=now.getMonth()+1;
        var   date=now.getDate();
        var   hour=now.getHours();
        hour<10?(hour='0'+hour):''
        var   minute=now.getMinutes();
        minute<10?(minute='0'+minute):''
        var   second=now.getSeconds();
        second<10?(second='0'+second):''
        return   year+'-'+(month<10 ? '0'+month : month)+"-"+date
    }
    componentDidUpdate() {
        for (let i = 0; i < document.getElementsByClassName('rightBlock').length; i++) {
            if(document.getElementsByClassName('blockTrue')[i].offsetWidth/document.getElementsByClassName('rightBlock')[i].offsetWidth>0.99){
                document.getElementsByClassName('rightBlock')[i].style.paddingBottom='38px'
            }
        }
        for (let i = 0; i < document.getElementsByClassName('rightBlock').length - 1; i++) {
            document.getElementsByClassName('leftLine')[i].style.height = document.getElementsByClassName('rightBlock')[i].offsetHeight - (document.getElementsByClassName('leftCircle')[0].offsetHeight+8)+ 'px'
            console.log(document.getElementsByClassName('rightBlock')[i].offsetHeight, document.getElementsByClassName('leftCircle')[0].offsetHeight, document.getElementsByClassName('leftLine')[i].style.height)
        }
        document.getElementsByClassName('integralContext')[0].style.height = document.getElementsByClassName('contextRight')[0].offsetHeight + 'px'
        document.getElementsByClassName('IntegralRecord')[0].style.minHeight = document.documentElement.clientHeight + 'px'
    }

    leftLine(msg) {
        let arr = []
        for (let i = 0; i < msg; i++) {
            if (i == msg - 1) {
                arr.push(<div key={i} className="leftSmall">
                    <div className="leftCircle"><img width={'100%'} height={'100%'}
                                                     src={require('../../../img/椭圆@3x.png')} alt=""/></div>
                </div>)
            } else {
                arr.push(<div key={i} className="leftSmall">
                    <div className="leftCircle"><img width={'100%'} height={'100%'}
                                                     src={require('../../../img/椭圆@3x.png')} alt=""/></div>
                    <div className="leftLine"></div>
                </div>)
            }
        }
        this.setState({leftSlide: arr})
    }

    rightBlock(msg) {
        let arr = []
        let newtime=new Date().getTime()
        let nowtime= this.getLocalTime(newtime)
        console.log(nowtime)
        for (let i = 0; i < msg.length; i++) {
            if(!msg[i].integralAppDesc==" "){
                msg[i].integralText = <div>{msg[i].integralAppDesc}<span style={{color: 'red'}}>+{msg[i].tradeVolume}</span>积分</div>
            }else{
                msg[i].integralText = '默认'
            }
            console.log(msg[0])
            /* switch (msg[i].integralType) {
                 case '1':
                     msg[i].integralText = <div>每日登录成功<span style={{color: 'red'}}>+{msg[i].tradeVolume}</span>积分</div>;
                     break;
                 case '2':
                     msg[i].integralText = <div>车辆推送成功<span style={{color: 'red'}}>+{msg[i].tradeVolume}</span>积分</div>;
                     break;
                 case '3':
                     msg[i].integralText = <div>车辆到店成功<span style={{color: 'red'}}>+{msg[i].tradeVolume}</span>积分</div>;
                     break;
                 case '4':
                     msg[i].integralText = <div>车辆审核成功<span style={{color: 'red'}}>+{msg[i].tradeVolume}</span>积分</div>;
                     break;
                 case '5':
                     msg[i].integralText = <div>车辆修理完毕<span style={{color: 'red'}}>+{msg[i].tradeVolume}</span>积分</div>;
                     break;
                 default:
                     msg[i].integralText = '默认'
             }*/
            arr.push(
                <div className="rightBlock" key={i}>
                    <img src={require('../../../img/new3x.png')} style={msg[i].tradeDate==nowtime?{display:'block'}:{display:'none'}} className="blockNew"/>
                    <div className="blockText">
                        <div className="blockTrue">
                            {msg[i].integralText}
                        </div>
                        <div className="blockTime">
                            {msg[i].tradeDate}
                        </div></div>
                </div>
            )
        }
        this.setState({rightSlide: arr})
    }

    loadMore() {
        // let pageNo=this.state.pageNo
        console.log(this.state)
        $.ajax({
            url: "/lexiugo-app/weixin/getUserIntegralList",
            data: {"pageNo": this.state.pageNo, "userId": this.state.userId},
            dataType: "json",
            type: "post",
            success: function (msg) {
                console.log(`msg${this.state.pageNo}`, msg)
                if (msg.data.userIntegralList) {
                    this.setState({pageNo: ++this.state.pageNo})
                    this.setState({msgdata: this.state.msgdata.concat(msg.data.userIntegralList)}, () => {
                        this.leftLine(this.state.msgdata.length)
                        this.rightBlock(this.state.msgdata)
                    })
                    if (msg.data.userIntegralList.length == 10) {
                        // document.getElementsByClassName('checkMore')[0].innerHTML=
                    }else{
                        document.getElementsByClassName('checkMore')[0].style.visibility='hidden'
                    }
                }
            }.bind(this)
        })
    }

    render() {
        return (
            <div className="IntegralRecord">
                <ul className="icoLeft">
                    <li onClick={()=>{this.props.history.pushState(null, "/personInfo");}}>
                        <span className="iconfonts imgIcon"></span>
                        <span className="rightTopBorder">个人信息</span>
                    </li>
                    <li onClick={()=>{this.props.history.pushState(null, "/titckInfo");}}>
                        <span className="iconfonts imgIcon"></span>
                        <span className="rightTopBorder">发票信息</span>
                    </li>
                </ul>
            </div>
        )
    }
}