import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
require('./css/css.css')
export default class AppRouter extends React.Component {
    constructor(props){
        super(props);
        this.state={data:[]};
        this.duiTa=()=>{
            var massage=this.refs.table.innerHTML;
            var name=this.refs.inputvalue.value;
            $.post('http://beidouchaxun.cn/server/callMe',{id:this.state.id,massage:massage,sendId:this.state.id,name:name},(dat)=>{
                alert(dat.msg)
                this.refs.table.innerHTML='';
            })
            alert($('body').text().length)
            setTimeout(()=>{

            },1000)

        }
    };
    componentDidMount(){
        var r = Math.random() * (100 - 1);
        var re = Math.round(r + 1);
        re = Math.max(Math.min(re, 100), 1)
        var ws = new WebSocket("ws://121.43.165.81:8182");
        ws.onopen =  (e)=>{
            var sWS={name:'狗蛋'+re}
            var newJson=JSON.stringify(sWS);
            ws.send(newJson);
            this.setState({wse:ws})
        }
        ws.onmessage =  (e)=>{
            var data=this.state.data;
            var newMes=JSON.parse(e.data);
            console.log(newMes)
            if(newMes.type=='jd'){
                this.setState({id:newMes.id})
            }else{
                data.push(newMes)
                this.setState({data:data},()=>{
                    this.refs.masages.scrollTop=this.refs.masages.scrollHeight
                })
            }
        };
        document.onkeyup = (e)=>{
            var code = e.charCode || e.keyCode;
            if (code == 13) {
                this.duiTa();
            }
        }
    };
    render() {
        return (
            <div>
                <div className="masages" ref="masages">
                    <ul>
                        {
                            this.state.data.map((item,index)=>{
                                return(
                                    <li key={index} className={item.isMe ? 'myselfe' :'other'}>
                                        <div>
                                            <h4>{item.name}</h4>
                                            <p dangerouslySetInnerHTML={{__html: item.massage}}></p>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <p className="massageValue" ref="table" contentEditable='true' ></p>
                <button style={{background:'blue',color:'#fff',padding:'5px 10px'}} onClick={this.duiTa}>怼他/她/它</button>  <input style={{width:'200px',height:'30px'}} type="text" ref="inputvalue"  placeholder="填写你的名字,默认狗蛋"/>
            </div>
        )
    }
}

ReactDOM.render(<AppRouter />, document.getElementById("appWrapper"));




