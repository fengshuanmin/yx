import React from 'react';
import ReactDOM from 'react-dom'
require('../../common/css/style.css')
import GD from '../../config/GDConfig'
export default class AppRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    scrollFunc(e){

    }
    componentDidMount(){
        GD.addScript();
        window.init = ()=>{
            var map=GD.NewMap();
            map.setZoomAndCenter(12, [121.522082,31.195884]);
            var dats={position:[121.522082,31.195884],msg:'修理厂位置e',name:'修理厂位置s'}
            GD.NewMarker(map,dats,'I',(m)=>{
                GD.openInfoWindow(dats,map);
            });
            var moveEnd=GD.moveEnd(map)
        }
    }
    render(){
        return (
            <div style={{width:'100%',height:'100vh'}} className="map" id="container"></div>
        )
    }
}
ReactDOM.render(<AppRouter />, document.getElementById("appWrapper"));