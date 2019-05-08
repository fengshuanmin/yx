import React from 'react';
import $ from "jquery";
import ChangeTitle from '../../../../../common/baseFun/someEvent'
require('../../../css/IntegralRecord.css')
require('../../../css/home.css')
export default class IntegralRecord extends React.Component {
    constructor(props) {
        super(props);
        console.log()
        this.state = {
            perticDraw:true,
            comticDraw:false,
            taxType:3,
            // NameList:[{tit:'个人',tcktit:'发票抬头',name:'张小明'},{tit:'企业',tcktit:'发票抬头',name:'张小明'}]
            name:'张小明',
            companyname:'上海浦东盛夏路修理厂',
            personnumber:'133457843475412'
        };
        this.state.userId=this.props.project.user.data.LxAqYhxxb.id
        this.person=()=>{
            this.setState({
                comticDraw:false,
                perticDraw:true,
                taxType:3
            })
        }
        this.company=()=>{
            this.setState({
                comticDraw:true,
                perticDraw:false,
                taxType:4
            })
        }
        this.blur=()=>{
            window.scrollTo(0, 0);
            console.log('bulr')
        }
        this.submit=()=>{
            console.log(this.state.comticDraw==true)
            console.log(this.state.id)
            if(this.state.taxType=='3'){
                if(!this.state.title){
                    this.props.promptInfo({
                        content:'请填写企业名称',
                        Prompt:true,
                        onlyOK:true
                    })
                }else{
                    this.props.ajax({
                        url:'/server/lexiu1-app/api/tmxcorder/addTax?token='+this.props.user.data.token,
                        data:{
                            id:this.state.id,
                            customerId:this.props.user.data.LxAqYhxxb.id,
                            title:this.state.title,
                            taxNumber:'',
                            taxType:3,
                            isDefault:'true'
                        },
                        suc:(dat)=>{
                            console.log(dat)
                            if(dat.code=='0'){
                                this.props.promptInfo({
                                    content:'修改成功',
                                    Prompt:true,
                                    onlyOK:true,
                                    fun:()=>{
                                        this.props.promptInfo();
                                        this.props.history.goBack();
                                    }
                                })
                            }
                        }
                    })
                }
            }else{
                if(!this.state.title){
                    this.props.promptInfo({
                        content:'请填写企业名称',
                        Prompt:true,
                        onlyOK:true
                    })
                }else if(!this.state.taxNumber){
                    this.props.promptInfo({
                        content:'请填写纳税人识别码',
                        Prompt:true,
                        onlyOK:true
                    })
                }else{
                    this.props.ajax({
                        url:'/server/lexiu1-app/api/tmxcorder/addTax?token='+this.props.user.data.token,
                        data:{
                            id:this.state.id,
                            customerId:this.props.user.data.LxAqYhxxb.id,
                            title:this.state.title,
                            taxNumber:this.state.taxNumber,
                            taxType:4,
                            isDefault:'true'
                        },
                        suc:(dat)=>{
                            console.log(dat)
                            if(dat.code=='0'){
                                this.props.promptInfo({
                                    content:'修改成功',
                                    Prompt:true,
                                    onlyOK:true,
                                    fun:()=>{
                                        this.props.promptInfo();
                                        this.props.history.goBack();
                                    }
                                })
                            }
                        }
                    })
                }
            }
        }
    }

    componentDidMount() {
        ChangeTitle.ChangeTitle('发票管理');
    }

    componentWillMount(){
        this.state=this.props.location.state.tcklist
    }

    render() {
        console.log(this.props.location.state)
        console.log(this.state)
        return (
            <div className="DSYHome">
                <ul className="SetUpLi ucss" style={{marginTop:'0rem',marginLeft:'0rem'}}>
                    <p style={{paddingLeft:'4%'}}>发票抬头</p>
                    <p style={{padding:'0.4rem 0 0.4rem 4%'}}>
                        <span className={this.state.taxType==3?'tictit tictitborder':'tictit tictitbord'} onClick={this.person}>个人</span>
                        <span style={{marginLeft:'0.2rem'}} className={this.state.taxType==4?'tictit tictitborder':'tictit tictitbord'} onClick={this.company}>企业</span>
                    </p>
                    <div className={this.state.taxType==3?'tictckblock':'tictcknone'}>
                        <this.props.BaseLi style={{color:'#1C1C1C',fontWeight:'600',fontSize:'0.28rem'}} data={[
                            {
                                key: '名称:',
                                input: true,
                                val: this.state.title,
                                change: (e) => {
                                    this.setState({title: e})
                                },
                                blur:()=>{
                                    this.blur()
                                }
                            }
                        ]} {...this.props} T={this}/>
                        {/*<p className="divb">公司名称：<input type="text" style={{border:'none',outline: 'none'}}/></p>*/}
                    </div>
                    <div className={this.state.taxType==4?'tictckblock':'tictcknone'}>
                        <this.props.BaseLi style={{color:'#1C1C1C',fontWeight:'600',fontSize:'0.28rem'}} data={[
                            {
                                key: '企业名称:',
                                input: true,
                                val: this.state.title,
                                change: (e) => {
                                    this.setState({title: e})
                                },
                                blur:()=>{
                                    this.blur()
                                }
                            }]} {...this.props} T={this}/>
                        <this.props.BaseLi style={{color:'#1C1C1C',fontWeight:'600',fontSize:'0.28rem'}} data={[
                            {
                                key: '纳税人识别号:',
                                input: true,
                                val: this.state.taxNumber,
                                change: (e) => {
                                    this.setState({taxNumber: e})
                                },
                                blur:()=>{
                                    this.blur()
                                }
                            }
                        ]} {...this.props} T={this}/>
                    </div>
                </ul>
                <div style={{width:'100vw',height:'1rem',marginTop:'0.5rem'}}>
                    <button onClick={this.submit} style={{border:'0px',width:'92%',height:'1rem',marginLeft:'4%',background:'#3A97F7',color:'#fff',borderRadius:'0.1rem',fontSize:'0.32rem'}}>保存</button>
                </div>
            </div>
        )
    }
}