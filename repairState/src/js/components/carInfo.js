/**
 * Created by 23174 on 2017/9/25.
 */
import React from 'react'
import $ from 'jquery'
import {Link} from 'react-router'

const carInfo = React.createClass({
    componentWillMount(){
        const data = this.props.location.state
        console.log(data)
        this.setState({datastate: data})
    },
    render(){
        let item = this.state.datastate
        return (
            <div className="carInfo">
                {/*<li className="infoSingle"><span className="singleItem">询价单号</span><span className="singleText">{item.enquiryInfo.enquiryno}</span></li>*/}
                <li className="infoSingle"><span className="singleItem">车牌号</span><span className="singleText">{item.data.carPlateNo}</span></li>
                <li className="infoSingle"><span className="singleItem">VIN码</span><span className="singleText">{item.data.carVinCode}</span></li>
                <li className="infoSingle"><span className="singleItem">品牌名称</span><span className="singleText">{item.data.carBrand}</span></li>
                <li className="infoSingle"><span className="singleItem">车系名称</span><span className="singleText">{item.data.carSeries}</span></li>
                <li className="infoSingle"><span className="singleItem">车组名称</span><span className="singleText">{item.data.carGroup}</span></li>
                <li className="infoSingle"><span className="singleItem">车型名称</span><span className="singleText">{item.data.carType}</span></li>
                <li className="infoSingle"><span className="singleItem">推车类型</span><span className="singleText">{item.data.pushType=='0'?'乘用车':'商用车'}</span></li>
                <li className="infoSingle"><span className="singleItem">配件电商</span><span className="singleText">{item.data.partBusiness}</span></li>
                <li className="infoSingle"><span className="singleItem">是否需要发票</span><span className="singleText">{item.data.invoice=='0'?'否':'是'}</span></li>
            </div>
        )
    }
})

export default carInfo