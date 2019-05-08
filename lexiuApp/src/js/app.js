import React from 'react'
import ReactDOM from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Router, Route, Link, IndexRoute, IndexLink, Redirect ,BrowserHistory} from 'react-router'
import { createHistory, createHashHistory, useBasename } from 'history';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {IconFont} from './commonComponent/common'
//import LoginForm from './components/Login'

import $ from 'jquery';
//import "vendor/chosen.jquery";
import LoginForm from '../../../common/basePage/login'
import App from '../../../common/app'
import Home from './components/home'
import Windurl from './components/windurl'
import CarList from './components/carList'
import Purshase from './components/peijiancaigou/purshase'
import Details from './components/details'
import CaiDetail from './components/peijiancaigou/caidetail'
import PeijianCaigou from './components/peijiancaigou/peijiancaigou'
import Address from './components/bqnews/address'
import Bqnews from './components/bqnews/bqnews'
import CarDetales from './components/carDetales'
import XLCHome from './components/home/index'
import SetUp from './components/home/Setup'
import message from './components/home/message'
import newsurl from './components/home/newsurl'
import Paydetail from './components/home/paydetail'
import Rechargedetail from './components/home/rechargedetail'
import CouponDetails from './components/home/couponDetails'
import CouponHistory from './components/home/couponHistory'
import Fpnews from './components/bqnews/fpnews'
import Addressgl from './components/bqnews/addressgl'
import NewAddress from './components/bqnews/newaddress'
import Companynews from './components/bqnews/companynews'
import Lianxixinxi from './components/bqnews/lianxixinxi'

import XlcPeijianCaigou from './components/xlc/peijiancaigou'

/*
import Dingdan from './components/home/dingdan'
import WillPay from './components/home/willpay'
import Payed from './components/home/payed'
*/

import About from '../../../common/basePage/about'
import ChangePosword from '../../../common/basePage/changePosword'

import Receive from './components/receive'
import Check from './components/check'
import Service from './components/service'
import Check_detail from './components/check_detail'
import Receive_detail from './components/receive_detail'
import ComplementingInformation from './components/ComplementingInformation'
import Service_detail from './components/service_detail'
import Check_details from './components/check_details'
import Receive_details from './components/receive_details'
import Service_details from './components/service_details'
import Check_image from './components/check_image'
import Service_image from './components/service_image'
//import ChangePosword from './components/changePosword'
import Rem  from './rem_'

require('../css/app.css')
require('./common/css/css.css')
const history = useBasename(createHashHistory)({
    queryKey: '_key',
    basename: '/app',
});
class AppRouter extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Route path="/" component={App}>
                    <IndexRoute component={LoginForm} />
                    <Route path="login" component={LoginForm}/>
                    <Route path="record" component={Home}/>
                    <Route path="windurl" component={Windurl}/>
                    <Route path="XList" component={CarList}/>
                    <Route path="CList" component={Purshase}/>
                    <Route path="home" component={XLCHome}/>
                    {/*<Route path="home" component={Home}/>*/}
                    <Route path="carDetales" component={CarDetales}/>
                    <Route path="details" component={Details}/>
                    <Route path="caidetail" component={CaiDetail}/>
                    <Route path="peijiancaigou" component={PeijianCaigou}/>
                    <Route path="address" component={Address}/>
                    <Route path="bqnews" component={Bqnews}/>
                    <Route path="SetUp" component={SetUp}/>
                    <Route path="message" component={message}/>
                    <Route path="newsurl" component={newsurl}/>
                    <Route path="paydetail" component={Paydetail}/>
                    <Route path="rechargedetail" component={Rechargedetail}/>
                    <Route path="couponDetails" component={CouponDetails}/>
                    <Route path="couponHistory" component={CouponHistory}/>
                    <Route path="fpnews" component={Fpnews}/>
                    <Route path="addressgl" component={Addressgl}/>
                    <Route path="newaddress" component={NewAddress}/>
                    <Route path="companynews" component={Companynews}/>
                    <Route path="lianxixinxi" component={Lianxixinxi}/>
                    <Route path="about" component={About}/>

                    <Route path="xlcpeijiancaigou" component={XlcPeijianCaigou}/>
                    <Route path="pay" component={require('./components/home/pay')}/>
                    <Route path="recharge" component={require('./components/home/recharge')}/>
                    <Route path="dingdan" component={require('./components/home/dingdan')}/>
                   {/* <Route path="dingdan" component={Dingdan}/>
                    <Route path="dingdanpayed" component={Payed}/>
                    <Route path="dingdanwilpay" component={WillPay}/>*/}


                    <Route path="receive" component={Receive}/>
                    <Route path="check" component={Check}/>
                    <Route path="service" component={Service}/>
                    <Route path="check_details" component={Check_details}/>
                    <Route path="check_detail" component={Check_detail}/>
                    <Route path="receive_detail" component={Receive_detail}/>
                    <Route path="ComplementingInformation" component={ComplementingInformation}/>
                    <Route path="service_detail" component={Service_detail}/>
                    <Route path="receive_details" component={Receive_details}/>
                    <Route path="service_details" component={Service_details}/>
                    <Route path="check_image" component={Check_image}/>
                    <Route path="service_image" component={Service_image}/>
                    <Route path="ChangePosword" component={ChangePosword}/>
                </Route>
            </Router>
        )
    }
}
/*class Appss extends React.Component {

    componentWillReceiveProps(nextProps){
        if(nextProps.location.pathname=='/ChangePosword'){
            console.log('hide')
           $('.clearfix').hide();
        }else{
            console.log('show')
            $('.clearfix').show();
        }
    }
  render() {
    return (
        <div className="appRouter">

            <div className="routerContainer">
                {this.props.children}
            </div>
      </div>
    )

  }
}*/



    ReactDOM.render(<AppRouter />, document.getElementById("appWrapper"));