import React from 'react'
import $ from 'jquery'

export default class Company extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <ul className="newadd1">
                    <li><label id="name1">公司名称</label><input type="text" name="name1"/></li>
                    <li><label id="yb">公司地址</label><input type="text" name="yb" /></li>
                    <li><label id="movephone">信用码</label><input type="text" name="movephone"/></li>
                    <li><label id="fixphone">账号绑定手机</label><input type="text" name="fixphone"/></li>
                    <li><label id="contry">账号绑定邮箱</label><input type="text" name="contry"/></li>
                    <li><label id="address1">营业执照全称</label><input type="text" name="address1"/></li>
                    <li><label id="address1">修理厂类型</label><input type="text" name="address1" /></li>
                </ul>
                <ul className="newadd1">
                    <li><label id="name1">发票管理</label><input type="text" name="name1"/></li>
                </ul>
                <ul className="newadd1">
                    <li><label id="name1">公司简介</label><input type="text" name="name1" /></li>
                    <li><label id="yb">公司图片资料</label><input type="text" name="yb"/></li>
                </ul>

            </div>
        )
    }
}