/**
 * Created by Administrator on 2016/9/21 0021.
 */
import React from 'react'
import $ from 'jquery'
import { Router, Route, IndexRoute } from 'react-router'
import { createHashHistory, useBasename } from 'history'
const RepairRecord = React.createClass({
    getInitialState() {
        return {

        }
    },
    componentDidMount(){

    },
    componentDidUpdate(){

    },
    render(){
        console.log(this.props.location,555);
        return(
            <div className="repairRecord Rcontainer leCheHelp">
                <iframe src={'http://m5.lechebang.cn/cpaint/yxkj/index?pushTaskId='+this.props.location.state.id+'&mobile='+this.props.location.state.telePhone+'&sign='+this.props.location.state.sign} frameborder="0"></iframe>
            </div>
        )
    }
});
export default RepairRecord



