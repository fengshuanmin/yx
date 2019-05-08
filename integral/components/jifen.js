import React from 'react'
import {Scoreboard ,DSJSList} from '../../common/assembly/someAssembly'
import $ from "jquery";
require('../public/css/base.css');

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            NewData:[]
        };
        /*this.howShow=(dat)=>{
            if(dat>80){

                return 'UpShow';
            }
        }
*/
        this.toChangeList=(i,e)=>{
            var lastC = e.currentTarget.offsetParent.lastElementChild
            lastC.style.left=(e.currentTarget.offsetLeft+(e.currentTarget.offsetWidth-lastC.offsetWidth)/2)+'px';
            this.props.setScroll(0)
            this.setState({num:i});
            var url=['/lexiugo-app/weixin/getInsCompanyRank','/lexiugo-app/weixin/getPersonRank','/lexiugo-app/weixin/getImpairMoneyRank']
            $.post(url[i],{pageSize:"1500",pageNo:'1'},(data)=>{
                var datas=data.data.insCompanyRankList || data.data.impairRankList || data.data.personRankList;
                var newList=[]
                console.log(datas)
                for(var i in datas){
                    var m=0;
                    for(var j in datas){
                        datas[j].totalIntegral > m ? m=datas[j].totalIntegral : '';
                    }
                }
                this.setState({
                    NewData:datas
                })
            })
            /*if(i>0){
                if(i==1 && this.props.location.myJF){
                    this.setState({myJF:this.props.location.myJF})
                }
                var id=this.props.project.user.data.LxAqYhxxb.id
                $.post('/lexiugo-app/weixin/getCurrUserRank',{userId:id,countType:i},(data)=>{
                    console.log(data)
                    if(data.code=='0000'){
                        this.setState({myJF:data.data.currUserRank})
                    }
                })
            }*/
        }

    }

    componentDidMount(){
        setTimeout(()=>{
            document.getElementById('jbs').click();
        },300)

    }
    render() {
        return (
            <div className="integralMaxBox">
                <div className="inteHeaderBox">
                    <div className="inteHeader">
                        <span id="jbs" onClick={this.toChangeList.bind(this,0)}>保险公司</span>
                        <span onClick={this.toChangeList.bind(this,1)}>查勘员</span>
                        <span onClick={this.toChangeList.bind(this,2)}>减损贡献</span>
                        <i></i>
                    </div>
                </div>
                <div className="nodeList">
                    {this.state.num == 0 &&<Scoreboard data={this.state.NewData}  T={this} fun={this.howShow}/>}
                    {this.state.num == 1 && <DSJSList data={this.state.NewData}  T={this} type="DS" fun={this.howShow} myJF={this.state.myJF}/>}
                    {this.state.num == 2 && <DSJSList data={this.state.NewData}  T={this} fun={this.howShow} myJF={this.state.myJF}/>}
                    {/*{<div className="checkMore" style={{padding:'0.1rem 2.5rem'}} onClick={this.loadMore}><span>查看更多积分记录</span></div>}*/}
                </div>
                {/*{<div className="checkMore" style={{padding:'0.1rem 2.5rem'}} onClick={this.loadMore}><span>没有更多数据了</span></div>}*/}
            </div>
        )
    }
}