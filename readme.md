
ceshi 
测试环境

    目录：cd webServer/yunxian/ceshi
    网址:www.beidouchaxun.cn
    ip:121.43.165.81
    端口:8090,
    启动命令：pm2 start ceshi


    生产环境

    生产服务器
    目录：cd webServer/prop/yunxian
    网址:www.toumingxiuche.cn
    ip:116.62.162.134
    端口:8099,
    启动命令：pm2 start prop


    静态资源服务
    目录：cd webServer/yunxian/ceshi
    网址:www.toumingxiuche.cn
    ip:116.62.162.134
    端口:8099,
    启动命令：pm2 start ceshi


文件目录 （开发）：
 .gitignore                             配置
│  .project                             ～
│  a.js                                 ～
│  index.html                           url主入口文件用来回应接口并响应一个html文件加载响应模块js
│  package.json                         包管理器配置文件
│  packagef-lock.json                   ～
│  server.js                            服务器入口文件，配置接口服务及端口监听
│  test1.json                           热地图数据
│  webpack.config.js                    ～
│
├─api                                   开发环境API代理模块    联机调试projjj改为false并修改相应的IP地址和端口号
│      index.js                         主要代理app接口
│      indexs.js                        主要代理pc端接口
│      tpi.js                            ～
│
├─ceshiceshiceshi                       ～
│
│
├─common                                公用文件
│  │  alertMore.js                       ～
│  │  app.js                            全局公用父组件，主要配置所有公共方法，组件及公共效果
│  │  rem_.js                           动态计算rem值
│  │
│  ├─assembly                           公共组件
│  │      Logical.js
│  │      scroll.js
│  │      someAssembly.js
│  │      somejs.js
│  │      Stateless.js
│  │
│  ├─baseFun                            公共方法
│  │      smallFunction.js
│  │      someEvent.js                  这里配置了页面滑动的事件，根据需求可以自行修改，切记几个回调，可能会影响全局
│  │      verification.js               VIN码校验
│  │      wxSDK.js                       ～
│  │
│  ├─basePage                           公用页面，输出一个完整的页面 ，路由直接指向这里即可
│  │      about.js                      关于我们
│  │      changePosword.js              修改密码
│  │      login.js                      登陆页
│  │
│  ├─css                                组件及公用css
│  │  │  css.js
│  │  │  Logical.css                    assembly下Logical.js
│  │  │  map.css
│  │  │  Stateless.css                  assembly下Stateless.js
│  │  │  style.css                      全局css配置
│  │  │
│  │  ├─assembly
│  │  │      someAssembly.css           assembly下someAssembly。js
│  │  │
│  │  └─basePage                        basePage下相应css
│  │          about.css
│  │          changePosword.css
│  │          login.css
│  │
│  └─images                              公共图片
│      └─basePage                        basePage下相应的图片
├─config                                 主要为高的和微信的配置
│      GDConfig.js                       高德配置
│      jweixin-1.0.0.js
│      OCR.js
│      verification.js
│      WXConfig.js                        微信配置
│      wxFun.js
│
├─integral                                积分排行
│  │  index.js
│  │
│  ├─components
│  │      DSYList.js
│  │      home.js
│  │
│  └─public
│      └─css
│              base.css
│
├─laoke                                   及时聊天工具基于ws
│  │  index.js
│  │
│  └─css
│          css.css
│
├─lexiuApp                                 修理厂
│  └─src
│      ├─css
│      │      app.css
│      │
│      ├─img
│      │  └─newImg                         由于某些原因新页面如home的图片放在了这里，无需理会反正打包后都在一起了
│      └─js
│          │  app.js                       这里配置了路由
│          │  package.json                  ～
│          │  rem_.js                      ～
│          │
│          ├─common                         当前模块的公用组件
│          │  │  Logical.js
│          │  │  Stateless.js
│          │  │
│          │  └─css                          css
│          │          css.css
│          │          Logical.css
│          │          Stateless.css
│          │
│          ├─commonComponent                 ～
│          │      common.js
│          │      cookieJs.js
│          │
│          ├─components
│          │  │  carDetales.js                公用车辆信息 未使用（url中:lexiuApp改成fomeXLC即可查看）
│          │  │  carList.js                   案件列表
│          │  │  changePosword.js              ～
│          │  │  check.js                      ～
│          │  │  check_detail.js               查勘详情
│          │  │  check_details.js              车辆详情
│          │  │  check_image.js                 查看图片
│          │  │  details.js                    三种操作：接车，查勘，维修完成，未使用（url中:lexiuApp改成fomeXLC即可查看）
│          │  │  home.js                        首页
│          │  │  Login.js                       ～
│          │  │  receive.js                     ～
│          │  │  receive_detail.js              接车
│          │  │  receive_details.js             接车详情
│          │  │  service.js                     ～
│          │  │  service_detail.js               维修
│          │  │  service_details.js              维修详情
│          │  │  service_image.js               图片
│          │  │
│          │  └─home
│          │          couponDetails.js           优惠券详情
│          │          couponHistory.js            优惠券历史
│          │          index.js                    修理厂首页
│          │          pay.js
│          │          recharge.js
│          │          Setup.js                    设置 修改密码操作
│          │
│          └─weixnphoto
│                  jweixin-1.0.0.js
│                  weixinpic.js
│
├─loveCarRepair                                   车主端
│  └─src
│      ├─css
│      │      index.css
│      │      index2.css
│      │      style.css
│      │      weui.css
│      │
│      ├─img
│      └─js
│          │  cookieJs.js
│          │  index.js
│          │  rate.js
│          │  rem_.js
│          │  zepto.min.js
│          │
│          ├─beifen
│          │  ├─new
│          │  │      repairDetails.js
│          │  │      repairDiscuss.js
│          │  │      repairRecord.js
│          │  │
│          │  └─old
│          │          repairDetails.js
│          │          repairDiscuss.js
│          │          repairRecord.js
│          │
│          ├─common
│          │      baseComponent.css
│          │      baseComponent.js
│          │      nowFunction.js
│          │
│          ├─components
│          │  │  leCheHelp.js
│          │  │  login.js                             扫码登录
│          │  │  message_login.js                      手机号及vin码登录
│          │  │  repairDetails.js                      案件详情
│          │  │  repairDiscuss.js                      评分
│          │  │  repairRecord.js                        首页
│          │  │
│          │  └─home
│          │          aboutMyCar.js                       关于
│          │          Coupon.js                           优惠券
│          │          index.js                            home首页
│          │          SetUp.js                            设置，解绑操作
│          │
│          └─weixin
│                  jquery.min.js
│                  jweixin-1.0.0.js
│                  weixinpic.js
│
├─mapForOther                                          外部查勘地图 http://www.beidouchaxun.cn/server/server/pc/文件名
│      mapMak.html                                        点
│      mapQ.html                                        圈
│      relitu.html                                        热
│
├─newBuild                                            保险公司
│  └─src
│      ├─css
│      │      home.css
│      │      IntegralRecord.css
│      │      recovery.css
│      │      style.css
│      │      weui.css
│      │      weui.min.css
│      │
│      ├─img
│      └─js
│          │  cookieJs.js
│          │  iconfont.js
│          │  index.js
│          │  rem_.js
│          │  zepto.min.js
│          │
│          ├─assembly
│          │  │  baseParts.js
│          │  │  showEWM.js                         二维码 注意：微信公众号的appid
│          │  │  Stateless.js
│          │  │
│          │  └─css
│          │          stateless.css
│          │
│          ├─components
│          │  │  caseInfo.js                         创建推修
│          │  │  checkPhotograph.js
│          │  │  details.js
│          │  │  Login.js
│          │  │  loseInfo.js                          这里链接了repairState的详情页面，
│          │  │  query.js
│          │  │  record1.js                             首页
│          │  │  vehicleInfo.js                        地图
│          │  │
│          │  ├─home
│          │  │      changePosword.js                   ～
│          │  │      changePoswords.js
│          │  │      home.js                            主页
│          │  │      IntegralRecord.js                  积分记录
│          │  │      SetUp.js                           设置 主要就是修改密码
│          │  │
│          │  ├─inquiry
│          │  │      accessories.js                     配件询价
│          │  │      addInquiry2.js                        添加询价订单
│          │  │      BJXX.js                            报价列表信息
│          │  │      forecast.js                         管理费预测
│          │  │      index.js
│          │  │      info.js                             询价详情
│          │  │      list.js                              询价泪飙
│          │  │      recoveryParts.js                    选零件
│          │  │
│          │  ├─purchase                                  采购
│          │  │      addXlc.js                             添加修理厂
│          │  │      index.js                                 父
│          │  │      info.js                                详情
│          │  │      list.js                                列表
│          │  │      orderOk.js                              下单成功
│          │  │      partsBuy.js                            选择下单零件
│          │  │
│          │  └─recovery                                     残件
│          │          addRecovery.js                         添加残件
│          │          caseInfo.js                            案件信息
│          │          index.js                               父
│          │          list.js                                残件列表
│          │          orderInfo.js                           订单详情
│          │          uploadImg.js                           上传照片
│          │
│          └─weixin
│                  jweixin-1.0.0.js
│
├─pc                                        地址：http://www.beidouchaxun.cn/server?action=相应文件名
│  │  index.js
│  │  peijianDS.html
│  │
│  ├─Accessories                                    配件询价
│  │  │  index.js
│  │  │
│  │  ├─components
│  │  │      carInfo.js
│  │  │      peijianDs1.js
│  │  │
│  │  ├─css
│  │  │      carInfo.css
│  │  │      peijianDs.css
│  │  │
│  │  └─statelessComponent
│  │          carInfo.js
│  │          offerList.js
│  │
│  ├─repairPlant                                    短信短链接，
│  │  │  index.js
│  │  │
│  │  ├─css
│  │  │      repairPlant.css
│  │  │
│  │  └─images
│  │      └─bxgs
│  ├─selectPart                                     配件查询，
│  │  │  base.js
│  │  │  index.js
│  │  │  recoveryParts.js
│  │  │
│  │  └─css
│  │          style.css
│  │
│  └─xlcMap
│      │  index.js
│      │
│      ├─assembly
│      │      map.js
│      │
│      └─selectXlc
│              index.js
│              style.css
│
├─repairState                                           运营页面
│  └─src
│      ├─css
│      │      style.css
│      │
│      ├─img
│      └─js
│          │  cookieJs.js
│          │  iconfont.js
│          │  index.js
│          │  rem_.js
│          │
│          ├─assembly
│          │      baseParts.js
│          │      showEWM.js
│          │
│          ├─commonComponent
│          │      common.js
│          │      cookieJs.js
│          │
│          ├─components
│          │  │  carInfo.js                              订单=》案件基本信息
│          │  │  caseInfo.js
│          │  │  changePosword.js
│          │  │  detail.js
│          │  │  home.js                                 首页
│          │  │  Login.js
│          │  │  loseInfo.js                              详情=>定损信息
│          │  │  maintainInfo.js                          详情=>照片
│          │  │  partQuote.js
│          │  │  query.js
│          │  │  quote.js                                   详情=>查勘报价
│          │  │  reMark.js
│          │  │  XLCInfo.js                                 修理厂信息
│          │  │
│          │  └─home
│          │          index.js
│          │          Setup.js
│          │
│          ├─weixin
│          │      jweixin-1.0.0.js
│          │
│          └─weixnphoto
│                  jweixin-1.0.0.js
│                  weixinpic.js
│
├─reportStatistics
│
├─serverApi
│  │  index.js                                              服务器接口入口
│  │
│  ├─config
│  │      ConnectDatabase.js                                配置mysql
│  │      wxApi.js                                          微信签名服务
│  │
│  ├─forward
│  │      index.js                                          pc上的部分单页面地址
│  │
│  └─pc
│          index.js                                         pc接口
│
└─webpack
        dev.config.js                                       开环境webpack配置
        pro.config.js
        webpack.config.ceshi.js                             测试环境webpack配置
        webpack.config.js                                   生产环境webpack配置
