/**
 * Created by 23174 on 2017/9/26.
 */
import React from 'react'
import $ from 'jquery'
import {Link} from 'react-router'
export default class reMark extends React.Component {
    constructor(props) {
        super(props);
        this.state={

        }

    }
    componentDidMount() {
        this.props.changeTitle('备注');
    }
    componentWillMount(){}
    render() {
        console.log(this.props)
        return (
            <div style={{marginTop:'0.3rem',marginLeft:'0.2rem'}}>
                {this.props.location.state.reMark}
            </div>
        )
    }
}