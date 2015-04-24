'use strict';

describe('Service: Mail', function () {

  // load the service's module
  beforeEach(module('as2App'));

  // instantiate service
  var Mail;
  beforeEach(inject(function (_Mail_) {
    Mail = _Mail_;
  }));

  it('should do something', function () {
    expect(!!Mail).toBe(true);
  });

});
