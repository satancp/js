'use strict';

describe('Service: Infotype', function () {

  // load the service's module
  beforeEach(module('as2App'));

  // instantiate service
  var Infotype;
  beforeEach(inject(function (_Infotype_) {
    Infotype = _Infotype_;
  }));

  it('should do something', function () {
    expect(!!Infotype).toBe(true);
  });

});
