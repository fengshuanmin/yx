/**个人中心**/
import React from 'react';
import $ from "jquery";
import {UserHeader,BaseLi} from '../../../../../common/assembly/Stateless'
import {DSYButton} from '../../../../../common/assembly/someAssembly'
import ChangeTitle from '../../../../../common/baseFun/someEvent'
export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            SZ:[
                {
                    Style:{ico:'&#xe70c;',ico2:'&#xe607;',S:{color:'#97989b'}},
                    key:'设置',
                    num:'',
                    path:'/SetUp'
                }
            ]
        };
    }
    componentDidMount(){
        ChangeTitle.ChangeTitle('个人中心');
    }
    render() {
        return (
            <div>
                <UserHeader {...this.props}/>
                <BaseLi data={this.state.SZ} {...this.props}/>
                <DSYButton {...this.props} T={this} on={2} ButtonFrom="YY"/>
            </div>
        )
    }
}