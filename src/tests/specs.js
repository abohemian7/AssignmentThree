
describe('listController', function(){
  var lc;
  beforeEach(module('zombify'));
  beforeEach(function(){
    inject(function($injector){
      lc = $injector.get('listController');
    });
  });
  describe('documents', function(){
    it('should add one to the value of num', function(){
      expect(lc.testVals.length).toBe(3);
    });
  });
});