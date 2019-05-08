import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, Link, IndexRoute, IndexLink, Redirect} from 'react-router'
import {createHistory, createHashHistory, useBasename} from 'history'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import App from '../../../common/app'
import Login from '../../../common/basePage/login'
import Record from './components/home.js'
import Home from './components/home/index'
import About from '../../../common/basePage/about'
import SetUp from './components/home/SetUp'
import ChangePosword from '../../../common/basePage/changePosword'


import detail from './components/detail'
import caseInfo from './components/caseInfo'
import loseInfo from './components/loseInfo'
import maintainInfo from './components/maintainInfo'
import Quote from './components/Quote.js'
import partQuote from './components/partQuote.js'
import carInfo from './components/carInfo.js'
import XLCInfo from './components/XLCInfo.js'
import reMark from './components/reMark.js'
import xlcMap from '../../../newBuild/src/js/components/vehicleInfo'

import {Prompt} from '../../../common/assembly/someAssembly'
import someEvent from '../../../common/baseFun/someEvent'
import Rem  from './rem_'
import $ from "jquery";

require('../css/style.css')
require('./iconfont.js')

const history = useBasename(createHashHistory)({
    queryKey: "_key",
    basename: '/app',
});
class AppRouter extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Route path="/" component={App}>
                    <IndexRoute component={Login}/>
                    <Route path='login' component={Login}/>
                    <Route path='record' component={Record}/>
                    <Route path="Home" component={Home}/>
                    <Route path="about" component={About}/>
                    <Route path="SetUp" component={SetUp}/>
                    <Route path="ChangePosword" component={ChangePosword}/>


                    <Route path='detail' component={detail}>
                        <IndexRoute component={caseInfo}/>
                        <Route path='caseInfo' component={caseInfo}/>
                        <Route path='loseInfo' component={loseInfo}/>
                        <Route path='maintainInfo' component={maintainInfo}/>
                    </Route>
                    <Route path="xlcMap" component={xlcMap}/>
                    <Route path="quote" component={Quote}/>
                    <Route path="partQuote" component={partQuote}/>
                    <Route path="carInfo" component={carInfo}/>
                    <Route path="XLCInfo" component={XLCInfo}/>
                    <Route path="reMark" component={reMark}/>
                </Route>
            </Router>
        )
    }
}
/*const Appss = React.createClass({
    getInitialState() {
        return {
            yyMore: 0
        }
    },
    toStart(e){
        this.setState({yyMore: document.body.scrollTop, yyStart: e.touches[0].clientY})
        // document.body.addEventListener('touchmove', this.toMove, false);
        // let oo=document.body.scrollTop|| document.documentElement.scrollTop
        // document.body.scrollTop=50
        // document.documentElement.scrollTop=40
        // this.setState({yyMore: document.getElementById('appWrapper').scrollTop},()=>{
        //     setTimeout(function () {
        //         alert(this.state.yyMore)
        //     }.bind(this),5000)
        // })
        // document.body.scrollTop=document.getElementsByClassName('appRouter')[0].offsetHeight-document.body.clientHeight-1
    },
    toMove(e){
        // alert(document.body.scrollTop)
        if ((this.state.yyStart-e.touches[0].clientY+(document.body.scrollTop || document.documentElement.scrollTop) - document.body.offsetHeight + document.documentElement.clientHeight) > -1) {
            e.preventDefault()
            e.stopPropagation()
            document.body.scrollTop = document.body.offsetHeight - document.documentElement.clientHeight-1
        } else if (e.touches[0].clientY-this.state.yyStart-this.state.yyMore>=0) {
            this.setState({yyMore:0})
            e.preventDefault()
            e.stopPropagation()
            // document.body.scrollTop = 2
            // document.body.removeEventListener('touchmove', this.toMove, false);
        }
        // if((document.body.scrollTop || document.documentElement.scrollTop)<2){
        //     // e.preventDefault()
        //     document.body.scrollTop = 2
        // }
    },
    // toMove(e){
    //
    //     if((this.state.yyStart-e.touches[0].clientY+this.state.yyMore)<=4){
    //         console.log('到顶了')
    //         e.preventDefault()
    //         document.body.scrollTop=1
    //     }
    //     if((this.state.yyStart-e.touches[0].clientY+this.state.yyMore+document.body.clientHeight-document.getElementsByClassName('appRouter')[0].offsetHeight)>=-2){
    //         console.log('到底了')
    //         // alert('到底')
    //         document.body.scrollTop=document.getElementsByClassName('appRouter')[0].offsetHeight-document.body.clientHeight-1
    //         e.preventDefault()
    //     }
    //     let time=this.state.timeInit
    //     console.log('time',time)
    //     this.setState({timeInit:++time})
    //     if(this.state.timeInit%4==0){
    //         console.log('timeInit',this.state.timeInit)
    //         if((this.state.yyStart-e.touches[0].clientY+this.state.yyMore)<4){
    //             document.body.scrollTop=1
    //         }else if((this.state.yyStart-e.touches[0].clientY+this.state.yyMore)>(document.getElementsByClassName('appRouter')[0].offsetHeight-document.body.clientHeight)){
    //             document.body.scrollTop=document.getElementsByClassName('appRouter')[0].offsetHeight-document.body.clientHeight-1
    //         }else{
    //             document.body.scrollTop=this.state.yyStart-e.touches[0].clientY+this.state.yyMore
    //         }
    //     }
    // },
    toEnd(e){
        // if ((this.state.yyStart - e.touches[0].clientY + this.state.yyMore) < 4) {
        //     document.body.scrollTop = 1
        // } else if ((this.state.yyStart - e.touches[0].clientY + this.state.yyMore) > (document.getElementsByClassName('appRouter')[0].offsetHeight - document.body.clientHeight)) {
        //     document.body.scrollTop = document.getElementsByClassName('appRouter')[0].offsetHeight - document.body.clientHeight - 1
        // } else {
        //     document.body.scrollTop = this.state.yyStart - e.touches[0].clientY + this.state.yyMore
        // }
        // this.setState({timeInit: 0})
        if((document.body.scrollTop || document.documentElement.scrollTop)<2){
            document.body.scrollTop = 2
        }
    },
    // handleScroll(e){
    //     console.log('监听到了')
    //     let scrollTop=document.body.scrollTop|| document.documentElement.scrollTop
    //     if(scrollTop<4){
    //         e.preventDefault()
    //         // alert('333')
    //         // scrollTop=5
    //     }
    // },
    componentDidMount(){
        // document.body.addEventListener('touchstart', this.toStart, false);
        // document.body.addEventListener('touchmove', this.toMove, false);
        // window.addEventListener('scroll', this.handleScroll.bind(this));
        // document.body.addEventListener('touchend', this.toEnd, false);
        // document.body.scrollTop=40
        this.setState({timeInit: 0})
        someEvent.ajaxEvent(null, this)
        this.setState({index: this})
        this.setState({
            setProps: (a, b) => {
                var oldState = this.state;
                var newState = Object.assign({}, this.state, a);
                this.setState(newState, () => {
                    if (b) {
                        b(this);
                    }
                })
            }
        })
    },
    render() {
        return (
            <div className="appRouter">
                <div className="routerContainer">
                    {this.props.children && React.cloneElement(this.props.children, {
                        project: this.state
                    })}
                </div>
                <Prompt data={this.state.PromptData || {}}/>
            </div>
        )
    }
})*/
ReactDOM.render(<AppRouter />, document.getElementById("appWrapper"));




