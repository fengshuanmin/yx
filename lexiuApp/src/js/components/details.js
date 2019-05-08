import React from 'react'
import $ from 'jquery'

import Receive from '../components/receive_detail'
import Check from '../components/check_detail'
import Service from '../components/service_detail'


import {XLCFooter,DSYButton,} from '../../../../common/assembly/someAssembly'
import {LoadList} from '../../../../common/assembly/Logical'
import {CarLists} from '../common/Stateless'
import {Jieche,Chakan,Weixiu,BaseTop} from '../common/Logical'
export default class CarList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {datList: [],
            components:[
                '1',
                <Receive {...this.props}/>,
                <Chakan {...this.props}/>,
                <Weixiu {...this.props}/>
            ],
            oldComponents:[
                '1',
                <Receive {...this.props}/>,
                <Check {...this.props} />,
                <Service {...this.props} />,
            ]
        };
    }
    componentDidMount(){

        var titleName=['','接车','查勘','维修']
        this.props.project.changeTitle(titleName[this.props.location.state.taskstate]);
    }
    render() {
        var detailsData = this.props.location.state;
        const state=this.props.location.state.taskstate
        return(
            <div>
                {
                    this.props.project.getQuery('action') == 'fomeXLC' &&
                    <BaseTop {...this.props}/>

                }
                {
                    this.props.project.getQuery('action')=='fomeXLC' ?
                        (this.state.components[state])
                        :
                        this.state.oldComponents[state]
                }
            </div>
        )
    }
}