
var $actUrl = "http://localhost/mobile_bdred/";
var $actChanceUrl= $actUrl+"js/extGetBdChance.js";
var $actBdRedUrl= $actUrl+"js/extGetBdRed.js";

/*
var $actUrl = "http://192.168.23.200:8082/smk_activity/";
var $actChanceUrl= $actUrl+"extGetBdChance.ext";
var $actBdRedUrl= $actUrl+"extGetBdRed.ext";
*/

var $ = function(el){
  return document.querySelector(el);
}

var alert = function(title){  //重写alert方法
	$('.modal-text').innerHTML = title||'';
	$('.modal-overlay').setAttribute('class','modal-overlay modal-overlay-visible');
	$('.modal').setAttribute('class','modal  modal-in');
	$('.modal-buttons').onclick = function(){
		$('.modal-text').innerHTML = '';
		$('.modal-overlay').setAttribute('class','modal-overlay');
		$('.modal').setAttribute('class','modal');
		$('#p3').innerHTML = title;
	}
}

var base64decode = function(str){   //base64解码
    var c1, c2, c3, c4;  
    var i, len, out;  
    len = str.length;  
    i = 0;  
    out = "";  
    while (i < len) {  
        /* c1 */  
        do {  
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];  
        }  
        while (i < len && c1 == -1);  
        if (c1 == -1)   
            break;  
        /* c2 */  
        do {  
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];  
        }  
        while (i < len && c2 == -1);  
        if (c2 == -1)   
            break;  
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));  
        /* c3 */  
        do {  
            c3 = str.charCodeAt(i++) & 0xff;  
            if (c3 == 61)   
                return out;  
            c3 = base64DecodeChars[c3];  
        }  
        while (i < len && c3 == -1);  
        if (c3 == -1)   
            break;  
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));  
        /* c4 */  
        do {  
            c4 = str.charCodeAt(i++) & 0xff;  
            if (c4 == 61)   
                return out;  
            c4 = base64DecodeChars[c4];  
        }  
        while (i < len && c4 == -1);  
        if (c4 == -1)   
            break;  
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);  
    }  
    return out;  
}  

var L = location.href;
var BASE = L.slice(0,L.lastIndexOf('/')+1);

//纯粹页面跳转
var ua = window.navigator.userAgent;
if(ua.toLowerCase().indexOf("micromessenger") > -1)  //微信打开
{
    location.href = BASE + 'download.html';
}

else if(location.hash != '#smkV3.4.1'){  //有交互老版本App打开，提示用户更新
	//alert('请下载最新版APP')

	$('#p3').innerHTML = '地址：'+location.href+'本活动仅针对app3.4.1版本及以上用户参与，'+ (location.hash.indexOf('smkV3.3') == -1 ? '<a href="smknative:openAppstore()">点击此处</a>':'请') +'升级至最新版。';
}

/*
else if(location.href.split('?')[1] != undefined && location.href.split('?')[1] != 'smkV3.4.1'){  //有交互老版本App打开，提示用户更新
	$('#p3').innerHTML = '地址：'+location.href+'本活动仅针对app3.4.1版本及以上用户参与，'+ (location.href.indexOf('smkV3.3') == -1 ? '<a href="smknative:openAppstore()">点击此处</a>':'请') +'升级至最新版。';
}
*/

else{
	var smkApp = angular.module('smkApp',['ngSanitize']); //先把应用定义成一个模块名
	smkApp.controller('Main',function($scope,$timeout,$http){ //主控制器
	            var userData = {redCode:8888} //传递给后台的数据
				window.getDataFromApp = function(data){
					//判断是否有抽奖机会
					var o = JSON.parse(data);
					userData.userId = o.userId;
					userData.userName = o.userName;
					userData.userNo = o.userMobile;
					if(o.userId == '' || o.userId == undefined){ //需要登录
					    $('.load').style.display = 'none';
						$('.login').style.display = 'block';				  
					}
					else{
						$http.post($actChanceUrl,userData).success(function(data_){
							if(data_.code == 0){
								  if(data_.response.surplus > 0){  //有抽奖机会
										$scope.init();
									  }	
									  else { //无抽奖机会
										  $('._rule_bg').style.display = 'block';
										  $('._rule').style.display = 'block';									  
										 $('.load').style.display = 'none';
						                 $('.sorry').style.display = 'block';				  
									  }									
							}
							else{
								alert(data_.msg);
								//location.href = BASE + 'sorry.html';	
							}
						  
						}).error(function(data_) {
						});							
					}	
				}
			  $scope.init = function(){ //初始化
			      $('.load').style.display = 'none';
				  $scope.win = false;
				  $scope.beforeOpen = true;
				  $('.main').style.display = 'block';
				  $('._rule_bg').style.display = 'block';
				  $('._rule').style.display = 'block';
			  };	
			  		  
			  $scope.reset = function(){ //初始化
			      $('.load').style.display = 'block';
				  $scope.win = false;
				  $scope.beforeOpen = false;
				  $('.main').style.display = 'none';
				  $('._rule_bg').style.display = 'none';
				  $('._rule').style.display = 'none';
			  };
			  
			  $scope.open = function(){ //开奖动作
				  $timeout(function(){ 
					$scope.beforeOpen = false;
					$('.envelope').style.overflow = 'hidden';
					$http.post($actBdRedUrl,userData).success(function(data){
						if(data.code == '0'){  //中奖了
						  $scope.success(data.response.money);
						  $('.open').style.display = 'none';
						}
						else if(data.code == '-1001'){  //没有中奖
						  $scope.loose();
						  $('.open').style.display = 'none';
						}
						else if(data.code == '-1003'){  //没有中奖
						  $scope.reset();
						  $('.done').style.display = 'block';
						  $('.done_p').innerHTML = data.msg;
						}	
						else{
							$scope.reset();
							alert(data.msg);
						}
					}).error(function(data){});	
				  },880);
			  };
			  
			  $scope.openRule = function(){ //打开规则
					$scope.rule = true;
			  };
			  
			  $scope.closeRule = function(){ //关闭规则
					$scope.rule = false;
			  };
			  
			  $scope.success = function(money){ //中奖
					$scope.win = true;
					$scope.money = money||0;
			  };	  
		
			  $scope.loose = function(){ //无奖
					$scope.fail = true;
			  };	
	})	
}

//打开动画
$('.open').onclick = function(){
   var self = this;
   this.setAttribute('class','open flip animated');
   setTimeout(function(){
	self.setAttribute('class','open zoomOut animated');
   },780)
}