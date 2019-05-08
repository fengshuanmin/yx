/**
 * Created by 23174 on 2017/9/25.
 */
import React from 'react'
import $ from 'jquery'
import {Link} from 'react-router'

const XLCInfo = React.createClass({
    componentDidMount(){
        // const data = this.props.location.state
        // this.setState({datastate: data})
        // console.log(this.state.datastate)

    },
    render(){
        // let item = this.state.datastate
        return (
            <div className="carInfo">
                <li className="infoSingle"><span>公司名称</span><span className="singleText">透明修车测试修理厂总部</span></li>
                <li className="infoSingle"><span>地址</span><span className="singleText">上海浦东新区</span></li>
                <li className="infoSingle"><span>联系电话</span><span className="singleText">15997893905</span></li>
            </div>
        )
    }
})

export default XLCInfo