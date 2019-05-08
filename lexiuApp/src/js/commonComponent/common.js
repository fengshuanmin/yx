/**
 * Created by Administrator on 2016/7/25 0025.
 */
import React from 'react'

//路由小图标
export class IconFont extends React.Component {
    render() {
        return (
            <span onClick={this.props.onClick} className="iconfont">{this.props.name}</span>
        )
    }
}
export class IconFontt extends React.Component {
    render() {
        return (
            <div className="posRel">
                <span className="iconfont title" onClick={this.props.showMe}>{this.props.name}</span>
                <ul className="libal">
                    <li onClick={this.props.changes}><span>修改密码</span></li>
                    <li onClick={this.props.onClick}><span>注销登陆</span></li>
                </ul>
            </div>
        )
    }
}

export class HeaderIf extends React.Component {
    render() {
        return (
            <span
                className="alignCenter">{this.props.name}{this.props.numBer !== "" ? '(' + this.props.numBer + ')' : ''} </span>
        )
    }
}
export class ModalBg extends React.Component {
    render() {
        const disBlcok ={
            display:"block",
        }
        const disNone ={
            display:"none",
        }
        return (
             //<div className="modal" style={moadlStyle}>
                 <div className="modalBg" style={this.props.dis?disBlcok:disNone}>

                 </div>
             //</div>
        )
    }
}



