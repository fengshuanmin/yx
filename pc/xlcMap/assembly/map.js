import React from 'react'
import $ from 'jquery'
import GD from '../../../config/GDConfig'
var style={
    liBox:{
        background:'#fff',borderRadius:'7px',
    },
    li:{
        display:'flex',margin:'15px',fontSize:'12px',textAlign:'left',
        alignItems: 'center',cursor: 'pointer',background:'#fff',padding:'10px 0',borderBottom:'1px solid #ccc'
    },
    firstDiv:{
        flex:1
    },
    img:{
        width:'100px',height:'74px'
    },
    xingxing:{textAlign:'left',lineHeight:'20px'},
    addr:{textAlign:'left',lineHeight:'30px',color: '#999'},
    ZZFW:{
        display:'inline-block',margin:'5px',padding:'5px 10px',background:'red',
        borderRadius:'20px',color:'#fff',fontSize:'12px'
    },
    //详情

}
export default {
    MapXlcList:class extends React.Component{
        constructor(props) {
            super(props);
            this.state = {}
        }
        componentWillMount(){
            if(!this.props.data.longitude || !this.props.data.latitude)return;
            var dats={position:[this.props.data.longitude || 0,this.props.data.latitude || 0],msg:'搜索位置',name:'搜索位置'}
            var marker=GD.NewMarker(this.props.maps,dats,this.props.index,(m)=>{
                this.props.T.setState({xlcInfo: this.props.data})
                marker.setContent(GD.lStyle('new'));
            });
            this.setState({marker:marker})
        }
        componentWillUnmount(){
            console.log(this.state.marker,'list')
            if(!this.props.data.longitude || !this.props.data.latitude)return;
            this.props.maps.remove(this.state.marker);
        }
        render() {
            var dats = [], props = this.props
            props.data.addedKinds && (dats = props.data.addedKinds.split(','))
            return (
                <li style={style.liBox} onClick={() => props.T.setState({xlcInfo: props.data})}>
                    <div style={style.li}>
                        <div style={style.firstDiv}>
                            <h3 style={{fontWeight: '400'}}>{props.index + ',' + props.data.shotName}</h3>
                            {props.ping && <p style={style.xingxing}>
                                11111
                            </p>}
                            <p style={style.xingxing}>
                                <span style={{color: 'red'}}>★★★★</span>
                            </p>

                            <p style={style.addr}>{props.data.addr}</p>
                        </div>
                        <img style={style.img}
                             src={'/toumingxiu/jyshowPhoto/getUrl.do?photoUrl=' + props.data.jgdm}
                             alt=""/>
                    </div>
                    <div style={{padding: '0 10px'}}>
                        {
                            dats[0] ? dats.map((item, index) => {
                                    return (
                                        <span style={style.ZZFW} key={index}>{item}</span>
                                    )
                                }) :
                                <p>暂无增值服务</p>
                        }
                    </div>
                </li>
            )
        }
    },
    MapXlicInfo:class extends React.Component{
        constructor(props) {
            super(props);
            this.state = {}
        }
        componentWillMount(){
            var positions=[this.props.data.longitude,this.props.data.latitude];
            var dats={position:[this.props.data.longitude,this.props.data.latitude],msg:'搜索位置',name:'搜索位置'}
            var marker=GD.NewMarker(this.props.maps,dats,'new',(m)=>{
                this.props.T.setState({xlcInfo: this.props.data})
                marker.setContent(GD.lStyle('new'));
            });
            this.props.maps.setZoomAndCenter(12, positions);
            if(!this.props.T.state.isheight){
                this.props.maps.panBy(-180,0)
            }else{
                this.props.maps.panBy(0,0)
            }
            this.setState({marker:marker})
        }
        componentWillUnmount(){
            this.props.maps.remove(this.state.marker);
            this.props.T.goNow();
        }
        render(){
            var dats = [], props = this.props
            props.data.addedKinds && (dats = props.data.addedKinds.split(','))
            return(
                <div className="MapXlicInfo">
                    <div className="MXIHeader">
                        <span className="iconfonts goBack" onClick={()=>this.props.T.setState({xlcInfo:false})}>&#xe601;<span>返回</span></span>
                        <div className="imgBox"><img src={'http://www.beidouchaxun.cn/toumingxiu/jyshowPhoto/getUrl.do?photoUrl='+this.props.data.jgdm} alt=""/></div>
                        <span className="Choice" onClick={()=>{glabData=this.props.data;newGlbData(glabData);$('#mapSelectBox').remove();}}>选这里</span>
                    </div>
                    <div className="MXIInfo">
                        <h3 className="titles">{this.props.data.name}</h3>
                        <p><i className="iconfonts">&#xe623;</i>{this.props.data.addr}</p>
                        <p><i className="iconfonts">&#xe61e;</i>{this.props.data.tel}</p>
                    </div>
                    <div style={{padding: '0 10px',background:'#fff',marginTop:'10px'}}>
                        <h3 className="titles">增值服务</h3>
                        {
                            dats[0] ? dats.map((item, index) => {
                                    return (
                                        <span style={style.ZZFW} key={index}>{item}</span>
                                    )
                                }) :
                                <p>暂无增值服务</p>
                        }
                    </div>
                </div>
            )
        }
    }
}