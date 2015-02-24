!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.flashMessage=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('angular');
require('angular-translate');

module.exports = (function() {
  'use strict';

  angular.module('flash-message', [
    'pascalprecht.translate'
  ])
    .directive('flashMessage', require('modules/flash-directive'))
    .factory('FlashMessage', require('modules/flash-factory'));
})();

},{"angular":2,"angular-translate":2,"modules/flash-directive":3,"modules/flash-factory":4}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
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
        }, 3000);
        $timeout(function() {
          $scope.messages = [];
        }, 4000);
      });
    }]
  };
};

},{}],4:[function(require,module,exports){
module.exports = (function() {
  'use strict';

  var icons = {
      error: 'bomb',
      warning: 'exclamation',
      success: 'thumbs-up',
      info: 'paper-plane'
    },
    classNames = {
      error: 'danger',
      warning: 'warning',
      success: 'success',
      info: 'info'
    };

  function Message(text, level) {
    if (typeof text === 'object') {
      var message = text,
        params = message.params;
      text = message.text;
      level = message.level;
    }
    this.text = text;
    this.level = level || 'success';
    this.params = params;
  }

  Message.prototype = {
    icon: function() {
      return icons[this.level];
    },
    className: function() {
      return classNames[this.level];
    }
  };

  function toArray(args) {
    return Array.prototype.slice.call(args, 0);
  }

  function map(args, level) {
    return toArray(args).map(function(text) {
      return new Message(text, level);
    });
  }

  function FlashService($rootScope) {
    function emit(messages) {
      $rootScope.$emit('flash:message', messages);
    }

    function flash() {

    }

    angular.extend(flash, {
      error: function() {
        emit(map(arguments, 'error'));
      },
      warning: function() {
        emit(map(arguments, 'warning'));
      },
      info: function() {
        emit(map(arguments, 'info'));
      },
      success: function() {
        emit(map(arguments, 'success'));
      }
    });

    return flash;
  }

  return FlashService;
}());

},{}]},{},[1])(1)
});