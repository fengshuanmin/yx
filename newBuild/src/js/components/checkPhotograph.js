/**
 * Created by Administrator on 2016/8/26 0026.
 */
import React from 'react';
import $ from "jquery";
import wxconfig from '../../../../config/WXConfig';
import wxFun from "../../../../config/wxFun";

var paramData = new Array();
module.exports = paramData;

const  CheckPhotograph= React.createClass({
    getInitialState () {
        return {
            modalState:"",
            scmodalState:false,
            survey_1:"",
            survey_2:"",
            survey_3:"",
            survey_4:"",
            survey_5:"",
            survey_6:"",
            address:""
        };
    },
    componentWillMount(){
        /*$.ajax({
            url: "/lexiugo-app/weixin/getSignature",
            data: 'url=' + encodeURIComponent( window.location.href ) ,
            dataType: 'jsonp',
            success: function(data) {
                for(var i in data){
                   // alert(i+'++++++'+data[i])
                }
                this.setState({signature: data});
                //this.wxCobfig();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });*/
    },
    wxCobfig (){
        var this_ = this;
        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: this_.state.signature.appid, // 必填，公众号的唯一标识
            timestamp:this_.state.signature.timestamp , // 必填，生成签名的时间戳
            nonceStr: this_.state.signature.noncestr, // 必填，生成签名的随机串
            signature: this_.state.signature.signature,// 必填，签名，见附录1
            jsApiList: [ 'checkJsApi', 'chooseImage',  'previewImage',  'uploadImage', 'getLocation', 'openLocation']
        });
        wx.ready(function(){
            //调用获取地理位置基础接口
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    this_.setState( { latitude : latitude, longitude : longitude } )
                    this_.onLocation();
                }.bind(this)
            });
        });
        wx.error(function(res){
            console.log( "校验失败" )
        });
        //隐藏右上角菜单接口
        wx.hideOptionMenu();
    },
    onLocation:function(){
        //获取地理位置
        var this_ = this
        /*$.ajax({
            url: 'http://apis.map.qq.com/ws/geocoder/v1/',
            data: 'location='+ this_.state.latitude + ',' + this_.state.longitude +'&key=Q3JBZ-4DZRG-UIZQT-IPPNJ-2HUUF-SNB4G&get_poi=0&output=jsonp' ,
            dataType: 'jsonp',
            contentType: "application/javascript",
            success: function(data) {
                if( data.status == 0 ){
                    this_.setState({address: data.result.address});
                }
            }.bind(this_),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this_)
        });*/
    },
    onPhoto(aa, bb){
        alert('执行微信上传功能');
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: [ ''], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                console.log( "调用相机");
                if( res.errMsg == 'ok' || res.errMsg == 'chooseImage:ok' ){
                    var localIds = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    var setState = {};
                    setState[aa] = localIds;
                    this.setState(setState);
                    this._uploadImage( localIds, bb );
                }else {
                    alert( '拍照失败' );
                }
            }.bind(this)
        });
        return;
        wx.uploadImage({
            localId: 'sss'.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                var serverId = res.serverId; // 返回图片的服务器端ID
                paramData.push( { "imageType" : photoType, "serverId" : serverId } );
            }
        });
    },
    _uploadImage : function( localIds, photoType ){
        wx.uploadImage({
            localId: localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                var serverId = res.serverId; // 返回图片的服务器端ID
                paramData.push( { "imageType" : photoType, "serverId" : serverId } );
                alert('imageType'+photoType);
                alert('serverId'+serverId);
            }
        });
    },
    toRecord(){
        this.props.history.replaceState(null, "/record");
    },
    render(){
        const LinkActiveStyle = {
            color: "#1E7BE3",
            background: "#F5F5F5"
        }
        return (
            <div className="checkPhotograph Rcontainer">
                <div className="headerInfo">
                    <span className="newuildbtn" onClick={this.toRecord}>列表</span>
                    新建推修
                </div>
                <div className="menuList">
                    <span >案件信息</span>
                    <span >车辆信息</span>
                    <span style={LinkActiveStyle}>查勘照片</span>
                </div>
                <div className="panel">
                    <div className="panel-heading">
                        车损照片
                    </div>
                    <div className="panel-body clearfix">
                        <div id="survey_1" className="picUpload" onClick={this.onPhoto.bind(this,"survey_1", "survey_5")}>
                            {/*<input type="file" accept="image/*" capture="camera"/>*/}
                            <img src={this.state.survey_1} style={this.state.survey_1==""?{display:"none"}:{display:"block"}}/>
                            <span className="iconfont">&#xe60d;</span>
                            <p>左前照片</p>
                        </div>
                        <div id="survey_2" className="picUpload" onClick={this.onPhoto.bind(this,"survey_2", "survey_5")}>
                            <img src={this.state.survey_2} style={this.state.survey_2==""?{display:"none"}:{display:"block"}}/>
                            <span className="iconfont">&#xe60d;</span>
                            <p>右前照片</p>
                        </div>
                        <div id="survey_3" className="picUpload" onClick={this.onPhoto.bind(this,"survey_3", "survey_5")}>
                            <img src={this.state.survey_3} style={this.state.survey_3==""?{display:"none"}:{display:"block"}}/>
                            <span className="iconfont">&#xe60d;</span>
                             <p>左后照片</p>
                        </div>
                        <div id="survey_4" className="picUpload" onClick={this.onPhoto.bind(this,"survey_4", "survey_5")}>
                            <img src={this.state.survey_4} style={this.state.survey_4==""?{display:"none"}:{display:"block"}}/>
                            <span className="iconfont">&#xe60d;</span>
                            <p>右后照片</p>
                        </div>
                    </div>
                </div>
                <div className="panel">
                    <div className="panel-heading">
                        证件照片
                    </div>
                    <div className="panel-body clearfix">
                        <div id="survey_5"  className="picUpload" onClick={this.onPhoto.bind(this,"survey_5", "survey_3")}>
                            <img src={this.state.survey_5} style={this.state.survey_5==""?{display:"none"}:{display:"block"}}/>
                            <span className="iconfont">&#xe60d;</span>
                            <p>行驶证正本</p>
                        </div>
                        <div id="survey_6" className="picUpload" onClick={this.onPhoto.bind(this,"survey_6", "vin")}>
                            <img src={this.state.survey_6} style={this.state.survey_6==""?{display:"none"}:{display:"block"}}/>
                            <span className="iconfont">&#xe60d;</span>
                            <p>VIN照片</p>
                        </div>
                    </div>
                    <div className="panel-footer">
                        ·&nbsp;&nbsp;&nbsp;请上传完整的清晰的各位置照片
                    </div>
                </div>
                <button className="publicBtn" onClick={this.submitClient}>确认并推修</button>


                <div className="weui_dialog_alert" style={this.state.modalState==""?{display:"none"}:{display:"block"}}>
                    <div className="weui_mask"></div>
                    <div className="weui_dialog">
                        <div className="weui_dialog_hd"><strong className="weui_dialog_title"></strong></div>
                        <div className="weui_dialog_bd">{this.state.modalState}</div>
                        <div className="weui_dialog_ft">
                            <a className="weui_btn_dialog primary" onClick={this.modalStateChange}>确定</a>
                        </div>
                    </div>
                </div>

                <div id="loadingToast" className="weui_loading_toast" style={this.state.scmodalState?{display:"block"}:{display:"none"}}>
                    <div className="weui_mask_transparent"></div>
                    <div className="weui_toast">
                        <div className="weui_loading">
                            <div className="weui_loading_leaf weui_loading_leaf_0"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_1"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_2"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_3"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_4"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_5"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_6"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_7"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_8"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_9"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_10"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_11"></div>
                        </div>
                        <p className="weui_toast_content">数据上传中</p>
                    </div>
                </div>
            </div>
        )
    },
    modalStateChange(){
        if (this.state.modalState=="推修请求成功"){
            this.props.history.replaceState(null, "/caseInfo");
        }
        this.setState({modalState: ""});
    },
    submitClient:function(){
        this.setState({scmodalState:true})
        $.ajax({
            url: "/lexiugo-app/weixin/insurance/push",
            data : this.paramUrl() ,
            dataType: 'json',
            type: "POST",
            success: function(data) {
                this.setState({scmodalState:false});
                this.setState({modalState:data.mess});
                //if (data.mess=="推修请求成功"){
                //    this.props.history.replaceState(null, "/login");
                //}
                //var timecookie = setTimeout(function () {
                //    this.setState({modalState:""})
                //}.bind(this), 1500)
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({scmodalState:false});
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    paramUrl : function () {
        var uri = new Array();
        for( var i in paramData ) {
           var imageType = paramData[i]['imageType'];
           var serverId = paramData[i]['serverId'];
           var n = 'array[' + i + '].';
           uri.push( n + 'imageType=' + imageType + '&' + n + 'serverId=' + serverId );
        }
        uri.push( 'address=' + this.state.address );
        ['array[1].imageType=imageType','array[1].serverId=serverId']
        return uri.join("&");
    }
})
export default CheckPhotograph