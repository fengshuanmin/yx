import React from 'react'
import $ from 'jquery'
import {XLCFooter,DSYButton,} from '../../../../common/assembly/someAssembly'
import {LoadList} from '../../../../common/assembly/Logical'
import {CarLists} from '../common/Stateless'
export default class CarList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {datList:[],GetXLCdata:{}};
        this.loadList=(m,mt)=>{
            $.post("/lexiugo-app/weixin/AfterMarketLoginServlet",this.props.project.GetXLCdata,(dat)=>{
                if(dat.data.ResponseCode){
                    var data=this.state.datList || {}
                    if(m=='add'){
                        data= data.concat( dat.data.TaskList);
                    }else{
                        this.props.project.setScroll(0)
                        data=dat.data.TaskList;
                    }
                    this.setState({datList:data,GetXLCdata:this.props.project.GetXLCdata},()=>{
                        mt && mt(dat.data.TaskList.length || 0)
                    })
                }
                this.setState({lodings:false})
            })
        }
        this.loadButton=(m,e)=>{
            var lastC=this.refs.heng
            var leftNum =(e.currentTarget.offsetLeft+(e.currentTarget.offsetWidth-lastC.offsetWidth)/2)+'px';
            lastC.style.left=leftNum
            this.props.project.setProps({
                GetXLCdata:{
                    state:m,//1接车，2查勘，3，维修
                    sendType: "0000",
                    pageSize: "10",
                    pageNo: 1,
                    flag:"0",
                },
                leftNum:leftNum
            })
        }

        this.Reload=(ab)=>{
            var datas=this.props.project.GetXLCdata;
            datas.pageNo=1;
            this.props.project.setProps({GetXLCdata:datas},()=>{
                this.loadList(false,ab);
            })
        }
        this.loadMore=(ab)=>{
            if(this.state.lodings){
                return;
            }else{
                this.setState({
                    lodings:true
                })
            }
            var datas=this.props.project.GetXLCdata;
            datas.pageNo+=1;
            this.props.project.setProps({GetXLCdata:datas},()=>{
                this.loadList('add',ab);
            })
        }
    }
    componentDidMount(){
        this.props.project.changeTitle('修车列表')
        if(this.props.project.leftNum){
            var lastC=this.refs.heng;
            lastC.style.left=this.props.project.leftNum
        }
        if(!this.props.project.GetXLCdata){
            this.props.project.setProps({
                GetXLCdata:{
                    state: 1,//1接车，2查勘，3，维修
                    sendType: "0000",
                    pageSize: "10",
                    pageNo: 1,
                    flag:"0",
                }
            },()=>{
                setTimeout(()=>{
                    this.loadList()
                    document.getElementById('jbs').click();
                },300)
            });
        }else{
            this.loadList()
        }
    }
    componentDidUpdate(){
        var j=false
        for(var i in this.state.GetXLCdata){
            if(this.state.GetXLCdata[i] != this.props.project.GetXLCdata[i]){
                j=true;
                this.setState({GetXLCdata:this.props.project.GetXLCdata})
            }
        }
        j && this.loadList(this.props.project.GetXLCdata.pageNo >1 ? 'add':false)
    }
    render() {
        return(
            <div>
                <div className="carListHeader">
                    <div className="carListBox">
                        <span id="jbs"  onClick={(e)=>this.loadButton(1,e)}>接车</span>
                        <span onClick={(e)=>this.loadButton(2,e)}>勘察</span>
                        <span onClick={(e)=>this.loadButton(3,e)}>维修</span>
                        {/*<span onClick={(e)=>this.loadButton(4,e)}>完成</span>*/}
                        <span className="heng" ref="heng"></span>
                    </div>
                </div>
                <LoadList {...this.props} Reload={this.Reload} loadMore={this.loadMore} T={this}>
                    {
                        this.state.datList.map((item,index)=>{
                            return(
                                <CarLists key={index} {...item} toDetail={()=>{this.props.history.pushState(item, "/details")}}/>
                            )
                        })
                        /*this.state.datList?this.state.datList.map((item,index)=>{
                            return(
                                <CarLists key={index} {...item} toDetail={()=>{this.props.history.pushState(item, "/details")}}/>
                            )
                        }):this.props.ErrorShow({type:'zanwu',content:'未查询到待接车信息'})*/
                    }

                </LoadList>
                <DSYButton  ButtonFrom="XLC" T={this} on={3}/>
            </div>
        )
    }
}