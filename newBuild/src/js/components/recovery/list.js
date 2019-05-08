import React from 'react';
import $ from 'jquery';
require('../../../css/recovery.css')
import {LoadList} from '../../../../../common/assembly/Logical'
import {DSYButton} from '../../../../../common/assembly/someAssembly'
/**残件列表**/
export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reqParam:{url:'',data:{pageNum:1}},
            caseList:[],
            orderList:[],
            data:[]
        };
        this.dataReform=(datas,type,im)=>{
            var dat=datas?datas.data.datas.data:'';
            dat || ''
            var datArr={
                am:{datArr:['plateNo','cxmc'],path:'/recovery/caseInfo'},
                hm:{
                    datArr:['xlcName','plateNo','cxmc','partDetail'],path:'/recovery/orderInfo',
                    orArr:['rfName','plateNo','carType','partDetail']
                }
            }
            var arrname={xlcName:'修理厂',plateNo:'车牌',cxmc:'车型',partDetail:'残件'}
            for(var i in dat){
                dat[i].type=im;
                dat[i].path=datArr[im].path
                dat[i].show=[];
                for(var j in datArr[im].datArr){
                    var jm='',tmd;
                    if(datArr[im].datArr[j]=='partDetail'){
                        for(var tm in dat[i][datArr[im].datArr[j]]){
                            jm+=dat[i][datArr[im].datArr[j]][tm].partName+ (tm < dat[i][datArr[im].datArr[j]].length-1 ? '/':'')
                        }
                        tmd=(<p style={{textAlign:'left',overflow: 'hidden',textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'}}>{jm}</p>)
                    }
                    datArr[im].datArr[j] && dat[i].show.push({
                        key:arrname[datArr[im].datArr[j]],
                        value:(jm && tmd) || dat[i][datArr[im].datArr[j]] || dat[i][datArr[im].orArr[j]] ||'-',
                        Style:{V:jm && {overflow: 'hidden',textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}
                    })
                }

            }
            var newData;
            switch(type){
                case 'loadMore':
                    newData=this.state.data.concat(dat)
                    break;
                case 'Reload':
                    newData=dat;
                    break;
                case 'loadFirst':
                    newData=[]
                    this.loadList('am')
                    break;
                default:
            }
            this.setState({data:newData})
        }
        this.loadList=(a,t)=>{
            var url={am:'/lexiugo-app/weixin/getCaseList',hm:'/lexiugo-app/weixin/getDealList'}
            var newState=this.state.reqParam;
            newState.type=a
            newState.url=url[a];
            this.props.setScroll(0);
            this.props.setProps({loadParam:newState},()=>{
                this.state.Logical.Reload();
                this.refs.heng.style.left=(this.refs[a].offsetLeft+this.refs[a].offsetWidth/2-this.refs.heng.offsetWidth/2)+'px';
            })
        }
    }
    componentWillMount(){
        this.props.setProps({loadParam:this.state.reqParam})
    }
    componentDidMount() {
        this.props.changeTitle('残件列表');
    }
    componentDidUpdate(){}
    render(){
        console.log(this.state.data)
        return(
            <div className="recoverList">
                <nav>
                    <div>
                        <span ref="am" onClick={this.loadList.bind(this,'am')}>案件列表</span>
                        <span ref="hm" onClick={this.loadList.bind(this,'hm')}>回收订单</span>
                        <i ref="heng"></i>
                    </div>
                </nav>
                <LoadList {...this.props}  dataReform={this.dataReform} T={this}>
                    {
                        this.state.data.map((item,index)=>{
                            return(
                                <this.props.StateLess.caseList iteDat={item} {...this.props} key={index}/>
                            )
                        })
                    }

                </LoadList>
                <button className="addXBJ" onClick={()=> {
                    this.props.ajax({
                        loading: true,
                        url: '/toumingxiu/lossPartDeal/getLossPartNo.do',
                        data: {},
                        suc: (dat) => {
                            if (dat.taskId) {
                                this.props.history.pushState(dat, '/recovery/addCjqd')
                            }
                        }
                    })
                    }
                }></button>
                <DSYButton ButtonFrom="DSYs" T={this} on={'recovery'} {...this.props}/>

            </div>
        )
    }
}