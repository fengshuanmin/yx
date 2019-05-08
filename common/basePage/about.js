import React from 'react';
import $ from "jquery";
import ChangeTitle from '../baseFun/someEvent'
import {BaseLi} from '../assembly/Stateless'
require('../css/basePage/about.css')

export default class SetUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.goOut = () => {
            localStorage.setItem("password", '');
            this.props.history.pushState(null, "/login");
        }
    }

    componentDidMount() {
        this.props.project.changeTitle('关于透明修车');
    }

    render() {
        return (
            <div className="DSYHome">
                <div className="HomeLogoStyle">
                    <img src={require('../../newBuild/src/img/logo.png')} alt=""/>
                    <span>{'v0.1.17.1020'}</span>
                </div>
                <div>
                    <ul className="SetUpLi">
                       {/* <BaseLi data={[{
                            Style:{ico2:'&#xe607;',S:{color:'#97989b'}},
                            key:'版本更新：v2.154.156',
                            fun:()=>{alert()}
                        }
                        ]} {...this.props}/>*/}
                    </ul>

                </div>
            </div>
        )
    }
}