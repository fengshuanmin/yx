import React from 'react';
import $ from 'jquery';
var cs = "";
//数据缓存区
var images = {
	localId : [],// 本地id
	serverId : [],// 微信服务器id
	addr : [],// 地点
	date : [],// 时间
	type : [],// 类别
};
var req = {
	taskId : "",
	tasktype : '',// 任务类型：2 查勘 还是3维修 维修结束时，设为4
	taskProgress : '',// 进度：3 维修待命 4钣金喷漆，5维修结束
	reportNo : '',// 报案号
	userName : '',
	passWord : '',
}
// 缓存本地id
var localdata = {
		type : "",
		localid : "",
		addr : "",
		date : "",
		flag : 0,
}
var addresscount=0;//地理位置缓存
var uploadTimer=0;//上传定时器
var chooseTimer=0;//选择照片定时器
var signature, openid, flag, appid;
/*$(function() {
	signature = $("#signature").val();
	openid = $("#openid").val();
	flag = $("#flag").val();
	appid = $("#appid").val();
	wx.config({
		debug : false,
		appId : appid,// 微信appid
		timestamp : 1425952357,// 时间戳
		nonceStr : 'OMIE75rRCpMq2540',// 随机数
		signature : signature,// 签名,
		jsApiList : [
		    'chooseImage',
			'uploadImage',
			'getLocation',
		]
	});
	wx.ready(function() {
	});
	//隐藏右上角菜单接口
    wx.hideOptionMenu();
})*/
// 获取位置信息
function getaddr() {
	// 获取位置信息
	wx.getLocation({
		type : 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
		success : function(res) {
			var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
			var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
			var speed = res.speed; // 速度，以米/每秒计
			var accuracy = res.accuracy; // 位置精度
			var ppp = latitude + "," + longitude;
			var data = {
				location : ppp,// "40.046467,116.30274",
				// 换成自己申请的key
				key : "Q3JBZ-4DZRG-UIZQT-IPPNJ-2HUUF-SNB4G",
				get_poi : 0
			}
			var url = "http://apis.map.qq.com/ws/geocoder/v1/?";
			data.output = "jsonp";
			$.ajax({
				type : "get",
				dataType : 'jsonp',
				data : data,
				jsonp : "callback",
				jsonpCallback : "QQmap",
				url : url,
				success : function(json) {
					images.addr.push(json.result.address);
				},
				fail : function(res) {
					images.addr.push("定位失败");
					
				}
			})
		}
	});
}

// 上传照片
function uploadphoto(values) {// 本地缓存数组
	if (values instanceof Array) {
		if (values.length > 0) {
			$.each(values, function(i, n) {
				images.type.push(n.type);
				images.addr.push(n.addr);
				images.date.push(n.date);
				wx.uploadImage({
					localId : n.localid,
					isShowProgressTips : 1, // 默认为1，显示进度提示
					success : function(res) {
						uploadTimer++;
						images.serverId.push(res.serverId);
						//updateflag(taskid, n.localid);// 更新上传标记
					},
					fail : function(res) {
						alert("上传照片失败！请新上传...");
					}
				});
			});
		}
	}
}
//上传照片
function uploadphoto1(values) {// 本地缓存数组
	if (values instanceof Array) {
		if (values.length > 0) {
			var val = values[0];
			var loc = val.localid;
			images.type.push(val.type);
			images.addr.push(val.addr);
			images.date.push(val.date);
			wx.uploadImage({
		        localId: loc, // 需要上传的图片的本地ID，由chooseImage接口获得
		        isShowProgressTips: 1, // 默认为1，显示进度提示
		        success: function (res) {
		        	uploadTimer++;
		        	images.serverId.push(res.serverId); // 返回图片的服务器端ID
		        	values.shift();
		            uploadphoto1(values);
		        },
		        fail: function (res) {
		            $.alert('上传失败，请重新上传！');
		        }
		    });
		}
	}
}


// array--->>to string
function arrtostr(arr) {
	var str = '';
	if(arr instanceof Array){
		if(arr.length>0){
			$.each(arr, function(i, n) {
				if (arr.length - 1 == i) {
					str += n;
				} else {
					str += (n + ",");
				}
			})
		}
	}
	return str;
}

//存照片本地id 存对象，key 为taskid 值为对象，属性包括localId本地id,type照片类型,
//addr拍照时的地理位置,date拍照时间,flag上传标记0未上传1已上传
function uploadlocId(type, localid,date,flag, taskid) {
	//先读缓存
	var ff = true;
	if (window.localStorage) {// 支持本地存储
		var lavarr=localStorage.getItem(taskid);//json类型数组字符串
		if(lavarr==""||lavarr==undefined ){
			var jsonarr = new Array();
		}else{
			var jsonarr=JSON.parse(lavarr);
			for (var i = 0; i < jsonarr.length; i++){
				var obj = jsonarr[i];
				if(obj.localid == localid){
					ff = false;
				}
			}
		}
		if (ff){
			//缓存对象
			localdata = {
					type : type,
					localid : localid,
					addr : "",
					date : date,
					flag : flag,
				}
			jsonarr.push(localdata);//添加
			//数组转json
			var json_data = JSON.stringify(jsonarr);//对象转json
			localStorage.setItem(taskid, json_data);//存
		}else{
			alert("不可以选择同一张图片");
		}
	}
}

//更改flagupdateflag
function updateflag(taskid,localid){
	if (window.localStorage) {// 支持本地存储
		var lavarr=localStorage.getItem(taskid);//json类型数组字符串
		if(lavarr==""||lavarr==undefined ){
		}else{
			lavarr=JSON.parse(lavarr);
			if (lavarr instanceof Array) {// 判断是否是数组
				if(lavarr.length>0){
					$.each(lavarr,function(i, n) {
						if(n.localid==localid){
							lavarr[i].flag=1;//修改属性值，由未上传改成已上传
						}
					})
				}
			}
			//数组转json
			var json_data = JSON.stringify(lavarr);//对象转json
			localStorage.setItem(taskid, json_data);//存 其实就是覆盖
		}
	}
}

//更改数组的上传标记
function updateflagforarr(taskid,lavarr){
	if (window.localStorage) {// 支持本地存储
		var ttt=localStorage.getItem(taskid);//json类型数组字符串
		var tttt=JSON.parse(ttt);
			if (lavarr instanceof Array) {// 判断是否是数组
				$.each(tttt,function(j, m) {
				if(lavarr.length>0){
					$.each(lavarr,function(i, n) {
						if(n.localid==m.localid){
							tttt[j].flag=1;//修改属性值，由未上传改成已上传
						}
					})
				}
			})
			//数组转json
			var json_data = JSON.stringify(tttt);//对象转json
			localStorage.setItem(taskid, json_data);//存 其实就是覆盖
		}
	}
}
//更改addr
function updateaddr(taskid,localid,addr){
	if (window.localStorage) {// 支持本地存储
		var lavarr=localStorage.getItem(taskid);//json类型数组字符串
		if(lavarr==""||lavarr==undefined ){
		}else{
			lavarr=JSON.parse(lavarr);
			if (lavarr instanceof Array) {// 判断是否是数组
				if(lavarr.length>0){
					$.each(lavarr,function(i, n) {
						if(n.localid==localid){
							lavarr[i].addr=addr;//修改属性值，
						}
					})
				}
			}
			//数组转json
			var json_data = JSON.stringify(lavarr);//对象转json
			localStorage.setItem(taskid, json_data);//存 其实就是覆盖
		}
	}
}


// 格式化时间
Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds()
	}
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}
//删除下标为dx的元素（数组）
Array.prototype.remove=function(dx) 
{ 
    if(isNaN(dx)||dx>this.length){return false;} 
    for(var i=0,n=0;i<this.length;i++) 
    { 
        if(this[i]!=this[dx]) 
        { 
            this[n++]=this[i] 
        } 
    } 
    this.length-=1 
} 

var weixinpic = {
		//重新拍照
		photoagain : function (taskid,localid,n){
			weixinpic.delsessionOrcookie(taskid,localid);//删除
			var dat = {
				taskid : taskid,
				ty : n ,
			}
			weixinpic.photoImage(dat);//拍照
		},
		//删除照片，其实就是删除缓存
		delsessionOrcookie : function (taskid,localid){
			if (window.localStorage) {// 支持本地存储
				var lavarr=localStorage.getItem(taskid);//json类型数组字符串
				var jsonarr=JSON.parse(lavarr);
				//循环取值
				console.log(jsonarr);
				var index="aa";
				if (jsonarr instanceof Array) {// 判断是否是数组
					if(jsonarr.length>0){
						$.each(jsonarr,function(i, n) {
							//把n转成对象
							
							if(n.localid==localid){
								index=i;
							}
						})
					}
				}
				if( index=="aa"){
				}else{
					jsonarr.remove(index);
				}
				//数组转json
				var json_data = JSON.stringify(jsonarr);//对象转json
				localStorage.setItem(taskid, json_data);//存
			}
		},
		//取缓存
		getsessionOrcookie : function (taskid,type){
			if (window.localStorage) {// 支持本地存储
				var lavarr=localStorage.getItem(taskid);//json类型数组字符串
				if(lavarr==""||lavarr==undefined ){
				}else{
					lavarr=JSON.parse(lavarr);
				}
				var retarr = new Array();
				//循环取值
				if(lavarr instanceof Array){
					if(lavarr.length>0){
						$.each(lavarr,function(i, n) {
							if(n.type==type){
								retarr.push(n);//添加
							}
						})
					}
				}
			 return retarr;
			}
		},
		//n 1查勘 2维修  req
		upload : function ( data ) {
			var url = 'aaa';
			var uparr=new Array();
			var arrlength=0;
			var tasktype = "3";
			
			var idzhengarr=[];
			var idfanarr=[];
			var xsarr=[];
			var jsarr=[];
			var chesunarr=[];
			
			var waitrepair= [];
			var banjinrepair=[];
			var overrepair=[];
			if(data.n==1){
				//取
				idzhengarr= weixinpic.getsessionOrcookieforup(data.taskId,"survey_1");
				idfanarr= weixinpic.getsessionOrcookieforup(data.taskId,"survey_2");
				xsarr= weixinpic.getsessionOrcookieforup(data.taskId,"survey_3");
				jsarr= weixinpic.getsessionOrcookieforup(data.taskId,"survey_4");
				chesunarr= weixinpic.getsessionOrcookieforup(data.taskId,"survey_5");
				arrlength=idzhengarr.length+idfanarr.length+xsarr.length+jsarr.length+chesunarr.length;
				//上传
				var surveyList = waitrepair.concat(idzhengarr);
				surveyList = surveyList.concat(idfanarr);
				surveyList = surveyList.concat(xsarr);
				surveyList = surveyList.concat(jsarr);
				surveyList = surveyList.concat(chesunarr);
				uploadphoto1(surveyList);//上传
				url = "/lexiugo-app/weixin/chakan"; 
				tasktype="2";
			}else if(data.n==2){
				//单传判断
				if(data.taskProgress=="3"){
					waitrepair= weixinpic.getsessionOrcookieforup(data.taskId,"repair_1");
					arrlength=waitrepair.length;
					tasktype="3";
					uploadphoto1(waitrepair);//上传
				}else if(data.taskProgress=="4"){
					banjinrepair= weixinpic.getsessionOrcookieforup(data.taskId,"repair_2");
					arrlength=banjinrepair.length;
					tasktype="3";
					uploadphoto1(banjinrepair);//上传
				}else if(data.taskProgress=="5"){
					var overrepair= weixinpic.getsessionOrcookieforup(data.taskId,"repair_3");
					arrlength=overrepair.length;
					tasktype="4";
					uploadphoto1(overrepair);//上传
				}else if(data.taskProgress=="6"){
					waitrepair= weixinpic.getsessionOrcookieforup(data.taskId,"repair_1");
					banjinrepair= weixinpic.getsessionOrcookieforup(data.taskId,"repair_2");
					overrepair= weixinpic.getsessionOrcookieforup(data.taskId,"repair_3");
					arrlength=waitrepair.length+banjinrepair.length+overrepair.length;
					var repairList = waitrepair.concat(banjinrepair);
					repairList = repairList.concat(overrepair);
					if(overrepair.length>0){
						data.taskProgress="5";
						tasktype="3";
					}else if(overrepair.length==0&&banjinrepair.length>0){
						data.taskProgress="4";
						tasktype="3";
					}else{
						data.taskProgress="3";
						tasktype="3";
					}
					uploadphoto1(repairList);//上传
				}
				url = "/lexiugo-app/weixin/weixiu";
			}
			var uptimer = setInterval(function(){
				if(uploadTimer==arrlength){
					uploadTimer=0;
					clearInterval(uptimer);
					if (images.serverId.length == 0) {
						alert('您还没有选择照片！');
						return;
					}
					var idata = {
						taskId : data.taskId,// 任务idreq.taskId,
						imageId : arrtostr(images.serverId),// 照片在微信服务器上的id
						// 照片类型,//"survey_1";//身份证正面 survey_2";//身份证背面 survey_3";
						// 行驶证 survey_4";//驾驶证 survey_5";
						// 车损照 repair_1";//维修待命 repair_2";
						// 钣金结束 repair_3";//维修结束
						type : arrtostr(images.type),// 照片类型
						add : arrtostr(images.addr),// 照片对应的地理位置
						date : arrtostr(images.date),// 照片对于的拍照时间
						tasktype : tasktype,// req.tasktype,//'3',//任务类型：2 查勘 还是3维修 维修结束时，设为4
						taskProgress : data.taskProgress,// req.taskProgress,//'3',//进度：3 维修待命 4钣金喷漆，5维修结束 查勘时。设为3
						reportNo : data.reportNo,// req.reportNo,//'2016080400a',
						userName : data.userName,// req.userName,//'LX19586471',
						passWord : data.passWord,// req.passWord,//'LX19586471',
						openId : openid,
					};
					$.ajax({
						data : idata,
						type : "GET",
						url : url,
						contentType : "application/javascript",
						dataType : "json",
						success : function(msg) {
							if(msg==1){
								if(data.n==1){
									idzhengarr= weixinpic.getsessionOrcookieforup(data.taskId,"survey_1");
									idfanarr= weixinpic.getsessionOrcookieforup(data.taskId,"survey_2");
									xsarr= weixinpic.getsessionOrcookieforup(data.taskId,"survey_3");
									jsarr= weixinpic.getsessionOrcookieforup(data.taskId,"survey_4");
									chesunarr= weixinpic.getsessionOrcookieforup(data.taskId,"survey_5");
									updateflagforarr(data.taskId,idzhengarr);
									updateflagforarr(data.taskId,idfanarr);
									updateflagforarr(data.taskId,xsarr);
									updateflagforarr(data.taskId,jsarr);
									updateflagforarr(data.taskId,chesunarr);
								}else if(data.n==2){
									if(data.taskProgress=="3"){
										waitrepair= weixinpic.getsessionOrcookieforup(data.taskId,"repair_1");
									}else if(data.taskProgress=="4"){
										banjinrepair= weixinpic.getsessionOrcookieforup(data.taskId,"repair_2");
									}else if(data.taskProgress=="5"){
										overrepair= weixinpic.getsessionOrcookieforup(data.taskId,"repair_3");
									}else if(data.taskProgress=="6"){
										waitrepair= weixinpic.getsessionOrcookieforup(data.taskId,"repair_1");
										banjinrepair= weixinpic.getsessionOrcookieforup(data.taskId,"repair_2");
										overrepair= weixinpic.getsessionOrcookieforup(data.taskId,"repair_3");
									}
									updateflagforarr(data.taskId,waitrepair);
									updateflagforarr(data.taskId,banjinrepair);
									updateflagforarr(data.taskId,overrepair);
								}
							}
							// 数组缓存清空
							images = {
								localId : [],// 本地id
								serverId : [],// 微信服务器id
								addr : [],// 地点
								date : [],// 时间
								type : [],// 类别
							};
							if(msg == 1){
								cs = "成功";
								localStorage.setItem("msg", "1");//存
							}else{
								cs = "失败";
								localStorage.setItem("msg", "0");//存
							}
						}
					});
				}
			},200)
		},
		// pic n-->type
		ntoType : function (n) {
			var strtype = "";
			if (n == 1) {// 身份证正
				strtype = "survey_1";
			} else if (n == 2) {// 身份证反
				strtype = "survey_2";
			} else if (n == 3) {// 行驶证
				strtype = "survey_3";
			} else if (n == 4) {// 驾驶证
				strtype = "survey_4";
			} else if (n == 5) {// 车损照。查勘照
				strtype = "survey_5";
			} else if (n == 6) {// 维修待命
				strtype = "repair_1";
			} else if (n == 7) {// 钣金喷漆
				strtype = "repair_2";
			} else {// 维修结束
				strtype = "repair_3";
			}
			return strtype;
		},
		// 拍照或选择照片taskid,num现在只是测试
		photoImage : function (data) {
			// 选择照片
			wx.chooseImage({
				count:1, // 默认9
				sizeType: ['original', 'compressed'],
				sourceType: [''],
				success : function(res) {
					chooseTimer=res.localIds.length;
					$.each(res.localIds,function(i, n) {
						if(i==0){
							getaddr();//获取地理位置
						}
						images.localId.push(n); 
						uploadlocId(weixinpic.ntoType(data.ty), n,new Date().format("yyyy-MM-dd hh:mm:ss"),0, data.taskid);//存缓存 
					});
				},
				fail : function(res) {
					alert("拍照失败！请重新拍照");
				}
			});
			var choicetimer = setInterval(function(){
				if(chooseTimer>0&&images.addr.length>0){
					chooseTimer=0;
					clearInterval(choicetimer);
					//在缓存中添加地理
					$.each(images.localId,
					function(i, n) {
					 updateaddr(data.taskid,images.localId[i],images.addr[0]);
					})
					images.localId=[];
					images.addr=[];
				}
			},200)
		},
		// 上传前取缓存
		getsessionOrcookieforup : function (taskid, type) {
			var upArr = weixinpic.getsessionOrcookie(taskid, type);// 取全部
			var upnewArr = new Array();
			if (upArr instanceof Array) {// 判断是否是数组
				if(upArr.length>0){
					$.each(upArr, function(i, n) {// 遍历
						if (n.flag != 1) {// 取未上传的
							upnewArr.push(n); // 放入新数组
						}
					})
				}
			}
			return upnewArr;
		}
}
export default weixinpic

