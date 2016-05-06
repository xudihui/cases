var zfnewApp = angular.module('zfnewApp', [
    'ngRoute'
]);

zfnewApp.config(function($routeProvider) {
    $routeProvider.when('/index', {
        templateUrl: 'Index/index.html',
        controller: 'IndexCtrl'
    }).when('/product_',{
    	templateUrl:'Index/product_.html',
    	controller:'AboutCtrl'
    }).when('/login',{
        templateUrl:'Index/login.html',
        controller:'LoginCtrl'
    }).when('/register',{
        templateUrl:'Index/register.html',
        controller:'RegisterCtrl'
    }).when('/show',{
        templateUrl:'Index/show.html',
        controller:'ShowCtrl'
    }).when('/product',{
        templateUrl:'Index/product.html',
        controller:'ProductCtrl'
    }).otherwise({
        redirectTo: '/index'
    })
});
