defaultApp.factory('AppFactory', function($rootScope) {
	return { 
  }

});


function GlobalCtrl ($scope, AppFactory) {

 
}


function AppCtrl ($scope) {
  $scope.setActive = function (type) {
    $scope.destinationsActive = '';
    $scope.flightsActive = '';
    $scope.reservationsActive = '';

    $scope[type + 'Active'] = 'active';
  }



}