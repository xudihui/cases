/**
 * ¿ØÖÆÆ÷Controller
 */

mainApp.controller('InsuranceListController', ['$scope', '$location', function($scope, $location) {
     
    $scope.gotoAdd = function() {
    	$location.path('/add.do');
    };
  
}]);
