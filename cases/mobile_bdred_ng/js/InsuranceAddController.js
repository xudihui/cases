/**
 *	¿ØÖÆÆ÷Controller
 */

mainApp.controller('InsuranceAddController', ['$scope', '$location', function($scope, $location) {

    $scope.gotoList = function() {
    	$location.path('/list.do');
    };
 
}]);