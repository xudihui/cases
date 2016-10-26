/**
 * mainApp module
 */
var mainApp = angular.module('mainApp', [ 'ngRoute', 'ngResource' ]);

mainApp.config([ '$routeProvider', function($routeProvider) {

	$routeProvider.when('/add.do', {
		templateUrl : 'insurance_add.html',
		controller : 'InsuranceAddController'
	});
	
	$routeProvider.when('/list.do', {
		templateUrl : 'insurance_list.html',
		controller : 'InsuranceListController'
	});

	$routeProvider.otherwise({
		redirectTo : '/list.do'
	});

} ]);
