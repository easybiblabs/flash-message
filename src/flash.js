define(['angular'], function(angular) {
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
      var args = toArray(arguments).map(function(arg) {
        return new Message(arg);
      });
      emit(args);
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
});
