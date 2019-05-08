/**个人中心**/
import React from 'react';
import $ from "jquery";
import {UserHeader,BaseLi} from '../../../../../common/assembly/Stateless'
import ChangeTitle from '../../../../../common/baseFun/someEvent'
export default class AboutMyCar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            liList:[
                {
                    key:'车牌号',
                    value:this.props.project.firstList.plateno,
                },
                {
                    key:'车主姓名',
                    value:this.props.project.firstList.customername
                },
                {
                    key:'车型',
                    value:this.props.project.firstList.cxmc
                },
                {
                    key:'VIN码',
                    value:this.props.project.firstList.vincode
                }
            ]
        }
    }
    componentDidMount(){
        ChangeTitle.ChangeTitle('我的爱车');
    }
    render() {
        return (
            <div style={{paddingTop:'0.35rem'}}>
                <BaseLi {...this.props} data={this.state.liList}/>
            </div>
        )
    }
}