require('./index');
require('angular-mocks');

var mockRootScope,
  Flash,
  flashService = require('./flash');

var chai = require('chai');
chai.should();

describe('', function() {
  'use strict';

  beforeEach(function() {
    mockRootScope = {
      $emit: function() {
      }
    };

    Flash = flashService(mockRootScope);
    sinon.spy(mockRootScope, '$emit');
  });

  afterEach(function() {
    mockRootScope.$emit.restore();
  });

  describe('Factory: Flash', function() {
    it('should exist', function() {
      expect(Flash).to.be.a('function');
    });

    it('should have a function error', function() {
      expect(Flash.error).to.be.a('function');
    });
    it('should have a function warning', function() {
      expect(Flash.warning).to.be.a('function');
    });
    it('should have a function info', function() {
      expect(Flash.info).to.be.a('function');
    });
    it('should have a function success', function() {
      expect(Flash.success).to.be.a('function');
    });

    describe('flash a message', function() {
      it('should emit a string success message', function() {
        Flash.success('Appa! Yip yip!');
        expect(mockRootScope.$emit).to.have.been.calledWith('flash:message');
      });

      it('should emit a string info message', function() {
        Flash.info('Appa! Yip yip!');
        expect(mockRootScope.$emit).to.have.been.calledWith('flash:message');
      });

      it('should emit a string warning message', function() {
        Flash.warning('Appa! Yip yip!');
        expect(mockRootScope.$emit).to.have.been.calledWith('flash:message');
      });

      it('should emit a string error message', function() {
        Flash.error('Appa! Yip yip!');
        expect(mockRootScope.$emit).to.have.been.calledWith('flash:message');
      });

      it('should emit object messages', function() {
        Flash.success({text: 'Appa! Yip yip!', level: 'success'});
        expect(mockRootScope.$emit).to.have.been.calledWith('flash:message');
      });

      it('the emitted thing should be a list of Messages', function() {
        Flash.success('Hello');

        var spyCall = mockRootScope.$emit.getCall(0);
        var message = spyCall.args[1][0];

        message.text.should.equal('Hello');
        message.level.should.equal('success');
        message.icon().should.equal('thumbs-up');
        message.className().should.equal('success');
      });
    });

  });
});
