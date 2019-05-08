/**
 * Created by Administrator on 2016/9/13.
 */
import React from 'react'
var QRCode = require('qrcode.react');
import $ from "jquery";

const ShowEWM = React.createClass({
    getInitialState() {
        return {
        }
    },
    componentDidUpdate(){

    },
    componentDidMount(){

    },
    render(){
        if(this.props.imgPath){
            var newData=this.props.imgPath;
            var newParams=newData.replace(/[^\u0000-\u00FF]/g,function($0){return escape($0).replace(/(%u)(\w{4})/gi,"Zu$2")});
            var newParams=newData.replace(/[^\u0000-\u00FF]/g,function($0){return escape($0).replace(/(%u)(\w{4})/gi,"Zu$2")});
            var jst='fgsdfgsdfgsdfgdfgadfgsdfgsdfgsdfgdfg';
            console.log(jst);
            //var url="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7bf8faee258e6753&redirect_uri=http://"+location.hostname+"/server/showEWM/"+newParams+"?action=loveCarRepair&response_type=code&scope=snsapi_base&state=1&connect_redirect=1"
            var url="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4b3cc819d682ce0e&redirect_uri=http://"+location.hostname+"/server/showEWM/"+newParams+"?action=loveCarRepair&response_type=code&scope=snsapi_base&state=1&connect_redirect=1"
        }
       return (
            <div className="newEWM">
                {this.props.imgPath && this.props.texts ? <p>{this.props.texts}</p> : ''}
                {!this.props.imgPath && !this.props.texts ? <p>关注公众号</p> : ''}
                {this.props.imgPath && !this.props.texts ? <p>提交成功</p> : ''}
                {this.props.imgPath || this.props.pushImgPath ? <p>车主可以通过扫描下方二维码查看车辆维修信息</p> : <p>长按扫描二维码关注公众号 <br/> 通过公众号进入‘我的爱车’领取超级大礼包 </p>}
                <div className="imgBox">
                    {this.props.imgPath ?
                        <QRCode value={url} />
                        :
                        (this.props.pushImgPath ? <img src={'http://'+this.props.pushImgPath} alt=""/> :
                            (location.hostname =='www.beidouchaxun.cn' ? <img src={require('../../img/TMCFEWM.jpg')} alt=""/> : <img src={require('../../img/EWM.jpg')} alt=""/>))
                    }
                    {/*<img src={'http://www.beidouchaxun.cn/toumingxiu/jyshowPhoto/getUrl.do?photoUrl='+this.props.imgPath} alt=""/>*/}
                </div>
                <div className="goOut">
                    <span onClick={this.props.showEWM.bind(this,'open')}>返回 ＞</span>
                </div>
            </div>
        )
    }
})

export default ShowEWM