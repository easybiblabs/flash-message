module.exports = function FlashDirective() {
  'use strict';

  return {
    restrict: 'E',
    replace: true,
    templateUrl: function(element, attr) { return attr.templateUrl ? attr.templateUrl : 'src/flash.html' },
    controller: ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout) {
      $rootScope.$on('flash:message', function(_, messages) {
        $scope.messages = messages;
        $scope.visible = true;
        $timeout(function() {
          $scope.visible = false;
        }, 3000);
        $timeout(function() {
          $scope.messages = [];
        }, 4000);
      });
    }]
  };
};
