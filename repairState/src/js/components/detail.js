/**
 * Created by 23174 on 2017/9/13.
 */
import React from 'react'
import $ from 'jquery'
import {Link} from 'react-router'

const Detail = React.createClass({
    getInitialState(){
        return {
            activeItem:'0'
        }
    },
    componentDidMount(){
        const data = this.props.location.state
        this.setState({datastate: data})
        console.log(this.state.datastate)
    },
    componentWillMount () {
        const type = this.props.location.pathname
        // document.getElementById('appWrapper').addEventListener('scroll', this.orderScroll.bind(this))
    },
    historygo(){
        this.props.history.pushState(null, 'home')
    },
    chooseItem(index,e){
        this.state.activeItem=index
        console.log(this.state.activeItem)
    },
    toItem(m,n,x,e){
        // for(let i=0;i<$('.routerItem').length;i++){
        //     $('.routerItem').eq(i).css('color','black')
        // }
        // $('.routerItem').eq(x).css('color','rgb(42,146,248)')
        this.props.history.pushState(m, n)
    },
    MenuShow(){
        this.state.menuState ? this.setState({menuState: false}) : this.setState({menuState: true})
    },
    render(){
        let item=this.state.datastate
        return (
            <div className="Detail">
                <div className="detailRouter" style={{color:'black'}}>
                    <div className="routerItem" style={this.props.location.pathname=='/detail/caseInfo'?{color:'rgb(42,146,248)'}:{color:'black'}} onClick={this.toItem.bind(this,item,'/detail/caseInfo',0)}><span>案件信息</span></div>
                    <div className="routerItem" style={this.props.location.pathname=='/detail/loseInfo'?{color:'rgb(42,146,248)'}:{color:'black'}} onClick={this.toItem.bind(this,item,'/detail/loseInfo',1)}><span>定损信息</span></div>
                    <div className="routerItem" style={this.props.location.pathname=='/detail/maintainInfo'?{color:'rgb(42,146,248)'}:{color:'black'}} onClick={this.toItem.bind(this,item,'/detail/maintainInfo',2)}><span>维修信息</span></div>
                </div>
                <div className="detailRouter2">
                </div>
                <div className="detailContainer">
                    {this.props.children && React.cloneElement(this.props.children,{
                        ...this.props
                    })}
                </div>
            </div>
        )
    }
})

export default Detail