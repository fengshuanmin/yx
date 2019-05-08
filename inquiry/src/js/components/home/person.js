import React from 'react';
import $ from "jquery";
import ChangeTitle from '../../../../../common/baseFun/someEvent'
require('../../../css/IntegralRecord.css')
require('../../../css/home.css')
export default class IntegralRecord extends React.Component {
    constructor(props) {
        super(props);
        console.log()
        this.state = {};
        this.state.userId=this.props.project.user.data.LxAqYhxxb.id
    }

    componentDidMount() {
        ChangeTitle.ChangeTitle('个人信息');
        this.props.setProps({
            news:false,
            repair:false,
            updataperson:false
        })
    }

    render() {
        return (
            <div className="DSYHome">
                <ul className="SetUpLi">
                    <li onClick={()=>{this.props.history.pushState(null, "/addperson");}}>
                        <span>基本信息</span><span className="iconfonts">&#xe607;</span>
                    </li>
                    <li onClick={()=>{this.props.history.pushState(null, "/addressgl");}}>
                        <span>收货地址</span><span className="iconfonts">&#xe607;</span>
                    </li>
                    <li onClick={()=>{this.props.history.pushState(null, "/titckgl");}}>
                        <span>发票信息</span><span className="iconfonts">&#xe607;</span>
                    </li>
                </ul>
            </div>
        )
    }
}