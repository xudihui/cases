/**
 * mainApp module
 */
 

var $actUrl = "http://localhost/mobile_bdred_ng/";
var $actChanceUrl= $actUrl+"js/extGetBdChance.js";
var $actBdRedUrl= $actUrl+"js/extGetBdRed.js";
var $ = function(el){
  return document.querySelector(el);
}
var hash = location.hash;
 
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

	$routeProvider.when('/main.do/:video_type', {
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

//已抽奖
mainApp.controller('Parent', ['$scope', '$location', function($scope, $location) {
	          $scope.rule={out:'hide'};

			  $scope.closeRule = function(){ //关闭规则
					$scope.rule.out = 'hide';
			  };			  
}]);



//loading加载
mainApp.controller('Load', ['$scope', '$location', '$http', function($scope, $location, $http) {
                window.userData = {redCode:8888} //传递给后台的数据
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
										$location.path('/main.do/beforeOpen').replace();	
									  }	
									  else { //无抽奖机会
										$location.path('/sorry.do').replace();				  
									  }									
							}
							else if(data_.code == '-1003'){  //没有中奖
							  $location.path('/done.do').replace();
							}								
							else{
								alert(data_.msg);
								//location.href = BASE + 'sorry.html';	
							}
						}).error(function(data_) {
						});							
					}	
				}	
    $scope.gotoAdd = function() {
    	$location.path('/done.do');
    };
}]);

//已抽奖
mainApp.controller('Done', ['$scope', '$location', function($scope, $location) {
    $scope.msg = '感谢！'
}]);

//抱歉
mainApp.controller('Sorry', ['$scope', '$location', function($scope, $location) {
			  $scope.openRule = function(){ //打开规则
					$scope.rule.out = 'show';
			  };
}]);



mainApp.controller('Main',function($scope,$timeout,$http,$location,$routeParams){ //主控制器

				//打开动画
			  $('.open').onclick = function(){
			   var self = this;
			   this.setAttribute('class','open flip animated');
			   setTimeout(function(){
				self.setAttribute('class','open zoomOut animated');
			   },780)
			  }
			  $scope.init = function(flag){ //初始化
				  $scope.open_ = flag;
			      $scope.open_p = flag;
			  };

              $scope.init(true);			  
			  		  
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
						  $scope.init(false);
						}
						else if(data.code == '-1001'){  //没有中奖
						  $scope.loose();
						}
						else if(data.code == '-1003'){  //没有中奖
						  $location.path('/done.do').replace();  //history.replaceState()
						}	
						else{
							$scope.reset();
							alert(data.msg);
						}
					}).error(function(data){});	
				  },880);
			  };
			  


			  $scope.openRule = function(){ //打开规则
					$scope.rule.out = 'show';
			  };
			  
			  
			  $scope.success = function(money){ //中奖
					$scope.win = true;
					$scope.money = money||0;
			  };	  
		
			  $scope.loose = function(){ //无奖
					$scope.fail = true;
					$scope.open_p = false;
					
			  };	
	})	
 
