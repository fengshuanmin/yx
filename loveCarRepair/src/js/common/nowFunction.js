import $ from 'jquery'
export default {
    unBindCar: (t,func) => {
        $.ajax({
            url: "/lexiugo-app/weixin/evaluation/getEvaluate.do",
            data: {fromFlag: 5, openid: localStorage.getItem("openid")},
            dataType: "json",
            type: "POST",
            success: (msg) => {
                if (msg.dataStr == "1") {
                    // 打开绑定提示
                    var oldState=t.props.project.wxConfig;
                    oldState.plateNo='';oldState.flag=''
                    localStorage.setItem("plateNo", '');
                    localStorage.setItem("flag", '');
                    t.props.project.setProps({
                        wxConfig:oldState,
                        PromptData: {
                            content: '解绑成功', Prompt: true,onlyOK:true, fun: (e,close) => {
                                func ? func() : t.props.history.replaceState({canIn: true}, '/login');
                                close();
                            }
                        }
                    })
                } else {
                    t.props.project.setProps({
                        PromptData: {
                            content: '解绑失败，请稍后重试！', Prompt: true
                        }
                    })
                }
            },
            error: function (eee) {
                t.props.project.setProps({
                    PromptData: {
                        content: '网络异常，请稍后重试！', Prompt: true
                    }
                })
            }
        })
    }
}
