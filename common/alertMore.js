import React from 'react';
require('./css/style.css')
export class BaseAlert extends React.Component {
    render() {
        return (
            <div className="alertModo">
                <div class="alertBox">
                    <span onClick={this.props.dat.close}></span>
                    <p>{this.props.dat.content}</p>
                    <input type='button' value='确认' />
                </div>
            </div>
        )
    }
}