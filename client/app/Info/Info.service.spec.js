'use strict';

describe('Service: Info', function () {

  // load the service's module
  beforeEach(module('as2App'));

  // instantiate service
  var Info;
  beforeEach(inject(function (_Info_) {
    Info = _Info_;
  }));

  it('should do something', function () {
    expect(!!Info).toBe(true);
  });

});
