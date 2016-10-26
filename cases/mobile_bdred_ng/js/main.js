/**
 * mainApp module
 */
 

var $actUrl = "http://localhost/mobile_bdred/";
var $actChanceUrl= $actUrl+"js/extGetBdChance.js";
var $actBdRedUrl= $actUrl+"js/extGetBdRed.js";
var $ = function(el){
  return document.querySelector(el);
}
 
var mainApp = angular.module('mainApp', [ 'ngRoute', 'ngResource' ]);

mainApp.config([ '$routeProvider', function($routeProvider) {
	
	$routeProvider.when('/sorry.do', {
		templateUrl : 'sorry.html',
		controller : 'Sorry'
	});
	
	$routeProvider.when('/login.do', {
		templateUrl : 'login.html',
		controller : 'Login'
	});

	$routeProvider.when('/main.do', {
		templateUrl : 'main.html',
		controller : 'Main'
	});

	$routeProvider.when('/done.do', {
		templateUrl : 'done.html',
		controller : 'Done'
	});
	
	$routeProvider.when('/load.do', {
		templateUrl : 'load.html',
		controller : 'Load'
	});	


	$routeProvider.otherwise({
		redirectTo : '/load.do'
	});

} ]);


//loading加载
mainApp.controller('Load', ['$scope', '$location', '$http', function($scope, $location, $http) {
                var userData = {redCode:8888} //传递给后台的数据
				getDataFromApp = function(data){
					//判断是否有抽奖机会
					var o = JSON.parse(data);
					userData.userId = o.userId;
					userData.userName = o.userName;
					userData.userNo = o.userMobile;
					if(o.userId == '' || o.userId == undefined){ //需要登录
					   $location.path('/login.do');
					}
					else{
						$http.post($actChanceUrl,userData).success(function(data_){
							if(data_.code == 0){
								  if(data_.response.surplus > 0){  //有抽奖机会
										$location.path('/main.do');	
									  }	
									  else { //无抽奖机会
										$location.path('/sorry.do');				  
									  }									
							}
							else if(data_.code == '-1003'){  //没有中奖
							  $location.path('/done.do');
							}								
							else{
								alert(data_.msg);
								//location.href = BASE + 'sorry.html';	
							}
						  
						}).error(function(data_) {
						});							
					}	
				}	
    getDataFromApp('{"userId": "13000000200", "userName": "13000000022", "userNo": "13000000022"}')
    $scope.gotoAdd = function() {
    	$location.path('/done.do');
    };
}]);

//已抽奖
mainApp.controller('Done', ['$scope', '$location', function($scope, $location) {
     
    $scope.msg = '感谢！'
}]);

mainApp.controller('Main',function($scope,$timeout,$http,$location){ //主控制器
	           
			  $scope.init = function(){ //初始化
				  $scope.win = false;
				  $scope.beforeOpen = true;
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
 
