import React from 'react';
import $ from 'jquery';
import {BaseLi} from '../../common/assembly/Stateless';
import someEvent from '../../common/baseFun/someEvent';
require('./css/style.css')
/**订单详情**/
export default class SelectionParts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lingList:[],
            partsList:{}
        };
        this.addOrJJ=(item,type,e)=>{
            let id=item.partTypeLvl3Id;
            var partsList=this.state.partsList;
            var partsListList=this.state.partsListList ||[],
                nums=this.state.nums || 0;
            switch(type){
                case 'add':
                    partsList[id]?partsList[id].num+=1:partsList[id]={num:1,index:partsListList.length,...(item||{})}
                    partsListList[partsList[id].index]=partsList[id];
                    nums++
                    break;
                case 'jj':
                    partsList[id].num>1?partsList[id].num-=1:(()=>{
                        delete  partsListList[partsList[id].index]
                        delete  partsList[id];

                    })();
                    nums--

                    break;
                default:
            }
            this.setState({partsList:partsList,nums:nums,partsListList:partsListList},()=>{
                console.log(this.state.partsListList)
            })
        }
        this.loadPartsList=(id,e)=>{
            $.ajax({
                url:'/lexiugo-app/app/partEnquiry/getEnquiryPart',
                type:'post',
                data:{partTypeLvl1Id:id||''},
                dataType:'json',
                success:(d)=>{
                    this.setState({datas:d.result[0],selectList:false})
                }
            })
        }
        this.closeDocument=(e)=>{
            let isChild=false;
            let node=e.target;
            while(node){
                if(node==this.refs.SelectBottom){
                    isChild=true;
                    break;
                }
                node=node.parentNode;
            }
            !isChild && $('.showChoseList').slideUp(400)
            setTimeout(()=>{
                this.setState({showYXZ:isChild})
            },400)
        }
        this.getQuery=(Type)=>{
            var reg = new RegExp("(^|&)" + (Type||'action') + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(!r){return false;}
            var actionViue=unescape(r[2]);
            return actionViue
        }

        this.search=(val,e)=>{
            if(!val){
                alert('请输入关键字')
                return;
            }
            $.ajax({
                url:'/lexiugo-app/app/partEnquiry/searchEnquiryPart',
                type:'post',
                data:{partName:val.replace(/(^\s*)|(\s*$)/g, "")},
                dataType:'json',
                success:(d)=>{
                    this.setState({selectList:d.result})
                }
            })
        }
        this.submit=()=>{
            ///toumingxiu/lossPartDeal/addLossPart.do
            $.ajax({
                url:'/toumingxiu/lossPartDeal/addLossPart.do',
                type:'post',
                data:{partInfo:JSON.stringify(this.state.partsListList),userId:this.getQuery('userId')},
                dataType:'json',
                success:(d)=>{
                    history.back(-1)
                }
            })
        }
    }
    componentDidMount(){
        //'/lexiugo-app/app/partEnquiry/addDefinedEnquiryPart'
        this.loadPartsList('')
    }

    render(){
        let datas=this.state.datas || []
        return(
            <div className="reactBoxForPc" onClick={this.closeDocument}>
                {/*<div className="reactTitle">*/}
                    {/*<h4>选择配件</h4>*/}
                   {/*/!* <div className="selectParts">*/}
                        {/*<span onClick={this.search.bind(this,this.state.selectInput || '')} className="iconfonts">&#xe634;</span>*/}
                        {/*<input onChange={(e)=>{this.setState({selectInput:e.target.value},()=>{this.search(this.state.selectInput)});}} type="text" value={this.state.selectInput} placeholder="搜索"/>*/}
                    {/*</div>*!/*/}
                {/*</div>*/}
                <div className="reactBody">
                    <div class="seleft">
                    <div className="selectParts">
                        <span onClick={this.search.bind(this,this.state.selectInput || '')} className="iconfonts">&#xe634;</span>
                        <input onChange={(e)=>{this.setState({selectInput:e.target.value},()=>{this.search(this.state.selectInput)});}} type="text" value={this.state.selectInput} placeholder="搜索"/>
                    </div>
                    <ul class="left">

                        {
                            datas.map((item,index)=>{
                                return(
                                    <li onClick={this.loadPartsList.bind(this,item.partTypeLvl1Id)} className={item.enquiryPartList? 'on':''} key={index}>
                                        <span>{item.partTypeLvl1Name}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    </div>
                    <div className="right">
                            {this.state.selectList ?
                                <ul className="itemStyle">
                                    {this.state.selectList.map((item3,index3)=>{
                                        return(
                                            <li>
                                                {item3.partTypeLvl3Name}
                                                <span className="iconfonts reactcaozuo cz" onClick={this.addOrJJ.bind(this,item3,'add')}>&#xe610;</span>
                                                {this.state.partsList[item3.partTypeLvl3Id] &&
                                                <span className="reactcaozuo">{this.state.partsList[item3.partTypeLvl3Id].num}</span>}
                                                {this.state.partsList[item3.partTypeLvl3Id] &&
                                                <span onClick={this.addOrJJ.bind(this,item3,'jj')} className="iconfonts reactcaozuo cz" style={{paddingTop:'3px'}}>&#xe643;</span>}
                                            </li>
                                        )
                                    })
                                    }</ul>
                                :datas.map((item,index)=>{
                                if(!item.enquiryPartList) return(false);
                                return(
                                    <ul key={index}>
                                        {item.enquiryPartList.map((item2,index2)=>{

                                            //if(!item2.enquiryPartList) return(false)
                                            return(
                                                <li>
                                                    <span className="listTitle2" onClick={()=>{$('.kins'+index2).slideToggle(400);}}  key={index2}>
                                                        {item2.partTypeLvl2Name}
                                                        {/*<span className={"iconfonts "+'icon'+index2+""}>&#xe605;</span>*/}
                                                        {/*&#xe610;&#xe643;*/}
                                                        {$('.shousuo').style={display:'none'}?<i className="iconfont icon-xiala"></i>:<i className="iconfont icon-shouqi"></i>}
                                                        {$('.shousuo').style={display:'none'}?<i className="iconfont icon-xiala"></i>:<i className="iconfont icon-shouqi"></i>}
                                                        {/*<i className="iconfont icon-shouqi"></i>*/}
                                                    </span>
                                                    {item2.enquiryPartList && <ul style={{display:'none'}} className={"itemStyle shousuo "+'kins'+index2+""}>
                                                        {item2.enquiryPartList.map((item3,index3)=>{
                                                            return(
                                                                <li>
                                                                    {item3.partTypeLvl3Name}
                                                                    <i className="iconfont icon-jiashu reactcaozuo cz" style={{marginLeft:'0px'}} onClick={this.addOrJJ.bind(this,item3,'add')}></i>
                                                                    {this.state.partsList[item3.partTypeLvl3Id] &&
                                                                    <span className="reactcaozuo">{this.state.partsList[item3.partTypeLvl3Id].num}</span>}
                                                                    {this.state.partsList[item3.partTypeLvl3Id] &&
                                                                    <i onClick={this.addOrJJ.bind(this,item3,'jj')} className="iconfont icon-jianshu reactcaozuo cz" style={{paddingTop:'3px'}}></i>}
                                                                 </li>
                                                            )
                                                        })
                                                        }</ul>}

                                                </li>

                                            )
                                        })}
                                    </ul>
                                )
                            })}


                    </div>
                </div>

                <div ref="SelectBottom" className="bottomSubmit">
                    <div className="submit">
                        <div className="showChoseList">
                            {this.state.partsListList && <ul className="itemStyle">
                                <li ><span>已选零件</span><i className="iconfont icon-error" onClick={()=>{$('.showChoseList').slideUp(400)}}></i></li>
                                {this.state.partsListList.map((item3,index3)=>{
                                    return(
                                        <li>
                                            {item3.partTypeLvl3Name}
                                            <i className="iconfont icon-jiashu reactcaozuo cz" style={{marginLeft:'0px'}} onClick={this.addOrJJ.bind(this,item3,'add')}></i>
                                            {this.state.partsList[item3.partTypeLvl3Id] &&
                                            <span className="reactcaozuo">{this.state.partsList[item3.partTypeLvl3Id].num}</span>}
                                            {this.state.partsList[item3.partTypeLvl3Id] &&
                                            <i onClick={this.addOrJJ.bind(this,item3,'jj')} className="iconfont icon-jianshu reactcaozuo cz" style={{paddingTop:'3px'}}></i>}
                                        </li>
                                    )
                                })
                                }</ul>
                            }
                        </div>
                        <span onClick={()=>{$('.showChoseList').slideToggle(400)}}><span style={{fontSize:'14px'}}>已选零件</span><span style={{color:'red',paddingLeft:'10px',marginBottom:'5px'}}>{this.state.nums  ||0}</span></span>
                        <span style={{padding:'0'}}>
                            <form  action="/toumingxiu/lossPartDeal/addLossPart.do">
                                <input type="hidden" name="partInfo" value={JSON.stringify(this.state.partsListList)}/>
                                <input type="hidden" name="userId" value={this.getQuery('userId')}/>
                                <input type="submit" value='确定' style={{fontSize:'14px',color:'#fff',color:'#fff',width:'128px',height:'50px',background:'none',border:'0px',outline:'none'}}/>
                            </form>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}