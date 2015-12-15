describe('ListSvc test', function(){

  describe('when I call my service.documents', function(){

    it('should be true', function(){
      var $injector = angular.injector(['zombify']);
      var ls = $injector.get('ListSvc');
      expect(ls.documents).toBeTruthy();
    });

  });

  //var lc = this;
  //
  //beforeEach(module('zombify'));
  //
  //it("should be true", function(){
  //  expect(true).toBeTruthy();
  //});
  //
  //it('should have documents', function(){
  //  expect(lc.documents.length).toBe(true);
  //});

});
