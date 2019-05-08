/**个人中心**/
import React from 'react';
import $ from "jquery";
import StateLess from '../../assembly/Stateless'
import list from './list'
require('../../../css/home.css')
require('../../../css/recovery.css')

export default class Inquiry extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            StateLess:StateLess
        };
    }
    render() {

        return (
            <div>
                {React.cloneElement(this.props.children, {
                    ...this.state,...this.props
                })}
            </div>
        )
    }
}