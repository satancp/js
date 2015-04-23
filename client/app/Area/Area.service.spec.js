'use strict';

describe('Service: Area', function () {

  // load the service's module
  beforeEach(module('as2App'));

  // instantiate service
  var Area;
  beforeEach(inject(function (_Area_) {
    Area = _Area_;
  }));

  it('should do something', function () {
    expect(!!Area).toBe(true);
  });

});
