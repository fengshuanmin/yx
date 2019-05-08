/**
 * Created by Administrator on 2016/10/14 0014.
 */
/**
 * Created by Administrator on 2016/7/23 0023.
 * 首页
 */
import React from 'react';
//import $ from 'jquery';
import ReactEcharts from 'echarts-for-react'


//var colorList = [
//    '#B5C334','#FCCE10','#E87C25','#27727B',
//    '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
//    '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
//];
//粉 #d87a80     黄 #ffb980 b6a2de    马尔代夫蓝 #2ec7c9
//剩下的两个色值：紫 #b6a2de         天蓝：#5ab1ef

const QuantityStac = React.createClass({
    getInitialState() {
        return {
            option: this.getOption(),
            allData:"",
            dw:""
        };

    },
    componentWillReceiveProps(nextProps) {
        this.setState({allData: nextProps.data,dw:nextProps.dw});
        var option = this.state.option;
        var allData = nextProps.data;
        option.series[0].data=["0","0","0"];
        option.xAxis[0].data = ['推修', '接车', '估损'];
        if (nextProps.dw == "1"){
            option.series[0].itemStyle.normal.label.formatter="{c}辆";
            option.series[0].data[0]=allData.txCount;
            option.series[0].data[1]=allData.jcCount;
            option.series[0].data[2]=allData.gsCount;
        }
        else if(nextProps.dw == "2")
        {
            option.series[0].itemStyle.normal.label.formatter="{c}元";
            option.tooltip.formatter="{b} :<br />{c}元";
            option.yAxis.name="金额";
            option.series[0].data[0]=allData.txMoney;
            option.series[0].data[1]=allData.jcMoney;
            option.series[0].data[2]=allData.gsMoney;
            option.xAxis[0].data[0]="推修金额";
            option.xAxis[0].data[1]="接车金额";
            option.xAxis[0].data[2]="估损金额";
        }
        this.setState({option: option});
    }
,
    getOption() {
        let option = {
            tooltip: {
                trigger: 'axis',
                formatter:"{b} <br />{c}辆",
                position:[45, 80]
            },
            xAxis: [{
                type: 'category',
                data: ['推修', '接车', '估损'],
                axisTick:false,
                //axisLabel: {
                //    interval: 0,
                //    rotate: 50
                //}
            }],
            yAxis: [{
                type: 'value',
                name: '数量',
                axisLabel: {
                    show:false,
                    formatter: '{value}辆'
                },
                //axisTick:false
            }],
            grid: {
                x: "20",
                y: "50",
                x2: "20",
                y2: "30"
            },
            series: [
                {
                    name: '数量统计',
                    type: 'bar',
                    stack: '数量',
                    barWidth:"40%",
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                var colorList = [
                                    '#d87a80','#2ec7c9','#ffb980'
                                ];
                                return colorList[params.dataIndex]
                            },
                            label: {
                                show: true,
                                position: 'top',
                                formatter: '{c}辆',
                                textStyle:{
                                    fontSize: 10
                                }
                            }
                        }
                    },
                    data:["0","0","0"]
                }


            ]
        };
        return option;
    },
    render() {
        let RechStyle = {
            height: "5rem",
            width: "6rem",
            display:"inline-block"
        };
        return (
                <ReactEcharts ref='echarts_react' option={this.state.option} style={RechStyle}/>
        );
    }
})


const CoRanking = React.createClass({
getInitialState() {
    return {
        option: this.getOption(),
        allData:"",
        dw:"",
        RankState:""
    };
},
prosReceive(rankState){
    var option = this.state.option;
        var allData = this.state.allData
        this.setState({RankState:rankState})
        option.series[0].data=[{value:" ",name:" "},{value:" ",name:" "}, {value:" ",name:" "},{value:" ",name:" "},{value:" ",name:" "}]
        option.xAxis[0].data = [' ', ' ', ' ', ' ', ' ']
        if (this.state.dw == "hz"){
            if(rankState=="b"){
                var hzRanking = allData.hzJcMoneyList;
                option.tooltip.formatter = "{b} <br />{c}元";
                option.yAxis[0].name="金额";
                for(var i=0;i<hzRanking.length;i++){
                    option.series[0].data[i].value=hzRanking[i].jcMoney;
                    option.xAxis[0].data[i]=hzRanking[i].xlcName;
                    //option.yAxis[0].axisLabel.formatter='{value}元'
                }
            }else{
                var hzRanking = allData.hzJcCountList;
                option.tooltip.formatter = "{b} <br />{c}辆";
                option.yAxis[0].name="接车";
                for(var i=0;i<hzRanking.length;i++){
                    option.series[0].data[i].value=hzRanking[i].jcCount;
                    option.xAxis[0].data[i]=hzRanking[i].xlcName;
                    //option.yAxis[0].axisLabel.formatter='{value}辆'
                }
            }
                }
        else if(this.state.dw == "fhz")
        {
           if(rankState=="b"){
                var hzRanking = allData.fhzJcMoneyList;
               option.yAxis[0].name="金额";
               option.tooltip.formatter = "{b} <br />{c}元";
               for(var i=0;i<hzRanking.length;i++){
                    option.series[0].data[i].value=hzRanking[i].jcMoney;
                    option.xAxis[0].data[i]=hzRanking[i].xlcName;
                    //option.yAxis[0].axisLabel.formatter='{value}元'
                }
        }else {
               var hzRanking = allData.fhzJcCountList;
               option.tooltip.formatter = "{b} <br />{c}辆";
               option.yAxis[0].name="接车";
               for (var i = 0; i < hzRanking.length; i++) {
                   option.series[0].data[i].value = hzRanking[i].jcCount;
                   option.xAxis[0].data[i] = hzRanking[i].xlcName;
                   //option.yAxis[0].axisLabel.formatter='{value}辆'
               }

           }
            }
        this.setState({option: option});
},
    componentWillReceiveProps(nextProps) {
        this.setState({allData: nextProps.data,dw:nextProps.dw});
        var option = this.state.option,RankState=this.state.RankState;
        if (nextProps.data != "") {
            var allData = nextProps.data;
            option.series[0].data=[{value:" ",name:" "},{value:" ",name:" "}, {value:" ",name:" "},{value:" ",name:" "},{value:" ",name:" "}]
            option.xAxis[0].data = [' ', ' ', ' ', ' ', ' ']
            if (nextProps.dw == "hz") {
                if (RankState == "b") {
                    var hzRanking = allData.hzJcMoneyList;
                    option.yAxis[0].name = "金额";
                    option.tooltip.formatter = "{b} <br />{c}元";
                    for (var i = 0; i <hzRanking.length; i++) {
                        option.series[0].data[i].value = hzRanking[i].jcMoney;
                        option.xAxis[0].data[i] = hzRanking[i].xlcName;
                        //option.yAxis[0].axisLabel.formatter='{value}元'
                    }
                } else {
                    var hzRanking = allData.hzJcCountList;
                    option.tooltip.formatter = "{b} <br />{c}辆";
                    option.yAxis[0].name = "接车";

                    for (var i = 0; i < hzRanking.length; i++) {
                        option.series[0].data[i].value = hzRanking[i].jcCount;
                        option.xAxis[0].data[i] = hzRanking[i].xlcName;
                        //option.yAxis[0].axisLabel.formatter='{value}辆'
                    }
                }
            }
            else if (nextProps.dw == "fhz") {
                if (RankState == "b") {
                    var hzRanking = allData.fhzJcMoneyList;
                    option.tooltip.formatter = "{b} <br />{c}元";
                    option.yAxis[0].name = "金额";

                    for (var i = 0; i < hzRanking.length; i++) {
                        option.series[0].data[i].value = hzRanking[i].jcMoney;
                        option.xAxis[0].data[i] = hzRanking[i].xlcName;
                        //option.yAxis[0].axisLabel.formatter='{value}元'
                    }
                } else {
                    var hzRanking = allData.fhzJcCountList;
                    option.tooltip.formatter = "{b} <br />{c}辆";
                    option.yAxis[0].name = "接车";

                    for (var i = 0; i < hzRanking.length; i++) {
                        option.series[0].data[i].value = hzRanking[i].jcCount;
                        option.xAxis[0].data[i] = hzRanking[i].xlcName;
                        //option.yAxis[0].axisLabel.formatter='{value}辆'
                    }
                }
            }
            this.setState({option: option});
        }
    },
getOption() {
    let option = {
        tooltip: {
            trigger: 'axis',
            formatter:"{b} :<br />{c}辆",
            position:[45, 80]
        },
        xAxis: [{
            type: 'category',
            data: [' ', ' ', ' ', ' ', ' '],
            axisTick:false,
            axisLabel: {
                show:false,
                interval: 0,
                rotate: 50
            }
        }],
        yAxis: [{
            type: 'value',
            name: '数量',
            axisLabel: {
                show:false,
                formatter: '{value}辆'
            },
            //axisTick:false
        }],
        grid: {
            x: "30",
            y: "30",
            x2: "30",
            y2: "20"
        },
        series: [
            {
                name: '数量统计',
                type: 'bar',
                stack: '数量',
                barWidth:"40%",
                data: [{value:" ",name:" "},{value:" ",name:" "}, {value:" ",name:" "},{value:" ",name:" "},{value:" ",name:" "}],
                itemStyle: {
                    //粉 #d87a80     黄 #ffb980    马尔代夫蓝 #2ec7c9
//剩下的两个色值：紫 #b6a2de         天蓝：#5ab1ef
                    normal: {
                        color: function(params) {
                            var colorList = [
                                '#d87a80','#ffb980','#2ec7c9','#b6a2de','#5ab1ef',
                                '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c}'
                        }
                    }
                }
            }


        ]
    };
    return option;
},
render() {
    let RechStyle = {
        height: "5rem",
        width: "6rem",
        display:"inline-block",
    };
    return (
        <div className="CoRankingContainer" >
            <button onClick = {this.prosReceive.bind(this,"") }>接车排名</button>
            <button onClick = {this.prosReceive.bind(this,"b")}>金额排名</button>
            <ReactEcharts ref='echarts_react' option={this.state.option} style={RechStyle} />
        </div>
    );
}
})


const ProportionPie = React.createClass({
getInitialState() {
    return {
        dw:"",
        allData:"",
        option: this.getOption()
    };
},
    componentWillReceiveProps(nextProps) {
        //this.setState({allData: nextProps.dat,dw:nextProps.dw});
        var option = this.state.option;
        if (nextProps.dat != "") {
            var allData = nextProps.dat
            option.legend.data=["品质件","原厂件","适用件","品质件金额","原厂件金额","适用件金额"];
            option.series[0].data = [
                {value:"0", name:"未完成"},
                {value:"0", name:'完成'}
            ];
            option.series[1].data = [
                {value:"0", name:'未完成金额'},
                {value:"0", name:'完成金额'}
            ]
            if (nextProps.dw == "1"){
                //option.series[0].itemStyle.normal.label.formatter="{c}笔\n{d}%"
                //option.legend.data=["直供","非直供","直供金额","非直供金额"];
                option.series[0].data[0].value=allData.unCompleteCase;
                //option.series[0].data[0].name="非直供";
                option.series[0].data[1].value=allData.completeCase;
                //option.series[0].data[1].name="直供";
                option.series[1].data[0].value=allData.unCompletePrice;
                //option.series[1].data[0].name="非直供金额";
                option.series[1].data[1].value=allData.completePrice;
                //option.series[1].data[1].name="直供金额";
            }
            else if(nextProps.dw == "2")
            {
                //console.log(allData.unCompletePart)//
                //console.log(allData.completePart)//
                //console.log(allData.unCompletePrice)//
                //console.log(allData.completePrice)//

                option.series[0].itemStyle.normal.label.formatter="{c}件\n{d}%";
                option.series[0].data[0].value=allData.unCompletePart;
                //option.series[0].data[0].name="非直供";
                option.series[0].data[1].value=allData.completePart;
                //option.series[0].data[1].name="直供";
                option.series[1].data[0].value=allData.unCompletePrice;
                //option.series[1].data[0].name="非直供金额";
                option.series[1].data[1].value=allData.completePrice;
                //option.series[1].data[1].name="直供金额";
            }else if(nextProps.dw == "3")
            {
                //allData=JSON.stringify(allData)
                //console.log(allData)//
                //console.log(allData[0].completePart);
                option.legend.data=["直供","非直供","直供金额","非直供金额"];
                option.series[0].data[0].value=allData.unLaunchCasebt;
                option.series[0].data[0].name="非直供";
                option.series[0].data[1].value=allData.launchCasebt;
                option.series[0].data[1].name="直供";
                option.series[1].data[0].value=allData.unLaunchCasePrice;
                option.series[1].data[0].name="非直供金额";
                option.series[1].data[1].value=allData.launchPrice;
                option.series[1].data[1].name="直供金额";

            }else if(nextProps.dw == "4")
            {
                option.series[0].itemStyle.normal.label.formatter="{c}件\n{d}%";
                option.legend.data=["品质件","原厂件","适用件","品质件金额","原厂件金额","适用件金额"];
                option.series[0].data[0].value=allData.applicableNum;
                option.series[0].data[0].name="适用件";
                option.series[0].data[1].value=allData.factoryNum;
                option.series[0].data[1].name="原厂件";

                //option.series[0].data[2].value=allData.brandNum;
                //option.series[0].data[2].name="品质件";
                option.series[0].data.push({
                    value:allData.brandNum,
                    name:"品质件"
                });
                option.series[1].data[0].value=allData.applicablePrice;
                option.series[1].data[0].name="适用件金额";
                option.series[1].data[1].value=allData.factoryPrice;
                option.series[1].data[1].name="原厂件金额";
                option.series[1].data.push({
                    value:allData.brandPrice,
                    name:"品质件金额"
                });
                //option.series[1].data[2].value=
                //option.series[1].data[2].name=
            }
            this.setState({option: option});

        }
    },
getOption() {
    let option = {
        legend: {
            x:"cneter",
            y:"bottom",
            itemGap:6,
            itemWidth:16,
            textStyle:{
                fontSize:10
            },
            itemHeight:10,
            data:['完成','未完成',"完成金额","未完成金额"]
        },
        series : [
            {
                name:'直供案件占比',
                type:'pie',
                radius : ["45%","60%"],
                center: ['50%', '45%'],
                funnelAlign: 'left',
                data:[
                    {value:"0", name:"未完成"},
                    {value:"0", name:'完成'}
                ],
                itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList = [
                                '#d87a80','#2ec7c9',"#ffb980"
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            formatter: "{c}笔\n{d}%",
                            textStyle:{
                                fontSize: 10
                        }
                        }
                    }
                }
            },
            {
            name:'直供案件金额占比',
            type:'pie',
            center: ['50%', '45%'],
             radius : [0,"40%"],
                funnelAlign: 'right',
        data:[
            {value:"0", name:'未完成金额'},
            {value:"0", name:'完成金额'}
        ],
        itemStyle: {
        normal: {
            color: function(params) {
                var colorList = [
                     '#b6a2de','#5ab1ef','#90ed7d'
                ];
                return colorList[params.dataIndex]
            },
                label: {
                    show: true,
                    position:'inside',
                    formatter: "{c}元",
                    textStyle:{
                        fontSize: 10
                    }
            }
        }
    }
}
        ]
    };
    return option;
},
render() {
    let RechStyle = {
        height: "6rem",
        width: "6rem",
        display:"inline-block",
    };
    return (
            <ReactEcharts ref='echarts_react' option={this.state.option} style={RechStyle}/>
    );
}
});

export {
    QuantityStac,CoRanking,ProportionPie
}

