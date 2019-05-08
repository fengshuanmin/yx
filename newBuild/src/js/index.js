import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, IndexRoute, IndexLink, Redirect  } from 'react-router'
import { createHistory, createHashHistory, useBasename } from 'history'
import createBrowserHistory from 'history/lib/createBrowserHistory'



import App from '../../../common/app'
import Login from '../../../common/basePage/login'
import CaseInfo from './components/caseInfo.js'
import newcaseInfo from './components/newcaseInfo.js'
import adver from './components/adver.js'
import choseaddress from './components/choseadd.js'
import CheckPhotograph from './components/checkPhotograph.js'
import VehicleInfo from './components/vehicleInfo.js'
import Vehicle from './components/vehicle.js'
import Record from './components/record.js'
import Record1 from './components/record1.js'
import Query from './components/query.js'
import Home from './components/home/home.js'
import SetUp from './components/home/SetUp.js'
import About from '../../../common/basePage/about.js'
import IntegralRecord from './components/home/IntegralRecord'
import message from './components/home/message'
import newsurl from './components/home/newsurl'
import Recovery from './components/recovery'
import RecoveryList from './components/recovery/list'
import RcaseInfo from './components/recovery/caseInfo'
import RorderInfo from './components/recovery/orderInfo'
import AddRecovery from './components/recovery/addRecovery'
import AddCjqd from './components/recovery/addcjqd'
import UpLoadImg from './components/recovery/uploadImg'
import Inquiry from './components/inquiry'
import MyDingdan from './components/dingdan'
import InquiryList from './components/inquiry/list'
import MyDingdanList from './components/dingdan/list'
import InquiryInfo from './components/inquiry/info'
import PurchaseInfo from './components/purchase/info'
import AddInquiry from './components/inquiry/addInquiry'
import AddInquiry1 from './components/inquiry/addInquiry1'
import windurl from './components/inquiry/windurl'
import SelectionParts from './components/inquiry/SelectionParts'
import SelectionParts1 from './components/inquiry/SelectionParts1'
import recoveryParts from './components/recovery/recoveryParts'
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
                    <Route path="Home" component={Home}/>
                    <Route path="SetUp" component={SetUp}/>
                    <Route path="About" component={About}/>
                    <Route path="recovery" component={Recovery}>
                        <IndexRoute component={RecoveryList} />
                        <Route path="list" component={RecoveryList}/>
                        <Route path="caseInfo" component={RcaseInfo}/>
                        <Route path="orderInfo" component={RorderInfo}/>
                        <Route path="list" component={RecoveryList}/>
                        <Route path="addRecovery" component={AddRecovery}/>
                        <Route path="addCjqd" component={AddCjqd}/>
                        <Route path='recoveryParts' component={recoveryParts}/>
                        <Route path="photoUpdata" component={UpLoadImg}/>
                    </Route>

                    <Route path="purchase" component={require('./components/purchase/index')}>
                        <IndexRoute component={require('./components/purchase/list')} />
                        <Route path='list' component={require('./components/purchase/list')}/>
                        <Route path="partsBuy" component={partsBuy}/>
                        {/*<Route path="dingdan" component={Dingdan}/>*/}
                        <Route path='info' component={PurchaseInfo}/>
                        {/*<Route path="payfangshi" component={Payfangshi}/>*/}
                        {/*<Route path="erweima" component={Erweima}/>*/}
                        <Route path="addXlc" component={require('./components/purchase/addXlc')}/>
                        <Route path="payfangshi" component={require('./components/purchase/payfangshi')}/>
                        <Route path="orderOk" component={require('./components/purchase/orderOk')}/>
                    </Route>
                    <Route path="dingdan" component={require('./components/dingdan/index')}>
                        <IndexRoute component={require('./components/dingdan/list')} />
                        <Route path='list' component={require('./components/dingdan/list')}/>
                        <Route path="dingdan" component={Dingdan}/>
                        <Route path="erweima" component={Erweima}/>
                    </Route>
                    <Route path="inquiry" component={Inquiry}>
                        <IndexRoute component={InquiryList} />
                        <Route path='list' component={InquiryList}/>
                        <Route path='forecast' component={require('./components/inquiry/forecast')}/>
                        <Route path='newinquiry' component={require('./components/inquiry/newinquiry')}/>
                        <Route path='info' component={InquiryInfo}/>
                        <Route path='addInquiry' component={AddInquiry}/>
                        <Route path='addInquiry1' component={AddInquiry1}/>
                        <Route path='windurl' component={windurl}/>
                        <Route path='selectionParts' component={SelectionParts}/>
                        <Route path='selectionParts1' component={SelectionParts1}/>
                        <Route path='baojia' component={BJXX}/>
                        <Route path='accessories' component={Accessories}/>
                    </Route>
                    <Route path="mydingdan" component={MyDingdan}>
                        <IndexRoute component={MyDingdanList} />
                        <Route path='list' component={MyDingdanList}/>
                    </Route>
                    <Route path="IntegralRecord" component={IntegralRecord}/>
                    <Route path="message" component={message}/>
                    <Route path="newsurl" component={newsurl}/>
                    <Route path="integral" component={Integral}/>
                    <Route path="jifen" component={JiFen}/>
                    <Route path="record" component={Record}/>
                    <Route path="record1" component={Record1}/>
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
                    <Route path="newcaseInfo" component={newcaseInfo} />
                    <Route path="adver" component={adver} />
                    <Route path="choseaddress" component={choseaddress} />
                    <Route path="vehicleInfo" component={VehicleInfo} />
                    <Route path="vehicle" component={Vehicle} />
                    <Route path="checkPhotograph" component={CheckPhotograph} />
                    <Route path="changePosword" component={ChangePosword} />
                </Route>
            </Router>
        )
    }
}
ReactDOM.render(<AppRouter />, document.getElementById("appWrapper"));




