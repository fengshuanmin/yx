import React from 'react'
import {Scoreboard} from '../../common/assembly/someAssembly'
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.toChangeList = this.toChangeList.bind(this)
        /*this.getXlc=this.getXlc.bind(this)*/
    }
    render(){
        return(
            <div>
                <div className="picShow">
                    <li>
                        <div></div>
                        <p>名字</p>
                        <p>2017分</p>
                    </li>
                </div>
                <Scoreboard data={props.data}/>
            </div>
        )
    }
}