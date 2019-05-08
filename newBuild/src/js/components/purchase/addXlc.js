import React from 'react'
export default class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            xlcList:[]
        };
        this.submit=()=>{
            console.log(!this.state.shutlib)
            console.log(this.state.bossName)
            console.log(this.state.libTel)
            console.log(this.state.addr)
            if(!this.state.shutlib){
                this.props.promptInfo({
                    content:"请输入修理厂简称",
                    Prompt:true,
                    onlyOK:true
                })
            }else if(!this.state.bossName){
                this.props.promptInfo({
                    content:"请输入收货人",
                    Prompt:true,
                    onlyOK:true
                })
            }else if(!this.state.libTel){
                this.props.promptInfo({
                    content:"请输入收货人电话",
                    Prompt:true,
                    onlyOK:true
                })
            }else if(!this.state.addr){
                this.props.promptInfo({
                    content:"请输入收货地址",
                    Prompt:true,
                    onlyOK:true
                })
            }else {
                this.props.ajax({
                    url: '/toumingxiu/tmxcOrgInfo/saveRegisterXlc.do',
                    data: {
                        registerXlcName: this.state.shutlib,
                        registerXlcTel: this.state.libTel,
                        userId: this.props.user.data.LxAqYhxxb.id,
                        businessContact: this.state.bossName,
                        addr: this.state.addr
                    },
                    suc: (dat) => {
                        console.log(dat)
                        if (dat.errorMsg) {
                            this.props.promptInfo({
                                content: dat.errorMsg,
                                Prompt: true,
                                onlyOK: true
                            })
                        } else {
                            var dat1 = dat.data
                            // var key1='businessContact'
                            // var key2='businessContactTel'
                            // var value1=this.state.bossName
                            // var value2=this.state.libTel
                            // dat1[key1]=value1
                            // dat1[key2]=value2
                            //     console.log(dat1)
                            this.setState({xlcList: dat1})
                            this.props.promptInfo({
                                content: '修理厂添加成功',
                                Prompt: true,
                                onlyOK: true,
                                fun: () => {
                                    // this.props.setProps({xlcInfo:dat1})
                                    this.props.setProps({
                                        addre: {
                                            xlcname: dat1,
                                            taskId: this.props.location.state.taskId,
                                            pay: this.state.pay || 'XLCDF',
                                            evalId: this.props.location.state.evalId || this.state.evalId,
                                            lis: this.props.location.state.lis
                                        }
                                    }, () => this.props.history.goBack())
                                    // this.props.setProps({
                                    //     xlcDataEs:{xlcname:dat1,taskId:this.props.location.state.taskId,evalId:this.props.location.state.evalId,
                                    //         lis:this.props.location.state.lis,id:this.props.location.state.id,pay:this.props.location.state.pay}
                                    // },()=>this.props.history.goBack())

                                    this.props.promptInfo()

                                    return;
                                    // this.props.history.replaceState({xlcname:dat1,taskId:this.props.location.state.taskId,evalId:this.props.location.state.evalId,
                                    //     lis:this.props.location.state.lis,id:this.props.location.state.id,pay:this.props.location.state.pay},'/purchase/partsBuy')

                                }
                            })
                        }
                    }
                })
            }
        }
        this.blur=()=>{
            window.scrollTo(0, 0);
            console.log('bulr')
        }
        this.change=(e)=>{
            console.log(e)
            this.state.Ajaxs && this.state.Ajaxs.abort();
            this.state.Ajaxs=this.props.ajax({
                url:'/lexiugo-app/weixin/insurance/getXlc',
                data:{val:e,searchType:'insSupply'},
                suc:(dat)=>{
                    console.log(dat)
                    let xlcList=[]
                    for(var i in dat.data.xlc){
                        dat.data.xlc[i] && xlcList.push({
                            key:dat.data.xlc[i].libShotName,
                            allData:dat.data.xlc[i],
                            fun:(data)=>{
                                // this.setState({...data.allData,xlcList:[]});
                                console.log(data.allData)

                                // this.props.addre={...this.props.addre,...data.allData}
                                console.log(this.props)
                                console.log('1111')
                                // this.props.setProps({addre:{xlcname:data.allData,taskId:this.props.location.state.taskId,
                                //     pay:this.props.location.state.pay||'XLCDF',evalId:this.props.location.state.evalId||this.state.evalId,
                                //     lis:this.props.location.state.lis}})
                                this.props.setProps({addre:{xlcname:data.allData,taskId:this.props.location.state.taskId,
                                    pay:this.props.location.state.pay||'XLCDF',evalId:this.props.location.state.evalId||this.state.evalId,
                                    lis:this.props.location.state.lis}},()=>this.props.history.goBack())
                                // this.props.setProps({
                                //     xlcDataEs:{xlcname:{...(data.allData||{})},taskId:this.props.location.state.taskId,
                                //         evalId:this.props.location.state.evalId,lis:this.props.location.state.lis,
                                //         id:this.props.location.state.id,pay:this.props.location.state.pay}
                                // },()=>this.props.history.goBack())

                                    return;
                                // this.props.location.state=this.props.location.state||{}
                                // this.props.history.replaceState(c,'/purchase/partsBuy')
                            }
                        })
                    }
                    let tishi= xlcList.length > 0 ? false : this.props.ErrorShow({type:'p',content:<span>没查到该修理厂</span>})
                    console.log(xlcList.length)
                    this.setState({xlcList:xlcList,tishiyu:tishi})
                }
            })

        }

    }
    componentDidMount(){
        this.props.changeTitle('选择修理厂');
    }
    componentWillMount(){}
    componentWillUnmount(){

    }
    render() {
        console.log(this.props)
        return (
            <div style={{background: '#fff', minHeight: '100vh'}}>
                <this.props.SelectInput {...this.props}
                                        change={this.change}
                                        blur={this.blur}
                                        focus={() => this.setState({
                                             selectData: this.state.selectData || [],
                                            tishiyu: this.props.ErrorShow({
                                                type: 'p',
                                                content: <span>请输入修理厂名称</span>
                                            })
                                        })}
                                        close={() => this.setState({selectData: false, xlcList: [], tishiyu: false})}
                                        search={this.search}
                                        Style={{
                                            input: {background: '#fafafa'},
                                            Box: {background: '#fff', padding: '0.15rem 0.2rem'}
                                        }}
                                        T={this}/>
                {
                    !this.state.xlcList [0] &&
                    !this.state.tishiyu &&
                    <this.props.BaseLi style={{borderTop: '1px solid #ccc'}} data={[
                        {
                            key: '修理厂简称:',
                            input: true,
                            val: this.state.shutlib,
                            change: (e) => {
                                this.setState({shutlib: e})
                            },
                            blur:()=> {
                                this.blur()
                            }
                        },
                        {
                            key: '收货人:',
                            input: true,
                            val: this.state.bossName,
                            change: (e) => {
                                this.setState({bossName: e})
                            },
                            blur:()=> {
                                this.blur()
                            }
                        },
                        {
                            key: '收货人电话:',
                            input: true,
                            val: this.state.libTel,
                            change: (e) => {
                                this.setState({libTel: e})
                            },
                            blur:()=> {
                                this.blur()
                            }
                        },
                        {
                            key: '收货地址:',
                            input: true,
                            val: this.state.addr,
                            change: (e) => {
                                this.setState({addr: e})
                            },
                            blur:()=> {
                                this.blur()
                            }
                        }
                    ]} {...this.props} T={this}/>
                }
                {
                    this.state.tishiyu || <this.props.BaseLi style={{borderTop: '1px solid #ccc'}}
                     data={this.state.xlcList || []} {...this.props} T={this}/>
                }
                <this.props.BaseSubmits style={{box: {padding: '0 0.3rem', marginBottom: '0.5rem'}}}
                                        submits={[{
                                            style: {
                                                borderRadius: '0.1rem',
                                                background: 'linear-gradient(to right,#30b5e7,#2989f3)'
                                            },
                                            value: '保存', fun: this.submit
                                        }]}
                                        value="保存" {...this.props} />

            </div>
        )
    }
}