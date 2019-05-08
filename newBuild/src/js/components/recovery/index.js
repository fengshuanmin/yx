import React from 'react';
import $ from 'jquery';


import StateLess from '../../assembly/Stateless'
export default class Recovery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            StateLess:StateLess
        };
    }
    render(){
        return(
            <div>
                {React.cloneElement(this.props.children, {
                    ...this.state,...this.props
                })}
            </div>
        )
    }
}