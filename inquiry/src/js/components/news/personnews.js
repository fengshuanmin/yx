import React from 'react'
import $ from 'jquery'
import BaseLi from '../../../../../common/assembly/Stateless';
import someEvent from '../../../../../common/baseFun/someEvent'
require('../../../css/news.css')
require('../../../css/home.css')

export default class Person extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isDefault:false,
            submitDraw:false
        }
        this.checkrepair=()=>{
            console.log(this.state.xlcname,this.state.xlcaddrDetail,
                this.state.sfid,this.state.sfval,this.state.sqid,this.state.sqval,
                this.state.qyid,this.state.qyval,this.state.isDefault,this.state.xlcNames,
                this.state.xlcshotname)
            this.props.setProps({news:{xlcname:this.state.xlcname, xlcaddrDetail:this.state.xlcaddrDetail,
                sfid:this.state.sfid, sfval:this.state.sfval, sqid:this.state.sqid, sqval:this.state.sqval,
                qyid:this.state.qyid, qyval:this.state.qyval, isDefault:this.state.isDefault, orgType:0,
                xlcNames:this.state.xlcNames, xlcshotname:this.state.xlcshotname, completingType:0},repair:{repairLevel:this.state.repairLevel}})
            this.props.history.pushState(null,'/news/checkadd')
        }
        this.insurance=()=>{
            this.setState({
                insurance:true,
                xlc:false,
                person:false,
                orgType:1,
                /*name:'',
                xlcname:'',
                addrDetail:'',
                xlcshotname:'',
                xlcNames:'',
                xlcaddrDetail:''*/
            })
        }
        this.xlc=()=>{
            this.setState({
                insurance:false,
                xlc:true,
                person:false,
                orgType:0,
               /* name:'',
                insurancename:'',
                insurancecompany:'',
                insuranceaddrDetail:'',
                addrDetail:''*/
            })
        }
        this.person=()=>{
            this.setState({
                insurance:false,
                xlc:false,
                person:true,
                orgType:9,
                /*xlcname:'',
                insurancename:'',
                insurancecompany:'',
                xlcshotname:'',
                xlcNames:'',
                insuranceaddrDetail:'',
                xlcaddrDetail:''*/
            })
        }
        this.btnClick=()=>{
            this.setState({
                isDefault:!this.state.isDefault
            })
        }
        this.onChange=(value)=> {
            console.log(value);
        }
        this.quxiao=()=>{
           this.setState({
               submitDraw:false
           })
        }
        this.blur=()=>{
            window.scrollTo(0, 0);
            console.log('bulr')
        }
        this.sfList=(item,e)=>{
            this.setState({
                sfval:item.SFMC,
                sfid:item.id,
                sqval:'',
                qyval:'',
                checksf:false,
                checksq:true,
            })
            this.props.ajax({
                url: '/server/lexiu1-app/business/dictAddr/cs/'+item.id+'?token='+this.props.user.data.token,
                type: 'GET',
                suc: (data) => {
                    console.log(data)
                    this.setState({
                        sqList:data.cs
                    })
                }
            })
        }
        this.sqList=(item1,e)=>{
            this.setState({
                sqval:item1.CSMC,
                sqid:item1.id,
                qyval:'',
                checksf:false,
                checksq:false,
                checkqy:true
            })
            this.props.ajax({
                url: '/server/lexiu1-app/business/dictAddr/x/'+item1.id+'?token='+this.props.user.data.token,
                type: 'GET',
                suc: (result) => {
                    if(result.x.length==0){
                        this.setState({
                            checksf:false,
                            checksq:false,
                            checkqy:false,
                            submitDraw:false,
                            qyval:'',
                            qyid:'',
                        })
                    }else{
                        this.setState({
                            qyList:result.x
                        })
                    }
                }
            })
        }
        this.qyList=(item2,e)=>{
            this.setState({
                qyval:item2.XMC,
                qyid:item2.id,
                checksf:false,
                checksq:false,
                checkqy:false,
                submitDraw:false,
                qyList:['124','222','555'],
                dq:this.state.sfval+this.state.sqval+item2
            })
        }
        this.sfdiv=()=>{
            this.setState({
                sfval:'',
                sqval:'',
                qyval:'',
                checksf:true,
                checksq:false,
                checkqy:false
            })
        }
        this.sqdiv=()=>{
            this.setState({
                checksf:false,
                checksq:true,
                checkqy:false
            })
        }
        this.checkadd=()=>{
            console.log(this.props.user.data.token)
            this.props.ajax({
                url: '/server/lexiu1-app/business/dictAddr/sf?token=' + this.props.user.data.token,
                type: 'GET',
                suc: (dat) => {
                    console.log(dat)
                    this.setState({
                        submitDraw:true ,
                        checksf:true,
                        sfList:dat.sf
                    })
                }
            })
        }
        this.touchs=(m,e)=>{
            switch(m){
                case 'start':
                    this.props.touchStarts(e,this);
                    break;
                case 'end':
                    this.props.touchEnds(e,this);
                    break;
                case 'move':
                    this.props.touchMoves(e,this);
                    break;
            }
        }
        this.submit=()=>{
            var reg=(/^ +| +$/g,'');
            if(this.state.orgType==1){
                var regu = "^[ ]+$";
                var re = new RegExp(regu);
                var regs = /^[a-zA-Z\u4e00-\u9fff]+$/
                var res=new RegExp(regs);
                // var res1 = new RegExp("[A-Za-z]+");
                console.log(!res.test(this.state.insurancename))
                if(!this.state.insurancename||this.state.insurancename==''||re.test(this.state.insurancename)){
                    this.props.promptInfo({
                        content:'请输入姓名',
                        Prompt:true,
                        onlyOK:true
                    })
                }else if(!res.test(this.state.insurancename)){
                    this.props.promptInfo({
                        content:'请输入中文或英文',
                        Prompt:true,
                        onlyOK:true
                    })
                }else if(!this.state.insurancecompany||this.state.insurancecompany==''||re.test(this.state.insurancecompany)){
                    this.props.promptInfo({
                        content:'请输入保险公司名称',
                        Prompt:true,
                        onlyOK:true
                    })
                }else if(!this.state.sfval||this.state.sfval==''||!this.state.sqval||
                    this.state.sqval==''){
                    this.props.promptInfo({
                        content:'请选择所在地区',
                        Prompt:true,
                        onlyOK:true
                    })
                }else if(!this.state.insuranceaddrDetail||this.state.insuranceaddrDetail==''||re.test(this.state.insuranceaddrDetail)){
                    this.props.promptInfo({
                        content:'请输入详细地址',
                        Prompt:true,
                        onlyOK:true
                    })
                }else{
                    this.props.ajax({
                        url:'/server/lexiu1-app/api/tmxcorder/addAddrs?token='+this.props.user.data.token,
                        data:{
                            id:'',
                            customerId:this.props.user.data.LxAqYhxxb.id,
                            name:this.state.insurancename,
                            phone:this.props.user.data.LxAqYhxxb.registPersionPhone,
                            addrDetail:this.state.insuranceaddrDetail,
                            addr1Id:this.state.sfid,
                            addr1:this.state.sfval,
                            addr2Id:this.state.sqid,
                            addr2:this.state.sqval,
                            addr3Id:this.state.qyid,
                            addr3:this.state.qyval,
                            isDefault:this.state.isDefault
                        },
                        suc:(dat)=>{
                            console.log(dat)
                            this.props.ajax({
                                url:'/toumingxiu/personalRegister/completingPersonalAdditionalInfo.do',
                                data:{
                                    userId:this.props.user.data.LxAqYhxxb.id,
                                    registerName:this.state.insurancename,
                                    orgType:1,
                                    orgName: this.state.insurancecompany,
                                    orgShotName:'',
                                    repairLevel:'',
                                    completingType:0,
                                    addressId:dat.addressId
                                },
                                suc:(data)=>{
                                    console.log(data)
                                    if(data.success==true){
                                        this.props.promptInfo({
                                            content:'个人信息补全成功',
                                            Prompt:true,
                                            onlyOK:true,
                                            fun:()=>{
                                                if(this.props.location.state.comnews && this.props.location.state.comnews=='1'){
                                                    this.props.promptInfo();
                                                    this.props.history.goBack();
                                                }else{
                                                    this.props.promptInfo();
                                                    this.props.history.pushState(null,'/inquiry')
                                                }
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    })
                }
            }else if(this.state.orgType==0){
                console.log(this.state.repairLevel)
                var repairLevel=''
                if(this.state.repairLevel=='综合'){
                    repairLevel='4'
                }else if(this.state.repairLevel=='一类'){
                    repairLevel='1'
                }else if(this.state.repairLevel=='二类'){
                    repairLevel='2'
                }else if(this.state.repairLevel=='三类'){
                    repairLevel='3'
                }else{
                    repairLevel='0'
                }
                var regu = "^[ ]+$";
                var re = new RegExp(regu);
                var regs = /^[a-zA-Z\u4e00-\u9fff]+$/
                var res=new RegExp(regs);
                if(!this.state.xlcname||this.state.xlcname==''||re.test(this.state.xlcname)){
                    this.props.promptInfo({
                        content:'请输入姓名',
                        Prompt:true,
                        onlyOK:true
                    })
                }else if(!res.test(this.state.xlcname)){
                    this.props.promptInfo({
                        content:'请输入中文或英文',
                        Prompt:true,
                        onlyOK:true
                    })
                }else if(!this.state.xlcNames||this.state.xlcNames==''||re.test(this.state.xlcNames)){
                    this.props.promptInfo({
                        content:'请输入修理厂名称',
                        Prompt:true,
                        onlyOK:true
                    })
                }else if(!this.state.xlcshotname||this.state.xlcshotname==''||re.test(this.state.xlcshotname)){
                    this.props.promptInfo({
                        content:'请输入修理厂简称',
                        Prompt:true,
                        onlyOK:true
                    })
                }else if(!this.state.sfval||this.state.sfval==''||!this.state.sqval||
                    this.state.sqval==''){
                    this.props.promptInfo({
                        content:'请选择所在地区',
                        Prompt:true,
                        onlyOK:true
                    })
                }else if(!this.state.xlcaddrDetail||this.state.xlcaddrDetail==''||re.test(this.state.xlcaddrDetail)){
                    this.props.promptInfo({
                        content:'请输入详细地址',
                        Prompt:true,
                        onlyOK:true
                    })
                }else{
                    this.props.ajax({
                        url:'/server/lexiu1-app/api/tmxcorder/addAddrs?token='+this.props.user.data.token,
                        data:{
                            id:'',
                            customerId:this.props.user.data.LxAqYhxxb.id,
                            name:this.state.xlcname,
                            phone:this.props.user.data.LxAqYhxxb.registPersionPhone,
                            addrDetail:this.state.xlcaddrDetail,
                            addr1Id:this.state.sfid,
                            addr1:this.state.sfval,
                            addr2Id:this.state.sqid,
                            addr2:this.state.sqval,
                            addr3Id:this.state.qyid,
                            addr3:this.state.qyval,
                            isDefault:this.state.isDefault
                        },
                        suc:(dat)=>{
                            console.log(dat)
                            this.props.ajax({
                                url:'/toumingxiu/personalRegister/completingPersonalAdditionalInfo.do',
                                data:{
                                    userId:this.props.user.data.LxAqYhxxb.id,
                                    registerName:this.state.xlcname,
                                    orgType:0,
                                    orgName:this.state.xlcNames,
                                    orgShotName:this.state.xlcshotname,
                                    repairLevel:repairLevel,
                                    completingType:0,
                                    addressId:dat.addressId
                                },
                                suc:(data)=>{
                                    console.log(data)
                                    if(data.success==true){
                                        this.props.promptInfo({
                                            content:'个人信息补全成功',
                                            Prompt:true,
                                            onlyOK:true,
                                            fun:()=>{
                                                if(this.props.location.state.comnews && this.props.location.state.comnews=='1'){
                                                    this.props.promptInfo();
                                                    this.props.history.goBack();
                                                }else{
                                                    this.props.promptInfo();
                                                    this.props.history.pushState(null,'/inquiry')
                                                }
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    })
                }
            }else if(this.state.orgType==9) {
                var regu = "^[ ]+$";
                var re = new RegExp(regu);
                var regs = /^[a-zA-Z\u4e00-\u9fff]+$/
                var res=new RegExp(regs);
                if(!this.state.name||this.state.name==''||re.test(this.state.name)){
                    this.props.promptInfo({
                        content:'请输入姓名',
                        Prompt:true,
                        onlyOK:true
                    })
                }else if(!res.test(this.state.name)){
                    this.props.promptInfo({
                        content:'请输入中文或英文',
                        Prompt:true,
                        onlyOK:true
                    })
                }else if(!this.state.sfval||this.state.sfval==''||!this.state.sqval||
                    this.state.sqval==''){
                    this.props.promptInfo({
                        content:'请选择所在地区',
                        Prompt:true,
                        onlyOK:true
                    })
                }else if(!this.state.addrDetail||this.state.addrDetail==''||re.test(this.state.addrDetail)){
                    this.props.promptInfo({
                        content:'请输入详细地址',
                        Prompt:true,
                        onlyOK:true
                    })
                }else{
                    this.props.ajax({
                        url:'/server/lexiu1-app/api/tmxcorder/addAddrs?token='+this.props.user.data.token,
                        data:{
                            id:'',
                            customerId:this.props.user.data.LxAqYhxxb.id,
                            name:this.state.name,
                            phone:this.props.user.data.LxAqYhxxb.registPersionPhone,
                            addrDetail:this.state.addrDetail,
                            addr1Id:this.state.sfid,
                            addr1:this.state.sfval,
                            addr2Id:this.state.sqid,
                            addr2:this.state.sqval,
                            addr3Id:this.state.qyid,
                            addr3:this.state.qyval,
                            isDefault:this.state.isDefault
                        },
                        suc:(dat)=>{
                            console.log(dat)
                            this.props.ajax({
                                url:'/toumingxiu/personalRegister/completingPersonalAdditionalInfo.do',
                                data:{
                                    userId:this.props.user.data.LxAqYhxxb.id,
                                    registerName:this.state.name,
                                    orgType:9,
                                    orgName:'',
                                    orgShotName:'',
                                    completingType:0,
                                    repairLevel:'',
                                    addressId:dat.addressId
                                },
                                suc:(data)=>{
                                    console.log(data)
                                    if(data.success==true){
                                        this.props.promptInfo({
                                            content:'个人信息补全成功',
                                            Prompt:true,
                                            onlyOK:true,
                                            fun:()=>{
                                                if(this.props.location.state.comnews && this.props.location.state.comnews=='1'){
                                                    this.props.promptInfo();
                                                    this.props.history.goBack();
                                                }else{
                                                    this.props.promptInfo();
                                                    this.props.history.pushState(null,'/inquiry')
                                                }
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    })
                }
            }
        }
    }
    componentWillMount(){
        this.props.location.state={...(this.props.location.state||{}),...(this.props.news||{}),...(this.props.repair||{})}
        this.state={...(this.state||{}),...(this.props.location.state||{})}
        console.log(this.state)
        console.log(this.props.location.state)
        if(this.props.location.state.orgType==0){
            console.log("1234")
            this.setState({
                insurance:false,
                xlc:true,
                person:false,
                orgType:0
            })
        }else{
            this.setState({
                person:true,
                insurance:false,
                xlc:false,
                orgType:9
            })
        }

    }
    componentDidMount() {
        this.props.changeTitle('补全信息');
    }
    componentWillUnmount() {
        if(this.props.location.state.completingType == '0') {
            localStorage.setItem("flagger", 1)
        }
    }
    render(){
        console.log(this.props)
        console.log(this.state)

        return(
            <div className="body1">
                <div className="content">
                    <div className="content-header">
                        <h4>
                            <span style={{color:'#3D79DC',fontWeight:'600'}}>| </span>
                            {this.state.orgType=='0'?'修理厂信息':this.state.orgType=='1'?'公司信息':'个人信息'}
                        </h4>
                        <ul className="checkjs">
                            <li>角色
                                <span onClick={this.insurance} className={this.state.insurance?'btnclc':'btn'} >保险公司</span>
                                <span onClick={this.xlc} className={this.state.xlc?'btnclc':'btn'}>修理厂</span>
                                <span onClick={this.person} className={this.state.person?'btnclc':'btn'}>个人</span>
                            </li>
                        </ul>
                        <div className={this.state.person?'personblock':'personnone'} >
                            <this.props.BaseLi style={{padding:'0.15rem 0 0.15rem 0'}} data={[
                                {
                                    key: '姓名',
                                    input: true,
                                    val: this.state.name,
                                    change: (e) => {
                                        this.setState({name: e})
                                    },
                                    blur:()=>{
                                        this.blur()
                                    }
                                }
                                ]}{...this.props} T={this}/>
                            <ul className="baseLi" style={{color:'#1C1C1C',fontSize:'0.28rem'}}>
                                <li className="style1">
                                    <div className="LiTRight" style={{borderTop: '1px solid #F4F4F4',borderBottom: '1px solid #F4F4F4',padding: '0.3rem 0'}}>
                                        <div className="onece" style={{display:'flex',fontSize:'0.26rem'}} onClick={this.checkadd}><span>所在地区</span>
                                            <span style={{flex:'1',marginLeft:'0.2rem'}}>
                                                <span>{this.state.sfval||''}</span>
                                                <span>{this.state.sqval||''}</span>
                                                <span>{this.state.qyval||''}</span>
                                            </span>
                                            <span style={{display:'inline-block',width:'0.6rem'}} className="iconfonts">&#xe607;</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <this.props.BaseLi style={{padding:'0.15rem 0 0.15rem 0'}} data={[{
                                    key: '详细地址',
                                    input: true,
                                    val: this.state.addrDetail,
                                    change: (e) => {
                                        this.setState({addrDetail: e})
                                    },
                                    blur:()=>{
                                            this.blur()
                                    }
                                }
                            ]} {...this.props} T={this}/>
                            <p style={{background:'#fff',padding:'0.3rem 0',margin:'0 0.3rem',marginTop:'-0.15rem',borderTop:'0.01rem solid #F4F4F4'}}>是否将地址设为默认地址
                                {this.state.isDefault==true?<label className="switch2 labe1 switch" onClick={this.btnClick}>
                                    <span className="sp"></span>
                                </label>:<label className="switch1 labe switch" onClick={this.btnClick}>
                                    <span className="spa"></span>
                                </label>}
                            </p>
                        </div>
                        <div className={this.state.insurance?'personblock':'personnone'}>
                            <this.props.BaseLi style={{padding:'0.15rem 0 0.15rem 0'}} data={[
                                {
                                    key: '姓名',
                                    input: true,
                                    val: this.state.insurancename,
                                    change: (e) => {
                                        this.setState({insurancename: e})
                                    },
                                    blur:()=>{
                                        this.blur()
                                    }
                                },
                                {
                                    key: '所属保险公司',
                                    input: true,
                                    val: this.state.insurancecompany,
                                    change: (e) => {
                                        this.setState({insurancecompany: e})
                                    },
                                    blur:()=>{
                                        this.blur()
                                    }
                                }]} {...this.props} T={this}/>
                                <ul className="baseLi" style={{color:'#1C1C1C',fontSize:'0.28rem'}}>
                                    <li className="style1">
                                        <div className="LiTRight" style={{borderTop: '1px solid #F4F4F4',borderBottom: '1px solid #F4F4F4',padding: '0.3rem 0'}}>
                                            <div className="onece" style={{display:'flex',fontSize:'0.26rem'}} onClick={this.checkadd}><span>所在地区</span>
                                                <span style={{flex:'1',marginLeft:'0.2rem'}}>
                                                <span>{this.state.sfval||''}</span>
                                                <span>{this.state.sqval||''}</span>
                                                <span>{this.state.qyval||''}</span>
                                            </span>
                                                <span style={{display:'inline-block',width:'0.6rem'}} className="iconfonts">&#xe607;</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            <this.props.BaseLi style={{padding:'0.15rem 0 0.15rem 0'}} data={[
                                {
                                    key: '详细地址',
                                    input: true,
                                    val: this.state.insuranceaddrDetail,
                                    change: (e) => {
                                        this.setState({insuranceaddrDetail: e})
                                    },
                                    blur:()=>{
                                        this.blur()
                                    }
                                }
                            ]} {...this.props} T={this}/>
                            <p style={{background:'#fff',padding:'0.3rem 0',margin:'0 0.3rem',marginTop:'-0.15rem',borderTop:'0.01rem solid #F4F4F4'}}>是否将地址设为默认地址
                                {this.state.isDefault==true?<label className="switch2 labe1 switch" onClick={this.btnClick}>
                                    <span className="sp"></span>
                                </label>:<label className="switch1 labe switch" onClick={this.btnClick}>
                                    <span className="spa"></span>
                                </label>}
                            </p>
                        </div>
                        <div className={this.state.xlc?'personblock':'personnone'}>
                            <this.props.BaseLi style={{padding:'0.15rem 0 0.15rem 0'}} data={[
                                {
                                    key: '姓名',
                                    input: true,
                                    val: this.state.xlcname,
                                    change: (e) => {
                                        this.setState({xlcname: e})
                                    },
                                    blur:()=>{
                                        this.blur()
                                    }
                                },
                                {
                                    key: '修理厂名称',
                                    input: true,
                                    val:this.state.xlcNames,
                                    change: (e) => {
                                        this.setState({xlcNames: e})
                                    },
                                    blur:()=>{
                                        this.blur()
                                    }
                                },
                                {
                                    key: '修理厂简称',
                                    input: true,
                                    val:this.state.xlcshotname,
                                    change: (e) => {
                                        this.setState({xlcshotname: e})
                                    },
                                    blur:()=>{
                                        this.blur()
                                    }
                                }
                                ]} {...this.props} T={this}/>
                        <ul className="baseLi" style={{color:'#1C1C1C',fontSize:'0.28rem'}}>
                            <li className="style1">
                                <div className="LiTRight" style={{borderTop: '1px solid #F4F4F4',borderBottom: '1px solid #F4F4F4',padding: '0.3rem 0'}}>
                                    <div className="onece" style={{display:'flex',fontSize:'0.26rem'}} onClick={this.checkadd}><span>所在地区</span>
                                        <span style={{flex:'1',marginLeft:'0.2rem'}}>
                                                <span>{this.state.sfval||''}</span>
                                                <span>{this.state.sqval||''}</span>
                                                <span>{this.state.qyval||''}</span>
                                            </span>
                                        <span style={{display:'inline-block',width:'0.6rem'}} className="iconfonts">&#xe607;</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <this.props.BaseLi style={{padding:'0.15rem 0 0.15rem 0'}} data={[
                                {
                                    key: '详细地址',
                                    input: true,
                                    val: this.state.xlcaddrDetail,
                                    change: (e) => {
                                        this.setState({xlcaddrDetail: e})
                                    },
                                    blur:()=>{
                                        this.blur()
                                    }
                                }
                            ]} {...this.props} T={this}/>
                            <p style={{background:'#fff',padding:'0.3rem 0',margin:'0 0.3rem',marginTop:'-0.15rem',borderTop:'0.01rem solid #F4F4F4'}}>是否将地址设为默认地址
                                {this.state.isDefault==true?<label className="switch2 labe1 switch" onClick={this.btnClick}>
                                    <span className="sp"></span>
                                </label>:<label className="switch1 labe switch" onClick={this.btnClick}>
                                    <span className="spa"></span>
                                </label>}
                            </p>
                            <ul className="baseLi" style={{color:'#1C1C1C',fontSize:'0.28rem'}}>
                                <li className="style1">
                                    <div className="LiTRight" style={{borderTop: '1px solid #F4F4F4',borderBottom: '1px solid #F4F4F4',padding: '0.3rem 0'}}>
                                        <div className="onece" style={{display:'flex',fontSize:'0.26rem'}} onClick={this.checkrepair}><span>维修资质</span>
                                            <span style={{flex:'1',marginLeft:'0.2rem'}}>
                                                {this.state.repairLevel||'4S'}
                                            </span>
                                            <span style={{display:'inline-block',width:'0.6rem'}} className="iconfonts">&#xe607;</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div style={{width:'100vw',height:'1rem',marginTop:'0.5rem'}}>
                        <button onClick={this.submit} style={{border:'0px',width:'95%',height:'1rem',background:'#fff',color:'#000',borderRadius:'0.1rem',fontSize:'0.32rem'}}>完成</button>
                    </div>
                </div>
                <div className={this.state.submitDraw ? "partsBuyShow basicStyle" : "partsBuyHide basicStyle"}>
                    <div className="qy">
                        <h4 className="checkqy">选择地区<span onClick={this.quxiao} className="zp1" style={{backgroundImage:'url('+require('../../../img/close1.png')+')'}}></span></h4>
                        <p className="sfp">
                            <span className="qytitle" onClick={this.sfdiv}>{this.state.sfval||'请选择'}</span>
                            {this.state.sfval?<span onClick={this.sqdiv} className="qytitle">{this.state.sqval||'请选择'}</span>:''}
                            {this.state.sqval?<span className="qytitle">{this.state.qyval||'请选择'}</span>:''}
                        </p>
                        <div style={{flex:1,position:'relative',overflow:'hidden'}}>
                            <ul className={this.state.checksf?'sfdiv':'sfdivnone'}
                                onTouchEnd={this.touchs.bind(this,'end')}
                                onTouchMove={this.touchs.bind(this,'move')}
                                onTouchStart={this.touchs.bind(this,'start')}
                                style={{overflow:'hidden',position:'absolute'}}
                            >
                                {this.state.sfList&&this.state.sfList.map((item,index)=>{
                                    return(
                                        <li className="lilist" key={index} onClick={this.sfList.bind(this,item,index)}>{item.SFMC}</li>
                                    )
                                })}
                            </ul>
                            <ul className={this.state.checksq?'sfdiv':'sfdivnone'}
                                onTouchEnd={this.touchs.bind(this,'end')}
                                onTouchMove={this.touchs.bind(this,'move')}
                                onTouchStart={this.touchs.bind(this,'start')}
                                style={{overflow:'hidden',position:'absolute'}}
                            >
                                {this.state.sqList&&this.state.sqList.map((item1,index1)=>{
                                    return(
                                        <li className="lilist" key={index1} onClick={this.sqList.bind(this,item1,index1)}>{item1.CSMC}</li>
                                    )
                                })}
                            </ul>
                            <ul className={this.state.checkqy?'sfdiv':'sfdivnone'}
                                onTouchEnd={this.touchs.bind(this,'end')}
                                onTouchMove={this.touchs.bind(this,'move')}
                                onTouchStart={this.touchs.bind(this,'start')}
                                style={{overflow:'hidden',position:'absolute'}}
                            >
                                {this.state.qyList&&this.state.qyList.map((item2,index2)=>{
                                    return(
                                        <li className="lilist" key={index2} onClick={this.qyList.bind(this,item2,index2)}>{item2.XMC}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}