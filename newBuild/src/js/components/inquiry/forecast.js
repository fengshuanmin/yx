import React from 'react'
import $ from 'jquery'
import {BaseLi} from '../../../../../common/assembly/Stateless'
export default class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {xlcList:[]}
        this.glfFun=(item,index)=>{
            this.state.ListArr[index].data2[0].vChang=true;
            this.setState({ListArr:this.state.ListArr})
        }
        this.change=(index,e)=>{
            var data=this.state.ListArr[index].data;
            // console.log(data)
            // console.log(index)
            // console.log(e)
            data.ManageFeePct=parseInt((e.target.value || 0)>=100?99:(e.target.value||0))/100;
            data.ManageFee=data.ManageFeePct*data.JmPrice
            this.state.ListArr[index].data2[1].value='￥'+(data.ManageFee*data.PartNum).toFixed(2)
            this.state.ListArr[index].data2[2].value='￥'+(data.ManageFee*data.PartNum*1+data.PartNum*(data.JmPrice*1)).toFixed(2)
            // console.log(this.state.ListArr[index].data2[1].value)
            this.setState({ListArr:this.state.ListArr},()=>{
                // console.log(this.state.ListArr)
                this.updataPM()
            })
        }
        this.updataPM=(fun)=>{
            var itid,partManage,partFct,evalTotalSum=0;
            var dataarr={itid:'',partManage:'',partFct:'',evalTotalSum:0,taskId:this.props.location.state.taskId};
            var listPartsss=this.state.ListArr || []
            for(var i in listPartsss){
                if(listPartsss[i].data) {
                    let listParts = [];
                    listParts[i] = listPartsss[i] ? listPartsss[i].data : {};
                     console.log(listPartsss[i] )
                     // console.log(listPartsss.length)
                     // console.log(listParts.length)
                    dataarr.itid += 'itid=' + listParts[i].PartId + (i < listPartsss.length - 1 ? ',' : '')
                    dataarr.partManage += 'partManage=' + (listParts[i].ManageFeePct * (listParts[i].LossPrice || listParts[i].JmPrice) * listParts[i].PartNum || '0') + (i < listPartsss.length - 1 ? ',' : '')
                    dataarr.partFct += 'partFct=' + (listParts[i].ManageFeePct * 100 || 0) + (i < listPartsss.length - 1 ? ',' : '')
                    dataarr.evalTotalSum += (parseFloat(listParts[i].ManageFeePct || 0) + 1) *
                        (listParts[i].JmPrice || listParts[i].LossPrice) * listParts[i].PartNum
                }
            }
            console.log(dataarr)
            //dataarr.evalTotalSum=this.props.detThis.state.zongJia
            $.ajax({
                url:'/toumingxiu/evaluation/updatePartManage.do',
                data: dataarr,
                dataType: "JSON",
                type: "post",
                success: (msg)=>{
                   // console.log(msg)
                }
            })
        }
        this.lookGSD=()=>{
            console.log(this.state.partId)
            if(this.state.partId==''){
                this.props.promptInfo({
                    content: '请至少选择一个零件', Prompt: true
                })
            }else{
                this.props.ajax({
                    loading: true,
                    url:'/toumingxiu/quote/appInsSupplyInfoDownloadPic.do',
                    data:{taskId:this.props.location.state.taskId,partIds:this.state.partId},
                    dataType:'text',
                    suc:(dat)=>{
                        // console.log(dat,'图片图片')
                        typeof dat == 'string' && (dat=dat.replace('www.toumingxiuche.cn',window.location.host));
                        // console.log(dat)
                        wx.previewImage({
                            current:dat+'?mat='+(Math.random()*10000),
                            urls:[dat+'?mat='+(Math.random()*10000)]
                        });
                    }
                })
            }
        },
        this.checkChange=(val,index,e)=>{
            var ListArr=[]
            for(var m in this.state.ListArr){
                if(this.state.ListArr[m].data1[2]!='-'){
                    ListArr.push(this.state.ListArr[m])
                }
            }
            console.log(ListArr)
                // var ListArr=this.state.ListArr;
             console.log(this.state,ListArr)
             if(index==0){
                 for(var i in ListArr){
                     ListArr[i].checked=val;
                 }
             }else{
                 ListArr[index].checked=val;
                 val==false && (ListArr[0].checked=val);
             }
            var lis=[]
            for(var j in ListArr){
                if(ListArr[j].checked==true) {
                    lis.push(ListArr[j])
                }
            }
            console.log(ListArr.length)
            console.log(lis.length)
            console.log(lis.length==ListArr.length-1)
            if(lis.length==ListArr.length-1){
                // console.log("1111")
                ListArr[0].checked=true
            }
            if(lis.length==ListArr.length){
                lis.splice(0,1)
            }
            // console.log(lis)
            var partId1=[];
            for(var m in lis){
                partId1.push(lis[m].PartId)
            }
            var partId=partId1.join()
            console.log(partId)
            this.setState({partId:partId})
        }
    }
    componentDidMount() {
        this.props.changeTitle('管理费预测');
    }
    componentWillMount(){
        this.setState({...(this.props.location.state ||{})})
        // this.checkChange(true,'0','')
    }
    componentDidMount(){
        var datalist=this.state.ListArr,arr=[]
        for(var k in this.state.ListArr){
            if(this.state.ListArr[k].data1[2]!='-'){
                arr.push(this.state.ListArr[k])
            }
        }
        this.setState({
            ListArr:arr
        })
        console.log(arr)
        console.log(this.state.ListArr)
        this.checkChange(true,'0','')
    }
    render(){
        let money=[0,0,0];
        console.log(this.state.ListArr)
        for(var i in this.state.ListArr){
            // console.log((this.state.ListArr[i].data.PartNum*this.state.ListArr[i].data.JmPrice).toFixed(2))
            this.state.ListArr[i] && i>0 && (money[0]+=this.state.ListArr[i].data.PartNum*this.state.ListArr[i].data.JmPrice)
            this.state.ListArr[i] && i>0 &&(money[1]+=this.state.ListArr[i].data.ManageFeePct*this.state.ListArr[i].data.sunMoney)
            // this.state.ListArr[i] && i>0 && (money[0]+=this.state.ListArr[i].data.sunMoney)
            // this.state.ListArr[i] && i>0 &&(money[1]+=this.state.ListArr[i].data.ManageFee)
        }
        console.log(money)
        return(
            <div>
                <div style={{marginTop:'0.1rem',textAlign:'center'}}>
                    <this.props.StateLess.EvalInfo change={this.change} checkBoxChange={this.checkChange} glfFun={this.glfFun} style={{background:'#fff'}} ListArr={this.state.ListArr || []} {...this.props} T={this}/>
                </div>
                <div style={{marginTop:'0.3rem'}}>
                    <this.props.BaseLi data={[
                        {key:'零件金额合计（元）',value:'￥'+(money[0]).toFixed(2)},
                        {key:'管理费金额合计（元）',value:'￥'+(money[1]).toFixed(2)},
                        {key:'金额合计（元）',value:'￥'+(money[0]+money[1]).toFixed(2)}
                    ]} {...this.props} T={this} />
                </div>
                <this.props.BaseSubmits submits={[
                    {value:'查看估损清单',fun:this.lookGSD,
                        style:{background:'#3A97F7',color:'#fff',fontSize:'16px'}/*发布发起采购后释放样式{background:'#fff',color:'#000'}*/},
                ]} {...this.props}/>
            </div>
        )
    }
}