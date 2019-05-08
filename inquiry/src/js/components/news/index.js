/**个人中心**/
import React from 'react';
import $ from "jquery";
import StateLess from '../../assembly/Stateless'
require('../../../css/home.css')
require('../../../css/recovery.css')

export default class Inquiry extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }
    render() {

        return (
            <div style={{width:'100%',height:'100%' ,background:'#0e89f5'}}>
                {React.cloneElement(this.props.children, {
                    ...this.state,...this.props
                })}
            </div>
        )
    }
}