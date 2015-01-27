module.exports = function FlashDirective($rootScope, $timeout) {
  'use strict';

  var getTemplateUrl = function(element, attr) {
    return attr.templateUrl ? attr.templateUrl : 'src/flash-directive.html';
  };

  var getTimeout = function(timeout) {
    return typeof timeout !== 'undefined' ? timeout : 3000;
  };

  return {
    restrict: 'E',
    replace: true,
    templateUrl: getTemplateUrl,
    controller: ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout) {
      $rootScope.$on('flash:message', function(_, messages, timeout) {
        $scope.messages = messages;
        $scope.visible = true;
        $timeout(function() {
          $scope.visible = false;
        }, getTimeout(timeout));
        $timeout(function() {
          $scope.messages = [];
        }, getTimeout(timeout) + 1000);
      });
    }]
  };
};
