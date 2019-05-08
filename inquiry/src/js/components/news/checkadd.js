import React from 'react'
require('../../../css/home.css')
export default class checkAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            nochecked:{background:'url('+require('../../../img/nochecked.png')+') no-repeat center/cover'},
            checked:{background:'url('+require('../../../img/checked.png')+') no-repeat center/cover'},
            repairlist:['4S','一类','二类','三类','综合'],
            val:''
        }
        this.checkpay=(item,e)=>{
            this.setState({
                repairLevel:item
            })
            this.props.setProps({repair:{repairLevel:item}})
            this.props.history.goBack();
            return;
        }
    }
    componentDidMount() {
        this.props.changeTitle('维修资质');
    }
    componentWillMount(){
        this.props.location.state={...(this.props.location.state||{}),...(this.props.news||{}),...(this.props.repair||{})}
        this.state={...(this.state||{}),...(this.props.location.state||{})}
    }
    render() {
        console.log(this.state)
        console.log(this.props)
        var repairlev=''
        if(this.state.repairLevel=='4'||this.state.repairLevel=='综合') {
            repairlev='综合'
        }else if(this.state.repairLevel=='1'||this.state.repairLevel=='一类'){
            repairlev='一类'
        }else if(this.state.repairLevel=='2'||this.state.repairLevel=='二类'){
            repairlev='二类'
        }else if(this.state.repairLevel=='3'||this.state.repairLevel=='三类'){
            repairlev='三类'
        }else{
            repairlev='4S'
        }
        console.log(repairlev)
        return (
            <div style={{background: '#fff',marginTop:'0.3rem'}}>
                <ul>
                    {this.state.repairlist.map((item,index)=>{
                        return(
                            repairlev==item?
                                <li style={{padding:'0.2rem 0.2rem 0.2rem 0',marginLeft:'0.2rem',borderBottom:'0.01rem solid #ddd'}} onClick={this.checkpay.bind(this,item)}>
                                    <span style={{display:'inline-block',padding:'0 0.2rem',fontSize:'0.32rem'}}>{item}</span>
                                    <label style={{display:'inline-block',width: '0.4rem',height:'0.4rem',float:'right',
                                        background:'url('+require('../../../img/checked.png')+') no-repeat center/cover'}}></label>
                                    <input style={{float:'right',width:'0.4rem',height:'0.4rem',display:'none'}} checked
                                           type="radio" name="address" value={item} refs={item} onChange={this.handleChange}/>
                                </li>: <li style={{padding:'0.2rem 0.2rem 0.2rem 0',marginLeft:'0.2rem',borderBottom:'0.01rem solid #ddd'}} onClick={this.checkpay.bind(this,item)}>
                                    <span style={{display:'inline-block',padding:'0 0.2rem',fontSize:'0.32rem'}}>{item}</span>
                                    <label style={{display:'inline-block',width: '0.4rem',height:'0.4rem',float:'right',
                                        background:'url('+require('../../../img/nochecked.png')+') no-repeat center/cover'}}></label>
                                    <input style={{float:'right',width:'0.4rem',height:'0.4rem',display:'none'}}
                                           type="radio" name="address" value={item} refs={item} onChange={this.handleChange}/>
                                </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}