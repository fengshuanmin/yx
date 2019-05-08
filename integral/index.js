import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, IndexRoute, IndexLink, Redirect  } from 'react-router'
import { createHistory, createHashHistory, useBasename } from 'history'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import Home from './components/home'
import $ from "jquery";
import {Prompt,PublicHeader} from '../common/assembly/someAssembly'
import someEvent from '../common/baseFun/someEvent'
import Rem  from '../common/rem_'
require('./public/css/base.css');
const history = useBasename(createHashHistory)({
    queryKey: "_key",
    basename: '/app',
});
class AppRouter extends React.Component {
    constructor(props){
        super(props);
        this.state={
        };
        this.changeProps=this.changeProps.bind(this);
    };
    componentDidMount(){
        this.changeProps();
    };
    changeProps(){
        this.setState({
            setProps:(a,b)=>{
                this.setState(a,()=>{
                    if(b){
                        b();
                    }
                })
            }
        })
    };
    render() {
        return (
            <Router history={history} store={this.state}>
                <Route path="/" component={App} >
                    <IndexRoute component={Home} />
                    <Route path="Home" component={Home}/>
                </Route>
            </Router>
        )
    }
}
const App = React.createClass( {
    ParentComponent(props){
        return props.children
    },
    getInitialState() {
        return{
            setProps:''
        }
    },
    componentDidMount(){
        someEvent.ajaxEvent(null,this)
        this.setState({index:this})
        this.setState({
            setProps:(a,b)=>{
                var oldState=this.state;
                var newState = Object.assign({},this.state,a);
                this.setState(newState,()=>{
                    if(b){
                        b(this);
                    }
                })
            }
        })
    },
    touchStart(e){someEvent.touchStart(e,this)},
    touchMove(e){someEvent.touchMove(e,this)},
    touchEnd(e){someEvent.touchEnd(e,this)},
    render() {
        return (
            <div className="appRouter" onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd} >
                {/*<PublicHeader {...this.state}/>*/}
                <div className="routerContainer">
                    {this.props.children && React.cloneElement(this.props.children,{
                        project:this.state
                    })}
                </div>
                <Prompt data={this.state.PromptData || {}}/>
            </div>
        )
    }
})

ReactDOM.render(<AppRouter />, document.getElementById("appWrapper"));




