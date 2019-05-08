import React from 'react';

export class Vivo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div style={this.props.style}>
                {this.props.childes}
                {this.props.children}
            </div>
        )
    }
}

export class Text extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <span style={this.props.style}>
                {this.props.childes}
                {this.props.children}
            </span>
        )
    }
}