import React from 'react';
import $ from 'jquery';
import {BaseLi} from '../../../../../common/assembly/Stateless'
require('../../../css/addinquiry.css')
/**订单详情**/
export default class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showData:{},loading:true,task:{},list:[],caigouList:[],id:'',zhuangtaiList:[]};
        this.zdBJ=()=>{
            this.props.ajax({
                loading:true,
                url:'/toumingxiu/insEnquiry/autoAppEnquiry.do',
                data:{taskId:this.props.location.state.taskId},
                suc:(dat)=>{
                    if(dat.success){
                        this.props.promptInfo({
                            content:dat.errorMsg,
                            Prompt:true,
                            onlyOK:true,
                            fun:()=>{
                                window.history.go(-1)
                                this.props.promptInfo()
                            }
                        })
                    }else{
                        this.props.promptInfo({
                            content:dat.errorMsg,
                            Prompt:true,
                            onlyOK:true
                        })
                    }
                }
            })
        }
        this.check=()=>{
            var Eva=[]
            for(var a in this.state.EVALINFO){
                if(this.state.EVALINFO[a].PartType!=''){
                    Eva.push(this.state.EVALINFO[a])
                }
            }
            console.log(Eva)
            for(var s in Eva){
                if(Eva[s].PartType){
                    console.log('1a2b')
                    console.log(this.state.ListArr)
                    this.props.history.pushState({ListArr:this.state.ListArr||[],
                        taskId:this.props.location.state.taskId},'/inquiry/forecast')
                }else{
                    console.log(this.state.List)
                    if(this.state.List){
                        this.props.promptInfo({
                            content:'请先选择报价',
                            Prompt:true,
                            onlyOK:true
                        })
                    }else{
                        this.props.promptInfo({
                            content:'暂无零件，无法查看',
                            Prompt:true,
                            onlyOK:true
                        })
                    }
                }
            }
        }
        this.bjxx=()=>{
            if(this.props.EQPs){
                this.props.setProps({
                    EQPs:false,
                    BJXX:false,
                    BJXXshowD:false
                })
            }
            console.log(this.state)
            this.props.history.pushState({...this.props.location.state,zhuangtai:this.state.zhuangtai},'/inquiry/baojia')
        }
        this.cd=()=>{
            var times=1200000;
            var newDate=new Date().getTime();
            this.props.ajax({
                loading:true,
                url:'/toumingxiu/insEnquiry/saveReminderInfo.do',
                data:{taskId:this.props.location.state.taskId},
                suc:(dat)=>{
                    if((newDate-this.state.task.enquiryDate)>times){
                        if(dat.success==true){
                            this.props.promptInfo({
                                content:dat.errorMsg,
                                Prompt:true,
                                onlyOK:true
                            })
                        }else{
                            this.props.promptInfo({
                                content:dat.errorMsg,
                                Prompt:true,
                                onlyOK:true
                            })
                        }
                    }else{
                        this.props.promptInfo({
                            content:'您刚发起询价，请耐心等待报价，如20分钟内还未报价可发起催单。',
                            Prompt:true,
                            onlyOK:true
                        })
                    }
                }
            })
        }
        this.tjlj=()=>{
            localStorage.setItem("PJAdd", '')
            this.props.setProps({
                inquiryData:false,
                PJAdd:false,
                addinquiry:false,
                newaddflag:'1',
                infoflag:'1'
            })
            // this.props.history.pushState({taskId:this.props.location.state.taskId,infoflag:'1'}, '/inquiry/SelectionParts')
            this.props.history.pushState({taskId:this.props.location.state.taskId,infoflag:'1'}, '/inquiry/newinquiry')
        }
        this.delt=(item,index,e)=>{
            console.log(item)
            var partid=item.PartId
            var FactPartName=item.FactPartName
            this.props.promptInfo({
                content:'确认删除'+FactPartName,
                Prompt:true,
                fun:()=>{
                    $.ajax({
                        url:'/toumingxiu/insEnquiry/delAppEnquiryPart.do',
                        type:'get',
                        data:{taskId:this.props.location.state.taskId,partIds:partid},
                        dataType: "json",
                        success:(msg)=>{
                            if(msg.errorCode=='000000'){
                                this.props.promptInfo({
                                    content:'删除成功',
                                    Prompt:true,
                                    fun:()=>{
                                        this.listdata();
                                    }
                                })
                            }else{
                                this.props.promptInfo({
                                    content:msg.errorMsg,
                                    Prompt:true
                                })
                            }
                        }
                    })
                    this.props.promptInfo()
                }
            })
        }
        this.bjlj=(ite)=>{
            const { List = [] } = this.state;
            List.map((item2,index2)=>{
                if(item2.idx==ite.idx){
                    item2.bj=!item2.bj
                    if(item2.bj==true){
                        item2.enquiryPatrs&& item2.enquiryPatrs.map((im,ix)=>{
                            if(im.bj===''){

                            }else{
                                im.bj=true
                            }
                        })
                    }else{
                        item2.enquiryPatrs&& item2.enquiryPatrs.map((im,ix)=>{
                            if(im.bj===''){

                            }else{
                                im.bj=false
                            }
                        })
                    }
                }
            })
            this.setState({
                List
            });
        }
        this.submit=()=>{
            //点击配件采购时若无配件报价：您还未选择报价
            //部分报价：你有零件未选择报价，发起采购将忽视这些零件，是否继续？
            //点击下单若无选择的零件：请选择配件
            //点击下单若无修理厂信息：请录入修理厂信息
            //this.state.submitGo= 1:还未选择报价，2部分报价，false：进入下一步
            // console.log(this.state.zhuangtaiList)
            var zt=this.state.zhuangtaiList
            var have=[],none=[]
            zt.map((item,index)=>{
                item.enquiryPatrs.map((item1,index1)=>{
                    if(item1.PartId){
                        if(item1.JmPrice==0&&item1.isPurchase!=1){
                            none.push('0')
                        }else if(item1.JmPrice!=0&&item1.isPurchase!=1){
                            have.push('1')
                        }
                    }
                })
            })
            if(none.length>0 && have.length==0){
                this.props.promptInfo({
                    content:'请先选择报价',
                    Prompt:true,
                    onlyOK:true
                })
            }else if(none.length>0 && have.length>0){
                this.props.promptInfo({
                    content:'你有零件未选择报价，发起采购将忽视这些零件，是否继续？',
                    Prompt:true,
                    onlyOK:true,
                    fun:()=>{
                        this.props.history.pushState({taskId:this.state.task.taskId,evalId:this.state.evalId},'/purchase/partsBuy')
                    }
                })
            }else if(none.length==0&&have.length>0){
                this.props.history.pushState({taskId:this.state.task.taskId,evalId:this.state.evalId},'/purchase/partsBuy')
            }
        }
        this.lookGSD=()=>{
            this.props.ajax({
                url:'/toumingxiu/quote/appPartDirectSupplyDownloadPic.do',
                data:{taskId:this.props.location.state.taskId},
                dataType:'text',
                suc:(dat)=>{
                    typeof dat == 'string' && (dat=dat.replace('www.toumingxiuche.cn',window.location.host));
                    wx.previewImage({
                        current:dat+'?mat='+(Math.random()*10000),
                        urls:[dat+'?mat='+(Math.random()*10000)]
                    });
                }
            })
        }
        this.tStart=(index, e)=>{
            if (document.getElementsByClassName('itemImgs')[index].getElementsByClassName('imgSingle').length < 4) {
                return
            }
            let firstx = document.getElementsByClassName('itemImgs')[index].offsetLeft - this.state.xState
            this.setState({xStart: e.touches[0].pageX})
            this.setState({xLeft: firstx})
        }
        this.tMove=(index, e)=>{
            if (document.getElementsByClassName('itemImgs')[index].getElementsByClassName('imgSingle').length < 4) {
                return
            }
            const pagex = e.touches[0].pageX - this.state.xStart
            document.getElementsByClassName('itemImgs')[index].style.left = this.state.xLeft + pagex + 'px'
        }
        this.tEnd=(index, e)=>{
            if (document.getElementsByClassName('itemImgs')[index].getElementsByClassName('imgSingle').length < 4) {
                return
            }
            if ((document.getElementsByClassName('itemImgs')[index].offsetLeft - this.state.xState) > 0) {
                document.getElementsByClassName('itemImgs')[index].style.left = 0
            }
            if (document.getElementsByClassName('itemImgs')[index].offsetLeft < -(document.getElementsByClassName('itemImgs')[index].offsetWidth - document.body.offsetWidth + this.state.xState)) {
                document.getElementsByClassName('itemImgs')[index].style.left = -(document.getElementsByClassName('itemImgs')[index].offsetWidth - document.body.offsetWidth + this.state.xState * 2) + 'px'
            }
        }
        this.showImg=(obj,index,e)=>{
            let imList=[]
            for(var i in obj){
                imList[i]=obj[i]
            }
            wx.previewImage({
                current:imList[index],
                urls:imList
            });
        }
        this.listdata=()=>{
            this.props.ajax({
                loading:true,
                url:'/toumingxiu/insEnquiry/getInsEnquiryTask.do',
                data:{taskId:this.props.location.state.taskId},
                suc:(data)=>{
                    console.log(data)
                    //PriceFlag 1直供 2自采
                    var arr=[]
                    if(data.result.List){
                        var zt=data.result.List
                        zt.map((itemm,indexx)=>{
                            itemm.enquiryPatrs.map((itemm1,indexx1)=>{
                                if(itemm1.isPurchase){
                                    arr.push(itemm1.isPurchase)
                                }
                            })
                        })
                    }
                    this.setState({
                        zhuangtaiList:data.result.List||[],
                        evalId:data.result.evalId,
                        imgList:data.result.enquriyPics,
                        zhuangtai:arr
                    })
                    if(data.success){
                        var dat=data.result
                        var ListArr=[
                                {data1:['checkbox','名称','品质','数量','单价','总价'],}
                            ],
                            CarList=[
                                {
                                    data1:['换件金额','管理费','合计'],
                                },
                                {
                                    data1:['￥'+dat.Car.PartSum,'￥'+dat.Car.ManageFeeSum,'￥'+dat.Car.EvalTotalSum],
                                }
                            ]

                        var PartTypeArr=[
                            '',
                            '原厂流通件',
                            'OEM件',
                            '认证件',
                            '品牌件',
                            '拆车件',
                            '其他',
                        ],AlreadyChosen={},submitGo=false,partsReady=[],EVElARR=[]
                        //配件遍历顺序
                        var EVALarr = ['FactPartName','PartTypeName','PartNum','JmPrice','sunMoney','partState','bj'],
                            //顶层数据
                            EVALINFO=[{'FactPartName':'名称','PartTypeName':'品质','PartNum':'数量','JmPrice':'单价','sunMoney':'总价','allMoney':'小计',partState:'状态',bj:''}]
                        for(var i in dat.List){
                            if(dat.List[i]){
                                for(var l in dat.List[i].enquiryPatrs){
                                    AlreadyChosen[dat.List[i].enquiryPatrs[l].FactPartCode]={
                                        data:{
                                            id:dat.List[i].enquiryPatrs[l].FactPartCode,
                                            name:dat.List[i].enquiryPatrs[l].FactPartName
                                        },
                                        num:dat.List[i].enquiryPatrs[l].PartNum
                                    };
                                    dat.List[i].enquiryPatrs[l].sunMoney=dat.List[i].enquiryPatrs[l].PartNum*(dat.List[i].enquiryPatrs[l].JmPrice)
                                    dat.List[i].enquiryPatrs[l].allMoney=(dat.List[i].enquiryPatrs[l].PartNum*(dat.List[i].enquiryPatrs[l].JmPrice)+dat.List[i].enquiryPatrs[l].ManageFee*dat.List[i].enquiryPatrs[l].PartNum)
                                    dat.List[i].enquiryPatrs[l].PartTypeName=PartTypeArr[dat.List[i].enquiryPatrs[l].PartType] || '-';
                                    dat.List[i].enquiryPatrs[l].partState=(dat.List[i].enquiryPatrs[l].isPurchase==1?'已采购':(dat.List[i].enquiryPatrs[l].PartType==''?'未选报价':'已选报价'));
                                    dat.List[i].enquiryPatrs[l].bj=false;
                                    EVALINFO.push(dat.List[i].enquiryPatrs[l])
                                    ListArr.push(
                                        {
                                            PartId:dat.List[i].enquiryPatrs[l].PartId,
                                            data1:[
                                                'checkbox',
                                                dat.List[i].enquiryPatrs[l].FactPartName,
                                                PartTypeArr[dat.List[i].enquiryPatrs[l].PartType] || '-',
                                                dat.List[i].enquiryPatrs[l].PartNum ? dat.List[i].enquiryPatrs[l].PartNum : '0',
                                                dat.List[i].enquiryPatrs[l].JmPrice  || '0',
                                                dat.List[i].enquiryPatrs[l].PartNum*(dat.List[i].enquiryPatrs[l].JmPrice) || '0',
                                                /*'￥'+(dat.List[i].PartNum*(dat.List[i].JmPrice)+dat.List[i].ManageFee*dat.List[i].PartNum) || '0'*/
                                            ],
                                            data2:[
                                                {key:'管理费率:',value:(dat.List[i].enquiryPatrs[l].ManageFeePct || 0)*100 + '%',vChang:true,type:'glf'},
                                                {key:'管理费:',value:'￥'+(dat.List[i].enquiryPatrs[l].ManageFeePct*dat.List[i].enquiryPatrs[l].PartNum*dat.List[i].enquiryPatrs[l].JmPrice).toFixed(2)|| 0},
                                                {key:'小计:',value:'￥'+(dat.List[i].enquiryPatrs[l].ManageFeePct*dat.List[i].enquiryPatrs[l].PartNum*dat.List[i].enquiryPatrs[l].JmPrice+dat.List[i].enquiryPatrs[l].PartNum*(dat.List[i].enquiryPatrs[l].JmPrice*1)).toFixed(2)},
                                            ],
                                            data:dat.List[i].enquiryPatrs[l]
                                        }
                                    )
                                    if(dat.List[i].enquiryPatrs[l].JmPrice){
                                        partsReady.push(dat.List[i].enquiryPatrs[l])
                                    }
                                }
                            }
                            dat.List[i].bj=false
                            dat.List[i].idx=i
                            dat.List[i].enquiryPatrs.unshift({'FactPartName':'名称','PartTypeName':'品质','PartNum':'数量','JmPrice':'单价','sunMoney':'总价','allMoney':'小计',partState:'状态',bj:''})
                        }
                        !partsReady[0] ? submitGo=1:partsReady.length < ListArr.length-1 ? submitGo=2:submitGo=false
                        this.setState({
                            carData:dat.Car,EVALINFO:EVALINFO,EVALarr:EVALarr,
                            submitGo:submitGo,partsReady:partsReady,task:dat.xlc || {},
                            ListArr:ListArr,Car:CarList,AlreadyChosen:AlreadyChosen,List:dat.List
                        },()=>{
                            /*if(this.state.task.inquirySrc='page' && this.state.task.status==0 && dat.List.length<=0){
                                this.props.promptInfo({content:'该询价订单由PC端发起，请前往PC端操作！',Prompt:true,onlyOK:true})
                            }*/
                        });
                    }
                    $.ajax({
                        url:'/server/lexiu1-app/api/tmxcorder/list/'+data.result.evalId+'?token='+this.props.user.data.token,
                        type:'get',
                        data:{evalId:data.result.evalId,token:this.props.user.data.token},
                        dataType: "json",
                        success:(msg)=>{
                            this.setState({
                                caigouList:msg.orders
                            })
                        }
                    })
                }
            })
        }
    }
    componentDidMount() {
        this.props.changeTitle('询价详情');
        this.listdata();
    }
    componentWillMount(){
        console.log(this.props.location.state.taskId)
        // this.props.ajax({
        //     loading:true,
        //     url:'/toumingxiu/insEnquiry/getInsEnquiryTask.do',
        //     data:{taskId:this.props.location.state.taskId},
        //     suc:(data)=>{
        //         console.log(data)
        //         //PriceFlag 1直供 2自采
        //         var arr=[]
        //         if(data.result.List){
        //             var zt=data.result.List
        //             zt.map((itemm,indexx)=>{
        //                 itemm.enquiryPatrs.map((itemm1,indexx1)=>{
        //                     if(itemm1.isPurchase){
        //                         arr.push(itemm1.isPurchase)
        //                     }
        //                 })
        //             })
        //         }
        //         this.setState({
        //             zhuangtaiList:data.result.List||[],
        //             evalId:data.result.evalId,
        //             imgList:data.result.enquriyPics,
        //             zhuangtai:arr
        //         })
        //         if(data.success){
        //             var dat=data.result
        //             var ListArr=[
        //                     {data1:['checkbox','名称','品质','数量','单价','总价'],}
        //                 ],
        //                 CarList=[
        //                     {
        //                         data1:['换件金额','管理费','合计'],
        //                     },
        //                     {
        //                         data1:['￥'+dat.Car.PartSum,'￥'+dat.Car.ManageFeeSum,'￥'+dat.Car.EvalTotalSum],
        //                     }
        //                 ]
        //
        //             var PartTypeArr=[
        //                 '',
        //                 '原厂流通件',
        //                 'OEM件',
        //                 '认证件',
        //                 '品牌件',
        //                 '拆车件',
        //                 '其他',
        //             ],AlreadyChosen={},submitGo=false,partsReady=[],EVElARR=[]
        //             //配件遍历顺序
        //             var EVALarr = ['FactPartName','PartTypeName','PartNum','JmPrice','sunMoney','partState','bj'],
        //                 //顶层数据
        //                 EVALINFO=[{'FactPartName':'名称','PartTypeName':'品质','PartNum':'数量','JmPrice':'单价','sunMoney':'总价','allMoney':'小计',partState:'状态',bj:''}]
        //             for(var i in dat.List){
        //                 if(dat.List[i]){
        //                     for(var l in dat.List[i].enquiryPatrs){
        //                         AlreadyChosen[dat.List[i].enquiryPatrs[l].FactPartCode]={
        //                             data:{
        //                                 id:dat.List[i].enquiryPatrs[l].FactPartCode,
        //                                 name:dat.List[i].enquiryPatrs[l].FactPartName
        //                             },
        //                             num:dat.List[i].enquiryPatrs[l].PartNum
        //                         };
        //                         dat.List[i].enquiryPatrs[l].sunMoney=dat.List[i].enquiryPatrs[l].PartNum*(dat.List[i].enquiryPatrs[l].JmPrice)
        //                         dat.List[i].enquiryPatrs[l].allMoney=(dat.List[i].enquiryPatrs[l].PartNum*(dat.List[i].enquiryPatrs[l].JmPrice)+dat.List[i].enquiryPatrs[l].ManageFee*dat.List[i].enquiryPatrs[l].PartNum)
        //                         dat.List[i].enquiryPatrs[l].PartTypeName=PartTypeArr[dat.List[i].enquiryPatrs[l].PartType] || '-';
        //                         dat.List[i].enquiryPatrs[l].partState=(dat.List[i].enquiryPatrs[l].isPurchase==1?'已采购':(dat.List[i].enquiryPatrs[l].PartType==''?'未选报价':'已选报价'));
        //                         dat.List[i].enquiryPatrs[l].bj=false;
        //                         EVALINFO.push(dat.List[i].enquiryPatrs[l])
        //                         ListArr.push(
        //                             {
        //                                 PartId:dat.List[i].enquiryPatrs[l].PartId,
        //                                 data1:[
        //                                     'checkbox',
        //                                     dat.List[i].enquiryPatrs[l].FactPartName,
        //                                     PartTypeArr[dat.List[i].enquiryPatrs[l].PartType] || '-',
        //                                     dat.List[i].enquiryPatrs[l].PartNum ? dat.List[i].enquiryPatrs[l].PartNum : '0',
        //                                     dat.List[i].enquiryPatrs[l].JmPrice  || '0',
        //                                     dat.List[i].enquiryPatrs[l].PartNum*(dat.List[i].enquiryPatrs[l].JmPrice) || '0',
        //                                     /*'￥'+(dat.List[i].PartNum*(dat.List[i].JmPrice)+dat.List[i].ManageFee*dat.List[i].PartNum) || '0'*/
        //                                 ],
        //                                 data2:[
        //                                     {key:'管理费率:',value:(dat.List[i].enquiryPatrs[l].ManageFeePct || 0)*100 + '%',vChang:true,type:'glf'},
        //                                     {key:'管理费:',value:'￥'+(dat.List[i].enquiryPatrs[l].ManageFeePct*dat.List[i].enquiryPatrs[l].PartNum*dat.List[i].enquiryPatrs[l].JmPrice).toFixed(2)|| 0},
        //                                     {key:'小计:',value:'￥'+(dat.List[i].enquiryPatrs[l].ManageFeePct*dat.List[i].enquiryPatrs[l].PartNum*dat.List[i].enquiryPatrs[l].JmPrice+dat.List[i].enquiryPatrs[l].PartNum*(dat.List[i].enquiryPatrs[l].JmPrice*1)).toFixed(2)},
        //                                 ],
        //                                 data:dat.List[i].enquiryPatrs[l]
        //                             }
        //                         )
        //                         if(dat.List[i].enquiryPatrs[l].JmPrice){
        //                             partsReady.push(dat.List[i].enquiryPatrs[l])
        //                         }
        //                     }
        //                 }
        //                 dat.List[i].bj=false
        //                 dat.List[i].idx=i
        //                 dat.List[i].enquiryPatrs.unshift({'FactPartName':'名称','PartTypeName':'品质','PartNum':'数量','JmPrice':'单价','sunMoney':'总价','allMoney':'小计',partState:'状态',bj:''})
        //             }
        //             !partsReady[0] ? submitGo=1:partsReady.length < ListArr.length-1 ? submitGo=2:submitGo=false
        //             this.setState({
        //                 carData:dat.Car,EVALINFO:EVALINFO,EVALarr:EVALarr,
        //                 submitGo:submitGo,partsReady:partsReady,task:dat.xlc || {},
        //                 ListArr:ListArr,Car:CarList,AlreadyChosen:AlreadyChosen,List:dat.List
        //             },()=>{
        //                 /*if(this.state.task.inquirySrc='page' && this.state.task.status==0 && dat.List.length<=0){
        //                     this.props.promptInfo({content:'该询价订单由PC端发起，请前往PC端操作！',Prompt:true,onlyOK:true})
        //                 }*/
        //             });
        //         }
        //         $.ajax({
        //             url:'/server/lexiu1-app/api/tmxcorder/list/'+data.result.evalId+'?token='+this.props.user.data.token,
        //             type:'get',
        //             data:{evalId:data.result.evalId,token:this.props.user.data.token},
        //             dataType: "json",
        //             success:(msg)=>{
        //                 this.setState({
        //                     caigouList:msg.orders
        //                 })
        //             }
        //         })
        //     }
        // })
    }
    componentWillUnmount(){
        this.props.promptInfo()
    }
    render(){
        var len=''
        if(this.state.imgList){
            len=this.state.imgList.length
        }
        var zhuangtai=[]
        var zt=this.state.zhuangtaiList
        zt.map((itemm,indexx)=>{
            itemm.enquiryPatrs.map((itemm1,indexx1)=>{
                if(itemm1.isPurchase){
                    zhuangtai.push(itemm1.isPurchase)
                }
            })
        })
        console.log(zhuangtai)
        let imgsPic = []
        if(len>=0){
            for (let i = 0; i < len; i++) {
                imgsPic.push(
                    <div className="imgSingle"><img style={{width: '100%', height: '100%'}}  onClick={this.showImg.bind(this,this.state.imgList,i)}
                                                    src={this.state.imgList[i]}/>
                    </div>
                )
            }
        }
        // this.state.List&&this.state.List.map((st,si)=>{
        //     console.log(st)
        //     if(st.enquiryPatrs.length==1){
        //         this.state.List.splice(si,1)
        //     }
        // })
        // console.log(this.state.List)
        var zdBjStyle={background:'#5a8cf2',color:'#fff',height:'0.5rem',borderRadius:'05rem',padding:'0 0.2rem',display:'flex',alignItems:'center',marginLeft:'0.15rem'}
        return(
            <div>
                {
                    this.state.loading ?
                        <div className="infotop">
                            <div style={{background:'#fff',marginTop:'0.2rem'}}>
                                <this.props.InfoTitle T={this} data={{key:'询价信息',Lcolor:'#5998ff'}}/>
                                <this.props.BaseLi {...this.props} data={[
                                    {
                                        key:'报案号',
                                        value:this.state.task.insReportNo
                                    },
                                    {
                                        key:'询价分公司',
                                        value:this.state.task.enquiryCompanyName
                                    },
                                    {
                                        key:'询价人',
                                        value:this.state.task.enquiryName || this.state.task.lossByName
                                    },
                                    {
                                        key:'车牌号',
                                        value:this.state.task.plateNo
                                    },
                                    {
                                        key:'车辆类型',
                                        value:this.state.task.carType=='1'?'商用车':this.state.task.carType=='0'?'乘用车':''
                                    }
                                ]} T={this}/>
                                <span className="infoab">
                                    {this.state.task.carType==1&&<this.props.BaseLi data={[
                                        {
                                            key:'发动机号',
                                            value:this.state.task.engineNumber
                                        }
                                    ]}{...this.props} T={this}/>}
                                </span>
                                <this.props.BaseLi {...this.props} data={[
                                    {
                                        key:'车架号码(VIN)',
                                        value:this.state.task.vincode
                                    },{
                                        key:'车辆品牌',
                                        value:this.state.task.ppmc
                                    },{
                                        key:'车型名称',
                                        value:this.state.task.cxmc,
                                        Style:{V:{textAlign:'right'}}
                                    }
                                ]} T={this}/>
                            </div>
                            <div style={{background:'#fff',marginTop:'0.2rem'}}>
                                <this.props.InfoTitle T={this} data={{
                                    key:'询价图片信息',Lcolor:'#5998ff'}}/>
                                <div className="maintainItem">
                                    <div className='imgsDiv'  style={{overflowX:'scroll'}}>
                                        <div className="itemImgs" style={{width:imgsPic.length*2.2-0.2+'rem',marginLeft:'0.3rem',overflowX:'scroll'}}>
                                            {/*onTouchStart={this.tStart.bind(this, 0)}*/}
                                            {/*onTouchMove={this.tMove.bind(this, 0)} onTouchEnd={this.tEnd.bind(this, 0)}*/}
                                            {imgsPic}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                this.state.List ? this.state.List.map((ite,idx)=>{
                                return(
                                    <div className="xjnews" style={{background:'#fff',marginTop:'0.2rem'}} key={idx}>
                                        <div style={{padding:'0.2rem 0.3rem',display:'flex',alignItems:'center',borderBottom:'0.01rem solid #ccc'}}>
                                            <span style={{display:'inline-block',width:'0.03rem',height:'0.5rem',background:'#5998ff'}}></span>
                                            <h4 style={{paddingLeft:'0.1rem',display:'inline-block',width:'1.5rem',fontSize:'0.3rem',fontWeight:'bold'}}>{this.state.List.length=='1'?'询价单':'询价单'+(idx+1)}</h4>
                                            <span style={{flex:'1'}}>{this.props.timeString(ite.enquiryDate,'y-m-d h:m:s')}</span>
                                            {ite.bj===false&&<span style={{display:'inline-block',width:'0.8rem',fontSize:'0.26rem'}} onClick={this.bjlj.bind(this,ite)}>编辑</span>}
                                            {ite.bj===true&&<span style={{display:'inline-block',width:'1.2rem',fontSize:'0.26rem'}} onClick={this.bjlj.bind(this,ite)}>完成编辑</span>}
                                        </div>
                                        <this.props.ListInfo2 DataList={ite.enquiryPatrs||[]} orderArr={this.state.EVALarr ||[]} delt={this.delt} {...this.props} T={this}/>
                                    </div>
                                )
                            }):''}
                            <div style={{background:'#fff',marginTop:'0.2rem',overflow:'hidden'}}>
                                {/*<this.props.InfoTitle T={this} data={{key:'金额汇总',Lcolor:'#ff5959'}}/>*/}
                                <this.props.BaseLi {...this.props} data={[
                                    {
                                        key:'金额汇总',
                                        value:'￥'+(this.state.carData && this.state.carData.PartSum || 0),
                                        Style:{V:{color:'red'}}
                                    }
                                ]} T={this}/>
                                {/*<this.props.StateLess.EvalManeyInfo Car={this.state.Car || []} {...this.props} T={this}/>*/}
                            </div>
                            <div style={{background:'#fff',marginTop:'0.2rem',overflow:'hidden',marginBottom:'1.2rem'}}>
                                <this.props.BaseLi data={[{
                                    Style:{ico2:'&#xe607;',S:{color:'#97989b'}},
                                    key:'管理费测算或下载估损单',
                                    fun:this.check
                                }]} {...this.props}/>
                            </div>
                        </div>
                        :
                        <p style={{textAlign:'center',lineHeight:'50px'}}>{this.state.dataErr}</p>
                }
                <div style={{width:'100%',padding:'0.2rem 0',borderTop:'0.01rem solid #ddd',position:'fixed',bottom:'0',background:'#fff'}}>
                    <ul style={{float:'right',marginRight:'0.2rem'}}>
                        {this.state.task.status==1&&this.state.List && this.state.List.length!=0 &&<li style={{float:'left',padding:'0.1rem 0.3rem',border:'1px solid #ccc',
                            borderRadius:'0.3rem',marginRight:'0.25rem'}} onClick={this.cd}>催 单</li>}
                        {this.state.task.status==3&&this.state.List && this.state.List.length!=0 &&<li style={{float:'left',padding:'0.1rem 0.3rem',border:'1px solid #ccc',
                            borderRadius:'0.3rem',marginRight:'0.25rem'}} onClick={this.cd}>催 单</li>}
                        {this.state.task.inquirySrc='page' && this.state.task.status==0 && this.state.ListArr.length>1 &&
                            <li onClick={this.zdBJ} style={{float:'left',padding:'0.1rem 0.3rem',border:'1px solid #ccc',
                                borderRadius:'0.3rem',marginRight:'0.25rem'}}>发起询价</li>
                        }
                        <li style={{float:'left',padding:'0.1rem 0.3rem',border:'1px solid #ccc',borderRadius:'0.3rem',marginRight:'0.25rem'}} onClick={this.tjlj}>添加零件</li>
                        {this.state.task.status !=0 &&this.state.task.status !=1&&this.state.task.status !=4&& this.state.List && this.state.List.length!=0 &&
                        <li style={{float:'left',padding:'0.1rem 0.3rem',border:'1px solid #ccc',borderRadius:'0.3rem'}}
                            onClick={this.bjxx}>查看报价</li>}
                    </ul>
                </div>
            </div>
        )
    }
}