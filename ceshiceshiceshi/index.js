import React from 'react'
import ReactDOM from 'react-dom'
import {Vivo,Text} from './zujian'
import json from './api'

class AppRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.dataShow=()=>{
            var dom=[]

            for(var i in json.page1){
                var newDom=this.divCC(i,json.page1[i]),childDom=[]
                for(var j=0;j< json.page1[i].child.length;j++){
                    var ddDom=React.cloneElement(this.divCC(j,json.page1[i].child[j]), {
                        childes:[json.page1[i].child[j].value]
                    })
                    childDom.push(ddDom)
                   /* console.log(newDom.props.children)
                    newDom.props.children=[];
                    newDom.props.children.push(this.divCC(j,json.page1[i][j]))
                    console.log(newDom.props.children)*/
                }
                var zsDom=React.cloneElement(newDom, {
                    childes:childDom
                })
                dom.push(zsDom);
                console.log(zsDom)
            }
            this.setState({dom:dom})
        }
        this.divCC=(i,d)=>{
            var aDo;
            switch(d.type){
                case 'div':
                    aDo=<Vivo key={i} style={d.style||{}}></Vivo>
                    break;
                case 'span':
                    aDo=<Text key={i} style={d.style||{}}></Text>
                    break;
                case 'text':
                    aDo=<Text key={i} style={d.style||{}}></Text>
                    break;
            }
            return aDo
        }
    };
    componentDidMount(){
       this.dataShow();
    }
    render() {
        return (
            <div>
                {this.state.dom}
            </div>
        )
    }
}

ReactDOM.render(<AppRouter />, document.getElementById("appWrapper"));