import React from 'react';
import $ from 'jquery';
import DatePicker from 'react-mobile-datepicker';
import {BaseLi,SubmitOk} from '../../../../../common/assembly/Stateless';
import someEvent from '../../../../../common/baseFun/someEvent'
import SelectParts from './SelectionParts'
require('../../../css/addinquiry.css')
/**订单详情**/
export default class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datailedList:{}
        };
        this.reduceOrPlus = (item, index, how) => {
            var newDatailed = this.state.datailedList
            console.log(newDatailed[item.id].num)
            switch (how) {
                case 'delete':
                    delete newDatailed[item.id]
                    break
                case 'change':
                    newDatailed[item.id].text = index;
                    break
                default:
                    newDatailed[item.id].num = (how == 'plus') ? item.num * 1 + 1 : item.num * 1 - 1 || 1;
            }
            console.log(how)
            localStorage.setItem("PJAdd", JSON.stringify(newDatailed));
            this.setState({datailedList: newDatailed})
        }
        this.selectParts=()=>{
            this.props.history.pushState({taskId:this.props.location.state.taskId}, 'inquiry/SelectionParts1')
            this.setState({component:true})
        }
        this.submit=()=>{
            var datailedList = this.state.datailedList || {}, partList = []
            for (var i in datailedList) {
                partList.push({
                    partNum: datailedList[i].num,
                    partStandard: datailedList[i].data.name,
                    partRemark: datailedList[i].text,
                    factPartCode: datailedList[i].data.id
                })
            }
            if (partList.length < 1) {
                this.props.promptInfo({
                    content: '请至少添加一个零件！', Prompt: true
                })
                return;
            }
            var requestDate = {
                "partList": partList,
                taskId:this.props.location.state.taskId
            }
            console.log(requestDate)
            !this.props.PromptData.content && !this.props.PromptData.loading&&
            this.props.promptInfo({
                content:'是否发起询价？',
                Prompt:true,
                fun:()=>{
                    this.props.ajax({
                        loading: true,
                        data: {requestData: JSON.stringify(requestDate)},
                        url: '/toumingxiu/insEnquiry/appAddPartsEnquiry.do',
                        suc: (dat) => {
                            if (dat.errorCode == '000000') {
                                this.props.setProps({
                                    inquiryData:false,
                                    PJAdd:false,
                                    addinquiry:false
                                });
                                this.props.promptInfo({
                                    content: dat.errorMsg, Prompt: true, onlyOK: true, fun: () => {
                                        // if(this.props.newaddflag&&this.props.newaddflag=='1'){
                                        //     this.props.history.pushState({taskId:this.props.location.state.taskId}, '/inquiry/info');
                                        // }else{
                                        //     this.props.history.pushState({taskId:this.props.location.state.taskId}, '/purchase/info');
                                        // }
                                        window.history.go(-1)
                                        this.props.promptInfo()
                                    }
                                })
                            } else {
                                this.props.promptInfo({content: dat.errorMsg, Prompt: true, onlyOK: true})
                            }
                        }
                    })
                }
            })
        }
    }
    componentWillMount(){
        console.log(this.props.PJAdd)
        this.state={...(this.state||{}),...(this.props.location.state||{})}
        console.log(this.state.infoflag)
        if(localStorage.getItem('PJAdd')){
            var json=JSON.parse(localStorage.getItem('PJAdd'))
            this.setState({datailedList:json||{}})
        }else{
            if(this.props.infoflag&&this.props.infoflag=='1'){
                this.props.setProps({
                    infoflag:false
                })
                this.props.history.pushState({taskId:this.props.location.state.taskId}, 'inquiry/SelectionParts1')
            }
        }
        /* if(this.props.PJAdd){
            this.state={...(thi  s.state||{}),...(this.props.location.state||{})}
            this.setState({datailedList:this.props.PJAdd||{}})
        }*/
    }
    componentDidMount(){
        this.props.changeTitle('询价');
    }
    componentWillUnmount(){
        this.props.promptInfo()
    }
    render(){
        console.log(this.state)
        console.log(this.props)
        return(
               <div className="datelj">
                   <this.props.InfoTitle T={this} data={{key:'零件清单',butR:(<span className="butR" onClick={this.selectParts}><span>+</span>添加</span>)}}/>
                   <this.props.StateLess.DetailedList {...this.props} detailedList={this.state.datailedList} T={this}/>
                   <this.props.BaseSubmits submits={[{
                                               style: {
                                                   background: '#5a8cf2',fontSize:'16px'
                                               },
                                               value: '发起询价', fun: this.submit
                                           }]} {...this.props} />
                   {/*<this.props.BaseSubmit submit={this.submit} {...this.props}/>*/}
               </div>
            )
    }
}