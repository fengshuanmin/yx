import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, IndexRoute, IndexLink, Redirect  } from 'react-router'
import { createHistory, createHashHistory, useBasename } from 'history'
import createBrowserHistory from 'history/lib/createBrowserHistory'



import App from '../../../common/app'
// import Login from '../../../common/basePage/login'
import Login from './components/Login'
import Register from './components/register'
import ReplacePsd from './components/replacepsd'
// import PhoneCode from './components/home/phonecode'
import MyPoint from './components/home/mypoints'
import Intedetail from './components/home/intedetail'
import CaseInfo from './components/caseInfo.js'
import CheckPhotograph from './components/checkPhotograph.js'
import VehicleInfo from './components/vehicleInfo.js'
// import Record from './components/record1.js'
import Query from './components/query.js'
import Home from './components/home/home.js'
import SetUp from './components/home/SetUp.js'
import person from './components/home/person'
import message from './components/home/message'
import newsurl from './components/home/newsurl'
import personInfo from './components/home/personInfo'
import titckInfo from './components/home/titckInfo'
import titckgl from './components/home/titckgl'
import newaddress from './components/home/newaddress'
import addperson from './components/home/addperson'
import updataperson from './components/home/updataperson'
import addressgl from './components/home/addressgl'
import updataaddress from './components/home/updataaddress'
import updatatittck from './components/home/updatatittck'
import newtitck from './components/home/newtitck'
import About from '../../../common/basePage/about.js'
import IntegralRecord from './components/home/IntegralRecord'
import Inquiry from './components/inquiry'
import MyDingdan from './components/dingdan'
import InquiryList from './components/inquiry/list'
import MyDingdanList from './components/dingdan/list'
import InquiryInfo from './components/inquiry/info'
import PurchaseInfo from './components/purchase/info'
import AddInquiry from './components/inquiry/addInquiry'
import windurl from './components/inquiry/windurl'
import SelectionParts from './components/inquiry/SelectionParts'
import BJXX from './components/inquiry/BJXX'
import Accessories from './components/inquiry/Accessories'

var partsBuy=require('./components/purchase/partsBuy')
var Dingdan=require('./components/dingdan/dingdan')
var Payfangshi=require('./components/purchase/payfangshi')
var Erweima=require('./components/dingdan/erweima')


import Integral from '../../../integral/components/home'
import JiFen from '../../../integral/components/jifen'
import Details from './components/details.js'
import ChangePosword from './components/home/changePosword.js'
import loseInfo from './components/loseInfo'
import maintainInfo from '../../../repairState/src/js/components/maintainInfo'
import caseInfos from '../../../repairState/src/js/components/caseInfo.js'
import detail from '../../../repairState/src/js/components/detail'
import Quote from '../../../repairState/src/js/components/Quote.js'
import partQuote from '../../../repairState/src/js/components/partQuote.js'
import carInfo from '../../../repairState/src/js/components/carInfo.js'
import XLCInfo from '../../../repairState/src/js/components/XLCInfo.js'
import reMark from '../../../repairState/src/js/components/reMark.js'


import Rem  from './rem_'
import $ from "jquery";
//require('../css/style.css');
require('../../../repairState/src/css/style.css');
require('../../../repairState/src/js/iconfont')
require('../../../common/css/style.css')
//require('../css/weui.css')

const history = useBasename(createHashHistory)({
    queryKey: "_key",
    basename: '/app',
});

class AppRouter extends React.Component {
    constructor(props){
        super(props);
        this.state={}
    };
    render() {
        return (
            <Router history={history}>
                <Route path="/" component={App} >
                    <IndexRoute component={Login} />
                    <Route path="login" component={Login}/>
                    <Route path="register" component={Register}/>
                    <Route path="replacepsd" component={ReplacePsd}/>
                    <Route path="Home" component={Home}/>
                    <Route path="person" component={person}/>
                    <Route path="message" component={message}/>
                    <Route path="newsurl" component={newsurl}/>
                    <Route path="personInfo" component={personInfo}/>
                    <Route path="titckInfo" component={titckInfo}/>
                    <Route path="titckgl" component={titckgl}/>
                    <Route path="newtitck" component={newtitck}/>
                    <Route path="newaddress" component={newaddress}/>
                    <Route path="addperson" component={addperson}/>
                    <Route path="updataperson" component={updataperson}/>
                    <Route path="addressgl" component={addressgl}/>
                    <Route path="updataaddress" component={updataaddress}/>
                    <Route path="updatatittck" component={updatatittck}/>
                    <Route path="SetUp" component={SetUp}/>
                    <Route path="About" component={About}/>

                    <Route path="purchase" component={require('./components/purchase/index')}>
                        <IndexRoute component={require('./components/purchase/list')} />
                        <Route path='list' component={require('./components/purchase/list')}/>
                        <Route path="partsBuy" component={partsBuy}/>
                        {/*<Route path="dingdan" component={Dingdan}/>*/}
                        <Route path='info' component={PurchaseInfo}/>
                        {/*<Route path="payfangshi" component={Payfangshi}/>*/}
                        {/*<Route path="erweima" component={Erweima}/>*/}
                        <Route path="addXlc" component={require('./components/purchase/addXlc')}/>
                        <Route path="address" component={require('./components/purchase/address')}/>
                        <Route path="titck" component={require('./components/purchase/titck')}/>
                        <Route path="add" component={require('./components/purchase/add')}/>
                        <Route path="payfangshi" component={require('./components/purchase/payfangshi')}/>
                        <Route path="orderOk" component={require('./components/purchase/orderOk')}/>
                    </Route>
                    <Route path="dingdan" component={require('./components/dingdan/index')}>
                        <IndexRoute component={require('./components/dingdan/list')} />
                        <Route path='list' component={require('./components/dingdan/list')}/>
                        <Route path="dingdan" component={Dingdan}/>
                        <Route path="erweima" component={Erweima}/>
                    </Route>
                    <Route path="news" component={require('./components/news/index')}>
                        <IndexRoute component={require('./components/news/personnews')} />
                        <Route path='personnews' component={require('./components/news/personnews')}/>
                        <Route path='checkadd' component={require('./components/news/checkadd')}/>
                    </Route>
                    <Route path="inquiry" component={Inquiry}>
                        <IndexRoute component={InquiryList} />
                        <Route path='list' component={InquiryList}/>
                        <Route path='forecast' component={require('./components/inquiry/forecast')}/>
                        <Route path='newinquiry' component={require('./components/inquiry/newinquiry')}/>
                        <Route path='info' component={InquiryInfo}/>
                        <Route path='addInquiry' component={AddInquiry}/>
                        <Route path='windurl' component={windurl}/>
                        <Route path='selectionParts' component={SelectionParts}/>
                        <Route path='baojia' component={BJXX}/>
                        <Route path='accessories' component={Accessories}/>
                    </Route>
                    <Route path="mydingdan" component={MyDingdan}>
                        <IndexRoute component={MyDingdanList} />
                        <Route path='list' component={MyDingdanList}/>
                    </Route>
                    <Route path="IntegralRecord" component={IntegralRecord}/>
                    <Route path="integral" component={Integral}/>
                    <Route path="jifen" component={JiFen}/>
                    {/*<Route path="phonecode" component={PhoneCode}/>*/}
                    <Route path="myPoint" component={MyPoint}/>
                    <Route path="intedetail" component={Intedetail}/>
                    <Route path='detail' component={detail}>
                        <IndexRoute component={caseInfos}/>
                        <Route path='caseInfo' component={caseInfos}/>
                        <Route path='loseInfo' component={loseInfo}/>
                        <Route path='maintainInfo' component={maintainInfo}/>
                    </Route>

                    <Route path="quote" component={Quote} />
                    <Route path="partQuote" component={partQuote}/>
                    <Route path="carInfo" component={carInfo}/>
                    <Route path="XLCInfo" component={XLCInfo}/>
                    <Route path="reMark" component={reMark}/>

                    <Route path="query" component={Query}/>
                    <Route path="caseInfo" component={CaseInfo} />
                    <Route path="vehicleInfo" component={VehicleInfo} />
                    <Route path="checkPhotograph" component={CheckPhotograph} />
                    <Route path="changePosword" component={ChangePosword} />
                </Route>
            </Router>
        )
    }
}
ReactDOM.render(<AppRouter />, document.getElementById("appWrapper"));




