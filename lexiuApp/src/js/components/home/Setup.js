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
                <div className="DSYHome">
                    <ul className="SetUpLi">
                        <li onClick={()=>{this.props.history.pushState(null, "/changePosword");}}>
                            <span>修改密码</span><span className="iconfonts">&#xe607;</span>
                        </li>
                        <li onClick={()=>{this.props.history.pushState(null, "/About");}}>
                            <span>关于透明修车</span><span className="iconfonts">&#xe607;</span>
                        </li>
                    </ul>
                    <ul className="SetUpLi">
                        <li>
                            <span>公司电话</span><span className="iconfonts" style={{fontWeight:'300',fontSize:'16px'}}>4000022298</span>
                        </li>
                    </ul>
                    <GoOut {...this.props}/>
                </div>
                {/*<ul style={{paddingTop:'0.5rem'}}>
                    <BaseLi data={this.state.listData} {...this.props}/>
                </ul>*/}
            </div>
        )
    }
}