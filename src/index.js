var angular = require('angular-bsfy');

angular.module('flash-message', [])
	.directive('flashMessage', require('./flash-directive'))
	.factory('FlashMessage', require('./flash-factory'));
