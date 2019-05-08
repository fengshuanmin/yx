import React from 'react';
import $ from 'jquery';
// import DatePicker from 'react-mobile-datepicker'
// import Picker from './Picker';
/**发起残件回收**/
export default class Newsurl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locationUrl:''
        }
    }
    componentDidMount() {
        this.props.changeTitle(this.props.location.state.locationTitle);
    }
    componentWillMount(){
        console.log(this.props.location.state)
        this.setState({
            locationUrl:this.props.location.state.locationUrl
        })
    }
    render(){
        return(
            <div style={{width:'100%',height:'100%',position:'absolute'}}>
                <iframe src={this.state.locationUrl} style={{width:'100%',height:'100%'}}></iframe>
            </div>
        )
    }
}
