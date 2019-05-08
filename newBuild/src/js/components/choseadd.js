import React from 'react';
import $ from 'jquery';
import DatePicker from 'react-mobile-datepicker';
import VehicleInfo from './vehicleInfo';
import verification from '../../../../config/verification'
import {ChooseXLC} from "../../../../common/assembly/somejs"
import {BaseLi,SubmitOk} from '../../../../common/assembly/Stateless';
// require('../../css/home.css')
require('../../css/newcaseInfo.css')

export default class AddInquiry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidUpdate(){
        this.props.resetScroll()
    }
    componentDidMount() {
        this.props.changeTitle('推修');

    }
    componentWillMount(){

    }
    componentWillUnmount(){

    }
    render(){
        return(
            <div>

            </div>
        )
    }
}