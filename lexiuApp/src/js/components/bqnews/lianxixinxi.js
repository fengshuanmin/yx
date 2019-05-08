import React from 'react'
import $ from 'jquery'

export default class Lianxi extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <ul className="newadd1">
                    <li><label id="name1">业务联系人</label><input type="text" name="name1"/></li>
                    <li><label id="yb">联系人电话</label><input type="text" name="yb" /></li>
                    <li><label id="movephone">配件联系人</label><input type="text" name="movephone"/></li>
                    <li><label id="fixphone">配件联系人电话</label><input type="text" name="fixphone"/></li>
                    <li><label id="contry">法人代表</label><input type="text" name="contry"/></li>
                    <li><label id="address1">投诉电话</label><input type="text" name="address1"/></li>
                </ul>
                <ul className="newadd1">
                    <li><label id="name1">收货地址管理</label><input type="text" name="name1"/></li>
                </ul>
            </div>
        )
    }
}