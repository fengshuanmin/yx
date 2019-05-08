import React from 'react';
import $ from 'jquery';
import {BaseLi} from '../../../../../common/assembly/Stateless'
/**订单详情**/
export default class OrderInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showData:{}};
    }
    componentDidMount() {
        this.props.changeTitle('订单详情');
    }
    componentWillMount(){
        var orderId=this.props.location.state.orderId ||this.props.location.state.datas.orderId
        console.log(this.props.location.state.orderId);
        this.props.promptInfo({loading:true})
        try {
            $.ajax({
                url: '/toumingxiu/lossPartDeal/showAppDealDetail.do',
                data: {orderId: orderId},
                dataType: "json",
                type:'post',
                success: (msg)=>{
                    console.log(msg)
                    this.props.promptInfo({loading: false});
                    this.setState({loading: true})
                    var data = msg;
                    var jtbc = []
                    for (var i in data.details) {
                        var abs={
                            '未处理':{color:"#ff9da0"},
                            '未回收':{color:"#fb676b"},
                            '已回收':{color:"#3fcf9e"}
                        }
                        data.details[i] && jtbc.push(
                            {
                                key: data.details[i].partName,
                                value: data.details[i].partStatus,
                                Style: {K: {fontWeight: 'bold'}, onece: {height: '0.7rem'}, V: abs[data.details[i].partStatus]},
                                childes: [{
                                    key: (
                                        <div className="cjChild">
                                            {data.details[i].fragPaste=='是' && <span>易碎件</span>}
                                            {data.details[i].isBig=='是' && <span>大件</span>}
                                            {data.details[i].isValue=='是' && <span>价值件</span>}
                                        </div>
                                    ),
                                    value: '定损员照片 ' + data.details[i].insPic.length + '张',
                                    Style: {li: {padding: '0px',}, ico2: '&#xe607;', V: {color: '#000000'}},
                                    //path:'/recovery/photoUpdata',
                                    newData: {imgList: data.details[i].insPic, ...data.details[i], type: 'read-only'},
                                    Vfun: (items) => {
                                        items.newData.imgList.length > 0 ?
                                            this.props.history.pushState(items, '/recovery/photoUpdata') :
                                            this.props.setProps({PromptData: {content: '没有照片可以查看！', Prompt: true,}})
                                    }
                                }]
                            }
                        )
                    }
                    !jtbc[0] && jtbc.push({key: '暂无残件信息'})
                    this.setState({showData: msg, partDetail: data.details, partList: jtbc})
                },
                complete : (XMLHttpRequest,status)=>{ //请求完成后最终执行参数
                    this.props.promptInfo({loading: false});
                    if(status=='timeout'){//超时,status还有success,error等值的情况
                        ajaxTimeoutTest.abort();
                        this.setState({dataErr:'请求超时，您可能处于网络不稳定状态！'})
                    }
                },
                error:(xhr, status, err)=>{
                    this.props.promptInfo({loading: false});
                    this.setState({dataErr:'网络异常，请检查网络！'})
                }
            })
        }catch (e){
            this.setState({dataErr:'未知异常！'})
        }
    }
    componentWillUnmount(){
        this.props.promptInfo()
    }
    render(){
        return(
            <div>
                {
                    this.state.loading ?
                    <div>
                        <h4 style={{padding: '0.2rem 4%',
                            fontSize: '0.3rem',
                            fontWeight:'600'}}>基本信息</h4>
                        <BaseLi {...this.props} data={[
                            {
                                key:'下单时间',
                                value:this.props.timeString(this.state.showData.createTime,'y-m-d h:m:s')
                            },
                            {
                                key:'修理厂',
                                value:this.state.showData.rfName
                            },{
                                key:'车牌号',
                                value:this.state.showData.plateNo
                            },{
                                key:'车型',
                                value:this.state.showData.carType,
                                Style:{V:{textAlign:'right'}}
                            },{
                                key:'预约收件日期',
                                value:this.props.timeString(this.state.showData.apptDate,'y-m-d')
                            },{
                                key:'紧急程度',
                                value:this.state.showData.isUrgent//正常和紧急
                            },{
                                key:'联系人',
                                value:this.state.showData.contactPerson
                            },{
                                key:'联系电话',
                                value:this.state.showData.contactPhone
                            },{
                                key:'备注',
                                value:this.state.showData.remark || ''
                            },
                        ]} T={this}/>

                        <h4 style={{padding: '0.2rem 4%',
                            fontSize: '0.3rem',
                            fontWeight:'600'}}>外勤照片</h4>
                        <div>
                            {
                                this.state.showData.recvPic && this.state.showData.recvPic[0] ?
                                    <this.props.StateLess.ImgListShow imgList={this.state.showData.recvPic} {...this.props} T={this}/>
                                    :<BaseLi {...this.props} data={[{key:'暂无外勤照片'}]}/>
                            }
                        </div>

                        <h4 style={{padding: '0.2rem 4%',
                            fontSize: '0.3rem',
                            fontWeight:'600'}}>残件信息</h4>
                        <div>
                            <div>
                                {this.state.partList && <BaseLi {...this.props} data={this.state.partList}/> }
                            </div>
                        </div>


                    </div>
                        :
                        <p style={{textAlign:'center',lineHeight:'50px'}}>{this.state.dataErr}</p>
                }
            </div>
        )
    }
}