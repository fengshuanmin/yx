/**个人中心**/
import React from 'react';
import $ from "jquery";
import {UserHeader,BaseLi} from '../../../../../common/assembly/Stateless'
import ChangeTitle from '../../../../../common/baseFun/someEvent'
export default class SetUp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount(){
        ChangeTitle.ChangeTitle('设置');
    }
    render() {
        return (
            <div>
                设置
            </div>
        )
    }
}