define([
	'angular',
	'app/lib/message/flash-directive',
	'app/lib/message/flash'
], function(
	angular,
	FlashDirective,
	FlashService
) {
  'use strict';
  angular.module('flash', [])
    .directive('flashMessages', FlashDirective)
    .factory('Flash', FlashService);
});
