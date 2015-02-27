module.exports = (function() {
  'use strict';

  angular.module('flash-message', [
    'pascalprecht.translate'
  ])
    .directive('flashMessage', require('./flash-directive'))
    .factory('FlashMessage', require('./flash-factory'));
})();
