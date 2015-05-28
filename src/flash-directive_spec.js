require('angular');
require('angular-mocks');
require('angular-translate');
var flashDirective = require('./flash-directive');

var chai = require('chai');
chai.should();

var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('Directive: flashMessage', function() {
  'use strict';

  describe('#controller', function() {
    var $timeout,
      $rootScope,
      $scope,
      directive = flashDirective(),
      onSpy;

    function setup() {
      inject(function(_$rootScope_, _$timeout_) {
        $timeout = _$timeout_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        if (!onSpy) {
          onSpy = sinon.spy($rootScope, '$on');
        }
        directive.controller[3]($scope, $rootScope, $timeout);
      });
    }

    beforeEach(setup);

    it('adds a listener to rootScope', function() {
      onSpy.should.have.been.calledWith('flash:message', sinon.match.func);
    });

    describe('listener', function() {
      it('sets messages on scope', function() {
        var messages = ['booyah'];
        $scope.$emit('flash:message', messages);
        $scope.messages.should.equal(messages);
        $timeout.flush();
      });

      it('sets visible to true', function() {
        $scope.$emit('flash:message', []);
        $scope.visible.should.equal(true);
        $timeout.flush();
      });

      it('waits 7 seconds, then turns off visible', function() {
        $scope.$emit('flash:message', []);
        $timeout.flush(7000);
        $scope.visible.should.equal(false);
      });

      it('waits 7.5 seconds, then empties the messages array', function() {
        $scope.$emit('flash:message', []);
        $timeout.flush(7500);
        $scope.messages.length.should.equal(0);
      });
    });
  });
});
