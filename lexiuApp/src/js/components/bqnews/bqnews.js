import React from 'react'
import $ from 'jquery'
import {BaseLi,SubmitOk} from '../../../../../common/assembly/Stateless'

export default class Bqnews extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            companynews: [
                {
                    key: '修理厂名字',
                    input: true,
                    val: ''
                },
                {
                    key: '所在地区',
                    input: true,
                    val: ''
                },
                {
                    key: '详细地址',
                    input: true,
                    val: ''
                },
                {
                    key: '维修资质',
                    input: true,
                    val: ''
                },
                {
                    key: '企业信用代码',
                    input: true,
                    val: ''
                },
                {
                    key: '企业营业执照全称',
                    input: true,
                    val: ''
                },
                {
                    key: '联系电话',
                    input: true,
                    val: ''
                },
                {
                    key: '发票信息',
                    Style:{ico2:'&#xe607;'},
                    fun:()=>this.props.history.pushState(null,'/fpnews')
                },
                {
                    key: '收货地址',
                    input: true,
                    val: ''
                },


            ]
        }
        this.loadAll=()=>{
            this.setState({
                carInfo: [
                    {
                        key: '修理厂名字:',
                        input: true,
                        val:'',
                        change: (value) => {

                        }
                    },
                    {
                        key: '所在地区:',
                        input: true,
                        val:'',
                        change: (value) => {

                        }
                    },
                    {
                        key: '详细地址:',
                        input: true,
                        val:'',
                        change: (value) => {

                        }
                    },
                    {
                        key: '维修资质:',
                        input: true,
                        val:'',
                        change: (value) => {

                        }
                    },
                    {
                        key: '企业信用代码:',
                        input: true,
                        val:'',
                        change: (value) => {

                        }
                    },
                    {
                        key: '企业营业执照全称:',
                        input: true,
                        val: '',
                        change: (value) => {

                        }
                    },
                    {
                        key: '联系电话:',
                        input: true,
                        val:'',
                        change: (value) => {

                        }
                    },
                    {
                        key: '发票信息:',
                        input: true,
                        val: '',
                        change: (value) => {

                        }
                    },
                    {
                        key: '收货地址:',
                        input: true,
                        val:'',
                        change: (value) => {

                        }
                    }
                ]
            })
        }
    }
    componentDidMount(){
        this.props.changeTitle('补全信息');
    }
    componentWilMount(){

    }
    render(){

        return(
            <div style={{background:'#4080E1',padding:'0.15rem',marginTop:'0.06rem'}}>
                <div style={{margin:'0.15rem',background:'#fff'}}>
                    <this.props.InfoTitle style={{background:'#F0F0F0',fontSize:'0.32rem'}} T={this} data={{key:'公司信息',Lcolor:'#5998ff'}} />
                    <BaseLi {...this.props} style={{color:'#B0B0B0',fontSize:'0.32rem'}} data={this.state.companynews} T={this}/>
                    {/*<this.props.BaseLi {...this.props} data={[
                        {
                            key:'修理厂名称',
                                value:''
                            },
                            {
                                key:'询价分公司',
                                value:''
                            },
                            {
                                key:'所在地区',
                                value:''
                            },
                            {
                                key:'详细地址',
                                value:''
                            },
                            {
                                key:'维修资质',
                                value:''
                            },
                            {
                                key:'企业信用代码',
                                value:''
                            },
                        ]}T={this}/>*/}
                </div>
            </div>
        )
    }
}