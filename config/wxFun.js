export default {
    upLoadImg:()=>{
        //获取图片信息
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: [ ''], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
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
    },
}