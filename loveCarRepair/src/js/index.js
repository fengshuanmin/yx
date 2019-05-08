import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'
import { createHashHistory, useBasename } from 'history'
//import createBrowserHistory from 'history/lib/createBrowserHistory'
import $ from "jquery";
import App from '../../../common/app'
import Login from './components/login'
import MessLogin from './components/message_login'
import RepairRecord from './components/repairRecord'
import RepairDetails from './components/repairDetails'
import RepairDiscuss from './components/repairDiscuss'
import leCheHelp from './components/leCheHelp'
import Home from './components/home'
import aboutMyCar from './components/home/aboutMyCar'
import Coupon from './components/home/Coupon'
import SetUp from './components/home/SetUp'
import Rem  from './rem_'
require('../css/style.css');
//require('../css/weui.min.css');

const history = useBasename(createHashHistory)({
    queryKey: "_key",
    basename: '/app',
});
class AppRouter extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Route path="(/:resultStr)" component={App}>
                    <IndexRoute component={Login} />
                    <Route path="login" component={Login}/>
                    <Route path="Home" component={Home}/>
                    <Route path="aboutMyCar" component={aboutMyCar}/>
                    <Route path="Coupon" component={Coupon}/>
                    <Route path="SetUp" component={SetUp}/>
                    <Route path="login(/:resultStr)" component={Login}/>
                    <Route path="message_login" component={MessLogin}/>
                    <Route path="record" component={RepairRecord}/>
                    <Route path="repairDiscuss" component={RepairDiscuss}/>
                    <Route path="repairDetails" component={RepairDetails}/>
                    <Route path="leCheHelp" component={leCheHelp}/>
                </Route>
            </Router>
        )
    }
}
/*const Appss = React.createClass({
    render() {
        return (
            <div className="appRouter">
	            <div className="routerContainer">
		            {this.props.children}
		        </div>
            </div>
        )
    }
})*/

ReactDOM.render(<AppRouter/>, document.getElementById("appWrapper"));




