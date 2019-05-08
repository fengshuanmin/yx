import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, IndexRoute, IndexLink, Redirect  } from 'react-router'
import { createHistory, createHashHistory, useBasename } from 'history'
import Rem  from './rem_'
require('../css/style.css');
require('../css/antd-mobile.min.css');
require('../css/weui.css');
//import $ from "jquery";
//import createBrowserHistory from 'history/lib/createBrowserHistory'
import wxconfig from '../../../config/WXConfig';
import Login from './components/Login'
import ReportStatistics from './components/ReportStatistics';
const history = useBasename(createHashHistory)({
    queryKey: "_key",
    basename: '/app',
});

class AppRouter extends React.Component {
    render() {
        return (
            <Router history={history} >
                <Route path="/" component={App}>
                    <IndexRoute component={Login} />
                    <Route path="login" component={Login}/>
                    <Route path="reportStatistics" component={ReportStatistics}/>
                </Route>
            </Router>
        )
    }
}
const App = React.createClass( {
    render() {
        return (
            <div className="appRouter">
                    {this.props.children}
            </div>
        )
    }
})

ReactDOM.render(<AppRouter />, document.getElementById("appWrapper"));




