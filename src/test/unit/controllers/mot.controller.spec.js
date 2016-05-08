/*  global
MODELS
EventEmitter
httpMocks:true*/
import MotController from 'controllers/mot.controller';

// TODO: test super method in constructor
// TODO: test that prototype of MotController is BaseController
describe('Mot Controller', () => {
  describe('#constructor', () => {
    it('should not be called as a function', () => {
      (MotController).should.throw(TypeError);
    });
  });
});
