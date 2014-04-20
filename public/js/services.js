angular.module('defaultAppServices', ['ngResource'])
	.factory('Airport', function  ($resource) {
		return $resource('/airports/:airportCode');
	})
	.factory('Flights', function  ($resource) {
		return $resource('/flights');
	})
	.factory('Reservations', function  ($resource) {
		return $resource('/reservations');
	});