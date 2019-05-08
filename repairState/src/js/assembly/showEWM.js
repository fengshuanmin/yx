/**
 * Created by Administrator on 2016/9/13.
 */
import React from 'react';
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
        return (
            <div className="newEWM">
                <p>提交成功</p>
                <p>可以通过扫描下方二维码查勘车辆维修信息</p>
                <div className="imgBox">
                    <img src={'http://www.beidouchaxun.cn/toumingxiu/jyshowPhoto/getUrl.do?photoUrl='+this.props.imgPath} alt=""/>
                </div>
                <div className="goOut">
                    <span onClick={this.props.showEWM.bind(this,'open')}>返回首页 ＞</span>
                </div>
            </div>
        )
    }
})

export default ShowEWM