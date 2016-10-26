
var $actUrl = "http://localhost/mobile_bdred/";
var $actChanceUrl= $actUrl+"js/extGetBdChance.js";
var $actBdRedUrl= $actUrl+"js/extGetBdRed.js";
	
var $ = function(el){
  return document.querySelector(el);
}

if(localStorage.getItem('userId') == null){
	localStorage.setItem('userId',13000000001);
}
else{
	var userId = localStorage.getItem('userId');
	localStorage.setItem('userId',userId == '13000000200' ? 13000000001 : ++userId);
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

var L = location.href;
var BASE = L.slice(0,L.lastIndexOf('/')+1);

//纯粹页面跳转
var ua = window.navigator.userAgent;
if(ua.toLowerCase().indexOf("micromessenger") > -1)  //微信打开
{
    location.href = BASE + 'download.html';
}
else if(location.hash != '#smkV3.4.1'){  //老版本App打开，提示用户更
	//alert('请下载最新版APP')
	$('#p3').innerHTML = '本活动仅针对app3.4.0版本及以上用户参与，<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.smk">点击此处</a>升级至最新版'
}
else{
	var smkApp = angular.module('smkApp',['ngSanitize']); //先把应用定义成一个模块名
	smkApp.controller('Main',function($scope,$timeout,$http){ //主控制器
				var userData = {redCode:8888}; //传递给后台的数据
				var o = {};
				var VALIDATE = { //校验正则
					mobile:/^0?1[3-8|4|5|7|8][0-9]\d{8}$/,  //手机号码校验
					english:/^[A-Za-z]+$/,  //纯英文校验
					card:/^[0-9a-zA-Z]*$/   //纯英文或者纯数字或者英文数字组合，适用于卡号校验
				};
				$scope.userId = userId;
				window.getMessageFromApp = function(data){
					//判断是否有抽奖机会
					o = JSON.parse(data);
					userData.userId = o.userId;
					userData.userName = o.userId;
					userData.userNo = o.userName;
					$scope.userId = o.userId;					
					alert('App传值成功,userId:'+o.userId);
				}


			  $scope.test = function(){ //初始化
			        if(!VALIDATE.mobile.test($scope.userId)){
						alert('手机号码格式有误！请重新输入测试');
						return;
					}
			        userData.userId = $scope.userId;
					userData.userName = $scope.userId;
					userData.userNo = $scope.userId;
					if($scope.userId == '' || $scope.userId == undefined){ //需要登录
						$('.load').style.display = 'none';
						$('.login').style.display = 'block';				  
					}
					else{
						$http.post($actChanceUrl,userData).success(function(data_){
							if(data_.code == 0){
								  if(data_.response.surplus > 0){  //有抽奖机
										$scope.init();
									  }	
									  else { //无抽奖机
										location.href = BASE + 'sorry.html';					  
									  }									
							}
							else{
								alert(data_.msg);
								//location.href = BASE + 'sorry.html';	
							}						  
						}).error(function(data_) {
						});							
					}
			  };					

			  $scope.reset = function(){ //重置
			      localStorage.setItem('userId',13000000001);
				  $scope.userId = 13000000001;
			  };	
			  
			  $scope.init = function(){ //初始
			      $('.load').style.display = 'none';
				  $scope.win = false;
				  $scope.beforeOpen = true;
				  $('.main').style.display = 'block';
			  };			  
			  
			  $scope.open = function(){ //开奖动
				  $timeout(function(){ 
					$scope.beforeOpen = false;
					$('.envelope').style.overflow = 'hidden';
					$http.post($actBdRedUrl,userData).success(function(data){
						if(data.code == '0'){  //中奖
						  $scope.success(data.response.money);
						}
						else{  //没有中奖
						  $scope.loose();
						}
					}).error(function(data){});	
				  },880);
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