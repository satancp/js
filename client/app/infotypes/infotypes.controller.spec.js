'use strict';

describe('Controller: InfotypesCtrl', function () {

  // load the controller's module
  beforeEach(module('as2App'));

  var InfotypesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InfotypesCtrl = $controller('InfotypesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
