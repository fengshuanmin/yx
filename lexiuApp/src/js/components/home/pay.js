import React from 'react'
import $ from 'jquery'

var Component=(props)=>{
    const state=props.location.state
    var titleArr=['',
        {
            title:'佣金',Bcollor:'#30b5e7,#2989f3',
            name:'佣金余额',
            show:(
                <span><em>￥ </em>{props.location.state.money}</span>),
            data:[
                {key:'支出明细',Style:{ico2:'&#xe607;'},path:'/paydetail'},
                {key:'充值明细',Style:{ico2:'&#xe607;'},path:'/rechargedetail'}],
        },
        {
            title:'押金',Bcollor:'#2ed953,#35ba8c',
            name:'押金余额',
            show:(<span><em>￥ </em>{props.location.state.money}</span>),
            data:[
                {key:'支出明细',Style:{ico2:'&#xe607;'},path:'/paydetail'},
                {key:'充值明细',Style:{ico2:'&#xe607;'},path:'/rechargedetail'}],
        },
        {
            title:'销券',Bcollor:'#f7e52c,#f5c82e',
            name:'已销券',
            show:(<span>{props.location.state.money}<em> 张</em></span>),
            data:[{key:'消券记录',Style:{ico2:'&#xe607;'}}]
        }]
    props.project.changeTitle(titleArr[state.index].title);
    /*fun:()=>this.props.history.pushState(null,'/rechargedetail'),fun:()=>this.props.history.pushState(null,'/paydetail')*/
    return(
        <div>
           <div>
                <div className="payListye" style={{
                    background:'linear-gradient(to right,'+titleArr[state.index].Bcollor+')'
                }}>
                    <span>{titleArr[state.index].name}</span>
                    {titleArr[state.index].show}
                </div>

               <props.BaseLi data={titleArr[state.index].data} {...props}/>
           </div>
        </div>
    )
}

export default class Pay extends React.Component{
    constructor(props){
       super(props);
       this.state={

       }
    };
    componentDidMount(){
        this.setState({
            data:{a:'33',b:'44'},
            rechargeFor:this.props.location.state.rechargeFor
        })
    }
   render(){
       console.log(this.state.rechargeFor)
       return(
           <div>
               <Component cont={this.state.data} {...this.props}/>
               {this.props.location.state.index !=3 &&
               <this.props.BaseSubmits style={{box:{padding:'0 0.3rem',marginBottom:'0.5rem'}}} submits={[{style:{borderRadius:'0.1rem',background:'linear-gradient(to right,#30b5e7,#2989f3)'},value:'充值',fun:()=>this.props.history.pushState({rechargeFor:this.state.rechargeFor},"/recharge")}]} value="充值" {...this.props} />}
           </div>
       )
   }
}