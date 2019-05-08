/**个人中心**/
import React from 'react';
import $ from "jquery";
import ChangeTitle from '../../../../../common/baseFun/someEvent'
require('../../../css/home.css')
export default class SetUp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
        this.goOut = () => {
            var data = JSON.parse(localStorage.getItem(this.props.project.getQuery()))
            data.password=''
            localStorage.setItem(this.props.project.getQuery(), JSON.stringify(data));
            this.props.history.pushState(null, "/login");
        }
    }
    componentDidMount(){
        ChangeTitle.ChangeTitle('设置');
    }
    render() {
        return (
            <div className="DSYHome">
                <ul className="SetUpLi">
                    <li onClick={()=>{this.props.history.pushState(null, "/changePosword");}}>
                        <span>修改密码</span><span className="iconfonts">&#xe607;</span>
                    </li>
                    <li onClick={()=>{this.props.history.pushState(null, "/About");}}>
                        <span>关于透明修车</span><span className="iconfonts">&#xe607;</span>
                    </li>
                </ul>
                <ul className="SetUpLi">
                    <li>
                        <span>公司电话</span><span className="iconfonts" style={{fontWeight:'300',fontSize:'16px'}}>4000022298</span>
                    </li>
                </ul>
                <div className="SetUpbutton" onClick={this.goOut}><button>退出登录</button></div>
            </div>
        )
    }
}