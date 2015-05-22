module.exports = function FlashDirective() {
  'use strict';

  var getTemplateUrl = function(element, attr) {
    return attr.templateUrl ? attr.templateUrl : 'src/flash-directive.html';
  };

  return {
    restrict: 'E',
    replace: true,
    templateUrl: getTemplateUrl,
    controller: ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout) {
      $rootScope.$on('flash:message', function(_, messages) {
        $scope.messages = messages;
        $scope.visible = true;
        $timeout(function() {
          $scope.visible = false;
        }, 7000);
        $timeout(function() {
          $scope.messages = [];
        }, 4000);
      });
    }]
  };
};
