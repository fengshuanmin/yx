import React from 'react'
import {DSYButton} from '../../../../../common/assembly/someAssembly'
import {BaseLi,UserHeader,GoOut} from '../../../../../common/assembly/Stateless'
export default class CarList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listData:[
                {
                    Style:{ico:'&#xe61c;',ico2:'&#xe607;',S:{color:'#97989b'}},
                    key:'修改密码',
                    path:'/ChangePosword'
                },
                {
                    Style:{ico:'&#xe646;',ico2:'&#xe607;',S:{color:'#97989b'}},
                    key:'关于透明修车',
                    path:'/about'
                }
            ]
        };
    }
    componentDidMount(){
        this.props.project.changeTitle('设置')
    }
    render() {
        return(
            <div>
                <ul style={{paddingTop:'0.5rem'}}>
                    <BaseLi data={this.state.listData} {...this.props}/>
                </ul>
                <GoOut {...this.props}/>

            </div>
        )
    }
}