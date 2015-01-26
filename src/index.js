var angular = require('angular-bsfy');
require('angular-translate');

angular.module('flash-message', [
	'flash-message-cache',
	'pascalprecht.translate'
])
	.directive('flashMessage', require('./flash-directive'))
	.factory('FlashMessage', require('./flash-factory'));
