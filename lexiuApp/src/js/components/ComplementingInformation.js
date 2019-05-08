import React from 'react'
import $ from 'jquery'
import BaseLi from '../../../../common/assembly/Stateless';
import someEvent from '../../../../common/baseFun/someEvent'
/*require('../../../css/news.css')*/
require('../../css/Complementingnformation.css')

export default class Complementingnformation extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentWillMount(){

    }
    componentDidMount() {
        this.props.changeTitle('补全信息');
    }
    render(){
        console.log(this.props.location.state)
        return(
            <div className="Complementing">
                <div className="complementingbody">
                    <h4 className="tit">车辆信息</h4>
                    <BaseLi/>
                </div>
            </div>
        )
    }
}