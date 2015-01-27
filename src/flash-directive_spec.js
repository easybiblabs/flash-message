require('angular-bsfy');
require('angular-mocks');

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

      it('waits 3 seconds by default, then turns off visible', function() {
        $scope.$emit('flash:message', []);
        $timeout.flush(3000);
        $scope.visible.should.equal(false);
      });

      it('waits 1 second when configured, then turns off visible', function() {
        $scope.$emit('flash:message', [], 1000);
        $timeout.flush(1000);
        $scope.visible.should.equal(false);
      });

      it('waits 4 seconds, then empties the messages array', function() {
        $scope.$emit('flash:message', []);
        $timeout.flush(4000);
        $scope.messages.length.should.equal(0);
      });
    });
  });
});
