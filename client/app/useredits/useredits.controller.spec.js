'use strict';

describe('Controller: UsereditsCtrl', function () {

  // load the controller's module
  beforeEach(module('as2App'));

  var UsereditsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UsereditsCtrl = $controller('UsereditsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
