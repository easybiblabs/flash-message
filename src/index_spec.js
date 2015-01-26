require('./index');
require('angular-mocks');

var chai = require('chai');
chai.should();

describe('Directive: flashMessages', function() {
  'use strict';

  var $scope, $rootScope, setScopeAndCompile, $timeout, $compile;
  var fixture = '<flash:message></flash:message>';

  beforeEach(window.angular.mock.module('karma.templates'));
  beforeEach(window.angular.mock.module('flash-message'));

  beforeEach(inject(function(_$rootScope_, _$compile_, _$timeout_) {
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
    $compile = _$compile_;

    $scope = $rootScope.$new();
    setScopeAndCompile = function() {
      $compile(fixture)($scope);
      $scope.$apply();
    };
  }));

  it('should exist', function() {
    setScopeAndCompile();
    expect($scope).to.not.have.property('messages');
  });

  describe('a message', function() {

    var messages = [
      {
        level: 'success',
        text: 'text',
        className: function() {
          return 'success';
        },
        icon: function() {
          return 'thumbs-up';
        }
      }
    ];

    it('should be set when emitted', function() {
      setScopeAndCompile();

      $scope.$emit('flash:message', messages);

      expect($scope).to.have.property('messages');
      expect($scope.messages.length).to.equal(1);
    });

    it('should be displayed for a short time when emitted', function() {
      setScopeAndCompile();
      $scope.$emit('flash:message', messages);

      expect($scope.messages).to.equal(messages);
      expect($scope).to.have.property('visible');
      expect($scope.visible).to.equal(true);

      $timeout.flush();
      expect($scope.visible).to.equal(false);
      expect($scope.messages.length).to.equal(0);
    });

    it('should render correctly', function() {
      var element = angular.element(fixture);
      $scope = $rootScope.$new();
      $compile(element)($scope);
      $rootScope.$digest();

      $rootScope.$emit('flash:message', messages);
      $rootScope.$digest();

      expect(element.find('.alert').length).to.equal(1);
      expect(element.find('.alert-success').length).to.equal(1);
      expect(element.find('.alert-success i').hasClass('fa-thumbs-up')).to.equal(true);
      expect(element.find('.alert-success').text()).to.match(/^\s*text\s*$/);
    });

    it('should render correctly', function() {
      var element = angular.element(fixture);
      $scope = $rootScope.$new();
      $compile(element)($scope);
      $rootScope.$digest();

      $rootScope.$emit('flash:message', messages);
      $rootScope.$digest();

      expect(element.find('.alert').length).to.equal(1);
      expect(element.find('.alert-success').length).to.equal(1);
      expect(element.find('.alert-success i').hasClass('fa-thumbs-up')).to.equal(true);
      expect(element.find('.alert-success').text()).to.match(/^\s*text\s*$/);
    });
  });
});
