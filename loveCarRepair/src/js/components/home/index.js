/**个人中心**/
import React from 'react';
import $ from "jquery";
import {DSYButton} from '../../../../../common/assembly/someAssembly'
import {UserHeader,BaseLi} from '../../../../../common/assembly/Stateless'
import ChangeTitle from '../../../../../common/baseFun/someEvent'
export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            liList:[
                {
                    Style:{ico:'&#xe6ed;',ico2:'&#xe607;',S:{color:'#faab44'}},
                    key:'优惠券',
                    num:this.props.project.haveAdian ? '　' : false,
                    path:'/Coupon'
                },
                {
                    Style:{ico:'&#xe64d;',ico2:'&#xe607;',S:{color:'#6391f8'}},
                    key:'我的爱车',
                    num:'',
                    path:'/aboutMyCar'
                }
            ],
            SZ:[
                {
                    Style:{ico:'&#xe70c;',ico2:'&#xe607;',S:{color:'#97989b'}},
                    key:'解除绑定',
                    num:'',
                    fun:()=>{
                        this.props.project.setProps({
                            PromptData: {
                                content: '确定要解绑吗', Prompt: true, fun: () => {
                                    this.props.project.unBindCar(this)
                                }
                            }
                        })
                    }
                }
            ]
        };
    }
    componentDidMount(){
        ChangeTitle.ChangeTitle('个人中心');
    }
    render() {
        return (
            <div>
                <UserHeader {...this.props}/>
                <BaseLi data={this.state.liList} {...this.props}/>
                <BaseLi data={this.state.SZ} {...this.props}/>
                <DSYButton {...this.props} T={this} on={2} ButtonFrom="myCar"/>
            </div>
        )
    }
}