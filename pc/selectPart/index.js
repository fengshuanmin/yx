import React from 'react';
import ReactDOM from 'react-dom'
import Select from './SelectionParts'
require('../../common/css/style.css')
export default class AppRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount(){
    }
    render(){
        return (
            <Select {...this.state}/>
        )
    }
}
ReactDOM.render(<AppRouter />, document.getElementById("appWrapper"));